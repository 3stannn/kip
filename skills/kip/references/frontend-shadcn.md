# Kip shadcn/ui implementation

## Default for website work

Use [shadcn/ui](https://ui.shadcn.com/) components by default when Kip creates a compatible React website or adds or edits its UI. Load this reference during component planning even when shadcn/ui has not been installed yet. This preference applies to portfolios, marketing sites, and working application screens; the component selection follows the actual interface.

For an existing shadcn/ui project, reuse its local components and extend them as needed. For a compatible React project without a component system, initialize shadcn/ui and add the components needed for the requested change. For an established alternative component system, preserve it unless the requested work includes adopting shadcn/ui. Text-only repairs do not require introducing dependencies. Non-React projects keep their requested stack; do not migrate a site merely to satisfy this default. Explain a material compatibility limitation when it affects the requested implementation.

## Inspect and set up

Treat shadcn/ui as source-owned design-system infrastructure, not a black-box component package. Preserve the project's configured style, primitive base, aliases, icon library, Tailwind version, and semantic tokens. Use the package runner declared by the project for CLI commands.

Inspect the app's package manifest, lockfile, framework, CSS entry point, import aliases, `components.json`, and existing UI source before changing configuration. Work in the target app or configured workspace package, not Kip's skill folder. Keep the existing package manager and JavaScript or TypeScript choice.

Follow the official [installation guide](https://ui.shadcn.com/docs/installation) for the actual framework. In an existing application, use its existing-project path rather than scaffolding over the app. Configure the required styling, utility function, and aliases without replacing unrelated styles. Initialize only if needed; an existing `components.json` is a reason to inspect, not reinitialize. For a new app, choose a supported setup within the user's requested framework.

Use the current [CLI reference](https://ui.shadcn.com/docs/cli) and component docs. The following npm examples run from the application package root; adapt the runner for pnpm, yarn, or bun and honor a project-pinned CLI version:

```sh
npx shadcn@latest info --json
npx shadcn@latest init
npx shadcn@latest docs button
npx shadcn@latest add button input label --dry-run
npx shadcn@latest add button input label
```

These illustrate inspection, one-time initialization, API lookup, preview, and adding a minimal component set; do not run initialization unconditionally or install the full catalog. Inspect the preview and added source, dependency changes, and CSS changes. Preserve customized files rather than using overwrite flags. If the installed CLI lacks a documented command, check its help and use the official framework/component instructions instead of guessing flags. If retrieval is blocked, report the limitation and do not label an improvised substitute as a generated shadcn/ui component.

## Choose components for the task

Consult the [component catalog](https://ui.shadcn.com/docs/components) and read the selected component's current API. Search configured registries before building a custom primitive; do not guess an unspecified registry. Use real generated or existing local components, imported through the project's actual aliases. An import from `@/components/ui/button` is appropriate only if that alias and file exist; do not invent a runtime package import for a local component.

| Interface need | Starting point |
| --- | --- |
| Calls to action and forms | Button, Field or Label, Input, Textarea, Checkbox, Select or Native Select |
| Navigation and disclosure | Navigation Menu, Sheet, Breadcrumb, Tabs, Accordion |
| Menus and overlays | Dropdown Menu, Dialog, Alert Dialog, Popover, Tooltip |
| Repeated content and status | Card where grouping warrants it, Table, Badge, Alert, Skeleton |
| Operational screens | Sidebar, data table composition, pagination, charts only when required |

Treat this table as a selection aid, not a page checklist. A marketing site does not need a sidebar or table merely because they are available. Keep semantic headings, sections, links, lists, and layout containers where no component is needed. Use a navigation link for a destination and a button for an action; compose with the configured primitive's supported API without nesting interactive elements. Read local source and base-specific docs before using trigger composition such as `asChild` or `render`.

## Compose and theme

Prefer composition over reinvention:

- Use existing components and their built-in variants before custom markup or visual overrides. Use semantic roles such as `background`, `foreground`, `primary`, `muted`, and `destructive` rather than raw palette colors or manual dark-mode pairs.
- Preserve component anatomy and accessibility contracts: grouped items belong inside their group, tab triggers inside the tab list, overlays need titles, avatars need fallbacks, and form controls carry their validation and disabled semantics.
- Use the design-system primitives for alerts, empty states, separators, skeletons, badges, menus, overlays, and feedback instead of recreating them with styled `div` elements. Compose full card and field structures so hierarchy remains explicit.
- Keep `className` focused on layout and local composition. Change shared tokens or component variants when the design system itself should change; do not scatter one-off color, type, radius, stacking, or icon-size overrides across call sites.
- Follow the configured primitive API. Custom triggers use the mechanism appropriate to the project's base, and icons come from the configured icon library rather than an assumed default.

Apply Kip's selected visual direction through the project's [theme tokens](https://ui.shadcn.com/docs/theming) and shared variants. Read [frontend-system.md](frontend-system.md) and map component typography, control geometry, and variants to that shared system. Use the selected single family throughout; override undersized library defaults in shared source rather than at each call site. Preserve the selected portfolio or non-portfolio composition unless the brief or existing brand overrides it. Map background/foreground, primary and its foreground, muted, border, input, ring, and destructive roles deliberately; define dark tokens when dark mode is supported. Keep readable contrast and focus indicators. Component adoption does not prescribe a generic dashboard layout or replace the content-based layout guidance.

## Verify the integration

When adding or updating registry code, preview changes with the CLI's dry-run and diff facilities, read every added file, correct aliases and icon imports, and preserve local modifications. Adapt shared variants only as far as the requested scope warrants. Keep interactive components within the framework's required client boundaries and preserve server-rendered content where possible.

Run the project's build, typecheck, and relevant tests as available. In the browser, exercise changed controls, keyboard traversal, focus return and Escape for overlays, form validation, disabled/loading states, and responsive reflow. Check contrast, supported dark mode, console output, and horizontal overflow. A component's accessible foundation does not prove that the composed page is accessible. Report the components actually added or reused and the interactions actually verified; distinguish compilation from browser evidence.

Official installation, CLI, catalog, and theming references checked October 28, 2026. Recheck the relevant API when implementing; this guide does not freeze a particular release or primitive base.
