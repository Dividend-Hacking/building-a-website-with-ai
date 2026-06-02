"use client";

import React, { useEffect, useState, useRef } from "react";
import ParticleBackground from "@/components/ParticleBackground";

// Slide configuration for navigation
const SLIDES = [
  { id: "intro", label: "01. Introduction" },
  { id: "prerequisites", label: "02. Prerequisites" },
  { id: "initiation", label: "03. Initiation" },
  { id: "building", label: "04. Building with AI" },
  { id: "tips", label: "05. AI Best Practices" },
  { id: "deployment", label: "06. Vercel Deployment" },
  { id: "maintenance", label: "07. Site Maintenance" },
  { id: "conclusion", label: "08. Wrap-Up" }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [activeSlide, setActiveSlide] = useState("intro");
  const [activeOS, setActiveOS] = useState<"mac" | "windows">("mac");
  const [openError, setOpenError] = useState<number | null>(null);
  const [copyText, setCopyText] = useState<Record<string, string>>({});

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer to track scroll position and update dot navigation automatically
  useEffect(() => {
    if (!mounted) return;

    const observerOptions = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.5 // Trigger when slide is 50% visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSlide(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    SLIDES.forEach((slide) => {
      const el = document.getElementById(slide.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  const scrollToSlide = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSlide(id);
    }
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopyText((prev) => ({ ...prev, [key]: "Copied!" }));
    setTimeout(() => {
      setCopyText((prev) => ({ ...prev, [key]: "Copy" }));
    }, 2000);
  };

  const toggleAccordion = (index: number) => {
    setOpenError(openError === index ? null : index);
  };

  if (!mounted) {
    return <main style={{ background: "#000000", minHeight: "100vh" }} />;
  }

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Floating Canvas Particle Field (drifts in background across all slides) */}
      <ParticleBackground mode={activeSlide} />

      {/* Floating Vertical Navigation Dot Bar */}
      <nav className="dot-nav" aria-label="Slide Navigation">
        {SLIDES.map((slide) => (
          <div className="dot-item" key={slide.id}>
            <button
              className={`dot-link ${activeSlide === slide.id ? "active" : ""}`}
              onClick={() => scrollToSlide(slide.id)}
              aria-label={`Go to slide: ${slide.label}`}
            />
            <span className="dot-label">{slide.label}</span>
          </div>
        ))}
      </nav>

      {/* Main Snap Scrolling Slide Container */}
      <div className="slide-container" ref={containerRef}>
        
        {/* SLIDE 1: INTRODUCTION */}
        <section id="intro" className="slide">
          <h1 className="title-large animate-fade-in">
            Building a Website
            <br />
            With AI
          </h1>

          <div className="bottom-section">
            <div className="details-block">
              <button
                className="arrow-icon-container animate-fade-in delay-1"
                onClick={() => scrollToSlide("prerequisites")}
                aria-label="Scroll to Prerequisites"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="date-label animate-fade-in delay-2">
                Q2 / June 2026
              </div>
              <div className="presented-by animate-fade-in delay-2">
                Presented by
              </div>

              <div className="pill-container animate-fade-in delay-3">
                <button className="pill">Jordan Scott</button>
                <button className="pill">Antigravity AI</button>
              </div>
            </div>

            <div className="animate-fade-in delay-3" style={{ width: "100%" }}>
              <hr className="footer-line" />
              <footer className="footer-container">
                <div className="footer-item">
                  <span className="bullet-dot" />
                  Antigravity Corp
                </div>
                <div className="footer-item">
                  <span className="square-dot" />
                  Q2 • June
                </div>
                <div>2026</div>
              </footer>
            </div>
          </div>
        </section>

        {/* SLIDE 2: PREREQUISITES */}
        <section id="prerequisites" className="slide">
          <div>
            <h2 className="title-medium">Prerequisites</h2>
            <p className="subtitle-medium">
              Ensure your system has the proper foundation set up before building. Choose your operating system to view custom installation CLI commands.
            </p>
            
            {/* OS Selector Tabs */}
            <div className="os-tabs-container">
              <button
                className={`os-tab-btn ${activeOS === "mac" ? "active" : ""}`}
                onClick={() => setActiveOS("mac")}
              >
                macOS Instructions
              </button>
              <button
                className={`os-tab-btn ${activeOS === "windows" ? "active" : ""}`}
                onClick={() => setActiveOS("windows")}
              >
                Windows Instructions
              </button>
            </div>

            {/* Grid of Prerequisites */}
            <div className="content-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
              
              {/* ANTIGRAVITY CARD */}
              <div className="glass-card">
                <span className="card-num">01. Code Editor</span>
                <h3 className="card-title">Antigravity</h3>
                <p className="card-text">
                  Your AI-powered coding editor. Open the application or install the extension to start pair programming with the assistant.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minWidth: "auto", textDecoration: "none", width: "100%" }}>
                    Download Editor ↗
                  </a>
                </div>
              </div>

              {/* GIT CARD */}
              <div className="glass-card">
                <span className="card-num">02. Version Control</span>
                <h3 className="card-title">Git Control</h3>
                <p className="card-text">
                  Tracks project files. Non-technical users should install <strong>GitHub Desktop</strong>, which configures Git and accounts automatically.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
                  <a href="https://desktop.github.com" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minWidth: "auto", textDecoration: "none", background: "var(--text-primary)", color: "#000000", fontWeight: "600" }}>
                    Get GitHub Desktop (Easy)
                  </a>
                  <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="card-link" style={{ fontSize: "0.85rem", alignSelf: "center" }}>
                    Standalone Installer ↗
                  </a>
                  
                  <details style={{ marginTop: "0.5rem", fontSize: "0.8rem", cursor: "pointer" }}>
                    <summary style={{ color: "var(--text-tertiary)" }}>Developer CLI Option</summary>
                    {activeOS === "mac" ? (
                      <div className="code-block-container" style={{ padding: "0.5rem", marginTop: "0.25rem" }}>
                        <span className="code-text" style={{ fontSize: "0.75rem" }}>brew install git</span>
                        <button className="copy-btn" onClick={() => handleCopy("git_mac", "brew install git")} style={{ padding: "0.15rem 0.4rem", fontSize: "0.65rem" }}>
                          {copyText["git_mac"] || "Copy"}
                        </button>
                      </div>
                    ) : (
                      <div className="code-block-container" style={{ padding: "0.5rem", marginTop: "0.25rem" }}>
                        <span className="code-text" style={{ fontSize: "0.75rem" }}>winget install Git.Git</span>
                        <button className="copy-btn" onClick={() => handleCopy("git_win", "winget install Git.Git")} style={{ padding: "0.15rem 0.4rem", fontSize: "0.65rem" }}>
                          {copyText["git_win"] || "Copy"}
                        </button>
                      </div>
                    )}
                  </details>
                </div>
              </div>

              {/* NODE & NPM CARD */}
              <div className="glass-card">
                <span className="card-num">03. App Compiler</span>
                <h3 className="card-title">NodeJS & npm</h3>
                <p className="card-text">
                  Runs Next.js websites and manages libraries. Install the <strong>LTS (Long Term Support)</strong> installer package.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
                  <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minWidth: "auto", textDecoration: "none" }}>
                    Download Node.js Installer
                  </a>
                  
                  <details style={{ marginTop: "0.5rem", fontSize: "0.8rem", cursor: "pointer" }}>
                    <summary style={{ color: "var(--text-tertiary)" }}>Developer CLI Option</summary>
                    {activeOS === "mac" ? (
                      <div className="code-block-container" style={{ padding: "0.5rem", marginTop: "0.25rem" }}>
                        <span className="code-text" style={{ fontSize: "0.75rem" }}>brew install node</span>
                        <button className="copy-btn" onClick={() => handleCopy("node_mac", "brew install node")} style={{ padding: "0.15rem 0.4rem", fontSize: "0.65rem" }}>
                          {copyText["node_mac"] || "Copy"}
                        </button>
                      </div>
                    ) : (
                      <div className="code-block-container" style={{ padding: "0.5rem", marginTop: "0.25rem" }}>
                        <span className="code-text" style={{ fontSize: "0.75rem" }}>winget install OpenJS.NodeJS</span>
                        <button className="copy-btn" onClick={() => handleCopy("node_win", "winget install OpenJS.NodeJS")} style={{ padding: "0.15rem 0.4rem", fontSize: "0.65rem" }}>
                          {copyText["node_win"] || "Copy"}
                        </button>
                      </div>
                    )}
                  </details>
                </div>
              </div>

              {/* ACCOUNT CREATION CARD */}
              <div className="glass-card">
                <span className="card-num">04. Cloud Platforms</span>
                <h3 className="card-title">GitHub & Vercel</h3>
                <p className="card-text">
                  Sign up for GitHub (code hosting) and Vercel (web hosting). Select Vercel's <strong>"Sign in with GitHub"</strong> to sync accounts instantly.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "auto" }}>
                  <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minWidth: "auto", textDecoration: "none" }}>
                    Create GitHub Account
                  </a>
                  <a href="https://vercel.com/signup" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", minWidth: "auto", textDecoration: "none" }}>
                    Connect Vercel
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("intro")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>Quarter Month: {quarterMonth}</div>
              <button onClick={() => scrollToSlide("initiation")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 3: PROJECT INITIATION */}
        <section id="initiation" className="slide">
          <div>
            <h2 className="title-medium">Project Initiation</h2>
            <p className="subtitle-medium">
              Start your project using Google Antigravity. Open an empty workspace, type the prompt, and review the live site in seconds.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1.2fr 0.8fr" }}>
              {/* Main Initiation Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="glass-card">
                  <span className="card-num">Step 1: Prompting Antigravity</span>
                  <h3 className="card-title">Bootstrap Prompt</h3>
                  <p className="card-text">
                    Open Antigravity with an empty chat and write:
                  </p>
                  <div className="code-block-container">
                    <span className="code-text" style={{ color: "#ffffff" }}>"Start a new empty next.js project"</span>
                    <button className="copy-btn" onClick={() => handleCopy("init_prompt", "Start a new empty next.js project")}>
                      {copyText["init_prompt"] || "Copy Prompt"}
                    </button>
                  </div>
                </div>

                <div className="glass-card">
                  <span className="card-num">Step 2: Preview & Localhost</span>
                  <h3 className="card-title">Verify Live Server</h3>
                  <div className="badge-container">
                    <span className="badge-dot-green" />
                    Localhost Server Ready
                  </div>
                  <p className="card-text">
                    Antigravity will start the server automatically. Confirm the boilerplate loads at:
                  </p>
                  <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer" className="card-link" style={{ fontSize: "1.1rem", textDecoration: "underline" }}>
                    http://localhost:3000 ↗
                  </a>
                </div>
              </div>

              {/* Troubleshooting Accordions */}
              <div className="accordion-wrapper">
                <h4 style={{ margin: "0.5rem 0 1rem 0", color: "var(--text-primary)", fontWeight: "600" }}>Troubleshooting Common Setups</h4>
                
                {/* Error 1 */}
                <div className="accordion-item">
                  <button className="accordion-header" onClick={() => toggleAccordion(0)}>
                    <span>1. "npm" or "git" not recognized</span>
                    <span className={`accordion-icon ${openError === 0 ? "open" : ""}`}>▼</span>
                  </button>
                  <div className={`accordion-content ${openError === 0 ? "open" : ""}`}>
                    Restart your terminal or text editor after installation. On Windows, ensure you selected "Add to PATH" during installation. Run `git --version` to verify.
                  </div>
                </div>

                {/* Error 2 */}
                <div className="accordion-item">
                  <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                    <span>2. Port 3000 is already in use</span>
                    <span className={`accordion-icon ${openError === 1 ? "open" : ""}`}>▼</span>
                  </button>
                  <div className={`accordion-content ${openError === 1 ? "open" : ""}`}>
                    Another app is running on port 3000. In Antigravity terminal, run:
                    <div className="code-block-container" style={{ margin: "0.5rem 0 0 0" }}>
                      <span className="code-text" style={{ fontSize: "0.75rem" }}>npm run dev -- -p 3001</span>
                    </div>
                  </div>
                </div>

                {/* Error 3 */}
                <div className="accordion-item">
                  <button className="accordion-header" onClick={() => toggleAccordion(2)}>
                    <span>3. Git Push remote permissions</span>
                    <span className={`accordion-icon ${openError === 2 ? "open" : ""}`}>▼</span>
                  </button>
                  <div className={`accordion-content ${openError === 2 ? "open" : ""}`}>
                    Ensure you created a repo in Github. In terminal, link remote address:
                    <div className="code-block-container" style={{ margin: "0.5rem 0 0 0" }}>
                      <span className="code-text" style={{ fontSize: "0.75rem" }}>git remote add origin &lt;URL&gt;</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("prerequisites")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>Quarter Month: {quarterMonth}</div>
              <button onClick={() => scrollToSlide("building")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 4: THE FUN PART (BUILDING WITH AI) */}
        <section id="building" className="slide">
          <div>
            <h2 className="title-medium">The Fun Part: Creating Layouts</h2>
            <p className="subtitle-medium">
              This is where you get creative. Direct the AI to construct a personal portfolio or tailor it to build an MVP for a business idea. Here's a standard layout blueprint.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "0.9fr 1.1fr", alignItems: "center" }}>
              {/* Explanatory Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="glass-card">
                  <span className="card-num">Portfolio Blueprint</span>
                  <h3 className="card-title">Visual UI Structure</h3>
                  <p className="card-text">
                    A standard wireframe consists of a header navigation, an impactful hero headline, a short bio section, a grid showcasing project files, and a contact form.
                  </p>
                  <p className="card-text" style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                    💡 Hover over the wireframe layout layout modules on the right to see their roles!
                  </p>
                </div>

                <div className="glass-card">
                  <span className="card-num">Scaling to Business</span>
                  <h3 className="card-title">Applying to MVPs</h3>
                  <p className="card-text">
                    For entrepreneurship, map the wireframe:
                  </p>
                  <ul className="card-text" style={{ paddingLeft: "1.2rem", listStyleType: "disc", marginTop: "0.25rem" }}>
                    <li><strong>Hero</strong> → Value Proposition</li>
                    <li><strong>Projects</strong> → Products or Feature highlights</li>
                    <li><strong>Contact</strong> → Lead Capture waitlist</li>
                  </ul>
                </div>
              </div>

              {/* Interactive SVG Wireframe Layout */}
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <svg width="100%" height="380" viewBox="0 0 500 380" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "10px" }}>
                  <style>
                    {`
                      .wire-block {
                        fill: rgba(255, 255, 255, 0.03);
                        stroke: rgba(255, 255, 255, 0.15);
                        stroke-width: 1.5;
                        transition: all 0.3s ease;
                        cursor: pointer;
                      }
                      .wire-block:hover {
                        fill: rgba(255, 255, 255, 0.12);
                        stroke: #ffffff;
                      }
                      .wire-text {
                        fill: rgba(255, 255, 255, 0.6);
                        font-family: sans-serif;
                        font-size: 11px;
                        font-weight: 500;
                        pointer-events: none;
                        text-anchor: middle;
                      }
                    `}
                  </style>
                  
                  {/* Header Wireframe */}
                  <g>
                    <rect x="15" y="15" width="470" height="40" rx="6" className="wire-block" />
                    <text x="250" y="38" className="wire-text">Navigation / Logo & Links</text>
                  </g>

                  {/* Hero Wireframe */}
                  <g>
                    <rect x="15" y="65" width="470" height="100" rx="8" className="wire-block" />
                    <text x="250" y="110" className="wire-text" style={{ fontSize: "14px", fill: "#ffffff" }}>Hero Section (Core Message)</text>
                    <text x="250" y="132" className="wire-text" style={{ fill: "var(--text-secondary)" }}>Bold Title + Lead capture form or button</text>
                  </g>

                  {/* About and Skills Grid */}
                  <g>
                    <rect x="15" y="175" width="225" height="110" rx="8" className="wire-block" />
                    <text x="127" y="225" className="wire-text">About Me / Story</text>
                    <text x="127" y="242" className="wire-text" style={{ fontSize: "9px" }}>Credibility section</text>
                  </g>

                  {/* Projects/Portfolio Grid */}
                  <g>
                    <rect x="260" y="175" width="225" height="110" rx="8" className="wire-block" />
                    <text x="372" y="225" className="wire-text">Feature Grid / Products</text>
                    <text x="372" y="242" className="wire-text" style={{ fontSize: "9px" }}>Visual grid blocks</text>
                  </g>

                  {/* Contact / Footer Wireframe */}
                  <g>
                    <rect x="15" y="295" width="470" height="60" rx="6" className="wire-block" />
                    <text x="250" y="330" className="wire-text">Contact Form & Social Footnotes</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("initiation")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>Quarter Month: {quarterMonth}</div>
              <button onClick={() => scrollToSlide("tips")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 5: POLISHING & AI BEST PRACTICES */}
        <section id="tips" className="slide">
          <div>
            <h2 className="title-medium">AI Coding Best Practices</h2>
            <p className="subtitle-medium">
              Coding with AI agents requires a different mindset than traditional coding. Leverage these guidelines to prevent clutter and maintain control of your codebase.
            </p>

            <div className="content-grid">
              
              {/* TIP 1 */}
              <div className="glass-card">
                <span className="card-num">Tip 01</span>
                <h3 className="card-title">Targeted Iterative Prompting</h3>
                <p className="card-text">
                  Make small, targeted adjustments. Do not command the AI to "Build a portfolio with contact form and layout styling" in one go. Instead: "Fix styling on header navigation", then "add input fields to contact form". Staggering keeps logic simple.
                </p>
              </div>

              {/* TIP 2 */}
              <div className="glass-card">
                <span className="card-num">Tip 02</span>
                <h3 className="card-title">Managing AI Context</h3>
                <p className="card-text">
                  Provide exact file targets. If you want to change buttons in your homepage, reference the file specifically: `Change button text to submit in page.tsx`. Narrow targets avoid accidental modifications of unrelated utility scripts.
                </p>
              </div>

              {/* TIP 3 */}
              <div className="glass-card">
                <span className="card-num">Tip 03</span>
                <h3 className="card-title">Commit Frequently / Git Checkout</h3>
                <p className="card-text">
                  Commit your work as soon as a feature works. If the AI breaks your code or you get stuck in a bad loop, discard the changes easily with:
                </p>
                <div className="code-block-container">
                  <span className="code-text">git checkout .</span>
                  <button className="copy-btn" onClick={() => handleCopy("git_discard", "git checkout .")}>
                    {copyText["git_discard"] || "Copy"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("building")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>Quarter Month: {quarterMonth}</div>
              <button onClick={() => scrollToSlide("deployment")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 6: VERCEL DEPLOYMENT */}
        <section id="deployment" className="slide">
          <div>
            <h2 className="title-medium">Deployment to Vercel</h2>
            <p className="subtitle-medium">
              Publish your website to the world. We'll run a local compilation check, push updates to GitHub, and link the repository to Vercel.
            </p>

            <div className="content-grid">
              
              {/* STEP 1: PRE-BUILD CHECK */}
              <div className="glass-card">
                <span className="card-num">Step 1</span>
                <h3 className="card-title">Pre-Build Compile Check</h3>
                <p className="card-text">
                  Ensure the app compiles cleanly by commanding Antigravity to run a compiler check. This prevents Vercel build crashes:
                </p>
                <div className="code-block-container">
                  <span className="code-text" style={{ color: "#ffffff" }}>"Run a production build of my app to check for compiler errors."</span>
                  <button className="copy-btn" onClick={() => handleCopy("build_check", "Run a production build of my app to check for compiler errors.")}>
                    {copyText["build_check"] || "Copy Prompt"}
                  </button>
                </div>
              </div>

              {/* STEP 2: GIT PUSH */}
              <div className="glass-card">
                <span className="card-num">Step 2</span>
                <h3 className="card-title">Push to GitHub</h3>
                <p className="card-text">
                  Stage your modifications, add a commit description, and push:
                </p>
                <div className="code-block-container">
                  <span className="code-text">git add . && git commit -m "feat: design layout" && git push</span>
                  <button className="copy-btn" onClick={() => handleCopy("git_push", "git add . && git commit -m \"feat: design layout\" && git push")}>
                    {copyText["git_push"] || "Copy"}
                  </button>
                </div>
              </div>

              {/* STEP 3: VERCEL IMPORT */}
              <div className="glass-card">
                <span className="card-num">Step 3</span>
                <h3 className="card-title">Import & Deploy</h3>
                <p className="card-text">
                  Go to Vercel dashboard, click <strong>Add New</strong> &gt; <strong>Project</strong>. Link your GitHub account and import your repository. Click <strong>Deploy</strong>.
                </p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "auto" }}>
                  <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", textDecoration: "none", width: "100%" }}>
                    Vercel Import Dashboard ↗
                  </a>
                </div>
              </div>

            </div>

            {/* TIP BOX */}
            <div className="glass-card" style={{ marginTop: "1rem", background: "rgba(239, 68, 68, 0.03)", borderColor: "rgba(239, 68, 68, 0.15)" }}>
              <span className="card-num" style={{ color: "#ef4444" }}>🚨 Pro-Tip: Debugging deployment failures</span>
              <p className="card-text" style={{ fontSize: "0.9rem" }}>
                If Vercel reports a build error, copy the deployment log block, paste it into Antigravity, and type: <strong>"Here is my Vercel build log error. Review the project and fix the code causing this."</strong> The AI will locate the syntax issues and deploy again.
              </p>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("tips")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>Quarter Month: {quarterMonth}</div>
              <button onClick={() => scrollToSlide("maintenance")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 7: MAINTENANCE CYCLE */}
        <section id="maintenance" className="slide">
          <div>
            <h2 className="title-medium">Updates & Maintenance</h2>
            <p className="subtitle-medium">
              After going live, updating your website is simple and frictionless. Follow this continuous integration loop to push new designs automatically.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: "2rem" }}>
              
              {/* LOOP STEP 1 */}
              <div className="glass-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", margin: "1rem 0" }}>💬</div>
                <h3 className="card-title">1. Prompt in Antigravity</h3>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  Ask the AI to change styles, write headers, or append new layout modules. Test changes on your `localhost:3000` preview first.
                </p>
              </div>

              {/* LOOP STEP 2 */}
              <div className="glass-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", margin: "1rem 0" }}>📤</div>
                <h3 className="card-title">2. Git Push to GitHub</h3>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  Commit your working modifications and push them to your repository using git CLI.
                </p>
                <div className="code-block-container" style={{ margin: "0.5rem 0" }}>
                  <span className="code-text" style={{ fontSize: "0.75rem" }}>git push</span>
                </div>
              </div>

              {/* LOOP STEP 3 */}
              <div className="glass-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", margin: "1rem 0" }}>⚡</div>
                <h3 className="card-title">3. Instant Redeployment</h3>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  Vercel listens for repository updates and triggers a deployment. Your changes are live in less than 30 seconds.
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("deployment")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>Quarter Month: {quarterMonth}</div>
              <button onClick={() => scrollToSlide("conclusion")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 8: CONGRATULATIONS & Q&A */}
        <section id="conclusion" className="slide">
          <div style={{ zIndex: 10, position: "relative" }}>
            <h2 className="title-medium" style={{ fontSize: "4.5rem", background: "linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.4) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Congratulations!
            </h2>
            <p className="subtitle-medium" style={{ fontSize: "1.35rem" }}>
              You have successfully completed the AI Website Creation Class. You are now equipped with the workflows to construct, design, deploy, and maintain premium websites using coding agents.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              
              {/* KEY TAKEAWAYS */}
              <div className="glass-card">
                <span className="card-num">Summary checklist</span>
                <h3 className="card-title">Key Workflows Learned</h3>
                <p className="card-text" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                  ✅ Setting up CLI configurations & packages.
                  <br />
                  ✅ Initiating empty Next.js templates.
                  <br />
                  ✅ Interactive layout prototyping with AI.
                  <br />
                  ✅ Clean coding guardrails & error troubleshooting.
                  <br />
                  ✅ Auto-deploying pipelines via Git + Vercel.
                </p>
              </div>

              {/* QUESTIONS PANEL */}
              <div className="glass-card">
                <span className="card-num">Open Q&A Discussion</span>
                <h3 className="card-title">Unanswered Questions?</h3>
                <p className="card-text">
                  Use this time to raise inquiries regarding:
                  <br />
                  • Custom domain integrations.
                  <br />
                  • Back-end storage & API databases.
                  <br />
                  • Dynamic animations or custom features.
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button className="pill" onClick={() => scrollToSlide("intro")} style={{ width: "100%" }}>
                    Start Presentation Over
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("maintenance")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div className="footer-item">
                <span className="bullet-dot" />
                Done
              </div>
              <div>Class Wrap-up</div>
            </footer>
          </div>
        </section>

      </div>
    </main>
  );
}
// Static footer variables
const quarterMonth = "Q2 • June";
