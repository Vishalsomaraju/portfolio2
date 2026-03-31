"use client";

import { motion } from "framer-motion";
import { useCursorStore } from "@/store/use-cursor-store";

export default function Cursor() {
  const { position, type } = useCursorStore();

  const getWidth = () => {
    switch (type) {
      case "project": return 80;
      case "text": return 30;
      case "hover": 
      case "cta": 
      case "drag": return 40;
      default: return 12;
    }
  };

  const getHeight = () => {
    switch (type) {
      case "project": return 80;
      case "text": return 2;
      case "hover": 
      case "cta": 
      case "drag": return 40;
      default: return 12;
    }
  };

  const width = getWidth();
  const height = getHeight();

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{
        x: position.x - width / 2,
        y: position.y - height / 2,
      }}
      transition={{
        type: "spring",
        stiffness: 200, // Reduced for inertia / physical lag
        damping: 20,
      }}
    >
      <motion.div
        className="flex items-center justify-center overflow-hidden"
        animate={{
          width: width,
          height: height,
          borderRadius: type === "text" ? 2 : 9999,
          border: type === "text" ? "none" : "1px solid rgba(224,122,95,0.8)",
          backgroundColor:
            type === "default" || type === "text" ? "rgba(224,122,95,1)" : "transparent",
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
    </motion.div>
  );
}
