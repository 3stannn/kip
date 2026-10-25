import React, { useEffect, useRef } from "react";

export function Mascot({ small = false }) {
  const mascot = useRef(null);

  useEffect(() => {
    const element = mascot.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const reset = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--look-x", "0px");
      element.style.setProperty("--look-y", "0px");
    };
    const follow = (event) => {
      if (motion.matches || event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(dx, dy);
        const strength = Math.min(distance / 180, 1);
        const x = distance ? (dx / distance) * strength : 0;
        const y = distance ? (dy / distance) * strength : 0;
        element.style.setProperty("--look-x", `${Math.round(x)}px`);
        element.style.setProperty("--look-y", `${Math.round(y)}px`);
      });
    };
    const leave = (event) => {
      if (!event.relatedTarget) reset();
    };
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", reset);
    window.addEventListener("scroll", reset, { passive: true });
    motion.addEventListener("change", reset);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", reset);
      window.removeEventListener("scroll", reset);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div
      ref={mascot}
      className={`mascot ${small ? "size-14" : "size-24 sm:size-28"}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 28 28"
        fill="none"
        shapeRendering="crispEdges"
        className="mascot-head size-full"
      >
        <path
          d="M8 3H20V4H23V6H25V9H26V21H24V24H21V25H7V24H4V21H2V9H3V6H5V4H8Z"
          fill="var(--color-accent)"
        />
        <path d="M7 8H21V9H23V20H21V21H7V20H5V9H7Z" fill="#303030" />
        <g className="mascot-eyes" fill="#ffffff">
          <g className="mascot-blink">
            <rect x="9" y="11" width="2" height="5" />
            <rect x="17" y="11" width="2" height="5" />
          </g>
        </g>
      </svg>
    </div>
  );
}
