# Website layout selection

Read when choosing a new website's composition or substantially changing its layout. Keep the selected portfolio or website visual system; explicit briefs and established designs take precedence.

## Layout vocabulary

Adapted from [Figma's website layout ideas](https://www.figma.com/resource-library/website-layout-ideas/), read October 28, 2026. This is a concise synthesis, not a copied template collection.

| Approach | Content fit |
| --- | --- |
| Grid | Align repeated items; use modular blocks, columns, or a single reading column. |
| Split-screen | Pair a form or product explanation with supporting information. |
| Asymmetrical | Give the key message more space than its supporting material. |
| Full-screen | Let one strong visual establish an opening impression with readable overlay text. |
| Side-scrolling | Browse image collections or categories with obvious directional controls. |
| Card | Package independently browsable products, posts, or previews. |
| Magazine | Prioritize a lead story within a denser editorial hierarchy. |
| Gallery | Make visual work central and keep accompanying text concise. |
| Zig-zag | Alternate text and media through a sequence of explanations. |
| F-pattern | Support scanning of substantial text through prominent headings and a strong leading edge. |
| Interactive | Make exploration or manipulation central to understanding the content. |
| Animated | Use movement to demonstrate or connect ideas without heavy loading costs. |

The article also emphasizes visual weight, scan paths, whitespace, responsive composition, and learning from use. Treat scan patterns as hypotheses appropriate to content and reading direction, not universal eye-tracking guarantees.

## Apply the ideas within Kip

The following are Kip implementation judgments extending the article's vocabulary.

Choose the main structure from the real visitor task and available material before assigning decorative treatments. State the choice in one sentence, including what it makes easier to find or do. A page can combine compatible patterns: a magazine uses an underlying grid, while a gallery may expose cards. Interaction and animation describe behavior and can sit on top of several structures; they do not substitute for information architecture.

Use a stable outer alignment and spacing system across sections. Change composition when the information changes: a comparison needs aligned attributes, an explanation needs a reading sequence, and a collection needs repeatable browsing. Avoid forcing every section into cards or a repeated alternating row merely to fill a page. A concise text page can remain one column.

## Implementation choices and failure boundaries

- **Grid, cards, gallery:** choose track widths from actual labels and media. Reserve image dimensions to avoid layout shifts. Use cards when each item has its own destination or action; a ruled list may suit dense text better. Gallery projects still need accessible names and a path to context. Use aligned rows rather than masonry where cross-item comparison matters.
- **Split and asymmetry:** choose proportions from content priority rather than fixing every split at 50/50. Keep related labels, actions, and explanations together in document order. At narrow widths, stack by decision sequence; do not rely on CSS ordering that sends keyboard focus elsewhere.
- **Full-screen:** check short viewports and long headlines before imposing viewport height. Keep the primary action reachable when browser chrome or the on-screen keyboard reduces space. Test overlays against the actual image crop and retain a readable fallback while media loads.
- **Magazine and F-pattern:** establish heading levels and a useful reading width. Preserve story priority after columns collapse. Lead with informative words; do not fake editorial density with invented headlines, dates, or statistics. Adapt the leading edge for the language's reading direction.
- **Zig-zag:** alternate media placement only when it supports the explanation. On mobile, let each heading, explanation, visual, and action form a coherent unit. Keep the document sequence understandable without images or animation.
- **Side-scrolling:** confine horizontal movement to a deliberate region. Provide labeled previous/next controls, visible continuation, and reachable focus; do not hijack ordinary vertical wheel or touch scrolling. Avoid putting required steps where users cannot discover them.
- **Interactive and animated:** build the useful state and clear controls first. Support keyboard operation, touch, and visible focus. Ensure essential meaning survives reduced motion and that pause or replay controls exist when the behavior calls for them. Avoid mandatory entrance sequences that delay access to content.

## Review the chosen structure

Use representative content, including a long title, sparse collection, and missing media where relevant. At narrow and wide widths, check whether the main task remains obvious, reading and focus order agree, and the chosen grouping still communicates priority. Exercise any scrolling controls or interactive demonstration. Use Kip's responsive-design guidance for reflow, zoom, and breakpoint verification; report actual browser evidence separately from source inspection.
