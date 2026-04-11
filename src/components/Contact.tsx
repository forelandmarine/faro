"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content > *", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center contact-content relative z-10">
        <Lighthouse size={40} color="#7EC8E3" beam className="mx-auto mb-10" />

        <h2 className="type-display text-[clamp(2.5rem,5vw,5rem)]">
          Let&apos;s build
          <br />
          something
          <br />
          extraordinary.
        </h2>

        <p className="text-muted text-base md:text-lg mt-8 max-w-md mx-auto leading-relaxed">
          Whether you have a full brief or just a rough idea, we would love to
          hear from you. No commitment, no pressure.
        </p>

        {status === "sent" ? (
          <div className="mt-16 py-16">
            <Lighthouse size={28} color="#7EC8E3" className="mx-auto mb-4" />
            <p className="text-lg font-medium">Message sent.</p>
            <p className="text-muted text-sm mt-2">
              We will be in touch shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-accent text-xs font-medium underline underline-offset-4 hover:text-accent-light transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form
            className="mt-16 max-w-lg mx-auto space-y-6 text-left"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                className="w-full bg-transparent border-b border-foreground/8 py-4 text-base focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                required
                className="w-full bg-transparent border-b border-foreground/8 py-4 text-base focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your project"
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                required
                className="w-full bg-transparent border-b border-foreground/8 py-4 text-base focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20 resize-none"
              />
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 bg-accent text-background font-medium text-xs tracking-[0.1em] uppercase rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
              {status === "error" && (
                <p className="text-red-400 text-sm mt-3 text-center">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
            </div>
          </form>
        )}

        <div className="mt-12 flex items-center justify-center gap-8 text-muted text-xs">
          <a
            href="mailto:hello@faro.is"
            className="hover:text-accent transition-colors"
          >
            hello@faro.is
          </a>
          <span className="w-1 h-1 rounded-full bg-foreground/15" />
          <a href="#" className="hover:text-accent transition-colors">
            Instagram
          </a>
          <span className="w-1 h-1 rounded-full bg-foreground/15" />
          <a href="#" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
