"use client";

import { useRef, useMemo, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Distortion Shader ─── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;       // normalized 0-1
  uniform vec2 uMouseVel;    // mouse velocity
  uniform float uHover;      // 0 = normal, 1 = over interactive element
  uniform vec2 uResolution;

  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

    // Distance from cursor
    vec2 mouse = uMouse;
    vec2 delta = (uv - mouse) * aspect;
    float dist = length(delta);

    // Distortion radius — larger when hovering interactive elements
    float radius = mix(0.12, 0.22, uHover);
    float strength = mix(0.008, 0.02, uHover);

    // Falloff: smooth circular field
    float field = 1.0 - smoothstep(0.0, radius, dist);
    field = field * field; // quadratic falloff for softer edge

    // Ripple based on distance and time
    float ripple = sin(dist * 40.0 - uTime * 4.0) * 0.5 + 0.5;
    ripple *= field;

    // Direction: radial push outward from cursor
    vec2 dir = normalize(delta + 0.001);

    // Mouse velocity adds directional stretch
    float velMag = length(uMouseVel);
    vec2 velDir = normalize(uMouseVel + 0.001);
    float velStretch = min(velMag * 0.15, 0.015);

    // Combined displacement
    vec2 displacement = dir * field * strength;
    displacement += velDir * velStretch * field;
    displacement += dir * ripple * strength * 0.3;

    // Output as color channels (displacement map)
    // R = x displacement, G = y displacement, B = field mask
    float alpha = field * 0.6 + ripple * 0.1;

    // Chromatic split: offset RGB based on displacement
    float chromaR = field * 0.15 * strength * 10.0;
    float chromaB = field * 0.1 * strength * 10.0;

    gl_FragColor = vec4(
      displacement.x * 10.0 + 0.5,  // centered at 0.5
      displacement.y * 10.0 + 0.5,
      field,
      alpha * 0.4
    );
  }
`;

/* ─── Distortion Mesh ─── */

function DistortionMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mousePrevRef = useRef({ x: 0.5, y: 0.5 });
  const mouseVelRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(0);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseVel: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX / window.innerWidth;
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
  }, []);

  const handleEnterInteractive = useCallback(() => {
    hoverRef.current = 1;
  }, []);

  const handleLeaveInteractive = useCallback(() => {
    hoverRef.current = 0;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    const bindHover = () => {
      const els = document.querySelectorAll(
        "[data-cursor-project], .service-item, .belief-card, .process-step"
      );
      els.forEach((el) => {
        el.addEventListener("mouseenter", handleEnterInteractive);
        el.addEventListener("mouseleave", handleLeaveInteractive);
      });
    };

    bindHover();
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, [handleMouseMove, handleEnterInteractive, handleLeaveInteractive]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;

    mat.uniforms.uTime.value += delta;
    mat.uniforms.uResolution.value.set(size.width, size.height);

    // Smooth mouse
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const cur = mat.uniforms.uMouse.value;
    cur.x += (mx - cur.x) * 0.1;
    cur.y += (my - cur.y) * 0.1;

    // Mouse velocity
    mouseVelRef.current.x = mx - mousePrevRef.current.x;
    mouseVelRef.current.y = my - mousePrevRef.current.y;
    mousePrevRef.current.x = mx;
    mousePrevRef.current.y = my;

    const vel = mat.uniforms.uMouseVel.value;
    vel.x += (mouseVelRef.current.x - vel.x) * 0.15;
    vel.y += (mouseVelRef.current.y - vel.y) * 0.15;

    // Smooth hover
    mat.uniforms.uHover.value +=
      (hoverRef.current - mat.uniforms.uHover.value) * 0.08;
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

export default function CursorDistortion() {
  return (
    <div
      className="fixed inset-0 z-[99] pointer-events-none hidden md:block"
      style={{ mixBlendMode: "overlay" }}
    >
      <Canvas
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: "transparent" }}
        dpr={[1, 1]}
      >
        <DistortionMesh />
      </Canvas>
    </div>
  );
}
