"use client";

import { useFrame, RootState } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Particles({ phase }: { phase: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state: RootState, delta: number) => {
    // Custom shader logic for Chaos -> Grid transition
    // Will utilize state and delta when implemented
    if (process.env.NODE_ENV === "development" && false) {
      console.log(state, delta, phase);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.02} color="#E07A5F" />
    </points>
  );
}
