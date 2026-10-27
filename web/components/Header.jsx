import { ScrollLink } from "./ScrollLink.jsx";
import React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons.jsx";

export function Header({ isDocs = false }) {
  return (
    <header className="mx-auto grid min-h-24 max-w-330 grid-cols-2 items-center gap-x-5 gap-y-4 px-6 py-5 md:grid-cols-[1fr_auto_1fr] md:px-14">
      <a
        className="inline-flex items-center gap-2.5 justify-self-start text-[26px] font-black tracking-[-1px]"
        href="/"
        aria-label="Kip home"
      >
        kip<span className="-ml-1 self-start pt-1.5 text-[10px]">®</span>
      </a>
      <nav
        className="col-span-2 row-start-2 flex justify-center gap-7 text-xs font-bold whitespace-nowrap text-muted md:col-span-1 md:col-start-2 md:row-start-1 lg:gap-8 lg:text-sm [&>a:hover]:text-accent [&>a[aria-current]]:text-charcoal"
        aria-label="Main navigation"
      >
        <a href="/" aria-current={!isDocs ? "page" : undefined}>
          Home
        </a>
        <a href="/docs" aria-current={isDocs ? "page" : undefined}>
          Docs
        </a>
        {isDocs ? (
          <a href="/#questions">FAQs</a>
        ) : (
          <ScrollLink href="#questions">FAQs</ScrollLink>
        )}
      </nav>
      {isDocs ? (
        <ScrollLink
          className="button-primary col-start-2 row-start-1 justify-self-end px-5 py-3 text-xs md:col-start-3"
          href="#get-started"
        >
          Get started <ArrowDownIcon />
        </ScrollLink>
      ) : (
        <a
          className="button-primary col-start-2 row-start-1 justify-self-end px-5 py-3 text-xs md:col-start-3"
          href="/docs"
        >
          Get started <ArrowUpRightIcon />
        </a>
      )}
    </header>
  );
}
