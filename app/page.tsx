import HeroSection from "@/features/hero/hero-section";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      {/* Temporary spacer for scroll testing */}
      <div className="h-[200vh] w-full bg-[#0a0a0a]" />
    </main>
  );
}
