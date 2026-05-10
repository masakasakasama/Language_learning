// Cloud sync via Firebase Auth + Firestore.
// Loads Firebase SDK from CDN (ESM build).
//
// Setup flow:
//   1. User pastes Firebase config in Profile > Sync
//   2. User signs in (Google or anonymous)
//   3. App reads remote doc, merges with local, then writes back
//   4. Real-time listener pulls remote changes; local writes are debounced and pushed up
//
// Document path: users/{uid}/state/main
// Storage layout uses one key "mochi.v1" so the doc holds that exact blob plus a
// "writeAt" server timestamp.

import {
  initializeApp, getApps, getApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup,
  signInAnonymously, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  getFirestore, doc, setDoc, getDoc, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const CFG_KEY = "mochi.firebase.config";
const STATE_KEY = "mochi.v1";

let app = null, auth = null, db = null, unsub = null, currentUser = null;
let syncEnabled = false, applyingRemote = false;
let lastPushAt = 0;
const writeDebounceMs = 1500;
let pushTimer = null;

function loadConfig() {
  try { return JSON.parse(localStorage.getItem(CFG_KEY) || "null"); }
  catch (e) { return null; }
}
function saveConfig(c) { localStorage.setItem(CFG_KEY, JSON.stringify(c)); }
function clearConfig() { localStorage.removeItem(CFG_KEY); }

function getLocalState() {
  try { return JSON.parse(localStorage.getItem(STATE_KEY) || "{}"); }
  catch (e) { return {}; }
}
function setLocalState(s) {
  localStorage.setItem(STATE_KEY, JSON.stringify(s));
  // notify the app to re-render
  window.dispatchEvent(new CustomEvent("mochi:remote-applied"));
}

// ─────────────── Smart merge ───────────────
// Merges two state objects so that:
//  - cards: keep entry with later `last` timestamp
//  - lessonsCompleted, learned: union (true once true)
//  - hearts: take min (penalties stick across devices)
//  - heartsRefilledAt: take latest
//  - xp, xpTotal, level: take max
//  - streak: keep the one with later lastActiveDate
//  - stats.byDate[d]: per-field max
//  - currentLang/theme: take whichever has later writeAt (caller decides)
//  - onboarded: OR
function mergeStates(local, remote) {
  if (!local || !Object.keys(local).length) return remote;
  if (!remote || !Object.keys(remote).length) return local;
  const out = JSON.parse(JSON.stringify(local));

  // currentLang & theme — last writer wins (use writeAt)
  if (remote.writeAt && (!local.writeAt || remote.writeAt > local.writeAt)) {
    if (remote.currentLang) out.currentLang = remote.currentLang;
    if (remote.theme) out.theme = remote.theme;
  }
  out.onboarded = !!(local.onboarded || remote.onboarded);

  // Streak — later lastActiveDate wins; keep max longest
  out.streak = local.streak || { current: 0, longest: 0, lastActiveDate: null };
  const rs = remote.streak || {};
  if (rs.lastActiveDate && (!out.streak.lastActiveDate || rs.lastActiveDate > out.streak.lastActiveDate)) {
    out.streak.current = rs.current || 0;
    out.streak.lastActiveDate = rs.lastActiveDate;
  }
  out.streak.longest = Math.max(out.streak.longest || 0, rs.longest || 0);

  out.xpTotal = Math.max(local.xpTotal || 0, remote.xpTotal || 0);

  // Stats per date
  out.stats = out.stats || { byDate: {} };
  const rstats = (remote.stats && remote.stats.byDate) || {};
  Object.keys(rstats).forEach((d) => {
    const a = out.stats.byDate[d] || { mins:0, cards:0, correct:0, lessons:0, xp:0 };
    const b = rstats[d];
    out.stats.byDate[d] = {
      mins: Math.max(a.mins||0, b.mins||0),
      cards: Math.max(a.cards||0, b.cards||0),
      correct: Math.max(a.correct||0, b.correct||0),
      lessons: Math.max(a.lessons||0, b.lessons||0),
      xp: Math.max(a.xp||0, b.xp||0)
    };
  });

  // Per-language merge
  out.languages = out.languages || {};
  const langs = new Set([...Object.keys(local.languages||{}), ...Object.keys(remote.languages||{})]);
  langs.forEach((lang) => {
    const a = (local.languages && local.languages[lang]) || {};
    const b = (remote.languages && remote.languages[lang]) || {};
    const merged = JSON.parse(JSON.stringify(a));
    merged.cards = merged.cards || {};
    merged.lessonsCompleted = merged.lessonsCompleted || {};
    merged.learned = merged.learned || {};

    // Cards: later `last` wins (or higher reps if last missing)
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

    // Union of lessonsCompleted and learned
    Object.keys(b.lessonsCompleted || {}).forEach((id) => merged.lessonsCompleted[id] = true);
    Object.keys(b.learned || {}).forEach((id) => merged.learned[id] = true);

    // Hearts: take min (so a lost heart on phone still costs you on desktop)
    merged.hearts = Math.min(
      typeof a.hearts === "number" ? a.hearts : 5,
      typeof b.hearts === "number" ? b.hearts : 5
    );
    // heartsRefilledAt: take later (most recently penalized timestamp)
    if (b.heartsRefilledAt && (!a.heartsRefilledAt || b.heartsRefilledAt > a.heartsRefilledAt)) {
      merged.heartsRefilledAt = b.heartsRefilledAt;
    }

    merged.xp = Math.max(a.xp || 0, b.xp || 0);
    merged.level = Math.max(a.level || 1, b.level || 1);

    out.languages[lang] = merged;
  });

  return out;
}

// ─────────────── Push / Pull ───────────────
async function pushNow() {
  if (!syncEnabled || !currentUser || applyingRemote) return;
  const state = getLocalState();
  state.writeAt = Date.now();
  try {
    const ref = doc(db, "users", currentUser.uid, "state", "main");
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

function listenRemote() {
  if (unsub) unsub();
  if (!currentUser || !db) return;
  const ref = doc(db, "users", currentUser.uid, "state", "main");
  unsub = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      // First time — push current local up so other devices can pull it
      pushNow();
      return;
    }
    const remote = snap.data();
    const local = getLocalState();
    // Skip if remote was just our own push (avoid loops)
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

// ─────────────── Auth ───────────────
function ensureInit() {
  const cfg = loadConfig();
  if (!cfg) return false;
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(cfg);
    auth = getAuth(app);
    db = getFirestore(app);
    onAuthStateChanged(auth, (user) => {
      currentUser = user || null;
      if (user) {
        syncEnabled = true;
        setStatus("connecting");
        listenRemote();
      } else {
        syncEnabled = false;
        if (unsub) { unsub(); unsub = null; }
        setStatus("signed-out");
      }
      window.dispatchEvent(new CustomEvent("mochi:auth-changed"));
    });
  }
  return true;
}

async function signInGoogle() {
  if (!ensureInit()) throw new Error("Firebase not configured");
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
}
async function signInAnon() {
  if (!ensureInit()) throw new Error("Firebase not configured");
  await signInAnonymously(auth);
}
async function doSignOut() {
  if (auth) await signOut(auth);
}

function setConfig(cfg) {
  saveConfig(cfg);
  app = null;
  ensureInit();
}
function unsetConfig() {
  if (unsub) { unsub(); unsub = null; }
  if (auth) signOut(auth).catch(() => {});
  clearConfig();
  app = null; auth = null; db = null; currentUser = null;
  syncEnabled = false;
  setStatus("disabled");
}

// Status helper — exposed via Sync.status getter
let lastStatus = { state: "disabled", message: "" };
function setStatus(state, message) {
  lastStatus = { state, message: message || "" };
  window.dispatchEvent(new CustomEvent("mochi:sync-status", { detail: lastStatus }));
}

// Listen to local writes (fired by Storage.save() — see storage.js patch)
window.addEventListener("mochi:local-changed", () => {
  if (!applyingRemote) schedulePush();
});

// Try to init on load
window.addEventListener("DOMContentLoaded", () => {
  if (loadConfig()) {
    ensureInit();
    setStatus("connecting");
  } else {
    setStatus("disabled");
  }
});

// Public API on window.Sync
window.Sync = {
  isConfigured: () => !!loadConfig(),
  getConfig: () => loadConfig(),
  setConfig,
  unsetConfig,
  signInGoogle,
  signInAnon,
  signOut: doSignOut,
  pushNow,
  user: () => currentUser,
  status: () => lastStatus,
  enabled: () => syncEnabled
};
