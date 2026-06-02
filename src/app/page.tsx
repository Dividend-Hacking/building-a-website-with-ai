"use client";

import React, { useEffect, useState } from "react";
import ParticleBackground from "@/components/ParticleBackground";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Format date dynamic details (or use static presentation details as in standard slide templates)
  const quarterMonth = "Q2 • June";
  const dateStr = "Q2 / June 2026";
  const yearStr = "2026";

  if (!mounted) {
    return (
      <main style={{ background: "#000000", minHeight: "100vh" }} />
    );
  }

  return (
    <main className="slide-container">
      {/* Dynamic Cosmic Particle Background */}
      <ParticleBackground />

      {/* Intro Presentation Slide */}
      <section className="slide">
        {/* Title Block */}
        <h1 className="title-large animate-fade-in">
          Building a Website
          <br />
          With AI
        </h1>

        {/* Details & Info Block */}
        <div className="bottom-section">
          <div className="details-block">
            {/* Scroll Indicator */}
            <button 
              className="arrow-icon-container animate-fade-in delay-1"
              aria-label="Next slide"
              onClick={() => {
                // Smooth scroll logic can go here for future slides
                console.log("Scroll to next slide");
              }}
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Presentation Info */}
            <div className="date-label animate-fade-in delay-2">
              {dateStr}
            </div>
            
            <div className="presented-by animate-fade-in delay-2">
              Presented by
            </div>

            {/* Presenter Pill Buttons */}
            <div className="pill-container animate-fade-in delay-3">
              <button className="pill">Jordan Scott</button>
              <button className="pill">Antigravity AI</button>
            </div>
          </div>

          {/* Slide Footer */}
          <div className="animate-fade-in delay-3" style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <div className="footer-item">
                <span className="bullet-dot" />
                Antigravity Corp
              </div>
              <div className="footer-item">
                <span className="square-dot" />
                {quarterMonth}
              </div>
              <div>{yearStr}</div>
            </footer>
          </div>
        </div>
      </section>
    </main>
  );
}
