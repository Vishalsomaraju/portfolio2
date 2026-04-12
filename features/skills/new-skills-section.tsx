"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const skills = [
  { name: "HTML5", accent: "#E34F26" },
  { name: "CSS3", accent: "#1572B6" },
  { name: "JavaScript", accent: "#F7DF1E" },
  { name: "TypeScript", accent: "#3178C6" },
  { name: "React", accent: "#61DAFB" },
  { name: "Next.js", accent: "#000000" }, // specific handling for Next.js in SVG
  { name: "Node.js", accent: "#5FA04E" },
  { name: "Python", accent: "#3776AB" },
  { name: "Flask", accent: "#000000" },
  { name: "FastAPI", accent: "#009688" },
  { name: "MySQL", accent: "#4479A1" },
  { name: "Tailwind CSS", accent: "#38BDF8" },
  { name: "Three.js", accent: "#000000" },
  { name: "GSAP", accent: "#88CE02" },
];

function SkillIcon({ name }: { name: string }) {
  switch (name) {
    case "HTML5":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#E44D26" d="M19 3l9 101 36 10 36-10 9-101z" />
          <path fill="#F16529" d="M64 106l29-8 8-87H64z" />
          <path fill="#EBEBEB" d="M64 27H33l4 46h27V62H47l-1-13h18zm0 56l-.1.03-15.1-4.1-1-11H36l1.9 20 26.1 7.3z" />
          <path fill="#FFF" d="M64 27v11h30l1-11zm0 35v11h15l-1.4 15L64 91.7V103l26-7.2 3.8-42.8z" />
        </svg>
      );
    case "CSS3":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#1572B6" d="M19 3l9 101 36 10 36-10 9-101z" />
          <path fill="#33A9DC" d="M64 106l29-8 8-87H64z" />
          <path fill="#EBEBEB" d="M64 27H33l4 46h27V62H47l-1-13h18zm0 56l-.1.03-15.1-4.1-1-11H36l1.9 20 26.1 7.3z" />
          <path fill="#FFF" d="M64 27v11h30l1-11zm0 35v11h15l-1.4 15L64 91.7V103l26-7.2 3.8-42.8z" />
        </svg>
      );
    case "JavaScript":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#F7DF1E" d="M0 0h128v128H0z" />
          <path fill="#111" d="M37 106l10-6c2 4 4 7 9 7 5 0 8-2 8-9V49h13v50c0 15-9 22-22 22-12 0-18-6-22-15zm46-1l10-6c3 5 7 8 13 8 6 0 9-3 9-7 0-5-4-7-11-10l-4-2c-11-5-19-11-19-24 0-12 9-21 23-21 10 0 18 3 23 13l-10 7c-2-4-5-6-10-6-4 0-7 2-7 6 0 4 3 6 10 9l4 2c14 6 21 12 21 25 0 14-11 22-27 22-13 0-21-6-25-16z" />
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#3178C6" d="M0 0h128v128H0z" />
          <path fill="#FFF" d="M27 54h47v11H56v42H44V65H27zm53 2c5-3 11-5 19-5 9 0 15 2 20 6l-6 9c-4-3-8-4-13-4-6 0-9 2-9 5 0 4 4 5 11 7l5 1c10 3 16 9 16 18 0 12-10 18-24 18-11 0-20-3-26-9l7-9c5 4 11 7 18 7s10-2 10-6-3-5-10-7l-4-1c-12-3-18-8-18-18 0-6 2-11 8-12z" />
        </svg>
      );
    case "React":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <circle cx="64" cy="64" r="10" fill="#61DAFB" />
          <g fill="none" stroke="#61DAFB" strokeWidth="6">
            <ellipse cx="64" cy="64" rx="46" ry="18" />
            <ellipse cx="64" cy="64" rx="46" ry="18" transform="rotate(60 64 64)" />
            <ellipse cx="64" cy="64" rx="46" ry="18" transform="rotate(120 64 64)" />
          </g>
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg dark-invert">
          <path fill="currentColor" d="M64 0a64 64 0 1064 64A64.07 64.07 0 0064 0zm0 119a55 55 0 1155-55 55.06 55.06 0 01-55 55z"/>
          <path fill="currentColor" d="M102.73 108.9L49.46 38.64H38v50.7h9.45V49.07l48.43 64.12zM80.5 44.5h9.46v38.86H80.5v-38.9" />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 256 272" aria-hidden="true" className="skill-icon-svg">
          <path fill="#5FA04E" d="M127.6 0a18 18 0 0 0-9 2.4L27.3 54.8a18 18 0 0 0-9 15.6v104.8a18 18 0 0 0 9 15.6l91.3 52.4a18 18 0 0 0 18 0l91.3-52.4a18 18 0 0 0 9-15.6V70.4a18 18 0 0 0-9-15.6L136.6 2.4a18 18 0 0 0-9-2.4zm0 25.3L210.1 72v98.1l-82.5 46.7-82.5-46.7V72z" />
          <path fill="#5FA04E" d="M141.4 189.5c-28.2 0-42.5-13-42.5-38.6v-54.2h20.7v54c0 13.1 5 19 22.4 19 16.8 0 23.6-7 23.6-16.2 0-10.2-4.1-13.6-27.1-16.5-28.8-3.6-37.9-11.6-37.9-33.3 0-20.4 15.8-33.6 40.2-33.6 26 0 39 10.6 43.7 32.4l-20.6 3.1c-2.9-12.5-9.6-17.2-23.3-17.2-13.8 0-20 6.2-20 14.4 0 8.8 3.8 12.5 25.3 15.2 31 4 39.7 12.7 39.7 34.5 0 22.8-18.2 36-43.9 36z" />
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#3776AB" d="M63 12c-29 0-27 13-27 13v13h27v4H25S7 40 7 67c0 27 15 27 15 27h11V79s-1-17 17-17h29s15 0 15-15V26S96 12 63 12zM48 25a5 5 0 110 10 5 5 0 010-10z" />
          <path fill="#FFD43B" d="M65 116c29 0 27-13 27-13V90H65v-4h38s18 3 18-24-15-27-15-27H95v15s1 17-17 17H49S34 67 34 82v21s-2 13 31 13zm15-12a5 5 0 110-10 5 5 0 010 10z" />
        </svg>
      );
    case "Flask":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg dark-invert">
          <path fill="currentColor" d="M49 11h30v9l-7 8v18l29 49c4 8-1 17-11 17H38c-10 0-15-9-11-17l29-49V28l-7-8zm11 26v12L35 91c-2 3 1 7 5 7h48c4 0 7-4 5-7L68 49V37z" />
          <path fill="currentColor" opacity="0.35" d="M42 79h44v8H42z" />
        </svg>
      );
    case "FastAPI":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#009688" d="M72 10L28 56h28l-16 62 60-70H71z" />
        </svg>
      );
    case "MySQL":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#4479A1" d="M98 37c-7-8-19-11-30-8-9 2-17 9-20 18-4-3-10-4-15-2-7 3-11 10-11 19 4-5 9-7 15-7 0 9 5 18 14 24 16 12 39 9 51-6 6-7 8-15 8-23 6 1 12 0 18-4-1-5-4-10-9-13-6 3-13 4-21 2zm-14 37c-8 10-22 12-33 5-6-4-10-9-11-16 11 7 28 8 41 1 7-4 12-10 15-17 1 10-2 20-12 27z" />
          <path fill="#F29111" d="M85 33c4 0 8 1 11 3-5 1-9 1-13 0-5-1-8-1-12 0 3-2 8-3 14-3z" />
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#38BDF8" d="M64 38c-16 0-26 8-30 24 6-8 14-10 22-8 5 1 8 4 13 9 6 6 13 13 30 13 16 0 26-8 30-24-6 8-14 10-22 8-5-1-8-4-13-9-6-6-13-13-30-13zm-30 34C18 72 8 80 4 96c6-8 14-10 22-8 5 1 8 4 13 9 6 6 13 13 30 13 16 0 26-8 30-24-6 8-14 10-22 8-5-1-8-4-13-9-6-6-13-13-30-13z" />
        </svg>
      );
    case "Three.js":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg dark-invert">
          <path fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" d="M64 17l37 21v52l-37 21-37-21V38zm0 0v94M27 38l37 21 37-21M27 90l37-21 37 21" />
        </svg>
      );
    case "GSAP":
      return (
        <svg viewBox="0 0 128 128" aria-hidden="true" className="skill-icon-svg">
          <path fill="#88CE02" d="M82.5 16.5H45.5C31.2 16.5 19.5 28.2 19.5 42.5v43c0 14.3 11.7 26 26 26h37c14.3 0 26-11.7 26-26v-43c0-14.3-11.7-26-26-26zm2.7 65.2H76v16.1H52V97.8h-9V81.7H52V69.4h24v12.3h9.2v16.1zm0-31.5H52V34.1h33.2v16.1z" />
        </svg>
      );
    default:
      return null;
  }
}

function SkillTile({ skill, index, scrollYProgress }: { skill: any; index: number, scrollYProgress: any }) {
  // Parallax effect
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -30 + (index % 3) * -20]);

  return (
    <motion.div
      className="skill-tile boxed-tile"
      style={{
        ["--skill-accent" as string]: skill.accent,
        y: yParallax,
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [1, 0.4, 0, 1.2],
      }}
      whileHover={{ y: -6, scale: 1.05 }}
    >
      <motion.div
        className="skill-icon-wrap"
        animate={{
          y: [0, -5, 0],
          rotate: [0, index % 2 === 0 ? 2 : -2, 0],
        }}
        transition={{
          duration: 4 + (index % 4) * 0.6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <SkillIcon name={skill.name} />
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section
      id="skills"
      ref={containerRef}
      style={{
        position: "relative",
        background: "var(--bg)",
        padding: "160px 0 200px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "20% -10% auto 0",
          height: "600px",
          width: "100%",
          background:
            "radial-gradient(circle at 60% 40%, color-mix(in srgb, var(--accent) 3%, transparent) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "40% 0 auto -20%",
          height: "600px",
          width: "80%",
          background:
            "radial-gradient(circle at 30% 60%, color-mix(in srgb, #7B61FF 2%, transparent) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
        
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ marginBottom: "64px", position: "relative" }}
        >
          <div style={{
            position: "absolute",
            bottom: "-16px",
            left: "0",
            width: "120px",
            height: "1px",
            background: "linear-gradient(90deg, color-mix(in srgb, var(--accent) 50%, transparent) 0%, transparent 100%)"
          }} />
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.2rem, 6vw, 6rem)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--text)",
            }}
          >
            Skills
          </h2>
        </motion.div>

        <div className="constellation-wall">
          {skills.map((skill, index) => (
            <SkillTile key={skill.name} skill={skill} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>

      {/* Styles injected via const to avoid template literal escaping issues */}
      <style dangerouslySetInnerHTML={{ __html: SKILLS_CSS }} />
    </section>
  );
}

const SKILLS_CSS = `
  .constellation-wall {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    perspective: 1200px;
  }

  .boxed-tile {
    position: relative;
    width: 140px;
    height: 140px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #080a0e;
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.04),
      0 24px 48px rgba(0, 0, 0, 0.4);
    transform-style: preserve-3d;
    transition: border-color 0.4s ease, box-shadow 0.4s ease;
  }

  .boxed-tile::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 22px;
    background: var(--skill-accent);
    opacity: 0;
    filter: blur(28px);
    z-index: -1;
    transition: opacity 0.4s ease;
  }

  .boxed-tile::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 60%);
    pointer-events: none;
  }

  .boxed-tile:hover {
    border-color: rgba(255, 255, 255, 0.12);
  }

  .boxed-tile:hover::before {
    opacity: 0.18;
  }

  .skill-icon-wrap {
    width: 55%;
    height: 55%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .skill-icon-svg {
    width: 100%;
    height: 100%;
    display: block;
    filter: drop-shadow(0 6px 12px rgba(0,0,0,0.3));
  }

  .light .boxed-tile {
    background: #dbcfb9;
    border: 1px solid rgba(70, 53, 34, 0.1);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      0 24px 48px rgba(76, 58, 37, 0.15);
  }

  .light .boxed-tile::after {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%);
  }

  .light .boxed-tile:hover {
    border-color: rgba(70, 53, 34, 0.2);
  }

  .light .boxed-tile:hover::before {
    opacity: 0.12;
  }

  .light .skill-icon-svg.dark-invert {
    color: #211c13;
  }

  .dark-invert {
    color: #f7eedb;
  }

  @media (max-width: 900px) {
    .constellation-wall { gap: 16px; }
    .boxed-tile { width: 110px; height: 110px; border-radius: 16px; }
  }

  @media (max-width: 600px) {
    .constellation-wall { gap: 12px; }
    .boxed-tile { width: 90px; height: 90px; border-radius: 14px; }
  }
`;
