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
        duration: 0.5,
        ease: "power3.out",
      });
    };

    const onEnterLink = () => {
      gsap.to(cursor, { scale: 1.5, duration: 0.25 });
      gsap.to(follower, { scale: 1.2, opacity: 0.6, duration: 0.3 });
    };

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25 });
      gsap.to(follower, { scale: 1, opacity: 0.4, duration: 0.3 });
    };

    const onEnterProject = () => {
      // Hide dot, show sailboat
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { scale: 2, opacity: 1, duration: 0.35, ease: "back.out(1.5)" });
    };

    const onLeaveProject = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25 });
      gsap.to(follower, { scale: 1, opacity: 0.4, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove);

    const bindInteractives = () => {
      const links = document.querySelectorAll("a, button, input, textarea");
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });

      const projects = document.querySelectorAll("[data-cursor-project]");
      projects.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterProject);
        el.removeEventListener("mouseleave", onLeaveProject);
        el.addEventListener("mouseenter", onEnterProject);
        el.addEventListener("mouseleave", onLeaveProject);
      });
    };

    bindInteractives();
    const observer = new MutationObserver(bindInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent z-[200] pointer-events-none hidden md:block"
      />
      {/* Sailboat follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 -ml-3 -mt-3 z-[200] pointer-events-none hidden md:block opacity-40"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 40 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main sail */}
          <path
            d="M20 4L20 34L8 34Z"
            fill="currentColor"
            className="text-accent"
            opacity="0.6"
          />
          {/* Jib sail */}
          <path
            d="M20 8L20 28L30 28Z"
            fill="currentColor"
            className="text-foreground"
            opacity="0.3"
          />
          {/* Mast */}
          <line
            x1="20" y1="4" x2="20" y2="36"
            stroke="currentColor"
            className="text-foreground"
            strokeWidth="1.2"
            opacity="0.6"
          />
          {/* Hull */}
          <path
            d="M6 36Q10 44 20 44Q30 44 34 36Z"
            fill="currentColor"
            className="text-accent"
            opacity="0.7"
          />
        </svg>
      </div>
    </>
  );
}
