import React from "react";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-5 px-6 pb-9 text-xs text-muted md:px-14 [&>span]:hidden sm:[&>span]:block">
      <a
        className="inline-flex items-center gap-2.5 text-[26px] font-black tracking-[-1px]"
        href="#"
      >
        kip
      </a>
      <span>Made for thoughtful work.</span>
      <a href="#get-started">Back to the beginning ↑</a>
    </footer>
  );
}
