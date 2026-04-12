// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/stages/stage-skills.tsx
// PURPOSE: Skills tooltip panel, revealed to the right in Stage 3
//          Component → skill mapping mirrors the hardware-accurate SVG interior
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion, AnimatePresence } from "framer-motion";

export const COMPONENT_SKILL_MAP: Record<
  string,
  { label: string; skills: readonly string[] }
> = {
  pcb:      { label: "Core Stack", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  ssd:      { label: "Databases",  skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma"] },
  fan:      { label: "DevOps",     skills: ["Docker", "CI/CD", "GitHub Actions", "Linux"] },
  heatpipe: { label: "APIs",       skills: ["GraphQL", "REST", "tRPC", "WebSockets"] },
  ram:      { label: "Runtime",    skills: ["Node.js", "Express", "FastAPI", "Bun"] },
  battery:  { label: "Cloud",      skills: ["AWS", "Vercel", "Railway", "Cloudflare"] },
  speaker:  { label: "Tooling",    skills: ["Git", "Figma", "Postman", "VS Code"] },
};

export function StageSkills({
  hoveredComponent,
}: {
  hoveredComponent: string | null;
}) {
  const active = hoveredComponent
    ? COMPONENT_SKILL_MAP[hoveredComponent]
    : null;

  return (
    <div style={{ minHeight: 160 }}>
      <AnimatePresence mode="wait">
        {!active ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.22)",
              fontFamily: "monospace", lineHeight: 1.7,
            }}
          >
            Hover components<br />to reveal skills →
          </motion.p>
        ) : (
          <motion.div
            key={hoveredComponent}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.24 }}
          >
            <p style={{
              fontSize: 10, letterSpacing: "0.22em",
              color: "#E07A5F", marginBottom: 12, fontFamily: "monospace",
            }}>
              // {active.label}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {active.skills.map((skill, i) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <div style={{
                    width: 4, height: 4, borderRadius: "50%",
                    backgroundColor: "#E07A5F", flexShrink: 0,
                  }}/>
                  <span style={{
                    fontSize: "0.86rem", color: "#F3F1EC", fontWeight: 500,
                  }}>
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
