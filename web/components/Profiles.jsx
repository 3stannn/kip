import React, { useState } from "react";
import { profiles } from "../data/profiles.js";
import { ScrollLink } from "./ScrollLink.jsx";

export function Profiles({ onSelect }) {
  const [preview, setPreview] = useState("value");
  const selected = profiles.find((profile) => profile.slug === preview);

  return (
    <section className="section-shell border-t border-line" id="profiles">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">A TEAM THAT FITS THE TASK</span>
          <h2>Find your working rhythm.</h2>
        </div>
        <p className="max-w-sm text-sm leading-7 text-muted">
          Seven optional profiles for your root, reviewer, and two workers.
          Start with Value, or explore a different balance.
        </p>
      </div>
      <div className="rounded-3xl border border-line bg-surface p-5 sm:p-8">
        <div className="mb-4 flex justify-between text-[10px] font-extrabold tracking-wider text-muted">
          <span>HIGHER INTENDED COST</span>
          <span>LOWER INTENDED COST</span>
        </div>
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7"
          role="group"
          aria-label="Preview a model profile"
        >
          {profiles.map((profile, index) => (
            <button
              key={profile.slug}
              aria-pressed={preview === profile.slug}
              onClick={() => setPreview(profile.slug)}
              className={`rounded-xl border px-3 py-4 text-left transition ${preview === profile.slug ? "border-accent bg-accent/15 text-ink" : "border-line text-muted hover:bg-page"}`}
            >
              <span className="mb-3 block font-mono text-[10px]">
                0{index + 1}
              </span>
              <span className="block text-xs font-extrabold">
                {profile.name}
              </span>
              <span className="mt-1 block text-[10px]">
                {profile.slug === "value" ? "Suggested start" : "View roles ↗"}
              </span>
            </button>
          ))}
        </div>
        <div
          className="my-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {selected.roles.map((setting, index) => (
            <div key={index} className="rounded-xl bg-page px-5 py-4">
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
            className="button-primary px-5 py-3 text-xs"
            href="#playground"
            onClick={() => onSelect(preview)}
          >
            Try {selected.name} <span>↗</span>
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
