import { ScrollLink } from "./ScrollLink.jsx";
import React from "react";
import { ArrowUpRightIcon } from "./Icons.jsx";

export function Footer({ isDocs = false }) {
  return (
    <footer className="mx-auto grid max-w-[1320px] grid-cols-[auto_1fr] items-center gap-5 border-t border-line/70 px-6 pt-8 pb-10 text-xs text-muted sm:grid-cols-[1fr_auto_1fr] md:px-14">
      <a
        className="group inline-flex items-center gap-2 justify-self-start text-[24px] font-black tracking-[-1px] text-ink transition-opacity hover:opacity-85"
        href="/"
        aria-label="Kip home"
      >
        <span>kip</span>
        <span className="-ml-1 self-start pt-1.5 text-[10px] font-bold text-muted transition-colors group-hover:text-accent">
          ®
        </span>
      </a>
      <span className="col-span-2 row-start-2 text-center text-xs font-medium text-muted sm:col-span-1 sm:col-start-2 sm:row-start-1">
        Made for thoughtful work.
      </span>
      <ScrollLink
        className="group col-start-2 row-start-1 inline-flex max-w-full items-center justify-end gap-1.5 justify-self-end text-right font-extrabold text-muted transition-colors hover:text-ink sm:col-start-3"
        href="#"
      >
        <span className="min-w-0">
          Back to {isDocs ? "docs" : "the beginning"}
        </span>
        <ArrowUpRightIcon className="size-3 shrink-0 -rotate-45 transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:text-ink" />
      </ScrollLink>
    </footer>
  );
}
