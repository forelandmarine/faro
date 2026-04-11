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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".process-step", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="process-title mb-16">
          <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase block mb-4">
            How we work
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-display font-extrabold italic leading-[0.95] tracking-tight">
            From brief to launch.
          </h2>
        </div>

        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="process-step p-6 rounded-xl bg-surface border border-foreground/5 hover:border-accent/20 transition-colors group"
            >
              <span className="text-accent font-mono text-sm">{step.num}</span>
              <h3 className="text-xl font-medium mt-3 tracking-tight group-hover:text-accent transition-colors">
                {step.title}
              </h3>
              <p className="text-muted font-light mt-3 text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
