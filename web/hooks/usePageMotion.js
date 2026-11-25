import { useLayoutEffect } from "react";
import { gsap } from "gsap";

// Mascot entrance and skills carousel. Page text stays still; the terminal
// runs its own typing animation.
export function usePageMotion(page) {
  // Layout effect: starting poses are in place before the first paint.
  useLayoutEffect(() => {
    const root = page.current;
    if (!root) return undefined;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const mascot = root.querySelector("[data-hero-mascot]");
        const entrance =
          mascot &&
          gsap.fromTo(
            mascot,
            { y: 18, scale: 0.78, rotation: -8 },
            {
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.85,
              delay: 0.15,
              ease: "back.out(1.4)",
            },
          );

        const carousel = root.querySelector(".skills-carousel");
        let carouselTween;
        let carouselObserver;
        let inView = false;
        let hovered = false;
        const updateCarousel = () => {
          const active =
            inView &&
            !hovered &&
            !carousel?.contains(document.activeElement) &&
            !document.hidden &&
            document.hasFocus();
          if (active) carouselTween?.resume();
          else carouselTween?.pause();
        };
        const onEnter = () => {
          hovered = true;
          updateCarousel();
        };
        const onLeave = () => {
          hovered = false;
          updateCarousel();
        };
        const onFocusOut = () => queueMicrotask(updateCarousel);
        if (carousel) {
          const track = carousel.querySelector(".skills-carousel-track");
          if (track)
            carouselTween = gsap.fromTo(
              track,
              { xPercent: -50 },
              {
                xPercent: 0,
                duration: 36,
                ease: "none",
                repeat: -1,
                paused: true,
              },
            );
          carouselObserver = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            updateCarousel();
          });
          carouselObserver.observe(carousel);
          carousel.addEventListener("pointerenter", onEnter);
          carousel.addEventListener("pointerleave", onLeave);
          carousel.addEventListener("focusin", updateCarousel);
          carousel.addEventListener("focusout", onFocusOut);
        }
        const settle = () => {
          // A hidden tab never returns to a half-finished entrance.
          entrance?.progress(1);
          updateCarousel();
        };
        const onVisibility = () => {
          if (document.hidden) settle();
          else updateCarousel();
        };
        document.addEventListener("visibilitychange", onVisibility);
        window.addEventListener("blur", settle);
        window.addEventListener("focus", updateCarousel);
        if (document.hidden || !document.hasFocus()) settle();
        return () => {
          carouselObserver?.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("blur", settle);
          window.removeEventListener("focus", updateCarousel);
          carousel?.removeEventListener("pointerenter", onEnter);
          carousel?.removeEventListener("pointerleave", onLeave);
          carousel?.removeEventListener("focusin", updateCarousel);
          carousel?.removeEventListener("focusout", onFocusOut);
        };
      },
      root,
    );
    return () => media.revert();
  }, [page]);
}
