// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/laptop-svg.tsx
// PURPOSE: ASUS Zenbook 14 OLED SVG illustration — three views
//
//   View A: Front open  (lidAngle > 10) — screen + keyboard deck
//   View B: Lid back    (lidAngle ≤ 10, showInterior false) — ASUS Monogram
//   View C: Interior    (showInterior true) — real Zenbook 14 internals
//
// USAGE:
//   <LaptopSVG lidAngle={110} showInterior={false} batteryLevel={40} />
//
// Hardware reference burned into every detail:
//   Chassis:  #1C2B47  (Pericap Blue)
//   PCB:      #1A3A6B
//   Battery:  75Wh, black, bottom half
//   SSD:      M.2, center-top of chassis
//   Fan:      top-right, circular, copper heatpipes
//   Screws:   #C9A227 Phillips, all four corners
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  chassis:    "#1C2B47",
  chassisDk:  "#141E33",
  bezel:      "#111827",
  screen:     "#060608",
  keyboard:   "#161F30",
  key:        "#1E2D44",
  hinge:      "#8BA3C7",
  hingeSheen: "#9BB5D0",
  pcb:        "#1A3A6B",
  battery:    "#1A1A1A",
  batteryLbl: "#252525",
  copper:     "#B87333",
  copperLt:   "#CC8844",
  fan:        "#222230",
  fanBlade:   "#141420",
  screw:      "#C9A227",
  screwDk:    "#A07A15",
  speaker:    "#0D0D0D",
  thermal:    "#C8C8C8",
  accent:     "#E07A5F",
  text:       "#F3F1EC",
} as const;

// ── Key layout builder ────────────────────────────────────────────────────────
interface Key {
  id:    string;
  label: string;
  x:     number;
  y:     number;
  w:     number;
}

function buildKeys(): Key[] {
  const rows = [
    ["~","1","2","3","4","5","6","7","8","9","0","-","=","Bksp"],
    ["Tab","Q","W","E","R","T","Y","U","I","O","P","[","]","\\"],
    ["Caps","A","S","D","F","G","H","J","K","L",";","'","Enter"],
    ["LShift","Z","X","C","V","B","N","M",",",".","/","RShift"],
    ["LCtrl","Win","LAlt"," ","RAlt","Fn","RCtrl"],
  ];
  const wide: Record<string, number> = {
    Bksp:48, Tab:42, "\\":40, Caps:46, Enter:50,
    LShift:58, RShift:58, LCtrl:36, Win:30, LAlt:30, " ":144, RAlt:30, Fn:30, RCtrl:30,
  };
  const GAP = 2, H = 11, BASE_W = 30;
  const keys: Key[] = [];
  rows.forEach((row, ri) => {
    let x = 22;
    const y = 332 + ri * (H + GAP);
    row.forEach((lbl, ci) => {
      const w = wide[lbl] ?? BASE_W;
      keys.push({ id: `${ri}-${ci}`, label: lbl, x, y, w });
      x += w + GAP;
    });
  });
  return keys;
}

const KEYS = buildKeys();

// ── VIEW A: Front open ────────────────────────────────────────────────────────
function ViewFront({
  screenContent,
  highlightedKey,
}: {
  screenContent?: React.ReactNode;
  highlightedKey?: string | null;
}) {
  return (
    <svg
      width="560"
      height="402"
      viewBox="0 0 560 402"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ASUS Zenbook 14 — front view, lid open"
    >
      <defs>
        <linearGradient id="vf-lid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.12"/>
        </linearGradient>
        <linearGradient id="vf-deck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.03"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.18"/>
        </linearGradient>
        <linearGradient id="vf-reflect" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="1"/>
          <stop offset="40%"  stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Lid */}
      <rect x="4" y="4" width="552" height="318" rx="10" fill={C.chassis}/>
      <rect x="4" y="4" width="552" height="318" rx="10" fill="url(#vf-lid)"/>
      {/* Bezels */}
      <rect x="20" y="14"  width="520" height="9"   fill={C.bezel}/>
      <rect x="20" y="14"  width="11"  height="310" fill={C.bezel}/>
      <rect x="529" y="14" width="11"  height="310" fill={C.bezel}/>
      <rect x="20" y="304" width="520" height="18"  fill={C.bezel}/>
      {/* Screen panel */}
      <rect x="31" y="23" width="498" height="281" rx="2" fill={C.screen}/>
      {/* Screen content (foreignObject for React children) */}
      {screenContent && (
        <foreignObject x="31" y="23" width="498" height="281">
          <div
            // @ts-expect-error — xmlns required on foreignObject children
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {screenContent}
          </div>
        </foreignObject>
      )}
      {/* Subtle screen glass reflection */}
      <rect x="31" y="23" width="498" height="281" rx="2"
        fill="url(#vf-reflect)" opacity="0.035"/>
      {/* Webcam — single dot, top center */}
      <circle cx="280" cy="18.5" r="3.2" fill="#0A0A0A"/>
      <circle cx="280" cy="18.5" r="1.6" fill="#181818"/>
      <circle cx="279.2" cy="17.8" r="0.6" fill="#2A2A2A"/>
      {/* Bezel branding */}
      <text x="280" y="316" textAnchor="middle"
        fill="#3A4A5A" fontSize="6.5" fontFamily="sans-serif" letterSpacing="1.8">
        ASUS Zenbook
      </text>
      {/* Full-width hinge bar */}
      <rect x="8" y="320" width="544" height="4.5" rx="2" fill={C.hinge}/>
      <rect x="8" y="321" width="544" height="2"   rx="1" fill={C.hingeSheen}/>
      {/* Keyboard deck */}
      <rect x="0"  y="312" width="560" height="82" rx="8" fill={C.chassis}/>
      <rect x="0"  y="312" width="560" height="82" rx="8" fill="url(#vf-deck)"/>
      <rect x="14" y="326" width="532" height="62" rx="4" fill={C.keyboard}/>
      {/* Keys */}
      {KEYS.map((k) => {
        const isLit = highlightedKey === k.label;
        return (
          <rect
            key={k.id}
            x={k.x} y={k.y} width={k.w} height={11} rx="1.5"
            fill={isLit ? C.accent : C.key}
            opacity={isLit ? 1 : 0.82}
            style={{
              transition: "fill 0.12s ease",
              filter: isLit ? "drop-shadow(0 0 3px rgba(224,122,95,0.8))" : "none",
            }}
          />
        );
      })}
      {/* Trackpad */}
      <rect x="196" y="354" width="168" height="32" rx="4"
        fill="#19243A" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
      {/* Port slots — right edge */}
      {[332, 342, 353, 364].map((y, i) => (
        <rect key={i} x="554" y={y} width="3" height={i === 2 ? 8 : 6} rx="0.5" fill="#253555"/>
      ))}
    </svg>
  );
}

// ── VIEW B: Lid back — ASUS Monogram pattern ──────────────────────────────────
function ViewLidBack() {
  return (
    <svg
      width="560"
      height="342"
      viewBox="0 0 560 342"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ASUS Zenbook 14 — lid back with ASUS Monogram"
    >
      <defs>
        <linearGradient id="vb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.04"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.22"/>
        </linearGradient>
        <clipPath id="vb-clip">
          <rect x="120" y="50" width="320" height="220" rx="4"/>
        </clipPath>
      </defs>
      {/* Panel */}
      <rect x="4" y="4" width="552" height="330" rx="10" fill={C.chassis}/>
      <rect x="4" y="4" width="552" height="330" rx="10" fill="url(#vb-bg)"/>
      {/* ASUS Monogram — diagonal intersecting lines forming triangular facets */}
      <g clipPath="url(#vb-clip)" opacity="0.14">
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={`a${i}`}
            x1={80  + i*15} y1="50"  x2={300 + i*15} y2="270"
            stroke="#7090B8" strokeWidth="0.65"/>
        ))}
        {Array.from({ length: 22 }).map((_, i) => (
          <line key={`b${i}`}
            x1={80  + i*15} y1="270" x2={300 + i*15} y2="50"
            stroke="#7090B8" strokeWidth="0.65"/>
        ))}
      </g>
      {/* ASUS wordmark — bottom left */}
      <text x="42" y="316" fill="#2E4060" fontSize="12"
        fontFamily="sans-serif" fontWeight="600" letterSpacing="3.5">
        ASUS
      </text>
      {/* Hinge */}
      <rect x="8" y="326" width="544" height="10" rx="3.5" fill={C.hinge}/>
      <rect x="8" y="327" width="544" height="4"  rx="2"   fill={C.hingeSheen}/>
    </svg>
  );
}

// ── VIEW C: Interior — real Zenbook 14 internals ──────────────────────────────
function ViewInterior({
  highlightedComponent,
  onComponentHover,
}: {
  highlightedComponent?: string | null;
  onComponentHover?: (c: string | null) => void;
}) {
  // Returns overlay style based on hover state
  const hl = (name: string): React.SVGProps<SVGRectElement> =>
    highlightedComponent === name
      ? {
          fill:          "rgba(224,122,95,0.18)",
          stroke:        "#E07A5F",
          strokeWidth:   1.5,
          style: { transition: "all 0.2s ease" },
        }
      : {
          fill:          "transparent",
          stroke:        "transparent",
          strokeWidth:   0,
          style: { transition: "all 0.2s ease" },
        };

  return (
    <svg
      width="560"
      height="382"
      viewBox="0 0 560 382"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ASUS Zenbook 14 — internal components"
    >
      <defs>
        <linearGradient id="vi-pcb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.04"/>
          <stop offset="100%" stopColor="black" stopOpacity="0.08"/>
        </linearGradient>
      </defs>
      {/* Chassis shell */}
      <rect x="0" y="0" width="560" height="382" rx="10" fill={C.chassisDk}/>
      <rect x="5" y="5" width="550" height="372" rx="8" fill="#111E33"/>

      {/* ── Blue PCB (top half) ── */}
      <rect x="12" y="8" width="536" height="196" rx="4" fill={C.pcb}/>
      <rect x="12" y="8" width="536" height="196" rx="4" fill="url(#vi-pcb)"/>
      {/* PCB trace grid */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={`th${i}`} x1="12" y1={18+i*9} x2="548" y2={18+i*9}
          stroke="#1E4A80" strokeWidth="0.4" opacity="0.45"/>
      ))}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={`tv${i}`} x1={12+i*18} y1="8" x2={12+i*18} y2="204"
          stroke="#1E4A80" strokeWidth="0.35" opacity="0.3"/>
      ))}
      {/* PCB hover zone */}
      <rect x="12" y="8" width="536" height="196" rx="4"
        {...hl("pcb")} className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("pcb")}
        onMouseLeave={() => onComponentHover?.(null)}/>

      {/* ── CPU / SoC (Intel Core Ultra 5) ── */}
      <rect x="28" y="18" width="92" height="72" rx="3" fill="#0C1C32"/>
      <rect x="32" y="22" width="84" height="64" rx="2" fill="#142640"/>
      <text x="74" y="55" textAnchor="middle" fill="#2E5888" fontSize="7" fontFamily="monospace">Intel Core</text>
      <text x="74" y="65" textAnchor="middle" fill="#2E5888" fontSize="6" fontFamily="monospace">Ultra 5</text>
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x={34+i*10} y="20" width="6" height="2" fill={C.screw} opacity="0.3"/>
      ))}

      {/* ── M.2 SSD Slot (center-top — accurate Zenbook position) ── */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("ssd")}
        onMouseLeave={() => onComponentHover?.(null)}
      >
        <rect x="216" y="12" width="62" height="104" rx="2" fill="#0A1828"/>
        <rect x="218" y="14" width="58" height="100" rx="1.5" fill={C.thermal} opacity="0.86"/>
        <text x="247" y="58" textAnchor="middle" fill="#777" fontSize="6.5" fontFamily="monospace">M.2</text>
        <text x="247" y="68" textAnchor="middle" fill="#777" fontSize="6"   fontFamily="monospace">NVMe</text>
        <text x="247" y="76" textAnchor="middle" fill="#666" fontSize="5.5" fontFamily="monospace">512GB</text>
        <rect x="218" y="14" width="58" height="100" rx="1.5" {...hl("ssd")}/>
      </g>

      {/* ── WLAN card ── */}
      <rect x="292" y="18" width="42" height="30" rx="2" fill="#0C1522"/>
      <rect x="294" y="20" width="38" height="26" rx="1" fill="#131E2E"/>
      <text x="313" y="35" textAnchor="middle" fill="#253A50" fontSize="5" fontFamily="monospace">WLAN</text>

      {/* ── Fan (top-right quadrant) ── */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("fan")}
        onMouseLeave={() => onComponentHover?.(null)}
      >
        <rect x="398" y="8"  width="148" height="138" rx="6" fill="#16162A"/>
        <circle cx="472" cy="76" r="56" fill={C.fan}/>
        <circle cx="472" cy="76" r="50" fill="#1E1E2E"/>
        {/* 7 fan blades */}
        {Array.from({ length: 7 }).map((_, i) => {
          const a  = (i * 360) / 7;
          const r  = (a * Math.PI) / 180;
          const x1 = 472 + Math.cos(r) * 8,         y1 = 76 + Math.sin(r) * 8;
          const x2 = 472 + Math.cos(r + 0.55) * 46, y2 = 76 + Math.sin(r + 0.55) * 46;
          return (
            <path key={i}
              d={`M ${x1} ${y1} Q ${(x1+x2)/2 - 7} ${(y1+y2)/2} ${x2} ${y2}`}
              stroke={C.fanBlade} strokeWidth="7" fill="none" strokeLinecap="round"/>
          );
        })}
        <circle cx="472" cy="76" r="9" fill="#0E0E1E"/>
        <circle cx="472" cy="76" r="4" fill="#080810"/>
        {/* Fan hover overlay */}
        <circle cx="472" cy="76" r="56"
          fill={highlightedComponent === "fan" ? "rgba(224,122,95,0.2)" : "transparent"}
          style={{ transition: "fill 0.2s ease", cursor: "pointer" }}/>
      </g>

      {/* ── Copper heatpipes ── */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("heatpipe")}
        onMouseLeave={() => onComponentHover?.(null)}
      >
        {/* Primary pipe */}
        <path
          d="M 120 58 C 185 58 205 42 250 42 C 315 42 362 54 416 72"
          stroke={C.copper}   strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        <path
          d="M 120 58 C 185 58 205 42 250 42 C 315 42 362 54 416 72"
          stroke={C.copperLt} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45"/>
        {/* Secondary pipe */}
        <path
          d="M 120 70 C 190 70 225 84 285 84 C 345 84 382 74 416 84"
          stroke={C.copper}   strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85"/>
        {/* Hover highlight stroke */}
        <path
          d="M 120 58 C 185 58 205 42 250 42 C 315 42 362 54 416 72"
          stroke={highlightedComponent === "heatpipe" ? C.accent : "transparent"}
          strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.35"
          style={{ transition: "stroke 0.2s ease" }}/>
      </g>

      {/* ── RAM slots ── */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("ram")}
        onMouseLeave={() => onComponentHover?.(null)}
      >
        {[100, 116].map((y, ri) => (
          <g key={ri}>
            <rect x="138" y={y}   width="72" height="12" rx="1"    fill="#0C1828"/>
            <rect x="140" y={y+2} width="68" height="8"  rx="0.5"  fill="#14202E"/>
            {Array.from({ length: 16 }).map((_, i) => (
              <rect key={i} x={141+i*4} y={y+1} width="2.5" height="10" fill={C.screw} opacity="0.28"/>
            ))}
          </g>
        ))}
        <rect x="138" y="100" width="72" height="28" rx="1" {...hl("ram")}/>
      </g>

      {/* ── Battery (bottom half, ASUS 75Wh) ── */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("battery")}
        onMouseLeave={() => onComponentHover?.(null)}
      >
        <rect x="12"  y="210" width="536" height="142" rx="4" fill={C.battery}/>
        <rect x="14"  y="212" width="532" height="138" rx="3" fill={C.batteryLbl}/>
        <line x1="188" y1="214" x2="188" y2="348" stroke="#2E2E2E" strokeWidth="1"/>
        <line x1="372" y1="214" x2="372" y2="348" stroke="#2E2E2E" strokeWidth="1"/>
        <text x="280" y="268" textAnchor="middle" fill="#3A3A3A"
          fontSize="11" fontFamily="sans-serif" fontWeight="600" letterSpacing="1.2">ASUS</text>
        <text x="280" y="283" textAnchor="middle" fill="#333"
          fontSize="7.5" fontFamily="monospace">Rating: +7.74V / 75Wh</text>
        <text x="280" y="296" textAnchor="middle" fill="#2E2E2E"
          fontSize="6.5" fontFamily="monospace">Li-ion · Rechargeable</text>
        <rect x="264" y="214" width="32" height="9" rx="1" fill="#3A3A3A"/>
        <text x="280" y="221" textAnchor="middle" fill="#666" fontSize="5.5">+  −</text>
        <rect x="12" y="210" width="536" height="142" rx="4" {...hl("battery")}/>
      </g>

      {/* ── Speaker grilles (left + right bottom edges) ── */}
      <g
        className="cursor-pointer"
        onMouseEnter={() => onComponentHover?.("speaker")}
        onMouseLeave={() => onComponentHover?.(null)}
      >
        <rect x="12"  y="356" width="122" height="20" rx="2" fill={C.speaker}/>
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={16+i*5} y="358" width="3" height="16" rx="0.75" fill="#1A1A1A"/>
        ))}
        <rect x="426" y="356" width="122" height="20" rx="2" fill={C.speaker}/>
        {Array.from({ length: 24 }).map((_, i) => (
          <rect key={i} x={430+i*5} y="358" width="3" height="16" rx="0.75" fill="#1A1A1A"/>
        ))}
        {/* Invisible hover zone spanning both speakers */}
        <rect x="12" y="356" width="536" height="20" fill="transparent"/>
      </g>

      {/* ── Corner screws — yellow/gold Phillips ── */}
      {([{x:22,y:22},{x:538,y:22},{x:22,y:358},{x:538,y:358}] as const).map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="7.5" fill={C.screw}/>
          <circle cx={p.x} cy={p.y} r="5.8" fill={C.screwDk}/>
          <line x1={p.x-3} y1={p.y} x2={p.x+3} y2={p.y} stroke="#7A5A08" strokeWidth="1.4"/>
          <line x1={p.x} y1={p.y-3} x2={p.x} y2={p.y+3} stroke="#7A5A08" strokeWidth="1.4"/>
        </g>
      ))}
      {/* Extra screws near fan */}
      {([{x:408,y:18},{x:546,y:150}] as const).map((p, i) => (
        <g key={`es${i}`}>
          <circle cx={p.x} cy={p.y} r="5.5" fill={C.screw}/>
          <circle cx={p.x} cy={p.y} r="4.2" fill={C.screwDk}/>
          <line x1={p.x-2.5} y1={p.y} x2={p.x+2.5} y2={p.y} stroke="#7A5A08" strokeWidth="1.2"/>
          <line x1={p.x} y1={p.y-2.5} x2={p.x} y2={p.y+2.5} stroke="#7A5A08" strokeWidth="1.2"/>
        </g>
      ))}
    </svg>
  );
}

// ── Public imperative handle ──────────────────────────────────────────────────
export interface LaptopSVGHandle {
  element: HTMLDivElement | null;
}

// ── Master component ──────────────────────────────────────────────────────────
export interface LaptopSVGProps {
  lidAngle?:            number;       // 0 = closed, 110 = fully open
  showInterior?:        boolean;
  batteryLevel?:        number;       // 0–100
  screenContent?:       React.ReactNode;
  highlightedKey?:      string | null;
  highlightedComponent?: string | null;
  onComponentHover?:    (c: string | null) => void;
  stage?:               number;       // reserved for future use
}

export const LaptopSVG = forwardRef<LaptopSVGHandle, LaptopSVGProps>(
  (
    {
      lidAngle = 110,
      showInterior = false,
      batteryLevel = 0,
      screenContent,
      highlightedKey,
      highlightedComponent,
      onComponentHover,
    },
    ref
  ) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({ element: wrapRef.current }));

    const showLidBack = !showInterior && lidAngle <= 10;
    const showFront   = !showInterior && lidAngle > 10;
    // Clamp battery fill width to 1–16px range
    const fillW = Math.max(1, Math.round((batteryLevel / 100) * 16));

    return (
      <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
        {showFront    && (
          <ViewFront
            screenContent={screenContent}
            highlightedKey={highlightedKey}
          />
        )}
        {showLidBack  && <ViewLidBack />}
        {showInterior && (
          <ViewInterior
            highlightedComponent={highlightedComponent}
            onComponentHover={onComponentHover}
          />
        )}

        {/* Battery indicator — always visible, bottom-right corner */}
        <div
          style={{
            position: "absolute", bottom: 10, right: 18,
            display: "flex", alignItems: "center", gap: 4,
            pointerEvents: "none",
          }}
          aria-label={`Battery: ${batteryLevel}%`}
        >
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
            <rect x="0.5" y="0.5" width="18" height="11" rx="2"
              stroke="rgba(255,255,255,0.25)" strokeWidth="0.8"/>
            <rect x="18.5" y="3.5" width="3" height="5" rx="1"
              fill="rgba(255,255,255,0.25)"/>
            <rect
              x="1.5" y="1.5"
              width={fillW}
              height="9" rx="1.5"
              fill={batteryLevel > 20 ? C.accent : "#EF4444"}
              style={{ transition: "width 0.4s ease" }}
            />
          </svg>
          <span style={{
            fontSize: 7, color: "rgba(255,255,255,0.25)", fontFamily: "monospace",
          }}>
            {batteryLevel}%
          </span>
        </div>
      </div>
    );
  }
);

LaptopSVG.displayName = "LaptopSVG";
