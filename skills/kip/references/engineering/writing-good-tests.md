# Writing good tests

Read this when writing or modifying a test under [TDD](tdd.md).

- Name the observable regression that the test should catch. Choose an assertion on the result a caller or user relies on, such as a returned value, rejected input, persisted state, or visible interaction.
- Derive expected values from the contract with a known input or a hand-checked fixture. Computing both sides with the same logic can let the defect produce a passing result.
- Drive the real entry point where practical. Assert the production outcome and cover a distinct boundary or failure case when it would catch a plausible regression. Avoid pinning incidental text, private structure, or framework behavior unless it is part of the contract.
- Replace an external, slow, or nondeterministic dependency at the narrowest useful boundary. Keep the real effects the test observes. Model the dependency's relevant response shape and verify calls only when their arguments or order are part of the outcome.
- Keep test setup and cleanup in fixtures or test utilities. When a fixture becomes more complex than the behavior it exercises, try a small integration test with real components.

Before keeping an assertion, identify the production change that would make it fail. For example, a test of invalid-input handling should fail if the input passes validation and writes a record.
