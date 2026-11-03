import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Split only plain text. Original DOM and accessible names are restored on cleanup.
function splitWords(element, restore) {
  if (!element || element.children.length) return [element].filter(Boolean);
  const nodes = [...element.childNodes];
  const accessibleText = document.createElement("span");
  accessibleText.className = "sr-only";
  accessibleText.textContent = element.textContent;
  const words = element.textContent.split(/(\s+)/).map((text) => {
    if (!text.trim()) return document.createTextNode(text);
    const word = document.createElement("span");
    word.className = "motion-word";
    word.style.display = "inline-block";
    word.setAttribute("aria-hidden", "true");
    word.textContent = text;
    return word;
  });
  element.replaceChildren(accessibleText, ...words);
  restore.push(() => {
    element.replaceChildren(...nodes);
  });
  return words.filter((word) => word.nodeType === Node.ELEMENT_NODE);
}

export function usePageMotion(page) {
  useEffect(() => {
    const root = page.current;
    if (!root) return undefined;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const restore = [];
        const entrances = [];
        const compact = window.innerWidth < 768;
        const intro = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1.15 },
        });
        entrances.push(intro);
        const title = root.querySelector(".hero-title");
        const words = title
          ? [...title.children].flatMap((line) => splitWords(line, restore))
          : [];
        if (words.length)
          intro.fromTo(
            words,
            { y: compact ? 40 : 65, opacity: 0.45, rotation: compact ? 2 : 4 },
            { y: 0, opacity: 1, rotation: 0, stagger: 0.1 },
            0,
          );
        const introParts = [...root.querySelectorAll("[data-intro]")].filter(
          (part) => part !== title,
        );
        intro.fromTo(
          introParts,
          { y: compact ? 40 : 65, opacity: 0.6 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.9 },
          0.3,
        );
        const demo = root.querySelector(".hero-demo");
        if (demo)
          intro.fromTo(
            demo,
            { y: 75, opacity: 0.6, scale: 0.94, rotationX: 8 },
            { y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.25 },
            0.35,
          );
        const mascot = root.querySelector("[data-hero-mascot]");
        if (mascot)
          intro.fromTo(
            mascot,
            { y: 18, scale: 0.78, rotation: -8 },
            {
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.85,
              ease: "back.out(1.4)",
            },
            0.65,
          );

        root.querySelectorAll("[data-reveal]").forEach((element) => {
          if (element === demo || demo?.contains(element)) return;
          const heading = element.matches("h2")
            ? element
            : element.querySelector("h2");
          const headingWords = splitWords(heading, restore);
          const parts = [...element.children].filter(
            (child) => child !== heading,
          );
          const supportingParts = parts.length ? parts : element;
          const delay = Math.max(0, Number(element.dataset.reveal) || 0) / 1000;
          // Establish readable starting poses before the trigger is reached,
          // instead of jumping backwards when an untouched section enters.
          if (headingWords.length)
            gsap.set(headingWords, { y: 44, opacity: 0.5 });
          gsap.set(supportingParts, { y: 48, opacity: 0.55 });
          const timeline = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.95 },
            scrollTrigger: { trigger: element, start: "top 85%", once: true },
          });
          entrances.push(timeline);
          if (headingWords.length)
            timeline.to(
              headingWords,
              { y: 0, opacity: 1, stagger: 0.055 },
              delay,
            );
          timeline.to(
            supportingParts,
            { y: 0, opacity: 1, stagger: 0.1 },
            delay + (headingWords.length ? 0.22 : 0),
          );
        });
        const frame = root.querySelector(".hero-terminal-frame");
        if (frame)
          gsap.fromTo(
            frame,
            { y: 0, scale: 1, rotationX: 0 },
            {
              y: () => (window.innerWidth >= 768 ? -65 : -32),
              scale: 0.975,
              rotationX: 2,
              ease: "none",
              scrollTrigger: {
                trigger: demo,
                start: "top 25%",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        const closing = root.querySelector(".closing-section");
        if (closing)
          gsap.fromTo(
            closing,
            { scale: 0.96 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: closing,
                start: "top bottom",
                end: "top 45%",
                scrub: 0.7,
              },
            },
          );

        const carousel = root.querySelector(".skills-carousel");
        let carouselTween;
        let observer;
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
          observer = new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting;
            updateCarousel();
          });
          observer.observe(carousel);
          carousel.addEventListener("pointerenter", onEnter);
          carousel.addEventListener("pointerleave", onLeave);
          carousel.addEventListener("focusin", updateCarousel);
          carousel.addEventListener("focusout", onFocusOut);
        }
        const settle = () => {
          // A hidden tab never returns to half-finished text or controls.
          entrances.forEach((timeline) => timeline.progress(1));
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
        let disposed = false;
        const refresh = () => {
          if (!disposed) ScrollTrigger.refresh();
        };
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        return () => {
          disposed = true;
          observer?.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("blur", settle);
          window.removeEventListener("focus", updateCarousel);
          window.removeEventListener("load", refresh);
          carousel?.removeEventListener("pointerenter", onEnter);
          carousel?.removeEventListener("pointerleave", onLeave);
          carousel?.removeEventListener("focusin", updateCarousel);
          carousel?.removeEventListener("focusout", onFocusOut);
          restore.forEach((reset) => reset());
        };
      },
      root,
    );
    return () => media.revert();
  }, [page]);
}
