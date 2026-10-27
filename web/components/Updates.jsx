import React, { useState } from "react";
import { CodeBlock } from "./CodeBlock.jsx";
import { ChevronDownIcon } from "./Icons.jsx";

export function Updates() {
  const [host, setHost] = useState("codex");
  const [terminal, setTerminal] = useState(false);
  const command = terminal
    ? `node bin/kip.js update --host ${host}`
    : `${host === "codex" ? "$kip" : "/kip"} update`;

  return (
    <section
      className="docs-section"
      id="updates"
      aria-labelledby="updates-heading"
    >
      <div className="docs-section-header">
        <h2 id="updates-heading">Update Kip</h2>
        <p>
          Refresh existing installations from the upstream configured on your
          current Kip clone. Updates run only when you ask.
        </p>
      </div>
      <div className="docs-panel">
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
          This updates existing copies for the selected host; it does not
          install missing hosts. Nothing runs in this browser.
        </p>
        <p className="text-xs leading-6 text-muted">
          The updater pulls with fast-forward-only behavior, backs up installed
          skills, refreshes them, and reports the backup paths. Restart the host
          or open a new session afterward.
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
            <ChevronDownIcon className="size-4 text-subtle" />
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
