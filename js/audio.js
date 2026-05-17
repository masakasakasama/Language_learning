// Pronunciation.
//
// Primary (if a key is set): Google Cloud Text-to-Speech — genuine
// natural Neural2 voices. The user supplies their own API key; Google's
// free tier covers ~1,000,000 chars/month. Audio is cached in memory so
// repeated taps don't re-spend quota.
//
// Fallback: Web Speech API (device voice). NOTE: iOS does NOT expose the
// downloaded "Enhanced" voices to the web speech API, so the fallback is
// robotic on iPhone — that is an Apple limitation, not a bug here.
window.Audio = (function () {
  const KEY_LS = "mumu_tts_key";
  function getKey() { try { return localStorage.getItem(KEY_LS) || ""; } catch (e) { return ""; } }
  function setKey(k) { try { k ? localStorage.setItem(KEY_LS, k.trim()) : localStorage.removeItem(KEY_LS); } catch (e) {} }

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
    if (/neural|natural|premium|enhanced|wavenet|siri/i.test(n)) s += 70;
    if (/Google/i.test(n)) s += 35;
    if (/Microsoft/i.test(n)) s += 22;
    if (/Kyoko|Otoya|O-ren|Hattori|Ayumi|Sora|Nanami|Keita|Mizuki|Yuna|Heami|Sun-Hi|Huihui|Xiaoxiao|Yunyang|Tingting|Sin-?ji/i.test(n)) s += 28;
    if (v.localService === false) s += 18;
    if (v.default) s += 2;
    if (/compact|eloquence|espeak|robot|fred|albert|zarvox/i.test(n)) s -= 100;
    return s;
  }
  function pickVoice(bcp47) {
    if (!voicesReady) loadVoices();
    if (!voices.length) return null;
    const lang = (bcp47 || "en-US").toLowerCase();
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

  // ── Google Cloud TTS ──
  // languageCode + a natural Neural2 voice per app language.
  function gVoice(bcp47) {
    const p = (bcp47 || "en").toLowerCase().split("-")[0];
    const M = {
      ja: ["ja-JP", "ja-JP-Neural2-B"],
      en: ["en-US", "en-US-Neural2-F"],
      de: ["de-DE", "de-DE-Neural2-F"],
      ko: ["ko-KR", "ko-KR-Neural2-A"],
      es: ["es-ES", "es-ES-Neural2-F"],
      zh: ["cmn-CN", "cmn-CN-Wavenet-A"]
    };
    return M[p] || M.en;
  }

  const memCache = new Map(); // key: lang|rate|text → data URI
  let curAudio = null;
  function stopAudio() {
    if (curAudio) { try { curAudio.onended = curAudio.onerror = null; curAudio.pause(); } catch (e) {} curAudio = null; }
  }
  function playDataUri(uri) {
    stopAudio();
    const a = document.createElement("audio");
    curAudio = a;
    a.src = uri;
    const p = a.play();
    if (p && p.catch) p.catch(function () {});
  }

  function cloudSpeak(text, bcp47, opts, onFail) {
    const key = getKey();
    if (!key) { onFail(); return; }
    const t = tuneFor(bcp47);
    const rate = opts && opts.rate != null ? opts.rate : t.rate;
    const gv = gVoice(bcp47);
    const cacheKey = gv[1] + "|" + rate + "|" + text;
    if (memCache.has(cacheKey)) { playDataUri(memCache.get(cacheKey)); return; }
    const body = {
      input: { text: String(text) },
      voice: { languageCode: gv[0], name: gv[1] },
      audioConfig: { audioEncoding: "MP3", speakingRate: rate, pitch: 0 }
    };
    let done = false;
    const to = setTimeout(function () { if (!done) { done = true; onFail(); } }, 8000);
    fetch("https://texttospeech.googleapis.com/v1/text:synthesize?key=" + encodeURIComponent(key), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error("tts " + r.status);
      return r.json();
    }).then(function (j) {
      if (done) return;
      done = true; clearTimeout(to);
      if (!j || !j.audioContent) { onFail(); return; }
      const uri = "data:audio/mp3;base64," + j.audioContent;
      if (memCache.size > 300) memCache.clear();
      memCache.set(cacheKey, uri);
      playDataUri(uri);
    }).catch(function () {
      if (done) return;
      done = true; clearTimeout(to);
      onFail();
    });
  }

  function speak(text, bcp47, opts) {
    if (!text) return;
    opts = opts || {};
    try { speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
    stopAudio();
    if (getKey()) {
      cloudSpeak(text, bcp47, opts, function () { synthSpeak(text, bcp47, opts); });
    } else {
      synthSpeak(text, bcp47, opts);
    }
  }
  function speakSlow(text, bcp47) { speak(text, bcp47, { rate: 0.6 }); }
  function isSupported() { return typeof speechSynthesis !== "undefined" || typeof document !== "undefined"; }

  function activeVoiceName(bcp47) {
    if (getKey()) return "Google Cloud · " + gVoice(bcp47 || "ja-JP")[1];
    const v = pickVoice(bcp47 || "ja-JP");
    return v ? (v.name + (v.localService === false ? " (online)" : "")) : "(default system voice)";
  }

  // Test a key: resolves true if Google TTS accepts it.
  function testKey(k, cb) {
    const key = (k || "").trim();
    if (!key) { cb(false, "empty"); return; }
    fetch("https://texttospeech.googleapis.com/v1/text:synthesize?key=" + encodeURIComponent(key), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text: "テスト" },
        voice: { languageCode: "ja-JP", name: "ja-JP-Neural2-B" },
        audioConfig: { audioEncoding: "MP3" }
      })
    }).then(function (r) {
      return r.json().then(function (j) {
        if (r.ok && j && j.audioContent) { cb(true); playDataUri("data:audio/mp3;base64," + j.audioContent); }
        else cb(false, (j && j.error && j.error.message) || ("HTTP " + r.status));
      });
    }).catch(function (e) { cb(false, String(e)); });
  }

  return { speak, speakSlow, pickVoice, isSupported, activeVoiceName, getKey, setKey, testKey };
})();
