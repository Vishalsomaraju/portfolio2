// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/preloader.tsx
// PURPOSE: GSAP-driven preloader:
//   BOOT sequence text → name typewriter → "VS." monogram crystallise → dismiss
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useCallback, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useExperienceStore } from "@/store/use-experience-store";

const BOOT_LINES = [
  "ASUS Zenbook 14 OLED",
  "Firmware 316 •••",
  "Loading experience",
];

export function ExperiencePreloader() {
  const setComplete = useExperienceStore((s) => s.setPreloaderComplete);
  const containerRef = useRef<HTMLDivElement>(null);
  const monogramRef  = useRef<HTMLDivElement>(null);
  const bootLinesRef = useRef<HTMLDivElement[]>([]);

  // Stable setter for bootLinesRef — avoids stale ref array
  const setBootLineRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      if (el) bootLinesRef.current[i] = el;
    },
    []
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slight delay so user sees the monogram before fade
          gsap.to(containerRef.current, {
            opacity: 0, duration: 0.6, delay: 0.5,
            onComplete: () => setComplete(true),
          });
        },
      });

      // ── Phase 1: Boot text, stagger 0.6s ───────────────────────────────
      bootLinesRef.current.forEach((el, i) => {
        if (!el) return;
        tl.fromTo(el,
          { opacity: 0, y: 5 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          i * 0.6
        );
      });

      // ── Phase 2: Typewriter "VISHAL SOMARAJU" ───────────────────────────
      const fullName = "VISHAL SOMARAJU";
      tl.to({}, {
        duration: fullName.length * 0.06,
        onStart: () => {
          const nameEl = document.getElementById("xp-preloader-name");
          if (!nameEl) return;
          nameEl.textContent = "";
        },
        onUpdate: function () {
          const nameEl = document.getElementById("xp-preloader-name");
          if (!nameEl) return;
          const charCount = Math.floor(
            this.progress() * fullName.length
          );
          nameEl.textContent =
            fullName.slice(0, charCount) +
            (charCount < fullName.length ? "█" : "");
        },
        onComplete: () => {
          const nameEl = document.getElementById("xp-preloader-name");
          if (nameEl) nameEl.textContent = fullName;
        },
      }, "+=0.3");

      // ── Phase 3: Monogram crystallise (scale in) ───────────────────────
      tl.fromTo(
        monogramRef.current,
        { opacity: 0, scale: 0.6, rotateZ: -8 },
        { opacity: 1, scale: 1, rotateZ: 0, duration: 0.8, ease: "back.out(1.6)" },
        "+=0.2"
      );
    },
    { scope: containerRef, dependencies: [setComplete] }
  );

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9990,
        backgroundColor: "#080B14",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 28, fontFamily: "monospace",
      }}
    >
      {/* Boot lines */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        {BOOT_LINES.map((line, i) => (
          <div
            key={line}
            ref={(el) => setBootLineRef(el, i)}
            style={{
              fontSize: "0.73rem", color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.18em", opacity: 0,
            }}
          >
            {line}
          </div>
        ))}
      </div>

      {/* Typewriter name */}
      <div
        id="xp-preloader-name"
        style={{
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 700, letterSpacing: "0.16em",
          color: "#F3F1EC",
          minHeight: "1em",
        }}
      />

      {/* VS. monogram */}
      <div
        ref={monogramRef}
        style={{
          opacity: 0,
          fontSize: "clamp(2.4rem, 6vw, 4rem)",
          fontWeight: 900, letterSpacing: "-0.04em",
          background: "linear-gradient(135deg, #E07A5F, #FF9B7A, #E07A5F)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          userSelect: "none",
        }}
      >
        VS.
      </div>
    </div>
  );
}
