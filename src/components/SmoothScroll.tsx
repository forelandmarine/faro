"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Module-level ref so other components can drive Lenis programmatically */
export const lenisInstance: { current: Lenis | null } = { current: null };

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Landscape phones use native CSS scroll — Lenis would fight it
    const isLandscapeMobile =
      window.innerWidth > window.innerHeight && window.innerHeight < 600;
    if (isLandscapeMobile) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.0,
    });
    lenisRef.current = lenis;
    lenisInstance.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance.current = null;
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}
