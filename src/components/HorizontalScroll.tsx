"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollContextValue {
  scrollTween: gsap.core.Tween | null;
  isHorizontal: boolean;
}

/** Mutable scroll state — read imperatively by effects (no re-renders) */
export const scrollState = {
  progress: 0,
  velocity: 0,
  panelCount: 0,
};

export const HorizontalScrollContext =
  createContext<HorizontalScrollContextValue>({
    scrollTween: null,
    isHorizontal: false,
  });

export function useHorizontalScroll() {
  return useContext(HorizontalScrollContext);
}

function isHorizontalMode() {
  return typeof window !== "undefined" &&
    (window.innerWidth >= 768 || window.innerWidth > window.innerHeight);
}

export default function HorizontalScroll({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const [contextValue, setContextValue] = useState<HorizontalScrollContextValue>({
    scrollTween: null,
    isHorizontal: false,
  });

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    if (!container || !track) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px), (orientation: landscape)": function () {
          const tween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 0.5,
              end: () => "+=" + (track.scrollWidth - window.innerWidth),
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                velocityRef.current = self.getVelocity();
                scrollState.progress = self.progress;
                if (progressBar) {
                  gsap.set(progressBar, { scaleX: self.progress, transformOrigin: "left center" });
                }
              },
            },
          });

          // Gentle velocity skew
          const skewTick = () => {
            const skew = gsap.utils.clamp(-1, 1, velocityRef.current / 2000);
            gsap.set(track, { skewX: skew });
            velocityRef.current *= 0.9;
            scrollState.velocity = velocityRef.current;
          };
          gsap.ticker.add(skewTick);

          return () => {
            gsap.ticker.remove(skewTick);
          };
        },
      });
    });

    scrollState.panelCount = track.querySelectorAll(".panel").length;

    // Refresh after layout settles
    const timer = setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Grab tween reference for child components
  useEffect(() => {
    const timer = setTimeout(() => {
      const triggers = ScrollTrigger.getAll();
      const mainTrigger = triggers.find(
        (t) => t.vars.trigger === containerRef.current && t.vars.pin
      );
      if (mainTrigger?.animation) {
        setContextValue({
          scrollTween: mainTrigger.animation as gsap.core.Tween,
          isHorizontal: isHorizontalMode(),
        });
      }
    }, 300);

    const handleResize = () => {
      setContextValue((prev) => ({
        ...prev,
        isHorizontal: isHorizontalMode(),
      }));
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <HorizontalScrollContext.Provider value={contextValue}>
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="fixed bottom-0 left-0 w-full h-[3px] bg-accent/50 z-50 hidden landscape:block md:block origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <div ref={containerRef} className="horizontal-scroll-container">
        <div
          ref={trackRef}
          className="panel-track flex flex-col landscape:flex-row landscape:flex-nowrap md:flex-row md:flex-nowrap will-change-transform"
        >
          {children}
        </div>
        {/* Footer scene: inside container (shares stacking context with panels)
            but outside track (not affected by will-change-transform) */}
        {footer}
      </div>
    </HorizontalScrollContext.Provider>
  );
}
