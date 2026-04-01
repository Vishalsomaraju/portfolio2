"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroScene = dynamic(
  () => import("@/components/three/scenes/hero-scene"),
  { ssr: false },
);

const lines = ["Building", "digital worlds", "that feel alive."];

export default function HeroSection() {
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Drive particle progress with scroll
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: () => {
            progressRef.current = proxy.value;
          },
        },
      });

      // Text exit on scroll
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: -120,
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "45% top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const staggerDelay = 0.12;

  return (
    <section
      ref={containerRef}
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, var(--hero-glow) 0%, transparent 70%)",
        }}
      />

      {/* 3D Particle canvas */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <HeroScene progressRef={progressRef} />
      </div>

      {/* Edge vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 35%, var(--bg) 100%)",
        }}
      />

      {/* Bottom gradient bleed into next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          zIndex: 3,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />

      {/* Content */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "var(--accent)",
              display: "inline-block",
              boxShadow: "0 0 10px var(--accent)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Full-Stack Developer · Open to Opportunities
          </span>
        </motion.div>

        {/* Main headline — staggered lines */}
        <div
          style={{
            overflow: "hidden",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.1rem, 7vw, 7.5rem)",
            fontWeight: 760,
            lineHeight: 0.95,
            letterSpacing: "-0.035em",
            maxWidth: "900px",
            marginBottom: "36px",
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                overflow: "hidden",
                display: "block",
                paddingBottom: "0.05em",
              }}
            >
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.5 + i * staggerDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  display: "block",
                  color: i === 2 ? "var(--accent)" : "var(--text)",
                }}
                data-cursor="text"
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            fontWeight: 400,
            lineHeight: 1.75,
            color: "var(--muted)",
            maxWidth: "520px",
            marginBottom: "48px",
          }}
          data-cursor="text"
        >
          I craft precise, scalable architectures and immersive 3D web
          experiences. Every pixel intentional. Every interaction felt.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              color: "white",
              background: "var(--accent)",
              border: "1px solid var(--accent)",
              borderRadius: "99px",
              padding: "14px 32px",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 0 0 rgba(224,122,95,0)",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 8px 30px var(--accent-glow)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 0 rgba(224,122,95,0)";
            }}
          >
            View my work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "var(--text)",
              background: "transparent",
              border: "1px solid var(--input-border)",
              borderRadius: "99px",
              padding: "14px 32px",
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
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--input-border)";
            }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--faint)",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, var(--accent), transparent)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
