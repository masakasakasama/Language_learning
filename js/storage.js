// Persistent state in localStorage.
// Layout under one root key: "mochi.v1"
// {
//   currentLang: "ja",
//   languages: {
//     ja: {
//       cards: { [cardId]: { ease, interval, due (ISO date), reps, lapses, last (ISO) } },
//       lessonsCompleted: { [lessonId]: true },
//       learned: { [cardId]: true },          // first introduction (ever seen)
//       hearts: 5, heartsRefilledAt: ISO,
//       xp: 0, level: 1
//     }, ko:..., en:..., es:...
//   },
//   stats: { byDate: { "YYYY-MM-DD": { mins, cards, correct, lessons, xp } } },
//   streak: { current: 0, longest: 0, lastActiveDate: "YYYY-MM-DD" },
//   xpTotal: 0
// }
window.Storage = (function () {
  const KEY = "mochi.v1";
  const SNAP_KEY = "mochi.v1.snapshots";
  const MAX_SNAPSHOTS = 8;
  const ALL_LANGS = ["ja","ko","en","es","de","zh"];
  // Per-user study languages. レベッカ is a native German speaker so she
  // doesn't study German; 俺 only studies English + German.
  const REBECCA_LANGS = ["ja","ko","en","es","zh"];
  const ME_LANGS = ["en","de"];
  function allowedFor(uid) {
    if (uid === "me") return ME_LANGS.slice();
    if (uid === "rebecca") return REBECCA_LANGS.slice();
    return ALL_LANGS.slice();
  }

  function defaultLangState() {
    return {
      cards: {},
      lessonsCompleted: {},
      learned: {},
      marks: {},
      xp: 0,
      level: 1,
      dailyGoal: 20,         // cards/day target for THIS language
      trackForTaskManager: true  // included in the daily-goal grid + auto-sync
    };
  }

  // One user's progress. Same shape the WHOLE root used to have before
  // multi-user — so migration is just "wrap the old root into users.rebecca".
  function defaultProfile() {
    const en = defaultLangState(); en.trackForTaskManager = false;
    const de = defaultLangState(); de.trackForTaskManager = false;
    return {
      currentLang: "ja",
      allowedLangs: ALL_LANGS.slice(),  // which languages this user studies
      languages: {
        ja: defaultLangState(),
        ko: defaultLangState(),
        en,
        es: defaultLangState(),
        de,
        zh: defaultLangState()
      },
      stats: { byDate: {} },
      streak: { current: 0, longest: 0, lastActiveDate: null },
      xpTotal: 0,
      dailyAchievements: {},
      notified: {}
    };
  }

  function defaultRoot() {
    const me = defaultProfile();
    me.currentLang = "en";
    me.allowedLangs = allowedFor("me"); // 俺: English + German
    const rebecca = defaultProfile();
    rebecca.allowedLangs = allowedFor("rebecca"); // レベッカ: no German (native)
    rebecca.currentLang = "ja";
    return {
      schema: 2,
      currentUser: "rebecca",
      userNames: { rebecca: "レベッカ", me: "俺" },
      users: {
        rebecca: rebecca,
        me: me
      },
      onboarded: false,
      theme: "light",
      webhookUrl: ""
    };
  }

  // Normalize ANY shape into the v2 multi-user shape WITHOUT losing data.
  // - Old single-user root (has .languages, no .users) → wrap into users.rebecca.
  // - Already v2 → just fill in missing pieces.
  function migrate(obj) {
    if (!obj || typeof obj !== "object") return defaultRoot();

    // Old single-user schema → everything that existed becomes Rebecca's.
    if (obj.languages && !obj.users) {
      const rebecca = {
        currentLang: obj.currentLang || "ja",
        languages: obj.languages || {},
        stats: obj.stats || { byDate: {} },
        streak: obj.streak || { current: 0, longest: 0, lastActiveDate: null },
        xpTotal: obj.xpTotal || 0,
        dailyAchievements: obj.dailyAchievements || {},
        notified: obj.notified || {}
      };
      const me = defaultProfile(); me.currentLang = "en";
      obj = {
        schema: 2,
        currentUser: "rebecca",
        userNames: { rebecca: "レベッカ", me: "俺" },
        users: { rebecca: rebecca, me: me },
        onboarded: obj.onboarded !== false,   // existing users were onboarded
        theme: obj.theme || "light",
        webhookUrl: obj.webhookUrl || ""
      };
    }

    if (!obj.users || typeof obj.users !== "object") {
      // Brand-new / unrecognised → safe default
      return defaultRoot();
    }

    obj.schema = 2;
    obj.userNames = obj.userNames || { rebecca: "レベッカ", me: "俺" };
    if (!obj.userNames.rebecca) obj.userNames.rebecca = "レベッカ";
    if (!obj.userNames.me) obj.userNames.me = "俺";
    if (!obj.users.rebecca) obj.users.rebecca = defaultProfile();
    if (!obj.users.me) { obj.users.me = defaultProfile(); obj.users.me.currentLang = "en"; obj.users.me.allowedLangs = ["en","de"]; }
    if (!obj.currentUser || !obj.users[obj.currentUser]) obj.currentUser = "rebecca";
    if (typeof obj.onboarded !== "boolean") obj.onboarded = true;
    obj.theme = obj.theme || "light";
    if (typeof obj.webhookUrl !== "string") obj.webhookUrl = obj.webhookUrl || "";

    // Per-user completeness pass
    Object.keys(obj.users).forEach((uid) => {
      const u = obj.users[uid] || (obj.users[uid] = defaultProfile());
      u.currentLang = u.currentLang || "ja";
      // allowedLangs is fixed per user: 俺 = en+de, レベッカ = all but
      // German (native speaker), others = all.
      u.allowedLangs = allowedFor(uid);
      // If the saved currentLang is no longer allowed, snap to the first
      // allowed language so the UI never lands on a hidden language.
      if (u.allowedLangs.indexOf(u.currentLang) === -1) u.currentLang = u.allowedLangs[0];
      u.languages = u.languages || {};
      u.stats = u.stats || { byDate: {} };
      u.streak = u.streak || { current: 0, longest: 0, lastActiveDate: null };
      if (typeof u.xpTotal !== "number") u.xpTotal = 0;
      u.dailyAchievements = u.dailyAchievements || {};
      u.notified = u.notified || {};
      ALL_LANGS.forEach((l) => {
        if (!u.languages[l]) u.languages[l] = defaultLangState();
        const s = u.languages[l];
        if (typeof s.trackForTaskManager !== "boolean") s.trackForTaskManager = (l !== "en" && l !== "de");
        if (typeof s.dailyGoal !== "number") s.dailyGoal = 20;
        if (!s.cards) s.cards = {};
        if (!s.lessonsCompleted) s.lessonsCompleted = {};
        if (!s.learned) s.learned = {};
        if (!s.marks) s.marks = {};
        if (!Array.isArray(s.customCards)) s.customCards = [];
        if (typeof s.xp !== "number") s.xp = 0;
        if (typeof s.level !== "number") s.level = 1;
      });
    });
    return obj;
  }

  let cache = null;

  function load() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(KEY);
      const rawObj = raw ? JSON.parse(raw) : defaultRoot();
      const wasOldShape = rawObj && rawObj.languages && !rawObj.users;
      cache = migrate(rawObj);
      // Persist the migrated v2 shape immediately so localStorage is never
      // left in the old single-user shape (sync.js reads localStorage
      // directly and would otherwise re-wrap stale data).
      if (wasOldShape) {
        try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
      }
    } catch (e) {
      cache = defaultRoot();
    }
    return cache;
  }

  // The current user's profile (the per-user sub-root). All per-user
  // accessors go through this; app-wide settings stay on the true root.
  function prof() {
    const root = load();
    if (!root.users) return root; // defensive; migrate() guarantees users
    return root.users[root.currentUser] || root.users.rebecca || defaultProfile();
  }

  // ─────────────── User management ───────────────
  function listUsers() {
    const root = load();
    return Object.keys(root.users).map((id) => ({ id, name: (root.userNames || {})[id] || id }));
  }
  function getCurrentUser() { return load().currentUser; }
  function setCurrentUser(id) {
    const root = load();
    if (!root.users[id]) return;
    root.currentUser = id;
    // Make sure the active language is one this user actually studies.
    const u = root.users[id];
    if (Array.isArray(u.allowedLangs) && u.allowedLangs.indexOf(u.currentLang) === -1) {
      u.currentLang = u.allowedLangs[0];
    }
    save();
  }
  function getUserName(id) { return (load().userNames || {})[id] || id; }
  function getAllowedLangs() {
    const p = prof();
    return Array.isArray(p.allowedLangs) && p.allowedLangs.length ? p.allowedLangs : ALL_LANGS.slice();
  }

  let _saveCount = 0;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
    // Take an auto-snapshot every 10 writes so data is recoverable even if
    // the live state gets clobbered by a sync bug or external clear.
    _saveCount += 1;
    if (_saveCount % 10 === 0) {
      try { saveSnapshot("auto-write"); } catch (e) {}
    }
    // Notify sync layer (and anything else interested) that local state changed
    try { window.dispatchEvent(new CustomEvent("mochi:local-changed")); } catch (e) {}
  }

  // Re-read state from localStorage (used after a sync pulls remote into local)
  function reload() {
    cache = null;
    return load();
  }

  function reset() {
    // Snapshot before nuking
    saveSnapshot("before-reset");
    cache = defaultRoot();
    save();
  }

  // ─────────────── Local snapshot history ───────────────
  // Every time substantive state changes, we keep a rolling history of up to
  // MAX_SNAPSHOTS most-recent local snapshots in localStorage. This protects
  // against any path that wipes mochi.v1 (sync bug, accidental reset,
  // bad merge), because the user can always Restore from history.
  function countCards(root) {
    if (!root) return 0;
    let n = 0;
    if (root.users) {
      // v2 multi-user: sum across every user's languages
      Object.values(root.users).forEach((u) => {
        Object.values((u && u.languages) || {}).forEach((s) => { n += Object.keys((s && s.cards) || {}).length; });
      });
      return n;
    }
    if (root.languages) {
      Object.values(root.languages).forEach((s) => { n += Object.keys((s && s.cards) || {}).length; });
    }
    return n;
  }
  function getSnapshots() {
    try { return JSON.parse(localStorage.getItem(SNAP_KEY) || "[]"); }
    catch (e) { return []; }
  }
  function writeSnapshots(arr) {
    try { localStorage.setItem(SNAP_KEY, JSON.stringify(arr)); } catch (e) {}
  }
  function saveSnapshot(reason) {
    try {
      if (!cache) load();
      const cards = countCards(cache);
      // Don't snapshot a state that has zero progress.
      if (cards === 0 && Object.keys(cache.stats?.byDate || {}).length === 0) return;
      const snaps = getSnapshots();
      // De-dup: if the last snapshot already has the same card count and is
      // less than 5 minutes old, skip.
      const newest = snaps[0];
      const now = Date.now();
      if (newest && newest.cardCount === cards && (now - new Date(newest.at).getTime()) < 5 * 60 * 1000) return;
      snaps.unshift({
        at: new Date().toISOString(),
        reason: reason || "auto",
        cardCount: cards,
        data: JSON.parse(JSON.stringify(cache))
      });
      while (snaps.length > MAX_SNAPSHOTS) snaps.pop();
      writeSnapshots(snaps);
    } catch (e) {}
  }
  function restoreSnapshot(idx) {
    const snaps = getSnapshots();
    if (!snaps[idx]) return false;
    // Take a snapshot of the CURRENT state before overwriting it, in case the
    // restore was a mistake.
    saveSnapshot("before-restore");
    cache = migrate(JSON.parse(JSON.stringify(snaps[idx].data)));
    try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
    window.dispatchEvent(new CustomEvent("mochi:local-changed"));
    return true;
  }

  // Export the whole state object so the user can save a backup file.
  function exportData() {
    return JSON.stringify(load(), null, 2);
  }

  // Import a previously-exported JSON string. If `mergeMode` is true, we merge
  // word-level data; otherwise the file replaces local state entirely.
  // Returns { ok: true } / { ok: false, error: "..." }.
  function importData(jsonStr, mergeMode) {
    try {
      const parsedRaw = JSON.parse(jsonStr);
      if (!parsedRaw || typeof parsedRaw !== "object" || (!parsedRaw.languages && !parsedRaw.users)) {
        return { ok: false, error: "File does not look like a mumu backup." };
      }
      // Normalise the imported blob to v2 (old single-user backups become
      // users.rebecca — so an old export still restores to Rebecca).
      const parsed = migrate(parsedRaw);
      if (mergeMode) {
        const root = load();
        Object.keys(parsed.users).forEach((uid) => {
          const cu = root.users[uid] || (root.users[uid] = defaultProfile());
          const pu = parsed.users[uid];
          Object.keys(pu.languages || {}).forEach((lang) => {
            const a = cu.languages[lang] || (cu.languages[lang] = defaultLangState());
            const b = pu.languages[lang] || {};
            a.cards = Object.assign({}, b.cards || {}, a.cards || {});
            a.learned = Object.assign({}, b.learned || {}, a.learned || {});
            a.lessonsCompleted = Object.assign({}, b.lessonsCompleted || {}, a.lessonsCompleted || {});
            a.marks = Object.assign({}, b.marks || {}, a.marks || {});
            a.xp = Math.max(a.xp || 0, b.xp || 0);
            a.level = Math.max(a.level || 1, b.level || 1);
            const seen = new Set((a.customCards || []).map((c) => c.id));
            (b.customCards || []).forEach((c) => { if (c && c.id && !seen.has(c.id)) a.customCards.push(c); });
          });
          Object.keys((pu.stats && pu.stats.byDate) || {}).forEach((d) => {
            const x = cu.stats.byDate[d] || { mins:0, cards:0, correct:0, lessons:0, xp:0 };
            const y = pu.stats.byDate[d];
            cu.stats.byDate[d] = {
              mins: Math.max(x.mins||0, y.mins||0),
              cards: Math.max(x.cards||0, y.cards||0),
              correct: Math.max(x.correct||0, y.correct||0),
              lessons: Math.max(x.lessons||0, y.lessons||0),
              xp: Math.max(x.xp||0, y.xp||0)
            };
          });
          if ((pu.streak?.longest || 0) > (cu.streak.longest || 0)) cu.streak.longest = pu.streak.longest;
          cu.xpTotal = Math.max(cu.xpTotal || 0, pu.xpTotal || 0);
          cu.dailyAchievements = Object.assign({}, pu.dailyAchievements || {}, cu.dailyAchievements || {});
        });
      } else {
        cache = parsed;
      }
      save();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  }

  function downloadBackup() {
    const data = exportData();
    const stamp = todayStr();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mumu-backup-" + stamp + ".json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 500);
  }

  function todayStr() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
  }

  function getLang() { return prof().currentLang; }
  function setLang(l) { prof().currentLang = l; save(); }

  function langState(l) {
    const p = prof();
    const code = l || p.currentLang;
    if (!p.languages[code]) p.languages[code] = defaultLangState();
    return p.languages[code];
  }

  function getCard(cardId, lang) {
    return langState(lang).cards[cardId];
  }
  function setCard(cardId, data, lang) {
    langState(lang).cards[cardId] = data;
    save();
  }

  function isLearned(cardId, lang) { return !!langState(lang).learned[cardId]; }
  function markLearned(cardId, lang) {
    langState(lang).learned[cardId] = true; save();
  }
  function learnedSet(lang) { return langState(lang).learned; }

  function lessonDone(lessonId, lang) {
    return !!langState(lang).lessonsCompleted[lessonId];
  }
  function markLessonDone(lessonId, lang) {
    langState(lang).lessonsCompleted[lessonId] = true; save();
  }

  // Erase a card's progress completely:
  // - removes its SRS state
  // - removes it from the "learned" set
  // - clears any self-assessment mark
  function forgetCard(cardId, lang) {
    const st = langState(lang);
    if (st.cards && st.cards[cardId]) delete st.cards[cardId];
    if (st.learned && st.learned[cardId]) delete st.learned[cardId];
    if (st.marks && st.marks[cardId]) delete st.marks[cardId];
    save();
  }

  // Self-assessment marks: "know" | "ok" | "dontknow" | null
  // Setting a mark also nudges the SRS schedule:
  //   Hard → next review tomorrow + lower ease, so the word stays in
  //          short-interval rotation ("am I forgetting this?")
  //   Easy → push out (>=7 days)
  //   OK   → treat as a normal "good" review
  function setMark(cardId, mark, lang) {
    const st = langState(lang);
    st.marks = st.marks || {};
    if (mark == null) {
      delete st.marks[cardId];
      save();
      return;
    }
    st.marks[cardId] = mark;
    if (typeof window !== "undefined" && window.SRS) {
      st.cards = st.cards || {};
      st.cards[cardId] = window.SRS.applyMark(st.cards[cardId], mark);
      st.learned = st.learned || {};
      st.learned[cardId] = true;
    }
    save();
  }
  function getMark(cardId, lang) {
    const st = langState(lang);
    return (st.marks || {})[cardId] || null;
  }

  // Custom user-created cards. Stored in langState.customCards as full card objects.
  // Each card has the same shape as built-in vocab cards so the rest of the app
  // (SRS, marks, browse, review) treats them identically.
  function addCustomCard(input, lang) {
    const L = lang || getLang();
    const st = langState(L);
    st.customCards = st.customCards || [];
    const id = "custom:" + L + ":" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
    const card = {
      id,
      lang: L,
      type: "vocab",
      deck: "custom",
      level: input.level || "N5",
      jp: input.jp || input.front || "",
      kana: input.kana || "",
      romaji: input.romaji || input.kana || "",
      en: input.en || input.back || "",
      de: input.de || "",
      emoji: input.emoji || "",
      ex: Array.isArray(input.ex) ? input.ex : [],
      front: input.jp || input.front || "",
      back: input.en || input.back || "",
      hint: input.kana || input.hint || "",
      speakText: input.kana || input.jp || input.front || "",
      source: "user",
      createdAt: new Date().toISOString()
    };
    st.customCards.push(card);
    save();
    return card;
  }
  function getCustomCards(lang) { return langState(lang).customCards || []; }
  function removeCustomCard(id, lang) {
    const st = langState(lang);
    st.customCards = (st.customCards || []).filter((c) => c.id !== id);
    if (st.cards) delete st.cards[id];
    if (st.learned) delete st.learned[id];
    if (st.marks) delete st.marks[id];
    save();
  }

  // Card status helpers (purely derived from SRS state)
  function cardStatus(cardId, lang) {
    const st = langState(lang).cards[cardId];
    if (!st) {
      return langState(lang).learned[cardId] ? "new" : "untouched";
    }
    if (st.interval >= 21) return "mastered";
    if (st.interval > 0) return "review";
    return "learning";
  }

  // XP and stats
  function addXP(amount, lang) {
    const p = prof();
    langState(lang).xp += amount;
    p.xpTotal += amount;
    save();
  }

  function recordStudyTime(seconds) {
    const p = prof();
    const day = todayStr();
    if (!p.stats.byDate[day]) p.stats.byDate[day] = { mins: 0, cards: 0, correct: 0, lessons: 0, xp: 0 };
    p.stats.byDate[day].mins += seconds / 60;
    save();
  }

  function recordCard(correct, xp, lang) {
    const root = prof();
    const day = todayStr();
    const L = lang || getLang();
    if (!root.stats.byDate[day]) root.stats.byDate[day] = { mins: 0, cards: 0, correct: 0, lessons: 0, xp: 0, byLang: {} };
    const today = root.stats.byDate[day];
    today.cards += 1;
    if (correct) today.correct += 1;
    if (xp) today.xp += xp;
    // per-language tally so external apps can ask "did the user hit the
    // Japanese daily goal today?"
    today.byLang = today.byLang || {};
    today.byLang[L] = today.byLang[L] || { cards: 0, correct: 0, xp: 0 };
    today.byLang[L].cards += 1;
    if (correct) today.byLang[L].correct += 1;
    if (xp) today.byLang[L].xp += xp;
    save();
    checkDailyAchievement(L);
  }

  // ─────────────── Daily achievement (per language) ───────────────
  function getDailyGoal(lang) { return (langState(lang).dailyGoal ?? 20); }
  function setDailyGoal(lang, n) { langState(lang).dailyGoal = Math.max(1, n|0); save(); }
  function todayCardsForLang(lang) {
    const today = prof().stats.byDate[todayStr()];
    return today?.byLang?.[lang]?.cards || 0;
  }
  function isDailyAchieved(lang) {
    return todayCardsForLang(lang) >= getDailyGoal(lang);
  }
  function isTracked(lang) { return !!langState(lang).trackForTaskManager; }
  function setTracked(lang, on) { langState(lang).trackForTaskManager = !!on; save(); }
  function trackedLangs() {
    return getAllowedLangs().filter((l) => isTracked(l));
  }
  function dailyAchievementMap(opts) {
    const onlyTracked = opts && opts.onlyTracked;
    const out = {};
    const langs = onlyTracked ? trackedLangs() : getAllowedLangs();
    langs.forEach((l) => {
      out[l] = {
        cards: todayCardsForLang(l),
        goal: getDailyGoal(l),
        achieved: isDailyAchieved(l),
        tracked: isTracked(l)
      };
    });
    return out;
  }

  // Track which (date, language) tuples have already triggered today's
  // notification so we don't fire the webhook twice.
  function wasNotifiedToday(lang) {
    const p = prof();
    return !!(p.notified || {})[todayStr() + ":" + lang];
  }
  function markNotified(lang) {
    const p = prof();
    p.notified = p.notified || {};
    p.notified[todayStr() + ":" + lang] = true;
    save();
  }

  function getWebhookUrl() { return load().webhookUrl || ""; }
  function setWebhookUrl(url) {
    const root = load();
    if (url) root.webhookUrl = url;
    else delete root.webhookUrl;
    save();
  }

  // Auto-recorded daily achievements. Lives at root.dailyAchievements and
  // rides on the existing Cloud Sync (Firestore) → any other app that shares
  // the same sync code can read it at sync/{code}/state/main.dailyAchievements.
  // Schema: { "YYYY-MM-DD": { ja:{achieved,cards,goal,at}, ko:{...}, ... } }
  function recordDailyAchievementInState(lang) {
    const p = prof();
    const day = todayStr();
    p.dailyAchievements = p.dailyAchievements || {};
    p.dailyAchievements[day] = p.dailyAchievements[day] || {};
    p.dailyAchievements[day][lang] = {
      achieved: true,
      cards: todayCardsForLang(lang),
      goal: getDailyGoal(lang),
      at: new Date().toISOString()
    };
    save();
  }
  function getDailyAchievementsAll() { return prof().dailyAchievements || {}; }
  function getDailyAchievementsForDate(date) {
    return (prof().dailyAchievements || {})[date] || {};
  }

  // Called from recordCard. If the user just crossed today's per-language
  // goal, fire an event and persist the achievement to the state (which
  // auto-syncs to Firestore via Sync).
  function checkDailyAchievement(lang) {
    if (!isDailyAchieved(lang)) return;
    // Languages excluded from task-manager tracking still get a local toast
    // when they hit their goal, but they don't go into the synced
    // dailyAchievements map (so the task manager doesn't see English etc.).
    if (wasNotifiedToday(lang)) return;
    markNotified(lang);
    if (isTracked(lang)) recordDailyAchievementInState(lang);
    const payload = {
      source: "mumu",
      date: todayStr(),
      language: lang,
      languageName: ({ja:"Japanese",ko:"Korean",en:"English",es:"Spanish",de:"German"})[lang] || lang,
      cardsToday: todayCardsForLang(lang),
      goal: getDailyGoal(lang),
      achieved: true,
      version: "1.4.1"
    };
    try { window.dispatchEvent(new CustomEvent("mumu:daily-achieved", { detail: payload })); } catch (e) {}
    // Power-user escape hatch: still POST to a webhook if one is configured.
    const url = getWebhookUrl();
    if (url) {
      try {
        fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, mode: "cors", body: JSON.stringify(payload) })
          .catch((e) => console.warn("[mumu] webhook failed", e));
      } catch (e) { console.warn("[mumu] webhook threw", e); }
    }
  }

  function recordLesson(xp) {
    const p = prof();
    const day = todayStr();
    if (!p.stats.byDate[day]) p.stats.byDate[day] = { mins: 0, cards: 0, correct: 0, lessons: 0, xp: 0 };
    p.stats.byDate[day].lessons += 1;
    if (xp) p.stats.byDate[day].xp += xp;
    save();
  }

  function bumpStreak() {
    const root = prof();
    const day = todayStr();
    if (root.streak.lastActiveDate === day) return root.streak; // already counted today
    if (!root.streak.lastActiveDate) {
      root.streak.current = 1;
    } else {
      // calculate gap
      const lastD = new Date(root.streak.lastActiveDate);
      const todayD = new Date(day);
      const diffDays = Math.round((todayD - lastD) / 86400000);
      if (diffDays === 1) root.streak.current += 1;
      else if (diffDays > 1) root.streak.current = 1;
    }
    if (root.streak.current > root.streak.longest) root.streak.longest = root.streak.current;
    root.streak.lastActiveDate = day;
    save();
    return root.streak;
  }

  function getStats() { return prof().stats; }
  function getStreak() { return prof().streak; }
  function getXPTotal() { return prof().xpTotal; }

  function getStatsForRange(days) {
    const root = prof();
    const out = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0");
      const s = root.stats.byDate[key] || { mins:0,cards:0,correct:0,lessons:0,xp:0 };
      out.push({ date: key, day: d, ...s });
    }
    return out;
  }

  function getCumulativeStats() {
    const root = prof();
    let totalMins = 0, totalCards = 0, totalCorrect = 0, totalLessons = 0, totalXp = 0, daysActive = 0;
    Object.values(root.stats.byDate).forEach((s) => {
      totalMins += s.mins; totalCards += s.cards; totalCorrect += s.correct;
      totalLessons += s.lessons; totalXp += s.xp;
      if (s.cards > 0 || s.lessons > 0) daysActive += 1;
    });
    return { totalMins, totalCards, totalCorrect, totalLessons, totalXp, daysActive };
  }

  function todayStats() {
    return prof().stats.byDate[todayStr()] || { mins:0, cards:0, correct:0, lessons:0, xp:0 };
  }

  // Every (date, lang) the current user studied at all, with how many
  // cards and that language's goal. Used by the task-manager bridge to
  // backfill past days as graded progress.
  function studyHistory() {
    const out = [];
    const byDate = (prof().stats && prof().stats.byDate) || {};
    Object.keys(byDate).forEach((date) => {
      const bl = byDate[date] && byDate[date].byLang;
      if (!bl) return;
      Object.keys(bl).forEach((lang) => {
        const cards = (bl[lang] && bl[lang].cards) || 0;
        if (cards > 0) out.push({ date, lang, cards, goal: getDailyGoal(lang) });
      });
    });
    return out;
  }

  function setOnboarded() { load().onboarded = true; save(); }
  function isOnboarded() { return !!load().onboarded; }

  function setTheme(t) { load().theme = t; save(); }
  function getTheme() { return load().theme || "light"; }

  return {
    load, save, reload, reset, todayStr,
    listUsers, getCurrentUser, setCurrentUser, getUserName, getAllowedLangs,
    exportData, importData, downloadBackup,
    saveSnapshot, getSnapshots, restoreSnapshot, countCards,
    getLang, setLang, langState,
    getCard, setCard,
    isLearned, markLearned, learnedSet, forgetCard, cardStatus,
    setMark, getMark,
    addCustomCard, getCustomCards, removeCustomCard,
    getDailyGoal, setDailyGoal, todayCardsForLang, isDailyAchieved, dailyAchievementMap,
    isTracked, setTracked, trackedLangs,
    getDailyAchievementsAll, getDailyAchievementsForDate,
    getWebhookUrl, setWebhookUrl, wasNotifiedToday,
    lessonDone, markLessonDone,
    addXP, recordStudyTime, recordCard, recordLesson,
    bumpStreak, getStats, getStreak, getXPTotal,
    getStatsForRange, getCumulativeStats, todayStats, studyHistory,
    setOnboarded, isOnboarded, setTheme, getTheme
  };
})();
