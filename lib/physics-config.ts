export const PHYSICS_CONFIG = {
  // Gravity
  defaultGravity: { x: 0, y: 1 },
  antigravityGravity: { x: 0, y: 0 },

  // Body defaults
  defaultRestitution: 0.6,
  defaultFriction: 0.3,
  defaultFrictionAir: 0.02,

  // Body densities by type
  density: {
    hero: 0.008,
    card: 0.004,
    skillTag: 0.001,
  },

  // Scatter force range
  scatterForce: {
    min: -0.05,
    max: 0.05,
  },

  // Initial upward impulse when entering antigravity
  upwardImpulse: -0.03,

  // Wall thickness
  wallThickness: 60,

  // Reassembly spring stiffness
  reassemblyStiffness: 0.01,

  // Snap threshold for reassembly (px)
  snapThreshold: 5,

  // Mouse constraint
  mouseStiffness: 0.1,
  mouseDamping: 0.05,
} as const;
