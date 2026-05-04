"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import Lighthouse from "./Lighthouse";
import dynamic from "next/dynamic";

const AnimatedCode = dynamic(() => import("./AnimatedCode"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      const triggerBase =
        isHorizontal && scrollTween
          ? {
              containerAnimation: scrollTween,
              start: "left 65%",
              toggleActions: "play none none none" as const,
            }
          : { start: "top 65%" };

      gsap.from(".about-reveal", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

      // Lighthouse illustration entrance
      gsap.from(".about-lighthouse", {
        y: 80,
        opacity: 0,
        duration: 1.2,
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
      id="about"
      ref={sectionRef}
      className="panel relative flex items-center md:items-start px-5 md:px-16 lg:px-24 py-12 md:py-0 md:pt-[13vh]"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col md:flex-row items-start gap-12 lg:gap-20">
        {/* Text */}
        <div className="max-w-lg flex-1">
          <div className="about-reveal flex items-center gap-3 mb-8">
            <Lighthouse size={20} color="#4A8C86" />
            <span className="text-foreground/70 text-xs tracking-widest uppercase">
              About Faro
            </span>
          </div>

          <div className="about-reveal">
            <p className="text-base md:text-2xl leading-relaxed text-foreground/90 font-medium">
              Faro is a creative studio for businesses that refuse to blend in.
            </p>
          </div>

          <div className="about-reveal mt-6 space-y-4 text-foreground/80 text-base leading-relaxed">
            <p>
              We got here by building our own projects first. Superyacht
              consultancies, wellness brands, hospitality ventures. We learned
              that the best work happens when the people designing your site
              genuinely care how it turns out.
            </p>
            <p>
              No agency bloat. No account managers. No fifty-page decks that
              nobody reads. Just sharp design, clean code, and a direct line to
              the people doing the work.
            </p>
          </div>

          <div className="about-reveal mt-10 flex items-center gap-4">
            <div className="w-px h-8 bg-accent/30" />
            <div>
              <span className="text-foreground/80 text-sm font-medium">Jack</span>
              <span className="text-foreground/70 text-sm">, Founder</span>
            </div>
          </div>
        </div>

        {/* Animated code block */}
        <div className="about-lighthouse hidden md:block flex-shrink-0 w-[320px] lg:w-[380px] mt-2">
          <AnimatedCode />
        </div>
      </div>

    </section>
  );
}
