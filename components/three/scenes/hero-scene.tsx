"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { PerformanceMonitor } from "@react-three/drei";
import Particles from "../primitives/particles";
import ShootingStar from "../primitives/shooting-stars";
import { R3F_CONFIG } from "@/lib/three/config";

export default function HeroScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      camera={{
        position: R3F_CONFIG.camera.position as [number, number, number],
        fov: R3F_CONFIG.camera.fov,
        near: R3F_CONFIG.camera.near,
        far: R3F_CONFIG.camera.far,
      }}
      dpr={[1, R3F_CONFIG.perf.maxPixelRatio]}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >

      <PerformanceMonitor>
        <Suspense fallback={null}>
          <ShootingStar />
          <Particles progressRef={progressRef} />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  );
}
