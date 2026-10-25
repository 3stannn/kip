import React from "react";
import logo from "../assets/kip-logo.svg";

export function Mark({ small = false }) {
  return (
    <img
      src={logo}
      alt=""
      aria-hidden="true"
      width="80"
      height="80"
      className={`shrink-0 ${small ? "size-8" : "size-[72px]"}`}
    />
  );
}
