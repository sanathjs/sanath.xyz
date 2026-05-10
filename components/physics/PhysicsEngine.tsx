"use client";

import { createContext, useState, useCallback, useEffect } from "react";
import { usePhysicsWorld, PhysicsMode } from "./usePhysicsWorld";
import ModeToggle from "@/components/layout/ModeToggle";

interface PhysicsContextType {
  registerBody: (
    id: string,
    element: HTMLElement,
    options?: {
      density?: number;
      restitution?: number;
      friction?: number;
    }
  ) => void;
  unregisterBody: (id: string) => void;
  mode: PhysicsMode;
  toggleMode: () => void;
}

export const PhysicsContext = createContext<PhysicsContextType | null>(null);

interface PhysicsEngineProps {
  children: React.ReactNode;
}

export default function PhysicsEngine({ children }: PhysicsEngineProps) {
  const { registerBody, unregisterBody, setMode, getMode, canvasRef } =
    usePhysicsWorld();
  const [mode, setModeState] = useState<PhysicsMode>("static");
  const [shaking, setShaking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleMode = useCallback(() => {
    const currentMode = getMode();
    const newMode = currentMode === "static" ? "antigravity" : "static";

    if (newMode === "antigravity") {
      // Screen shake before transition
      setShaking(true);
      setTimeout(() => setShaking(false), 300);

      // Disable scrolling
      document.body.style.overflow = "hidden";
      // Scroll to top first
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      // Re-enable scrolling
      document.body.style.overflow = "";
    }

    setModeState(newMode);
    setMode(newMode);
  }, [setMode, getMode]);

  const contextValue: PhysicsContextType = {
    registerBody,
    unregisterBody,
    mode,
    toggleMode,
  };

  return (
    <PhysicsContext.Provider value={contextValue}>
      <div
        ref={canvasRef}
        className={`relative ${shaking ? "screen-shake" : ""}`}
        style={{
          minHeight: mode === "antigravity" ? "100vh" : undefined,
          height: mode === "antigravity" ? "100vh" : undefined,
          overflow: mode === "antigravity" ? "hidden" : undefined,
        }}
      >
        {children}
        {!prefersReducedMotion && (
          <ModeToggle mode={mode} onToggle={toggleMode} />
        )}
      </div>
    </PhysicsContext.Provider>
  );
}
