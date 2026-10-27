import React from "react";
import { skills } from "../data/skills.js";
import { ArrowUpRightIcon } from "./Icons.jsx";

const skillIcons = {
  "frontend-design": (
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
  ),
  "responsive-design": <path d="m8 8-4 4 4 4m8-8 4 4-4 4M4 12h16" />,
  frontend: (
    <path d="M9 7V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V7Z" />
  ),
  backend: <path d="M4 8c3 0 3 4 6 4s3 4 6 4 3-4 4-4" />,
  security: <path d="m12 4 8 8-8 8-8-8 8-8Z" />,
  testing: <path d="m5 12 4 4L19 6" />,
  "token-efficiency": (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  "anti-ai-slop": (
    <path d="M12 3c.8 5.2 3.8 8.2 9 9-5.2.8-8.2 3.8-9 9-.8-5.2-3.8-8.2-9-9 5.2-.8 8.2-3.8 9-9Z" />
  ),
};

function SkillCard({ name }) {
  return (
    <li className="skill-card">
      <svg
        aria-hidden="true"
        className="size-5 shrink-0 text-subtle"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        {skillIcons[name]}
      </svg>
      {name}
    </li>
  );
}

export function Skills() {
  return (
    <section className="section-shell grid items-center gap-10 overflow-hidden border-b border-line lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
      <div className="max-w-md">
        <p className="section-kicker">Selective by default</p>
        <h2>Eight skills. Only the useful ones enter the room.</h2>
        <p className="text-sm leading-7 text-muted">
          Kip reads the task and loads the smallest relevant set of guidance.
          You can also name a specialty directly, such as{" "}
          <code className="inline-code">review security</code>.
        </p>
        <a className="text-link mt-6" href="/docs#playground">
          Build a task prompt <ArrowUpRightIcon />
        </a>
      </div>
      <div className="min-w-0 py-4">
        <div className="skills-carousel" aria-label="Kip skills">
          <div className="skills-carousel-track">
            {[false, true].map((duplicate) => (
              <ul
                aria-hidden={duplicate || undefined}
                className="skills-carousel-set"
                key={String(duplicate)}
              >
                {skills.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
