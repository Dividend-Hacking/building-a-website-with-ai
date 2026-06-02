"use client";

import React, { useEffect, useState, useRef } from "react";
import ParticleBackground from "@/components/ParticleBackground";

// Complete slide configuration for navigation (18 slides)
const SLIDES = [
  { id: "intro", label: "01. Introduction" },
  { id: "prerequisites", label: "02. Prerequisites" },
  { id: "initiation", label: "03. Initiation" },
  { id: "building", label: "04. Building with AI" },
  { id: "tips", label: "05. AI Best Practices" },
  { id: "deployment", label: "06. Vercel Deployment" },
  { id: "maintenance", label: "07. Site Maintenance" },
  { id: "conclusion", label: "08. Class Wrap-Up" },
  // Advanced Supabase Track
  { id: "adv-overview", label: "09. [ADV] Overview" },
  { id: "adv-importance", label: "10. [ADV] Why Backend?" },
  { id: "adv-setup", label: "11. [ADV] Setup Supabase" },
  { id: "adv-basics", label: "12. [ADV] DB Basics" },
  { id: "adv-connection", label: "13. [ADV] Connection" },
  { id: "adv-mcp", label: "14. [ADV] MCP Server" },
  { id: "adv-testing", label: "15. [ADV] Tables & Testing" },
  { id: "adv-auth", label: "16. [ADV] Authentication" },
  { id: "adv-vercel", label: "17. [ADV] Vercel Keys" },
  { id: "adv-conclusion", label: "18. [ADV] Congratulations" }
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

  const quarterMonth = "Q2 • June";

  return (
    <main style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Floating Canvas Particle Field (morphs dynamically based on current slide) */}
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
              Ensure your system has the proper foundation set up before building. Choose your operating system to view installation details.
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
                
                <div className="accordion-item">
                  <button className="accordion-header" onClick={() => toggleAccordion(0)}>
                    <span>1. "npm" or "git" not recognized</span>
                    <span className={`accordion-icon ${openError === 0 ? "open" : ""}`}>▼</span>
                  </button>
                  <div className={`accordion-content ${openError === 0 ? "open" : ""}`}>
                    Restart your terminal or text editor after installation. On Windows, ensure you selected "Add to PATH" during installation. Run `git --version` to verify.
                  </div>
                </div>

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
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="glass-card">
                  <span className="card-num">Portfolio Blueprint</span>
                  <h3 className="card-title">Visual UI Structure</h3>
                  <p className="card-text">
                    A standard wireframe consists of a header navigation, an impactful hero headline, a short bio section, a grid showcasing project files, and a contact form.
                  </p>
                  <p className="card-text" style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                    💡 Hover over the wireframe layout modules on the right to see their roles!
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
                  
                  <g>
                    <rect x="15" y="15" width="470" height="40" rx="6" className="wire-block" />
                    <text x="250" y="38" className="wire-text">Navigation / Logo & Links</text>
                  </g>

                  <g>
                    <rect x="15" y="65" width="470" height="100" rx="8" className="wire-block" />
                    <text x="250" y="110" className="wire-text" style={{ fontSize: "14px", fill: "#ffffff" }}>Hero Section (Core Message)</text>
                    <text x="250" y="132" className="wire-text" style={{ fill: "var(--text-secondary)" }}>Bold Title + Lead capture form or button</text>
                  </g>

                  <g>
                    <rect x="15" y="175" width="225" height="110" rx="8" className="wire-block" />
                    <text x="127" y="225" className="wire-text">About Me / Story</text>
                    <text x="127" y="242" className="wire-text" style={{ fontSize: "9px" }}>Credibility section</text>
                  </g>

                  <g>
                    <rect x="260" y="175" width="225" height="110" rx="8" className="wire-block" />
                    <text x="372" y="225" className="wire-text">Feature Grid / Products</text>
                    <text x="372" y="242" className="wire-text" style={{ fontSize: "9px" }}>Visual grid blocks</text>
                  </g>

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
              
              <div className="glass-card">
                <span className="card-num">Tip 01</span>
                <h3 className="card-title">Targeted Iterative Prompting</h3>
                <p className="card-text">
                  Make small, targeted adjustments. Do not command the AI to "Build a portfolio with contact form and layout styling" in one go. Instead: "Fix styling on header navigation", then "add input fields to contact form". Staggering keeps logic simple.
                </p>
              </div>

              <div className="glass-card">
                <span className="card-num">Tip 02</span>
                <h3 className="card-title">Managing AI Context</h3>
                <p className="card-text">
                  Provide exact file targets. If you want to change buttons in your homepage, reference the file specifically: `Change button text to submit in page.tsx`. Narrow targets avoid accidental modifications of unrelated utility scripts.
                </p>
              </div>

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
              
              <div className="glass-card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: "3rem", margin: "1rem 0" }}>💬</div>
                <h3 className="card-title">1. Prompt in Antigravity</h3>
                <p className="card-text" style={{ fontSize: "0.9rem" }}>
                  Ask the AI to change styles, write headers, or append new layout modules. Test changes on your `localhost:3000` preview first.
                </p>
              </div>

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

        {/* SLIDE 8: CONGRATULATIONS & BASIC WRAP-UP */}
        <section id="conclusion" className="slide">
          <div style={{ zIndex: 10, position: "relative" }}>
            <h2 className="title-medium" style={{ fontSize: "4.5rem", background: "linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.4) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Congratulations!
            </h2>
            <p className="subtitle-medium" style={{ fontSize: "1.35rem" }}>
              You have successfully completed the AI Website Creation Class. You are now equipped with the workflows to construct, design, deploy, and maintain premium websites using coding agents.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              
              <div className="glass-card">
                <span className="card-num">Summary checklist</span>
                <h3 className="card-title">Key Workflows Learned</h3>
                <p className="card-text" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                  ✅ Setting up environment configurations.
                  <br />
                  ✅ Initiating empty templates inside code spaces.
                  <br />
                  ✅ Layout design prompting.
                  <br />
                  ✅ Clean coding guardrails & rollbacks.
                  <br />
                  ✅ Auto-deploying pipelines via Git + Vercel.
                </p>
              </div>

              <div className="glass-card" style={{ border: "1px solid rgba(16, 185, 129, 0.2)", background: "rgba(16, 185, 129, 0.02)" }}>
                <span className="card-num" style={{ color: "#10b981" }}>Ready for more?</span>
                <h3 className="card-title">Advanced Supabase Track</h3>
                <p className="card-text">
                  Eager to build a database waitlist, save user inputs, and explore back-ends? Continue onto the self-guided Advanced slides below!
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <button className="pill" onClick={() => scrollToSlide("adv-overview")} style={{ width: "100%", background: "#10b981", color: "#000000", border: "none", fontWeight: "600" }}>
                    Start Advanced Backend Course →
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
              <button onClick={() => scrollToSlide("adv-overview")} style={{ background: "transparent", border: "none", color: "#10b981", cursor: "pointer", fontWeight: "600" }}>Advanced →</button>
            </footer>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* ======================= ADVANCED TRACK SLIDES ======================= */}
        {/* ===================================================================== */}

        {/* SLIDE 9: ADVANCED OVERVIEW */}
        <section id="adv-overview" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Advanced: Backend Overview</h2>
            <p className="subtitle-medium">
              Take your static prototype and power it with a server database. In this self-guided section, you will learn to connect **Supabase** to store user information, emails, and forms.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
              <div className="glass-card">
                <span className="card-num">What you will learn</span>
                <h3 className="card-title">Backend Curriculum</h3>
                <p className="card-text" style={{ lineHeight: "1.8" }}>
                  • **The Power of Databases**: Server logic vs. client layouts.
                  <br />
                  • **Project Hosting**: Creating a Supabase workspace.
                  <br />
                  • **Relational DB Basics**: Managing rows and columns.
                  <br />
                  • **Local Connection**: Safe configuration of secret environment keys.
                  <br />
                  • **AI Copilot (MCP)**: Letting Antigravity query databases dynamically.
                  <br />
                  • **Table Queries**: Programming a live waitlist database collector.
                </p>
              </div>

              <div className="glass-card" style={{ background: "rgba(16, 185, 129, 0.02)" }}>
                <span className="card-num">Target Audience</span>
                <h3 className="card-title">Technical Prerequisites</h3>
                <p className="card-text">
                  This track is self-guided. It is structured for developers or entrepreneurs who are eager to code functional sign-up pipelines, waiting lists, and active integrations.
                </p>
                <div style={{ marginTop: "auto" }}>
                  <button className="pill" onClick={() => scrollToSlide("adv-importance")} style={{ width: "100%" }}>
                    Begin: Importance of Databases
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("conclusion")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Beginner Track</button>
              <div>Advanced Track Overview</div>
              <button onClick={() => scrollToSlide("adv-importance")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 10: IMPORTANCE OF BACKEND & SUPABASE */}
        <section id="adv-importance" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Why have a Backend?</h2>
            <p className="subtitle-medium">
              Websites have two layers. The frontend (buttons, typography, colors) and the backend (storing details, credentials, processing logic).
            </p>

            <div className="content-grid">
              
              <div className="glass-card">
                <span className="card-num">Client vs. Server</span>
                <h3 className="card-title">What databases allow</h3>
                <p className="card-text">
                  Without a backend, inputs inside forms disappear on refresh. Linking a database allows you to retain signup lists, manage catalog products, authenticate passwords, and store persistent dynamic variables.
                </p>
              </div>

              <div className="glass-card" style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}>
                <span className="card-num">Tech Choice</span>
                <h3 className="card-title">Why Supabase?</h3>
                <p className="card-text">
                  Supabase is a serverless alternative to Firebase. It gives you a full Postgres database, instant API creation, and built-in user verification. Its visual dashboard interface makes it the perfect developer pick for fast MVPs.
                </p>
              </div>

              <div className="glass-card">
                <span className="card-num">Relational postgres</span>
                <h3 className="card-title">Instant Security</h3>
                <p className="card-text">
                  It features enterprise security guidelines (Row Level Security) ensuring that hackers cannot query or overwrite other users' records in production.
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-overview")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>10. Importance of Backend</div>
              <button onClick={() => scrollToSlide("adv-setup")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 11: SETTING UP SUPABASE ORGANIZATION */}
        <section id="adv-setup" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Setting up Supabase</h2>
            <p className="subtitle-medium">
              Create a database project on the cloud. Supabase is free for prototyping. Follow these baseline setup steps:
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              
              <div className="glass-card">
                <span className="card-num">Step 01</span>
                <h3 className="card-title">Create Account</h3>
                <p className="card-text">
                  Visit Supabase and click **Sign Up** using your GitHub account for single-sign-on.
                </p>
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="pill" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem", textDecoration: "none", marginTop: "auto" }}>
                  Go to Supabase ↗
                </a>
              </div>

              <div className="glass-card">
                <span className="card-num">Step 02</span>
                <h3 className="card-title">New Organization</h3>
                <p className="card-text">
                  In your account dashboard, click **New Project** and select or construct a free tier organization.
                </p>
              </div>

              <div className="glass-card">
                <span className="card-num">Step 03</span>
                <h3 className="card-title">Launch Database</h3>
                <p className="card-text">
                  Set a name (e.g. `website-waitlist`), input a secure Database Password, and select the region nearest to your customers. Click **Create**.
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-importance")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>11. Setup Supabase Project</div>
              <button onClick={() => scrollToSlide("adv-basics")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 12: DATABASE BASICS */}
        <section id="adv-basics" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Database Basics</h2>
            <p className="subtitle-medium">
              Understand how data is stored. Databases are structured as tables with fixed columns (data types) and rows (individual entries).
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1.1fr" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="glass-card">
                  <span className="card-num">Structure definitions</span>
                  <h3 className="card-title">Tables, Rows, & Columns</h3>
                  <p className="card-text" style={{ fontSize: "0.9rem", lineHeight: "1.7" }}>
                    • **Columns (Columns)**: Define fields (e.g. `id` as number, `email` as text, `created_at` as timestamp).
                    <br />
                    • **Rows (Rows)**: Single record entries (e.g. a signup entry by Jordan Scott).
                    <br />
                    • **APIs**: Bridge connecting your Next.js app to Supabase to fetch or insert rows using JSON objects.
                  </p>
                </div>
              </div>

              {/* Mock Database Table UI */}
              <div className="glass-card">
                <span className="card-num" style={{ color: "#38bdf8" }}>Mock Schema: "waitlist" table</span>
                <div className="db-table-container">
                  <table className="db-mock-table">
                    <thead>
                      <tr>
                        <th>id (int8)</th>
                        <th>created_at (timestamptz)</th>
                        <th>email (text)</th>
                        <th>source (text)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>2026-06-02 12:10:00</td>
                        <td>jordan@example.com</td>
                        <td>Homepage</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>2026-06-02 12:22:15</td>
                        <td>antigravity@google.com</td>
                        <td>LinkedIn</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>2026-06-02 12:35:01</td>
                        <td>entrepreneur@startup.io</td>
                        <td>Twitter</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", marginTop: "0.5rem" }}>
                  💡 Next.js uses secure network APIs to post input values into this table structure.
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-setup")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>12. Database Basics</div>
              <button onClick={() => scrollToSlide("adv-connection")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 13: MAKING THE CONNECTION */}
        <section id="adv-connection" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Making the Connection</h2>
            <p className="subtitle-medium">
              Next, connect your Next.js project to your Supabase instance. We will declare keys inside a local environment variables file.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "0.9fr 1.1fr" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Security warning */}
                <div className="glass-card" style={{ borderColor: "rgba(249, 115, 22, 0.2)", background: "rgba(249, 115, 22, 0.01)" }}>
                  <span className="card-num" style={{ color: "#f97316" }}>🚨 Security Policy</span>
                  <h3 className="card-title">Secret Environment Keys</h3>
                  <p className="card-text" style={{ fontSize: "0.9rem" }}>
                    Create a file named `.env.local` in the project root directory. This file is local-only and ignored by git so you don't leak confidential keys to public repositories.
                  </p>
                </div>

                <div className="glass-card">
                  <span className="card-num">Credentials Syntax</span>
                  <p className="card-text">
                    Add the credentials found under Supabase Settings &gt; **API**:
                  </p>
                  <div className="code-block-container" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <pre className="code-text" style={{ fontSize: "0.75rem", userSelect: "all", whiteSpace: "pre-wrap" }}>
{`NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key`}
                    </pre>
                    <button className="copy-btn" onClick={() => handleCopy("env_vars", "NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key")} style={{ marginTop: "0.5rem", alignSelf: "flex-end" }}>
                      {copyText["env_vars"] || "Copy Format"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Prompt Card */}
              <div className="glass-card">
                <span className="card-num">Antigravity Instruction</span>
                <h3 className="card-title">Connection Prompt</h3>
                <p className="card-text">
                  Once `.env.local` is saved with your project values, instruct Antigravity:
                </p>
                <div className="code-block-container" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span className="code-text" style={{ color: "#ffffff", fontSize: "0.8rem", lineHeight: "1.4" }}>
                    "I have added my Supabase credentials to .env.local. Now install the Supabase client library and create a utility helper file to initialize the connection in my Next.js project."
                  </span>
                  <button className="copy-btn" onClick={() => handleCopy("conn_prompt", "I have added my Supabase credentials to .env.local. Now install the Supabase client library and create a utility helper file to initialize the connection in my Next.js project.")} style={{ alignSelf: "flex-end" }}>
                    {copyText["conn_prompt"] || "Copy Prompt"}
                  </button>
                </div>
                <p className="card-text" style={{ fontSize: "0.85rem", color: "var(--text-tertiary)" }}>
                  💡 The AI agent will run `npm install @supabase/supabase-js` and configure the client structure automatically.
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-basics")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>13. Local Project Connection</div>
              <button onClick={() => scrollToSlide("adv-mcp")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 14: SUPABASE MCP SERVER */}
        <section id="adv-mcp" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Supabase MCP Server</h2>
            <p className="subtitle-medium">
              Integrate database access directly into the AI. An MCP (Model Context Protocol) server allows Antigravity to create tables and execute queries for you.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
              
              <div className="glass-card">
                <span className="card-num">Context integration</span>
                <h3 className="card-title">How AI manages your DB</h3>
                <p className="card-text" style={{ lineHeight: "1.7" }}>
                  By configuring the Supabase MCP Server, Antigravity receives secure tools to inspect your database schema, insert tables, and configure triggers. 
                  <br />
                  Instead of writing manual SQL scripts or navigating dashboard interfaces, you can speak directly in chat: *"Create a database schema to track user checkouts."*
                </p>
                <div className="mcp-pill-indicator" style={{ width: "fit-content", marginTop: "0.5rem" }}>
                  ⚡ MCP Connected
                </div>
              </div>

              <div className="glass-card" style={{ borderColor: "rgba(96, 165, 250, 0.2)", background: "rgba(96, 165, 250, 0.01)" }}>
                <span className="card-num">Developer Guardrails</span>
                <h3 className="card-title">Maintain Code Literacy</h3>
                <p className="card-text">
                  Even though the MCP server delegates schema building to the AI, **always review the changes**. 
                  <br />
                  Make sure you understand table constraints, timestamps, and column types. If the AI inserts incorrect fields, a basic understanding of your tables will allow you to direct correction prompts.
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-connection")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>14. Supabase MCP Server</div>
              <button onClick={() => scrollToSlide("adv-testing")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 15: TESTING CONNECTION / WAITLIST */}
        <section id="adv-testing" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Testing & First Tables</h2>
            <p className="subtitle-medium">
              Use your connected workspace to build your first database function: an email collection waitlist for your startup.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              
              {/* Build Step */}
              <div className="glass-card">
                <span className="card-num">Action Item</span>
                <h3 className="card-title">Prompting the Table creation</h3>
                <p className="card-text">
                  Instruct Antigravity to create the table structure and build the UI form in one prompt:
                </p>
                <div className="code-block-container" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span className="code-text" style={{ color: "#ffffff", fontSize: "0.8rem", lineHeight: "1.4" }}>
                    "Create a database table named 'waitlist' with columns for an auto-incrementing id, created_at timestamp, email text (required, unique), and notes text. Then create a React waitlist email form component in my homepage that inserts users into this table."
                  </span>
                  <button className="copy-btn" onClick={() => handleCopy("wait_prompt", "Create a database table named 'waitlist' with columns for an auto-incrementing id, created_at timestamp, email text (required, unique), and notes text. Then create a React waitlist email form component in my homepage that inserts users into this table.")} style={{ alignSelf: "flex-end" }}>
                    {copyText["wait_prompt"] || "Copy Prompt"}
                  </button>
                </div>
              </div>

              {/* Verification step */}
              <div className="glass-card">
                <span className="card-num">Verification check</span>
                <h3 className="card-title">How to Test</h3>
                <p className="card-text" style={{ lineHeight: "1.7" }}>
                  1. Refresh your localhost preview at `http://localhost:3000`.
                  <br />
                  2. Input a test email (e.g. `test@startup.com`) into your new form and click submit.
                  <br />
                  3. Go to your **Supabase Dashboard** &gt; **Table Editor** &gt; click the `waitlist` table.
                  <br />
                  4. Verify that the row containing `test@startup.com` appears instantly in the grid database view!
                </p>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-mcp")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>15. Testing waitlist integration</div>
              <button onClick={() => scrollToSlide("adv-auth")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 16: AUTHENTICATION */}
        <section id="adv-auth" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Adding Authentication</h2>
            <p className="subtitle-medium">
              Restricting pages behind password controls is simple. Supabase offers instant user authentication, sign-ups, and profile creation.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
              
              <div className="glass-card">
                <span className="card-num">Security infrastructure</span>
                <h3 className="card-title">Supabase Auth Helpers</h3>
                <p className="card-text" style={{ lineHeight: "1.7" }}>
                  Instead of programming cryptography hashes, login sessions, and validation tokens manually, Supabase handles user sessions in the cloud.
                  <br />
                  You can secure dashboard pages, manage password recovery, or implement social logins (Google, Apple, Microsoft) using visual configuration settings.
                </p>
              </div>

              {/* How to prompt */}
              <div className="glass-card" style={{ borderColor: "rgba(96, 165, 250, 0.15)" }}>
                <span className="card-num">How to set up</span>
                <h3 className="card-title">Prompting Auth</h3>
                <p className="card-text">
                  To secure your site, ask Antigravity:
                </p>
                <div className="code-block-container" style={{ flexDirection: "column", alignItems: "flex-start", gap: "0.5rem" }}>
                  <span className="code-text" style={{ color: "#ffffff", fontSize: "0.8rem", lineHeight: "1.4" }}>
                    "Add Supabase email and password authentication to my Next.js app, creating a login form and protecting my dashboard page."
                  </span>
                  <button className="copy-btn" onClick={() => handleCopy("auth_prompt", "Add Supabase email and password authentication to my Next.js app, creating a login form and protecting my dashboard page.")} style={{ alignSelf: "flex-end" }}>
                    {copyText["auth_prompt"] || "Copy Prompt"}
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-testing")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>16. Supabase Authentication</div>
              <button onClick={() => scrollToSlide("adv-vercel")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 17: VERCEL PRODUCTION ENVIRONMENT KEYS */}
        <section id="adv-vercel" className="slide">
          <div>
            <div className="advanced-badge">
              <span className="advanced-badge-dot" />
              Advanced Course Track
            </div>
            <h2 className="title-medium">Vercel Production Variables</h2>
            <p className="subtitle-medium">
              Prepare for live hosting. Before deploying your backend to Vercel, copy your environment variables to Vercel's cloud dashboard to make them available in production.
            </p>

            <div className="content-grid">
              
              <div className="glass-card">
                <span className="card-num">Step 01</span>
                <h3 className="card-title">Configure Environment Variables</h3>
                <p className="card-text">
                  Go to Vercel Dashboard &gt; select your project &gt; **Settings** &gt; **Environment Variables**.
                </p>
              </div>

              <div className="glass-card">
                <span className="card-num">Step 02</span>
                <h3 className="card-title">Add the keys</h3>
                <p className="card-text">
                  Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as production variables matching their values in `.env.local`. Click **Save**.
                </p>
              </div>

              <div className="glass-card" style={{ borderColor: "rgba(16, 185, 129, 0.15)" }}>
                <span className="card-num">Step 03</span>
                <h3 className="card-title">Redeploy Live</h3>
                <p className="card-text">
                  Push your connection code to GitHub. Vercel will automatically compile it with the new environment variables:
                </p>
                <div className="code-block-container" style={{ margin: "0.5rem 0 0 0" }}>
                  <span className="code-text" style={{ fontSize: "0.75rem" }}>git add . && git commit -m "mcp: supabase waitlist" && git push</span>
                </div>
              </div>

            </div>

            {/* Security checklist */}
            <div className="glass-card" style={{ marginTop: "1rem", background: "rgba(249, 115, 22, 0.02)", borderColor: "rgba(249, 115, 22, 0.15)" }}>
              <span className="card-num" style={{ color: "#f97316" }}>🔒 Security Checklist</span>
              <p className="card-text" style={{ fontSize: "0.9rem" }}>
                Make sure you **never** commit secret service keys containing write/admin access (`SUPABASE_SERVICE_ROLE_KEY`) to GitHub. Only share the `ANON_KEY` publicly on client layouts. Enable Row Level Security (RLS) on Supabase table configurations.
              </p>
            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-auth")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div>17. Vercel Configuration & Security</div>
              <button onClick={() => scrollToSlide("adv-conclusion")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>Next →</button>
            </footer>
          </div>
        </section>

        {/* SLIDE 18: ADVANCED CONGRATULATIONS & WRAP-UP */}
        <section id="adv-conclusion" className="slide">
          <div style={{ zIndex: 10, position: "relative" }}>
            <h2 className="title-medium" style={{ fontSize: "4.5rem", background: "linear-gradient(180deg, #ffffff 40%, rgba(255, 255, 255, 0.4) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Backend Complete!
            </h2>
            <p className="subtitle-medium" style={{ fontSize: "1.35rem" }}>
              Congratulations on completing the Advanced Course Track! You now have a live website connected to a remote SQL database, managed dynamically using AI.
            </p>

            <div className="content-grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
              
              <div className="glass-card">
                <span className="card-num">What you can build now</span>
                <h3 className="card-title">Startup Idea Extensions</h3>
                <p className="card-text" style={{ fontSize: "0.95rem", lineHeight: "1.8" }}>
                  💡 **Blog CMS**: Fetch columns of post articles.
                  <br />
                  💡 **User Profiles**: Secure profiles and settings.
                  <br />
                  💡 **Feedback Boards**: Let visitors write feedback comments.
                  <br />
                  💡 **Checkout Forms**: Connect Stripe API hooks to database entries.
                </p>
              </div>

              <div className="glass-card">
                <span className="card-num">Keep Creating</span>
                <h3 className="card-title">Go Build Your MVP</h3>
                <p className="card-text">
                  The tools are setup on your machine. Leverage Google Antigravity to quickly iterate on startup prototypes, test visual alignment, and deploy live on the cloud.
                </p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                  <button className="pill" onClick={() => scrollToSlide("intro")} style={{ width: "100%" }}>
                    Restart Deck
                  </button>
                  <button className="pill" onClick={() => scrollToSlide("conclusion")} style={{ width: "100%", background: "#10b981", color: "#000000", border: "none", fontWeight: "600" }}>
                    Class Wrap-Up
                  </button>
                </div>
              </div>

            </div>
          </div>

          <div style={{ width: "100%" }}>
            <hr className="footer-line" />
            <footer className="footer-container">
              <button onClick={() => scrollToSlide("adv-vercel")} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>← Previous</button>
              <div className="footer-item">
                <span className="bullet-dot" style={{ backgroundColor: "#10b981" }} />
                Advanced Complete
              </div>
              <div>Class Concluded</div>
            </footer>
          </div>
        </section>

      </div>
    </main>
  );
}
