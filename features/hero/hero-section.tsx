"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCursorStore } from "@/store/use-cursor-store";
import { useSiteStore } from "@/store/use-site-store";

const HeroScene = dynamic(
  () => import("@/components/three/scenes/hero-scene"),
  { ssr: false },
);

// ─── Copy ────────────────────────────────────────────────────
const EYEBROW_FULL = "Full-Stack Developer · Open to Opportunities";
const HEADLINE = ["Building", "digital worlds", "that feel alive."];

// ─── Tiny spring lerp ────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function HeroSection() {
  const isLoaded = useSiteStore((s) => s.isLoaded);
  const { setType } = useCursorStore();

  // ── Refs ─────────────────────────────────────────────────────
  const progressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Parallax layers — different "depths"
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Magnetic buttons
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const btn2Ref = useRef<HTMLAnchorElement>(null);

  // HUD
  const clockRef = useRef<HTMLSpanElement>(null);
  const scrollProgressRef = useRef<HTMLDivElement>(null);

  // Typing state
  const [typedText, setTypedText] = useState("");

  // ── Live IST clock ───────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      if (clockRef.current) clockRef.current.textContent = t;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Scroll progress HUD ──────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (!scrollProgressRef.current) return;
      const section = containerRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height - window.innerHeight)),
      );
      scrollProgressRef.current.style.height = progress * 100 + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Typing eyebrow ───────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    let i = 0;
    const id = setInterval(() => {
      setTypedText(EYEBROW_FULL.slice(0, i + 1));
      i++;
      if (i >= EYEBROW_FULL.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [isLoaded]);

  // ── Scan line ────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoaded || !scanRef.current) return;
    gsap.fromTo(
      scanRef.current,
      { y: 0, opacity: 0.7 },
      { y: "100vh", opacity: 0, duration: 1.1, ease: "power2.in", delay: 0.15 },
    );
  }, [isLoaded]);

  // ── Mouse parallax + ambient glow + magnetic buttons ────────
  useEffect(() => {
    if (!isLoaded) return;

    const mouse = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0 };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;

      // Magnetic buttons
      [btn1Ref, btn2Ref].forEach((ref) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = 110;

        if (dist < threshold) {
          const pull = ((threshold - dist) / threshold) * 0.38;
          gsap.to(ref.current, {
            x: dx * pull,
            y: dy * pull,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });
        } else {
          gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.4)",
            overwrite: true,
          });
        }
      });
    };

    const tick = () => {
      smooth.x = lerp(smooth.x, mouse.x, 0.055);
      smooth.y = lerp(smooth.y, mouse.y, 0.055);

      // Eyebrow — very shallow depth
      if (eyebrowRef.current) {
        eyebrowRef.current.style.transform = `translate(${smooth.x * -10}px, ${smooth.y * -7}px)`;
      }
      // Headline — deepest depth
      if (headlineRef.current) {
        headlineRef.current.style.transform = `translate(${smooth.x * -22}px, ${smooth.y * -15}px)`;
      }
      // Subtext — medium
      if (subtextRef.current) {
        subtextRef.current.style.transform = `translate(${smooth.x * -8}px, ${smooth.y * -5}px)`;
      }
      // CTA — very subtle
      if (ctaRef.current) {
        ctaRef.current.style.transform = `translate(${smooth.x * -5}px, ${smooth.y * -3}px)`;
      }
      // Ambient glow drifts with cursor
      if (glowRef.current) {
        const gx = 50 + smooth.x * 18;
        const gy = 88 + smooth.y * 6;
        glowRef.current.style.background = `radial-gradient(ellipse 80% 55% at ${gx}% ${gy}%, rgba(224,122,95,0.13) 0%, transparent 70%)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [isLoaded]);

  // ── GSAP scroll-driven effects ───────────────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Drive particle progress
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
          y: -100,
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "40% top",
            scrub: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  // ── Animation variants ───────────────────────────────────────
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: {
      duration: 0.75,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

  const lineReveal = (delay: number) => ({
    initial: { y: "110%" },
    animate: isLoaded ? { y: "0%" } : { y: "110%" },
    transition: {
      duration: 0.95,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  });

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
      {/* ── Ambient glow — mouse-driven ── */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 50% 88%, rgba(224,122,95,0.10) 0%, transparent 70%)",
          transition: "background 0.05s linear",
        }}
      />

      {/* ── Scan line — sweeps top→bottom on load ── */}
      <div
        ref={scanRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
          zIndex: 20,
          pointerEvents: "none",
          willChange: "transform",
          opacity: 0,
        }}
      />

      {/* ── 3D canvas ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
        <HeroScene progressRef={progressRef} />
      </div>

      {/* ── Edge vignette ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 30%, color-mix(in srgb, var(--bg) 72%, transparent) 100%)",
        }}
      />

      {/* ── Bottom bleed ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "32%",
          zIndex: 3,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
        }}
      />

      {/* ── HUD — top-left: availability ── */}
      <motion.div
        {...fadeUp(0.3)}
        style={{
          position: "absolute",
          top: "92px",
          left: "40px",
          zIndex: 15,
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            position: "relative",
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            background: "#4ade80",
            display: "inline-block",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: "-3px",
              borderRadius: "50%",
              background: "rgba(74,222,128,0.25)",
              animation: "ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--label)",
          }}
        >
          Available for work
        </span>
      </motion.div>

      {/* ── HUD — top-right: live clock ── */}
      <motion.div
        {...fadeUp(0.4)}
        style={{
          position: "absolute",
          top: "92px",
          right: "40px",
          zIndex: 15,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: "var(--faint)",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          HYD · IST
        </div>
        <span
          ref={clockRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "var(--label)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          00:00:00
        </span>
      </motion.div>

      {/* ── HUD — bottom-left: name ── */}
      <motion.div
        {...fadeUp(0.6)}
        style={{
          position: "absolute",
          bottom: "44px",
          left: "40px",
          zIndex: 15,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Vishal Somaraju
        </div>
        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.1em",
            color: "var(--faint)",
            marginTop: "3px",
          }}
        >
          Portfolio · 2025
        </div>
      </motion.div>

      {/* ── HUD — bottom-right: scroll progress ── */}
      <motion.div
        {...fadeUp(0.7)}
        style={{
          position: "absolute",
          bottom: "44px",
          right: "40px",
          zIndex: 15,
          display: "flex",
          alignItems: "flex-end",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--faint)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "var(--border)",
            borderRadius: "99px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            ref={scrollProgressRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "0%",
              background: "var(--accent)",
              borderRadius: "99px",
              transition: "height 0.1s linear",
            }}
          />
        </div>
      </motion.div>

      {/* ── Main content — parallax layers ── */}
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
        {/* Eyebrow — depth layer 1 (shallowest) */}
        <div
          ref={eyebrowRef}
          style={{ willChange: "transform", marginBottom: "32px" }}
        >
          <motion.div
            {...fadeUp(0.1)}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--accent)",
                display: "inline-block",
                boxShadow: "0 0 12px var(--accent)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--muted)",
                minHeight: "1.2em",
              }}
            >
              {typedText}
              {isLoaded && typedText.length < EYEBROW_FULL.length && (
                <span
                  style={{
                    display: "inline-block",
                    width: "1px",
                    height: "0.9em",
                    background: "var(--accent)",
                    verticalAlign: "middle",
                    marginLeft: "2px",
                    animation: "blink 0.7s step-end infinite",
                  }}
                />
              )}
            </span>
          </motion.div>
        </div>

        {/* Headline — depth layer 2 (deepest) */}
        <div
          ref={headlineRef}
          style={{
            willChange: "transform",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.4rem, 8.5vw, 8.5rem)",
            fontWeight: 760,
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            maxWidth: "920px",
            marginBottom: "36px",
          }}
        >
          {HEADLINE.map((line, i) => (
            <div
              key={i}
              style={{
                overflow: "hidden",
                display: "block",
                paddingBottom: "0.06em",
              }}
            >
              <motion.span
                {...lineReveal(0.2 + i * 0.13)}
                style={{
                  display: "block",
                  color: i === 2 ? "var(--accent)" : "var(--text)",
                }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Subtext — depth layer 3 */}
        <div ref={subtextRef} style={{ willChange: "transform" }}>
          <motion.p
            {...fadeUp(0.6)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
              fontWeight: 400,
              lineHeight: 1.78,
              color: "var(--muted)",
              maxWidth: "500px",
              marginBottom: "52px",
            }}
          >
            I craft precise, scalable architectures and immersive 3D web
            experiences. Every pixel intentional. Every interaction felt.
          </motion.p>
        </div>

        {/* CTAs — magnetic, depth layer 4 */}
        <div ref={ctaRef} style={{ willChange: "transform" }}>
          <motion.div
            {...fadeUp(0.78)}
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <a
              ref={btn1Ref}
              href="#projects"
              onMouseEnter={() => setType("cta")}
              onMouseLeave={() => setType("default")}
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
                display: "inline-block",
                position: "relative",
                willChange: "transform",
              }}
            >
              View my work
            </a>

            <a
              ref={btn2Ref}
              href="#contact"
              onMouseEnter={() => setType("hover")}
              onMouseLeave={() => setType("default")}
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
                color: "var(--muted)",
                background: "transparent",
                border: "1px solid var(--border-strong)",
                borderRadius: "99px",
                padding: "14px 32px",
                textDecoration: "none",
                display: "inline-block",
                willChange: "transform",
                transition: "color 0.25s, border-color 0.25s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--accent-border)";
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--muted)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--border-strong)";
              }}
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "var(--faint)",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 9, 0] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "44px",
            background:
              "linear-gradient(to bottom, rgba(224,122,95,0.55), transparent)",
          }}
        />
      </motion.div>

      {/* ── Global keyframes ── */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
