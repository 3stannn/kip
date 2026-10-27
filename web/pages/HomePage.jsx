import React from "react";
import { Hero } from "../components/Hero.jsx";
import { Skills } from "../components/Skills.jsx";
import { FAQ } from "../components/FAQ.jsx";
import { Closing } from "../components/Closing.jsx";

const highlights = [
  {
    label: "Small, focused tasks",
    icon: <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />,
  },
  {
    label: "Skills that fit your work",
    icon: <path d="M4 8c3 0 3 4 6 4s3 4 6 4 3-4 4-4" />,
  },
  {
    label: "Context you control",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
      </>
    ),
  },
  {
    label: "Output you review",
    icon: <path d="M7 17 17 7M9 7h8v8" />,
  },
];

export function HomePage() {
  return (
    <div className="mx-auto max-w-[1320px]">
      <Hero />
      <div className="mx-6 grid grid-cols-2 items-center gap-5 border-y border-line py-6 text-[11px] font-bold text-muted md:mx-14 md:flex md:justify-between">
        {highlights.map(({ label, icon }) => (
          <span className="flex items-center gap-2" key={label}>
            <svg
              aria-hidden="true"
              className="size-5 shrink-0 text-subtle"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              {icon}
            </svg>
            {label}
          </span>
        ))}
      </div>
      <Skills />
      <FAQ />
      <Closing />
    </div>
  );
}
