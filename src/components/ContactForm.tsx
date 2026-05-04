"use client";

import { useState } from "react";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="py-8">
        <p className="text-foreground text-2xl font-semibold">Sent.</p>
        <p className="text-foreground/70 text-base mt-3">
          We&apos;ll be in touch shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-accent text-sm tracking-wider uppercase hover:text-accent-light transition-colors"
        >
          Write another &rarr;
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-foreground/20 pb-3 text-foreground text-base focus:border-accent focus:outline-none transition-colors";

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? "space-y-5" : "space-y-7"}
    >
      <Field label="Name">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
          className={inputClass}
        />
      </Field>
      <Field label="Email">
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
          className={inputClass}
        />
      </Field>
      <Field label="Your project">
        <textarea
          rows={compact ? 3 : 5}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          className={`${inputClass} resize-none`}
        />
      </Field>
      <div className="pt-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-accent text-white px-8 py-3 rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-accent-light transition-colors disabled:opacity-40"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
        {status === "error" && (
          <p className="text-red-500 text-sm mt-3">
            Something went wrong. Try again or email us directly.
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-foreground/70 text-xs tracking-wider uppercase block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
