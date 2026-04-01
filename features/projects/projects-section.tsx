"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    num: "01",
    title: "E-Commerce Platform",
    desc: "Full-stack commerce solution with real-time inventory, 3D product viewer, and payment integration. Built for scale.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Three.js"],
    year: "2024",
    link: "#",
    accent: "#E07A5F",
  },
  {
    num: "02",
    title: "AI Analytics Dashboard",
    desc: "Real-time data pipeline with ML-powered insights. Custom visualization engine handling 10K+ events/second.",
    tags: ["React", "Python", "Redis", "WebSockets"],
    year: "2024",
    link: "#",
    accent: "#7B9FE0",
  },
  {
    num: "03",
    title: "3D Portfolio Engine",
    desc: "This portfolio — built from scratch with WebGL particle systems, scroll-driven 3D scenes, and custom cursor logic.",
    tags: ["R3F", "GSAP", "Three.js", "Lenis"],
    year: "2025",
    link: "#",
    accent: "#8FD4A8",
  },
  {
    num: "04",
    title: "SaaS Productivity Tool",
    desc: "B2B workflow automation platform with drag-and-drop builder, webhook integrations, and team collaboration.",
    tags: ["Next.js", "Node.js", "Prisma", "Tailwind"],
    year: "2024",
    link: "#",
    accent: "#D4A857",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
          padding: "40px",
          border: "1px solid var(--border)",
          borderRadius: "20px",
          background: "var(--card-bg)",
          transition:
            "transform 0.12s ease-out, border-color 0.3s, background 0.3s",
          willChange: "transform",
          cursor: "pointer",
          overflow: "hidden",
        }}
        onMouseOver={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            `${project.accent}30`;
          (e.currentTarget as HTMLDivElement).style.background =
            "var(--card-bg-hover)";
        }}
        onMouseOut={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--border)";
          (e.currentTarget as HTMLDivElement).style.background =
            "var(--card-bg)";
        }}
      >
        {/* Corner glow on hover */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `radial-gradient(circle, ${project.accent}15 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "36px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 800,
              color: "var(--faint)",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            {project.num}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                color: "var(--faint)",
                fontWeight: 400,
              }}
            >
              {project.year}
            </span>
            {/* Arrow icon */}
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                border: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "border-color 0.25s, background 0.25s",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2 12L12 2M12 2H5M12 2V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: "var(--muted)" }}
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 680,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--text)",
            marginBottom: "16px",
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            lineHeight: 1.75,
            color: "var(--muted)",
            marginBottom: "28px",
            fontWeight: 400,
          }}
        >
          {project.desc}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="tag"
              style={{
                borderColor: `${project.accent}20`,
                color: project.accent + "99",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "120px 0 140px",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background:
            "radial-gradient(ellipse, var(--section-glow) 0%, transparent 70%)",
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
          03 — Work
        </motion.div>

        {/* Heading row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "72px",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
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
            }}
          >
            Selected
            <br />
            <span style={{ color: "var(--accent)" }}>projects.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "var(--muted)",
              maxWidth: "280px",
              lineHeight: 1.7,
            }}
          >
            A curated selection of work that pushed the boundaries of what's
            possible on the web.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2px",
          }}
          className="projects-grid"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          style={{ marginTop: "60px", textAlign: "center" }}
        >
          <a
            href="https://github.com/Vishalsomaraju"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              color: "var(--muted)",
              border: "1px solid var(--border)",
              borderRadius: "99px",
              padding: "12px 28px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
              transition: "color 0.25s, border-color 0.25s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--text)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--border-strong)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--muted)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--border)";
            }}
          >
            View all on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
