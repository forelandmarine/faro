"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./HorizontalScroll";

/* ─── Custom Shader Material ─── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uVelocity;
  uniform float uTransition;    // 0→1 proximity to nearest panel boundary
  uniform vec2 uResolution;
  uniform vec2 uMouse;

  varying vec2 vUv;

  // Simplex noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
           + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    float vel = abs(uVelocity);
    float trans = uTransition;

    // ── Chromatic aberration at panel boundaries ──
    // Offset scales with transition proximity AND velocity
    float aberration = trans * 0.008 + vel * 0.003;

    // Directional: horizontal split (matches scroll direction)
    vec2 rOffset = vec2(aberration, 0.0);
    vec2 bOffset = vec2(-aberration, 0.0);

    // We don't sample a texture — we output colored bands
    // that blend with the content via mix-blend-mode
    float r = smoothstep(0.5 - aberration * 2.0, 0.5, abs(uv.x - 0.5));
    float b = smoothstep(0.5 - aberration * 2.0, 0.5, abs(uv.x - 0.5));

    // ── Vignette ── darkens edges, intensifies with velocity
    vec2 vigUv = uv * 2.0 - 1.0;
    float vig = 1.0 - dot(vigUv * 0.5, vigUv * 0.5);
    vig = smoothstep(0.0, 1.0, vig);
    float vigStrength = 0.15 + vel * 0.3 + trans * 0.1;

    // ── Scan lines ── subtle horizontal lines
    float scan = sin(uv.y * uResolution.y * 0.5) * 0.5 + 0.5;
    scan = mix(1.0, scan, 0.03);

    // ── Chromatic edge bands ──
    // At transitions, show faint RGB split at screen edges
    float edgeDist = abs(uv.x - 0.5) * 2.0; // 0 center, 1 edge
    float chromaEdge = smoothstep(0.7, 1.0, edgeDist) * trans;

    vec3 color = vec3(0.0);

    // Red tint on right edge, blue on left during transitions
    color.r += chromaEdge * step(0.5, uv.x) * 0.15;
    color.b += chromaEdge * (1.0 - step(0.5, uv.x)) * 0.15;

    // Velocity streaks — faint horizontal noise
    float streak = snoise(vec2(uv.y * 20.0, uTime * 2.0)) * vel * 0.06;
    color += vec3(streak);

    // ── Panel boundary flash ──
    // Brief bright line at the exact transition point
    float flash = exp(-trans * trans * 50.0) * 0.04;
    color += vec3(flash);

    // Apply vignette as darkening
    float alpha = (1.0 - vig) * vigStrength + chromaEdge * 0.3 + abs(streak) + flash;

    // Minimum alpha for scan lines
    alpha = max(alpha, (1.0 - scan) * 0.03);

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ─── Effect Mesh ─── */

function EffectMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uVelocity: { value: 0 },
      uTransition: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // Track mouse
  useMemo(() => {
    if (typeof window === "undefined") return;
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value += delta;
    mat.uniforms.uResolution.value.set(size.width, size.height);
    mat.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);

    // Normalize velocity (typical range ±3000)
    const vel = Math.min(Math.abs(scrollState.velocity) / 3000, 1.0);
    mat.uniforms.uVelocity.value += (vel - mat.uniforms.uVelocity.value) * 0.1;

    // Calculate proximity to nearest panel boundary
    const panelCount = scrollState.panelCount || 8;
    const progress = scrollState.progress;
    const panelSize = 1.0 / (panelCount - 1);
    const panelPos = progress / panelSize;
    const nearestBoundary = Math.abs(panelPos - Math.round(panelPos));
    // 0 = exactly at boundary, 0.5 = middle of panel
    const transition = 1.0 - Math.min(nearestBoundary * 4, 1.0);

    mat.uniforms.uTransition.value +=
      (transition - mat.uniforms.uTransition.value) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Canvas Wrapper ─── */

export default function ScrollEffects() {
  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none hidden md:block"
      style={{ mixBlendMode: "screen" }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <EffectMesh />
      </Canvas>
    </div>
  );
}
