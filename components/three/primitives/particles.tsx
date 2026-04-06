"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Reusable animated layer that preserves the Chaos -> Grid scroll logic
function ParticleLayer({
  count,
  spread,
  size,
  baseOpacity,
  progressRef,
  mouse,
  speedMultiplier,
}: {
  count: number;
  spread: number;
  size: number;
  baseOpacity: number;
  progressRef?: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  speedMultiplier: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { initialPositions, gridPositions } = useMemo(() => {
    const initialPositions = new Float32Array(count * 3);
    const gridPositions = new Float32Array(count * 3);

    const gridSize = Math.ceil(Math.sqrt(count));
    const spacing = 0.4;

    for (let i = 0; i < count; i++) {
      // 1) Chaos Positions
      initialPositions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      initialPositions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      initialPositions[i * 3 + 2] = (Math.random() - 0.5) * spread;

      // 2) Grid Positions (centered)
      const gx = ((i % gridSize) - gridSize / 2) * spacing;
      const gy = (Math.floor(i / gridSize) - gridSize / 2) * -spacing;
      
      gridPositions[i * 3 + 0] = gx;
      gridPositions[i * 3 + 1] = gy;
      gridPositions[i * 3 + 2] = 0; // Flat grid planes layering on top of each other
    }

    return { initialPositions, gridPositions };
  }, [count, spread]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const p = progressRef?.current || 0;

    // Material adjustments: sharp + dim when grid, glowing + bright when chaos
    const material = pointsRef.current.material as THREE.PointsMaterial;
    material.opacity = baseOpacity - p * (baseOpacity * 0.4); 
    material.size = size - p * (size * 0.2); 

    // Organic base drift vs rigid grid state
    const rotationDamp = 1 - p;
    pointsRef.current.rotation.y = (t * 0.04 * speedMultiplier + mouse.current.x * 0.3) * rotationDamp;
    pointsRef.current.rotation.x = (Math.sin(t * 0.02 * speedMultiplier) * 0.1 + mouse.current.y * 0.2) * rotationDamp;

    // Grid lock moment: aggressively clamp rotation near the end
    if (p > 0.8) {
      pointsRef.current.rotation.x *= 0.9;
      pointsRef.current.rotation.y *= 0.9;
    }

    // Interpolate positions from chaos to grid
    const positionsAttr = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const cx = initialPositions[i3 + 0];
      const cy = initialPositions[i3 + 1];
      const cz = initialPositions[i3 + 2];

      const gx = gridPositions[i3 + 0];
      const gy = gridPositions[i3 + 1];
      const gz = gridPositions[i3 + 2];

      positionsAttr.array[i3 + 0] = THREE.MathUtils.lerp(cx, gx, p);
      positionsAttr.array[i3 + 1] = THREE.MathUtils.lerp(cy, gy, p);
      positionsAttr.array[i3 + 2] = THREE.MathUtils.lerp(cz, gz, p);
    }
    
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={new Float32Array(initialPositions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color="#E07A5F"
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={baseOpacity}
      />
    </points>
  );
}

// Master component orchestrating layers and camera push
export default function Particles({
  progressRef,
}: {
  progressRef?: React.MutableRefObject<number>;
}) {
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  // Camera Push
  useFrame((state) => {
    const p = progressRef?.current || 0;
    state.camera.position.z = 5 - p * 1.5;
  });

  return (
    <>
      <ParticleLayer count={3600} spread={15} size={0.01} baseOpacity={0.15} progressRef={progressRef} mouse={mouse} speedMultiplier={0.5} />
      <ParticleLayer count={2400} spread={10} size={0.02} baseOpacity={0.4} progressRef={progressRef} mouse={mouse} speedMultiplier={0.8} />
      <ParticleLayer count={1200} spread={7} size={0.035} baseOpacity={0.8} progressRef={progressRef} mouse={mouse} speedMultiplier={1.2} />
    </>
  );
}
