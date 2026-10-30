import React, { useState } from "react";
import { Mascot } from "./Mascot.jsx";
import { Terminal } from "./Terminal.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";

export function Hero() {
  const [demo, setDemo] = useState(1);

  return (
    <section className="relative grid items-center gap-12 px-6 py-12 md:min-h-147.5 md:grid-cols-2 md:px-14 md:py-16">
      <div className="min-w-0">
        <p className="mb-5 max-w-md text-sm font-extrabold text-muted">
          A focused workflow for Codex, Claude Code, and Antigravity.
        </p>
        <h1 className="text-balance text-5xl leading-[1.02] font-black tracking-[-2.4px] sm:text-6xl lg:text-7xl lg:tracking-[-3.2px]">
          Big Ideas. Little commands.
          <span className="mt-2 block text-accent">Your buddy, Kip.</span>
        </h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-muted">
          Kip coordinates focused workers and an independent reviewer for your
          project using the model and tools already available to you.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <a className="button-primary" href="/docs">
            Find your flow <ArrowUpRightIcon />
          </a>
          <a className="text-link" href="/docs#playground">
            Build a prompt <ArrowUpRightIcon />
          </a>
        </div>
        <p className="mt-6 text-xs font-bold text-muted">
          No Kip account, API key, server, or separate runner.
        </p>
      </div>
      <div className="relative flex min-h-125 min-w-0 items-center justify-center">
        <div
          className="pointer-events-none absolute -top-1 right-4 z-20 w-24 sm:right-8"
          data-hero-mascot
        >
          <Mascot />
        </div>
        <div className="relative z-10 w-full max-w-125.5 rounded-[1.75rem] bg-accent/35 p-4">
          <Terminal active={demo} />
        </div>
        <div
          className="segmented-control absolute bottom-2 z-20"
          aria-label="Example Kip workflow"
        >
          {["Install", "Plan", "Build"].map((label, index) => (
            <button
              key={label}
              aria-pressed={demo === index}
              onClick={() => setDemo(index)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
