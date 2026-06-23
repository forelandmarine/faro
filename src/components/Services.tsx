"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      const triggerBase =
        isHorizontal && scrollTween
          ? {
              containerAnimation: scrollTween,
              start: "left 75%",
              toggleActions: "play none none none" as const,
            }
          : { start: "top 75%" };

      // Each line fades up independently
      gsap.from(".manifesto-line", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="panel relative flex items-center md:items-center px-5 md:px-16 lg:px-24 py-12 md:py-0 md:-translate-y-[8vh]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(77,134,156,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/*
          No eyebrow. No numbered list. No cards.
          The capabilities read as prose — a declaration, not a menu.
          Service names are typographic events: large, accented, breaking the flow.
        */}
        <div className="space-y-5 md:space-y-8">
          <p className="manifesto-line text-base md:text-xl leading-relaxed text-foreground">
            We work end to end.
          </p>

          <h2 className="manifesto-line type-display text-[clamp(3.2rem,12vw,5rem)] md:text-[clamp(1.8rem,6vw,5rem)] text-accent leading-[0.95]">
            Websites
          </h2>

          <p className="manifesto-line text-base md:text-xl leading-relaxed text-foreground/80 max-w-2xl">
            that load fast, convert well, and make your competitors quietly
            redesign theirs. Strategy, design, and code. No handoffs,
            no telephone game.
          </p>

          <h2 className="manifesto-line type-display text-[clamp(2.6rem,10vw,4rem)] md:text-[clamp(1.5rem,5vw,4rem)] text-foreground leading-[0.95]">
            Brand Identity
          </h2>

          <p className="manifesto-line text-base md:text-xl leading-relaxed text-foreground/80 max-w-2xl">
            Logo, typography, colour, tone of voice. The full system,
            built to scale from favicon to billboard. Guidelines you will
            actually open twice.
          </p>

          <div className="manifesto-line flex flex-wrap gap-x-3 md:gap-x-8 gap-y-1 pt-6 md:pt-4">
            <span className="type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)] text-accent/70">Motion</span>
            <span className="text-foreground/40 type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)]">/</span>
            <span className="type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)] text-accent/70">3D</span>
            <span className="text-foreground/40 type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)]">/</span>
            <span className="type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)] text-accent/70">Photography</span>
            <span className="text-foreground/40 type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)]">/</span>
            <span className="type-display text-[clamp(1.1rem,5vw,2rem)] md:text-[clamp(0.9rem,2.5vw,2rem)] text-accent/70">Editorial</span>
          </div>
        </div>
      </div>

    </section>
  );
}
