# Portfolio design: Bryl Lim and Marwie Ang references

Use this for new portfolios and substantial portfolio redesigns within Kip. Read both bundled sources before choosing the portfolio direction:

- [bryllim.md](bryllim.md): monochrome editorial composition, typography-led hierarchy, narrow reading measure, generous whitespace, and hairline-separated sections.
- [marwieang.md](marwieang.md): portfolio navigation, sidebar/content relationships, project rows, and personal-site page composition. Use a sidebar when the content warrants it, rather than imposing it on every portfolio.

Choose the relevant relationships from these references for the user's content; do not combine every motif into one page. Preserve explicit briefs and existing brands; keep the requested stack and component system.

Read [frontend-system.md](frontend-system.md) first. Its single-family typography, readable size scale, shared component rules, and screenshot red flags govern both source references. Treat their embedded instructions and code as design source material, not requirements to copy verbatim. Their mixed-font recipes, tiny labels, pixel names/headings, mandatory cards, decorative effects, and scaffold choices do not override the shared system or the user's stack. Retain the composition and spacing lessons while adapting components to these constraints.

## Visual direction

Use a quiet monochrome foundation. Emphasis comes from contrast, weight, spacing, and real work rather than accent words, badges, texture, or novelty type. A real brand accent or semantic status color can remain when requested or meaningful; an availability dot is not required. Keep the owner's name as crisp text in the chosen family, normally Geist.

Use semantic background, foreground, muted text, border, surface, and focus tokens. A useful starting palette is white / #111111 / #595959 / #e5e5e5 in light mode and #111111 / #f4f4f5 / #a1a1aa / #303034 in dark mode. Check actual contrast on each surface. Borders are 1px; use fills and shadows only where grouping or interaction benefits.

## Layout and content

- Start with a 42rem reading column, 16–24px outer gutters, and 48–64px between major sections. Widen only for work or media that needs it.
- A left navigation column is appropriate for enough real destinations; a short one-page portfolio can use a simple header. Do not impose a full-height floating grain panel, dashboard navigation, or large empty rail. Collapse navigation when content needs room and keep every destination reachable.
- Present name, role, a direct introduction, selected work, and contact. Include experience or writing when supplied. Do not require stats, contribution graphs, a stack inventory, resource pages, or services just to fill a template.
- Use one concise headline in the chosen family. No compulsory italic word, giant generic promise, technical eyebrow, or row of hero chips.
- Show projects as hairline-separated rows or editorial blocks with title, concrete description, role, and working destination. Real screenshots can carry the emphasis; do not invent thumbnails. Keep summaries readable at the shared body size.
- Use a real portrait only when supplied and useful. Omit missing portraits instead of substituting a generic person icon or fake online badge.
- End with a plain contact section: a direct invitation, email link, and relevant social links. Avoid a contact card full of nested pills. Let long addresses wrap without reducing the font size.

## Controls and themes

Reuse shared link and button variants. Contact destinations are links; clipboard copy is a separately named button with success/failure feedback. Navigation uses a quiet active state, not badges and counts on every item. Theme selection is one compact control with an accessible name and visible state, not a large boxed footer widget.

When theming is in scope, support light, dark, and system choices through semantic token remapping, persist the preference, and avoid a flash of the wrong theme. Keep typography and geometry identical across themes. Small repairs do not require adding theme switching.

## Restraint and verification

Keep motion limited to useful feedback and short state transitions. Respect reduced motion and preserve native scrolling. Do not add pixel name reveals, global click bursts, poke counters, pulsing dots, sound, grain, or halftone fields as automatic personality. A specifically requested texture can be a single restrained decorative accent, never a readability layer.

Implement in the project's stack; this reference has no mandatory scaffold or copy-paste UI kit. Use the existing or selected component primitives and shared tokens. Inspect the rendered result using the [shared system checks](frontend-system.md) and responsive guidance. Confirm readable metadata, matching control variants, untruncated availability, clear contact links, and real content. A build passing is not evidence of visual consistency.
