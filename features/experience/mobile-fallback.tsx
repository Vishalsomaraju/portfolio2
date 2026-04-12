// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/mobile-fallback.tsx
// PURPOSE: Static version for screens < 768px. Sections are in plain vertical
//          flow, no scroll-locking, no GSAP dependency.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";
import { projects } from "@/features/experience/data/projects";
import { COMPONENT_SKILL_MAP } from "@/features/experience/stages/stage-skills";

const SKILL_SECTIONS = Object.entries(COMPONENT_SKILL_MAP) as [
  string,
  { label: string; skills: readonly string[] }
][];

function Section({
  label,
  children,
}: {
  label:    string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      style={{ marginBottom: 64, padding: "0 20px" }}
    >
      <p style={{
        fontSize: "0.72rem", letterSpacing: "0.24em",
        color: "#E07A5F", marginBottom: 12, fontFamily: "monospace",
      }}>
        // {label}
      </p>
      {children}
    </motion.section>
  );
}

export function MobileFallback() {
  return (
    <div
      style={{
        backgroundColor: "#0A0D14", minHeight: "100vh",
        color: "#F3F1EC", fontFamily: "system-ui, sans-serif",
        paddingTop: 80,
      }}
    >
      {/* Hero */}
      <Section label="intro">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2rem, 8vw, 3.2rem)",
            fontWeight: 700, letterSpacing: "-0.02em",
            lineHeight: 1.05, marginBottom: 12,
          }}
        >
          Vishal<br />Somaraju
        </motion.h1>
        <p style={{
          fontSize: "0.85rem", color: "rgba(255,255,255,0.4)",
          lineHeight: 1.7,
        }}>
          Full-stack developer · 3D experiences · Systems thinker
        </p>
      </Section>

      {/* About */}
      <Section label="about">
        <h2 style={{
          fontSize: "1.5rem", fontWeight: 700,
          lineHeight: 1.1, marginBottom: 14,
        }}>
          I build systems,<br />not just websites.
        </h2>
        <p style={{
          fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75,
        }}>
          Full-stack developer based in Hyderabad. I care about craft — from
          database schema to the final pixel. Every interaction should feel
          intentional.
        </p>
      </Section>

      {/* Skills */}
      <Section label="skills">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 20 }}>
          The stack.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {SKILL_SECTIONS.map(([key, { label, skills }]) => (
            <div key={key}>
              <p style={{
                fontSize: "0.72rem", color: "#E07A5F",
                marginBottom: 8, letterSpacing: "0.1em", fontFamily: "monospace",
              }}>
                {label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {skills.map((s) => (
                  <span key={s} style={{
                    fontSize: "0.78rem", padding: "4px 12px", borderRadius: 5,
                    backgroundColor: "rgba(224,122,95,0.08)", color: "#E07A5F",
                    border: "1px solid rgba(224,122,95,0.18)",
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section label="projects">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 20 }}>
          What I&apos;ve built.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {projects.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#17191F", borderRadius: 10, padding: 18,
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 style={{
                fontSize: "0.9rem", fontWeight: 600,
                color: "#F3F1EC", marginBottom: 6,
              }}>
                {p.title}
              </h3>
              <p style={{
                fontSize: "0.76rem", color: "rgba(255,255,255,0.38)",
                lineHeight: 1.65, marginBottom: 10,
              }}>
                {p.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                {p.stack.map((t) => (
                  <span key={t} style={{
                    fontSize: "0.63rem", padding: "3px 7px", borderRadius: 4,
                    backgroundColor: "rgba(224,122,95,0.08)", color: "#E07A5F",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <a href={p.liveUrl}   style={{ fontSize: "0.72rem", color: "#E07A5F",                    textDecoration: "none" }}>Live →</a>
                <a href={p.repoUrl}  style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.28)", textDecoration: "none" }}>GitHub →</a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section label="contact">
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 8 }}>
          let&apos;s build something.
        </h2>
        <a
          href="mailto:hello@vishalsomaraju.dev"
          style={{
            display: "inline-block", padding: "11px 22px",
            borderRadius: 7, border: "1px solid #E07A5F",
            color: "#E07A5F", fontSize: "0.85rem",
            fontWeight: 600, textDecoration: "none",
          }}
        >
          Say hello →
        </a>
      </Section>
    </div>
  );
}
