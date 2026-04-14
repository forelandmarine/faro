"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import Lighthouse from "./Lighthouse";
import "./coastline/coastline.css";

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
      className="panel relative flex items-start px-6 md:px-16 lg:px-24 py-16 md:py-0 md:pt-[28vh]"
    >
      <div className="max-w-6xl mx-auto relative z-10 w-full flex flex-col md:flex-row items-start gap-12 lg:gap-20">
        {/* Text */}
        <div className="max-w-lg flex-1">
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

        {/* Large lighthouse illustration — reliable SVG, animated beam */}
        <div className="about-lighthouse hidden md:flex flex-col items-center justify-center flex-shrink-0 w-[200px] lg:w-[240px] mt-4">
          <svg
            viewBox="0 0 120 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            {/* Beam rays */}
            <g className="origin-[60px_52px]" style={{ animation: "beam-right 6s ease-in-out infinite" }}>
              <path d="M60 52L180 30" stroke="#7AB2B2" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
              <path d="M60 52L180 74" stroke="#7AB2B2" strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
              <polygon points="60,48 180,28 180,76 60,56" fill="#7AB2B2" opacity="0.04" />
            </g>
            <g className="origin-[60px_52px]" style={{ animation: "beam-left 6s ease-in-out infinite" }}>
              <path d="M60 52L-60 30" stroke="#7AB2B2" strokeWidth="0.8" opacity="0.25" strokeLinecap="round" />
              <path d="M60 52L-60 74" stroke="#7AB2B2" strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />
              <polygon points="60,48 -60,28 -60,76 60,56" fill="#7AB2B2" opacity="0.04" />
            </g>

            {/* Tower body */}
            <path d="M48 170L52 62H68L72 170Z" fill="#1A2A35" opacity="0.85" />

            {/* Blue stripes */}
            <rect x="53" y="90" width="14" height="8" fill="#4D869C" opacity="0.7" rx="1" />
            <rect x="52" y="115" width="16" height="8" fill="#4D869C" opacity="0.7" rx="1" />
            <rect x="51" y="140" width="18" height="8" fill="#4D869C" opacity="0.7" rx="1" />

            {/* Lamp room */}
            <rect x="49" y="44" width="22" height="14" rx="2" fill="#1A2A35" opacity="0.9" />
            <rect x="52" y="47" width="16" height="8" rx="1" fill="#CDE8E5" opacity="0.3" />

            {/* Light glow */}
            <circle cx="60" cy="52" r="4" fill="#7AB2B2" opacity="0.9" />
            <circle cx="60" cy="52" r="12" fill="#7AB2B2" opacity="0.08" />

            {/* Cap/dome */}
            <path d="M49 44L60 28L71 44Z" fill="#1A2A35" opacity="0.75" />

            {/* Spire */}
            <line x1="60" y1="28" x2="60" y2="16" stroke="#1A2A35" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

            {/* Gallery rail */}
            <line x1="44" y1="44" x2="76" y2="44" stroke="#1A2A35" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

            {/* Windows */}
            <rect x="56" y="100" width="8" height="10" rx="4" fill="#CDE8E5" opacity="0.15" />
            <rect x="56" y="125" width="8" height="10" rx="4" fill="#CDE8E5" opacity="0.15" />

            {/* Base */}
            <rect x="42" y="168" width="36" height="8" rx="2" fill="#1A2A35" opacity="0.7" />
            <rect x="38" y="174" width="44" height="4" rx="1" fill="#1A2A35" opacity="0.4" />

            {/* Ground line */}
            <line x1="20" y1="178" x2="100" y2="178" stroke="#1A2A35" strokeWidth="0.5" opacity="0.15" />
          </svg>

          <p className="text-foreground/30 text-[10px] tracking-[0.3em] uppercase mt-4">
            Est. 2024
          </p>
        </div>
      </div>

    </section>
  );
}
