"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { scrollState } from "./HorizontalScroll";

/**
 * Applies CSS-level velocity-reactive effects to the page content:
 * - Motion blur on panel edges during fast scroll
 * - Vignette overlay that intensifies with speed
 * - Panel content slight scale compression during fast scroll
 */
export default function VelocityEffects() {
  const vignetteRef = useRef<HTMLDivElement>(null);
  const blurLeftRef = useRef<HTMLDivElement>(null);
  const blurRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vignette = vignetteRef.current;
    const blurL = blurLeftRef.current;
    const blurR = blurRightRef.current;
    if (!vignette || !blurL || !blurR) return;

    const tick = () => {
      const vel = Math.min(Math.abs(scrollState.velocity) / 2500, 1.0);

      // Vignette: opacity scales with velocity
      gsap.set(vignette, { opacity: vel * 0.4 });

      // Edge blur: directional motion blur on left/right edges
      const blurAmount = vel * 8;
      gsap.set(blurL, {
        opacity: vel * 0.6,
        filter: `blur(${blurAmount}px)`,
      });
      gsap.set(blurR, {
        opacity: vel * 0.6,
        filter: `blur(${blurAmount}px)`,
      });
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <>
      {/* Velocity vignette — darkens edges during fast scroll */}
      <div
        ref={vignetteRef}
        className="fixed inset-0 z-[48] pointer-events-none opacity-0 hidden md:block"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Motion blur edges — left */}
      <div
        ref={blurLeftRef}
        className="fixed top-0 left-0 bottom-0 w-24 z-[47] pointer-events-none opacity-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.5), transparent)",
        }}
      />

      {/* Motion blur edges — right */}
      <div
        ref={blurRightRef}
        className="fixed top-0 right-0 bottom-0 w-24 z-[47] pointer-events-none opacity-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,0.5), transparent)",
        }}
      />
    </>
  );
}
