import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WindowChrome } from "./WindowChrome.jsx";

const demos = [
  {
    command:
      "git clone https://github.com/3stannn/kip.git && cd kip && node bin/kip.js install",
    output: [
      "Installer scope",
      "Codex · Claude Code · Antigravity",
      "",
      "Restart the host, then open your project.",
    ],
    label: "Terminal · local installer",
  },
  {
    command: "$kip plan Build an accessible React login",
    output: [
      "Example plan response",
      "Delegate analysis, then review the plan",
      "Inspect the existing auth flow",
      "Define states, boundaries, and checks",
      "Return the plan without editing files",
    ],
    label: "Codex · coding chat",
  },
  {
    command: "/kip build Create an accessible React login",
    output: [
      "Example build response",
      "Inspect the current project and constraints",
      "Implement the requested flow",
      "Run relevant checks",
      "Report changes and remaining gaps",
    ],
    label: "Claude Code / Antigravity · chat",
  },
];
// The first command waits for the hero entrance to bring the terminal in.
const FIRST_RUN_WAIT = 1;
const SECONDS_PER_CHARACTER = 0.022;
const LONGEST_TYPING = 1.1;

export function Terminal({ active }) {
  const demo = demos[active];
  const terminal = useRef(null);
  const firstRun = useRef(true);

  // The command is typed out, then the response lines step in. Every
  // character stays in the layout throughout, so nothing reflows.
  useEffect(() => {
    const root = terminal.current;
    const wait = firstRun.current ? FIRST_RUN_WAIT : 0.1;
    firstRun.current = false;
    if (!root) return undefined;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const prompt = root.querySelector(".terminal-prompt");
      const characters = [...root.querySelectorAll(".terminal-character")];
      const lines = [...root.querySelectorAll(".terminal-output p")];
      const typed = { count: 0 };
      let shown = 0;
      let caret = null;
      const moveCaret = (node) => {
        caret?.removeAttribute("data-caret");
        caret = node || null;
        caret?.setAttribute("data-caret", "");
      };
      gsap.set(characters, { opacity: 0 });
      gsap.set(lines, { opacity: 0, y: 8 });
      moveCaret(prompt);
      const timeline = gsap.timeline({ delay: wait });
      timeline.to(typed, {
        count: characters.length,
        duration: Math.min(
          LONGEST_TYPING,
          characters.length * SECONDS_PER_CHARACTER,
        ),
        ease: "none",
        onUpdate: () => {
          const count = Math.round(typed.count);
          while (shown < count) characters[shown++].style.opacity = "";
          if (count) moveCaret(characters[count - 1]);
        },
        onComplete: () => moveCaret(null),
      });
      timeline.to(
        lines,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "opacity,transform",
        },
        ">0.12",
      );
      // Like the page entrances, skip straight to the end in a tab that is
      // not being watched, and finish without the ticker if it never ran.
      if (document.hidden || !document.hasFocus()) timeline.progress(1);
      const fallback = setTimeout(
        () => timeline.progress(1),
        (wait + timeline.duration() + 0.5) * 1000,
      );
      return () => {
        clearTimeout(fallback);
        moveCaret(null);
      };
    });
    return () => media.revert();
  }, [active]);

  return (
    <div
      ref={terminal}
      data-ui
      className="terminal-card relative z-10 w-full max-w-117.5"
    >
      <WindowChrome title={demo.label} />
      <div className="min-h-71.25 px-4 py-5 font-mono text-xs leading-6 sm:px-5">
        <p className="mb-3 text-terminal-muted">
          # example — nothing runs on this page
        </p>
        <p className="terminal-command wrap-break-word" key={demo.command}>
          <span className="terminal-prompt text-accent">
            {active === 0 ? "terminal > " : "you > "}
          </span>
          {[...demo.command].map((character, index) => (
            <span className="terminal-character" key={index}>
              {character}
            </span>
          ))}
        </p>
        <div className="mt-4 min-h-36.25" aria-live="polite">
          <div className="terminal-output" key={active}>
            {demo.output.map((line, i) => (
              <p key={i} style={{ "--line-index": i }}>
                {line || "\u00a0"}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 border-t border-white/10 bg-terminal-raised px-4 py-2 font-mono text-[10px] text-terminal-subtle">
        <span>
          {active === 0 ? "Local installer" : "Current model and tools"}
        </span>
        <span>No Kip sign-in</span>
      </div>
    </div>
  );
}
