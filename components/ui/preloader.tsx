"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useSiteStore } from "@/store/use-site-store";
import { useTheme } from "@/providers/theme-provider";

const FULL_NAME = "Vishal Somaraju";
const VS_IDX = new Set([0, 7]);

type Phase = "idle" | "typing" | "hold" | "transform" | "split";

const E_SNAP: [number, number, number, number] = [0.22, 1, 0.36, 1];
const E_CINEMA: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Preloader() {
  const [phase, setPhase] = useState<Phase>("typing");
  const [active, setActive] = useState(true);
  const setLoaded = useSiteStore((s) => s.setLoaded);
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // ── Theme-aware tokens ──────────────────────────────────────────────
  const BG      = isDark ? "#0a0a0a"                     : "#f4f0e7";
  const TEXT    = isDark ? "#eaeaea"                     : "#1a1814";
  const PANEL   = isDark ? "#0a0a0a"                     : "#f4f0e7";
  const BAR_BG  = isDark ? "rgba(255,255,255,0.05)"       : "rgba(0,0,0,0.07)";
  const BAR_FG  = isDark ? "rgba(224,122,95,0.75)"       : "rgba(201,102,68,0.75)";
  const LABEL   = isDark ? "rgba(240,237,232,0.22)"      : "rgba(26,24,20,0.30)";
  const GLOW    = isDark ? "rgba(140,110,255,0.07)"      : "rgba(201,102,68,0.06)";

  const CFG = {
    perLetter: 60,
    letterDur: 400,
    holdDelay: 900,
    transformDur: 850,
    panelDelay: 140,
    panelDur: 820,
    lockInDur: 550,
  };

  // ✅ Stable organic delays — dep on perLetter so they're always in sync
  const delays = useMemo(
    () =>
      FULL_NAME.split("").map(
        (_, i) => (i * CFG.perLetter + Math.random() * 12) / 1000,
      ),
    [CFG.perLetter],
  );

  const times = () => {
    const typeEnd = FULL_NAME.length * CFG.perLetter + CFG.letterDur;
    const holdEnd = typeEnd + CFG.holdDelay;
    const xfrmEnd = holdEnd + CFG.transformDur;
    const doneEnd = xfrmEnd + CFG.panelDelay + CFG.panelDur;
    return { typeEnd, holdEnd, xfrmEnd, doneEnd };
  };

  const finish = useCallback(() => {
    setLoaded();
    setActive(false);
  }, [setLoaded]);

  useEffect(() => {
    if (!prefersReduced) return;
    const id = setTimeout(finish, 150);
    return () => clearTimeout(id);
  }, [prefersReduced, finish]);

  useEffect(() => {
    if (!active || prefersReduced) return;

    const { typeEnd, holdEnd, xfrmEnd, doneEnd } = times();
    const O = 80;

    const ids = [
      setTimeout(() => setPhase("typing"), O),
      setTimeout(() => setPhase("hold"), typeEnd + O),
      setTimeout(() => setPhase("transform"), holdEnd + O),
      setTimeout(() => setPhase("split"), xfrmEnd + CFG.panelDelay + O),
      setTimeout(() => finish(), doneEnd + 200),
    ];

    return () => ids.forEach(clearTimeout);
  }, [active, prefersReduced, finish]);

  if (!active) return null;

  const showFullName =
    phase === "typing" || phase === "hold" || phase === "idle";
  const isHold = phase === "hold";
  const isTransform = phase === "transform" || phase === "split";
  const isSplit = phase === "split";

  const vsToX = "calc(-50vw + clamp(20px, 5vw, 56px) + 18px)";
  const vsToY = "calc(-50vh + 34px)";
  const vsScale = 0.17; // ✅ refined

  const textBase: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
    fontWeight: 800,
    lineHeight: 1,
    userSelect: "none",
    whiteSpace: "nowrap",
    color: TEXT,
  };

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
      style={{ background: BG }}
    >
      {/* Hold-phase ambient glow */}
      <motion.div
        animate={{ opacity: isHold ? 1 : 0 }}
        transition={{ duration: CFG.lockInDur / 1000 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${GLOW}, transparent)`,
        }}
      />

      {/* Panels */}
      <motion.div
        animate={{ y: isSplit ? "-100%" : "0%" }}
        transition={{ duration: CFG.panelDur / 1000, ease: E_CINEMA }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: PANEL, zIndex: 10 }}
      />
      <motion.div
        animate={{ y: isSplit ? "100%" : "0%" }}
        transition={{ duration: CFG.panelDur / 1000, ease: E_CINEMA }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: PANEL, zIndex: 10 }}
      />

      {/* Content — above the panels (z-20 > panel z-10) */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* NAME */}
        <AnimatePresence>
          {showFullName && (
            <motion.div
              key="name"
              animate={{ scale: isHold ? 1.03 : 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: CFG.lockInDur / 1000, ease: E_SNAP }}
              style={{
                ...textBase,
                display: "flex",
                letterSpacing: isHold ? "-0.03em" : "0.06em",
                transition: `letter-spacing ${CFG.lockInDur}ms cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              {FULL_NAME.split("").map((char, i) =>
                char === " " ? (
                  <span key={i} style={{ width: "0.35em" }} />
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 8 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    transition={{
                      duration: CFG.letterDur / 1000,
                      delay: delays[i],
                      ease: E_SNAP,
                    }}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ),
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TRANSFORM */}
        <AnimatePresence>
          {isTransform && (
            <>
              <motion.div className="absolute flex" style={textBase}>
                {FULL_NAME.split("").map((char, i) => {
                  if (char === " ")
                    return <span key={i} style={{ width: "0.35em" }} />;

                  const isVS = VS_IDX.has(i);
                  const center = FULL_NAME.length / 2;
                  const dist = Math.abs(i - center);

                  // 🟢 VS letters → stay, then fade later
                  if (isVS) {
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 1 }}
                        animate={{
                          opacity: 0, // fades AFTER delay
                        }}
                        transition={{
                          duration: 0.2,
                          delay: 0.3, // ⬅️ IMPORTANT (wait before fading)
                          ease: "easeOut",
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  }

                  // 🔴 Other letters → fade immediately
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 1 }}
                      animate={{
                        opacity: 0,
                        y: 14 + dist * 2,
                        filter: `blur(${2 + dist * 0.4}px)`,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: 0.02 + dist * 0.015,
                        ease: "easeIn",
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </motion.div>

              {/* VS */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  x: vsToX,
                  y: vsToY,
                  scale: [1, 1.04, vsScale], // ✅ tension added
                  opacity: 1,
                }}
                transition={{
                  duration: CFG.transformDur / 1000,
                  ease: E_CINEMA,
                }}
                style={{
                  ...textBase,
                  position: "absolute",
                  letterSpacing: "-0.03em",
                }}
              >
                VS<span style={{ color: "var(--accent)" }}>.</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────── */}
      <motion.div
        animate={isTransform ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeIn" }}
        style={{
          position: "absolute",
          bottom: "clamp(48px, 7vh, 72px)",
          left: "clamp(40px, 8vw, 80px)",
          right: "clamp(40px, 8vw, 80px)",
          height: "1px",
          background: BAR_BG,
          transformOrigin: "left",
          zIndex: 20,
        }}
      >
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: isHold || isTransform ? "100%" : "55%" }}
          transition={{
            duration: isHold
              ? 0.28
              : FULL_NAME.length * (CFG.perLetter / 1000) + CFG.letterDur / 1000,
            ease: isHold ? E_SNAP : "linear",
          }}
          style={{
            height: "100%",
            background: `linear-gradient(to right, ${BAR_FG}, transparent)`,
          }}
        />
      </motion.div>

      {/* ── Label ────────────────────────────────────────────────────── */}
      <motion.span
        animate={isTransform ? { opacity: 0, y: 6 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.26 }}
        style={{
          position: "absolute",
          bottom: "clamp(28px, 4vh, 44px)",
          left: 0,
          right: 0,
          display: "block",
          textAlign: "center",
          fontFamily: "var(--font-body)",
          fontSize: "10px",
          fontWeight: 500,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: LABEL,
          zIndex: 20,
          whiteSpace: "nowrap",
        }}
      >
        Loading experience
      </motion.span>
    </div>
  );
}
