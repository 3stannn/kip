# Feasibility spike

Use this workflow when a build or plan depends on one unresolved fact about a platform, library, API, or approach. First inspect relevant existing code, pinned versions, or prior results. If they settle the question, cite that evidence.

## Define and run the experiment

- State the question, the observable result that would answer it, and how the answer changes the plan. Choose a time limit that fits the task, with 30 minutes as a fallback.
- Run the experiment only in a purpose that permits writes and when the task authorizes it. In `plan` or `review`, use existing evidence and describe the proposed experiment if needed. In `ask`, use existing evidence.
- Put temporary code and data in an isolated scratch directory when permitted. Exercise the real protocol, library, or platform with the smallest representative input and a local or approved test environment. A mock can help shape the experiment but cannot prove what an external dependency does. When evaluating a proposed fix, observe the failure first where practical.
- Keep the command, observed result, and relevant version or environment. Stop when the question is answered, the time limit is reached, or a prerequisite prevents the run. Clean up resources created for the spike and keep only authorized evidence. Carry the finding into the plan and develop the production change separately.

Report the question, what ran, the observed result or reason it remains inconclusive, and the implication for the plan. Qualify the answer to the versions and inputs actually exercised.
