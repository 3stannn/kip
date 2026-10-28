# Shared frontend system

Read this for website creation, substantial visual changes, and typography or component repairs. It defines Kip's defaults across portfolio and other website references. Explicit user direction and established brand systems take precedence; small edits preserve the surrounding system. A visual reference supplies composition and tone, not permission to import conflicting font or component recipes.

## One family, one type scale

Choose one font family for the entire interface. Default to **Geist** for new work without a brand font. If Geist is selected, headings, body, navigation, buttons, inputs, labels, dates, numbers, and footer all use Geist. Do not add Geist Mono, Geist Pixel, a serif emphasis word, or a decorative logo font: these are separate families, even when their names share a brand. Use weight, size, spacing, and layout for hierarchy. A supplied logo asset can retain its artwork; do not redraw the user's name in a novelty typeface.

Load only the selected family's needed weights with swap behavior. System fallbacks are for loading failures or missing glyphs, not an alternate visual role. Inherit the family in native controls and check third-party component styles for overrides. Use tabular numerals from the same family when alignment matters.

Define semantic tokens before styling components. Use a 16px browser root and rem units; do not lower the root to make components fit. Default scale:

| Role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Metadata / captions | 0.875rem (14px) | 400–500 | 1.5 |
| Body / navigation / controls | 1rem (16px) | 400–500 | 1.5–1.65 |
| Lead / item title | 1.125rem (18px) | 400 / 600 | 1.5 |
| Section heading | 1.5rem (24px) | 600 | 1.3 |
| Page heading | 2rem (32px) | 600 | 1.2 |
| Hero heading, when needed | clamp(2rem, 4vw, 3rem) | 600 | 1.15 |

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

For UI implementation, inspect after fonts load at narrow and wide widths, affected breakpoints, and 200% zoom. Check computed font families and sizes on headings, body, nav, controls, badges, metadata, and contact links, including third-party defaults. Confirm only the selected family is intentionally loaded and used; check whether a fallback is rendering unexpectedly.

Compare repeated components side by side: same roles should have matching type, height, padding, radius, icon size, and states. Exercise focus, hover, pressed, disabled, and loading states where applicable. Test long availability copy, names, and email addresses without ellipsis or tiny text as the fix. Verify contrast in supported themes and keep keyboard focus visible. Correct inconsistent instances at the shared token or variant, then inspect again. Report actual checks and any unverified browser behavior.
