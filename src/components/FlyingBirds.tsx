"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollState } from "./HorizontalScroll";

/**
 * Animated birds flying across the top of the page.
 * CSS-animated wing flaps + GSAP ticker for scroll-linked horizontal drift.
 */

interface Bird {
  y: number;
  scale: number;
  speed: number;
  flapSpeed: number;
  delay: number;
}

const birds: Bird[] = [
  { y: 10, scale: 1.8, speed: 0.12, flapSpeed: 1.0, delay: 0 },
  { y: 30, scale: 1.4, speed: 0.08, flapSpeed: 1.3, delay: 0.4 },
  { y: 5, scale: 2.2, speed: 0.15, flapSpeed: 0.9, delay: 0.8 },
  { y: 55, scale: 1.2, speed: 0.06, flapSpeed: 1.5, delay: 1.2 },
  { y: 20, scale: 1.7, speed: 0.1, flapSpeed: 1.1, delay: 1.6 },
  { y: 3, scale: 1.5, speed: 0.13, flapSpeed: 1.2, delay: 2.0 },
  { y: 45, scale: 1.3, speed: 0.07, flapSpeed: 1.4, delay: 2.4 },
  { y: 15, scale: 1.9, speed: 0.11, flapSpeed: 1.0, delay: 2.8 },
];

export default function FlyingBirds() {
  const containerRef = useRef<HTMLDivElement>(null);
  const birdRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Each bird drifts right continuously + extra drift based on scroll
    const basePositions = birds.map(() => Math.random() * 100);

    const tick = () => {
      const time = Date.now() / 1000;
      const scrollOffset = scrollState.progress * 30; // scroll adds horizontal offset

      birdRefs.current.forEach((el, i) => {
        if (!el) return;
        const bird = birds[i];
        // Continuous rightward drift that wraps around
        const x = (basePositions[i] + time * bird.speed * 8 + scrollOffset) % 120 - 10;
        // Gentle vertical bob
        const yOffset = Math.sin(time * 0.5 + bird.delay * 3) * 2;
        el.style.transform = `translateX(${x}vw) translateY(${yOffset}px) scale(${bird.scale})`;
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-[15vh] md:h-[20vh] pointer-events-none z-[30] hidden landscape:block md:block"
    >
      {birds.map((bird, i) => (
        <div
          key={i}
          ref={(el) => { birdRefs.current[i] = el; }}
          className="absolute"
          style={{ top: `${bird.y}%`, left: 0 }}
        >
          <svg
            width="28"
            height="12"
            viewBox="0 0 28 12"
            fill="none"
            className="text-foreground"
          >
            {/* Left wing */}
            <path
              d="M14 6 Q10 1 2 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            >
              <animate
                attributeName="d"
                values="M14 6 Q10 1 2 3;M14 6 Q10 9 2 7;M14 6 Q10 1 2 3"
                dur={`${bird.flapSpeed}s`}
                repeatCount="indefinite"
                begin={`${bird.delay}s`}
              />
            </path>
            {/* Right wing */}
            <path
              d="M14 6 Q18 1 26 3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            >
              <animate
                attributeName="d"
                values="M14 6 Q18 1 26 3;M14 6 Q18 9 26 7;M14 6 Q18 1 26 3"
                dur={`${bird.flapSpeed}s`}
                repeatCount="indefinite"
                begin={`${bird.delay}s`}
              />
            </path>
            {/* Body dot */}
            <circle cx="14" cy="6" r="1" fill="currentColor" opacity="0.4" />
          </svg>
        </div>
      ))}
    </div>
  );
}
