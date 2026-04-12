"use client";

// ─── features/skills/skills-section.tsx ──────────────────────────────────────
// Skills section: running marquee strip + four category cards with hover expand.

import { motion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "GSAP",
  "Three.js", "Framer Motion", "Tailwind CSS", "Docker", "Redis",
  "GraphQL", "Prisma", "AWS", "Vercel", "WebSockets",
];

const CATEGORIES = [
  {
    label: "Frontend",
    icon: "⬡",
    color: "#E07A5F",
    skills: [
      { name: "React / Next.js",     level: 95 },
      { name: "TypeScript",          level: 92 },
      { name: "Tailwind CSS",        level: 90 },
      { name: "Framer Motion",       level: 85 },
      { name: "React Three Fiber",   level: 78 },
    ],
  },
  {
    label: "Backend",
    icon: "⬢",
    color: "#6B8CE8",
    skills: [
      { name: "Node.js / Express",   level: 90 },
      { name: "PostgreSQL",          level: 85 },
      { name: "Redis",               level: 78 },
      { name: "GraphQL / tRPC",      level: 80 },
      { name: "MongoDB",             level: 75 },
    ],
  },
  {
    label: "Animation",
    icon: "◈",
    color: "#B87333",
    skills: [
      { name: "GSAP + ScrollTrigger", level: 88 },
      { name: "Three.js / WebGL",     level: 75 },
      { name: "CSS Animations",        level: 92 },
      { name: "Canvas API",            level: 70 },
      { name: "Lenis Smooth Scroll",   level: 85 },
    ],
  },
  {
    label: "DevOps & Tools",
    icon: "⬟",
    color: "#4ADE80",
    skills: [
      { name: "Docker",              level: 78 },
      { name: "GitHub Actions",      level: 82 },
      { name: "AWS / Vercel",        level: 80 },
      { name: "Git",                 level: 94 },
      { name: "Linux",               level: 75 },
    ],
  },
];

// ── Skill bar ─────────────────────────────────────────────────────────────────
function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{name}</span>
        <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}>
          {level}%
        </span>
      </div>
      <div
        style={{
          height: 2,
          backgroundColor: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "100%",
            width: `${level}%`,
            backgroundColor: color,
            borderRadius: 2,
            transformOrigin: "left",
            opacity: 0.85,
          }}
        />
      </div>
    </div>
  );
}

// ── Category card ─────────────────────────────────────────────────────────────
function CategoryCard({
  label, icon, color, skills,
}: {
  label: string; icon: string; color: string;
  skills: { name: string; level: number }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ borderColor: `${color}30` }}
      style={{
        backgroundColor: "#0F1115",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: 16,
        padding: "28px 28px 24px",
        transition: "border-color 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: "1rem", color }}>{icon}</span>
        <span
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>

      {/* Skill bars */}
      {skills.map((s) => (
        <SkillBar key={s.name} name={s.name} level={s.level} color={color} />
      ))}
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function SkillsSection() {
  const doubledItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      id="skills"
      style={{
        backgroundColor: "#0a0a0a",
        paddingTop: 120,
        paddingBottom: 120,
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", marginBottom: 72 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              height: 1, width: 40, backgroundColor: "#E07A5F", transformOrigin: "left",
            }}
          />
          <span
            style={{
              fontSize: "0.68rem", letterSpacing: "0.28em",
              color: "#E07A5F", textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            02 / Skills
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "#F3F1EC",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          The stack behind<br />the craft.
        </motion.h2>
      </div>

      {/* ── Marquee strip ── */}
      <div
        style={{
          position: "relative",
          marginBottom: 80,
          overflow: "hidden",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute", left: 0, top: 0, bottom: 0,
            width: 120, zIndex: 2,
            background: "linear-gradient(90deg, #0a0a0a, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            width: 120, zIndex: 2,
            background: "linear-gradient(-90deg, #0a0a0a, transparent)",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: 0,
            animation: "marquee 28s linear infinite",
            width: "max-content",
          }}
        >
          {doubledItems.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  padding: "10px 24px",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.06em",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                {item}
              </span>
              <span
                style={{
                  color: "#E07A5F",
                  fontSize: "0.5rem",
                  opacity: 0.4,
                }}
              >
                ◆
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skill cards grid ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {CATEGORIES.map((cat) => (
          <CategoryCard key={cat.label} {...cat} />
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
