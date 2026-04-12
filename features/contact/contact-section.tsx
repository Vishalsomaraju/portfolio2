"use client";

// ─── features/contact/contact-section.tsx ────────────────────────────────────
// Contact section. Left: heading + social links + live IST clock.
// Right: form with client-side validation and success state.

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SOCIALS = [
  { label: "GitHub",   href: "https://github.com/Vishalsomaraju",          icon: "GH" },
  { label: "LinkedIn", href: "https://linkedin.com/in/vishal-somaraju",     icon: "LI" },
  { label: "Twitter",  href: "https://twitter.com/vishalsomaraju",          icon: "TW" },
];

// ── Live IST Clock ─────────────────────────────────────────────────────────────
function ISTClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        borderRadius: 8,
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
        width: "fit-content",
      }}
    >
      <span
        style={{
          width: 6, height: 6, borderRadius: "50%",
          backgroundColor: "#4ADE80",
          boxShadow: "0 0 6px rgba(74,222,128,0.7)",
          display: "inline-block",
          animation: "clockPulse 1s ease-in-out infinite",
        }}
      />
      <span
        style={{
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.35)",
          fontFamily: "var(--font-geist-mono)",
          letterSpacing: "0.1em",
        }}
      >
        {time} IST · Hyderabad
      </span>
    </div>
  );
}

// ── Form field ────────────────────────────────────────────────────────────────
function Field({
  label, name, type = "text", multiline = false, required = true,
}: {
  label: string; name: string; type?: string;
  multiline?: boolean; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  const base: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(224,122,95,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10,
    color: "#F3F1EC",
    fontSize: "0.88rem",
    outline: "none",
    fontFamily: "var(--font-geist-sans)",
    cursor: "none",
    transition: "border-color 0.2s ease, background 0.2s ease",
    backgroundColor: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.35)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          rows={5}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, resize: "none" }}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
        />
      )}
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
type FormState = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const [state, setState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "#0a0a0a",
        paddingTop: 120,
        paddingBottom: 120,
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 100,
          alignItems: "start",
        }}
        className="grid-cols-1 lg:grid-cols-[1fr_1.2fr]"
      >
        {/* ── Left col ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ height: 1, width: 40, backgroundColor: "#E07A5F", transformOrigin: "left" }}
            />
            <span style={{
              fontSize: "0.68rem", letterSpacing: "0.28em",
              color: "#E07A5F", textTransform: "uppercase",
              fontFamily: "var(--font-geist-mono)",
            }}>
              04 / Contact
            </span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
              fontWeight: 700,
              color: "#F3F1EC",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Let&apos;s build<br />something.
          </h2>

          <p
            style={{
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.8,
              marginBottom: 40,
              maxWidth: 340,
            }}
          >
            Open to freelance projects, full-time roles, and interesting
            collaborations. If you have an idea, let&apos;s talk.
          </p>

          {/* IST clock */}
          <div style={{ marginBottom: 40 }}>
            <ISTClock />
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: 12 }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(224,122,95,0.4)";
                  el.style.color = "#E07A5F";
                }}
                onMouseOut={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "rgba(255,255,255,0.1)";
                  el.style.color = "rgba(255,255,255,0.45)";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Right col: Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          <div
            style={{
              backgroundColor: "#0F1115",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20,
              padding: "44px",
            }}
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: "center",
                    padding: "48px 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: 56, height: 56,
                      borderRadius: "50%",
                      backgroundColor: "rgba(74,222,128,0.1)",
                      border: "1px solid rgba(74,222,128,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.4rem",
                    }}
                  >
                    ✓
                  </div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "#F3F1EC" }}>
                    Message sent.
                  </h3>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.38)" }}>
                    I&apos;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 22 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Field label="Name"  name="name"  />
                    <Field label="Email" name="email" type="email" />
                  </div>
                  <Field label="Subject"  name="subject"  required={false} />
                  <Field label="Message"  name="message"  multiline />

                  {state === "error" && (
                    <p style={{ fontSize: "0.78rem", color: "#F87171" }}>
                      Something went wrong. Please try again or email directly.
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={state === "sending"}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: "14px 28px",
                      borderRadius: 10,
                      border: "1px solid #E07A5F",
                      backgroundColor:
                        state === "sending"
                          ? "rgba(224,122,95,0.2)"
                          : "rgba(224,122,95,0.1)",
                      color: "#E07A5F",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      cursor: state === "sending" ? "wait" : "none",
                      letterSpacing: "0.05em",
                      transition: "all 0.2s ease",
                      alignSelf: "flex-start",
                    }}
                  >
                    {state === "sending" ? "Sending…" : "Send Message →"}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div
        style={{
          maxWidth: 1200,
          margin: "80px auto 0",
          padding: "24px 48px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()} Vishal Somaraju. All rights reserved.
        </span>
        <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-geist-mono)" }}>
          Built with Next.js · GSAP · Three.js
        </span>
      </div>

      <style>{`
        @keyframes clockPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
