"use client";

import { useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";
import Lighthouse from "./Lighthouse";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    if (window.innerWidth >= 768) {
      const track = document.querySelector(".panel-track");
      if (!track) return;
      const style = window.getComputedStyle(track);
      const matrix = new DOMMatrix(style.transform);
      const currentX = matrix.m41;
      const targetRect = target.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const targetOffset = targetRect.left - trackRect.left + Math.abs(currentX);
      const totalTrackOverflow = track.scrollWidth - window.innerWidth;
      const mainTrigger = ScrollTrigger.getAll().find((t) => t.vars.pin);
      if (mainTrigger) {
        const scrollRatio = targetOffset / totalTrackOverflow;
        const targetScroll = mainTrigger.start + (mainTrigger.end - mainTrigger.start) * scrollRatio;
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

        // Fade out scroll hint
        gsap.to(".scroll-hint", {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: scrollTween,
            start: "left left",
            end: "left -10%",
            scrub: true,
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

      <div ref={contentRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 -translate-y-[3vh] md:-translate-y-[10vh] md:-translate-x-[15%]">
        <div className="hero-reveal flex items-center gap-[0.12em]">
          <SplitText
            as="h1"
            split="chars"
            className="type-display text-[clamp(3rem,12vw,11rem)] leading-[0.9] text-white -ml-[calc(0.07em-3px)]"
            immediate
            delay={3.2}
            stagger={0.06}
            duration={1.0}
            weightFrom={100}
          >
            FARO
          </SplitText>
          <span className="inline-block h-[0.675em] w-auto" style={{ fontSize: "clamp(5rem,12vw,11rem)" }}>
            <Lighthouse size={120} color="#ffffff" beam className="h-full w-auto" />
          </span>
        </div>

        <div className="hero-reveal mt-2">
          <SplitText
            as="p"
            split="words"
            className="text-base md:text-xl font-medium text-white/80 max-w-md"
            immediate
            delay={3.4}
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
            onClick={(e) => handleClick(e, "#work")}
            className="text-xs font-medium tracking-[0.1em] uppercase text-white hover:text-accent transition-colors border-b border-white/30 pb-0.5 hover:border-accent"
          >
            View work
          </a>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="text-xs font-medium tracking-[0.1em] uppercase text-white hover:text-accent transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll affordance — horizontal arrow, fades on scroll */}
      <div className="scroll-hint absolute bottom-10 right-10 z-10 hidden md:flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase">
        <span>Scroll</span>
        <svg width="20" height="8" viewBox="0 0 20 8" fill="none">
          <path d="M0 4h16M13 1l3 3-3 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

    </section>
  );
}
