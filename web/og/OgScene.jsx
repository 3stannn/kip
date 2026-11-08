import React, { useEffect } from "react";
import GradientASCII from "../components/GradientASCII.jsx";

const COLORS = ["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"];

const LOGOS = [
  { name: "claude", x: 415, y: 255, size: 92, rotate: -16 },
  { name: "antigravity", x: 600, y: 155, size: 108, rotate: 9 },
  { name: "codex", x: 785, y: 273, size: 88, rotate: 21 },
];

export function OgScene() {
  useEffect(() => {
    // The render script waits for this flag before taking the screenshot.
    document.fonts.ready.then(() => {
      setTimeout(() => {
        document.documentElement.dataset.ready = "true";
      }, 2500);
    });
  }, []);

  return (
    <div className="og-stage">
      <div className="og-ascii" aria-hidden="true">
        <GradientASCII
          colors={COLORS}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={16}
          density={0.8}
          intro={false}
          mouseInteraction={false}
          clickEffect="none"
          flicker={0}
          dpr={2}
        />
      </div>

      {LOGOS.map(({ name, x, y, size, rotate }) => (
        <img
          key={name}
          className="og-logo"
          src={`/logos/${name}.svg`}
          alt=""
          style={{
            left: x - size / 2,
            top: y - size / 2,
            width: size,
            height: size,
            padding: Math.round(size * 0.2),
            borderRadius: Math.round(size * 0.26),
            transform: `rotate(${rotate}deg)`,
          }}
        />
      ))}

      <span className="og-spark" style={{ left: 341, top: 187 }} />
      <span className="og-spark is-small" style={{ left: 692, top: 129 }} />
      <span className="og-spark" style={{ left: 823, top: 359 }} />
      <span className="og-spark is-small" style={{ left: 519, top: 377 }} />
    </div>
  );
}
