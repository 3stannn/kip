# Kip website art direction

Use this reference for new marketing websites, portfolios, studios, and expressive brand pages, or when the user asks for this direction. The user's supplied DOW Studio screenshots establish a preference for confident typography, generous composition, substantial imagery, and deliberate personality. Translate those qualities to the target brand. Existing identity, an explicit brief, and the needs of a working application take precedence.

## What the references demonstrate

The six supplied desktop screenshots show a coherent page with distinct compositions:

- A light hero dominated by a huge, heavy condensed headline. A quiet navigation, short supporting paragraph, and compact actions leave the headline in control. Colorful tilted sticker graphics punctuate the mostly monochrome field.
- A project gallery with large two-column image surfaces, strong black frames, small captions, and restrained service tags. The work occupies most of each surface; decoration does not replace the project imagery.
- An asymmetric testimonial composition: a narrow context column and a much wider, oversized quote with a small attribution.
- A dark studio section with a human cutout beside large editorial text and quieter supporting facts.
- Three aligned pricing panels on a dark field. A light middle panel establishes emphasis; prices, scope, and actions share a clear comparison structure.
- A nearly edge-to-edge typographic closing invitation above a ruled, multi-column footer. The footer feels designed as part of the page.

A compact floating navigation appears in several screenshots. Static images do not establish its scroll behavior, hover states, timing, or the presence of text-reveal animation. Treat motion as a new design decision and verify it when implemented. Browser tabs, address bars, and third-party award ribbons are outside the requested page design.

## Translate the direction

Before implementation, record a short decision set: audience and primary action, page argument, type roles, palette, grid, available imagery, and one recurring visual motif. Use the supplied reference to decide relationships and hierarchy; create original copy, assets, and composition for the actual product. Do not copy the studio's logo, claims, testimonials, prices, location, or project portfolio.

For an open marketing brief, start with these preferences:

- **Type leads.** Choose a distinctive display face with suitable weight and width, paired with a readable text face. Confirm the font exists and its license permits use. Give the main statement enough scale to shape the viewport; supporting text should remain visibly subordinate. Choose line breaks from the words and available width, not arbitrary emphasis spans. Avoid stretching a normal font with transforms to imitate a condensed face.
- **Contrast creates hierarchy.** Use a disciplined neutral foundation and a small purposeful accent vocabulary. Light/dark section changes can mark a change in the story. Another brand may call for a different palette; black and white are a reference choice, not a compulsory theme.
- **Composition changes with content.** Alternate a strong statement, immersive work, asymmetric evidence, and a clear invitation when the material warrants them. Share alignment and spacing rules across sections without turning them all into the same centered heading and three-card grid. Large margins must frame something worth seeing.
- **Work has visual weight.** Use large, carefully cropped real project images, product views, or relevant photography. Distinguish an actual case study from a concept. If assets are missing, choose a content-led composition or clearly labeled representative media; do not fill a portfolio with fabricated client work or empty rectangles.
- **Personality is concentrated.** A small family of custom stickers, cutouts, or graphic marks can bring warmth to disciplined typography. Tie it to the brand, keep it secondary, and leave clear reading and interaction space. Stickers may use intentional borders, gloss, shadow, or rotation; those treatments belong to that motif rather than every component.
- **The close matters.** Give the final invitation and footer their own composition, useful links, and a working contact path. Do not finish an expressive page with an unrelated boilerplate footer.

This is a vocabulary, not a required section list. A site without real testimonials or pricing should use other relevant evidence. A quiet legal service, a museum, and a playful studio should not emerge as recolored copies of the same template.

## Implement and inspect

Use the target stack. Familiar components can supply semantics and behavior while the page gets its own composition. Define shared type, spacing, surface, border, and motion values; avoid uncoordinated one-off overrides.

Keep display text as real text. Use bounded fluid sizes, content-aware wrapping, and narrower-screen compositions. Overlays and decorative media must not block links, text selection, or focus. Give floating navigation scroll clearance and safe-area spacing; simplify it on narrow screens rather than covering content. Reserve media dimensions and load the intended fonts before judging line breaks.

Make project links, menus, pricing actions, contact controls, and any quote navigation work. Use accessible controls and honest destinations. Do not add a carousel or scroll choreography just because a static reference suggests one. Where motion helps, prefer transforms and opacity, support reduced motion, and keep essential text readable without animation or JavaScript.

Inspect the rendered page at a representative desktop width, a narrow phone width, and affected intermediate breakpoints. Compare the full-page rhythm as well as individual sections. Check type scale and line breaks, real image quality, light/dark transitions, focused controls, floating navigation overlap, footer quality, overflow, and reduced motion. Correct the largest visible mismatch with the chosen direction, inspect again, and stop when the brief and checks are satisfied. Report any browser verification gap honestly; code compilation alone cannot establish visual quality.
