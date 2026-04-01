"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  { value: 3, suffix: "+", label: "Years building" },
  { value: 40, suffix: "+", label: "Projects shipped" },
  { value: 15, suffix: "+", label: "Happy clients" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(value);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        },
      });

      // Content reveal
      gsap.from(contentRef.current?.children ?? [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "160px 0 140px",
        overflow: "hidden",
      }}
    >
      {/* Subtle top glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
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
          style={{ marginBottom: "64px" }}
        >
          01 — About
        </motion.div>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left: Headline */}
          <div ref={headingRef}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.8rem, 5vw, 5rem)",
                fontWeight: 720,
                lineHeight: 1.0,
                letterSpacing: "-0.03em",
                color: "var(--text)",
                marginBottom: "32px",
              }}
            >
              I turn chaos
              <br />
              into systems
              <br />
              <em style={{ fontStyle: "italic", color: "var(--accent)" }}>
                that scale.
              </em>
            </h2>

            {/* Accent rule */}
            <div className="hr-accent" style={{ marginBottom: "32px" }} />

            {/* Stats */}
            <div style={{ display: "flex", gap: "48px" }}>
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      color: "var(--accent)",
                      lineHeight: 1,
                    }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--faint)",
                      marginTop: "6px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content */}
          <div ref={contentRef} style={{ paddingTop: "8px" }}>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                fontWeight: 400,
                lineHeight: 1.85,
                color: "var(--muted)",
                marginBottom: "28px",
              }}
            >
              With 3+ years building production-grade applications, I sit at the
              intersection of engineering precision and design craft. I don't
              just write code — I architect experiences that feel inevitable in
              hindsight.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                fontWeight: 400,
                lineHeight: 1.85,
                color: "rgba(240,237,232,0.65)",
                marginBottom: "40px",
              }}
            >
              My work lives at the edge of what's possible with modern web
              technology — from WebGL particle systems to real-time data
              pipelines. I believe the best software is indistinguishable from
              magic.
            </p>

            {/* Qualities */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              {[
                "Full-Stack Engineering",
                "3D & WebGL Experiences",
                "System Architecture",
                "Performance Obsessed",
              ].map((quality) => (
                <div
                  key={quality}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 18px",
                    border: "1px solid var(--border)",
                    borderRadius: "10px",
                    transition: "border-color 0.25s",
                  }}
                  onMouseOver={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--accent-border)";
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      "var(--border)";
                  }}
                >
                  <span
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "var(--accent)",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "var(--muted)",
                    }}
                  >
                    {quality}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  );
}
