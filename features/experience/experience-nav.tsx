// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/experience-nav.tsx
// PURPOSE: Fixed HUD overlay shown once the preloader completes.
//   Left  — ← Home link
//   Center — Stage indicator dots (1–5)
//   Right  — Sound toggle (🔊 / 🔇)
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import Link from "next/link";
import { useExperienceStore } from "@/store/use-experience-store";

const STAGE_LABELS = ["Hero", "About", "Skills", "Projects", "Contact"] as const;

export function ExperienceNav() {
  const currentStage  = useExperienceStore((s) => s.currentStage);
  const isSoundEnabled = useExperienceStore((s) => s.isSoundEnabled);
  const toggleSound   = useExperienceStore((s) => s.toggleSound);

  return (
    <nav
      aria-label="Experience navigation"
      style={{
        position:       "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         9000,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "space-between",
        padding:        "18px 32px",
        // Subtle glass strip
        background:     "linear-gradient(to bottom, rgba(8,11,20,0.72) 0%, transparent 100%)",
        backdropFilter: "blur(0px)",
        pointerEvents:  "none", // let clicks pass through except on interactive elements
      }}
    >
      {/* ── Left: Home link ─────────────────────────────────────────── */}
      <Link
        href="/"
        aria-label="Back to home"
        style={{
          pointerEvents:  "all",
          display:        "flex",
          alignItems:     "center",
          gap:            8,
          color:          "rgba(243,241,236,0.45)",
          textDecoration: "none",
          fontSize:       "0.72rem",
          letterSpacing:  "0.14em",
          fontFamily:     "monospace",
          transition:     "color 0.25s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#E07A5F")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(243,241,236,0.45)")}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M10 3L5 8L10 13"
            stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </svg>
        HOME
      </Link>

      {/* ── Center: Stage dots ──────────────────────────────────────────── */}
      <div
        role="list"
        aria-label="Experience stages"
        style={{ display: "flex", alignItems: "center", gap: 10, pointerEvents: "all" }}
      >
        {STAGE_LABELS.map((label, i) => {
          const stageNum = (i + 1) as 1 | 2 | 3 | 4 | 5;
          const isActive  = currentStage === stageNum;
          const isPast    = currentStage > stageNum;
          return (
            <div
              key={label}
              role="listitem"
              title={label}
              aria-current={isActive ? "step" : undefined}
              style={{
                position:     "relative",
                width:        isActive ? 24 : 6,
                height:       6,
                borderRadius: 4,
                backgroundColor: isActive
                  ? "#E07A5F"
                  : isPast
                  ? "rgba(224,122,95,0.35)"
                  : "rgba(243,241,236,0.18)",
                transition:   "all 0.35s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {isActive && (
                <span
                  aria-hidden
                  style={{
                    position:     "absolute",
                    inset:        -3,
                    borderRadius: 8,
                    boxShadow:    "0 0 8px 2px rgba(224,122,95,0.5)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Right: Sound toggle ─────────────────────────────────────────── */}
      <button
        aria-label={isSoundEnabled ? "Mute sound" : "Enable sound"}
        onClick={toggleSound}
        style={{
          pointerEvents:   "all",
          background:      "none",
          border:          "1px solid rgba(243,241,236,0.12)",
          borderRadius:    "50%",
          width:           34,
          height:          34,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "center",
          cursor:          "pointer",
          color:           isSoundEnabled ? "#E07A5F" : "rgba(243,241,236,0.3)",
          transition:      "all 0.25s ease",
          padding:         0,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(224,122,95,0.5)";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(224,122,95,0.08)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(243,241,236,0.12)";
          (e.currentTarget as HTMLButtonElement).style.background = "none";
        }}
      >
        {isSoundEnabled ? (
          // Speaker with waves
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path
              d="M2 5.5H4.5L8 2.5V12.5L4.5 9.5H2V5.5Z"
              stroke="currentColor" strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path d="M10 5a2.5 2.5 0 010 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M11.5 3.5a5 5 0 010 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        ) : (
          // Speaker muted
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
            <path
              d="M2 5.5H4.5L8 2.5V12.5L4.5 9.5H2V5.5Z"
              stroke="currentColor" strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path d="M11 5.5L13.5 8M13.5 5.5L11 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
      </button>
    </nav>
  );
}
