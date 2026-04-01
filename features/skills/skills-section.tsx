"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "GSAP",
  "Framer Motion",
  "Tailwind",
  "Docker",
  "Figma",
  "React",
  "Next.js",
  "TypeScript",
  "Three.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "GSAP",
  "Framer Motion",
  "Tailwind",
  "Docker",
  "Figma",
];

const skillGroups = [
  {
    label: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Three.js / R3F", level: 82 },
      { name: "GSAP / Framer", level: 88 },
      { name: "Tailwind CSS", level: 94 },
    ],
  },
  {
    label: "Backend",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python / FastAPI", level: 80 },
      { name: "PostgreSQL", level: 82 },
      { name: "Redis", level: 72 },
      { name: "REST / GraphQL", level: 86 },
    ],
  },
  {
    label: "Craft",
    skills: [
      { name: "UI / UX Design", level: 78 },
      { name: "System Architecture", level: 84 },
      { name: "Performance Opt.", level: 88 },
      { name: "Docker / CI-CD", level: 76 },
      { name: "WebGL / Shaders", level: 70 },
    ],
  },
];

function SkillBar({ level }: { level: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "2px",
        background: "var(--input-border)",
        borderRadius: "99px",
        overflow: "hidden",
        marginTop: "8px",
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        viewport={{ once: true }}
        style={{
          height: "100%",
          width: `${level}%`,
          background: `linear-gradient(to right, var(--accent), var(--accent-subtle))`,
          borderRadius: "99px",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Infinite marquee
      if (marqueeRef.current) {
        const totalWidth = marqueeRef.current.scrollWidth / 2;
        gsap.to(marqueeRef.current, {
          x: -totalWidth,
          ease: "none",
          duration: 28,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "120px 0 140px",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "40%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--section-glow) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="chapter-label"
          style={{ marginBottom: "48px" }}
        >
          02 — Skills
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)",
            fontWeight: 720,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            marginBottom: "80px",
          }}
        >
          The tools
          <br />
          <span style={{ color: "var(--accent)" }}>I wield.</span>
        </motion.h2>
      </div>

      {/* Marquee strip */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          padding: "20px 0",
          marginBottom: "100px",
          background: "var(--card-bg-hover)",
        }}
      >
        <div
          ref={marqueeRef}
          style={{
            display: "flex",
            gap: "0",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {marqueeItems.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: i % 6 === 0 ? "var(--accent)" : "var(--faint)",
                padding: "0 32px",
                display: "inline-flex",
                alignItems: "center",
                gap: "32px",
              }}
            >
              {item}
              <span style={{ opacity: 0.15 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Skill groups grid */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
          }}
          className="skills-grid"
        >
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: gi * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              viewport={{ once: true, margin: "-60px" }}
              style={{
                padding: "36px 32px",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                background: "var(--card-bg)",
                transition: "border-color 0.3s, background 0.3s",
              }}
              onHoverStart={(e) => {
                (e.target as HTMLElement).closest("div[style]") &&
                  (
                    (e.target as HTMLElement).closest(
                      "div[style]",
                    ) as HTMLElement
                  ).style &&
                  ((
                    (e.target as HTMLElement).closest(
                      "div[style]",
                    ) as HTMLElement
                  ).style.borderColor = "var(--accent-border)");
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "28px",
                }}
              >
                {group.label}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "18px",
                }}
              >
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "var(--text)",
                        }}
                      >
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "11px",
                          color: "var(--label)",
                          fontWeight: 400,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <SkillBar level={skill.level} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider" style={{ marginTop: "120px" }} />

      <style>{`
        @media (max-width: 900px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
