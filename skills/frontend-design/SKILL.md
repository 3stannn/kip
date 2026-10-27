---
name: frontend-design
description: Design web interfaces when layout, typography, visual hierarchy, or brand expression is part of the task.
---

# Frontend Design

Treat visual design as a sequence of decisions tied to the brief, not a coat of polish applied after a generic layout. Preserve explicit brand direction and existing product conventions. When the brief leaves room, use that freedom to make choices that belong to this subject rather than falling back to a fashionable house style.

## Establish the direction

Identify the subject, audience, primary action, existing identity, real content, and assets that actually exist. Do not design around photography, product screens, testimonials, or metrics that are unavailable. For an open brief, state a reasonable interpretation and proceed; ask only when a missing fact would materially change the result.

Distinguish pages people read from application screens people work in. A marketing page can use a strong narrative composition and a memorable visual moment. A dashboard, editor, settings screen, or operational tool should favor information density, hierarchy, predictable controls, and quiet repeatable surfaces. A product page may contain real app fragments, but those fragments should look and behave like the product rather than like decorative mockups.

Before choosing decoration:

1. Inventory concrete things unique to the subject: its name, language, place, materials, rituals, constraints, artifacts, outputs, shapes, and real numbers.
2. Outline the content as claims and evidence. Let that argument determine section order; remove sections that have no job.
3. Form one visual concept from the inventory. Apply the competitor test: if the same concept works unchanged for the nearest competitor, it is still a category default.
4. Write a compact design plan covering palette, typography, grid and alignment, spacing rhythm, imagery, and the one idea that makes the work recognizable. Review it against the brief before building.

## Compose with intent

Open with the most characteristic thing in the subject's world, whether that is a statement, image, product interaction, demonstration, or live result. Do not assume every hero needs an eyebrow, gradient, supporting statistics, and two calls to action.

Typography carries identity. Use one family or two clearly differentiated families, a limited scale, deliberate weight and spacing, and readable line lengths. Treat display type as part of the composition. Avoid generated-design tells such as gratuitous all-caps labels, a single accented word in every headline, and monospace metadata used only to imply sophistication.

Make visual structure explain the content. Borders, numbers, dividers, cards, shadows, and labels should encode grouping, sequence, state, or priority. Do not chop unrelated content into identical rounded cards or number items that are not a sequence. Vary section composition when the content changes while keeping one coherent grid and stable outer frame.

Spend boldness in one place and keep the supporting system disciplined. Removing gradients, badges, and cards is not enough: replace decoration with substance such as confident type, meaningful color fields, real imagery, useful interaction, or stronger content. Prefer one dominant, relevant image to a collage of placeholders. Never invent client assets or present found imagery as owned.

## Icon direction

Preserve the product's established icon language. When a new interface needs an icon system, use [Keyline Icons](https://keylineicons.com/) by default and select one coherent direction before implementation: rounded or sharp corners, plus a primary style such as stroke, two-tone, duotone, or fill. Match the choice to the type, control geometry, and product tone; do not mix styles opportunistically across neighboring controls.

Use stroke for ordinary navigation and actions, and reserve visually heavier styles or container variants for emphasis, selected state, confirmation, or a distinct surface role. An icon should improve recognition, scanning, or affordance. Remove icons that merely decorate headings, duplicate adjacent text, or turn every item into the same icon-card pattern.

Review icons at their real shipping sizes and against every supported surface. Check optical weight, baseline alignment, color inheritance, dark-mode contrast, disabled state, and whether the meaning survives without color. Keep labels for unfamiliar actions; icon-only treatment is appropriate only for well-understood controls with accessible names.

## Interaction and motion

Give motion a purpose: feedback, spatial continuity, state explanation, or softening an otherwise jarring change. Frequent and keyboard-driven actions should be instant or nearly instant; occasional transitions may be more expressive. Prefer short, interruptible transitions for interface state, animate from the control's spatial origin when appropriate, and avoid animating every section or hover target by default. Respect reduced-motion preferences and gate hover-only effects to devices that support hover.

Polish the details users expect without noticing: press feedback, sensible focus movement, reachable controls, stable loading states, clear empty and error states, and consistent radii, spacing, and alignment. Good defaults matter more than a large customization surface.

## When the project uses shadcn/ui

Treat shadcn/ui as source-owned design-system infrastructure, not a black-box component package. Preserve the project's configured style, primitive base, aliases, icon library, Tailwind version, and semantic tokens. Use the package runner declared by the project for CLI commands.

Inspect project context before changing components: run `shadcn info --json` through the appropriate package runner, check `components.json` and installed files, and use `shadcn docs <component>` for the current API instead of relying on memory. Search configured registries before building a custom primitive. Do not guess an unspecified registry.

Prefer composition over reinvention:

- Use existing components and their built-in variants before custom markup or visual overrides. Use semantic roles such as `background`, `foreground`, `primary`, `muted`, and `destructive` rather than raw palette colors or manual dark-mode pairs.
- Preserve component anatomy and accessibility contracts: grouped items belong inside their group, tab triggers inside the tab list, overlays need titles, avatars need fallbacks, and form controls carry their validation and disabled semantics.
- Use the design-system primitives for alerts, empty states, separators, skeletons, badges, menus, overlays, and feedback instead of recreating them with styled `div` elements. Compose full card and field structures so hierarchy remains explicit.
- Keep `className` focused on layout and local composition. Change shared tokens or component variants when the design system itself should change; do not scatter one-off color, type, radius, stacking, or icon-size overrides across call sites.
- Follow the configured primitive API. Custom triggers use the mechanism appropriate to the project's base, and icons come from the configured icon library rather than an assumed default.

When adding or updating registry code, preview changes with the CLI's dry-run and diff facilities, read every added file, correct aliases and icon imports, and preserve local modifications. Never overwrite customized components or apply a preset destructively without explicit approval. After a design-system change, verify representative component states, contrast, dark mode, responsive behavior, console output, and horizontal overflow in the browser.

## Critique the rendered result

Build with real or representative content, then inspect the interface in a browser rather than judging source code alone. Review screenshots at narrow, medium, and wide widths and exercise important states and interactions. Look for generic substitutions, weak hierarchy, accidental empty space, overflow, loading shifts, illegible contrast, missing focus, and motion that slows repeated work. Fix and inspect again. Read the responsive-design guidance for the full viewport and reflow checks.
