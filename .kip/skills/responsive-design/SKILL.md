---
name: responsive-design
description: Build or repair web layouts that adapt across narrow phones, tablets, desktop, ultrawide displays, orientation changes, and zoom. Use for frontend layout work or viewport and overflow issues.
---

# Responsive Design

Make the interface usable across a continuous range of viewport sizes, not just a few device presets. Preserve the project's visual language and CSS framework. Prefer CSS layout over JavaScript viewport detection; use JavaScript only when behavior requires it.

## Layout decisions

- Start with the narrow layout and add breakpoints where content stops fitting. Use the project's breakpoint system; do not add a breakpoint per device.
- Use fluid grid/flex tracks, wrapping, intrinsic sizing, bounded content widths, and flexible gutters. Allow shrinking with `min-width: 0` where needed. Avoid page-level horizontal scrolling, fixed content heights, and arbitrary pixel widths that clip content.
- Use fluid typography and spacing with sensible bounds. Keep body text readable and reading lines bounded on wide screens; do not stretch every component to fill an ultrawide display.
- Collapse navigation and multi-column content intentionally. Preserve access to actions and information rather than hiding essential content to make it fit. Keep visual and keyboard reading order aligned.
- Constrain images, video, SVG, and canvas to their containers while preserving aspect ratio. Give intrinsically wide tables and code blocks their own labeled scrolling region when reflow would destroy meaning. Do not hide global overflow to mask layout defects.
- Keep dialogs, drawers, sticky controls, and floating elements reachable with a short viewport, browser chrome, safe-area insets, or an on-screen keyboard. Prefer dynamic viewport sizing when viewport-height behavior matters, with a suitable fallback for supported browsers.
- Support touch, mouse, and keyboard without hover-only actions. Provide comfortably sized controls, visible focus, and reduced-motion behavior for any added animation. Avoid disabling user zoom.

## Verification

Check representative widths such as 320, 375, 768, 1024, 1440, and 1920 CSS pixels, plus an ultrawide width when relevant. These are samples, not an exhaustive guarantee. Resize between samples and inspect just below and above each changed breakpoint. Include a short landscape viewport and 200% zoom; check reflow at a 320 CSS-pixel equivalent for content that can reflow.

Use realistic stress content: long labels, unbroken strings, validation errors, expanded menus, empty/loading states, and larger text. Check page overflow, clipped text, overlapping controls, dialog reachability, and keyboard focus. Verify nested scroll regions remain usable.

Use available browser tooling for actual viewport checks. Report the widths, states, and interactions exercised and any remaining gaps. A production build or CSS inspection alone does not establish responsive correctness. If browser verification is unavailable, provide focused manual checks and label them unverified. Never claim every device was tested.
