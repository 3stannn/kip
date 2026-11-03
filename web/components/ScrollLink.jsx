import React from "react";

// A shared Lenis layer enhances anchors; native navigation remains the fallback.
export function ScrollLink({ href, children, ...props }) {
  return (
    <a {...props} href={href}>
      {children}
    </a>
  );
}
