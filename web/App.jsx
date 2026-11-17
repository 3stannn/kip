import React, { useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { FloatingMascot } from "./components/FloatingMascot.jsx";
import GradientASCII from "./components/GradientASCII.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { DocsPage } from "./pages/DocsPage.jsx";
import { useSmoothScroll } from "./hooks/useSmoothScroll.js";

const HERO_COLORS = ["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"];

export default function App() {
  useSmoothScroll();
  const isDocs = /^\/docs\/?$/.test(window.location.pathname);

  useEffect(() => {
    document.title = isDocs
      ? "Kip Docs — Install, prompt, and update"
      : "Kip — Focused work in your coding chat";
    // Resolve deep links after React has mounted the page's sections.
    if (window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView();
    }
  }, [isDocs]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className={isDocs ? undefined : "home-layout"}>
        {!isDocs && (
          <div className="home-backdrop" aria-hidden="true">
            <GradientASCII className="home-ascii" colors={HERO_COLORS} />
          </div>
        )}
        <Header isDocs={isDocs} />
        <main id="main-content" tabIndex={-1}>
          {isDocs ? <DocsPage /> : <HomePage />}
        </main>
      </div>
      <Footer isDocs={isDocs} />
      <FloatingMascot hasHeroMascot={!isDocs} />
    </>
  );
}
