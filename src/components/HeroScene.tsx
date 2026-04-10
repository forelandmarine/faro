"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* Shared scroll progress: written by GSAP in Hero, read here */
export const scrollState = { progress: 0 };

/* Stars: simple points, no custom shaders */
function Stars({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random()); // upper hemisphere
      const r = 40 + Math.random() * 20;
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.cos(phi);
      p[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return p;
  }, [count]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.12} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* Shooting star */
function ShootingStar({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const data = useRef({
    active: false,
    timer: delay,
    start: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    life: 0,
  });

  useFrame((_, dt) => {
    const d = data.current;
    if (!ref.current) return;

    d.timer -= dt;
    if (!d.active && d.timer <= 0) {
      d.active = true;
      d.life = 0;
      const a = Math.random() * Math.PI * 2;
      d.start.set(Math.cos(a) * 20, 15 + Math.random() * 15, -20 - Math.random() * 20);
      d.dir.set(
        (Math.random() - 0.5) * 2,
        -0.8 - Math.random() * 0.5,
        (Math.random() - 0.5)
      ).normalize().multiplyScalar(30);
    }

    if (d.active) {
      d.life += dt * 1.2;
      if (d.life > 1) {
        d.active = false;
        d.timer = 5 + Math.random() * 10;
        ref.current.visible = false;
        return;
      }
      ref.current.visible = true;
      ref.current.position.copy(d.start).addScaledVector(d.dir, d.life);
      ref.current.lookAt(
        ref.current.position.x + d.dir.x,
        ref.current.position.y + d.dir.y,
        ref.current.position.z + d.dir.z
      );
      const fade = d.life < 0.15 ? d.life / 0.15 : d.life > 0.6 ? (1 - d.life) / 0.4 : 1;
      ref.current.scale.set(0.02, 0.02, fade * 1.5);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.9;
    } else {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} />
    </mesh>
  );
}

/* Dark coastline silhouette - jagged ridge of triangles */
function Coastline() {
  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    // Jagged headland profile from left to right
    const points: [number, number][] = [
      [-50, -2],
      [-35, -1.5],
      [-28, 1.2],
      [-24, 0.4],
      [-20, 2.8],
      [-17, 1.8],
      [-14, 3.5],
      [-11, 2.2],
      [-8, 4],
      [-5, 2.5],
      [-2, 3],
      [0, 1.5],
      [3, 2],
      [6, 0.5],
      [10, 1.2],
      [14, 0],
      [20, 0.8],
      [25, -0.5],
      [30, 0.2],
      [40, -1],
      [50, -2],
      [50, -10],
      [-50, -10],
    ];
    shape.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      shape.lineTo(points[i][0], points[i][1]);
    }
    shape.closePath();
    const g = new THREE.ShapeGeometry(shape);
    return g;
  }, []);

  return (
    <mesh position={[0, -3, -30]} geometry={geo}>
      <meshBasicMaterial color="#050508" />
    </mesh>
  );
}

/* Water surface - dark plane with subtle color */
function Water() {
  return (
    <mesh position={[0, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[200, 100]} />
      <meshBasicMaterial color="#060810" />
    </mesh>
  );
}

/* Lighthouse tower - simple shapes */
function LighthouseTower() {
  const beamRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.rotation.y = state.clock.elapsedTime * 0.6;
    }
    if (glowRef.current) {
      const pulse = 0.7 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[-8, -3, -30]}>
      {/* Tower base */}
      <mesh position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.3, 0.45, 5, 8]} />
        <meshBasicMaterial color="#0C0C10" />
      </mesh>

      {/* Tower top / gallery */}
      <mesh position={[0, 5.2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 8]} />
        <meshBasicMaterial color="#0A0A0E" />
      </mesh>

      {/* Lantern room */}
      <mesh position={[0, 5.7, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.8, 8]} />
        <meshBasicMaterial color="#181820" transparent opacity={0.6} />
      </mesh>

      {/* Dome */}
      <mesh position={[0, 6.25, 0]}>
        <sphereGeometry args={[0.3, 8, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#0A0A0E" />
      </mesh>

      {/* Light glow */}
      <mesh ref={glowRef} position={[0, 5.7, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#E2864B" />
      </mesh>

      {/* Rotating beam */}
      <group ref={beamRef} position={[0, 5.7, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} position={[6, 0, 0]}>
          <coneGeometry args={[2, 12, 8, 1, true]} />
          <meshBasicMaterial
            color="#E2864B"
            transparent
            opacity={0.03}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Water reflection - faint vertical streak */}
      <mesh position={[0, -1, 0.5]}>
        <planeGeometry args={[0.15, 3]} />
        <meshBasicMaterial color="#E2864B" transparent opacity={0.04} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* Camera: scroll drives forward toward the coast */
function CameraRig() {
  const { camera } = useThree();
  const pos = useRef({ z: 30, y: 2 });

  useFrame(() => {
    const p = scrollState.progress;
    // Move from far out at sea toward the harbour
    const targetZ = 30 - p * 35;
    const targetY = 2 - p * 1;

    pos.current.z += (targetZ - pos.current.z) * 0.06;
    pos.current.y += (targetY - pos.current.y) * 0.06;

    camera.position.set(0, pos.current.y, pos.current.z);
    camera.lookAt(0, 1, -30);
  });

  return null;
}

function Scene() {
  return (
    <>
      <Stars />
      <ShootingStar delay={2} />
      <ShootingStar delay={7} />
      <ShootingStar delay={12} />
      <Water />
      <Coastline />
      <LighthouseTower />
      <CameraRig />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
        style={{ background: "#000000" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
