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
    // Generate stars
    const s: typeof stars.current = [];
    for (let i = 0; i < 400; i++) {
      const isBright = Math.random() < 0.06;
      s.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.65, // upper 65% only
        r: isBright ? 1 + Math.random() * 1.5 : 0.3 + Math.random() * 0.8,
        base: isBright ? 0.7 + Math.random() * 0.3 : 0.15 + Math.random() * 0.4,
        speed: 0.3 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }
    stars.current = s;

    // Init shooting stars
    shootingStars.current = [
      { active: false, timer: 3, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.8 },
      { active: false, timer: 8, x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0.6 },
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
      ctx.scale(dpr, dpr);
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

      // ── Sky gradient ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#000000");
      skyGrad.addColorStop(0.5, "#020308");
      skyGrad.addColorStop(0.75, "#040610");
      skyGrad.addColorStop(1, "#060A14");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Stars with parallax ──
      const mx = (mouse.current.x - 0.5) * 8;
      const my = (mouse.current.y - 0.5) * 4;

      for (const star of stars.current) {
        const twinkle =
          star.base +
          Math.sin(time * star.speed + star.phase) * star.base * 0.35;
        const px = star.x + mx * (star.r * 0.5);
        const py = star.y + my * (star.r * 0.3);

        // Glow halo
        if (star.r > 1) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, star.r * 4);
          glow.addColorStop(0, `rgba(255, 255, 255, ${twinkle * 0.15})`);
          glow.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, star.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core
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
          ss.x = Math.random() * w * 0.8 + w * 0.1;
          ss.y = Math.random() * h * 0.3;
          const angle = Math.PI * 0.15 + Math.random() * 0.3;
          const speed = 400 + Math.random() * 300;
          ss.vx = Math.cos(angle) * speed;
          ss.vy = Math.sin(angle) * speed;
          ss.maxLife = 0.5 + Math.random() * 0.5;
        }
        if (ss.active) {
          ss.life += dt;
          ss.x += ss.vx * dt;
          ss.y += ss.vy * dt;

          if (ss.life > ss.maxLife) {
            ss.active = false;
            ss.timer = 5 + Math.random() * 12;
            continue;
          }

          const fade =
            ss.life < 0.1
              ? ss.life / 0.1
              : ss.life > ss.maxLife * 0.6
                ? (ss.maxLife - ss.life) / (ss.maxLife * 0.4)
                : 1;

          // Trail
          const tailLen = 60 * fade;
          const grad = ctx.createLinearGradient(
            ss.x,
            ss.y,
            ss.x - (ss.vx / 500) * tailLen,
            ss.y - (ss.vy / 500) * tailLen
          );
          grad.addColorStop(0, `rgba(255, 255, 255, ${fade * 0.8})`);
          grad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(
            ss.x - (ss.vx / 500) * tailLen,
            ss.y - (ss.vy / 500) * tailLen
          );
          ctx.stroke();

          // Head
          ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Horizon line ──
      const horizonY = h * 0.72;

      // ── Water - subtle dark reflection zone ──
      const waterGrad = ctx.createLinearGradient(0, horizonY, 0, h);
      waterGrad.addColorStop(0, "rgba(6, 10, 20, 0.9)");
      waterGrad.addColorStop(1, "#000000");
      ctx.fillStyle = waterGrad;
      ctx.fillRect(0, horizonY, w, h - horizonY);

      // ── Lighthouse ──
      const lhX = w * 0.78;
      const lhBaseY = horizonY;
      const towerH = h * 0.07;
      const towerTopW = 2.5;
      const towerBotW = 4;

      // Tower silhouette
      ctx.fillStyle = "#080810";
      ctx.beginPath();
      ctx.moveTo(lhX - towerBotW, lhBaseY);
      ctx.lineTo(lhX - towerTopW, lhBaseY - towerH);
      ctx.lineTo(lhX + towerTopW, lhBaseY - towerH);
      ctx.lineTo(lhX + towerBotW, lhBaseY);
      ctx.closePath();
      ctx.fill();

      // Lantern room
      const lanternY = lhBaseY - towerH;
      const lanternH = towerH * 0.25;
      ctx.fillStyle = "#0A0A14";
      ctx.fillRect(lhX - 4, lanternY - lanternH, 8, lanternH);

      // Dome
      ctx.fillStyle = "#080810";
      ctx.beginPath();
      ctx.arc(lhX, lanternY - lanternH, 5, Math.PI, 0);
      ctx.fill();

      // Light glow
      const lightY = lanternY - lanternH * 0.5;
      const pulse = 0.6 + Math.sin(time * 2) * 0.4;

      // Outer glow
      const outerGlow = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 35);
      outerGlow.addColorStop(0, `rgba(226, 134, 75, ${0.3 * pulse})`);
      outerGlow.addColorStop(0.5, `rgba(226, 134, 75, ${0.08 * pulse})`);
      outerGlow.addColorStop(1, "rgba(226, 134, 75, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 35, 0, Math.PI * 2);
      ctx.fill();

      // Inner glow
      const innerGlow = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 6);
      innerGlow.addColorStop(0, `rgba(255, 235, 200, ${0.9 * pulse})`);
      innerGlow.addColorStop(1, `rgba(226, 134, 75, ${0.4 * pulse})`);
      ctx.fillStyle = innerGlow;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 6, 0, Math.PI * 2);
      ctx.fill();

      // ── Sweeping beam ──
      const beamAngle = time * 0.7;
      const beamDir = Math.cos(beamAngle);
      // Only draw when beam faces toward camera (front 180 degrees)
      if (beamDir > -0.3) {
        const beamOpacity = Math.max(0, beamDir) * 0.06 * pulse;
        const beamLen = 250;
        const beamSpread = 0.08;
        const baseAngle = -Math.PI / 2 + Math.sin(beamAngle) * 0.8;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.moveTo(lhX, lightY);
        ctx.lineTo(
          lhX + Math.cos(baseAngle - beamSpread) * beamLen,
          lightY + Math.sin(baseAngle - beamSpread) * beamLen
        );
        ctx.lineTo(
          lhX + Math.cos(baseAngle + beamSpread) * beamLen,
          lightY + Math.sin(baseAngle + beamSpread) * beamLen
        );
        ctx.closePath();

        const beamGrad = ctx.createRadialGradient(
          lhX, lightY, 0, lhX, lightY, beamLen
        );
        beamGrad.addColorStop(0, `rgba(226, 134, 75, ${beamOpacity * 3})`);
        beamGrad.addColorStop(0.3, `rgba(226, 134, 75, ${beamOpacity})`);
        beamGrad.addColorStop(1, "rgba(226, 134, 75, 0)");
        ctx.fillStyle = beamGrad;
        ctx.fill();
        ctx.restore();
      }

      // ── Water reflection of the light ──
      const reflGrad = ctx.createLinearGradient(0, horizonY, 0, horizonY + 80);
      reflGrad.addColorStop(0, `rgba(226, 134, 75, ${0.06 * pulse})`);
      reflGrad.addColorStop(1, "rgba(226, 134, 75, 0)");
      ctx.fillStyle = reflGrad;
      ctx.fillRect(lhX - 15, horizonY, 30, 80);

      // ── Faint horizon glow ──
      const hGlow = ctx.createLinearGradient(0, horizonY - 20, 0, horizonY + 5);
      hGlow.addColorStop(0, "rgba(15, 20, 35, 0)");
      hGlow.addColorStop(0.5, "rgba(20, 25, 40, 0.3)");
      hGlow.addColorStop(1, "rgba(10, 15, 25, 0)");
      ctx.fillStyle = hGlow;
      ctx.fillRect(0, horizonY - 20, w, 25);

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
