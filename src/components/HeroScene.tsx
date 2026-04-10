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

    // Globe wireframe points
    const latLines = 12;
    const lonLines = 24;
    const segments = 60;

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

    // 3D rotation + perspective projection
    const project = (x: number, y: number, z: number, ry: number, rx: number) => {
      // Rotate Y
      let x2 = x * Math.cos(ry) - z * Math.sin(ry);
      let z2 = x * Math.sin(ry) + z * Math.cos(ry);
      // Rotate X
      let y2 = y * Math.cos(rx) - z2 * Math.sin(rx);
      let z3 = y * Math.sin(rx) + z2 * Math.cos(rx);

      const fov = 600;
      const scale = fov / (fov + z3);
      return {
        sx: w / 2 + x2 * scale,
        sy: h / 2 + y2 * scale,
        z: z3,
        scale,
      };
    };

    const draw = () => {
      const dt = 1 / 60;
      time += dt;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;

      const ry = time * 0.08 + (mouse.current.x - 0.5) * 0.8;
      const rx = (mouse.current.y - 0.5) * 0.4;

      const R = Math.min(w, h) * 0.32;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // ── Draw latitude lines ──
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        const ringR = R * Math.sin(phi);
        const ringY = R * Math.cos(phi);

        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          const px = ringR * Math.cos(theta);
          const pz = ringR * Math.sin(theta);
          const p = project(px, ringY, pz, ry, rx);

          // Fade lines on the back face
          const alpha = p.z < 0 ? 0.03 : 0.1;
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            // Draw segment by segment so we can fade back-face
            ctx.strokeStyle = `rgba(59,123,245,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p.sx, p.sy);
          }
          ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      // ── Draw longitude lines ──
      for (let i = 0; i < lonLines; i++) {
        const theta = (i / lonLines) * Math.PI * 2;

        ctx.beginPath();
        let started = false;
        for (let j = 0; j <= segments; j++) {
          const phi = (j / segments) * Math.PI;
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);
          const p = project(px, py, pz, ry, rx);

          const alpha = p.z < 0 ? 0.03 : 0.1;
          if (!started) {
            ctx.moveTo(p.sx, p.sy);
            started = true;
          } else {
            ctx.strokeStyle = `rgba(59,123,245,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p.sx, p.sy);
          }
          ctx.lineTo(p.sx, p.sy);
        }
        ctx.stroke();
      }

      // ── Intersection dots at grid nodes ──
      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        for (let j = 0; j < lonLines; j++) {
          const theta = (j / lonLines) * Math.PI * 2;
          const px = R * Math.sin(phi) * Math.cos(theta);
          const py = R * Math.cos(phi);
          const pz = R * Math.sin(phi) * Math.sin(theta);
          const p = project(px, py, pz, ry, rx);

          if (p.z < -50) continue;
          const alpha = p.z < 0 ? 0.06 : 0.2;
          ctx.fillStyle = `rgba(59,123,245,${alpha})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, 1.2 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Subtle glow at centre ──
      const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, R * 1.2);
      glow.addColorStop(0, "rgba(59,123,245,0.03)");
      glow.addColorStop(0.6, "rgba(59,123,245,0.01)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, R * 1.2, 0, Math.PI * 2);
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
