"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";

export const scrollState = { progress: 0 };

/* ── Custom star shader: each star gets a soft glow halo + color tint ── */
const starVertexShader = `
  attribute float size;
  attribute vec3 starColor;
  attribute float brightness;
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    vColor = starColor;
    vBrightness = brightness;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (200.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const starFragmentShader = `
  varying vec3 vColor;
  varying float vBrightness;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    // Soft circular falloff with bright core
    float core = smoothstep(0.5, 0.0, d);
    float glow = smoothstep(0.5, 0.15, d);
    float alpha = core * 0.9 + glow * 0.3;
    alpha *= vBrightness;
    vec3 col = mix(vColor, vec3(1.0), core * 0.6);
    gl_FragColor = vec4(col, alpha);
  }
`;

/* ── Star layer: generates stars with color variation and depth ── */
function StarLayer({
  count,
  depthRange,
  parallaxFactor,
  baseSize,
}: {
  count: number;
  depthRange: [number, number];
  parallaxFactor: number;
  baseSize: number;
}) {
  const ref = useRef<THREE.Points>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, sizes, colors, brightnesses } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const col = new Float32Array(count * 3);
    const br = new Float32Array(count);

    // Star color palette: blue-white, white, yellow, warm orange
    const palette = [
      new THREE.Color("#CADCF5"), // blue-white
      new THREE.Color("#F5F0E8"), // warm white
      new THREE.Color("#FFF5E0"), // pale yellow
      new THREE.Color("#FFE8C8"), // warm
      new THREE.Color("#D0E0F5"), // cool blue
      new THREE.Color("#FFFFFF"), // pure white
    ];

    for (let i = 0; i < count; i++) {
      // Spread on a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = depthRange[0] + Math.random() * (depthRange[1] - depthRange[0]);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      // ~3% are bright feature stars
      const isBright = Math.random() < 0.03;
      sz[i] = isBright
        ? baseSize * (2 + Math.random() * 3)
        : baseSize * (0.3 + Math.random() * 1.2);
      br[i] = isBright ? 0.85 + Math.random() * 0.15 : 0.2 + Math.random() * 0.5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, sizes: sz, colors: col, brightnesses: br };
  }, [count, depthRange, baseSize]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: starVertexShader,
        fragmentShader: starFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;

    // Mouse parallax
    mouse.current.x = THREE.MathUtils.lerp(
      mouse.current.x,
      state.pointer.x * parallaxFactor,
      0.04
    );
    mouse.current.y = THREE.MathUtils.lerp(
      mouse.current.y,
      state.pointer.y * parallaxFactor,
      0.04
    );
    ref.current.rotation.y = mouse.current.x * 0.15;
    ref.current.rotation.x = mouse.current.y * 0.1;

    // Subtle twinkling on a subset of stars
    const geo = ref.current.geometry;
    const szAttr = geo.getAttribute("size") as THREE.BufferAttribute;
    const brAttr = geo.getAttribute("brightness") as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    const step = Math.floor(t * 3) % 12;
    for (let i = step; i < count; i += 12) {
      const baseBr = brightnesses[i];
      const twinkle = 1 + Math.sin(t * 2.5 + i * 1.3) * 0.25;
      brAttr.setX(i, baseBr * twinkle);
      szAttr.setX(i, sizes[i] * (0.85 + twinkle * 0.15));
    }
    szAttr.needsUpdate = true;
    brAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-starColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-brightness" args={[brightnesses, 1]} />
      </bufferGeometry>
      <primitive object={material} attach="material" />
    </points>
  );
}

/* ── Nebula dust: soft colored fog patches ── */
function Nebula({
  position,
  color,
  scale,
  opacity,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  opacity: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[scale, scale]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ── Shooting star ── */
function ShootingStar() {
  const ref = useRef<THREE.Mesh>(null!);
  const state = useRef({
    active: false,
    timer: 3 + Math.random() * 5,
    startPos: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    life: 0,
  });

  useFrame((s, delta) => {
    const st = state.current;
    st.timer -= delta;

    if (!st.active && st.timer <= 0) {
      // Launch a new shooting star
      st.active = true;
      st.life = 0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.5;
      const r = 15;
      st.startPos.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
      st.dir
        .set(Math.random() - 0.5, -0.3 - Math.random() * 0.5, Math.random() - 0.5)
        .normalize()
        .multiplyScalar(25);
    }

    if (st.active && ref.current) {
      st.life += delta * 1.5;
      if (st.life > 1) {
        st.active = false;
        st.timer = 4 + Math.random() * 8;
        ref.current.visible = false;
        return;
      }
      ref.current.visible = true;
      const t = st.life;
      ref.current.position.copy(st.startPos).addScaledVector(st.dir, t);
      ref.current.lookAt(
        ref.current.position.x + st.dir.x,
        ref.current.position.y + st.dir.y,
        ref.current.position.z + st.dir.z
      );
      const fade = t < 0.2 ? t / 0.2 : t > 0.7 ? (1 - t) / 0.3 : 1;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = fade * 0.8;
      ref.current.scale.set(0.015, 0.015, 0.4 + fade * 0.6);
    } else if (ref.current) {
      ref.current.visible = false;
    }
  });

  return (
    <mesh ref={ref} visible={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color="#FFFFFF"
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ── Deep background: subtle gradient sphere ── */
function Background() {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec3 vWorldPos;
          void main() {
            vWorldPos = (modelMatrix * vec4(position,1.0)).xyz;
            gl_Position = projectionMatrix * viewMatrix * vec4(vWorldPos,1.0);
          }`,
        fragmentShader: `
          varying vec3 vWorldPos;
          void main() {
            float h = normalize(vWorldPos).y;
            // Deep space with subtle warm horizon
            vec3 deep = vec3(0.02, 0.03, 0.06);
            vec3 mid = vec3(0.04, 0.03, 0.07);
            vec3 horizon = vec3(0.08, 0.04, 0.06);
            vec3 c = mix(horizon, mid, smoothstep(-0.1, 0.1, h));
            c = mix(c, deep, smoothstep(0.1, 0.6, h));
            gl_FragColor = vec4(c, 1.0);
          }`,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh>
      <sphereGeometry args={[50, 24, 12]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <Background />

      {/* Three depth layers for parallax */}
      <StarLayer count={2000} depthRange={[8, 15]} parallaxFactor={1.0} baseSize={0.8} />
      <StarLayer count={1500} depthRange={[15, 25]} parallaxFactor={0.5} baseSize={0.6} />
      <StarLayer count={1000} depthRange={[25, 40]} parallaxFactor={0.2} baseSize={0.4} />

      {/* Nebula patches */}
      <Nebula position={[8, 5, -20]} color="#3D2244" scale={12} opacity={0.015} />
      <Nebula position={[-10, -3, -18]} color="#1A2844" scale={15} opacity={0.012} />
      <Nebula position={[3, 8, -25]} color="#442233" scale={10} opacity={0.01} />
      <Nebula position={[-6, 2, -22]} color="#223344" scale={8} opacity={0.008} />

      {/* Shooting stars */}
      <ShootingStar />
      <ShootingStar />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75, near: 0.01, far: 100 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Scene />
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.25}
            luminanceSmoothing={0.95}
            intensity={0.7}
            mipmapBlur
          />
          <Vignette offset={0.25} darkness={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
