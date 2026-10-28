# Portfolio design: Floating sidebar minimal

Absorbed from the user-supplied floating-sidebar-portfolio design skill. Use this as Kip's default for new portfolio websites and substantial portfolio redesigns. Preserve explicit briefs and existing brand conventions. This reference supplies visual direction and complete UI kit source code within Kip; it does not change orchestration, stack, or publishing authorization.

## Overview

A complete, working UI kit for a one-person portfolio: a floating grainy sidebar on the left, one 640px column of content on the right, and almost no color. Everything below is production code from a live site with the owner's content removed. Build it by copying the files at the bottom of this skill **verbatim**, then replacing the sample content in `lib/data.ts` with the user's own.

**The look lives in the details:** exact grays, layered inset shadows, 1px hairlines, zero-padded counts, one italic serif word. Rewriting the CSS "in the same spirit" loses it. Copy, don't paraphrase.

## Non-negotiable design rules

Keep these when adding anything new:

1. **Monochrome.** Only the gray tokens in `globals.css`. The one color is green (`--green`, `--green-ink`), used only to mean "available/open/success": the status dot, the "Open" nav pill, the "Email copied" state. No accent colors, no colored gradients, no colored buttons.
2. **Every color is a token that holds both themes** via `light-dark(light, dark)`. Never write a bare hex in a component. A new color goes into `:root` as `light-dark(...)`.
3. **Two fonts.** Figtree for everything. Newsreader italic 400 (`.serif`) for exactly one emphasized word or phrase in the home headline, nowhere else.
4. **Three weights:** 400 for body text, 500 for titles and UI, 600 for the name, post titles and small pills. Large text gets negative letter-spacing (-0.01em to -0.03em).
5. **One column, max 640px**, centered in the space right of the sidebar. Sections stack with an 88px gap (56px on phones). No multi-column page layouts beyond the small 2 or 3-column grids already defined (metrics, cards, stack, gear).
6. **Sections = small muted label over hairline rows.** A section is a `.label` heading (14px, muted) above items separated by 1px `--line` top borders. Prefer rows over cards. Cards exist only on Services.
7. **Shape language:** pills (999px) for buttons, chips and CTAs; 14px radius for cards, images and tiles; 12px for nav links; 10px for icon buttons; 26px/21px for the sidebar shell/panel.
8. **Shadows are layered and soft** (inset 1px ring + inset top highlight + small drop + large faint drop) and only on raised surfaces: sidebar, sidebar CTA, active nav link, toast, photo cards. Everything else is flat with hairlines.
9. **Counts are zero-padded** (`07`, `12`) with `font-variant-numeric: tabular-nums`.
10. **Motion is small and quick:** 140ms ease for hovers, 1px press-down on buttons. Every decorative animation (burst, poke floats, pixel name, photo stack, toast) is disabled under `prefers-reduced-motion`.
11. **Icons** are 16px stroke icons, 1.5 stroke width, round caps and joins, `currentColor`, colored `--faint` in nav (ink when active).

## Design tokens (all in `app/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | #fcfcfb | #0f0f11 | page |
| `--surface` | #fff | #19191c | sidebar panel, cards, buttons |
| `--ink` | #111113 | #ececee | titles, primary text, dark chips/buttons |
| `--ink-2` | #3a3a3f | #c6c6cb | nav text, light chips |
| `--ink-body` | #4a4a4f | #adadb3 | paragraphs (`.lead`, `.bullets`) |
| `--muted` | #6e6e73 | #8b8b91 | labels, subtitles |
| `--faint` / `--subtle` | #8a8a8f / #9a9a9e | #737379 / #66666c | icons, meta, counts |
| `--line` / `--line-strong` | #ebebea / #dcdcda | #232327 / #34343a | hairlines / outlines |
| `--tile` / `--hover` | #ededec / #f5f5f3 | #1c1c20 / #212125 | image placeholders / row hover |
| `--green` / `--green-ink` | #2f9e5b / #1e6b3a | #2f9e5b / #5fd08a | availability only |

Type scale: page title 34/500 (28 on phones), identity name 18/600, lead 17/1.65, row title 16/500, nav and body 15/500, label and row subtitle 14, counts and tags 13, meta 12 (monospace for blog dates).

Texture: `--grain` (5% fractal noise SVG) layered over the sidebar, `--grain-soft` (3%) over the page. Cursor: a custom white arrow with an ink outline, set on `html`.

## Component catalog

| Piece | Where | What it is |
|---|---|---|
| Floating sidebar | `components/sidebar.tsx` | Grain shell (26px) holding a white panel (21px): pixel name, Contact CTA (copies email, green dot), 3 nav groups with zero-padded counts and an "Open" pill, Poke counter, footer with location, timezone, theme toggle and icon buttons |
| Phone drawer | same | ≤900px: sidebar slides in from the left over a scrim. A top bar with a menu button, name and "Available" status shows **on the home page only**; subpages hide the sidebar and rely on back links |
| Page shell | `components/page.tsx` | `Page` (640px column + footer), `PageHeader` (back link, title, lead) |
| Pixel name | `components/pixel-name.tsx` | The owner's name resolves out of dithered pixel blocks (8→1px) once on load, drawn on a canvas over the real text |
| Click burst | `components/click-burst.tsx` | Five short ink lines pop out from every mouse click |
| Poke | `components/poke.tsx` + `app/api/poke/route.ts` | Optional. Visitors poke; a monthly counter in Upstash Redis; floating "+1"/emoji/avatar on each click; batched writes |
| Copy email | `components/copy-email.tsx` | Link that copies the address and shows a pill toast |
| Project list | `components/project-list.tsx` | Rows with 72×48 thumb, title, subtitle, tag. Shows 2 rows, fades the 3rd, "+ N more" pill button |
| Contributions | `components/contributions.tsx` | GitHub graph in grays (no green), server-fetched, revalidated every 12h |
| Carousel | `components/carousel.tsx` | Native scroll-snap image track with "1 / 4" count and arrow buttons |
| Photo stack | `components/photo-stack.tsx` | Fanned, auto-advancing stack of photos on the About page, click to shuffle, pill dots |
| Gear art | `dither.py` | Product photos turned into 4-gray Bayer-dithered pixel art, inverted automatically in dark mode |

Class vocabulary for new pages: `.stack-v` + `.gap-4/8/16/24/40/56`, `.label`, `.page-title`, `.lead`, `.section-head` + `.count`, `.row` / `.row-body` / `.row-title` / `.row-sub` / `.row-tag`, `.kv` (label/value row), `.card-grid` + `.card`, `.chip-dark` / `.chip-light`, `.btn-dark` / `.btn-light`, `.more-btn`, `.bullets`, `.placeholder` (dashed empty state), `.soon` (outline pill, optional `.tip` tooltip), `.underline` (inline link).

## Build steps

1. **Scaffold** a Next.js App Router project with TypeScript, **no Tailwind**, no `src/` dir, import alias `@/*` → `./*`. Delete the scaffold's `app/page.module.css`, `app/favicon.ico` and sample files in `public/`.
2. **Install** `lenis` (smooth scroll). Only if keeping Poke: `@upstash/redis`, plus `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` env vars from an Upstash Redis database.
3. **Create every file under "Source files" exactly as written**, replacing the scaffold's `app/globals.css` and `app/layout.tsx`.
4. **Replace the sample content** in `lib/data.ts` with the user's: name, role, location, timezone, email, GitHub username, headline (short `emphasis`), intro, niche, 3 metrics, about paragraphs, work history, stack, links, projects, posts, services, gear. Then the placeholder copy in `app/services/page.tsx`, `app/blog/page.tsx` and `app/resources/page.tsx`. Ask the user for anything you don't know; never invent credentials, clients or metrics.
5. **Assets in `public/`:** `avatar.jpg` (required: square, shown at 64px round; without it the circle shows broken alt text), `about/1.jpg`… (4:5 portrait), project screenshots (16:9, first one is the list thumbnail), `channels/*.jpg` (square), and gear art made with `python3 dither.py photo.png public/gear/name.png`. Change `app/icon.svg` to the user's first initial (one letter) on the same 16×16 pixel grid.
6. **No Poke?** Delete `components/poke.tsx`, `app/api/poke/route.ts`, the `Poke` import and `<Poke />` line in `sidebar.tsx`, and `TZ_OFFSET_HOURS` in `lib/data.ts`. The CSS can stay.
7. **Verify** (below) before calling it done.

**Next.js version:** the source targets Next.js 15/16, where route `params` is a Promise (`const { slug } = await params`). On Next.js 14, use `params.slug` directly.

**Other frameworks:** `globals.css` is plain CSS and works anywhere. Port each component 1:1 keeping the same class names and DOM structure; load Figtree (400/500/600) and Newsreader italic 400 from Google Fonts and set `--font-sans` / `--font-serif` on `:root`. Replace `ReactLenis` with `new Lenis({ autoRaf: true })`.

## Adding to the site

- **New page:** `<Page>` → `<PageHeader back={{ href: "/", label: "Home" }} title=… intro=… />` → sections of `.stack-v.gap-16` with an `h2.label` and rows. Add a nav item in `GROUPS` in `sidebar.tsx` with an icon in `NavIcons` (16px viewBox, stroke paths).
- **New list:** `.row` elements inside a `.stack-v`. Links get `a.row`; hover underlines the title.
- **New color or shadow:** add a token with `light-dark()`; check both themes.
- **New mobile rule:** inside the single `@media (max-width: 900px)` block at the end of `globals.css`.

## Common mistakes

| Mistake | Fix |
|---|---|
| Converting `globals.css` to Tailwind or CSS modules | Keep the single plain CSS file. Conversions drop `light-dark()`, `:has()`, the masks and the grain layers. |
| Hex colors or `#000`/`#fff` in components | Use tokens. Hardcoded colors break dark mode. |
| Adding a brand/accent color, colored buttons or icons | The palette is gray plus availability green. Emphasis comes from weight, size and the serif word. |
| Serif on more than the headline's emphasis | One use only. |
| Card grids for projects or links | Use hairline rows. |
| Theme flash on load | `ThemeScript` must render inside `<head>` in `layout.tsx`, and `<html>` needs `suppressHydrationWarning`. |
| Blurry gear art | Keep `image-rendering: pixelated` and plain `<img>` (not an optimizing image component that resamples). |
| Mobile top bar on every page | It is home-only by design. Subpages hide the sidebar on phones and use the back link. |
| Pixel name drawing blank | It waits for `document.fonts.ready`; the name element must be visible text with a real font loaded. |
| Inventing content | Every string in `lib/data.ts` is sample text. Replace it with the user's or leave a clear placeholder. |

## Verify

- `npm run build` passes.
- Desktop (≥1200px) and phone (390px) widths, in light and dark (toggle in the sidebar footer, and OS setting with no saved choice). Reload in dark mode: no light flash.
- Home: name pixel-resolves once, headline has one italic serif word, projects show 2 rows + faded 3rd + "+ N more", GitHub graph renders.
- Contact CTA copies the email and turns green with "Email copied". Clicks show the burst. Poke increments (if kept).
- With OS "reduce motion" on: no burst, no pixel animation, no photo-stack auto-advance.

## Source files

Create each file at the path in its heading. Paths are relative to the project root.

### `app/globals.css`

```css
/* Every colour holds its light and dark value. The OS setting picks one unless data-theme
   (set by the sidebar toggle, restored by the script in app/layout.tsx) forces it. */
:root {
  color-scheme: light dark;
  --bg: light-dark(#fcfcfb, #0f0f11);
  --sidebar: #f8f8f7;
  --ink: light-dark(#111113, #ececee);
  --ink-2: light-dark(#3a3a3f, #c6c6cb);
  --ink-body: light-dark(#4a4a4f, #adadb3);
  --muted: light-dark(#6e6e73, #8b8b91);
  --faint: light-dark(#8a8a8f, #737379);
  --subtle: light-dark(#9a9a9e, #66666c);
  --line: light-dark(#ebebea, #232327);
  --line-strong: light-dark(#dcdcda, #34343a);
  --tile: light-dark(#ededec, #1c1c20);
  --surface: light-dark(#fff, #19191c);
  --hover: light-dark(#f5f5f3, #212125);
  --highlight: light-dark(#fff, rgba(255, 255, 255, 0.04));
  --green: #2f9e5b;
  --green-ink: light-dark(#1e6b3a, #5fd08a);
  --radius: 10px;
  --sidebar-w: 264px;
  --col: 640px;
  /* Film grain tile, layered over the sidebar background. Grey noise, so it reads in both themes. */
  --grain: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='3 0 0 0 -1 3 0 0 0 -1 3 0 0 0 -1 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.05'/></svg>");
  /* Lighter grain for the page, so the sidebar's stronger grain sets it apart. */
  --grain-soft: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='3 0 0 0 -1 3 0 0 0 -1 3 0 0 0 -1 0 0 0 0 1'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.03'/></svg>");
}
:root[data-theme="light"] { color-scheme: light; }
:root[data-theme="dark"] { color-scheme: dark; }

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
html { cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path d='M3 3v17l5.2-4.6h7.2z' fill='white' stroke='%23111113' stroke-width='1.5' stroke-linejoin='round'/></svg>") 3 3, auto; }
body {
  background: var(--grain-soft), var(--bg);
  color: var(--ink);
  font-family: var(--font-sans), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
h1, h2, h3, p { margin: 0; }
button { font: inherit; }
:focus-visible { outline: 2px solid var(--ink); outline-offset: 2px; border-radius: 6px; }

.serif { font-family: var(--font-serif), Georgia, serif; font-style: italic; font-weight: 400; }

/* ---------- shell ---------- */
.shell { display: flex; min-height: 100vh; }

.sidebar {
  position: sticky; top: 12px; height: calc(100vh - 24px);
  width: 260px; flex-shrink: 0; margin: 12px 0 12px 12px;
  background: var(--grain), linear-gradient(light-dark(#f3f3f1, #151518), light-dark(#ecece9, #111114)); border: 1px solid light-dark(#e2e2de, #232327); border-radius: 26px; padding: 5px;
  box-shadow: inset 0 1px 0 var(--highlight), 0 1px 2px rgba(17, 17, 19, 0.05), 0 18px 40px rgba(17, 17, 19, 0.09);
}
.sidebar-panel {
  height: 100%; background: var(--grain), var(--surface); border-radius: 21px; padding: 14px 12px 0;
  box-shadow: 0 0 0 1px light-dark(#e6e6e2, #28282d), 0 1px 3px rgba(17, 17, 19, 0.06);
  display: flex; flex-direction: column; gap: 18px; overflow: hidden;
}
.sidebar-name { font-size: 18px; font-weight: 600; letter-spacing: -0.02em; }
.sidebar-top { display: flex; align-items: center; justify-content: space-between; padding: 2px 4px 0 10px; }
.sidebar-close, .mobile-bar, .scrim { display: none; }
.icon-btn { width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center; border: 0; border-radius: 10px; background: transparent; color: var(--ink); cursor: pointer; }
.icon-btn:hover { background: light-dark(#efefed, #232327); }
.sidebar-cta {
  display: flex; align-items: center; gap: 10px; height: 46px; padding: 0 8px 0 16px; border-radius: 999px;
  background: linear-gradient(light-dark(#fff, #202024), light-dark(#f4f4f2, #1b1b1e)); font-size: 15px; font-weight: 500; color: var(--ink);
  box-shadow: inset 0 0 0 1px light-dark(#e2e2de, #2c2c31), inset 0 1px 0 var(--highlight), 0 1px 2px rgba(17, 17, 19, 0.06), 0 4px 10px rgba(17, 17, 19, 0.04);
  transition: box-shadow 140ms ease, transform 140ms ease;
}
.sidebar-cta:hover { box-shadow: inset 0 0 0 1px light-dark(#d8d8d4, #3a3a40), inset 0 1px 0 var(--highlight), 0 2px 4px rgba(17, 17, 19, 0.08), 0 8px 16px rgba(17, 17, 19, 0.06); }
.sidebar-cta:active { transform: translateY(1px); }
.sidebar-cta { width: 100%; border: 0; cursor: pointer; font-family: inherit; text-align: left; padding: 0 18px 0 16px; }
.sidebar-cta-label { flex: 1; }
.sidebar-cta.is-copied { color: var(--green-ink); }
.sidebar-cta-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 0 3px light-dark(#e3f3e8, rgba(47, 158, 91, 0.22)); flex-shrink: 0; }
.nav { display: flex; flex-direction: column; gap: 18px; }
.nav-group { display: flex; flex-direction: column; gap: 2px; }
.nav-label { padding: 0 12px 6px; font-size: 12px; font-weight: 500; color: var(--subtle); letter-spacing: 0.01em; }
.nav-link {
  display: flex; align-items: center; gap: 12px; height: 40px; padding: 0 12px;
  border-radius: 12px; font-size: 15px; font-weight: 500; color: var(--ink-2);
  transition: background 140ms ease, box-shadow 140ms ease;
}
.nav-link svg { color: var(--faint); flex-shrink: 0; }
.nav-link:hover { background: var(--hover); }
.nav-link[aria-current="page"] {
  color: var(--ink); background: linear-gradient(light-dark(#f7f7f5, #242428), light-dark(#efefec, #1f1f23));
  box-shadow: inset 0 0 0 1px light-dark(#e4e4e0, #303035), inset 0 1px 0 var(--highlight), 0 1px 2px rgba(17, 17, 19, 0.06);
}
.nav-link[aria-current="page"] svg { color: var(--ink); }
.nav-count { margin-left: auto; font-size: 12px; font-weight: 500; color: light-dark(#a3a3a6, #616167); font-variant-numeric: tabular-nums; }
.nav-pill { margin-left: auto; display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; padding: 3px 8px 3px 7px; border-radius: 999px; background: light-dark(#e6f4ea, rgba(47, 158, 91, 0.14)); color: var(--green-ink); box-shadow: inset 0 0 0 1px light-dark(#cfe9d7, rgba(47, 158, 91, 0.3)); }
.nav-pill .dot { width: 5px; height: 5px; }
.sidebar-foot { margin: auto -12px 0; padding: 14px 16px 14px 22px; border-top: 1px solid light-dark(#ededeb, #232327); display: flex; align-items: center; gap: 10px; }
.sidebar-foot-text { flex: 1; display: flex; flex-direction: column; gap: 1px; font-size: 12px; color: var(--subtle); }
.sidebar-foot-place { font-size: 13px; font-weight: 500; color: var(--ink-2); }
.foot-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 0; border-radius: 10px; background: none; color: var(--muted); box-shadow: inset 0 0 0 1px light-dark(#e6e6e2, #2a2a2f); cursor: pointer; transition: background 140ms ease; }
.foot-btn:hover { background: var(--hover); color: var(--ink); }
.poke { margin-top: auto; padding: 0 4px 0 10px; display: flex; align-items: center; gap: 10px; }
.poke + .sidebar-foot { margin-top: 0; }
.poke .sidebar-foot-place { font-variant-numeric: tabular-nums; }
.poke-btn { width: auto; height: 34px; padding: 0 14px 0 12px; gap: 6px; font-size: 14px; }
.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); display: inline-block; }
.status { display: flex; align-items: center; gap: 8px; }

.main { flex: 1; min-width: 0; display: flex; justify-content: center; padding: 104px 24px 96px; }
.column { width: 100%; max-width: var(--col); display: flex; flex-direction: column; gap: 88px; }

/* ---------- typography ---------- */
.label { font-size: 14px; font-weight: 500; color: var(--muted); }
.page-title { font-size: 34px; font-weight: 500; line-height: 1.25; letter-spacing: -0.02em; }
.lead { font-size: 17px; line-height: 1.65; color: var(--ink-body); }
.underline { border-bottom: 1px solid light-dark(#c9c9c7, #4a4a50); }
.underline:hover { border-color: var(--ink); }
.back { font-size: 14px; color: var(--muted); display: inline-flex; gap: 6px; align-items: center; }
.back:hover { color: var(--ink); }

.stack-v { display: flex; flex-direction: column; }
.gap-4 { gap: 4px; } .gap-8 { gap: 8px; } .gap-16 { gap: 16px; } .gap-24 { gap: 24px; } .gap-40 { gap: 40px; } .gap-56 { gap: 56px; }

/* ---------- hero ---------- */
.identity { display: flex; align-items: center; gap: 16px; }
.avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; background: light-dark(#e4e4e2, #222226); flex-shrink: 0; }
.identity-name { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
/* Name resolving out of pixelation (components/pixel-name.tsx): the text stays in place, a canvas draws over it. */
.pixel-name { position: relative; }
.pixel-name.is-pixel { color: transparent; }
.pixel-name canvas { position: absolute; left: 0; top: 0; image-rendering: pixelated; pointer-events: none; }
:root[data-theme="dark"] .pixel-name canvas { filter: invert(1); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .pixel-name canvas { filter: invert(1); } }
.identity-role { font-size: 15px; color: var(--muted); }

.niche {
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  padding: 16px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
}
.chip { display: inline-flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border-radius: 999px; font-size: 14px; font-weight: 500; }
.chip-dark { background: var(--ink); color: var(--bg); }
.chip-dark .dot { background: light-dark(#5fd08a, var(--green)); width: 6px; height: 6px; }
.chip-light { border: 1px solid var(--line-strong); color: var(--ink-2); }

.metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.metric-value { font-size: 30px; font-weight: 500; letter-spacing: -0.03em; }
.metric-label { font-size: 14px; color: var(--muted); }

/* ---------- lists ---------- */
.section-head { display: flex; justify-content: space-between; align-items: baseline; }
.count { font-size: 13px; color: var(--subtle); }

.row {
  display: flex; align-items: center; gap: 20px; padding: 18px 0; border-top: 1px solid var(--line);
}
a.row:hover .row-title { text-decoration: underline; text-underline-offset: 3px; }
.thumb { width: 72px; height: 48px; flex-shrink: 0; border-radius: 8px; object-fit: cover; object-position: top left; background: var(--tile); border: 1px solid var(--line); }
.row-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.row-title { font-size: 16px; font-weight: 500; }
.row-sub { font-size: 14px; color: var(--muted); }
.row-tag { font-size: 13px; color: var(--subtle); white-space: nowrap; }
.row-faded { opacity: 0.35; -webkit-mask-image: linear-gradient(to bottom, #000 10%, transparent 95%); mask-image: linear-gradient(to bottom, #000 10%, transparent 95%); pointer-events: none; }

.more-btn {
  align-self: center; margin-top: -8px; height: 40px; padding: 0 20px; border-radius: 999px;
  border: 1px solid var(--line-strong); background: var(--surface); font-size: 14px; font-weight: 500; color: var(--ink); cursor: pointer;
  transition: background 140ms ease;
}
.more-btn:hover { background: light-dark(#f3f3f2, #212125); }

.kv { display: grid; grid-template-columns: 160px minmax(0, 1fr); gap: 20px; padding: 14px 0; border-top: 1px solid var(--line); font-size: 15px; }
.kv > :first-child { color: var(--muted); }

/* 5 rows of 53px (14 + 24 + 14 padding/line + 1 border), the rest scroll */
.stack-list { max-height: calc(5 * 53px); overflow-y: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--line-strong) transparent; }
/* more than 5 items: fade the 5th row to hint that the list scrolls (right strip unmasked so the scrollbar stays solid) */
.stack-list:has(.row:nth-child(6)) {
  mask: linear-gradient(to bottom, #000 calc(100% - 72px), transparent calc(100% - 6px)), linear-gradient(#000 0 0) right / 12px 100% no-repeat;
}
.stack-list .row { padding: 14px 0; line-height: 24px; }
.stack-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 32px; row-gap: 40px; align-items: start; }

/* ---------- contributions ---------- */
.graph { display: flex; gap: 3px; padding-top: 16px; border-top: 1px solid var(--line); overflow-x: auto; }
.graph-week { display: flex; flex-direction: column; gap: 3px; }
.graph-day { width: 9px; height: 9px; border-radius: 2px; background: light-dark(#efefee, #1c1c20); }
.l1 { background: light-dark(#d4d4d2, #34343a); } .l2 { background: light-dark(#a3a3a0, #62626a); } .l3 { background: light-dark(#5e5e5b, #a3a3a9); } .l4 { background: var(--ink); }

/* ---------- project detail ---------- */
.gallery { display: flex; flex-direction: column; gap: 12px; }
.shot { width: 100%; border-radius: 14px; border: 1px solid var(--line); background: var(--tile); }
div.shot { aspect-ratio: 16 / 9; }
.carousel { display: flex; align-items: flex-start; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
.carousel > .shot { flex: 0 0 100%; min-width: 0; scroll-snap-align: start; }
.carousel-nav { display: flex; align-items: center; gap: 8px; }
.carousel-nav .count { margin-right: auto; font-variant-numeric: tabular-nums; }
.carousel-nav .foot-btn:disabled { opacity: 0.4; background: none; color: var(--muted); }
.shot-note { font-size: 13px; color: var(--faint); }
.post-row { align-items: flex-start; padding: 24px 0; }
.post-row .thumb { width: 136px; height: 92px; border-radius: 12px; object-position: center; }
.post-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.post-meta { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--faint); }
.post-title { font-size: 18px; font-weight: 600; line-height: 1.35; letter-spacing: -0.01em; }
.post-sub { font-size: 14px; line-height: 1.6; color: var(--muted); }
a.post-row:hover .post-title { text-decoration: underline; text-underline-offset: 3px; }
.bullets { margin: 0; padding-left: 18px; display: flex; flex-direction: column; gap: 10px; font-size: 15px; line-height: 1.6; color: var(--ink-body); }
.client { display: flex; align-items: center; gap: 12px; padding: 14px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.soon { position: relative; margin-left: 8px; display: inline-flex; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px; color: var(--ink-2); box-shadow: inset 0 0 0 1px var(--line-strong); }
.soon[tabindex] { cursor: help; }
.soon .tip { position: absolute; left: 0; top: calc(100% + 8px); z-index: 10; width: 240px; padding: 8px 10px; border-radius: var(--radius); background: var(--ink); color: var(--bg); font-size: 12px; font-weight: 400; line-height: 1.5; opacity: 0; pointer-events: none; transition: opacity 140ms ease; }
.soon:hover .tip, .soon:focus .tip { opacity: 1; }
.client img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; }
.placeholder { padding: 40px 24px; border: 1px dashed var(--line-strong); border-radius: 14px; text-align: center; font-size: 14px; color: var(--muted); }

.card-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.card { padding: 20px; border: 1px solid var(--line); border-radius: 14px; background: var(--surface); display: flex; flex-direction: column; gap: 8px; }
.card-title { font-size: 16px; font-weight: 500; }
.card-body { font-size: 14px; line-height: 1.55; color: var(--muted); }

.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 44px; padding: 0 20px; border-radius: 999px; font-size: 14px; font-weight: 500; }
.btn-dark { background: var(--ink); color: var(--bg); }
.btn-dark:hover { background: light-dark(#2a2a2e, #d2d2d6); }
.btn-light { border: 1px solid var(--line-strong); }
.btn-light:hover { background: light-dark(#f3f3f2, #212125); }

.footer { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; padding-top: 24px; border-top: 1px solid var(--line); font-size: 14px; color: var(--muted); }
.footer nav { display: flex; gap: 24px; flex-wrap: wrap; }
.footer a:hover { color: var(--ink); }

/* ---------- click burst ---------- */
.click-burst { position: fixed; z-index: 100; pointer-events: none; }
.click-burst span {
  position: absolute; left: -1px; top: 0; width: 2px; height: 7px; border-radius: 1px; background: var(--ink);
  transform-origin: 50% 0; animation: click-burst 420ms cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
}
@keyframes click-burst {
  from { transform: rotate(var(--a)) translateY(4px) scaleY(1); opacity: 1; }
  to { transform: rotate(var(--a)) translateY(13px) scaleY(0.3); opacity: 0; }
}

/* ---------- toast ---------- */
.toast {
  position: fixed; left: calc(50% + var(--sidebar-w) / 2); bottom: 32px; z-index: 100; transform: translateX(-50%);
  display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 20px; border-radius: 999px;
  background: var(--ink); color: var(--bg); font-size: 15px; font-weight: 500; white-space: nowrap;
  box-shadow: 0 2px 4px rgba(17, 17, 19, 0.08), 0 16px 40px rgba(17, 17, 19, 0.22); pointer-events: none;
  animation: toast-in 280ms cubic-bezier(0.2, 0.9, 0.3, 1.25);
}
.toast:empty { display: none; }
@keyframes toast-in { from { opacity: 0; transform: translate(-50%, 16px) scale(0.94); } }

/* ---------- poke ---------- */
.poke-float {
  position: fixed; z-index: 100; pointer-events: none; translate: -50% -100%;
  font-size: 16px; font-weight: 600; color: var(--ink); line-height: 1;
  animation: poke-float 900ms cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
}
.poke-float img { width: 32px; filter: drop-shadow(0 2px 4px rgba(17, 17, 19, 0.15)); }
.poke-float img[src="/avatar.jpg"] { width: 26px; height: 26px; border-radius: 50%; filter: none; box-shadow: 0 0 0 2px var(--surface), 0 2px 6px rgba(17, 17, 19, 0.2); }
@keyframes poke-float {
  0% { transform: translateY(0) scale(0.6); opacity: 0; }
  15% { transform: translate(calc(var(--dx) * 0.2), -14px) scale(1.1) rotate(calc(var(--r) * 0.3)); opacity: 1; }
  60% { opacity: 1; }
  100% { transform: translate(var(--dx), -72px) scale(1) rotate(var(--r)); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) { .click-burst, .poke-float { display: none; } .toast { animation: none; } }

/* ---------- gear ---------- */
.gear-head { padding-bottom: 16px; border-bottom: 1px solid var(--line); }
.gear-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: 16px; row-gap: 28px; }
.gear-card { display: flex; flex-direction: column; gap: 10px; }
.gear-image { height: 160px; border-radius: 14px; background: light-dark(#f3f3f1, #19191c); border: 1px solid light-dark(#ededeb, #232327); color: light-dark(#b4b4b0, #4a4a50); display: flex; align-items: center; justify-content: center; padding: 14px; }
.gear-image img { max-width: 100%; max-height: 100%; object-fit: contain; image-rendering: pixelated; }
/* The local gear art is near-black dithered pixel art, which disappears on the dark tile. */
:root[data-theme="dark"] .gear-image img[src^="/gear/"] { filter: invert(1); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .gear-image img[src^="/gear/"] { filter: invert(1); } }
.gear-text { display: flex; flex-direction: column; gap: 2px; padding: 0 2px; }
.gear-name { font-size: 15px; font-weight: 500; }
.gear-detail { font-size: 13px; line-height: 1.4; color: var(--muted); }

/* ---------- about photo stack ---------- */
.photo-stack { --w: 300px; --h: 375px; --step: 64px; display: flex; flex-direction: column; align-items: center; gap: 18px; }
.photo-stack-cards { position: relative; width: 100%; height: calc(var(--h) + 24px); }
.photo-card {
  position: absolute; left: 50%; top: 0; width: var(--w); height: var(--h); margin-left: calc(var(--w) / -2);
  padding: 0; border: 4px solid light-dark(#fff, #242428); border-radius: 22px; overflow: hidden; cursor: pointer;
  background: light-dark(#e4e4e1, #1c1c20); display: flex; align-items: center; justify-content: center;
  box-shadow: 0 1px 2px rgba(17, 17, 19, 0.06), 0 calc(14px - var(--a) * 2px) calc(36px - var(--a) * 4px) rgba(17, 17, 19, calc(0.16 - var(--a) * 0.03));
  transform: translateX(calc(var(--d) * var(--step))) translateY(calc(var(--a) * 6px)) rotate(calc(var(--d) * 5deg)) scale(calc(1 - var(--a) * 0.07));
  will-change: transform;
  transition: transform 750ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 750ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease;
}
.photo-card.is-jumping { transition: none; opacity: 0; }
.photo-card.is-arriving { transition: opacity 450ms ease; }
.photo-card img { width: 100%; height: 100%; object-fit: cover; display: block; user-select: none; }
.photo-card-empty { font-size: 13px; color: var(--faint); }
.photo-dots { display: flex; gap: 6px; }
.photo-dots span { width: 6px; height: 6px; border-radius: 999px; background: light-dark(#d4d4d2, #3a3a40); transition: width 400ms cubic-bezier(0.22, 1, 0.36, 1), background 400ms ease; }
.photo-dots span.is-active { width: 18px; background: var(--ink); }
.photo-hint { font-size: 13px; color: var(--subtle); }
@media (prefers-reduced-motion: reduce) { .photo-card { transition: none; } }

/* ---------- small screens ---------- */
@media (max-width: 900px) {
  .shell { flex-direction: column; }
  .toast { left: 50%; }
  .mobile-bar { display: flex; align-items: center; gap: 8px; padding: 8px 12px 8px 6px; border-bottom: 1px solid var(--line); background: var(--bg); position: sticky; top: 0; z-index: 10; }
  .mobile-bar-name { font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
  .mobile-bar-status { margin-left: auto; font-size: 13px; color: var(--muted); }
  .scrim { display: block; position: fixed; inset: 0; background: light-dark(rgba(17, 17, 19, 0.32), rgba(0, 0, 0, 0.55)); z-index: 20; }
  .sidebar { position: fixed; top: 10px; left: 10px; margin: 0; z-index: 30; width: 296px; height: calc(100dvh - 20px); box-shadow: inset 0 1px 0 var(--highlight), 0 2px 4px rgba(17, 17, 19, 0.05), 0 24px 56px rgba(17, 17, 19, 0.22); transform: translateX(-110%); transition: transform 220ms ease; }
  .sidebar-panel { padding-top: 8px; }
  .sidebar.is-open { transform: none; }
  .sidebar-sub { display: none; }
  .sidebar-close { display: inline-flex; }
  .back { min-height: 44px; }
  .main { padding: 40px 16px 64px; }
  .shell:has(.sidebar-sub) .main { padding-top: 12px; }
  .column { gap: 56px; }
  .metrics { gap: 12px; }
  .metric-value { font-size: 24px; }
  .metric-label { font-size: 13px; }
  .row { gap: 14px; padding: 16px 0; }
  .post-row .thumb { width: 88px; height: 60px; }
  .graph { overflow: hidden; justify-content: flex-end; }
  .footer { flex-direction: column-reverse; gap: 12px; }
  .footer nav { column-gap: 20px; row-gap: 8px; }
  .kv { grid-template-columns: 1fr; gap: 4px; }
  .card-grid { grid-template-columns: 1fr; }
  .stack-grid { grid-template-columns: 1fr; }
  .page-title { font-size: 28px; }
  .gear-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 12px; }
  .photo-stack { --w: 200px; --h: 250px; --step: 34px; }
  .gear-image { height: 128px; }
  .gear-name { font-size: 14px; }
  .gear-detail { font-size: 12px; }
}
```

### `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Figtree, Newsreader } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { ClickBurst } from "@/components/click-burst";
import { Sidebar, ThemeScript } from "@/components/sidebar";
import { INTRO, NAME, ROLE } from "@/lib/data";
import "./globals.css";

const sans = Figtree({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["italic"], weight: "400", variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${NAME} · ${ROLE}`, template: `%s · ${NAME}` },
  description: INTRO,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ReactLenis root options={{ stopInertiaOnNavigate: true }} />
        <ClickBurst />
        <div className="shell">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}
```

### `app/icon.svg`

Pixel monogram favicon. Redraw the white paths as the user's initial on the 16×16 grid.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" fill="#000"/><path fill="#fff" d="M3 3h2v10H3zM11 3h2v10h-2zM5 5h2v2H5zM9 5h2v2H9zM7 7h2v2H7z"/></svg>
```

### `lib/data.ts`

All content. Every value is sample text to replace.

```ts
// All site content lives here. Replace every value with the owner's own content.

export const NAME = "Alex Rivera";
export const ROLE = "Software Developer";
export const LOCATION = "Austin, TX";
export const TIMEZONE = "GMT-6";
export const TZ_OFFSET_HOURS = -6; // the optional Poke counter resets at the start of each month in this timezone
export const EMAIL = "hello@example.com";

// Set this to the owner's GitHub username to show a real contribution graph. Empty shows a blank grid.
export const GITHUB_USERNAME = "";
export const GITHUB_URL = `https://github.com/${GITHUB_USERNAME}`;

// The home headline. `emphasis` renders in the italic serif: keep it to one or two words.
export const HEADLINE = {
  lead: "I build software that helps small teams",
  emphasis: "move faster.",
};

export const INTRO =
  "I design and build internal tools, client portals and automations, shaped around how each team already works.";

export const NICHE = {
  primary: "Local service businesses",
  secondary: ["Early-stage startups"],
};

export const METRICS = [
  { value: "40+", label: "Projects shipped" },
  { value: "1,200+", label: "Newsletter readers" },
  { value: "5 yrs", label: "Shipping" },
];

export const ABOUT_INTRO = [
  "A short paragraph on how you got into building software.",
  "What you do now, and who you do it for.",
  "What you want to do next, and what you do outside of work.",
];

export type WorkEntry = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export const WORK: WorkEntry[] = [
  {
    role: "Software Developer",
    company: "Freelance",
    period: "2024 to now",
    bullets: ["Building client portals, CRMs and internal tools", "Maintaining two open source libraries"],
    tags: ["Next.js", "React", "Postgres", "Vercel"],
  },
  {
    role: "Frontend Developer",
    company: "Acme Inc.",
    period: "2021 to 2024",
    bullets: ["Rebuilt the customer dashboard", "Led the design system migration"],
    tags: ["React", "TypeScript", "Storybook"],
  },
];

export const STACK: { category: string; items: string[] }[] = [
  { category: "Frontend", items: ["Next.js", "React", "TypeScript", "Vite", "Tailwind CSS", "Zustand"] },
  { category: "Backend & hosting", items: ["Node.js", "Postgres", "Redis", "Vercel"] },
  { category: "AI", items: ["Vercel AI SDK", "Claude Code"] },
  { category: "Mobile", items: ["Expo", "React Native"] },
];

export type LinkItem = { label: string; href: string; detail?: string; icon: IconName };
export type IconName =
  | "tiktok" | "instagram" | "facebook" | "x" | "threads" | "discord" | "linkedin" | "github" | "mail";

export const SOCIAL_LINKS: LinkItem[] = [
  { label: "X", href: "https://x.com/", icon: "x", detail: "@handle" },
  { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram", detail: "@handle" },
];

export const COMMUNITY_LINKS: LinkItem[] = [
  { label: "Discord", href: "https://discord.com/", icon: "discord", detail: "Community name" },
];

export const WORK_LINKS: LinkItem[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
  { label: "GitHub", href: GITHUB_URL, icon: "github", detail: `@${GITHUB_USERNAME}` },
  { label: "Email", href: `mailto:${EMAIL}`, icon: "mail", detail: EMAIL },
];

export type ProjectKind = "client" | "personal";

export type Project = {
  slug: string;
  kind: ProjectKind;
  title: string;
  summary: string;
  tag?: string;
  soon?: boolean; // shows a "Soon" pill after the title in lists
  badge?: { label: string; tip?: string }; // pill next to the tag on the detail page, with optional hover tooltip
  href?: string;
  images?: string[]; // first image is the list thumbnail; all of them fill the detail carousel
  imageNote?: string;
  client?: { name: string; label?: string; href?: string; avatarSrc?: string };
  details?: string[];
  features?: string[];
  highlights?: string[];
  techStack?: { category: string; items: string[] }[];
};

export const PROJECTS: Project[] = [
  {
    slug: "clinic-portal",
    kind: "client",
    title: "Clinic Portal",
    summary: "Patient intake and scheduling for a physiotherapy clinic",
    tag: "Web app",
    client: { name: "Northside Physio", href: "https://example.com" },
    details: ["What the client did before, what you built, and what changed after it shipped."],
    features: ["Online intake forms that land in the clinic's records", "Self-serve rescheduling with reminders"],
    techStack: [{ category: "Frontend", items: ["Next.js", "React"] }, { category: "Backend", items: ["Postgres"] }],
  },
  { slug: "job-tracker", kind: "client", title: "Job Tracker", summary: "Field job scheduling for a roofing company", tag: "Internal tool" },
  { slug: "quote-builder", kind: "client", title: "Quote Builder", summary: "Instant quotes from a three-step form", tag: "Automation" },
  { slug: "support-bot", kind: "client", title: "Support Bot", summary: "An AI assistant that answers from the help center", tag: "AI" },
  { slug: "side-project", kind: "personal", title: "Side Project", summary: "A tool you are building for yourself", tag: "Software", soon: true },
  { slug: "open-source-lib", kind: "personal", title: "Open Source Lib", summary: "A small library other developers use", tag: "Library" },
];

export const CLIENT_PROJECTS = PROJECTS.filter((p) => p.kind === "client");
export const PERSONAL_PROJECTS = PROJECTS.filter((p) => p.kind === "personal");

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  image?: string;
  sections: { heading?: string; paragraphs: string[]; bullets?: string[] }[];
};

export const POSTS: Post[] = [
  {
    slug: "hello-world",
    title: "Hello world",
    summary: "Why I started writing, and what to expect here.",
    date: "Jan 1, 2026",
    sections: [
      { paragraphs: ["The first paragraph of the post."] },
      { heading: "A section heading", paragraphs: ["More text."], bullets: ["A point", "Another point"] },
    ],
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}

export const SERVICES: { title: string; description: string }[] = [
  { title: "Custom CRMs", description: "One system for your pipeline, clients, documents and invoices." },
  { title: "Workflow automation", description: "Intake, follow-ups and hand-offs that run on their own." },
  { title: "AI assistants", description: "Chatbots that answer questions and hand off to a human at the right moment." },
  { title: "Integrations", description: "Connecting the tools you already pay for." },
];

// Gear. A local file in public/gear/ (the `image` path) wins if it exists; otherwise the page loads
// `remote`; with neither, a placeholder tile shows. Local art should be dithered (see the skill's dither.py).
export type GearItem = { name: string; detail: string; image: string; remote?: string };

export const GEAR: { title: string; items: GearItem[] }[] = [
  {
    title: "Setup",
    items: [
      { name: "Laptop", detail: "Model · chip · memory", image: "/gear/laptop.png" },
      { name: "Phone", detail: "Model · storage", image: "/gear/phone.png" },
      { name: "Monitor", detail: "Size · refresh rate", image: "/gear/monitor.png" },
      { name: "Keyboard", detail: "Switches", image: "/gear/keyboard.png" },
    ],
  },
];

// About page photo stack: up to 7 photos in public/about/ as 1.jpg ... 7.jpg. Missing ones show a placeholder card.
export const ABOUT_PHOTOS: string[] = ["/about/1.jpg", "/about/2.jpg", "/about/3.jpg", "/about/4.jpg", "/about/5.jpg"];
```

### `components/icons.tsx`

```tsx
import type { IconName } from "@/lib/data";

type P = { size?: number };

function Stroke({ size = 16, children }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export const NavIcons = {
  blog: () => <Stroke><path d="M3 3.5h10M3 8h10M3 12.5h6" /></Stroke>,
  links: () => <Stroke><path d="M6.5 9.5l3-3M7 4.5l1-1a2.8 2.8 0 014 4l-1 1M9 11.5l-1 1a2.8 2.8 0 01-4-4l1-1" /></Stroke>,
  gear: () => <Stroke><rect x="2.5" y="3.5" width="11" height="7.5" rx="1.2" /><path d="M1.5 13h13" /></Stroke>,
  resources: () => <Stroke><path d="M3 2.5h7.5L13 5v8.5H3z" /><path d="M5.5 8h5M5.5 10.5h3.5" /></Stroke>,
  services: () => <Stroke><rect x="2" y="5" width="12" height="8.5" rx="1.2" /><path d="M5.5 5V3.5h5V5" /></Stroke>,
  projects: () => <Stroke><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="9" y="2.5" width="4.5" height="4.5" rx="1" /><rect x="2.5" y="9" width="4.5" height="4.5" rx="1" /><rect x="9" y="9" width="4.5" height="4.5" rx="1" /></Stroke>,
  stack: () => <Stroke><path d="M8 2L14 5L8 8L2 5z" /><path d="M2 8.5L8 11.5L14 8.5" /><path d="M2 11.5L8 14.5L14 11.5" /></Stroke>,
  about: () => <Stroke><circle cx="8" cy="5.5" r="2.8" /><path d="M2.5 14c.8-2.7 3-4 5.5-4s4.7 1.3 5.5 4" /></Stroke>,
  arrowLeft: () => <Stroke><path d="M13 8H3M7 4L3 8l4 4" /></Stroke>,
  arrowRight: () => <Stroke><path d="M3 8h10M9 4l4 4-4 4" /></Stroke>,
  arrowUpRight: () => <Stroke><path d="M5 11l6-6M6 5h5v5" /></Stroke>,
};

// Brand paths from simple-icons (CC0); lucide paths for the rest.
const BRAND: Partial<Record<IconName, string>> = {
  tiktok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  x: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z",
  threads: "M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  discord: "M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.1 13.1 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
};

export function SocialIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  const brand = BRAND[name];
  if (brand) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={brand} />
      </svg>
    );
  }
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (name) {
    case "instagram":
      return <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
    case "facebook":
      return <svg {...common}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
    case "linkedin":
      return <svg {...common}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
    case "mail":
    default:
      return <svg {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 5L2 7" /></svg>;
  }
}
```

### `components/page.tsx`

```tsx
import Link from "next/link";
import { NavIcons } from "@/components/icons";
import { COMMUNITY_LINKS, EMAIL, NAME, SOCIAL_LINKS, WORK_LINKS } from "@/lib/data";

export function Footer() {
  const socials = [...WORK_LINKS, ...SOCIAL_LINKS, ...COMMUNITY_LINKS].filter((l) => !l.href.startsWith("mailto:"));
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {NAME}</span>
      <nav aria-label="Social">
        <a href={`mailto:${EMAIL}`}>Email</a>
        {socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </nav>
    </footer>
  );
}

export function PageHeader({
  title,
  intro,
  back,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <header className="stack-v gap-24">
      {back && (
        <Link href={back.href} className="back">
          <NavIcons.arrowLeft />
          {back.label}
        </Link>
      )}
      <h1 className="page-title">{title}</h1>
      {intro && <p className="lead">{intro}</p>}
    </header>
  );
}

export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="column">
      {children}
      <Footer />
    </div>
  );
}
```

### `components/sidebar.tsx`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { NavIcons } from "@/components/icons";
import { PixelName } from "@/components/pixel-name";
import { Poke } from "@/components/poke";
import { COMMUNITY_LINKS, EMAIL, GEAR, LOCATION, PROJECTS, SOCIAL_LINKS, STACK, TIMEZONE, WORK_LINKS } from "@/lib/data";

type Item = { href: string; label: string; icon: keyof typeof NavIcons; pill?: string; count?: number };

const pad = (n: number) => String(n).padStart(2, "0");

// Goes in <head>: applies the saved theme before first paint. Without one, the OS setting decides (see globals.css).
// Rendered from a client module so the browser copy gets type="text/plain", which stops React warning about
// <script> tags when it re-renders the tree (see node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md).
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem("theme");if(t)document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
      }}
    />
  );
}

// Flips whichever theme is showing (saved choice, else the OS setting) and saves the choice.
function toggleTheme() {
  const root = document.documentElement;
  const saved = root.getAttribute("data-theme");
  const dark = saved ? saved === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const next = dark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Explore",
    items: [
      { href: "/blog", label: "Blog", icon: "blog" },
      { href: "/links", label: "Links", icon: "links", count: SOCIAL_LINKS.length + COMMUNITY_LINKS.length + WORK_LINKS.length },
      { href: "/gear", label: "Gear", icon: "gear", count: GEAR.reduce((n, g) => n + g.items.length, 0) },
      { href: "/resources", label: "Resources", icon: "resources" },
    ],
  },
  { title: "Work with me", items: [{ href: "/services", label: "Services", icon: "services", pill: "Open" }] },
  {
    title: "Portfolio",
    items: [
      { href: "/projects", label: "Projects", icon: "projects", count: PROJECTS.length },
      { href: "/stack", label: "Stack", icon: "stack", count: STACK.reduce((n, g) => n + g.items.length, 0) },
      { href: "/about", label: "More about me", icon: "about" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
      return;
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const isHome = pathname === "/";

  // Re-apply the saved theme after React's dev-mode remount clears it off <html>. No-op in production.
  useLayoutEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (t) document.documentElement.setAttribute("data-theme", t);
    } catch {}
  }, []);

  // Close the phone drawer after navigating.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* Phone-only top bar with a menu button; shown on the home page only. */}
      {isHome && (
        <header className="mobile-bar">
          <button type="button" className="icon-btn" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3.5 6h13M3.5 10h13M3.5 14h13" /></svg>
          </button>
          <Link href="/" className="mobile-bar-name"><PixelName /></Link>
          <span className="status mobile-bar-status"><span className="dot" />Available</span>
        </header>
      )}
      {open && <div className="scrim" onClick={() => setOpen(false)} aria-hidden="true" />}

      <aside className={`sidebar${isHome ? "" : " sidebar-sub"}${open ? " is-open" : ""}`}>
        <div className="sidebar-panel">
          <div className="sidebar-top">
            <Link href="/" className="sidebar-name"><PixelName /></Link>
            <button type="button" className="icon-btn sidebar-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" /></svg>
            </button>
          </div>
          <button type="button" className={`sidebar-cta${copied ? " is-copied" : ""}`} onClick={copyEmail} aria-live="polite">
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8.5l3 3 6-6.5" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
            )}
            <span className="sidebar-cta-label">{copied ? "Email copied" : "Contact"}</span>
            <span className="sidebar-cta-dot" aria-label="Available" />
          </button>
          <nav aria-label="Main" className="nav">
            {GROUPS.map((group) => (
              <div key={group.title} className="nav-group">
                <span className="nav-label">{group.title}</span>
                {group.items.map((item) => {
                  const Icon = NavIcons[item.icon];
                  return (
                    <Link key={item.href} href={item.href} className="nav-link" aria-current={isActive(item.href) ? "page" : undefined}>
                      <Icon />
                      {item.label}
                      {item.pill && <span className="nav-pill"><span className="dot" />{item.pill}</span>}
                      {item.count !== undefined && <span className="nav-count">{pad(item.count)}</span>}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>
          <Poke />
          <div className="sidebar-foot">
            <div className="sidebar-foot-text">
              <span className="sidebar-foot-place">{LOCATION}</span>
              <span>{TIMEZONE}</span>
            </div>
            <button type="button" className="foot-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="8" cy="8" r="5.75" /><path d="M8 2.25a5.75 5.75 0 010 11.5z" fill="currentColor" /></svg>
            </button>
            <a href={`mailto:${EMAIL}`} className="foot-btn" aria-label="Email">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="3.5" width="12" height="9" rx="1.5" /><path d="m2.5 4.5 5.5 4 5.5-4" /></svg>
            </a>
            {WORK_LINKS.filter((l) => l.label === "LinkedIn").map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="foot-btn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
```

### `components/pixel-name.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { NAME } from "@/lib/data";

// Same look as public/gear/*.png: 4 grays (lightest left transparent) + 4x4 Bayer ordered dither.
const PALETTE = [17, 90, 170];
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const BLOCKS = [8, 6, 4, 3, 2, 1]; // CSS px per pixel, coarse to fine, then the real text
const FRAME_MS = 90;

// Draws the name the element renders on a grid of `block`-sized pixels, dithered to the gear palette.
function draw(el: HTMLElement, canvas: HTMLCanvasElement, block: number) {
  const s = getComputedStyle(el);
  const { width, height } = el.getBoundingClientRect();
  const w = Math.ceil(width / block), h = Math.ceil(height / block);
  if (!w || !h) return; // hidden, e.g. the mobile bar's copy on desktop: nothing to draw
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = `${w * block}px`;
  canvas.style.height = `${h * block}px`;

  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.font = `${s.fontWeight} ${parseFloat(s.fontSize) / block}px ${s.fontFamily}`;
  if (s.letterSpacing !== "normal") ctx.letterSpacing = `${parseFloat(s.letterSpacing) / block}px`;
  const m = ctx.measureText(NAME);
  const ascent = m.fontBoundingBoxAscent, descent = m.fontBoundingBoxDescent;
  ctx.fillText(NAME, 0, (height / block - ascent - descent) / 2 + ascent);

  const img = ctx.getImageData(0, 0, w, h), d = img.data;
  for (let p = 0; p < w * h; p++) {
    const x = p % w, y = Math.floor(p / w);
    const threshold = (BAYER[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
    const i = Math.floor((1 - d[p * 4 + 3] / 255) * 3 + threshold); // 0..3, 3 = background
    if (i < 3) d[p * 4] = d[p * 4 + 1] = d[p * 4 + 2] = PALETTE[i];
    d[p * 4 + 3] = i < 3 ? 255 : 0;
  }
  ctx.putImageData(img, 0, 0);
}

// The name as real text that resolves out of pixelation once on mount.
export function PixelName() {
  const ref = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setDone(true);
    let step = 0, timer = 0, cancelled = false;
    const frame = () => {
      if (cancelled) return;
      if (step === BLOCKS.length) return setDone(true);
      draw(ref.current!, canvasRef.current!, BLOCKS[step++]);
      timer = window.setTimeout(frame, FRAME_MS);
    };
    document.fonts.ready.then(frame);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <span ref={ref} className={`pixel-name${done ? "" : " is-pixel"}`}>
      {NAME}
      {!done && <canvas ref={canvasRef} width={0} height={0} aria-hidden="true" />}
    </span>
  );
}
```

### `components/click-burst.tsx`

```tsx
"use client";

import { useEffect } from "react";

// Directions the lines pop toward (0 = right, 90 = down), fanned away from the arrow cursor's body.
const ANGLES = [135, 180, 225, 270, 315];

export function ClickBurst() {
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const burst = document.createElement("div");
      burst.className = "click-burst";
      burst.style.left = `${e.clientX}px`;
      burst.style.top = `${e.clientY}px`;
      for (const a of ANGLES) {
        const line = document.createElement("span");
        line.style.setProperty("--a", `${a - 90}deg`);
        burst.append(line);
      }
      document.body.append(burst);
      setTimeout(() => burst.remove(), 500);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return null;
}
```

### `components/poke.tsx`

Optional (see build step 6).

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

// Text, or an image path (starts with "/"). Add a transparent sticker image here if you have one.
const FLOATS = ["+1", "👉", "/avatar.jpg"];
const FLUSH_MS = 1000;
const MAX_BATCH = 50; // app/api/poke/route.ts rejects larger batches

export function Poke() {
  const [count, setCount] = useState<number | null>(null);
  // Pokes not yet sent. Clicks are batched so a burst of spam costs one request and one Redis command.
  const pending = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Show the server total plus any pokes made since that request left.
  const sync = (res: Promise<Response>) =>
    res
      .then((r) => (r.ok ? r.json() : null))
      .then((total: number | null) => total !== null && setCount(total + pending.current))
      .catch(() => {});

  const flush = () => {
    clearTimeout(timer.current);
    const n = pending.current;
    if (!n) return;
    pending.current = 0;
    // keepalive lets the request finish when the tab is closing.
    sync(fetch("/api/poke", { method: "POST", body: String(n), keepalive: true }));
  };

  useEffect(() => {
    sync(fetch("/api/poke"));
    const onHide = () => document.visibilityState === "hidden" && flush();
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, []);

  const poke = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCount((c) => (c ?? 0) + 1);
    pending.current += 1;
    clearTimeout(timer.current);
    if (pending.current >= MAX_BATCH) flush();
    else timer.current = setTimeout(flush, FLUSH_MS);

    const r = e.currentTarget.getBoundingClientRect();
    const el = document.createElement("span");
    el.className = "poke-float";
    el.style.left = `${r.left + r.width / 2}px`;
    el.style.top = `${r.top}px`;
    el.style.setProperty("--dx", `${Math.random() * 60 - 30}px`);
    el.style.setProperty("--r", `${Math.random() * 40 - 20}deg`);
    const pick = FLOATS[Math.floor(Math.random() * FLOATS.length)];
    if (pick.startsWith("/")) {
      const img = document.createElement("img");
      img.src = pick;
      img.alt = "";
      el.append(img);
    } else {
      el.textContent = pick;
    }
    document.body.append(el);
    setTimeout(() => el.remove(), 900);
  };

  return (
    <div className="poke">
      <div className="sidebar-foot-text">
        <span>Pokes this month</span>
        <span className="sidebar-foot-place">{count === null ? "–" : count.toLocaleString()}</span>
      </div>
      <button type="button" className="sidebar-cta poke-btn" onClick={poke}>
        <span aria-hidden="true">👉</span>
        Poke
      </button>
    </div>
  );
}
```

### `app/api/poke/route.ts`

Optional, pairs with `poke.tsx`.

```ts
import { Redis } from "@upstash/redis";
import { TZ_OFFSET_HOURS } from "@/lib/data";

// Reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
const redis = Redis.fromEnv();

// One key per month in the site's timezone; a new month reads a fresh key, so no reset job.
const monthKey = () => `pokes:${new Date(Date.now() + TZ_OFFSET_HOURS * 3600_000).toISOString().slice(0, 7)}`;

export async function GET() {
  const count = (await redis.get<number>(monthKey())) ?? 0;
  // Vercel's CDN answers reads: at most ~1 Redis GET per region every 30s, whatever the traffic.
  return Response.json(count, { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } });
}

export async function POST(req: Request) {
  const n = Number(await req.text());
  // 50 matches the client's max batch in components/poke.tsx.
  if (!Number.isInteger(n) || n < 1 || n > 50) return new Response(null, { status: 400 });
  return Response.json(await redis.incrby(monthKey(), n));
}
```

### `components/copy-email.tsx`

```tsx
"use client";

import { useRef, useState, type ReactNode } from "react";

// Copies the address instead of opening a mail app. Falls back to the mailto link if the clipboard is unavailable.
export function CopyEmail({ href, className, children }: { href: string; className: string; children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  return (
    <>
      <a
        href={href}
        className={className}
        onClick={(e) => {
          if (!navigator.clipboard) return;
          e.preventDefault();
          navigator.clipboard.writeText(href.replace("mailto:", "")).then(
            () => {
              setCopied(true);
              clearTimeout(timer.current);
              timer.current = setTimeout(() => setCopied(false), 2000);
            },
            () => (location.href = href),
          );
        }}
      >
        {children}
      </a>
      <span className="toast" role="status">{copied ? "Copied to clipboard" : ""}</span>
    </>
  );
}
```

### `components/project-list.tsx`

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/data";

export function ProjectRow({ project, faded = false }: { project: Project; faded?: boolean }) {
  const cover = project.images?.[0];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`row${faded ? " row-faded" : ""}`}
      aria-hidden={faded || undefined}
      tabIndex={faded ? -1 : undefined}
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="thumb" />
      ) : (
        <div className="thumb" />
      )}
      <div className="row-body">
        <span className="row-title">
          {project.title}
          {project.soon && <span className="soon">Soon</span>}
        </span>
        <span className="row-sub">{project.summary}</span>
      </div>
      {project.tag && <span className="row-tag">{project.tag}</span>}
    </Link>
  );
}

// Shows `visible` rows, fades the next one, and reveals the rest on demand.
export function ProjectList({
  title,
  projects,
  visible = 2,
  collapsible = true,
}: {
  title: string;
  projects: Project[];
  visible?: number;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const canCollapse = collapsible && projects.length > visible;
  const shown = !canCollapse || open ? projects : projects.slice(0, visible + 1);
  const hidden = projects.length - visible;

  return (
    <div className="stack-v gap-16">
      <div className="section-head">
        <h2 className="label">{title}</h2>
        <span className="count">{String(projects.length).padStart(2, "0")}</span>
      </div>
      <div className="stack-v">
        {shown.map((p, i) => (
          <ProjectRow key={p.slug} project={p} faded={canCollapse && !open && i === visible} />
        ))}
      </div>
      {canCollapse && (
        <button type="button" className="more-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "Show less" : `+ ${hidden} more`}
        </button>
      )}
    </div>
  );
}
```

### `components/contributions.tsx`

```tsx
import { NavIcons } from "@/components/icons";
import { GITHUB_URL, GITHUB_USERNAME } from "@/lib/data";

type Day = { date: string; count: number; level: number };

async function load(): Promise<{ days: Day[]; total: number } | null> {
  if (!GITHUB_USERNAME) return null;
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 60 * 60 * 12 } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { contributions: Day[]; total: { lastYear?: number } };
    return { days: json.contributions, total: json.total.lastYear ?? 0 };
  } catch {
    return null;
  }
}

function toWeeks(days: Day[]) {
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks.slice(-52);
}

// Empty grid used until a GitHub username is set or when the API is unreachable.
function emptyWeeks(): Day[][] {
  return Array.from({ length: 52 }, (_, w) =>
    Array.from({ length: 7 }, (_, d) => ({ date: `${w}-${d}`, count: 0, level: 0 })),
  );
}

export async function Contributions() {
  const data = await load();
  const weeks = data ? toWeeks(data.days) : emptyWeeks();

  return (
    <section className="stack-v gap-16">
      <div className="section-head">
        <h2 className="label">GitHub</h2>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="count" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {data
            ? `${data.total.toLocaleString()} contributions in the last year`
            : "Add your GitHub username in lib/data.ts"}
          <NavIcons.arrowUpRight />
        </a>
      </div>
      <div className="graph" role="img" aria-label="GitHub contribution graph">
        {weeks.map((week, i) => (
          <div key={i} className="graph-week">
            {week.map((day) => (
              <div key={day.date} className={`graph-day${day.level ? ` l${Math.min(day.level, 4)}` : ""}`} title={data ? `${day.count} on ${day.date}` : undefined} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
```

### `components/carousel.tsx`

```tsx
"use client";

import { useRef, useState } from "react";
import { NavIcons } from "@/components/icons";

// Native scroll-snap track: swipe or trackpad-scroll between images, or use the buttons.
export function Carousel({ images, alt }: { images: string[]; alt: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const step = (el: HTMLDivElement) => (el.scrollWidth - el.clientWidth) / (images.length - 1);
  const go = (i: number) => {
    const el = track.current;
    if (el) el.scrollTo({ left: i * step(el), behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={track}
        className="carousel"
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / step(e.currentTarget)))}
      >
        {images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={alt} className="shot" />
        ))}
      </div>
      {images.length > 1 && (
        <div className="carousel-nav">
          <span className="count">{index + 1} / {images.length}</span>
          <button type="button" className="foot-btn" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous image">
            <NavIcons.arrowLeft />
          </button>
          <button type="button" className="foot-btn" onClick={() => go(index + 1)} disabled={index === images.length - 1} aria-label="Next image">
            <NavIcons.arrowRight />
          </button>
        </div>
      )}
    </>
  );
}
```

### `components/photo-stack.tsx`

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

// A centred, fanned stack of photos. Auto-advances; click the front card to go
// forward, click a side card to bring it to the front. Empty slots (null) show a
// placeholder card so the layout holds until real photos are added.
export function PhotoStack({ photos, interval = 3800 }: { photos: (string | null)[]; interval?: number }) {
  const n = photos.length;
  const half = Math.floor(n / 2);
  const [pos, setPos] = useState({ active: 0, from: 0, settled: true });
  const paused = useRef(false);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const mod = (x: number) => ((x % n) + n) % n;
  const rel = (i: number, a: number) => {
    let d = i - mod(a);
    if (d > half) d -= n;
    if (d < -half) d += n;
    return d;
  };

  const go = (k: number) => {
    setPos((p) => ({ active: p.active + k, from: p.active, settled: false }));
    clearTimeout(settleTimer.current);
    // One frame later, let any card that wrapped to the other side fade back in.
    settleTimer.current = setTimeout(() => setPos((p) => ({ ...p, settled: true })), 40);
  };

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!paused.current && !document.hidden) go(1);
    }, interval);
    return () => {
      clearInterval(id);
      clearTimeout(settleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, interval]);

  const current = mod(pos.active);

  return (
    <div className="photo-stack">
      <div
        className="photo-stack-cards"
        role="group"
        aria-roledescription="carousel"
        aria-label="Photos"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        {photos.map((src, i) => {
          const d = rel(i, pos.active);
          const a = Math.abs(d);
          // A card that wraps from one end of the fan to the other would fly across the
          // stack; hide it for a frame at its new spot, then fade it in.
          const jumped = Math.abs(d - rel(i, pos.from)) > half;
          const state = jumped ? (pos.settled ? "is-arriving" : "is-jumping") : undefined;
          return (
            <button
              key={i}
              type="button"
              className={`photo-card${state ? ` ${state}` : ""}`}
              aria-label={`Photo ${i + 1} of ${n}`}
              aria-current={d === 0 ? "true" : undefined}
              onClick={() => go(d === 0 ? 1 : d)}
              style={{ "--d": d, "--a": a, zIndex: 10 - a } as React.CSSProperties}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="" draggable={false} />
              ) : (
                <span className="photo-card-empty">Photo {i + 1}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="photo-dots" aria-hidden="true">
        {photos.map((_, i) => (
          <span key={i} className={i === current ? "is-active" : undefined} />
        ))}
      </div>
      <span className="photo-hint">Click the stack to shuffle</span>
    </div>
  );
}
```

### `app/page.tsx`

Home.

```tsx
import Link from "next/link";
import { Contributions } from "@/components/contributions";
import { Page } from "@/components/page";
import { PixelName } from "@/components/pixel-name";
import { ProjectList } from "@/components/project-list";
import {
  CLIENT_PROJECTS, HEADLINE, INTRO, LOCATION, METRICS, NAME, NICHE, PERSONAL_PROJECTS, ROLE, STACK,
} from "@/lib/data";

export default function Home() {
  return (
    <Page>
      <section className="stack-v gap-40">
        <div className="identity">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/avatar.jpg" alt={NAME} className="avatar" />
          <div className="stack-v" style={{ gap: 2 }}>
            <span className="identity-name"><PixelName /></span>
            <span className="identity-role">{ROLE} · {LOCATION}</span>
          </div>
        </div>

        <h1 className="page-title">
          {HEADLINE.lead} <span className="serif">{HEADLINE.emphasis}</span>
        </h1>

        <p className="lead">
          {INTRO} <Link href="/about" className="underline">More about me</Link>
        </p>

        <div className="niche">
          <span className="label">Current niche</span>
          <span className="chip chip-dark"><span className="dot" />{NICHE.primary}</span>
          {NICHE.secondary.map((n) => (
            <span key={n} className="chip chip-light">{n}</span>
          ))}
        </div>

        <div className="metrics">
          {METRICS.map((m) => (
            <div key={m.label} className="stack-v gap-4">
              <span className="metric-value">{m.value}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="stack-v gap-56">
        <ProjectList title="Client projects" projects={CLIENT_PROJECTS} />
        <ProjectList title="Personal projects" projects={PERSONAL_PROJECTS} />
      </section>

      <section className="stack-v gap-16">
        <div className="section-head">
          <h2 className="label">Stack</h2>
          <Link href="/stack" className="count">View all</Link>
        </div>
        <div className="stack-v">
          {STACK.map((g) => (
            <div key={g.category} className="kv">
              <span>{g.category}</span>
              <span>{g.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      <Contributions />
    </Page>
  );
}
```

### `app/projects/page.tsx`

```tsx
import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/page";
import { ProjectList } from "@/components/project-list";
import { CLIENT_PROJECTS, PERSONAL_PROJECTS } from "@/lib/data";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <Page>
      <PageHeader
        back={{ href: "/", label: "Home" }}
        title="Projects"
        intro="Systems I've built for clients, and the things I build for myself."
      />
      <section className="stack-v gap-56">
        <ProjectList title="Client projects" projects={CLIENT_PROJECTS} collapsible={false} />
        <ProjectList title="Personal projects" projects={PERSONAL_PROJECTS} collapsible={false} />
      </section>
    </Page>
  );
}
```

### `app/projects/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Carousel } from "@/components/carousel";
import { NavIcons } from "@/components/icons";
import { Page, PageHeader } from "@/components/page";
import { PROJECTS, getProject } from "@/lib/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.title ?? "Project" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const hasContent = Boolean(project.details?.length || project.features?.length || project.images?.length);

  return (
    <Page>
      <PageHeader
        back={{ href: "/projects", label: "All projects" }}
        title={project.title}
        intro={project.summary}
      />

      <div className="stack-v gap-40">
        {(project.tag || project.client || project.href) && (
          <div className="client">
            {project.client?.avatarSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.client.avatarSrc} alt="" />
            )}
            <div className="row-body">
              <span className="row-title">{project.client?.label ?? project.client?.name ?? (project.kind === "client" ? "Client project" : "Personal project")}</span>
              {project.tag && (
                <span className="row-sub">
                  {project.tag}
                  {project.badge && (
                    <span className="soon" tabIndex={project.badge.tip ? 0 : undefined}>
                      {project.badge.label}
                      {project.badge.tip && <span role="tooltip" className="tip">{project.badge.tip}</span>}
                    </span>
                  )}
                </span>
              )}
            </div>
            {project.client?.href && (
              <a href={project.client.href} target="_blank" rel="noreferrer" className="back">
                Visit <NavIcons.arrowUpRight />
              </a>
            )}
            {project.href && (
              <a href={project.href} target="_blank" rel="noreferrer" className="back">
                Landing page <NavIcons.arrowUpRight />
              </a>
            )}
          </div>
        )}

        {project.images?.length ? (
          <div className="gallery">
            <Carousel images={project.images} alt={`${project.title} screenshot`} />
            {project.imageNote && <p className="shot-note">{project.imageNote}</p>}
          </div>
        ) : project.imageNote ? (
          <p className="placeholder">{project.imageNote}</p>
        ) : null}

        {project.details?.length ? (
          <section className="stack-v gap-16">
            <h2 className="label">Overview</h2>
            {project.details.map((p, i) => (
              <p key={i} className="lead">{p}</p>
            ))}
          </section>
        ) : null}

        {project.features?.length ? (
          <section className="stack-v gap-16">
            <h2 className="label">Features</h2>
            <ul className="bullets">{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
          </section>
        ) : null}

        {project.highlights?.length ? (
          <section className="stack-v gap-16">
            <h2 className="label">Highlights</h2>
            <ul className="bullets">{project.highlights.map((f) => <li key={f}>{f}</li>)}</ul>
          </section>
        ) : null}

        {project.techStack?.length ? (
          <section className="stack-v gap-16">
            <h2 className="label">Built with</h2>
            <div className="stack-v">
              {project.techStack.map((g) => (
                <div key={g.category} className="kv">
                  <span>{g.category}</span>
                  <span>{g.items.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!hasContent && <p className="placeholder">Write-up coming soon.</p>}
      </div>
    </Page>
  );
}
```

### `app/about/page.tsx`

```tsx
import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { Page, PageHeader } from "@/components/page";
import { PhotoStack } from "@/components/photo-stack";
import { PixelName } from "@/components/pixel-name";
import { ABOUT_INTRO, ABOUT_PHOTOS, LOCATION, ROLE, WORK } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const photos = ABOUT_PHOTOS.map((src) => (existsSync(path.join(process.cwd(), "public", src)) ? src : null));
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="More about me" />

      <section className="stack-v gap-24">
        <PhotoStack photos={photos} />
        <div className="identity">
          <div className="stack-v" style={{ gap: 2 }}>
            <span className="identity-name"><PixelName /></span>
            <span className="identity-role">{ROLE} · {LOCATION}</span>
          </div>
        </div>
        {ABOUT_INTRO.map((p, i) => (
          <p key={i} className="lead">{p}</p>
        ))}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a href="/links" className="btn btn-light">Get in touch</a>
        </div>
      </section>

      <section className="stack-v gap-16">
        <h2 className="label">Experience</h2>
        <div className="stack-v">
          {WORK.map((w) => (
            <div key={w.role} className="stack-v gap-16" style={{ padding: "18px 0", borderTop: "1px solid var(--line)" }}>
              <div className="section-head">
                <span className="row-title">{w.role} <span style={{ color: "var(--muted)" }}>· {w.company}</span></span>
                <span className="count">{w.period}</span>
              </div>
              {w.bullets.length > 0 && <ul className="bullets">{w.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
              {w.tags.length > 0 && <span className="row-sub">{w.tags.join(" · ")}</span>}
            </div>
          ))}
        </div>
      </section>
    </Page>
  );
}
```

### `app/blog/page.tsx`

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Page, PageHeader } from "@/components/page";
import { POSTS, type Post } from "@/lib/data";

function readMinutes(post: Post) {
  const text = post.sections.flatMap((s) => [s.heading ?? "", ...s.paragraphs, ...(s.bullets ?? [])]).join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="Blog" intro="What you write about, in one sentence." />
      {POSTS.length ? (
        <div className="stack-v">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="row post-row">
              {p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" className="thumb" />
              ) : (
                <div className="thumb" />
              )}
              <div className="post-body">
                <span className="post-meta">{p.date}</span>
                <span className="post-title">{p.title}</span>
                <span className="post-sub">{p.summary}</span>
                <span className="post-meta">Read · {readMinutes(p)} min</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="placeholder">No posts yet. The first one is on the way.</p>
      )}
    </Page>
  );
}
```

### `app/blog/[slug]/page.tsx`

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Page, PageHeader } from "@/components/page";
import { POSTS, getPost } from "@/lib/data";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPost(slug)?.title ?? "Post" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <Page>
      <PageHeader back={{ href: "/blog", label: "All posts" }} title={post.title} intro={post.summary} />
      <div className="stack-v gap-40">
        <span className="label">{post.date}</span>
        {post.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image} alt="" className="shot" />
        ) : (
          <div className="shot" />
        )}
        {post.sections.map((s, i) => (
          <section key={i} className="stack-v gap-16">
            {s.heading && <h2 className="label">{s.heading}</h2>}
            {s.paragraphs.map((p, j) => (
              <p key={j} className="lead">{p}</p>
            ))}
            {s.bullets?.length ? <ul className="bullets">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul> : null}
          </section>
        ))}
      </div>
    </Page>
  );
}
```

### `app/services/page.tsx`

```tsx
import type { Metadata } from "next";
import { CopyEmail } from "@/components/copy-email";
import { Page, PageHeader } from "@/components/page";
import { EMAIL, NICHE, SERVICES } from "@/lib/data";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <Page>
      <PageHeader
        back={{ href: "/", label: "Home" }}
        title="Services"
        intro="What you build for clients, in one sentence."
      />

      <div className="niche">
        <span className="label">Currently working with</span>
        <span className="chip chip-dark"><span className="dot" />{NICHE.primary}</span>
        {NICHE.secondary.map((n) => <span key={n} className="chip chip-light">{n}</span>)}
      </div>

      <section className="stack-v gap-16">
        <h2 className="label">What I build</h2>
        <div className="card-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="card">
              <span className="card-title">{s.title}</span>
              <span className="card-body">{s.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="stack-v gap-16">
        <h2 className="label">Start a project</h2>
        <p className="lead">One sentence inviting the visitor to reach out.</p>
        <div>
          <CopyEmail href={`mailto:${EMAIL}`} className="btn btn-dark">Email {EMAIL}</CopyEmail>
        </div>
      </section>
    </Page>
  );
}
```

### `app/stack/page.tsx`

```tsx
import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/page";
import { STACK } from "@/lib/data";

export const metadata: Metadata = { title: "Stack" };

export default function StackPage() {
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="Stack" intro="The tools I reach for when building client systems and my own projects." />
      <div className="stack-grid">
        {STACK.map((g) => (
          <section key={g.category} className="stack-v gap-16">
            <h2 className="label">{g.category}</h2>
            <div className="stack-v stack-list">
              {g.items.map((item) => (
                <div key={item} className="row">
                  <span className="row-title">{item}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Page>
  );
}
```

### `app/gear/page.tsx`

```tsx
import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { Page, PageHeader } from "@/components/page";
import { GEAR } from "@/lib/data";

export const metadata: Metadata = { title: "Gear" };

function imageFor(item: { image: string; remote?: string }) {
  if (existsSync(path.join(process.cwd(), "public", item.image))) return item.image;
  return item.remote;
}

export default function GearPage() {
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="Gear" intro="The hardware I use every day." />
      {GEAR.map((group) => (
        <section key={group.title} className="stack-v gap-16">
          <div className="section-head gear-head">
            <h2 className="label">{group.title}</h2>
            <span className="count">{String(group.items.length).padStart(2, "0")}</span>
          </div>
          <div className="gear-grid">
            {group.items.map((item) => {
              const src = imageFor(item);
              return (
              <div key={item.name} className="gear-card">
                <div className="gear-image">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={item.name} loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5" /><circle cx="9" cy="10" r="1.6" /><path d="m21 16-5-5-9 9" /></svg>
                  )}
                </div>
                <div className="gear-text">
                  <span className="gear-name">{item.name}</span>
                  <span className="gear-detail">{item.detail}</span>
                </div>
              </div>
              );
            })}
          </div>
        </section>
      ))}
    </Page>
  );
}
```

### `app/links/page.tsx`

```tsx
import type { Metadata } from "next";
import { CopyEmail } from "@/components/copy-email";
import { NavIcons, SocialIcon } from "@/components/icons";
import { Page, PageHeader } from "@/components/page";
import { COMMUNITY_LINKS, SOCIAL_LINKS, WORK_LINKS, type LinkItem } from "@/lib/data";

export const metadata: Metadata = { title: "Links" };

function LinkRows({ title, items }: { title: string; items: LinkItem[] }) {
  return (
    <section className="stack-v gap-16">
      <h2 className="label">{title}</h2>
      <div className="stack-v">
        {items.map((l) => {
          const body = (
            <>
              <span style={{ width: 40, height: 40, borderRadius: 10, background: "var(--tile)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <SocialIcon name={l.icon} />
              </span>
              <span className="row-body">
                <span className="row-title">{l.label}</span>
                {l.detail && <span className="row-sub">{l.detail}</span>}
              </span>
              <span className="row-tag"><NavIcons.arrowUpRight /></span>
            </>
          );
          return l.href.startsWith("mailto:") ? (
            <CopyEmail key={l.label} href={l.href} className="row">{body}</CopyEmail>
          ) : (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="row">
              {body}
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default function LinksPage() {
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="Links" intro="Where to find me online." />
      <LinkRows title="Community" items={COMMUNITY_LINKS} />
      <LinkRows title="Social" items={SOCIAL_LINKS} />
      <LinkRows title="Work" items={WORK_LINKS} />
    </Page>
  );
}
```

### `app/resources/page.tsx`

```tsx
import type { Metadata } from "next";
import { NavIcons } from "@/components/icons";
import { Page, PageHeader } from "@/components/page";

export const metadata: Metadata = { title: "Resources" };

type Resource = { title: string; detail?: string; href?: string; download?: boolean; image?: string };

const TOOLS: Resource[] = [
  { title: "Editor name", detail: "Why you use it", href: "https://example.com" },
  { title: "A tool without a link", detail: "Rows without href are not clickable" },
];

const SKILLS: Resource[] = [
  { title: "A skill or template", detail: "Original by someone", href: "https://example.com" },
  { title: "Your own file", detail: "Put it in public/ to offer a download", href: "/your-file.md", download: true },
];

// Round 40px avatars from public/channels/.
const CHANNELS: Resource[] = [
  { title: "Channel name", href: "https://www.youtube.com/", image: "/channels/channel.jpg" },
];

function ResourceRows({ title, items }: { title: string; items: Resource[] }) {
  return (
    <section className="stack-v gap-16">
      <h2 className="label">{title}</h2>
      <div className="stack-v">
        {items.map((r) => {
          const body = (
            <>
              {r.image && <img src={r.image} alt="" width={40} height={40} style={{ borderRadius: "50%", flexShrink: 0 }} />}
              <span className="row-body">
                <span className="row-title">{r.title}</span>
                {r.detail && <span className="row-sub">{r.detail}</span>}
              </span>
            </>
          );
          if (!r.href) return <div key={r.title} className="row">{body}</div>;
          return (
            <a
              key={r.title}
              href={r.href}
              className="row"
              {...(r.download ? { download: true } : { target: "_blank", rel: "noreferrer" })}
            >
              {body}
              <span className="row-tag">{r.download ? "Download" : <NavIcons.arrowUpRight />}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export default function ResourcesPage() {
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="Resources" intro="Templates, tools and guides I've found useful, collected in one place." />
      <ResourceRows title="Tools I use" items={TOOLS} />
      <ResourceRows title="Skills I use" items={SKILLS} />
      <ResourceRows title="Informative Channels" items={CHANNELS} />
    </Page>
  );
}
```

### `app/not-found.tsx`

```tsx
import { Page, PageHeader } from "@/components/page";

export default function NotFound() {
  return (
    <Page>
      <PageHeader back={{ href: "/", label: "Home" }} title="Page not found" intro="That page doesn't exist, or it moved." />
    </Page>
  );
}
```

### `dither.py`

Gear art: product photo in, 4-gray Bayer-dithered pixel art out. Keep it outside `app/` (project root or a `scripts/` folder). Needs Pillow.

```python
# Usage: python3 dither.py in.png out.png [block]   (needs Pillow: pip install pillow)
import sys
from PIL import Image

BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5]  # 4x4 ordered dither
GRAYS = [17, 90, 170, 245]  # dark to light, same 4 values as the name animation

src, dst = sys.argv[1], sys.argv[2]
block = int(sys.argv[3]) if len(sys.argv) > 3 else 7  # output px per art pixel
im = Image.open(src).convert("RGBA")
w, h = max(1, im.width // block), max(1, im.height // block)
small = im.resize((w, h), Image.LANCZOS)
px = small.load()
for y in range(h):
    for x in range(w):
        r, g, b, a = px[x, y]
        if a < 128:
            px[x, y] = (0, 0, 0, 0)  # keep transparent backgrounds transparent
            continue
        lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        lum = min(1, max(0, (lum - 0.5) * 1.5 + 0.5))  # extra contrast: solid blacks and whites, dither in the mids
        i = min(3, int(lum * 3 + (BAYER[(y % 4) * 4 + x % 4] + 0.5) / 16))
        px[x, y] = (GRAYS[i],) * 3 + (255,)
small.resize((w * block, h * block), Image.NEAREST).save(dst)
```
