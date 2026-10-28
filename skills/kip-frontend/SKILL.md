---
name: kip-frontend
description: Kip-specific frontend guidance. Use within an active Kip task or when explicitly requested for Kip.
---

# Frontend

This guidance supports Kip's assigned worker or reviewer scope. The root owns team dispatch, profile settings, and integration; do not spawn additional agents from a supporting role. Apply only sections relevant to the change.

Reuse the project's framework, component system, and data conventions. Prefer native platform capabilities and existing dependencies over new abstraction layers. Separate rendering from transport when it clarifies the data contract or makes behavior easier to test. Define the contract before inventing mock responses.

## Correctness and accessibility

For expressive marketing pages, implement the chosen type and composition as real responsive content. Load the intended fonts, reserve media aspect ratios, keep decorative layers outside the interaction and accessibility paths, and give fixed navigation appropriate document and focus clearance. Deliver working destinations and controls before adding animation. Scroll effects must preserve readable static content, native scrolling, and reduced-motion behavior; a static reference is not evidence that a particular animation exists.

For each changed interaction, identify the user action, resulting visible state, and failure or cancellation path. Reuse the existing component when it can express that contract. Do not add a parallel component system, demonstration dashboard, or decorative feature merely to make the output look complete. Return changed files and interactions actually exercised to Kip's root; leave orchestration and profile state there.

Use semantic elements and native controls first. Provide accessible names, visible keyboard focus, logical focus movement, and feedback for loading, success, empty, and error states. Keep decorative icons out of the accessibility tree and name meaningful icon-only controls. Use the project's icon components or SVGs rather than emoji or Unicode symbols, whose glyphs vary by platform.

Support keyboard, pointer, and touch input without hover-only behavior. Respect reduced motion. Keep controls responsive to input and make state changes visually legible, but do not add animation merely to make an interface feel polished. Repeated or keyboard-driven actions should usually respond immediately; occasional transitions should be short, purposeful, and interruptible.

Validate long content, slow and failed requests, repeated actions, and responsive layout in a real browser. Read the frontend-design guidance when visual direction is part of the task and responsive-design for viewport verification.

## React state and rendering

When working in React or a React framework:

- Derive values during render instead of mirroring them in state. Put interaction logic in event handlers and reserve effects for synchronization with external systems.
- Keep effect dependencies precise and primitive where practical, and clean up subscriptions and global listeners. Do not define component types inside other components.
- Use functional state updates when the next value depends on the previous one. Lazily initialize expensive state and keep transient, high-frequency values out of render state when a ref is sufficient.
- Do not memoize simple expressions by reflex. Optimize measured expensive work, stabilize identities only where they affect behavior, and split components or subscriptions when that narrows costly updates.
- Use transitions or deferred values for genuinely non-urgent expensive rendering so typing and direct manipulation remain responsive.

## Data flow and performance

Prioritize structural performance issues before micro-optimizations:

1. Eliminate request waterfalls. Start independent work together, await only in branches that need the result, and stream behind useful boundaries when the framework supports it.
2. Control shipped code. Prefer direct, statically analyzable imports; load genuinely heavy optional features only when needed; and defer non-critical third-party scripts until after the primary experience is usable.
3. Keep server and client responsibilities clear. Minimize serialized data crossing the boundary, avoid mutable request state at module scope, cache only with an understood lifetime, and authenticate server actions like any other server endpoint.
4. Deduplicate shared client requests and global listeners. Keep persistent browser storage minimal, versioned, and tolerant of malformed or older data.
5. Optimize JavaScript loops, lookups, DOM writes, and rendering only when their cost is plausible or measured. Prefer clear code when the difference is immaterial.

Keep secrets and authorization enforcement on the server. Treat client checks as user experience, not security boundaries.

## Icons

Read [frontend-icons.md](../kip/references/frontend-icons.md) only for this stack or requested integration.

## When the project uses Tailwind CSS

Read [frontend-tailwind.md](../kip/references/frontend-tailwind.md) only for this stack or requested integration.

## Verification

Run the production build and the project's relevant tests. Exercise the shipped interface rather than relying on compilation alone. For performance work, state the bottleneck being addressed and gather evidence appropriate to it: request timing, bundle analysis, render profiling, or browser performance traces. Do not claim an optimization from a pattern change without measuring the affected behavior when measurement is feasible.
