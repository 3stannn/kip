# Kip icon implementation

Preserve an established product icon system. For new interfaces without one, use [Phosphor Icons](https://phosphoricons.com/) as the default source across websites, portfolios, and app screens. Use a single family consistently rather than mixing near-matching icons from several libraries.

Choose integration based on ownership and bundle needs:

- Copy a small number of official Phosphor SVGs when the project should own the source and avoid a runtime dependency.
- Use [`@phosphor-icons/react`](https://github.com/phosphor-icons/react) for React or the framework-appropriate Phosphor distribution. Import named icons so unused icons can be excluded; avoid namespace imports or a whole-catalog lookup. In React Server Components, use `@phosphor-icons/react/ssr`.
- Use the Phosphor set when the framework already uses Iconify. Prefer build-time or bundled delivery when icons must work offline; do not introduce runtime network fetching without an explicit product reason.

Phosphor provides `thin`, `light`, `regular`, `bold`, `fill`, and `duotone` weights. Use `regular` by default and let surrounding text color control icons through `currentColor`. Set their rendered size with the component API or CSS; preserve the source viewBox and use the weight API rather than overriding SVG stroke width. In shadcn components, allow the component's icon sizing rules to win unless the design explicitly needs an override.

Keep a small, intentional weight vocabulary across a surface. Reserve `fill`, `bold`, or `duotone` for emphasis or state, not to decorate unrelated controls. Keep neighboring controls optically consistent.

Decorative icons should be hidden from assistive technology. Icon-only controls need an accessible name and a usable target size. Do not use an icon when text is clearer, and do not rely on icon style or color alone to communicate status. When vendoring a substantial part of the set, retain its MIT license notice.
