import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Lenis retains native document scrolling; no transformed page wrapper is needed.
export function useSmoothScroll() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let destroy = () => {};
    const setup = () => {
      destroy();
      destroy = () => {};
      if (media.matches) return;
      const lenis = new Lenis({
        duration: 0.85,
        smoothWheel: true,
        syncTouch: false,
        allowNestedScroll: true,
        anchors: false,
      });
      let attached = false;
      let disposed = false;
      const tick = (seconds) => lenis.raf(seconds * 1000);
      const refresh = () => {
        if (disposed) return;
        lenis.resize();
        ScrollTrigger.refresh();
      };
      const visibility = () => {
        const active = !document.hidden;
        if (active && !attached) {
          gsap.ticker.add(tick);
          attached = true;
        } else if (!active && attached) {
          gsap.ticker.remove(tick);
          attached = false;
          lenis.scrollTo(window.scrollY, { immediate: true });
        }
      };
      const settle = () => lenis.scrollTo(window.scrollY, { immediate: true });
      const navigate = (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        const link = event.target.closest?.("a[href]");
        if (
          !link ||
          link.hasAttribute("download") ||
          (link.target && link.target !== "_self")
        )
          return;
        const url = new URL(link.href, window.location.href);
        if (
          url.origin !== location.origin ||
          url.pathname !== location.pathname ||
          url.search !== location.search ||
          !link.getAttribute("href").includes("#")
        )
          return;
        let target;
        try {
          target = url.hash
            ? document.getElementById(decodeURIComponent(url.hash.slice(1)))
            : null;
        } catch {
          return;
        }
        if (url.hash && !target) return;
        event.preventDefault();
        if (location.hash !== url.hash)
          history.pushState(null, "", url.hash || "#");
        if (target) {
          const temporaryTabIndex = !target.hasAttribute("tabindex");
          if (temporaryTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (temporaryTabIndex) target.removeAttribute("tabindex");
        }
        // Lenis includes the page's CSS scroll padding and target scroll margin.
        lenis.scrollTo(target || 0);
      };
      lenis.on("scroll", ScrollTrigger.update);
      document.addEventListener("click", navigate);
      document.addEventListener("visibilitychange", visibility);
      window.addEventListener("blur", settle);
      window.addEventListener("focus", visibility);
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      visibility();
      destroy = () => {
        disposed = true;
        gsap.ticker.remove(tick);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        document.removeEventListener("click", navigate);
        document.removeEventListener("visibilitychange", visibility);
        window.removeEventListener("blur", settle);
        window.removeEventListener("focus", visibility);
        window.removeEventListener("load", refresh);
      };
    };
    setup();
    media.addEventListener("change", setup);
    return () => {
      media.removeEventListener("change", setup);
      destroy();
    };
  }, []);
}
