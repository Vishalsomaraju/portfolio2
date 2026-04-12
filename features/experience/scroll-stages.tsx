// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/scroll-stages.tsx
// PURPOSE: 500vh scroll-locked container.
//          Manages 5 stages via a SINGLE GSAP ScrollTrigger scrub.
//          All stage transitions are derived from a 0→1 progress value.
//
//  Stage 1 — Hero       lid at 110°, screen shows StageHero        (0–0.20)
//  Stage 2 — About      lid closes to 50°, panel slides right       (0.20–0.40)
//  Stage 3 — Skills     lid fully open, interior exposed            (0.40–0.60)
//  Stage 4 — Projects   SSD eject animation, projects grid          (0.60–0.80)
//  Stage 5 — Contact    lid closes → contact form                   (0.80–1.00)
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LaptopSVG } from "@/features/experience/laptop-svg";
import { StageHero }     from "@/features/experience/stages/stage-hero";
import { StageAbout }    from "@/features/experience/stages/stage-about";
import { StageSkills, COMPONENT_SKILL_MAP } from "@/features/experience/stages/stage-skills";
import { StageProjects } from "@/features/experience/stages/stage-projects";
import { StageContact }  from "@/features/experience/stages/stage-contact";
import { SSD }           from "@/components/ui/laptop/ssd";
import { projects }      from "@/features/experience/data/projects";
import { useExperienceStore } from "@/store/use-experience-store";
import { useCursorStore  } from "@/store/use-cursor-store";
import { useSoundEngine  } from "@/lib/hooks/use-sound-engine";
import type { ExperienceStage } from "@/store/use-experience-store";

gsap.registerPlugin(ScrollTrigger);

/** Derive stage (1–5) from normalized scroll progress (0–1) */
function progressToStage(p: number): ExperienceStage {
  if (p < 0.20) return 1;
  if (p < 0.40) return 2;
  if (p < 0.60) return 3;
  if (p < 0.80) return 4;
  return 5;
}

/** Linearly interpolate between two lid angles based on sub-stage progress.
 *  Ensures the laptop never fully closes (stays ≥ 50°) so it remains visible. */
function lerpLidAngle(p: number): number {
  if (p < 0.20) return 110;                              // Stage 1 — reading angle
  if (p < 0.40) return 110 - (p - 0.20) / 0.20 * 40;   // Stage 2 — closes gently: 110→70
  if (p < 0.60) return 70  + (p - 0.40) / 0.20 * 105;  // Stage 3 — opens flat: 70→175
  if (p < 0.80) return 175 - (p - 0.60) / 0.20 * 65;   // Stage 4 — back to 110
  return 110;                                            // Stage 5 — normal
}

export function ScrollStages() {
  const containerRef  = useRef<HTMLDivElement>(null);
  const stickyRef     = useRef<HTMLDivElement>(null);
  const ssdRef        = useRef<SVGSVGElement>(null);

  const { setStage, setScrollProgress } = useExperienceStore();
  const { setType: setCursorType }      = useCursorStore();
  const { play }                        = useSoundEngine();

  // Reactive values from store
  const batteryLevel = useExperienceStore((s) => s.batteryLevel);

  // Local reactive state (stage-specific visuals)
  const [lidAngle,          setLidAngle]          = useState(110);
  const [showInterior,      setShowInterior]       = useState(false);
  const [highlightedKey,    setHighlightedKey]     = useState<string | null>(null);
  const [hoveredComponent,  setHoveredComponent]   = useState<string | null>(null);
  const [isEjecting,        setIsEjecting]         = useState(false);
  const [terminalDone,      setTerminalDone]        = useState(false);
  const [currentStageLocal, setCurrentStageLocal]  = useState<ExperienceStage>(1);

  // Track previous stage to fire one-shot side-effects only when stage changes
  const prevStageRef = useRef<ExperienceStage>(1);
  const ssdFiredRef  = useRef(false); // SSD eject should fire once

  // Stage 4 terminal faker
  const runTerminal = (onDone: () => void) => {
    const lines = [
      "> git checkout main",
      "> npm run build",
      "✔ compiled successfully",
      "> deploying to vercel...",
      "✓ production ready",
    ];
    let i = 0;
    const tick = () => {
      if (i >= lines.length) { onDone(); return; }
      play("keyTick");
      i++;
      setTimeout(tick, i < 3 ? 360 : 480);
    };
    tick();
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // ── Single pinned + scrubbing trigger spanning the full 500vh ─────────
      ScrollTrigger.create({
        trigger:   container,
        start:     "top top",
        end:       "bottom bottom",
        pin:       stickyRef.current,  // GSAP handles the pinning
        pinSpacing: false,
        scrub:     0.8,
        onUpdate:  (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Lid angle — smooth lerp
          setLidAngle(lerpLidAngle(p));

          // Interior (PCB view) only during Stage 3
          setShowInterior(p >= 0.40 && p < 0.60);

          // Stage
          const newStage = progressToStage(p);
          if (newStage !== prevStageRef.current) {
            const entering = newStage;
            const leaving  = prevStageRef.current;
            prevStageRef.current = newStage;
            setCurrentStageLocal(entering);
            setStage(entering);

            // ── Stage entry side-effects ───────────────────────────────────
            if (entering === 2) {
              play("lidClose");
              setCursorType("default");
            }
            if (entering === 3) {
              setCursorType("screwdriver");
            }
            if (entering === 4) {
              setCursorType("default");
              if (!ssdFiredRef.current) {
                ssdFiredRef.current = true;
                play("ssdEject"); setIsEjecting(true);
                setTimeout(() => {
                  setIsEjecting(false); play("ssdInsert");
                  runTerminal(() => setTerminalDone(true));
                }, 900);
              }
            }
            if (entering === 5) {
              play("boot");
              setCursorType("default");
            }

            // ── Stage leave side-effects ───────────────────────────────────
            if (leaving === 3) setCursorType("default");
            if (leaving === 4) {
              // Reset SSD state when leaving stage 4 backward
              if (entering < 4) {
                ssdFiredRef.current = false;
                setTerminalDone(false);
              }
            }
          }
        },
      });

      // Key highlight for Stage 1 typewriter feel
      let keyIdx = 0;
      const keySeq = ["V","S",".",",","<Enter>","W","e","b"];
      const keyTimer = setInterval(() => {
        setHighlightedKey(keySeq[keyIdx % keySeq.length]);
        keyIdx++;
      }, 800);

      return () => {
        clearInterval(keyTimer);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  const handleContactSubmit = async (_data: {
    name: string; email: string; message: string;
  }) => {
    // TODO: wire to email API (e.g. Resend) — data contains name/email/message
    await new Promise((r) => setTimeout(r, 1000));
  };

  // ── Screen content (shown inside laptop screen) ───────────────────────────
  const screenContent = (() => {
    switch (currentStageLocal) {
      case 1: return <StageHero />;
      case 5: return <StageContact onSubmit={handleContactSubmit} />;
      default: return null;
    }
  })();

  return (
    <>
    {/* Panel slide-in keyframe — injected once, no stylesheet dependency */}
    <style>{`
      @keyframes xpPanelIn {
        from { opacity: 0; transform: translateX(18px); }
        to   { opacity: 1; transform: translateX(0); }
      }
    `}</style>
    <div ref={containerRef} style={{ height: "500vh", position: "relative" }}>
      {/* Sticky viewport — GSAP pins this, NOT CSS sticky */}
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {/* Radial ambient glow behind laptop */}
        <div
          aria-hidden
          style={{
            position:         "absolute",
            width:            800,
            height:           800,
            borderRadius:     "50%",
            background:       "radial-gradient(circle, rgba(28,43,71,0.45) 0%, transparent 70%)",
            transform:        "translateX(-60px)",
            pointerEvents:    "none",
          }}
        />

        <div style={{
          display: "flex", alignItems: "center",
          gap: 52, maxWidth: 1100, width: "100%", padding: "0 28px",
          position: "relative", zIndex: 1,
        }}>
          {/* ── Left column: Laptop SVG ─────────────────────────────────── */}
          <div style={{ flex: "0 0 560px", position: "relative" }}>
            {/* SSD visible only in Stage 4 eject */}
            {currentStageLocal === 4 && (
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%, -60%)", zIndex: 20,
              }}>
                <SSD
                  ref={ssdRef}
                  label="VS_Projects_v3.2"
                  isEjecting={isEjecting}
                />
              </div>
            )}
            <LaptopSVG
              lidAngle={lidAngle}
              showInterior={showInterior}
              batteryLevel={batteryLevel}
              screenContent={screenContent}
              highlightedKey={highlightedKey}
              highlightedComponent={hoveredComponent}
              onComponentHover={(c) => setHoveredComponent(c)}
            />
          </div>

          {/* ── Right column: Stage panel (animated swap) ─────────────── */}
          <div
            key={currentStageLocal}  // remount on stage change → CSS anim
            style={{
              flex: 1, minWidth: 0,
              animation: "xpPanelIn 0.45s cubic-bezier(0.16,1,0.3,1) both",
            }}
          >
            {currentStageLocal === 2 && <StageAbout />}
            {currentStageLocal === 3 && (
              <>
                <p style={{
                  fontSize: "0.74rem", letterSpacing: "0.24em",
                  color: "#E07A5F", marginBottom: 16, fontFamily: "monospace",
                }}>
                  // skills
                </p>
                <p style={{
                  fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                  fontWeight: 700, color: "#F3F1EC",
                  lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 18,
                }}>
                  Inside the machine.
                </p>
                <StageSkills hoveredComponent={hoveredComponent} />
                <p style={{
                  marginTop: 22, fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.18)", fontFamily: "monospace",
                }}>
                  COMPONENTS: {Object.keys(COMPONENT_SKILL_MAP).join(" · ")}
                </p>
              </>
            )}
            {currentStageLocal === 4 && (
              <StageProjects projects={projects} terminalDone={terminalDone} />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
