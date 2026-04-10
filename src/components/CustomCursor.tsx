"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Only show custom cursor on desktop
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      cursor.style.display = "none";
      follower.style.display = "none";
      return;
    }

    document.body.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseEnterInteractive = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.3 });
      gsap.to(follower, { scale: 2, opacity: 0.6, duration: 0.3 });
    };

    const onMouseLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const interactives = document.querySelectorAll(
      "a, button, input, textarea, .service-item, .device-mockup"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent z-[200] pointer-events-none mix-blend-difference hidden md:block"
      />
      {/* Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-accent/40 z-[200] pointer-events-none hidden md:block"
      />
    </>
  );
}
