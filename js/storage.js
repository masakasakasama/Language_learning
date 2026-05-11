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

  function defaultLangState() {
    return {
      cards: {},
      lessonsCompleted: {},
      learned: {},
      marks: {},
      xp: 0,
      level: 1,
      dailyGoal: 20  // cards/day target for THIS language
    };
  }

  function defaultRoot() {
    return {
      currentLang: "ja",
      languages: {
        ja: defaultLangState(),
        ko: defaultLangState(),
        en: defaultLangState(),
        es: defaultLangState()
      },
      stats: { byDate: {} },
      streak: { current: 0, longest: 0, lastActiveDate: null },
      xpTotal: 0,
      onboarded: false,
      theme: "light"
    };
  }

  let cache = null;

  function load() {
    if (cache) return cache;
    try {
      const raw = localStorage.getItem(KEY);
      cache = raw ? JSON.parse(raw) : defaultRoot();
      // ensure all language slots exist (in case we add languages later)
      ["ja","ko","en","es"].forEach((l) => {
        if (!cache.languages[l]) cache.languages[l] = defaultLangState();
      });
    } catch (e) {
      cache = defaultRoot();
    }
    return cache;
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(cache)); } catch (e) {}
    // Notify sync layer (and anything else interested) that local state changed
    try { window.dispatchEvent(new CustomEvent("mochi:local-changed")); } catch (e) {}
  }

  // Re-read state from localStorage (used after a sync pulls remote into local)
  function reload() {
    cache = null;
    return load();
  }

  function reset() {
    cache = defaultRoot();
    save();
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
      const parsed = JSON.parse(jsonStr);
      if (!parsed || typeof parsed !== "object" || !parsed.languages) {
        return { ok: false, error: "File does not look like a mumu backup." };
      }
      if (mergeMode) {
        // Per-language merge: union cards/learned/lessonsCompleted, max for xp.
        const cur = load();
        Object.keys(parsed.languages || {}).forEach((lang) => {
          const a = cur.languages[lang] || defaultLangState();
          const b = parsed.languages[lang] || {};
          a.cards = Object.assign({}, b.cards || {}, a.cards || {});
          a.learned = Object.assign({}, b.learned || {}, a.learned || {});
          a.lessonsCompleted = Object.assign({}, b.lessonsCompleted || {}, a.lessonsCompleted || {});
          a.marks = Object.assign({}, b.marks || {}, a.marks || {});
          a.xp = Math.max(a.xp || 0, b.xp || 0);
          a.level = Math.max(a.level || 1, b.level || 1);
          // Append new custom cards
          const seen = new Set((a.customCards || []).map((c) => c.id));
          (b.customCards || []).forEach((c) => { if (c && c.id && !seen.has(c.id)) a.customCards.push(c); });
          cur.languages[lang] = a;
        });
        // Merge stats per date — take max of each metric
        Object.keys(parsed.stats?.byDate || {}).forEach((d) => {
          const x = cur.stats.byDate[d] || { mins:0, cards:0, correct:0, lessons:0, xp:0 };
          const y = parsed.stats.byDate[d];
          cur.stats.byDate[d] = {
            mins: Math.max(x.mins||0, y.mins||0),
            cards: Math.max(x.cards||0, y.cards||0),
            correct: Math.max(x.correct||0, y.correct||0),
            lessons: Math.max(x.lessons||0, y.lessons||0),
            xp: Math.max(x.xp||0, y.xp||0)
          };
        });
        // Streak: keep the longer
        if ((parsed.streak?.longest || 0) > (cur.streak.longest || 0)) cur.streak.longest = parsed.streak.longest;
        cur.xpTotal = Math.max(cur.xpTotal || 0, parsed.xpTotal || 0);
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

  function getLang() { return load().currentLang; }
  function setLang(l) { load().currentLang = l; save(); }

  function langState(l) { return load().languages[l || getLang()]; }

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
    const root = load();
    langState(lang).xp += amount;
    root.xpTotal += amount;
    save();
  }

  function recordStudyTime(seconds) {
    const root = load();
    const day = todayStr();
    if (!root.stats.byDate[day]) root.stats.byDate[day] = { mins: 0, cards: 0, correct: 0, lessons: 0, xp: 0 };
    root.stats.byDate[day].mins += seconds / 60;
    save();
  }

  function recordCard(correct, xp, lang) {
    const root = load();
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
    const root = load();
    const today = root.stats.byDate[todayStr()];
    return today?.byLang?.[lang]?.cards || 0;
  }
  function isDailyAchieved(lang) {
    return todayCardsForLang(lang) >= getDailyGoal(lang);
  }
  function dailyAchievementMap() {
    const out = {};
    ["ja","ko","en","es"].forEach((l) => {
      out[l] = {
        cards: todayCardsForLang(l),
        goal: getDailyGoal(l),
        achieved: isDailyAchieved(l)
      };
    });
    return out;
  }

  // Track which (date, language) tuples have already triggered today's
  // notification so we don't fire the webhook twice.
  function wasNotifiedToday(lang) {
    const root = load();
    return !!(root.notified || {})[todayStr() + ":" + lang];
  }
  function markNotified(lang) {
    const root = load();
    root.notified = root.notified || {};
    root.notified[todayStr() + ":" + lang] = true;
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
    const root = load();
    const day = todayStr();
    root.dailyAchievements = root.dailyAchievements || {};
    root.dailyAchievements[day] = root.dailyAchievements[day] || {};
    root.dailyAchievements[day][lang] = {
      achieved: true,
      cards: todayCardsForLang(lang),
      goal: getDailyGoal(lang),
      at: new Date().toISOString()
    };
    save();
  }
  function getDailyAchievementsAll() { return load().dailyAchievements || {}; }
  function getDailyAchievementsForDate(date) {
    return (load().dailyAchievements || {})[date] || {};
  }

  // Called from recordCard. If the user just crossed today's per-language
  // goal, fire an event and persist the achievement to the state (which
  // auto-syncs to Firestore via Sync).
  function checkDailyAchievement(lang) {
    if (!isDailyAchieved(lang)) return;
    if (wasNotifiedToday(lang)) return;
    markNotified(lang);
    recordDailyAchievementInState(lang);
    const payload = {
      source: "mumu",
      date: todayStr(),
      language: lang,
      languageName: ({ja:"Japanese",ko:"Korean",en:"English",es:"Spanish"})[lang] || lang,
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
    const root = load();
    const day = todayStr();
    if (!root.stats.byDate[day]) root.stats.byDate[day] = { mins: 0, cards: 0, correct: 0, lessons: 0, xp: 0 };
    root.stats.byDate[day].lessons += 1;
    if (xp) root.stats.byDate[day].xp += xp;
    save();
  }

  function bumpStreak() {
    const root = load();
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

  function getStats() { return load().stats; }
  function getStreak() { return load().streak; }
  function getXPTotal() { return load().xpTotal; }

  function getStatsForRange(days) {
    const root = load();
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
    const root = load();
    let totalMins = 0, totalCards = 0, totalCorrect = 0, totalLessons = 0, totalXp = 0, daysActive = 0;
    Object.values(root.stats.byDate).forEach((s) => {
      totalMins += s.mins; totalCards += s.cards; totalCorrect += s.correct;
      totalLessons += s.lessons; totalXp += s.xp;
      if (s.cards > 0 || s.lessons > 0) daysActive += 1;
    });
    return { totalMins, totalCards, totalCorrect, totalLessons, totalXp, daysActive };
  }

  function todayStats() {
    const root = load();
    return root.stats.byDate[todayStr()] || { mins:0, cards:0, correct:0, lessons:0, xp:0 };
  }

  function setOnboarded() { load().onboarded = true; save(); }
  function isOnboarded() { return !!load().onboarded; }

  function setTheme(t) { load().theme = t; save(); }
  function getTheme() { return load().theme || "light"; }

  return {
    load, save, reload, reset, todayStr,
    exportData, importData, downloadBackup,
    getLang, setLang, langState,
    getCard, setCard,
    isLearned, markLearned, learnedSet, forgetCard, cardStatus,
    setMark, getMark,
    addCustomCard, getCustomCards, removeCustomCard,
    getDailyGoal, setDailyGoal, todayCardsForLang, isDailyAchieved, dailyAchievementMap,
    getDailyAchievementsAll, getDailyAchievementsForDate,
    getWebhookUrl, setWebhookUrl, wasNotifiedToday,
    lessonDone, markLessonDone,
    addXP, recordStudyTime, recordCard, recordLesson,
    bumpStreak, getStats, getStreak, getXPTotal,
    getStatsForRange, getCumulativeStats, todayStats,
    setOnboarded, isOnboarded, setTheme, getTheme
  };
})();
