import React from "react";

export function Skills() {
  return (
    <section className="section-shell grid items-center gap-10 border-b border-line md:grid-cols-2 md:gap-16 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-muted [&_code]:rounded [&_code]:bg-soft [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs">
      <div>
        <span className="eyebrow">A FEW GOOD HELPERS</span>
        <h2>
          The right skills.
          <br />
          Along for the ride.
        </h2>
        <p>
          Kip selects skills from the words in your task.
          <br />
          Review your plan, or add one explicitly with <code>--skill</code>.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 py-4">
        {[
          "frontend-design",
          "frontend",
          "responsive-design",
          "backend",
          "security",
          "testing",
          "token-efficiency",
          "anti-ai-slop",
        ].map((s, i) => (
          <span
            className={`inline-flex items-center gap-2.5 rounded-xl border border-line px-4 py-3 text-xs font-bold shadow-sm [&>b]:text-lg [&>b]:font-normal [&>b]:text-subtle ${i === 3 ? "rotate-3 bg-[#e8e8e8]" : i === 4 ? "-rotate-3 bg-[#eeeeee]" : i % 2 ? "rotate-3 bg-surface" : "-rotate-3 bg-surface"}`}
            key={s}
          >
            <b>{["✳", "⌘", "↔", "⌁", "◇", "✓", "◎", "✧"][i]}</b>
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
