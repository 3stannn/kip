import React, { useRef, useState } from "react";
import { Mascot } from "./Mascot.jsx";
import { Terminal } from "./Terminal.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";
import VariableProximity from "./VariableProximity.jsx";

export function Hero() {
  const [demo, setDemo] = useState(1);
  const containerRef = useRef(null);
  const proximityProps = {
    containerRef,
    radius: 150,
    falloff: "gaussian",
    smoothing: 0.25,
    scale: 1,
    lift: 0,
    idleWave: false,
    // Each headline line already has its own responsive wrapper.
    style: { whiteSpace: "nowrap" },
  };

  return (
    <section className="hero-section relative flex min-w-0 flex-col items-center">
      <div
        ref={containerRef}
        className="hero-copy relative z-10 w-full min-w-0 text-center"
      >
        <h1 data-intro className="hero-title m-0 font-bold">
          <span className="block">
            <VariableProximity
              {...proximityProps}
              label="Big ideas,"
              fromFontVariationSettings="'wght' 700, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              lockWidth
            />
          </span>
          <span className="hero-title-serif block">
            <VariableProximity
              {...proximityProps}
              label="Little commands."
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 400, 'opsz' 9"
            />
          </span>
        </h1>
        <div
          data-intro
          className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          <a className="button-primary" href="/docs">
            Find Your Flow <ArrowUpRightIcon />
          </a>
          <a className="text-link" href="/docs#playground">
            Build a prompt <ArrowUpRightIcon />
          </a>
        </div>
        <p data-intro className="mt-6 text-sm font-bold">
          For Codex, Claude Code, and Antigravity.
          <span className="mt-1 block font-normal text-line">
            No Kip account, API key, or separate runner.
          </span>
        </p>
      </div>
      <div
        data-reveal
        className="hero-demo relative z-10 flex w-full min-w-0 flex-col items-center gap-6"
      >
        <div
          className="segmented-control demo-switcher relative z-20 self-start sm:self-center"
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
        <div className="hero-terminal-frame relative z-10 w-full rounded-3xl p-2 sm:rounded-[1.75rem] sm:p-3">
          <div
            className="hero-buddy absolute -top-15 right-2.5 z-20 w-16 sm:-top-24 sm:right-4 sm:w-28 lg:right-6"
            data-hero-mascot
          >
            <Mascot />
          </div>
          <Terminal active={demo} />
        </div>
      </div>
    </section>
  );
}
