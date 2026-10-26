import React from "react";

export function Closing() {
  return (
    <section className="mx-6 mb-12 rounded-3xl bg-soft px-6 py-12 text-center md:mx-14 [&>h2]:my-6 [&>h2]:text-3xl [&>p]:mt-5 [&>p]:text-xs [&>p]:text-muted">
      <h2>Your next idea is a command away.</h2>
      <a className="button-primary" href="/docs">
        Let’s get started <span>↗</span>
      </a>
      <p>A little structure. More room to create.</p>
    </section>
  );
}
