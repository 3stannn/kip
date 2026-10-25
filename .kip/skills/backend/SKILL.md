---
name: backend
description: Implement JavaScript server logic, API contracts, persistence, and background processing.
---

# Backend

Define input, output, errors, and authorization at each endpoint. Validate inputs at the boundary, parameterize persistence, and preserve data invariants with appropriate transactions. Make retries bounded and side effects idempotent where duplicate delivery is possible. Set timeouts for external services and distinguish retryable from permanent errors. Prefer existing architecture over speculative service layers. Plan migrations for existing records and rollback constraints. Log actionable metadata without credentials or sensitive payloads. Include meaningful success and failure verification.
