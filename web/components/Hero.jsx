import React from "react";
import { Mascot } from "./Mascot.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";

export function Hero() {
  return (
    <section className="hero-section flex min-w-0 flex-col items-center justify-center">
      <div className="hero-copy w-full text-center">
        <div className="hero-buddy mx-auto mb-5" data-hero-mascot>
          <Mascot />
        </div>
        <h1 className="hero-title m-0 font-bold">
          <span className="block whitespace-nowrap">Big ideas,</span>{" "}
          <span className="hero-title-serif block whitespace-nowrap">
            Little commands.
          </span>
        </h1>
        <p className="hero-description mx-auto mt-6 md:mt-8">
          Bring focused workflows to Codex, Claude Code, and Antigravity.
          <span className="mt-1 block text-sm">
            No Kip account, API key, or separate runner.
          </span>
        </p>
        <div className="hero-actions mt-6 flex flex-wrap items-center justify-center gap-3">
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
