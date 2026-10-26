import React, { useEffect } from "react";
import { Header } from "./components/Header.jsx";
import { Footer } from "./components/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { DocsPage } from "./pages/DocsPage.jsx";

export default function App() {
  const isDocs = /^\/docs\/?$/.test(window.location.pathname);

  useEffect(() => {
    document.title = isDocs
      ? "Kip Docs — Get started and find your flow"
      : "Kip — Your coding buddy";
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
      <Header isDocs={isDocs} />
      <main id="main-content" tabIndex={-1}>
        {isDocs ? <DocsPage /> : <HomePage />}
      </main>
      <Footer isDocs={isDocs} />
    </>
  );
}
