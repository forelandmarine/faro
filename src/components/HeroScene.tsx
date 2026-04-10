"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

function Particles({ count = 400 }: { count?: number }) {
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

/*
 * Morphing blob using vertex displacement driven by simplex-style noise.
 * We compute noise on the CPU per frame for a smooth organic distortion.
 */

// Simple 3D noise (good enough for vertex displacement)
function noise3D(x: number, y: number, z: number): number {
  const p = x * 1.1 + y * 2.3 + z * 3.7;
  return (
    Math.sin(x * 1.5 + y * 0.8) * 0.3 +
    Math.sin(y * 2.1 + z * 1.3) * 0.3 +
    Math.sin(z * 1.7 + x * 0.9) * 0.2 +
    Math.sin(p) * 0.2
  );
}

function MorphBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  // Store the original sphere positions
  const basePositions = useRef<Float32Array | null>(null);

  const onCreated = useCallback((geo: THREE.SphereGeometry) => {
    if (geo && !basePositions.current) {
      basePositions.current = new Float32Array(
        geo.attributes.position.array
      );
    }
  }, []);

  useFrame((state) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y, 0.05);

    if (!meshRef.current) return;
    const geo = meshRef.current.geometry as THREE.SphereGeometry;
    const positions = geo.attributes.position;
    const base = basePositions.current;
    if (!base) return;

    const time = state.clock.elapsedTime * 0.4;

    for (let i = 0; i < positions.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      const bz = base[i * 3 + 2];

      // Noise-based displacement
      const n = noise3D(
        bx * 1.5 + time,
        by * 1.5 + time * 0.7,
        bz * 1.5 + time * 0.5
      );

      // Mouse influence: push vertices toward the pointer side
      const mouseInfluence =
        (mouse.current.x * bx + mouse.current.y * by) * 0.08;

      const displacement = 1 + n * 0.25 + mouseInfluence;

      // Normalize base position and scale by displacement
      const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
      positions.setXYZ(
        i,
        (bx / len) * 1.8 * displacement,
        (by / len) * 1.8 * displacement,
        (bz / len) * 1.8 * displacement
      );
    }

    positions.needsUpdate = true;
    geo.computeVertexNormals();

    // Slow rotation
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry
        ref={onCreated}
        args={[1.8, 128, 128]}
      />
      <meshPhysicalMaterial
        color="#C8965A"
        metalness={0.15}
        roughness={0.08}
        transmission={0.92}
        thickness={0.6}
        ior={1.45}
        transparent
        opacity={0.35}
        envMapIntensity={1.5}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

/* Thin wireframe shell that wraps the blob */
function WireShell() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2.2, 2]} />
      <meshBasicMaterial
        color="#C8965A"
        wireframe
        transparent
        opacity={0.04}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.5}
        color="#F5F0EB"
      />
      <pointLight position={[0, 0, 4]} intensity={1.2} color="#C8965A" />
      <pointLight position={[-3, 2, -2]} intensity={0.4} color="#F5F0EB" />

      <MorphBlob />
      <WireShell />
      <Particles />

      <Environment preset="night" />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          intensity={1.0}
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
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
