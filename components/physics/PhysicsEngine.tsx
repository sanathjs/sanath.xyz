"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import ModeToggle from "@/components/layout/ModeToggle";

export type PhysicsMode = "static" | "antigravity";

interface DropBody {
  el: HTMLElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  va: number;
  width: number;
  height: number;
  origX: number;
  origY: number;
  isDragging: boolean;
  dragStartX: number;
  dragStartY: number;
  dragPrevX: number;
  dragPrevY: number;
}

interface PhysicsActions {
  registerBody: (id: string, element: HTMLElement) => void;
  unregisterBody: (id: string) => void;
}

interface PhysicsModeState {
  mode: PhysicsMode;
  toggleMode: () => void;
}

export const PhysicsActionsContext = createContext<PhysicsActions | null>(null);
export const PhysicsModeContext = createContext<PhysicsModeState | null>(null);

const GRAVITY = 0.6;
const FRICTION = 0.985;
const RESTITUTION = 0.55;
const ANGULAR_FRICTION = 0.97;

interface PhysicsEngineProps {
  children: React.ReactNode;
}

export default function PhysicsEngine({ children }: PhysicsEngineProps) {
  const [mode, setModeState] = useState<PhysicsMode>("static");
  const [shaking, setShaking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const bodiesRef = useRef<Map<string, DropBody>>(new Map());
  const modeRef = useRef<PhysicsMode>("static");
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const draggedRef = useRef<DropBody | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const registerBody = useCallback((id: string, element: HTMLElement) => {
    if (bodiesRef.current.has(id)) return;
    bodiesRef.current.set(id, {
      el: element,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      angle: 0,
      va: 0,
      width: 0,
      height: 0,
      origX: 0,
      origY: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartY: 0,
      dragPrevX: 0,
      dragPrevY: 0,
    });
  }, []);

  const unregisterBody = useCallback((id: string) => {
    bodiesRef.current.delete(id);
  }, []);

  // Drag handlers
  useEffect(() => {
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (modeRef.current !== "antigravity") return;
      const point = "touches" in e ? e.touches[0] : e;
      const target = e.target as HTMLElement;
      // Find which body this target belongs to
      let bodyForTarget: DropBody | null = null;
      for (const body of bodiesRef.current.values()) {
        if (body.el.contains(target)) {
          bodyForTarget = body;
          break;
        }
      }
      if (!bodyForTarget) return;

      bodyForTarget.isDragging = true;
      bodyForTarget.vx = 0;
      bodyForTarget.vy = 0;
      bodyForTarget.dragStartX = point.clientX;
      bodyForTarget.dragStartY = point.clientY;
      bodyForTarget.dragPrevX = point.clientX;
      bodyForTarget.dragPrevY = point.clientY;
      draggedRef.current = bodyForTarget;
      mousePosRef.current = { x: point.clientX, y: point.clientY };
      e.preventDefault();
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (modeRef.current !== "antigravity" || !draggedRef.current) return;
      const point = "touches" in e ? e.touches[0] : e;
      const body = draggedRef.current;
      const dx = point.clientX - mousePosRef.current.x;
      const dy = point.clientY - mousePosRef.current.y;
      body.x += dx;
      body.y += dy;
      body.dragPrevX = mousePosRef.current.x;
      body.dragPrevY = mousePosRef.current.y;
      mousePosRef.current = { x: point.clientX, y: point.clientY };
    };

    const onUp = (e: MouseEvent | TouchEvent) => {
      if (modeRef.current !== "antigravity" || !draggedRef.current) return;
      const body = draggedRef.current;
      const point = "changedTouches" in e ? e.changedTouches[0] : e as MouseEvent;
      // Velocity from final drag motion
      body.vx = (point.clientX - body.dragPrevX) * 0.5;
      body.vy = (point.clientY - body.dragPrevY) * 0.5;
      body.va = (Math.random() - 0.5) * 0.2;
      body.isDragging = false;
      draggedRef.current = null;
    };

    window.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchstart", onDown, { passive: false });
    window.addEventListener("touchmove", onMove);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  // Physics tick
  useEffect(() => {
    const tick = () => {
      if (modeRef.current === "antigravity") {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        bodiesRef.current.forEach((body) => {
          if (body.isDragging) {
            // No physics during drag; position controlled by mouse handler
            body.angle += body.va * 0.5;
          } else {
            // Apply gravity
            body.vy += GRAVITY;
            // Apply friction (air drag)
            body.vx *= FRICTION;
            body.vy *= FRICTION;
            body.va *= ANGULAR_FRICTION;
            // Integrate
            body.x += body.vx;
            body.y += body.vy;
            body.angle += body.va;

            // Bounce off walls
            const halfW = body.width / 2;
            const halfH = body.height / 2;

            if (body.y + halfH > vh) {
              body.y = vh - halfH;
              body.vy = -body.vy * RESTITUTION;
              body.vx *= 0.9;
              body.va += (Math.random() - 0.5) * 0.1;
              // Stop micro-bouncing
              if (Math.abs(body.vy) < 0.5) body.vy = 0;
            }
            if (body.y - halfH < 0) {
              body.y = halfH;
              body.vy = -body.vy * RESTITUTION;
            }
            if (body.x - halfW < 0) {
              body.x = halfW;
              body.vx = -body.vx * RESTITUTION;
              body.va += (Math.random() - 0.5) * 0.05;
            }
            if (body.x + halfW > vw) {
              body.x = vw - halfW;
              body.vx = -body.vx * RESTITUTION;
              body.va += (Math.random() - 0.5) * 0.05;
            }
          }

          // Apply transform
          const dx = body.x - body.origX;
          const dy = body.y - body.origY;
          body.el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${body.angle}rad)`;
          body.el.style.zIndex = body.isDragging ? "100" : "10";
          body.el.style.cursor = body.isDragging ? "grabbing" : "grab";
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const toggleMode = useCallback(() => {
    const newMode = modeRef.current === "static" ? "antigravity" : "static";
    modeRef.current = newMode;

    if (newMode === "antigravity") {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "instant" });

      // Initialize each body at its current layout position
      setTimeout(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        bodiesRef.current.forEach((body) => {
          body.el.style.transform = "";
          const rect = body.el.getBoundingClientRect();
          body.width = Math.min(rect.width, 400);
          body.height = Math.min(rect.height, 180);
          body.origX = rect.left + rect.width / 2;
          body.origY = rect.top + rect.height / 2;
          // Start at layout position OR random if off-screen
          const inView =
            rect.top >= 0 && rect.bottom <= vh && rect.left >= 0 && rect.right <= vw;
          if (inView) {
            body.x = body.origX;
            body.y = body.origY;
          } else {
            const halfW = body.width / 2;
            const halfH = body.height / 2;
            body.x = halfW + Math.random() * (vw - 2 * halfW);
            body.y = halfH + Math.random() * (vh / 3);
          }
          // Initial impulse for an immediate visible drop
          body.vx = (Math.random() - 0.5) * 12;
          body.vy = -10 + Math.random() * 4;
          body.angle = (Math.random() - 0.5) * 0.4;
          body.va = (Math.random() - 0.5) * 0.15;
          body.isDragging = false;

          body.el.style.position = "relative";
          body.el.style.willChange = "transform";
        });
      }, 50);
    } else {
      // Animate back to original positions
      const startTime = performance.now();
      const duration = 600;
      const startStates = new Map<string, { sx: number; sy: number; sa: number }>();
      bodiesRef.current.forEach((body, id) => {
        startStates.set(id, { sx: body.x, sy: body.y, sa: body.angle });
      });

      const animate = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);

        bodiesRef.current.forEach((body, id) => {
          const start = startStates.get(id);
          if (!start) return;
          body.x = start.sx + (body.origX - start.sx) * eased;
          body.y = start.sy + (body.origY - start.sy) * eased;
          body.angle = start.sa + (0 - start.sa) * eased;
          body.vx = 0;
          body.vy = 0;
          body.va = 0;

          const dx = body.x - body.origX;
          const dy = body.y - body.origY;
          body.el.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${body.angle}rad)`;
        });

        if (t < 1 && modeRef.current === "static") {
          requestAnimationFrame(animate);
        } else if (modeRef.current === "static") {
          // Snap and clear
          bodiesRef.current.forEach((body) => {
            body.el.style.transform = "";
            body.el.style.zIndex = "";
            body.el.style.cursor = "";
            body.el.style.willChange = "";
          });
          document.body.style.overflow = "";
        }
      };
      requestAnimationFrame(animate);
    }

    setModeState(newMode);
  }, []);

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
