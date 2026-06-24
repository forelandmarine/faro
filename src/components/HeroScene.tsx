"use client";

import { useEffect, useRef } from "react";

export default function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari: muted+playsInline autoplay can still fail silently.
    // Retry on visibility change, first touch, and orientation change.
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();

    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onInteract = () => tryPlay();
    document.addEventListener("touchstart", onInteract, { once: true });
    document.addEventListener("click", onInteract, { once: true });

    const onOrient = () => tryPlay();
    window.addEventListener("orientationchange", onOrient);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("orientationchange", onOrient);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Soft gradient fallback while frames arrive — the video covers it once playing. */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, #0a1628 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #0a1020 0%, transparent 50%)",
        }}
      />

      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40 pointer-events-none" />
    </div>
  );
}
