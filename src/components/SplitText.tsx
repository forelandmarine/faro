"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useHorizontalScroll } from "./HorizontalScroll";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: CSSProperties;
  /** "chars" | "words" — default "words" */
  split?: "chars" | "words";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger between items (seconds) — default 0.04 */
  stagger?: number;
  /** Duration per item — default 0.6 */
  duration?: number;
  /** If true, plays immediately without ScrollTrigger */
  immediate?: boolean;
  /** Custom trigger element ref — defaults to the text element itself */
  trigger?: React.RefObject<HTMLElement | null>;
  /** Animate font-weight from this value to the element's computed weight */
  weightFrom?: number;
}

export default function SplitText({
  children,
  as: Tag = "span",
  className = "",
  style,
  split = "words",
  delay = 0,
  stagger = 0.04,
  duration = 0.6,
  immediate = false,
  trigger,
  weightFrom,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollTween, isHorizontal } = useHorizontalScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!immediate && isHorizontal && !scrollTween) return;

    const items = el.querySelectorAll<HTMLElement>(".split-item");
    if (!items.length) return;

    const triggerEl = trigger?.current ?? el;

    const ctx = gsap.context(() => {
      const fromVars: gsap.TweenVars = {
        y: "100%",
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      };

      // Variable font weight morph
      if (weightFrom !== undefined) {
        fromVars.fontWeight = weightFrom;
      }

      if (immediate) {
        gsap.from(items, fromVars);
      } else {
        const triggerBase =
          isHorizontal && scrollTween
            ? {
                containerAnimation: scrollTween,
                start: "left 75%",
                toggleActions: "play none none none" as const,
              }
            : { start: "top 75%" };

        gsap.from(items, {
          ...fromVars,
          scrollTrigger: {
            trigger: triggerEl,
            ...triggerBase,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [scrollTween, isHorizontal, immediate, delay, stagger, duration, trigger, weightFrom]);

  const pieces =
    split === "chars"
      ? children.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span className="split-item inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))
      : children.split(" ").map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <span className="split-item inline-block">{word}</span>
          </span>
        ));

  return (
    // @ts-expect-error -- dynamic tag
    <Tag ref={ref} className={`${className}`} style={style}>
      {pieces}
    </Tag>
  );
}
