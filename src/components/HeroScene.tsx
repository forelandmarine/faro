"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Sunset sky gradient as a large background plane ── */
function Sky() {
  const mat = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTop: { value: new THREE.Color("#0F1923") },
        uMid: { value: new THREE.Color("#2A1A2E") },
        uHorizon: { value: new THREE.Color("#D4764E") },
        uGlow: { value: new THREE.Color("#E8A85C") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uTop;
        uniform vec3 uMid;
        uniform vec3 uHorizon;
        uniform vec3 uGlow;
        varying vec2 vUv;
        void main() {
          vec3 col = mix(uGlow, uHorizon, smoothstep(0.0, 0.15, vUv.y));
          col = mix(col, uMid, smoothstep(0.15, 0.5, vUv.y));
          col = mix(col, uTop, smoothstep(0.5, 1.0, vUv.y));
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      depthWrite: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <mesh position={[0, 0, -12]} scale={[30, 15, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ── Sea surface ── */
function Sea() {
  const ref = useRef<THREE.Mesh>(null!);

  return (
    <mesh ref={ref} position={[0, -2.2, -4]} rotation={[-0.3, 0, 0]}>
      <planeGeometry args={[40, 12, 1, 1]} />
      <meshBasicMaterial
        color="#0C1520"
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ── Horizon glow - warm band of light at the water line ── */
function HorizonGlow() {
  return (
    <mesh position={[0, -1.6, -8]}>
      <planeGeometry args={[40, 1.2, 1, 1]} />
      <meshBasicMaterial
        color="#E8A85C"
        transparent
        opacity={0.08}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ── Rotating light beam ── */
function LightBeam() {
  const groupRef = useRef<THREE.Group>(null!);
  const coneRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (coneRef.current) {
      const mat = coneRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.06 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Main beam cone */}
      <mesh ref={coneRef} rotation={[0, 0, Math.PI / 2]} position={[5, 0, 0]}>
        <coneGeometry args={[3, 10, 32, 1, true]} />
        <meshBasicMaterial
          color="#F5D39A"
          transparent
          opacity={0.07}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Narrower bright core */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[4, 0, 0]}>
        <coneGeometry args={[1, 8, 16, 1, true]} />
        <meshBasicMaterial
          color="#FFECD2"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ── Light source glow at the centre ── */
function LanternGlow() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.08;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0.5, 0]}>
      <sphereGeometry args={[0.15, 12, 12]} />
      <meshBasicMaterial
        color="#FFECD2"
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/* ── Glass mullions - vertical panes of the lantern room ── */
function GlassPanes() {
  const groupRef = useRef<THREE.Group>(null!);
  const count = 16;
  const radius = 2.5;

  const bars = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        ry: -angle,
      });
    }
    return items;
  }, []);

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Vertical mullion bars */}
      {bars.map((bar, i) => (
        <mesh key={i} position={[bar.x, 0, bar.z]} rotation={[0, bar.ry, 0]}>
          <boxGeometry args={[0.015, 3, 0.015]} />
          <meshBasicMaterial color="#F5EDE4" transparent opacity={0.08} />
        </mesh>
      ))}
      {/* Top ring */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 6, 48]} />
        <meshBasicMaterial color="#F5EDE4" transparent opacity={0.1} />
      </mesh>
      {/* Bottom ring */}
      <mesh position={[0, -1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.01, 6, 48]} />
        <meshBasicMaterial color="#F5EDE4" transparent opacity={0.1} />
      </mesh>
      {/* Mid ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 6, 48]} />
        <meshBasicMaterial color="#F5EDE4" transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

/* ── Ship silhouette ── */
function Ship({
  baseX,
  y,
  z,
  scale,
  speed,
  direction,
}: {
  baseX: number;
  y: number;
  z: number;
  scale: number;
  speed: number;
  direction: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      // Ships drift slowly across the horizon
      const t = state.clock.elapsedTime * speed * direction;
      groupRef.current.position.x = baseX + t;
      // Wrap around
      if (groupRef.current.position.x > 18) groupRef.current.position.x = -18;
      if (groupRef.current.position.x < -18) groupRef.current.position.x = 18;
      // Gentle bob
      groupRef.current.position.y =
        y + Math.sin(state.clock.elapsedTime * 0.5 + baseX) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[baseX, y, z]}
      scale={[scale * direction, scale, scale]}
    >
      {/* Hull */}
      <mesh>
        <boxGeometry args={[0.6, 0.08, 0.1]} />
        <meshBasicMaterial color="#0A1018" transparent opacity={0.9} />
      </mesh>
      {/* Superstructure */}
      <mesh position={[0.05, 0.1, 0]}>
        <boxGeometry args={[0.2, 0.12, 0.08]} />
        <meshBasicMaterial color="#0A1018" transparent opacity={0.9} />
      </mesh>
      {/* Mast */}
      <mesh position={[-0.1, 0.2, 0]}>
        <boxGeometry args={[0.01, 0.25, 0.01]} />
        <meshBasicMaterial color="#0A1018" transparent opacity={0.8} />
      </mesh>
      {/* Navigation light */}
      <mesh position={[-0.1, 0.33, 0]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshBasicMaterial color="#F5D39A" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* ── Stars - sparse, visible above the horizon ── */
function Stars({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      // Only upper hemisphere
      const phi = Math.random() * Math.PI * 0.4;
      const r = 14 + Math.random() * 4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#F5EDE4"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    camera.position.set(0, 0.5, 0);
    camera.lookAt(0, 0, -5);
  }, [camera]);

  useFrame((state) => {
    // Subtle camera sway following the mouse
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      state.pointer.x,
      0.08
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      state.pointer.y,
      0.08
    );
    camera.rotation.y = mouse.current.x * 0.08;
    camera.rotation.x = mouse.current.y * 0.04;
  });

  return (
    <>
      <Sky />
      <Sea />
      <HorizonGlow />
      <Stars />

      <LanternGlow />
      <LightBeam />
      <GlassPanes />

      {/* Ships at varying distances */}
      <Ship baseX={-5} y={-1.7} z={-7} scale={0.8} speed={0.15} direction={1} />
      <Ship baseX={8} y={-1.75} z={-9} scale={0.5} speed={0.08} direction={-1} />
      <Ship baseX={2} y={-1.72} z={-8} scale={0.65} speed={0.12} direction={1} />
      <Ship baseX={-12} y={-1.78} z={-10} scale={0.4} speed={0.06} direction={-1} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 50 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Scene />
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
            intensity={0.5}
            mipmapBlur
          />
          <Vignette offset={0.35} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
