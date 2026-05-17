// Pronunciation.
// Primary: free public Google Translate TTS (no API key) — much more
// natural than the built-in iOS "compact" voices. Falls back to the
// Web Speech API when offline / blocked / for slow playback.
window.Audio = (function () {
  let voices = [];
  let voicesReady = false;

  function loadVoices() {
    if (typeof speechSynthesis === "undefined") return;
    voices = speechSynthesis.getVoices() || [];
    voicesReady = voices.length > 0;
  }
  loadVoices();
  if (typeof speechSynthesis !== "undefined" && typeof speechSynthesis.onvoiceschanged !== "undefined") {
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  function voiceScore(v) {
    let s = 0;
    const n = v.name || "";
    if (/neural|natural|premium|enhanced|wavenet|siri/i.test(n)) s += 60;
    if (/Google/i.test(n)) s += 35;
    if (/Microsoft/i.test(n)) s += 22;
    if (/Kyoko|Otoya|O-ren|Hattori|Ayumi|Sora|Nanami|Keita|Mizuki|Yuna|Heami|Sun-Hi|Huihui|Xiaoxiao|Yunyang|Tingting|Sin-?ji/i.test(n)) s += 28;
    if (v.localService === false) s += 18;
    if (v.default) s += 2;
    if (/compact|eloquence|espeak|robot|fred|albert|zarvox/i.test(n)) s -= 80;
    return s;
  }

  function pickVoice(bcp47) {
    if (!voicesReady) loadVoices();
    if (!voices.length) return null;
    const lang = bcp47.toLowerCase();
    const langPrefix = lang.split("-")[0];
    const exact = voices.filter((v) => v.lang.toLowerCase() === lang);
    const prefix = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
    const candidates = (exact.length ? exact : prefix).slice();
    if (!candidates.length) return null;
    candidates.sort((a, b) => voiceScore(b) - voiceScore(a));
    return candidates[0];
  }

  function tuneFor(bcp47) {
    const p = (bcp47 || "").toLowerCase().split("-")[0];
    if (p === "ja") return { rate: 0.95, pitch: 1.02 };
    if (p === "zh") return { rate: 0.92, pitch: 1.0 };
    if (p === "ko") return { rate: 0.95, pitch: 1.0 };
    if (p === "de") return { rate: 0.95, pitch: 0.98 };
    return { rate: 0.97, pitch: 1.0 };
  }

  // ── Web Speech fallback ──
  function synthSpeak(text, bcp47, opts) {
    if (typeof speechSynthesis === "undefined") return;
    opts = opts || {};
    try { speechSynthesis.cancel(); } catch (e) {}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = bcp47 || "en-US";
    const v = pickVoice(u.lang);
    if (v) u.voice = v;
    const t = tuneFor(u.lang);
    u.rate = opts.rate != null ? opts.rate : t.rate;
    u.pitch = opts.pitch != null ? opts.pitch : t.pitch;
    u.volume = opts.volume != null ? opts.volume : 1.0;
    try { speechSynthesis.speak(u); } catch (e) {}
  }

  // ── Free public neural-ish TTS (Google Translate, no key) ──
  function ttsLang(bcp47) {
    const p = (bcp47 || "en").toLowerCase().split("-")[0];
    if (p === "zh") return "zh-CN";
    return p;
  }
  // Endpoint accepts ~200 chars; split long text on sentence/space.
  function chunk(text) {
    const parts = [];
    let rest = String(text).trim();
    while (rest.length > 180) {
      let cut = -1;
      const win = rest.slice(0, 180);
      const m = win.match(/[。．.!?！？、,；;:\s][^。．.!?！？、,；;:\s]*$/);
      cut = m ? m.index + 1 : 180;
      parts.push(rest.slice(0, cut).trim());
      rest = rest.slice(cut).trim();
    }
    if (rest) parts.push(rest);
    return parts.filter(Boolean);
  }

  let curAudio = null;
  function stopAudio() {
    if (curAudio) {
      try { curAudio.onended = curAudio.onerror = null; curAudio.pause(); } catch (e) {}
      curAudio = null;
    }
  }

  function playChunks(urls, onFail) {
    let i = 0;
    let failed = false;
    function next() {
      if (failed || i >= urls.length) return;
      const a = document.createElement("audio");
      curAudio = a;
      a.src = urls[i];
      a.onended = function () { i++; next(); };
      a.onerror = function () {
        if (failed) return;
        failed = true;
        stopAudio();
        if (i === 0 && typeof onFail === "function") onFail();
      };
      const p = a.play();
      if (p && p.catch) p.catch(function () {
        if (failed) return;
        failed = true;
        stopAudio();
        if (i === 0 && typeof onFail === "function") onFail();
      });
    }
    next();
  }

  function speak(text, bcp47, opts) {
    if (!text) return;
    opts = opts || {};
    try { speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
    stopAudio();
    // Slow/clear playback is for studying — the system voice handles
    // rate changes; the public endpoint does not.
    if (opts.rate != null && opts.rate < 0.85) { synthSpeak(text, bcp47, opts); return; }
    const online = typeof navigator === "undefined" || navigator.onLine !== false;
    if (!online) { synthSpeak(text, bcp47, opts); return; }
    const tl = ttsLang(bcp47);
    const urls = chunk(text).map((c) =>
      "https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=" +
      encodeURIComponent(tl) + "&q=" + encodeURIComponent(c));
    if (!urls.length) return;
    playChunks(urls, function () { synthSpeak(text, bcp47, opts); });
  }

  function speakSlow(text, bcp47) { synthSpeak(text, bcp47, { rate: 0.6 }); }

  function isSupported() {
    return typeof speechSynthesis !== "undefined" || typeof document !== "undefined";
  }

  return { speak, speakSlow, pickVoice, isSupported };
})();
