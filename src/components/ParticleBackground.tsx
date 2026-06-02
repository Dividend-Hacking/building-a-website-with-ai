"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  density: number;
  angle: number;
  speed: number;
  radius: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 1200; // Dense look as shown in screenshot

    // Mouse coordinates
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120, // Interaction radius
    };

    // Handle Resize
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      initParticles();
    };

    // Initialize Particles in a cosmic dust cloud/ring structure
    const initParticles = () => {
      particles = [];
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width * 0.65; // Positioned offset to the right as in screenshot
      const centerY = height * 0.5;
      
      // Let's create an organic shape (a torus/ring of stardust with some noise)
      for (let i = 0; i < particleCount; i++) {
        // Distribute particles in a spiral / donut shape
        const angle = Math.random() * Math.PI * 2;
        
        // Form a primary cloud ring
        const isCore = Math.random() > 0.3;
        const ringRadius = isCore 
          ? (Math.min(width, height) * 0.25) + (Math.random() - 0.5) * 80
          : (Math.min(width, height) * 0.35) + (Math.random() - 0.5) * 200;

        // Coordinates based on ring distribution
        const x = centerX + Math.cos(angle) * ringRadius + (Math.random() - 0.5) * 60;
        const y = centerY + Math.sin(angle) * ringRadius * 0.9 + (Math.random() - 0.5) * 60;

        // Base coordinates for mouse interaction reference
        const baseX = x;
        const baseY = y;

        // Particle traits
        const size = Math.random() * 1.2 + 0.3; // Tiny dust-like particles
        const density = (Math.random() * 30) + 10;
        const speed = Math.random() * 0.2 + 0.05;
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Vary colors slightly between pure white and subtle soft silver-blue
        const colors = [
          "rgba(255, 255, 255,",
          "rgba(240, 240, 250,",
          "rgba(220, 225, 240,",
          "rgba(255, 253, 245," // warm stardust
        ];
        const colorBase = colors[Math.floor(Math.random() * colors.length)];
        const color = `${colorBase}${opacity})`;

        particles.push({
          x,
          y,
          baseX,
          baseY,
          size,
          density,
          angle,
          speed,
          radius: ringRadius,
          opacity,
          color,
        });
      }
    };

    // Track Mouse
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Draw background noise texture (subtle)
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // 1. Natural slow orbiting/drifting motion
        p.angle += p.speed * 0.005;
        
        // Recalculate original position in circular pattern
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width * 0.65;
        const centerY = height * 0.5;

        // Slowly swirl the baseX/Y to simulate a rotating nebula
        const targetBaseX = centerX + Math.cos(p.angle) * p.radius;
        const targetBaseY = centerY + Math.sin(p.angle) * p.radius * 0.9;
        
        // Move actual bases slowly to make it feel alive
        p.baseX += (targetBaseX - p.baseX) * 0.05;
        p.baseY += (targetBaseY - p.baseY) * 0.05;

        // 2. Mouse interaction physics (repel or attract gently)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            // Push particles away slightly from cursor
            const forceDirectionX = directionX * force * p.density * 0.8;
            const forceDirectionY = directionY * force * p.density * 0.8;
            
            p.x -= forceDirectionX;
            p.y -= forceDirectionY;
          } else {
            // Return particles to their base orbiting paths
            p.x += (p.baseX - p.x) * 0.08;
            p.y += (p.baseY - p.y) * 0.08;
          }
        } else {
          // Return particles to base orbiting path when mouse is gone
          p.x += (p.baseX - p.x) * 0.08;
          p.y += (p.baseY - p.y) * 0.08;
        }

        // Draw particle
        ctx.fillStyle = p.color;
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

    // Initial setup
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
        background: "radial-gradient(circle at 65% 50%, rgba(15, 15, 25, 0.4) 0%, rgba(0, 0, 0, 1) 70%)"
      }}
    />
  );
}
