"use client";

import { useEffect, useRef, useState } from "react";

export const scrollState = { progress: 0 };

export default function HeroScene() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", onCanPlay);

    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Video background */}
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

      {/* Fallback: animated gradient when no video */}
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

      {/* Overlay gradient: dark at top and bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />

      {/* Bottom fade to black for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
