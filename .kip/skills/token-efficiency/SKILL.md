---
name: token-efficiency
description: Reduce context and model calls for file-based OpenAI workflows while preserving task requirements.
---

# Token Efficiency

Start with the smallest relevant file set and a clear acceptance condition. Read skill metadata before loading bodies; load only relevant skills. Use deterministic routing and local tools for predictable work. Keep stable instructions ahead of changing task data. Do not pad prompts to trigger caching. Prefer one capable call over planner, executor, and critic calls for routine tasks. Split only independently valuable work. Request focused diffs rather than complete unchanged files. Retain decisions and unresolved issues in concise handoffs rather than replaying history. Explicitly escalate the model only when complexity or observed failure warrants it. Report actual usage; byte limits are not token counts or dollar budgets. Never claim savings without a measured baseline.
