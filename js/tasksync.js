// Bridge: when a mumu daily language goal is achieved, mark the matching
// habit complete in the separate task-management app. Hardcoded, no setup.

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc }
  from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// task-management の Firebase（ハードコード済み・変更不要）
const TM_CONFIG = {
  apiKey: "AIzaSyAvxleNWQEtIP1I7WimhI5-X-6oVtcAw0I",
  authDomain: "task-management-5c55f.firebaseapp.com",
  projectId: "task-management-5c55f",
  storageBucket: "task-management-5c55f.firebasestorage.app",
  messagingSenderId: "748379281870",
  appId: "1:748379281870:web:83040bb9fbab9fe34bf39f",
};

// mumuのユーザー名 → task-management のスペースID（ハードコード）
const SPACE_BY_USER = {
  "俺":      "masakasakasama-task-management-2026-private-space-u2", // 達也
  "レベッカ": "masakasakasama-task-management-2026-private-space",    // u1
};
const FALLBACK_SPACE = "masakasakasama-task-management-2026-private-space-u2";

// 言語 → task-management の習慣名
const LANG_TO_HABIT = {
  "Deutsch": "ドイツ語", "German": "ドイツ語", "ドイツ語": "ドイツ語",
  "English": "英語ニュース", "英語": "英語ニュース",
  "日本語": "日本語", "Japanese": "日本語",
  "韓国語": "韓国語", "Korean": "韓国語",
  "スペイン語": "スペイン語", "Spanish": "スペイン語",
};

function tmApp() {
  return getApps().find(a => a.name === "tm-bridge")
      || initializeApp(TM_CONFIG, "tm-bridge");
}

/**
 * 語学の達成を task-management に反映
 * @param {string} mumuUser   mumuの現在ユーザー名（例: "俺"）
 * @param {string} language   言語（例: "Deutsch" / "ドイツ語"）
 * @param {string} dateKey    "YYYY-MM-DD"（未指定なら今日）
 * @param {number} percent    0..100（目標達成なら100）
 */
export async function notifyTaskManager(mumuUser, language, dateKey, percent = 100) {
  try {
    const spaceId = SPACE_BY_USER[mumuUser] || FALLBACK_SPACE;
    const habitName = LANG_TO_HABIT[language] || language;
    if (!dateKey) {
      const d = new Date();
      dateKey = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    }
    const db = getFirestore(tmApp());
    const ref = doc(db, "spaces", spaceId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    const habits = Array.isArray(data.habits) ? data.habits : [];
    const h = habits.find(x =>
      (x.name || "").toLowerCase().includes(habitName.toLowerCase())
    );
    if (!h) { console.warn("[tasksync] habit not found:", habitName); return; }

    h.entries = h.entries || {};
    h.entryUpdatedAt = h.entryUpdatedAt || {};
    const cur = h.entries[dateKey] || 0;
    if (percent <= cur) return;            // 手動で上回ってる値は下げない
    h.entries[dateKey] = percent;
    h.entryUpdatedAt[dateKey] = Date.now();
    h.updatedAt = Date.now();

    await setDoc(ref, { habits, updatedAt: Date.now() }, { merge: true });
    console.log(`[tasksync] ${habitName} ${dateKey} → ${percent}%`);
  } catch (e) {
    console.warn("[tasksync] error:", e);
  }
}

// mumu language code → name understood by LANG_TO_HABIT
const LANG_NAME = { de: "German", en: "English", ja: "Japanese", ko: "Korean", es: "Spanish" };

// Auto-wire: mumu fires this when a per-language daily goal is reached.
window.addEventListener("mumu:daily-achieved", (e) => {
  const d = (e && e.detail) || {};
  if (!d.achieved) return;
  let mumuUser = "";
  try { mumuUser = window.Storage.getUserName(window.Storage.getCurrentUser()); } catch (err) {}
  const language = d.languageName || LANG_NAME[d.language] || d.language;
  notifyTaskManager(mumuUser, language, d.date, 100);
});

// Backfill: the bridge is new, so days the user already completed before
// it existed were never pushed. On load, replay every achieved day.
// notifyTaskManager is idempotent (won't lower a higher manual value and
// re-sending 100 is a no-op), so this is safe to run every time.
// cards/goal → one of the tracker's levels: 20/40/60/80/100
function gradedPercent(cards, goal) {
  const ratio = cards / Math.max(1, goal);
  const pct = Math.round(ratio * 5) * 20;     // snap to 20s
  return Math.min(100, Math.max(20, pct));    // studied at all ⇒ ≥20
}

async function backfill() {
  try {
    const S = window.Storage;
    if (!S || !S.studyHistory) return;
    const mumuUser = S.getUserName(S.getCurrentUser());
    const days = S.studyHistory();
    for (const { date, lang, cards, goal } of days) {
      const language = LANG_NAME[lang] || lang;
      await notifyTaskManager(mumuUser, language, date, gradedPercent(cards, goal));
    }
  } catch (e) { console.warn("[tasksync] backfill error:", e); }
}
window.addEventListener("load", () => setTimeout(backfill, 2500));
