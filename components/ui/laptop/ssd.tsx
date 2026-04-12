// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/ui/laptop/ssd.tsx
// PURPOSE: M.2 2280 NVMe SSD SVG. Used in Stage 4 (Projects) eject/insert.
// USAGE:   <SSD label="VS_Projects_v3.2" isEjecting={false} />
//
// Real M.2 2280 proportions: 22mm wide × 80mm long  →  SVG 44 × 160px
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { forwardRef } from "react";

interface SSDProps {
  label?:      string;
  isEjecting?: boolean;
}

export const SSD = forwardRef<SVGSVGElement, SSDProps>(
  ({ label = "VS_Projects_v3.2", isEjecting = false }, ref) => {
    const date = new Date().toLocaleDateString("en-GB", {
      day:   "2-digit",
      month: "short",
      year:  "numeric",
    });

    return (
      <svg
        ref={ref}
        width="44"
        height="160"
        viewBox="0 0 44 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: isEjecting
            ? "drop-shadow(0 0 8px rgba(224,122,95,0.65))"
            : "none",
          transition: "filter 0.3s ease",
        }}
        aria-label={`SSD: ${label}`}
      >
        {/* PCB base — dark green like a real M.2 board */}
        <rect x="0" y="0" width="44" height="160" rx="3" fill="#1A3A2A" />

        {/* M.2 key-M notch at top connector end */}
        <rect x="18" y="0" width="8" height="3" rx="1" fill="#0a0a0a" />

        {/* Gold edge connector pins (10 per side of notch) */}
        {Array.from({ length: 10 }).map((_, i) => (
          <rect
            key={i}
            x={2 + i * 4}
            y="150"
            width="2.5"
            height="10"
            rx="0.5"
            fill="#C9A227"
          />
        ))}

        {/* Main NAND flash chip */}
        <rect x="6" y="18" width="32" height="24" rx="2" fill="#0D0D0D" />
        <rect x="8" y="20" width="28" height="20" rx="1" fill="#1A1A1A" />
        <text x="22" y="33" textAnchor="middle" fill="#444" fontSize="4.5" fontFamily="monospace">
          NAND
        </text>

        {/* NVMe controller */}
        <rect x="10" y="50" width="24" height="16" rx="2" fill="#0D0D0D" />
        <rect x="12" y="52" width="20" height="12" rx="1" fill="#181818" />
        <text x="22" y="60" textAnchor="middle" fill="#3A3A3A" fontSize="4" fontFamily="monospace">
          CTRL
        </text>

        {/* Decoupling capacitors */}
        {[76, 82, 88, 94].map((y, i) => (
          <rect
            key={y}
            x={i % 2 === 0 ? 7 : 31}
            y={y}
            width="6"
            height="3"
            rx="0.5"
            fill="#2A4A32"
          />
        ))}

        {/* PCB trace lines */}
        <line x1="22" y1="42" x2="22" y2="50" stroke="#253A28" strokeWidth="0.5" />
        <line x1="8"  y1="66" x2="8"  y2="76" stroke="#253A28" strokeWidth="0.5" />
        <line x1="36" y1="66" x2="36" y2="76" stroke="#253A28" strokeWidth="0.5" />

        {/* Product sticker */}
        <rect x="4" y="106" width="36" height="38" rx="2" fill="#F3F1EC" opacity="0.93" />
        <text x="22" y="119" textAnchor="middle" fill="#0D0D0D" fontSize="3.5" fontFamily="monospace" fontWeight="bold">
          {label}
        </text>
        <text x="22" y="127" textAnchor="middle" fill="#555" fontSize="3" fontFamily="monospace">
          512GB NVMe
        </text>
        <text x="22" y="134" textAnchor="middle" fill="#888" fontSize="2.8" fontFamily="monospace">
          {date}
        </text>

        {/* Ejecting state: accent glow border */}
        {isEjecting && (
          <rect
            x="0" y="0" width="44" height="160" rx="3"
            fill="none"
            stroke="#E07A5F"
            strokeWidth="1.5"
            opacity="0.7"
          />
        )}
      </svg>
    );
  }
);

SSD.displayName = "SSD";
