// ─────────────────────────────────────────────────────────────────────────────
// FILE: app/experience/layout.tsx
// PURPOSE: Route-level layout for /experience.
//          Preserves root-layout fonts; overrides only scrollbar visibility.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:       "Experience | Vishal Somaraju",
  description:
    "An interactive, hardware-driven portfolio experience built on an ASUS Zenbook 14 OLED. Scroll to explore.",
  openGraph: {
    title:       "Experience | Vishal Somaraju",
    description: "Scroll-driven cinematic portfolio experience.",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Force dark appearance regardless of root theme setting
    // overflow: hidden auto keeps the ScrollTrigger pin working
    <div
      style={{
        overflow:        "hidden auto",
        backgroundColor: "#0A0D14",
        colorScheme:     "dark",
        minHeight:       "100vh",
        position:        "relative",
      }}
      className="experience-root"
    >
      {children}
    </div>
  );
}
