// ─────────────────────────────────────────────────────────────────────────────
// FILE: lib/hooks/use-mobile-layout.ts
// PURPOSE: SSR-safe mobile detection hook. Returns true below 768px.
//          Uses matchMedia for reliable, resize-aware detection.
// USAGE:   const isMobile = useMobileLayout();
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState, useEffect } from "react";

const BREAKPOINT = 768;

export function useMobileLayout(): boolean {
  // SSR-safe: default to false (assume desktop until hydration)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT}px)`);
    // Sync immediately on mount
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
}
