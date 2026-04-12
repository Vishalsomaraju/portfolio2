// ─── app/api/contact/route.ts ─────────────────────────────────────────────────
// POST /api/contact — handles form submissions from both main site and /experience.
// Currently logs to console. Wire up Resend / Nodemailer / your email provider here.

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // ─── Email sending logic ────────────────────────────────────────────────
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: process.env.CONTACT_EMAIL || "your@email.com",
        subject: subject || `New message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      });
      console.log("[Contact] Email sent via Resend for:", email);
    } else {
      console.log("[Contact] RESEND_API_KEY omitted. Logged locally:");
      console.log({ name, email, subject, message });
    }
    // ───────────────────────────────────────────────────────────────────────

    return NextResponse.json({ success: true, message: "Message received." });
  } catch (err) {
    console.error("[Contact] Error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
