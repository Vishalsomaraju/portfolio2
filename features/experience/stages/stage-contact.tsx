// ─────────────────────────────────────────────────────────────────────────────
// FILE: features/experience/stages/stage-contact.tsx
// PURPOSE: Contact form rendered on the laptop screen in Stage 5
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ContactData {
  name:    string;
  email:   string;
  message: string;
}

// Shared input style to avoid repetition
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "7px 9px",
  background:   "rgba(255,255,255,0.05)",
  border:       "1px solid rgba(255,255,255,0.1)",
  borderRadius: 5, color: "#F3F1EC",
  fontSize:     "0.75rem", outline: "none",
  fontFamily:   "inherit", cursor: "none",
};

export function StageContact({
  onSubmit,
}: {
  onSubmit: (data: ContactData) => Promise<void>;
}) {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const f = e.currentTarget;
      await onSubmit({
        name:    (f.elements.namedItem("name")    as HTMLInputElement).value,
        email:   (f.elements.namedItem("email")   as HTMLInputElement).value,
        message: (f.elements.namedItem("message") as HTMLTextAreaElement).value,
      });
      setSent(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={{
      width: "100%", height: "100%",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "20px", backgroundColor: "#060608",
    }}>
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: "center" }}
        >
          <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>✓</div>
          <p style={{ fontSize: "0.85rem", color: "#E07A5F" }}>Message sent.</p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: 6 }}>
            I&apos;ll be in touch.
          </p>
        </motion.div>
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
              fontWeight: 700, color: "#F3F1EC",
              letterSpacing: "-0.02em", marginBottom: 18, textAlign: "center",
            }}
          >
            let&apos;s build something.
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              width: "100%", maxWidth: 300,
              display: "flex", flexDirection: "column", gap: 9,
            }}
          >
            <input
              name="name"
              placeholder="Your name"
              required
              style={inputStyle}
            />
            <input
              name="email"
              placeholder="your@email.com"
              required
              type="email"
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="What are we building?"
              required
              rows={3}
              style={{ ...inputStyle, resize: "none" }}
            />
            <button
              type="submit"
              disabled={busy}
              style={{
                padding: "9px 18px", borderRadius: 5,
                border: "1px solid #E07A5F",
                backgroundColor: "rgba(224,122,95,0.1)",
                color: "#E07A5F", fontSize: "0.76rem",
                fontWeight: 600, cursor: "none",
                letterSpacing: "0.04em",
                opacity: busy ? 0.6 : 1,
                transition: "opacity 0.2s, background-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (busy) return;
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E07A5F";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(224,122,95,0.1)";
                (e.currentTarget as HTMLButtonElement).style.color = "#E07A5F";
              }}
            >
              {busy ? "Sending…" : "Send →"}
            </button>
          </motion.form>
        </>
      )}
    </div>
  );
}
