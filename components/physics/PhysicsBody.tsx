"use client";

import { useRef, useEffect, useContext } from "react";
import { PhysicsContext } from "./PhysicsEngine";

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
  const physics = useContext(PhysicsContext);

  useEffect(() => {
    if (!physics || !elementRef.current) return;

    // Small delay to ensure layout is settled
    const timer = setTimeout(() => {
      if (elementRef.current) {
        physics.registerBody(id, elementRef.current, {
          density,
          restitution,
          friction,
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      physics.unregisterBody(id);
    };
  }, [id, physics, density, restitution, friction]);

  return (
    <div ref={elementRef} className={`physics-body ${className}`} data-physics-id={id}>
      {children}
    </div>
  );
}
