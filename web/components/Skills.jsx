import React from "react";

const skills = [
  "frontend-design",
  "frontend",
  "responsive-design",
  "backend",
  "security",
  "testing",
  "token-efficiency",
  "anti-ai-slop",
];

const iconPaths = [
  <path key="spark" d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />,
  <path
    key="command"
    d="M9 7V5a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v14a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V7Z"
  />,
  <path key="arrows" d="m8 8-4 4 4 4m8-8 4 4-4 4M4 12h16" />,
  <path key="flow" d="M4 8c3 0 3 4 6 4s3 4 6 4 3-4 4-4" />,
  <path key="diamond" d="m12 4 8 8-8 8-8-8 8-8Z" />,
  <path key="check" d="m5 12 4 4L19 6" />,
  <React.Fragment key="target">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
  </React.Fragment>,
  <path
    key="star"
    d="M12 3c.8 5.2 3.8 8.2 9 9-5.2.8-8.2 3.8-9 9-.8-5.2-3.8-8.2-9-9 5.2-.8 8.2-3.8 9-9Z"
  />,
];

function SkillCard({ name, index }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-line px-4 py-3 text-xs font-bold shadow-sm ${index === 3 ? "rotate-2 bg-[#e8e8e8]" : index === 4 ? "-rotate-2 bg-[#eeeeee]" : index % 2 ? "rotate-2 bg-surface" : "-rotate-2 bg-surface"}`}
    >
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
        {iconPaths[index]}
      </svg>
      {name}
    </span>
  );
}

export function Skills() {
  return (
    <section className="section-shell grid items-center gap-10 overflow-hidden border-b border-line md:grid-cols-2 md:gap-16 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted [&_code]:rounded [&_code]:bg-soft [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs">
      <div>
        <span className="eyebrow">A FEW GOOD HELPERS</span>
        <h2>
          The right skills.
          <br />
          Along for the ride.
        </h2>
        <p>
          Kip loads relevant guidance for your task.
          <br />
          Ask for a specialty in your prompt, such as{" "}
          <code>review security</code>.
        </p>
      </div>
      <div className="relative min-w-0 py-4">
        <div className="skills-carousel" aria-label="Kip skills">
          <div className="skills-carousel-track">
            {[false, true].map((duplicate) => (
              <div
                aria-hidden={duplicate || undefined}
                className="skills-carousel-set"
                key={String(duplicate)}
              >
                {skills.map((skill, index) => (
                  <SkillCard index={index} key={skill} name={skill} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
