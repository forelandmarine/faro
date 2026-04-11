"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
        delay: 3.2,
      });

      if (isHorizontal && scrollTween) {
        // Parallax: content drifts left as you scroll past
        gsap.to(contentRef.current, {
          x: -60,
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: scrollTween,
            start: "left left",
            end: "right left",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section
      ref={sectionRef}
      className="panel relative flex flex-col items-center justify-center"
    >
      <HeroScene />

      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        <div className="hero-reveal">
          <SplitText
            as="h1"
            split="chars"
            className="type-display text-[clamp(5rem,12vw,11rem)] leading-[0.9] text-white -ml-[calc(0.07em-3px)]"
            immediate
            delay={3.2}
            stagger={0.06}
            duration={1.0}
            weightFrom={100}
          >
            FARO
          </SplitText>
        </div>

        <div className="hero-reveal mt-6">
          <SplitText
            as="p"
            split="words"
            className="text-lg md:text-xl font-medium text-white max-w-md"
            immediate
            delay={3.5}
            stagger={0.05}
            duration={0.6}
          >
            Brands designed to be found.
          </SplitText>
        </div>

        <div className="hero-reveal mt-10">
          <div className="w-10 h-px bg-white/30" />
        </div>

        <div className="hero-reveal mt-6 flex items-center gap-6">
          <a
            href="#work"
            className="text-xs font-medium tracking-[0.1em] uppercase text-white hover:text-accent transition-colors"
          >
            View work
          </a>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <a
            href="#contact"
            className="text-xs font-medium tracking-[0.1em] uppercase text-white hover:text-accent transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero-reveal absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
      </div>

      <span className="panel-number">01</span>
    </section>
  );
}
