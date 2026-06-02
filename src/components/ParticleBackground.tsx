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
  vy?: number; // Y velocity for falling/rising physics
  vx?: number; // X velocity
  hue?: number; // Custom hue for color shifting in conclusion mode
}

interface ParticleBackgroundProps {
  mode: string; // "intro" | "prerequisites" | "initiation" | "building" | "tips" | "deployment" | "maintenance" | "conclusion"
}

export default function ParticleBackground({ mode }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const modeRef = useRef(mode);

  // Keep ref updated to avoid re-initializing the whole canvas logic on every slide scroll
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
    const particleCount = 800; // Efficient particle count for smooth 60fps morphing

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 130,
    };

    // Helper: Get random particle color
    const getRandomColor = (modeType: string) => {
      if (modeType === "initiation") {
        // Neon green terminal look
        return `rgba(52, 211, 153, ${Math.random() * 0.4 + 0.15})`;
      }
      if (modeType === "conclusion") {
        // Multi-color celebratory sparkles (we'll set hue dynamically)
        return "";
      }
      return `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.15})`;
    };

    // Initialize/Reset particles
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
          color: getRandomColor(modeRef.current),
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

      if (currentMode === "intro") {
        // Deep black cosmic nebula
        grad = ctx.createRadialGradient(w * 0.65, h * 0.5, 0, w * 0.65, h * 0.5, Math.min(w, h) * 0.8);
        grad.addColorStop(0, "rgba(18, 18, 30, 0.45)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "prerequisites") {
        // High-tech deep blue/indigo tint
        grad = ctx.createRadialGradient(w * 0.3, h * 0.3, 0, w * 0.3, h * 0.3, Math.max(w, h) * 0.9);
        grad.addColorStop(0, "rgba(10, 20, 45, 0.3)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "initiation") {
        // Code terminal green-grey tint
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(6, 25, 18, 0.25)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "building") {
        // Creative purple-indigo artistic tint
        grad = ctx.createRadialGradient(w * 0.7, h * 0.6, 0, w * 0.7, h * 0.6, Math.max(w, h) * 0.9);
        grad.addColorStop(0, "rgba(35, 15, 50, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "tips") {
        // Technical cool charcoal steel-grey
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(20, 20, 25, 0.45)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "deployment") {
        // Cloud-focused orange/amber deploy fire glow
        grad = ctx.createRadialGradient(w * 0.5, h * 0.9, 0, w * 0.5, h * 0.9, Math.max(w, h) * 0.7);
        grad.addColorStop(0, "rgba(45, 20, 5, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "maintenance") {
        // Orbiting cyan loop glow
        grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.8);
        grad.addColorStop(0, "rgba(8, 30, 40, 0.35)");
        grad.addColorStop(1, "rgba(0, 0, 0, 1)");
      } else if (currentMode === "conclusion") {
        // Success celebration neon gold-pink aura
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

      // Draw background and gradient overlay
      drawBackgroundGradient(w, h);

      // We will perform special connection logic for Constellation (Tips) and Grid (Prerequisites)
      if (currentMode === "tips") {
        // Connect nearby drifting stars (Constellation)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 0.5;
        for (let a = 0; a < particles.length; a += 4) { // Checked sample for speed
          for (let b = a + 4; b < particles.length; b += 4) {
            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(particles[a].x, particles[a].y);
              ctx.lineTo(particles[b].x, particles[b].y);
              ctx.stroke();
            }
          }
        }
      }

      // Physics/Target updates for each particle based on mode
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slide target positions (morph targets)
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
          // Mode 2: Tech Matrix Grid (A static dot matrix that sways slightly)
          const cols = Math.floor(Math.sqrt(particleCount * (w / h)));
          const colIndex = i % cols;
          const rowIndex = Math.floor(i / cols);
          const cellW = w / cols;
          const cellH = h / (particleCount / cols);
          
          p.angle += 0.01;
          targetX = (colIndex * cellW) + (cellW / 2) + Math.cos(p.angle + i) * 8;
          targetY = (rowIndex * cellH) + (cellH / 2) + Math.sin(p.angle + i) * 8;

        } else if (currentMode === "initiation") {
          // Mode 3: Code Binary Streams (Falling particles)
          p.y += p.vy || 1;
          p.x += p.vx || 0;
          if (p.y > h) {
            p.y = -10;
            p.x = Math.random() * w;
          }
          targetX = p.x;
          targetY = p.y;

        } else if (currentMode === "building") {
          // Mode 4: Double Helix / DNA Vortex
          p.angle += 0.008;
          const centerX = w * 0.7;
          const scale = 120;
          // Lissajous 3D-like spiral path
          targetX = centerX + Math.sin(p.angle * 2) * scale * 1.5;
          targetY = (h * 0.1) + ((i / particleCount) * h * 0.8) + Math.cos(p.angle) * 30;

        } else if (currentMode === "tips") {
          // Mode 5: Constellation Drifters (Free floating particles)
          p.x += p.vx || 0.1;
          p.y += p.vy ? p.vy * 0.2 : 0.1;

          if (p.x < 0 || p.x > w) p.vx = -(p.vx || 0.1);
          if (p.y < 0 || p.y > h) p.vy = -(p.vy || 0.1);

          targetX = p.x;
          targetY = p.y;

        } else if (currentMode === "deployment") {
          // Mode 6: Rising sparks (Moving upwards)
          p.y -= p.vy || 1;
          p.x += Math.sin(p.angle + p.y * 0.02) * 0.4;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          targetX = p.x;
          targetY = p.y;

        } else if (currentMode === "maintenance") {
          // Mode 7: Dual concentric rotation loops (Represents feedback cycle)
          const isOuter = i % 2 === 0;
          const centerX = w * 0.55;
          const centerY = h * 0.55;
          const cycleRadius = isOuter ? Math.min(w, h) * 0.32 : Math.min(w, h) * 0.18;
          p.angle += (isOuter ? 1 : -1.5) * p.speed * 0.004;

          targetX = centerX + Math.cos(p.angle) * cycleRadius;
          targetY = centerY + Math.sin(p.angle) * cycleRadius * 0.8;

        } else if (currentMode === "conclusion") {
          // Mode 8: Slow Falling Celebratory glitter (Color-shifting flakes)
          p.y += (p.vy || 1) * 0.4;
          p.x += Math.sin(p.angle + p.y * 0.01) * 0.3;
          if (p.y > h) {
            p.y = -10;
            p.x = Math.random() * w;
          }
          targetX = p.x;
          targetY = p.y;
        }

        // Interpolate current positions towards targets for smooth morph transitions
        // If it's a floating mode (initiation, tips, deployment, conclusion), update directly
        const isFreeFlow = ["initiation", "tips", "deployment", "conclusion"].includes(currentMode);
        if (isFreeFlow) {
          p.x = targetX;
          p.y = targetY;
        } else {
          p.x += (targetX - p.x) * 0.07;
          p.y += (targetY - p.y) * 0.07;
        }

        // Handle Mouse repulsion physics
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

        // Draw particle
        if (currentMode === "conclusion") {
          // Rainbow gold/pink/cyan shift
          p.hue = ((p.hue || 0) + 0.2) % 360;
          ctx.fillStyle = `hsla(${p.hue}, 80%, 75%, ${p.opacity})`;
        } else if (currentMode === "initiation") {
          ctx.fillStyle = p.color; // Emerald green
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
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
