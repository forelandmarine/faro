"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

function Particles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.02;
      mesh.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#C8965A"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* A single light beam as a tapered cone */
function LightBeam({
  rotation,
  delay,
}: {
  rotation: [number, number, number];
  delay: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse =
        0.3 + Math.sin(state.clock.elapsedTime * 0.8 + delay) * 0.15;
      (meshRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  return (
    <mesh ref={meshRef} rotation={rotation} position={[0, 0.6, 0]}>
      <coneGeometry args={[2.8, 6, 32, 1, true]} />
      <meshBasicMaterial
        color="#C8965A"
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* The rotating glass prism inside the lantern */
function Prism() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.6, 0]}>
      {/* Central glass prism */}
      <mesh>
        <cylinderGeometry args={[0.25, 0.25, 0.6, 6]} />
        <meshPhysicalMaterial
          color="#C8965A"
          metalness={0.0}
          roughness={0.0}
          transmission={0.95}
          thickness={0.8}
          ior={2.0}
          transparent
          opacity={0.5}
          envMapIntensity={2}
        />
      </mesh>
      {/* Glowing core */}
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#FFD699" transparent opacity={0.9} />
      </mesh>
      {/* Outer rotating lens ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.03, 8, 32]} />
        <meshPhysicalMaterial
          color="#C8965A"
          metalness={0.3}
          roughness={0.1}
          transmission={0.8}
          thickness={0.3}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
}

/* Wireframe cage / gallery structure */
function Cage() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Vertical cage bars */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 0.7;
        const z = Math.sin(angle) * 0.7;
        return (
          <mesh key={`bar-${i}`} position={[x, 0.6, z]}>
            <cylinderGeometry args={[0.012, 0.012, 1.4, 4]} />
            <meshBasicMaterial
              color="#C8965A"
              transparent
              opacity={0.2}
            />
          </mesh>
        );
      })}

      {/* Top ring */}
      <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 48]} />
        <meshBasicMaterial color="#C8965A" transparent opacity={0.3} />
      </mesh>

      {/* Bottom ring */}
      <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.015, 8, 48]} />
        <meshBasicMaterial color="#C8965A" transparent opacity={0.3} />
      </mesh>

      {/* Mid ring */}
      <mesh position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.72, 0.01, 8, 48]} />
        <meshBasicMaterial color="#C8965A" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* Dome cap on top */
function Dome() {
  return (
    <group position={[0, 1.35, 0]}>
      {/* Dome shape */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial
          color="#C8965A"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Spire */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.0, 0.03, 0.4, 4]} />
        <meshBasicMaterial color="#C8965A" transparent opacity={0.4} />
      </mesh>
      {/* Spire tip glow */}
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#FFD699" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* Base / platform */
function Base() {
  return (
    <group position={[0, -0.25, 0]}>
      {/* Tapered tower body hint */}
      <mesh>
        <cylinderGeometry args={[0.7, 0.9, 0.5, 8]} />
        <meshBasicMaterial
          color="#C8965A"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
      {/* Base ring */}
      <mesh position={[0, -0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.02, 8, 48]} />
        <meshBasicMaterial color="#C8965A" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function LighthouseLantern() {
  const mouse = useRef({ x: 0, y: 0 });
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    // Gentle tilt toward pointer
    if (groupRef.current) {
      const targetX = mouse.current.y * 0.15;
      const targetZ = -mouse.current.x * 0.15;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.02
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetZ,
        0.02
      );
    }

    // Track pointer
    const { pointer } = state;
    mouse.current.x = pointer.x;
    mouse.current.y = pointer.y;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={groupRef} scale={1.8}>
        <Dome />
        <Cage />
        <Prism />
        <Base />

        {/* Light beams radiating upward and outward */}
        <LightBeam rotation={[0, 0, 0]} delay={0} />
        <LightBeam
          rotation={[0, (Math.PI * 2) / 3, 0]}
          delay={2}
        />
        <LightBeam
          rotation={[0, (Math.PI * 4) / 3, 0]}
          delay={4}
        />
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        color="#F5F0EB"
      />
      <pointLight position={[0, 1, 3]} intensity={1.2} color="#C8965A" />
      <pointLight
        position={[0, 2, 0]}
        intensity={0.5}
        color="#FFD699"
        distance={5}
      />

      <LighthouseLantern />
      <Particles />

      <Environment preset="night" />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={1.2}
        />
        <Vignette offset={0.3} darkness={0.7} />
      </EffectComposer>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
