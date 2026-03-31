"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Dynamically import HeroScene to avoid SSR breaking WebGL context
const HeroScene = dynamic(() => import("@/components/three/scenes/hero-scene"), {
  ssr: false,
});

export default function HeroSection() {
  const progressRef = useRef(0);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Animate the raw value of the progressRef from 0 to 1 as the user scrolls
    const proxy = { current: 0 };
    tl.to(proxy, {
      current: 1,
      ease: "none",
      onUpdate: () => {
        progressRef.current = proxy.current;
      },
    });

    // Text exit transition
    if (heroTextRef.current) {
      gsap.to(heroTextRef.current, {
        y: -150,
        opacity: 0,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "center top", // Fades out by 50% scroll
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Soft Nebula Ambient Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(224,122,95,0.08), transparent 60%), radial-gradient(circle at 70% 60%, rgba(224,122,95,0.05), transparent 70%)",
          }}
        />
      </div>

      {/* 3D Background Layer */}
      <HeroScene progressRef={progressRef} />

      {/* Radial vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* UI Content Layer — inline styles bypass Tailwind purge for features/ dir */}
      <div
        ref={heroTextRef}
        className="hero-text"
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
        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            marginBottom: "16px",
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(224,122,95,0.7)",
          }}
        >
          Full-Stack Developer · 3D Experiences
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="text"
          style={{
            maxWidth: "780px",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          I build{" "}
          <span style={{ color: "#E07A5F" }}>systems,</span>
          <br />
          not just websites
        </motion.h1>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          data-cursor="text"
          style={{
            marginTop: "24px",
            maxWidth: "480px",
            fontSize: "1rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.7,
          }}
        >
          From chaotic ideas to precise, scalable digital architectures.
          Every pixel intentional. Every interaction felt.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <a
            href="#projects"
            data-cursor="cta"
            style={{
              borderRadius: "9999px",
              border: "1px solid #E07A5F",
              backgroundColor: "rgba(224,122,95,0.1)",
              padding: "12px 24px",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#E07A5F",
              textDecoration: "none",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E07A5F";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(224,122,95,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#E07A5F";
            }}
          >
            View Projects →
          </a>
          <a
            href="#contact"
            data-cursor="hover"
            style={{
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "rgba(255,255,255,0.5)";
            }}
          >
            Get in touch
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.25em",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              height: "16px",
              width: "1px",
              backgroundColor: "rgba(224,122,95,0.4)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
