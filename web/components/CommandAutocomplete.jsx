import React, {
  useId,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";
import { getCompletions } from "../data/completions.js";
import { CodeBlock } from "./CodeBlock.jsx";
import { ArrowRightIcon } from "./Icons.jsx";

const quickPillTags = [
  { label: "build", insert: "build " },
  { label: "fix", insert: "fix " },
  { label: "plan", insert: "plan " },
  { label: "review", insert: "review " },
  { label: "--profile value", insert: "--profile value " },
  { label: "--profile balanced", insert: "--profile balanced " },
];

function getSuggestionCategory(label) {
  if (label.startsWith("--")) {
    return { type: "flag", badge: "FLAG", color: "bg-soft text-charcoal" };
  }
  if (["build", "fix", "plan", "review"].includes(label)) {
    return {
      type: "purpose",
      badge: "PURPOSE",
      color: "bg-accent/30 text-charcoal",
    };
  }
  if (["profiles", "profile", "update"].includes(label)) {
    return { type: "command", badge: "COMMAND", color: "bg-soft text-muted" };
  }
  if (
    [
      "maximum",
      "balanced",
      "value",
      "budget",
      "minimum-cost",
      "reset",
    ].includes(label)
  ) {
    return {
      type: "profile",
      badge: "PROFILE",
      color: "bg-accent-soft text-charcoal",
    };
  }
  if (["codex", "claude", "antigravity", "all"].includes(label)) {
    return { type: "host", badge: "HOST", color: "bg-soft text-charcoal" };
  }
  return { type: "syntax", badge: "SYNTAX", color: "bg-soft text-muted" };
}

export function CommandAutocomplete({ host, onHostChange }) {
  const prefix = host === "codex" ? "$kip" : "/kip";
  const [text, setText] = useState(`${prefix} `);
  const [caret, setCaret] = useState(text.length);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const pendingCaret = useRef(null);
  const optionRefs = useRef([]);
  const id = useId();
  const suggestions = getCompletions(text, caret, prefix);
  const open = focused && !dismissed && suggestions.length > 0;
  const selected = Math.min(active, suggestions.length - 1);

  useLayoutEffect(() => {
    if (pendingCaret.current !== null) {
      input.current.setSelectionRange(
        pendingCaret.current,
        pendingCaret.current,
      );
      pendingCaret.current = null;
    }
  }, [text]);

  // Keep active option in view when navigating with arrow keys
  useEffect(() => {
    if (open && optionRefs.current[selected]) {
      optionRefs.current[selected].scrollIntoView({ block: "nearest" });
    }
  }, [open, selected]);

  function complete(suggestion) {
    pendingCaret.current = suggestion.caret;
    setText(suggestion.text);
    setCaret(suggestion.caret);
    setActive(0);
    setDismissed(false);
    input.current.focus();
  }

  function handlePillClick(insertText) {
    let nextText = text;
    if (text.trim() === prefix) {
      nextText = `${prefix} ${insertText}`;
    } else if (text.endsWith(" ")) {
      nextText = `${text}${insertText}`;
    } else {
      nextText = `${text} ${insertText}`;
    }
    const nextCaret = nextText.length;
    pendingCaret.current = nextCaret;
    setText(nextText);
    setCaret(nextCaret);
    setDismissed(false);
    input.current?.focus();
  }

  function navigate(event) {
    if (event.key === "Escape") {
      setDismissed(true);
      return;
    }
    if (suggestions.length && ["ArrowDown", "ArrowUp"].includes(event.key)) {
      event.preventDefault();
      setDismissed(false);
      setActive(
        (index) =>
          (index + (event.key === "ArrowDown" ? 1 : -1) + suggestions.length) %
          suggestions.length,
      );
    } else if (
      open &&
      ["Tab", "Enter"].includes(event.key) &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      complete(suggestions[selected]);
    }
  }

  return (
    <div>
      {/* Host model selector */}
      <div className="mb-5">
        <label htmlFor={`${id}-host`}>Your coding host</label>
        <div
          className="grid grid-cols-3 gap-2"
          role="radiogroup"
          aria-label="Select host platform"
        >
          {[
            { key: "codex", label: "Codex", prefix: "$kip" },
            { key: "claude", label: "Claude Code", prefix: "/kip" },
            { key: "antigravity", label: "Antigravity", prefix: "/kip" },
          ].map((item) => {
            const isCurrent = host === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="radio"
                aria-checked={isCurrent}
                onClick={() => onHostChange(item.key)}
                className={`flex items-center justify-between rounded-xl border p-2.5 text-left text-xs transition-all duration-150 ${
                  isCurrent
                    ? "border-accent bg-accent/15 text-charcoal shadow-xs ring-1 ring-accent/30 font-bold"
                    : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-muted">
                  {item.prefix}
                </span>
              </button>
            );
          })}
        </div>

        {/* Fallback accessible select */}
        <div className="sr-only">
          <select
            id={`${id}-host`}
            value={host}
            onChange={(event) => onHostChange(event.target.value)}
          >
            <option value="codex">Codex</option>
            <option value="claude">Claude Code</option>
            <option value="antigravity">Antigravity</option>
          </select>
        </div>
      </div>

      {/* Input label and quick pill tags */}
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <label htmlFor={`${id}-input`} className="m-0">
          Type a Kip command
        </label>
        <div
          className="flex flex-wrap items-center gap-1.5"
          aria-label="Quick syntax pills"
        >
          <span className="text-[11px] font-medium text-muted">
            Quick insert:
          </span>
          {quickPillTags.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => handlePillClick(pill.insert)}
              className="rounded-full border border-line bg-page px-2 py-0.5 font-mono text-[11px] font-semibold text-charcoal transition-all hover:border-subtle hover:bg-surface hover:text-ink focus-visible:ring-1 focus-visible:ring-accent"
            >
              +{pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & command input with prompt icon */}
      <div className="relative">
        <input
          ref={input}
          id={`${id}-input`}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? `${id}-list` : undefined}
          aria-activedescendant={open ? `${id}-option-${selected}` : undefined}
          aria-describedby={`${id}-hint`}
          autoComplete="off"
          spellCheck={false}
          value={text}
          className="w-full rounded-xl border border-line bg-surface px-4 py-3 font-mono text-sm text-charcoal shadow-xs transition-all placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(event) => {
            setText(event.target.value);
            setCaret(event.target.selectionStart);
            setActive(0);
            setDismissed(false);
          }}
          onSelect={(event) => setCaret(event.target.selectionStart)}
          onKeyDown={navigate}
        />

        {text.trim() !== prefix && (
          <button
            type="button"
            onClick={() => {
              setText(`${prefix} `);
              setCaret(prefix.length + 1);
              input.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 font-mono text-[11px] text-muted transition hover:bg-page hover:text-charcoal"
            aria-label="Reset command to host prefix"
          >
            Clear
          </button>
        )}
      </div>

      {/* Autocomplete suggestions dropdown */}
      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label="Command suggestions"
          className="suggestion-menu mt-2 max-h-72 space-y-1 overflow-y-auto rounded-2xl border border-line bg-surface/95 p-1.5 shadow-xl shadow-ink/5 backdrop-blur-sm transition-all duration-150"
        >
          {suggestions.map((suggestion, index) => {
            const isOptionSelected = selected === index;
            const category = getSuggestionCategory(suggestion.label);
            return (
              <li
                key={suggestion.label}
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isOptionSelected}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => complete(suggestion)}
                className={`group flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-100 ${
                  isOptionSelected
                    ? "border-accent/40 bg-accent/20 text-charcoal shadow-xs scale-[1.005]"
                    : "border-transparent hover:border-line/60 hover:bg-page"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid size-7 shrink-0 place-items-center rounded-lg border text-xs transition ${
                    isOptionSelected
                      ? "border-accent/40 bg-surface text-charcoal"
                      : "border-line bg-page text-muted group-hover:border-subtle/50 group-hover:text-charcoal"
                  }`}
                >
                  <ArrowRightIcon className="size-3.5" />
                </span>

                <span className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-charcoal">
                      {suggestion.label}
                    </span>
                    <span
                      className={`rounded px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase tracking-wider ${category.color}`}
                    >
                      {category.badge}
                    </span>
                  </div>
                  <span className="mt-0.5 block text-xs leading-5 text-muted">
                    {suggestion.description}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={`hidden items-center gap-1 rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted shadow-2xs sm:inline-flex ${
                    isOptionSelected ? "opacity-100" : "opacity-0"
                  }`}
                >
                  ↵ Enter
                </span>
              </li>
            );
          })}
        </ul>
      )}

      {/* Helpful hint description */}
      <p id={`${id}-hint`} className="my-3 text-xs leading-6 text-muted">
        Suggestions update as you type commands, --profile, and profile names.
        Use arrow keys to choose, Tab or Enter to complete, and Esc to dismiss.
        Then add your task in your own words.
      </p>

      {/* CodeBlock result with Copy button */}
      <div className="overflow-hidden rounded-xl shadow-md">
        <CodeBlock text={text} title="Your coding chat" />
      </div>
    </div>
  );
}
