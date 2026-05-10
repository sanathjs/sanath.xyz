"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { usePhysicsWorld, PhysicsMode } from "./usePhysicsWorld";
import ModeToggle from "@/components/layout/ModeToggle";

// Stable actions — does not change across renders
interface PhysicsActions {
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
}

// Mode state — changes when user toggles
interface PhysicsModeState {
  mode: PhysicsMode;
  toggleMode: () => void;
}

export const PhysicsActionsContext = createContext<PhysicsActions | null>(null);
export const PhysicsModeContext = createContext<PhysicsModeState | null>(null);

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
      setShaking(true);
      setTimeout(() => setShaking(false), 300);
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      document.body.style.overflow = "";
    }

    setModeState(newMode);
    setMode(newMode);
  }, [setMode, getMode]);

  // Memoize so PhysicsBody useEffect deps don't churn on every render
  const actionsValue = useMemo<PhysicsActions>(
    () => ({ registerBody, unregisterBody }),
    [registerBody, unregisterBody]
  );

  const modeValue = useMemo<PhysicsModeState>(
    () => ({ mode, toggleMode }),
    [mode, toggleMode]
  );

  return (
    <PhysicsActionsContext.Provider value={actionsValue}>
      <PhysicsModeContext.Provider value={modeValue}>
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
      </PhysicsModeContext.Provider>
    </PhysicsActionsContext.Provider>
  );
}
