"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  angle: number;
  speed: number;
  radius: number;
  opacity: number;
  color: string;
  vy?: number; // Y velocity
  vx?: number; // X velocity
  hue?: number; // Custom HSLA hue
}

interface ParticleBackgroundProps {
  mode: string;
}

export default function ParticleBackground({ mode }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef(mode);

  // Keep ref updated to prevent resetting the animation loop on scroll
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 800; // Optimal performance for 18 slides

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 130,
    };

    // Helper: Determine particle color based on active slide mode
    const getParticleColor = (modeType: string, index: number) => {
      const greenModes = ["initiation", "adv-overview", "adv-testing"];
      const blueModes = ["adv-importance", "adv-auth", "adv-mcp"];
      const orangeModes = ["deployment", "adv-connection", "adv-vercel"];
      
      if (greenModes.includes(modeType)) {
        return `rgba(52, 211, 153, ${Math.random() * 0.4 + 0.15})`; // Emerald Green
      }
      if (blueModes.includes(modeType)) {
        return `rgba(96, 165, 250, ${Math.random() * 0.4 + 0.15})`; // Sky Blue
      }
      if (orangeModes.includes(modeType)) {
        return `rgba(251, 146, 60, ${Math.random() * 0.4 + 0.15})`; // Neon Orange
      }
      if (modeType === "conclusion" || modeType === "adv-conclusion") {
        return ""; // HSLA color shift computed in drawing
      }
      return `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.15})`; // Standard white
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 1.5 + 0.4;
        const angle = Math.random() * Math.PI * 2;
        const radius = (Math.random() * Math.min(width, height) * 0.3) + 50;
        const speed = Math.random() * 0.15 + 0.05;
        const opacity = Math.random() * 0.5 + 0.15;
        
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseX: Math.random() * width,
          baseY: Math.random() * height,
          size,
          angle,
          speed,
          radius,
          opacity,
          color: getParticleColor(modeRef.current, i),
          vy: Math.random() * 0.6 + 0.2,
          vx: (Math.random() - 0.5) * 0.3,
          hue: Math.random() * 360
        });
      }
    };

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      initParticles();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Draw background gradients matching the theme of each slide
    const drawBackgroundGradient = (w: number, h: number) => {
      const currentMode = modeRef.current;
      let grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 10, w * 0.5, h * 0.5, Math.max(w, h));

      // Map slide modes to visual gradients
      if (currentMode === "intro") {
        grad = ctx.createRadialGradient(w * 0.65, h * 0.5, 0, w * 0.65, h * 0.5, Math.min(w, h) * 0.8);
        grad.addColorStop(0, "rgba(18, 18, 30, 0.45)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "prerequisites") {
        grad = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, Math.max(w, h) * 0.9);
        grad.addColorStop(0, "rgba(10, 20, 45, 0.3)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "initiation" || currentMode === "adv-testing") {
        // Emerald coding green
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(6, 25, 18, 0.25)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "building" || currentMode === "adv-setup") {
        // Creative purple-indigo
        grad = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, Math.max(w, h) * 0.9);
        grad.addColorStop(0, "rgba(35, 15, 50, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "tips" || currentMode === "adv-basics") {
        // Charcoal steel technical look
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(20, 20, 25, 0.45)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (["deployment", "adv-connection", "adv-vercel"].includes(currentMode)) {
        // Cloud-focused orange/amber deploy fire glow
        grad = ctx.createRadialGradient(w * 0.5, h * 0.9, 0, w * 0.5, h * 0.9, Math.max(w, h) * 0.7);
        grad.addColorStop(0, "rgba(45, 20, 5, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (["maintenance", "adv-importance", "adv-mcp"].includes(currentMode)) {
        // Cyan-blue database loop
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(8, 30, 40, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "adv-overview") {
        // Glowing deep emerald matrix
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(16, 185, 129, 0.08)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "adv-auth") {
        // Security royal blue
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(30, 58, 138, 0.2)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "conclusion" || currentMode === "adv-conclusion") {
        // Success celebration neon gold-pink
        grad = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.3, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(40, 15, 30, 0.45)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      }

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    // Animation Loop
    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const currentMode = modeRef.current;

      // Draw background and gradient
      drawBackgroundGradient(w, h);

      // Group slide modes into specific physics engines
      const isConstellation = ["tips", "adv-overview", "adv-testing", "adv-auth"].includes(currentMode);
      const isConcentricLoops = ["maintenance", "adv-importance", "adv-mcp"].includes(currentMode);
      const isBinaryStream = ["initiation", "adv-connection"].includes(currentMode);
      const isHelixVortex = ["building", "adv-setup"].includes(currentMode);
      const isRisingFlow = ["deployment", "adv-vercel"].includes(currentMode);
      const isGlitterFall = ["conclusion", "adv-conclusion"].includes(currentMode);

      // Draw connection lines for Constellation mode
      if (isConstellation) {
        const lineLimit = currentMode === "adv-auth" ? 70 : 100;
        ctx.lineWidth = 0.5;
        for (let a = 0; a < particles.length; a += 5) {
          for (let b = a + 5; b < particles.length; b += 5) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < lineLimit) {
              if (currentMode === "adv-overview" || currentMode === "adv-testing") {
                ctx.strokeStyle = `rgba(52, 211, 153, ${0.12 * (1 - dist / lineLimit)})`;
              } else if (currentMode === "adv-auth") {
                ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 * (1 - dist / lineLimit)})`;
              } else {
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / lineLimit)})`;
              }
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let targetX = p.x;
        let targetY = p.y;

        if (currentMode === "intro") {
          // Mode 1: Cosmic Nebula Ring (Offset right)
          const centerX = w * 0.65;
          const centerY = h * 0.5;
          p.angle += p.speed * 0.005;
          targetX = centerX + Math.cos(p.angle) * p.radius;
          targetY = centerY + Math.sin(p.angle) * p.radius * 0.85;

        } else if (currentMode === "prerequisites") {
          // Mode 2: Tech Matrix Grid
          const cols = Math.floor(Math.sqrt(particleCount * (w / h)));
          const colIndex = i % cols;
          const rowIndex = Math.floor(i / cols);
          const cellW = w / cols;
          const cellH = h / (particleCount / cols);
          
          p.angle += 0.01;
          targetX = (colIndex * cellW) + (cellW / 2) + Math.cos(p.angle + i) * 8;
          targetY = (rowIndex * cellH) + (cellH / 2) + Math.sin(p.angle + i) * 8;

        } else if (currentMode === "adv-basics") {
          // Mode 2B: Database Column structures (Arrange into 3 columns)
          const columnNum = i % 3;
          const colWidth = w * 0.25;
          const centerX = w * 0.55;
          const startX = centerX - colWidth;
          
          const colX = startX + (columnNum * colWidth);
          const rowY = ((Math.floor(i / 3) * 6) % (h * 0.8)) + (h * 0.1);
          
          p.angle += 0.01;
          targetX = colX + Math.cos(p.angle + i) * 12;
          targetY = rowY + Math.sin(p.angle + i) * 4;

        } else if (isBinaryStream) {
          // Mode 3: Falling Binary Streams (Falling vertically or sliding sideways)
          if (currentMode === "adv-connection") {
            // Signal streams sliding horizontally left-to-right
            p.x += p.vy || 1; // Reuse vy as horizontal speed
            p.y += p.vx ? p.vx * 0.5 : 0;
            if (p.x > w) {
              p.x = -10;
              p.y = Math.random() * h;
            }
          } else {
            // Falling code lines
            p.y += p.vy || 1;
            p.x += p.vx || 0;
            if (p.y > h) {
              p.y = -10;
              p.x = Math.random() * w;
            }
          }
          targetX = p.x;
          targetY = p.y;

        } else if (isHelixVortex) {
          // Mode 4: Double Helix / DNA Vortex
          p.angle += 0.008;
          const centerX = w * 0.7;
          const scale = 120;
          targetX = centerX + Math.sin(p.angle * 2) * scale * 1.5;
          targetY = (h * 0.1) + ((i / particleCount) * h * 0.8) + Math.cos(p.angle) * 30;

        } else if (isConstellation) {
          // Mode 5: Constellation Drifters (Free floating particles)
          p.x += p.vx || 0.1;
          p.y += p.vy ? p.vy * 0.2 : 0.1;

          if (p.x < 0 || p.x > w) p.vx = -(p.vx || 0.1);
          if (p.y < 0 || p.y > h) p.vy = -(p.vy || 0.1);

          targetX = p.x;
          targetY = p.y;

        } else if (isRisingFlow) {
          // Mode 6: Rising sparks (Moving upwards)
          p.y -= p.vy || 1;
          p.x += Math.sin(p.angle + p.y * 0.02) * 0.4;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          targetX = p.x;
          targetY = p.y;

        } else if (isConcentricLoops) {
          // Mode 7: Concentric rotating loops
          const isOuter = i % 2 === 0;
          const isInner = i % 3 === 0;
          const centerX = w * 0.55;
          const centerY = h * 0.55;
          
          let cycleRadius = Math.min(w, h) * 0.25;
          if (isOuter) cycleRadius = Math.min(w, h) * 0.34;
          if (isInner) cycleRadius = Math.min(w, h) * 0.16;

          // Orbit speed
          let speedFactor = 0.003;
          if (currentMode === "adv-mcp") speedFactor = 0.005; // Quick orbit representing AI calls
          
          p.angle += (isOuter ? 1 : -1.4) * p.speed * speedFactor;

          targetX = centerX + Math.cos(p.angle) * cycleRadius;
          targetY = centerY + Math.sin(p.angle) * cycleRadius * 0.8;

        } else if (isGlitterFall) {
          // Mode 8: Slow Falling glitter
          p.y += (p.vy || 1) * 0.4;
          p.x += Math.sin(p.angle + p.y * 0.01) * 0.3;
          if (p.y > h) {
            p.y = -10;
            p.x = Math.random() * w;
          }
          targetX = p.x;
          targetY = p.y;
        }

        // Apply morph transitions
        const isFreeFlow = isBinaryStream || isConstellation || isRisingFlow || isGlitterFall;
        if (isFreeFlow) {
          p.x = targetX;
          p.y = targetY;
        } else {
          p.x += (targetX - p.x) * 0.07;
          p.y += (targetY - p.y) * 0.07;
        }

        // Repel from cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const dirX = dx / dist;
            const dirY = dy / dist;
            p.x -= dirX * force * 15;
            p.y -= dirY * force * 15;
          }
        }

        // Draw particle color updates
        if (isGlitterFall) {
          p.hue = ((p.hue || 0) + 0.2) % 360;
          ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.opacity})`;
        } else {
          // Update color string if mode changed dynamically
          const computedColor = getParticleColor(currentMode, i);
          if (computedColor) {
            ctx.fillStyle = computedColor;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        transition: "background 1s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    />
  );
}
