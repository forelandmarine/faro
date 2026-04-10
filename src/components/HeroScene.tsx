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

/* ── Sunset sky dome ── */
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
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`,
        fragmentShader: `
          uniform vec3 uTop, uMid, uHorizon, uGlow;
          varying vec2 vUv;
          void main() {
            vec3 c = mix(uGlow, uHorizon, smoothstep(0.0,0.12,vUv.y));
            c = mix(c, uMid, smoothstep(0.12,0.45,vUv.y));
            c = mix(c, uTop, smoothstep(0.45,1.0,vUv.y));
            gl_FragColor = vec4(c,1.0);
          }`,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh scale={[80, 40, 80]}>
      <sphereGeometry args={[1, 32, 16]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

/* ── Ocean plane with subtle vertex waves ── */
function Ocean() {
  const ref = useRef<THREE.Mesh>(null!);
  const baseY = useMemo(() => new Float32Array(0), []);
  const geoRef = useRef<THREE.PlaneGeometry>(null!);

  useFrame((state) => {
    if (!geoRef.current) return;
    const pos = geoRef.current.attributes.position;
    if (baseY.length === 0) {
      // Cache initial Y
      const arr = new Float32Array(pos.count);
      for (let i = 0; i < pos.count; i++) arr[i] = pos.getY(i);
      (baseY as unknown as { length: number }).length = pos.count;
      Object.assign(baseY, arr);
    }
    const t = state.clock.elapsedTime;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      pos.setY(
        i,
        baseY[i] +
          Math.sin(x * 0.3 + t * 0.6) * 0.08 +
          Math.sin(z * 0.4 + t * 0.4) * 0.05
      );
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geoRef} args={[120, 120, 40, 40]} />
      <meshStandardMaterial
        color="#0C1822"
        roughness={0.85}
        metalness={0.1}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

/* ── Lighthouse tower built from primitives ── */
function Lighthouse() {
  const beamRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Rocky base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[2.5, 3.2, 0.6, 8]} />
        <meshStandardMaterial color="#1A2430" roughness={0.95} />
      </mesh>
      <mesh position={[1.2, 0.1, 0.8]} rotation={[0.1, 0.5, 0]}>
        <boxGeometry args={[1.2, 0.5, 1]} />
        <meshStandardMaterial color="#1E2B38" roughness={0.95} />
      </mesh>
      <mesh position={[-0.8, 0.12, -1]} rotation={[0, 0.8, 0.05]}>
        <boxGeometry args={[1.5, 0.4, 0.8]} />
        <meshStandardMaterial color="#182530" roughness={0.95} />
      </mesh>

      {/* Tower - lower section (white) */}
      <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0.9, 1.3, 6.2, 16]} />
        <meshStandardMaterial color="#E8DDD0" roughness={0.6} />
      </mesh>

      {/* Tower - red stripe 1 */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[1.15, 1.2, 0.8, 16]} />
        <meshStandardMaterial color="#C0503A" roughness={0.5} />
      </mesh>

      {/* Tower - red stripe 2 */}
      <mesh position={[0, 4.6, 0]}>
        <cylinderGeometry args={[0.98, 1.02, 0.8, 16]} />
        <meshStandardMaterial color="#C0503A" roughness={0.5} />
      </mesh>

      {/* Gallery platform */}
      <mesh position={[0, 6.7, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.12, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Gallery railing posts */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={`rail-${i}`}
            position={[Math.cos(a) * 1.25, 7.0, Math.sin(a) * 1.25]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.5, 4]} />
            <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Gallery railing top ring */}
      <mesh position={[0, 7.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.25, 0.025, 6, 32]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Lantern room - glass */}
      <mesh position={[0, 7.6, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 1.4, 12]} />
        <meshPhysicalMaterial
          color="#F5D39A"
          transmission={0.6}
          roughness={0.1}
          thickness={0.2}
          transparent
          opacity={0.25}
          metalness={0}
        />
      </mesh>

      {/* Lantern mullion bars */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <mesh
            key={`mull-${i}`}
            position={[Math.cos(a) * 0.78, 7.6, Math.sin(a) * 0.78]}
          >
            <boxGeometry args={[0.025, 1.4, 0.025]} />
            <meshStandardMaterial color="#2A2A2A" metalness={0.4} roughness={0.3} />
          </mesh>
        );
      })}

      {/* Dome cap */}
      <mesh position={[0, 8.55, 0]}>
        <sphereGeometry args={[0.85, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* Spire */}
      <mesh position={[0, 9.2, 0]}>
        <coneGeometry args={[0.05, 0.6, 6]} />
        <meshStandardMaterial color="#2A2A2A" metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Light glow inside lantern */}
      <mesh position={[0, 7.6, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#FFECD2" />
      </mesh>

      {/* Rotating beam */}
      <group ref={beamRef} position={[0, 7.6, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[8, 0, 0]}>
          <coneGeometry args={[3.5, 16, 16, 1, true]} />
          <meshBasicMaterial
            color="#F5D39A"
            transparent
            opacity={0.045}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
        {/* Opposite beam, dimmer */}
        <mesh rotation={[0, 0, -Math.PI / 2]} position={[-8, 0, 0]}>
          <coneGeometry args={[3.5, 16, 16, 1, true]} />
          <meshBasicMaterial
            color="#F5D39A"
            transparent
            opacity={0.025}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ── Simple seabird (triangle pair) ── */
function Bird({ offset }: { offset: number }) {
  const ref = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.3 + offset;
    const radius = 8 + Math.sin(offset * 3) * 4;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = 6 + Math.sin(t * 2 + offset) * 0.8;
    ref.current.rotation.y = -t + Math.PI / 2;
    // Wing flap
    const flap = Math.sin(state.clock.elapsedTime * 4 + offset * 5) * 0.4;
    ref.current.children[0].rotation.z = flap;
    ref.current.children[1].rotation.z = -flap;
  });

  return (
    <group ref={ref}>
      {/* Left wing */}
      <mesh position={[-0.15, 0, 0]} rotation={[0, 0, 0.2]}>
        <planeGeometry args={[0.3, 0.05]} />
        <meshBasicMaterial color="#1A1A1A" side={THREE.DoubleSide} />
      </mesh>
      {/* Right wing */}
      <mesh position={[0.15, 0, 0]} rotation={[0, 0, -0.2]}>
        <planeGeometry args={[0.3, 0.05]} />
        <meshBasicMaterial color="#1A1A1A" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ── Ships on the horizon ── */
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
    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.z = Math.sin(angle) * radius;
    ref.current.position.y =
      -0.05 + Math.sin(state.clock.elapsedTime * 0.5 + baseAngle) * 0.03;
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
function Stars({ count = 150 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.35;
      const r = 50 + Math.random() * 10;
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
      <pointsMaterial size={0.08} color="#F5EDE4" transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

/* ── Camera controller: helix orbit driven by scroll ── */
function CameraRig() {
  const { camera } = useThree();
  const current = useRef({ angle: 0, height: 1, radius: 14, lookY: 4 });

  useFrame(() => {
    const p = scrollState.progress;

    // Helix path: start far away at sea level, spiral in and up
    const targetAngle = p * Math.PI * 2.2; // ~1.2 full orbits
    const targetHeight = 0.8 + p * 8.5; // sea level to lantern height
    const targetRadius = 14 - p * 9; // 14 -> 5
    const targetLookY = 3 + p * 4.5;

    // Smooth lerp
    const c = current.current;
    c.angle = THREE.MathUtils.lerp(c.angle, targetAngle, 0.06);
    c.height = THREE.MathUtils.lerp(c.height, targetHeight, 0.06);
    c.radius = THREE.MathUtils.lerp(c.radius, targetRadius, 0.06);
    c.lookY = THREE.MathUtils.lerp(c.lookY, targetLookY, 0.06);

    camera.position.set(
      Math.cos(c.angle) * c.radius,
      c.height,
      Math.sin(c.angle) * c.radius
    );
    camera.lookAt(0, c.lookY, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.25} color="#B8C8D8" />
      <directionalLight
        position={[10, 8, -5]}
        intensity={0.8}
        color="#E8A85C"
        castShadow={false}
      />
      <directionalLight
        position={[-5, 3, 8]}
        intensity={0.2}
        color="#8BA4B8"
      />
      {/* Warm glow from the lantern */}
      <pointLight position={[0, 7.6, 0]} intensity={2} color="#F5D39A" distance={12} />

      <Sky />
      <Ocean />
      <Stars />
      <Lighthouse />

      {/* Birds */}
      {[0, 1.5, 3, 4.5, 6.2].map((offset, i) => (
        <Bird key={i} offset={offset} />
      ))}

      {/* Ships circling at various distances */}
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
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
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
          <Vignette offset={0.3} darkness={0.45} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
