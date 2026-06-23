"use client";

import { useMemo } from "react";
import { generateCoastlinePath, generateWavePath } from "./coastline/generatePath";
import { NauticalDefs } from "./coastline/NauticalElements";
import "./coastline/coastline.css";

/**
 * Static coastline scene for mobile — renders inline (not fixed),
 * sits at the bottom of the vertical scroll content.
 * Simplified: fewer objects, CSS-only animations, no parallax.
 */
export default function MobileCoastline() {
  // Narrower viewBox so the scene fills a 390px portrait screen rather than
  // cropping the lighthouse and sailboats off either side.
  const width = 600;
  const paths = useMemo(() => ({
    coastline: generateCoastlinePath({ totalWidth: width, baseY: 95, amplitude: 14 }),
    wave1: generateWavePath(width, 80, 0.018, 4, 0),
    wave2: generateWavePath(width, 88, 0.014, 3, 2),
  }), []);

  return (
    <div
      className="w-full overflow-hidden mobile-coastline relative"
      style={{
        height: "180px",
        background: "linear-gradient(to bottom, #2A4A50 0%, #2F5A60 30%, #4A8C86 70%, #7BB5AD 100%)",
      }}
    >
      {/* Soft seam against the dark Contact panel above. */}
      <div
        className="absolute top-0 left-0 right-0 h-6 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #1A3640 0%, rgba(26,54,64,0) 100%)" }}
      />
      <svg
        viewBox={`0 0 ${width} 160`}
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        <NauticalDefs />

        {/* Waves */}
        <path d={paths.wave1} fill="none" stroke="#D6E9E4" strokeWidth="1.5" opacity="0.45" className="anim-lap" />
        <path d={paths.wave2} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" className="anim-lap" style={{ animationDelay: "2s" }} />

        {/* Coast fill */}
        <path d={paths.coastline} fill="url(#coast-fill)" />
        <path d={paths.coastline} fill="none" stroke="#D6E9E4" strokeWidth="1.5" opacity="0.5" strokeLinejoin="round" />

        {/* Sailboat */}
        <g className="anim-bob" style={{ transformOrigin: "120px 70px" }}>
          <use href="#sailboat" x={100} y={56} width={28} height={36} style={{ color: "#FFFFFF" }} />
        </g>
        <g className="anim-bob-slow" style={{ transformOrigin: "470px 70px", animationDelay: "1s" }}>
          <use href="#sailboat" x={452} y={58} width={24} height={30} style={{ color: "#EAF1F8" }} />
        </g>

        {/* Buoys */}
        <g className="anim-buoy" style={{ transformOrigin: "200px 85px" }}>
          <use href="#buoy" x={195} y={76} width={10} height={18} style={{ color: "#D6E9E4" }} />
        </g>
        <g className="anim-buoy" style={{ transformOrigin: "400px 80px", animationDelay: "0.8s" }}>
          <use href="#buoy" x={395} y={72} width={10} height={18} style={{ color: "#D6E9E4" }} />
        </g>

        {/* Lighthouse — centred */}
        <use href="#coast-lighthouse" x={290} y={48} width={22} height={48} style={{ color: "#FFFFFF" }} />

        {/* Lighthouse beams — shorter so they don't shoot off-screen */}
        <use
          href="#lighthouse-beam"
          x={301} y={58} width={70} height={5}
          className="anim-beam-right"
          style={{ color: "#FFFFFF", transformOrigin: "301px 60px" }}
        />
        <use
          href="#lighthouse-beam"
          x={231} y={58} width={70} height={5}
          className="anim-beam-left"
          style={{ color: "#FFFFFF", transformOrigin: "301px 60px" }}
        />
      </svg>
    </div>
  );
}
