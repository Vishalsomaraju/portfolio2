"use client";

export function DevModeSystem() {
  // Stats.js or Leva for debugging ThreeJS scenes
  if (process.env.NODE_ENV !== "development") return null;
  return null;
}
