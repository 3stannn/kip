# Unslop existing websites

`unslop` is implementation, scoped to an existing website: find what reads as generated, broken, or untrue, and replace it with something specific to this site. Read [frontend design](frontend-design.md) and its applicable bundled guidance before assigning work; load [frontend engineering](frontend-engineering.md) for React/Next.js, shadcn, or HeroUI changes. Keep one shared design direction. Existing brand and explicit user direction override generic house rules, randomized style suggestions, and bundled ban lists. Do not redesign the site, replace its stack, add a motion framework, or publish it unless asked.

## What counts as slop

A pattern is not slop just because models often produce it. Judge each candidate against this site with three questions:

1. **Is it true?** Invented numbers, logos, quotes, features, or screenshots are the worst slop. They mislead.
2. **Does it work?** Dead links, buttons that do nothing, fake forms, and missing states are slop that hides behind a finished look.
3. **Was it chosen?** A device that carries no information, appears by default on every section, or could sit on any site in the category is filler where a decision should be.

A gradient, glass panel, or serif headline that belongs to the established brand passes question 3. The same device repeated on every block because a template put it there does not.

## Baseline

Inspect relevant source and the running page first. Record desktop and narrow-screen screenshots, the current hierarchy, real content, navigation, and important interactions. Then sweep the source (below) and walk the page with the checklist. Each finding needs evidence: a screenshot region, a selector, or `file:line`.

## What to look for

**Truth and content** (fix first)
- Invented social proof: placeholder logos, "Trusted by 10,000+ teams", star rows, testimonials with stock names or no attribution.
- Unsourced statistics and round-number claims ("99.9% uptime", "3x faster") that nothing on the site backs up.
- Fake product imagery: dashboards built from grey bars and donuts, mockups showing UI the product doesn't have, mismatched stock photos.
- Leftovers: lorem ipsum, "Your Company", `example.com`, TODO text, sample blog posts, template pricing tiers, placeholder avatars.
- Features or pages that are promised but don't exist.

**Copy**
- Genre vocabulary that could describe anything: unlock, supercharge, seamless, elevate, effortless, cutting-edge, all-in-one, next-generation, revolutionize.
- Formula headlines: "not just X, it's Y", three-part slogans, a full sentence at display size.
- Labels that don't say what happens: "Get started", "Learn more", "Click here", "Submit".
- Restating headings in body text, filler intros, and a pile of em dashes or exclamation marks.
- Performative section labels and kickers above every heading ("Why us", "Features", "Our story" in tiny tracked caps).
- Mismatched voice between sections, often where one section was generated separately.

**Structure**
- The stock order (hero, logo strip, three feature cards, testimonial, pricing, CTA) when the site's real argument needs a different order.
- Every section in the same layout family, especially rows of identical icon cards.
- Everything centred; no section anchored to the content's own shape.
- Repeated CTAs that all go to the same place with different words.
- Navigation items that point to sections that are empty or missing.

**Visual**
- Decoration that isn't the brand: violet-to-indigo gradients, gradient headline text, glow buttons, neon-on-black, blurred blobs, glass cards everywhere.
- A soft drop shadow and the same 12–16px radius on every box.
- Emoji or generic icon-in-a-rounded-square used as content instead of words or real pictures.
- Too many near-equal font sizes and weights; no clear hierarchy.
- Spacing that drifts (24px here, 28px there) instead of following a scale; misaligned edges.
- Low-contrast grey text, especially on tinted or image backgrounds.
- See Taste's [tells](../vendor/taste-skill/references/tells.md) for a dated registry of visual tells; apply it as evidence, not as a ban that overrides the brand.

**Motion**
- The same fade-and-rise on every block; long staggered hero entrances that delay content.
- Hover lift on every card, bounce easing, infinite loops that mean nothing.
- Reveals that fail (blank bands on fast scroll, print, or with JavaScript off) and no `prefers-reduced-motion` handling.

**Interaction and states**
- `href="#"`, `javascript:void(0)`, buttons without handlers, links to 404s.
- Forms that only `console.log`, have no validation messages, or show no loading, success, or error state.
- Missing empty, loading, and error states for any data the page fetches.
- Hover-only affordances with no focus or touch equivalent; layout shift when fonts or images load.

**Accessibility**
- Clickable `div`s, missing labels, icon buttons without accessible names, alt text that is empty on meaningful images or says "image".
- Heading levels chosen for size, not structure; focus outlines removed; keyboard traps in menus and modals.
- Horizontal overflow and tap targets under ~44px on narrow screens.

**Code**
- Wrapper `div` soup, one-off inline styles, `!important` chains, z-index escalations, magic numbers repeated instead of tokens.
- Unused components, dead CSS, commented-out blocks, `console.log`, duplicated near-identical components.
- Heavy dependencies for small effects (an animation library for one fade, an icon pack for three icons).

**Metadata**
- Template titles and descriptions ("Vite + React", "Create Next App"), the default favicon, missing Open Graph image or description.
- A template README or `package.json` name left unchanged, and a copyright year or name left from the template.

## Source sweep

Run targeted searches from the project root, excluding `node_modules` and build output, and confirm each hit in context before treating it as a finding:

```text
rg -n -i "lorem|ipsum|your company|example\.com|placeholder|TODO|FIXME" <src>
rg -n -i "unlock|supercharge|seamless|elevate|effortless|cutting-edge|all-in-one|next-gen" <src>
rg -n "href=\"#\"|javascript:void|console\.log|onClick=\{\(\) => \{\}\}" <src>
rg -n -i "Vite \+ React|Create Next App|vite\.svg|<title>" <src> index.html public
rg -n "!important|backdrop-blur|bg-clip-text|from-(purple|violet|indigo)" <src>
```

## Fix order

1. Untrue: remove or correct false claims, fake proof, and placeholder content. Never invent replacements. When real proof, numbers, or photos are needed, leave a clearly marked gap and list it for the user.
2. Broken: dead links and controls, missing states, accessibility failures, overflow.
3. Generic copy: rewrite with this site's real specifics (what it does, for whom, with what result), in its existing voice.
4. Structure and visual: make section composition follow the content; consolidate spacing, type sizes, and radius onto a scale; drop decoration that isn't the brand.
5. Motion: keep one purposeful move, respect reduced motion, make reveals fail visible.
6. Code and metadata cleanup that touches what you changed. Don't refactor unrelated code.

Removal alone is not enough: a page stripped of tells with nothing put in their place is still generic. Every removal should make room for real content, a clearer hierarchy, or a specific detail from the site's subject. Preserve meaningful content, data, URLs, responsive behavior, accessibility, and working interactions. Keep dependencies proportionate.

Workers get the shared direction, owned files, the findings they own with evidence, and acceptance checks. Reviewers get the same, plus before and after screenshots.

## Verify and report

Inspect the revised page in a real browser at desktop and narrow widths, compare before and after, exercise affected interactions, and check keyboard and focus behavior and reduced motion where relevant. Re-run the source sweep. Run the project's checks. Iterate on observed problems, then update verified project notes through the root.

Report findings by category with evidence and what was done for each, plus the open items that need the user (real testimonials, photos, numbers, copy decisions). If the browser or baseline cannot be obtained, report the missing evidence and do not claim visual verification or that a bundled Taste gate passed.
