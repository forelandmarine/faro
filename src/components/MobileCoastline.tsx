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
  const width = 1200;
  const paths = useMemo(() => ({
    coastline: generateCoastlinePath({ totalWidth: width, baseY: 80, amplitude: 20 }),
    wave1: generateWavePath(width, 70, 0.015, 5, 0),
    wave2: generateWavePath(width, 75, 0.012, 4, 2),
  }), []);

  return (
    <div className="w-full md:hidden overflow-hidden" style={{ height: "220px", background: "linear-gradient(to bottom, #1A3640 0%, #1A3640 20%, #2A4A50 50%, #4A8C86 80%, #A8CCCA 100%)" }}>
      <svg
        viewBox={`0 0 ${width} 160`}
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
      >
        <NauticalDefs />

        {/* Waves */}
        <path d={paths.wave1} fill="none" stroke="#D6E9E4" strokeWidth="1.5" opacity="0.4" className="anim-lap" />
        <path d={paths.wave2} fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" className="anim-lap" style={{ animationDelay: "2s" }} />

        {/* Coast fill */}
        <path d={paths.coastline} fill="url(#coast-fill)" />
        <path d={paths.coastline} fill="none" stroke="#D6E9E4" strokeWidth="1.5" opacity="0.5" strokeLinejoin="round" />

        {/* Sailboat */}
        <g className="anim-bob" style={{ transformOrigin: "200px 55px" }}>
          <use href="#sailboat" x={180} y={40} width={30} height={38} style={{ color: "#FFFFFF" }} />
        </g>
        <g className="anim-bob-slow" style={{ transformOrigin: "600px 50px", animationDelay: "1s" }}>
          <use href="#sailboat" x={580} y={35} width={25} height={32} style={{ color: "#EAF1F8" }} />
        </g>
        <g className="anim-bob" style={{ transformOrigin: "950px 55px", animationDelay: "0.5s" }}>
          <use href="#sailboat" x={935} y={42} width={22} height={28} style={{ color: "#FFFFFF" }} />
        </g>

        {/* Buoys */}
        <g className="anim-buoy" style={{ transformOrigin: "350px 65px" }}>
          <use href="#buoy" x={344} y={55} width={12} height={20} style={{ color: "#D6E9E4" }} />
        </g>
        <g className="anim-buoy" style={{ transformOrigin: "800px 60px", animationDelay: "0.8s" }}>
          <use href="#buoy" x={794} y={50} width={12} height={20} style={{ color: "#D6E9E4" }} />
        </g>

        {/* Lighthouse */}
        <use href="#coast-lighthouse" x={450} y={30} width={25} height={50} style={{ color: "#FFFFFF" }} />

        {/* Lighthouse beams */}
        <use
          href="#lighthouse-beam"
          x={462} y={42} width={120} height={6}
          className="anim-beam-right"
          style={{ color: "#FFFFFF", transformOrigin: "462px 45px" }}
        />
        <use
          href="#lighthouse-beam"
          x={342} y={42} width={120} height={6}
          className="anim-beam-left"
          style={{ color: "#FFFFFF", transformOrigin: "462px 45px" }}
        />
      </svg>
    </div>
  );
}
