import React, { useState } from "react";
import { getProfiles, profileHostDetails } from "../data/profiles.js";
import { ScrollLink } from "./ScrollLink.jsx";
import { ArrowRightIcon } from "./Icons.jsx";

export function Profiles({ onSelect, host, onHostChange }) {
  const [preview, setPreview] = useState("value");
  const profiles = getProfiles(host);
  const hostDetails = profileHostDetails[host];
  const selected = profiles.find((profile) => profile.slug === preview);

  return (
    <section
      className="docs-section"
      id="profiles"
      aria-labelledby="profiles-heading"
    >
      <div className="docs-section-header">
        <h2 id="profiles-heading">Model profiles</h2>
        <p>
          Preview seven presets for a root, two workers, and an independent
          reviewer. Kip restores your saved project profile. A task override
          applies once. Kip tasks use subagents automatically; no extra
          delegation phrase is needed.
        </p>
      </div>
      <div>
        <div className="mb-6 max-w-xs">
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
        <div className="mb-3 flex justify-between text-xs text-muted">
          <span>Higher intended cost</span>
          <span>Lower intended cost</span>
        </div>
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-7"
          role="group"
          aria-label="Preview a model profile"
        >
          {profiles.map((profile, index) => (
            <button
              key={profile.slug}
              aria-pressed={preview === profile.slug}
              onClick={() => setPreview(profile.slug)}
              className={`rounded-lg border px-3 py-3 text-left transition ${preview === profile.slug ? "border-accent bg-accent/15 text-ink" : "border-line text-muted hover:bg-soft"}`}
            >
              <span className="block text-xs font-extrabold">
                {profile.name}
              </span>
              <span className="mt-1 block text-[10px]">
                {profile.slug === "value"
                  ? "Suggested start"
                  : `Profile ${index + 1}`}
              </span>
            </button>
          ))}
        </div>
        <div
          className="my-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {selected.roles.map((setting, index) => (
            <div key={index} className="border-l-2 border-line pl-4">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-wider text-muted">
                {["Root", "Reviewer", "Worker 1", "Worker 2"][index]}
              </span>
              <span className="text-sm font-extrabold">{setting}</span>
            </div>
          ))}
        </div>
        <p className="status-note" role="status">
          Previewing <strong>{selected.name}</strong> for {hostDetails.name}.
          This page has not changed your chat, model, or host settings.
        </p>
        <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="m-0 max-w-xl text-xs leading-6 text-muted">
            The root model and effort must be selected in your host. Reviewer
            and worker settings use your host's delegation tools and model
            support; Kip discloses unavailable settings instead of silently
            substituting them.
          </p>
          <ScrollLink
            className="text-link max-w-full shrink-0"
            href="#playground"
            onClick={() => onSelect?.(preview)}
          >
            <span className="min-w-0">Add {selected.name} to one task</span>
            <ArrowRightIcon className="size-4 shrink-0" />
          </ScrollLink>
        </div>
        <p className="mb-0 mt-5 text-[10px] leading-5 text-muted">
          {hostDetails.note}
        </p>
      </div>
    </section>
  );
}
