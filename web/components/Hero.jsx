import React, { useRef, useState } from "react";
import { Mascot } from "./Mascot.jsx";
import { Terminal } from "./Terminal.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";
import GradientASCII from "./GradientASCII.jsx";
import VariableProximity from "./VariableProximity.jsx";

const HERO_COLORS = ["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"];

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
      <div className="hero-ascii-background" aria-hidden="true">
        <GradientASCII
          colors={HERO_COLORS}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
        />
      </div>
      <div
        ref={containerRef}
        className="hero-copy relative z-10 w-full min-w-0 text-center"
      >
        <h1 data-intro className="hero-title m-0 font-bold text-charcoal">
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
              scale={1.08}
              lift={0.045}
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
        <p data-intro className="mt-6 text-sm font-bold text-charcoal">
          For Codex, Claude Code, and Antigravity.
          <span className="mt-1 block font-normal text-muted">
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
            className="hero-buddy absolute -top-20 right-5 z-20 w-24 sm:-top-24 sm:right-10"
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
