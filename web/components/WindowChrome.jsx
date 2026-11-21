import React from "react";

export function WindowChrome({
  title = "your-project — zsh",
  compact = false,
  children,
}) {
  return (
    <div
      className={`relative flex items-center justify-between gap-3 border-b border-white/[0.08] bg-[#18181b]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${compact ? "min-h-[1.833em] px-[0.833em]" : "min-h-11 px-4"}`}
      role="region"
      aria-label="Terminal window header"
    >
      {/* macOS window controls */}
      <div
        className={`group/controls flex shrink-0 items-center ${compact ? "gap-[0.333em] [&>span]:size-[0.75em]" : "gap-2 py-1"}`}
        aria-hidden="true"
      >
        <span className="size-3 rounded-full border border-[#e0443e]/40 bg-[#ff5f56] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15),inset_0_0.5px_0.5px_rgba(255,255,255,0.35)] transition-transform group-hover/controls:scale-105" />
        <span className="size-3 rounded-full border border-[#dea123]/40 bg-[#ffbd2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15),inset_0_0.5px_0.5px_rgba(255,255,255,0.35)] transition-transform group-hover/controls:scale-105" />
        <span className="size-3 rounded-full border border-[#1aab29]/40 bg-[#27c93f] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.15),inset_0_0.5px_0.5px_rgba(255,255,255,0.35)] transition-transform group-hover/controls:scale-105" />
      </div>

      {/* Centered title typography */}
      <div
        className={`pointer-events-none absolute inset-x-0 flex items-center justify-center ${compact ? "px-[4em]" : "px-16"}`}
      >
        <span
          className={`truncate font-mono font-medium tracking-tight text-[#a1a1aa] ${compact ? "text-[0.833em] leading-[1.2]" : "text-xs"}`}
        >
          {title}
        </span>
      </div>

      {/* Right controls (Copy button, actions) */}
      <div className="relative z-10 flex shrink-0 items-center gap-2">
        {children}
      </div>
    </div>
  );
}
