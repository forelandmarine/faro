"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Pick the source client-side so phones never download the desktop encode.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const smallViewport = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(smallViewport ? "/hero-mobile.mp4" : "/hero.mp4");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

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
  }, [videoSrc]);

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
      {videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          src={videoSrc}
        />
      )}
      {/* Poster shown immediately while the client picks a source */}
      {!videoSrc && (
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40 pointer-events-none" />
    </div>
  );
}
