// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/data/projects.ts
// PURPOSE: Project data fed to Stage 4. Replace stub URLs with real links.
// ─────────────────────────────────────────────────────────────────────────────

export interface ProjectItem {
  id:          string;
  title:       string;
  description: string;
  stack:       string[];
  liveUrl:     string;
  repoUrl:     string;
}

export const projects: ProjectItem[] = [
  {
    id:          "p1",
    title:       "Portfolio — Main Site",
    description: "Premium 3D portfolio with scroll-driven particle systems and cinematic section transitions.",
    stack:       ["Next.js", "React Three Fiber", "GSAP", "Framer Motion"],
    liveUrl:     "https://vishalsomaraju.dev",
    repoUrl:     "https://github.com/Vishalsomaraju/portfolio2",
  },
  {
    id:          "p2",
    title:       "Project Apex",
    description: "Full-stack SaaS platform with real-time collaboration, JWT auth, and PostgreSQL backend.",
    stack:       ["Next.js", "Node.js", "PostgreSQL", "Redis"],
    liveUrl:     "#",
    repoUrl:     "#",
  },
  {
    id:          "p3",
    title:       "Project Orbit",
    description: "WebSocket-powered live dashboard with sub-100ms updates and D3.js data visualization.",
    stack:       ["React", "WebSockets", "Express", "D3.js"],
    liveUrl:     "#",
    repoUrl:     "#",
  },
  {
    id:          "p4",
    title:       "Project Echo",
    description: "Mobile-first PWA with offline support, push notifications, and GraphQL data layer.",
    stack:       ["React", "GraphQL", "MongoDB", "PWA"],
    liveUrl:     "#",
    repoUrl:     "#",
  },
];
