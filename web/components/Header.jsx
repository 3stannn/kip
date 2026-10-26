import { ScrollLink } from "./ScrollLink.jsx";
import React from "react";

export function Header() {
  return (
    <header className="mx-auto grid h-24 max-w-[1320px] grid-cols-2 items-center gap-5 px-6 md:grid-cols-[1fr_auto_1fr] md:px-14">
      <ScrollLink
        className="inline-flex items-center gap-2.5 justify-self-start text-[26px] font-black tracking-[-1px]"
        href="#"
      >
        kip<span className="-ml-1 self-start pt-1.5 text-[10px]">®</span>
      </ScrollLink>
      <nav
        className="hidden gap-4 text-xs font-bold whitespace-nowrap text-muted md:flex lg:gap-8 lg:text-sm [&>a:hover]:text-accent"
        aria-label="Main navigation"
      >
        <ScrollLink href="#how-it-works">How it works</ScrollLink>
        <ScrollLink href="#profiles">Profiles</ScrollLink>
        <ScrollLink href="#playground">Try a prompt</ScrollLink>
        <ScrollLink href="#updates">Updates</ScrollLink>
        <ScrollLink href="#questions">FAQs</ScrollLink>
      </nav>
      <ScrollLink
        className="button-primary justify-self-end px-5 py-3 text-xs"
        href="#get-started"
      >
        Get started <span>↗</span>
      </ScrollLink>
    </header>
  );
}
