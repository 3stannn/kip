import { ScrollLink } from "./ScrollLink.jsx";
import React from "react";
import { ArrowUpRightIcon } from "./Icons.jsx";

export function Footer({ isDocs = false }) {
  return (
    <footer className="mx-auto grid max-w-[1320px] grid-cols-[auto_1fr] items-center gap-5 px-6 pb-9 text-xs text-muted sm:grid-cols-[1fr_auto_1fr] md:px-14">
      <a
        className="inline-flex items-center gap-2.5 justify-self-start text-[26px] font-black tracking-[-1px] text-ink"
        href="/"
        aria-label="Kip home"
      >
        kip
      </a>
      <span className="col-span-2 row-start-2 text-center sm:col-span-1 sm:col-start-2 sm:row-start-1">
        Made for thoughtful work.
      </span>
      <ScrollLink
        className="col-start-2 row-start-1 inline-flex max-w-full items-center justify-end gap-1.5 justify-self-end text-right sm:col-start-3"
        href="#"
      >
        <span className="min-w-0">
          Back to {isDocs ? "docs" : "the beginning"}
        </span>
        <ArrowUpRightIcon className="size-3 shrink-0 -rotate-45" />
      </ScrollLink>
    </footer>
  );
}
