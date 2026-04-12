"use client";

// ─── features/projects/projects-section.tsx ───────────────────────────────────
// Projects section. Cards with 3D mouse-tracking tilt, accent on hover,
// staggered scroll reveal.

import { useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Project data ──────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: "p1",
    index: "01",
    title: "Portfolio — Main Site",
    description:
      "Premium 3D portfolio with scroll-driven particle systems, GSAP timelines, and cinematic section transitions built on React Three Fiber.",
    stack: ["Next.js 14", "React Three Fiber", "GSAP", "Framer Motion", "Zustand"],
    liveUrl: "#",
    repoUrl: "https://github.com/Vishalsomaraju/portfolio2",
    featured: true,
    accent: "#E07A5F",
  },
  {
    id: "p2",
    index: "02",
    title: "Project Apex",
    description:
      "Full-stack SaaS platform with real-time collaboration, JWT auth, role-based access control, and a PostgreSQL-backed REST API.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    accent: "#6B8CE8",
  },
  {
    id: "p3",
    index: "03",
    title: "Project Orbit",
    description:
      "WebSocket-powered analytics dashboard with sub-100ms live updates, D3.js visualizations, and granular filter controls.",
    stack: ["React", "WebSockets", "Express", "D3.js", "TypeScript"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    accent: "#B87333",
  },
  {
    id: "p4",
    index: "04",
    title: "Project Echo",
    description:
      "Mobile-first PWA with offline support, background sync, push notifications, and a GraphQL data layer backed by MongoDB.",
    stack: ["React", "GraphQL", "MongoDB", "PWA", "Workbox"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    accent: "#4ADE80",
  },
];

// ── 3D tilt card ──────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-cursor="project"
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
      style={{
        perspective: 1000,
        cursor: "none",
      }}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        style={{
          backgroundColor: "#0F1115",
          border: `1px solid ${hovered ? project.accent + "30" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 20,
          padding: "36px",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          transition: "border-color 0.3s ease",
        }}
      >
        {/* Number watermark */}
        <span
          style={{
            position: "absolute",
            top: 24,
            right: 28,
            fontSize: "4rem",
            fontWeight: 700,
            color: hovered ? project.accent + "12" : "rgba(255,255,255,0.03)",
            fontFamily: "var(--font-geist-sans)",
            lineHeight: 1,
            userSelect: "none",
            transition: "color 0.3s ease",
          }}
        >
          {project.index}
        </span>

        {/* Featured badge */}
        {project.featured && (
          <span
            style={{
              display: "inline-block",
              fontSize: "0.6rem",
              padding: "3px 10px",
              borderRadius: 9999,
              backgroundColor: project.accent + "15",
              color: project.accent,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            Featured
          </span>
        )}

        {/* Title */}
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#F3F1EC",
            letterSpacing: "-0.02em",
            marginBottom: 14,
            lineHeight: 1.2,
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.75,
            marginBottom: 24,
          }}
        >
          {project.description}
        </p>

        {/* Stack tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 7,
            marginBottom: 32,
          }}
        >
          {project.stack.map((t) => (
            <span
              key={t}
              style={{
                fontSize: "0.68rem",
                padding: "4px 10px",
                borderRadius: 6,
                backgroundColor: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.04em",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: 20,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
          }}
        >
          <a
            href={project.liveUrl}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: "0.78rem",
              color: project.accent,
              textDecoration: "none",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "opacity 0.2s",
            }}
          >
            View Live
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </a>
          <a
            href={project.repoUrl}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontSize: "0.78rem",
              color: "rgba(255,255,255,0.28)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: 5,
              transition: "color 0.2s",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.7)")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.28)")
            }
          >
            GitHub →
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  return (
    <section
      id="projects"
      style={{
        backgroundColor: "#0a0a0a",
        paddingTop: 120,
        paddingBottom: 140,
      }}
    >
      <div
        style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}
      >
        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ height: 1, width: 40, backgroundColor: "#E07A5F", transformOrigin: "left" }}
            />
            <span style={{
              fontSize: "0.68rem", letterSpacing: "0.28em",
              color: "#E07A5F", textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono)",
            }}>
              03 / Projects
            </span>
          </motion.div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
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
              Things I&apos;ve<br />shipped.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.28)",
                maxWidth: 260,
                lineHeight: 1.7,
              }}
            >
              A selection of production work. Hover the cards.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
