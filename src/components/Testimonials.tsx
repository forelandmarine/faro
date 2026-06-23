"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      const triggerBase =
        isHorizontal && scrollTween
          ? {
              containerAnimation: scrollTween,
              start: "left 70%",
              toggleActions: "play none none none" as const,
            }
          : { start: "top 70%" };

      gsap.from(".conviction-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
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
      ref={sectionRef}
      className="panel relative flex items-center md:items-start justify-center px-5 md:px-16 lg:px-24 py-12 md:py-0 md:pt-[10vh] overflow-hidden"
    >
      {/*
        No cards. No grid. No numbers. No statistics.
        One statement. The viewport is the canvas.
        The typography IS the design.
      */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <SplitText
          as="h2"
          split="words"
          className="type-display text-[clamp(2.4rem,9vw,5.5rem)] md:text-[clamp(1.6rem,5.5vw,5.5rem)] leading-[1.05] md:leading-[1.1] text-foreground"
          trigger={sectionRef}
          weightFrom={300}
          stagger={0.06}
          duration={0.8}
        >
          Great brands aren&apos;t decorated. They&apos;re built with intention.
        </SplitText>

        <p className="conviction-sub text-foreground/70 text-base md:text-xl mt-8 md:mt-14 max-w-md md:max-w-lg mx-auto leading-relaxed">
          We design work that resonates. Great brands are made to be remembered.
        </p>
      </div>

    </section>
  );
}
