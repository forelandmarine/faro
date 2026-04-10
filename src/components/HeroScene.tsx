"use client";

import { useEffect, useRef, useCallback } from "react";

export const scrollState = { progress: 0 };

interface Star {
  x: number;
  y: number;
  r: number;
  brightness: number;
  speed: number;
  phase: number;
  // Constellation membership (-1 = none)
  group: number;
  // Color tint: 0=white, 1=blue, 2=cyan, 3=warm
  tint: number;
}

interface ConstellationLine {
  a: number;
  b: number;
  group: number;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const allStars = useRef<Star[]>([]);
  const constellationLines = useRef<ConstellationLine[]>([]);
  const scroll = useRef(0);

  const init = useCallback((w: number, h: number) => {
    const stars: Star[] = [];
    const lines: ConstellationLine[] = [];

    // ── Background field stars ──
    for (let i = 0; i < 600; i++) {
      const isBright = Math.random() < 0.04;
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: isBright ? 1.2 + Math.random() * 1.5 : 0.3 + Math.random() * 0.6,
        brightness: isBright ? 0.6 + Math.random() * 0.4 : 0.08 + Math.random() * 0.25,
        speed: 0.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        group: -1,
        tint: Math.random() < 0.3 ? 1 : Math.random() < 0.1 ? 2 : 0,
      });
    }

    // ── Constellation clusters ──
    // Each constellation is a group of bright stars connected by lines
    // They're spread across the viewport
    const constellations = [
      // Group 0: top-left, angular network
      { cx: w * 0.15, cy: h * 0.2, spread: w * 0.12, count: 7 },
      // Group 1: centre-top, large
      { cx: w * 0.5, cy: h * 0.15, spread: w * 0.15, count: 9 },
      // Group 2: right, mid-height
      { cx: w * 0.82, cy: h * 0.3, spread: w * 0.1, count: 6 },
      // Group 3: bottom-left
      { cx: w * 0.25, cy: h * 0.6, spread: w * 0.1, count: 5 },
      // Group 4: bottom-right
      { cx: w * 0.7, cy: h * 0.65, spread: w * 0.12, count: 7 },
      // Group 5: far left mid
      { cx: w * 0.05, cy: h * 0.45, spread: w * 0.08, count: 5 },
      // Group 6: centre
      { cx: w * 0.45, cy: h * 0.42, spread: w * 0.14, count: 8 },
      // Group 7: top-right
      { cx: w * 0.9, cy: h * 0.1, spread: w * 0.08, count: 5 },
    ];

    for (let g = 0; g < constellations.length; g++) {
      const c = constellations[g];
      const groupStart = stars.length;

      for (let i = 0; i < c.count; i++) {
        const angle = (i / c.count) * Math.PI * 2 + Math.random() * 0.8;
        const dist = Math.random() * c.spread;
        stars.push({
          x: c.cx + Math.cos(angle) * dist,
          y: c.cy + Math.sin(angle) * dist * 0.6,
          r: 1.5 + Math.random() * 2,
          brightness: 0.7 + Math.random() * 0.3,
          speed: 0.3 + Math.random() * 1,
          phase: Math.random() * Math.PI * 2,
          group: g,
          tint: g % 3 === 0 ? 2 : g % 3 === 1 ? 1 : 0,
        });
      }

      // Connect nearby stars in the group
      for (let i = groupStart; i < stars.length; i++) {
        let closest = -1;
        let closestDist = Infinity;
        // Find 1-2 nearest neighbours
        for (let j = groupStart; j < stars.length; j++) {
          if (i === j) continue;
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < closestDist && d < c.spread * 1.2) {
            closestDist = d;
            closest = j;
          }
        }
        if (closest !== -1) {
          // Avoid duplicate lines
          const exists = lines.some(
            (l) => (l.a === i && l.b === closest) || (l.a === closest && l.b === i)
          );
          if (!exists) {
            lines.push({ a: i, b: closest, group: g });
          }
        }
      }
    }

    allStars.current = stars;
    constellationLines.current = lines;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let time = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(window.innerWidth, window.innerHeight);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current.targetX = e.clientX / window.innerWidth;
      mouse.current.targetY = e.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    const tintColors = [
      [255, 255, 255],   // white
      [140, 180, 255],   // blue
      [100, 220, 240],   // cyan
      [255, 200, 140],   // warm
    ];

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dt = 1 / 60;
      time += dt;

      // Smooth mouse
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Smooth scroll tracking
      scroll.current += (scrollState.progress - scroll.current) * 0.08;
      const sp = scroll.current; // 0-1

      ctx.clearRect(0, 0, w, h);

      // ── Background ──
      // Shifts from deep black to a dark blue-purple as you scroll
      const bgR = Math.floor(2 + sp * 6);
      const bgG = Math.floor(3 + sp * 4);
      const bgB = Math.floor(8 + sp * 18);
      ctx.fillStyle = `rgb(${bgR},${bgG},${bgB})`;
      ctx.fillRect(0, 0, w, h);

      // Subtle radial glow that intensifies with scroll
      const centerGlow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
      centerGlow.addColorStop(0, `rgba(60,80,140,${0.02 + sp * 0.06})`);
      centerGlow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, w, h);

      // ── Parallax offset ──
      const mx = (mouse.current.x - 0.5) * 15;
      const my = (mouse.current.y - 0.5) * 10;

      const stars = allStars.current;
      const lines = constellationLines.current;

      // ── Draw constellation lines ──
      // Lines fade in/out based on scroll and pulse
      for (const line of lines) {
        const sa = stars[line.a];
        const sb = stars[line.b];

        // Parallax
        const pxA = sa.x + mx * (sa.r * 0.3);
        const pyA = sa.y + my * (sa.r * 0.2);
        const pxB = sb.x + mx * (sb.r * 0.3);
        const pyB = sb.y + my * (sb.r * 0.2);

        // Scroll state determines line visibility
        // 0-0.3: lines fading in
        // 0.3-0.7: fully visible, pulsing
        // 0.7-1: lines transform - become brighter, more connected
        let lineAlpha: number;
        if (sp < 0.3) {
          lineAlpha = (sp / 0.3) * 0.15;
        } else if (sp < 0.7) {
          lineAlpha = 0.15 + Math.sin(time * 0.8 + line.group) * 0.05;
        } else {
          const t = (sp - 0.7) / 0.3;
          lineAlpha = 0.15 + t * 0.25;
        }

        const tint = tintColors[sa.tint];
        const glowPhase = sp > 0.7 ? (sp - 0.7) / 0.3 : 0;

        // Line glow (wider, fainter) when in final state
        if (glowPhase > 0) {
          ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${lineAlpha * glowPhase * 0.4})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(pxA, pyA);
          ctx.lineTo(pxB, pyB);
          ctx.stroke();
        }

        // Main line
        ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${lineAlpha})`;
        ctx.lineWidth = sp > 0.7 ? 1 + glowPhase * 0.5 : 0.8;
        ctx.beginPath();
        ctx.moveTo(pxA, pyA);
        ctx.lineTo(pxB, pyB);
        ctx.stroke();

        // Data pulse traveling along lines (sci-fi)
        if (sp > 0.4) {
          const pulseT = (time * 0.5 + line.group * 0.7 + line.a * 0.3) % 1;
          const pulseX = pxA + (pxB - pxA) * pulseT;
          const pulseY = pyA + (pyB - pyA) * pulseT;
          const pulseAlpha = Math.sin(pulseT * Math.PI) * (sp > 0.7 ? 0.6 : 0.3);
          const pg = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 4);
          pg.addColorStop(0, `rgba(${tint[0]},${tint[1]},${tint[2]},${pulseAlpha})`);
          pg.addColorStop(1, `rgba(${tint[0]},${tint[1]},${tint[2]},0)`);
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Draw stars ──
      for (const star of stars) {
        const twinkle = star.brightness +
          Math.sin(time * star.speed + star.phase) * star.brightness * 0.3;
        const px = star.x + mx * (star.r * 0.3);
        const py = star.y + my * (star.r * 0.2);
        const tint = tintColors[star.tint];

        const isConstellation = star.group !== -1;

        // Scroll affects constellation stars
        let sizeMult = 1;
        let alphaMult = 1;
        if (isConstellation) {
          // Stars grow and brighten as you scroll
          sizeMult = 1 + sp * 0.8;
          alphaMult = 0.6 + sp * 0.4;

          // At high scroll, constellation stars get an outer ring
          if (sp > 0.5) {
            const ringAlpha = (sp - 0.5) * 0.4;
            ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${ringAlpha * twinkle})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(px, py, star.r * sizeMult * 3.5, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Halo glow
        if (star.r > 1 || isConstellation) {
          const glowR = star.r * (isConstellation ? 6 * sizeMult : 4);
          const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
          glow.addColorStop(0, `rgba(${tint[0]},${tint[1]},${tint[2]},${twinkle * alphaMult * 0.2})`);
          glow.addColorStop(1, `rgba(${tint[0]},${tint[1]},${tint[2]},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, glowR, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        const coreR = star.r * sizeMult;
        ctx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${twinkle * alphaMult})`;
        ctx.beginPath();
        ctx.arc(px, py, coreR, 0, Math.PI * 2);
        ctx.fill();

        // Cross-hair spikes on bright constellation stars when scrolled
        if (isConstellation && sp > 0.3 && star.r > 1.8) {
          const spikeLen = star.r * sizeMult * 4 * sp;
          const spikeAlpha = twinkle * 0.15 * sp;
          ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${spikeAlpha})`;
          ctx.lineWidth = 0.5;
          // Vertical
          ctx.beginPath();
          ctx.moveTo(px, py - spikeLen);
          ctx.lineTo(px, py + spikeLen);
          ctx.stroke();
          // Horizontal
          ctx.beginPath();
          ctx.moveTo(px - spikeLen, py);
          ctx.lineTo(px + spikeLen, py);
          ctx.stroke();
        }
      }

      // ── HUD / scan line effect at high scroll ──
      if (sp > 0.6) {
        const hudAlpha = (sp - 0.6) * 0.08;
        // Horizontal scan lines
        for (let y = 0; y < h; y += 4) {
          ctx.fillStyle = `rgba(100,180,255,${hudAlpha * (0.3 + Math.sin(y * 0.1 + time * 2) * 0.2)})`;
          ctx.fillRect(0, y, w, 0.5);
        }
      }

      // ── Vignette ──
      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.7);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, `rgba(0,0,0,${0.4 + sp * 0.15})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "#000000" }}
    />
  );
}
