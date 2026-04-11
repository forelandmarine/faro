"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on the visual side
      gsap.to(".about-visual", {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Text reveal
      gsap.from(".about-text > *", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
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
      id="about"
      ref={sectionRef}
      className="relative py-40 px-6 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center relative z-10">
        {/* Visual side */}
        <div className="about-visual flex-1 w-full">
          <div className="aspect-[4/5] bg-surface rounded-2xl overflow-hidden relative border border-foreground/5">
            {/* Abstract placeholder with lighthouse */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-surface to-surface-light" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lighthouse size={160} color="#7EC8E3" beam />
            </div>
            {/* Film grain vibe */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>

        {/* Text side */}
        <div className="about-text flex-1 max-w-lg">
          <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase block mb-4">
            About Faro
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-display font-extrabold italic leading-[0.95] tracking-tight mb-6">
            Your brand
            <br />
            deserves better
            <br />
            than a template.
          </h2>
          <div className="space-y-4 text-muted font-light leading-relaxed">
            <p>
              Faro is a creative studio that designs and builds digital
              experiences for businesses that take their brand seriously.
            </p>
            <p>
              We started by building our own projects, from superyacht
              consultancies to wellness brands, and learned that the best
              websites come from people who actually care about the outcome.
            </p>
            <p>
              No agency bloat. No fifty-page decks. Just sharp design, clean
              code, and a direct line to the people doing the work.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-surface border border-foreground/10 flex items-center justify-center">
              <span className="text-sm font-bold">JW</span>
            </div>
            <div>
              <div className="font-semibold text-sm">Jack</div>
              <div className="text-muted text-xs">Founder, Faro Creative</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
