import React, { useEffect } from "react";
import GradientASCII from "../components/GradientASCII.jsx";
import { MascotFace } from "../components/Mascot.jsx";
import logo from "../assets/kip-logo.svg";

const COLORS = ["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"];

// Kip's head sits at (955, 352); each logo is frozen partway along its arc.
const LAUNCH = { x: 955, y: 352 };
const TOSSED = [
  { logo: "claude", x: 742, y: 196, size: 92, rotate: -16, bend: [790, 250] },
  { logo: "antigravity", x: 948, y: 96, size: 108, rotate: 9, bend: [930, 190] },
  { logo: "codex", x: 1112, y: 214, size: 88, rotate: 21, bend: [1060, 230] },
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
      <div className="og-wash" aria-hidden="true" />

      <svg className="og-trails" viewBox="0 0 1200 630" aria-hidden="true">
        {TOSSED.map(({ logo: name, x, y, bend }) => (
          <path
            key={name}
            d={`M${LAUNCH.x} ${LAUNCH.y} Q${bend[0]} ${bend[1]} ${x} ${y}`}
            pathLength="100"
          />
        ))}
      </svg>

      <div className="og-copy">
        <div className="og-brand">
          <img src={logo} alt="" width="44" height="44" />
          <span>Kip</span>
        </div>
        <h1 className="og-title">
          <span>Big ideas,</span>
          <span className="og-title-serif">Little commands.</span>
        </h1>
        <p className="og-sub">
          Focused work in your coding chat.
          <span>For Codex, Claude Code, and Antigravity.</span>
        </p>
        <p className="og-url">usekip.vercel.app</p>
      </div>

      {TOSSED.map(({ logo: name, x, y, size, rotate }) => (
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

      <span className="og-spark" style={{ left: 668, top: 128 }} />
      <span className="og-spark is-small" style={{ left: 1040, top: 70 }} />
      <span className="og-spark" style={{ left: 1150, top: 300 }} />
      <span className="og-spark is-small" style={{ left: 846, top: 318 }} />

      <div className="og-mascot">
        <MascotFace className="og-mascot-face" />
      </div>
      <div className="og-shadow" aria-hidden="true" />
    </div>
  );
}
