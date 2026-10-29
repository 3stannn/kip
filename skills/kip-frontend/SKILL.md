---
name: kip-frontend
description: Kip-specific frontend guidance. Use within an active Kip task or when explicitly requested for Kip.
---

# Frontend

This guidance supports Kip's assigned worker or reviewer scope. The root owns team dispatch, profile settings, and integration; do not spawn additional agents from a supporting role. Apply only sections relevant to the change.

Reuse the project's framework, component system, and data conventions. Prefer native platform capabilities and existing dependencies over new abstraction layers. Separate rendering from transport when it clarifies the data contract or makes behavior easier to test. Define the contract before inventing mock responses.

## Shared typography and components

Read [frontend-system.md](../kip/references/frontend-system.md) for website creation and typography or component changes. Implement its one-family rule (Geist by default), semantic type scale with consistent increments, and shared component variants. Different weights, true italics, and supported variable styles within that family are welcome; map faces and sizes to reusable roles. Native controls inherit the family; library components must use the same readable tokens. Fix repeated inconsistencies in shared source rather than with per-instance overrides.

## Primary component foundation: shadcn/ui

For UI creation and component edits, read [frontend-shadcn.md](../kip/references/frontend-shadcn.md). Use shadcn/ui as the main component foundation in compatible React applications, including setting it up when the app has no established component system. Reuse and customize the local source before generating more or hand-building an equivalent primitive. For chat and agent interfaces, consult its AI Elements patterns and compose only the pieces needed. Preserve an established alternative system, non-React stack, and the scope of small repairs. Apply the selected brand or Kip visual direction through shared tokens and variants, with working interactions and accessible composition. New icon systems use Phosphor Icons.

## Correctness and accessibility

For expressive marketing pages, implement the chosen type and composition as real responsive content. Load the intended fonts, reserve media aspect ratios, keep decorative layers outside the interaction and accessibility paths, and give fixed navigation appropriate document and focus clearance. Deliver working destinations and controls before adding animation. Scroll effects must preserve readable static content, native scrolling, and reduced-motion behavior; a static reference is not evidence that a particular animation exists.

For each changed interaction, identify the user action, resulting visible state, and failure or cancellation path. Reuse the existing component when it can express that contract. Do not add a parallel component system, demonstration dashboard, or decorative feature merely to make the output look complete. Return changed files and interactions actually exercised to Kip's root; leave orchestration and profile state there.

Use semantic elements and native controls first. Provide accessible names, visible keyboard focus, logical focus movement, and feedback for loading, success, empty, and error states. Keep decorative icons out of the accessibility tree and name meaningful icon-only controls. Use the project's icon components or SVGs rather than emoji or Unicode symbols, whose glyphs vary by platform.

Support keyboard, pointer, and touch input without hover-only behavior. Respect reduced motion. Keep controls responsive to input and make state changes visually legible, but do not add animation merely to make an interface feel polished. Repeated or keyboard-driven actions should usually respond immediately; occasional transitions should be short, purposeful, and interruptible.

Validate long content, slow and failed requests, repeated actions, and responsive layout in a real browser. Read the frontend-design guidance when visual direction is part of the task and responsive-design for viewport verification.

## React component and file boundaries

For React work, plan the component hierarchy and file ownership before implementation. Follow the project's existing feature folders or framework route conventions. For new apps, keep `App.tsx` (or `App.jsx`) focused on providers, the app shell, and route composition; import substantial pages, layout components, and independent features from their own modules. Do not deliver a whole multi-page app in the root file with only a generated button in `components/ui`.

Extract a component when it represents a distinct page, reusable UI pattern, substantial section, or interaction with its own state and behavior. A component can deserve its own module even when used once. Small private helpers can stay beside their owning component; do not split every element into a file or enforce arbitrary line limits. Moving the monolith into a single `components.tsx` or `Home.tsx` does not resolve mixed responsibilities.

For new client-routed React apps without an established structure, use named component files grouped by responsibility, with route components under `pages/`.

Create actual module boundaries rather than empty folders while leaving implementations in `App.tsx`. Import the named modules where they are composed. Use descriptive PascalCase filenames for application components and pages; preserve existing library conventions such as shadcn's `button.tsx`. Adapt domain folder and component names to the product, create only features the brief needs, and add `hooks/` only when extracted behavior needs it. Keep feature-only data, types, and helpers with their feature; use shared modules when there is a real shared owner. Next.js and other file-routed frameworks retain their native route and server/client boundaries rather than adopting a client-routed structure literally. Keep imports flowing from app/pages to features and shared primitives; shared components should not import pages or `App`.

### Structure as the app grows

For larger apps with distinct product domains, prefer feature ownership over a growing global component folder. Use this structure as the reference, adapting extensions to JavaScript or TypeScript:

```text
src/
  assets/                     # bundled images, fonts, icons
  components/
    common/                   # shared Button/, Modal/, Input/
    layout/                   # shared Header/, Footer/, Sidebar/
    ui/                       # existing generated primitives, when used
  features/
    auth/
      components/
      hooks/
      services/
      authSlice.ts            # only when the chosen state library needs it
      index.ts                # optional deliberate feature API
    dashboard/
    profile/
  pages/                      # route views: Home/, About/, NotFound/
  routes/                     # AppRoutes, route guards when needed
  hooks/                      # hooks shared across features
  context/                    # app-wide providers when needed
  store/                      # app-wide state setup when needed
  services/                   # shared API client and external integrations
  utils/                      # shared pure helpers and constants
  types/                      # shared TypeScript contracts
  styles/                     # global styles, tokens, theme
  config/                     # public app configuration
  App.tsx                     # provider and shell composition
  main.tsx                    # framework entry point
tests/                        # cross-feature/integration tests when needed
```

- Feature components, hooks, API calls, types, and state belong inside their feature until multiple features need them. Pages compose route views from those features. Shared folders contain genuinely shared code; avoid parallel copies in `features/auth/services` and top-level `services`.
- A component or page with supporting files can have its own directory, such as `components/common/Button/Button.tsx`, `Button.module.css`, and a meaningful colocated `Button.test.tsx`. A single component file is enough when there are no supporting files. Keep the existing styling and testing conventions; do not generate CSS modules, test stubs, or wrapper folders just to fill the tree.
- An `index.ts` can expose a deliberate component or feature API; it is optional. Avoid indiscriminate barrel exports, circular imports, and importing an entire feature merely to reach one helper. Preserve the project's established import style.
- Extract `routes/AppRoutes.tsx` when routing has enough configuration to warrant its own module; `App` can compose it. Add route guards only when the product needs them; client guards do not enforce server authorization.
- Choose one coherent owner for each piece of state. Context providers and a Redux/Zustand-style store are conditional options, not required parallel systems. Do not install state libraries, Axios, or a fetching hook merely because they appear in an example tree. Keep server data under the project's existing data-fetching conventions.
- Keep imported assets in `src/assets` and assets requiring unchanged public URLs in `public` according to the build tool. Retain the tool's HTML entry location: for Vite, `index.html` stays at the project root. Use the existing lint/config filenames, entry point, language, and styling system. Create a sanitized `.env.example` when configuration needs documentation; browser-exposed environment values are public.

Scale the structure to the app. Apply the ownership rules without generating every directory or reorganizing unrelated code during a small edit.

Use explicit props and composition across boundaries. Keep state with the component that owns it, lifting shared state to the closest common owner. Extract custom hooks for cohesive reusable stateful behavior, not to hide an entire page's unrelated logic; hooks share logic, not a single state instance. Avoid introducing context or a global store solely because files were separated.

When adapting bundled design examples, preserve their component and route boundaries in the target stack instead of concatenating the reference into `App.tsx`. For refactors, preserve DOM structure, styling hooks, stable keys, state lifetime, URLs, focus behavior, and interactions unless the requested change requires otherwise. Define component types at module scope so extraction does not create remounts on every render.

### Source organization review

Before delivery, the worker and independent reviewer inspect the actual source tree, root file, route modules, and largest changed components. Confirm that substantial pages/features live in appropriately named modules, repeated UI uses shared components, and each module has a coherent responsibility. Check imports for cycles, duplicated state or logic, and unnecessary wrappers. A tiny `App` that delegates everything to another monolith also fails this check. Resolve mixed responsibilities within the changed scope; small fixes do not authorize reorganizing unrelated legacy code.

Run the project's relevant build, type/lint checks, and behavior tests when available. After extraction, exercise affected routes and stateful interactions and compare the rendered result, including keyboard/focus behavior. A successful build or screenshot alone does not verify source organization. Report the important boundaries created and any checks unavailable in the host.

These defaults apply React's [component hierarchy guidance](https://react.dev/learn/thinking-in-react), [file extraction guidance](https://react.dev/learn/importing-and-exporting-components), and [custom hook guidance](https://react.dev/learn/reusing-logic-with-custom-hooks). The folder example and root-file convention are Kip defaults, not React requirements.

## React state and rendering

When working in React or a React framework:

- Derive values during render instead of mirroring them in state. Put interaction logic in event handlers and reserve effects for synchronization with external systems.
- Keep effect dependencies precise and primitive where practical, and clean up subscriptions and global listeners. Do not define component types inside other components.
- Use functional state updates when the next value depends on the previous one. Lazily initialize expensive state and keep transient, high-frequency values out of render state when a ref is sufficient.
- Do not memoize simple expressions by reflex. Optimize measured expensive work, stabilize identities only where they affect behavior, and split components or subscriptions when that narrows costly updates.
- Use transitions or deferred values for genuinely non-urgent expensive rendering so typing and direct manipulation remain responsive.

## Data flow and performance

Prioritize structural performance issues before micro-optimizations:

1. Eliminate request waterfalls. Start independent work together, await only in branches that need the result, and stream behind useful boundaries when the framework supports it.
2. Control shipped code. Prefer direct, statically analyzable imports; load genuinely heavy optional features only when needed; and defer non-critical third-party scripts until after the primary experience is usable.
3. Keep server and client responsibilities clear. Minimize serialized data crossing the boundary, avoid mutable request state at module scope, cache only with an understood lifetime, and authenticate server actions like any other server endpoint.
4. Deduplicate shared client requests and global listeners. Keep persistent browser storage minimal, versioned, and tolerant of malformed or older data.
5. Optimize JavaScript loops, lookups, DOM writes, and rendering only when their cost is plausible or measured. Prefer clear code when the difference is immaterial.

Keep secrets and authorization enforcement on the server. Treat client checks as user experience, not security boundaries.

## Icons

When adding or changing icons, read [frontend-icons.md](../kip/references/frontend-icons.md). Use Phosphor Icons for new interfaces without an established icon system.

## When the project uses Tailwind CSS

Read [frontend-tailwind.md](../kip/references/frontend-tailwind.md) only for this stack or requested integration.

## Verification

Run the production build and the project's relevant tests. Exercise the shipped interface rather than relying on compilation alone. For performance work, state the bottleneck being addressed and gather evidence appropriate to it: request timing, bundle analysis, render profiling, or browser performance traces. Do not claim an optimization from a pattern change without measuring the affected behavior when measurement is feasible.
