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
    <section className="section-shell" id="get-started">
      <div
        className="mb-9 flex flex-col justify-between gap-4 md:flex-row md:items-end [&>p]:text-sm [&>p]:leading-7 [&>p]:text-muted"
        id="how-it-works"
      >
        <div>
          <span className="eyebrow">FROM HELLO TO LET’S GO</span>
          <h2>Four steps. Then you’re in.</h2>
        </div>
        <p>
          No new workspace to learn.
          <br />
          Just the folder you already call home.
        </p>
      </div>
      <div className="grid items-start gap-7 md:grid-cols-[0.85fr_1.35fr] md:gap-10">
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:flex md:flex-col md:gap-3"
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
              className={`group flex flex-1 flex-col items-center gap-3 rounded-2xl border p-4 text-center transition md:flex-row md:p-6 md:text-left ${active === i ? "border-line bg-soft text-charcoal" : "border-transparent text-muted hover:bg-soft/60"}`}
              onClick={() => setActive(i)}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-page text-xs font-semibold group-aria-selected:border-[#d8d8d8] group-aria-selected:bg-[#e5e5e5] group-aria-selected:text-charcoal">
                0{i + 1}
              </span>
              <span>
                <strong className="block text-sm font-black md:text-lg">
                  {s.label}
                </strong>
                <small className="mt-1 hidden text-xs font-medium text-muted md:block">
                  {
                    [
                      "Give your project a home base",
                      "Connect your ChatGPT account",
                      "Preview without model usage",
                      "Make your first request",
                    ][i]
                  }
                </small>
              </span>
              <span className="ml-auto hidden text-xl text-subtle md:block">
                ↗
              </span>
            </button>
          ))}
        </div>
        <div
          className="min-w-0 rounded-2xl border border-line bg-surface p-6 md:p-8 [&>h3]:mb-3 [&>h3]:mt-4 [&>h3]:text-2xl [&>h3]:font-black [&>h3]:tracking-tight [&>p]:mb-6 [&>p]:text-sm [&>p]:leading-7 [&>p]:text-muted"
          id="step-panel"
          role="tabpanel"
          aria-labelledby={`step-${active}`}
        >
          <span className="text-[10px] font-black tracking-[1.6px] text-subtle">
            STEP 0{active + 1} / 0{steps.length}
          </span>
          <h3>{steps[active].title}</h3>
          <p>{steps[active].text}</p>
          <CodeBlock text={steps[active].command} />
          <div className="mt-5 flex gap-3 text-xs leading-6 text-muted [&>span]:text-lg [&>span]:text-subtle">
            <span>✧</span>
            {steps[active].note}
          </div>
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
