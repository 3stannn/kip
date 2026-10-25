import React from "react";

export function FAQ() {
  return (
    <section
      className="section-shell grid gap-8 md:grid-cols-[0.85fr_1.35fr] md:gap-10 [&>div>p]:text-sm [&>div>p]:text-muted"
      id="questions"
    >
      <div>
        <span className="eyebrow">GOOD QUESTIONS</span>
        <h2>A little clarity.</h2>
        <p>Before you open that terminal.</p>
      </div>
      <div className="[&_details]:border-b [&_details]:border-line [&_details]:py-5 [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:justify-between [&_summary]:gap-5 [&_summary]:text-sm [&_summary]:font-extrabold [&_summary_span]:text-2xl [&_summary_span]:font-normal [&_summary_span]:text-subtle [&_details[open]_summary_span]:rotate-45 [&_p]:mr-6 [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted">
        {[
          [
            "Does Kip change my files?",
            "The current runner returns code, patches, and instructions for you to review. It does not apply patches to your application or deploy. Runs use Codex in a read-only sandbox with the shell tool disabled. You choose what to apply.",
          ],
          [
            "Do I need an API key?",
            "No. Run kip login and sign in with your ChatGPT account, or reuse an existing Codex ChatGPT sign-in. API-key sign-in is rejected. Your account needs Codex access, and its usage limits and workspace policies apply.",
          ],
          [
            "Which model will it use?",
            "By default, Codex chooses its default model. Configure a model per tier in .kip/config.json or pass --model with a supported Codex model ID. Kip cannot inherit the model selected in an open chat or unlock models outside your account’s access.",
          ],
          [
            "How does a run use my allowance?",
            "Kip starts one Codex execution without automatic retries or escalation of its own. Codex may make multiple model requests or retry internally. Reported usage is saved with the result. Context bytes and timeouts are configurable; the runner does not enforce a hard output-token cap.",
          ],
          [
            "Which files does it use?",
            "Kip includes text files you explicitly select with --file and the relevant local skill instructions. Codex adds its own instructions and context. Paths must stay within your project. Review file contents before including them; filename guards are not a secret scanner.",
          ],
          [
            "Where do my settings and results live?",
            "Edit models, context limits, and timeouts in .kip/config.json. Skills live in .kip/skills/. Run responses and reported usage are saved in .kip/runs/. Codex manages your sign-in credentials.",
          ],
          [
            "Can I install it from npm?",
            "This package is not published to npm. From the downloaded package folder, run npm install --global . to install the kip command. You need Node.js 22 or newer and a current Codex CLI. Install Codex with npm install --global @openai/codex.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span>+</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
