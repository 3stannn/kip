import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RISE = { duration: 1.05, ease: "expo.out" };
const FADE = { duration: 0.8, ease: "power3.out" };
// Travel past the mask's lower edge, which sits just below the descenders.
const BELOW_MASK = 120;
const HEADLINE_FONTS = ['700 1em "Geist"', 'italic 400 1em "Instrument Serif"'];

// Wrap each word of a plain-text heading in a clip mask so it can rise into
// place. Returns null, leaving the heading untouched, when it holds anything
// other than text and line breaks or when wrapping would move its layout.
function splitWords(heading) {
  const original = [...heading.childNodes];
  const plain = original.every(
    (node) => node.nodeType === Node.TEXT_NODE || node.nodeName === "BR",
  );
  if (!original.length || !plain) return null;
  const before = heading.getBoundingClientRect();
  const words = [];
  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = original
    .map((node) => (node.nodeName === "BR" ? " " : node.textContent))
    .join("");
  const pieces = original.flatMap((node) => {
    if (node.nodeName === "BR") return [node.cloneNode()];
    return node.textContent
      .split(/(\s+)/)
      .filter(Boolean)
      .map((text) => {
        if (!text.trim()) return document.createTextNode(text);
        const mask = document.createElement("span");
        mask.className = "motion-mask";
        mask.setAttribute("aria-hidden", "true");
        const word = document.createElement("span");
        word.className = "motion-word";
        word.textContent = text;
        mask.append(word);
        words.push(word);
        return mask;
      });
  });
  heading.replaceChildren(label, ...pieces);
  const restore = () => heading.replaceChildren(...original);
  const after = heading.getBoundingClientRect();
  if (
    Math.abs(after.width - before.width) > 0.5 ||
    Math.abs(after.height - before.height) > 0.5
  ) {
    restore();
    return null;
  }
  return { words, restore };
}

export function usePageMotion(page) {
  // Layout effect: starting poses are in place before the first paint.
  useLayoutEffect(() => {
    const root = page.current;
    if (!root) return undefined;
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const entrances = [];
        const cleanups = [];
        const timers = new Set();
        let disposed = false;

        // Entrances normally run on GSAP's ticker. The timer finishes one
        // that the ticker never advanced, so no text is left in a hidden pose.
        const play = (timeline, delay = 0) => {
          const seconds = delay + timeline.duration() + 0.5;
          const timer = setTimeout(() => {
            timers.delete(timer);
            timeline.progress(1);
          }, seconds * 1000);
          timers.add(timer);
          if (delay) gsap.delayedCall(delay, () => timeline.play());
          else timeline.play();
        };

        // Hero: headline words rise out of their line, then the supporting
        // copy and the terminal follow.
        const title = root.querySelector(".hero-title");
        const demo = root.querySelector(".hero-demo");
        if (title) {
          const lines = [...title.children];
          const titleWords = [...title.querySelectorAll("[data-word]")];
          const rising = titleWords.length ? titleWords : lines;
          const intro = gsap.timeline({
            paused: true,
            onComplete: () =>
              gsap.set([...lines, ...rising], {
                clearProps: "clipPath,transform",
              }),
          });
          entrances.push(intro);
          if (titleWords.length)
            gsap.set(lines, { clipPath: "inset(-0.2em -0.6em -0.14em)" });
          intro.fromTo(
            rising,
            { yPercent: titleWords.length ? BELOW_MASK + 5 : 30 },
            { yPercent: 0, ...RISE, duration: 1.15, stagger: 0.09 },
            0,
          );
          const introParts = [...root.querySelectorAll("[data-intro]")].filter(
            (part) => part !== title,
          );
          if (introParts.length)
            intro.fromTo(
              introParts,
              { y: 18, opacity: 0 },
              { y: 0, opacity: 1, ...FADE, stagger: 0.1 },
              0.45,
            );
          if (demo)
            intro.fromTo(
              demo,
              { y: 56, opacity: 0, scale: 0.96, rotationX: 6 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                rotationX: 0,
                duration: 1.3,
                ease: "power3.out",
              },
              0.4,
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
              0.9,
            );
          // Start once the headline fonts are in, so the words do not reflow
          // mid-rise. A short cap keeps a slow font from holding the page.
          let started = false;
          const start = () => {
            if (started || disposed) return;
            started = true;
            play(intro);
          };
          const fontCap = setTimeout(start, 600);
          timers.add(fontCap);
          const fonts = document.fonts;
          if (fonts?.load)
            Promise.all(HEADLINE_FONTS.map((font) => fonts.load(font))).then(
              start,
              start,
            );
          else start();
        }

        // Sections: each reveal block cascades in document order when it
        // scrolls into view. Blocks that enter together are staggered.
        const pending = new Map();
        if ("IntersectionObserver" in window) {
          root.querySelectorAll("[data-reveal]").forEach((element) => {
            if (element === demo || demo?.contains(element)) return;
            const heading = element.matches("h1, h2")
              ? element
              : element.querySelector("h1, h2");
            const split = heading ? splitWords(heading) : null;
            const blocks =
              heading && heading !== element ? [...element.children] : [];
            const faded = blocks.length
              ? blocks.filter((block) => !split || !block.contains(heading))
              : split
                ? []
                : [element];
            const kickers = faded.filter((block) =>
              block.matches(".section-kicker"),
            );
            const settle = () => {
              split?.restore();
              gsap.set(faded, { clearProps: "opacity,transform,transition" });
              gsap.set(kickers, { clearProps: "--kicker-rule" });
            };
            cleanups.push(() => split?.restore());
            const timeline = gsap.timeline({
              paused: true,
              onComplete: settle,
            });
            entrances.push(timeline);
            if (split) gsap.set(split.words, { yPercent: BELOW_MASK });
            // Hover transitions on links and buttons would fight the tween.
            gsap.set(faded, { opacity: 0, y: 20, transition: "none" });
            gsap.set(kickers, { "--kicker-rule": 0 });
            let at = 0;
            (blocks.length ? blocks : [element]).forEach((block) => {
              if (split && block.contains(heading)) {
                timeline.to(
                  split.words,
                  { yPercent: 0, ...RISE, stagger: 0.06 },
                  at,
                );
                at += 0.2;
                return;
              }
              timeline.to(block, { opacity: 1, y: 0, ...FADE }, at);
              if (kickers.includes(block))
                timeline.to(block, { "--kicker-rule": 1, ...FADE }, at);
              at += 0.09;
            });
            pending.set(element, timeline);
          });
        }
        const observer = pending.size
          ? new IntersectionObserver(
              (entries) => {
                let order = 0;
                entries.forEach((entry) => {
                  const timeline = pending.get(entry.target);
                  if (!timeline) return;
                  // Already scrolled past, as on a reload or deep link.
                  const passed =
                    !entry.isIntersecting &&
                    entry.boundingClientRect.bottom < 0;
                  if (!entry.isIntersecting && !passed) return;
                  pending.delete(entry.target);
                  observer.unobserve(entry.target);
                  if (passed) timeline.progress(1);
                  else play(timeline, Math.min(order++ * 0.08, 0.4));
                });
              },
              { rootMargin: "0px 0px -12% 0px" },
            )
          : null;
        pending.forEach((_, element) => observer.observe(element));

        const frame = root.querySelector(".hero-terminal-frame");
        if (frame && demo)
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
          // A hidden tab never returns to half-finished text or controls.
          entrances.forEach((timeline) => timeline.progress(1));
          pending.clear();
          observer?.disconnect();
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
        const refresh = () => {
          if (!disposed) ScrollTrigger.refresh();
        };
        document.fonts?.ready.then(refresh);
        window.addEventListener("load", refresh);
        return () => {
          disposed = true;
          timers.forEach((timer) => clearTimeout(timer));
          observer?.disconnect();
          carouselObserver?.disconnect();
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("blur", settle);
          window.removeEventListener("focus", updateCarousel);
          window.removeEventListener("load", refresh);
          carousel?.removeEventListener("pointerenter", onEnter);
          carousel?.removeEventListener("pointerleave", onLeave);
          carousel?.removeEventListener("focusin", updateCarousel);
          carousel?.removeEventListener("focusout", onFocusOut);
          cleanups.forEach((cleanup) => cleanup());
        };
      },
      root,
    );
    return () => media.revert();
  }, [page]);
}
