import React from "react";
import { WindowChrome } from "./WindowChrome.jsx";

const demos = [
  {
    command: "node bin/kip.js install",
    output: [
      "Install Kip globally for:",
      "Codex · Claude Code · Antigravity",
      "",
      "Restart your host, then open your project.",
    ],
    label: "Local installer",
  },
  {
    command: "$kip plan Build an accessible React login",
    output: [
      "Illustrative chat response",
      "I’ll inspect the existing components,",
      "load relevant guidance, and outline",
      "the implementation and checks.",
    ],
    label: "Codex chat",
  },
  {
    command: "/kip build Create an accessible React login",
    output: [
      "Illustrative chat response",
      "I’ll implement this in your project",
      "and run the appropriate checks",
      "using this chat’s tools.",
    ],
    label: "Claude Code / Antigravity chat",
  },
];
export function Terminal({ active }) {
  const demo = demos[active];
  return (
    <div className="relative z-10 w-full max-w-[470px] -rotate-3 overflow-hidden rounded-xl border border-[#353537] bg-black text-[#e5e5e5] shadow-2xl shadow-black/20">
      <WindowChrome title={demo.label} />
      <div className="min-h-[285px] px-4 py-5 font-mono text-[10px] leading-6 sm:px-5 sm:text-[11px]">
        <p className="mb-3 text-[#737373]"># your next idea starts here</p>
        <p className="break-words">
          <span className="text-[#a1a1aa]">
            {active === 0 ? "terminal > " : "you > "}
          </span>
          {demo.command}
        </p>
        <div className="mt-4 min-h-[145px]" aria-live="polite">
          {demo.output.map((line, i) => (
            <p key={i}>{line || "\u00a0"}</p>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t border-white/10 bg-[#111113] px-4 py-2 font-mono text-[9px] text-[#8e8e93]">
        <span>
          {active === 0 ? "No network calls" : "Your current model and tools"}
        </span>
        <span>No Kip sign-in</span>
      </div>
    </div>
  );
}
