"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lighthouse from "./Lighthouse";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      if (isHorizontal && scrollTween) {
        gsap.to(sectionRef.current!.querySelector(".panel-number"), {
          x: 120,
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: 1,
          },
        });

        // Parallax: visual drifts up as panel scrolls through
        gsap.to(".about-visual", {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: 1,
          },
        });

        gsap.from(".about-text > *", {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: scrollTween,
            start: "left 65%",
            toggleActions: "play none none none",
          },
        });
      } else {
        gsap.to(".about-visual", {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.from(".about-text > *", {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_50%,rgba(200,168,124,0.04),transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10 w-full">
        <div className="about-visual flex-1 w-full max-w-md">
          <div className="aspect-[4/5] bg-surface rounded-2xl overflow-hidden relative border border-foreground/5">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-surface to-surface-light" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Lighthouse size={140} color="#7EC8E3" beam />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
        </div>

        <div className="about-text flex-1 max-w-lg">
          <span className="type-eyebrow block mb-5">About Faro</span>
          <SplitText
            as="h2"
            split="words"
            className="type-display text-[clamp(2rem,3.5vw,3rem)] mb-6"
            trigger={sectionRef}
            weightFrom={300}
          >
            Your brand deserves better than a template.
          </SplitText>
          <div className="space-y-4 text-muted text-sm leading-relaxed">
            <p>
              Faro is a creative studio for businesses that refuse to blend in.
              We design and build digital experiences with the same care you put
              into the work they represent.
            </p>
            <p>
              We got here by building our own projects first — superyacht
              consultancies, wellness brands, hospitality ventures — and learned
              that the best work happens when the people designing your site
              genuinely care how it turns out.
            </p>
            <p>
              No agency bloat. No account managers. No fifty-page decks that
              nobody reads. Just sharp design, clean code, and a direct line to
              the people doing the work.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-surface border border-foreground/10 flex items-center justify-center">
              <span className="text-xs font-medium">JW</span>
            </div>
            <div>
              <div className="font-medium text-sm">Jack</div>
              <div className="text-muted text-xs">Founder, Faro Creative</div>
            </div>
          </div>
        </div>
      </div>

      <span className="panel-number">06</span>
    </section>
  );
}
