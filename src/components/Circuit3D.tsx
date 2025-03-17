import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial } from '@react-three/drei';
import { Mesh, Group } from 'three';

export function Circuit3D() {
  const mainRef = useRef<Group>(null);
  const tracesRef = useRef<Group>(null);
  const componentsRef = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (mainRef.current) {
      mainRef.current.rotation.y += delta * 0.1;
    }

    if (tracesRef.current) {
      tracesRef.current.children.forEach((child, i) => {
        const mesh = child as Mesh;
        // Pulse effect for traces
        const t = state.clock.getElapsedTime();
        const pulse = Math.sin(t * 0.5 + i * 0.2) * 0.5 + 0.5;
        
        if (mesh.material) {
          // @ts-ignore - we know this property exists on the material
          mesh.material.emissiveIntensity = pulse * 0.5;
        }
      });
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as Mesh;
        const t = state.clock.getElapsedTime();
        
        // Move particles along the circuit paths
        mesh.position.x = Math.sin(t * 0.5 + i) * 2;
        mesh.position.z = Math.cos(t * 0.5 + i) * 2;
        
        // Pulse size
        mesh.scale.setScalar(Math.sin(t * 2 + i) * 0.2 + 0.3);
      });
    }
  });

  return (
    <group ref={mainRef}>
      {/* Main board */}
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 5]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={50}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.8}
        />
      </mesh>

      {/* Circuit traces */}
      <group ref={tracesRef}>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const radius = 1.5 + (i % 3) * 0.3;
          
          return (
            <mesh 
              key={`trace-${i}`} 
              position={[
                Math.cos(angle) * radius, 
                0.02, 
                Math.sin(angle) * radius
              ]}
              rotation={[0, angle + Math.PI / 2, 0]}
            >
              <boxGeometry args={[0.8 + (i % 3) * 0.3, 0.02, 0.05]} />
              <meshStandardMaterial 
                color="#3B82F6" 
                emissive="#3B82F6"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>

      {/* Circuit components */}
      <group ref={componentsRef}>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 1.2;
          
          return (
            <mesh 
              key={`component-${i}`} 
              position={[
                Math.cos(angle) * radius, 
                0.1, 
                Math.sin(angle) * radius
              ]}
            >
              <boxGeometry args={[0.2, 0.1, 0.2]} />
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#1E40AF" : "#1F2937"} 
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
          );
        })}
        
        {/* Central processor */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial 
            color="#1E3A8A" 
            roughness={0.2}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* Data flow particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`particle-${i}`} position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#60A5FA" 
              emissive="#60A5FA"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
} 