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
      className="panel relative flex items-start px-6 md:px-16 lg:px-24 py-16 md:py-0 md:pt-[30vh]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(77,134,156,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/*
          No eyebrow. No numbered list. No cards.
          The capabilities read as prose — a declaration, not a menu.
          Service names are typographic events: large, accented, breaking the flow.
        */}
        <div className="space-y-6 md:space-y-8">
          <p className="manifesto-line text-lg md:text-xl leading-relaxed text-foreground">
            We work end to end.
          </p>

          <h2 className="manifesto-line type-display text-[clamp(2.5rem,6vw,5rem)] text-accent leading-[0.95]">
            Websites
          </h2>

          <p className="manifesto-line text-lg md:text-xl leading-relaxed text-foreground max-w-2xl">
            that load fast, convert well, and make your competitors quietly
            redesign theirs. Strategy, design, and code. No handoffs,
            no telephone game.
          </p>

          <h2 className="manifesto-line type-display text-[clamp(2rem,5vw,4rem)] text-foreground leading-[0.95]">
            Brand Identity
          </h2>

          <p className="manifesto-line text-lg md:text-xl leading-relaxed text-foreground max-w-2xl">
            Logo, typography, colour, tone of voice. The full system,
            built to scale from favicon to billboard. Guidelines you will
            actually open twice.
          </p>

          <div className="manifesto-line flex flex-wrap gap-x-4 md:gap-x-8 gap-y-3 pt-4">
            <span className="type-display text-[clamp(1.2rem,2.5vw,2rem)] text-accent/60">Motion</span>
            <span className="text-foreground/50 type-display text-[clamp(1.2rem,2.5vw,2rem)]">/</span>
            <span className="type-display text-[clamp(1.2rem,2.5vw,2rem)] text-accent/60">3D</span>
            <span className="text-foreground/50 type-display text-[clamp(1.2rem,2.5vw,2rem)]">/</span>
            <span className="type-display text-[clamp(1.2rem,2.5vw,2rem)] text-accent/60">Photography</span>
            <span className="text-foreground/50 type-display text-[clamp(1.2rem,2.5vw,2rem)]">/</span>
            <span className="type-display text-[clamp(1.2rem,2.5vw,2rem)] text-accent/60">Editorial</span>
          </div>
        </div>
      </div>

    </section>
  );
}
