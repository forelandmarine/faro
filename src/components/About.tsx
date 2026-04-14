"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import Lighthouse from "./Lighthouse";

const LanyardComponent = dynamic(() => import("./Lanyard"), { ssr: false });

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



    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="panel relative flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-0"
      style={{ overflow: "visible" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16 relative z-10 w-full">
        {/* Lanyard — left side, explicit dimensions for R3F canvas */}
        <div className="hidden md:block md:w-[400px] lg:w-[450px] h-[65vh] ml-[50px] shrink-0" style={{ minHeight: "400px" }}>
          <LanyardComponent fov={40} position={[0, 0, 14]} />
        </div>

        {/* Content — right side */}
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
      </div>

    </section>
  );
}
