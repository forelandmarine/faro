"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Foreland Marine",
    url: "forelandmarine.com",
    category: "Web Design / Brand / Development",
    description:
      "A refined digital presence for an independent superyacht consultancy. Clean, confident, and built to reflect the calibre of the work.",
  },
  {
    name: "Nimara Pilates",
    url: "nimarapilates.com",
    category: "Web Design / Brand Identity",
    description:
      "A warm, editorial-feeling site for a premium pilates studio launching in Mallorca. Movement and calm expressed through scroll and space.",
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".portfolio-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Animate each project card
      gsap.from(".project-card", {
        y: 100,
        opacity: 0,
        stagger: 0.25,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".project-grid",
          start: "top 70%",
        },
      });

      // 3D tilt effect on each device mockup
      document.querySelectorAll<HTMLElement>(".device-mockup").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(el, {
            rotateY: x * 20,
            rotateX: -y * 20,
            duration: 0.5,
            ease: "power2.out",
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-40 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <div className="portfolio-title mb-20">
          <span className="text-accent text-sm font-medium tracking-[0.3em] uppercase block mb-4">
            Selected work
          </span>
          <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-black leading-[0.95] tracking-tight">
            The proof is
            <br />
            in the pixels.
          </h2>
        </div>

        <div className="project-grid space-y-32">
          {projects.map((project, i) => (
            <div
              key={project.name}
              className={`project-card flex flex-col ${
                i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 lg:gap-20 items-center`}
            >
              {/* Device mockup */}
              <div className="flex-1 w-full" style={{ perspective: "1000px" }}>
                <div className="device-mockup relative aspect-[16/10] bg-surface rounded-xl border border-foreground/5 overflow-hidden glow transition-shadow hover:shadow-accent/10">
                  {/* Browser chrome */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-surface-light flex items-center px-4 gap-2 border-b border-foreground/5">
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
                    <div className="flex-1 mx-4">
                      <div className="h-4 bg-foreground/5 rounded-full max-w-xs mx-auto flex items-center justify-center">
                        <span className="text-[10px] text-muted">
                          {project.url}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Placeholder site content */}
                  <div className="absolute inset-0 top-8 bg-gradient-to-br from-surface via-surface-light to-surface p-6 flex flex-col justify-center items-center">
                    <div className="w-full max-w-sm space-y-3">
                      <div className="h-3 bg-accent/10 rounded w-1/3" />
                      <div className="h-8 bg-accent/15 rounded w-2/3" />
                      <div className="h-2 bg-foreground/5 rounded w-full mt-4" />
                      <div className="h-2 bg-foreground/5 rounded w-4/5" />
                      <div className="h-2 bg-foreground/5 rounded w-3/5" />
                      <div className="flex gap-2 mt-6">
                        <div className="h-8 w-24 bg-accent/20 rounded" />
                        <div className="h-8 w-20 border border-foreground/10 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Project info */}
              <div className="flex-1 max-w-md">
                <span className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
                  {project.category}
                </span>
                <h3 className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight mt-3 leading-[0.95]">
                  {project.name}
                </h3>
                <p className="text-muted font-light mt-4 text-base leading-relaxed">
                  {project.description}
                </p>
                <a
                  href={`https://${project.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-accent text-sm font-semibold tracking-wide uppercase hover:gap-3 transition-all"
                >
                  Visit site
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
