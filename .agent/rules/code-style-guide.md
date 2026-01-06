---
trigger: always_on
---

# Project Context
You are building a **personal portfolio website** with a strong visual identity, smooth motion, and bilingual content.
**Goal:** Keep the UI polished and expressive while staying lightweight, readable, and easy to maintain.

# Tech Stack
- **Framework:** Vite + React 18 (SPA)
- **Language:** TypeScript
- **Routing:** React Router
- **Motion:** Framer Motion
- **i18n:** i18next + react-i18next
- **Icons:** lucide-react
- **Styling:** Component-scoped CSS files (no Tailwind)

---

# 1. UI & Experience (HIGHEST PRIORITY)

## A. Visual Consistency
- **Preserve the current look.** Avoid redesigns unless explicitly requested.
- **Motion is part of the brand.** Use `pageTransition` and existing animation utilities instead of inventing new patterns.
- **No generic UI swaps.** Reuse `ExpandableImage`, `StackedGallery`, `ProjectHeader`, and `BottomNav` for consistent behavior.

## B. Interaction Quality
- **Clickable elements must be real controls.** Use `<button>` / `<Link>` instead of clickable `<div>`.
- **Accessibility is mandatory.** All images need `alt`, buttons need `aria-label` where labels are not visible.
- **Fullscreen UX:** Use `ExpandableImage` for any media that supports fullscreen.

---

# 2. i18n & Content

## A. Translations
- **All new UI text goes into translation files** (`src/locales/en/translation.json`, `src/locales/zh/translation.json`).
- **No hard-coded strings** in components unless it's a proper name or a fixed label (e.g., a company name).
- **Language switch uses the overlay.** Any new switch logic must call `LanguageTransitionOverlay`.

## B. Tone
- **Short, sharp copy.** Keep text minimal and visual.
- **Consistency across languages.** Meaning should match, not just literal translation.

---

# 3. Routing & Navigation

- **Routes live in `src/App.tsx`.** Keep lazy loading for pages.
- **Keep `/project/:id` behavior stable.** Project IDs are routing keys, not human-readable slugs.
- **Bottom nav reflects primary routes.** If you add a top-level page, update `BottomNav` and translation keys.

---

# 4. Media & Performance

- **Images:** Store under `public/assets` and reference via absolute `/assets/...` paths.
- **Performance:** Set `loading` and `fetchpriority` for above-the-fold images.
- **Large embeds:** Use `ExpandableImage` with `interactiveSrc` for heavy/interactive content.

---

# 5. Code Standards

- **Side effects must clean up.** Always remove event listeners and clear timers in `useEffect` cleanups.
- **TypeScript strictness matters.** Avoid `any` and keep props typed.
- **Keep imports clean.** All imports at the top of the file.

---

# 6. Theme Tokens & Modes

- **Default theme is dark.** Light mode is optional via `data-theme="light"` or system preference.
- **All color usage must go through CSS variables.** Use `--bg-*`, `--text-*`, `--border-*`, `--accent-*`, `--shadow-*`.
- **No new hard-coded colors** in component CSS or inline styles, except documented data visualization palettes.
- **Migrate existing hard-coded colors** to tokens incrementally (page-by-page or component-by-component).
- **Token definitions live in `src/index.css`.** Feature-specific groups can live in `src/styles/*.css`.
- **Theme switching UI uses i18n.** Any new theme controls must read labels from translation files.
- **Component-specific theming uses aliases.** Define component-scope variable aliases instead of hard-coding.
- **User choice overrides system.** `prefers-color-scheme` is a fallback only.

---

# Development Mindset
- **Design-first engineering.** Preserve the portfolio's visual polish.
- **Prefer refinement over new patterns.** Extend existing components before adding new ones.
- **If it touches motion, test on mobile.** Motion should stay smooth across devices.
