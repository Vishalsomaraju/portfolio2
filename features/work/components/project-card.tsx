"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
}

export function ProjectCard({ id, title }: ProjectCardProps) {
  return (
    <motion.div
      className="relative p-8 border border-border transition-colors hover:bg-surface"
      style={{ cursor: "pointer" }}
    >
      <h3>{title}</h3>
    </motion.div>
  );
}
