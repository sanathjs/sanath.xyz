"use client";

import { useRef, useCallback, useEffect } from "react";
import Matter from "matter-js";
import { PHYSICS_CONFIG } from "@/lib/physics-config";

export type PhysicsMode = "static" | "antigravity";

interface BodyRegistration {
  body: Matter.Body;
  element: HTMLElement;
}

interface PhysicsWorld {
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
  setMode: (mode: PhysicsMode) => void;
  getMode: () => PhysicsMode;
  engineRef: React.MutableRefObject<Matter.Engine | null>;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

export function usePhysicsWorld(): PhysicsWorld {
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const registryRef = useRef<Map<string, BodyRegistration>>(new Map());
  const wallsRef = useRef<Matter.Body[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const mouseRef = useRef<Matter.Mouse | null>(null);
  const modeRef = useRef<PhysicsMode>("static");
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Initialize engine + walls + rAF sync loop
  useEffect(() => {
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 },
    });
    engineRef.current = engine;

    const runner = Matter.Runner.create();
    runnerRef.current = runner;
    Matter.Runner.run(runner, engine);

    const updateWalls = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = PHYSICS_CONFIG.wallThickness;

      if (wallsRef.current.length > 0) {
        Matter.Composite.remove(engine.world, wallsRef.current);
      }

      const walls = [
        // Top
        Matter.Bodies.rectangle(w / 2, -t / 2, w + t * 2, t, {
          isStatic: true,
          render: { visible: false },
        }),
        // Bottom (floor)
        Matter.Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, {
          isStatic: true,
          render: { visible: false },
        }),
        // Left
        Matter.Bodies.rectangle(-t / 2, h / 2, t, h + t * 2, {
          isStatic: true,
          render: { visible: false },
        }),
        // Right
        Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + t * 2, {
          isStatic: true,
          render: { visible: false },
        }),
      ];

      wallsRef.current = walls;
      Matter.Composite.add(engine.world, walls);
    };

    updateWalls();

    const handleResize = () => updateWalls();
    window.addEventListener("resize", handleResize);

    // Sync physics body positions to DOM transforms (only for non-static bodies)
    const syncDom = () => {
      registryRef.current.forEach(({ body, element }) => {
        if (body.isStatic) return;

        const origX = parseFloat(element.dataset.origX || "0");
        const origY = parseFloat(element.dataset.origY || "0");

        const dx = body.position.x - origX;
        const dy = body.position.y - origY;
        const angle = body.angle;

        element.style.transform = `translate(${dx}px, ${dy}px) rotate(${angle}rad)`;
        element.style.zIndex = "10";
      });
      rafRef.current = requestAnimationFrame(syncDom);
    };
    rafRef.current = requestAnimationFrame(syncDom);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
    };
  }, []);

  // Attach Matter.Mouse only when entering antigravity mode (so it doesn't
  // intercept events on the resume in read mode)
  const attachMouseConstraint = useCallback(() => {
    const engine = engineRef.current;
    const container = canvasRef.current;
    if (!engine || !container) return;
    if (mouseConstraintRef.current) return;

    const mouse = Matter.Mouse.create(container);
    mouse.pixelRatio = window.devicePixelRatio || 1;
    mouseRef.current = mouse;

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: PHYSICS_CONFIG.mouseStiffness,
        damping: PHYSICS_CONFIG.mouseDamping,
        render: { visible: false },
      },
    });

    mouseConstraintRef.current = mouseConstraint;
    Matter.Composite.add(engine.world, mouseConstraint);
  }, []);

  const detachMouseConstraint = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (!mouseConstraintRef.current || !mouseRef.current) return;

    Matter.Composite.remove(engine.world, mouseConstraintRef.current);

    // Manually remove Matter.Mouse event listeners to free up scroll/touch.
    // Matter.js types don't expose these handler refs, so we cast.
    const mouse = mouseRef.current as Matter.Mouse & {
      mousemove: EventListener;
      mousedown: EventListener;
      mouseup: EventListener;
      mousewheel?: EventListener;
    };
    const elem = mouse.element as HTMLElement;
    elem.removeEventListener("mousemove", mouse.mousemove);
    elem.removeEventListener("mousedown", mouse.mousedown);
    elem.removeEventListener("mouseup", mouse.mouseup);
    elem.removeEventListener("touchmove", mouse.mousemove);
    elem.removeEventListener("touchstart", mouse.mousedown);
    elem.removeEventListener("touchend", mouse.mouseup);
    if (mouse.mousewheel) {
      elem.removeEventListener("mousewheel", mouse.mousewheel);
      elem.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    }

    mouseConstraintRef.current = null;
    mouseRef.current = null;
  }, []);

  const registerBody = useCallback(
    (
      id: string,
      element: HTMLElement,
      options?: {
        density?: number;
        restitution?: number;
        friction?: number;
      }
    ) => {
      const engine = engineRef.current;
      if (!engine) return;
      if (registryRef.current.has(id)) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Cap physics body size aggressively so tall cards have room to fall
      // and bounce. The visual element remains its natural size; only the
      // collision shape is smaller.
      const maxBodyW = Math.min(vw * 0.6, 500);
      const maxBodyH = Math.min(vh * 0.3, 250);

      const body = Matter.Bodies.rectangle(
        centerX,
        centerY,
        Math.min(Math.max(rect.width, 20), maxBodyW),
        Math.min(Math.max(rect.height, 20), maxBodyH),
        {
          isStatic: true,
          density: options?.density ?? PHYSICS_CONFIG.density.card,
          restitution:
            options?.restitution ?? PHYSICS_CONFIG.defaultRestitution,
          friction: options?.friction ?? PHYSICS_CONFIG.defaultFriction,
          frictionAir: PHYSICS_CONFIG.defaultFrictionAir,
          render: { visible: false },
        }
      );

      Matter.Composite.add(engine.world, body);
      registryRef.current.set(id, { body, element });
    },
    []
  );

  const unregisterBody = useCallback((id: string) => {
    const engine = engineRef.current;
    const reg = registryRef.current.get(id);
    if (!engine || !reg) return;

    Matter.Composite.remove(engine.world, reg.body);
    registryRef.current.delete(id);
  }, []);

  const setMode = useCallback(
    (mode: PhysicsMode) => {
      const engine = engineRef.current;
      if (!engine) return;

      modeRef.current = mode;

      if (mode === "antigravity") {
        // Real downward gravity — elements fall like Google Antigravity.
        // Boost y > 1 for a more noticeable drop on a small physics canvas.
        engine.gravity.x = 0;
        engine.gravity.y = 1.5;

        // Attach mouse only now, so static mode doesn't have event listeners
        attachMouseConstraint();

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        registryRef.current.forEach(({ body, element }) => {
          // Read element's true layout position (transform-free)
          const prevTransform = element.style.transform;
          element.style.transform = "";
          const rect = element.getBoundingClientRect();
          element.style.transform = prevTransform;

          const layoutX = rect.left + rect.width / 2;
          const layoutY = rect.top + rect.height / 2;
          element.dataset.origX = String(layoutX);
          element.dataset.origY = String(layoutY);

          // Place each body at its CURRENT visible position so they fall
          // from where they sit. If element is below the viewport (because
          // we scrolled to top before locking), spawn it at a random spot
          // in the upper portion of the viewport so the user can see it fall.
          let targetX: number;
          let targetY: number;

          const inViewport =
            rect.top >= 0 &&
            rect.bottom <= vh &&
            rect.left >= 0 &&
            rect.right <= vw;

          // Always spawn at a random position spread across the viewport.
          // Use the (smaller) physics body dimensions to compute safe bounds
          // so the body doesn't intersect the walls and get stuck.
          const margin = 40;
          // Use the body's bounds (already clamped to small max) for spawn calc
          const bodyHalfW = (body.bounds.max.x - body.bounds.min.x) / 2;
          const bodyHalfH = (body.bounds.max.y - body.bounds.min.y) / 2;
          const minX = margin + bodyHalfW;
          const maxX = vw - margin - bodyHalfW;
          const minY = margin + bodyHalfH;
          const maxY = vh - margin - bodyHalfH;

          if (inViewport) {
            // Visible elements: keep them roughly where they are with a
            // small nudge, but clamp to safe spawn bounds.
            targetX = Math.max(minX, Math.min(maxX, layoutX));
            targetY = Math.max(minY, Math.min(maxY, layoutY));
          } else {
            // Off-screen elements: random spot across the whole viewport.
            targetX = minX + Math.random() * Math.max(0, maxX - minX);
            targetY = minY + Math.random() * Math.max(0, maxY - minY);
          }

          Matter.Body.setPosition(body, { x: targetX, y: targetY });
          Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.2);
          Matter.Body.setStatic(body, false);

          // Give each body an initial random velocity so the drop looks
          // immediately alive instead of starting from a dead stop.
          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 6,
            y: (Math.random() - 0.5) * 4,
          });
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);
        });
      } else {
        // Re-entering static mode: turn gravity off, reassemble
        engine.gravity.x = 0;
        engine.gravity.y = 0;
        detachMouseConstraint();

        registryRef.current.forEach(({ body, element }) => {
          const origX = parseFloat(element.dataset.origX || "0");
          const origY = parseFloat(element.dataset.origY || "0");

          const reassemble = () => {
            if (modeRef.current !== "static") return;

            const dx = origX - body.position.x;
            const dy = origY - body.position.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < PHYSICS_CONFIG.snapThreshold) {
              Matter.Body.setStatic(body, true);
              Matter.Body.setPosition(body, { x: origX, y: origY });
              Matter.Body.setAngle(body, 0);
              element.style.transform = "";
              element.style.zIndex = "";
              return;
            }

            Matter.Body.applyForce(body, body.position, {
              x: dx * PHYSICS_CONFIG.reassemblyStiffness,
              y: dy * PHYSICS_CONFIG.reassemblyStiffness,
            });

            Matter.Body.setVelocity(body, {
              x: body.velocity.x * 0.9,
              y: body.velocity.y * 0.9,
            });
            Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.85);

            requestAnimationFrame(reassemble);
          };

          reassemble();
        });
      }
    },
    [attachMouseConstraint, detachMouseConstraint]
  );

  const getMode = useCallback(() => modeRef.current, []);

  return {
    registerBody,
    unregisterBody,
    setMode,
    getMode,
    engineRef,
    canvasRef,
  };
}
