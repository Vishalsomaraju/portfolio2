"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const socials = [
  { label: "GitHub", href: "https://github.com/Vishalsomaraju" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
];

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  const fieldStyle: React.CSSProperties = {
    fontFamily: "var(--font-body)",
    fontSize: "15px",
    color: "var(--text)",
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "10px",
    padding: "14px 18px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "var(--accent)";
    e.target.style.background = "var(--input-bg-focus)";
    e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.borderColor = "var(--input-border)";
    e.target.style.background = "var(--input-bg)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "120px 0 0",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, var(--hero-glow) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
        {/* Chapter label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-80px" }}
          className="chapter-label"
          style={{ marginBottom: "48px" }}
        >
          04 — Contact
        </motion.div>

        {/* Big CTA heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          style={{ marginBottom: "80px" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              marginBottom: "32px",
            }}
          >
            Let's build
            <br />
            <span
              style={{
                WebkitTextStroke: "2px var(--accent)",
                color: "transparent",
              }}
            >
              something.
            </span>
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
              color: "var(--muted)",
              maxWidth: "480px",
              lineHeight: 1.75,
            }}
          >
            Available for freelance projects, full-time roles, and interesting
            collaborations. If you have a vision, let's make it real.
          </p>
        </motion.div>

        {/* Two column: form + info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            paddingBottom: "80px",
          }}
          className="contact-grid"
        >
          {/* ── Form ────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
          >
            {sent ? (
              <div
                style={{
                  padding: "48px 40px",
                  border: "1px solid var(--accent-border)",
                  borderRadius: "16px",
                  background: "var(--accent-subtle)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    marginBottom: "12px",
                  }}
                >
                  ✦
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: "8px",
                  }}
                >
                  Message sent!
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    color: "var(--muted)",
                  }}
                >
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {[
                  {
                    id: "name",
                    label: "Name",
                    type: "text",
                    placeholder: "Your name",
                  },
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "your@email.com",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <label
                      htmlFor={field.id}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "var(--label)",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.id as keyof typeof formState]}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          [field.id]: e.target.value,
                        })
                      }
                      required
                      style={fieldStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                ))}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <label
                    htmlFor="message"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--label)",
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    required
                    rows={5}
                    style={{ ...fieldStyle, resize: "vertical" }}
                    onFocus={
                      handleFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement>
                    }
                    onBlur={
                      handleBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    color: "white",
                    background: sending
                      ? "rgba(224,122,95,0.6)"
                      : "var(--accent)",
                    border: "1px solid var(--accent)",
                    borderRadius: "10px",
                    padding: "16px 32px",
                    cursor: "pointer",
                    transition:
                      "transform 0.2s, box-shadow 0.2s, background 0.25s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                  onMouseOver={(e) => {
                    if (!sending) {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-2px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 8px 30px var(--accent-glow)";
                    }
                  }}
                  onMouseOut={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "none";
                  }}
                >
                  {sending ? (
                    <>
                      <span
                        style={{
                          width: "14px",
                          height: "14px",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                          animation: "spin 0.6s linear infinite",
                        }}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send message →"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* ── Info column ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-60px" }}
            style={{ paddingTop: "8px" }}
          >
            {/* Email */}
            <div style={{ marginBottom: "48px" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--label)",
                  marginBottom: "14px",
                }}
              >
                Email
              </div>
              <a
                href="mailto:vishal@example.com"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
                  fontWeight: 600,
                  color: "var(--text)",
                  textDecoration: "none",
                  letterSpacing: "-0.02em",
                  transition: "color 0.25s",
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--accent)";
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--text)";
                }}
              >
                vishalsomaraju9@gmail.com
              </a>
            </div>

            {/* Based in */}
            <div style={{ marginBottom: "48px" }}>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--label)",
                  marginBottom: "14px",
                }}
              >
                Based in
              </div>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                }}
              >
                Hyderabad, India
                <br />
                <span
                  style={{
                    fontSize: "1rem",
                    color: "var(--muted)",
                    fontWeight: 400,
                  }}
                >
                  Available remotely worldwide
                </span>
              </p>
            </div>

            {/* Socials */}
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--label)",
                  marginBottom: "20px",
                }}
              >
                Find me on
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "var(--muted)",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "color 0.25s",
                      width: "fit-content",
                    }}
                    onMouseOver={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--text)";
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color =
                        "var(--muted)";
                    }}
                  >
                    {s.label}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1 9L9 1M9 1H3M9 1V7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "24px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "100%",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--faint)",
          }}
        >
          © 2025 Vishal Somaraju. Crafted with intention.
        </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "12px",
            color: "var(--faint)",
          }}
        >
          Next.js · R3F · GSAP · Framer
        </span>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        /* Respect theme transition on inputs */
        input, textarea {
          transition: background var(--theme-transition) ease,
                      border-color var(--theme-transition) ease,
                      color var(--theme-transition) ease;
        }
      `}</style>
    </section>
  );
}
