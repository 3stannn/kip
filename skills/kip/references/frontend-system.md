# Shared frontend system

Read this for website creation, substantial visual changes, and typography or component repairs. It defines Kip's defaults across portfolio and other website references. Explicit user direction and established brand systems take precedence; small edits preserve the surrounding system. For portfolios, choose and read one primary skill using [portfolio-design.md](portfolio-design.md). That selected skill governs composition, navigation, geometry, spacing, palette, and surfaces. Apply this shared system as narrow typography, component consistency, and accessibility overrides; do not erase the selected skill's identity or replace it with generic minimalism.

## One family, one type scale

Choose one font family for the entire interface. Default to **Geist** for new work without a brand font. If Geist is selected, headings, body, navigation, buttons, inputs, labels, dates, numbers, and footer all use Geist. Do not add Geist Mono, Geist Pixel, a serif emphasis word, or a decorative logo font: these are separate families, even when their names share a brand. Use weight, size, spacing, and layout for hierarchy. A supplied logo asset can retain its artwork; do not redraw the user's name in a novelty typeface.

Different font faces within the selected family are welcome: regular body text, medium labels, semibold headings, bold emphasis, and true italics can coexist. Use supported variable-font weight, width, and optical-size axes when they serve a consistent role. One family does not mean one weight or style. Separately named sibling families such as Geist Mono still count as another family.

Load only the selected family's needed weights and styles with swap behavior, including real italic files or variable axes when used; avoid synthesized bold or italics. System fallbacks are for loading failures or missing glyphs, not an alternate visual role. Inherit the family in native controls and check third-party component styles for overrides. Use tabular numerals from the same family when alignment matters.

Define semantic tokens before styling components. Use a 16px browser root and rem units; do not lower the root to make components fit. Build a small, ordered scale with deliberate increments: small steps for supporting text, then steps such as 4, 6, 8, and 12px as headings grow. These describe increments, not literal 4–12px text sizes. Reuse the chosen scale rather than inventing near-duplicate sizes for each section. Default scale:

| Role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Labels / metadata / captions | 0.875rem (14px) | 400–500 | 1.5 |
| Body / navigation / controls | 1rem (16px) | 400–500 | 1.5–1.65 |
| Lead / item title | 1.25rem (20px) | 400 / 600 | 1.5 |
| Section heading | 1.5rem (24px) | 600 | 1.3 |
| Large section heading, when needed | 1.875rem (30px) | 600 | 1.25 |
| Page heading | 2.375rem (38px) | 600 | 1.2 |
| Hero heading, when needed | 3.125rem (50px) | 600–700 | 1.15 |

This example uses 14 → 16 → 20 → 24 → 30 → 38 → 50px, with increments of 2, 4, 4, 6, 8, and 12px. Use only the roles the page needs. Bind them to shared tokens such as `--text-label`, `--text-body`, and `--text-page-heading`; components consume the semantic tokens. A different coherent scale can suit the brief or existing brand. For responsive display text, interpolate with `clamp()` between chosen scale endpoints or step to a smaller heading token at a breakpoint; keep labels and body text readable.

Assign sizes by visual role rather than HTML heading level alone. A quiet section label can remain 14px above experience rows, while a page title or prominent section heading uses a larger token. Preserve semantic heading markup and distinguish roles with weight, line height, color, and spacing as well as size. Do not make every heading oversized or flatten labels, body copy, and titles into one size.

Keep the same role at the same size across sections. Labels, badges, helper text, timestamps, contact details, and footer links stay at least 14px by default; primary actions and navigation use 16px. Do not introduce 9–12px microtype, uppercase mono labels, or local arbitrary sizes to pack in content. Dense existing products may retain a deliberate established scale; do not spread that exception into new marketing work. Mobile layouts reflow rather than shrinking supporting text.

Use readable foreground tokens in each supported theme. Check actual foreground/background contrast, including muted labels: at least 4.5:1 for normal text and 3:1 for qualifying large text. A gray ramp alone does not guarantee contrast.

## Shared components before page styling

Create or reuse a small set of shared primitives and semantic variants for the components actually needed. Centralize font roles, spacing, radii, borders, colors, control heights, focus rings, and icon dimensions. Repeated navigation items, buttons, fields, links, and status treatments must use the same implementation and variant for the same role. A component library supplies behavior; its default sizes must still map to this system.

- Start with ordinary text links, rows, and open sections. Add a container only when it clarifies a distinct group or interaction. Do not give every section a rounded box, shadow, badge, or icon tile.
- Use a small spacing scale (4, 8, 12, 16, 24, 32, 48, 64px). Default control height is 44px; compact desktop controls may be 36px when appropriate. Preserve adequate touch targets without shrinking labels.
- Use one radius per role, for example 8px controls and 16px grouped panels. Reserve pills for actual tags or discrete state, not every link, CTA, contact method, and theme control.
- Use one icon set, consistent optical size and stroke weight. Icons support a label or recognizable action; omit decorative containers and redundant arrows or status dots.
- Extend shared variants when a new role is real. Do not fix repetition with unrelated per-instance font, padding, radius, or border overrides.

## Red flags from the supplied portfolio screenshots

These are rejected defaults for Kip-generated personal sites, not a ban on intentionally requested product features:

| Rejected pattern | Preferred treatment |
| --- | --- |
| Pixelated or textured owner name | Plain, crisp name in the selected family, rendered as text |
| Boxed availability dashboard with tiny clock, timezone, location code, and truncated sentence | One readable availability sentence if supplied and relevant; wrap it naturally; omit the clock unless useful to the task |
| Generic outline-person icon in a large bordered avatar tile, with online dot and PRO badge | Real supplied portrait when useful; otherwise omit the avatar and show name and role plainly; no invented status or tier |
| Full-width boxed theme row with a tiny TOGGLE caption | One compact accessible theme control with a clear name and visible current state; use the existing theme system |
| Contact section in a large rounded panel containing a row of email/social pills | Open contact section with one clear email link and plain social links; wrap or stack at narrow widths; add a copy action only when useful |
| Repeated hero chips, status dots, and unrelated metric strip | Relevant prose and work evidence; include tags, status, or metrics only when real and needed |

Do not duplicate availability, identity, and every contact destination across sidebar, hero, and footer. Repeat a primary contact action only where it helps navigation. Avoid pseudo-technical copy such as “Let's engineer something durable” when a direct invitation or concrete service description works better.

## Inspect the rendered system

For UI implementation, inspect after fonts load at narrow and wide widths, affected breakpoints, and 200% zoom. Check computed font families, weights, styles, and sizes on headings, body, nav, controls, badges, metadata, and contact links, including third-party defaults. Confirm roles map to shared scale tokens, responsive display sizes stay within their chosen bounds, and repeated roles match. Confirm only the selected family is intentionally loaded and used, its chosen faces render correctly, and no fallback or synthesized face is rendering unexpectedly.

Compare repeated components side by side: same roles should have matching type, height, padding, radius, icon size, and states. Exercise focus, hover, pressed, disabled, and loading states where applicable. Test long availability copy, names, and email addresses without ellipsis or tiny text as the fix. Verify contrast in supported themes and keep keyboard focus visible. Correct inconsistent instances at the shared token or variant, then inspect again. Report actual checks and any unverified browser behavior.
