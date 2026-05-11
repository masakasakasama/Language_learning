// Main app controller: navigation, top bar, audio facade
window.App = (function () {
  let currentView = "home";
  let currentUnit = null;
  let currentLesson = null;
  let sessionStartTs = Date.now();

  function getLangPack(lang) {
    return ({ ja: window.DATA_JA, ko: window.DATA_KO, en: window.DATA_EN, es: window.DATA_ES })[lang || Storage.getLang()];
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

  function recordSession() {
    const seconds = (Date.now() - sessionStartTs) / 1000;
    if (seconds > 5) Storage.recordStudyTime(seconds);
    sessionStartTs = Date.now();
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
      // refresh whatever screen is open
      go(currentView);
    });
    window.addEventListener("mochi:auth-changed", () => {
      if (currentView === "profile") go("profile");
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
    window.addEventListener("mochi:joined-via-link", () => {
      Storage.reload();
      // If a modal is open (e.g. onboarding), close it
      if (UI && UI.closeModal) UI.closeModal();
      go("home");
      UI.toast("☁️ Sync linked! Your progress will appear in a moment.", "good");
    });

    // Bind nav
    document.querySelectorAll(".nav-btn").forEach((b) => {
      b.addEventListener("click", () => go(b.dataset.nav));
    });
    document.querySelector(".logo-btn").addEventListener("click", () => go("home"));
    document.getElementById("lang-switcher").addEventListener("click", () => Views.langPicker());
    const refreshBtn = document.getElementById("refresh-btn");
    if (refreshBtn) refreshBtn.addEventListener("click", refreshNow);

    // Listen to visibility changes to record session time
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") recordSession();
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

  return { init, go, showUnit, startLesson, refreshTopbar, refreshNow, speak, speakSlow, examplesFor, getLangPack, getLangMeta, allCards, cardById };
})();

document.addEventListener("DOMContentLoaded", App.init);
