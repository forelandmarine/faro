# Horizontal Scroll Implementation Guide

A reusable pattern for converting any Next.js + GSAP site into a horizontal-scrolling experience. Implemented and tested on the Faro Creative site.

## Dependencies

```bash
npm install gsap lenis
```

- **GSAP 3.x** with ScrollTrigger plugin
- **Lenis** for smooth scroll (optional but recommended)
- **Tailwind CSS** (classes used below, adapt if not using Tailwind)
- **React 18+** / Next.js 13+ (App Router, `"use client"` components)

## Architecture

The system has three layers:

1. **HorizontalScroll wrapper** — pins a container, translates a flex-row track on the X axis based on vertical scroll progress
2. **Panel sections** — each child component is a `100vw x 100vh` panel laid out in a row
3. **Context** — exposes the master `scrollTween` so child panels can bind their own ScrollTrigger animations to horizontal position

## Step 1: Create `HorizontalScroll.tsx`

This is the core engine. Copy this component into your project:

```tsx
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
                if (progressBar) {
                  gsap.set(progressBar, {
                    scaleX: self.progress,
                    transformOrigin: "left center",
                  });
                }
              },
            },
          });

          // Optional: velocity-based skew for cinematic feel
          const skewTick = () => {
            const skew = gsap.utils.clamp(-2, 2, velocityRef.current / 1000);
            gsap.set(track, { skewX: skew });
            velocityRef.current *= 0.92;
          };
          gsap.ticker.add(skewTick);

          return () => {
            gsap.ticker.remove(skewTick);
          };
        },
      });
    });

    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  // Grab the tween reference after ScrollTrigger creates it
  useEffect(() => {
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
      {/* Progress bar — remove if not wanted */}
      <div
        ref={progressRef}
        className="fixed bottom-0 left-0 w-full h-[2px] bg-accent/60 z-50 hidden md:block origin-left"
        style={{ transform: "scaleX(0)" }}
      />

      <div ref={containerRef}>
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
```

## Step 2: Add CSS for panels

Add these styles to your global CSS:

```css
/* Horizontal scroll panels */
.panel {
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

/* Optional: vertical gradient dividers between panels */
.panel + .panel::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10%;
  width: 1px;
  height: 80%;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(255, 255, 255, 0.08) 30%,
    rgba(255, 255, 255, 0.08) 70%,
    transparent
  );
  z-index: 10;
}

/* Optional: giant faint section numbers */
.panel-number {
  position: absolute;
  bottom: -0.05em;
  right: 0.05em;
  font-weight: 900;
  font-size: 22vw;
  line-height: 1;
  color: rgba(255, 255, 255, 0.02);
  pointer-events: none;
  z-index: 0;
  user-select: none;
}

/* Mobile: reset to vertical flow */
@media (max-width: 767px) {
  .panel {
    width: 100%;
    height: auto;
    min-height: auto;
  }
  .panel + .panel::before {
    display: none;
  }
  .panel-number {
    display: none;
  }
}
```

## Step 3: Wrap your page

```tsx
<HorizontalScroll>
  <HeroSection />
  <AboutSection />
  <WorkSection />
  <ContactSection />
</HorizontalScroll>
```

Each child component is one panel. To give a section multiple panels (e.g. a gallery), return a React fragment with multiple `<section className="panel">` elements.

## Step 4: Convert section components

Each section needs two changes:

### a) Add panel class

```tsx
// Before
<section className="py-32 px-16">

// After
<section className="panel relative flex items-center px-16 py-16 md:py-0">
```

Key classes: `panel` (100vw/100vh/shrink-0), `flex items-center` (vertically center content within the viewport), remove large vertical padding on desktop.

### b) Bind ScrollTrigger animations to the horizontal tween

```tsx
import { useHorizontalScroll } from "./HorizontalScroll";

export default function MySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    // Wait for scrollTween to be available in horizontal mode
    if (isHorizontal && !scrollTween) return;

    const ctx = gsap.context(() => {
      // Build trigger config based on mode
      const triggerBase = isHorizontal && scrollTween
        ? {
            containerAnimation: scrollTween,
            start: "left 75%",           // horizontal equivalents
            toggleActions: "play none none none",
          }
        : { start: "top 75%" };          // vertical fallback

      gsap.from(".my-element", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          ...triggerBase,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal]);

  return (
    <section ref={sectionRef} className="panel relative flex items-center px-16">
      <div className="my-element">Content here</div>
      <span className="panel-number">01</span>
    </section>
  );
}
```

### Direction mapping

| Vertical        | Horizontal (with `containerAnimation`) |
|-----------------|----------------------------------------|
| `start: "top 75%"` | `start: "left 75%"` |
| `start: "top bottom"` | `start: "left right"` |
| `start: "top 65%"` | `start: "left 65%"` |
| `end: "bottom top"` | `end: "right left"` |

### Parallax within panels

Vertical parallax (e.g. `y: -80`) still works inside horizontal panels — bind it with `containerAnimation`:

```tsx
gsap.to(".parallax-element", {
  y: -80,
  scrollTrigger: {
    trigger: sectionRef.current,
    containerAnimation: scrollTween,
    start: "left right",
    end: "right left",
    scrub: 1,
  },
});
```

## Step 5: Fix navigation

`scrollIntoView` won't work in horizontal mode. Calculate the equivalent vertical scroll position:

```tsx
const handleClick = (e, href) => {
  e.preventDefault();
  const target = document.querySelector(href);
  if (!target) return;

  if (window.innerWidth >= 768) {
    const track = document.querySelector(".panel-track");
    if (!track) return;

    const style = window.getComputedStyle(track);
    const matrix = new DOMMatrix(style.transform);
    const currentX = matrix.m41;

    const targetRect = target.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();
    const targetOffset = targetRect.left - trackRect.left + Math.abs(currentX);

    const totalOverflow = track.scrollWidth - window.innerWidth;
    const mainTrigger = ScrollTrigger.getAll().find((t) => t.vars.pin);

    if (mainTrigger) {
      const ratio = targetOffset / totalOverflow;
      const targetScroll = mainTrigger.start + (mainTrigger.end - mainTrigger.start) * ratio;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};
```

## Step 6: Smooth scroll integration (optional)

If using Lenis for smooth scrolling, wrap `HorizontalScroll` inside your Lenis provider. Lenis handles vertical scroll input; ScrollTrigger's pin converts it to horizontal translation. No special Lenis config needed — the default vertical orientation works.

```tsx
<SmoothScroll>       {/* Lenis wrapper */}
  <Navbar />
  <HorizontalScroll>
    <Section1 />
    <Section2 />
  </HorizontalScroll>
</SmoothScroll>
```

## Common pitfalls

1. **Content too tall for viewport** — panels are `100vh`. Condense spacing or split into multiple panels. For forms, add `data-lenis-prevent` so users can scroll within the form.

2. **ScrollTrigger timing** — the master tween must exist before child ScrollTriggers. The `useHorizontalScroll()` hook guards against this with the `if (isHorizontal && !scrollTween) return` pattern.

3. **Fragments for multi-panel sections** — return `<>{panels}</>` from a component. React fragments flatten into the flex row correctly.

4. **Resize** — `invalidateOnRefresh: true` on the master tween handles viewport resizes. Call `ScrollTrigger.refresh()` after dynamic content loads.

5. **Fixed elements** — navbar, cursor, progress bar should be outside the `HorizontalScroll` wrapper (or `position: fixed` with high z-index) since the panel track transforms.
