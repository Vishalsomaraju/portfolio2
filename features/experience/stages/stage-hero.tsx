// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/stages/stage-hero.tsx
// PURPOSE: Content rendered on the laptop screen in Stage 1 (Hero)
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";

export function StageHero() {
  return (
    <div
      style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "20px", textAlign: "center",
        backgroundColor: "#060608", color: "#F3F1EC",
        position: "relative", overflow: "hidden",
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          fontSize: 9, textTransform: "uppercase",
          letterSpacing: "0.3em", color: "rgba(224,122,95,0.65)",
          marginBottom: 10,
        }}
      >
        Full-Stack Developer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(1.3rem, 3.2vw, 2rem)",
          fontWeight: 700, lineHeight: 1.1,
          letterSpacing: "-0.02em", marginBottom: 8,
        }}
      >
        Vishal Somaraju
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        style={{
          fontSize: 8.5,
          color: "rgba(255,255,255,0.32)",
          letterSpacing: "0.14em", marginBottom: 20,
        }}
      >
        3D Experiences · Systems Thinker
      </motion.p>

      {/* Subtle scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{
          position: "absolute", bottom: 14,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 5,
        }}
      >
        <span style={{
          fontSize: 7, color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em",
        }}>
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 12, backgroundColor: "rgba(224,122,95,0.4)" }}
        />
      </motion.div>
    </div>
  );
}
