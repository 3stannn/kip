import React, { useState, useRef } from "react";
import { steps } from "../data/steps.js";
import { CodeBlock } from "./CodeBlock.jsx";
import { ArrowRightIcon } from "./Icons.jsx";

export function GettingStarted() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  function handleTabKey(event, index) {
    const keys = {
      ArrowRight: (index + 1) % steps.length,
      ArrowDown: (index + 1) % steps.length,
      ArrowLeft: (index + steps.length - 1) % steps.length,
      ArrowUp: (index + steps.length - 1) % steps.length,
      Home: 0,
      End: steps.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section
      className="docs-section"
      id="get-started"
      aria-labelledby="get-started-heading"
    >
      <div className="docs-section-header" id="how-it-works">
        <h2 id="get-started-heading">Install and get started</h2>
        <p>
          Requires Git and Node.js 22+. Install Kip once, restart your host,
          then invoke it from the coding chat where you already work.
        </p>
      </div>

      <div>
        {/* Timeline progress indicator */}
        <div
          className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuenow={active + 1}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Step ${active + 1} of ${steps.length}`}
        >
          <div
            className="h-full rounded-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${((active + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step tabs / timeline */}
        <div
          className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
          role="tablist"
          aria-label="Getting started steps"
        >
          {steps.map((s, i) => {
            const isSelected = active === i;
            const isCompleted = i < active;
            return (
              <button
                key={s.label}
                ref={(element) => {
                  tabRefs.current[i] = element;
                }}
                onKeyDown={(event) => handleTabKey(event, i)}
                tabIndex={isSelected ? 0 : -1}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`step-panel-${i}`}
                id={`step-tab-${i}`}
                className={`group flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all duration-150 ${
                  isSelected
                    ? "border-accent bg-accent/15 text-charcoal shadow-sm ring-1 ring-accent/30"
                    : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                }`}
                onClick={() => setActive(i)}
              >
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition ${
                    isSelected
                      ? "bg-charcoal text-white shadow-xs"
                      : isCompleted
                        ? "bg-accent/40 font-extrabold text-charcoal"
                        : "border border-line bg-page text-muted group-hover:border-subtle/60"
                  }`}
                  aria-hidden="true"
                >
                  {isCompleted ? "✓" : `0${i + 1}`}
                </span>
                <span className="min-w-0 flex-1 truncate font-extrabold text-sm">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active step panel */}
        <div
          className="min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-xs sm:p-7 md:p-8"
          id={`step-panel-${active}`}
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`step-tab-${active}`}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
            <h3 className="m-0 text-xl font-black tracking-tight text-ink">
              {steps[active].title}
            </h3>
            <span className="rounded-full border border-line bg-page px-2.5 py-0.5 font-mono text-[11px] font-bold text-muted">
              Step {active + 1} of {steps.length}
            </span>
          </div>

          <p className="mb-5 text-sm leading-7 text-muted">
            {steps[active].text}
          </p>

          <div className="my-5 overflow-hidden rounded-xl shadow-md">
            <CodeBlock
              text={steps[active].command}
              title={active < 2 ? "Terminal" : "Your coding chat"}
            />
          </div>

          {/* Note callout */}
          <div
            className="mt-4 flex items-start gap-3 rounded-xl border border-accent/25 bg-accent-soft/70 px-4 py-3 text-xs leading-6 text-charcoal"
            role="note"
          >
            <span
              className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-charcoal"
              aria-hidden="true"
            >
              i
            </span>
            <p className="m-0">{steps[active].note}</p>
          </div>

          {/* Stepper navigation buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            {active > 0 ? (
              <button
                type="button"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-page px-4 py-2 text-xs font-bold text-muted transition hover:border-subtle hover:bg-soft hover:text-charcoal"
                onClick={() => setActive(active - 1)}
              >
                Previous step
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              className="group inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-charcoal"
              onClick={() => setActive((active + 1) % steps.length)}
            >
              <span>
                {active === steps.length - 1 ? "Back to start" : "Next step"}
              </span>
              <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
