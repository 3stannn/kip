import { ScrollLink } from "./ScrollLink.jsx";
import React from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons.jsx";

export function Header({ isDocs = false }) {
  return (
    <header className="mx-auto grid min-h-20 max-w-330 grid-cols-[auto_1fr] items-center gap-x-5 px-6 py-4 md:min-h-24 md:grid-cols-[1fr_auto_1fr] md:px-14 md:py-5">
      <a
        className="group inline-flex items-center gap-2 justify-self-start text-[26px] font-black tracking-[-1px] text-ink transition-opacity hover:opacity-85"
        href="/"
        aria-label="Kip home"
      >
        <span>kip</span>
        <span className="-ml-1 self-start pt-1.5 text-[10px] font-bold text-muted transition-colors group-hover:text-accent">
          ®
        </span>
      </a>
      <nav
        className="col-start-2 row-start-1 flex gap-4 justify-self-end whitespace-nowrap md:gap-6 md:justify-self-auto lg:gap-8"
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="nav-link"
          aria-current={!isDocs ? "page" : undefined}
        >
          Home
        </a>
        <a
          href="/docs"
          className="nav-link"
          aria-current={isDocs ? "page" : undefined}
        >
          Docs
        </a>
        {isDocs ? (
          <a href="/#questions" className="nav-link">
            FAQs
          </a>
        ) : (
          <ScrollLink href="#questions" className="nav-link">
            FAQs
          </ScrollLink>
        )}
      </nav>
      {isDocs ? (
        <ScrollLink
          className="button-primary hidden col-start-3 row-start-1 justify-self-end px-5 py-3 text-xs md:inline-flex"
          href="#get-started"
        >
          Get started <ArrowDownIcon />
        </ScrollLink>
      ) : (
        <a
          className="button-primary hidden col-start-3 row-start-1 justify-self-end px-5 py-3 text-xs md:inline-flex"
          href="/docs"
        >
          Get started <ArrowUpRightIcon />
        </a>
      )}
    </header>
  );
}
