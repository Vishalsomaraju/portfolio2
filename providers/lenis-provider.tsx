"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Skip Lenis on /experience — GSAP ScrollTrigger pins need native scroll
    if (pathname?.startsWith("/experience")) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      syncTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Keep ScrollTrigger in sync with Lenis' interpolated scroll position.
    // Without this, scroll-driven GSAP animations read native window.scrollY
    // and fire at the wrong point relative to the smooth-scrolled viewport.
    lenis.on("scroll", ScrollTrigger.update);

    // Hand the RAF tick to GSAP so Lenis and all GSAP timelines
    // share a single animation loop — no duplicate rAF calls.
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from skipping frames on tab-switch recovery,
    // which would cause a visible stutter on return.
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
