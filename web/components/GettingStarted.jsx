import React from "react";
import { useState, useRef } from "react";
import { steps } from "../data/steps.js";
import { CodeBlock } from "./CodeBlock.jsx";

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
          Requires Git and Node.js 22+. Install Kip once, then use it from your
          project’s coding chat.
        </p>
      </div>
      <div>
        <div
          className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
          role="tablist"
          aria-label="Getting started steps"
        >
          {steps.map((s, i) => (
            <button
              key={s.label}
              ref={(element) => {
                tabRefs.current[i] = element;
              }}
              onKeyDown={(event) => handleTabKey(event, i)}
              tabIndex={active === i ? 0 : -1}
              role="tab"
              aria-selected={active === i}
              aria-controls="step-panel"
              id={`step-${i}`}
              className={`flex items-center gap-2 rounded-lg border px-3 py-3 text-left text-sm transition ${active === i ? "border-accent bg-accent/15 text-charcoal" : "border-line text-muted hover:bg-soft/60"}`}
              onClick={() => setActive(i)}
            >
              <span className="font-mono text-xs" aria-hidden="true">
                0{i + 1}
              </span>
              <strong>{s.label}</strong>
            </button>
          ))}
        </div>
        <div
          className="min-w-0 [&>h3]:mb-3 [&>h3]:text-lg [&>h3]:font-extrabold [&>p]:mb-5 [&>p]:text-sm [&>p]:leading-7 [&>p]:text-muted"
          id="step-panel"
          role="tabpanel"
          tabIndex={0}
          aria-labelledby={`step-${active}`}
        >
          <h3>
            {
              [
                "Clone the repository",
                "Install the skill",
                "Start a task",
                "Continue in your host",
              ][active]
            }
          </h3>
          <p>{steps[active].text}</p>
          <CodeBlock
            text={steps[active].command}
            title={active < 2 ? "Terminal" : "Your coding chat"}
          />
          <p className="mt-4">{steps[active].note}</p>
          <button
            className="mt-6 inline-flex items-center gap-4 text-xs font-extrabold text-charcoal hover:text-accent"
            onClick={() => setActive((active + 1) % steps.length)}
          >
            {active === steps.length - 1 ? "Back to setup" : "Next step"}{" "}
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
