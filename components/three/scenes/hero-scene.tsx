"use client";

import { useSceneStore } from "@/store/use-scene-store";
import { Particles } from "../primitives/particles";

export function HeroScene() {
  const { currentPhase } = useSceneStore();
  
  return (
    <group>
      {/* Lights, Camera configs handled by engine or parent Canvas */}
      <Particles phase={currentPhase} />
    </group>
  );
}
