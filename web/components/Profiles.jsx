import React, { useState } from "react";
import { profiles } from "../data/profiles.js";
import { ScrollLink } from "./ScrollLink.jsx";

export function Profiles({ onSelect }) {
  const [preview, setPreview] = useState("value");
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
          Preview seven optional presets for the root, reviewer, and two
          workers. Value is a suggested starting point; host defaults also work.
        </p>
      </div>
      <div>
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
        <div className="flex flex-col items-start justify-between gap-5 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="m-0 max-w-xl text-xs leading-6 text-muted">
            Select the root model and thinking effort in your host. Reviewer and
            worker settings depend on host delegation support. Actual cost
            varies with usage and host billing.
          </p>
          <ScrollLink
            className="shrink-0 text-sm font-extrabold underline decoration-line underline-offset-4 hover:decoration-accent"
            href="#playground"
            onClick={() => onSelect?.(preview)}
          >
            Use {selected.name} in the builder →
          </ScrollLink>
        </div>
        <p className="mb-0 mt-5 text-[10px] leading-5 text-muted">
          Astra = gpt-6-astra · Sol = gpt-6.1-sol · Luna = gpt-6-luna. Profiles
          request settings through your existing host.
        </p>
      </div>
    </section>
  );
}
