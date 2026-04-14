"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import {
  generateCoastlinePath,
  generateWavePath,
  generateHillPath,
} from "./coastline/generatePath";
import { NauticalDefs } from "./coastline/NauticalElements";
import { scrollState } from "./HorizontalScroll";
import "./coastline/coastline.css";

const SCENE_HEIGHT = 300;
const PANEL_COUNT = 8;

/* Palette constants */
const C = {
  foreground: "#1A3640",
  white: "#FFFFFF",
  ice: "#EAF1F8",
  mint: "#D6E9E4",
  accent: "#A8CCCA",
  sea: "#4A8C86",
  foam: "#D6E9E4",
  sand: "#4A6A72",
  beam: "#FFFFFF",
};

export default function CoastlineScene() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const layersRef = useRef<{
    sky: SVGGElement | null;
    hills: SVGGElement | null;
    water: SVGGElement | null;
    coast: SVGGElement | null;
    foam: SVGGElement | null;
  }>({
    sky: null,
    hills: null,
    water: null,
    coast: null,
    foam: null,
  });

  const [totalWidth, setTotalWidth] = useState(0);

  useEffect(() => {
    const update = () => setTotalWidth(window.innerWidth * PANEL_COUNT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Generate paths
  const paths = useMemo(() => {
    if (!totalWidth) return null;
    return {
      coastline: generateCoastlinePath({ totalWidth, baseY: 140, amplitude: 35 }),
      hill1: generateHillPath(totalWidth, 80, 1.2, 0),
      hill2: generateHillPath(totalWidth, 100, 0.8, 100),
      hill3: generateHillPath(totalWidth, 115, 0.5, 200),
      wave1: generateWavePath(totalWidth, 125, 0.012, 8, 0),
      wave2: generateWavePath(totalWidth, 130, 0.015, 6, 2),
      wave3: generateWavePath(totalWidth, 135, 0.01, 7, 4),
      wave4: generateWavePath(totalWidth, 120, 0.009, 5, 6),
      foam1: generateWavePath(totalWidth, 118, 0.018, 4, 1),
      foam2: generateWavePath(totalWidth, 112, 0.022, 3, 3),
      foam3: generateWavePath(totalWidth, 108, 0.014, 2, 5),
    };
  }, [totalWidth]);

  // Parallax ticker
  useEffect(() => {
    if (!totalWidth) return;
    const tick = () => {
      const p = scrollState.progress;
      const shift = totalWidth - window.innerWidth;
      const { sky, hills, water, coast, foam } = layersRef.current;
      if (sky) sky.style.transform = `translateX(${-p * shift * 0.15}px)`;
      if (hills) hills.style.transform = `translateX(${-p * shift * 0.35}px)`;
      if (water) water.style.transform = `translateX(${-p * shift * 0.65}px)`;
      if (coast) coast.style.transform = `translateX(${-p * shift * 1.0}px)`;
      if (foam) foam.style.transform = `translateX(${-p * shift * 1.1}px)`;
      // Hidden on hero, gentle fade in between hero and panel 2
      if (wrapperRef.current) {
        const opacity = p < 0.06 ? 0 : p > 0.16 ? 1 : (p - 0.06) / 0.10;
        wrapperRef.current.style.opacity = String(opacity);
        wrapperRef.current.style.visibility = p < 0.06 ? "hidden" : "visible";
      }
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [totalWidth]);

  const vw = totalWidth / PANEL_COUNT;

  // All nautical elements — more populous
  const elements = useMemo(() => {
    if (!vw) return null;
    return {
      sailboats: [
        { x: vw * 0.4, y: 75, scale: 1.0, delay: "1.2s" },
        { x: vw * 1.5, y: 65, scale: 1.6, delay: "0s" },
        { x: vw * 2.6, y: 80, scale: 0.9, delay: "2.1s" },
        { x: vw * 3.2, y: 70, scale: 1.3, delay: "0.8s" },
        { x: vw * 4.4, y: 78, scale: 1.0, delay: "1.5s" },
        { x: vw * 5.5, y: 62, scale: 1.4, delay: "0.3s" },
        { x: vw * 6.3, y: 76, scale: 0.8, delay: "1.8s" },
        { x: vw * 7.2, y: 70, scale: 1.1, delay: "0.6s" },
      ],
      rowboats: [
        { x: vw * 1.8, y: 100, scale: 1.0, delay: "0.5s" },
        { x: vw * 4.8, y: 95, scale: 1.2, delay: "1.3s" },
        { x: vw * 6.8, y: 102, scale: 0.8, delay: "0.9s" },
      ],
      lighthouses: [
        { x: vw * 1.5, y: 20, scale: 2.0 },
        { x: vw * 4.5, y: 35, scale: 1.4 },
        { x: vw * 7.4, y: 25, scale: 1.8 },
      ],
      buoys: [
        { x: vw * 0.9, y: 105, delay: "0s" },
        { x: vw * 2.3, y: 100, delay: "0.7s" },
        { x: vw * 3.6, y: 108, delay: "1.2s" },
        { x: vw * 4.1, y: 102, delay: "0.3s" },
        { x: vw * 5.4, y: 106, delay: "1.8s" },
        { x: vw * 6.3, y: 98, delay: "0.5s" },
        { x: vw * 7.6, y: 104, delay: "1.0s" },
      ],
      seagulls: [
        { x: vw * 0.3, y: 25, scale: 1.4, delay: "0s" },
        { x: vw * 1.0, y: 15, scale: 1.8, delay: "2s" },
        { x: vw * 1.7, y: 35, scale: 1.0, delay: "4s" },
        { x: vw * 2.5, y: 12, scale: 1.6, delay: "1s" },
        { x: vw * 3.3, y: 30, scale: 1.2, delay: "3s" },
        { x: vw * 4.2, y: 20, scale: 1.4, delay: "5s" },
        { x: vw * 5.0, y: 28, scale: 1.7, delay: "1.5s" },
        { x: vw * 5.8, y: 10, scale: 1.1, delay: "3.5s" },
        { x: vw * 6.5, y: 22, scale: 1.5, delay: "0.5s" },
        { x: vw * 7.3, y: 16, scale: 1.3, delay: "2.5s" },
        { x: vw * 7.8, y: 32, scale: 1.8, delay: "4.5s" },
      ],
      stars: Array.from({ length: 60 }, (_, i) => ({
        x: (totalWidth / 60) * i + Math.sin(i * 7) * vw * 0.25,
        y: 4 + Math.abs(Math.sin(i * 3.7)) * 55,
        r: 0.8 + Math.abs(Math.sin(i * 2.3)) * 2.4,
        delay: `${(i * 0.37) % 4}s`,
      })),
      anchors: [
        { x: vw * 1.2, y: 145, scale: 1.4 },
        { x: vw * 3.5, y: 142, scale: 1.2 },
        { x: vw * 5.2, y: 148, scale: 1.0 },
        { x: vw * 7.0, y: 144, scale: 1.3 },
      ],
      compasses: [
        { x: vw * 0.5, y: 40, scale: 4.0 },
        { x: vw * 2.5, y: 35, scale: 6.0 },
        { x: vw * 5.0, y: 25, scale: 5.0 },
        { x: vw * 7.0, y: 32, scale: 5.6 },
      ],
      islands: [
        { x: vw * 2.5, y: 68, scale: 0.5, type: "single" as const },
        { x: vw * 5.5, y: 65, scale: 0.6, type: "double" as const },
      ],
    };
  }, [vw, totalWidth]);

  if (!totalWidth || !paths || !elements) return null;

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-0 left-0 w-full pointer-events-none z-[40] hidden landscape:block md:block"
      style={{ height: SCENE_HEIGHT, opacity: 0 }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${vw} ${SCENE_HEIGHT}`}
        preserveAspectRatio="none"
        style={{ overflow: "visible" }}
      >
        <NauticalDefs />

        {/* Layer 0 (sky) removed */}
        <g ref={(el) => { layersRef.current.sky = el; }} />

        {/* ── Layer 1: Distant hills (0.35x) ── */}
        <g
          ref={(el) => { layersRef.current.hills = el; }}
          className="will-change-transform"
        >
          <path d={paths.hill1} fill="url(#hill-fill)" />

          {/* Distant islands on the horizon — tiny, static */}
          {elements.islands.map((island, i) => (
            <use
              key={`is-${i}`}
              href={island.type === "double" ? "#island-double" : "#island"}
              x={island.x}
              y={island.y}
              width={(island.type === "double" ? 120 : 80) * island.scale}
              height={(island.type === "double" ? 70 : 60) * island.scale}
              style={{ color: C.accent, opacity: 0.3 }}
            />
          ))}
        </g>

        {/* ── Layer 2: Water + vessels (0.65x) ── */}
        <g
          ref={(el) => { layersRef.current.water = el; }}
          className="will-change-transform"
        >
          {/* Water surface fill */}
          <rect x={0} y={115} width={totalWidth} height={185} fill="url(#water-surface)" />

          {/* Wave lines — simplified, two bold strokes */}
          <path d={paths.wave1} fill="none" stroke={C.white} strokeWidth="1.5" opacity={0.3} />
          <path d={paths.wave3} fill="none" stroke={C.mint} strokeWidth="1.0" opacity={0.25} />

          {/* Sailboats */}
          {elements.sailboats.map((boat, i) => (
            <g
              key={`sb-${i}`}
              className={i % 2 === 0 ? "anim-bob" : "anim-bob-slow"}
              style={{
                animationDelay: boat.delay,
                transformOrigin: `${boat.x + 20 * boat.scale}px ${boat.y + 25 * boat.scale}px`,
                color: C.white,
              }}
            >
              <use href="#sailboat" x={boat.x} y={boat.y} width={40 * boat.scale} height={50 * boat.scale} />
            </g>
          ))}

          {/* Rowboats */}
          {elements.rowboats.map((boat, i) => (
            <g
              key={`rb-${i}`}
              className="anim-bob-slow"
              style={{
                animationDelay: boat.delay,
                transformOrigin: `${boat.x + 15 * boat.scale}px ${boat.y + 10 * boat.scale}px`,
                color: C.ice,
              }}
            >
              <use href="#rowboat" x={boat.x} y={boat.y} width={30 * boat.scale} height={20 * boat.scale} />
            </g>
          ))}

          {/* Buoys */}
          {elements.buoys.map((buoy, i) => (
            <g
              key={`by-${i}`}
              className="anim-buoy"
              style={{
                animationDelay: buoy.delay,
                transformOrigin: `${buoy.x + 12}px ${buoy.y + 20}px`,
                color: C.mint,
              }}
            >
              <use href="#buoy" x={buoy.x} y={buoy.y} width={24} height={40} />
            </g>
          ))}


        </g>

        {/* ── Layer 3: Coastline + lighthouses (1.0x) ── */}
        <g
          ref={(el) => { layersRef.current.coast = el; }}
          className="will-change-transform"
        >
          {/* Main coastline fill */}
          <path d={paths.coastline} fill="url(#coast-fill)" />

          {/* Coastline edge */}
          <path
            d={paths.coastline}
            fill="none"
            stroke={C.mint}
            strokeWidth="2"
            opacity={0.6}
            strokeLinejoin="round"
          />

          {/* Lighthouses */}
          {elements.lighthouses.map((lh, i) => (
            <g key={`lh-${i}`}>
              <use
                href="#coast-lighthouse"
                x={lh.x}
                y={lh.y}
                width={30 * lh.scale}
                height={60 * lh.scale}
                style={{ color: C.white }}
              />
              {/* Beam glow circle */}
              <circle
                cx={lh.x + 15 * lh.scale}
                cy={lh.y + 18.5 * lh.scale}
                r={50}
                fill="url(#beam-glow)"
              />
              {/* Right beam — anchored at lamp, extends right */}
              <use
                href="#lighthouse-beam"
                x={lh.x + 15 * lh.scale}
                y={lh.y + 18.5 * lh.scale - 5}
                width={200}
                height={10}
                className="anim-beam-right"
                style={{
                  color: C.white,
                  transformOrigin: `${lh.x + 15 * lh.scale}px ${lh.y + 18.5 * lh.scale}px`,
                  animationDelay: `${i * 2}s`,
                }}
              />
              {/* Left beam — anchored at lamp, extends left */}
              <use
                href="#lighthouse-beam"
                x={lh.x + 15 * lh.scale - 200}
                y={lh.y + 18.5 * lh.scale - 5}
                width={200}
                height={10}
                className="anim-beam-left"
                style={{
                  color: C.white,
                  transformOrigin: `${lh.x + 15 * lh.scale}px ${lh.y + 18.5 * lh.scale}px`,
                  animationDelay: `${i * 2}s`,
                }}
              />
            </g>
          ))}

          {/* Anchors */}
          {elements.anchors.map((a, i) => (
            <use
              key={`an-${i}`}
              href="#anchor"
              x={a.x}
              y={a.y}
              width={20 * a.scale}
              height={24 * a.scale}
              style={{ color: C.ice }}
            />
          ))}
        </g>

        {/* ── Layer 4: Foam (1.1x) ── */}
        <g
          ref={(el) => { layersRef.current.foam = el; }}
          className="will-change-transform"
        >
          <path d={paths.foam1} fill="none" stroke={C.white} strokeWidth="1.0" opacity={0.2} className="anim-lap" />
        </g>
      </svg>
    </div>
  );
}
