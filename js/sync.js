// Cloud sync via Firebase Firestore.
// Two modes:
//   1) "code"  — easy: a sync code (random string) acts as the shared "room".
//                Data lives at  sync/{code}/state/main . Anonymous auth in background.
//                No Google login. Same code on N devices = same data.
//   2) "user"  — sign in with Google. Data lives at users/{uid}/state/main.
// Mode is decided at setup; both work over the same Firebase project.
//
// A single share string ("share payload") base64-encodes  { cfg, code }  so the
// second device only has to paste one thing — no typing the Firebase config twice.

import {
  initializeApp, getApps, getApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup,
  signInAnonymously, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const CFG_KEY    = "mochi.firebase.config";
const CODE_KEY   = "mochi.firebase.syncCode";
const MODE_KEY   = "mochi.firebase.syncMode";   // "code" | "user"
const STATE_KEY  = "mochi.v1";

// Firebase config baked into the app so no setup is ever required.
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCIezNBc2VaPgt3aYcMo2e3gIUpzlJB_5w",
  authDomain: "language-learning-a740a.firebaseapp.com",
  projectId: "language-learning-a740a",
  storageBucket: "language-learning-a740a.firebasestorage.app",
  messagingSenderId: "388233596942",
  appId: "1:388233596942:web:3edeecfb8da8160955ac5f"
};

// Every device that opens this URL writes to the same Firestore document.
// No codes, no pairing — just "open the link, you're in." The URL itself
// is the shared secret.
const SHARED_SYNC_CODE = "mumu-household-2026";

let app = null, auth = null, db = null, unsub = null, currentUser = null;
let syncEnabled = false, applyingRemote = false;
let lastPushAt = 0;
const writeDebounceMs = 1500;
let pushTimer = null;

function getCfg() {
  // Prefer a saved user-overridden config (legacy), otherwise fall back to the
  // baked-in default so sync just works on a fresh device.
  try {
    const stored = JSON.parse(localStorage.getItem(CFG_KEY) || "null");
    if (stored && stored.apiKey) return stored;
  } catch (e) {}
  return DEFAULT_FIREBASE_CONFIG;
}
const setCfg  = (c) => localStorage.setItem(CFG_KEY, JSON.stringify(c));
// Sync code is now fixed across all devices visiting this URL. We still
// expose the storage helpers for back-compat but they always return the
// shared code so existing UI / sync paths keep working.
const getCode = () => SHARED_SYNC_CODE;
const setCode = (_) => { /* no-op: shared code is fixed */ };
const getMode = () => localStorage.getItem(MODE_KEY) || "code";
const setMode = (m) => localStorage.setItem(MODE_KEY, m);

function clearLocalSync() {
  localStorage.removeItem(CFG_KEY);
  localStorage.removeItem(CODE_KEY);
  localStorage.removeItem(MODE_KEY);
}

function getLocalState() {
  try { return JSON.parse(localStorage.getItem(STATE_KEY) || "{}"); }
  catch (e) { return {}; }
}
function setLocalState(s) {
  localStorage.setItem(STATE_KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("mochi:remote-applied"));
}

// Random 16-char base32-ish code, easy to type
function genCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // omit 0/O/1/I
  let s = "";
  const bytes = new Uint8Array(16);
  (crypto || window.crypto).getRandomValues(bytes);
  for (let i = 0; i < 16; i++) s += alphabet[bytes[i] % alphabet.length];
  return s.slice(0, 4) + "-" + s.slice(4, 8) + "-" + s.slice(8, 12) + "-" + s.slice(12, 16);
}

// Encode { cfg, code } into a single share string (base64url of JSON)
function buildSharePayload() {
  const cfg = getCfg();
  const code = getCode();
  if (!cfg || !code) return null;
  const json = JSON.stringify({ cfg, code, mode: "code" });
  return "mochi1:" + btoa(json).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function parseSharePayload(s) {
  if (!s) return null;
  s = s.trim();
  if (s.startsWith("mochi1:")) s = s.slice("mochi1:".length);
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  // pad
  while (s.length % 4) s += "=";
  try {
    const obj = JSON.parse(atob(s));
    if (obj && obj.cfg && obj.code) return obj;
  } catch (e) {}
  return null;
}

// ─────────────── Smart merge ───────────────
function mergeStates(local, remote) {
  if (!local || !Object.keys(local).length) return remote;
  if (!remote || !Object.keys(remote).length) return local;
  const out = JSON.parse(JSON.stringify(local));

  if (remote.writeAt && (!local.writeAt || remote.writeAt > local.writeAt)) {
    if (remote.currentLang) out.currentLang = remote.currentLang;
    if (remote.theme) out.theme = remote.theme;
  }
  out.onboarded = !!(local.onboarded || remote.onboarded);

  out.streak = local.streak || { current: 0, longest: 0, lastActiveDate: null };
  const rs = remote.streak || {};
  if (rs.lastActiveDate && (!out.streak.lastActiveDate || rs.lastActiveDate > out.streak.lastActiveDate)) {
    out.streak.current = rs.current || 0;
    out.streak.lastActiveDate = rs.lastActiveDate;
  }
  out.streak.longest = Math.max(out.streak.longest || 0, rs.longest || 0);

  out.xpTotal = Math.max(local.xpTotal || 0, remote.xpTotal || 0);

  out.stats = out.stats || { byDate: {} };
  const rstats = (remote.stats && remote.stats.byDate) || {};
  Object.keys(rstats).forEach((d) => {
    const a = out.stats.byDate[d] || { mins:0, cards:0, correct:0, lessons:0, xp:0, byLang: {} };
    const b = rstats[d];
    const merged = {
      mins: Math.max(a.mins||0, b.mins||0),
      cards: Math.max(a.cards||0, b.cards||0),
      correct: Math.max(a.correct||0, b.correct||0),
      lessons: Math.max(a.lessons||0, b.lessons||0),
      xp: Math.max(a.xp||0, b.xp||0),
      byLang: Object.assign({}, a.byLang || {})
    };
    const bLang = (b.byLang) || {};
    Object.keys(bLang).forEach((L) => {
      const x = merged.byLang[L] || { cards:0, correct:0, xp:0 };
      const y = bLang[L] || {};
      merged.byLang[L] = {
        cards: Math.max(x.cards||0, y.cards||0),
        correct: Math.max(x.correct||0, y.correct||0),
        xp: Math.max(x.xp||0, y.xp||0)
      };
    });
    out.stats.byDate[d] = merged;
  });
  // Webhook URL is a global user-level setting → take latest writer
  if (remote.writeAt && (!local.writeAt || remote.writeAt > local.writeAt)) {
    if (remote.webhookUrl) out.webhookUrl = remote.webhookUrl;
  }
  // notified registry: union (no double-fire across devices)
  out.notified = Object.assign({}, local.notified || {}, remote.notified || {});

  // Daily achievements per (date, language) — union, prefer "achieved=true",
  // and keep the earliest `at` timestamp.
  out.dailyAchievements = out.dailyAchievements || {};
  const la = local.dailyAchievements || {};
  const ra = remote.dailyAchievements || {};
  const dates = new Set([...Object.keys(la), ...Object.keys(ra)]);
  dates.forEach((d) => {
    const merged = Object.assign({}, la[d] || {});
    const rday = ra[d] || {};
    Object.keys(rday).forEach((L) => {
      const x = merged[L];
      const y = rday[L];
      if (!x) merged[L] = y;
      else {
        merged[L] = {
          achieved: !!(x.achieved || y.achieved),
          cards: Math.max(x.cards || 0, y.cards || 0),
          goal: y.goal || x.goal,
          at: (x.at && y.at) ? (x.at < y.at ? x.at : y.at) : (x.at || y.at)
        };
      }
    });
    out.dailyAchievements[d] = merged;
  });

  out.languages = out.languages || {};
  const langs = new Set([...Object.keys(local.languages||{}), ...Object.keys(remote.languages||{})]);
  langs.forEach((lang) => {
    const a = (local.languages && local.languages[lang]) || {};
    const b = (remote.languages && remote.languages[lang]) || {};
    const merged = JSON.parse(JSON.stringify(a));
    merged.cards = merged.cards || {};
    merged.lessonsCompleted = merged.lessonsCompleted || {};
    merged.learned = merged.learned || {};

    const allCardIds = new Set([...Object.keys(merged.cards), ...Object.keys(b.cards||{})]);
    allCardIds.forEach((cid) => {
      const ca = merged.cards[cid];
      const cb = (b.cards||{})[cid];
      if (!ca) merged.cards[cid] = cb;
      else if (!cb) {/* keep */}
      else {
        const ta = ca.last ? new Date(ca.last).getTime() : 0;
        const tb = cb.last ? new Date(cb.last).getTime() : 0;
        if (tb > ta) merged.cards[cid] = cb;
      }
    });
    Object.keys(b.lessonsCompleted || {}).forEach((id) => merged.lessonsCompleted[id] = true);
    Object.keys(b.learned || {}).forEach((id) => merged.learned[id] = true);

    // Self-marks: per-card union; if both sides set the same card to a
    // different value, prefer remote when remote.writeAt is later
    const ma = a.marks || {};
    const mb = b.marks || {};
    merged.marks = {};
    const remoteWins = remote.writeAt && (!local.writeAt || remote.writeAt > local.writeAt);
    new Set([...Object.keys(ma), ...Object.keys(mb)]).forEach((id) => {
      if (ma[id] && !mb[id])      merged.marks[id] = ma[id];
      else if (!ma[id] && mb[id]) merged.marks[id] = mb[id];
      else if (ma[id] && mb[id])  merged.marks[id] = remoteWins ? mb[id] : ma[id];
    });

    merged.xp = Math.max(a.xp || 0, b.xp || 0);
    merged.level = Math.max(a.level || 1, b.level || 1);
    // Daily goal: take the latest-modified side (use parent writeAt)
    if (typeof b.dailyGoal === "number") {
      if (typeof a.dailyGoal !== "number" || (remote.writeAt && (!local.writeAt || remote.writeAt > local.writeAt))) {
        merged.dailyGoal = b.dailyGoal;
      } else {
        merged.dailyGoal = a.dailyGoal;
      }
    }

    // Custom cards: union by id (so user's hand-added words sync across devices)
    const customA = a.customCards || [];
    const customB = b.customCards || [];
    const seenIds = new Set();
    merged.customCards = [];
    customA.forEach((c) => { if (c && c.id && !seenIds.has(c.id)) { seenIds.add(c.id); merged.customCards.push(c); } });
    customB.forEach((c) => { if (c && c.id && !seenIds.has(c.id)) { seenIds.add(c.id); merged.customCards.push(c); } });

    out.languages[lang] = merged;
  });

  return out;
}

// ─────────────── Doc path ───────────────
function docRef() {
  if (!db) return null;
  if (getMode() === "code") {
    const code = getCode();
    if (!code) return null;
    return doc(db, "sync", code, "state", "main");
  }
  if (!currentUser) return null;
  return doc(db, "users", currentUser.uid, "state", "main");
}

// ─────────────── Push / Pull ───────────────
async function pushNow() {
  if (!syncEnabled || applyingRemote) return;
  const ref = docRef();
  if (!ref) return;
  const state = getLocalState();
  state.writeAt = Date.now();
  try {
    await setDoc(ref, state, { merge: false });
    lastPushAt = Date.now();
    setStatus("synced");
  } catch (e) {
    console.warn("[sync] push failed", e);
    setStatus("error", e.message);
  }
}

function schedulePush() {
  if (!syncEnabled) return;
  if (pushTimer) clearTimeout(pushTimer);
  setStatus("pending");
  pushTimer = setTimeout(pushNow, writeDebounceMs);
}

function startListening() {
  if (unsub) { unsub(); unsub = null; }
  const ref = docRef();
  if (!ref) return;
  unsub = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      // First time on this code — push current local up
      pushNow();
      return;
    }
    const remote = snap.data();
    const local = getLocalState();
    if (remote.writeAt && lastPushAt && Math.abs(remote.writeAt - lastPushAt) < 800) return;
    const merged = mergeStates(local, remote);
    applyingRemote = true;
    setLocalState(merged);
    applyingRemote = false;
    setStatus("synced");
  }, (err) => {
    console.warn("[sync] snapshot error", err);
    setStatus("error", err.message);
  });
}

// ─────────────── Init / Auth ───────────────
// In "code" mode we DO NOT require any sign-in. The sync code is the shared
// secret; Firestore rules should permit access to /sync/{code}/* (test mode does
// this by default for 30 days; the README has a permanent rule).
// In "user" mode we rely on Google sign-in below.
function ensureFirebaseInit() {
  const cfg = getCfg();
  if (!cfg) return false;
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(cfg);
    auth = getAuth(app);
    db = getFirestore(app);
    if (getMode() === "code") {
      // No auth needed — connect immediately.
      syncEnabled = true;
      startListening();
      setStatus("connecting");
    } else {
      onAuthStateChanged(auth, (user) => {
        currentUser = user || null;
        if (user) {
          syncEnabled = true;
          setStatus("connecting");
          startListening();
        } else {
          syncEnabled = false;
          if (unsub) { unsub(); unsub = null; }
          setStatus("signed-out");
        }
        window.dispatchEvent(new CustomEvent("mochi:auth-changed"));
      });
    }
  } else if (getMode() === "code") {
    // Already initialized — restart listener for the (possibly new) code
    syncEnabled = true;
    startListening();
  }
  return true;
}

// ─────────────── Public actions ───────────────
async function setupCodeMode(cfg, codeOpt) {
  setCfg(cfg);
  setMode("code");
  const code = codeOpt || genCode();
  setCode(code);
  app = null;
  ensureFirebaseInit();
  return code;
}
async function setupUserMode(cfg) {
  setCfg(cfg);
  setMode("user");
  app = null;
  ensureFirebaseInit();
}
async function setupFromSharePayload(payloadStr) {
  const obj = parseSharePayload(payloadStr);
  if (!obj) throw new Error("Invalid share string");
  await setupCodeMode(obj.cfg, obj.code);
  return obj.code;
}

// Build a join URL like:
//   https://masakasakasama.github.io/Language_learning/#join=mochi1:xxxx
// Opening it on another device auto-configures and joins sync — no user action needed.
function buildJoinLink() {
  const payload = buildSharePayload();
  if (!payload) return null;
  return location.origin + location.pathname + "#join=" + encodeURIComponent(payload);
}

// On page load, auto-join if URL has #join=...  (or ?join=...)
async function tryAutoJoinFromURL() {
  let payload = null;
  const hash = location.hash || "";
  const m = hash.match(/[#&]join=([^&]+)/);
  if (m) payload = decodeURIComponent(m[1]);
  if (!payload) {
    const params = new URLSearchParams(location.search);
    if (params.get("join")) payload = params.get("join");
  }
  if (!payload) return false;
  const obj = parseSharePayload(payload);
  if (!obj) return false;
  // Apply: marks app as onboarded (so the user lands straight on Home with data)
  setCfg(obj.cfg);
  setMode("code");
  setCode(obj.code);
  try {
    const root = JSON.parse(localStorage.getItem(STATE_KEY) || "{}");
    root.onboarded = true;
    localStorage.setItem(STATE_KEY, JSON.stringify(root));
  } catch (e) {}
  // Clean the URL so the secret isn't sitting in the address bar / history
  try { history.replaceState(null, "", location.pathname); } catch (e) {}
  ensureFirebaseInit();
  setStatus("connecting");
  window.dispatchEvent(new CustomEvent("mochi:joined-via-link"));
  return true;
}

async function signInGoogle() {
  if (!ensureFirebaseInit()) throw new Error("Firebase not configured");
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}
async function signInAnon() {
  if (!ensureFirebaseInit()) throw new Error("Firebase not configured");
  await signInAnonymously(auth);
}
async function doSignOut() {
  if (auth) await signOut(auth);
}

function disconnect() {
  if (unsub) { unsub(); unsub = null; }
  if (auth) signOut(auth).catch(() => {});
  clearLocalSync();
  app = null; auth = null; db = null; currentUser = null;
  syncEnabled = false;
  setStatus("disabled");
}

// Status helper
let lastStatus = { state: "disabled", message: "" };
function setStatus(state, message) {
  lastStatus = { state, message: message || "" };
  window.dispatchEvent(new CustomEvent("mochi:sync-status", { detail: lastStatus }));
}

// Listen to local writes (from Storage.save())
window.addEventListener("mochi:local-changed", () => {
  if (!applyingRemote) schedulePush();
});

// Try to init on load (also handles auto-join via URL)
window.addEventListener("DOMContentLoaded", async () => {
  const joined = await tryAutoJoinFromURL();
  if (joined) return; // tryAutoJoinFromURL already initialized Firebase
  // Firebase config is baked in — always available. Auto-generate a sync code
  // on the very first launch so the device is immediately ready to share or
  // be joined.
  setMode("code");
  if (!getCode()) {
    setCode(genCode());
  }
  ensureFirebaseInit();
  setStatus("connecting");
});

// Replace the device's current sync code with one provided by a partner.
// Returns the cleaned code.
function joinByCode(rawCode) {
  if (!rawCode) throw new Error("Empty code");
  // Normalise: uppercase, strip spaces and add hyphens every 4 chars
  let cleaned = rawCode.toString().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (cleaned.length < 12) throw new Error("Code is too short");
  cleaned = cleaned.slice(0, 16);
  const formatted = (cleaned.match(/.{1,4}/g) || []).join("-");
  setMode("code");
  setCode(formatted);
  // Refresh listener with the new code
  if (unsub) { unsub(); unsub = null; }
  syncEnabled = true;
  startListening();
  setStatus("connecting");
  window.dispatchEvent(new CustomEvent("mumu:joined-via-link"));
  return formatted;
}

// Public API
// Force-push current local state (overwrites cloud).
async function forcePush() {
  return pushNow();
}
// Force-pull cloud state (overwrites local). Used as an escape hatch.
async function forcePull() {
  const ref = docRef(); if (!ref) throw new Error("Not connected");
  const { getDoc } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("No data in the cloud for this code yet.");
  applyingRemote = true;
  setLocalState(snap.data());
  applyingRemote = false;
}

window.Sync = {
  isConfigured: () => !!getCfg(),
  getConfig: getCfg,
  getMode,
  getCode,
  buildSharePayload,
  parseSharePayload,
  setupCodeMode,
  setupUserMode,
  setupFromSharePayload,
  buildJoinLink,
  joinByCode,
  forcePush,
  forcePull,
  signInGoogle,
  signInAnon,
  signOut: doSignOut,
  disconnect,
  pushNow,
  user: () => currentUser,
  status: () => lastStatus,
  enabled: () => syncEnabled
};
