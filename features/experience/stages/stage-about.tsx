// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/stages/stage-about.tsx
// PURPOSE: About section content, revealed to the right of the laptop in Stage 2
// NOTE: Uses animate (not whileInView) — inside GSAP-pinned container the
//       element is always "in view", so IntersectionObserver never fires.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";

const STATS = [
  { value: "3+",  label: "Years Exp." },
  { value: "20+", label: "Projects" },
  { value: "∞",   label: "Coffees" },
] as const;

export function StageAbout() {
  return (
    <div style={{ maxWidth: 380, padding: "0 8px" }}>
      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 10, letterSpacing: "0.24em",
          color: "#E07A5F", marginBottom: 16, fontFamily: "monospace",
        }}
      >
        // about me
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
          fontWeight: 700, color: "#F3F1EC",
          lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18,
        }}
      >
        I build systems,<br />not just websites.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          fontSize: "0.88rem", color: "rgba(255,255,255,0.48)",
          lineHeight: 1.75, marginBottom: 10,
        }}
      >
        Full-stack developer based in Hyderabad. I care about craft —
        from database schema to the final pixel. Every interaction should
        feel intentional.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          fontSize: "0.88rem", color: "rgba(255,255,255,0.38)",
          lineHeight: 1.75, marginBottom: 30,
        }}
      >
        I specialize in React ecosystems, Node.js backends, and experiences
        that make engineers go &ldquo;how did they do that.&rdquo;
      </motion.p>

      <div style={{ display: "flex", gap: 32 }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
          >
            <div style={{
              fontSize: "1.9rem", fontWeight: 700,
              color: "#E07A5F", lineHeight: 1,
            }}>
              {s.value}
            </div>
            <div style={{
              fontSize: "0.68rem", color: "rgba(255,255,255,0.32)",
              marginTop: 4, letterSpacing: "0.05em",
            }}>
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
