import React from "react";
import { skills } from "../data/skills.js";
import { ArrowUpRightIcon } from "./Icons.jsx";

function SkillCard({ skill }) {
  return (
    <li className="skill-card">
      <h3 className="m-0 font-mono text-xs font-bold tracking-tight text-ink">
        {skill.name}
      </h3>
      <p className="mt-1.5 text-xs leading-5 text-muted">{skill.description}</p>
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
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
