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
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden">
      <div className="px-6 md:px-16 lg:px-24 mb-16 md:mb-20">
        <div className="testimonials-title max-w-7xl mx-auto">
          <span className="type-eyebrow block mb-5">Philosophy</span>
          <h2 className="type-display text-[clamp(2.5rem,4.5vw,4rem)]">
            Words we
            <br />
            work by.
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="animate-marquee-left flex whitespace-nowrap">
            {[...topRow, ...topRow].map((text, i) => (
              <span
                key={i}
                className="inline-block text-xl md:text-3xl font-medium tracking-tight text-foreground/8 hover:text-foreground/50 transition-colors duration-500 cursor-default px-6 md:px-8"
              >
                {text}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="animate-marquee-right flex whitespace-nowrap">
            {[...bottomRow, ...bottomRow].map((text, i) => (
              <span
                key={i}
                className="inline-block text-xl md:text-3xl font-medium tracking-tight text-foreground/8 hover:text-foreground/50 transition-colors duration-500 cursor-default px-6 md:px-8"
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
