"use client";

import { useEffect, useRef } from "react";

export const scrollState = { progress: 0 };

interface Star3D {
  // Spherical coords (fixed)
  theta: number;
  phi: number;
  r: number;
  // Visual
  size: number;
  brightness: number;
  speed: number;
  phase: number;
  // Constellation
  group: number; // -1 = field star
  tint: number;  // 0=white 1=blue 2=cyan
}

interface CLine {
  a: number;
  b: number;
  group: number;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const starsRef = useRef<Star3D[]>([]);
  const linesRef = useRef<CLine[]>([]);
  const scroll = useRef(0);
  const rotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let time = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / w;
      mouse.current.ty = e.clientY / h;
    };

    const buildStars = () => {
      const stars: Star3D[] = [];
      const lines: CLine[] = [];
      const R = Math.min(w, h) * 0.55;

      // Field stars on sphere
      for (let i = 0; i < 800; i++) {
        const isBright = Math.random() < 0.04;
        stars.push({
          theta: Math.random() * Math.PI * 2,
          phi: Math.acos(2 * Math.random() - 1),
          r: R + (Math.random() - 0.5) * R * 0.3,
          size: isBright ? 1.5 + Math.random() * 1.5 : 0.4 + Math.random() * 0.6,
          brightness: isBright ? 0.65 + Math.random() * 0.35 : 0.1 + Math.random() * 0.25,
          speed: 0.5 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          group: -1,
          tint: Math.random() < 0.25 ? 1 : Math.random() < 0.1 ? 2 : 0,
        });
      }

      // Constellation clusters on the sphere
      const clusters = [
        { theta: 0.5, phi: 1.0, spread: 0.35, count: 8 },
        { theta: 2.0, phi: 0.8, spread: 0.3, count: 7 },
        { theta: 3.8, phi: 1.3, spread: 0.25, count: 6 },
        { theta: 5.2, phi: 1.6, spread: 0.3, count: 7 },
        { theta: 1.2, phi: 2.2, spread: 0.3, count: 6 },
        { theta: 4.0, phi: 0.5, spread: 0.25, count: 5 },
        { theta: 5.8, phi: 2.5, spread: 0.28, count: 6 },
        { theta: 2.8, phi: 1.8, spread: 0.32, count: 7 },
      ];

      for (let g = 0; g < clusters.length; g++) {
        const c = clusters[g];
        const start = stars.length;
        for (let i = 0; i < c.count; i++) {
          stars.push({
            theta: c.theta + (Math.random() - 0.5) * c.spread,
            phi: c.phi + (Math.random() - 0.5) * c.spread,
            r: R,
            size: 2 + Math.random() * 2,
            brightness: 0.75 + Math.random() * 0.25,
            speed: 0.3 + Math.random() * 1,
            phase: Math.random() * Math.PI * 2,
            group: g,
            tint: g % 3 === 0 ? 2 : g % 3 === 1 ? 1 : 0,
          });
        }
        // Connect nearest
        for (let i = start; i < stars.length; i++) {
          let best = -1;
          let bestD = Infinity;
          for (let j = start; j < stars.length; j++) {
            if (i === j) continue;
            const dt = stars[i].theta - stars[j].theta;
            const dp = stars[i].phi - stars[j].phi;
            const d = dt * dt + dp * dp;
            if (d < bestD) { bestD = d; best = j; }
          }
          if (best !== -1 && !lines.some(l =>
            (l.a === i && l.b === best) || (l.a === best && l.b === i)
          )) {
            lines.push({ a: i, b: best, group: g });
          }
        }
      }

      starsRef.current = stars;
      linesRef.current = lines;
    };

    const tints = [
      [255, 255, 255],
      [100, 160, 255],
      [60, 200, 240],
    ];

    // Project 3D sphere point to 2D
    const project = (theta: number, phi: number, r: number, rx: number, ry: number) => {
      // Spherical to cartesian
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.cos(phi);
      let z = r * Math.sin(phi) * Math.sin(theta);

      // Rotate around Y axis
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x2 = x * cosY - z * sinY;
      const z2 = x * sinY + z * cosY;
      x = x2;
      z = z2;

      // Rotate around X axis
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z * sinX;
      const z3 = y * sinX + z * cosX;
      y = y2;
      z = z3;

      // Perspective
      const fov = 800;
      const scale = fov / (fov + z);
      return {
        sx: w / 2 + x * scale,
        sy: h / 2 + y * scale,
        scale,
        z,
      };
    };

    const draw = () => {
      const dt = 1 / 60;
      time += dt;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;
      scroll.current += (scrollState.progress - scroll.current) * 0.08;
      const sp = scroll.current;

      // Rotation: slow auto + mouse influence
      rotation.current.y = time * 0.06 + (mouse.current.x - 0.5) * 1.2;
      rotation.current.x = (mouse.current.y - 0.5) * 0.6;

      const rx = rotation.current.x;
      const ry = rotation.current.y;

      ctx.clearRect(0, 0, w, h);

      // Background
      const bgB = Math.floor(6 + sp * 14);
      ctx.fillStyle = `rgb(${Math.floor(1 + sp * 4)},${Math.floor(2 + sp * 3)},${bgB})`;
      ctx.fillRect(0, 0, w, h);

      // Centre glow
      const cg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.5);
      cg.addColorStop(0, `rgba(40,70,140,${0.015 + sp * 0.04})`);
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, w, h);

      const stars = starsRef.current;
      const lines = linesRef.current;

      // Sort by z for proper layering (back to front)
      const projected = stars.map((s, i) => {
        const p = project(s.theta, s.phi, s.r, rx, ry);
        return { ...p, idx: i };
      });
      projected.sort((a, b) => a.z - b.z);

      // Pre-project all for line drawing
      const allProj = stars.map(s => project(s.theta, s.phi, s.r, rx, ry));

      // Draw constellation lines
      for (const line of lines) {
        const pa = allProj[line.a];
        const pb = allProj[line.b];
        // Skip if behind camera
        if (pa.z < -700 || pb.z < -700) continue;

        const depthFade = Math.min(pa.scale, pb.scale);
        const sa = stars[line.a];

        let lineAlpha: number;
        if (sp < 0.3) {
          lineAlpha = (sp / 0.3) * 0.18 * depthFade;
        } else if (sp < 0.7) {
          lineAlpha = (0.18 + Math.sin(time * 0.8 + line.group) * 0.05) * depthFade;
        } else {
          const t = (sp - 0.7) / 0.3;
          lineAlpha = (0.18 + t * 0.3) * depthFade;
        }

        const tint = tints[sa.tint];

        // Glow line
        if (sp > 0.7) {
          const gp = (sp - 0.7) / 0.3;
          ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${lineAlpha * gp * 0.35})`;
          ctx.lineWidth = 3 * depthFade;
          ctx.beginPath();
          ctx.moveTo(pa.sx, pa.sy);
          ctx.lineTo(pb.sx, pb.sy);
          ctx.stroke();
        }

        ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${lineAlpha})`;
        ctx.lineWidth = (sp > 0.7 ? 1.2 : 0.8) * depthFade;
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();

        // Data pulse
        if (sp > 0.35) {
          const pt = (time * 0.5 + line.group * 0.7 + line.a * 0.3) % 1;
          const ppx = pa.sx + (pb.sx - pa.sx) * pt;
          const ppy = pa.sy + (pb.sy - pa.sy) * pt;
          const pAlpha = Math.sin(pt * Math.PI) * (sp > 0.7 ? 0.5 : 0.25) * depthFade;
          const pg = ctx.createRadialGradient(ppx, ppy, 0, ppx, ppy, 4 * depthFade);
          pg.addColorStop(0, `rgba(${tint[0]},${tint[1]},${tint[2]},${pAlpha})`);
          pg.addColorStop(1, `rgba(${tint[0]},${tint[1]},${tint[2]},0)`);
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(ppx, ppy, 4 * depthFade, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw stars (back to front)
      for (const p of projected) {
        const star = stars[p.idx];
        if (p.z < -700) continue;

        const twinkle = star.brightness +
          Math.sin(time * star.speed + star.phase) * star.brightness * 0.3;
        const tint = tints[star.tint];
        const isCon = star.group !== -1;
        const depthFade = p.scale;

        let sizeMult = depthFade;
        let alphaMult = depthFade;
        if (isCon) {
          sizeMult *= 1 + sp * 0.6;
          alphaMult *= 0.7 + sp * 0.3;

          // Outer ring
          if (sp > 0.5) {
            const ra = (sp - 0.5) * 0.35 * depthFade;
            ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${ra * twinkle})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, star.size * sizeMult * 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Glow
        if (star.size > 1.2 || isCon) {
          const gr = star.size * (isCon ? 5 * sizeMult : 3.5 * depthFade);
          const glow = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, gr);
          glow.addColorStop(0, `rgba(${tint[0]},${tint[1]},${tint[2]},${twinkle * alphaMult * 0.2})`);
          glow.addColorStop(1, `rgba(${tint[0]},${tint[1]},${tint[2]},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, gr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
        ctx.fillStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${twinkle * alphaMult})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, star.size * sizeMult, 0, Math.PI * 2);
        ctx.fill();

        // Cross-hair
        if (isCon && sp > 0.3 && star.size > 2.5) {
          const sl = star.size * sizeMult * 3.5 * sp;
          const sa = twinkle * 0.12 * sp * depthFade;
          ctx.strokeStyle = `rgba(${tint[0]},${tint[1]},${tint[2]},${sa})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.sx, p.sy - sl);
          ctx.lineTo(p.sx, p.sy + sl);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(p.sx - sl, p.sy);
          ctx.lineTo(p.sx + sl, p.sy);
          ctx.stroke();
        }
      }

      // HUD scan lines
      if (sp > 0.6) {
        const ha = (sp - 0.6) * 0.06;
        for (let y = 0; y < h; y += 4) {
          ctx.fillStyle = `rgba(80,150,255,${ha * (0.3 + Math.sin(y * 0.1 + time * 2) * 0.2)})`;
          ctx.fillRect(0, y, w, 0.5);
        }
      }

      // Vignette
      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.7);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, `rgba(0,0,0,${0.45 + sp * 0.1})`);
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "#000000" }}
    />
  );
}
