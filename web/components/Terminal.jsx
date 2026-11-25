import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WindowChrome } from "./WindowChrome.jsx";

const demos = [
  {
    prompt: "$ ",
    command:
      "git clone https://github.com/3stannn/kip.git && cd kip && node bin/kip.js install",
    output: [
      "For Codex, Claude Code, and Antigravity",
      "Restart the host, then open your project",
    ],
    label: "Terminal · example",
  },
  {
    prompt: "> ",
    command: "$kip plan Build an accessible React login",
    output: [
      "Delegate analysis, then review the plan",
      "Inspect the existing auth flow",
      "Define states, boundaries, and checks",
      "Return the plan without editing files",
    ],
    label: "Codex · example",
  },
  {
    prompt: "> ",
    command: "/kip build Create an accessible React login",
    output: [
      "Inspect the current project and constraints",
      "Implement the requested flow",
      "Run relevant checks",
      "Report changes and remaining gaps",
    ],
    label: "Claude Code · example",
  },
];
const SECONDS_PER_CHARACTER = 0.022;
const LONGEST_TYPING = 1.1;

export function Terminal({ active }) {
  const demo = demos[active];
  const terminalBody = useRef(null);

  // The command is typed out, then the response lines step in. Every
  // character stays in the layout throughout, so nothing reflows.
  useEffect(() => {
    const root = terminalBody.current;
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
      const timeline = gsap.timeline({ delay: 0.1 });
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
        (timeline.totalDuration() + timeline.delay() + 0.5) * 1000,
      );
      return () => {
        clearTimeout(fallback);
        moveCaret(null);
      };
    });
    return () => media.revert();
  }, [active]);

  return (
    <div data-ui className="terminal-card w-full">
      <WindowChrome title={demo.label} />
      <div
        ref={terminalBody}
        className="terminal-body"
        role="region"
        aria-label="Terminal example output"
      >
        <p className="terminal-command wrap-break-word" key={demo.command}>
          <span className="terminal-prompt text-accent">{demo.prompt}</span>
          {[...demo.command].map((character, index) => (
            <span className="terminal-character" key={index}>
              {character}
            </span>
          ))}
        </p>
        <div className="mt-4 text-terminal-subtle" aria-live="polite">
          <div className="terminal-output" key={active}>
            {demo.output.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
