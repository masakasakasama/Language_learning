// Cloud sync via Firebase Firestore.
//
// Every device that opens this URL writes to the same Firestore document.
// No setup, no sign-in, no codes — the URL itself is the shared secret and
// the Firebase config is baked into the app.
//
// Push is transactional (read → merge → write inside runTransaction), so two
// devices that have both used the app converge to the union of their data
// without either side overwriting the other.

import {
  initializeApp, getApps, getApp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, onSnapshot, runTransaction
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const STATE_KEY = "mochi.v1";

// Hardcoded Firebase project. Web API keys are designed to be public; security
// lives in Firestore rules + the hardcoded SHARED_SYNC_CODE.
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCIezNBc2VaPgt3aYcMo2e3gIUpzlJB_5w",
  authDomain: "language-learning-a740a.firebaseapp.com",
  projectId: "language-learning-a740a",
  storageBucket: "language-learning-a740a.firebasestorage.app",
  messagingSenderId: "388233596942",
  appId: "1:388233596942:web:3edeecfb8da8160955ac5f"
};
const SHARED_SYNC_CODE = "mumu-household-2026";

let app = null, db = null, unsub = null;
let syncEnabled = false, applyingRemote = false;
let lastPushAt = 0;
const writeDebounceMs = 300;   // near-real-time
let pushTimer = null;
let pushRetryAttempt = 0;
let permanentErrorShown = false;
let lastStatus = { state: "disabled", message: "" };

function getLocalState() {
  try { return JSON.parse(localStorage.getItem(STATE_KEY) || "{}"); }
  catch (e) { return {}; }
}
function setLocalState(s) {
  localStorage.setItem(STATE_KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("mochi:remote-applied"));
}
function setStatus(state, message) {
  lastStatus = { state, message: message || "" };
  window.dispatchEvent(new CustomEvent("mochi:sync-status", { detail: lastStatus }));
}

// Wrap an old single-user blob into the v2 multi-user shape (everything that
// existed becomes Rebecca's) so the merger only ever deals with v2.
function toV2(s) {
  if (!s || typeof s !== "object") return { users: {} };
  if (s.users) return s;
  if (s.languages) {
    return {
      schema: 2,
      currentUser: s.currentUser && s.users ? s.currentUser : "rebecca",
      userNames: { rebecca: "レベッカ", me: "俺" },
      users: {
        rebecca: {
          currentLang: s.currentLang || "ja",
          languages: s.languages || {},
          stats: s.stats || { byDate: {} },
          streak: s.streak || { current: 0, longest: 0, lastActiveDate: null },
          xpTotal: s.xpTotal || 0,
          dailyAchievements: s.dailyAchievements || {},
          notified: s.notified || {}
        }
      },
      onboarded: s.onboarded !== false,
      theme: s.theme || "light",
      webhookUrl: s.webhookUrl || "",
      writeAt: s.writeAt || 0
    };
  }
  return { users: {}, writeAt: s.writeAt || 0 };
}

// ─────────────── Smart merge ───────────────
// Top-level: normalise both sides to v2, merge app settings, then merge each
// user profile independently with mergeProfile().
function mergeStates(localRaw, remoteRaw) {
  if (!localRaw || !Object.keys(localRaw).length) return remoteRaw;
  if (!remoteRaw || !Object.keys(remoteRaw).length) return localRaw;
  const local = toV2(localRaw);
  const remote = toV2(remoteRaw);
  const out = JSON.parse(JSON.stringify(local));
  out.schema = 2;
  out.users = out.users || {};
  out.userNames = Object.assign({ rebecca: "レベッカ", me: "俺" }, local.userNames || {}, remote.userNames || {});
  const remoteNewer = remote.writeAt && (!local.writeAt || remote.writeAt > local.writeAt);
  out.onboarded = !!(local.onboarded || remote.onboarded);
  if (remoteNewer) {
    if (remote.theme) out.theme = remote.theme;
    if (remote.webhookUrl) out.webhookUrl = remote.webhookUrl;
    if (remote.currentUser && remote.users && remote.users[remote.currentUser]) out.currentUser = remote.currentUser;
  }
  if (!out.currentUser) out.currentUser = local.currentUser || "rebecca";

  const uids = new Set([
    ...Object.keys(local.users || {}),
    ...Object.keys(remote.users || {})
  ]);
  uids.forEach((uid) => {
    const lp = (local.users && local.users[uid]) || null;
    const rp = (remote.users && remote.users[uid]) || null;
    if (lp && rp) out.users[uid] = mergeProfile(lp, rp, remoteNewer);
    else out.users[uid] = lp || rp;
  });
  return out;
}

// Merge two profiles (the per-user sub-roots). This is the old top-level
// merge logic, now scoped to one user.
function mergeProfile(local, remote, remoteNewer) {
  const out = JSON.parse(JSON.stringify(local));

  if (remoteNewer && remote.currentLang) out.currentLang = remote.currentLang;

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
  out.notified = Object.assign({}, local.notified || {}, remote.notified || {});

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

    const ma = a.marks || {};
    const mb = b.marks || {};
    merged.marks = {};
    new Set([...Object.keys(ma), ...Object.keys(mb)]).forEach((id) => {
      if (ma[id] && !mb[id])      merged.marks[id] = ma[id];
      else if (!ma[id] && mb[id]) merged.marks[id] = mb[id];
      else if (ma[id] && mb[id])  merged.marks[id] = remoteNewer ? mb[id] : ma[id];
    });

    merged.xp = Math.max(a.xp || 0, b.xp || 0);
    merged.level = Math.max(a.level || 1, b.level || 1);
    if (typeof b.dailyGoal === "number") {
      if (typeof a.dailyGoal !== "number" || remoteNewer) {
        merged.dailyGoal = b.dailyGoal;
      } else {
        merged.dailyGoal = a.dailyGoal;
      }
    }

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

// ─────────────── Doc / Push / Pull ───────────────
function docRef() {
  if (!db) return null;
  return doc(db, "sync", SHARED_SYNC_CODE, "state", "main");
}

async function pushNow() {
  if (!syncEnabled || applyingRemote) return;
  const ref = docRef();
  if (!ref) return;
  try {
    await runTransaction(db, async (txn) => {
      const snap = await txn.get(ref);
      const remote = snap.exists() ? snap.data() : null;
      const local = getLocalState();
      const merged = remote ? mergeStates(local, remote) : local;
      merged.writeAt = Date.now();
      txn.set(ref, merged);
      if (remote && JSON.stringify(merged) !== JSON.stringify(local)) {
        applyingRemote = true;
        setLocalState(merged);
        applyingRemote = false;
      }
    });
    lastPushAt = Date.now();
    pushRetryAttempt = 0;
    if (permanentErrorShown) {
      try { document.querySelectorAll(".sync-error-banner").forEach((n) => n.remove()); } catch (e) {}
      permanentErrorShown = false;
    }
    setStatus("synced");
  } catch (e) {
    console.warn("[sync] push failed", e);
    setStatus("error", e.message);
    showSyncError(e);
    pushRetryAttempt = Math.min(pushRetryAttempt + 1, 5);
    const delay = Math.min(30000, 1000 * Math.pow(2, pushRetryAttempt - 1));
    setTimeout(pushNow, delay);
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
  // Immediate push so cloud always has the latest from this device.
  try {
    const local = getLocalState();
    if (local && local.languages) pushNow();
  } catch (e) {}
  unsub = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      pushNow();
      return;
    }
    const remote = snap.data();
    const local = getLocalState();
    if (remote.writeAt && lastPushAt && Math.abs(remote.writeAt - lastPushAt) < 800) return;
    try { if (window.Storage && window.Storage.saveSnapshot) window.Storage.saveSnapshot("pre-sync-merge"); } catch (e) {}
    const merged = mergeStates(local, remote);
    const localChanged = JSON.stringify(merged) !== JSON.stringify(local);
    applyingRemote = true;
    setLocalState(merged);
    applyingRemote = false;
    setStatus("synced");
    if (localChanged) schedulePush();
  }, (err) => {
    console.warn("[sync] snapshot error", err);
    setStatus("error", err.message);
    showSyncError(err);
  });
}

// ─────────────── Init ───────────────
function ensureFirebaseInit() {
  if (!app) {
    app = getApps().length ? getApp() : initializeApp(DEFAULT_FIREBASE_CONFIG);
    db = getFirestore(app);
  }
  syncEnabled = true;
  startListening();
  setStatus("connecting");
}

// ─────────────── Error banner ───────────────
// Two most common failures: Firestore database not created in the project,
// or Firestore rules denying access. Banner detects each and shows the fix.
function showSyncError(err) {
  if (permanentErrorShown) return;
  permanentErrorShown = true;
  try {
    const msg = (err && err.message) ? err.message : String(err);
    let help;
    if (/api has not been used|api.*disabled|firestore api/i.test(msg)) {
      help =
        "<b>Firestore Database がまだ作成されていません。</b><br>" +
        "<a href='https://console.firebase.google.com/project/language-learning-a740a/firestore' target='_blank' rel='noopener' style='color:#fff;text-decoration:underline;'>" +
        "Firebase Console を開く →</a><br>" +
        "<span style='font-size:11px;opacity:.9;'>1. 「データベースを作成」をタップ<br>" +
        "2. 「テストモードで開始」を選択<br>" +
        "3. ロケーション (asia-northeast1) → 完了<br>" +
        "4. 2-3 分待ってアプリの 🔄 をタップ</span>";
    } else if (/permission|insufficient|denied/i.test(msg)) {
      try {
        navigator.clipboard.writeText(
          "rules_version = '2';\n" +
          "service cloud.firestore {\n" +
          "  match /databases/{database}/documents {\n" +
          "    match /sync/{code}/{document=**} {\n" +
          "      allow read, write: if true;\n" +
          "    }\n" +
          "  }\n" +
          "}"
        );
      } catch (e) {}
      help =
        "<b>Firestore ルールが書き込みを拒否しています。</b><br>" +
        "<span style='font-size:11px;opacity:.9;'>正しいルールはクリップボードにコピー済み。下のボタンでルール画面を開いて貼り付け→Publish するだけ。</span><br>" +
        "<button class='sync-error-action' onclick=\"window.open('https://console.firebase.google.com/project/language-learning-a740a/firestore/rules','_blank')\" style='margin-top:6px;'>" +
          "ルール画面を開く →</button>" +
        "<code style='display:block;padding:6px;background:rgba(0,0,0,0.25);border-radius:4px;margin-top:6px;font-size:11px;'>" +
          "match /sync/{code}/{document=**} { allow read, write: if true; }" +
        "</code>";
    } else {
      help = "<span style='font-size:11px;opacity:.9;'>" + msg + "</span>";
    }
    const banner = document.createElement("div");
    banner.className = "sync-error-banner";
    banner.innerHTML =
      "⚠️ クラウド同期に失敗しています<br>" + help +
      "<button class='sync-error-close' style='margin-top:6px;'>閉じる</button>";
    document.body.appendChild(banner);
    banner.querySelector(".sync-error-close").onclick = () => banner.remove();
  } catch (e) {}
}

// Listen to local writes (from Storage.save()) and debounce-push.
window.addEventListener("mochi:local-changed", () => {
  if (!applyingRemote) schedulePush();
});

// Auto-init on load.
window.addEventListener("DOMContentLoaded", () => {
  ensureFirebaseInit();
});

// Public API — kept minimal: views.js only needs status + a manual push hook
// (the topbar 🔄 button calls pushNow).
window.Sync = {
  pushNow,
  status: () => lastStatus,
  enabled: () => syncEnabled
};
