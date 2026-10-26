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
        <p>Before your next chat.</p>
      </div>
      <div className="[&_details]:border-b [&_details]:border-line [&_details]:py-5 [&_summary]:flex [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:items-center [&_summary]:justify-between [&_summary]:gap-5 [&_summary]:text-sm [&_summary]:font-extrabold [&_summary_span]:text-2xl [&_summary_span]:font-normal [&_summary_span]:text-subtle [&_details[open]_summary_span]:rotate-45 [&_p]:mr-6 [&_p]:mt-3 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted">
        {[
          [
            "Do I need to sign in or supply an API key?",
            "Kip adds no sign-in, API key, server, or separate runner. It runs inside the coding chat you already use. Optional profiles use your host’s delegation tools and usage allowance. Your host application retains its own access requirements and usage limits.",
          ],
          [
            "Can I type /kip in Codex?",
            "Use $kip followed by your purpose and instructions, or select Kip in Codex’s /skills picker. Codex controls slash command registration. Claude Code and Antigravity expose the skill as /kip.",
          ],
          [
            "Can it activate automatically?",
            "Yes, the skill allows implicit invocation for staged coding work across specialties. Your host decides when the description matches. You can always invoke it explicitly or say ‘Use Kip to …’.",
          ],
          [
            "Does Kip change my project?",
            "When you ask for implementation, Kip uses the current host’s tools to edit and verify your project. A planning request produces a plan. Your host’s permissions and approval rules apply.",
          ],
          [
            "Which model does it use?",
            "The root uses the model and thinking effort selected in your current chat. Use $kip profiles (or /kip profiles) to see seven optional profiles for a root, reviewer, and two workers. Select one with $kip profile value, or override one task with $kip build --profile premium followed by your task. Reviewer and worker settings require host-native delegation support; Kip discloses unsupported settings.",
          ],
          [
            "Where does it install?",
            "Globally: ~/.codex/skills/kip and ~/.agents/skills/kip for Codex, ~/.claude/skills/kip for Claude Code, and ~/.gemini/config/skills/kip plus ~/.gemini/antigravity-cli/skills/kip for Antigravity. CODEX_HOME is respected when set.",
          ],
          [
            "How do I install or update?",
            "Clone https://github.com/3stannn/kip.git and run node bin/kip.js install. Git and Node.js 22+ are needed. To update, submit $kip update in Codex or /kip update in Claude Code or Antigravity, or run node bin/kip.js update from your clone. The updater pulls upstream changes and backs up existing skills before refreshing them. Older installs need a one-time git pull --ff-only and terminal update. Restart your host afterward.",
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
