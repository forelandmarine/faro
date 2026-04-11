"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "./HorizontalScroll";

/* ─── Volumetric Light Beam Shader ─── */

const beamVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const beamFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    // Cone shape: fade from center line to edges
    float centerDist = abs(vUv.x - 0.5) * 2.0;
    float cone = 1.0 - smoothstep(0.0, 1.0, centerDist);

    // Fade along length (strong at source, fading at tip)
    float lengthFade = 1.0 - vUv.y * 0.8;

    // Flicker
    float flicker = 0.85 + 0.15 * sin(uTime * 3.0 + sin(uTime * 7.0) * 0.5);

    float alpha = cone * lengthFade * flicker * uIntensity * 0.35;

    // Warm white-blue light color
    vec3 color = mix(vec3(0.5, 0.8, 0.9), vec3(1.0, 1.0, 1.0), cone);

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ─── Lighthouse Scene ─── */

function LighthouseModel() {
  const groupRef = useRef<THREE.Group>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const prevProgress = useRef(0);

  const beamUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: 0.6 },
    }),
    []
  );

  // Procedural lighthouse geometry
  const towerGeo = useMemo(() => {
    // Tapered cylinder
    return new THREE.CylinderGeometry(0.08, 0.14, 1.2, 16, 1, true);
  }, []);

  const lampGeo = useMemo(() => {
    return new THREE.CylinderGeometry(0.1, 0.1, 0.15, 16);
  }, []);

  const capGeo = useMemo(() => {
    return new THREE.ConeGeometry(0.12, 0.12, 16);
  }, []);

  const baseGeo = useMemo(() => {
    return new THREE.CylinderGeometry(0.18, 0.22, 0.1, 16);
  }, []);

  // Beam geometry: wide triangle
  const beamGeo = useMemo(() => {
    const geo = new THREE.PlaneGeometry(2.5, 5, 1, 1);
    // Taper: narrow at bottom (source), wide at top (tip)
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      // y goes from -2.5 to 2.5; we want narrow at -2.5
      const t = (y + 2.5) / 5.0;
      pos.setX(i, x * (0.1 + t * 0.9));
    }
    pos.needsUpdate = true;
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current || !beamRef.current) return;

    const progress = scrollState.progress;
    const velocity = Math.abs(scrollState.velocity);

    beamUniforms.uTime.value += delta;

    // ── Position & scale based on scroll progress ──
    // Hero (0-0.1): centered, medium, beam visible
    // Services-Process (0.1-0.5): drifts right, shrinks
    // About (0.5-0.7): grows slightly, beam intensifies
    // Contact (0.8-1.0): large, beam sweeps dramatically

    const t = progress;

    // X position: starts center, drifts right, ends slightly right-center
    const x = THREE.MathUtils.lerp(-0.5, 2.5, t);
    // Y position: slight bob
    const y = Math.sin(t * Math.PI * 2) * 0.1 - 0.3;
    // Scale: varies across journey
    const baseScale = 0.6;
    const scalePhase = Math.sin(t * Math.PI) * 0.3; // bigger in middle
    const contactBoost = smoothstep(0.75, 1.0, t) * 0.5; // big at contact
    const scale = baseScale + scalePhase + contactBoost;

    groupRef.current.position.x = x;
    groupRef.current.position.y = y;
    groupRef.current.scale.setScalar(scale);

    // ── Beam rotation: sweeps based on scroll ──
    const beamAngle = Math.sin(t * Math.PI * 3 + beamUniforms.uTime.value * 0.3) * 0.4;
    beamRef.current.rotation.z = beamAngle;

    // Beam intensity: low in middle panels, high at hero + contact
    const heroIntensity = 1.0 - smoothstep(0.0, 0.15, t);
    const contactIntensity = smoothstep(0.7, 0.9, t);
    const targetIntensity = Math.max(heroIntensity, contactIntensity, 0.2);
    beamUniforms.uIntensity.value +=
      (targetIntensity - beamUniforms.uIntensity.value) * 0.05;

    // ── Rotation: lighthouse gently rotates based on velocity ──
    const velocityRotation = (velocity / 3000) * 0.05;
    groupRef.current.rotation.y += velocityRotation * delta * 10;
    // Dampen
    groupRef.current.rotation.y *= 0.98;

    // Glow
    if (glowRef.current) {
      glowRef.current.intensity = beamUniforms.uIntensity.value * 2;
    }

    prevProgress.current = progress;
  });

  const accentColor = new THREE.Color("#7EC8E3");
  const darkColor = new THREE.Color("#1a1a2e");

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Tower body */}
      <mesh geometry={towerGeo} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={darkColor}
          emissive={accentColor}
          emissiveIntensity={0.05}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Stripe rings */}
      {[0.15, -0.1, -0.35].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.1 + (0.6 - y) * 0.02, 0.008, 8, 32]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={0.2}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}

      {/* Lamp housing */}
      <mesh geometry={lampGeo} position={[0, 0.67, 0]}>
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Cap */}
      <mesh geometry={capGeo} position={[0, 0.82, 0]}>
        <meshStandardMaterial
          color={darkColor}
          emissive={accentColor}
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Base */}
      <mesh geometry={baseGeo} position={[0, -0.65, 0]}>
        <meshStandardMaterial
          color={darkColor}
          emissive={accentColor}
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Point light at lamp */}
      <pointLight
        ref={glowRef}
        position={[0, 0.67, 0.15]}
        color={accentColor}
        intensity={1.5}
        distance={4}
        decay={2}
      />

      {/* Volumetric beam */}
      <mesh
        ref={beamRef}
        geometry={beamGeo}
        position={[0, 3.1, 0]}
        rotation={[0, 0, 0]}
      >
        <shaderMaterial
          vertexShader={beamVertexShader}
          fragmentShader={beamFragmentShader}
          uniforms={beamUniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* ─── Canvas Wrapper ─── */

export default function Lighthouse3D() {
  return (
    <div className="fixed inset-0 z-[45] pointer-events-none hidden md:block">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 4], fov: 35 }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.1} />
        <LighthouseModel />
      </Canvas>
    </div>
  );
}
