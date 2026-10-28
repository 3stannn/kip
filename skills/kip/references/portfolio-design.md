# Portfolio design: choose one bundled skill

For every new portfolio or substantial portfolio redesign, Kip must choose **either [marwieang.md](marwieang.md) or [bryllim.md](bryllim.md)** as the implementation's primary design skill. This file is a selector and compatibility guide, not a third portfolio design. Do not build from this summary alone or blend both into a generic minimal site.

## Select before implementation

Honor an explicit user choice. Otherwise choose autonomously from the brief and actual content:

| Portfolio need | Choose | Design identity to retain |
| --- | --- | --- |
| Personal developer/designer portfolio centered on selected work, experience, about, and contact; a compact personal home with supporting pages | marwieang.md | Floating framed sidebar with nested shell/panel, a 640px main column, generous section rhythm, small section headings above hairline project/link rows, restrained raised navigation, compact mobile navigation |
| Editorial portfolio centered on writing, resources, a substantial project archive, or a monochrome technical-zine direction | bryllim.md | Strict monochrome semantic ramp, 42rem reading measure, ruled/numbered section hierarchy, fixed 14rem desktop navigation with mobile top bar, restrained surface depth, a selectively placed faded halftone accent |
| Broad “build my portfolio” brief with no stronger direction | marwieang.md | Use its complete portfolio composition as the default, adapted to the user's real content |

Choose one even when both could fit; do not ask the user to select unless the brief contains a material unresolved conflict. An existing clearly established design or a small repair preserves that design rather than forcing a new selection.

State the decision briefly before building: “Portfolio design: marwieang.md — selected for a work-focused personal portfolio.” Name the actual file and content-based reason. Open and read the selected source's design rules, tokens, component guidance, and relevant implementation sections. For Marwie Ang, read the source code for the shell, sidebar, page, and project rows when using those components; the opening summary is insufficient. If the chosen file is missing or unreadable, report that limitation and resolve it before claiming to use the skill.

## Apply the selected skill, with narrow compatibility overrides

The selected skill governs composition, palette, spacing, navigation structure, surface treatment, and component relationships. Follow it concretely; do not reduce it to “minimal typography” and invent another layout. [frontend-system.md](frontend-system.md) supplies the user's compatibility constraints:

- One selected font family throughout, Geist by default. Replace separate serif, mono, and pixel roles with size/weight differences in that same family. Keep the owner's name crisp; no pixel-name reveal.
- Use shared readable type tokens: 16px body/navigation/actions and at least 14px supporting text. Raise small source values at the shared token or component, preserving its layout relationships.
- Apply the supplied screenshot red flags locally: simple availability copy, real portrait or no avatar, compact theme control, clear unboxed contact links, no redundant status widgets or pill clusters. These overrides do **not** remove Marwie Ang's framed floating sidebar or Bryl Lim's editorial structure and restrained halftone identity.
- Keep consistent shared control variants and accessible focus/contrast. Source code is an implementation reference: adapt it to the requested framework and existing component system rather than replacing the stack, copying sample credentials, or installing optional services.
- Use real content and assets. Omit unsupported metrics, graphs, avatars, and counters. Do not add the other website reference's playable product simulations, bento demos, colorful mini-apps, audio, or live counters to a portfolio unless explicitly requested or real supplied work requires them.

For Marwie Ang, preserve the floating shell/panel, column geometry, hairline rows, spacing, and subtle surface treatment while simplifying the rejected widgets. For Bryl Lim, preserve monochrome editorial geometry, rules, hierarchy, and restrained halftone; use the single family at readable sizes instead of its original multi-font microtype. Keep texture away from readable text. Reduced motion and native input behavior remain intact.

## Carry the choice through implementation and review

Include the selected filename, relevant source sections, identity features, and compatibility overrides in the frontend implementation brief. An assigned worker must read that source, not just the root's paraphrase. A reviewer compares the rendered result with the **same selected skill**; do not substitute the unselected source or a generic anti-slop checklist.

Before calling the portfolio complete, report the selected filename and concrete implemented relationships: desktop/mobile navigation, column geometry, section rhythm, project presentation, palette/surfaces, and any requested exceptions. Inspect narrow and wide browser views after fonts load and apply the shared typography/component checks. A sidebar alone, a monochrome palette alone, or a passing build does not demonstrate skill fidelity. Correct missing identity features before delivery, and label unavailable browser checks as unverified.
