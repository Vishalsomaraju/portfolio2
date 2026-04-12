// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/cursor/cursor.tsx
// PURPOSE: Custom cursor — handles all CursorType variants incl. "screwdriver"
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { motion } from "framer-motion";
import { useCursorStore } from "@/store/use-cursor-store";
import { ScrewdriverCursor } from "@/components/ui/screwdriver-cursor";

// Map each cursor type to its bounding-box dimensions
function getDimensions(type: string): { w: number; h: number } {
  switch (type) {
    case "project":     return { w: 80, h: 80 };
    case "text":        return { w: 30, h: 2 };
    case "hover":
    case "cta":
    case "drag":        return { w: 40, h: 40 };
    case "screwdriver": return { w: 24, h: 24 };
    default:            return { w: 12, h: 12 };
  }
}

export default function Cursor() {
  const { position, type } = useCursorStore();
  const { w, h } = getDimensions(type);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{ x: position.x - w / 2, y: position.y - h / 2 }}
      transition={{
        type: "spring",
        // Screwdriver feels heavier / more precise than a light cursor ring
        stiffness: type === "screwdriver" ? 320 : 200,
        damping:   type === "screwdriver" ? 26  : 20,
      }}
    >
      {type === "screwdriver" ? (
        <ScrewdriverCursor />
      ) : (
        <motion.div
          className="flex items-center justify-center overflow-hidden"
          animate={{
            width:           w,
            height:          h,
            borderRadius:    type === "text" ? 2 : 9999,
            border:          type === "text" ? "none" : "1px solid rgba(224,122,95,0.8)",
            backgroundColor:
              type === "default" || type === "text"
                ? "rgba(224,122,95,1)"
                : "transparent",
            boxShadow:
              type !== "default"
                ? "0 0 25px rgba(224,122,95,0.35)"
                : "none",
          }}
          transition={{ duration: 0.2 }}
        >
          {type === "project" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[10px] tracking-widest font-bold text-white uppercase"
            >
              View
            </motion.span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
