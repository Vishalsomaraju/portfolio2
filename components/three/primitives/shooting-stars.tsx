"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null);
  
  // Use a ref for the timer so it persists across frames without React state updates
  const timer = useRef(0);

  useFrame(() => {
    if (!ref.current) return;

    timer.current += 0.01;

    // random trigger - keep it rare (0.002 per frame is roughly 1 shot every ~8 seconds at 60fps)
    if (Math.random() < 0.002) {
      ref.current.position.set(
        (Math.random() - 0.5) * 8, // x
        (Math.random() - 0.5) * 5, // y
        -2 // slightly behind
      );
      timer.current = 0;
    }

    // movement: shooting downwards/right
    ref.current.position.x += 0.1;
    ref.current.position.y -= 0.05;

    // fade out
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = Math.max(0, 1 - timer.current * 2); // fades faster
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[0.3, 0.015]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0}
      />
    </mesh>
  );
}
