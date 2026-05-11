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

    // Listen to visibility changes to record session time
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") recordSession();
    });
    window.addEventListener("beforeunload", recordSession);
    setInterval(recordSession, 30000);

    refreshTopbar();
    setupPullToRefresh();
    // If page was opened via a join link, skip onboarding — sync.js will set things up
    const isJoiningViaLink = /[#&?]join=/.test(location.hash + location.search);
    if (!Storage.isOnboarded() && !isJoiningViaLink) {
      Views.onboarding();
    } else {
      go("home");
    }
  }

  // ─────────────── Pull-to-refresh ───────────────
  // Swipe down from the top of the view → refresh the current screen and
  // push a cloud-sync update. Threshold is ~70px of pull distance.
  function setupPullToRefresh() {
    const view = document.getElementById("view");
    if (!view) return;
    const THRESHOLD = 70;
    let startY = null;
    let deltaY = 0;
    let active = false;
    let indicator = null;

    function ensureIndicator() {
      if (indicator) return indicator;
      indicator = document.createElement("div");
      indicator.className = "ptr-indicator";
      indicator.innerHTML = "↓";
      document.body.appendChild(indicator);
      return indicator;
    }
    function showIndicator(distance) {
      const ind = ensureIndicator();
      const visible = Math.min(distance, THRESHOLD * 1.6);
      ind.style.transition = "";
      ind.style.transform = `translate(-50%, ${visible}px)`;
      ind.style.opacity = String(Math.min(1, distance / THRESHOLD));
      if (distance >= THRESHOLD) {
        ind.classList.add("ptr-ready");
        ind.innerHTML = "↑";
      } else {
        ind.classList.remove("ptr-ready");
        ind.innerHTML = "↓";
      }
    }
    function hideIndicator() {
      if (!indicator) return;
      indicator.style.transition = "transform 0.25s ease, opacity 0.25s ease";
      indicator.style.transform = "translate(-50%, -60px)";
      indicator.style.opacity = "0";
    }
    function loadingIndicator() {
      const ind = ensureIndicator();
      ind.classList.remove("ptr-ready");
      ind.classList.add("ptr-loading");
      ind.innerHTML = "⟳";
      ind.style.transition = "transform 0.2s ease";
      ind.style.transform = "translate(-50%, 18px)";
      ind.style.opacity = "1";
    }
    function clearLoading() {
      if (!indicator) return;
      indicator.classList.remove("ptr-loading");
      hideIndicator();
    }

    async function doRefresh() {
      loadingIndicator();
      try {
        if (window.Storage && Storage.reload) Storage.reload();
        if (window.Sync && Sync.enabled && Sync.enabled()) {
          try { await Sync.pushNow(); } catch (e) {}
        }
        go(currentView, currentView === "browse" ? undefined : undefined);
        refreshTopbar();
      } finally {
        setTimeout(clearLoading, 350);
      }
    }

    view.addEventListener("touchstart", (e) => {
      // Only when scrolled to top and no modal is open
      const modalOpen = document.getElementById("modal-backdrop") &&
                        !document.getElementById("modal-backdrop").classList.contains("hidden");
      if (view.scrollTop > 0 || modalOpen) return;
      startY = e.touches[0].clientY;
      deltaY = 0;
      active = true;
    }, { passive: true });

    view.addEventListener("touchmove", (e) => {
      if (!active || startY == null) return;
      deltaY = e.touches[0].clientY - startY;
      if (deltaY > 0) {
        // Resist scroll bounce while pulling down
        if (e.cancelable) e.preventDefault();
        showIndicator(deltaY);
      } else {
        hideIndicator();
      }
    }, { passive: false });

    function endPull() {
      if (!active) return;
      active = false;
      if (deltaY >= THRESHOLD) {
        doRefresh();
      } else {
        hideIndicator();
      }
      startY = null;
      deltaY = 0;
    }
    view.addEventListener("touchend", endPull);
    view.addEventListener("touchcancel", endPull);
  }

  return { init, go, showUnit, startLesson, refreshTopbar, speak, speakSlow, examplesFor, getLangPack, getLangMeta, allCards, cardById };
})();

document.addEventListener("DOMContentLoaded", App.init);
