import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import {
  buildPrompt,
  getProfiles,
  profileHostDetails,
} from "../data/profiles.js";
import { CommandAutocomplete } from "./CommandAutocomplete.jsx";

const sampleTaskPills = [
  "Create an accessible React login and verify it.",
  "Resolve dashboard overflow on mobile and check layout.",
  "Plan architecture for multi-agent profile switching.",
  "Review changes for security, auth rules, and edge cases.",
];

const purposeDescriptions = {
  build: "Implement a task and verify it",
  fix: "Investigate and resolve an issue",
  plan: "Outline work before implementation",
  review: "Review code and report findings",
};

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

              {/* Sample task pill tags */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-medium text-muted">
                  Try sample:
                </span>
                {sampleTaskPills.map((pill) => (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setTask(pill)}
                    className="truncate rounded-full border border-line bg-surface px-2.5 py-0.5 text-[11px] font-semibold text-charcoal transition-all hover:border-subtle hover:bg-page hover:text-ink max-w-[260px] sm:max-w-none"
                    title={pill}
                  >
                    {pill
                      .replace(" and verify it.", "")
                      .replace(" and check layout.", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Purpose & Host controls */}
            <div className="mb-6 grid gap-5 sm:grid-cols-2">
              {/* Purpose selector with pill chips */}
              <div>
                <label htmlFor="purpose">Purpose</label>
                <div
                  className="grid grid-cols-2 gap-2"
                  role="radiogroup"
                  aria-label="Select command purpose"
                >
                  {["build", "fix", "plan", "review"].map((item) => {
                    const isSelected = purpose === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setPurpose(item)}
                        className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition-all duration-150 ${
                          isSelected
                            ? "border-accent bg-accent/15 text-charcoal shadow-xs ring-1 ring-accent/30"
                            : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                        }`}
                      >
                        <span className="font-mono text-xs font-extrabold capitalize text-ink">
                          {item}
                        </span>
                        <span className="truncate text-[10px] text-muted">
                          {purposeDescriptions[item]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Accessible native select fallback */}
                <div className="sr-only">
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
              </div>

              {/* Host platform selector */}
              <div>
                <label htmlFor="host">Your coding host</label>
                <div
                  className="grid grid-cols-1 gap-2 sm:grid-cols-3"
                  role="radiogroup"
                  aria-label="Select coding host"
                >
                  {hostOptions.map((opt) => {
                    const isSelected = host === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => onHostChange(opt.key)}
                        className={`flex flex-col items-start gap-0.5 rounded-xl border p-2.5 text-left transition-all duration-150 ${
                          isSelected
                            ? "border-accent bg-accent/15 text-charcoal shadow-xs ring-1 ring-accent/30 font-bold"
                            : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                        }`}
                      >
                        <span className="text-xs font-bold text-ink">
                          {opt.label}
                        </span>
                        <span className="font-mono text-[10px] text-muted">
                          {opt.prefix}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Accessible select */}
                <div className="sr-only">
                  <select
                    id="host"
                    value={host}
                    onChange={(e) => onHostChange(e.target.value)}
                  >
                    <option value="codex">Codex</option>
                    <option value="claude">Claude Code</option>
                    <option value="antigravity">Antigravity</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Model Profile selector */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="profile" className="m-0 font-extrabold text-xs">
                  Model profile <span>(optional)</span>
                </label>
                {profile && (
                  <button
                    type="button"
                    onClick={() => onProfileChange("")}
                    className="text-[11px] font-semibold text-muted hover:text-charcoal"
                  >
                    Reset to host defaults
                  </button>
                )}
              </div>

              {/* Profile pill buttons */}
              <div
                className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6"
                role="radiogroup"
                aria-label="Select optional profile override"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={profile === ""}
                  onClick={() => onProfileChange("")}
                  className={`rounded-xl border p-2 text-left text-xs transition-all duration-150 ${
                    profile === ""
                      ? "border-accent bg-accent/15 text-charcoal shadow-xs ring-1 ring-accent/30 font-bold"
                      : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                  }`}
                >
                  <span className="block font-bold">Host defaults</span>
                  <span className="text-[10px] text-muted">No override</span>
                </button>
                {profiles.map((item) => {
                  const isSelected = profile === item.slug;
                  return (
                    <button
                      key={item.slug}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => onProfileChange(item.slug)}
                      className={`rounded-xl border p-2 text-left text-xs transition-all duration-150 ${
                        isSelected
                          ? "border-accent bg-accent/15 text-charcoal shadow-xs ring-1 ring-accent/30 font-bold"
                          : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                      }`}
                    >
                      <span className="block font-bold">{item.name}</span>
                      <span className="text-[10px] text-muted">
                        {item.slug === "value" ? "Suggested" : "Preset"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Native select fallback */}
              <div className="sr-only">
                <select
                  id="profile"
                  value={profile}
                  onChange={(event) => onProfileChange(event.target.value)}
                >
                  <option value="">Host defaults</option>
                  {profiles.map((item) => (
                    <option key={item.slug} value={item.slug}>
                      {item.name}
                      {item.slug === "value" ? " — suggested start" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <p className="mb-0 mt-2.5 text-xs leading-6 text-muted">
                {profile
                  ? `Adds a one-task override using ${profileHostDetails[host].name} settings. It does not change a profile saved for your project.`
                  : "Uses your current chat and host settings without requesting role overrides."}
              </p>
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
