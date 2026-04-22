# Contract Table — Design Extract

Source: `apps/ora-frontend` route `/contracts` (rendered via `ContractsPage` in [contracts-page.tsx](apps/ora-frontend/src/features/contracts/contracts-page.tsx)). Values are pulled from `src/styles/tokens.css`, `src/styles/layout.css`, `src/styles/components.css`, `src/styles/base.css`, `src/styles/states.css`, and `src/styles/pages.css`. All rem values are resolved against `font-size: 16px`; resolved widths/heights come from `getComputedStyle()` on a 1440×900 viewport.

Legacy files `src/styles/contracts.css` and `src/styles/ui.css` are **not imported** by `global.css` — values in this doc come only from the live stylesheets.

---

## 1. Design Tokens

### 1.1 Colors (CSS variables on `:root`, from [tokens.css](apps/ora-frontend/src/styles/tokens.css))

| Token | Hex | Used on Contract Table page |
|---|---|---|
| `--ora-app-bg` | `#f3f5f6` | not used on this page (body uses `#f2f5f6`) |
| `--ora-app-bg-strong` | `#ebeff1` | not used |
| `--ora-surface` | `#ffffff` | surface card, table cells, topbar |
| `--ora-surface-muted` | `#fbfcfc` | not used |
| `--ora-surface-subtle` | `#f7f9fa` | hover bg on dropdown items, select-item highlight |
| `--ora-border` | `#dbe2e8` | not used directly (page uses `#d6dee4`, `#dde7ec`, `#d1d6dd`) |
| `--ora-border-strong` | `#c4cdd6` | not used |
| `--ora-text` | `#17222d` | body text color, search input text |
| `--ora-text-muted` | `#5f6d79` | page description, metric label |
| `--ora-text-soft` | `#8896a1` | not used |
| `--ora-brand` | `#243746` | not used (brand primary on this page is teal `#2b7f8c`) |
| `--ora-brand-soft` | `#eef3f7` | not used |
| `--ora-sidebar-bg` | `#2d7f8c` | sidebar gradient top |
| `--ora-sidebar-bg-strong` | `#287280` | sidebar gradient bottom |
| `--ora-sidebar-active` | `#ffffff` | active sidebar icon-shell bg |
| `--ora-sidebar-active-text` | `#196072` | active sidebar icon color |
| `--ora-info` | `#215d93` | focus ring |
| `--ora-info-soft` | `#e9f3ff` | not used |
| `--ora-success` | `#2f6b49` | not used |
| `--ora-success-soft` | `#edf8f1` | not used |
| `--ora-warning` | `#926226` | not used |
| `--ora-warning-soft` | `#fff6ea` | not used |
| `--ora-danger` | `#9b3939` | dropdown "Delete" text |
| `--ora-danger-soft` | `#fff0f0` | not used |

### 1.2 Hard-coded colors actually rendered on the page

| Role | Hex |
|---|---|
| Body background | `#f2f5f6` |
| Topbar bg | `#ffffff` |
| Topbar bottom border | `#d6dce1` |
| Topbar shadow | `0 1px 4.9px rgb(0 0 0 / 0.14)` |
| Sidebar rail bg (gradient) | `#2d7f8c → #287280`, 180deg |
| Sidebar right border | `rgb(255 255 255 / 0.08)` |
| Surface card border | `#d6dee4` |
| Toolbar divider | `#dde7ec` |
| Table head bg | `#f7f8fa` |
| Table head text | `#616a76` |
| Table head bottom border | `#d1d6dd` |
| Table body text | `#2f3c49` |
| Table row bottom border | `#e6edf2` (`.data-table td`) |
| Table row hover bg | `#f5f7fa` |
| Primary button (Import New) bg | `#2b7f8c`, hover `#236f7c` |
| Status pill border (idle) | `#ccd7de`, text `#27414b` |
| Status pill active bg | `#177187`, text `#ffffff` |
| Search/date-range input border | `#bfcad1` |
| Tab (active) text | `#0e6173` |
| Tab (active) bg | `#e4f1f4` |
| Tab (idle) text | `#31424d` |
| Status badge: red dot | `#ef4444` |
| Status badge: orange dot | `#f59e0b` |
| Status badge: green dot | `#10b981` |
| Status badge: grey dot | `#7f8d97` |
| Status badge title text | `#2f343b` |

### 1.3 Typography (from [tokens.css](apps/ora-frontend/src/styles/tokens.css), [base.css](apps/ora-frontend/src/styles/base.css))

| Token | Value |
|---|---|
| `--font-sans` / `--ora-font-family-ui` | `-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Roboto, "Helvetica Neue", Arial, sans-serif` |
| `--ora-font-size-xs` | `12px` |
| `--ora-font-size-sm` | `13px` |
| `--ora-font-size-md` | `14px` |
| `--ora-line-height-tight` | `1.4` |
| `--ora-line-height-normal` | `1.5` |
| Root `font-size` | `16px` (browser default, no `html { font-size }` override) |

Font weights used on page: `400` (search input value), `500` (status badge subtitle), `600` (table head), `700` (bold labels, tab triggers, more button), `800` (page title, dialog title).

### 1.4 Spacing scale (from [tokens.css](apps/ora-frontend/src/styles/tokens.css))

| Token | Value | Present on Contract Table |
|---|---|---|
| `--ora-space-1` | `4px` | yes (dialog close spacing) |
| `--ora-space-2` | `8px` | yes — table cell `padding-block` |
| `--ora-space-3` | `12px` | yes — table cell `padding-inline` default |
| `--ora-space-4` | `16px` | yes — `.page-shell { gap }`, responsive padding |
| `--ora-space-5` | `24px` | yes — `.admin-main { padding }`, topbar padding-inline, content inset |
| `--ora-space-6` | `32px` | not used on this page |

### 1.5 Border-radius (from [tokens.css](apps/ora-frontend/src/styles/tokens.css))

| Token | Value | Where |
|---|---|---|
| `--ora-radius-xs` | `4px` | select-item, calendar-dropdown trigger |
| `--ora-radius-sm` | `6px` | status pill, action-button, tab trigger |
| `--ora-radius-md` | `8px` | surface card, primary button, date-range trigger, search field |
| `--ora-radius-lg` | `12px` | not used on this page |
| `--ora-radius-xl` | `16px` | not used on this page |
| `--ora-radius-pill` | `9999px` | tabs-list (outer), status dot, badge |
| Aliases | `--ora-radius-control = 6px`, `--ora-radius-surface = 8px`, `--ora-radius-overlay = 12px`, `--ora-radius-hero = 16px` | |

### 1.6 Shadows (from [tokens.css](apps/ora-frontend/src/styles/tokens.css))

| Token | Value | Where |
|---|---|---|
| `--ora-shadow-sm` | `0 1px 2px rgb(23 34 45 / 0.06)` | primary button |
| `--ora-shadow-md` | `0 10px 30px rgb(23 34 45 / 0.08)` | dropdown content |
| `--ora-shadow-lg` | `0 24px 48px rgb(23 34 45 / 0.12)` | dialogs, sheets |
| topbar shadow (ad-hoc) | `0 1px 4.9px rgb(0 0 0 / 0.14)` | `.admin-topbar` |

### 1.7 Motion (from [tokens.css](apps/ora-frontend/src/styles/tokens.css))

- `--ora-transition: 180ms ease` — applied to button color/bg/border/transform, input border/shadow/bg, sidebar hover, tabs, calendar dropdown.
- No named easing/duration scale beyond this single token.

---

## 2. Contract Table page anatomy

Render order (default tab = `Reqs`):

```
body                                  (bg #f2f5f6, font-family see 1.3, font-size 16px)
└─ #root
   └─ AppShell  [app-shell.tsx]
      ├─ .admin-topbar                 fixed, top:0, height 60px, bg #ffffff,
      │                                 border-bottom 1px #d6dce1, shadow (see 1.2),
      │                                 padding 0 24px
      │  ├─ .admin-topbar-brand        margin-left calc((52-44)/2 - 24 - 1) = -21px,
      │  │  └─ <img.brand-logo>        44×44, object-fit: contain
      │  └─ .admin-topbar-actions
      │     └─ .admin-user-avatar      34.4×34.4 (2.15rem), circle, gradient
      │                                 #2f8695→#2c7d8a, icon 17.6×17.6
      └─ .admin-body                   min-h 100vh, padding-top 60px
         ├─ .admin-sidebar             fixed, top:60, left:0, w 52px, h calc(100vh-60px),
         │                              gradient #2d7f8c→#287280, border-right
         │                              1px rgb(255 255 255 / 0.08)
         │  └─ .admin-sidebar-nav      flex col, gap 4.8px (0.3rem), padding-top 16px
         │     └─ .admin-sidebar-link  w 100%, min-h 51.2px (3.2rem)
         │        └─ .admin-sidebar-icon-shell  34.4×34.4, radius 8px;
         │                                        active: bg #ffffff, color #196072,
         │                                        shadow 0 1px 2px rgb(0 0 0 / 0.1)
         └─ .admin-main                margin-left 52px, padding 24px
            └─ .page-shell.contracts-page-shell  flex col, gap 16px
               ├─ .page-header
               │  └─ .page-header-main  gap 16px, space-between
               │     ├─ .page-header-copy
               │     │  └─ h1.page-title   font-size clamp(1.55rem,2vw,2.05rem)
               │     │                     resolved 28.8px on 1440w, weight 800,
               │     │                     line-height 30.24px, letter-spacing -0.864px
               │     │                     content: "Contract Table"
               │     └─ .page-header-actions  gap 12px
               │        ├─ .contracts-date-search-control  inline-flex, gap 8.8px
               │        │  ├─ .date-range-picker-trigger.contracts-date-range-picker
               │        │  │     w 248px, h 38px, bg #fff, border 1px #bfcad1,
               │        │  │     radius 8px (inner divider 1px #d5dee5;
               │        │  │     placeholder text color #8896a1 ~"All")
               │        │  └─ .contracts-search-field       w 237px, h 36px,
               │        │        padding 0 13.12px, border 1px #bfcad1, radius 8px,
               │        │        bg #fff; inline input plus lucide Search icon 16×16
               │        │        (#7f8d97); placeholder "Contracts Number"
               │        └─ button.contracts-primary-button  "+ Import New"
               │              h 36px (min-h 2.25rem overrides btn-size-default),
               │              padding-inline 16px, bg #2b7f8c, color #fff,
               │              font-size 14.72px (0.92rem), weight 700,
               │              radius 8px, shadow 0 1px 2px rgb(23 34 45 / 0.06)
               └─ section.surface-card.contracts-table-panel
                  (gap:0, padding:0, overflow hidden, bg #fff,
                   border 1px #d6dee4, radius 8px, no shadow)
                  ├─ .contracts-toolbar                padding 12px 0 10.4px,
                  │                                    border-bottom 1px #dde7ec,
                  │                                    gap 12px, align-items:center
                  │  ├─ .contracts-toolbar-left        w 728px on 1440w (= content inset
                  │  │                                 + 7 sticky col widths + actions col),
                  │  │                                 padding-left 10.4px
                  │  │                                 (inset 24 − pill inline 13.6),
                  │  │                                 border-right 1px #dde7ec
                  │  │  ├─ button.contracts-status-pill[.contracts-status-pill-active]
                  │  │  │     min-h 36px, padding 0 13.6px (0.85rem),
                  │  │  │     font-size 13.76px (0.86rem), weight 700,
                  │  │  │     radius 6px; idle: bg #fff, border 1px #ccd7de,
                  │  │  │     text #27414b; active: bg #177187, border #177187,
                  │  │  │     text #fff. Inner children: <span>label</span>
                  │  │  │     <span class="contracts-status-pill-dot">·</span>
                  │  │  │     <strong>count</strong>
                  │  │  ├─ same pill for "Pending Scheduling"
                  │  │  └─ button.contracts-more-trigger  variant=outline, size=sm,
                  │  │        h 36px, padding 0 12.8px, bg #fff, border 1px #dbe2e8,
                  │  │        radius 8px, font 13.12px/700. Inner: "More" +
                  │  │        ChevronDown 14.4×14.4 (0.9rem), stroke-width 2.2
                  │  └─ .contracts-toolbar-right       flex 1, justify:space-between,
                  │                                    padding-right 24px
                  │     ├─ .contracts-tabs > .tabs-list.contracts-tabs-list
                  │     │     gap 3.2px, no bg, no border, padding 0
                  │     │     (tabs-list default radius 9999px is overridden to
                  │     │      transparent container, each trigger pill-shaped)
                  │     │  └─ button.tabs-trigger.contracts-tab-trigger  (4 tabs:
                  │     │        Reqs, Finance, Pkg, Plan)
                  │     │        min-w 64px, min-h 36px, padding 0 12.8px,
                  │     │        font 13.12px/700, radius 6px;
                  │     │        active (Reqs): color #0e6173, bg #e4f1f4;
                  │     │        idle: color #31424d, bg transparent
                  │     └─ button.contracts-settings-button  variant=ghost, size=icon,
                  │           36×36, radius 6px, icon color #5f707a, Settings 16×16
                  └─ .table-shell.contracts-table-scroll   overflow:auto,
                        bg #fff, NO border/radius (overrides default table-shell via
                        `.contracts-table-panel .table-shell {border:0;border-radius:0}`)
                     └─ table.data-table.contracts-data-table
                           table-layout:fixed, min-width 90rem (1440px),
                           border-collapse:collapse
                        ├─ thead/tr
                        │  └─ th (8 lead + N detail columns)
                        │        height 38px, bg #f7f8fa, color #616a76,
                        │        font-size 12px (xs), weight 600, line-height 16.8px
                        │        (1.4), letter-spacing 0.48px (0.04em),
                        │        text-transform uppercase,
                        │        padding 8px 12px (space-2 / space-3);
                        │        first-child padding-left 24px (inset);
                        │        last-child padding-right 24px
                        │        Lead columns: Date(96), Contract No(120), Brand(56),
                        │        Product(112), Spec(120), Qty(80), Status(104),
                        │        Actions(40)
                        ├─ tbody/tr (per contract row)
                        │     hover bg #f5f7fa
                        │  └─ td  height auto (min is table-filler 34px), padding 8px 12px,
                        │         font-size 13px, line-height 18.2px (1.4), color #2f3c49,
                        │         bg #fff, border-bottom 1px #e6edf2,
                        │         first-child padding-left 24px, last-child padding-right 24px
                        │         — Status cell contains .contract-master-status
                        │           (gap 8px, align:center):
                        │           .contract-master-status-dot  7.68×7.68, radius 9999px,
                        │              bg red/orange/green/grey token (see 1.2);
                        │           .contract-master-status-copy (flex col, gap 1.28px):
                        │              .contract-master-status-title  12px/700/#2f343b,
                        │              .contract-master-status-subtitle 12px/500/#2f343b.
                        │         — Actions cell is an Ellipsis button
                        │           .contracts-row-action-trigger  26.4×26.4 (1.65rem),
                        │           color #6a7b85, icon 14.4×14.4 (Ellipsis from lucide).
                        └─ .table-filler-row × up to (20 − rows.length)
                              td height 34px, same padding/borders, empty.
```

Final composed viewport layout (1440×900): sidebar 52px wide, main content from x=76 to x=1416, page padding 24px on each side.

---

## 3. Bare → Tokenized deltas (animation source-of-truth)

All "tokenized" values are computed from the live `/contracts` render with default 16px root font. "Bare" values are the user-agent defaults for Chromium (WebKit default margins, `text-align:left`, padding `1px` for `<td>`, etc.).

| Element | Bare (no styles) | Tokenized (this project) |
|---|---|---|
| `<table>` cell (`<td>`) padding | `1px 1px` (UA default) | `8px 12px` (lead cols); `8px 12px 8px 24px` for 1st col; `8px 24px 8px 12px` for last col |
| `<td>` vertical-align | `middle` (UA default) | `middle` |
| `<td>` font-size | inherits `16px` | `13px` |
| `<td>` line-height | `normal` (~19.2px at 16px) | `18.2px` (`1.4 × 13`) |
| `<td>` color | `CanvasText` (~`#000`) | `#2f3c49` |
| `<td>` background | transparent | `#ffffff`; hover `#f5f7fa` |
| `<tr>` border / separator | none | cell `border-bottom: 1px solid #e6edf2` |
| `<th>` font-size | `16px` | `12px` |
| `<th>` font-weight | `bold` (`700`) | `600` |
| `<th>` color | `CanvasText` | `#616a76` |
| `<th>` background | transparent | `#f7f8fa` |
| `<th>` padding | `1px 1px` | `8px 12px` (first: `8px 12px 8px 24px`) |
| `<th>` height | `auto` (~content) | `38px` fixed |
| `<th>` letter-spacing | `normal` | `0.48px` (`0.04em`) |
| `<th>` text-transform | `none` | `uppercase` |
| `<th>` border-bottom | none | `1px solid #d1d6dd` |
| `<table>` border-collapse | `separate` | `collapse` (removes double borders) |
| `<button>` (default UA) | UA gray gradient, `padding: 1px 6px`, `border: 2px outset ButtonBorder`, `font: 13.333px Arial` (system) | **Primary "+ Import New"**: h `36px`, padding-inline `16px`, radius `8px`, bg `#2b7f8c`, color `#fff`, border `1px transparent`, font-size `14.72px` (0.92rem), weight `700`, line-height `22.08px`, shadow `0 1px 2px rgb(23 34 45 / 0.06)` |
| `<button>` (status pill idle) | same UA | h `36px`, padding `0 13.6px`, radius `6px`, bg `#fff`, border `1px solid #ccd7de`, color `#27414b`, font-size `13.76px`, weight `700` |
| `<button>` (status pill active) | same UA | h `36px`, padding `0 13.6px`, radius `6px`, bg `#177187`, border `1px solid #177187`, color `#fff`, shadow `0 1px 2px rgb(23 34 45 / 0.06)` |
| `<button>` (tabs trigger, idle) | same UA | h `36px`, padding `0 12.8px`, radius `6px`, bg transparent, color `#31424d`, font `13.12px/700`, line-height `19.68px` |
| `<button>` (tabs trigger, active) | same UA | same box, bg `#e4f1f4`, color `#0e6173` |
| `<button>` (More / Outline) | same UA | h `36px`, padding `0 12.8px`, radius `8px`, bg `#fff`, border `1px solid #dbe2e8`, color `#17222d`, font `13.12px/700` |
| `<button>` (Ghost icon, Settings/ellipsis) | same UA | Settings: `36×36` (2.25rem), radius `6px`, bg transparent, color `#5f707a`, icon `16×16`. Ellipsis row action: `26.4×26.4` (1.65rem), color `#6a7b85`, icon `14.4×14.4` |
| `<input type="search">` (search field inner) | `padding: 1px 2px`, `border: 2px inset`, `font: 13.333px Arial`, magnifier decoration | Field wrapper `.contracts-search-field`: h `36px`, padding `0 13.12px` (0.82rem), bg `#fff`, border `1px solid #bfcad1`, radius `8px`. Inner `<input>`: h `32px`, padding `0`, bg transparent, border `0`, font-size `16px`, color `#17222d`, placeholder color inherits `#8896a1` |
| `<input type="text">` (date-range trigger ghost) | same UA | As button: w `248px`, h `38px`, bg `#fff`, border `1px solid #bfcad1`, radius `8px`, text color `#17222d`, placeholder text "All" color `#8896a1` |
| Status dot | n/a | `7.68×7.68` (0.48rem), radius `9999px`, bg from token (red `#ef4444` / orange `#f59e0b` / green `#10b981` / grey `#7f8d97`) |
| Status badge text block | n/a | title `12px/700/#2f343b`, subtitle `12px/500/#2f343b`, inner gap `1.28px` (0.08rem), outer gap between dot and copy `8px` (0.5rem) |
| Card container (`.surface-card.contracts-table-panel`) | n/a | bg `#fff`, border `1px solid #d6dee4`, radius `8px`, shadow `none` (overridden; default surface-card has `--ora-shadow-sm`), padding `0`, gap `0`, overflow hidden |
| Page title `<h1>` | `2em = 32px`, `margin: 0.67em 0` (UA) | font-size `28.8px` (clamp(1.55rem, 2vw, 2.05rem) at 1440w), weight `800`, line-height `30.24px` (1.05), letter-spacing `-0.864px` (-0.03em), margin `0` |
| Topbar (`.admin-topbar`) | n/a | fixed, h `60px`, bg `#fff`, border-bottom `1px solid #d6dce1`, shadow `0 1px 4.9px rgb(0 0 0 / 0.14)`, padding-inline `24px` |
| Sidebar rail (`.admin-sidebar`) | n/a | w `52px`, bg linear-gradient(180deg, `#2d7f8c` 0%, `#287280` 100%), border-right `1px rgb(255 255 255 / 0.08)` |

---

## 4. Static HTML + inline CSS replica (final tokenized state)

Self-contained snapshot of the main content area: Toolbar + Table (6 rows of fake data) + one filler row. Open directly in any browser.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Ora — Contract Table replica</title>
<style>
  *,*::before,*::after{box-sizing:border-box}
  body{
    margin:0;
    font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Roboto,"Helvetica Neue",Arial,sans-serif;
    font-size:16px;
    color:#17222d;
    background:#f2f5f6;
  }
  .topbar{
    position:sticky;top:0;z-index:40;
    display:flex;align-items:center;justify-content:space-between;
    height:60px;padding:0 24px;
    background:#ffffff;border-bottom:1px solid #d6dce1;
    box-shadow:0 1px 4.9px rgba(0,0,0,0.14);
  }
  .topbar-logo{width:44px;height:44px;border-radius:50%;background:#e9f1f4;display:inline-flex;align-items:center;justify-content:center;color:#2d7f8c;font-weight:800}
  .topbar-avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(180deg,#2f8695 0%,#2c7d8a 100%)}
  .layout{display:flex;min-height:calc(100vh - 60px)}
  .sidebar{
    width:52px;flex:0 0 52px;
    background:linear-gradient(180deg,#2d7f8c 0%,#287280 100%);
    border-right:1px solid rgba(255,255,255,0.08);
    padding-top:16px;display:flex;flex-direction:column;align-items:center;gap:4.8px;
  }
  .sidebar-slot{width:34.4px;height:34.4px;border-radius:8px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.95);font-size:13px}
  .sidebar-slot.active{background:#ffffff;color:#196072;box-shadow:0 1px 2px rgba(0,0,0,0.1)}
  .main{flex:1;min-width:0;padding:24px}
  .page-shell{display:flex;flex-direction:column;gap:16px}
  .page-header{display:flex;gap:16px;align-items:flex-start;justify-content:space-between}
  .page-title{margin:0;font-size:28.8px;line-height:30.24px;letter-spacing:-0.864px;font-weight:800;color:#17222d}
  .page-actions{display:flex;gap:12px;align-items:center}
  .date-search{display:inline-flex;gap:8.8px;align-items:center}
  .date-range{display:inline-flex;align-items:center;width:248px;height:38px;padding:0 13px;background:#ffffff;border:1px solid #bfcad1;border-radius:8px;color:#8896a1;font-size:13px;justify-content:space-between}
  .date-range > .divider{width:1px;height:24px;background:#d5dee5}
  .date-range .text{flex:1;padding:0 8px;color:#2f3f49}
  .search-field{display:inline-flex;align-items:center;gap:8.8px;width:237px;height:36px;padding:0 13.12px;background:#ffffff;border:1px solid #bfcad1;border-radius:8px}
  .search-field input{flex:1;min-width:0;height:32px;padding:0;border:0;background:transparent;outline:none;font:inherit;font-size:16px;color:#17222d}
  .search-field input::placeholder{color:#8896a1}
  .search-icon,.chev{width:16px;height:16px;color:#7f8d97;display:inline-block}
  .primary-btn{display:inline-flex;align-items:center;justify-content:center;gap:8.8px;height:36px;padding:0 16px;border-radius:8px;border:1px solid transparent;background:#2b7f8c;color:#ffffff;font-size:14.72px;font-weight:700;line-height:22.08px;box-shadow:0 1px 2px rgba(23,34,45,0.06);cursor:pointer}
  .surface{background:#ffffff;border:1px solid #d6dee4;border-radius:8px;overflow:hidden}
  .toolbar{display:flex;align-items:center;gap:12px;padding:12px 0 10.4px;border-bottom:1px solid #dde7ec}
  .toolbar-left{display:flex;align-items:center;gap:12px;flex-wrap:wrap;padding-left:10.4px;border-right:1px solid #dde7ec;padding-right:12px}
  .toolbar-right{display:flex;flex:1;align-items:center;justify-content:space-between;padding-right:24px}
  .status-pill{display:inline-flex;align-items:center;gap:7.2px;min-height:36px;padding:0 13.6px;background:#ffffff;border:1px solid #ccd7de;border-radius:6px;font-size:13.76px;font-weight:700;color:#27414b;cursor:pointer;box-shadow:0 1px 2px rgba(23,34,45,0.06)}
  .status-pill.active{background:#177187;border-color:#177187;color:#ffffff}
  .status-pill .dot{color:rgba(39,65,75,0.7)}
  .status-pill.active .dot{color:rgba(255,255,255,0.7)}
  .more-btn{display:inline-flex;align-items:center;gap:8.8px;height:36px;padding:0 12.8px;background:#ffffff;border:1px solid #dbe2e8;border-radius:8px;color:#17222d;font-size:13.12px;font-weight:700;cursor:pointer}
  .tabs-list{display:inline-flex;gap:3.2px;background:transparent;padding:0;border:0}
  .tab{min-width:64px;min-height:36px;padding:0 12.8px;background:transparent;border:0;border-radius:6px;color:#31424d;font-size:13.12px;font-weight:700;cursor:pointer}
  .tab.active{background:#e4f1f4;color:#0e6173}
  .settings{width:36px;height:36px;border-radius:6px;background:transparent;border:0;color:#5f707a;cursor:pointer;display:inline-flex;align-items:center;justify-content:center}
  .table-wrap{overflow:auto}
  table.data{width:100%;min-width:90rem;border-collapse:collapse;table-layout:fixed}
  .data th,.data td{padding:8px 12px;text-align:left;vertical-align:middle;white-space:nowrap;line-height:18.2px}
  .data th:first-child,.data td:first-child{padding-left:24px}
  .data th:last-child,.data td:last-child{padding-right:24px}
  .data thead th{height:38px;background:#f7f8fa;color:#616a76;font-size:12px;font-weight:600;line-height:16.8px;letter-spacing:0.48px;text-transform:uppercase;border-bottom:1px solid #d1d6dd}
  .data tbody td{background:#ffffff;color:#2f3c49;font-size:13px;border-bottom:1px solid #e6edf2}
  .data tbody tr:hover td{background:#f5f7fa}
  .col-date{width:96px}
  .col-no{width:120px}
  .col-brand{width:56px}
  .col-product{width:112px}
  .col-spec{width:120px}
  .col-qty{width:80px;font-variant-numeric:tabular-nums;text-align:right}
  .col-status{width:104px}
  .col-action{width:40px;text-align:center}
  .col-gacc{min-width:170px}
  .col-coding{min-width:210px}
  .col-ship{min-width:240px}
  .col-label{min-width:170px}
  .col-notes{min-width:240px}
  .status{display:inline-flex;gap:8px;align-items:center}
  .status .d{width:7.68px;height:7.68px;border-radius:9999px}
  .status .d.red{background:#ef4444}
  .status .d.orange{background:#f59e0b}
  .status .d.green{background:#10b981}
  .status .d.grey{background:#7f8d97}
  .status .copy{display:inline-flex;flex-direction:column;gap:1.28px;line-height:16.8px}
  .status .copy .t{font-size:12px;font-weight:700;color:#2f343b}
  .status .copy .s{font-size:12px;font-weight:500;color:#2f343b}
  .ellipsis-btn{width:26.4px;height:26.4px;border-radius:6px;background:transparent;border:0;color:#6a7b85;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;font-size:16px;line-height:1}
  .filler td{height:34px}
</style>
</head>
<body>
  <header class="topbar">
    <div class="topbar-logo">O</div>
    <div class="topbar-avatar"></div>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-slot active">▤</div>
      <div class="sidebar-slot">◱</div>
      <div class="sidebar-slot">▦</div>
    </aside>

    <main class="main">
      <div class="page-shell">
        <div class="page-header">
          <h1 class="page-title">Contract Table</h1>
          <div class="page-actions">
            <div class="date-search">
              <div class="date-range">
                <span class="text">All</span>
                <span class="divider"></span>
                <span class="text" style="flex:0 0 auto;color:#8896a1">All</span>
                <span class="chev">▾</span>
              </div>
              <div class="search-field">
                <span class="search-icon">⌕</span>
                <input type="search" placeholder="Contracts Number" />
              </div>
            </div>
            <button class="primary-btn" type="button">+ Import New</button>
          </div>
        </div>

        <section class="surface">
          <div class="toolbar">
            <div class="toolbar-left">
              <button class="status-pill active" type="button">
                <span>All</span><span class="dot">·</span><strong>6</strong>
              </button>
              <button class="status-pill" type="button">
                <span>Pending Scheduling</span><span class="dot">·</span><strong>3</strong>
              </button>
              <button class="more-btn" type="button">
                <span>More</span><span class="chev">▾</span>
              </button>
            </div>
            <div class="toolbar-right">
              <div class="tabs-list" role="tablist">
                <button class="tab active" type="button">Reqs</button>
                <button class="tab" type="button">Finance</button>
                <button class="tab" type="button">Pkg</button>
                <button class="tab" type="button">Plan</button>
              </div>
              <button class="settings" type="button" aria-label="Column settings">⚙</button>
            </div>
          </div>

          <div class="table-wrap">
            <table class="data">
              <thead>
                <tr>
                  <th class="col-date">Date</th>
                  <th class="col-no">Contract No</th>
                  <th class="col-brand">Brand</th>
                  <th class="col-product">Product</th>
                  <th class="col-spec">Spec</th>
                  <th class="col-qty">Qty</th>
                  <th class="col-status">Status</th>
                  <th class="col-action"></th>
                  <th class="col-gacc">GACC</th>
                  <th class="col-coding">Coding Format</th>
                  <th class="col-ship">Shipping Method</th>
                  <th class="col-label">Labeling</th>
                  <th class="col-notes">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>01/01/2026</td><td>LTUM-202600001</td><td>Little</td><td>Liquid Calcium (Xylitol V2)</td><td>10 ml / sachet</td><td>900000</td>
                  <td><span class="status"><span class="d red"></span><span class="copy"><span class="t">Pending</span><span class="s">Scheduling</span></span></span></td>
                  <td><button class="ellipsis-btn" aria-label="Actions">⋯</button></td>
                  <td>—</td><td>YYMMDD-BATCH</td><td>Sea</td><td>CN/EN</td><td>Mock note</td>
                </tr>
                <tr>
                  <td>04/03/2026</td><td>ORA-2026-002</td><td>Ora</td><td>Protein Powder</td><td>20 g / box</td><td>300</td>
                  <td><span class="status"><span class="d orange"></span><span class="copy"><span class="t">Pending</span><span class="s">Production</span></span></span></td>
                  <td><button class="ellipsis-btn" aria-label="Actions">⋯</button></td>
                  <td>—</td><td>LOT-###</td><td>Air</td><td>EN</td><td>—</td>
                </tr>
                <tr>
                  <td>12/03/2026</td><td>LTUM-202600003</td><td>Little</td><td>Fiber Drink</td><td>30 ml / sachet</td><td>240000</td>
                  <td><span class="status"><span class="d orange"></span><span class="copy"><span class="t">Production</span><span class="s">On-Going</span></span></span></td>
                  <td><button class="ellipsis-btn" aria-label="Actions">⋯</button></td>
                  <td>View Label</td><td>YYYYMMDD</td><td>Express</td><td>CN</td><td>—</td>
                </tr>
                <tr>
                  <td>22/03/2026</td><td>LTUM-202600004</td><td>Little</td><td>Multivitamin</td><td>500 mg / tab</td><td>60000</td>
                  <td><span class="status"><span class="d green"></span><span class="copy"><span class="t">Done</span></span></span></td>
                  <td><button class="ellipsis-btn" aria-label="Actions">⋯</button></td>
                  <td>View Label</td><td>LOT-A-0001</td><td>Sea</td><td>CN/EN</td><td>Shipped</td>
                </tr>
                <tr>
                  <td>29/03/2026</td><td>ORA-2026-005</td><td>Ora</td><td>Collagen Peptide</td><td>10 g / sachet</td><td>450000</td>
                  <td><span class="status"><span class="d red"></span><span class="copy"><span class="t">Pending</span><span class="s">Preparation</span></span></span></td>
                  <td><button class="ellipsis-btn" aria-label="Actions">⋯</button></td>
                  <td>—</td><td>BATCH-YY</td><td>Rail</td><td>EN</td><td>—</td>
                </tr>
                <tr>
                  <td>04/04/2026</td><td>LTUM-202600006</td><td>Little</td><td>Vitamin D3 Drops</td><td>15 ml / bottle</td><td>90000</td>
                  <td><span class="status"><span class="d grey"></span><span class="copy"><span class="t">New</span><span class="s">Contract</span></span></span></td>
                  <td><button class="ellipsis-btn" aria-label="Actions">⋯</button></td>
                  <td>—</td><td>—</td><td>Sea</td><td>CN</td><td>Await spec</td>
                </tr>
                <tr class="filler"><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  </div>
</body>
</html>
```

---

## 5. Reference screenshot

Real-page capture (Chromium via Playwright, 1440×900 viewport, 2× DPR): `design-extract-reference.png`.
