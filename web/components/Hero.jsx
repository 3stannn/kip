import React, { useRef } from "react";
import { Mascot } from "./Mascot.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";
import VariableProximity from "./VariableProximity.jsx";

export function Hero() {
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
    <section className="hero-section flex min-w-0 flex-col items-center justify-center">
      <div ref={containerRef} className="hero-copy w-full text-center">
        <div className="hero-buddy mx-auto mb-5" data-hero-mascot>
          <Mascot />
        </div>
        <h1 className="hero-title m-0 font-bold">
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
        <p data-intro className="hero-description mx-auto mt-6 md:mt-8">
          Bring focused workflows to Codex, Claude Code, and Antigravity.
          <span className="mt-1 block text-sm">
            No Kip account, API key, or separate runner.
          </span>
        </p>
        <div
          data-intro
          className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <a className="button-primary" href="/docs">
            Find Your Flow <ArrowUpRightIcon />
          </a>
          <a className="text-link" href="/docs#playground">
            Build a prompt <ArrowUpRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
