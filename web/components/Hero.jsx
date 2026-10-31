import React, { useState } from "react";
import { Mascot } from "./Mascot.jsx";
import { Terminal } from "./Terminal.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";

export function Hero() {
  const [demo, setDemo] = useState(1);

  return (
    <section className="hero-section relative flex min-w-0 flex-col items-center">
      <div className="hero-copy relative z-10 w-full min-w-0 text-center">
        <h1 data-intro className="hero-title m-0 font-black text-white">
          <span className="block">Big ideas,</span>
          <span className="hero-title-serif block">Little commands.</span>
        </h1>
        <p
          data-intro
          className="mx-auto mt-5 max-w-145 text-xs font-bold leading-6 text-charcoal"
        >
          Kip coordinates skilled workers, leveraging specialized skills to complete your project efficiently.
        </p>
        <div
          data-intro
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          <a className="button-primary" href="/docs">
            Get started <ArrowUpRightIcon />
          </a>
          <a className="text-link" href="/docs#playground">
            Build a prompt <ArrowUpRightIcon />
          </a>
        </div>
        <p data-intro className="mt-6 text-xs font-bold text-charcoal">
          For Codex, Claude Code, and Antigravity.
          <span className="mt-1.5 block font-normal">
            No Kip account, API key, or separate runner.
          </span>
        </p>
      </div>
      <div
        data-reveal
        className="hero-demo relative z-10 flex w-full min-w-0 flex-col items-center gap-6"
      >
        <div className="hero-terminal-frame relative z-10 w-full rounded-[1.75rem] p-2.5 sm:p-4">
          <div
            className="hero-buddy pointer-events-none absolute -top-20 right-5 z-20 w-24 sm:-top-24 sm:right-10"
            data-hero-mascot
          >
            <Mascot />
          </div>
          <Terminal active={demo} />
        </div>
        <div
          className="segmented-control demo-switcher relative z-20"
          aria-label="Example Kip workflow"
          role="group"
          style={{ "--demo-index": demo }}
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
