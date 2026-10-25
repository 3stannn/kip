import React from "react";
import { WindowChrome } from "./WindowChrome.jsx";

const task = '"Build something good"';

export function Terminal({ active }) {
  const command = active === 0 ? "install" : active === 1 ? "plan" : "run";
  return (
    <div className="relative z-10 w-full max-w-[470px] -rotate-3 overflow-hidden rounded-xl border border-[#353537] bg-black text-[#e5e5e5] shadow-2xl shadow-black/20">
      <WindowChrome title="your-project — zsh — 80×24" />
      <div className="min-h-[285px] px-4 py-5 font-mono text-[10px] leading-6 sm:px-5 sm:text-[11px]">
        <p className="mb-3 text-[#737373]"># your next idea starts here</p>
        <p className="break-words">
          <span className="text-[#a1a1aa]">your-project % </span>
          kip {command}
          {active !== 0 && (
            <>
              {" "}
              <span className="text-[#e5e5e5]">{task}</span>
            </>
          )}
        </p>
        <div className="mt-4 min-h-[145px]" aria-live="polite">
          {active === 0 ? (
            <>
              <p>Installed .kip; existing files preserved.</p>
              <p className="mt-4 text-[#737373]"># next: kip login</p>
              <p>
                config.json <span className="text-[#737373]">and</span> skills/{" "}
                <span className="text-[#737373]">are ready.</span>
              </p>
            </>
          ) : active === 1 ? (
            <>
              <p>{"{"}</p>
              <p className="pl-4">
                <span className="text-[#a1a1aa]">"model"</span>:{" "}
                <span className="text-[#e5e5e5]">"codex-default"</span>,
              </p>
              <p className="pl-4">
                <span className="text-[#a1a1aa]">"skills"</span>: [
              </p>
              <p className="pl-8 text-[#e5e5e5]">
                "token-efficiency", "anti-ai-slop"
              </p>
              <p className="pl-4">],</p>
              <p className="pl-4">
                <span className="text-[#a1a1aa]">"executions"</span>:{" "}
                <span className="text-[#e5e5e5]">1</span>
              </p>
              <p>{"}"}</p>
            </>
          ) : (
            <>
              <p className="text-[#a1a1aa]">
                # illustrative response · signed in with ChatGPT
              </p>
              <p>Review the generated code and verification steps.</p>
              <p className="mt-3 text-[#737373]">
                # response and usage saved locally
              </p>
              <p>.kip/runs/&lt;run-id&gt;.json</p>
            </>
          )}
        </div>
        <p className="mt-3 flex items-center gap-1 text-[#a1a1aa]">
          your-project %{" "}
          <span
            className="inline-block h-3.5 w-1.5 bg-[#bdbdbd]"
            aria-hidden="true"
          />
        </p>
      </div>
      <div className="flex justify-between gap-2 border-t border-white/10 bg-[#111113] px-4 py-2 font-mono text-[9px] text-[#8e8e93]">
        <span>
          {active === 2
            ? "Illustrative output · review before applying"
            : active === 0
              ? "Local setup"
              : "Offline preview · illustrative output"}
        </span>
        <span className="shrink-0">
          {active === 2 ? "Account usage" : "No model usage"}
        </span>
      </div>
    </div>
  );
}
