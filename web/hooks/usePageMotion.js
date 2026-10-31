import { useEffect } from "react";

// Enhance the visible page; content never depends on an animation to appear.
export function usePageMotion(page) {
  useEffect(() => {
    const root = page.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!root || !Element.prototype.animate) return undefined;

    const animations = new Set();
    let observer;
    const settle = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const enter = (element, delay = 0) => {
      if (motion.matches || document.hidden) return;
      const animation = element.animate(
        [
          { opacity: 0.45, transform: "translateY(14px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 620,
          delay,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };

    root.querySelectorAll("[data-intro]").forEach((element, index) => {
      const bounds = element.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        enter(element, index * 65);
      }
    });

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            enter(entry.target, Number(entry.target.dataset.reveal || 0));
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );
      root.querySelectorAll("[data-reveal]").forEach((element) => {
        observer.observe(element);
      });
    }

    const onPreference = () => {
      if (motion.matches) settle();
    };
    const onVisibility = () => {
      if (document.hidden) settle();
    };
    motion.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      settle();
      motion.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [page]);
}
