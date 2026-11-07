import React, { useState } from "react";
import { getProfiles, profileHostDetails } from "../data/profiles.js";
import { ScrollLink } from "./ScrollLink.jsx";
import { ArrowRightIcon } from "./Icons.jsx";

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
          applies once. Kip sizes the team to the task: small changes run
          solo, typical ones use a worker and a reviewer.
        </p>
      </div>

      <div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="profile-host">Your coding host</label>
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
          <div>
            <label htmlFor="preview-profile">Preview a model profile</label>
            <select
              id="preview-profile"
              value={selected.slug}
              onChange={(event) => setPreview(event.target.value)}
              aria-describedby="preview-profile-help"
            >
              {profiles.map((profile) => (
                <option key={profile.slug} value={profile.slug}>
                  {profile.name}
                  {profile.slug === "value" ? " — suggested start" : ""}
                </option>
              ))}
            </select>
            <p
              id="preview-profile-help"
              className="mb-0 mt-2 text-xs leading-6 text-muted"
            >
              Presets run from Maximum to Minimum cost. Role settings appear
              below.
            </p>
          </div>
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
