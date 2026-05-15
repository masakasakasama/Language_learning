// Main app controller: navigation, top bar, audio facade
window.App = (function () {
  let currentView = "home";
  let currentUnit = null;
  let currentLesson = null;
  let sessionStartTs = Date.now();

  function getLangPack(lang) {
    return ({ ja: window.DATA_JA, ko: window.DATA_KO, en: window.DATA_EN, es: window.DATA_ES, de: window.DATA_DE })[lang || Storage.getLang()];
  }
  function getLangMeta(lang) { return DATA_LANGS[lang || Storage.getLang()]; }

  // Built-in cards + user-created custom cards combined.
  function allCards(lang) {
    const L = lang || Storage.getLang();
    const pack = getLangPack(L);
    const custom = Storage.getCustomCards(L);
    return pack.ALL_CARDS.concat(custom);
  }
  function cardById(id, lang) {
    const L = lang || Storage.getLang();
    return allCards(L).find((c) => c.id === id) || null;
  }

  function speak(text) {
    const meta = getLangMeta();
    Audio.speak(text, meta.bcp47);
  }
  function speakSlow(text) {
    const meta = getLangMeta();
    Audio.speakSlow(text, meta.bcp47);
  }

  // Examples filtered by learned set
  function examplesFor(cardId, lang) {
    const pack = getLangPack(lang);
    if (!pack.EXAMPLES) return [];
    const learned = Storage.learnedSet(lang);
    return pack.EXAMPLES.filter((ex) => {
      if (ex.introduces && ex.introduces !== cardId) return false;
      if (!ex.req) return true;
      // req must be subset of learned (the introduced card itself is being learned now)
      return ex.req.every((id) => !!learned[id] || id === cardId);
    });
  }

  function refreshTopbar() {
    const lang = Storage.getLang();
    const meta = getLangMeta(lang);
    const pack = getLangPack(lang);
    document.getElementById("lang-flag").textContent = meta.flag;
    document.getElementById("lang-name").textContent = meta.nativeName;
    const un = document.getElementById("user-name");
    if (un) un.textContent = Storage.getUserName(Storage.getCurrentUser());
    document.getElementById("stat-streak").textContent = Storage.getStreak().current;
    document.getElementById("stat-xp").textContent = Storage.langState(lang).xp;
    const due = SRS.countDue(allCards(lang), lang);
    document.getElementById("stat-due").textContent = due;
    const badge = document.getElementById("nav-due-badge");
    if (due > 0) {
      badge.textContent = due;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }

  function setActiveNav(name) {
    document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.nav === name));
  }

  function go(view, opts) {
    currentView = view;
    const v = document.getElementById("view");
    v.scrollTop = 0;
    setActiveNav(view);
    if (view === "home") Views.home(v);
    else if (view === "review") Views.review(v);
    else if (view === "browse") Views.browse(v, opts);
    else if (view === "profile") Views.profile(v);
    refreshTopbar();
  }

  function showUnit(unit) {
    currentUnit = unit;
    Views.unit(document.getElementById("view"), unit);
  }

  function startLesson(unit, lesson) {
    currentLesson = lesson;
    sessionStartTs = Date.now();
    Views.lesson(document.getElementById("view"), unit, lesson);
  }

  let lastActivityTs = Date.now();
  function bumpActivity() { lastActivityTs = Date.now(); }

  function recordSession() {
    const now = Date.now();
    const elapsed = (now - sessionStartTs) / 1000;
    const idle = (now - lastActivityTs) / 1000;
    sessionStartTs = now;
    // Only count time the app is actually on screen AND the user has
    // interacted recently. Cap each credit so a long idle gap (phone
    // locked, tab left open) can't inflate the daily total.
    if (document.visibilityState !== "visible") return;
    if (idle > 120) return;
    const credit = Math.min(elapsed, 120);
    if (credit > 2) Storage.recordStudyTime(credit);
  }

  function init() {
    // Theme
    document.body.classList.toggle("dark", Storage.getTheme() === "dark");

    // Take an initial snapshot of the current local state as soon as the app
    // boots so the user has a guaranteed rollback point from "this moment".
    try { Storage.saveSnapshot("app-init"); } catch (e) {}

    // Sync events
    window.addEventListener("mochi:remote-applied", () => {
      Storage.reload();
      // Just refresh the topbar (XP/streak/due count). Do NOT re-render the
      // current view: if the user is in a lesson, calling go(currentView)
      // would navigate them away mid-tap. Views re-read state when the user
      // navigates back into them anyway.
      refreshTopbar();
    });
    window.addEventListener("mochi:sync-status", () => {
      if (typeof Views.refreshSyncPill === "function") Views.refreshSyncPill();
    });
    window.addEventListener("mumu:daily-achieved", (e) => {
      const d = e.detail || {};
      UI.confetti();
      UI.toast(`✨ ${d.languageName} の今日の目標達成！(${d.cardsToday}/${d.goal})`, "good");
    });

    // Bind nav
    document.querySelectorAll(".nav-btn").forEach((b) => {
      b.addEventListener("click", () => go(b.dataset.nav));
    });
    document.querySelector(".logo-btn").addEventListener("click", () => go("home"));
    document.getElementById("lang-switcher").addEventListener("click", () => Views.langPicker());
    const us = document.getElementById("user-switcher");
    if (us) us.addEventListener("click", () => Views.userPicker());
    const refreshBtn = document.getElementById("refresh-btn");
    if (refreshBtn) refreshBtn.addEventListener("click", refreshNow);

    // Track real user interaction so idle/background time isn't counted
    ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
      window.addEventListener(ev, bumpActivity, { passive: true }));

    // Listen to visibility changes to record session time
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") recordSession();
      else { sessionStartTs = Date.now(); lastActivityTs = Date.now(); }
    });
    window.addEventListener("beforeunload", recordSession);
    setInterval(recordSession, 30000);

    refreshTopbar();
    // If page was opened via a join link, skip onboarding — sync.js will set things up
    const isJoiningViaLink = /[#&?]join=/.test(location.hash + location.search);
    if (!Storage.isOnboarded() && !isJoiningViaLink) {
      Views.onboarding();
    } else {
      go("home");
    }
    // Data-loss watchdog: if a snapshot has noticeably more cards than current
    // local state, offer to restore automatically.
    setTimeout(detectDataLoss, 800);
  }

  // Compare current state with the largest snapshot. If current is empty (or
  // much smaller) and there's a richer snapshot, prompt the user to recover.
  function detectDataLoss() {
    try {
      const snaps = (Storage.getSnapshots && Storage.getSnapshots()) || [];
      const root = Storage.load();
      const currentCards = Storage.countCards ? Storage.countCards(root) : 0;
      const wasOnboarded = !!root.onboarded;
      // Find the biggest snapshot
      let best = null;
      snaps.forEach((s) => { if (!best || (s.cardCount || 0) > (best.cardCount || 0)) best = s; });
      // Only consider the baked LAST_KNOWN data on devices that have already
      // been onboarded (otherwise we'd be pushing someone else's progress at
      // a brand-new user).
      let lastKnownCards = 0;
      if (wasOnboarded && window.LAST_KNOWN_DATA) {
        Object.values(window.LAST_KNOWN_DATA.languages || {}).forEach((s) => {
          lastKnownCards += Object.keys((s && s.cards) || {}).length;
        });
      }
      const hasBigSnap = best && (best.cardCount || 0) > currentCards + 2;
      const hasBigLastKnown = lastKnownCards > currentCards + 2;
      if (!hasBigSnap && !hasBigLastKnown) return;
      if (window.__mumuRecoveryOffered) return;
      window.__mumuRecoveryOffered = true;
      const { el } = UI;
      const wrap = el("div", { class: "lang-picker" });
      wrap.appendChild(el("div", { class: "lang-picker-title", text: "🛟 Data recovery" }));
      wrap.appendChild(el("div", { class: "muted small", style:"line-height:1.5;",
        html: "Current state has <b>" + currentCards + "</b> cards. We found older state with more data — restore it?" }));
      if (hasBigSnap) {
        wrap.appendChild(el("button", { class: "btn primary big", text:
          "Restore snapshot (" + best.cardCount + " cards, " + new Date(best.at).toLocaleString() + ")", onclick: () => {
            const idx = snaps.indexOf(best);
            Storage.restoreSnapshot(idx);
            UI.closeModal();
            UI.toast("Restored ✨", "good");
            refreshTopbar();
            go("home");
        }}));
      }
      if (hasBigLastKnown) {
        wrap.appendChild(el("button", { class: "btn warn big", style:"margin-top:8px;", text:
          "Restore last-known data (" + lastKnownCards + " cards, baked in)", onclick: () => {
            // Only auto-backup if there's actually something to back up
            if (currentCards > 0) { try { Storage.downloadBackup(); } catch (e) {} }
            Storage.importData(JSON.stringify(window.LAST_KNOWN_DATA), /* merge */ true);
            UI.closeModal();
            UI.toast("Restored " + lastKnownCards + " cards ✨", "good");
            refreshTopbar();
            go("home");
        }}));
      }
      wrap.appendChild(el("button", { class: "btn ghost", style:"margin-top:8px;", text: "Skip", onclick: () => UI.closeModal() }));
      UI.modal(wrap);
    } catch (e) { console.warn("[mumu] data-loss detection failed", e); }
  }

  // 更新ボタン: クラウドから取り直し（push もしてから現在ビューを再描画）
  async function refreshNow() {
    const btn = document.getElementById("refresh-btn");
    if (btn) btn.classList.add("spinning");
    try {
      if (window.Storage && Storage.reload) Storage.reload();
      if (window.Sync && Sync.enabled && Sync.enabled()) {
        try { await Sync.pushNow(); } catch (e) {}
      }
      go(currentView);
      refreshTopbar();
    } finally {
      setTimeout(() => { if (btn) btn.classList.remove("spinning"); }, 600);
    }
  }

  // The meaning to display for a card. For the 俺 profile show the
  // Japanese gloss when available; everyone else sees English.
  function meaning(card) {
    if (!card) return "";
    if (Storage.getCurrentUser() === "me" && card.ja) return card.ja;
    return card.back || card.en || "";
  }

  return { init, go, showUnit, startLesson, refreshTopbar, refreshNow, speak, speakSlow, examplesFor, getLangPack, getLangMeta, allCards, cardById, meaning };
})();

document.addEventListener("DOMContentLoaded", App.init);
