"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;
    if (!cursor || !follower || !label) return;

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
      gsap.to(cursor, { scale: 0, duration: 0.25 });
      gsap.to(follower, {
        scale: 3.5,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      follower.style.mixBlendMode = "difference";
    };

    const onLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.25 });
      gsap.to(follower, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      follower.style.mixBlendMode = "";
      label.textContent = "";
      gsap.to(label, { opacity: 0, duration: 0.2 });
    };

    const onEnterProject = () => {
      gsap.to(cursor, { scale: 0, duration: 0.25 });
      gsap.to(follower, {
        scale: 5,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      follower.style.mixBlendMode = "difference";
      label.textContent = "View";
      gsap.to(label, { opacity: 1, duration: 0.3, delay: 0.1 });
    };

    const onLeaveProject = () => {
      onLeaveLink();
    };

    window.addEventListener("mousemove", onMouseMove);

    // Use MutationObserver to handle dynamically rendered elements
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
      {/* Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-accent z-[200] pointer-events-none hidden md:block"
      />
      {/* Ring / follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-accent/40 z-[200] pointer-events-none hidden md:block flex items-center justify-center"
      >
        <span
          ref={labelRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[3px] font-medium uppercase tracking-wider text-white opacity-0 whitespace-nowrap"
        >
        </span>
      </div>
    </>
  );
}
