"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/* Background dust particles */
function Particles({ count = 300 }: { count?: number }) {
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
      mesh.current.rotation.y += delta * 0.015;
      mesh.current.rotation.x += delta * 0.008;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#4A9EF5"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* Generate points on a sphere using fibonacci distribution */
function fibSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  for (let i = 0; i < count; i++) {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    points.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      )
    );
  }
  return points;
}

/* Generate arcs between nearby points */
function generateArcs(
  points: THREE.Vector3[],
  maxDist: number,
  maxArcs: number
): [number, number][] {
  const arcs: [number, number][] = [];
  for (let i = 0; i < points.length && arcs.length < maxArcs; i++) {
    for (let j = i + 1; j < points.length && arcs.length < maxArcs; j++) {
      if (points[i].distanceTo(points[j]) < maxDist) {
        arcs.push([i, j]);
      }
    }
  }
  return arcs;
}

/* A single arc line between two points on the globe */
function ArcLine({
  start,
  end,
  delay,
}: {
  start: THREE.Vector3;
  end: THREE.Vector3;
  delay: number;
}) {
  const lineObj = useMemo(() => {
    const mid = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    const lift = start.distanceTo(end) * 0.4;
    mid.normalize().multiplyScalar(mid.length() + lift);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const pts = curve.getPoints(24);
    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({
      color: "#4A9EF5",
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    return new THREE.Line(geo, mat);
  }, [start, end]);

  useFrame((state) => {
    if (lineObj) {
      (lineObj.material as THREE.LineBasicMaterial).opacity =
        0.08 + Math.sin(state.clock.elapsedTime * 0.6 + delay) * 0.06;
    }
  });

  return <primitive object={lineObj} />;
}

/* Glowing node on the globe surface */
function Node({ position, delay }: { position: THREE.Vector3; delay: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const scale =
        1 + Math.sin(state.clock.elapsedTime * 1.2 + delay) * 0.4;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.9} />
    </mesh>
  );
}

/* The main wireframe globe */
function Globe() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  const nodeCount = 60;
  const radius = 2;

  const points = useMemo(() => fibSphere(nodeCount, radius), []);
  const arcs = useMemo(() => generateArcs(points, 1.4, 50), [points]);

  useFrame((state) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x, 0.03);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y, 0.03);

    if (groupRef.current) {
      // Slow base rotation
      groupRef.current.rotation.y =
        state.clock.elapsedTime * 0.08 + mouse.current.x * 0.3;
      groupRef.current.rotation.x =
        0.2 + mouse.current.y * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere shell */}
      <mesh>
        <sphereGeometry args={[radius, 36, 24]} />
        <meshBasicMaterial
          color="#4A9EF5"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Second shell, slightly larger, counter-rotated feel */}
      <mesh rotation={[0.4, 0.8, 0]}>
        <sphereGeometry args={[radius * 1.01, 24, 16]} />
        <meshBasicMaterial
          color="#FFFFFF"
          wireframe
          transparent
          opacity={0.02}
        />
      </mesh>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.02, 0.005, 8, 128]} />
        <meshBasicMaterial color="#4A9EF5" transparent opacity={0.2} />
      </mesh>

      {/* Tilted ring */}
      <mesh rotation={[Math.PI / 2.8, 0.5, 0]}>
        <torusGeometry args={[radius * 1.04, 0.004, 8, 128]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.08} />
      </mesh>

      {/* Connection nodes */}
      {points.map((pt, i) => (
        <Node key={`node-${i}`} position={pt} delay={i * 0.5} />
      ))}

      {/* Arc connections */}
      {arcs.map(([a, b], i) => (
        <ArcLine
          key={`arc-${i}`}
          start={points[a]}
          end={points[b]}
          delay={i * 0.3}
        />
      ))}

      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#4A9EF5"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[3, 3, 5]} intensity={0.4} color="#FFFFFF" />
      <pointLight position={[-3, -2, 3]} intensity={0.2} color="#4A9EF5" />

      <Globe />
      <Particles />

      <Environment preset="night" />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={0.8}
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
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
