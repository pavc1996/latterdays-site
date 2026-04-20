# CLAUDE.md — Latterdays Site

## Project overview
- Marketing / lookbook site for **Latterdays**, a streetwear brand (IG: `@latterdayss`).
- Currently a **design review build**: `index.html` is a chooser; `v1`–`v5` are five competing one-page designs the owner picks between.
- Primary user: the brand owner (non-technical). Secondary: visitors landing via IG.
- Business goal: collect emails for the upcoming **Days of Sabr** drop and showcase the **Days of Arc** (F/W 2024) and **Days of Bloom** archives.

## Tech stack
- **Plain HTML + CSS + vanilla JS.** No build step, no framework, no package manager, no `node_modules`.
- Google Fonts loaded via `@import` in `styles/base.css` (Archivo Black, Anton, Cormorant Garamond, Playfair Display, Inter, JetBrains Mono, Noto Serif JP).
- Email capture uses **Formspree** (or equivalent). Endpoint placeholder: `YOUR_FORMSPREE_ENDPOINT` in every `v*.html` form `action`. Until replaced, `scripts/common.js` intercepts the submit and shows a success message locally.
- No env/config files. No secrets in repo.

## Repo structure
```
/
├── index.html              # Chooser — 5 preview cards
├── v1-editorial.html       # Editorial minimal (black/white)
├── v2-painted.html         # Painted immersive (Sabr-art forward)
├── v3-ivy.html             # Ivy collegiate (varsity + crests)
├── v4-zine.html            # Zine / lookbook (magazine grid)
├── v5-brutalist.html       # Brutalist street (marquee, oversized type)
├── styles/
│   ├── base.css            # Reset, font imports, shared .reveal + .form-msg
│   ├── chooser.css         # index.html only
│   └── v1.css … v5.css     # Scoped per variation via body.v1 … body.v5
├── scripts/
│   └── common.js           # .reveal IntersectionObserver, form fallback, marquee doubling
├── assets/
│   ├── logo.jpg            # Wordmark (from IMG_9577.jpg)
│   └── drops/              # All drop imagery, web-friendly names
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

## Coding rules
- **Styles are scoped by body class** (`body.v1 { … }`). Never write unscoped selectors in `v*.css` — they will leak across variations via `base.css`. Shared utilities go in `base.css` only.
- **File size**: each `v*.html` is ~150 lines, each `v*.css` is ~300 lines. If a variation grows past that, it's probably doing too much — simplify before splitting.
- **No frameworks, no npm packages, no bundlers.** Keep the zero-dependency stance.
- **CSS variables per variation**: every `v*.css` defines its palette under `:root` as `--v{N}-*`. Reuse those instead of hard-coding hex values mid-file.
- **No comments** unless explaining a non-obvious *why*. Well-named classes and selectors are the documentation.
- **No inline `<style>` or inline `style=` blocks** except the small swatch previews in `index.html` (intentional).
- **Prefer editing the existing variation file** over forking a new one. New variation files require owner approval.
- **Semantic HTML**: every page has `<nav>`, `<header>`, `<section id="...">`, `<footer>`. Preserve the anchor IDs (`#drop`, `#story`, `#past`, `#notify`) — nav links and `href="#notify"` CTAs depend on them.

## Testing guidance
- No automated tests. Verification is **manual in-browser**.
- If you add JS logic beyond what's in `common.js`, first ask whether it belongs as a build-free snippet or if a proper setup is justified.
- Don't add tests, linters, or CI without owner approval — it contradicts the zero-dependency stance.

## UI/UX rules
- **Shared section order across all 5 variations**: nav → hero → philosophy (`#story`) → current drop (`#drop`, Days of Sabr) → past drops (`#past`, Arc then Bloom) → signup (`#notify`) → footer. Do not reorder.
- **Brand voice**: slow, considered, patience-forward. "Patience is the practice." 忍耐 is a recurring motif — keep it where it lives.
- **Palette per variation**: defined in each `v*.css` `:root`. Don't color-mix across variations.
- **Responsive**: every page must work at ≥ 360px wide. Nav collapses (hides `<ul>`) on small screens — that's intentional, don't add a hamburger without asking.
- **Accessibility floor**: every `<img>` has `alt`; decorative art uses `aria-hidden="true"`; form fields have labels via `placeholder` + `.sr-only` where needed. Don't regress this.
- **No loading/empty/error states** beyond the email form's `.form-msg` — the site has no async data.

## API / data rules
- N/A — no API, no database, no auth.
- The only network call is the Formspree form POST. It must fail gracefully: if `action` still contains `YOUR_FORMSPREE_ENDPOINT`, `common.js` must keep intercepting and showing the local success message.

## Security / privacy constraints
- **No secrets, API keys, or tokens in the repo.** The Formspree endpoint, when added, is a public form URL — acceptable to commit.
- **No analytics / tracking / cookies** installed. If adding any, ask first — this brand reads as privacy-respecting by default.
- No PII logged (no logging anywhere).

## Git / workflow rules
- This repo is **not a git repo** as of writing. If you initialize one, confirm with the owner first.
- **Do not delete or rename** the original `IMG_*.jpg` files or `LOWER D.O.S.PNG` — those are the source-of-truth uploads. Work from the copies under `assets/drops/`.
- **Do not touch other variations** when asked to change one (e.g., "make V2 greener" → edit `styles/v2.css` and `v2-painted.html` only).
- **Do not regenerate assets** (re-compress, re-crop) without asking.
- Ask before destructive actions: removing a variation, consolidating CSS files, restructuring `assets/`.

## Review checklist (self-check before finishing)
- [ ] All 5 variation pages + chooser still load at `http://localhost:8000/` with no console errors and no 404s.
- [ ] Anchor links (`#drop`, `#story`, `#past`, `#notify`) still scroll to valid targets on every page.
- [ ] Email form intercepts and shows the local success message when endpoint is unset.
- [ ] Mobile (≤ 400px) and desktop both render without overflow.
- [ ] IG link in footer points to `https://instagram.com/latterdayss` and opens in new tab.
- [ ] No new dependencies, build tools, frameworks, or comments added without reason.
- [ ] Brand voice / patience theme intact in any new copy.

## Known pitfalls
- **Scoped-CSS leakage**: writing a bare selector like `.gallery { … }` in `v2.css` will affect every variation. Always prefix with `.v2 .gallery { … }`.
- **Asset paths from CSS**: `@url('../assets/...')` is relative to the stylesheet location; paths in HTML (`src="assets/..."`) are relative to the HTML file. Don't confuse them.
- **Font loading**: `base.css` pulls 7 Google font families. If you add weights/families, re-check the `@import` line — a malformed URL silently falls back.
- **Reveal animations**: elements with `.reveal` start at opacity 0. If `common.js` doesn't load (e.g., broken path), the whole page looks blank. Keep `scripts/common.js` linked at the bottom of every `v*.html`.
- **Marquee on V5**: `common.js` doubles `.marquee-track` HTML to create the seamless loop. If you restructure it, the animation breaks.
- **TODO**: No deployment target picked yet (Netlify / Vercel / GitHub Pages all viable). No custom domain configured.
- **TODO**: Formspree endpoint not yet provisioned — still a placeholder.
- **TODO**: Final copy / tagline is currently placeholder the owner may rewrite; treat all prose as editable draft.
