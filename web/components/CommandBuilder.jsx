import React from "react";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";

export function CommandBuilder() {
  const [task, setTask] = useState("Build an accessible React login");
  const [file, setFile] = useState("src/App.jsx");
  const [tier, setTier] = useState("standard");
  const [model, setModel] = useState("");
  const [mode, setMode] = useState("plan");
  const quote = (value) => "'" + value.replaceAll("'", "'\\''") + "'";
  const command = `kip ${mode} ${quote(task.trim() || "Describe your task")}${file.trim() ? ` --file ${quote(file.trim())}` : ""}${tier === "complex" ? " --tier complex" : ""}${model.trim() ? ` --model ${quote(model.trim())}` : ""}`;
  return (
    <section className="border-y border-line bg-soft" id="playground">
      <div className="section-shell mx-auto grid max-w-[1320px] gap-9 md:grid-cols-[0.85fr_1.35fr] md:gap-10">
        <div className="[&>h2]:text-[40px] [&>p]:text-sm [&>p]:leading-7 [&>p]:text-muted">
          <span className="eyebrow">A LITTLE PRACTICE</span>
          <h2>
            Meet your
            <br />
            next command.
          </h2>
          <p>
            Tell Kip what’s on your mind.
            <br />
            We’ll help you put it into words
            <br />
            your terminal understands.
          </p>
          <span className="mt-7 inline-block -rotate-6 text-sm italic text-subtle">
            go on, make it yours ↗
          </span>
        </div>
        <div className="min-w-0 rounded-2xl border border-line bg-surface p-6 md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] font-black tracking-[1.6px] text-subtle">
              COMMAND PLAYGROUND
            </span>
            <span className="rounded-full bg-[#f0f0f0] px-3 py-1.5 text-[10px] font-bold text-charcoal">
              Local command preview
            </span>
          </div>
          <label htmlFor="task">What would you like to work on?</label>
          <input
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <div className="mt-5 grid gap-4 sm:grid-cols-[1.3fr_1fr]">
            <div>
              <label htmlFor="file">
                File to include <span>(optional)</span>
              </label>
              <input
                id="file"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                placeholder="src/App.jsx"
              />
            </div>
            <div>
              <label htmlFor="tier">Task complexity</label>
              <select
                id="tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="complex">Complex</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="model">
              Codex model <span>(optional)</span>
            </label>
            <input
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="Use Codex default"
              aria-describedby="model-help"
            />
            <p
              id="model-help"
              className="mb-0 mt-2 text-[11px] leading-6 text-muted"
            >
              Leave blank to use your configured tier or the Codex default. An
              override must be a Codex model available to your account. This
              does not inherit the model selected in an open chat.
            </p>
          </div>
          <div className="my-5 flex flex-wrap items-center justify-between gap-3 [&>span]:text-[10px] [&>span]:text-muted">
            <div className="flex gap-1 rounded-lg bg-soft p-1 [&>button]:rounded-md [&>button]:px-3 [&>button]:py-2 [&>button]:text-[11px] [&>button]:font-extrabold [&>button]:text-muted">
              {["plan", "run"].map((m) => (
                <button
                  key={m}
                  aria-pressed={mode === m}
                  className={
                    mode === m
                      ? "!bg-surface !text-charcoal shadow-sm"
                      : "hover:bg-surface/50"
                  }
                  onClick={() => setMode(m)}
                >
                  {m === "plan" ? "○ Plan first" : "↗ Run task"}
                </button>
              ))}
            </div>
            <span>
              {mode === "plan" ? "Preview offline" : "Requires ChatGPT sign-in"}
            </span>
          </div>
          <CodeBlock text={command} />
          <p className="mb-0 mt-3 text-[11px] leading-6 text-muted">
            {mode === "plan"
              ? "Copy this into your initialized project’s terminal. Nothing runs in this browser."
              : "Run kip login first, or reuse your Codex ChatGPT sign-in. Runs use your account’s Codex allowance; nothing runs in this browser."}
          </p>
        </div>
      </div>
    </section>
  );
}
