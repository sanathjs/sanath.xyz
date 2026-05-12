"use client";

import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base dark layer */}
      <div className="absolute inset-0 bg-[#06060f]" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-orb-1"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(139,92,246,0) 70%)",
            top: "10%",
            left: "10%",
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] rounded-full opacity-25 blur-[120px] animate-orb-2"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)",
            top: "40%",
            right: "10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-25 blur-[120px] animate-orb-3"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%)",
            bottom: "10%",
            left: "30%",
          }}
        />
        <div
          className="absolute w-[450px] h-[450px] rounded-full opacity-20 blur-[100px] animate-orb-4"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.7) 0%, rgba(34,211,238,0) 70%)",
            top: "60%",
            left: "5%",
          }}
        />
      </div>

      {/* Mouse-follow glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[100px] transition-transform duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(168,85,247,0) 70%)",
          left: `calc(${mousePos.x}% - 250px)`,
          top: `calc(${mousePos.y}% - 250px)`,
          pointerEvents: "none",
        }}
      />

      {/* Grid overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Noise texture for film grain feel */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </div>
  );
}
