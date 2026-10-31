import React, { useId, useLayoutEffect, useRef, useState } from "react";
import { getCompletions } from "../data/completions.js";
import { CodeBlock } from "./CodeBlock.jsx";
import { ArrowRightIcon } from "./Icons.jsx";

export function CommandAutocomplete({ host, onHostChange }) {
  const prefix = host === "codex" ? "$kip" : "/kip";
  const [text, setText] = useState(`${prefix} `);
  const [caret, setCaret] = useState(text.length);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef(null);
  const pendingCaret = useRef(null);
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

  function complete(suggestion) {
    pendingCaret.current = suggestion.caret;
    setText(suggestion.text);
    setCaret(suggestion.caret);
    setActive(0);
    setDismissed(false);
    input.current.focus();
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
      <label htmlFor={`${id}-host`}>Your coding host</label>
      <select
        id={`${id}-host`}
        value={host}
        className="mb-5"
        onChange={(event) => onHostChange(event.target.value)}
      >
        <option value="codex">Codex</option>
        <option value="claude">Claude Code</option>
        <option value="antigravity">Antigravity</option>
      </select>
      <label htmlFor={`${id}-input`}>Type a Kip command</label>
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
        className="font-mono"
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
      {open && (
        <ul
          id={`${id}-list`}
          role="listbox"
          aria-label="Command suggestions"
          className="suggestion-menu"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.label}
              id={`${id}-option-${index}`}
              role="option"
              aria-selected={selected === index}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => complete(suggestion)}
              className="suggestion-option"
            >
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-page text-sm text-muted"
              >
                <ArrowRightIcon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="suggestion-keyword">{suggestion.label}</span>
                <span className="suggestion-description">
                  {suggestion.description}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`hidden rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted sm:block ${selected === index ? "visible" : "invisible"}`}
              >
                ↵
              </span>
            </li>
          ))}
        </ul>
      )}
      <p id={`${id}-hint`} className="my-3 text-xs leading-6 text-muted">
        Suggestions update as you type commands, --profile, and profile names.
        Use the arrow keys to choose, Tab or Enter to complete, and Esc to
        dismiss. Then add your task in your own words.
      </p>
      <CodeBlock text={text} title="Your coding chat" />
    </div>
  );
}
