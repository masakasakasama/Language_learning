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

  // Higher = more natural. Cloud/neural/premium voices win.
  function voiceScore(v) {
    let s = 0;
    const n = v.name || "";
    if (/neural|natural|premium|enhanced|wavenet|siri/i.test(n)) s += 60;
    if (/Google/i.test(n)) s += 35;
    if (/Microsoft/i.test(n)) s += 22;
    // Known good per-language native voices
    if (/Kyoko|Otoya|O-ren|Hattori|Ayumi|Sora|Nanami|Keita|Mizuki|Yuna|Heami|Sun-Hi|Huihui|Xiaoxiao|Yunyang|Tingting|Sin-?ji/i.test(n)) s += 28;
    if (v.localService === false) s += 18; // online voices are usually richer
    if (v.default) s += 2;
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

  // Small per-language tweaks so the default voice sounds less robotic.
  function tuneFor(bcp47) {
    const p = (bcp47 || "").toLowerCase().split("-")[0];
    if (p === "ja") return { rate: 0.95, pitch: 1.02 };
    if (p === "zh") return { rate: 0.92, pitch: 1.0 };
    if (p === "ko") return { rate: 0.95, pitch: 1.0 };
    if (p === "de") return { rate: 0.95, pitch: 0.98 };
    return { rate: 0.97, pitch: 1.0 };
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
    const t = tuneFor(u.lang);
    u.rate = opts.rate != null ? opts.rate : t.rate;
    u.pitch = opts.pitch != null ? opts.pitch : t.pitch;
    u.volume = opts.volume != null ? opts.volume : 1.0;
    try { speechSynthesis.speak(u); } catch (e) {}
  }

  function speakSlow(text, bcp47) { speak(text, bcp47, { rate: 0.6 }); }

  function isSupported() { return typeof speechSynthesis !== "undefined"; }

  return { speak, speakSlow, pickVoice, isSupported };
})();
