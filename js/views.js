// Views render full screens into #view
window.Views = (function () {
  const { el, clear, mascot, progressBar, toast, confetti, shuffle, pickN } = UI;

  function getLangPack(lang) {
    return ({ ja: window.DATA_JA, ko: window.DATA_KO, en: window.DATA_EN, es: window.DATA_ES, de: window.DATA_DE, zh: window.DATA_ZH })[lang];
  }
  function getLangMeta(lang) { return DATA_LANGS[lang]; }

  // Result/UI text localisation. The 俺 profile wants the app chrome in
  // Japanese; everyone else keeps English. L("English","日本語") → picks one.
  function L(en, ja) {
    try { return Storage.getCurrentUser() === "me" ? ja : en; }
    catch (e) { return en; }
  }

  // むむたんの今日のひとこと。状況（連続日数・復習待ち・時間帯・進捗）
  // に応じて候補プールを選び、その日のうちは同じ言葉が出るよう
  // 「年内日数」をシードにして1日1回ローテーションする。
  function mumuMessage(ctx) {
    const now = new Date();
    const hour = now.getHours();
    const start = new Date(now.getFullYear(), 0, 0);
    const daySeed = Math.floor((now - start) / 86400000);
    const { lang, langName, due, streak, todayCards, goal } = ctx;

    // むむたんの「やぴやぴ」決め台詞。今日（2026-05-11, daySeed=131）から
    // 5日おきに登場する。ゴール達成や復習多すぎなど緊急性のあるコンテキストは
    // そちらを優先。
    const FEATURED = "やぴやぴできるようにいっぱい覚えよう 🐰💕";
    const goalNotMet = todayCards < goal;
    const noBigContext = streak < 7 && due <= 5;
    if (goalNotMet && noBigContext && daySeed % 5 === 1) {
      return { mood: "hi", bubble: FEATURED };
    }

    let mood = "happy";
    let pool = [];

    // むむたんは勉強仲間。なので "あなたを褒める" のではなく、一緒にやる側
    // として喋る。
    if (todayCards >= goal && goal > 0) {
      mood = "proud";
      pool = [
        "今日のゴール達成！やった〜 ✨",
        "ミッション完了！自分を褒めよう 🎉",
        "完璧！もう休んでもOK、続けるなら全力で 💪",
        "目標クリア！えらい 💕",
        "今日もえらかった。明日の自分が助かるね ☘️"
      ];
    } else if (streak >= 30) {
      mood = "proud";
      pool = [
        `${streak}日連続！もう習慣だね 🔥`,
        `${streak}日続いてる、自分を誇ろう ✨`,
        `${streak}日連続、本物のがんばり屋さんだね 💪`,
        `${streak}日続けてるって、すごい数字だよ 🌟`
      ];
    } else if (streak >= 7) {
      mood = "happy";
      pool = [
        `${streak}日連続！止まらないでね 🔥`,
        `1週間以上やってる！自慢していい 🎀`,
        `${streak}日連続、習慣化の兆し 🌱`,
        `${streak}日続いてる、すごいよ 💕`
      ];
    } else if (streak === 0 && todayCards === 0) {
      mood = "thinking";
      pool = [
        "今日が新しいスタート。1分でもOK 🐰",
        "ちょっとだけでも触ろう、むむたんも一緒にやる 💕",
        "忘れちゃう前にもう一度、一緒に思い出そう ✨",
        "小さい一歩からでOK、むむたんも横にいるよ 🌱",
        "今日からまた、ね。気楽に始めよう ☁️"
      ];
    } else if (due > 0) {
      mood = "thinking";
      pool = [
        `復習が <b>${due}</b> 個待ってる。少しずつでOK 🌱`,
        `<b>${due}</b> 個の単語が「会いたい」って言ってる 🐰`,
        `復習タイム！忘れる前にちょっと見直そう 📖`,
        `${due} 個だけでも、未来の自分が助かるよ ✨`,
        `一緒に ${due} 個やっつけよう 💕`
      ];
    } else if (hour < 11) {
      mood = "hi";
      pool = [
        "おはよう！朝の脳はピカピカだよ 🌅",
        "コーヒー片手にちょっとどう？ ☕",
        "朝1分の復習で1日が変わるかも 🌷",
        "今日は何から覚えようか？ 💭",
        "今日もよろしくね 💖",
        "むむたんも今、起きたとこ 🐰"
      ];
    } else if (hour >= 22) {
      mood = "happy";
      pool = [
        "おやすみ前に5分だけ寄って ✨",
        "夜は記憶が定着しやすいよ 🌙",
        "今日の最後にもう一回見てから寝よう 💤",
        "1日のシメに、お疲れさま 💕",
        "寝る前のひと口、効きます 🍡",
        "むむたんはもう眠いけど、付き合うよ 🐰"
      ];
    } else if (hour >= 18) {
      mood = "happy";
      pool = [
        "夕方の落ち着いた時間、いい勉強タイム 🌆",
        "今日の振り返り、5分でできるよ ✨",
        "残り時間、ちょっとだけ進めてみない？ 🌷",
        "夜ごはん前にひとつだけ、どう？ 🍙"
      ];
    } else {
      mood = "happy";
      pool = [
        "今日もちょっとずつ進もうね 💪",
        "1単語覚えれば、それは大成功 ✨",
        "一緒にがんばろうね 🐰💕",
        "焦らないで、楽しもう 🌷",
        "今のあなたは昨日より一歩進んでる 🌱",
        "好きな単語からでOK、気楽にね ☁️",
        `${langName}、一緒に楽しもう 💖`,
        "5分だけでも来てくれて嬉しい ✨",
        "完璧じゃなくていい、続けることがえらい 🌸",
        "むむたんも今日いっぱい覚えるね 🐰"
      ];
    }

    const bubble = pool[daySeed % pool.length];
    return { mood, bubble };
  }

  // ─────────────── HOME ───────────────
  function home(viewEl) {
    clear(viewEl);
    const lang = Storage.getLang();
    const meta = getLangMeta(lang);
    const pack = getLangPack(lang);

    // If state is empty and we have a baked-in last-known snapshot, show a
    // very visible recovery banner at the top of Home so the user can restore
    // with one tap (no need to dig into Profile → Backup).
    try {
      const root = Storage.load();
      const currentCards = Storage.countCards ? Storage.countCards(root) : 0;
      const wasOnboarded = !!root.onboarded;
      const lk = window.LAST_KNOWN_DATA;
      let lkCards = 0;
      // Only consider the baked LAST_KNOWN data on devices that have already
      // been onboarded — otherwise we'd be inviting brand-new users to import
      // somebody else's progress.
      if (wasOnboarded && lk) Object.values(lk.languages || {}).forEach((s) => { lkCards += Object.keys((s && s.cards) || {}).length; });
      const snaps = (Storage.getSnapshots && Storage.getSnapshots()) || [];
      const bigSnap = snaps.reduce((a, b) => (a && (a.cardCount || 0) >= (b.cardCount || 0) ? a : b), null);
      if (currentCards === 0 && (lkCards > 0 || (bigSnap && bigSnap.cardCount > 0))) {
        const banner = el("div", { class: "recover-banner" });
        banner.appendChild(el("div", { style: "font-weight:700;font-size:14px;",
          text: "🛟 学習データが空になっています" }));
        banner.appendChild(el("div", { class: "muted small", style: "margin:4px 0 8px;line-height:1.5;",
          html: "ワンタップで復元できます。" + (bigSnap ? " 端末内に <b>" + bigSnap.cardCount + " カード</b>のスナップショットあり。" : "") +
                (lkCards ? " 焼き込み済みデータに <b>" + lkCards + " カード</b>あり。" : "") }));
        const row = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;" });
        if (bigSnap) {
          row.appendChild(el("button", { class: "btn primary", text: "Restore " + bigSnap.cardCount + " cards", onclick: () => {
            const idx = snaps.indexOf(bigSnap);
            Storage.restoreSnapshot(idx);
            UI.toast("Restored ✨", "good");
            App.refreshTopbar();
            App.go("home");
          }}));
        }
        if (lkCards) {
          row.appendChild(el("button", { class: "btn warn", text: "Restore " + lkCards + " (chat record)", onclick: () => {
            try { Storage.downloadBackup(); } catch (e) {}
            Storage.importData(JSON.stringify(window.LAST_KNOWN_DATA), /* merge */ true);
            UI.toast("Restored " + lkCards + " cards ✨", "good");
            App.refreshTopbar();
            App.go("home");
          }}));
        }
        banner.appendChild(row);
        viewEl.appendChild(banner);
      }
    } catch (e) {}

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
    const due = SRS.countDue(App.allCards(lang), lang);
    const streak = Storage.getStreak();
    const { mood, bubble } = mumuMessage({
      lang,
      langName: meta.nativeName,
      due,
      streak: streak.current,
      todayCards: today.cards,
      goal: goalCards
    });
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
      // すべての intro を見せたあとに、シャッフルされた練習をやる。
      // (元のように "intro → 直後に同じ単語の practice" だと、ただの即時記憶
      // ゲームになってしまい英→日の連続感が出てしまうため)
      lesson.cards.forEach((c) => {
        steps.push({ kind: "intro", card: c });
      });
      const practices = lesson.cards.map((c) => ({ kind: "practice", card: c, pool }));
      UI.shuffle(practices).forEach((p) => steps.push(p));
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
      try { return _nextStep(); }
      catch (e) {
        console.warn("[lesson] nextStep threw", e);
        UI.toast("Lesson hiccup — skipping a step. (Check console for details.)", "bad");
        // Try to continue with the step after this one, otherwise finish.
        try { if (stepIdx < steps.length) { stepIdx += 1; setTimeout(nextStep, 50); } else { finish(); } } catch (_) {}
      }
    }
    function _nextStep() {
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
      try { return _runStep(step); }
      catch (e) {
        console.warn("[lesson] runStep threw", e, step);
        UI.toast("Step error: " + (e && e.message || e), "bad");
        setTimeout(nextStep, 200);
      }
    }
    function _runStep(step) {
      if (step.kind === "intro") {
        // Mark first-seen
        if (!Storage.isLearned(step.card.id, lang)) Storage.markLearned(step.card.id, lang);
        const examples = App.examplesFor(step.card.id, lang);
        Exercises.renderIntro(step.card, stage, (mark) => {
          if (mark) Storage.setMark(step.card.id, mark, lang);
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
        Storage.recordCard(true, xp, lang);
        if (card) {
          const old = Storage.getCard(card.id, lang);
          const ns = SRS.review(old, "good");
          Storage.setCard(card.id, ns, lang);
        }
      } else {
        Storage.recordCard(false, 0, lang);
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
      wrap.appendChild(mascot("proud", L("Lesson complete! ✨", "レッスン完了！✨")));
      const summary = el("div", { class: "card finish-summary" });
      summary.appendChild(el("div", { class: "fs-row" }, [el("span", { text: L("XP earned","獲得XP") }), el("b", { text: "+" + (10 + correctCount * 5) })]));
      summary.appendChild(el("div", { class: "fs-row" }, [el("span", { text: L("Correct","正解数") }), el("b", { text: correctCount + "" })]));
      const streak = Storage.getStreak();
      summary.appendChild(el("div", { class: "fs-row" }, [el("span", { text: L("Streak","連続") }), el("b", { text: streak.current + " 🔥" })]));
      wrap.appendChild(summary);
      const home = el("button", { class: "btn primary big", onclick: () => App.go("home"), text: L("Home","ホーム") });
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
    const all = App.allCards(lang);
    const dueIds = SRS.dueCardIds(all, lang);
    const weakIds = SRS.weakCardIds(all, lang, 40);

    if (!dueIds.length && !weakIds.length) {
      viewEl.appendChild(mascot("happy", L("No cards due! 🎉<br>Come back tomorrow.", "今日の復習はなし！🎉<br>また明日来てね。")));
      viewEl.appendChild(el("button", { class: "btn primary big", text: L("Back to Learn","学習に戻る"), onclick: () => App.go("home") }));
      return;
    }

    // Menu: due review and/or a focused weak-words drill.
    const menu = el("div", { class: "review-menu" });
    menu.appendChild(mascot("hi", L("What do you want to review?", "何を復習する？")));
    if (dueIds.length) {
      menu.appendChild(el("button", { class: "btn primary big", onclick: () => runSession(viewEl, shuffle(dueIds.map((id) => App.cardById(id, lang)).filter(Boolean)), lang, false) },
        [L("📚 Due review", "📚 今日の復習") + "  (" + dueIds.length + ")"]));
    }
    if (weakIds.length) {
      menu.appendChild(el("button", { class: "btn " + (dueIds.length ? "ghost" : "primary") + " big", onclick: () => runSession(viewEl, weakIds.map((id) => App.cardById(id, lang)).filter(Boolean), lang, true) },
        [L("🎯 Weak words", "🎯 苦手集中") + "  (" + weakIds.length + ")"]));
      menu.appendChild(el("div", { class: "muted small", style: "margin-top:6px;text-align:center;",
        text: L("Words you keep getting wrong, hardest first.", "間違えやすい単語を、苦手な順に。") }));
    }
    viewEl.appendChild(menu);
  }

  // Shared review runner. `weak` = focused weak-words mode.
  function runSession(viewEl, sessionCards, lang, weak) {
    clear(viewEl);
    const all = App.allCards(lang);
    const cards = sessionCards;
    if (!cards.length) { App.go("home"); return; }
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
        wrap.appendChild(mascot("proud", weak
          ? L(`Weak words done! ${correct}/${cards.length} 💪`, `苦手集中おつかれ！${correct}/${cards.length} 💪`)
          : L(`Review complete! ${correct}/${cards.length}`, `復習完了！${correct}/${cards.length}`)));
        wrap.appendChild(el("button", { class: "btn primary big", text: L("Home","ホーム"), onclick: () => App.go("home") }));
        stage.appendChild(wrap);
        return;
      }
      const card = cards[idx++];
      const pool = all.filter((c) => c.deck === card.deck && c.id !== card.id);
      const ex = Exercises.buildMultipleChoice(card, pool.length >= 4 ? pool : all, "front-to-back");
      Exercises.renderMC(ex, stage, (ok) => {
        const old = Storage.getCard(card.id, lang);
        const ns = SRS.review(old, ok ? "good" : "again");
        Storage.setCard(card.id, ns, lang);
        Storage.recordCard(ok, ok ? 5 : 0, lang);
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

    // Status filter chips — self-marks first, then review-schedule status
    const filters = [
      { id: "all",       label: "All",         desc: "Everything in this level" },
      { id: "know",      label: "😀 Know",      desc: "Marked as known" },
      { id: "ok",        label: "😐 OK",        desc: "Marked as so-so" },
      { id: "dontknow",  label: "😕 Hard",      desc: "Marked as hard" },
      { id: "unmarked",  label: "Unmarked",    desc: "No self-mark yet" },
      { id: "learning",  label: "Learning",    desc: "Still in early review intervals" },
      { id: "mastered",  label: "Mastered",    desc: "Interval ≥ 21 days" },
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

    // Level tabs: All (everything) → N5..N1 (or A1..C2) → ✏️ My (custom)
    const tabs = el("div", { class: "level-tabs" });
    let activeLevel = opts.initialLevel || "__all__";
    const allTab = el("button", {
      class: "level-tab" + (activeLevel === "__all__" ? " active" : ""),
      text: "All",
      title: "All levels",
      style: "--lc:#ddd6fe"
    });
    allTab.onclick = () => {
      activeLevel = "__all__";
      tabs.querySelectorAll(".level-tab").forEach((t) => t.classList.remove("active"));
      allTab.classList.add("active");
      renderLevel();
    };
    tabs.appendChild(allTab);
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
    // ✏️ Custom-words-only tab
    const customTab = el("button", {
      class: "level-tab" + (activeLevel === "__custom__" ? " active" : ""),
      text: "✏️ My",
      title: "Words you added yourself",
      style: "--lc:#fde68a"
    });
    customTab.onclick = () => {
      activeLevel = "__custom__";
      tabs.querySelectorAll(".level-tab").forEach((t) => t.classList.remove("active"));
      customTab.classList.add("active");
      renderLevel();
    };
    tabs.appendChild(customTab);
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

      // Dedicated tab: show all custom cards regardless of level
      if (activeLevel === "__custom__") {
        const allCustom = Storage.getCustomCards(lang);
        if (!allCustom.length) {
          list.appendChild(el("div", { class: "muted center", text: "You haven't added any words yet — tap + to create your first one." }));
          summary.textContent = "0 cards · custom";
          return;
        }
        const filtered = allCustom.filter(passesFilter);
        summary.textContent = `Showing ${filtered.length} of ${allCustom.length} cards · my words`;
        // Group by level for readability
        const byLevel = {};
        filtered.forEach((c) => { (byLevel[c.level] = byLevel[c.level] || []).push(c); });
        meta.levels.forEach((lv) => {
          const cards = byLevel[lv.id]; if (!cards || !cards.length) return;
          const block = el("div", { class: "browse-unit card" });
          block.appendChild(el("div", { class: "browse-unit-head" }, [
            el("div", { class: "unit-icon small", text: "✏️", style: "background:#fde68a" }),
            el("div", { class: "browse-unit-title", text: "My " + lv.name + " words" }),
            el("div", { class: "muted small", style: "margin-left:auto;", text: cards.length + "" })
          ]));
          const grid = el("div", { class: "browse-grid" });
          cards.forEach((c) => grid.appendChild(buildBrowseCard(c, lang, () => renderLevel())));
          block.appendChild(grid);
          list.appendChild(block);
        });
        return;
      }

      const units = activeLevel === "__all__"
        ? pack.UNITS
        : pack.UNITS.filter((u) => u.level === activeLevel);
      const customForLevel = activeLevel === "__all__"
        ? Storage.getCustomCards(lang)
        : Storage.getCustomCards(lang).filter((c) => c.level === activeLevel);
      if (!units.length && !customForLevel.length) {
        list.appendChild(el("div", { class: "muted center", text: "No content for this level yet — tap + to add your own words." }));
        summary.textContent = "";
        return;
      }
      let totalShown = 0, totalAll = 0;
      // Render the "My words" deck first for this level so custom cards are easy to find
      if (customForLevel.length) {
        const filtered = customForLevel.filter(passesFilter);
        totalAll += customForLevel.length;
        if (filtered.length) {
          totalShown += filtered.length;
          const block = el("div", { class: "browse-unit card" });
          block.appendChild(el("div", { class: "browse-unit-head" }, [
            el("div", { class: "unit-icon small", text: "✏️", style: "background:#fde68a" }),
            el("div", { class: "browse-unit-title", text: "My words" }),
            el("div", { class: "muted small", style: "margin-left:auto;", text: filtered.length + "/" + customForLevel.length })
          ]));
          const grid = el("div", { class: "browse-grid" });
          filtered.forEach((c) => grid.appendChild(buildBrowseCard(c, lang, () => renderLevel())));
          block.appendChild(grid);
          list.appendChild(block);
        }
      }
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
        filtered.forEach((c) => grid.appendChild(buildBrowseCard(c, lang, () => renderLevel())));
        block.appendChild(grid);
        list.appendChild(block);
      });
      const lvLabel = activeLevel === "__all__" ? "all levels" : activeLevel;
      summary.textContent = `Showing ${totalShown} of ${totalAll} cards · ${activeFilter} · ${lvLabel}`;
    }
    renderLevel();

    // Floating "Add word" button
    const fab = el("button", { class: "fab", title: "Add a custom word", text: "+", onclick: () => showAddWord(lang, () => renderLevel(), activeLevel) });
    viewEl.appendChild(fab);
  }

  // Build one browse card (extracted so the My-words section can reuse it)
  function buildBrowseCard(c, lang, onChange) {
    const status = Storage.cardStatus(c.id, lang);
    const mark = Storage.getMark(c.id, lang);
    const item = el("div", { class: "browse-card status-" + status + (mark ? " mark-" + mark : "") });
    item.appendChild(statusDot(status));
    const body = el("button", { class: "browse-card-body" });
    const emoji = (window.EMOJI && window.EMOJI.lookup(c)) || "";
    if (emoji) body.appendChild(el("div", { class: "bc-emoji", text: emoji }));
    body.appendChild(el("div", { class: "bc-front", text: c.front || c.jp }));
    body.appendChild(el("div", { class: "bc-back", text: App.meaning(c) }));
    if (c.de) body.appendChild(el("div", { class: "bc-back tr-de", text: c.de }));
    if (c.kana && c.kana !== c.front) body.appendChild(el("div", { class: "bc-hint", text: c.kana }));
    body.onclick = () => showWordDetail(c, lang, onChange);
    item.appendChild(body);
    item.appendChild(markRow(c.id, lang, mark, onChange));
    return item;
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

  // Add-word modal — creates a custom card in the current language
  function showAddWord(lang, onAdded, defaultLevel) {
    const meta = getLangMeta(lang);
    const wrap = el("div", { class: "lang-picker" });
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "✏️ Add your own word" }));
    wrap.appendChild(el("div", { class: "muted small", text: meta.nativeName + " · stored locally and synced if you have cloud sync set up" }));

    const fields = {};
    function field(label, key, placeholder, required) {
      const w = el("div", { class: "form-field" });
      w.appendChild(el("label", { class: "form-label", text: label + (required ? " *" : "") }));
      const inp = el("input", { class: "ex-input", type: "text", placeholder, autocomplete: "off" });
      w.appendChild(inp);
      fields[key] = inp;
      return w;
    }
    wrap.appendChild(field("Word (in " + meta.nativeName + ")", "jp", lang === "ja" ? "新聞" : lang === "ko" ? "신문" : lang === "es" ? "periódico" : "newspaper", true));
    wrap.appendChild(field("Pronunciation (kana / IPA / romanization)", "kana", lang === "ja" ? "しんぶん" : lang === "ko" ? "sinmun" : "ˈnjuːzpeɪpər"));
    wrap.appendChild(field("English meaning", "en", "newspaper", true));
    wrap.appendChild(field("German (optional)", "de", "Zeitung"));
    wrap.appendChild(field("Emoji (optional)", "emoji", "🗞️"));
    wrap.appendChild(field("Example sentence (optional)", "exText", lang === "ja" ? "毎朝、新聞を読みます。" : lang === "ko" ? "매일 아침 신문을 읽어요." : lang === "es" ? "Leo el periódico cada mañana." : "I read the newspaper every morning."));
    wrap.appendChild(field("Example translation (optional)", "exTr", "I read the newspaper every morning."));

    // Level dropdown
    const lvWrap = el("div", { class: "form-field" });
    lvWrap.appendChild(el("label", { class: "form-label", text: "Level" }));
    const lvSel = el("select", { class: "ex-input" });
    meta.levels.forEach((lv) => {
      const opt = el("option", { value: lv.id, text: lv.name + " — " + lv.subtitle });
      if (lv.id === (defaultLevel || meta.levels[0].id)) opt.setAttribute("selected", "");
      lvSel.appendChild(opt);
    });
    lvWrap.appendChild(lvSel);
    wrap.appendChild(lvWrap);

    const buttons = el("div", { style: "display:flex;gap:8px;margin-top:6px;" }, [
      el("button", { class: "btn ghost", text: "Cancel", onclick: () => UI.closeModal() }),
      el("button", { class: "btn primary", style: "flex:1;", text: "Save word", onclick: () => {
        const jp = fields.jp.value.trim();
        const en = fields.en.value.trim();
        if (!jp || !en) { toast("Word and English meaning are required.", "bad"); return; }
        const exText = fields.exText.value.trim();
        const exTr = fields.exTr.value.trim();
        Storage.addCustomCard({
          jp, kana: fields.kana.value.trim(),
          en, de: fields.de.value.trim(),
          emoji: fields.emoji.value.trim(),
          ex: exText ? [[exText, exTr]] : [],
          level: lvSel.value
        }, lang);
        UI.closeModal();
        toast("Saved! ✨", "good");
        if (onAdded) onAdded();
      }})
    ]);
    wrap.appendChild(buttons);
    UI.modal(wrap);
    setTimeout(() => fields.jp.focus(), 100);
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

    const emoji = (window.EMOJI && window.EMOJI.lookup(card)) || "";
    if (emoji) wrap.appendChild(el("div", { class: "wd-emoji", text: emoji }));
    wrap.appendChild(el("div", { class: "wd-front", text: card.front || card.jp }));
    if (card.kana && card.kana !== card.front) wrap.appendChild(el("div", { class: "wd-kana", text: card.kana }));
    if (card.romaji && card.romaji !== card.kana) wrap.appendChild(el("div", { class: "wd-romaji", text: card.romaji }));
    wrap.appendChild(el("div", { class: "wd-back" }, [
      el("span", { class: "tr-en", text: App.meaning(card) }),
      card.de ? el("span", { class: "tr-de", text: card.de }) : null
    ]));
    if (card.hint) wrap.appendChild(el("div", { class: "wd-hint", text: card.hint }));

    wrap.appendChild(el("button", { class: "btn ghost big", text: "🔊 Listen", onclick: () => App.speak(card.speakText) }));

    // Two sections (per design):
    //   ① the most common/natural example for the word
    //   ② an example using only learned / lower-level words
    // Neither is ever empty (safe generic fallback uses only ≤N5 vocab).
    const exBlock = el("div", { class: "wd-examples" });
    function exCard(label, ex, idx) {
      const c = el("div", { class: "wd-ex-card wd-ex-card-" + (idx % 2 === 0 ? "a" : "b") });
      const head = el("div", { class: "wd-ex-head" }, [
        el("span", { class: "wd-ex-badge", text: label }),
        el("button", { class: "btn ghost tiny wd-ex-spk", onclick: () => App.speak(ex.text) }, ["🔊"])
      ]);
      c.appendChild(head);
      c.appendChild(el("div", { class: "wd-ex-jp", text: ex.text }));
      if (ex.tr) c.appendChild(el("div", { class: "wd-ex-tr", text: ex.tr }));
      return c;
    }
    const exItems = [];
    const inline = (card.ex || []).map((e) => Array.isArray(e) ? { text: e[0], tr: e[1] } : e)
      .filter((e) => e && e.text).slice(0, 2);
    if (inline.length) {
      // All languages: the word's own example(s) — one per meaning when two.
      const senses = String(card.en || "").split(/\s*\/\s*|\s*;\s*/).map((s) => s.trim()).filter(Boolean);
      inline.forEach((ex, i) => {
        const label = inline.length >= 2
          ? (i === 0 ? "① " : "② ") + (senses[i] || (lang === "ja" ? "例文" : "Example"))
          : L("Example", "例文");
        exItems.push([label, ex]);
      });
    } else {
      const prim = App.primaryExample(card, lang);
      const simp = App.simpleExample(card, lang, prim);
      if (prim) exItems.push([L("Example", "例文"), prim]);
      if (simp && (!prim || simp.text !== prim.text)) exItems.push([L("Another example", "別の例文"), simp]);
    }
    exItems.forEach(([label, ex], i) => exBlock.appendChild(exCard(label, ex, i)));
    if (exItems.length) wrap.appendChild(exBlock);

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
        if (!confirm("Forget \"" + (card.front || card.jp) + "\"? Its review schedule will be cleared and it will reappear as new.")) return;
        Storage.forgetCard(card.id, lang);
        UI.closeModal();
        UI.toast("Removed from learned set", "good");
        if (onChange) onChange();
        App.refreshTopbar();
      }});
      wrap.appendChild(forgetBtn);
    }

    // Delete button — only for user-created custom cards
    if (card.source === "user" || (card.id || "").startsWith("custom:")) {
      const delBtn = el("button", { class: "btn warn big", text: "❌ Delete this word (it's yours)", onclick: () => {
        if (!confirm("Delete \"" + (card.front || card.jp) + "\" permanently? This can't be undone.")) return;
        Storage.removeCustomCard(card.id, lang);
        UI.closeModal();
        UI.toast("Deleted.", "good");
        if (onChange) onChange();
        App.refreshTopbar();
      }});
      wrap.appendChild(delBtn);
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
    viewEl.appendChild(mascot("hi", L(`Hi! Tracking your <b>${meta.nativeName}</b> progress 💖`, `やっほー！<b>${meta.nativeName}</b>の進み具合だよ💖`)));

    // Today summary card (Anki-like)
    const todayCard = el("div", { class: "card stat-today" });
    todayCard.appendChild(el("div", { class: "muted", text: L("Today","今日") }));
    todayCard.appendChild(el("div", { class: "stat-big", text: Math.round(today.mins) + L(" min"," 分") }));
    const grid = el("div", { class: "stat-grid" });
    grid.appendChild(statBlock(L("Cards reviewed","復習したカード"), today.cards));
    grid.appendChild(statBlock(L("Lessons","レッスン"), today.lessons));
    grid.appendChild(statBlock(L("Accuracy","正答率"), today.cards ? Math.round((today.correct/today.cards)*100) + "%" : "—"));
    grid.appendChild(statBlock(L("XP today","今日のXP"), today.xp));
    todayCard.appendChild(grid);
    viewEl.appendChild(todayCard);

    // Last 7 days bar chart
    const chartCard = el("div", { class: "card stat-chart" });
    chartCard.appendChild(el("div", { class: "stat-row" }, [
      el("div", { class: "muted", text: L("Last 7 days","直近7日") }),
      el("div", {}, [el("span", { class: "muted", text: L("Streak ","連続 ") }), el("b", { class: "accent", text: streak.current + " " }), el("span", { text: L("days 🔥","日 🔥") })])
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
      el("div", { class: "muted", text: L("Last 30 days","直近30日") }),
      el("div", { class: "muted small", text: L("less ▢ ■ more","少 ▢ ■ 多") })
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
    cumCard.appendChild(el("div", { class: "muted", text: L("All-time","累計") }));
    const cumGrid = el("div", { class: "stat-grid" });
    cumGrid.appendChild(statBlock(L("Total minutes","合計分数"), Math.round(cum.totalMins)));
    cumGrid.appendChild(statBlock(L("Total cards","合計カード"), cum.totalCards));
    cumGrid.appendChild(statBlock(L("Lessons done","完了レッスン"), cum.totalLessons));
    cumGrid.appendChild(statBlock(L("Total XP","合計XP"), cum.totalXp));
    cumGrid.appendChild(statBlock(L("Active days","学習日数"), cum.daysActive));
    cumGrid.appendChild(statBlock(L("Longest streak","最長連続"), streak.longest + " 🔥"));
    cumCard.appendChild(cumGrid);
    viewEl.appendChild(cumCard);

    // Today's per-language daily-goal achievements — picked up by external
    // habit-tracker apps via webhook or by polling localStorage.
    const dailyCard = el("div", { class: "card stat-cum" });
    dailyCard.appendChild(el("div", { class: "muted", text: L("Today's daily goal — linked to your task manager","今日の目標 — タスク管理と連携") }));
    // Only show languages the user has flagged for task-manager tracking
    // (default ja/ko/es; English off unless the user turns it on).
    const dailyMap = Storage.dailyAchievementMap({ onlyTracked: true });
    const dailyGrid = el("div", { class: "daily-goal-grid" });
    Object.keys(dailyMap).forEach((l) => {
      const meta2 = getLangMeta(l);
      const d = dailyMap[l];
      const item = el("div", { class: "daily-goal-item " + (d.achieved ? "achieved" : "") });
      item.appendChild(el("div", { class: "daily-goal-flag", text: meta2.flag }));
      item.appendChild(el("div", { class: "daily-goal-name", text: meta2.nativeName }));
      item.appendChild(el("div", { class: "daily-goal-count", text: `${d.cards}/${d.goal}` }));
      item.appendChild(el("div", { class: "daily-goal-badge", text: d.achieved ? "✅" : "" }));
      // tap to change goal
      const goalBtn = el("button", { class: "daily-goal-edit", title: "Change goal", text: "⚙️" });
      goalBtn.onclick = (e) => {
        e.stopPropagation();
        const n = prompt(meta2.nativeName + " の1日の目標カード数:", String(d.goal));
        const v = parseInt(n, 10);
        if (Number.isFinite(v) && v > 0) { Storage.setDailyGoal(l, v); App.go("profile"); }
      };
      item.appendChild(goalBtn);
      item.onclick = () => {
        if (confirm(meta2.nativeName + " をタスクマネージャー連携から外す？\n（達成しても task manager に送られなくなります。再度追加できます）")) {
          Storage.setTracked(l, false);
          App.go("profile");
        }
      };
      dailyGrid.appendChild(item);
    });
    // Show inactive (untracked) languages as a small "add" row
    const untracked = Storage.getAllowedLangs().filter((l) => !Storage.isTracked(l));
    if (untracked.length) {
      const addRow = el("div", { class: "daily-goal-addrow" });
      addRow.appendChild(el("div", { class: "muted small", text: L("Not linked to task manager:","タスク管理に未連携:") }));
      untracked.forEach((l) => {
        const m = getLangMeta(l);
        const btn = el("button", { class: "btn ghost tiny", title: "Link " + m.nativeName, onclick: () => {
          Storage.setTracked(l, true); App.go("profile");
        }}, [ m.flag + " " + m.nativeName + " ＋" ]);
        addRow.appendChild(btn);
      });
      dailyCard.appendChild(addRow);
    }
    dailyCard.appendChild(dailyGrid);
    dailyCard.appendChild(el("div", { class: "muted small", style: "margin-top:8px;line-height:1.5;",
      html: L("Tap a language to <b>unlink</b> it from the task manager. Tap ⚙️ to change its goal. <b>20 cards ≈ 3–5 min</b>.",
              "言語をタップで<b>連携解除</b>。⚙️で目標を変更。<b>20枚 ≈ 3〜5分</b>。") }));

    // Auto-sync explainer (primary path — no setup needed beyond Cloud Sync)
    const trackedNames = Storage.trackedLangs().map((l) => getLangMeta(l).nativeName).join(" / ") || "—";
    const linked = Storage.trackedLangs().map((l) => getLangMeta(l).flag).join(" ");
    const integrate = el("div", { class: "integrate-block on" });
    integrate.appendChild(el("div", { class: "integrate-title", text: L("🔗 Linked to task manager: ","🔗 タスク管理と連携中: ") + (linked || "—") }));
    integrate.appendChild(el("div", { class: "muted small", style: "line-height:1.5;",
      html: L("When you hit a daily goal for <b>" + trackedNames + "</b>, mumu automatically marks the matching habit in your task manager. No setup needed.",
              "<b>" + trackedNames + "</b> の今日の目標を達成すると、mumu が自動でタスク管理の対応する習慣にチェックを入れるよ。設定は不要。") }));
    dailyCard.appendChild(integrate);

    // Advanced: outbound webhook (kept for power users who want Zapier / IFTTT etc.)
    const advanced = el("details", { class: "sync-help" });
    advanced.appendChild(el("summary", { text: "🛠 Advanced: outbound webhook (optional)" }));
    advanced.appendChild(el("div", { class: "muted small", style:"line-height:1.5;margin:6px 0;",
      html: "If you'd rather POST to Zapier / IFTTT / your own endpoint when a goal is hit, paste a URL here." }));
    const hookUrl = Storage.getWebhookUrl();
    const hookInput = el("input", { class: "ex-input", type: "url", placeholder: "https://your-task-manager/api/mumu" });
    hookInput.value = hookUrl;
    advanced.appendChild(hookInput);
    const hookButtons = el("div", { style: "display:flex;gap:6px;margin-top:6px;flex-wrap:wrap;" }, [
      el("button", { class: "btn primary", text: "Save webhook", onclick: () => {
        Storage.setWebhookUrl(hookInput.value.trim());
        toast(hookInput.value.trim() ? "Webhook saved." : "Webhook cleared.", "good");
      }}),
      el("button", { class: "btn ghost", text: "Test fire", onclick: async () => {
        const url = hookInput.value.trim();
        if (!url) { toast("Enter a URL first.", "bad"); return; }
        try {
          await fetch(url, {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ source: "mumu", test: true, date: Storage.todayStr(), language: lang, achieved: true })
          });
          toast("Webhook test sent.", "good");
        } catch (e) { toast("Webhook test failed: " + e.message, "bad"); }
      }})
    ]);
    advanced.appendChild(hookButtons);
    dailyCard.appendChild(advanced);

    viewEl.appendChild(dailyCard);

    // Per-language progress overview (cards seen / mastered)
    const allCards = App.allCards(lang);
    const customCount = Storage.getCustomCards(lang).length;
    let mastered = 0, learning = 0, seen = 0;
    allCards.forEach((c) => {
      const st = Storage.getCard(c.id, lang);
      if (st) {
        seen += 1;
        if (st.interval >= 21) mastered += 1;
        else learning += 1;
      }
    });
    const learnCard = el("div", { class: "card stat-cum" });
    learnCard.appendChild(el("div", { class: "muted", text: meta.nativeName + L(" — Word progress"," — 単語の進捗") }));
    const lg = el("div", { class: "stat-grid" });
    lg.appendChild(statBlock(L("Words seen","学習した単語"), `${seen}/${allCards.length}`));
    lg.appendChild(statBlock(L("Learning","学習中"), learning));
    lg.appendChild(statBlock(L("Mastered","習得済み"), mastered));
    lg.appendChild(statBlock(L("My words","自作単語"), customCount));
    learnCard.appendChild(lg);
    learnCard.appendChild(progressBar((seen / allCards.length) * 100, `linear-gradient(90deg, ${meta.color}, #7dd3fc)`));
    const wordLinks = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:10px;" }, [
      el("button", { class: "btn primary", text: L("📖 Learned words","📖 学んだ単語"), onclick: () => App.go("browse", { initialFilter: "learned" }) }),
      el("button", { class: "btn ghost", text: L("🌟 Mastered","🌟 習得済み"), onclick: () => App.go("browse", { initialFilter: "mastered" }) }),
      el("button", { class: "btn ghost", text: L("✏️ Add word","✏️ 単語を追加"), onclick: () => showAddWord(lang, () => App.go("profile")) })
    ]);
    learnCard.appendChild(wordLinks);
    viewEl.appendChild(learnCard);

    // Per-language achievement for THIS user — one row per studied language.
    const userName = Storage.getUserName(Storage.getCurrentUser());
    const langCard = el("div", { class: "card stat-cum" });
    langCard.appendChild(el("div", { class: "muted", text: userName + L(" — Language progress"," — 言語の進捗") }));
    const langList = el("div", { class: "lang-prog-list" });
    Storage.getAllowedLangs().forEach((lc) => {
      const lmeta = getLangMeta(lc);
      if (!lmeta) return;
      const cards = App.allCards(lc);
      let lseen = 0, lmastered = 0;
      cards.forEach((c) => {
        const st = Storage.getCard(c.id, lc);
        if (st) { lseen += 1; if (st.interval >= 21) lmastered += 1; }
      });
      const total = cards.length || 1;
      const pct = Math.round((lseen / total) * 100);
      const row = el("button", { class: "lang-prog-row" + (lc === lang ? " active" : ""), onclick: () => {
        Storage.setLang(lc); App.refreshTopbar(); App.go("home");
      }});
      row.appendChild(el("div", { class: "lang-prog-flag", text: lmeta.flag }));
      const mid = el("div", { class: "lang-prog-mid" });
      mid.appendChild(el("div", { class: "lang-prog-name", text: lmeta.nativeName }));
      const bar = progressBar(pct, `linear-gradient(90deg, ${lmeta.color}, #7dd3fc)`);
      mid.appendChild(bar);
      row.appendChild(mid);
      row.appendChild(el("div", { class: "lang-prog-stat" }, [
        el("div", { class: "lang-prog-seen", text: lseen + "/" + cards.length }),
        el("div", { class: "muted small", text: "🌟 " + lmastered })
      ]));
      langList.appendChild(row);
    });
    langCard.appendChild(langList);
    viewEl.appendChild(langCard);

    // Cloud sync
    viewEl.appendChild(syncCard());

    // Settings
    const settings = el("div", { class: "card settings" });
    settings.appendChild(el("div", { class: "muted", text: L("Settings","設定") }));
    const themeBtn = el("button", { class: "btn ghost", text: Storage.getTheme() === "dark" ? L("🌙 Dark mode","🌙 ダークモード") : L("☀️ Light mode","☀️ ライトモード"), onclick: () => {
      const t = Storage.getTheme() === "dark" ? "light" : "dark";
      Storage.setTheme(t);
      document.body.classList.toggle("dark", t === "dark");
      App.go("profile");
    }});
    settings.appendChild(themeBtn);
    const resetBtn = el("button", { class: "btn warn", text: L("Reset all progress","進捗を全部リセット"), onclick: () => {
      if (!confirm(L("Reset all progress for all languages? Tap Cancel and use Export Backup first if you want to keep a copy.","全言語の進捗をリセットしますか？残したい場合はキャンセルして先にバックアップを書き出してください。"))) return;
      if (!confirm(L("Really wipe everything? This can't be undone.","本当に全部消しますか？元に戻せません。"))) return;
      Storage.reset();
      App.refreshTopbar();
      App.go("home");
    }});
    settings.appendChild(resetBtn);
    viewEl.appendChild(settings);

    // Backup card — explicit export/import so accidental deletes are recoverable
    const backup = el("div", { class: "card backup-card" });
    backup.appendChild(el("div", { class: "muted", text: L("📦 Backup","📦 バックアップ") }));
    backup.appendChild(el("div", { class: "muted small", style:"line-height:1.5;",
      html: "Saves the WHOLE app state (all 4 languages, custom words, marks, review schedule, stats and daily achievements)." }));

    // Show what's currently inside the file so the user knows it's not "just one language"
    const root = Storage.load();
    let totalReviewed = 0, totalCustom = 0, totalMarks = 0, totalDays = 0;
    Object.values(root.languages || {}).forEach((s) => {
      totalReviewed += Object.keys(s.cards || {}).length;
      totalCustom += (s.customCards || []).length;
      totalMarks += Object.keys(s.marks || {}).length;
    });
    totalDays = Object.keys((root.stats && root.stats.byDate) || {}).length;
    backup.appendChild(el("div", { class: "muted small", style:"margin-top:6px;padding:6px 10px;background:var(--surface-2);border-radius:10px;line-height:1.6;",
      html: `Inside right now: <b>${Object.keys(root.languages||{}).length}</b> languages · ` +
            `<b>${totalReviewed}</b> reviewed cards · ` +
            `<b>${totalCustom}</b> custom words · ` +
            `<b>${totalMarks}</b> self-marks · ` +
            `<b>${totalDays}</b> days of stats.`
    }));
    const backupRow = el("div", { style:"display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;" });
    backupRow.appendChild(el("button", { class: "btn primary", text: "📥 Export backup", onclick: () => {
      Storage.downloadBackup();
      toast("Backup downloaded ✨", "good");
    }}));
    const fileInput = el("input", { type: "file", accept: "application/json,.json", style: "display:none;" });
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const choice = confirm("Click OK to MERGE with current progress (safe — keeps both).\n\nClick Cancel to REPLACE everything with the backup file.");
        const result = Storage.importData(reader.result, choice);
        if (result.ok) {
          toast("Backup restored ✨", "good");
          App.refreshTopbar();
          App.go("profile");
        } else {
          toast("Import failed: " + result.error, "bad");
        }
        fileInput.value = "";
      };
      reader.readAsText(file);
    });
    backupRow.appendChild(fileInput);
    backupRow.appendChild(el("button", { class: "btn ghost", text: "📤 Import backup", onclick: () => fileInput.click() }));
    // 🆘 One-tap restore of the 21-card snapshot baked into js/data/last-known.js
    // (whatever we received in chat while debugging). Always available.
    if (window.LAST_KNOWN_DATA) {
      const lk = window.LAST_KNOWN_DATA;
      let lkCards = 0;
      Object.values(lk.languages || {}).forEach((s) => { lkCards += Object.keys(s.cards || {}).length; });
      backupRow.appendChild(el("button", { class: "btn warn", text: "🆘 Restore last-known (" + lkCards + " cards)", onclick: () => {
        if (!confirm("Restore the last data we have on record (" + lkCards + " cards from " + (lk.streak?.lastActiveDate || "earlier") + ")?\n\nOK = MERGE with current data (safe)\nCancel here keeps things as is.")) return;
        try { Storage.downloadBackup(); } catch (e) {}
        const r = Storage.importData(JSON.stringify(lk), /* merge */ true);
        if (r.ok) {
          toast("Restored " + lkCards + " cards ✨", "good");
          App.refreshTopbar();
          setTimeout(() => App.go("profile"), 300);
        } else { toast("Failed: " + r.error, "bad"); }
      }}));
    }
    backupRow.appendChild(el("button", { class: "btn ghost", text: "📋 Paste JSON", onclick: () => {
      const wrap = el("div", { class: "lang-picker" });
      wrap.appendChild(el("div", { class: "lang-picker-title", text: "Paste backup JSON" }));
      wrap.appendChild(el("div", { class: "muted small", style: "line-height:1.5;",
        text: "復元したい mumu の状態JSONを丸ごとここに貼り付け → Restore で復元。ファイルが消えてしまった時の最後の手段として使えます。" }));
      const ta = el("textarea", { class: "ex-input", style: "min-height:200px;font-family:monospace;font-size:11px;width:100%;",
        placeholder: '{ "currentLang": "ja", "languages": { ... }, ... }' });
      wrap.appendChild(ta);
      wrap.appendChild(el("button", { class: "btn primary big", text: "Restore", onclick: () => {
        const text = ta.value.trim();
        if (!text) { toast("Paste JSON first.", "bad"); return; }
        const choice = confirm("OK = MERGE (現在のデータと合体)\nCancel = REPLACE (貼り付けたデータで完全上書き)");
        // Safety backup first
        try { Storage.downloadBackup(); } catch (e) {}
        const result = Storage.importData(text, choice);
        if (result.ok) {
          toast("Restored ✨", "good");
          UI.closeModal();
          App.refreshTopbar();
          setTimeout(() => App.go("profile"), 400);
        } else {
          toast("Failed: " + result.error, "bad");
        }
      }}));
      UI.modal(wrap);
    }}));
    backup.appendChild(backupRow);
    viewEl.appendChild(backup);

    // 🔊 Voice — optional Google Cloud TTS key for natural audio
    const voiceCard = el("div", { class: "card" });
    voiceCard.appendChild(el("div", { class: "muted", text: L("🔊 Natural voice","🔊 自然な音声") }));
    voiceCard.appendChild(el("div", { class: "muted small", style: "line-height:1.6;margin-top:4px;",
      html: L(
        "Natural Neural2 audio is built in and works on every device — no setup needed. You can optionally paste your own Google Cloud Text-to-Speech API key to use your own quota instead.",
        "自然なNeural2音声は最初から内蔵で、全デバイスで設定不要。必要なら自分のGoogle Cloud TTS APIキーを貼って自分の枠で使うこともできる。") }));
    const keyInput = el("input", {
      type: "text", value: Audio.getKey(),
      placeholder: "AIza… (Google Cloud TTS API key)",
      style: "width:100%;box-sizing:border-box;margin-top:8px;padding:10px;border-radius:10px;border:1px solid var(--border);background:var(--surface-2);color:var(--text);font-size:13px;"
    });
    voiceCard.appendChild(keyInput);
    const vStatus = el("div", { class: "muted small", style: "margin-top:6px;",
      text: L("Active: ","現在: ") + Audio.activeVoiceName("ja-JP") });
    const vRow = el("div", { style: "display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;" });
    vRow.appendChild(el("button", { class: "btn primary", text: L("Save & test","保存してテスト"), onclick: () => {
      const k = keyInput.value.trim();
      vStatus.textContent = L("Testing…","確認中…");
      Audio.testKey(k, (ok, err) => {
        if (ok) {
          Audio.setKey(k);
          vStatus.textContent = L("✅ Working — ","✅ 成功 — ") + Audio.activeVoiceName("ja-JP");
          toast(L("Natural voice on ✨","自然な音声ON ✨"), "good");
        } else {
          vStatus.textContent = L("❌ Failed: ","❌ 失敗: ") + (err || "");
          toast(L("Key rejected","キーが無効"), "bad");
        }
      });
    }}));
    vRow.appendChild(el("button", { class: "btn ghost", text: L("Reset to built-in","内蔵に戻す"), onclick: () => {
      Audio.setKey(""); keyInput.value = "";
      vStatus.textContent = L("Active: ","現在: ") + Audio.activeVoiceName("ja-JP");
      toast(L("Using built-in voice ✨","内蔵音声を使用 ✨"), "good");
    }}));
    voiceCard.appendChild(vRow);
    voiceCard.appendChild(vStatus);
    voiceCard.appendChild(el("div", { class: "muted small", style: "margin-top:8px;line-height:1.6;",
      html: L(
        "How to get a key: console.cloud.google.com → create a project → enable “Cloud Text-to-Speech API” → APIs &amp; Services → Credentials → Create API key. Restrict it to the Text-to-Speech API.",
        "キーの取り方: console.cloud.google.com →プロジェクト作成→「Cloud Text-to-Speech API」を有効化→「APIとサービス」→「認証情報」→「APIキーを作成」。Text-to-Speech APIのみに制限推奨。") }));
    viewEl.appendChild(voiceCard);

    // 🛟 Auto-snapshot history — kept on this device so you can rewind even
    // without any backup file. Useful when sync ate your data.
    const snaps = Storage.getSnapshots();
    if (snaps.length) {
      const snapCard = el("div", { class: "card backup-card" });
      snapCard.appendChild(el("div", { class: "muted", text: "🛟 Auto snapshots (this device)" }));
      snapCard.appendChild(el("div", { class: "muted small", style:"line-height:1.5;margin-bottom:6px;",
        html: "Local rolling history of your state. Tap Restore to roll back if anything was accidentally wiped." }));
      const snapList = el("div", { style: "display:flex;flex-direction:column;gap:6px;" });
      snaps.forEach((s, i) => {
        const when = new Date(s.at);
        const ago = friendlyAgo(when);
        const item = el("div", { class: "snap-item" });
        item.appendChild(el("div", { class: "snap-info" }, [
          el("div", { style:"font-weight:700;font-size:13px;", text: ago }),
          el("div", { class: "muted small", text: s.cardCount + " cards · " + (s.reason || "auto") })
        ]));
        item.appendChild(el("button", { class: "btn ghost tiny", text: "Restore", onclick: () => {
          if (!confirm(`Restore the snapshot from ${ago}? (${s.cardCount} cards). Current state will itself be snapshotted before the rollback.`)) return;
          Storage.restoreSnapshot(i);
          App.refreshTopbar();
          App.go("profile");
          UI.toast("Restored ✨", "good");
        }}));
        snapList.appendChild(item);
      });
      snapCard.appendChild(snapList);
      viewEl.appendChild(snapCard);
    }

    // Storage info note
    const info = el("div", { class: "card storage-info muted small" });
    info.innerHTML = "Your progress, review schedule, learned words and stats are stored locally in <b>localStorage</b> under the key <code>mochi.v1</code>. Nothing leaves your device.";
    viewEl.appendChild(info);
  }

  // Cloud sync is fully automatic now — Firebase config is baked in and the
  // sync code is fixed across every device on this URL. The card is purely
  // informational so the user can confirm sync is alive.
  function syncCard() {
    const card = el("div", { class: "card sync-card" });
    card.appendChild(el("div", { class: "card-row" }, [
      el("div", {}, [
        el("div", { text: "☁️ Cloud sync", style: "font-weight:700;" }),
        el("div", { class: "muted small", text: "Auto-syncs across every device on this URL." })
      ]),
      el("div", { class: "sync-status", id: "sync-status-pill" })
    ]));
    refreshSyncPill();
    return card;
  }

  function refreshSyncPill() {
    const pill = document.getElementById("sync-status-pill");
    if (!pill || !window.Sync) return;
    const s = window.Sync.status();
    const map = {
      "disabled":   { label: "off",        cls: "muted" },
      "connecting": { label: "connecting…",cls: "warn"  },
      "pending":    { label: "syncing…",   cls: "warn"  },
      "synced":     { label: "synced ✓",   cls: "good"  },
      "error":      { label: "error",      cls: "bad"   }
    };
    const m = map[s.state] || map.disabled;
    pill.textContent = m.label;
    pill.className = "sync-status sync-status-" + m.cls;
  }

  function friendlyAgo(d) {
    const now = Date.now();
    const t = d.getTime();
    const sec = Math.max(1, Math.round((now - t) / 1000));
    if (sec < 60) return sec + "s ago";
    const min = Math.round(sec / 60);
    if (min < 60) return min + "m ago";
    const hr = Math.round(min / 60);
    if (hr < 24) return hr + "h ago";
    const day = Math.round(hr / 24);
    if (day < 7) return day + "d ago";
    return d.toISOString().slice(0, 10);
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
    const allowed = Storage.getAllowedLangs();
    Object.values(DATA_LANGS).filter((m) => allowed.indexOf(m.id) !== -1).forEach((meta) => {
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

  function userPicker() {
    const wrap = el("div", { class: "lang-picker" });
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Who's studying?" }));
    const cur = Storage.getCurrentUser();
    Storage.listUsers().forEach((u) => {
      const item = el("button", { class: "lang-option" + (u.id === cur ? " active" : ""), onclick: () => {
        Storage.setCurrentUser(u.id);
        UI.closeModal();
        App.refreshTopbar();
        App.go("home");
        UI.toast(u.name + " に切り替えました", "good");
      }});
      item.appendChild(el("div", { class: "lang-flag big", text: u.id === "rebecca" ? "🌹" : "🧑" }));
      item.appendChild(el("div", {}, [
        el("div", { class: "lang-name", text: u.name }),
        el("div", { class: "muted small", text: u.id === cur ? "Current" : "Tap to switch" })
      ]));
      wrap.appendChild(item);
    });
    UI.modal(wrap);
  }

  // ─────────────── ONBOARDING ───────────────
  function onboarding() {
    const wrap = el("div", { class: "lang-picker onboard" });
    wrap.appendChild(el("div", { class: "logo-mascot", text: "🍡", style:"font-size:64px;text-align:center;" }));
    wrap.appendChild(el("div", { class: "lang-picker-title", text: "Welcome to mumu!" }));
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

  return { home, unit, lesson, review, browse, profile, langPicker, userPicker, onboarding, refreshSyncPill };
})();
