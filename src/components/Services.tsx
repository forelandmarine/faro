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
      "Visual identities that hold up at every scale. Logo, type, color, tone of voice, guidelines.",
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
      // Section title
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

      // Service items stagger
      gsap.from(".service-item", {
        y: 80,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-list",
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-40 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="services-title mb-20">
          <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase block mb-4">
            What we do
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.95] tracking-tight">
            Services built
            <br />
            for ambition.
          </h2>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <div
              key={service.num}
              className="service-item group border-t border-foreground/10 py-10 md:py-14 cursor-pointer transition-colors hover:border-accent/30"
            >
              <div className="flex items-start md:items-center justify-between gap-6 flex-col md:flex-row">
                <div className="flex items-start gap-6 md:gap-10">
                  <span className="text-accent/40 font-mono text-sm mt-1">
                    {service.num}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.5rem,3vw,3rem)] font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-muted font-light mt-2 max-w-lg text-base md:text-lg leading-relaxed opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
