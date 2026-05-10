# 🍡 Mochi — Cute language learning app

A Duolingo-meets-Anki style language learning app for English speakers. Cute pastel design, SRS spaced repetition, audio pronunciation, level-aware learning paths, and a stats dashboard.

## Languages & levels

| Language | Levels |
|---|---|
| 🇯🇵 Japanese | JLPT **N5 → N4 → N3 → N2 → N1** |
| 🇰🇷 Korean | TOPIK **1 → 2 → 3 → 4 → 5 → 6** |
| 🇬🇧 English | CEFR **A1 → A2 → B1 → B2 → C1 → C2** |
| 🇪🇸 Spanish | CEFR **A1 → A2 → B1 → B2 → C1 → C2** |

For each language, lessons are organized into level-appropriate units with vocabulary, grammar, scripts (hiragana/katakana/kanji/Hangul), and quizzes.

## Features

- **Learning path** — Duolingo-style zig-zag of units per level
- **Multiple exercise types** — flashcard intro, multiple choice, listening, typing
- **Grammar lessons** — explanations + examples + practice quizzes
- **Spaced repetition (SRS)** — Anki-style SM-2: when you miss a card you see it again sooner; cards you nail get pushed out further into the future
- **Streak, XP, and per-language progress**
- **Stats dashboard** (Profile tab):
  - Today: minutes studied, cards reviewed, lessons, accuracy, XP
  - Last 7 days: bar chart of cards / day
  - Last 30 days: GitHub-style heatmap
  - All-time totals (cards, lessons, minutes, XP, longest streak, active days)
  - Per-language word progress (seen / learning / mastered)
- **Audio** — Web Speech API; tap 🔊 anywhere to hear the word, plus a 🐢 slower button for listening exercises
- **Cute mascot** — kaomoji face that reacts to your progress
- **Dark mode** — toggle in Profile
- **Smart example sentences** — examples are tagged with the words they require, and only shown when **all** required words are already in your learned set. The example "unlocks" as you learn more vocabulary

## How to run

It's a static site — no build step.

```bash
# Option 1: just open the file
open index.html       # macOS

# Option 2: serve locally (recommended for audio + storage)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Where is my progress stored?

**Everything is in your browser's `localStorage`** under the single key `mochi.v1`.

The shape (rough sketch):

```js
{
  currentLang: "ja",
  languages: {
    ja: {
      cards: { [cardId]: { ease, interval, due, reps, lapses, last } },  // SRS state
      lessonsCompleted: { [lessonId]: true },
      learned: { [cardId]: true },         // first introduction (used to gate examples)
      hearts: 5, heartsRefilledAt: ISO,
      xp: 0, level: 1
    },
    ko: { ... }, en: { ... }, es: { ... }
  },
  stats: { byDate: { "YYYY-MM-DD": { mins, cards, correct, lessons, xp } } },
  streak: { current, longest, lastActiveDate },
  xpTotal: 0,
  onboarded: true,
  theme: "light" | "dark"
}
```

Nothing leaves your device. To wipe it: open Profile → "Reset all progress", or in DevTools console `localStorage.removeItem("mochi.v1")`.

## Cloud sync (across phone & desktop)

Mochi syncs your progress across devices via **Firebase Firestore** (your own free project). **Two modes**:

### Mode A — Sync code *(recommended, no login of any kind)*

Easiest. One device generates a sync code, the other device just opens a link.

1. Open https://console.firebase.google.com → create a free project
2. **Build → Firestore Database → Create database → Start in test mode** (allows access for 30 days; switch to the rules below before that to keep it permanent)
3. **Project Settings → Your apps → Web** → register an app and copy the `firebaseConfig` object
4. On device A: **Profile → ☁️ Cloud sync → Set up sync** → paste config → **Generate sync code**
5. Tap **📋 Copy join link** (or **📱 Show QR**) — the link contains your Firebase config + sync code
6. On device B (your phone, your family's tablet, anywhere): **just open the link**. No sign-in, no settings, no setup. The app auto-configures sync, cleans the secret out of the URL, and starts syncing.

That's it. **No Anonymous auth, no Google login, no manual paste.** Share the link once, the rest is automatic on every other device.

### Mode B — Google sign-in (alt)

Use this if you want strong identity per user. After **Set up sync**, choose **Use Google sign-in instead** and sign in with the same Google account on each device.

### Firestore rules

For sync-code mode (anonymous auth, scoped to `sync/*`):

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anonymous-auth required, anyone with the random sync code can read/write that doc
    match /sync/{code}/{document=**} {
      allow read, write: if request.auth != null;
    }
    // Google sign-in mode
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Sync codes are 16 random base32 characters (split as `XXXX-XXXX-XXXX-XXXX`) — practically un-guessable, so they act as a shared secret.

### Merge behavior

When two devices have made different changes:

| Field | Strategy |
|---|---|
| Card SRS state | Newer `last` timestamp wins |
| `lessonsCompleted`, `learned` | Union (true once true) |
| Hearts | Take the **min** (penalties stick) |
| XP, longest streak | Take the **max** |
| Per-day stats | Per-field max |
| Current language, theme | Last writer wins |

## Adding content

All lesson content lives in `js/data/`:

- `languages.js` — language metadata and level definitions
- `ja.js`, `ko.js`, `en.js`, `es.js` — per-language packs with vocab, grammar, kanji/hangul, units, and a tagged `EXAMPLES` pool

To add a new vocab card to a deck, edit the relevant `vocabCards("deck", "level", [...])` call. To add a unit to the path, append to `UNITS`. Grammar lessons get added to `GRAMMAR` and referenced from a unit lesson with `type: "grammar", grammarId: "..."`.

To add a new example sentence that unlocks dynamically:

```js
EXAMPLES.push({
  text: "私は学生です。",
  tr: "I am a student.",
  req: ["ja:vocab:self-intro:学生"],         // other words required (besides the introduced one)
  introduces: "ja:vocab:self-intro:私"        // shown when this word is being introduced
});
```

## Architecture

```
index.html          — shell with topbar + bottom nav
css/styles.css      — pastel theme + dark mode
js/data/            — per-language content (no app logic)
js/storage.js       — localStorage wrapper, hearts regen, stats
js/srs.js           — Anki-style SM-2 scheduler
js/audio.js         — Web Speech API per language
js/ui.js            — el(), toast, confetti, mascot, modal helpers
js/exercises.js     — exercise renderers (MC, listen, type, intro, grammar)
js/views.js         — full screens: home, unit, lesson, review, browse, profile
js/app.js           — controller, navigation, top bar refresh
```

Pure vanilla JS, no dependencies, no bundler. Just open and learn. 💖
