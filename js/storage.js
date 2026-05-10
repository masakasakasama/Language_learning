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
      marks: {},   // self-assessment: cardId → "know" | "ok" | "dontknow"
      xp: 0,
      level: 1
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
  function setMark(cardId, mark, lang) {
    const st = langState(lang);
    st.marks = st.marks || {};
    if (mark == null) delete st.marks[cardId];
    else st.marks[cardId] = mark;
    save();
  }
  function getMark(cardId, lang) {
    const st = langState(lang);
    return (st.marks || {})[cardId] || null;
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

  function recordCard(correct, xp) {
    const root = load();
    const day = todayStr();
    if (!root.stats.byDate[day]) root.stats.byDate[day] = { mins: 0, cards: 0, correct: 0, lessons: 0, xp: 0 };
    root.stats.byDate[day].cards += 1;
    if (correct) root.stats.byDate[day].correct += 1;
    if (xp) root.stats.byDate[day].xp += xp;
    save();
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
    getLang, setLang, langState,
    getCard, setCard,
    isLearned, markLearned, learnedSet, forgetCard, cardStatus,
    setMark, getMark,
    lessonDone, markLessonDone,
    addXP, recordStudyTime, recordCard, recordLesson,
    bumpStreak, getStats, getStreak, getXPTotal,
    getStatsForRange, getCumulativeStats, todayStats,
    setOnboarded, isOnboarded, setTheme, getTheme
  };
})();
