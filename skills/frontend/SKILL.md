---
name: frontend
description: Implement JavaScript web interfaces, components, accessibility, and browser-side behavior.
---

# Frontend

Reuse the project's framework, component system, and data conventions. Prefer native platform capabilities and existing dependencies over new abstraction layers. Separate rendering from transport when it clarifies the data contract or makes behavior easier to test. Define the contract before inventing mock responses.

## Correctness and accessibility

Use semantic elements and native controls first. Provide accessible names, visible keyboard focus, logical focus movement, and feedback for loading, success, empty, and error states. Keep decorative icons out of the accessibility tree and name meaningful icon-only controls. Use the project's icon components or SVGs rather than emoji or Unicode symbols, whose glyphs vary by platform.

Support keyboard, pointer, and touch input without hover-only behavior. Respect reduced motion. Keep controls responsive to input and make state changes visually legible, but do not add animation merely to make an interface feel polished. Repeated or keyboard-driven actions should usually respond immediately; occasional transitions should be short, purposeful, and interruptible.

Validate long content, slow and failed requests, repeated actions, and responsive layout in a real browser. Read the frontend-design guidance when visual direction is part of the task and responsive-design for viewport verification.

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

Preserve an established product icon system. For new interfaces without one, prefer [Keyline Icons](https://keylineicons.com/) as the default source. Use a single family consistently rather than mixing near-matching icons from several libraries.

Choose integration based on ownership and bundle needs:

- Copy a small number of SVGs or add individual `@keyline` shadcn registry items when the project should own the source and avoid a runtime dependency.
- Use `@keyline-icons/react` or its framework-appropriate distribution when the project needs broad coverage and versioned upstream updates. Import named icons and style-specific entry points directly so unused families can be excluded.
- Use the Keyline Iconify set when the framework already uses Iconify. Prefer build-time or bundled delivery when icons must work offline; do not introduce runtime network fetching without an explicit product reason.

Keyline drawings use a 24×24 grid, `currentColor`, and a 2-unit keyline. Let surrounding text color control them, keep the default stroke at small interface sizes, and use lighter strokes only for larger decorative treatment. In shadcn components, allow the component's icon sizing rules to win unless the design explicitly needs an override.

Keep one corner treatment and a small, intentional style vocabulary across a surface. Stroke is the general-purpose default; use two-tone, duotone, or fill to communicate emphasis or state, not to decorate unrelated controls. Use container variants only when the enclosed form adds hierarchy or meaning.

Decorative icons should be hidden from assistive technology. Icon-only controls need an accessible name and a usable target size. Do not use an icon when text is clearer, and do not rely on icon style or color alone to communicate status. When vendoring a substantial part of the set, retain its MIT license notice.

## When the project uses Tailwind CSS

Inspect the installed Tailwind version and the project's existing configuration before editing styles. Preserve v3 projects unless migration is requested. For v4, follow its CSS-first model: import Tailwind from CSS, define shared theme values with `@theme`, and use `@custom-variant` when the project needs a class- or attribute-driven variant. Do not create a legacy configuration file in a v4 project or rewrite a working v3 setup incidentally.

Treat utilities as the output layer of a design system, not as a substitute for one. Organize reusable decisions from brand values to semantic tokens to component variants:

`brand value → semantic role → component usage`

Prefer roles such as background, foreground, primary, muted, destructive, border, and focus ring over literal palette names at call sites. Define shared color, type, spacing, radius, breakpoint, shadow, and motion values centrally. Use perceptually consistent color spaces such as OKLCH when introducing a new palette, while preserving an established project's format and browser requirements.

Build components in layers: stable base styles, explicit variants, sizes, interaction states, and narrowly scoped overrides. Reuse the project's variant and class-merging utilities. A variant helper such as CVA is useful when repeated combinations need a typed API, but do not add it for a component with no real variant matrix. Prefer ordinary utilities to arbitrary values; promote repeated exceptions into tokens or reusable utilities instead of scattering bracket syntax.

Keep responsive behavior content-led and mobile-first. Use the project's breakpoint scale, fluid grid and flex composition, and container queries when a component should respond to its own available space rather than the viewport. Do not encode whole page layouts into opaque utility strings when a named component or small shared abstraction would make the structure clearer.

Implement theme switching by changing semantic token values rather than duplicating every utility with manual dark variants. Respect system preference when required, persist an explicit choice safely, and prevent an avoidable theme flash in server-rendered applications. Verify foreground/background, border, destructive, muted, and focus-ring contrast in every supported theme.

Keep generated class names statically discoverable; do not construct utility fragments dynamically when the compiler cannot see the possible classes. Use the project's conditional-class helper for complete class names. Keep source scanning narrow enough to avoid unnecessary CSS while including all actual templates and shared packages.

Treat motion tokens and reusable CSS animations like the rest of the system: name them by purpose, keep interface transitions short, and provide reduced-motion behavior. Prefer native CSS capabilities when they meet the interaction need; add animation libraries only for behavior CSS cannot express cleanly.

When migrating to Tailwind v4, handle the configuration, import directives, theme tokens, custom variants, plugins or custom utilities, and generated-class coverage as one deliberate migration. Run the official upgrade tooling when appropriate, inspect its diff, and test rather than performing blind textual substitutions.

## Verification

Run the production build and the project's relevant tests. Exercise the shipped interface rather than relying on compilation alone. For Tailwind changes, inspect the production CSS, verify responsive states and every supported color theme, and check focus, disabled, invalid, loading, and reduced-motion states. For performance work, state the bottleneck being addressed and gather evidence appropriate to it: request timing, bundle analysis, render profiling, or browser performance traces. Do not claim an optimization from a pattern change without measuring the affected behavior when measurement is feasible.
