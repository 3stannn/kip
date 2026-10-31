import React from "react";
import { ArrowUpRightIcon } from "./Icons.jsx";

export function Closing() {
  return (
    <section
      data-reveal
      className="closing-section mx-6 mb-12 rounded-3xl bg-soft px-6 py-12 text-center md:mx-14 [&>h2]:my-5 [&>h2]:text-3xl [&>p]:mx-auto [&>p]:mt-5 [&>p]:max-w-lg [&>p]:text-xs [&>p]:leading-6 [&>p]:text-muted"
    >
      <p className="section-kicker justify-center">
        Start with the task in front of you
      </p>
      <h2>Prepare a Kip prompt for your coding chat.</h2>
      <a className="button-primary" href="/docs">
        Open the quick start <ArrowUpRightIcon />
      </a>
      <p>
        Install the skill, choose a purpose, and keep your project under the
        same host permissions and review process you already use.
      </p>
    </section>
  );
}
