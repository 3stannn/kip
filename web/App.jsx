import React from "react";
import { Header } from "./components/Header.jsx";
import { Hero } from "./components/Hero.jsx";
import { GettingStarted } from "./components/GettingStarted.jsx";
import { CommandBuilder } from "./components/CommandBuilder.jsx";
import { Skills } from "./components/Skills.jsx";
import { FAQ } from "./components/FAQ.jsx";
import { Closing } from "./components/Closing.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-[1320px]">
          <Hero />
          <div className="mx-6 grid grid-cols-2 gap-5 border-y border-line py-6 text-[11px] font-bold text-muted md:mx-14 md:flex md:justify-between [&_b]:mr-2 [&_b]:text-xl [&_b]:font-normal [&_b]:text-subtle">
            <span>
              <b>✳</b> Small, focused tasks
            </span>
            <span>
              <b>⌁</b> Skills that fit your work
            </span>
            <span>
              <b>◎</b> Context you control
            </span>
            <span>
              <b>↗</b> Output you review
            </span>
          </div>
          <GettingStarted />
        </div>
        <CommandBuilder />
        <div className="mx-auto max-w-[1320px]">
          <Skills />
          <FAQ />
          <Closing />
        </div>
      </main>
      <Footer />
    </>
  );
}
