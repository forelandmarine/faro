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

      <div ref={contentRef} className="relative z-10 w-full max-w-7xl px-6 md:px-16 lg:px-24">
        <div className="hero-reveal">
          <h1 className="type-display text-[clamp(5rem,12vw,11rem)] leading-[0.9] tracking-[-0.03em] text-white">
            FARO
          </h1>
        </div>

        <div className="hero-reveal mt-6">
          <p className="text-lg md:text-xl font-medium text-white/60 max-w-md">
            Brands designed to be found.
          </p>
        </div>

        <div className="hero-reveal mt-10">
          <div className="w-10 h-px bg-white/15" />
        </div>

        <div className="hero-reveal mt-6 flex items-center gap-6">
          <a
            href="#work"
            className="text-xs font-medium tracking-[0.1em] uppercase text-white/80 hover:text-accent transition-colors"
          >
            View work
          </a>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <a
            href="#contact"
            className="text-xs font-medium tracking-[0.1em] uppercase text-white/35 hover:text-white/70 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero-reveal absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
