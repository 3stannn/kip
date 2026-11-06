import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import { ChevronDownIcon } from "./Icons.jsx";

const hosts = [
  { key: "codex", label: "Codex", prefix: "$kip" },
  { key: "claude", label: "Claude Code", prefix: "/kip" },
  { key: "antigravity", label: "Antigravity", prefix: "/kip" },
];

export function Updates() {
  const [host, setHost] = useState("codex");
  const [terminal, setTerminal] = useState(false);
  const selectedHost = hosts.find(({ key }) => key === host);
  const command = terminal
    ? `node bin/kip.js update --host ${host}`
    : `${selectedHost.prefix} update`;

  return (
    <section
      className="docs-section"
      id="updates"
      aria-labelledby="updates-heading"
    >
      <div className="docs-section-header">
        <h2 id="updates-heading">Update Kip</h2>
        <p>
          Choose your host, then copy the command to refresh its installed
          skills.
        </p>
      </div>
      <div className="docs-panel">
        <div className="max-w-sm">
          <label htmlFor="update-host">Your coding host</label>
          <select
            id="update-host"
            value={host}
            onChange={(event) => setHost(event.target.value)}
          >
            {hosts.map(({ key, label }) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div
          className="my-5 inline-flex rounded-xl border border-line bg-soft/60 p-1"
          role="group"
          aria-label="Where to run the update command"
        >
          {[false, true].map((value) => (
            <button
              key={String(value)}
              type="button"
              aria-pressed={terminal === value}
              onClick={() => setTerminal(value)}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition-colors duration-150 ${
                terminal === value
                  ? "bg-surface text-charcoal shadow-xs ring-1 ring-black/5"
                  : "text-muted hover:text-charcoal"
              }`}
            >
              {value ? "In terminal" : "In chat"}
            </button>
          ))}
        </div>
        <CodeBlock
          text={command}
          title={terminal ? "Terminal" : selectedHost.label}
        />
        <p className="mb-0 mt-3 text-xs leading-6 text-muted">
          {terminal
            ? "Run this from your existing Kip clone. "
            : `Paste this into your ${selectedHost.label} coding chat. `}
          Only existing installations for this host are refreshed; missing hosts
          are skipped. Restart the host or open a new session afterward. Nothing
          runs in this browser, and updates happen only when you ask.
        </p>
        <details className="group mt-5 border-t border-line pt-5">
          <summary className="flex list-none items-center justify-between gap-3 text-xs font-extrabold">
            Requirements and backups
            <ChevronDownIcon className="size-4 text-subtle transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 text-xs leading-6 text-muted">
            Requires Git, Node.js 22+, network access, and a clean Kip clone
            with a tracking branch. The updater pulls from that clone’s
            configured upstream using fast-forward-only behavior. Local changes
            or divergent history stop the update.
          </p>
          <p className="mb-0 text-xs leading-6 text-muted">
            Previous skills are saved under kip-backups beside each host’s
            skills directory before replacements are installed. The updater
            reports the backup paths. Customizations remain in those backups;
            they are not merged automatically.
          </p>
        </details>
        <details className="group mt-5 border-t border-line pt-5">
          <summary className="flex list-none items-center justify-between gap-3 text-xs font-extrabold">
            Updating an older installation?
            <ChevronDownIcon className="size-4 text-subtle transition-transform group-open:rotate-180" />
          </summary>
          <p className="my-4 text-xs leading-6 text-muted">
            Older skills need a one-time terminal update before they recognize
            the chat command. Run these commands from your Kip clone, then
            restart your host.
          </p>
          <CodeBlock
            text={`git pull --ff-only\nnode bin/kip.js update --host ${host}\nnode bin/kip.js doctor --host ${host}`}
            title="Terminal"
          />
        </details>
      </div>
    </section>
  );
}
