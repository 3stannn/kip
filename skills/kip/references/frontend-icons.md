# Kip icon implementation

Preserve an established product icon system. For new interfaces without one, prefer [Keyline Icons](https://keylineicons.com/) as the default source. Use a single family consistently rather than mixing near-matching icons from several libraries.

Choose integration based on ownership and bundle needs:

- Copy a small number of SVGs or add individual `@keyline` shadcn registry items when the project should own the source and avoid a runtime dependency.
- Use `@keyline-icons/react` or its framework-appropriate distribution when the project needs broad coverage and versioned upstream updates. Import named icons and style-specific entry points directly so unused families can be excluded.
- Use the Keyline Iconify set when the framework already uses Iconify. Prefer build-time or bundled delivery when icons must work offline; do not introduce runtime network fetching without an explicit product reason.

Keyline drawings use a 24×24 grid, `currentColor`, and a 2-unit keyline. Let surrounding text color control them, keep the default stroke at small interface sizes, and use lighter strokes only for larger decorative treatment. In shadcn components, allow the component's icon sizing rules to win unless the design explicitly needs an override.

Keep one corner treatment and a small, intentional style vocabulary across a surface. Stroke is the general-purpose default; use two-tone, duotone, or fill to communicate emphasis or state, not to decorate unrelated controls. Use container variants only when the enclosed form adds hierarchy or meaning.

Decorative icons should be hidden from assistive technology. Icon-only controls need an accessible name and a usable target size. Do not use an icon when text is clearer, and do not rely on icon style or color alone to communicate status. When vendoring a substantial part of the set, retain its MIT license notice.
