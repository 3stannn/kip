import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";

export function Updates() {
  const [host, setHost] = useState("codex");
  const [terminal, setTerminal] = useState(false);
  const command = terminal
    ? `node bin/kip.js update --host ${host}`
    : `${host === "codex" ? "$kip" : "/kip"} update`;

  return (
    <section
      className="section-shell grid gap-8 border-b border-line md:grid-cols-[0.85fr_1.35fr] md:gap-10"
      id="updates"
    >
      <div>
        <span className="eyebrow">KEEP YOUR BUDDY CURRENT</span>
        <h2>
          A fresh start.
          <br />
          One little command.
        </h2>
        <p className="text-sm leading-7 text-muted">
          Already have Kip? Pull the latest changes and refresh your installed
          skills from the chat you already use.
        </p>
        <ol className="mt-6 space-y-4 text-xs leading-6 text-muted">
          {[
            ["Pull", "Get the latest changes from your clone’s upstream."],
            [
              "Refresh",
              "Back up installed skills, then replace them with the new version.",
            ],
            [
              "Restart",
              "Restart your host or open a new session to load the update.",
            ],
          ].map(([title, description], index) => (
            <li key={title} className="flex items-start gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line bg-surface font-mono text-[10px]">
                0{index + 1}
              </span>
              <span>
                <strong className="mr-1 font-extrabold text-charcoal">
                  {title}.
                </strong>{" "}
                {description}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="min-w-0 rounded-2xl border border-line bg-surface p-6 md:p-8">
        <label htmlFor="update-host">Your coding host</label>
        <select
          id="update-host"
          value={host}
          onChange={(event) => setHost(event.target.value)}
        >
          <option value="codex">Codex</option>
          <option value="claude">Claude Code</option>
          <option value="antigravity">Antigravity</option>
        </select>
        <div
          className="my-5 flex flex-wrap gap-2"
          role="group"
          aria-label="Where to run the update command"
        >
          {[false, true].map((value) => (
            <button
              key={String(value)}
              aria-pressed={terminal === value}
              onClick={() => setTerminal(value)}
              className={`rounded-lg px-3 py-2 text-xs font-bold ${terminal === value ? "bg-charcoal text-surface" : "bg-soft text-muted"}`}
            >
              {value ? "In terminal" : "In chat"}
            </button>
          ))}
        </div>
        <CodeBlock
          text={command}
          title={
            terminal ? "Terminal — inside your Kip clone" : "Your coding chat"
          }
        />
        <p className="mt-3 text-xs leading-6 text-muted">
          {terminal
            ? "Run this from your existing Kip clone. "
            : "Paste this into your coding chat. "}
          Updates existing copies for the selected host. Nothing runs in this
          browser.
        </p>
        <p className="text-xs leading-6 text-muted">
          Requires Git, Node.js 22+, network access, and a clean clone with a
          tracking branch. Local changes or divergent history stop the update.
          Skill customizations stay in backups; they aren’t merged
          automatically.
        </p>
        <details className="mt-5 border-t border-line pt-5">
          <summary className="flex list-none items-center justify-between gap-3 text-xs font-extrabold">
            Updating an older installation?{" "}
            <span aria-hidden="true" className="text-lg text-subtle">
              ↗
            </span>
          </summary>
          <p className="my-4 text-xs leading-6 text-muted">
            Older skills need a one-time terminal update before they recognize
            the chat command. Run these commands from your Kip clone, then
            restart your host.
          </p>
          <CodeBlock
            text={`git pull --ff-only\nnode bin/kip.js update --host ${host}\nnode bin/kip.js doctor --host ${host}`}
            title="Terminal — inside your Kip clone"
          />
        </details>
        <p className="mb-0 mt-5 text-[11px] leading-6 text-muted">
          Updates happen when you ask. Previous copies are saved under
          kip-backups beside each host’s skills directory; the updater prints
          their locations.
        </p>
      </div>
    </section>
  );
}
