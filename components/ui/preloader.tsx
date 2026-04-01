"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSiteStore } from "@/store/use-site-store";

export function Preloader() {
  const [active, setActive] = useState(true);
  const setLoaded = useSiteStore((s) => s.setLoaded);

  const wrapRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const tl = gsap.timeline();

    // 1 — counter 0 → 100  (1.4s, power2.in so it accelerates)
    const proxy = { val: 0 };
    tl.to(proxy, {
      val: 100,
      duration: 1.4,
      ease: "power2.in",
      onUpdate() {
        const v = Math.floor(proxy.val);
        if (numRef.current)
          numRef.current.textContent = String(v).padStart(2, "0");
        if (barFillRef.current) barFillRef.current.style.width = v + "%";
      },
    });

    // 2 — hold at 100 briefly
    tl.to({}, { duration: 0.28 });

    // 3 — content fades out, panels split simultaneously
    tl.to(
      contentRef.current,
      { opacity: 0, duration: 0.22, ease: "power2.in" },
      "<",
    );
    tl.to(
      topRef.current,
      { y: "-100%", duration: 0.85, ease: "power4.inOut" },
      "<0.08",
    );
    tl.to(
      botRef.current,
      {
        y: "100%",
        duration: 0.85,
        ease: "power4.inOut",
        onComplete() {
          setLoaded();
          setActive(false);
        },
      },
      "<",
    );
  }, []);

  if (!active) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        pointerEvents: "none",
      }}
    >
      {/* Top panel */}
      <div
        ref={topRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "#080808",
        }}
      />

      {/* Bottom panel */}
      <div
        ref={botRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          background: "#080808",
        }}
      />

      {/* Content — floats above both panels */}
      <div
        ref={contentRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          zIndex: 1,
        }}
      >
        {/* Counter */}
        <span
          ref={numRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(5rem, 16vw, 14rem)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.05em",
            color: "var(--text)",
            fontVariantNumeric: "tabular-nums",
            userSelect: "none",
          }}
        >
          00
        </span>

        {/* Label */}
        <span
          ref={tagRef}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.25)",
          }}
        >
          Loading experience
        </span>

        {/* Thin progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            right: "40px",
            height: "1px",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          <div
            ref={barFillRef}
            style={{
              height: "100%",
              width: "0%",
              background:
                "linear-gradient(to right, var(--accent), rgba(224,122,95,0.3))",
              transition: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
