"use client";

import { useEffect, useRef, useCallback } from "react";

export const scrollState = { progress: 0 };

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const stars = useRef<
    { x: number; y: number; r: number; base: number; speed: number; phase: number }[]
  >([]);
  const shootingStars = useRef<
    {
      active: boolean;
      timer: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
    }[]
  >([]);

  const init = useCallback((w: number, h: number) => {
    const s: typeof stars.current = [];
    for (let i = 0; i < 500; i++) {
      const isBright = Math.random() < 0.07;
      s.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.62,
        r: isBright ? 1.2 + Math.random() * 1.8 : 0.3 + Math.random() * 0.7,
        base: isBright ? 0.75 + Math.random() * 0.25 : 0.15 + Math.random() * 0.4,
        speed: 0.3 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    stars.current = s;
    shootingStars.current = [
      { active: false, timer: 2, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.8 },
      { active: false, timer: 6, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.6 },
      { active: false, timer: 11, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.7 },
    ];
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
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dt = 1 / 60;
      time += dt;

      ctx.clearRect(0, 0, w, h);

      // ── Sky ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#000000");
      skyGrad.addColorStop(0.45, "#020306");
      skyGrad.addColorStop(0.65, "#05080F");
      skyGrad.addColorStop(1, "#080C16");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Stars with parallax ──
      const mx = (mouse.current.x - 0.5) * 10;
      const my = (mouse.current.y - 0.5) * 5;

      for (const star of stars.current) {
        const twinkle =
          star.base + Math.sin(time * star.speed + star.phase) * star.base * 0.35;
        const px = star.x + mx * (star.r * 0.4);
        const py = star.y + my * (star.r * 0.25);

        if (star.r > 1.2) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, star.r * 5);
          glow.addColorStop(0, `rgba(255, 255, 255, ${twinkle * 0.2})`);
          glow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, star.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.beginPath();
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Shooting stars ──
      for (const ss of shootingStars.current) {
        ss.timer -= dt;
        if (!ss.active && ss.timer <= 0) {
          ss.active = true;
          ss.life = 0;
          ss.x = Math.random() * w * 0.7 + w * 0.1;
          ss.y = Math.random() * h * 0.25 + h * 0.05;
          const angle = Math.PI * 0.12 + Math.random() * 0.35;
          const speed = 500 + Math.random() * 400;
          ss.vx = Math.cos(angle) * speed;
          ss.vy = Math.sin(angle) * speed;
          ss.maxLife = 0.4 + Math.random() * 0.5;
        }
        if (ss.active) {
          ss.life += dt;
          ss.x += ss.vx * dt;
          ss.y += ss.vy * dt;
          if (ss.life > ss.maxLife) {
            ss.active = false;
            ss.timer = 4 + Math.random() * 8;
            continue;
          }
          const fade =
            ss.life < 0.08
              ? ss.life / 0.08
              : ss.life > ss.maxLife * 0.5
                ? (ss.maxLife - ss.life) / (ss.maxLife * 0.5)
                : 1;
          const tailLen = 80 * fade;
          const grad = ctx.createLinearGradient(
            ss.x, ss.y,
            ss.x - (ss.vx / 500) * tailLen,
            ss.y - (ss.vy / 500) * tailLen
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${fade * 0.9})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x - (ss.vx / 500) * tailLen,
            ss.y - (ss.vy / 500) * tailLen
          );
          ctx.stroke();
          ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Horizon / Coastline ──
      const horizonY = h * 0.68;

      // ── Coastline silhouette - rugged headland with moonlit edge ──
      const coastPoints: [number, number][] = [
        [0, horizonY + 8],
        [w * 0.05, horizonY + 5],
        [w * 0.1, horizonY - 2],
        [w * 0.14, horizonY + 3],
        [w * 0.18, horizonY - 8],
        [w * 0.22, horizonY - 3],
        [w * 0.26, horizonY - 18],
        [w * 0.3, horizonY - 10],
        [w * 0.34, horizonY - 25],
        [w * 0.37, horizonY - 15],
        [w * 0.4, horizonY - 5],
        [w * 0.44, horizonY + 2],
        [w * 0.5, horizonY - 10],
        [w * 0.54, horizonY],
        [w * 0.58, horizonY - 6],
        [w * 0.62, horizonY + 4],
        // Lighthouse headland - prominent rise
        [w * 0.66, horizonY - 5],
        [w * 0.7, horizonY - 20],
        [w * 0.73, horizonY - 30],
        [w * 0.76, horizonY - 35], // peak where lighthouse sits
        [w * 0.79, horizonY - 28],
        [w * 0.82, horizonY - 15],
        [w * 0.86, horizonY - 5],
        [w * 0.9, horizonY + 2],
        [w * 0.95, horizonY + 6],
        [w, horizonY + 10],
      ];

      // Fill coastline solid dark
      ctx.beginPath();
      ctx.moveTo(coastPoints[0][0], coastPoints[0][1]);
      for (let i = 1; i < coastPoints.length; i++) {
        ctx.lineTo(coastPoints[i][0], coastPoints[i][1]);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "#0A0E14";
      ctx.fill();

      // Moonlit edge highlight along the coast ridge
      ctx.beginPath();
      ctx.moveTo(coastPoints[0][0], coastPoints[0][1]);
      for (let i = 1; i < coastPoints.length; i++) {
        ctx.lineTo(coastPoints[i][0], coastPoints[i][1]);
      }
      ctx.strokeStyle = "rgba(180, 195, 220, 0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Second edge line, softer
      ctx.strokeStyle = "rgba(140, 165, 200, 0.06)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // ── Water ──
      // Subtle shimmer lines on the water
      for (let i = 0; i < 12; i++) {
        const wy = horizonY + 15 + i * ((h - horizonY - 15) / 12);
        const shimmer = Math.sin(time * 0.4 + i * 1.2) * 0.03 + 0.02;
        ctx.strokeStyle = `rgba(150, 170, 200, ${shimmer})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        const startX = Math.sin(time * 0.3 + i) * 30 + w * 0.1;
        ctx.moveTo(startX, wy);
        ctx.lineTo(startX + 40 + Math.random() * 60, wy);
        ctx.stroke();
      }

      // ── Lighthouse ──
      const lhX = w * 0.76;
      const lhBaseY = horizonY - 35; // sits on the peak
      const towerH = h * 0.12;
      const towerTopW = 4;
      const towerBotW = 7;

      // Tower body
      ctx.fillStyle = "#12161E";
      ctx.beginPath();
      ctx.moveTo(lhX - towerBotW, lhBaseY);
      ctx.lineTo(lhX - towerTopW, lhBaseY - towerH);
      ctx.lineTo(lhX + towerTopW, lhBaseY - towerH);
      ctx.lineTo(lhX + towerBotW, lhBaseY);
      ctx.closePath();
      ctx.fill();

      // Tower moonlit edge (left side highlight)
      ctx.beginPath();
      ctx.moveTo(lhX - towerBotW, lhBaseY);
      ctx.lineTo(lhX - towerTopW, lhBaseY - towerH);
      ctx.strokeStyle = "rgba(180, 195, 220, 0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Gallery platform
      const galleryY = lhBaseY - towerH;
      ctx.fillStyle = "#161C26";
      ctx.fillRect(lhX - towerTopW - 4, galleryY, (towerTopW + 4) * 2, 3);

      // Lantern room
      const lanternH = towerH * 0.2;
      ctx.fillStyle = "#1A2030";
      ctx.fillRect(lhX - 5, galleryY - lanternH, 10, lanternH);

      // Dome
      ctx.fillStyle = "#161C26";
      ctx.beginPath();
      ctx.arc(lhX, galleryY - lanternH, 6, Math.PI, 0);
      ctx.fill();

      // ── LIGHT - the main event ──
      const lightY = galleryY - lanternH * 0.5;
      const pulse = 0.65 + Math.sin(time * 1.8) * 0.35;

      // Large atmospheric glow
      const atmoGlow = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 120);
      atmoGlow.addColorStop(0, `rgba(226, 134, 75, ${0.25 * pulse})`);
      atmoGlow.addColorStop(0.3, `rgba(226, 134, 75, ${0.08 * pulse})`);
      atmoGlow.addColorStop(0.6, `rgba(226, 134, 75, ${0.02 * pulse})`);
      atmoGlow.addColorStop(1, "rgba(226, 134, 75, 0)");
      ctx.fillStyle = atmoGlow;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 120, 0, Math.PI * 2);
      ctx.fill();

      // Medium glow
      const medGlow = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 40);
      medGlow.addColorStop(0, `rgba(255, 220, 170, ${0.5 * pulse})`);
      medGlow.addColorStop(0.5, `rgba(226, 134, 75, ${0.15 * pulse})`);
      medGlow.addColorStop(1, "rgba(226, 134, 75, 0)");
      ctx.fillStyle = medGlow;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 40, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      const coreGlow = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 8);
      coreGlow.addColorStop(0, `rgba(255, 245, 225, ${0.95 * pulse})`);
      coreGlow.addColorStop(0.5, `rgba(255, 200, 140, ${0.6 * pulse})`);
      coreGlow.addColorStop(1, `rgba(226, 134, 75, ${0.2 * pulse})`);
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 8, 0, Math.PI * 2);
      ctx.fill();

      // ── Sweeping beam ──
      const beamAngle = time * 0.6;
      const beamDir = Math.cos(beamAngle);
      if (beamDir > -0.2) {
        const beamStrength = Math.max(0, beamDir);
        const beamLen = Math.min(w * 0.5, 500);
        const beamSpread = 0.06;
        const baseAngle = -Math.PI / 2 + Math.sin(beamAngle) * 1.0;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Outer beam (wide, faint)
        ctx.beginPath();
        ctx.moveTo(lhX, lightY);
        ctx.lineTo(
          lhX + Math.cos(baseAngle - beamSpread * 1.8) * beamLen,
          lightY + Math.sin(baseAngle - beamSpread * 1.8) * beamLen
        );
        ctx.lineTo(
          lhX + Math.cos(baseAngle + beamSpread * 1.8) * beamLen,
          lightY + Math.sin(baseAngle + beamSpread * 1.8) * beamLen
        );
        ctx.closePath();
        const outerBeam = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, beamLen);
        outerBeam.addColorStop(0, `rgba(226, 134, 75, ${beamStrength * 0.12 * pulse})`);
        outerBeam.addColorStop(0.4, `rgba(226, 134, 75, ${beamStrength * 0.03 * pulse})`);
        outerBeam.addColorStop(1, "rgba(226, 134, 75, 0)");
        ctx.fillStyle = outerBeam;
        ctx.fill();

        // Inner beam (narrow, brighter)
        ctx.beginPath();
        ctx.moveTo(lhX, lightY);
        ctx.lineTo(
          lhX + Math.cos(baseAngle - beamSpread) * beamLen * 0.8,
          lightY + Math.sin(baseAngle - beamSpread) * beamLen * 0.8
        );
        ctx.lineTo(
          lhX + Math.cos(baseAngle + beamSpread) * beamLen * 0.8,
          lightY + Math.sin(baseAngle + beamSpread) * beamLen * 0.8
        );
        ctx.closePath();
        const innerBeam = ctx.createRadialGradient(
          lhX, lightY, 0, lhX, lightY, beamLen * 0.8
        );
        innerBeam.addColorStop(0, `rgba(255, 220, 170, ${beamStrength * 0.15 * pulse})`);
        innerBeam.addColorStop(0.3, `rgba(226, 134, 75, ${beamStrength * 0.05 * pulse})`);
        innerBeam.addColorStop(1, "rgba(226, 134, 75, 0)");
        ctx.fillStyle = innerBeam;
        ctx.fill();

        ctx.restore();
      }

      // ── Water reflection ──
      // Main reflection column
      const reflW = 40;
      for (let i = 0; i < 8; i++) {
        const ry = horizonY + i * 12 + 5;
        const rFade = 1 - i / 8;
        const shimmer = Math.sin(time * 0.8 + i * 0.7) * 0.3 + 0.7;
        const rw = reflW * shimmer * rFade;
        const rGrad = ctx.createRadialGradient(lhX, ry, 0, lhX, ry, rw);
        rGrad.addColorStop(0, `rgba(226, 134, 75, ${0.08 * pulse * rFade * shimmer})`);
        rGrad.addColorStop(1, "rgba(226, 134, 75, 0)");
        ctx.fillStyle = rGrad;
        ctx.beginPath();
        ctx.arc(lhX, ry, rw, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Moon glow on horizon (far left) ──
      const moonX = w * 0.12;
      const moonY = horizonY - 60;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 80);
      moonGlow.addColorStop(0, "rgba(200, 210, 230, 0.06)");
      moonGlow.addColorStop(0.5, "rgba(160, 175, 200, 0.02)");
      moonGlow.addColorStop(1, "rgba(160, 175, 200, 0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 80, 0, Math.PI * 2);
      ctx.fill();

      // Moon disc
      ctx.fillStyle = "rgba(220, 225, 235, 0.08)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(235, 240, 248, 0.12)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 8, 0, Math.PI * 2);
      ctx.fill();

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
