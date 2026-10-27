import React, { useEffect, useState } from "react";
import { Mascot } from "./Mascot.jsx";

export function FloatingMascot({ hasHeroMascot = false }) {
  const [visible, setVisible] = useState(!hasHeroMascot);

  useEffect(() => {
    if (!hasHeroMascot) {
      setVisible(true);
      return undefined;
    }

    const heroMascot = document.querySelector("[data-hero-mascot]");
    if (!heroMascot) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(heroMascot);
    return () => observer.disconnect();
  }, [hasHeroMascot]);

  return (
    <div
      className={`floating-mascot ${visible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <Mascot small />
    </div>
  );
}
