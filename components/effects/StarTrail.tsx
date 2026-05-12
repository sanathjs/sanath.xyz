"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  age: number;
  maxAge: number;
  hue: number;
  twinkle: number;
}

export default function StarTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;
    let stars: Star[] = [];
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let rafId = 0;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);

    const spawnStar = (x: number, y: number, energy: number) => {
      // Spawn 1-3 stars per movement based on energy
      const count = Math.min(3, Math.max(1, Math.floor(energy / 8)));
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 20;
        stars.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          size: Math.random() * 2.5 + 0.8,
          age: 0,
          maxAge: 50 + Math.random() * 40,
          hue: 240 + Math.random() * 120, // purple → pink hue range
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      // Trail effect: fade previous frame slightly
      ctx.fillStyle = "rgba(6, 6, 15, 0.18)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      // Spawn stars based on mouse movement
      const dx = mouseX - lastMouseX;
      const dy = mouseY - lastMouseY;
      const energy = Math.sqrt(dx * dx + dy * dy);
      if (energy > 1 && mouseX > 0 && mouseY > 0) {
        spawnStar(mouseX, mouseY, energy);
      }
      lastMouseX = mouseX;
      lastMouseY = mouseY;

      // Update + render stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.age += 1;
        s.twinkle += 0.15;
        if (s.age > s.maxAge) {
          stars.splice(i, 1);
          continue;
        }
        const lifeRatio = s.age / s.maxAge;
        const alpha = (1 - lifeRatio) * (0.5 + 0.5 * Math.sin(s.twinkle));
        const size = s.size * (1 - lifeRatio * 0.3);

        // Star glow
        const gradient = ctx.createRadialGradient(
          s.x,
          s.y,
          0,
          s.x,
          s.y,
          size * 4
        );
        gradient.addColorStop(0, `hsla(${s.hue}, 90%, 75%, ${alpha})`);
        gradient.addColorStop(0.4, `hsla(${s.hue}, 90%, 65%, ${alpha * 0.3})`);
        gradient.addColorStop(1, `hsla(${s.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Star core (bright dot)
        ctx.fillStyle = `hsla(${s.hue}, 100%, 95%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point sparkle cross for larger stars
        if (s.size > 1.5) {
          const sparkleLen = size * 4 * alpha;
          ctx.strokeStyle = `hsla(${s.hue}, 100%, 90%, ${alpha * 0.8})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - sparkleLen, s.y);
          ctx.lineTo(s.x + sparkleLen, s.y);
          ctx.moveTo(s.x, s.y - sparkleLen);
          ctx.lineTo(s.x, s.y + sparkleLen);
          ctx.stroke();
        }
      }

      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
