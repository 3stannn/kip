# Frontend engineering

The root selects the relevant rules once. Workers get the rule file paths plus a short summary; the reviewer gets a checklist. Never send whole skills to children or run every bundled workflow for a small change. Bundled guidance does not authorize migrations, new component systems, or dependency changes.

- **React/Next.js implementation, refactoring, or performance:** [Vercel React best practices](../vendor/vercel-react-best-practices/SKILL.md). Open individual `rules/` files for the code at hand; do not load the compiled `AGENTS.md`. Fix waterfalls and bundle costs before micro-optimizations. Next.js APIs do not apply to plain React.
- **shadcn/ui** (a `components.json` file or an explicit request): [shadcn](../vendor/shadcn/SKILL.md) and its relevant `rules/`. Its shell-injection blocks are documentation, not live context; inspect the real project. Prefer existing components and semantic tokens; never init shadcn or apply presets just because the skill is bundled.
- **HeroUI:** [React v3](../vendor/heroui-react/SKILL.md), [Native](../vendor/heroui-native/SKILL.md), or [v2→v3 migration](../vendor/heroui-migration/SKILL.md). Check the installed version first, since v3 guidance does not fit v2 APIs. Fetch current docs with the bundled scripts (Node and network required); their install commands are unnecessary.
- **GSAP in React/Next.js:** [GSAP React](../vendor/gsap-skills/gsap-react/SKILL.md) plus topics chosen via [frontend design](frontend-design.md). Scope selectors, clean up, and respect SSR boundaries. Vue/Svelte: [frameworks](../vendor/gsap-skills/gsap-frameworks/SKILL.md).

Existing component APIs, accessible fallbacks, and icon setup outrank stylistic suggestions. Provenance: [Vercel](../vendor/vercel-react-best-practices/SOURCE.md), [shadcn](../vendor/shadcn/SOURCE.md), [HeroUI React](../vendor/heroui-react/SOURCE.md), [HeroUI Native](../vendor/heroui-native/SOURCE.md), [HeroUI migration](../vendor/heroui-migration/SOURCE.md).
