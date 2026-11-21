import React, { useState } from "react";
import { Terminal } from "./Terminal.jsx";

export function WorkflowDemo() {
  const [demo, setDemo] = useState(1);

  return (
    <section
      aria-label="Example Kip workflow"
      className="hero-demo mx-auto flex w-full min-w-0 flex-col items-center gap-6"
      data-reveal
    >
      <div
        className="segmented-control demo-switcher relative z-20"
        aria-label="Workflow steps"
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
      <div className="hero-terminal-frame relative w-full">
        <div className="laptop-display">
          <div className="laptop-screen">
            <Terminal active={demo} />
          </div>
        </div>
        <div aria-hidden="true" className="laptop-base" />
      </div>
    </section>
  );
}
