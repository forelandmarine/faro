"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const ports = [
  { name: "Listen", brief: "Before we draw anything, we learn everything." },
  { name: "Design", brief: "You see the real thing before we write a line of code." },
  { name: "Build", brief: "Performance-first. Every interaction intentional." },
  { name: "Launch", brief: "Hosting, domain, analytics. Sorted." },
  { name: "Grow", brief: "The site is live. The relationship isn't over." },
];

export default function Process() {
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

      // Draw the path
      const pathEl = sectionRef.current?.querySelector<SVGPathElement>(".voyage-path");
      if (pathEl) {
        const length = pathEl.getTotalLength();
        gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(pathEl, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            ...triggerBase,
          },
        });
      }

      // Ports appear sequentially
      gsap.from(".port-stop", {
        scale: 0,
        opacity: 0,
        stagger: 0.25,
        duration: 0.5,
        ease: "back.out(2)",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

      gsap.from(".port-label", {
        y: 20,
        opacity: 0,
        stagger: 0.25,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  // Port positions along a gentle wave path
  const portPositions = [
    { x: 10, y: 55 },
    { x: 28, y: 35 },
    { x: 50, y: 50 },
    { x: 72, y: 30 },
    { x: 90, y: 48 },
  ];

  // Build SVG path through the ports
  const pathD = `M ${portPositions[0].x} ${portPositions[0].y} C ${portPositions[0].x + 10} ${portPositions[0].y - 15}, ${portPositions[1].x - 10} ${portPositions[1].y + 10}, ${portPositions[1].x} ${portPositions[1].y} S ${portPositions[2].x - 8} ${portPositions[2].y + 12}, ${portPositions[2].x} ${portPositions[2].y} S ${portPositions[3].x - 8} ${portPositions[3].y + 10}, ${portPositions[3].x} ${portPositions[3].y} S ${portPositions[4].x - 8} ${portPositions[4].y + 8}, ${portPositions[4].x} ${portPositions[4].y}`;

  return (
    <section
      id="process"
      ref={sectionRef}
      className="panel relative flex items-center md:items-start px-5 md:px-16 lg:px-24 py-12 md:py-0 md:pt-[30vh]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(77,134,156,0.06),transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10">
        {/* Title — offset, not centered */}
        <p className="text-foreground/80 text-xs md:text-sm tracking-widest uppercase mb-8 md:mb-20">
          The voyage
        </p>

        {/* The path visualization */}
        <div className="relative w-full" style={{ height: "clamp(160px, 30vh, 400px)" }}>
          <svg
            viewBox="0 0 100 80"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
            fill="none"
          >
            {/* The drawn voyage path */}
            <path
              className="voyage-path"
              d={pathD}
              stroke="#4D869C"
              strokeWidth="0.3"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />
          </svg>

          {/* Port stops */}
          {ports.map((port, i) => (
            <div
              key={port.name}
              className="absolute"
              style={{
                left: `${portPositions[i].x}%`,
                top: `${portPositions[i].y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* The dot */}
              <div className="port-stop w-3 h-3 rounded-full bg-accent border-2 border-background" />

              {/* Label — alternating above/below */}
              <div
                className={`port-label absolute left-1/2 -translate-x-1/2 ${
                  i % 2 === 0 ? "top-6" : "bottom-6"
                } whitespace-nowrap`}
              >
                <span className="type-display text-xs md:text-lg block text-foreground">
                  {port.name}
                </span>
                <span className="text-foreground/80 text-[10px] md:text-sm block mt-0.5 max-w-[120px] md:max-w-[180px] whitespace-normal leading-snug">
                  {port.brief}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
