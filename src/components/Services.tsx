"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Design & Development",
    description:
      "Bespoke websites that perform as good as they look. From concept to deployment, every pixel considered.",
    num: "01",
  },
  {
    title: "Brand Identity",
    description:
      "Visual identities that hold up at every scale. Logo, type, colour, tone of voice, guidelines.",
    num: "02",
  },
  {
    title: "Creative Media",
    description:
      "Photography, video, and content that tells your story without saying a word.",
    num: "03",
  },
  {
    title: "Motion & Animation",
    description:
      "Scroll-driven narratives, micro-interactions, and cinematic transitions that keep visitors engaged.",
    num: "04",
  },
  {
    title: "3D & Interactive",
    description:
      "Immersive WebGL experiences, product configurators, and interactive storytelling for the modern web.",
    num: "05",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".services-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".service-item", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-list",
          start: "top 75%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 md:py-40 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="services-title mb-16 md:mb-20">
          <span className="type-eyebrow block mb-5">What we do</span>
          <h2 className="type-display text-[clamp(2.5rem,4.5vw,4rem)]">
            Services built
            <br />
            for ambition.
          </h2>
        </div>

        <div className="service-list border-b border-foreground/8">
          {services.map((service) => (
            <div
              key={service.num}
              className="service-item group border-t border-foreground/8 py-8 md:py-10 cursor-default"
            >
              <div className="grid grid-cols-1 md:grid-cols-[3rem_1fr_1fr] gap-4 md:gap-8 items-baseline">
                <span className="text-foreground/20 text-xs font-medium tabular-nums">
                  {service.num}
                </span>
                <h3 className="text-lg md:text-xl font-medium tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed max-w-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
