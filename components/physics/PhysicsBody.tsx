"use client";

import { useRef, useEffect, useContext } from "react";
import { PhysicsActionsContext } from "./PhysicsEngine";

interface PhysicsBodyProps {
  id: string;
  children: React.ReactNode;
  density?: number;
  restitution?: number;
  friction?: number;
  className?: string;
}

export default function PhysicsBody({
  id,
  children,
  density,
  restitution,
  friction,
  className = "",
}: PhysicsBodyProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const physics = useContext(PhysicsActionsContext);

  // Stable ref so the registration effect doesn't re-run when context renders
  const physicsRef = useRef(physics);
  physicsRef.current = physics;
  const optionsRef = useRef({ density, restitution, friction });
  optionsRef.current = { density, restitution, friction };

  useEffect(() => {
    if (!elementRef.current) return;

    const timer = setTimeout(() => {
      const p = physicsRef.current;
      if (p && elementRef.current) {
        p.registerBody(id, elementRef.current, optionsRef.current);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      const p = physicsRef.current;
      if (p) p.unregisterBody(id);
    };
  }, [id]);

  return (
    <div
      ref={elementRef}
      className={`physics-body ${className}`}
      data-physics-id={id}
    >
      {children}
    </div>
  );
}
