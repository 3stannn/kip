import React from "react";

// Keep real anchor URLs, native modified clicks, and keyboard activation.
export function ScrollLink({ href, children, onClick, ...props }) {
  async function navigate(event) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const target = href.slice(1);
    if (target && !document.getElementById(target)) return;
    event.preventDefault();
    try {
      const module = await import("react-scroll");
      const { scroller, animateScroll } = module.default || module;
      const options = { duration: 500, smooth: "easeInOutCubic" };
      if (target) scroller.scrollTo(target, { ...options, offset: -96 });
      else animateScroll.scrollToTop(options);
      if (window.location.hash !== href)
        window.history.pushState(null, "", href);
    } catch {
      window.location.hash = href;
    }
  }

  return (
    <a {...props} href={href} onClick={navigate}>
      {children}
    </a>
  );
}
