"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-40 px-6 md:px-16 lg:px-24"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center contact-content relative z-10">
        <Lighthouse size={48} color="#C8965A" beam className="mx-auto mb-8" />

        <h2 className="text-[clamp(2.5rem,6vw,6rem)] font-black leading-[0.9] tracking-tight">
          Let&apos;s build
          <br />
          something
          <br />
          extraordinary.
        </h2>

        <p className="text-muted font-light text-lg md:text-xl mt-8 max-w-lg mx-auto leading-relaxed">
          Whether you have a full brief or just a rough idea, we would love to
          hear from you. No commitment, no pressure.
        </p>

        {/* Contact form */}
        <form
          className="mt-16 max-w-lg mx-auto space-y-6 text-left"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-transparent border-b border-foreground/10 py-4 text-lg font-light focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent border-b border-foreground/10 py-4 text-lg font-light focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20"
            />
          </div>
          <div>
            <textarea
              placeholder="Tell us about your project"
              rows={4}
              className="w-full bg-transparent border-b border-foreground/10 py-4 text-lg font-light focus:border-accent focus:outline-none transition-colors placeholder:text-foreground/20 resize-none"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-5 bg-accent text-background font-bold text-sm tracking-[0.2em] uppercase rounded-lg hover:bg-accent-light transition-colors"
            >
              Send message
            </button>
          </div>
        </form>

        <div className="mt-12 flex items-center justify-center gap-8 text-muted text-sm">
          <a
            href="mailto:hello@faro.is"
            className="hover:text-accent transition-colors"
          >
            hello@faro.is
          </a>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <a href="#" className="hover:text-accent transition-colors">
            Instagram
          </a>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <a href="#" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
