import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }

  // If RESEND_API_KEY is configured, send via Resend.
  // Otherwise, log to console (useful during development).
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: "Faro Website <hello@faro.is>",
          to: process.env.CONTACT_EMAIL || "hello@faro.is",
          subject: `New enquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        console.error("Resend error:", data);
        return NextResponse.json(
          { error: "Failed to send message. Please try again." },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error("Email send error:", err);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }
  } else {
    console.log("Contact form submission:", { name, email, message });
  }

  return NextResponse.json({ success: true });
}
