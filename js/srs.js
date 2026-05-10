// Spaced Repetition (Anki-inspired SM-2 simplified)
window.SRS = (function () {
  const MIN_EASE = 1.3;
  const DEFAULT_EASE = 2.5;

  function todayDate() {
    const d = new Date();
    d.setHours(0,0,0,0);
    return d;
  }
  function addDays(d, n) {
    const r = new Date(d);
    r.setDate(r.getDate() + n);
    return r;
  }

  function defaultState() {
    return {
      ease: DEFAULT_EASE,
      interval: 0,
      due: todayDate().toISOString(),
      reps: 0,
      lapses: 0,
      last: null
    };
  }

  // Update card after review.
  // grade: "again" | "hard" | "good" | "easy"
  function review(state, grade) {
    state = state || defaultState();
    let { ease, interval, reps, lapses } = state;

    if (grade === "again") {
      interval = 0;       // due today (ten min effectively)
      ease = Math.max(MIN_EASE, ease - 0.2);
      lapses += 1;
      reps = 0;
    } else if (grade === "hard") {
      ease = Math.max(MIN_EASE, ease - 0.15);
      if (reps === 0) interval = 1;
      else interval = Math.max(1, Math.round(interval * 1.2));
      reps += 1;
    } else if (grade === "good") {
      if (reps === 0) interval = 1;
      else if (reps === 1) interval = 6;
      else interval = Math.round(interval * ease);
      reps += 1;
    } else if (grade === "easy") {
      if (reps === 0) interval = 4;
      else interval = Math.round(interval * ease * 1.3);
      ease += 0.15;
      reps += 1;
    }

    const due = addDays(todayDate(), interval).toISOString();
    return {
      ease, interval, reps, lapses, due,
      last: new Date().toISOString()
    };
  }

  function isDue(state) {
    if (!state) return true;
    return new Date(state.due).getTime() <= todayDate().getTime();
  }

  function dueCardIds(allCards, lang) {
    return allCards.filter((c) => {
      const st = Storage.getCard(c.id, lang);
      if (!st) return false;
      return isDue(st);
    }).map((c) => c.id);
  }

  function countDue(allCards, lang) {
    return allCards.reduce((acc, c) => {
      const st = Storage.getCard(c.id, lang);
      if (st && isDue(st)) acc += 1;
      return acc;
    }, 0);
  }

  function summary(state) {
    if (!state) return "new";
    if (state.interval === 0) return "learning";
    if (state.interval >= 21) return "mastered";
    return "review";
  }

  return {
    review, isDue, dueCardIds, countDue, summary, defaultState,
    DEFAULT_EASE, MIN_EASE
  };
})();
