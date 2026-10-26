import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";

export function CommandBuilder() {
  const [task, setTask] = useState(
    "Create an accessible React login and verify it.",
  );
  const [purpose, setPurpose] = useState("build");
  const [host, setHost] = useState("codex");
  const [implicit, setImplicit] = useState(false);
  const instructions = task.trim() || "Describe your task";
  const command = implicit
    ? `Use Kip to ${purpose} — ${instructions}`
    : `${host === "codex" ? "$kip" : "/kip"} ${purpose} ${instructions}`;
  return (
    <section className="border-y border-line bg-soft" id="playground">
      <div className="section-shell mx-auto grid max-w-[1320px] gap-9 md:grid-cols-[0.85fr_1.35fr] md:gap-10">
        <div className="[&>h2]:text-[40px] [&>p]:text-sm [&>p]:leading-7 [&>p]:text-muted">
          <span className="eyebrow">A LITTLE PRACTICE</span>
          <h2>
            Meet your
            <br />
            next prompt.
          </h2>
          <p>
            Choose your host and tell Kip what you want to make. Copy the prompt
            into your existing chat.
          </p>
        </div>
        <div className="min-w-0 rounded-2xl border border-line bg-surface p-6 md:p-8">
          <span className="mb-6 block text-[10px] font-black tracking-[1.6px] text-subtle">
            CHAT PROMPT PLAYGROUND
          </span>
          <label htmlFor="task">What would you like to work on?</label>
          <input
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="purpose">Purpose</label>
              <select
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              >
                {["build", "fix", "plan", "review"].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="host">Your coding host</label>
              <select
                id="host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              >
                <option value="codex">Codex</option>
                <option value="claude">Claude Code</option>
                <option value="antigravity">Antigravity</option>
              </select>
            </div>
          </div>
          <div className="my-5 flex gap-2">
            {[false, true].map((value) => (
              <button
                key={String(value)}
                aria-pressed={implicit === value}
                onClick={() => setImplicit(value)}
                className={`rounded-lg px-3 py-2 text-xs font-bold ${implicit === value ? "bg-charcoal text-surface" : "bg-soft text-muted"}`}
              >
                {value ? "Natural language" : "Explicit invocation"}
              </button>
            ))}
          </div>
          <CodeBlock text={command} title="Your coding chat" />
          <p className="mb-0 mt-3 text-[11px] leading-6 text-muted">
            {host === "codex"
              ? "Codex uses $kip or its /skills picker. "
              : "Your host exposes the installed skill as /kip. "}
            Paste this into chat, not your terminal. Nothing runs in this
            browser. Hosts may also select Kip automatically for relevant tasks.
          </p>
        </div>
      </div>
    </section>
  );
}
