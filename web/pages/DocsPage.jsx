import React, { useState } from "react";
import { GettingStarted } from "../components/GettingStarted.jsx";
import { Profiles } from "../components/Profiles.jsx";
import { CommandBuilder } from "../components/CommandBuilder.jsx";
import { Updates } from "../components/Updates.jsx";
import { ScrollLink } from "../components/ScrollLink.jsx";

export function DocsPage() {
  const [profile, setProfile] = useState("");

  return (
    <div className="docs-layout mx-auto max-w-[1320px] px-6 pb-16 md:px-14">
      <div className="docs-intro border-b border-line py-10 md:py-14">
        <span className="eyebrow">YOUR KIP FIELD GUIDE</span>
        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
          Quick Start
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted">
          Install Kip, choose a profile, and shape a prompt for your coding
          host. Everything you need to get moving, in one place.
        </p>
      </div>
      <div className="docs-body grid gap-8 pt-8 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-10">
        <aside>
          <nav
            aria-label="Documentation sections"
            className="docs-nav flex flex-wrap gap-x-5 gap-y-3 text-xs font-bold text-muted lg:sticky lg:top-8 lg:flex-col lg:gap-4"
          >
            <ScrollLink href="#get-started">Get started</ScrollLink>
            <ScrollLink href="#profiles">Model profiles</ScrollLink>
            <ScrollLink href="#playground">Command builder</ScrollLink>
            <ScrollLink href="#updates">Updates</ScrollLink>
          </nav>
        </aside>
        <div className="docs-content min-w-0">
          <GettingStarted />
          <Profiles onSelect={setProfile} />
          <CommandBuilder profile={profile} onProfileChange={setProfile} />
          <Updates />
        </div>
      </div>
    </div>
  );
}
