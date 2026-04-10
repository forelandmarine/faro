"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Discover",
    body: "We listen. Understand your audience, your goals, your competitors. No templates, no assumptions.",
  },
  {
    num: "02",
    title: "Design",
    body: "High-fidelity concepts that look like the final product. You see exactly what you are getting before a line of code is written.",
  },
  {
    num: "03",
    title: "Develop",
    body: "Clean, fast, modern code. Every animation intentional, every interaction smooth, every page fast.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Deployed, tested, and live. We handle hosting, domains, analytics, and the handover.",
  },
  {
    num: "05",
    title: "Grow",
    body: "Ongoing support, content updates, and iteration. Your site evolves as your business does.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Horizontal scroll
      const track = trackRef.current;
      if (!track) return;

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Progress line
      gsap.fromTo(
        ".process-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative overflow-hidden">
      <div className="h-screen flex flex-col justify-center">
        <div className="px-6 md:px-16 lg:px-24 mb-12">
          <div className="process-title max-w-7xl mx-auto">
            <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase block mb-4">
              How we work
            </span>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.95] tracking-tight">
              From brief to launch.
            </h2>
          </div>

          {/* Progress line */}
          <div className="max-w-7xl mx-auto mt-8">
            <div className="h-px bg-foreground/10 relative">
              <div className="process-line absolute inset-0 bg-accent origin-left" />
            </div>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-8 pl-6 md:pl-16 lg:pl-24 pr-[50vw]"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex-shrink-0 w-[350px] md:w-[420px] p-8 md:p-10 rounded-2xl bg-surface border border-foreground/5 hover:border-accent/20 transition-colors group"
            >
              <span className="text-accent font-mono text-sm">{step.num}</span>
              <h3 className="text-3xl md:text-4xl font-bold mt-4 tracking-tight group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-muted font-light mt-4 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
