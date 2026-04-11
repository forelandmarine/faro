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

/** Mutable scroll state — read imperatively by shader effects (no re-renders) */
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

export default function HorizontalScroll({ children }: { children: ReactNode }) {
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
        // Desktop: horizontal scroll
        "(min-width: 768px)": function () {
          const tween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 1,
              end: () => "+=" + (track.scrollWidth - window.innerWidth),
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                velocityRef.current = self.getVelocity();
                scrollState.progress = self.progress;
                // Update progress bar
                if (progressBar) {
                  gsap.set(progressBar, { scaleX: self.progress, transformOrigin: "left center" });
                }
              },
            },
          });

          // Velocity-based skew + update global scroll state for shaders
          const skewTick = () => {
            const skew = gsap.utils.clamp(-2, 2, velocityRef.current / 1000);
            gsap.set(track, { skewX: skew });
            velocityRef.current *= 0.92;
            // Update mutable state (read by shader effects, no re-renders)
            scrollState.velocity = velocityRef.current;
          };
          gsap.ticker.add(skewTick);

          // Store cleanup for this matchMedia scope
          return () => {
            gsap.ticker.remove(skewTick);
          };
        },
      });
    });

    // Count panels for shader transition system
    scrollState.panelCount = track.querySelectorAll(".panel").length;

    // Small delay then refresh to ensure all panels are measured
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Update context after ScrollTrigger is set up
  useEffect(() => {
    // We need to grab the tween after it's created
    const timer = setTimeout(() => {
      const triggers = ScrollTrigger.getAll();
      const mainTrigger = triggers.find(
        (t) => t.vars.trigger === containerRef.current && t.vars.pin
      );
      if (mainTrigger?.animation) {
        setContextValue({
          scrollTween: mainTrigger.animation as gsap.core.Tween,
          isHorizontal: window.innerWidth >= 768,
        });
      }
    }, 200);

    const handleResize = () => {
      setContextValue((prev) => ({
        ...prev,
        isHorizontal: window.innerWidth >= 768,
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
        className="fixed bottom-0 left-0 w-full h-[2px] bg-accent/60 z-50 hidden md:block origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <div ref={containerRef} className="horizontal-scroll-container">
        <div
          ref={trackRef}
          className="panel-track flex flex-col md:flex-row md:flex-nowrap will-change-transform"
        >
          {children}
        </div>
      </div>
    </HorizontalScrollContext.Provider>
  );
}
