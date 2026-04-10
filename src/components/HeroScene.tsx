"use client";

import { useEffect, useRef } from "react";

export const scrollState = { progress: 0 };

interface Star {
  x: number; y: number;
  s: number; a: number; sp: number; ph: number;
  // Interaction: glow boost when mouse is near
  glow: number;
}

interface ShootingStar {
  active: boolean;
  timer: number;
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
}

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, px: 0, py: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let time = 0;
    let w = 0;
    let h = 0;

    const BLUE = [0, 112, 243];

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

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

      stars = [];
      for (let i = 0; i < 400; i++) {
        const bright = Math.random() < 0.06;
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          s: bright ? 1.5 + Math.random() * 1.2 : 0.4 + Math.random() * 0.6,
          a: bright ? 0.6 + Math.random() * 0.4 : 0.1 + Math.random() * 0.35,
          sp: 0.5 + Math.random() * 2.5,
          ph: Math.random() * Math.PI * 2,
          glow: 0,
        });
      }

      shootingStars = [
        { active: false, timer: 1.5, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.6 },
        { active: false, timer: 5, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.5 },
        { active: false, timer: 9, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.7 },
      ];
    };

    const onMouse = (e: MouseEvent) => {
      mouse.current.tx = e.clientX / w;
      mouse.current.ty = e.clientY / h;
      mouse.current.px = e.clientX;
      mouse.current.py = e.clientY;
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
      const dt = 1 / 60;
      time += dt;

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;

      const ry = time * 0.1 + (mouse.current.x - 0.5) * 2.0;
      const rx = (mouse.current.y - 0.5) * 1.0;
      const R = Math.min(w, h) * 0.25;
      const cx = w / 2;
      const cy = h / 2;
      const fov = 800;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      // ── Stars with mouse proximity interaction ──
      const mpx = mouse.current.px;
      const mpy = mouse.current.py;
      const mx = (mouse.current.x - 0.5) * 20;
      const my = (mouse.current.y - 0.5) * 12;

      for (const star of stars) {
        const twinkle = star.a + Math.sin(time * star.sp + star.ph) * star.a * 0.4;
        const sx = star.x + mx * star.s * 0.3;
        const sy = star.y + my * star.s * 0.2;

        // Mouse proximity: stars within 120px of cursor glow brighter
        const dx = sx - mpx;
        const dy = sy - mpy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 120);
        star.glow += (proximity - star.glow) * 0.1; // smooth

        const finalAlpha = twinkle + star.glow * 0.6;
        const finalSize = star.s + star.glow * 2;

        // Glow halo when activated
        if (star.glow > 0.05) {
          const gr = finalSize * 8;
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
          glow.addColorStop(0, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${star.glow * 0.25})`);
          glow.addColorStop(1, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx, sy, gr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Bright stars always get a small halo
        if (star.s > 1.2) {
          const gr = finalSize * 4;
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
          glow.addColorStop(0, `rgba(255,255,255,${finalAlpha * 0.15})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(sx, sy, gr, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star core - shifts to blue when glowing
        if (star.glow > 0.1) {
          const blend = star.glow;
          const r = Math.round(255 * (1 - blend) + BLUE[0] * blend);
          const g = Math.round(255 * (1 - blend) + BLUE[1] * blend);
          const b = Math.round(255 * (1 - blend) + BLUE[2] * blend);
          ctx.fillStyle = `rgba(${r},${g},${b},${finalAlpha})`;
        } else {
          ctx.fillStyle = `rgba(255,255,255,${finalAlpha})`;
        }
        ctx.beginPath();
        ctx.arc(sx, sy, finalSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Shooting stars ──
      for (const ss of shootingStars) {
        ss.timer -= dt;
        if (!ss.active && ss.timer <= 0) {
          ss.active = true;
          ss.life = 0;
          ss.x = Math.random() * w * 0.7 + w * 0.1;
          ss.y = Math.random() * h * 0.3 + h * 0.05;
          const angle = Math.PI * 0.1 + Math.random() * 0.4;
          const speed = 500 + Math.random() * 500;
          ss.vx = Math.cos(angle) * speed;
          ss.vy = Math.sin(angle) * speed;
          ss.maxLife = 0.3 + Math.random() * 0.5;
        }
        if (ss.active) {
          ss.life += dt;
          ss.x += ss.vx * dt;
          ss.y += ss.vy * dt;
          if (ss.life > ss.maxLife || ss.x > w + 50 || ss.y > h + 50) {
            ss.active = false;
            ss.timer = 3 + Math.random() * 7;
            continue;
          }
          const fade = ss.life < 0.06 ? ss.life / 0.06
            : ss.life > ss.maxLife * 0.5 ? (ss.maxLife - ss.life) / (ss.maxLife * 0.5) : 1;

          // Trail
          const tailLen = 100 * fade;
          const normVx = ss.vx / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
          const normVy = ss.vy / Math.sqrt(ss.vx * ss.vx + ss.vy * ss.vy);
          const tailX = ss.x - normVx * tailLen;
          const tailY = ss.y - normVy * tailLen;

          const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
          grad.addColorStop(0, `rgba(255,255,255,${fade * 0.9})`);
          grad.addColorStop(0.3, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${fade * 0.4})`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5 + fade;
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Bright head
          const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
          headGlow.addColorStop(0, `rgba(255,255,255,${fade * 0.9})`);
          headGlow.addColorStop(1, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},0)`);
          ctx.fillStyle = headGlow;
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Globe wireframe ──
      const drawRing = (getPoint: (t: number) => [number, number, number]) => {
        const points: { sx: number; sy: number; z: number }[] = [];
        for (let j = 0; j <= segs; j++) {
          const [px, py, pz] = getPoint(j / segs);
          const [rx2, ry2, rz2] = rot(px, py, pz, ry, rx);
          const s = fov / (fov + rz2);
          points.push({ sx: cx + rx2 * s, sy: cy + ry2 * s, z: rz2 });
        }
        for (let j = 0; j < points.length - 1; j++) {
          const p1 = points[j];
          const p2 = points[j + 1];
          const t = ((p1.z + p2.z) / 2 + R) / (2 * R);
          const alpha = 0.02 + t * 0.18;
          ctx.strokeStyle = `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${alpha})`;
          ctx.lineWidth = 0.5 + t * 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.stroke();
        }
      };

      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        const rr = R * Math.sin(phi);
        const ry2 = R * Math.cos(phi);
        drawRing((t) => [rr * Math.cos(t * Math.PI * 2), ry2, rr * Math.sin(t * Math.PI * 2)]);
      }
      for (let i = 0; i < lonLines; i++) {
        const theta = (i / lonLines) * Math.PI * 2;
        drawRing((t) => [
          R * Math.sin(t * Math.PI) * Math.cos(theta),
          R * Math.cos(t * Math.PI),
          R * Math.sin(t * Math.PI) * Math.sin(theta),
        ]);
      }

      // Grid dots
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
          if (t < 0.1) continue;
          const dotAlpha = 0.03 + t * 0.3;
          const dotR = (0.8 + t * 1.5) * s;

          if (t > 0.6) {
            const gr = dotR * 5;
            const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
            glow.addColorStop(0, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${(t - 0.6) * 0.12})`);
            glow.addColorStop(1, `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},0)`);
            ctx.fillStyle = glow;
            ctx.beginPath();
            ctx.arc(sx, sy, gr, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = `rgba(${BLUE[0]},${BLUE[1]},${BLUE[2]},${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Centre glow
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3);
      cg.addColorStop(0, "rgba(0,112,243,0.05)");
      cg.addColorStop(0.4, "rgba(0,112,243,0.015)");
      cg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Vignette
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
