# Kip Tailwind implementation

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
