"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "100%", label: "Client retention" },
  { value: "<2s", label: "Avg. load time" },
  { value: "0", label: "Templates used" },
];

const beliefs = [
  {
    num: "01",
    statement: "Every pixel is a decision.",
    detail:
      "We don't decorate — we design with intent. Nothing ships unless it earns its place.",
  },
  {
    num: "02",
    statement: "Fast sites win.",
    detail:
      "Performance isn't a feature, it's the foundation. Speed is respect for your visitor's time.",
  },
  {
    num: "03",
    statement: "The brand is the experience.",
    detail:
      "A logo is a starting point. The real brand lives in how every interaction feels.",
  },
];

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
              start: "left 75%",
              toggleActions: "play none none none" as const,
            }
          : { start: "top 75%" };

      gsap.from(".belief-card", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

      gsap.from(".stat-item", {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

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
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section
      ref={sectionRef}
      className="panel relative flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_70%,rgba(126,200,227,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-10 md:mb-14">
          <span className="type-eyebrow block mb-4">Philosophy</span>
          <SplitText
            as="h2"
            split="words"
            className="type-display text-[clamp(2rem,4vw,3.5rem)]"
            trigger={sectionRef}
            weightFrom={300}
          >
            What we believe.
          </SplitText>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12 md:mb-16">
          {beliefs.map((belief) => (
            <div
              key={belief.num}
              className="belief-card group p-6 rounded-xl bg-surface border border-foreground/5 hover:border-accent/15 transition-colors"
            >
              <span className="text-foreground/20 text-xs font-medium tabular-nums">
                {belief.num}
              </span>
              <h3 className="type-display text-lg md:text-xl mt-4 group-hover:text-accent transition-colors duration-300">
                {belief.statement}
              </h3>
              <p className="text-muted text-sm leading-relaxed mt-3">
                {belief.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-12 md:gap-16 border-t border-foreground/5 pt-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <div className="type-display text-2xl md:text-3xl text-accent">
                {stat.value}
              </div>
              <div className="text-muted text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <span className="panel-number">07</span>
    </section>
  );
}
