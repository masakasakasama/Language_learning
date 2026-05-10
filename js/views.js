// Views render full screens into #view
window.Views = (function () {
  const { el, clear, mascot, progressBar, toast, confetti, shuffle, pickN } = UI;

  function getLangPack(lang) {
    return ({ ja: window.DATA_JA, ko: window.DATA_KO, en: window.DATA_EN, es: window.DATA_ES })[lang];
  }
  function getLangMeta(lang) { return DATA_LANGS[lang]; }

  // ─────────────── HOME ───────────────
  function home(viewEl) {
    clear(viewEl);
    const lang = Storage.getLang();
    const meta = getLangMeta(lang);
    const pack = getLangPack(lang);

    // Hero header
    const hero = el("div", { class: "hero" });
    hero.style.background = `linear-gradient(135deg, ${meta.color}33, transparent)`;

    hero.appendChild(el("div", { class: "hero-flag", text: meta.flag }));
    hero.appendChild(el("div", { class: "hero-title", text: meta.nativeName }));
    hero.appendChild(el("div", { class: "hero-sub", text: meta.description }));
    viewEl.appendChild(hero);

    // Daily goal progress
    const today = Storage.todayStats();
    const goalCards = 20;
    const goalPct = Math.min(100, (today.cards / goalCards) * 100);
    const goalCard = el("div", { class: "card daily-goal" }, [
      el("div", { class: "card-row" }, [
        el("div", { class: "muted", text: "Today's goal" }),
        el("div", { class: "muted", text: `${today.cards}/${goalCards} cards` })
      ]),
      progressBar(goalPct, "linear-gradient(90deg,#a8e6a3,#7dd3fc)")
    ]);
    viewEl.appendChild(goalCard);

    // Mascot greeting
    const due = SRS.countDue(pack.ALL_CARDS, lang);
    let mood = "happy";
    let bubble = "Let's learn some " + meta.name + "! 💖";
    if (due > 0) { mood = "thinking"; bubble = `You have <b>${due}</b> card${due===1?"":"s"} to review. 🔄`; }
    if (today.cards >= goalCards) { mood = "proud"; bubble = "Daily goal reached! ✨"; }
    viewEl.appendChild(mascot(mood, bubble));

    // Levels with units
    meta.levels.forEach((lv) => {
      const lvUnits = pack.UNITS.filter((u) => u.level === lv.id);
      if (!lvUnits.length) return;
      // Level header
      const lvHeader = el("div", { class: "level-header" }, [
        el("div", { class: "level-badge", text: lv.name, style: `background:${lv.color}` }),
        el("div", { class: "level-info" }, [
          el("div", { class: "level-title", text: lv.subtitle }),
          el("div", { class: "level-desc", text: lv.desc })
        ])
      ]);
      viewEl.appendChild(lvHeader);

      // Units (path-like)
      const path = el("div", { class: "unit-path" });
      lvUnits.forEach((unit, idx) => {
        const total = unit.lessons.length;
        const done = unit.lessons.filter((l) => Storage.lessonDone(l.id, lang)).length;
        const pct = total ? Math.round((done / total) * 100) : 0;
        const isComplete = done === total;
        const node = el("div", { class: "unit-node " + (isComplete ? "complete" : "") });
        node.style.setProperty("--unit-color", unit.color);
        node.appendChild(el("div", { class: "unit-icon", text: unit.icon, style: `background:${unit.color}` }));
        node.appendChild(el("div", { class: "unit-meta" }, [
          el("div", { class: "unit-title", text: unit.title }),
          el("div", { class: "unit-progress" }, [
            progressBar(pct, `linear-gradient(90deg, ${unit.color}, #ffffffaa)`),
            el("div", { class: "unit-progress-text", text: `${done}/${total}` })
          ])
        ]));
        node.onclick = () => App.showUnit(unit);
        path.appendChild(node);
        // alternate offset for path zig-zag
        if (idx % 4 === 1) node.style.marginLeft = "10%";
        else if (idx % 4 === 2) node.style.marginLeft = "20%";
        else if (idx % 4 === 3) node.style.marginLeft = "10%";
      });
      viewEl.appendChild(path);
    });
  }

  // ─────────────── UNIT (modal-like card list) ───────────────
  function unit(viewEl, unit) {
    clear(viewEl);
    const lang = Storage.getLang();
    const meta = getLangMeta(lang);

    const back = el("button", { class: "btn ghost", onclick: () => App.go("home") }, ["← Back"]);
    viewEl.appendChild(back);

    const head = el("div", { class: "unit-detail-head" });
    head.appendChild(el("div", { class: "unit-icon big", text: unit.icon, style: `background:${unit.color}` }));
    head.appendChild(el("div", {}, [
      el("div", { class: "unit-detail-title", text: unit.title }),
      el("div", { class: "muted", text: meta.nativeName + " · " + unit.level })
    ]));
    viewEl.appendChild(head);

    const list = el("div", { class: "lesson-list" });
    unit.lessons.forEach((lesson, idx) => {
      const done = Storage.lessonDone(lesson.id, lang);
      const item = el("button", { class: "lesson-item " + (done ? "done" : "") });
      const icon = lesson.type === "grammar" ? "📘" : lesson.type === "quiz" ? "🎯" : "✨";
      item.appendChild(el("div", { class: "lesson-icon", text: icon }));
      item.appendChild(el("div", {}, [
        el("div", { class: "lesson-title", text: lesson.title }),
        el("div", { class: "muted small", text: done ? "Completed ✓" : `Lesson ${idx+1}` })
      ]));
      item.appendChild(el("div", { class: "lesson-go", text: done ? "Practice" : "Start →" }));
      item.onclick = () => App.startLesson(unit, lesson);
      list.appendChild(item);
    });
    viewEl.appendChild(list);
  }

  // ─────────────── LESSON RUNNER ───────────────
  function lesson(viewEl, unit, lesson) {
    clear(viewEl);
    const lang = Storage.getLang();
    const pack = getLangPack(lang);

    const totalSteps = lesson.type === "flashcards" ? lesson.cards.length * 2 // intro + practice
                     : lesson.type === "grammar"     ? 1 + (pack.grammarById(lesson.grammarId)?.quiz?.length || 0)
                     : lesson.cards.length;

    let stepIdx = 0;
    let correctCount = 0;
    let mistakes = []; // cards to retry at end

    // Header
    const head = el("div", { class: "lesson-head" });
    const exitBtn = el("button", { class: "btn ghost", onclick: () => App.go("home") }, ["✕"]);
    const progressWrap = el("div", { class: "lesson-progress-wrap" });
    const progress = progressBar(0, "linear-gradient(90deg,#a8e6a3,#7dd3fc)");
    progressWrap.appendChild(progress);
    const counterEl = el("div", { class: "lesson-hearts", text: "0/" + totalSteps });
    head.appendChild(exitBtn);
    head.appendChild(progressWrap);
    head.appendChild(counterEl);
    viewEl.appendChild(head);

    const stage = el("div", { class: "lesson-stage" });
    viewEl.appendChild(stage);

    function bumpProgress() {
      const fill = progress.querySelector(".progress-fill");
      fill.style.width = Math.min(100, (stepIdx / totalSteps) * 100) + "%";
      counterEl.textContent = `${Math.min(stepIdx, totalSteps)}/${totalSteps}`;
    }

    // Build steps
    const steps = [];
    if (lesson.type === "flashcards") {
      const pool = lesson.cards;
      lesson.cards.forEach((c) => {
        steps.push({ kind: "intro", card: c });
        steps.push({ kind: "practice", card: c, pool });
      });
    } else if (lesson.type === "quiz") {
      const pool = lesson.cards;
      // mix MC, listening, typing
      lesson.cards.forEach((c, i) => {
        const kind = i % 3 === 0 ? "listen" : i % 3 === 1 ? "type" : "mc";
        steps.push({ kind, card: c, pool });
      });
    } else if (lesson.type === "grammar") {
      const g = pack.grammarById(lesson.grammarId);
      steps.push({ kind: "grammar-intro", grammar: g });
      g.quiz.forEach((q) => steps.push({ kind: "grammar-quiz", quiz: q }));
    }

    function nextStep() {
      bumpProgress();
      if (stepIdx >= steps.length) {
        if (mistakes.length) {
          // append retry block
          mistakes.forEach((c) => steps.push({ kind: "mc", card: c, pool: lesson.cards || [c] }));
          mistakes = [];
          stepIdx = stepIdx; // continue with new steps
        } else {
          finish();
          return;
        }
      }
      const step = steps[stepIdx++];
      runStep(step);
    }

    function runStep(step) {
      if (step.kind === "intro") {
        // Mark first-seen
        if (!Storage.isLearned(step.card.id, lang)) Storage.markLearned(step.card.id, lang);
        const examples = App.examplesFor(step.card.id, lang);
        Exercises.renderIntro(step.card, stage, () => {
          handleAnswer(true, step.card, /*xp*/2);
        }, examples);
      } else if (step.kind === "practice" || step.kind === "mc") {
        // pool = other cards in lesson + same-deck cards from data for distractors
        const pool = combinedPool(step.pool, step.card, lang);
        const ex = Exercises.buildMultipleChoice(step.card, pool, "front-to-back");
        Exercises.renderMC(ex, stage, (correct) => {
          handleAnswer(correct, step.card);
        });
      } else if (step.kind === "listen") {
        const pool = combinedPool(step.pool, step.card, lang);
        const ex = Exercises.buildListening(step.card, pool);
        Exercises.renderListen(ex, stage, (correct) => {
          handleAnswer(correct, step.card);
        });
      } else if (step.kind === "type") {
        const ex = Exercises.buildTyping(step.card);
        Exercises.renderTyping(ex, stage, (correct) => {
          handleAnswer(correct, step.card);
        });
      } else if (step.kind === "grammar-intro") {
        Exercises.renderGrammar(step.grammar, stage, () => {
          stepIdx = stepIdx; // already advanced
          nextStep();
        });
      } else if (step.kind === "grammar-quiz") {
        Exercises.renderGrammarQuiz(step.quiz, stage, (correct) => {
          handleAnswer(correct, null, 3);
        });
      }
    }

    function handleAnswer(correct, card, xpOverride) {
      if (card && !Storage.isLearned(card.id, lang)) Storage.markLearned(card.id, lang);
      if (correct) {
        correctCount += 1;
        const xp = xpOverride != null ? xpOverride : 5;
        Storage.addXP(xp, lang);
        Storage.recordCard(true, xp);
        if (card) {
          const old = Storage.getCard(card.id, lang);
          const ns = SRS.review(old, "good");
          Storage.setCard(card.id, ns, lang);
        }
      } else {
        Storage.recordCard(false, 0);
        if (card) {
          const old = Storage.getCard(card.id, lang);
          const ns = SRS.review(old, "again");
          Storage.setCard(card.id, ns, lang);
          mistakes.push(card);
        }
      }
      App.refreshTopbar();
      setTimeout(nextStep, 100);
    }

    function finish() {
      Storage.markLessonDone(lesson.id, lang);
      Storage.bumpStreak();
      Storage.recordLesson(10);
      Storage.addXP(10, lang);
      App.refreshTopbar();
      confetti();
      clear(stage);
      const wrap = el("div", { class: "lesson-finish" });
      wrap.appendChild(mascot("proud", "Lesson complete! ✨"));
      const summary = el("div", { class: "card finish-summary" });
      summary.appendChild(el("div", { class: "fs-row" }, [el("span", { text: "XP earned" }), el("b", { text: "+" + (10 + correctCount * 5) })]));
      summary.appendChild(el("div", { class: "fs-row" }, [el("span", { text: "Correct" }), el("b", { text: correctCount + "" })]));
      const streak = Storage.getStreak();
      summary.appendChild(el("div", { class: "fs-row" }, [el("span", { text: "Streak" }), el("b", { text: streak.current + " 🔥" })]));
      wrap.appendChild(summary);
      const home = el("button", { class: "btn primary big", onclick: () => App.go("home"), text: "Home" });
      wrap.appendChild(home);
      stage.appendChild(wrap);
    }

    function combinedPool(localPool, target, lang) {
      const pack = getLangPack(lang);
      // include all language cards but prefer same deck
      const deckMates = pack.ALL_CARDS.filter((c) => c.deck === target.deck && c.id !== target.id);
      if (deckMates.length >= 4) return deckMates;
      // augment with other cards
      const others = pack.ALL_CARDS.filter((c) => c.id !== target.id && !deckMates.includes(c));
      return deckMates.concat(others.slice(0, 12));
    }

    nextStep();
  }

  // ─────────────── REVIEW ───────────────
  function review(viewEl) {
    clear(viewEl);
    const lang = Storage.getLang();
    const pack = getLangPack(lang);
    const dueIds = SRS.dueCardIds(pack.ALL_CARDS, lang);

    if (!dueIds.length) {
      viewEl.appendChild(mascot("happy", "No cards due! 🎉<br>Come back tomorrow."));
      const btn = el("button", { class: "btn primary big", text: "Back to Learn", onclick: () => App.go("home") });
      viewEl.appendChild(btn);
      return;
    }

    const cards = shuffle(dueIds.map((id) => pack.cardById(id)).filter(Boolean));
    let idx = 0, correct = 0;
    const head = el("div", { class: "lesson-head" });
    const exitBtn = el("button", { class: "btn ghost", onclick: () => App.go("home") }, ["✕"]);
    const progressWrap = el("div", { class: "lesson-progress-wrap" });
    const progress = progressBar(0, "linear-gradient(90deg,#a8e6a3,#7dd3fc)");
    progressWrap.appendChild(progress);
    const counter = el("div", { class: "lesson-hearts", text: `0/${cards.length}` });
    head.appendChild(exitBtn);
    head.appendChild(progressWrap);
    head.appendChild(counter);
    viewEl.appendChild(head);

    const stage = el("div", { class: "lesson-stage" });
    viewEl.appendChild(stage);

    function next() {
      counter.textContent = `${idx}/${cards.length}`;
      const fill = progress.querySelector(".progress-fill");
      fill.style.width = Math.min(100, (idx / cards.length) * 100) + "%";
      if (idx >= cards.length) {
        Storage.bumpStreak();
        Storage.addXP(correct * 5, lang);
        confetti();
        clear(stage);
        const wrap = el("div", { class: "lesson-finish" });
        wrap.appendChild(mascot("proud", `Review complete! ${correct}/${cards.length}`));
        wrap.appendChild(el("button", { class: "btn primary big", text: "Home", onclick: () => App.go("home") }));
        stage.appendChild(wrap);
        return;
      }
      const card = cards[idx++];
      const pool = pack.ALL_CARDS.filter((c) => c.deck === card.deck && c.id !== card.id);
      const ex = Exercises.buildMultipleChoice(card, pool.length >= 4 ? pool : pack.ALL_CARDS, "front-to-back");
      Exercises.renderMC(ex, stage, (ok) => {
        const old = Storage.getCard(card.id, lang);
        const ns = SRS.review(old, ok ? "good" : "again");
        Storage.setCard(card.id, ns, lang);
        Storage.recordCard(ok, ok ? 5 : 0);
        if (ok) correct += 1;
        App.refreshTopbar();
        setTimeout(next, 80);
      });
    }
    next();
  }

  // ─────────────── BROWSE ───────────────
  // Browse takes optional opts: { initialFilter, initialLevel }
  function browse(viewEl, opts) {
    clear(viewEl);
    const lang = Storage.getLang();
    const meta = getLangMeta(lang);
    const pack = getLangPack(lang);
    opts = opts || {};

    viewEl.appendChild(el("div", { class: "view-title", text: meta.nativeName + " — Browse" }));

    // Status filter chips — self-marks first, then SRS status
    const filters = [
      { id: "all",       label: "All",         desc: "Everything in this level" },
      { id: "know",      label: "😀 Know",      desc: "Marked as known" },
      { id: "ok",        label: "😐 OK",        desc: "Marked as so-so" },
      { id: "dontknow",  label: "😕 Hard",      desc: "Marked as hard" },
      { id: "unmarked",  label: "Unmarked",    desc: "No self-mark yet" },
      { id: "learning",  label: "Learning",    desc: "SRS: still in early intervals" },
      { id: "mastered",  label: "Mastered",    desc: "SRS: interval ≥ 21 days" },
      { id: "untouched", label: "Not started", desc: "Never reviewed" }
    ];
    let activeFilter = opts.initialFilter || "all";
    const filterRow = el("div", { class: "filter-row" });
    filters.forEach((f) => {
      const chip = el("button", { class: "filter-chip" + (f.id === activeFilter ? " active" : ""), text: f.label, title: f.desc });
      chip.onclick = () => {
        activeFilter = f.id;
        filterRow.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        renderLevel();
      };
      filterRow.appendChild(chip);
    });
    viewEl.appendChild(filterRow);

    // Level tabs
    const tabs = el("div", { class: "level-tabs" });
    let activeLevel = opts.initialLevel || meta.levels[0].id;
    meta.levels.forEach((lv) => {
      const tab = el("button", { class: "level-tab" + (lv.id === activeLevel ? " active" : ""), text: lv.name, style: `--lc:${lv.color}` });
      tab.onclick = () => {
        activeLevel = lv.id;
        tabs.querySelectorAll(".level-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        renderLevel();
      };
      tabs.appendChild(tab);
    });
    viewEl.appendChild(tabs);

    // Summary
    const summary = el("div", { class: "muted small browse-summary" });
    viewEl.appendChild(summary);

    const list = el("div");
    viewEl.appendChild(list);

    function passesFilter(c) {
      const status = Storage.cardStatus(c.id, lang);
      const mark = Storage.getMark(c.id, lang);
      if (activeFilter === "all") return true;
      if (activeFilter === "know")     return mark === "know";
      if (activeFilter === "ok")       return mark === "ok";
      if (activeFilter === "dontknow") return mark === "dontknow";
      if (activeFilter === "unmarked") return !mark;
      if (activeFilter === "learning") return status === "learning" || status === "new";
      if (activeFilter === "mastered") return status === "mastered";
      if (activeFilter === "untouched") return status === "untouched";
      return true;
    }

    function statusDot(status) {
      const map = {
        untouched: { c: "dot-gray",   t: "Not started" },
        new:       { c: "dot-blue",   t: "New" },
        learning:  { c: "dot-orange", t: "Learning" },
        review:    { c: "dot-yellow", t: "Reviewing" },
        mastered:  { c: "dot-green",  t: "Mastered" }
      }[status] || { c: "dot-gray", t: status };
      return el("span", { class: "status-dot " + map.c, title: map.t });
    }

    function renderLevel() {
      clear(list);
      const units = pack.UNITS.filter((u) => u.level === activeLevel);
      if (!units.length) {
        list.appendChild(el("div", { class: "muted center", text: "No content for this level yet." }));
        summary.textContent = "";
        return;
      }
      let totalShown = 0, totalAll = 0;
      units.forEach((unit) => {
        // unique cards across lessons
        const cardsSet = new Map();
        unit.lessons.forEach((l) => (l.cards || []).forEach((c) => cardsSet.set(c.id, c)));
        const cards = [...cardsSet.values()];
        totalAll += cards.length;
        const filtered = cards.filter(passesFilter);
        if (!filtered.length) return;
        totalShown += filtered.length;

        const block = el("div", { class: "browse-unit card" });
        block.appendChild(el("div", { class: "browse-unit-head" }, [
          el("div", { class: "unit-icon small", text: unit.icon, style: `background:${unit.color}` }),
          el("div", { class: "browse-unit-title", text: unit.title }),
          el("div", { class: "muted small", style: "margin-left:auto;", text: filtered.length + "/" + cards.length })
        ]));

        const grid = el("div", { class: "browse-grid" });
        filtered.forEach((c) => {
          const status = Storage.cardStatus(c.id, lang);
          const mark = Storage.getMark(c.id, lang);
          const item = el("div", { class: "browse-card status-" + status + (mark ? " mark-" + mark : "") });
          item.appendChild(statusDot(status));
          const body = el("button", { class: "browse-card-body" });
          body.appendChild(el("div", { class: "bc-front", text: c.front || c.jp }));
          body.appendChild(el("div", { class: "bc-back", text: c.back || c.en }));
          if (c.de) body.appendChild(el("div", { class: "bc-back tr-de", text: c.de }));
          if (c.kana && c.kana !== c.front) body.appendChild(el("div", { class: "bc-hint", text: c.kana }));
          body.onclick = () => showWordDetail(c, lang, () => renderLevel());
          item.appendChild(body);
          item.appendChild(markRow(c.id, lang, mark, () => renderLevel()));
          grid.appendChild(item);
        });
        block.appendChild(grid);
        list.appendChild(block);
      });
      summary.textContent = `Showing ${totalShown} of ${totalAll} cards · ${activeFilter}`;
    }
    renderLevel();
  }

  // 3-button self-assessment row (😀 know / 😐 ok / 😕 don't know).
  // Tapping the active mark un-marks (toggle).
  function markRow(cardId, lang, currentMark, onChange) {
    const row = el("div", { class: "mark-row" });
    const opts = [
      { id: "know",     icon: "😀", title: "I know this" },
      { id: "ok",       icon: "😐", title: "Kind of" },
      { id: "dontknow", icon: "😕", title: "Hard / don't know" }
    ];
    opts.forEach((o) => {
      const isActive = currentMark === o.id;
      const btn = el("button", {
        class: "mark-btn mark-" + o.id + (isActive ? " active" : ""),
        title: o.title,
        text: o.icon
      });
      btn.onclick = (e) => {
        e.stopPropagation();
        Storage.setMark(cardId, isActive ? null : o.id, lang);
        if (onChange) onChange();
      };
      row.appendChild(btn);
    });
    return row;
  }

  function showWordDetail(card, lang, onChange) {
    const status = Storage.cardStatus(card.id, lang);
    const srs = Storage.getCard(card.id, lang);
    const wrap = el("div", { class: "word-detail" });

    wrap.appendChild(el("div", { class: "wd-front", text: card.front || card.jp }));
    if (card.kana && card.kana !== card.front) wrap.appendChild(el("div", { class: "wd-kana", text: card.kana }));
    if (card.romaji && card.romaji !== card.kana) wrap.appendChild(el("div", { class: "wd-romaji", text: card.romaji }));
    wrap.appendChild(el("div", { class: "wd-back" }, [
      el("span", { class: "tr-en", text: card.back || card.en }),
      card.de ? el("span", { class: "tr-de", text: card.de }) : null
    ]));
    if (card.hint) wrap.appendChild(el("div", { class: "wd-hint", text: card.hint }));

    wrap.appendChild(el("button", { class: "btn ghost big", text: "🔊 Listen", onclick: () => App.speak(card.speakText) }));

    // Self-assessment block — visible 3-button row
    const currentMark = Storage.getMark(card.id, lang);
    const markBlock = el("div", { class: "wd-mark-block" });
    markBlock.appendChild(el("div", { class: "wd-mark-label", text: "How well do you know this?" }));
    const bigRow = el("div", { class: "mark-row mark-row-big" });
    [
      { id: "know",     icon: "😀", label: "Easy" },
      { id: "ok",       icon: "😐", label: "OK" },
      { id: "dontknow", icon: "😕", label: "Hard" }
    ].forEach((o) => {
      const isActive = currentMark === o.id;
      const btn = el("button", { class: "mark-btn mark-btn-big mark-" + o.id + (isActive ? " active" : "") }, [
        el("div", { class: "mark-icon", text: o.icon }),
        el("div", { class: "mark-label-txt", text: o.label })
      ]);
      btn.onclick = () => {
        Storage.setMark(card.id, isActive ? null : o.id, lang);
        UI.closeModal();
        showWordDetail(card, lang, onChange);
        if (onChange) onChange();
      };
      bigRow.appendChild(btn);
    });
    markBlock.appendChild(bigRow);
    wrap.appendChild(markBlock);

    // Status panel
    const statusBlock = el("div", { class: "wd-status" });
    const statusLabel = {
      untouched: "Not started",
      new: "New (just introduced)",
      learning: "Learning",
      review: "In review rotation",
      mastered: "Mastered ✨"
    }[status] || status;
    statusBlock.appendChild(el("div", { class: "wd-row" }, [el("span", { text: "Status" }), el("b", { text: statusLabel })]));
    if (srs) {
      const due = new Date(srs.due);
      const today = new Date(); today.setHours(0,0,0,0);
      const days = Math.round((due - today) / 86400000);
      const dueText = days <= 0 ? "today" : (days + " day" + (days === 1 ? "" : "s"));
      statusBlock.appendChild(el("div", { class: "wd-row" }, [el("span", { text: "Next review" }), el("b", { text: dueText })]));
      statusBlock.appendChild(el("div", { class: "wd-row" }, [el("span", { text: "Interval" }), el("b", { text: srs.interval + " day" + (srs.interval === 1 ? "" : "s") })]));
      statusBlock.appendChild(el("div", { class: "wd-row" }, [el("span", { text: "Reps" }), el("b", { text: String(srs.reps) })]));
      statusBlock.appendChild(el("div", { class: "wd-row" }, [el("span", { text: "Lapses" }), el("b", { text: String(srs.lapses) })]));
      statusBlock.appendChild(el("div", { class: "wd-row" }, [el("span", { text: "Ease" }), el("b", { text: srs.ease.toFixed(2) })]));
    }
    wrap.appendChild(statusBlock);

    // Forget button — only meaningful if there is something to forget
    if (status !== "untouched") {
      const forgetBtn = el("button", { class: "btn warn big", text: "🗑 Forget this word", onclick: () => {
        if (!confirm("Forget \"" + (card.front || card.jp) + "\"? Its SRS progress will be cleared and it will reappear as new.")) return;
        Storage.forgetCard(card.id, lang);
        UI.closeModal();
        UI.toast("Removed from learned set", "good");
        if (onChange) onChange();
        App.refreshTopbar();
      }});
      wrap.appendChild(forgetBtn);
    }

    wrap.appendChild(el("button", { class: "btn ghost", text: "Close", onclick: () => UI.closeModal() }));
    UI.modal(wrap);
  }

  // ─────────────── PROFILE / STATS ───────────────
  function profile(viewEl) {
    clear(viewEl);
    const lang = Storage.getLang();
    const meta = getLangMeta(lang);
    const lst = Storage.langState(lang);
    const today = Storage.todayStats();
    const cum = Storage.getCumulativeStats();
    const streak = Storage.getStreak();
    const range7 = Storage.getStatsForRange(7);
    const range30 = Storage.getStatsForRange(30);

    // Header with mascot + language
    viewEl.appendChild(mascot("hi", `Hi! Tracking your <b>${meta.nativeName}</b> progress 💖`));

    // Today summary card (Anki-like)
    const todayCard = el("div", { class: "card stat-today" });
    todayCard.appendChild(el("div", { class: "muted", text: "Today" }));
    todayCard.appendChild(el("div", { class: "stat-big", text: Math.round(today.mins) + " min" }));
    const grid = el("div", { class: "stat-grid" });
    grid.appendChild(statBlock("Cards reviewed", today.cards));
    grid.appendChild(statBlock("Lessons", today.lessons));
    grid.appendChild(statBlock("Accuracy", today.cards ? Math.round((today.correct/today.cards)*100) + "%" : "—"));
    grid.appendChild(statBlock("XP today", today.xp));
    todayCard.appendChild(grid);
    viewEl.appendChild(todayCard);

    // Last 7 days bar chart
    const chartCard = el("div", { class: "card stat-chart" });
    chartCard.appendChild(el("div", { class: "stat-row" }, [
      el("div", { class: "muted", text: "Last 7 days" }),
      el("div", {}, [el("span", { class: "muted", text: "Streak " }), el("b", { class: "accent", text: streak.current + " " }), el("span", { text: "days 🔥" })])
    ]));
    const max7 = Math.max(1, ...range7.map((r) => r.cards));
    const bars = el("div", { class: "bars" });
    range7.forEach((r) => {
      const h = Math.round((r.cards / max7) * 100);
      const bar = el("div", { class: "bar-wrap" });
      const colHeight = Math.max(2, h);
      bar.appendChild(el("div", { class: "bar-col", style: `height:${colHeight}%; background: linear-gradient(180deg, ${meta.color}, #7dd3fc88)` }));
      bar.appendChild(el("div", { class: "bar-label", text: dayShort(r.day) }));
      bars.appendChild(bar);
    });
    chartCard.appendChild(bars);
    viewEl.appendChild(chartCard);

    // Last 30 day heatmap
    const heatCard = el("div", { class: "card stat-heat" });
    heatCard.appendChild(el("div", { class: "stat-row" }, [
      el("div", { class: "muted", text: "Last 30 days" }),
      el("div", { class: "muted small", text: "less ▢ ■ more" })
    ]));
    const heat = el("div", { class: "heatmap" });
    const max30 = Math.max(1, ...range30.map((r) => r.cards));
    range30.forEach((r) => {
      const ratio = r.cards / max30;
      let lvl = 0;
      if (r.cards > 0) lvl = 1;
      if (ratio > 0.25) lvl = 2;
      if (ratio > 0.5) lvl = 3;
      if (ratio > 0.75) lvl = 4;
      const cell = el("div", { class: "heat-cell heat-l" + lvl, title: `${r.date}: ${r.cards} cards` });
      heat.appendChild(cell);
    });
    heatCard.appendChild(heat);
    viewEl.appendChild(heatCard);

    // Cumulative
    const cumCard = el("div", { class: "card stat-cum" });
    cumCard.appendChild(el("div", { class: "muted", text: "All-time" }));
    const cumGrid = el("div", { class: "stat-grid" });
    cumGrid.appendChild(statBlock("Total minutes", Math.round(cum.totalMins)));
    cumGrid.appendChild(statBlock("Total cards", cum.totalCards));
    cumGrid.appendChild(statBlock("Lessons done", cum.totalLessons));
    cumGrid.appendChild(statBlock("Total XP", cum.totalXp));
    cumGrid.appendChild(statBlock("Active days", cum.daysActive));
    cumGrid.appendChild(statBlock("Longest streak", streak.longest + " 🔥"));
    cumCard.appendChild(cumGrid);
    viewEl.appendChild(cumCard);

    // Per-language progress overview (cards seen / mastered)
    const pack = getLangPack(lang);
    let mastered = 0, learning = 0, seen = 0;
    pack.ALL_CARDS.forEach((c) => {
      const st = Storage.getCard(c.id, lang);
      if (st) {
        seen += 1;
        if (st.interval >= 21) mastered += 1;
        else learning += 1;
      }
    });
    const learnCard = el("div", { class: "card stat-cum" });
    learnCard.appendChild(el("div", { class: "muted", text: meta.nativeName + " — Word progress" }));
    const lg = el("div", { class: "stat-grid" });
    lg.appendChild(statBlock("Words seen", `${seen}/${pack.ALL_CARDS.length}`));
    lg.appendChild(statBlock("Learning", learning));
    lg.appendChild(statBlock("Mastered", mastered));
    learnCard.appendChild(lg);
    learnCard.appendChild(progressBar((seen / pack.ALL_CARDS.length) * 100, `linear-gradient(90deg, ${meta.color}, #7dd3fc)`));
    const wordLinks = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;" }, [
      el("button", { class: "btn ghost", text: "📖 Show learned", onclick: () => App.go("browse", { initialFilter: "learned" }) }),
      el("button", { class: "btn ghost", text: "🌟 Show mastered", onclick: () => App.go("browse", { initialFilter: "mastered" }) })
    ]);
    learnCard.appendChild(wordLinks);
    viewEl.appendChild(learnCard);

    // Cloud sync
    viewEl.appendChild(syncCard());

    // Settings
    const settings = el("div", { class: "card settings" });
    settings.appendChild(el("div", { class: "muted", text: "Settings" }));
    const themeBtn = el("button", { class: "btn ghost", text: Storage.getTheme() === "dark" ? "🌙 Dark mode" : "☀️ Light mode", onclick: () => {
      const t = Storage.getTheme() === "dark" ? "light" : "dark";
      Storage.setTheme(t);
      document.body.classList.toggle("dark", t === "dark");
      App.go("profile");
    }});
    settings.appendChild(themeBtn);
    const resetBtn = el("button", { class: "btn warn", text: "Reset all progress", onclick: () => {
      if (confirm("Reset all progress for all languages? This can't be undone.")) {
        Storage.reset();
        App.refreshTopbar();
        App.go("home");
      }
    }});
    settings.appendChild(resetBtn);
    viewEl.appendChild(settings);

    // Storage info note
    const info = el("div", { class: "card storage-info muted small" });
    info.innerHTML = "Your progress, SRS state, learned words, hearts and stats are stored locally in <b>localStorage</b> under the key <code>mochi.v1</code>. Nothing leaves your device.";
    viewEl.appendChild(info);
  }

  function syncCard() {
    const card = el("div", { class: "card sync-card" });
    card.appendChild(el("div", { class: "card-row" }, [
      el("div", {}, [
        el("div", { text: "☁️ Cloud sync", style: "font-weight:700;" }),
        el("div", { class: "muted small", text: "Sync your progress across phone & desktop" })
      ]),
      el("div", { class: "sync-status", id: "sync-status-pill" })
    ]));
    refreshSyncPill();

    if (!window.Sync || !window.Sync.isConfigured()) {
      const row = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;" }, [
        el("button", { class: "btn primary", text: "Set up sync", onclick: showSyncSetup }),
        el("button", { class: "btn ghost", text: "I have a code", onclick: showJoinByCode })
      ]);
      card.appendChild(row);
      const help = el("div", { class: "muted small", style: "margin-top:8px;line-height:1.5;",
        html: "Free with your own Firebase project. After setup, just copy a sync code into your other device — no Google login required." });
      card.appendChild(help);
      return card;
    }

    // Configured
    const mode = window.Sync.getMode();
    if (mode === "code") {
      const code = window.Sync.getCode();
      const joinLink = window.Sync.buildJoinLink();
      const codeWrap = el("div", { class: "sync-code-wrap" });
      codeWrap.appendChild(el("div", { class: "muted small", text: "Send this link to your other device — opening it auto-syncs, no setup needed." }));
      codeWrap.appendChild(el("div", { class: "sync-code", text: shortenLink(joinLink) }));
      codeWrap.appendChild(el("div", { class: "muted small", style:"margin-top:6px;", text: "Sync code: " + (code || "—") }));
      const buttons = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;" }, [
        el("button", { class: "btn primary", text: "📋 Copy join link", onclick: async () => {
          if (!joinLink) return;
          try { await navigator.clipboard.writeText(joinLink); toast("Link copied! Send it to your other device.", "good"); }
          catch (e) { toast("Copy failed — long-press to copy.", "bad"); }
        }}),
        el("button", { class: "btn ghost", text: "📱 Show QR", onclick: () => showQR(joinLink) }),
        navigator.share ? el("button", { class: "btn ghost", text: "↗ Share…", onclick: async () => {
          try { await navigator.share({ title: "Mochi sync", text: "Open this on Mochi to sync our progress", url: joinLink }); }
          catch (e) {/* user cancelled */}
        }}) : null,
        el("button", { class: "btn ghost", text: "Force sync", onclick: () => window.Sync.pushNow() })
      ]);
      card.appendChild(codeWrap);
      card.appendChild(buttons);
    } else {
      // user mode (Google)
      const user = window.Sync.user();
      if (user) {
        const info = el("div", { class: "sync-user" }, [
          el("div", { text: user.displayName || user.email || "Signed in" }),
          el("div", { class: "muted small", text: user.uid.slice(0, 12) + "…" })
        ]);
        card.appendChild(info);
        const row = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;" }, [
          el("button", { class: "btn ghost", text: "Force sync", onclick: () => window.Sync.pushNow() }),
          el("button", { class: "btn ghost", text: "Sign out", onclick: async () => { await window.Sync.signOut(); App.go("profile"); } })
        ]);
        card.appendChild(row);
      } else {
        const row = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;" }, [
          el("button", { class: "btn primary", text: "Sign in with Google", onclick: async () => {
            try { await window.Sync.signInGoogle(); App.go("profile"); }
            catch (e) { toast("Sign-in failed: " + e.message, "bad"); }
          }})
        ]);
        card.appendChild(row);
      }
    }
    // Help block: permanent Firestore rules (test mode expires after 30 days)
    const help = el("details", { class: "sync-help" });
    help.appendChild(el("summary", { text: "ℹ️ Test mode expires in 30 days — permanent Firestore rules" }));
    const rules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /sync/{code}/{document=**} {
      allow read, write: if true;
    }
  }
}`;
    const pre = el("pre", { class: "sync-rules", text: rules });
    help.appendChild(pre);
    help.appendChild(el("button", { class: "btn ghost", text: "📋 Copy rules", onclick: async () => {
      try { await navigator.clipboard.writeText(rules); toast("Copied. Paste in Firebase Console → Firestore → Rules.", "good"); }
      catch (e) { toast("Copy failed — long-press to select.", "bad"); }
    }}));
    help.appendChild(el("div", { class: "muted small", style:"margin-top:6px;line-height:1.5;",
      html: "Open <b>Firebase Console → Firestore Database → Rules</b>, paste the rules above, then Publish. Your sync code (16 random characters) acts as the password — only people with the link can access this document." }));
    card.appendChild(help);

    const reset = el("button", { class: "btn warn ghost", style: "margin-top:8px;", text: "Disconnect", onclick: () => {
      if (confirm("Disconnect cloud sync? Local progress is kept.")) {
        window.Sync.disconnect();
        App.go("profile");
      }
    }});
    card.appendChild(reset);
    return card;
  }

  function showQR(payload) {
    if (!payload) { toast("Not ready yet", "bad"); return; }
    const wrap = el("div", { class: "lang-picker" });
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Scan on your other device" }));
    wrap.appendChild(el("div", { class: "muted small center", text: "Open the camera, scan, then tap the link." }));
    const url = "https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=" + encodeURIComponent(payload);
    const img = el("img", { src: url, alt: "Sync QR", style: "display:block;margin:0 auto;border-radius:14px;background:white;padding:8px;width:280px;height:280px;" });
    wrap.appendChild(img);
    wrap.appendChild(el("div", { class: "muted small center", style:"word-break:break-all;font-family:monospace;font-size:10px;margin-top:8px;", text: payload }));
    wrap.appendChild(el("button", { class: "btn primary big", text: "Done", onclick: () => UI.closeModal() }));
    UI.modal(wrap);
  }
  function shortenLink(link) {
    if (!link) return "—";
    if (link.length <= 60) return link;
    return link.slice(0, 40) + "…" + link.slice(-12);
  }

  function showJoinByCode() {
    const wrap = el("div", { class: "lang-picker" });
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Join from another device" }));
    wrap.appendChild(el("div", { class: "muted small", html:
      "Paste the share string you copied from your other device (it starts with <code>mochi1:</code>). It contains both the Firebase config and your sync code so you don't need to set them separately." }));
    const ta = el("textarea", { class: "ex-input", style: "min-height:120px;font-family:monospace;font-size:11px;width:100%;", placeholder: "mochi1:..." });
    wrap.appendChild(ta);
    wrap.appendChild(el("button", { class: "btn primary big", text: "Join sync", onclick: async () => {
      try {
        await window.Sync.setupFromSharePayload(ta.value.trim());
        UI.closeModal();
        toast("Joined! Your devices will sync now.", "good");
        setTimeout(() => App.go("profile"), 600);
      } catch (e) {
        toast("Failed: " + e.message, "bad");
      }
    }}));
    UI.modal(wrap);
  }

  function refreshSyncPill() {
    const pill = document.getElementById("sync-status-pill");
    if (!pill || !window.Sync) return;
    const s = window.Sync.status();
    const map = {
      "disabled":   { label: "off",        cls: "muted" },
      "signed-out": { label: "signed out", cls: "muted" },
      "connecting": { label: "connecting…",cls: "warn"  },
      "pending":    { label: "syncing…",   cls: "warn"  },
      "synced":     { label: "synced ✓",   cls: "good"  },
      "error":      { label: "error",      cls: "bad"   }
    };
    const m = map[s.state] || map.disabled;
    pill.textContent = m.label;
    pill.className = "sync-status sync-status-" + m.cls;
  }

  function showSyncSetup() {
    const wrap = el("div", { class: "lang-picker" });
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Set up Firebase sync" }));
    wrap.appendChild(el("div", { class: "muted small", html:
      "1. Open <b>console.firebase.google.com</b><br>" +
      "2. Create a project (free)<br>" +
      "3. Add a <b>Web app</b> — copy the firebaseConfig object<br>" +
      "4. Enable <b>Authentication → Google</b> (and/or Anonymous)<br>" +
      "5. Create a <b>Firestore Database</b> (test mode is fine to start)<br>" +
      "6. Paste the config below 👇"
    }));
    const ta = el("textarea", { class: "ex-input", style: "min-height:160px;font-family:monospace;font-size:12px;text-align:left;width:100%;",
      placeholder: '{\n  "apiKey": "...",\n  "authDomain": "...",\n  "projectId": "...",\n  "appId": "..."\n}' });
    wrap.appendChild(ta);
    function parseConfig() {
      let cfg;
      let txt = ta.value.trim();
      if (txt.startsWith("const") || txt.startsWith("let") || txt.startsWith("var")) {
        txt = txt.replace(/^[^=]*=\s*/, "").replace(/;$/, "");
      }
      try { cfg = JSON.parse(txt); }
      catch (e) { cfg = (new Function("return (" + txt + ")"))(); }
      if (!cfg || !cfg.apiKey || !cfg.projectId) throw new Error("Need at least apiKey + projectId");
      return cfg;
    }
    const buttons = el("div", { style: "display:flex;flex-direction:column;gap:8px;" }, [
      el("button", { class: "btn primary big", text: "Generate sync code (recommended)", onclick: async () => {
        try {
          const cfg = parseConfig();
          const code = await window.Sync.setupCodeMode(cfg);
          UI.closeModal();
          toast("Code generated: " + code, "good");
          App.go("profile");
        } catch (e) { toast("Failed: " + e.message, "bad"); }
      }}),
      el("button", { class: "btn ghost", text: "Use Google sign-in instead", onclick: async () => {
        try {
          const cfg = parseConfig();
          await window.Sync.setupUserMode(cfg);
          UI.closeModal();
          toast("Configured. Now sign in with Google.", "good");
          App.go("profile");
        } catch (e) { toast("Failed: " + e.message, "bad"); }
      }})
    ]);
    wrap.appendChild(buttons);
    UI.modal(wrap);
  }

  function statBlock(label, value) {
    return el("div", { class: "stat-block" }, [
      el("div", { class: "muted small", text: label }),
      el("div", { class: "stat-val", text: value + "" })
    ]);
  }
  function dayShort(d) {
    return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
  }

  // ─────────────── LANGUAGE PICKER ───────────────
  function langPicker() {
    const wrap = el("div", { class: "lang-picker" });
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Choose a language" }));
    Object.values(DATA_LANGS).forEach((meta) => {
      const item = el("button", { class: "lang-option", onclick: () => {
        Storage.setLang(meta.id);
        UI.closeModal();
        App.refreshTopbar();
        App.go("home");
      }});
      item.appendChild(el("div", { class: "lang-flag big", text: meta.flag }));
      item.appendChild(el("div", {}, [
        el("div", { class: "lang-name", text: meta.nativeName }),
        el("div", { class: "muted small", text: meta.name + " · " + meta.levels.length + " levels" })
      ]));
      wrap.appendChild(item);
    });
    UI.modal(wrap);
  }

  // ─────────────── ONBOARDING ───────────────
  function onboarding() {
    const wrap = el("div", { class: "lang-picker onboard" });
    wrap.appendChild(el("div", { class: "logo-mascot", text: "🍡", style:"font-size:64px;text-align:center;" }));
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Welcome to Mochi!" }));
    wrap.appendChild(el("div", { class: "muted center", text: "Pick a language to start. You can switch any time." }));
    Object.values(DATA_LANGS).forEach((meta) => {
      const item = el("button", { class: "lang-option", onclick: () => {
        Storage.setLang(meta.id);
        Storage.setOnboarded();
        UI.closeModal();
        App.refreshTopbar();
        App.go("home");
      }});
      item.appendChild(el("div", { class: "lang-flag big", text: meta.flag }));
      item.appendChild(el("div", {}, [
        el("div", { class: "lang-name", text: meta.nativeName }),
        el("div", { class: "muted small", text: meta.levels.length + " levels · " + meta.name })
      ]));
      wrap.appendChild(item);
    });
    UI.modal(wrap);
  }

  return { home, unit, lesson, review, browse, profile, langPicker, onboarding, refreshSyncPill };
})();
