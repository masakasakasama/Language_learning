// Exercise renderers used by the lesson runner.
window.Exercises = (function () {
  const { el, clear, shuffle, pickN } = UI;

  // Build a multiple-choice exercise from a target card and a pool of distractors.
  // direction: "front-to-back" (show front, pick back) or "back-to-front"
  function buildMultipleChoice(target, pool, direction) {
    const front = direction === "back-to-front" ? target.back : (target.front || target.jp);
    const correct = direction === "back-to-front" ? (target.front || target.jp) : target.back;
    const wrongs = pickN(pool.filter((c) => c.id !== target.id), 3, null)
      .map((c) => direction === "back-to-front" ? (c.front || c.jp) : c.back);
    const choices = shuffle([correct, ...wrongs]);
    return {
      type: "mc",
      prompt: front,
      hint: target.hint,
      audio: target.speakText,
      choices,
      answer: correct,
      card: target
    };
  }

  function buildListening(target, pool) {
    const correct = target.front || target.jp;
    const wrongs = pickN(pool.filter((c) => c.id !== target.id), 3, null)
      .map((c) => c.front || c.jp);
    const choices = shuffle([correct, ...wrongs]);
    return {
      type: "listen",
      prompt: "🔊 Tap to play, then choose what you heard",
      audio: target.speakText,
      choices,
      answer: correct,
      card: target
    };
  }

  function buildTyping(target) {
    return {
      type: "type",
      prompt: target.front || target.jp,
      hint: target.hint,
      audio: target.speakText,
      answer: (target.back || target.en || "").toLowerCase().trim(),
      acceptableAnswers: extractAcceptable(target),
      card: target
    };
  }

  // Extract acceptable answers (split on /, comma, " or ")
  function extractAcceptable(card) {
    const ans = (card.back || card.en || "").toLowerCase();
    const parts = ans.split(/\s*[/,]\s*| or /);
    const set = new Set();
    parts.forEach((p) => {
      const cleaned = p.replace(/\(.*?\)/g, "").trim();
      if (cleaned) set.add(cleaned);
    });
    set.add(ans);
    return [...set];
  }

  // Render a multiple-choice exercise into a container; calls onAnswer(correctBoolean)
  function renderMC(ex, container, onAnswer) {
    clear(container);
    const wrap = el("div", { class: "ex ex-mc" });

    const promptRow = el("div", { class: "ex-prompt-row" }, [
      el("div", { class: "ex-prompt", text: ex.prompt }),
      ex.audio ? el("button", { class: "ex-audio-btn", onclick: () => App.speak(ex.audio) }, ["🔊"]) : null
    ]);
    wrap.appendChild(promptRow);

    if (ex.hint) wrap.appendChild(el("div", { class: "ex-hint", text: ex.hint }));

    const choicesEl = el("div", { class: "ex-choices" });
    ex.choices.forEach((choice) => {
      const btn = el("button", { class: "choice-btn", text: choice });
      btn.onclick = () => {
        if (choicesEl.dataset.locked) return;
        choicesEl.dataset.locked = "1";
        const correct = choice === ex.answer;
        if (correct) btn.classList.add("correct");
        else {
          btn.classList.add("wrong");
          // show correct
          choicesEl.querySelectorAll(".choice-btn").forEach((b) => {
            if (b.textContent === ex.answer) b.classList.add("correct");
          });
        }
        showFeedback(wrap, correct, ex.answer, () => onAnswer(correct), ex.card && ex.card.de);
      };
      choicesEl.appendChild(btn);
    });
    wrap.appendChild(choicesEl);

    container.appendChild(wrap);
  }

  function renderListen(ex, container, onAnswer) {
    clear(container);
    const wrap = el("div", { class: "ex ex-listen" });
    const big = el("button", {
      class: "ex-listen-btn",
      onclick: () => App.speak(ex.audio)
    }, ["🔊"]);
    wrap.appendChild(big);
    wrap.appendChild(el("div", { class: "ex-prompt", text: "Tap to play, then choose what you heard" }));

    const slowBtn = el("button", { class: "ex-slow-btn", onclick: () => App.speakSlow(ex.audio) }, ["🐢 slower"]);
    wrap.appendChild(slowBtn);

    const choicesEl = el("div", { class: "ex-choices" });
    ex.choices.forEach((choice) => {
      const btn = el("button", { class: "choice-btn choice-jp", text: choice });
      btn.onclick = () => {
        if (choicesEl.dataset.locked) return;
        choicesEl.dataset.locked = "1";
        const correct = choice === ex.answer;
        if (correct) btn.classList.add("correct");
        else {
          btn.classList.add("wrong");
          choicesEl.querySelectorAll(".choice-btn").forEach((b) => {
            if (b.textContent === ex.answer) b.classList.add("correct");
          });
        }
        showFeedback(wrap, correct, ex.answer, () => onAnswer(correct));
      };
      choicesEl.appendChild(btn);
    });
    wrap.appendChild(choicesEl);

    container.appendChild(wrap);

    // auto-play once on appearance
    setTimeout(() => App.speak(ex.audio), 200);
  }

  function renderTyping(ex, container, onAnswer) {
    clear(container);
    const wrap = el("div", { class: "ex ex-type" });

    const promptRow = el("div", { class: "ex-prompt-row" }, [
      el("div", { class: "ex-prompt", text: ex.prompt }),
      ex.audio ? el("button", { class: "ex-audio-btn", onclick: () => App.speak(ex.audio) }, ["🔊"]) : null
    ]);
    wrap.appendChild(promptRow);
    if (ex.hint) wrap.appendChild(el("div", { class: "ex-hint", text: ex.hint }));

    const input = el("input", { class: "ex-input", type: "text", placeholder: "Type the meaning…", autocomplete: "off", autocapitalize: "none" });
    wrap.appendChild(input);

    const submit = el("button", { class: "btn primary big", text: "Check" });
    submit.onclick = () => {
      if (wrap.dataset.locked) return;
      wrap.dataset.locked = "1";
      const v = input.value.toLowerCase().trim();
      const correct = ex.acceptableAnswers.some((a) => v === a) || v === ex.answer;
      input.classList.add(correct ? "correct" : "wrong");
      showFeedback(wrap, correct, ex.answer, () => onAnswer(correct));
    };
    wrap.appendChild(submit);

    setTimeout(() => input.focus(), 100);
    input.onkeydown = (e) => { if (e.key === "Enter") submit.click(); };

    container.appendChild(wrap);
  }

  function showFeedback(wrap, correct, answer, cb, deAnswer) {
    const fb = el("div", { class: "ex-feedback " + (correct ? "good" : "bad") });
    let body;
    if (correct) body = `<div class="fb-icon">✨</div><div class="fb-text">Nice!</div>`;
    else {
      let txt = `<b>${answer}</b>`;
      if (deAnswer) txt += ` <span class="tr-de inline">${deAnswer}</span>`;
      body = `<div class="fb-icon">😿</div><div class="fb-text">Correct: ${txt}</div>`;
    }
    fb.innerHTML = body;
    const cont = el("button", { class: "btn " + (correct ? "primary" : "warn") + " big", text: "Continue" });
    cont.onclick = cb;
    fb.appendChild(cont);
    wrap.appendChild(fb);
  }

  // Renders an introduction / flashcard view for a new word
  function renderIntro(card, container, onContinue, examples) {
    clear(container);
    const wrap = el("div", { class: "ex ex-intro" });
    wrap.appendChild(el("div", { class: "intro-label", text: "New word ✨" }));
    const emoji = (window.EMOJI && window.EMOJI.lookup(card)) || "";
    if (emoji) wrap.appendChild(el("div", { class: "intro-emoji", text: emoji }));
    wrap.appendChild(el("div", { class: "intro-jp", text: card.front || card.jp }));
    if (card.kana && card.kana !== card.front) {
      wrap.appendChild(el("div", { class: "intro-kana", text: card.kana }));
    }
    if (card.romaji && card.romaji !== card.kana) {
      wrap.appendChild(el("div", { class: "intro-romaji", text: card.romaji }));
    }
    wrap.appendChild(el("div", { class: "intro-en" }, [
      el("span", { class: "tr-en", text: card.back || card.en }),
      card.de ? el("span", { class: "tr-de", text: card.de }) : null
    ]));

    if (card.hint) {
      wrap.appendChild(el("div", { class: "intro-hint", text: card.hint }));
    }

    const audioBtn = el("button", { class: "btn ghost big", onclick: () => App.speak(card.speakText) }, ["🔊 Listen"]);
    wrap.appendChild(audioBtn);

    if (examples && examples.length) {
      const exWrap = el("div", { class: "intro-examples" });
      exWrap.appendChild(el("div", { class: "intro-ex-title", text: "Example (using words you know):" }));
      examples.slice(0, 2).forEach((ex) => {
        const exEl = el("div", { class: "intro-ex" }, [
          el("div", { class: "intro-ex-text", text: ex.text }),
          el("div", { class: "intro-ex-tr", text: ex.tr }),
          el("button", { class: "btn ghost tiny", onclick: () => App.speak(ex.text) }, ["🔊"])
        ]);
        exWrap.appendChild(exEl);
      });
      wrap.appendChild(exWrap);
    }

    // 3-button self-assessment: Easy / OK / Hard.
    // Each calls onContinue(markId) so the lesson runner can record the mark.
    const markPanel = el("div", { class: "intro-marks" });
    markPanel.appendChild(el("div", { class: "muted small center", style:"margin-bottom:6px;", text: "How well do you know this?" }));
    const row = el("div", { class: "mark-row mark-row-big" });
    [
      { id: "know",     icon: "😀", label: "Easy" },
      { id: "ok",       icon: "😐", label: "OK" },
      { id: "dontknow", icon: "😕", label: "Hard" }
    ].forEach((o) => {
      const btn = el("button", { class: "mark-btn mark-btn-big mark-" + o.id }, [
        el("div", { class: "mark-icon", text: o.icon }),
        el("div", { class: "mark-label-txt", text: o.label })
      ]);
      btn.onclick = () => onContinue(o.id);
      row.appendChild(btn);
    });
    markPanel.appendChild(row);
    wrap.appendChild(markPanel);

    container.appendChild(wrap);
    // auto-play
    setTimeout(() => App.speak(card.speakText), 250);
  }

  // Grammar card renderer
  function renderGrammar(grammar, container, onContinue) {
    clear(container);
    const wrap = el("div", { class: "ex ex-grammar" });
    wrap.appendChild(el("div", { class: "grammar-title", text: grammar.title }));
    wrap.appendChild(el("div", { class: "grammar-intro", html: grammar.intro.replace(/\n/g, "<br>") }));

    const exTitle = el("div", { class: "grammar-ex-title", text: "Examples" });
    wrap.appendChild(exTitle);
    grammar.examples.forEach((e) => {
      const item = el("div", { class: "grammar-ex" });
      const row = el("div", { class: "grammar-ex-row" }, [
        el("div", { class: "grammar-ex-jp", text: e.jp }),
        el("button", { class: "btn ghost tiny", onclick: () => App.speak(e.jp) }, ["🔊"])
      ]);
      item.appendChild(row);
      item.appendChild(el("div", { class: "grammar-ex-en", text: e.en }));
      if (e.de) item.appendChild(el("div", { class: "grammar-ex-en tr-de", text: e.de }));
      if (e.breakdown) item.appendChild(el("div", { class: "grammar-ex-bd", text: e.breakdown }));
      wrap.appendChild(item);
    });

    const cont = el("button", { class: "btn primary big", text: "Practice →", onclick: onContinue });
    wrap.appendChild(cont);

    container.appendChild(wrap);
  }

  // Grammar quiz item (mc or fill, both rendered like MC)
  function renderGrammarQuiz(quiz, container, onAnswer) {
    clear(container);
    const wrap = el("div", { class: "ex ex-mc" });
    wrap.appendChild(el("div", { class: "ex-prompt", text: quiz.q }));
    const choicesEl = el("div", { class: "ex-choices" });
    quiz.choices.forEach((c) => {
      const btn = el("button", { class: "choice-btn", text: c });
      btn.onclick = () => {
        if (choicesEl.dataset.locked) return;
        choicesEl.dataset.locked = "1";
        const correct = c === quiz.answer;
        if (correct) btn.classList.add("correct");
        else {
          btn.classList.add("wrong");
          choicesEl.querySelectorAll(".choice-btn").forEach((b) => {
            if (b.textContent === quiz.answer) b.classList.add("correct");
          });
        }
        showFeedback(wrap, correct, quiz.answer, () => onAnswer(correct));
      };
      choicesEl.appendChild(btn);
    });
    wrap.appendChild(choicesEl);
    container.appendChild(wrap);
  }

  return {
    buildMultipleChoice, buildListening, buildTyping,
    renderMC, renderListen, renderTyping, renderIntro,
    renderGrammar, renderGrammarQuiz
  };
})();
