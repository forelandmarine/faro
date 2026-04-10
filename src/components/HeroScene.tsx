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
      x: number; y: number;
      vx: number; vy: number;
      life: number; maxLife: number;
    }[]
  >([]);

  const init = useCallback((w: number, h: number) => {
    const s: typeof stars.current = [];
    for (let i = 0; i < 500; i++) {
      const isBright = Math.random() < 0.07;
      s.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.6,
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

    /* ── Helper: draw a small house silhouette ── */
    const drawHouse = (
      x: number, baseY: number,
      bw: number, bh: number, roofH: number,
      hasWindow: boolean, windowLit: boolean
    ) => {
      // Walls
      ctx.fillStyle = "#0E1218";
      ctx.fillRect(x - bw / 2, baseY - bh, bw, bh);
      // Roof
      ctx.beginPath();
      ctx.moveTo(x - bw / 2 - 2, baseY - bh);
      ctx.lineTo(x, baseY - bh - roofH);
      ctx.lineTo(x + bw / 2 + 2, baseY - bh);
      ctx.closePath();
      ctx.fillStyle = "#0C1018";
      ctx.fill();
      // Moonlit roof edge
      ctx.beginPath();
      ctx.moveTo(x - bw / 2 - 2, baseY - bh);
      ctx.lineTo(x, baseY - bh - roofH);
      ctx.strokeStyle = "rgba(180, 195, 220, 0.08)";
      ctx.lineWidth = 0.8;
      ctx.stroke();
      // Window
      if (hasWindow) {
        const winW = bw * 0.3;
        const winH = bh * 0.35;
        const winY = baseY - bh * 0.65;
        if (windowLit) {
          // Warm glow
          const wg = ctx.createRadialGradient(x, winY, 0, x, winY, winW * 3);
          wg.addColorStop(0, "rgba(226, 180, 100, 0.06)");
          wg.addColorStop(1, "rgba(226, 180, 100, 0)");
          ctx.fillStyle = wg;
          ctx.beginPath();
          ctx.arc(x, winY, winW * 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "rgba(226, 180, 100, 0.35)";
        } else {
          ctx.fillStyle = "rgba(140, 160, 190, 0.06)";
        }
        ctx.fillRect(x - winW / 2, winY - winH / 2, winW, winH);
      }
    };

    /* ── Helper: draw a tree silhouette ── */
    const drawTree = (x: number, baseY: number, h: number, spread: number) => {
      ctx.fillStyle = "#080C12";
      // Trunk
      ctx.fillRect(x - 1, baseY - h * 0.3, 2, h * 0.3);
      // Canopy (triangle)
      ctx.beginPath();
      ctx.moveTo(x - spread, baseY - h * 0.25);
      ctx.lineTo(x, baseY - h);
      ctx.lineTo(x + spread, baseY - h * 0.25);
      ctx.closePath();
      ctx.fill();
      // Moonlit edge
      ctx.beginPath();
      ctx.moveTo(x - spread, baseY - h * 0.25);
      ctx.lineTo(x, baseY - h);
      ctx.strokeStyle = "rgba(180, 195, 220, 0.04)";
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

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

      // ── Stars ──
      const mx = (mouse.current.x - 0.5) * 10;
      const my = (mouse.current.y - 0.5) * 5;
      for (const star of stars.current) {
        const twinkle = star.base + Math.sin(time * star.speed + star.phase) * star.base * 0.35;
        const px = star.x + mx * (star.r * 0.4);
        const py = star.y + my * (star.r * 0.25);
        if (star.r > 1.2) {
          const glow = ctx.createRadialGradient(px, py, 0, px, py, star.r * 5);
          glow.addColorStop(0, `rgba(255,255,255,${twinkle * 0.2})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(px, py, star.r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
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
          const fade = ss.life < 0.08 ? ss.life / 0.08
            : ss.life > ss.maxLife * 0.5 ? (ss.maxLife - ss.life) / (ss.maxLife * 0.5) : 1;
          const tailLen = 80 * fade;
          const grad = ctx.createLinearGradient(
            ss.x, ss.y,
            ss.x - (ss.vx / 500) * tailLen, ss.y - (ss.vy / 500) * tailLen
          );
          grad.addColorStop(0, `rgba(255,255,255,${fade * 0.9})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - (ss.vx / 500) * tailLen, ss.y - (ss.vy / 500) * tailLen);
          ctx.stroke();
          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.beginPath();
          ctx.arc(ss.x, ss.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Moon ──
      const moonX = w * 0.12;
      const moonY = h * 0.22;
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 90);
      moonGlow.addColorStop(0, "rgba(200,210,230,0.07)");
      moonGlow.addColorStop(0.5, "rgba(160,175,200,0.02)");
      moonGlow.addColorStop(1, "rgba(160,175,200,0)");
      ctx.fillStyle = moonGlow;
      ctx.beginPath();
      ctx.arc(moonX, moonY, 90, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(220,225,235,0.08)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(235,240,248,0.13)";
      ctx.beginPath();
      ctx.arc(moonX, moonY, 8, 0, Math.PI * 2);
      ctx.fill();

      // ════════════════════════════════════════════
      //  COASTLINE - harbour with channel in middle
      // ════════════════════════════════════════════
      const horizonY = h * 0.68;
      const channelL = w * 0.44; // left side of harbour channel
      const channelR = w * 0.56; // right side of harbour channel
      const waterLevel = horizonY + 6; // water in the channel

      // ── LEFT HEADLAND (hills, town) ──
      const leftCoast: [number, number][] = [
        [0, horizonY + 10],
        [w * 0.03, horizonY + 5],
        [w * 0.07, horizonY - 4],
        [w * 0.11, horizonY + 2],
        [w * 0.15, horizonY - 15],
        [w * 0.19, horizonY - 8],
        [w * 0.23, horizonY - 28],  // hilltop
        [w * 0.27, horizonY - 22],
        [w * 0.31, horizonY - 30],  // highest point left
        [w * 0.35, horizonY - 18],
        [w * 0.38, horizonY - 10],
        [w * 0.41, horizonY - 4],
        [channelL, waterLevel],      // drops to water at channel
      ];

      // ── RIGHT HEADLAND (lighthouse headland) ──
      const rightCoast: [number, number][] = [
        [channelR, waterLevel],      // rises from channel
        [w * 0.59, horizonY - 3],
        [w * 0.62, horizonY - 8],
        [w * 0.65, horizonY - 15],
        [w * 0.68, horizonY - 25],
        [w * 0.71, horizonY - 35],
        [w * 0.74, horizonY - 42],   // lighthouse peak
        [w * 0.77, horizonY - 35],
        [w * 0.80, horizonY - 22],
        [w * 0.84, horizonY - 12],
        [w * 0.88, horizonY - 5],
        [w * 0.92, horizonY],
        [w * 0.96, horizonY + 5],
        [w, horizonY + 10],
      ];

      // Fill LEFT headland
      ctx.beginPath();
      ctx.moveTo(leftCoast[0][0], leftCoast[0][1]);
      for (const p of leftCoast) ctx.lineTo(p[0], p[1]);
      ctx.lineTo(channelL, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = "#0A0E14";
      ctx.fill();

      // Fill RIGHT headland
      ctx.beginPath();
      ctx.moveTo(rightCoast[0][0], rightCoast[0][1]);
      for (const p of rightCoast) ctx.lineTo(p[0], p[1]);
      ctx.lineTo(w, h);
      ctx.lineTo(channelR, h);
      ctx.closePath();
      ctx.fillStyle = "#0A0E14";
      ctx.fill();

      // Moonlit edges - left
      ctx.beginPath();
      ctx.moveTo(leftCoast[0][0], leftCoast[0][1]);
      for (const p of leftCoast) ctx.lineTo(p[0], p[1]);
      ctx.strokeStyle = "rgba(180,195,220,0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.strokeStyle = "rgba(140,165,200,0.05)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Moonlit edges - right
      ctx.beginPath();
      ctx.moveTo(rightCoast[0][0], rightCoast[0][1]);
      for (const p of rightCoast) ctx.lineTo(p[0], p[1]);
      ctx.strokeStyle = "rgba(180,195,220,0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.strokeStyle = "rgba(140,165,200,0.05)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // ── Harbour channel water ──
      const chGrad = ctx.createLinearGradient(0, waterLevel, 0, h);
      chGrad.addColorStop(0, "#060A12");
      chGrad.addColorStop(1, "#030508");
      ctx.fillStyle = chGrad;
      ctx.fillRect(channelL, waterLevel, channelR - channelL, h - waterLevel);

      // Channel shimmer
      for (let i = 0; i < 6; i++) {
        const sy = waterLevel + 10 + i * 15;
        const shimmer = Math.sin(time * 0.5 + i * 0.9) * 0.025 + 0.02;
        ctx.strokeStyle = `rgba(150,170,200,${shimmer})`;
        ctx.lineWidth = 0.5;
        const sx = channelL + 10 + Math.sin(time * 0.4 + i) * 8;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx + 20 + Math.sin(i) * 15, sy);
        ctx.stroke();
      }

      // ── Trees on left hillsides ──
      drawTree(w * 0.13, horizonY - 12, 14, 5);
      drawTree(w * 0.16, horizonY - 6, 11, 4);
      drawTree(w * 0.20, horizonY - 14, 16, 6);
      drawTree(w * 0.22, horizonY - 24, 13, 5);
      drawTree(w * 0.25, horizonY - 26, 15, 5);
      drawTree(w * 0.28, horizonY - 23, 12, 4);
      drawTree(w * 0.33, horizonY - 25, 14, 5);
      drawTree(w * 0.36, horizonY - 15, 11, 4);
      drawTree(w * 0.39, horizonY - 8, 10, 4);

      // Trees on right hillside
      drawTree(w * 0.61, horizonY - 6, 10, 4);
      drawTree(w * 0.63, horizonY - 12, 13, 5);
      drawTree(w * 0.66, horizonY - 20, 15, 5);
      drawTree(w * 0.69, horizonY - 30, 14, 5);
      drawTree(w * 0.80, horizonY - 20, 12, 4);
      drawTree(w * 0.83, horizonY - 10, 11, 4);
      drawTree(w * 0.86, horizonY - 4, 10, 4);

      // ── Houses on left hilltops (the town) ──
      drawHouse(w * 0.17, horizonY - 10, 8, 7, 5, true, true);
      drawHouse(w * 0.21, horizonY - 18, 7, 6, 4, true, false);
      drawHouse(w * 0.24, horizonY - 26, 9, 8, 5, true, true);
      drawHouse(w * 0.27, horizonY - 22, 6, 5, 4, true, false);
      drawHouse(w * 0.30, horizonY - 27, 8, 7, 5, true, true);
      drawHouse(w * 0.32, horizonY - 24, 7, 6, 4, true, false);
      drawHouse(w * 0.34, horizonY - 20, 10, 8, 6, true, true);
      drawHouse(w * 0.37, horizonY - 14, 7, 6, 4, true, false);
      drawHouse(w * 0.40, horizonY - 6, 8, 7, 5, true, true);

      // Scattered houses on right side
      drawHouse(w * 0.60, horizonY - 5, 7, 6, 4, true, true);
      drawHouse(w * 0.64, horizonY - 12, 8, 7, 5, true, false);
      drawHouse(w * 0.67, horizonY - 22, 7, 6, 4, true, true);

      // ── Keeper's cottage under the lighthouse ──
      const cottageX = w * 0.74 + 14;
      const cottageBaseY = horizonY - 35;
      drawHouse(cottageX, cottageBaseY, 10, 8, 5, true, true);
      // Chimney
      ctx.fillStyle = "#0E1218";
      ctx.fillRect(cottageX + 3, cottageBaseY - 8 - 5 - 4, 2, 6);

      // ── Lighthouse ──
      const lhX = w * 0.74;
      const lhBaseY = horizonY - 42;
      const towerH = h * 0.12;
      const towerTopW = 4;
      const towerBotW = 7;

      // Tower
      ctx.fillStyle = "#12161E";
      ctx.beginPath();
      ctx.moveTo(lhX - towerBotW, lhBaseY);
      ctx.lineTo(lhX - towerTopW, lhBaseY - towerH);
      ctx.lineTo(lhX + towerTopW, lhBaseY - towerH);
      ctx.lineTo(lhX + towerBotW, lhBaseY);
      ctx.closePath();
      ctx.fill();

      // Moonlit edge
      ctx.beginPath();
      ctx.moveTo(lhX - towerBotW, lhBaseY);
      ctx.lineTo(lhX - towerTopW, lhBaseY - towerH);
      ctx.strokeStyle = "rgba(180,195,220,0.18)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Gallery
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

      // ── LIGHT ──
      const lightY = galleryY - lanternH * 0.5;
      const pulse = 0.65 + Math.sin(time * 1.8) * 0.35;

      // Atmospheric glow
      const atmo = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 130);
      atmo.addColorStop(0, `rgba(226,134,75,${0.28 * pulse})`);
      atmo.addColorStop(0.3, `rgba(226,134,75,${0.08 * pulse})`);
      atmo.addColorStop(0.6, `rgba(226,134,75,${0.02 * pulse})`);
      atmo.addColorStop(1, "rgba(226,134,75,0)");
      ctx.fillStyle = atmo;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 130, 0, Math.PI * 2);
      ctx.fill();

      // Medium glow
      const med = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 40);
      med.addColorStop(0, `rgba(255,220,170,${0.5 * pulse})`);
      med.addColorStop(0.5, `rgba(226,134,75,${0.15 * pulse})`);
      med.addColorStop(1, "rgba(226,134,75,0)");
      ctx.fillStyle = med;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 40, 0, Math.PI * 2);
      ctx.fill();

      // Core
      const core = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, 8);
      core.addColorStop(0, `rgba(255,245,225,${0.95 * pulse})`);
      core.addColorStop(0.5, `rgba(255,200,140,${0.6 * pulse})`);
      core.addColorStop(1, `rgba(226,134,75,${0.2 * pulse})`);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(lhX, lightY, 8, 0, Math.PI * 2);
      ctx.fill();

      // ── Beam ──
      const beamAngle = time * 0.6;
      const beamDir = Math.cos(beamAngle);
      if (beamDir > -0.2) {
        const beamStrength = Math.max(0, beamDir);
        const beamLen = Math.min(w * 0.5, 500);
        const beamSpread = 0.06;
        const baseAngle = -Math.PI / 2 + Math.sin(beamAngle) * 1.0;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Outer
        ctx.beginPath();
        ctx.moveTo(lhX, lightY);
        ctx.lineTo(lhX + Math.cos(baseAngle - beamSpread * 1.8) * beamLen, lightY + Math.sin(baseAngle - beamSpread * 1.8) * beamLen);
        ctx.lineTo(lhX + Math.cos(baseAngle + beamSpread * 1.8) * beamLen, lightY + Math.sin(baseAngle + beamSpread * 1.8) * beamLen);
        ctx.closePath();
        const ob = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, beamLen);
        ob.addColorStop(0, `rgba(226,134,75,${beamStrength * 0.12 * pulse})`);
        ob.addColorStop(0.4, `rgba(226,134,75,${beamStrength * 0.03 * pulse})`);
        ob.addColorStop(1, "rgba(226,134,75,0)");
        ctx.fillStyle = ob;
        ctx.fill();

        // Inner
        ctx.beginPath();
        ctx.moveTo(lhX, lightY);
        ctx.lineTo(lhX + Math.cos(baseAngle - beamSpread) * beamLen * 0.8, lightY + Math.sin(baseAngle - beamSpread) * beamLen * 0.8);
        ctx.lineTo(lhX + Math.cos(baseAngle + beamSpread) * beamLen * 0.8, lightY + Math.sin(baseAngle + beamSpread) * beamLen * 0.8);
        ctx.closePath();
        const ib = ctx.createRadialGradient(lhX, lightY, 0, lhX, lightY, beamLen * 0.8);
        ib.addColorStop(0, `rgba(255,220,170,${beamStrength * 0.15 * pulse})`);
        ib.addColorStop(0.3, `rgba(226,134,75,${beamStrength * 0.05 * pulse})`);
        ib.addColorStop(1, "rgba(226,134,75,0)");
        ctx.fillStyle = ib;
        ctx.fill();

        ctx.restore();
      }

      // ── Water reflection ──
      for (let i = 0; i < 8; i++) {
        const ry = horizonY + i * 12 + 8;
        const rFade = 1 - i / 8;
        const shimmer = Math.sin(time * 0.8 + i * 0.7) * 0.3 + 0.7;
        const rw = 35 * shimmer * rFade;
        const rg = ctx.createRadialGradient(lhX, ry, 0, lhX, ry, rw);
        rg.addColorStop(0, `rgba(226,134,75,${0.06 * pulse * rFade * shimmer})`);
        rg.addColorStop(1, "rgba(226,134,75,0)");
        ctx.fillStyle = rg;
        ctx.beginPath();
        ctx.arc(lhX, ry, rw, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Town lights reflected in harbour channel ──
      const litHouses = [
        [w * 0.17, horizonY - 10],
        [w * 0.24, horizonY - 26],
        [w * 0.30, horizonY - 27],
        [w * 0.34, horizonY - 20],
        [w * 0.40, horizonY - 6],
        [w * 0.60, horizonY - 5],
        [w * 0.67, horizonY - 22],
      ];
      for (const [hx] of litHouses) {
        // Only reflect houses near the channel
        if (hx > channelL - 40 && hx < channelR + 40) {
          const ry = waterLevel + 5;
          const rg = ctx.createLinearGradient(0, ry, 0, ry + 30);
          rg.addColorStop(0, "rgba(226,180,100,0.025)");
          rg.addColorStop(1, "rgba(226,180,100,0)");
          ctx.fillStyle = rg;
          ctx.fillRect(hx - 3, ry, 6, 30);
        }
      }

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
