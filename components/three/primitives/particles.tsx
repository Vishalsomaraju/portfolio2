"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Particles({ phase }: { phase: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    // Custom shader logic for Chaos -> Grid transition
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial size={0.02} color="#E07A5F" />
    </points>
  );
}
