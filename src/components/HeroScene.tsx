"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/* ── Shared scroll progress: written by GSAP, read by R3F ── */
export const scrollState = { progress: 0 };

/* ── Sunset sky sphere ── */
function Sky() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTop: { value: new THREE.Color("#0F1923") },
          uMid: { value: new THREE.Color("#2A1A2E") },
          uHorizon: { value: new THREE.Color("#D4764E") },
          uGlow: { value: new THREE.Color("#E8A85C") },
        },
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
            gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPos, 1.0);
          }`,
        fragmentShader: `
          uniform vec3 uTop, uMid, uHorizon, uGlow;
          varying vec3 vWorldPos;
          void main() {
            float h = normalize(vWorldPos).y;
            vec3 c = mix(uGlow, uHorizon, smoothstep(-0.02, 0.05, h));
            c = mix(c, uMid, smoothstep(0.05, 0.3, h));
            c = mix(c, uTop, smoothstep(0.3, 0.7, h));
            // Below horizon = dark sea color
            c = mix(vec3(0.047, 0.094, 0.133), c, smoothstep(-0.05, 0.0, h));
            gl_FragColor = vec4(c, 1.0);
          }`,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh>
      <sphereGeometry args={[60, 32, 16]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ── Ocean surface ── */
function Ocean() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const basePositions = useRef<Float32Array | null>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position;

    // Cache base positions on first frame
    if (!basePositions.current) {
      basePositions.current = new Float32Array(pos.array);
    }

    const base = basePositions.current;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3];
      const bz = base[i * 3 + 2];
      // Two overlapping waves
      const wave =
        Math.sin(bx * 0.25 + t * 0.5) * 0.12 +
        Math.sin(bz * 0.3 + t * 0.35) * 0.08;
      pos.array[i * 3 + 1] = base[i * 3 + 1] + wave;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[120, 120, 32, 32]} />
      <meshStandardMaterial color="#0C1822" roughness={0.8} metalness={0.15} />
    </mesh>
  );
}

/* ── The lighthouse tower ── */
function Tower() {
  const beamRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group>
      {/* Rocky base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[2.5, 3.2, 0.7, 8]} />
        <meshStandardMaterial color="#1A2430" roughness={0.95} />
      </mesh>
      <mesh position={[1.2, 0.15, 0.8]} rotation={[0.1, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.5, 1]} />
        <meshStandardMaterial color="#1E2B38" roughness={0.95} />
      </mesh>
      <mesh position={[-0.8, 0.15, -1]} rotation={[0, 0.8, 0.05]}>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#182530" roughness={0.95} />
      </mesh>

      {/* Tower body - white */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.9, 1.3, 6.2, 16]} />
        <meshStandardMaterial color="#E8DDD0" roughness={0.6} />
      </mesh>

      {/* Red stripe 1 */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[1.16, 1.21, 0.8, 16]} />
        <meshStandardMaterial color="#C0503A" roughness={0.5} />
      </mesh>

      {/* Red stripe 2 */}
      <mesh position={[0, 4.6, 0]}>
        <cylinderGeometry args={[0.99, 1.03, 0.8, 16]} />
        <meshStandardMaterial color="#C0503A" roughness={0.5} />
      </mesh>

      {/* Gallery platform */}
      <mesh position={[0, 6.7, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.12, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Gallery railing */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.25, 7.0, Math.sin(a) * 1.25]}>
            <cylinderGeometry args={[0.02, 0.02, 0.5, 4]} />
            <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
          </mesh>
        );
      })}
      <mesh position={[0, 7.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.025, 6, 32]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Lantern room glass */}
      <mesh position={[0, 7.6, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 1.4, 12]} />
        <meshPhysicalMaterial
          color="#F5D39A"
          transmission={0.5}
          roughness={0.15}
          thickness={0.3}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Lantern mullions */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh key={`m-${i}`} position={[Math.cos(a) * 0.78, 7.6, Math.sin(a) * 0.78]}>
            <boxGeometry args={[0.03, 1.4, 0.03]} />
            <meshStandardMaterial color="#2A2A2A" metalness={0.4} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Dome */}
      <mesh position={[0, 8.55, 0]}>
        <sphereGeometry args={[0.85, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Spire */}
      <mesh position={[0, 9.2, 0]}>
        <coneGeometry args={[0.05, 0.6, 6]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Light source */}
      <mesh position={[0, 7.6, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#FFECD2" />
      </mesh>

      {/* Rotating beam */}
      <group ref={beamRef} position={[0, 7.6, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[8, 0, 0]}>
          <coneGeometry args={[3.5, 16, 12, 1, true]} />
          <meshBasicMaterial
            color="#F5D39A"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 2]} position={[-8, 0, 0]}>
          <coneGeometry args={[3.5, 16, 12, 1, true]} />
          <meshBasicMaterial
            color="#F5D39A"
            transparent
            opacity={0.02}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Seabird ── */
function Bird({ offset }: { offset: number }) {
  const ref = useRef<THREE.Group>(null!);
  const leftWing = useRef<THREE.Mesh>(null!);
  const rightWing = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.3 + offset;
    const r = 8 + Math.sin(offset * 3) * 4;
    ref.current.position.set(
      Math.cos(t) * r,
      6 + Math.sin(t * 2 + offset) * 0.8,
      Math.sin(t) * r
    );
    ref.current.rotation.y = -t + Math.PI / 2;

    const flap = Math.sin(state.clock.elapsedTime * 4 + offset * 5) * 0.4;
    if (leftWing.current) leftWing.current.rotation.z = flap;
    if (rightWing.current) rightWing.current.rotation.z = -flap;
  });

  return (
    <group ref={ref}>
      <mesh ref={leftWing} position={[-0.15, 0, 0]}>
        <planeGeometry args={[0.3, 0.04]} />
        <meshBasicMaterial color="#1A1A1A" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightWing} position={[0.15, 0, 0]}>
        <planeGeometry args={[0.3, 0.04]} />
        <meshBasicMaterial color="#1A1A1A" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Ship ── */
function Ship({
  baseAngle,
  radius,
  speed,
  scale,
}: {
  baseAngle: number;
  radius: number;
  speed: number;
  scale: number;
}) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const angle = baseAngle + state.clock.elapsedTime * speed;
    ref.current.position.set(
      Math.cos(angle) * radius,
      -0.05 + Math.sin(state.clock.elapsedTime * 0.5 + baseAngle) * 0.03,
      Math.sin(angle) * radius
    );
    ref.current.rotation.y = -angle + Math.PI / 2;
  });

  return (
    <group ref={ref} scale={scale}>
      <mesh>
        <boxGeometry args={[0.8, 0.1, 0.15]} />
        <meshStandardMaterial color="#0E1820" roughness={0.9} />
      </mesh>
      <mesh position={[0.05, 0.12, 0]}>
        <boxGeometry args={[0.25, 0.15, 0.1]} />
        <meshStandardMaterial color="#0E1820" roughness={0.9} />
      </mesh>
      <mesh position={[-0.15, 0.25, 0]}>
        <boxGeometry args={[0.015, 0.3, 0.015]} />
        <meshStandardMaterial color="#0E1820" roughness={0.9} />
      </mesh>
      <mesh position={[-0.15, 0.42, 0]}>
        <sphereGeometry args={[0.015, 4, 4]} />
        <meshBasicMaterial color="#F5D39A" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ── Stars ── */
function Stars({ count = 120 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * 0.6; // upper sky only
      const r = 55;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi);
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return pos;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#F5EDE4" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* ── Camera: helix orbit driven by scroll ── */
function CameraRig() {
  const { camera } = useThree();
  const cur = useRef({ a: 0, h: 0.8, r: 14, ly: 3 });

  useFrame(() => {
    const p = scrollState.progress;
    const target = {
      a: p * Math.PI * 2.2,
      h: 0.8 + p * 8.5,
      r: 14 - p * 9,
      ly: 3 + p * 4.5,
    };

    const c = cur.current;
    c.a += (target.a - c.a) * 0.06;
    c.h += (target.h - c.h) * 0.06;
    c.r += (target.r - c.r) * 0.06;
    c.ly += (target.ly - c.ly) * 0.06;

    camera.position.set(Math.cos(c.a) * c.r, c.h, Math.sin(c.a) * c.r);
    camera.lookAt(0, c.ly, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} color="#B8C8D8" />
      <directionalLight position={[10, 8, -5]} intensity={1} color="#E8A85C" />
      <directionalLight position={[-5, 3, 8]} intensity={0.25} color="#8BA4B8" />
      <pointLight position={[0, 7.6, 0]} intensity={3} color="#F5D39A" distance={15} />

      <Sky />
      <Ocean />
      <Stars />
      <Tower />

      {[0, 1.5, 3, 4.5, 6.2].map((o, i) => (
        <Bird key={i} offset={o} />
      ))}

      <Ship baseAngle={0} radius={25} speed={0.02} scale={1.2} />
      <Ship baseAngle={2} radius={30} speed={-0.015} scale={0.8} />
      <Ship baseAngle={4} radius={22} speed={0.025} scale={1} />

      <CameraRig />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 100 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Scene />
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
          <Vignette offset={0.3} darkness={0.45} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
