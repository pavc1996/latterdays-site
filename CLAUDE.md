# CLAUDE.md — Latterdays Site

## Project overview
- Marketing / lookbook site for **Latterdays**, a streetwear brand (IG: `@latterdayss`).
- Currently a **design review build**: `index.html` is a chooser; `v1`–`v5` are five competing one-page designs the owner picks between.
- **Each variation has its own structural metaphor** — not a restyle of one shared template. See "Variations" below.
- Primary user: the brand owner (non-technical). Secondary: visitors landing via IG.
- Business goal: collect emails for the upcoming **Days of Sabr** drop and showcase the **Days of Arc** (F/W 2024) and **Days of Bloom** archives.

## Live + repo
- **Live:** https://pavc1996.github.io/latterdays-site/ (GitHub Pages, main branch, `/` root)
- **Repo:** https://github.com/pavc1996/latterdays-site (public)
- Pushing to `main` auto-redeploys Pages. No CI.

## Variations — each has its own structure, not shared order
1. **v1 — Editorial / "The Issue"**: vertical scroll-snap plates, each garment a numbered Plate. Fixed left spine + right-side dot index (no top nav). Uses `.stack` as the snap container.
2. **v2 — Painted / "A Walk Through the Pond"**: one long parallax essay. `.sky` + `.pond` + `.mist` are fixed background layers; the Sabr key-art is pinned behind verses that scroll over it. Archive pieces appear as painted polaroid clusters (`.memory-cluster`), not a grid. Inline JS drives the parallax.
3. **v3 — Ivy / "Course Catalog"**: tabbed university catalog. Left sidebar = courses (LTD 101 Bloom / 201 Arc / 301 Sabr); right panel swaps on click. Inline JS does tab switching AND maps the legacy anchors (`#drop` → Sabr tab, `#past` → Bloom tab) so nav links still activate the right panel.
4. **v4 — Zine / "Issue 03"**: horizontal page-turn magazine. `.zine` is a horizontal scroll-snap container; each `.page` is a viewport-wide spread (cover, ToC, editor's letter, Sabr portfolio, Arc lookbook, LTDZ field notes, Bloom archive, classifieds/notify, back cover). Fixed `.pager` has prev/next + live page counter. Arrow keys work. Inline JS hooks `#anchors` to page jumps.
5. **v5 — Brutalist / "The Wall"**: marquee ticker + live countdown (target `2026-09-21T12:00:00Z`) + absolutely-positioned taped posters (`.poster-field`). Archive is an evidence/exhibit list (`.ev-list`), not a gallery. Uses `common.js`'s `.marquee-track` doubling for the seamless loop.

**Rule:** variations must stay structurally distinct. Do **not** consolidate them back to one shared nav→hero→philosophy→drop→past-gallery→notify→footer template. Archive pieces should be used inventively per variation (plates / painted memories / ID-card rosters / magazine spreads / taped posters) — never as a repeating gallery grid.

## Tech stack
- **Plain HTML + CSS + vanilla JS.** No build step, no framework, no package manager, no `node_modules`.
- Google Fonts loaded via `@import` in `styles/base.css` (Archivo Black, Anton, Cormorant Garamond, Playfair Display, Inter, JetBrains Mono, Noto Serif JP).
- Email capture uses **Formspree** (or equivalent). Endpoint placeholder: `YOUR_FORMSPREE_ENDPOINT` in every `v*.html` form `action`. Until replaced, `scripts/common.js` intercepts the submit and shows a success message locally.
- Per-variation inline `<script>` blocks at the bottom of each `v*.html` are acceptable (parallax, tab switching, countdown, pager). Shared behavior still lives in `scripts/common.js`.
- No env/config files. No secrets in repo.

## Repo structure
```
/
├── index.html              # Chooser — 5 preview cards
├── v1-editorial.html       # "The Issue" — scroll-snap plates
├── v2-painted.html         # "A Walk Through the Pond" — parallax narrative
├── v3-ivy.html             # "Course Catalog" — tabbed catalog
├── v4-zine.html            # "Issue 03" — horizontal page-turn magazine
├── v5-brutalist.html       # "The Wall" — taped posters + countdown
├── styles/
│   ├── base.css            # Reset, font imports, shared .reveal + .form-msg
│   ├── chooser.css         # index.html only
│   └── v1.css … v5.css     # Scoped per variation via body.v1 … body.v5
├── scripts/
│   └── common.js           # .reveal IntersectionObserver, form fallback, marquee doubling
├── assets/
│   ├── logo.jpg            # Wordmark (from IMG_9577.jpg)
│   └── drops/              # All drop imagery, web-friendly names
├── .gitignore              # .DS_Store, logs, node_modules, editor dirs
└── IMG_*.jpg, LOWER D.O.S.PNG   # Original source uploads — keep, do not delete
```

- **No backend, no shared code, no tests directory, no docs directory.** If you need to add any of those, check with the owner first.

## Local development
- **Run**: `python3 -m http.server 8000` in repo root, then open `http://localhost:8000/`.
- **Alt**: `open index.html` works but some browsers block `fetch`/fonts over `file://`. Prefer the server.
- **Build / test / lint / typecheck**: N/A — none configured. Do not introduce a build system without asking.

## Definition of done
Before reporting a task complete:
1. Load every page you touched (or the chooser + all 5 variations if you touched shared files) via `http://localhost:8000/`.
2. Confirm no 404s in DevTools Network tab — especially asset paths under `assets/drops/`.
3. Check desktop **and** mobile viewport (DevTools responsive mode ≤ 400px). Nav collapses, images don't overflow.
4. Verify the email form still shows the fallback success message when the Formspree endpoint is unset.
5. If you changed copy, confirm the patience / "Days of…" voice is intact.
6. For v3, click each course tab — all three panels render; nav links to `#drop`/`#past` activate the correct tab.
7. For v4, use the pager arrows and keyboard ← / → — all 9 pages reachable.
8. For v5, confirm countdown ticks and posters are tappable without overlapping illegibly on mobile.

## Coding rules
- **Styles are scoped by body class** (`body.v1 { … }`). Never write unscoped selectors in `v*.css` — they will leak across variations via `base.css`. Shared utilities go in `base.css` only.
- **File size**: variations are now more elaborate than the original sketch. `v*.html` may run ~180–260 lines and `v*.css` ~350–500 lines. Over that, simplify before splitting.
- **No frameworks, no npm packages, no bundlers.** Keep the zero-dependency stance.
- **CSS variables per variation**: every `v*.css` defines its palette under `:root` as `--v{N}-*`. Reuse those instead of hard-coding hex values mid-file.
- **No comments** unless explaining a non-obvious *why*. Well-named classes and selectors are the documentation.
- **No inline `<style>` or inline `style=` blocks** except the small swatch previews in `index.html` (intentional) and minor style tweaks in per-variation inline JS (e.g. parallax transforms).
- **Prefer editing the existing variation file** over forking a new one. New variation files require owner approval.
- **Semantic HTML**: preserve the anchor IDs (`#drop`, `#story`, `#past`, `#notify`) on every page — nav links, CTA buttons, and v3/v4 interactions depend on them. Section *order* is variation-specific (see "Variations" above) but the IDs must exist.

## Testing guidance
- No automated tests. Verification is **manual in-browser**.
- Inline per-variation JS is fine when it serves the variation's structural metaphor (parallax, tab switching, pager, countdown). Extract to `scripts/common.js` only if truly shared.
- Don't add tests, linters, or CI without owner approval — it contradicts the zero-dependency stance.

## UI/UX rules
- **Variations are structurally distinct** — see "Variations" section. The old "shared section order" rule no longer applies.
- **Brand voice**: slow, considered, patience-forward. "Patience is the practice." 忍耐 is a recurring motif — keep it where it lives.
- **Palette per variation**: defined in each `v*.css` `:root`. Don't color-mix across variations.
- **Responsive**: every page must work at ≥ 360px wide. Nav collapses (hides `<ul>`) on small screens — that's intentional, don't add a hamburger without asking.
- **Accessibility floor**: every `<img>` has `alt`; decorative art uses `aria-hidden="true"`; form fields have labels via `.sr-only` where needed. Don't regress this.
- **No loading/empty/error states** beyond the email form's `.form-msg` — the site has no async data.

## API / data rules
- N/A — no API, no database, no auth.
- The only network call is the Formspree form POST. It must fail gracefully: if `action` still contains `YOUR_FORMSPREE_ENDPOINT`, `common.js` must keep intercepting and showing the local success message.

## Security / privacy constraints
- **No secrets, API keys, or tokens in the repo.** The Formspree endpoint, when added, is a public form URL — acceptable to commit.
- **No analytics / tracking / cookies** installed. If adding any, ask first — this brand reads as privacy-respecting by default.
- No PII logged (no logging anywhere).

## Git / deployment rules
- Repo is `pavc1996/latterdays-site` (public). Default branch: `main`.
- **GitHub Pages** serves the site from `main` at `/`. Any push to `main` redeploys — no PR/staging workflow yet.
- Because pushes go live immediately, **verify locally via `python3 -m http.server` before pushing to `main`**.
- **Do not delete or rename** the original `IMG_*.jpg` files or `LOWER D.O.S.PNG` — those are the source-of-truth uploads. Work from the copies under `assets/drops/`.
- **Do not touch other variations** when asked to change one (e.g., "make V2 greener" → edit `styles/v2.css` and `v2-painted.html` only).
- **Do not regenerate assets** (re-compress, re-crop) without asking.
- Ask before destructive actions: removing a variation, consolidating CSS files, restructuring `assets/`, force-pushing to `main`, switching visibility.

## Review checklist (self-check before finishing)
- [ ] All 5 variation pages + chooser load at `http://localhost:8000/` with no console errors and no 404s.
- [ ] Anchor links (`#drop`, `#story`, `#past`, `#notify`) behave correctly on every variation (v3: activates the right tab; v4: jumps to the right page).
- [ ] Email form intercepts and shows the local success message when endpoint is unset.
- [ ] Mobile (≤ 400px) and desktop both render without overflow.
- [ ] IG link in footer points to `https://instagram.com/latterdayss` and opens in new tab.
- [ ] No new dependencies, build tools, frameworks, or unnecessary comments added.
- [ ] Brand voice / patience theme intact in any new copy.
- [ ] If pushing: the same pages also load at https://pavc1996.github.io/latterdays-site/ after Pages rebuilds (~30–60s).

## Known pitfalls
- **Scoped-CSS leakage**: writing a bare selector like `.gallery { … }` in `v2.css` will affect every variation. Always prefix with `body.v2 .gallery { … }`.
- **Asset paths from CSS**: `url('../assets/...')` is relative to the stylesheet location; paths in HTML (`src="assets/..."`) are relative to the HTML file. Don't confuse them.
- **Font loading**: `base.css` pulls 7 Google font families. If you add weights/families, re-check the `@import` line — a malformed URL silently falls back.
- **Reveal animations**: elements with `.reveal` start at opacity 0. If `common.js` doesn't load (e.g., broken path), the whole page looks blank. Keep `scripts/common.js` linked at the bottom of every `v*.html`.
- **Marquee on V5**: `common.js` doubles `.marquee-track` HTML to create the seamless loop. If you restructure it, the animation breaks.
- **V2 parallax**: the inline script targets `.sky`, `.pond`, `.mist`. Renaming any of those without updating the script kills the effect silently.
- **V3 tabs**: `hidden` attribute controls panel visibility; don't swap to `display:none` in CSS — the JS toggles `hidden`.
- **V4 pager**: `.page` width is `100vw`; the scroll-snap container `.zine` needs `overflow-x: auto` and full viewport height minus the masthead. Don't add vertical padding to `.zine` itself.
- **V5 countdown**: hardcoded to `2026-09-21T12:00:00Z`. Update when the real drop date is set.
- **GitHub Pages cache**: asset updates sometimes take a minute; hard-refresh (Cmd+Shift+R) if stale.
- **TODO**: Formspree endpoint not yet provisioned — still a placeholder.
- **TODO**: Custom domain not configured.
- **TODO**: Final copy / tagline is currently placeholder the owner may rewrite; treat all prose as editable draft.
