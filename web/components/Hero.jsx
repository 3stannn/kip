import React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Mascot } from "./Mascot.jsx";
import { Terminal } from "./Terminal.jsx";

export function Hero() {
  const [demo, setDemo] = useState(1);
  const [floating, setFloating] = useState(false);
  const hero = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setFloating(!entry.isIntersecting);
    });
    observer.observe(hero.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={hero}
      className="relative grid items-center gap-10 px-6 pb-20 pt-10 md:min-h-[590px] md:grid-cols-2 md:px-14 md:py-16"
    >
      <div className="min-w-0">
        <div className="eyebrow">
          <span /> YOUR FOLDER. YOUR WORKFLOW.
        </div>
        <h1 className="my-6 text-[44px] leading-[1.08] font-black tracking-[-2px] sm:text-5xl lg:text-[64px] lg:tracking-[-2.8px]">
          Big ideas.
          <br />
          Little commands.
          <span className="block text-accent"> Your buddy, Kip.</span>
        </h1>
        <p className="text-base leading-7 text-muted">
          Bring your ChatGPT account into your project.
          <br className="hidden sm:block" /> Pick a task, make a plan, and take
          next step with Codex.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <a className="button-primary" href="#get-started">
            Find your flow <span>↗</span>
          </a>
          <a
            className="inline-flex items-center gap-3 text-sm font-extrabold text-charcoal transition hover:text-accent"
            href="#how-it-works"
          >
            Show me how <span>↓</span>
          </a>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[11px] text-muted [&>span]:text-base [&>i]:mx-1 [&>i]:size-1 [&>i]:rounded-full [&>i]:bg-line">
          <span>⌘</span> ChatGPT sign-in <i /> No API key
        </div>
      </div>
      <div className="pointer-events-none z-30 mx-auto flex size-24 justify-center sm:size-28 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        {floating ? (
          createPortal(
            <div className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-50">
              <Mascot small />
            </div>,
            document.body,
          )
        ) : (
          <Mascot />
        )}
      </div>
      <div className="relative flex h-[510px] min-w-0 items-center justify-center md:h-[510px]">
        <div className="absolute right-1 top-0 rotate-[7deg] text-xs italic text-muted [&>span]:block [&>span]:text-center [&>span]:text-3xl">
          a small command, a fresh start <span>↴</span>
        </div>
        <div className="absolute size-[280px] rounded-full bg-accent/15 sm:size-[350px]" />
        <Terminal active={demo} />
        <div className="absolute -right-1 bottom-16 z-20 rotate-6 rounded-xl bg-surface px-4 py-3 text-[11px] font-extrabold shadow-lg shadow-ink/5 [&>span]:mr-2 [&>span]:text-lg [&>span]:text-accent">
          <span>▰</span> your next great idea
        </div>
        <div
          className="absolute bottom-0 flex gap-1 rounded-full border border-line bg-soft p-1 [&_button]:rounded-full [&_button]:px-4 [&_button]:py-2 [&_button]:text-[11px] [&_button]:font-extrabold [&_button]:text-muted [&_button_span]:ml-3"
          aria-label="Workflow demo"
        >
          {["Set up", "Plan it", "Run it"].map((s, i) => (
            <button
              key={s}
              aria-pressed={demo === i}
              className={
                demo === i
                  ? "!bg-surface !text-charcoal shadow-sm"
                  : "hover:bg-surface/50"
              }
              onClick={() => setDemo(i)}
            >
              {s}
              <span>{i === demo ? "↗" : "·"}</span>
            </button>
          ))}
        </div>
        <span className="absolute -bottom-7 text-[11px] italic text-muted">
          ↑ take it for a little spin
        </span>
      </div>
    </section>
  );
}
