import React from "react";

export function Footer() {
  return (
    <footer className="mx-auto grid max-w-[1320px] grid-cols-2 items-center gap-5 px-6 pb-9 text-xs text-muted sm:grid-cols-[1fr_auto_1fr] md:px-14">
      <a
        className="inline-flex items-center gap-2.5 justify-self-start text-[26px] font-black tracking-[-1px]"
        href="#"
      >
        kip
      </a>
      <span className="col-span-2 row-start-2 text-center sm:col-span-1 sm:col-start-2 sm:row-start-1">
        Made for thoughtful work.
      </span>
      <a
        className="col-start-2 row-start-1 justify-self-end text-right sm:col-start-3"
        href="#get-started"
      >
        Back to the beginning ↑
      </a>
    </footer>
  );
}
