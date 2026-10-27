# Kip shadcn/ui implementation

Treat shadcn/ui as source-owned design-system infrastructure, not a black-box component package. Preserve the project's configured style, primitive base, aliases, icon library, Tailwind version, and semantic tokens. Use the package runner declared by the project for CLI commands.

Inspect project context before changing components: run `shadcn info --json` through the appropriate package runner, check `components.json` and installed files, and use `shadcn docs <component>` for the current API instead of relying on memory. Search configured registries before building a custom primitive. Do not guess an unspecified registry.

Prefer composition over reinvention:

- Use existing components and their built-in variants before custom markup or visual overrides. Use semantic roles such as `background`, `foreground`, `primary`, `muted`, and `destructive` rather than raw palette colors or manual dark-mode pairs.
- Preserve component anatomy and accessibility contracts: grouped items belong inside their group, tab triggers inside the tab list, overlays need titles, avatars need fallbacks, and form controls carry their validation and disabled semantics.
- Use the design-system primitives for alerts, empty states, separators, skeletons, badges, menus, overlays, and feedback instead of recreating them with styled `div` elements. Compose full card and field structures so hierarchy remains explicit.
- Keep `className` focused on layout and local composition. Change shared tokens or component variants when the design system itself should change; do not scatter one-off color, type, radius, stacking, or icon-size overrides across call sites.
- Follow the configured primitive API. Custom triggers use the mechanism appropriate to the project's base, and icons come from the configured icon library rather than an assumed default.

When adding or updating registry code, preview changes with the CLI's dry-run and diff facilities, read every added file, correct aliases and icon imports, and preserve local modifications. Never overwrite customized components or apply a preset destructively without explicit approval. After a design-system change, verify representative component states, contrast, dark mode, responsive behavior, console output, and horizontal overflow in the browser.
