# Portfolio design: implicit Marwie Ang implementation

For every new portfolio website or substantial portfolio redesign within Kip, implicitly activate [marwieang.md](marwieang.md). The user does not need to name the skill, choose a reference, or approve its use. Explicit design briefs and established brands take precedence; small repairs preserve the surrounding design.

## Read the complete source before building

The root, assigned frontend worker, and independent reviewer must each read `marwieang.md` from top to bottom before implementation or review. Read every section and every source block, through the final `dither.py` helper. When output is truncated, continue in ordered, bounded ranges until the end; do not treat a heading list, search results, opening summary, or selected excerpts as a complete read. Reuse a complete read already present in the same agent's context while the source is unchanged.

Briefly state that `marwieang.md` is being applied automatically. Pass the source path and complete-read requirement in implementation and review assignments. A parent's summary does not replace a worker's or reviewer's own reading. Read the full reference even for a scoped assignment within the portfolio build, while keeping edits within that assignment.

## Implement the source throughout the portfolio

Use the supplied code as the implementation baseline, preserving its concrete tokens and relationships. Implement the full design system and all components, pages, and interactions required by the brief. Carry the reference through the whole page and supporting routes, rather than stopping after the sidebar or hero. Read optional components and helpers too; include them when the brief and real content call for them.

Track coverage in the working implementation brief, using the source's sections and source-file blocks. Mark each as implemented, adapted with a specific reason, or omitted with a specific scope/content/compatibility reason. Group closely related blocks when useful, but account for every block. Do not silently skip lower sections or invent content to populate optional pages.

Cover these relationships during implementation and review:

- Overview, non-negotiable rules, design tokens, component catalog, build steps, extension guidance, common mistakes, and verification requirements.
- Global styles, layout, icon, data, and icon primitives: semantic colors in both themes, grain and layered surfaces, shared shapes, spacing, and type hierarchy.
- Page shell and sidebar: floating framed shell/panel, 640px content column, desktop/mobile navigation, section rhythm, and active states.
- Component source: project rows, contact feedback, carousels, photo stacks, contributions, name effects, click feedback, and poke controls/API. Implement applicable interactions completely, subject to the compatibility constraints below.
- All route source: home, projects and detail, about, blog and detail, services, stack, gear, links, resources, and not-found. Preserve the source's page relationships for routes included in the brief.
- Final image helper: use the supplied dithering treatment when appropriate for real gear imagery; account for its omission when that imagery or route is absent.

## Apply narrow compatibility constraints

[frontend-system.md](frontend-system.md) supplies the user's shared constraints. Apply them locally while retaining the source's composition, geometry, navigation, palette, spacing, and surfaces:

- One font family, Geist by default; express hierarchy with weight and size instead of the source's multiple fonts or pixel-name animation.
- Readable shared tokens: 16px body/navigation/actions and at least 14px supporting text.
- Simple availability copy, real portrait or no avatar, compact theme control, clear unboxed contact links, and no redundant status widgets or pill clusters. Retain the framed floating sidebar and nested shell/panel.
- Consistent controls, accessible focus/contrast, reduced motion, and native input behavior.
- Preserve the requested stack and existing component system. Adapt source syntax and dependencies as needed; use real content and assets. Do not copy sample credentials, invent metrics, or install optional services merely because the reference includes them.

Reading the entire file is mandatory; adding every optional route, widget, or service is governed by the brief and these constraints. Record adaptations and omissions in the coverage notes so fidelity can be reviewed concretely.

## Review the entire implementation

The reviewer reads the same complete source and checks the coverage notes against the code and rendered result. Inspect narrow and wide browser views after fonts load, exercise included interactions and routes, and check supported themes and reduced motion. Apply shared typography, component, and responsive checks.

Compare desktop/mobile navigation, column geometry, section spacing, row presentation, palette, surfaces, and interaction states with the source. Correct missing relationships before delivery. A sidebar alone, a monochrome palette, or a passing build does not establish fidelity. Report material adaptations or omissions and label unavailable browser checks explicitly.
