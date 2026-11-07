import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

export const logos = ["claude", "antigravity", "codex"];

export function MascotFace({ className = "mascot-head size-full" }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
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
  );
}

export function Mascot({ small = false, active = true }) {
  const mascot = useRef(null);
  const body = useRef(null);
  const particles = useRef([]);
  const play = useRef(() => {});

  useEffect(() => {
    const element = mascot.current;
    const sprite = body.current;
    const badges = particles.current;
    const eyes = sprite.querySelector(".mascot-blink");
    const snooze = element.querySelector(".mascot-snooze");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    let inView = false;
    let frame = 0;
    let burst;
    let gesture;
    let automatic;
    let actionIndex = 0;
    let disposed = false;
    const idle = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 2.2 });
    idle
      .to(sprite, {
        y: -4,
        rotation: 2,
        scaleX: 1.02,
        scaleY: 0.98,
        duration: 0.8,
        ease: "sine.inOut",
      })
      .to(sprite, {
        y: 0,
        rotation: -1,
        scaleX: 1,
        scaleY: 1,
        duration: 0.65,
        ease: "sine.inOut",
      })
      .to(sprite, { rotation: 0, duration: 0.3, ease: "sine.out" });
    const blink = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 4.6 });
    blink
      .to(eyes, { scaleY: 0.15, duration: 0.08, transformOrigin: "50% 50%" })
      .to(eyes, { scaleY: 1, duration: 0.1 });
    const available = () =>
      active && inView && !document.hidden && document.hasFocus();
    const resetEyes = () => {
      cancelAnimationFrame(frame);
      element.style.setProperty("--look-x", "0px");
      element.style.setProperty("--look-y", "0px");
    };
    const reset = () => {
      automatic?.kill();
      automatic = undefined;
      gesture?.kill();
      gesture = undefined;
      burst?.kill();
      burst = undefined;
      idle.pause(0);
      blink.pause(0);
      gsap.set(sprite, { x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1 });
      gsap.set(eyes, { scaleY: 1 });
      gsap.set(badges, { opacity: 0 });
      gsap.set(snooze, { autoAlpha: 0, y: 0 });
      element.dataset.action = "idle";
      resetEyes();
    };
    const schedule = () => {
      if (automatic || !available() || motion.matches || disposed) return;
      automatic = gsap.delayedCall(2.2, () => {
        automatic = undefined;
        if (!available() || motion.matches || disposed) return;
        const actions = ["toss", "glance", "wiggle", "sleep", "spin", "toss"];
        const action = actions[actionIndex++ % actions.length];
        if (action === "toss") play.current();
        else perform(action);
      });
    };
    const finish = () => {
      element.dataset.action = "idle";
      if (!available() || motion.matches || disposed) return;
      idle.restart();
      blink.restart();
      schedule();
    };
    const perform = (action) => {
      reset();
      element.dataset.action = action;
      gesture = gsap.timeline({ onComplete: finish });
      if (action === "glance") {
        gesture
          .to(element, { "--look-x": "1px", duration: 0.25 })
          .to(sprite, { rotation: 5, duration: 0.3 }, 0)
          .to(element, { "--look-x": "-1px", duration: 0.3 }, 0.75)
          .to(sprite, { rotation: -5, duration: 0.3 }, 0.75)
          .to(element, { "--look-x": "0px", duration: 0.25 }, 1.4)
          .to(sprite, { rotation: 0, duration: 0.3 }, 1.4);
      } else if (action === "wiggle") {
        gesture
          .to(sprite, { rotation: -9, y: -4, duration: 0.16 })
          .to(sprite, {
            rotation: 9,
            y: -7,
            duration: 0.22,
            repeat: 3,
            yoyo: true,
          })
          .to(sprite, { rotation: 0, y: 0, duration: 0.3 });
      } else if (action === "sleep") {
        gesture
          .to(eyes, { scaleY: 0.15, duration: 0.5 })
          .to(sprite, { rotation: -7, y: 3, duration: 0.5 }, 0)
          .fromTo(
            snooze,
            { y: 0, autoAlpha: 0 },
            { y: -12, autoAlpha: 1, duration: 0.8 },
            0.3,
          )
          .to(snooze, { y: -24, autoAlpha: 0, duration: 0.5 }, 1.4)
          .to(eyes, { scaleY: 1, duration: 0.12 }, 1.9)
          .to(sprite, { rotation: 0, y: -15, duration: 0.2 }, 1.9)
          .to(sprite, { y: 0, duration: 0.4, ease: "bounce.out" });
      } else if (action === "spin") {
        gesture
          .to(sprite, { scaleX: 1.12, scaleY: 0.85, y: 4, duration: 0.18 })
          .to(sprite, {
            scaleX: 1,
            scaleY: 1,
            y: -28,
            rotation: 180,
            duration: 0.35,
            ease: "power2.out",
          })
          .to(sprite, {
            y: 0,
            rotation: 360,
            duration: 0.35,
            ease: "power2.in",
          })
          .set(sprite, { rotation: 0 })
          .to(sprite, { scaleX: 1.1, scaleY: 0.9, duration: 0.12 })
          .to(sprite, { scaleX: 1, scaleY: 1, duration: 0.25 });
      }
      if (action !== "sleep") blink.resume();
    };
    const update = () => {
      if (!available() || motion.matches) {
        reset();
        return;
      }
      if (!burst?.isActive() && !gesture?.isActive()) {
        idle.resume();
        blink.resume();
        schedule();
      }
    };
    const follow = (event) => {
      if (
        !available() ||
        motion.matches ||
        gesture?.isActive() ||
        coarse.matches ||
        event.pointerType === "touch"
      )
        return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (disposed || !available()) return;
        const bounds = element.getBoundingClientRect();
        const dx = event.clientX - (bounds.left + bounds.width / 2);
        const dy = event.clientY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(dx, dy);
        const strength = Math.min(distance / 180, 1);
        element.style.setProperty(
          "--look-x",
          `${distance ? Math.round((dx / distance) * strength) : 0}px`,
        );
        element.style.setProperty(
          "--look-y",
          `${distance ? Math.round((dy / distance) * strength) : 0}px`,
        );
      });
    };
    const leave = (event) => {
      if (!event.relatedTarget) resetEyes();
    };
    play.current = () => {
      if (!active || document.hidden) return;
      reset();
      element.dataset.action = "toss";
      const bounds = element.getBoundingClientRect();
      const width = window.innerWidth;
      const height = window.innerHeight;
      const size = badges[0]?.offsetWidth || 40;
      const clampX = (x) => Math.max(12, Math.min(width - size - 12, x));
      const clampY = (y) => Math.max(12, Math.min(height - size - 12, y));
      const originX = clampX(bounds.left + bounds.width / 2 - size / 2);
      const originY = clampY(bounds.top + bounds.height * 0.2);
      const right = originX > width * 0.65;
      const left = originX < width * 0.35;
      const spread = right
        ? [-164, -106, -48]
        : left
          ? [48, 106, 164]
          : [-104, 0, 104];
      burst = gsap.timeline({ onComplete: finish });
      if (motion.matches) {
        const start = Math.max(12, Math.min(width - 3 * 44 - 12, originX - 48));
        badges.forEach((badge, index) => {
          gsap.set(badge, {
            x: start + index * 44,
            y: clampY(originY - 52),
            scale: 1,
            rotation: 0,
          });
        });
        burst
          .to(badges, { opacity: 1, duration: 0.1 }, 0)
          .to(badges, { opacity: 0, duration: 0.15 }, 1.1);
        return;
      }
      burst
        .to(
          sprite,
          {
            scaleX: 1.16,
            scaleY: 0.8,
            y: 5,
            rotation: -5,
            duration: 0.14,
            ease: "power2.in",
          },
          0,
        )
        .to(sprite, {
          scaleX: 0.93,
          scaleY: 1.1,
          y: -19,
          rotation: 6,
          duration: 0.25,
          ease: "power2.out",
        })
        .to(sprite, {
          scaleX: 1.07,
          scaleY: 0.93,
          y: 2,
          rotation: -3,
          duration: 0.25,
          ease: "power2.in",
        })
        .to(sprite, {
          scaleX: 1,
          scaleY: 1,
          y: 0,
          rotation: 0,
          duration: 0.36,
          ease: "back.out(1.7)",
        });
      badges.forEach((badge, index) => {
        const start = 0.17 + index * 0.055;
        const peak = clampY(originY - 108 - index * 18);
        const landing = clampY(originY + (originY < height * 0.4 ? 128 : 20));
        gsap.set(badge, {
          x: originX,
          y: originY,
          rotation: 0,
          scale: 0.35,
          opacity: 0,
        });
        burst
          .to(
            badge,
            { opacity: 1, scale: 1, duration: 0.16, ease: "power2.out" },
            start,
          )
          .to(
            badge,
            {
              x: clampX(originX + spread[index]),
              duration: 1.12,
              ease: "none",
            },
            start,
          )
          .to(badge, { y: peak, duration: 0.45, ease: "power2.out" }, start)
          .to(
            badge,
            { y: landing, duration: 0.67, ease: "power2.in" },
            start + 0.45,
          )
          .to(
            badge,
            {
              rotation: (right ? -1 : 1) * (175 + index * 45),
              duration: 1.12,
              ease: "none",
            },
            start,
          )
          .to(
            badge,
            { opacity: 0, scale: 0.7, duration: 0.22, ease: "power1.in" },
            start + 0.9,
          );
      });
      blink.resume();
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    window.addEventListener("pointermove", follow, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("scroll", resetEyes, { passive: true });
    window.addEventListener("blur", reset);
    window.addEventListener("focus", update);
    document.addEventListener("visibilitychange", update);
    motion.addEventListener("change", update);
    coarse.addEventListener("change", resetEyes);
    update();
    return () => {
      disposed = true;
      play.current = () => {};
      reset();
      idle.kill();
      blink.kill();
      gsap.killTweensOf([element, sprite, eyes, snooze, ...badges]);
      gsap.set([sprite, eyes, snooze, ...badges], {
        clearProps: "transform,opacity,transformOrigin",
      });
      observer.disconnect();
      window.removeEventListener("pointermove", follow);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("scroll", resetEyes);
      window.removeEventListener("blur", reset);
      window.removeEventListener("focus", update);
      document.removeEventListener("visibilitychange", update);
      motion.removeEventListener("change", update);
      coarse.removeEventListener("change", resetEyes);
    };
  }, [active]);

  return (
    <>
      <button
        ref={mascot}
        type="button"
        className={`mascot ${small ? "size-14" : "size-24 sm:size-28"}`}
        aria-label="Make Kip toss logos"
        title="Kip plays automatically. Click to toss logos."
        disabled={!active}
        onClick={() => play.current()}
      >
        <span ref={body} className="mascot-body">
          <MascotFace />
        </span>
        <span className="mascot-snooze" aria-hidden="true">
          z Z
        </span>
      </button>
      {createPortal(
        <div className="mascot-logo-layer" aria-hidden="true">
          {logos.map((logo, index) => (
            <img
              key={logo}
              ref={(node) => {
                particles.current[index] = node;
              }}
              className="mascot-logo-particle"
              src={`/logos/${logo}.svg`}
              alt=""
              draggable="false"
              width="40"
              height="40"
            />
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
