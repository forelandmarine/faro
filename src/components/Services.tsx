"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Web Design & Development",
    description:
      "Strategy, design, and code — end to end. We build sites that load fast, convert well, and make your competitors quietly redesign theirs.",
    num: "01",
  },
  {
    title: "Brand Identity",
    description:
      "The full system: logo, typography, colour, tone of voice, and a guidelines document you will actually use. Built to scale from favicon to billboard.",
    num: "02",
  },
  {
    title: "Creative Media",
    description:
      "Photography, video, and editorial content shaped around your brand voice. Not stock. Not generic. Yours.",
    num: "03",
  },
  {
    title: "Motion & Animation",
    description:
      "Scroll-driven storytelling, page transitions, and micro-interactions that give your site a pulse. Subtle where it matters, bold where it counts.",
    num: "04",
  },
  {
    title: "3D & Interactive",
    description:
      "WebGL experiences, product visualisers, and interactive layers that turn visitors into participants. The web can do more than most people think.",
    num: "05",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      const triggerBase = isHorizontal && scrollTween
        ? { containerAnimation: scrollTween, start: "left 75%", toggleActions: "play none none none" as const }
        : { start: "top 75%" };

      // Parallax on panel number — moves slower than content for depth
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

      gsap.from(".service-item", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-list",
          ...triggerBase,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="panel relative flex items-center px-6 md:px-16 lg:px-24 py-16 md:py-0"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(126,200,227,0.04),transparent_70%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="mb-10 md:mb-14">
          <span className="type-eyebrow block mb-4">What we do</span>
          <SplitText
            as="h2"
            split="words"
            className="type-display text-[clamp(2rem,4vw,3.5rem)]"
            trigger={sectionRef}
            weightFrom={300}
          >
            Services built for ambition.
          </SplitText>
        </div>

        <div className="service-list border-b border-foreground/8">
          {services.map((service) => (
            <div
              key={service.num}
              className="service-item group border-t border-foreground/8 py-5 md:py-6 cursor-default"
            >
              <div className="grid grid-cols-1 md:grid-cols-[3rem_1fr_1fr] gap-3 md:gap-8 items-baseline">
                <span className="text-foreground/20 text-xs font-medium tabular-nums">
                  {service.num}
                </span>
                <h3 className="text-base md:text-lg font-medium tracking-[-0.01em] group-hover:text-accent transition-colors duration-300">
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

      <span className="panel-number">02</span>
    </section>
  );
}
