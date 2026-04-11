"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

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
      const triggerBase = isHorizontal && scrollTween
        ? { containerAnimation: scrollTween, start: "left 65%", toggleActions: "play none none none" as const }
        : { start: "top 65%" };

      // Lighthouse fades in first
      gsap.from(".contact-lighthouse", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

      // Light beam sweep
      gsap.fromTo(
        ".contact-beam",
        { opacity: 0, rotate: -30 },
        {
          opacity: 1,
          rotate: 0,
          duration: 1.5,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            ...triggerBase,
          },
        }
      );
      gsap.to(".contact-beam", {
        opacity: 0,
        delay: 1.8,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

      // Form and supporting text fade up with stagger
      gsap.from(".contact-fade", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.4,
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
      className="panel relative flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 py-16 md:py-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(126,200,227,0.06),transparent_60%)] pointer-events-none" />

      {/* Lighthouse beam sweep — fades in and out */}
      <div className="contact-beam absolute top-[20%] left-1/2 -translate-x-1/2 w-[2px] h-[30vh] bg-gradient-to-b from-accent/40 via-accent/10 to-transparent pointer-events-none opacity-0 blur-[2px] origin-bottom" />

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
        <div className="contact-lighthouse">
          <Lighthouse size={40} color="#7EC8E3" beam className="mx-auto mb-8" />
        </div>

        <SplitText
          as="h2"
          split="words"
          className="type-display text-[clamp(2rem,4.5vw,4rem)]"
          trigger={sectionRef}
          weightFrom={200}
          duration={0.9}
        >
          Let's build something extraordinary.
        </SplitText>

        <p className="contact-fade text-muted text-sm md:text-base mt-6 max-w-md mx-auto leading-relaxed">
          Full brief or napkin sketch — it does not matter where you are in the
          process. Tell us what you are building and we will tell you how we can
          help. No commitment, no sales pitch.
        </p>

        {status === "sent" ? (
          <div className="mt-12 py-12">
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
            className="contact-fade mt-10 max-w-lg mx-auto space-y-4 text-left"
            onSubmit={handleSubmit}
            data-lenis-prevent
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
                className="w-full bg-transparent border-b border-foreground/8 py-3 text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20"
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
                className="w-full bg-transparent border-b border-foreground/8 py-3 text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20"
              />
            </div>
            <div>
              <textarea
                placeholder="Tell us about your project"
                rows={3}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                required
                className="w-full bg-transparent border-b border-foreground/8 py-3 text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20 resize-none"
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-3.5 bg-accent text-background font-medium text-xs tracking-[0.1em] uppercase rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

        <div className="contact-fade mt-8 flex items-center justify-center gap-8 text-muted text-xs">
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

      {/* Integrated footer */}
      <div className="absolute bottom-6 left-0 right-0 px-6 md:px-16 lg:px-24 z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 border-t border-foreground/5 pt-6">
          <div className="flex items-center gap-2.5">
            <Lighthouse size={14} color="#7EC8E3" />
            <span className="type-display text-xs tracking-[-0.02em]">FARO</span>
          </div>
          <div className="flex items-center gap-6 text-muted text-xs">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Faro Creative
          </p>
        </div>
      </div>

      <span className="panel-number">08</span>
    </section>
  );
}
