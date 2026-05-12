"use client";

import {
  createContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Matter from "matter-js";
import ModeToggle from "@/components/layout/ModeToggle";

export type PhysicsMode = "static" | "antigravity";

interface BodyEntry {
  body: Matter.Body;
  element: HTMLElement;
  origX: number;
  origY: number;
  scale: number; // visual scale applied during antigravity
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

interface PhysicsEngineProps {
  children: React.ReactNode;
}

export default function PhysicsEngine({ children }: PhysicsEngineProps) {
  const [mode, setModeState] = useState<PhysicsMode>("static");
  const [shaking, setShaking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const wallsRef = useRef<Matter.Body[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const mouseRef = useRef<Matter.Mouse | null>(null);
  const registryRef = useRef<Map<string, BodyEntry>>(new Map());
  const modeRef = useRef<PhysicsMode>("static");
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const h = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  // Init Matter.js engine
  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 }, // gravity off until antigravity mode
      positionIterations: 8,
      velocityIterations: 8,
    });
    engineRef.current = engine;

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    const buildWalls = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = 100;

      if (wallsRef.current.length > 0) {
        Matter.Composite.remove(engine.world, wallsRef.current);
      }
      const walls = [
        Matter.Bodies.rectangle(w / 2, -t / 2, w + t * 2, t, { isStatic: true }),
        Matter.Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, {
          isStatic: true,
          friction: 0.8,
        }),
        Matter.Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, { isStatic: true }),
        Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, {
          isStatic: true,
        }),
      ];
      wallsRef.current = walls;
      Matter.Composite.add(engine.world, walls);
    };
    buildWalls();

    const onResize = () => buildWalls();
    window.addEventListener("resize", onResize);

    // rAF sync loop - applies body transforms to DOM elements
    const sync = () => {
      if (modeRef.current === "antigravity") {
        registryRef.current.forEach((entry) => {
          if (entry.body.isStatic) return;
          const dx = entry.body.position.x - entry.origX;
          const dy = entry.body.position.y - entry.origY;
          const deg = entry.body.angle * (180 / Math.PI);
          entry.element.style.transform = `translate3d(${dx}px, ${dy}px, 0) rotate(${deg}deg) scale(${entry.scale})`;
          entry.element.style.zIndex = "10";
        });
      }
      rafRef.current = requestAnimationFrame(sync);
    };
    rafRef.current = requestAnimationFrame(sync);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  const registerBody = useCallback((id: string, element: HTMLElement) => {
    if (registryRef.current.has(id)) return;
    const engine = engineRef.current;
    if (!engine) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Cap body dimensions so cards have room to fall + stack
    // Visual stays full size; physics box is smaller
    const bodyW = Math.min(rect.width * 0.7, 480);
    const bodyH = Math.min(rect.height * 0.5, 200);

    const body = Matter.Bodies.rectangle(
      centerX,
      centerY,
      Math.max(bodyW, 60),
      Math.max(bodyH, 40),
      {
        isStatic: true,
        density: 0.002,
        restitution: 0.4,
        friction: 0.4,
        frictionAir: 0.015,
        // Inertia is auto-calculated; we can set very high inertia to resist rotation
      }
    );

    // Custom inertia: make rotation sluggish so text stays readable
    Matter.Body.setInertia(body, body.inertia * 4);

    Matter.Composite.add(engine.world, body);
    registryRef.current.set(id, {
      body,
      element,
      origX: centerX,
      origY: centerY,
      scale: 1,
    });
  }, []);

  const unregisterBody = useCallback((id: string) => {
    const engine = engineRef.current;
    const entry = registryRef.current.get(id);
    if (!engine || !entry) return;
    Matter.Composite.remove(engine.world, entry.body);
    registryRef.current.delete(id);
  }, []);

  const attachMouse = useCallback(() => {
    const engine = engineRef.current;
    const container = canvasRef.current;
    if (!engine || !container || mouseConstraintRef.current) return;

    const mouse = Matter.Mouse.create(container);
    mouse.pixelRatio = window.devicePixelRatio || 1;
    mouseRef.current = mouse;

    const mc = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        damping: 0.1,
        render: { visible: false },
      },
    });
    mouseConstraintRef.current = mc;
    Matter.Composite.add(engine.world, mc);
  }, []);

  const detachMouse = useCallback(() => {
    const engine = engineRef.current;
    if (!engine || !mouseConstraintRef.current || !mouseRef.current) return;
    Matter.Composite.remove(engine.world, mouseConstraintRef.current);
    const m = mouseRef.current as Matter.Mouse & {
      mousemove: EventListener;
      mousedown: EventListener;
      mouseup: EventListener;
    };
    const elem = m.element as HTMLElement;
    elem.removeEventListener("mousemove", m.mousemove);
    elem.removeEventListener("mousedown", m.mousedown);
    elem.removeEventListener("mouseup", m.mouseup);
    elem.removeEventListener("touchmove", m.mousemove);
    elem.removeEventListener("touchstart", m.mousedown);
    elem.removeEventListener("touchend", m.mouseup);
    mouseConstraintRef.current = null;
    mouseRef.current = null;
  }, []);

  const toggleMode = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const newMode = modeRef.current === "static" ? "antigravity" : "static";
    modeRef.current = newMode;

    if (newMode === "antigravity") {
      setShaking(true);
      setTimeout(() => setShaking(false), 400);
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "instant" });

      // Wait a tick so scrollTo + body styles settle, then start physics
      setTimeout(() => {
        engine.gravity.x = 0;
        engine.gravity.y = 1;
        attachMouse();

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const margin = 30;

        // Compact scale to make readable when stacked
        const scaleForViewport = (rect: DOMRect) => {
          const wRatio = rect.width / vw;
          const hRatio = rect.height / vh;
          // Target: no body wider than 50% of viewport or taller than 30%
          const wScale = wRatio > 0.5 ? 0.5 / wRatio : 1;
          const hScale = hRatio > 0.3 ? 0.3 / hRatio : 1;
          return Math.min(wScale, hScale, 1);
        };

        registryRef.current.forEach((entry, id) => {
          // Reset transform to get true layout rect
          const prev = entry.element.style.transform;
          entry.element.style.transform = "";
          const rect = entry.element.getBoundingClientRect();
          entry.element.style.transform = prev;

          // Decide scale based on size
          let scale = scaleForViewport(rect);
          // Apply slightly more aggressive scale for variety
          if (id.startsWith("exp-")) scale = Math.min(scale, 0.45);

          entry.scale = scale;

          // Layout center (where element sits without transform)
          const layoutX = rect.left + rect.width / 2;
          const layoutY = rect.top + rect.height / 2;
          entry.origX = layoutX;
          entry.origY = layoutY;

          // Update body dimensions to match scaled size
          const newW = Math.max(80, Math.min(rect.width * scale * 0.85, 500));
          const newH = Math.max(50, Math.min(rect.height * scale * 0.55, 200));

          // Recreate body with new dimensions (can't easily resize Matter body)
          Matter.Composite.remove(engine.world, entry.body);
          const newBody = Matter.Bodies.rectangle(0, 0, newW, newH, {
            density: 0.002,
            restitution: 0.4,
            friction: 0.4,
            frictionAir: 0.015,
          });
          Matter.Body.setInertia(newBody, newBody.inertia * 4);

          // Random spawn across the viewport (top portion)
          const halfW = newW / 2;
          const halfH = newH / 2;
          const spawnX =
            margin + halfW + Math.random() * (vw - 2 * margin - newW);
          const spawnY =
            margin + halfH + Math.random() * (vh * 0.4 - newH);

          Matter.Body.setPosition(newBody, { x: spawnX, y: spawnY });
          Matter.Body.setAngle(newBody, (Math.random() - 0.5) * 0.4);
          Matter.Body.setVelocity(newBody, {
            x: (Math.random() - 0.5) * 4,
            y: -1 + Math.random() * 2,
          });
          Matter.Body.setAngularVelocity(newBody, (Math.random() - 0.5) * 0.04);

          Matter.Composite.add(engine.world, newBody);
          entry.body = newBody;
          entry.element.style.willChange = "transform";
        });
      }, 50);
    } else {
      // Return to static — reassemble bodies to layout positions
      engine.gravity.x = 0;
      engine.gravity.y = 0;
      detachMouse();

      registryRef.current.forEach((entry) => {
        const body = entry.body;
        const animate = () => {
          if (modeRef.current !== "static") return;
          const dx = entry.origX - body.position.x;
          const dy = entry.origY - body.position.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 4 && Math.abs(body.angle) < 0.02) {
            Matter.Body.setStatic(body, true);
            Matter.Body.setPosition(body, { x: entry.origX, y: entry.origY });
            Matter.Body.setAngle(body, 0);
            entry.element.style.transform = "";
            entry.element.style.zIndex = "";
            entry.element.style.willChange = "";
            return;
          }

          Matter.Body.applyForce(body, body.position, {
            x: dx * 0.0008,
            y: dy * 0.0008,
          });
          // Strong damping for smooth approach
          Matter.Body.setVelocity(body, {
            x: body.velocity.x * 0.85,
            y: body.velocity.y * 0.85,
          });
          // Rotate angle toward 0
          const angleToZero = -body.angle * 0.1;
          Matter.Body.setAngularVelocity(body, angleToZero);

          requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      });

      // Re-enable scroll after reassembly window
      setTimeout(() => {
        if (modeRef.current === "static") {
          document.body.style.overflow = "";
        }
      }, 800);
    }

    setModeState(newMode);
  }, [attachMouse, detachMouse]);

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
