"use client";

import { useCursorStore } from "@/store/use-cursor-store";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
}

export function ProjectCard({ id, title }: ProjectCardProps) {
  const { setState } = useCursorStore();

  return (
    <motion.div 
      onMouseEnter={() => setState("project", "VIEW")}
      onMouseLeave={() => setState("default")}
      className="relative p-8 border border-border transition-colors hover:bg-surface"
    >
      <h3>{title}</h3>
    </motion.div>
  );
}
