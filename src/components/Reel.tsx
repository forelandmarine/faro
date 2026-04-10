"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
      });

      // Scale up the reel container
      gsap.fromTo(
        ".reel-frame",
        { scale: 0.6, borderRadius: "24px" },
        {
          scale: 1,
          borderRadius: "0px",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 1,
          },
        }
      );

      // Cinematic text overlay
      gsap.fromTo(
        ".reel-caption",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=50%",
            scrub: 1,
          },
        }
      );

      gsap.to(".reel-caption", {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=50%",
          end: "+=80%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden">
      {/* Placeholder for scroll-scrubbed video / AI fly-through */}
      <div className="reel-frame absolute inset-0 bg-surface overflow-hidden">
        {/* Animated gradient placeholder for the video */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-light to-background">
          {/* Grid lines for visual interest */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-px bg-accent"
                style={{ top: `${(i + 1) * 5}%` }}
              />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-px bg-accent"
                style={{ left: `${(i + 1) * 5}%` }}
              />
            ))}
          </div>

          {/* Floating device mockup placeholders */}
          <div className="absolute inset-0 flex items-center justify-center gap-12">
            <div className="w-64 h-44 rounded-lg border border-accent/20 bg-surface/50 backdrop-blur-sm flex items-center justify-center shadow-2xl rotate-[-5deg]">
              <div className="text-center">
                <div className="text-xs text-muted uppercase tracking-widest mb-1">Desktop</div>
                <div className="text-accent font-semibold text-sm">forelandmarine.com</div>
              </div>
            </div>
            <div className="w-36 h-72 rounded-2xl border border-accent/20 bg-surface/50 backdrop-blur-sm flex items-center justify-center shadow-2xl rotate-[3deg]">
              <div className="text-center">
                <div className="text-xs text-muted uppercase tracking-widest mb-1">Mobile</div>
                <div className="text-accent font-semibold text-sm">nimarapilates.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-background/80" />
      </div>

      {/* Caption */}
      <div ref={textRef} className="reel-caption absolute bottom-16 left-0 right-0 text-center z-10">
        <p className="text-lg font-light text-foreground/60 tracking-wide">
          Cinematic experiences, built for the web.
        </p>
      </div>
    </section>
  );
}
