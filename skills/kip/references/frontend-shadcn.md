# Kip shadcn/ui implementation

## Primary component source

Use [shadcn/ui](https://ui.shadcn.com/) as Kip's main component foundation for compatible React interfaces. Load this reference during component planning even when shadcn/ui has not been installed yet. This preference applies to portfolios, marketing sites, dashboards, tools, and chat or agent interfaces; the component selection follows the actual interface. Start with its components before hand-building equivalent primitives or introducing another component library.

shadcn/ui distributes open component source into the application; it is how the project builds its own component library. Read and modify that local code directly, compose predictable interfaces, and extend shared variants rather than adding workaround wrappers. Keep the accessible behavior of underlying primitives while adapting the design layer. Add only the components needed for the brief. Its defaults are a starting point for Kip's selected visual direction, not a requirement to copy a stock layout.

For an existing shadcn/ui project, reuse its local components and extend them as needed. For a compatible React project without a component system, initialize shadcn/ui and add the components needed for the requested change. For an established alternative component system, preserve it unless the requested work includes adopting shadcn/ui. Text-only repairs do not require introducing dependencies. Non-React projects keep their requested stack; do not migrate a site merely to satisfy this default. Explain a material compatibility limitation when it affects the requested implementation.

## Inspect and set up

Treat shadcn/ui as source-owned design-system infrastructure, not a black-box component package. Preserve the project's configured style, primitive base, aliases, icon library, Tailwind version, and semantic tokens. Use the package runner declared by the project for CLI commands.

For a new setup without an established icon system, use Phosphor Icons following [frontend-icons.md](frontend-icons.md), including icons inside added shadcn/ui source. Preserve an existing project's configured icon family.

Inspect the app's package manifest, lockfile, framework, CSS entry point, import aliases, `components.json`, and existing UI source before changing configuration. Work in the target app or configured workspace package, not Kip's skill folder. Keep the existing package manager and JavaScript or TypeScript choice.

Follow the official [installation guide](https://ui.shadcn.com/docs/installation) for the actual framework. In an existing application, use its existing-project path rather than scaffolding over the app. Configure the required styling, utility function, and aliases without replacing unrelated styles. Initialize only if needed; an existing `components.json` is a reason to inspect, not reinitialize. For a new app, choose a supported setup within the user's requested framework.

For a new project, [shadcn/create](https://ui.shadcn.com/create) can preview a preset and generate its framework-specific setup command. The CLI can also scaffold with `init -t <framework>`; check the supported templates before choosing one. For Laravel, create the application first, then initialize shadcn/ui. Neither path should scaffold over an existing application.

Use the current [CLI reference](https://ui.shadcn.com/docs/cli) and component docs. The following npm examples run from the application package root; adapt the runner for pnpm, yarn, or bun and honor a project-pinned CLI version:

```sh
npx shadcn@latest info --json
npx shadcn@latest init
npx shadcn@latest docs button
npx shadcn@latest add button input label --dry-run
npx shadcn@latest add button input label
```

These illustrate inspection, one-time initialization, API lookup, preview, and adding a minimal component set; do not run initialization unconditionally or install the full catalog. Inspect the preview and added source, dependency changes, and CSS changes. Preserve customized files rather than using overwrite flags. If the installed CLI lacks a documented command, check its help and use the official framework/component instructions instead of guessing flags. If retrieval is blocked, report the limitation and do not label an improvised substitute as a generated shadcn/ui component.

## Configuration and JavaScript

Follow the [components.json reference](https://ui.shadcn.com/docs/components-json). This file configures CLI generation and placement; it is optional when copying component source manually. For CLI use, keep its aliases aligned with the application's actual resolver.

- Preserve the initialized style, primitive base, base color, and CSS-variable strategy. Changing a configuration value alone does not migrate existing source. If migration is requested, review and reconcile local customizations rather than deleting and reinstalling blindly.
- Set `tailwind.css` to the actual global CSS entry point. For Tailwind v4, leave `tailwind.config` empty; for earlier versions, use the real configuration path. Preserve any utility prefix.
- Set `rsc` according to the framework's React Server Component support; keep generated client directives where interaction requires them.
- Preserve the project's language. For [JavaScript](https://ui.shadcn.com/docs/javascript), set `"tsx": false` so the CLI generates `.jsx` components. Do not introduce TypeScript syntax or convert the app just to use shadcn/ui. For a new project without a language requirement, prefer TypeScript.
- In JavaScript projects using path aliases, configure `jsconfig.json` and the framework/bundler resolver consistently. `"@/*": ["./src/*"]` fits a `src` layout; `"@/*": ["./*"]` fits root-level source. Do not copy the wrong directory depth from a documentation example.
- Set `components`, `ui`, `lib`, `hooks`, and `utils` aliases to the intended local or workspace locations. Documentation examples using Lucide do not override Kip's Phosphor default for a new icon system; configure the supported icon option and inspect generated imports.

## Package imports and workspaces

Preserve an existing alias strategy. When using [package imports](https://ui.shadcn.com/docs/package-imports), declare private `#...` specifiers in the nearest `package.json` and use the same roots in `components.json`. For TypeScript, use version 5 or later with `moduleResolution: "bundler"` and `resolvePackageJsonImports: true`. These aliases do not also require `compilerOptions.paths`.

For example, a TypeScript app with source under `src` can map `#components/*` to `./src/components/*.tsx`, `#lib/*` to `./src/lib/*.ts`, and `#hooks/*` to `./src/hooks/*.ts`. Its CLI aliases then use `#components`, `#components/ui`, `#lib`, `#hooks`, and `#lib/utils`. Adapt extensions to `.jsx` and `.js` for JavaScript, and remove `src/` only when the real source tree warrants it.

An extension in the import target pattern lets generated specifiers omit that extension; a target such as `./src/components/*` preserves the source extension. Check the matched target and generated file instead of appending extensions by guesswork.

In monorepos, use package imports within a workspace and package exports for shared UI across workspaces. Run the CLI in the consuming app with aliases pointing to the shared package where appropriate. Keep app-local components local and reuse the shared UI package instead of generating duplicate primitives. Verify the package dependency, exported paths, shared CSS entry point, and resolution from the consuming app.

Configured registry namespaces may use URL templates and environment-variable references for authentication. Reuse the project's registry configuration; keep credentials in the environment, not literal configuration values or generated source.

## Choose components for the task

Consult the [component catalog](https://ui.shadcn.com/docs/components) and read the selected component's current API. Search configured registries before building a custom primitive; do not guess an unspecified registry. Use real generated or existing local components, imported through the project's actual aliases. An import from `@/components/ui/button` is appropriate only if that alias and file exist; do not invent a runtime package import for a local component.

| Interface need | Starting point |
| --- | --- |
| Calls to action and forms | Button, Field or Label, Input, Textarea, Checkbox, Select or Native Select |
| Navigation and disclosure | Navigation Menu, Sheet, Breadcrumb, Tabs, Accordion |
| Menus and overlays | Dropdown Menu, Dialog, Alert Dialog, Popover, Tooltip |
| Repeated content and status | Card where grouping warrants it, Table, Badge, Alert, Skeleton |
| Operational screens | Sidebar, data table composition, pagination, charts only when required |
| Chat and agent interfaces | Message, Message Scroller, Trace, Code Block, and the relevant AI Elements compositions |

Treat this table as a selection aid, not a page checklist. A marketing site does not need a sidebar or table merely because they are available. Keep semantic headings, sections, links, lists, and layout containers where no component is needed. Use a navigation link for a destination and a button for an action; compose with the configured primitive's supported API without nesting interactive elements. Read local source and base-specific docs before using trigger composition such as `asChild` or `render`.

If the official catalog lacks a needed component, inspect the [registry directory](https://ui.shadcn.com/docs/directory) for a suitable maintained option, checking its source, dependencies, and compatibility. Otherwise compose a local component from the existing primitives with the same tokens and API conventions. Do not install a second general-purpose library just to fill one gap.

## AI Elements for chat and agent interfaces

Use the [shadcn/ui AI Elements patterns](https://ui.shadcn.com/docs/ai-elements) for relevant agentic UI. They are compositions copied into the project, not a separate runtime package to install. Consult the selected pattern's current page and dependencies; do not install the whole catalog or assume that every primitive base exposes the same API.

Start chat composition with Message turns inside Message Scroller. Use Trace for tool calls and step/status presentation, Code Block for code and terminal output, and the appropriate patterns for prompt input, plans, sources, confirmations, and subagent results. Render application-provided events and user-visible reasoning summaries; do not invent agent activity or require access to private model reasoning.

For a new chatbot whose brief fits Next.js and the AI SDK, consider the official [chatbot template](https://github.com/shadcn-ui/chatbot-template). Keep a requested or existing stack. Existing AI SDK Elements copies can remain in place; migrate only when the task calls for it, using the selected pattern's migration guidance and preserving exports, props, and behavior.

## Compose and theme

Prefer composition over reinvention:

- Use existing components and their built-in variants before custom markup or visual overrides. Use semantic roles such as `background`, `foreground`, `primary`, `muted`, and `destructive` rather than raw palette colors or manual dark-mode pairs.
- Preserve component anatomy and accessibility contracts: grouped items belong inside their group, tab triggers inside the tab list, overlays need titles, avatars need fallbacks, and form controls carry their validation and disabled semantics.
- Use the design-system primitives for alerts, empty states, separators, skeletons, badges, menus, overlays, and feedback instead of recreating them with styled `div` elements. Compose full card and field structures so hierarchy remains explicit.
- Keep `className` focused on layout and local composition. Change shared tokens or component variants when the design system itself should change; do not scatter one-off color, type, radius, stacking, or icon-size overrides across call sites.
- Follow the configured primitive API. Custom triggers use the mechanism appropriate to the project's base, and icons come from the configured icon library rather than an assumed default.

Apply Kip's selected visual direction through the project's [theme tokens](https://ui.shadcn.com/docs/theming) and shared variants. Read [frontend-system.md](frontend-system.md) and map component typography, control geometry, and variants to that shared system. Use the selected single family throughout; override undersized library defaults in shared source rather than at each call site. Preserve the selected portfolio or non-portfolio composition unless the brief or existing brand overrides it. Map background/foreground, primary and its foreground, muted, border, input, ring, and destructive roles deliberately; define dark tokens when dark mode is supported. Keep readable contrast and focus indicators. Component adoption does not prescribe a generic dashboard layout or replace the content-based layout guidance.

For a new setup, prefer `tailwind.cssVariables: true`. Define surface/foreground pairs in `:root` and `.dark`, using `primary` with `primary-foreground`, and equivalent pairs for card, popover, secondary, muted, and accent surfaces. Map chart and sidebar tokens when those components are used. Keep focus-ring, input, border, and destructive roles legible in both themes.

For Tailwind v4, expose CSS color tokens through `@theme inline`, for example `--color-warning: var(--warning)` and `--color-warning-foreground: var(--warning-foreground)`, after defining both variables in each supported theme. Use the corresponding semantic utilities. Preserve the generated radius scale derived from `--radius` and adjust shared geometry deliberately. For earlier Tailwind versions, use their supported configuration instead of pasting v4 directives.

The base color supplies initial token values; theme changes belong in the shared CSS tokens. Preserve a project's existing inline-utility strategy when `cssVariables` is false. Do not switch that installation-time strategy during an unrelated component edit.

## Verify the integration

When adding or updating registry code, preview changes with the CLI's dry-run and diff facilities, read every added file, correct aliases and icon imports, and preserve local modifications. Adapt shared variants only as far as the requested scope warrants. Keep interactive components within the framework's required client boundaries and preserve server-rendered content where possible.

Run the project's build, typecheck, and relevant tests as available. In the browser, exercise changed controls, keyboard traversal, focus return and Escape for overlays, form validation, disabled/loading states, and responsive reflow. Check contrast, supported dark mode, console output, and horizontal overflow. A component's accessible foundation does not prove that the composed page is accessible. Report the components actually added or reused and the interactions actually verified; distinguish compilation from browser evidence.

For streaming chat, also verify scroll anchoring, history loading without jumps, user-controlled follow behavior, cancellation, failed tool states, and long code or message content. Updating headless dependencies can bring upstream behavior fixes; local component source needs deliberate review and integration rather than blind regeneration over customizations.

Installation, components.json, package imports, theming, and JavaScript guidance incorporates the documentation supplied by the user on October 29, 2026. Recheck the relevant API when implementing; this guide does not freeze a particular release or primitive base.
