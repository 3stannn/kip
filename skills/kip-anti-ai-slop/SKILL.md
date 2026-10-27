---
name: kip-anti-ai-slop
description: Kip-specific anti-ai-slop guidance. Use within an active Kip task or when explicitly requested for Kip.
---

# Anti Ai Slop

This guidance supports Kip's assigned worker or reviewer scope. The root owns team dispatch, profile settings, and integration; do not spawn additional agents from a supporting role. Apply only sections relevant to the change.

Remove decisions that came from a generic generation pattern rather than the product, audience, or codebase. Preserve intentional style, necessary detail, accessibility, error handling, and the user's requested tone. The goal is specificity and coherence, not minimalism for its own sake.

## Ground the work

For Kip itself, use its real vocabulary: project profile, task override, root, worker, reviewer, host tools, and verified checks. Explain behavior rather than selling an imaginary autonomous team. A preview is not a running model; a preset is not measured cost; a skill instruction is not an enforced runtime feature. Show actual commands and states instead of invented usage charts or testimonials.

For work Kip produces for another product, use that product's identity. Do not stamp Kip's branding, icon choices, palette, or layout onto every output. Ask whether a sentence, section, or visual would still fit an unrelated product unchanged; if so, replace it with relevant evidence or remove it. Distinctiveness must come from the subject, not deliberately unusual styling.

Identify the real subject, user, action, constraints, and available evidence before rewriting. Prefer product facts, actual interface states, real examples, and existing conventions. Mark unknowns or use honest representative content instead of inventing customers, metrics, awards, integrations, capabilities, or research findings.

Do not ban a visual or writing device merely because generated work often misuses it. A card, gradient, serif, badge, or short sentence is valid when it serves the brief. Remove it when it is interchangeable decoration, repeated without information value, or compensating for weak content.

For the user's expressive website direction, preserve purposeful oversized type, sticker graphics, strong frames, pricing panels, and light/dark contrast when they form a coherent design. Anti-slop does not mean making every page small, flat, monochrome, or undecorated. Judge specificity, hierarchy, and execution. Conversely, adding a giant headline and colorful stickers to a generic template does not establish a distinct identity.

## Copy

- Lead with what the user can do, what changes, or why the information matters. Replace vague claims such as "powerful," "seamless," "next-generation," and "revolutionary" with a concrete capability or omit them.
- Delete throat-clearing, redundant summaries, repeated conclusions, fake quotations, and headings that only label the paragraph below them. Keep orientation text when it prevents confusion.
- Make calls to action name the action and destination. Write errors with the failed operation, useful cause when known, and a recovery path. Do not blame the user or promise an outcome the system cannot guarantee.
- Vary sentence structure only when it improves rhythm and comprehension. Do not manufacture personality with constant fragments, em dashes, rhetorical questions, or clever labels.
- Keep terminology stable. Prefer the product's vocabulary over synonyms introduced for novelty.

## Interface design

- Let hierarchy, spacing, type, imagery, and content do the work before adding ornamental chrome. Remove unexplained eyebrows, decorative pills, arbitrary numbering, random glow, and repeated icon-card grids.
- Avoid applying one surface treatment, radius, shadow, or animation to every component regardless of role. Structural devices should communicate grouping, sequence, priority, or state.
- Do not replace clutter with emptiness. A restrained interface still needs useful content, deliberate composition, clear states, and enough visual substance to feel complete.
- Use real assets and representative edge-case content. Do not hide missing information behind grey bars, meaningless charts, abstract blobs, or fabricated dashboards.
- Prefer one coherent icon family and use icons for recognition or control affordance, not as mandatory decoration beside every heading.

## Code

- Follow existing architecture and naming. Prefer a direct function or component over wrappers, factories, configuration layers, or "future-proof" interfaces with no current consumer.
- Keep derived values derived and remove duplicated state, pass-through props, needless effects, cargo-cult memoization, and abstractions that only rename a platform or framework primitive.
- Write comments for non-obvious constraints, tradeoffs, and invariants. Remove comments that narrate syntax, decorative section banners, generated essays, and stale implementation notes.
- Handle real failure modes and boundaries; do not shorten code by deleting validation, cleanup, accessibility, concurrency control, or useful tests.
- Avoid speculative dependencies and utilities. Reuse project conventions, but do not preserve a poor abstraction solely for visual consistency with neighboring code.

## Review pass

Review in three passes:

1. **Truth:** remove or qualify anything unsupported.
2. **Purpose:** ensure every section, component, abstraction, and sentence has a job.
3. **Craft:** improve hierarchy, naming, rhythm, states, and consistency without expanding scope.

Show consequential changes with a concrete before/after example when explaining the result. Stop when remaining choices are defensible from the brief or codebase; do not sand away useful personality or optimize prose and code into sameness.
