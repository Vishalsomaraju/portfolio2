import HeroSection from "@/features/hero/hero-section";
import AboutSection from "@/features/about/about-section";
import SkillsSection from "@/features/skills/skills-section";
import ProjectsSection from "@/features/projects/projects-section";
import ContactSection from "@/features/contact/contact-section";

export default function Home() {
  return (
    <main style={{ width: "100%", background: "var(--bg)" }}>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
