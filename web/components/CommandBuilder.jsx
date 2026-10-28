import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import {
  buildPrompt,
  getProfiles,
  profileHostDetails,
} from "../data/profiles.js";
import { CommandAutocomplete } from "./CommandAutocomplete.jsx";

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
      <div className="docs-panel">
        <div
          className="mb-6 flex flex-wrap gap-2"
          role="group"
          aria-label="Prompt editor mode"
        >
          {[false, true].map((value) => (
            <button
              key={String(value)}
              aria-pressed={typing === value}
              onClick={() => setTyping(value)}
              className={`rounded-lg px-3 py-2 text-xs font-bold ${typing === value ? "bg-charcoal text-surface" : "bg-soft text-muted"}`}
            >
              {value ? "Type a command" : "Guided builder"}
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
                  onChange={(e) => onHostChange(e.target.value)}
                >
                  <option value="codex">Codex</option>
                  <option value="claude">Claude Code</option>
                  <option value="antigravity">Antigravity</option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label htmlFor="profile">
                Model profile <span>(optional)</span>
              </label>
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
              <p className="mb-0 mt-2 text-[11px] leading-6 text-muted">
                {profile
                  ? `Adds a one-task override using ${profileHostDetails[host].name} settings. It does not change a profile saved for your project.`
                  : "Uses your current chat and host settings without requesting role overrides."}
              </p>
            </div>
            <div className="my-5 flex flex-wrap gap-2">
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
          </>
        )}
        <p className="mb-0 mt-3 text-[11px] leading-6 text-muted">
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
