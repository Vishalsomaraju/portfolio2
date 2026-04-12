// ─────────────────────────────────────────────────────────────────────────────
// FILE: app/experience/page.tsx
// PURPOSE: /experience route — cinematic scroll-driven Zenbook experience.
//          Switches between desktop (interactive) and mobile (static) layouts.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useExperienceStore } from "@/store/use-experience-store";
import { useMobileLayout }    from "@/lib/hooks/use-mobile-layout";
import { ExperiencePreloader } from "@/features/experience/preloader";
import { ExperienceNav }      from "@/features/experience/experience-nav";
import { ScrollStages }       from "@/features/experience/scroll-stages";
import { MobileFallback }     from "@/features/experience/mobile-fallback";

export default function ExperiencePage() {
  const isMobile            = useMobileLayout();
  const isPreloaderComplete = useExperienceStore((s) => s.isPreloaderComplete);

  if (isMobile) return <MobileFallback />;

  return (
    <>
      {/* ── Preloader (fades out, then isPreloaderComplete → true) ─────── */}
      {!isPreloaderComplete && <ExperiencePreloader />}

      {/* ── Grain noise texture overlay (procedural via SVG filter) ────── */}
      <GrainOverlay />

      {/* ── Persistent HUD — only shown after preloader ─────────────────── */}
      {isPreloaderComplete && <ExperienceNav />}

      {/* ── Main scroll canvas ─────────────────────────────────────────── */}
      <ScrollStages />
    </>
  );
}

/** Weightless SVG-filter film grain — no asset, no canvas, pure CSS. */
function GrainOverlay() {
  return (
    <>
      {/* Inline SVG for the feTurbulence noise source */}
      <svg
        aria-hidden
        style={{ position: "absolute", width: 0, height: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="xp-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>

      {/* The actual overlay div that references the filter */}
      <div
        aria-hidden
        style={{
          position:      "fixed",
          inset:         0,
          zIndex:        8888,
          pointerEvents: "none",
          opacity:       0.03,            // barely-visible grain for depth
          filter:        "url(#xp-grain)",
          mixBlendMode:  "screen",
        }}
      />
    </>
  );
}
