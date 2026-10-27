import React, { useEffect, useRef, useState } from "react";
import { CopyIcon } from "./Icons.jsx";

export function Copy({ text, label = "Copy command" }) {
  const [state, setState] = useState("");
  const resetTimer = useRef();
  useEffect(() => () => clearTimeout(resetTimer.current), []);
  async function copy() {
    clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(text);
      setState("Copied!");
    } catch {
      setState("Select text to copy");
    }
    resetTimer.current = setTimeout(() => setState(""), 2200);
  }
  return (
    <button
      className="relative z-10 ml-auto rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium text-[#d4d4d8] transition hover:bg-white/15"
      onClick={copy}
      aria-label={state || label}
      aria-live="polite"
    >
      {state || (
        <span className="inline-flex items-center gap-1.5">
          Copy <CopyIcon className="size-3" />
        </span>
      )}
    </button>
  );
}
