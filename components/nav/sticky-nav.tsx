"use client";

// ─── components/nav/sticky-nav.tsx ───────────────────────────────────────────
// Sticky nav with VS. logo, section links, and scroll-aware hide/show.
// Morphs from transparent → frosted glass as user scrolls past 60px.

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursorStore } from "@/store/use-cursor-store";

const LINKS = [
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export default function StickyNav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [visible,   setVisible]   = useState(true);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);
  const setType = useCursorStore((s) => s.setType);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      // Hide nav when scrolling down fast, show when scrolling up
      setVisible(y < lastY.current || y < 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 500,
        padding: "0 32px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: scrolled
          ? "rgba(10,10,10,0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid transparent",
      }}
    >
      {/* Logo */}
      <a
        href="#"
        data-cursor="hover"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        style={{
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#E07A5F",
          letterSpacing: "-0.02em",
          textDecoration: "none",
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        VS.
      </a>

      {/* Desktop links */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 36,
        }}
        className="hidden md:flex"
      >
        {LINKS.map((l) => (
          <button
            key={l.href}
            onClick={() => scrollTo(l.href)}
            data-cursor="hover"
            onMouseEnter={() => setType("hover")}
            onMouseLeave={() => setType("default")}
            style={{
              background: "none",
              border: "none",
              cursor: "none",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.06em",
              fontFamily: "var(--font-geist-sans)",
              transition: "color 0.2s ease",
              padding: "4px 0",
              position: "relative",
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#F3F1EC")
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color =
                "rgba(255,255,255,0.45)")
            }
          >
            {l.label}
          </button>
        ))}

        {/* Experience CTA */}
        <a
          href="/experience"
          data-cursor="cta"
          onMouseEnter={() => setType("cta")}
          onMouseLeave={() => setType("default")}
          style={{
            fontSize: "0.78rem",
            padding: "7px 16px",
            borderRadius: 9999,
            border: "1px solid rgba(224,122,95,0.5)",
            color: "#E07A5F",
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.backgroundColor = "#E07A5F";
            el.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.backgroundColor = "transparent";
            el.style.color = "#E07A5F";
          }}
        >
          Experience →
        </a>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="flex md:hidden"
        onClick={() => setMenuOpen((v) => !v)}
        style={{
          background: "none",
          border: "none",
          cursor: "none",
          padding: 6,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{
              rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
              y:      menuOpen && i === 0 ? 9  : menuOpen && i === 2 ? -9 : 0,
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
            transition={{ duration: 0.22 }}
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              backgroundColor: "rgba(255,255,255,0.7)",
              transformOrigin: "center",
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              top: 64,
              left: 0,
              right: 0,
              backgroundColor: "rgba(10,10,10,0.96)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              padding: "20px 32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  textAlign: "left",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.05em",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                {l.label}
              </button>
            ))}
            <a
              href="/experience"
              style={{
                display: "inline-block",
                marginTop: 4,
                fontSize: "0.85rem",
                color: "#E07A5F",
                textDecoration: "none",
              }}
            >
              Enter the full experience →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
