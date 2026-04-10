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

    const latLines = 12;
    const lonLines = 24;
    const segs = 64;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / w;
      mouse.current.ty = e.clientY / h;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    const rotatePoint = (
      x: number, y: number, z: number,
      ry: number, rx: number
    ): [number, number, number] => {
      // Y rotation
      const x1 = x * Math.cos(ry) - z * Math.sin(ry);
      const z1 = x * Math.sin(ry) + z * Math.cos(ry);
      // X rotation
      const y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
      return [x1, y1, z2];
    };

    const draw = () => {
      const dt = 1 / 60;
      time += dt;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;

      const ry = time * 0.08 + (mouse.current.x - 0.5) * 0.8;
      const rx = (mouse.current.y - 0.5) * 0.4;
      const R = Math.min(w, h) * 0.32;
      const cx = w / 2;
      const cy = h / 2;
      const fov = 600;

      // Clear
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // Draw latitude lines
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        const ringR = R * Math.sin(phi);
        const ringY = R * Math.cos(phi);

        // Front pass
        ctx.strokeStyle = "rgba(59,123,245,0.12)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        let inFront = false;
        for (let j = 0; j <= segs; j++) {
          const theta = (j / segs) * Math.PI * 2;
          const px = ringR * Math.cos(theta);
          const pz = ringR * Math.sin(theta);
          const [rx2, ry2, rz2] = rotatePoint(px, ringY, pz, ry, rx);
          const s = fov / (fov + rz2);
          const sx = cx + rx2 * s;
          const sy = cy + ry2 * s;

          if (rz2 < 0) {
            if (inFront) { ctx.stroke(); ctx.beginPath(); inFront = false; }
          } else {
            if (!inFront) { ctx.moveTo(sx, sy); inFront = true; }
            else { ctx.lineTo(sx, sy); }
          }
        }
        ctx.stroke();

        // Back pass (faint)
        ctx.strokeStyle = "rgba(59,123,245,0.03)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        let inBack = false;
        for (let j = 0; j <= segs; j++) {
          const theta = (j / segs) * Math.PI * 2;
          const px = ringR * Math.cos(theta);
          const pz = ringR * Math.sin(theta);
          const [rx2, ry2, rz2] = rotatePoint(px, ringY, pz, ry, rx);
          const s = fov / (fov + rz2);
          const sx = cx + rx2 * s;
          const sy = cy + ry2 * s;

          if (rz2 >= 0) {
            if (inBack) { ctx.stroke(); ctx.beginPath(); inBack = false; }
          } else {
            if (!inBack) { ctx.moveTo(sx, sy); inBack = true; }
            else { ctx.lineTo(sx, sy); }
          }
        }
        ctx.stroke();
      }

      // Draw longitude lines
      for (let i = 0; i < lonLines; i++) {
        const theta = (i / lonLines) * Math.PI * 2;

        // Front pass
        ctx.strokeStyle = "rgba(59,123,245,0.12)";
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        let inFront = false;
        for (let j = 0; j <= segs; j++) {
          const phi = (j / segs) * Math.PI;
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);
          const [rx2, ry2, rz2] = rotatePoint(px, py, pz, ry, rx);
          const s = fov / (fov + rz2);
          const sx = cx + rx2 * s;
          const sy = cy + ry2 * s;

          if (rz2 < 0) {
            if (inFront) { ctx.stroke(); ctx.beginPath(); inFront = false; }
          } else {
            if (!inFront) { ctx.moveTo(sx, sy); inFront = true; }
            else { ctx.lineTo(sx, sy); }
          }
        }
        ctx.stroke();

        // Back pass
        ctx.strokeStyle = "rgba(59,123,245,0.03)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        let inBack = false;
        for (let j = 0; j <= segs; j++) {
          const phi = (j / segs) * Math.PI;
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);
          const [rx2, ry2, rz2] = rotatePoint(px, py, pz, ry, rx);
          const s = fov / (fov + rz2);
          const sx = cx + rx2 * s;
          const sy = cy + ry2 * s;

          if (rz2 >= 0) {
            if (inBack) { ctx.stroke(); ctx.beginPath(); inBack = false; }
          } else {
            if (!inBack) { ctx.moveTo(sx, sy); inBack = true; }
            else { ctx.lineTo(sx, sy); }
          }
        }
        ctx.stroke();
      }

      // Grid intersection dots (front face only)
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        for (let j = 0; j < lonLines; j++) {
          const theta = (j / lonLines) * Math.PI * 2;
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);
          const [rx2, ry2, rz2] = rotatePoint(px, py, pz, ry, rx);
          if (rz2 < -50) continue;
          const s = fov / (fov + rz2);
          const sx = cx + rx2 * s;
          const sy = cy + ry2 * s;
          const alpha = rz2 < 0 ? 0.04 : 0.18;
          ctx.fillStyle = `rgba(59,123,245,${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.2 * s, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Centre glow
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.1);
      glow.addColorStop(0, "rgba(59,123,245,0.025)");
      glow.addColorStop(0.6, "rgba(59,123,245,0.008)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.1, 0, Math.PI * 2);
      ctx.fill();

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
