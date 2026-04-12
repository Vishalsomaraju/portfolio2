"use client";

// ─── features/about/about-section.tsx ────────────────────────────────────────
// About section. Left: section marker + heading. Right: bio + stats.
// Scroll reveal via Framer Motion whileInView.

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const duration = 1400;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ── Fade-up variant ───────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1 } },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1.4fr",
          gap: 80,
          alignItems: "start",
        }}
        className="grid-cols-1 md:grid-cols-[1fr_1.4fr]"
      >
        {/* ── Left col: section marker + big heading ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Chapter marker */}
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 8,
              }}
            >
              {/* Animated line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                style={{
                  height: 1,
                  width: 40,
                  backgroundColor: "#E07A5F",
                  transformOrigin: "left",
                }}
              />
              <span
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.28em",
                  color: "#E07A5F",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                01 / About
              </span>
            </div>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
              fontWeight: 700,
              color: "#F3F1EC",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 0,
            }}
          >
            I build
            <br />
            <span style={{ color: "#E07A5F" }}>systems,</span>
            <br />
            not just
            <br />
            websites.
          </motion.h2>

          {/* Stats row */}
          <motion.div
            variants={fadeUp}
            style={{
              display: "flex",
              gap: 36,
              marginTop: 56,
              paddingTop: 36,
              borderTop: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {[
              { value: 3,  suffix: "+", label: "Years" },
              { value: 20, suffix: "+", label: "Projects" },
              { value: 8,  suffix: "k+", label: "Commits" },
            ].map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 700,
                    color: "#E07A5F",
                    lineHeight: 1,
                    fontFamily: "var(--font-geist-sans)",
                  }}
                >
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.3)",
                    marginTop: 5,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right col: bio text ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          style={{ paddingTop: 8 }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.85,
              marginBottom: 24,
              fontFamily: "var(--font-geist-sans)",
            }}
          >
            Full-stack developer based in Hyderabad. I care deeply about craft —
            from the precision of a PostgreSQL schema to the final pixel of a
            micro-interaction. Every decision is intentional. Every transition
            is earned.
          </motion.p>

          <motion.p
            variants={fadeUp}
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.85,
              marginBottom: 40,
            }}
          >
            I specialize in React ecosystems, Node.js backends, and cinematic
            web experiences that make engineers and designers both stop and ask
            &ldquo;how did they do that.&rdquo;
          </motion.p>

          {/* Skills chips preview */}
          <motion.div variants={fadeUp}>
            <p
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.22em",
                color: "rgba(255,255,255,0.25)",
                textTransform: "uppercase",
                marginBottom: 14,
              }}
            >
              Currently working with
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                "Next.js", "TypeScript", "React Three Fiber",
                "GSAP", "PostgreSQL", "Node.js",
              ].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.75rem",
                    padding: "5px 12px",
                    borderRadius: 9999,
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Availability badge */}
          <motion.div
            variants={fadeUp}
            style={{
              marginTop: 44,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 18px",
              borderRadius: 9999,
              backgroundColor: "rgba(224,122,95,0.08)",
              border: "1px solid rgba(224,122,95,0.2)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                backgroundColor: "#4ADE80",
                boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                display: "inline-block",
                animation: "pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              Available for new projects
            </span>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
      `}</style>
    </section>
  );
}
