import React, { useState, useRef } from "react";
import { getProfiles, profileHostDetails } from "../data/profiles.js";
import { ScrollLink } from "./ScrollLink.jsx";
import { ArrowRightIcon } from "./Icons.jsx";

const hostBadgeMeta = {
  codex: {
    label: "Codex",
    models: "Astra · Sol · Luna",
    command: "$kip",
  },
  claude: {
    label: "Claude Code",
    models: "Opus · Sonnet · Haiku",
    command: "/kip",
  },
  antigravity: {
    label: "Antigravity",
    models: "Pro · Flash",
    command: "/kip",
  },
};

const roleMeta = [
  { name: "Root", badge: "Lead / Orchestrator" },
  { name: "Reviewer", badge: "Independent Gate" },
  { name: "Worker 1", badge: "Subagent" },
  { name: "Worker 2", badge: "Subagent" },
];

function getEffortBadgeClass(effort) {
  const norm = (effort || "").toLowerCase();
  if (norm.includes("ultra") || norm.includes("max")) {
    return "bg-charcoal text-white border-charcoal";
  }
  if (norm.includes("high")) {
    return "bg-accent/35 text-charcoal border-accent/40 font-extrabold";
  }
  if (norm.includes("medium")) {
    return "bg-soft text-charcoal border-line font-bold";
  }
  if (norm.includes("inherited")) {
    return "bg-accent-soft text-charcoal border-accent/20";
  }
  return "bg-page text-muted border-line";
}

export function Profiles({ onSelect, host, onHostChange }) {
  const [preview, setPreview] = useState("value");
  const profiles = getProfiles(host);
  const hostDetails = profileHostDetails[host];
  const selected =
    profiles.find((profile) => profile.slug === preview) || profiles[0];
  const profileRefs = useRef([]);

  function handleProfileKey(event, index) {
    const keys = {
      ArrowRight: (index + 1) % profiles.length,
      ArrowDown: (index + 1) % profiles.length,
      ArrowLeft: (index + profiles.length - 1) % profiles.length,
      ArrowUp: (index + profiles.length - 1) % profiles.length,
      Home: 0,
      End: profiles.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setPreview(profiles[next].slug);
    profileRefs.current[next]?.focus();
  }

  return (
    <section
      className="docs-section"
      id="profiles"
      aria-labelledby="profiles-heading"
    >
      <div className="docs-section-header">
        <h2 id="profiles-heading">Model profiles</h2>
        <p>
          Preview five presets for a root, two workers, and an independent
          reviewer. Kip restores your saved project profile. A task override
          applies once. Kip tasks use subagents automatically; no extra
          delegation phrase is needed.
        </p>
      </div>

      <div>
        {/* Host selection with clear badge chips */}
        <div className="mb-7">
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="profile-host"
              className="m-0 font-extrabold text-xs"
            >
              Your coding host
            </label>
            <span className="font-mono text-[11px] text-muted">
              Active prefix: {hostBadgeMeta[host]?.command}
            </span>
          </div>

          {/* Interactive host model badge chips */}
          <div
            className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3"
            role="radiogroup"
            aria-label="Select host platform"
          >
            {Object.entries(profileHostDetails).map(([key, details]) => {
              const meta = hostBadgeMeta[key];
              const isCurrent = host === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={isCurrent}
                  onClick={() => onHostChange(key)}
                  className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all duration-150 ${
                    isCurrent
                      ? "border-accent bg-accent/15 text-charcoal shadow-xs ring-1 ring-accent/30"
                      : "border-line bg-surface text-muted hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="font-black text-xs text-ink">
                      {details.name}
                    </span>
                    <span className="rounded border border-line bg-page px-1.5 py-0.5 font-mono text-[10px] font-semibold text-charcoal">
                      {meta.command}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted">{meta.models}</span>
                </button>
              );
            })}
          </div>

          {/* Accessible native select fallback */}
          <div className="sr-only">
            <select
              id="profile-host"
              value={host}
              onChange={(event) => onHostChange(event.target.value)}
            >
              {Object.entries(profileHostDetails).map(([value, details]) => (
                <option key={value} value={value}>
                  {details.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cost spectrum indicators */}
        <div className="mb-2 flex items-center justify-between text-xs text-muted">
          <span className="flex items-center gap-1 font-semibold">
            <span
              className="inline-block size-1.5 rounded-full bg-charcoal"
              aria-hidden="true"
            />
            Higher intended cost
          </span>
          <span className="flex items-center gap-1 font-semibold">
            Lower intended cost
            <span
              className="inline-block size-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
          </span>
        </div>

        {/* Profile selector cards */}
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-5"
          role="radiogroup"
          aria-label="Preview a model profile"
        >
          {profiles.map((profile, index) => {
            const isSelected = preview === profile.slug;
            return (
              <button
                key={profile.slug}
                ref={(element) => {
                  profileRefs.current[index] = element;
                }}
                type="button"
                role="radio"
                aria-checked={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onKeyDown={(event) => handleProfileKey(event, index)}
                onClick={() => setPreview(profile.slug)}
                className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all duration-150 ${
                  isSelected
                    ? "-translate-y-0.5 border-accent bg-accent/15 text-ink shadow-md ring-1 ring-accent/30"
                    : "border-line bg-surface text-muted hover:-translate-y-0.5 hover:border-subtle/50 hover:bg-page hover:text-charcoal"
                }`}
              >
                <div>
                  <span className="block font-black text-xs text-ink">
                    {profile.name}
                  </span>
                  <span className="mt-1 block text-[11px] text-muted">
                    {profile.slug === "value"
                      ? "Suggested start"
                      : profile.slug === "maximum"
                        ? "Peak power"
                        : profile.slug === "minimum-cost"
                          ? "Lowest cost"
                          : `Profile ${index + 1}`}
                  </span>
                </div>
                {profile.slug === "value" && (
                  <span className="mt-2.5 inline-block self-start rounded-full bg-accent px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-charcoal">
                    Recommended
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Role cards for selected profile */}
        <div
          className="my-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {selected.roles.map((setting, index) => {
            const [modelName, effortLevel] = setting.split(" / ");
            const meta = roleMeta[index];
            return (
              <div
                key={index}
                className="rounded-xl border border-line bg-surface p-4 shadow-xs transition hover:border-subtle/40"
              >
                <div className="mb-2.5 flex items-center justify-between">
                  <span className="font-extrabold text-[11px] uppercase tracking-wider text-muted">
                    {meta.name}
                  </span>
                  <span className="rounded bg-page px-1.5 py-0.5 font-mono text-[10px] font-semibold text-muted">
                    {meta.badge}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-black text-base tracking-tight text-charcoal">
                    {modelName}
                  </span>
                  {effortLevel && (
                    <span
                      className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${getEffortBadgeClass(
                        effortLevel,
                      )}`}
                    >
                      {effortLevel}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Status note with indicator */}
        <div className="status-note flex items-center gap-2.5" role="status">
          <span
            className="size-2 shrink-0 rounded-full bg-accent shadow-xs"
            aria-hidden="true"
          />
          <p className="m-0">
            Previewing <strong>{selected.name}</strong> for {hostDetails.name}.
            This page has not changed your chat, model, or host settings.
          </p>
        </div>

        {/* Explanation & scroll to playground link */}
        <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="m-0 max-w-xl text-xs leading-6 text-muted">
            The root model and effort must be selected in your host. Reviewer
            and worker settings use your host's delegation tools and model
            support; Kip discloses unavailable settings instead of silently
            substituting them.
          </p>
          <ScrollLink
            className="text-link group max-w-full shrink-0"
            href="#playground"
            onClick={() => onSelect?.(preview)}
          >
            <span className="min-w-0">Add {selected.name} to one task</span>
            <ArrowRightIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </ScrollLink>
        </div>

        <p className="mb-0 mt-5 text-[11px] leading-5 text-muted">
          {hostDetails.note}
        </p>
      </div>
    </section>
  );
}
