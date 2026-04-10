"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

/*
 * Star field: mixed sizes and brightness to mimic a real night sky.
 * Some stars are brighter/larger (navigation stars), most are faint.
 */
function StarField({ count = 800 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);

  const { positions, sizes, brightness } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const br = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Distribute on a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 12 + Math.random() * 8;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // ~5% are bright navigation stars, rest are dim
      const isBright = Math.random() < 0.05;
      sz[i] = isBright ? 0.06 + Math.random() * 0.04 : 0.01 + Math.random() * 0.02;
      br[i] = isBright ? 0.8 + Math.random() * 0.2 : 0.15 + Math.random() * 0.35;
    }
    return { positions: pos, sizes: sz, brightness: br };
  }, [count]);

  // Gentle twinkle by nudging opacity uniform
  useFrame((state) => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const szAttr = geo.getAttribute("size") as THREE.BufferAttribute;
    const baseSizes = sizes;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      // Only twinkle a subset each frame for performance
      if (i % 8 === Math.floor(t * 2) % 8) {
        const twinkle = 1 + Math.sin(t * 3 + i * 1.7) * 0.3;
        szAttr.setX(i, baseSizes[i] * twinkle);
      }
    }
    szAttr.needsUpdate = true;
    // Very slow sky rotation
    mesh.current.rotation.y += 0.0002;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#FFFFFF"
        transparent
        opacity={0.7}
        sizeAttenuation
        vertexColors={false}
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

/*
 * All arc lines baked into a single geometry for performance.
 * No per-arc components, no individual useFrame hooks.
 */
function ArcLines({
  points,
  arcs,
}: {
  points: THREE.Vector3[];
  arcs: [number, number][];
}) {
  const lineObj = useMemo(() => {
    const allPoints: THREE.Vector3[] = [];
    for (const [a, b] of arcs) {
      const start = points[a];
      const end = points[b];
      const mid = new THREE.Vector3()
        .addVectors(start, end)
        .multiplyScalar(0.5);
      const lift = start.distanceTo(end) * 0.35;
      mid.normalize().multiplyScalar(mid.length() + lift);
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      // Fewer points per arc for performance
      const pts = curve.getPoints(12);
      allPoints.push(...pts);
      // Add a NaN break so lines don't connect between arcs
    }
    const geo = new THREE.BufferGeometry().setFromPoints(allPoints);
    const mat = new THREE.LineBasicMaterial({
      color: "#4A9EF5",
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });
    return new THREE.LineSegments(geo, mat);
  }, [points, arcs]);

  return <primitive object={lineObj} />;
}

/*
 * All globe nodes as a single Points object instead of
 * 60 individual mesh components. Massive performance gain.
 */
function GlobeNodes({ points }: { points: THREE.Vector3[] }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const pos = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
    });
    return pos;
  }, [points]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFFFFF"
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

/* The main wireframe globe */
function Globe() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  const nodeCount = 50;
  const radius = 2;

  const points = useMemo(() => fibSphere(nodeCount, radius), []);
  const arcs = useMemo(() => generateArcs(points, 1.5, 40), [points]);

  useFrame((state) => {
    // Faster lerp for snappier mouse response
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, pointer.x, 0.12);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, pointer.y, 0.12);

    if (groupRef.current) {
      groupRef.current.rotation.y =
        state.clock.elapsedTime * 0.06 + mouse.current.x * 0.5;
      groupRef.current.rotation.x = 0.15 + mouse.current.y * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere shell - reduced segments */}
      <mesh>
        <sphereGeometry args={[radius, 24, 16]} />
        <meshBasicMaterial
          color="#4A9EF5"
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>

      {/* Equator ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 1.02, 0.004, 6, 64]} />
        <meshBasicMaterial color="#4A9EF5" transparent opacity={0.18} />
      </mesh>

      {/* Tilted orbital ring - like a celestial navigation arc */}
      <mesh rotation={[Math.PI / 2.8, 0.5, 0]}>
        <torusGeometry args={[radius * 1.04, 0.003, 6, 64]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.07} />
      </mesh>

      {/* Second tilted ring */}
      <mesh rotation={[Math.PI / 3.5, -0.8, 0.3]}>
        <torusGeometry args={[radius * 1.06, 0.003, 6, 64]} />
        <meshBasicMaterial color="#4A9EF5" transparent opacity={0.05} />
      </mesh>

      {/* Batched nodes */}
      <GlobeNodes points={points} />

      {/* Batched arc lines */}
      <ArcLines points={points} arcs={arcs} />
    </group>
  );
}

function Scene() {
  return (
    <>
      <StarField />
      <Globe />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Scene />
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
          <Vignette offset={0.3} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
