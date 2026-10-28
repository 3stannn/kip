# Website design: Kip

Use Kip's own website as the default visual system for new non-portfolio websites and substantial redesigns. Portfolio websites use `portfolio-design.md`. Explicit briefs and established brand conventions take precedence; small edits preserve the surrounding design.

Extracted from `web/style.css`, `web/components/Hero.jsx`, `Header.jsx`, `FAQ.jsx`, `Closing.jsx`, and the home/docs pages in this repository. This reference is self-contained in installed copies; the source website is not required at runtime. Source inspection establishes design values and implemented controls, not proof of browser verification.

## Visual system

The character is friendly, calm, and practical: generous space, rounded readable typography, pale blue accents, and confident dark actions. Apply this system to the target content. The earlier studio references are no longer the default.

| Role | Default |
| --- | --- |
| Typeface | Nunito, system-ui, sans-serif; load the real font with swap behavior |
| Page / surface | `#f9f9f9` / `#ffffff` |
| Ink / charcoal | `#202020` / `#303030` |
| Muted text | `#686868` |
| Quiet fill / border | `#eeeeee` / `#e2e2e2` |
| Accent / stronger accent | `#93b4e8` / `#41699f` |
| Accent surface | `#e8f0fb` |
| Technical demonstration | `#0b0b0c`, raised `#111113`, light text `#e5e5e5` |

Use semantic tokens. Pale blue supplies framing, selected surfaces, and large display emphasis; darken it when needed for readable text and control contrast. Kip also uses subtle gray `#999999`, but do not assume it passes for small text. Verify actual surface contrast. Adapt colors to an established identity while retaining coherent hierarchy. Kip's light page is the default; support dark mode when requested or already present with deliberate token mappings.

## Typography and layout

- Use Nunito with heavy 800-1000 headings, bold compact labels and controls, and quieter regular body copy. Reserve monospace for real technical content. Do not apply the portfolio's pixel font and uppercase mono labels here.
- Marketing hero titles run roughly 3rem on phones to 4.5rem on wide screens, with about 1.02 line height and tight tracking. Section headings run about 1.875rem to 2.25rem. Body copy is about 0.875rem to 1rem with comfortable line height. Use bounded fluid sizes and line breaks suited to the actual words.
- Use a centered shell up to 82.5rem (1320px), gutters about 1.5rem on phones and 3.5rem on desktop, and section block padding about 3.5rem to 5rem. Reading copy stays narrower than the shell.
- A marketing hero can pair left-aligned copy and a clear primary action with a meaningful product demonstration on the right. Stack intentionally on phones. Without a real demonstration, use relevant media or a content-led composition.
- Keep the header quiet: brand, a few links, and a dark primary action. Reflow narrow navigation while preserving destinations. Kip's header is in normal flow; sticky or floating navigation is a separate decision.
- Vary sections by purpose: ruled fact rows, an asymmetric FAQ, useful examples or tools, and a softly filled closing invitation. Finish with a restrained aligned footer and working links. These are examples, not a required section list.

## Components and interactions

- Primary buttons: dark ink fill, white text, full pill radius, bold small labels, approximately 3rem minimum height, and generous horizontal padding. Secondary actions use underlined text links with a small directional icon where useful.
- Panels: white surfaces, thin light borders, 12-16px radii, and restrained shadows. Larger closing sections may use 24px radii. Cards express grouping or state rather than wrapping every sentence.
- Forms: softly filled inputs, light borders, 8-12px radii, clear labels, and visible focus. Segmented controls use a pill track with a dark selected segment; selection changes real content and has accessible state.
- Technical products can use a dark demonstration panel containing real code, commands, or a working example. Other industries need relevant evidence rather than decorative terminal windows.
- Kip's mascot is a brand asset. Use original subject-specific artwork when useful; do not copy Kip's identity or give every site a mascot. Pale-blue framing can add personality without an illustration.
- Motion explains interaction and stays interruptible. Do not copy continuous marquees or floating decoration into every site. Respect reduced motion and hover capability; repeated actions need immediate feedback.

## Working screens and verification

Dashboards, docs, editors, and utilities retain these tokens, typography, and control character while prioritizing information density, clear state, and predictable navigation. Do not add a marketing hero to a working screen merely to reproduce Kip. Preserve the project's stack and component APIs.

Implement working destinations, menus, forms, and selection states before ornament. Keep semantic landmarks, keyboard access, visible focus, and useful loading, empty, and error states. Inspect the rendered result at narrow and wide widths and affected intermediate breakpoints, with long content and zoom. Check wrapping, contrast, media quality, navigation clearance, and interaction states. Use Kip's responsive-design guidance for relevant checks and report browser verification gaps honestly.
