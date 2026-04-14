"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", onCanPlay);

    // iOS muted autoplay — retry on visibility change
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });
    // Also try on first touch
    const onTouch = () => { tryPlay(); document.removeEventListener("touchstart", onTouch); };
    document.addEventListener("touchstart", onTouch, { once: true });

    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {!videoLoaded && (
        <div className="absolute inset-0 bg-black">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 30% 50%, #0a1628 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, #0a1020 0%, transparent 50%)",
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />
    </div>
  );
}
