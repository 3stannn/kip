import React, { useState } from "react";
import { GettingStarted } from "../components/GettingStarted.jsx";
import { Profiles } from "../components/Profiles.jsx";
import { CommandBuilder } from "../components/CommandBuilder.jsx";
import { Updates } from "../components/Updates.jsx";
import { ScrollLink } from "../components/ScrollLink.jsx";
import { purposes } from "../data/purposes.js";

export function DocsPage() {
  const [profile, setProfile] = useState("");
  const [host, setHost] = useState("codex");

  return (
    <div className="docs-layout mx-auto max-w-[1320px] px-6 pb-16 md:px-14">
      <div className="docs-intro border-b border-line py-10 md:py-14">
        <p className="section-kicker">Kip field guide</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          Install it once. Give it one focused task.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          Kip stays inside your coding chat. Use this guide to install the
          skill, prepare a task, understand optional profiles, and keep your
          installed copy current.
        </p>
      </div>
      <div className="docs-body grid gap-8 pt-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
        <aside>
          <nav
            aria-label="Documentation sections"
            className="docs-nav flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-muted lg:sticky lg:top-8 lg:flex-col lg:gap-4"
          >
            <ScrollLink href="#get-started">Get started</ScrollLink>
            <ScrollLink href="#purposes">Choose a purpose</ScrollLink>
            <ScrollLink href="#profiles">Preview profiles</ScrollLink>
            <ScrollLink href="#playground">Build a prompt</ScrollLink>
            <ScrollLink href="#updates">Update Kip</ScrollLink>
          </nav>
        </aside>
        <div className="docs-content min-w-0">
          <GettingStarted />
          <section
            className="docs-section"
            id="purposes"
            aria-labelledby="purposes-heading"
          >
            <div className="docs-section-header">
              <h2 id="purposes-heading">Choose a purpose</h2>
              <p>Set the outcome and what Kip may change.</p>
            </div>
            <div className="docs-panel">
              <dl className="m-0 grid gap-5">
                {purposes.map(({ name, detail }) => (
                  <div
                    key={name}
                    className="grid gap-1 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-4"
                  >
                    <dt className="font-mono text-sm font-bold">{name}</dt>
                    <dd className="m-0 text-sm leading-6 text-muted">
                      {detail}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mb-0 mt-6 text-sm leading-7 text-muted">
                Kip can remember concise project notes across chats and hosts
                using the same checkout. It reads relevant notes first and
                checks current source before relying on them. Separate clones
                and worktrees keep separate notes.
              </p>
            </div>
          </section>
          <Profiles onSelect={setProfile} host={host} onHostChange={setHost} />
          <CommandBuilder
            profile={profile}
            onProfileChange={setProfile}
            host={host}
            onHostChange={setHost}
          />
          <Updates />
        </div>
      </div>
    </div>
  );
}
