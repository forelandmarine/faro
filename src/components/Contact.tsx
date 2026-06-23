"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";
import { useHorizontalScroll } from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      const triggerBase =
        isHorizontal && scrollTween
          ? {
              containerAnimation: scrollTween,
              start: "left 65%",
              toggleActions: "play none none none" as const,
            }
          : { start: "top 65%" };

      gsap.from(".letter-line", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

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
        window.dispatchEvent(new CustomEvent("faro:form-submit"));
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
      className="panel contact-panel relative flex items-center md:items-start justify-center px-5 md:px-16 lg:px-24 py-12 md:py-0 md:pt-[18vh]"
    >
      <div className="max-w-5xl mx-auto relative z-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
          {/* Left — heading and info */}
          <div className="flex-1 max-w-md">
            <div className="letter-line">
              <Lighthouse size={22} color="#A8CCCA" className="mb-6 md:mb-8" />
            </div>

            <h2 className="letter-line type-display text-[clamp(2.8rem,11vw,4rem)] md:text-[clamp(1.8rem,5vw,4rem)] leading-[1.0] md:leading-[1.05] text-foreground mb-4">
              Write to us.
            </h2>

            <p className="letter-line text-foreground/80 text-base md:text-lg leading-relaxed mb-6 md:mb-10">
              Full brief or napkin sketch. It doesn&apos;t matter where you are
              in the process. No commitment, no sales pitch.
            </p>

            <div className="letter-line flex flex-col gap-3 text-foreground/70 text-sm">
              <a href="mailto:hello@faro.is" className="hover:text-accent transition-colors">
                hello@faro.is
              </a>
              <div className="flex gap-5">
                <a href="#" className="hover:text-accent transition-colors">Instagram</a>
                <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="flex-1 w-full max-w-lg">
            {status === "sent" ? (
              <div className="letter-line pt-4">
                <p className="text-foreground text-xl font-semibold">Sent.</p>
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
            ) : (
              <form onSubmit={handleSubmit} data-lenis-prevent className="space-y-7">
                <div className="letter-line">
                  <label htmlFor="c-name" className="text-foreground/70 text-xs tracking-wider uppercase block mb-2">
                    Name
                  </label>
                  <input
                    id="c-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full bg-transparent border-b border-foreground/20 md:border-foreground/15 pb-3 text-foreground text-base focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="letter-line">
                  <label htmlFor="c-email" className="text-foreground/70 text-xs tracking-wider uppercase block mb-2">
                    Email
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    className="w-full bg-transparent border-b border-foreground/20 md:border-foreground/15 pb-3 text-foreground text-base focus:border-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="letter-line">
                  <label htmlFor="c-message" className="text-foreground/70 text-xs tracking-wider uppercase block mb-2">
                    Your project
                  </label>
                  <textarea
                    id="c-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    className="w-full bg-transparent border-b border-foreground/20 md:border-foreground/15 pb-3 text-foreground text-base focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="letter-line pt-3">
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
            )}
          </div>
        </div>
      </div>

      {/* Footer — static on portrait, absolute on desktop */}
      <div className="contact-footer mt-12 md:mt-0 md:absolute md:bottom-6 md:left-0 md:right-0 md:px-16 lg:px-24 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-foreground/60 text-xs pt-6 border-t border-white/10 md:border-t-0 md:pt-0">
          <div className="flex items-center gap-2">
            <Lighthouse size={12} color="#A8CCCA" />
            <span className="type-display text-xs">FARO</span>
          </div>
          <p>&copy; {new Date().getFullYear()} Faro Creative</p>
        </div>
      </div>

    </section>
  );
}
