/**
 * Generates a clean black & white trade show badge card.
 * Accounts for the card.glb UV mapping: texture needs to be
 * horizontally mirrored and vertically flipped.
 */

let cachedCanvas: HTMLCanvasElement | null = null;

export function generateCardCanvas(): HTMLCanvasElement {
  if (cachedCanvas) return cachedCanvas;

  const W = 1024;
  const H = 1440;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // The GLB UVs are mirrored — we flip the entire context
  // so we can draw normally and it appears correct on the model
  ctx.translate(W, H);
  ctx.scale(-1, -1);

  // White card background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, W, H);

  // Top black bar
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, W, 16);

  // Draw lighthouse logo
  drawLighthouse(ctx, W / 2, 180, 2.0);

  // FARO wordmark
  ctx.fillStyle = "#111111";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "800 80px system-ui, -apple-system, sans-serif";
  ctx.fillText("FARO", W / 2, 360);

  // Subtitle
  ctx.fillStyle = "#999999";
  ctx.font = "500 22px system-ui, -apple-system, sans-serif";
  ctx.fillText("CREATIVE STUDIO", W / 2, 410);

  // Divider
  ctx.strokeStyle = "#E0E0E0";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(120, 470);
  ctx.lineTo(W - 120, 470);
  ctx.stroke();

  // Name
  ctx.fillStyle = "#111111";
  ctx.font = "800 110px system-ui, -apple-system, sans-serif";
  ctx.fillText("Jack", W / 2, 590);

  // Title
  ctx.fillStyle = "#555555";
  ctx.font = "500 34px system-ui, -apple-system, sans-serif";
  ctx.fillText("Lead Designer", W / 2, 660);

  // Tagline
  ctx.fillStyle = "#888888";
  ctx.font = "400 28px system-ui, -apple-system, sans-serif";
  ctx.fillText("Websites and stuff.", W / 2, 720);

  // Divider
  ctx.strokeStyle = "#E8E8E8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(120, 780);
  ctx.lineTo(W - 120, 780);
  ctx.stroke();

  // Small lighthouse icons as decoration
  drawLighthouse(ctx, 200, 880, 0.6);
  drawLighthouse(ctx, W / 2, 880, 0.6);
  drawLighthouse(ctx, W - 200, 880, 0.6);

  // Bottom badge section
  ctx.fillStyle = "#F5F5F5";
  ctx.fillRect(0, 1240, W, 200);

  ctx.fillStyle = "#111111";
  ctx.font = "700 24px system-ui, -apple-system, sans-serif";
  ctx.fillText("EXHIBITOR", W / 2, 1310);

  ctx.fillStyle = "#AAAAAA";
  ctx.font = "400 20px system-ui, -apple-system, sans-serif";
  ctx.fillText("faro.is", W / 2, 1360);

  // Bottom black bar
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, H - 16, W, 16);

  cachedCanvas = canvas;
  return canvas;
}

function drawLighthouse(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  scale: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  // Tower body
  ctx.fillStyle = "#222222";
  ctx.beginPath();
  ctx.moveTo(-9, 20);
  ctx.lineTo(-12, 55);
  ctx.lineTo(12, 55);
  ctx.lineTo(9, 20);
  ctx.closePath();
  ctx.fill();

  // Lamp housing
  ctx.fillStyle = "#222222";
  ctx.fillRect(-11, 12, 22, 10);

  // Light
  ctx.fillStyle = "#CCCCCC";
  ctx.beginPath();
  ctx.arc(0, 17, 4, 0, Math.PI * 2);
  ctx.fill();

  // Cap
  ctx.beginPath();
  ctx.moveTo(-11, 12);
  ctx.lineTo(0, 0);
  ctx.lineTo(11, 12);
  ctx.closePath();
  ctx.fillStyle = "#333333";
  ctx.fill();

  // Spire
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -10);
  ctx.stroke();

  // Rail
  ctx.strokeStyle = "#222222";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-15, 12);
  ctx.lineTo(15, 12);
  ctx.stroke();

  // Stripes
  ctx.strokeStyle = "#DDDDDD";
  ctx.lineWidth = 1.5;
  [32, 40, 48].forEach((y) => {
    ctx.beginPath();
    const hw = 9 + (y - 20) * 0.08;
    ctx.moveTo(-hw, y);
    ctx.lineTo(hw, y);
    ctx.stroke();
  });

  // Base
  ctx.fillStyle = "#222222";
  ctx.fillRect(-16, 53, 32, 6);

  ctx.restore();
}
