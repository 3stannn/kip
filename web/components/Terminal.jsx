import React from "react";
import { WindowChrome } from "./WindowChrome.jsx";

const demos = [
  {
    command:
      "git clone https://github.com/3stannn/kip.git && cd kip && node bin/kip.js install",
    output: [
      "Installer scope",
      "Codex · Claude Code · Antigravity",
      "",
      "Restart the host, then open your project.",
    ],
    label: "Terminal · local installer",
  },
  {
    command: "$kip plan Build an accessible React login",
    output: [
      "Example plan response",
      "Delegate analysis, then review the plan",
      "Inspect the existing auth flow",
      "Define states, boundaries, and checks",
      "Return the plan without editing files",
    ],
    label: "Codex · coding chat",
  },
  {
    command: "/kip build Create an accessible React login",
    output: [
      "Example build response",
      "Inspect the current project and constraints",
      "Implement the requested flow",
      "Run relevant checks",
      "Report changes and remaining gaps",
    ],
    label: "Claude Code / Antigravity · chat",
  },
];
export function Terminal({ active }) {
  const demo = demos[active];
  return (
    <div className="terminal-card relative z-10 w-full max-w-117.5">
      <WindowChrome title={demo.label} />
      <div className="min-h-71.25 px-4 py-5 font-mono text-xs leading-6 sm:px-5">
        <p className="mb-3 text-terminal-muted">
          # example — nothing runs on this page
        </p>
        <p className="terminal-command wrap-break-word" key={demo.command}>
          <span className="text-accent">
            {active === 0 ? "terminal > " : "you > "}
          </span>
          {demo.command}
        </p>
        <div className="mt-4 min-h-36.25" aria-live="polite">
          <div className="terminal-output" key={active}>
            {demo.output.map((line, i) => (
              <p key={i} style={{ "--line-index": i }}>
                {line || "\u00a0"}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t border-white/10 bg-terminal-raised px-4 py-2 font-mono text-[10px] text-terminal-subtle">
        <span>
          {active === 0 ? "Local installer" : "Current model and tools"}
        </span>
        <span>No Kip sign-in</span>
      </div>
    </div>
  );
}
