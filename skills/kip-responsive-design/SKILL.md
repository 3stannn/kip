---
name: kip-responsive-design
description: Kip-specific responsive-design guidance. Use within an active Kip task or when explicitly requested for Kip.
---

# Responsive Design

This guidance supports Kip's assigned worker or reviewer scope. The root owns team dispatch, profile settings, and integration; do not spawn additional agents from a supporting role. Apply only sections relevant to the change.

Make the interface usable across a continuous range of viewport sizes, not just a few device presets. Preserve the project's visual language and CSS framework. Prefer CSS layout over JavaScript viewport detection; use JavaScript only when behavior requires it.

## Layout decisions

- Start with the narrow layout and add breakpoints where content stops fitting. Use the project's breakpoint system; do not add a breakpoint per device.
- Use fluid grid/flex tracks, wrapping, intrinsic sizing, bounded content widths, and flexible gutters. Allow shrinking with `min-width: 0` where needed. Avoid page-level horizontal scrolling, fixed content heights, and arbitrary pixel widths that clip content.
- Use the semantic type scale in [frontend-system.md](../kip/references/frontend-system.md) for website work. Keep supporting text at least 14px and body/navigation/actions at 16px by default; wrap or stack before shrinking. Use fluid display typography and spacing with sensible bounds. Keep body text readable and reading lines bounded on wide screens; do not stretch every component to fill an ultrawide display.
- Collapse navigation and multi-column content intentionally. Preserve access to actions and information rather than hiding essential content to make it fit. Keep visual and keyboard reading order aligned.
- Constrain images, video, SVG, and canvas to their containers while preserving aspect ratio. Give intrinsically wide tables and code blocks their own labeled scrolling region when reflow would destroy meaning. Do not hide global overflow to mask layout defects.
- Keep dialogs, drawers, sticky controls, and floating elements reachable with a short viewport, browser chrome, safe-area insets, or an on-screen keyboard. Prefer dynamic viewport sizing when viewport-height behavior matters, with a suitable fallback for supported browsers.
- Support touch, mouse, and keyboard without hover-only actions. Provide comfortably sized controls, visible focus, and reduced-motion behavior for any added animation. Avoid disabling user zoom.

## Verification

For expressive websites, preserve the hierarchy rather than shrinking the desktop canvas. Recompose large headlines, overlapping stickers, project grids, asymmetric quotes, pricing comparisons, and ruled footers for narrow screens. Keep meaningful text in reading order; reposition or omit purely decorative graphics where they collide. Use intrinsic sizing and bounded fluid typography, reserve image space, and test once fonts have loaded. Floating docks need clearance above the last content and must not obscure actions or focused elements. Never solve display-type overflow by disabling zoom, flattening the design into tiny text, or hiding page overflow.

Check representative widths such as 320, 375, 768, 1024, 1440, and 1920 CSS pixels, plus an ultrawide width when relevant. These are samples, not an exhaustive guarantee. Resize between samples and inspect just below and above each changed breakpoint. Include a short landscape viewport and 200% zoom; check reflow at a 320 CSS-pixel equivalent for content that can reflow.

Use realistic stress content: long labels, unbroken strings, validation errors, expanded menus, empty/loading states, and larger text. Check page overflow, clipped text, overlapping controls, dialog reachability, and keyboard focus. Verify nested scroll regions remain usable.

Use available browser tooling for actual viewport checks. Report the widths, states, and interactions exercised and any remaining gaps. A production build or CSS inspection alone does not establish responsive correctness. If browser verification is unavailable, provide focused manual checks and label them unverified. Never claim every device was tested.



Scope Kip's browser checks to the changed layout and its failure boundaries. An isolated text correction does not require a device matrix. Layout changes need representative narrow and wide views plus affected breakpoints, content stress, and zoom where relevant. Return concrete viewport and state evidence to the root, not a universal “responsive” claim.
