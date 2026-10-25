import React from "react";

export function Header() {
  return (
    <header className="mx-auto flex h-24 max-w-[1320px] items-center justify-between gap-5 px-6 md:px-14">
      <a
        className="inline-flex items-center gap-2.5 text-[26px] font-black tracking-[-1px]"
        href="#"
      >
        kip<span className="-ml-1 self-start pt-1.5 text-[10px]">®</span>
      </a>
      <nav
        className="hidden gap-8 text-sm font-bold text-muted md:flex [&>a:hover]:text-accent"
        aria-label="Main navigation"
      >
        <a href="#how-it-works">How it works</a>
        <a href="#playground">Try a command</a>
        <a href="#questions">FAQs</a>
      </nav>
      <a className="button-primary px-5 py-3 text-xs" href="#get-started">
        Get started <span>↗</span>
      </a>
    </header>
  );
}
