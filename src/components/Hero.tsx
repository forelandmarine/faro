"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "./HeroScene";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin and drive scroll progress for the 3D scene
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          scrollState.progress = self.progress;
        },
      });

      // Title + subtitle visible at start, fades out as camera rises
      gsap.to(textRef.current, {
        opacity: 0,
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=40%",
          scrub: 1,
        },
      });

      // CTA fades in at the end of the orbit
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "+=220%",
            end: "+=280%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroScene />

      {/* Opening text - visible at start of scroll */}
      <div
        ref={textRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="text-[clamp(3rem,8vw,9rem)] font-black leading-[0.9] tracking-tighter mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.7)]">
          FARO
        </h1>
        <p className="text-[clamp(1.1rem,2.5vw,2rem)] font-light leading-tight text-foreground/90 max-w-2xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.8)]">
          We design websites that make
          <br />
          people stop scrolling.
        </p>
      </div>

      {/* CTA - fades in at end of orbit */}
      <div
        ref={ctaRef}
        className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-4 opacity-0"
      >
        <p className="text-sm font-light text-foreground/60 tracking-wide drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          Creative studio for the web
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#work"
            className="text-sm font-semibold tracking-widest uppercase border-b-2 border-accent pb-1 hover:text-accent transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            See our work
          </a>
          <a
            href="#contact"
            className="text-sm font-semibold tracking-widest uppercase text-muted hover:text-foreground transition-colors drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Get in touch
          </a>
        </div>
        <div className="mt-4 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
            <path
              d="M12 4v16m0 0l-6-6m6 6l6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
