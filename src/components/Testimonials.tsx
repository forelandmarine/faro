"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topRow = [
  "Your brand deserves more than a template.",
  "Design that feels like you, not like everyone else.",
  "We don't do ordinary.",
  "Websites should make people feel something.",
  "Built different, on purpose.",
];

const bottomRow = [
  "Premium design, without the agency markup.",
  "Fast sites. Slow scrolls. Big impressions.",
  "Every pixel is a decision.",
  "If your website doesn't excite you, it won't excite anyone.",
  "Good design is good business.",
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonials-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 mb-16">
        <div className="testimonials-title max-w-7xl mx-auto">
          <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase block mb-4">
            Philosophy
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-display font-extrabold italic leading-[0.95] tracking-tight">
            Words we
            <br />
            work by.
          </h2>
        </div>
      </div>

      {/* Marquee rows */}
      <div className="space-y-6">
        {/* Top row - scrolls left */}
        <div className="relative">
          <div className="animate-marquee-left flex whitespace-nowrap">
            {[...topRow, ...topRow].map((text, i) => (
              <span
                key={i}
                className="inline-block text-2xl md:text-4xl font-bold tracking-tight text-foreground/10 hover:text-foreground/60 transition-colors duration-500 cursor-default px-8"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom row - scrolls right */}
        <div className="relative">
          <div className="animate-marquee-right flex whitespace-nowrap">
            {[...bottomRow, ...bottomRow].map((text, i) => (
              <span
                key={i}
                className="inline-block text-2xl md:text-4xl font-bold tracking-tight text-foreground/10 hover:text-foreground/60 transition-colors duration-500 cursor-default px-8"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
