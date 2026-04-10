"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Lighthouse from "./Lighthouse";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading progress
    const tl = gsap.timeline();

    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      }
    );

    tl.to(
      ".preloader-text span",
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "power3.out",
      },
      0.3
    );

    tl.to(".preloader-lighthouse", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    }, 0.2);

    tl.to(".preloader-content", {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      delay: 0.3,
    });

    tl.to(
      [leftRef.current, rightRef.current],
      {
        xPercent: (i: number) => (i === 0 ? -100 : 100),
        duration: 1,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    tl.call(onComplete);

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] pointer-events-none">
      <div ref={leftRef} className="curtain-left flex items-center justify-end pr-4">
        <div className="preloader-content flex flex-col items-end gap-4">
          <div className="preloader-lighthouse opacity-0 scale-75">
            <Lighthouse size={40} beam />
          </div>
        </div>
      </div>
      <div ref={rightRef} className="curtain-right flex items-center justify-start pl-4">
        <div className="preloader-content">
          <div className="preloader-text overflow-hidden">
            {"FARO".split("").map((char, i) => (
              <span
                key={i}
                className="inline-block text-6xl font-black tracking-tighter opacity-0 translate-y-full"
              >
                {char}
              </span>
            ))}
          </div>
          <div className="text-muted text-sm font-light mt-2 tabular-nums">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
