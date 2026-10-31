import React from "react";
import { skills } from "../data/skills.js";
import { ArrowUpRightIcon } from "./Icons.jsx";

const skillIcons = {
  "frontend-design": (
    <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
  ),
  "taste-skill": (
    <path d="M12 3c.8 5.2 3.8 8.2 9 9-5.2.8-8.2 3.8-9 9-.8-5.2-3.8-8.2-9-9 5.2-.8 8.2-3.8 9-9Z" />
  ),
  "build-awwwards-quality-sites": (
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
  ),
  shadcn: <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" />,
  "vercel-react-best-practices": <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z" />,
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
      <div className="max-w-md" data-reveal>
        <p className="section-kicker">Selective by default</p>
        <h2>Five skills. Only the useful ones enter the room.</h2>
        <p className="text-sm leading-7 text-muted">
          Kip reads the task and loads the smallest relevant set of guidance.
          You can also name a specialty directly, such as{" "}
          <code className="inline-code">frontend-design</code> or{" "}
          <code className="inline-code">shadcn</code>.
        </p>
        <a className="text-link mt-6" href="/docs#playground">
          Build a task prompt <ArrowUpRightIcon />
        </a>
      </div>
      <div className="min-w-0 py-4" data-reveal="80">
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
