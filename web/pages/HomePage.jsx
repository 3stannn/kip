import React, { useRef } from "react";
import { Hero } from "../components/Hero.jsx";
import { FAQ } from "../components/FAQ.jsx";
import { Closing } from "../components/Closing.jsx";
import { usePageMotion } from "../hooks/usePageMotion.js";

const highlights = [
  {
    label: "Your current chat",
    text: "Kip uses the model, tools, and permissions already available there.",
  },
  {
    label: "Workers and review",
    text: "It delegates focused work and checks the result with an independent reviewer.",
  },
  {
    label: "The scope you asked for",
    text: "A plan stays a plan. A build continues through changes and checks.",
  },
  {
    label: "An honest handoff",
    text: "Kip reports what changed, what ran, and what remains unverified.",
  },
];

export function HomePage() {
  const page = useRef(null);
  usePageMotion(page);

  return (
    <div className="site-shell home-page" ref={page}>
      <Hero />
      <section
        aria-label="How Kip works"
        className="facts-grid mx-6 grid border-y border-line sm:grid-cols-2 md:mx-14 xl:grid-cols-4"
      >
        {highlights.map(({ label, text }, index) => (
          <div className="fact-item" key={label} data-reveal={index * 55}>
            <span className="mb-3 block font-mono text-xs text-subtle">
              0{index + 1}
            </span>
            <h2 className="m-0 text-sm font-extrabold tracking-normal">
              {label}
            </h2>
            <p className="mt-2 text-xs leading-6 text-muted">{text}</p>
          </div>
        ))}
      </section>
      <FAQ />
      <Closing />
    </div>
  );
}
