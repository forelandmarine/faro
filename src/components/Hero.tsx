"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=50%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <HeroScene />

      <div ref={contentRef} className="relative z-10 w-full max-w-[90vw] px-6">
        {/* Main title */}
        <div className="hero-reveal">
          <h1 className="text-[clamp(4rem,15vw,14rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-white">
            FARO
          </h1>
        </div>

        {/* Tagline */}
        <div className="hero-reveal mt-4 md:mt-6">
          <p className="text-[clamp(1rem,2.5vw,1.75rem)] font-light leading-snug text-white/70 max-w-xl">
            Brands designed to be found.
          </p>
        </div>

        {/* Separator */}
        <div className="hero-reveal mt-8 md:mt-10">
          <div className="w-12 h-px bg-white/20" />
        </div>

        {/* CTA */}
        <div className="hero-reveal mt-6 md:mt-8 flex items-center gap-6">
          <a
            href="#work"
            className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/90 hover:text-accent transition-colors"
          >
            View work
          </a>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <a
            href="#contact"
            className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/40 hover:text-white/80 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-reveal absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
