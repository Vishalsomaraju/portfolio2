"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/providers/theme-provider";

// ─── Data ─────────────────────────────────────────────────────────────────────
const links = [
  { label: "About",   href: "#about",    num: "01" },
  { label: "Skills",  href: "#skills",   num: "02" },
  { label: "Work",    href: "#projects", num: "03" },
  { label: "Contact", href: "#contact",  num: "04" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconMoon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M12.5 9A6 6 0 1 1 5 1.5a4.5 4.5 0 0 0 7.5 7.5z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconSun() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7.5" r="2.5" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 7.5 + 4.2 * Math.cos(rad);
        const y1 = 7.5 + 4.2 * Math.sin(rad);
        const x2 = 7.5 + 5.8 * Math.cos(rad);
        const y2 = 7.5 + 5.8 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
      <rect width="20" height="1.5" rx="0.75" fill="currentColor" />
      <rect y="6.25" width="12" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export function Nav() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [mounted,   setMounted]   = useState(false);
  const { theme, setTheme }       = useTheme();
  const isDark                    = theme === "dark";

  useEffect(() => setMounted(true), []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-lock while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 540);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerBg =
    scrolled || menuOpen ? "var(--overlay-bg)" : "transparent";
  const headerBlur =
    scrolled || menuOpen ? "blur(24px) saturate(160%)" : "none";
  const headerBorder =
    scrolled && !menuOpen ? "1px solid var(--border)" : "1px solid transparent";

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 9000,
          height: "68px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 clamp(20px, 5vw, 56px)",
          background: headerBg,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
          borderBottom: headerBorder,
          transition: "background 0.4s, border-color 0.4s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          className="nav-logo"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "19px",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 1,
          }}
        >
          VS<span style={{ color: "var(--accent)" }}>.</span>
        </button>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

          {/* Desktop nav links */}
          <nav
            className="nav-desktop"
            style={{ display: "flex", gap: "2px", alignItems: "center", marginRight: "16px" }}
          >
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="nav-item"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: "var(--muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px 14px",
                  borderRadius: "8px",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Theme toggle — square with rounded corners */}
          <motion.button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            whileTap={{ scale: 0.9 }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            className="theme-toggle"
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--input-bg)",
              color: "var(--muted)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              outline: "none",
              transition: "background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mounted && (
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {isDark ? <IconMoon /> : <IconSun />}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Hire me — desktop only */}
          <button
            onClick={() => handleNavClick("#contact")}
            className="hire-btn"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "var(--accent)",
              background: "var(--accent-subtle)",
              border: "1px solid var(--accent-border)",
              borderRadius: "99px",
              padding: "8px 20px",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            Hire me
          </button>

          {/* Mobile menu trigger */}
          <motion.button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="menu-trigger"
            whileTap={{ scale: 0.9 }}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--input-bg)",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              outline: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={menuOpen ? "close" : "open"}
                initial={{ opacity: 0, rotate: menuOpen ? -45 : 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: menuOpen ? 45 : -45 }}
                transition={{ duration: 0.16 }}
                style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {menuOpen ? <IconX /> : <IconMenu />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 8900,
              background: "var(--overlay-bg)",
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              display: "flex",
              flexDirection: "column",
              padding: "0 clamp(24px, 8vw, 56px)",
              overflowY: "auto",
            }}
          >
            {/* Top bar inside overlay (mirrors header) */}
            <div
              style={{
                height: "68px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "19px",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  color: "var(--text)",
                }}
              >
                VS<span style={{ color: "var(--accent)" }}>.</span>
              </span>
              <motion.button
                onClick={() => setMenuOpen(false)}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  background: "var(--input-bg)",
                  color: "var(--text)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <IconX />
              </motion.button>
            </div>

            {/* Nav links — vertically centred */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingTop: "24px",
                paddingBottom: "24px",
              }}
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.42,
                    delay: 0.1 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="menu-nav-link"
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "clamp(18px, 3vh, 28px) 0",
                      background: "none",
                      border: "none",
                      borderBottom: i < links.length - 1 ? "1px solid var(--border)" : "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      className="menu-link-text"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(2.4rem, 9vw, 4.8rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        color: "var(--text)",
                        lineHeight: 1.08,
                        transition: "color 0.2s",
                      }}
                    >
                      {link.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.25em",
                        color: "var(--faint)",
                        textTransform: "uppercase",
                        flexShrink: 0,
                        marginLeft: "16px",
                      }}
                    >
                      {link.num}
                    </span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Footer row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                paddingBottom: "clamp(28px, 5vh, 48px)",
                paddingTop: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid var(--border)",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    color: "var(--faint)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  © 2025 Vishal Somaraju
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "10px",
                    color: "var(--faint)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Full-Stack Developer
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {/* Theme toggle inside mobile overlay */}
                <motion.button
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    background: "var(--input-bg)",
                    color: "var(--muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mounted && (
                      <motion.span
                        key={theme + "-mobile"}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.16 }}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        {isDark ? <IconMoon /> : <IconSun />}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <button
                  onClick={() => handleNavClick("#contact")}
                  className="menu-cta"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    color: "var(--accent)",
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--accent-border)",
                    borderRadius: "99px",
                    padding: "10px 22px",
                    cursor: "pointer",
                    transition: "background 0.2s, color 0.2s, border-color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                >
                  Let's work together →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive & interaction styles ─────────────────────────── */}
      <style>{`
        /* Desktop (≥ 769px) */
        @media (min-width: 769px) {
          .nav-desktop  { display: flex !important; }
          .hire-btn     { display: inline-flex !important; }
          .menu-trigger { display: none !important; }
        }

        /* Mobile (≤ 768px) */
        @media (max-width: 768px) {
          .nav-desktop  { display: none !important; }
          .hire-btn     { display: none !important; }
          .menu-trigger { display: flex !important; }
        }

        /* Logo hover */
        .nav-logo:hover { opacity: 0.8; }

        /* Desktop nav item hover */
        .nav-item:hover {
          color: var(--text) !important;
          background: var(--card-bg) !important;
        }

        /* Theme toggle hover + focus */
        .theme-toggle:hover {
          color: var(--text) !important;
          border-color: var(--border-strong) !important;
          background: var(--input-bg-focus) !important;
        }
        .theme-toggle:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* Hire me hover */
        .hire-btn:hover {
          background: var(--accent) !important;
          color: #fff !important;
          border-color: var(--accent) !important;
        }

        /* Mobile nav link hover */
        .menu-nav-link:hover .menu-link-text { color: var(--accent) !important; }

        /* Mobile CTA hover */
        .menu-cta:hover {
          background: var(--accent) !important;
          color: #fff !important;
          border-color: var(--accent) !important;
        }
      `}</style>
    </>
  );
}
