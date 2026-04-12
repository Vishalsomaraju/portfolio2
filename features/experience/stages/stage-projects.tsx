// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/stages/stage-projects.tsx
// PURPOSE: 2-column project card grid shown after terminal finishes in Stage 4
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";
import type { ProjectItem } from "@/features/experience/data/projects";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function StageProjects({
  projects,
  terminalDone,
}: {
  projects: ProjectItem[];
  terminalDone: boolean;
}) {
  if (!terminalDone) return null;

  return (
    <motion.div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {projects.map((p) => (
        <motion.div
          key={p.id}
          variants={cardVariants}
          whileHover={{ borderColor: "rgba(224,122,95,0.35)" }}
          style={{
            background: "#17191F", borderRadius: 10, padding: 18,
            border: "1px solid rgba(255,255,255,0.07)",
            transition: "border-color 0.2s ease", cursor: "none",
          }}
        >
          <h3 style={{
            fontSize: "0.9rem", fontWeight: 600,
            color: "#F3F1EC", marginBottom: 7,
          }}>
            {p.title}
          </h3>
          <p style={{
            fontSize: "0.74rem", color: "rgba(255,255,255,0.38)",
            lineHeight: 1.65, marginBottom: 12,
          }}>
            {p.description}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
            {p.stack.map((t) => (
              <span key={t} style={{
                fontSize: "0.62rem", padding: "3px 8px", borderRadius: 4,
                backgroundColor: "rgba(224,122,95,0.08)", color: "#E07A5F",
              }}>
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a
              href={p.liveUrl}
              style={{ fontSize: "0.7rem", color: "#E07A5F", textDecoration: "none" }}
            >
              Live →
            </a>
            <a
              href={p.repoUrl}
              style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.28)", textDecoration: "none" }}
            >
              GitHub →
            </a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
