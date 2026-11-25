import React, { useState } from "react";
import { Terminal } from "./Terminal.jsx";

export function WorkflowDemo() {
  const [demo, setDemo] = useState(1);

  return (
    <section
      aria-label="Example Kip workflow"
      className="hero-demo mx-auto flex w-full min-w-0 flex-col items-center gap-6"
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
      <Terminal active={demo} />
    </section>
  );
}
