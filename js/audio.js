// Pronunciation via Web Speech API.
// Uses the best available voice for each language.
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

  function pickVoice(bcp47) {
    if (!voicesReady) loadVoices();
    if (!voices.length) return null;
    const lang = bcp47.toLowerCase();
    const langPrefix = lang.split("-")[0];
    // Prefer exact match then prefix match. Prefer "Google" / "Microsoft" voices when available.
    const exact = voices.filter((v) => v.lang.toLowerCase() === lang);
    const prefix = voices.filter((v) => v.lang.toLowerCase().startsWith(langPrefix));
    const candidates = exact.length ? exact : prefix;
    if (!candidates.length) return null;
    const preferred = candidates.find((v) => /Google|Microsoft|Kyoko|Ayumi|Otoya|Sora|Yuna|Heami/i.test(v.name));
    return preferred || candidates[0];
  }

  function speak(text, bcp47, opts) {
    if (!text) return;
    if (typeof speechSynthesis === "undefined") return;
    if (!opts) opts = {};
    try {
      speechSynthesis.cancel();
    } catch (e) {}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = bcp47 || "en-US";
    const v = pickVoice(u.lang);
    if (v) u.voice = v;
    u.rate = opts.rate != null ? opts.rate : 0.9;
    u.pitch = opts.pitch != null ? opts.pitch : 1.0;
    u.volume = opts.volume != null ? opts.volume : 1.0;
    try { speechSynthesis.speak(u); } catch (e) {}
  }

  function speakSlow(text, bcp47) { speak(text, bcp47, { rate: 0.55 }); }

  function isSupported() { return typeof speechSynthesis !== "undefined"; }

  return { speak, speakSlow, pickVoice, isSupported };
})();
