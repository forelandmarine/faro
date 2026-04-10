"use client";

import { useEffect, useRef } from "react";

export const scrollState = { progress: 0 };

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let time = 0;
    let w = 0;
    let h = 0;

    const BLUE = [0, 112, 243]; // Vercel blue #0070F3
    const WHITE = [255, 255, 255];

    // Stars
    let starData: { x: number; y: number; s: number; a: number; sp: number; ph: number }[] = [];

    const latLines = 16;
    const lonLines = 32;
    const segs = 80;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Generate stars
      starData = [];
      for (let i = 0; i < 300; i++) {
        starData.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: Math.random() < 0.05 ? 1.5 + Math.random() : 0.5 + Math.random() * 0.5,
          a: 0.15 + Math.random() * 0.5,
          sp: 0.5 + Math.random() * 3,
          ph: Math.random() * Math.PI * 2,
        });
      }
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / w;
      mouse.current.ty = e.clientY / h;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    const rot = (
      x: number, y: number, z: number,
      ry: number, rx: number
    ): [number, number, number] => {
      const x1 = x * Math.cos(ry) - z * Math.sin(ry);
      const z1 = x * Math.sin(ry) + z * Math.cos(ry);
      const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      return [x1, y1, z2];
    };

    const draw = () => {
      time += 1 / 60;

      // Spring-damped mouse tracking (Vercel-style)
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;

      // Mouse drives rotation strongly
      const ry = time * 0.1 + (mouse.current.x - 0.5) * 2.0;
      const rx = (mouse.current.y - 0.5) * 1.0;
      const R = Math.min(w, h) * 0.38;
      const cx = w / 2;
      const cy = h / 2;
      const fov = 800;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // ── Stars ──
      const mx = (mouse.current.x - 0.5) * 20;
      const my = (mouse.current.y - 0.5) * 12;
      for (const star of starData) {
        const twinkle = star.a + Math.sin(time * star.sp + star.ph) * star.a * 0.4;
        const sx = star.x + mx * star.s * 0.3;
        const sy = star.y + my * star.s * 0.2;
        ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
        ctx.beginPath();
        ctx.arc(sx, sy, star.s, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Helper: project and draw a wireframe ring ──
      const drawRing = (
        getPoint: (t: number) => [number, number, number]
      ) => {
        const points: { sx: number; sy: number; z: number }[] = [];
        for (let j = 0; j <= segs; j++) {
          const t = j / segs;
          const [px, py, pz] = getPoint(t);
          const [rx2, ry2, rz2] = rot(px, py, pz, ry, rx);
          const s = fov / (fov + rz2);
          points.push({ sx: cx + rx2 * s, sy: cy + ry2 * s, z: rz2 });
        }

        // Draw segments with depth-based opacity
        for (let j = 0; j < points.length - 1; j++) {
          const p1 = points[j];
          const p2 = points[j + 1];
          const avgZ = (p1.z + p2.z) / 2;
          // Map z from [-R, R] to opacity
          const t = (avgZ + R) / (2 * R); // 0 = back, 1 = front
          const alpha = 0.02 + t * 0.18;

          ctx.strokeStyle = `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${alpha})`;
          ctx.lineWidth = 0.5 + t * 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.stroke();
        }
      };

      // ── Latitude lines ──
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        const ringR = R * Math.sin(phi);
        const ringY = R * Math.cos(phi);
        drawRing((t) => [
          ringR * Math.cos(t * Math.PI * 2),
          ringY,
          ringR * Math.sin(t * Math.PI * 2),
        ]);
      }

      // ── Longitude lines ──
      for (let i = 0; i < lonLines; i++) {
        const theta = (i / lonLines) * Math.PI * 2;
        drawRing((t) => [
          R * Math.sin(t * Math.PI) * Math.cos(theta),
          R * Math.cos(t * Math.PI),
          R * Math.sin(t * Math.PI) * Math.sin(theta),
        ]);
      }

      // ── Grid dots ──
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        for (let j = 0; j < lonLines; j++) {
          const theta = (j / lonLines) * Math.PI * 2;
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);
          const [rx2, ry2, rz2] = rot(px, py, pz, ry, rx);
          const s = fov / (fov + rz2);
          const sx = cx + rx2 * s;
          const sy = cy + ry2 * s;

          const t = (rz2 + R) / (2 * R);
          const dotAlpha = 0.03 + t * 0.3;
          const dotR = (0.8 + t * 1.5) * s;

          // Glow on front-face dots
          if (t > 0.6) {
            const glowR = dotR * 6;
            const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
            glow.addColorStop(0, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${(t - 0.6) * 0.15})`);
            glow.addColorStop(1, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},0)`);
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Centre glow - larger, more visible ──
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3);
      glow.addColorStop(0, "rgba(0,112,243,0.06)");
      glow.addColorStop(0.4, "rgba(0,112,243,0.02)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // ── Vignette ──
      const vig = ctx.createRadialGradient(cx, cy, w * 0.2, cx, cy, w * 0.75);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.5)");
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ background: "#000000" }}
    />
  );
}
