"use client";

import { useRef, useEffect, useContext } from "react";
import { PhysicsActionsContext } from "./PhysicsEngine";

interface PhysicsBodyProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function PhysicsBody({
  id,
  children,
  className = "",
}: PhysicsBodyProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const physics = useContext(PhysicsActionsContext);

  const physicsRef = useRef(physics);
  physicsRef.current = physics;

  useEffect(() => {
    if (!elementRef.current) return;
    const timer = setTimeout(() => {
      const p = physicsRef.current;
      if (p && elementRef.current) {
        p.registerBody(id, elementRef.current);
      }
    }, 100);
    return () => {
      clearTimeout(timer);
      const p = physicsRef.current;
      if (p) p.unregisterBody(id);
    };
  }, [id]);

  return (
    <div ref={elementRef} className={className} data-physics-id={id}>
      {children}
    </div>
  );
}
