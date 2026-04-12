// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/ui/screwdriver-cursor.tsx
// PURPOSE: Screwdriver SVG shown inside cursor during Stage 3 (Skills)
//          Dimensions intentionally small (22×22) to feel like a precision tool
// ─────────────────────────────────────────────────────────────────────────────

"use client";

export function ScrewdriverCursor() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Handle body */}
      <rect x="7.5" y="1" width="7" height="9" rx="2.5" fill="#E07A5F" opacity="0.95" />
      {/* Handle grip lines */}
      <line x1="8" y1="4.5" x2="15" y2="4.5" stroke="#C96A50" strokeWidth="0.8" />
      <line x1="8" y1="6.5" x2="15" y2="6.5" stroke="#C96A50" strokeWidth="0.8" />
      {/* Shaft */}
      <rect x="10.25" y="9.5" width="1.5" height="9" rx="0.5" fill="#F3F1EC" />
      {/* Flathead tip */}
      <rect x="8.5" y="18" width="5" height="1.5" rx="0.75" fill="#F3F1EC" />
    </svg>
  );
}
