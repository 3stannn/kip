import React from "react";

export function WindowChrome({ title = "your-project — zsh", children }) {
  return (
    <div className="relative flex min-h-11 items-center justify-between gap-3 border-b border-white/10 bg-[#1c1c1e] px-4">
      <div className="flex shrink-0 items-center gap-2" aria-hidden="true">
        <span className="size-3 rounded-full border border-black/10 bg-[#ff5f57] shadow-[inset_0_1px_0_#ffffff20]" />
        <span className="size-3 rounded-full border border-black/10 bg-[#febc2e] shadow-[inset_0_1px_0_#ffffff20]" />
        <span className="size-3 rounded-full border border-black/10 bg-[#28c840] shadow-[inset_0_1px_0_#ffffff20]" />
      </div>
      <span className="pointer-events-none absolute inset-x-20 truncate text-center font-sans text-[11px] font-semibold text-[#a1a1a6]">
        {title}
      </span>
      {children}
    </div>
  );
}
