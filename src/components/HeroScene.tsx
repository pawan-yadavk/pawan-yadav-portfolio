import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Torus, Stars } from '@react-three/drei';
import type { Mesh } from 'three';

function CoreCrystal() {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.25;
      ref.current.rotation.y += delta * 0.35;
    }
  });
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.1}>
      <Icosahedron ref={ref} args={[1.25, 1]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          emissive="#7c3aed"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.7}
          distort={0.32}
          speed={1.8}
        />
      </Icosahedron>
    </Float>
  );
}

function OrbitingRing({
  radius,
  color,
  speed,
  tilt,
}: {
  radius: number;
  color: string;
  speed: number;
  tilt: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.015, 16, 120]} rotation={tilt}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.4}
        roughness={0.3}
        metalness={0.6}
      />
    </Torus>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2.4} color="#0ea5e9" />
      <pointLight position={[-4, -2, -3]} intensity={2} color="#8b5cf6" />
      <pointLight position={[0, 3, -4]} intensity={1.2} color="#22d3ee" />

      <Suspense fallback={null}>
        <CoreCrystal />
        <OrbitingRing radius={2} color="#22d3ee" speed={0.4} tilt={[1.2, 0.3, 0]} />
        <OrbitingRing radius={2.5} color="#8b5cf6" speed={-0.3} tilt={[0.6, 1.1, 0.4]} />
        <OrbitingRing radius={3} color="#0ea5e9" speed={0.22} tilt={[0.2, 0.5, 1.3]} />
        <Stars radius={40} depth={50} count={1200} factor={3} fade speed={1} />
      </Suspense>
    </Canvas>
  );
}
