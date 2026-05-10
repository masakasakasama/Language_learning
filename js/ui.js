// UI helpers: toasts, confetti, mascot, helpers
window.UI = (function () {

  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") e.className = attrs[k];
        else if (k === "html") e.innerHTML = attrs[k];
        else if (k === "text") e.textContent = attrs[k];
        else if (k === "onclick") e.addEventListener("click", attrs[k]);
        else if (k === "style") e.setAttribute("style", attrs[k]);
        else if (k.startsWith("data-")) e.setAttribute(k, attrs[k]);
        else e.setAttribute(k, attrs[k]);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach((c) => {
        if (c == null) return;
        if (typeof c === "string") e.appendChild(document.createTextNode(c));
        else e.appendChild(c);
      });
    }
    return e;
  }

  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  function toast(msg, kind) {
    const c = document.getElementById("toast-container");
    const t = el("div", { class: "toast " + (kind || "") });
    t.innerHTML = msg;
    c.appendChild(t);
    setTimeout(() => t.classList.add("show"), 10);
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 2400);
  }

  function confetti() {
    const c = document.getElementById("confetti-container");
    const colors = ["#ff7eb6","#7dd3fc","#fde68a","#a8e6a3","#c084fc","#fb923c"];
    for (let i = 0; i < 50; i++) {
      const piece = el("div", { class: "confetti-piece" });
      piece.style.left = Math.random() * 100 + "%";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = (Math.random() * 0.4) + "s";
      piece.style.animationDuration = (1.4 + Math.random() * 1) + "s";
      piece.style.width = (6 + Math.random() * 10) + "px";
      piece.style.height = (6 + Math.random() * 10) + "px";
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      c.appendChild(piece);
      setTimeout(() => piece.remove(), 3000);
    }
  }

  function mascot(mood, text) {
    // mood: happy | thinking | sad | proud
    const faces = {
      happy:    "(=^･ω･^=)♪",
      thinking: "(・_・?)",
      sad:      "(T_T)",
      proud:    "(=^‥^=)✨",
      hi:       "(=^‥^=)ﾉ"
    };
    const face = faces[mood] || faces.happy;
    return el("div", { class: "mascot mascot-" + (mood || "happy") }, [
      el("div", { class: "mascot-face", text: face }),
      text ? el("div", { class: "mascot-bubble", html: text }) : null
    ]);
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickN(arr, n, exclude) {
    const filtered = exclude ? arr.filter((x) => x !== exclude) : arr;
    return shuffle(filtered).slice(0, n);
  }

  function progressBar(percent, color) {
    const bar = el("div", { class: "progress-bar" });
    const fill = el("div", { class: "progress-fill" });
    fill.style.width = Math.min(100, Math.max(0, percent)) + "%";
    if (color) fill.style.background = color;
    bar.appendChild(fill);
    return bar;
  }

  function modal(content) {
    const back = document.getElementById("modal-backdrop");
    clear(back);
    const inner = el("div", { class: "modal" });
    inner.appendChild(content);
    back.appendChild(inner);
    back.classList.remove("hidden");
    back.onclick = (e) => { if (e.target === back) closeModal(); };
  }
  function closeModal() {
    const back = document.getElementById("modal-backdrop");
    back.classList.add("hidden");
    clear(back);
  }

  return { el, clear, toast, confetti, mascot, shuffle, pickN, progressBar, modal, closeModal };
})();
