import React from "react";
import { Hero } from "../components/Hero.jsx";
import { Skills } from "../components/Skills.jsx";
import { FAQ } from "../components/FAQ.jsx";
import { Closing } from "../components/Closing.jsx";

export function HomePage() {
  return (
    <div className="mx-auto max-w-[1320px]">
      <Hero />
      <div className="mx-6 grid grid-cols-2 gap-5 border-y border-line py-6 text-[11px] font-bold text-muted md:mx-14 md:flex md:justify-between [&_b]:mr-2 [&_b]:text-xl [&_b]:font-normal [&_b]:text-subtle">
        <span>
          <b aria-hidden="true">✳</b> Small, focused tasks
        </span>
        <span>
          <b aria-hidden="true">⌁</b> Skills that fit your work
        </span>
        <span>
          <b aria-hidden="true">◎</b> Context you control
        </span>
        <span>
          <b aria-hidden="true">↗</b> Output you review
        </span>
      </div>
      <Skills />
      <FAQ />
      <Closing />
    </div>
  );
}
