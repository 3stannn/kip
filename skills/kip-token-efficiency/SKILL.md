---
name: kip-token-efficiency
description: Keep active Kip work efficient through selective context, bounded tool output, and concise handoffs. Use within Kip or when explicitly requested for Kip.
---

# Kip token efficiency

Kip's unit of progress is a verified change or a resolved question. Optimize total work needed to reach that result; a short prompt that causes retries is not a saving.

- Start with acceptance conditions, the diff/status, applicable instructions, and targeted searches. Use file lists and bounded search excerpts before reading complete files. Read a whole file when relationships matter; do not lose necessary context to an arbitrary cap.
- Load the Kip entrypoint, profile state, and only relevant specialty guidance. Read conditional framework guidance only for the installed stack. Retain facts already established; reread when files or assumptions change.
- Batch independent reads and checks with bounded outputs. Keep edits, dependencies, approvals, and adaptive follow-ups sequential. Prefer a local deterministic operation to another reasoning call for parsing, formatting, and validation.
- A selected profile does not require agents. Apply Kip's orchestration gates before delegation; count duplicate context and integration work against its benefit. Use narrow fresh handoffs when role settings require them, not entire histories.
- Preserve a compact continuation record: project/root, outcome, effective and saved profiles, persistence status, authorization scope, agent count/ownership, changed files, decisions, checks, and next unresolved step. Keep bulky logs in local artifacts and point to relevant sections.
- Fix the observed cause before retrying. Do not repeat unchanged tool calls, polling, broad scans, builds, or review loops. Recheck after relevant changes or new evidence. Stop when acceptance conditions and required checks pass.
- Honor selected settings and explicit budgets. Do not silently escalate models, invent token limits, or remove requirements to save tokens. Report measured usage only when the host provides it; bytes, calls, and intended cost are not token or dollar measurements.

Keep progress messages to new findings, decisions, or blockers. Final output names the result, actual verification, and material limitations; omit process recaps and repeated plans.
