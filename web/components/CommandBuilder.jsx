import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import {
  buildPrompt,
  getProfiles,
  profileHostDetails,
} from "../data/profiles.js";
import { CommandAutocomplete } from "./CommandAutocomplete.jsx";
import { purposes } from "../data/purposes.js";

const sampleTasks = [
  "Create an accessible React login and verify it.",
  "Resolve dashboard overflow on mobile and check layout.",
  "Plan architecture for multi-agent profile switching.",
  "Explain how authentication works in this project.",
];

const hostOptions = [
  { key: "codex", label: "Codex", prefix: "$kip" },
  { key: "claude", label: "Claude Code", prefix: "/kip" },
  { key: "antigravity", label: "Antigravity", prefix: "/kip" },
];

export function CommandBuilder({
  profile,
  onProfileChange,
  host,
  onHostChange,
}) {
  const [task, setTask] = useState(
    "Create an accessible React login and verify it.",
  );
  const [purpose, setPurpose] = useState("build");
  const profiles = getProfiles(host);
  const [implicit, setImplicit] = useState(false);
  const [typing, setTyping] = useState(false);
  const command = buildPrompt({ task, purpose, host, implicit, profile });

  return (
    <section
      className="docs-section"
      id="playground"
      aria-labelledby="playground-heading"
    >
      <div className="docs-section-header">
        <h2 id="playground-heading">Build a prompt</h2>
        <p>
          Name the outcome, choose a purpose, then copy the result into your
          coding chat.
        </p>
      </div>

      <div className="docs-panel shadow-sm">
        {/* Editor mode toggle: Guided builder vs Type a command */}
        <div
          className="mb-7 inline-flex rounded-xl border border-line bg-soft/60 p-1"
          role="radiogroup"
          aria-label="Prompt editor mode"
        >
          {[
            { value: false, label: "Guided builder" },
            { value: true, label: "Type a command" },
          ].map(({ value, label }) => (
            <button
              key={String(value)}
              type="button"
              role="radio"
              aria-checked={typing === value}
              onClick={() => setTyping(value)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-all duration-150 ${
                typing === value
                  ? "bg-surface text-charcoal shadow-xs ring-1 ring-black/5"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {typing ? (
          <CommandAutocomplete
            key={host}
            host={host}
            onHostChange={onHostChange}
          />
        ) : (
          <>
            {/* Task input with quick pill samples */}
            <div className="mb-6">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="task" className="m-0 font-extrabold text-xs">
                  What would you like to work on?
                </label>
                <span className="text-[11px] text-muted">
                  Be specific about outcome and verification
                </span>
              </div>

              <input
                id="task"
                value={task}
                placeholder="Describe outcome and verification..."
                onChange={(e) => setTask(e.target.value)}
                className="w-full rounded-xl border border-line bg-page px-3.5 py-3 text-sm text-charcoal shadow-xs transition-all placeholder:text-muted focus:border-accent focus:bg-surface focus:outline-none focus:ring-2 focus:ring-accent/25"
              />

              <div className="mt-3">
                <label htmlFor="sample-task">
                  Try an example <span>(optional)</span>
                </label>
                <select
                  id="sample-task"
                  value={sampleTasks.includes(task) ? task : ""}
                  onChange={(event) => {
                    if (event.target.value) setTask(event.target.value);
                  }}
                >
                  <option value="">Choose an example…</option>
                  {sampleTasks.map((sample) => (
                    <option key={sample} value={sample}>
                      {sample}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Purpose & Host controls */}
            <div className="mb-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="purpose">Purpose</label>
                <select
                  id="purpose"
                  value={purpose}
                  onChange={(event) => setPurpose(event.target.value)}
                  aria-describedby="purpose-help"
                >
                  {purposes.map(({ name, description }) => (
                    <option key={name} value={name}>
                      {name} — {description}
                    </option>
                  ))}
                </select>
                <p
                  id="purpose-help"
                  className="mb-0 mt-2 text-xs leading-6 text-muted"
                  aria-live="polite"
                >
                  {purposes.find(({ name }) => name === purpose)?.detail}
                </p>
              </div>
              <div>
                <label htmlFor="host">Your coding host</label>
                <select
                  id="host"
                  value={host}
                  onChange={(event) => onHostChange(event.target.value)}
                >
                  {hostOptions.map(({ key, label }) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="profile">
                  Model profile <span>(optional)</span>
                </label>
                <select
                  id="profile"
                  value={profile}
                  onChange={(event) => onProfileChange(event.target.value)}
                  aria-describedby="profile-help"
                >
                  <option value="">Host defaults — no override</option>
                  {profiles.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                      {item.slug === "value" ? " — suggested start" : ""}
                    </option>
                  ))}
                </select>
                <p
                  id="profile-help"
                  className="mb-0 mt-2 text-xs leading-6 text-muted"
                >
                  {profile
                    ? "Adds a one-task override using " +
                      profileHostDetails[host].name +
                      " settings. It does not change a profile saved for your project."
                    : "Uses your current chat and host settings without requesting role overrides."}
                </p>
              </div>
            </div>

            {/* Invocation style toggle */}
            <div className="mb-5">
              <span className="mb-2 block text-xs font-extrabold">
                Invocation style
              </span>
              <div
                className="inline-flex rounded-xl border border-line bg-soft/60 p-1"
                role="radiogroup"
                aria-label="Invocation style"
              >
                {[
                  {
                    value: false,
                    label: "Explicit command",
                    hint: `${hostOptions.find((h) => h.key === host)?.prefix} ...`,
                  },
                  {
                    value: true,
                    label: "Natural language",
                    hint: "Use Kip to...",
                  },
                ].map(({ value, label, hint }) => (
                  <button
                    key={String(value)}
                    type="button"
                    role="radio"
                    aria-checked={implicit === value}
                    onClick={() => setImplicit(value)}
                    className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-150 ${
                      implicit === value
                        ? "bg-surface text-charcoal shadow-xs ring-1 ring-black/5"
                        : "text-muted hover:text-charcoal"
                    }`}
                  >
                    <span>{label}</span>
                    <span className="font-mono text-[10px] text-muted font-normal">
                      ({hint})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated prompt preview in CodeBlock */}
            <div className="overflow-hidden rounded-xl shadow-md">
              <CodeBlock text={command} title="Your coding chat" />
            </div>
          </>
        )}

        <p className="mb-0 mt-4 text-xs leading-6 text-muted">
          {host === "codex"
            ? "Codex uses $kip or its /skills picker. "
            : "Your host exposes the installed skill as /kip. "}
          Paste the prompt into chat, not your terminal. This page only prepares
          text; it does not run Kip or change host settings. Hosts may also
          select Kip automatically when its description matches the task.
        </p>
      </div>
    </section>
  );
}
