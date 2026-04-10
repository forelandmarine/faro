"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(textRef.current, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=60%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl">
        <div className="hero-line flex items-center justify-center gap-3 mb-8">
          <Lighthouse size={28} beam />
          <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent">
            Creative Studio
          </span>
        </div>

        <h1 className="hero-line text-[clamp(3rem,8vw,9rem)] font-black leading-[0.9] tracking-tighter mb-6">
          FARO
        </h1>

        <p className="hero-line text-[clamp(1.1rem,2.5vw,2rem)] font-light leading-tight text-foreground/80 max-w-2xl mx-auto">
          Brands designed to be found.
        </p>

        <div className="hero-line mt-12 flex items-center justify-center gap-8">
          <a
            href="#work"
            className="text-sm font-semibold tracking-widest uppercase border-b-2 border-accent pb-1 hover:text-accent transition-colors"
          >
            See our work
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold tracking-widest uppercase text-muted hover:text-foreground transition-colors"
          >
            Get in touch
          </a>
        </div>

        <div className="hero-line mt-16 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto opacity-40">
            <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
