"use client";

import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Read the preference at call time.
 *
 * Meant to be called inside an effect, where it is already client-side, so an
 * animation can decline to start rather than starting and being torn down. That
 * matters here: most of this site's reveals are gsap.from(), so an animation
 * that never runs leaves its element in the natural, visible state. Doing
 * nothing is the correct reduced-motion behaviour, not a degraded one.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia(QUERY).matches;
}

/**
 * The same preference as state, for the cases that have to decide what to
 * render rather than whether to animate. Starts false so the server and the
 * first client render agree, then corrects itself before paint.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
