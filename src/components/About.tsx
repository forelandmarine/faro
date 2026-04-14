"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import Lighthouse from "./Lighthouse";

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

      // The large initials — scale in from slightly larger
      gsap.from(".about-initials", {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

      if (isHorizontal && scrollTween) {
        // Initials parallax — move slower than content
        gsap.to(".about-initials", {
          x: 80,
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: scrollTween,
            start: "left right",
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
      id="about"
      ref={sectionRef}
      className="panel relative flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-0 overflow-hidden"
    >
      {/*
        No card. No gradient box. No centred icon.
        The initials ARE the visual — a typographic signature
        that sits behind the text like a watermark.
      */}

      {/* Giant initials — the visual identity of this section */}
      <div className="about-initials absolute left-[5%] md:left-[8%] top-1/2 -translate-y-1/2 select-none pointer-events-none">
        <span
          className="type-display text-[clamp(14rem,30vw,28rem)] leading-none text-accent/[0.07]"
        >
          JW
        </span>
      </div>

      {/* Content — offset right, reads against the initials */}
      <div className="max-w-lg ml-auto mr-[5%] md:mr-[10%] relative z-10">
        <div className="about-reveal flex items-center gap-3 mb-8">
          <Lighthouse size={20} color="#4D869C" />
          <span className="text-foreground/70 text-xs tracking-widest uppercase">
            About Faro
          </span>
        </div>

        <div className="about-reveal">
          <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-medium">
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

    </section>
  );
}
