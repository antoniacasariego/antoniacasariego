// src/pages/HomePage.tsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Work from "../components/Work";
import Navbar from "../components/Navbar";

type LocationState = { scrollTo?: "work" };

export default function HomePage() {
  const topRef = useRef<HTMLDivElement>(null);
  const workAnchorRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const scrollToWork = () => {
    workAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // If we arrived here from another page with state asking to scroll:
  useEffect(() => {
    const state = location.state as LocationState | null;
    if (state?.scrollTo === "work") {
      requestAnimationFrame(scrollToWork);
    }
  }, [location.key]);

  // If user lands directly on /#work or refreshes on /#work:
  useEffect(() => {
    if (location.hash === "#work") {
      requestAnimationFrame(scrollToWork);
    }
  }, [location.hash]);

  return (
    <div>
      <Navbar onHomeClick={scrollToTop} onWorkClick={scrollToWork} />

      <div className="page">
        {/* TOP anchor so "Home" can scroll using scrollIntoView (reliable) */}
        <div ref={topRef} id="top" style={{ height: 1 }} />

        {/* Hero triggers scroll when stars collected */}
        <Hero onFinish={scrollToWork} />

        {/* WORK anchor */}
        <div ref={workAnchorRef} id="work" style={{ height: 1 }} />

        <Work />

        <footer className="footer">
          Antonia Casariego Oronoz — work in progress!
        </footer>
      </div>
    </div>
  );
}
