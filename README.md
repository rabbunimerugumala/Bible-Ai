# 📖 Bible AI

> **AI-powered Telugu Bible companion — explore, search, ask, and create scripture-inspired content on iOS, Android, and Web.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-lightgrey.svg)
![Expo](https://img.shields.io/badge/Expo-54.0.0-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![License](https://img.shields.io/badge/license-Private-red.svg)

---

## 🌟 Project Overview

**Bible AI** is a premium mobile and web application that brings the Telugu Indian Revised Version (IRV) Bible to life through an elegant, glassmorphism-styled interface powered by on-device AI capabilities. The app allows users to read, search, converse with, and creatively engage with scripture — all offline, with no cloud dependency required for core features.

### Problem It Solves
Most Bible apps are either feature-poor or lack language-specific support for Telugu speakers. Bible AI closes that gap by delivering:
- **Intelligent, context-aware scripture discovery** via keyword and semantic AI search
- **Conversational Q&A** backed directly by biblical text from the database
- **Creative generation** of scripture-inspired prose in multiple styles
- **A premium, dark-mode native UX** that feels modern and devotional

### Target Users
- Telugu-speaking Christians and Bible students
- Devotional readers seeking daily scripture inspiration
- Content creators looking for scripture-grounded writing prompts
- Anyone exploring the Bible through an AI-assisted lens

---

## ✨ Features

- 📅 **Verse of the Day** — dynamically selected from the full Telugu IRV database each day
- 🤖 **AI Chat (Ask AI)** — conversational Q&A backed by 12+ curated theological topics with live scripture references
- 🔍 **Dual-Mode Search** — Keyword search with SQLite `LIKE` queries *and* Semantic AI search that matches by meaning, not just words
- 🎨 **Creative Mode** — generates Psalm, Prophecy, Proverb, and Gospel-style scripture-inspired texts with selectable styles
- 🗺️ **Explore** — browse all 15 biblical themes (Love, Faith, Healing, Justice, etc.) and browse books of the Bible with live verse counts
- 🏠 **Hero Home Screen** — animated hero banner, featured themes, beloved verse cards, and a stats bar
- 🌙 **Glassmorphism Dark UI** — royal-gold (`#D4AF5A`) accent color system, frosted glass surfaces, and gradient tab bar
- 📦 **Fully Offline** — entire Bible database (`Telugu_IRV.sqlite`, ~12 MB) ships bundled inside the app
- 📱 **Cross-platform** — single codebase runs on iOS, Android, and Web via Expo

---

## 🛠️ Full Tech Stack

### Frontend

| Layer | Technology |
|---|---|
| Framework | React Native 0.81.5 |
| Navigation | Expo Router 6 (file-based routing) |
| UI Components | Custom glassmorphism components (no UI library) |
| Styling | React Native `StyleSheet` API |
| Animations | `react-native-reanimated` ~4.1.1 |
| Gestures | `react-native-gesture-handler` ~2.28.0 |
| Icons | `@expo/vector-icons` (MaterialIcons, Feather, FontAwesome5) |
| Gradients | `expo-linear-gradient` |
| Images | `expo-image` (with blurhash + transition) |
| Safe Area | `react-native-safe-area-context` |

### Backend / Runtime

| Layer | Technology |
|---|---|
| Runtime | Node.js (dev tooling) / React Native Hermes |
| AI Service | Custom pattern-matching Q&A engine (`aiService.ts`) |
| Bible Service | SQLite query layer (`bibleService.ts`) |
| State Management | React Hooks + custom hooks (`useChat`, `useSearch`, `useCreative`) |

### Database

| Layer | Technology |
|---|---|
| Engine | SQLite (via `expo-sqlite` ^55.0.11) |
| Database File | `Telugu_IRV.sqlite` (~12 MB, bundled asset) |
| Schema | Single `verses` table with `id`, `book`, `chapter`, `verse`, `text` columns |
| ORM | None — raw SQL queries via `expo-sqlite` async API |

### Communication

| Protocol | Use |
|---|---|
| None (offline) | All AI responses are generated locally from the bundled SQLite database |
| File System | `expo-file-system` copies the SQLite asset to the documents directory on first launch |

### Cloud / Hosting / Deployment

| Platform | Use |
|---|---|
| Expo EAS | Cloud builds for iOS and Android |
| Expo Web | Static web output via Metro bundler |
| Android | Package: `com.onspace.bibleai`, `versionCode: 1` |

### Dev Tools

| Tool | Version | Purpose |
|---|---|---|
| TypeScript | ~5.9.2 | Static type checking |
| ESLint | ^9.25.0 | Linting |
| eslint-config-expo | ~10.0.0 | Expo-specific lint rules |
| Babel | ^7.25.2 | JS transpilation |
| Metro | (bundled with Expo) | JS bundler |
| `react-dev-inspector` | ^2.0.1 | Component inspector (dev only) |

---

## 🏗️ Project Architecture

### High-Level Overview

Bible AI follows a layered client-side architecture. There is no external backend server. All intelligence is provided locally by pattern-matched responses and direct SQLite queries.

```
┌─────────────────────────────────────────────────────────┐
│                 BIBLE AI APP (Expo Router)               │
│                                                         │
│  ┌─────────┐  ┌────────┐  ┌────────┐  ┌──────────────┐ │
│  │  Home   │  │ Search │  │ AskAI  │  │   Explore    │ │
│  │(index)  │  │        │  │ (chat) │  │   (Browse)   │ │
│  └────┬────┘  └───┬────┘  └───┬────┘  └──────┬───────┘ │
│       │           │           │               │         │
│  ┌────▼───────────▼───────────▼───────────────▼───────┐ │
│  │              Custom React Hooks                     │ │
│  │   useChat  │  useSearch  │  useCreative             │ │
│  └────────────────────┬────────────────────────────────┘ │
│                       │                                  │
│  ┌────────────────────▼────────────────────────────────┐ │
│  │                  Service Layer                       │ │
│  │   aiService.ts (Q&A + Creative)                     │ │
│  │   bibleService.ts (SQLite queries)                  │ │
│  └────────────────────┬────────────────────────────────┘ │
│                       │                                  │
│  ┌────────────────────▼────────────────────────────────┐ │
│  │         Telugu_IRV.sqlite (Bundled Asset)            │ │
│  │              ~12 MB · Full Bible · Offline           │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Data Flow

1. **App boots** → `bibleService.ts` copies `Telugu_IRV.sqlite` from app assets to the device's documents directory (only on first launch).
2. **User opens a screen** → the screen calls a custom hook (`useChat`, `useSearch`, etc.).
3. **Hook calls the service layer** → `bibleService.ts` runs async SQLite queries; `aiService.ts` applies keyword pattern matching to select a theological response.
4. **Verses are returned** as typed `Verse` objects and rendered via the `VerseCard` component.
5. **All data stays on-device** — no network calls are made for Bible content or AI responses.

---

## 📁 Folder & File Structure

```
BibleAPP/
├── app/                        # All screen routes (Expo Router file-based routing)
│   ├── _layout.tsx             # Root layout — sets up the navigation tree
│   ├── +not-found.tsx          # 404 fallback screen shown for unknown routes
│   └── (tabs)/                 # Tab group — all 5 main screens live here
│       ├── _layout.tsx         # Tab bar configuration with glassmorphism gold gradient
│       ├── index.tsx           # 🏠 Home screen — hero, verse of the day, themes, featured verses
│       ├── chat.tsx            # 🤖 Ask AI screen — conversational Q&A with scripture references
│       ├── search.tsx          # 🔍 Search screen — keyword + semantic AI dual-mode search
│       ├── creative.tsx        # 🎨 Creative screen — generate Psalm/Prophecy/Proverb/Gospel texts
│       └── explore.tsx         # 🗺️ Explore screen — browse 15 themes and all Bible books
│
├── assets/                     # Static assets bundled into the app
│   ├── Telugu_IRV.sqlite       # ⚡ Full Telugu IRV Bible database (~12 MB) — the core data source
│   ├── fonts/                  # Custom fonts (bundled with Expo asset system)
│   └── images/
│       ├── logo.png            # App icon used for splash screen and home screen
│       ├── hero-bible.png      # Hero background image shown on the Home screen
│       ├── chat-bg.png         # Background texture used on the Chat screen
│       └── favicon.ico         # Web browser favicon
│
├── components/                 # Reusable UI components
│   └── ui/
│       ├── VerseCard.tsx       # 📜 Renders a Bible verse with book/chapter/verse ref and theme tags
│       ├── SearchBar.tsx       # 🔍 Controlled text input with clear button for the Search screen
│       └── ThemeTag.tsx        # 🏷️ Pressable theme pill used in the Explore screen grid
│
├── constants/                  # App-wide design tokens and data types
│   ├── theme.ts                # 🎨 Complete design system: Colors, Spacing, FontSize, BorderRadius, Shadow, GlassStyle
│   ├── Colors.ts               # Alias/re-export of theme colors (light/dark color scheme hooks)
│   └── bibleData.ts            # TypeScript interfaces (Verse, Book) and THEMES / FEATURED_THEMES arrays
│
├── hooks/                      # Custom React hooks that bridge screens to services
│   ├── useChat.ts              # Chat screen state: messages array, send/clear actions, loading flag
│   ├── useSearch.ts            # Search screen state: query, results, mode toggle (keyword/semantic)
│   ├── useCreative.ts          # Creative screen state: style selector, generated text, loading flag
│   ├── useColorScheme.ts       # Returns 'light' | 'dark' for native platforms
│   ├── useColorScheme.web.ts   # Web-specific override using `useMediaQuery` for color scheme
│   └── useThemeColor.ts        # Returns the correct color token for the current color scheme
│
├── services/                   # Business logic and data access layer
│   ├── aiService.ts            # 🤖 AI engine: Q&A patterns, creative text templates, semantic scoring
│   └── bibleService.ts         # 📖 SQLite service: DB init, searchVerses, getDailyVerse, getVersesByTheme, etc.
│
├── template/                   # Expo-generated starter template files (reference only)
│   ├── auth/                   # Auth flow template screens
│   ├── core/                   # Core template components
│   ├── ui/                     # UI template components
│   └── index.ts                # Template barrel export
│
├── app.json                    # Expo config: app name, slug, icons, Android package, plugins
├── babel.config.js             # Babel preset for Expo (transpilation config)
├── eslint.config.js            # ESLint flat config using eslint-config-expo
├── expo-env.d.ts               # TypeScript ambient type declarations for Expo Router paths
├── metro.config.js             # Metro bundler config — enables SQLite asset bundling
├── package.json                # NPM dependencies, scripts, and project metadata
├── tsconfig.json               # TypeScript compiler options with path alias (@/ → root)
└── README.md                   # This file
```

---

## 📋 Prerequisites

### Required Software

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 18.x or 20.x LTS | JavaScript runtime |
| npm | 9.x+ (bundled with Node) | Package manager |
| Expo CLI | Latest (`npx expo`) | Dev server & builds |
| EAS CLI | Latest (`npm i -g eas-cli`) | Cloud builds for iOS/Android |

### Mobile Development (Optional)

| Tool | Platform | Purpose |
|---|---|---|
| Android Studio | Windows / macOS / Linux | Android emulator |
| Xcode 15+ | macOS only | iOS simulator and signing |
| Expo Go app | iOS / Android device | Physical device testing |

### Accounts

| Service | Required For |
|---|---|
| Expo account (expo.dev) | EAS Build and over-the-air updates |
| Apple Developer Account | Publishing to the App Store |
| Google Play Console | Publishing to the Play Store |

### Minimum Hardware / OS

- **Windows 10+** (Android development)
- **macOS Ventura+** (iOS development with Xcode)
- At least **4 GB RAM** (8 GB recommended for emulators)

---

## 🔐 Environment Variables

This project does **not** currently use external APIs or cloud services that require secrets. All Bible data is served from the bundled SQLite file.

If you extend the app with cloud services (e.g., Supabase, which is listed in `package.json`), create a `.env` file at the project root:

```env
# .env.example

# Supabase (if enabling cloud sync / auth features)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Expo Project (for EAS builds)
EXPO_PROJECT_ID=your-expo-project-id
```

> **Note:** In Expo, only variables prefixed with `EXPO_PUBLIC_` are accessible on the client side. Never commit secrets to version control.

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rabbunimerugumala/Bible-Ai.git
cd Bible-Ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Verify the SQLite Asset

Confirm the Telugu Bible database is present in the assets folder:

```bash
# On Windows PowerShell
ls assets\Telugu_IRV.sqlite

# On macOS / Linux
ls -lh assets/Telugu_IRV.sqlite
# Expected: ~ 12 MB
```

> The database is bundled directly in the app — no download or external setup needed.

### 4. (Optional) Configure Environment Variables

If enabling Supabase features:

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 5. Start the Development Server

```bash
npx expo start
```

---

## 🚀 How to Run

### Development Mode

```bash
# Start Expo dev server (shows QR code for Expo Go)
npx expo start

# Open directly on Android emulator
npx expo start --android

# Open directly on iOS simulator (macOS only)
npx expo start --ios

# Open in web browser
npx expo start --web
```

### Using Expo Go (Physical Device)

1. Install **Expo Go** from the App Store or Google Play.
2. Run `npx expo start`.
3. Scan the QR code shown in the terminal.

### Production Build (via EAS)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Log in to your Expo account
eas login

# Build APK for Android (debug profile)
eas build --platform android --profile preview

# Build for iOS
eas build --platform ios --profile production
```

### Linting

```bash
npx expo lint
```

### Platform-Specific Notes

| Platform | Note |
|---|---|
| **Windows** | Android emulation works fully. iOS requires a Mac. |
| **macOS** | Both iOS Simulator and Android emulator are supported. |
| **Web** | Run with `--web`; some native features (SQLite) use an in-memory fallback on web. |

---

## 📡 API Documentation

This app has **no external REST API**. All data is served through internal service functions. The key callable functions are:

### `bibleService.ts`

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `searchVerses(query)` | `query: string` | `Promise<Verse[]>` | Full-text keyword search, max 20 results |
| `getVersesByBook(bookName)` | `bookName: string` | `Promise<Verse[]>` | All verses for a given book, ordered by chapter/verse |
| `getVersesByTheme(theme)` | `theme: string` | `Promise<Verse[]>` | Verses matching theme keywords, max 30 results |
| `getDailyVerse()` | none | `Promise<Verse>` | Returns a deterministally selected verse for today |
| `getFeaturedVerses(count?)` | `count: number = 5` | `Promise<Verse[]>` | Random selection of featured verses |
| `getRelatedVerses(verse, count?)` | `verse: Verse, count = 3` | `Promise<Verse[]>` | Verses from the same book/chapter |
| `getBookInfo(name)` | `name: string` | `Promise<Book \| undefined>` | Metadata about a Bible book |
| `formatReference(verse)` | `verse: Verse` | `string` | Returns e.g., `"John 3:16"` |

### `aiService.ts`

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `askQuestion(question)` | `question: string` | `Promise<ChatMessage>` | Returns AI chat response with matching verses |
| `generateBiblicalText(prompt, style)` | `prompt: string, style: string` | `Promise<GeneratedText>` | Returns a creative scripture-style text |
| `semanticSearch(query)` | `query: string` | `Promise<Verse[]>` | Keyword-scored semantic search, max 8 results |

### SQLite Schema

```sql
-- The verses table inside Telugu_IRV.sqlite
CREATE TABLE verses (
  id      INTEGER PRIMARY KEY,
  book    TEXT NOT NULL,
  chapter INTEGER NOT NULL,
  verse   INTEGER NOT NULL,
  text    TEXT NOT NULL
);
```

---

## 🚢 Deployment

### Web (Static Export)

```bash
# Build static web output
npx expo export --platform web

# Output is in the /dist directory
# Deploy to any static host (Netlify, Vercel, GitHub Pages, etc.)
```

#### Deploy to Vercel

```bash
npm i -g vercel
vercel --prod
```

### Android (Google Play)

```bash
# Build production AAB
eas build --platform android --profile production

# Submit to Google Play
eas submit --platform android
```

### iOS (App Store)

```bash
# Build production IPA (requires Apple Developer account)
eas build --platform ios --profile production

# Submit to App Store Connect
eas submit --platform ios
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

### Fork & Branch

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/Bible-Ai.git

# 3. Create a feature branch (use descriptive names)
git checkout -b feature/add-bookmarks
# or
git checkout -b fix/search-result-ordering
```

### Make Changes

- Follow the existing code style (TypeScript strict mode, no `any` where avoidable).
- Use the `Colors`, `Spacing`, `FontSize`, `BorderRadius` tokens from `constants/theme.ts` — never hardcode values.
- Add new screens under `app/(tabs)/` using Expo Router conventions.
- New services go in `services/`, new hooks in `hooks/`.

### Lint & Verify

```bash
npx expo lint
```

### Submit a Pull Request

```bash
git add .
git commit -m "feat: add bookmarks feature with AsyncStorage persistence"
git push origin feature/add-bookmarks
```

Then open a PR against the `main` branch with a clear description of the change.

### Code Style Guidelines

- Use **TypeScript** for all new files.
- Avoid barrel imports from `node_modules` directly in screens — use the service/hook layer.
- Keep screen files focused on UI; move any data logic to a hook or service.
- Use the `// Powered by OnSpace.AI —` comment header on new service/screen files.

---

## 📄 License

This project is **private** and proprietary. All rights reserved.

It is not licensed for redistribution, commercial use, or modification without explicit written permission from the author.

---

## 👤 Author & Credits

### Author

| Field | Detail |
|---|---|
| **Name** | Rabbu Nimerugumala |
| **GitHub** | [@rabbunimerugumala](https://github.com/rabbunimerugumala) |
| **Project** | Bible AI — Telugu IRV Scripture Companion |

### Tech Acknowledgements

- **[Expo](https://expo.dev)** — the React Native toolchain powering the cross-platform build.
- **[expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)** — on-device SQLite for offline Bible data.
- **Telugu IRV Bible** — Indian Revised Version, the scriptural source bundled in this app.
- **OnSpace.AI** — the AI service layer and design system that powers the glassmorphism UI and scripture intelligence engine.
- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** — smooth animations.
- **[@expo/vector-icons](https://icons.expo.fyi/)** — icon set (Feather, MaterialIcons, FontAwesome5).
