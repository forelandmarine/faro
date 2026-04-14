"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Foreland Marine",
    url: "forelandmarine.com",
    category: "Web / Brand / Dev",
    image: "/portfolio/foreland.png",
  },
  {
    name: "Nimara Pilates",
    url: "nimarapilates.com",
    category: "Web / Brand",
    image: "/portfolio/nimara.png",
  },
];

function ProjectPanel({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
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

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            clipPath: "inset(5% 5% 5% 5%)",
            scale: 1.04,
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

      gsap.from(".project-caption-" + index, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: panelRef.current,
          ...triggerBase,
        },
      });

      const imageEl = imageRef.current;
      if (imageEl) {
        const handleMove = (e: MouseEvent) => {
          const rect = imageEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(imageEl, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.5,
            ease: "power2.out",
          });
        };
        const handleLeave = () => {
          gsap.to(imageEl, {
            rotateY: 0,
            rotateX: 0,
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
      className="panel relative flex flex-col items-center px-8 md:px-20 lg:px-28 py-16 md:py-0"
      style={{ justifyContent: "center", paddingBottom: "15vh" }}
    >
      {/* iPad-style device container */}
      <div className="w-full max-w-[65vw] md:max-w-[52vw]" style={{ perspective: "1200px" }}>
        <div
          ref={imageRef}
          data-cursor-project
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: "8px solid #1A2A35",
            borderRadius: "20px",
            boxShadow: "0 8px 40px rgba(26,42,53,0.15), 0 2px 10px rgba(26,42,53,0.1)",
          }}
        >
          {/* Top bezel with camera dot */}
          <div className="relative bg-[#1A2A35] h-5 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#2A3E4A]" />
          </div>

          {/* Screen */}
          <div className="relative aspect-[4/3] bg-[#f0f0f0]">
            <Image
              src={project.image}
              alt={`${project.name} website`}
              fill
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className={`project-caption-${index} mt-4 md:mt-5 flex items-center gap-6`}>
        <span className="text-foreground text-lg md:text-xl font-semibold">
          {project.name}
        </span>
        <span className="text-foreground/60 text-sm font-medium">
          {project.category}
        </span>
        <a
          href={`https://${project.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent text-xs font-semibold tracking-wider uppercase hover:text-accent-light transition-colors"
        >
          Visit
          <span className="inline-block ml-1">&#8599;</span>
        </a>
      </div>

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
        />
      ))}
    </>
  );
}
