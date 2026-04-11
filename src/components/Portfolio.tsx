"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Foreland Marine",
    url: "forelandmarine.com",
    category: "Web Design / Brand / Development",
    description:
      "An independent superyacht consultancy needed a digital presence that matched the calibre of their work. We gave them something clean, confident, and impossible to forget.",
    image: "/portfolio/foreland.svg",
  },
  {
    name: "Nimara Pilates",
    url: "nimarapilates.com",
    category: "Web Design / Brand Identity",
    description:
      "A premium pilates studio launching in Mallorca. We designed an editorial-feeling site where every scroll feels like a breath — movement and calm expressed through whitespace and intention.",
    image: "/portfolio/nimara.svg",
  },
];

function ProjectPanel({
  project,
  index,
  panelNum,
}: {
  project: (typeof projects)[number];
  index: number;
  panelNum: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

      // Clip-path reveal + desaturated-to-color on the image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: "inset(15% 15% 15% 15%)",
            scale: 1.15,
            filter: "saturate(0) brightness(0.7)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            filter: "saturate(1) brightness(1)",
            duration: 1.6,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: panelRef.current,
              ...triggerBase,
            },
          }
        );
      }

      // Text content fade up
      gsap.from(`.project-meta-${index}`, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panelRef.current,
          ...triggerBase,
        },
      });

      // 3D hover tilt + color grading shift on image
      const imageEl = imageRef.current;
      if (imageEl) {
        const handleMove = (e: MouseEvent) => {
          const rect = imageEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(imageEl, {
            rotateY: x * 12,
            rotateX: -y * 12,
            filter: "saturate(1.2) brightness(1.05) contrast(1.05)",
            duration: 0.5,
            ease: "power2.out",
          });
        };
        const handleLeave = () => {
          gsap.to(imageEl, {
            rotateY: 0,
            rotateX: 0,
            filter: "saturate(1) brightness(1) contrast(1)",
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
          });
        };
        imageEl.addEventListener("mousemove", handleMove);
        imageEl.addEventListener("mouseleave", handleLeave);
      }
    }, panelRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal, index]);

  return (
    <section
      id={index === 0 ? "work" : undefined}
      ref={panelRef}
      className="panel relative flex items-center justify-center px-6 md:px-16 lg:px-24 py-16 md:py-0"
    >
      <div className={`absolute inset-0 pointer-events-none ${index % 2 === 0 ? "bg-[radial-gradient(ellipse_at_70%_60%,rgba(200,168,124,0.03),transparent_70%)]" : "bg-[radial-gradient(ellipse_at_30%_40%,rgba(126,200,227,0.03),transparent_70%)]"}`} />
      <div
        className={`relative z-10 flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 lg:gap-16 items-center max-w-6xl w-full`}
      >
        <div className="flex-[1.2] w-full" style={{ perspective: "1000px" }}>
          <div
            ref={imageRef}
            data-cursor-project
            className="relative aspect-[16/10] rounded-lg overflow-hidden glow"
          >
            <Image
              src={project.image}
              alt={`${project.name} website`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </div>

        <div className={`project-meta-${index} flex-1 max-w-md`}>
          <span className="type-eyebrow">{project.category}</span>
          <h3 className="text-2xl md:text-3xl font-medium tracking-[-0.01em] mt-4 leading-tight">
            {project.name}
          </h3>
          <p className="text-muted text-sm leading-relaxed mt-4">
            {project.description}
          </p>
          <a
            href={`https://${project.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-accent text-xs font-medium tracking-[0.1em] uppercase hover:gap-3 transition-all"
          >
            Visit site
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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

      <span className="panel-number">{panelNum}</span>
    </section>
  );
}

export default function Portfolio() {
  return (
    <>
      {projects.map((project, i) => (
        <ProjectPanel
          key={project.name}
          project={project}
          index={i}
          panelNum={String(i + 3).padStart(2, "0")}
        />
      ))}
    </>
  );
}
