"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover",
    body: "We start by listening. Your audience, your ambitions, what keeps you up at night. No templates, no assumptions — just the groundwork for something that actually fits.",
  },
  {
    num: "02",
    title: "Design",
    body: "High-fidelity concepts that look and feel like the real thing. You see exactly what you are getting before we write a single line of code. No guesswork.",
  },
  {
    num: "03",
    title: "Develop",
    body: "Modern, performance-first code. Every animation is intentional. Every interaction is smooth. Every page loads before your visitor loses interest.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Deployed, tested, and live. We sort the hosting, the domain, the analytics, and the handover — so launch day feels like a celebration, not a crisis.",
  },
  {
    num: "05",
    title: "Grow",
    body: "The site is live but the relationship is not over. Content updates, performance tweaks, and new ideas as your business evolves.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      const triggerBase = isHorizontal && scrollTween
        ? { containerAnimation: scrollTween, start: "left 75%", toggleActions: "play none none none" as const }
        : { start: "top 75%" };

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
      }

      gsap.from(".process-step", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          ...triggerBase,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="panel relative flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(200,168,124,0.03),transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-10 md:mb-14">
          <span className="type-eyebrow block mb-4">How we work</span>
          <SplitText
            as="h2"
            split="words"
            className="type-display text-[clamp(2rem,4vw,3.5rem)]"
            trigger={sectionRef}
            weightFrom={300}
          >
            From brief to launch.
          </SplitText>
        </div>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="process-step p-5 rounded-xl bg-surface border border-foreground/5 hover:border-accent/15 transition-colors group"
            >
              <span className="text-foreground/20 text-xs font-medium tabular-nums">
                {step.num}
              </span>
              <h3 className="text-base font-medium mt-3 tracking-[-0.01em] group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mt-3">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <span className="panel-number">05</span>
    </section>
  );
}
