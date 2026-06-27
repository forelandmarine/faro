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

function isLandscapeMobile() {
  return typeof window !== "undefined" &&
    window.innerWidth > window.innerHeight &&
    window.innerHeight < 600;
}

function isHorizontalMode() {
  if (typeof window === "undefined") return false;
  // Landscape phones use native CSS scroll — not GSAP horizontal mode
  if (isLandscapeMobile()) return false;
  return window.innerWidth >= 768;
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

  /* ── Update scrollState.progress from native scroll on landscape mobile ── */
  useEffect(() => {
    if (!isLandscapeMobile()) return;
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      scrollState.progress = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP horizontal scroll — desktop & tablets only ─────────── */
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    const progressBar = progressRef.current;
    if (!container || !track) return;

    // Landscape phones use native CSS scroll-snap — skip GSAP entirely
    if (isLandscapeMobile()) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(min-width: 768px) and (min-height: 601px)": function () {
          // 5% dead zone at the start — hero stays pinned while user
          // scrolls the first 5%, then panels begin moving.
          const totalScroll = () => track.scrollWidth - window.innerWidth;
          const deadZone = () => totalScroll() * 0.05;

          const tween = gsap.to(track, {
            x: () => -totalScroll(),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              pin: true,
              scrub: 0.5,
              end: () => "+=" + (totalScroll() + deadZone()),
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                velocityRef.current = self.getVelocity();
                // Remap progress: first 5% of scroll = 0 progress
                const raw = self.progress;
                const deadFraction = deadZone() / (totalScroll() + deadZone());
                const adjusted = raw <= deadFraction
                  ? 0
                  : (raw - deadFraction) / (1 - deadFraction);
                scrollState.progress = adjusted;
                if (progressBar) {
                  gsap.set(progressBar, { scaleX: adjusted, transformOrigin: "left center" });
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
    if (isLandscapeMobile()) return;

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
      {/* Progress bar — hidden on landscape mobile (native scroll has its own) */}
      <div
        ref={progressRef}
        className="fixed bottom-0 left-0 w-full h-[3px] bg-accent/50 z-50 hidden md:block origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <div ref={containerRef} className="horizontal-scroll-container">
        <div
          ref={trackRef}
          className="panel-track flex flex-col md:flex-row md:flex-nowrap will-change-transform"
        >
          {children}
        </div>
        {footer}
      </div>
    </HorizontalScrollContext.Provider>
  );
}
