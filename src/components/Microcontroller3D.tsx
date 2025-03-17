import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, MeshReflectorMaterial } from '@react-three/drei';
import { Mesh, Group } from 'three';

export function Microcontroller3D() {
  const mainRef = useRef<Group>(null);
  const particlesRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [pinStates, setPinStates] = useState<boolean[]>(Array(16).fill(false));

  useFrame((state, delta) => {
    if (mainRef.current) {
      mainRef.current.rotation.y += delta * (hovered ? 0.2 : 0.05);
    }

    // Randomly toggle pin states for animation effect
    if (Math.random() > 0.95) {
      const newPinStates = [...pinStates];
      const randomPin = Math.floor(Math.random() * 16);
      newPinStates[randomPin] = !newPinStates[randomPin];
      setPinStates(newPinStates);
    }

    // Animate particles based on pin states
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        const mesh = child as Mesh;
        const pinIndex = i % 16;
        const t = state.clock.getElapsedTime();
        
        if (pinStates[pinIndex]) {
          // Active pin - move particle outward
          const angle = (pinIndex / 16) * Math.PI * 2;
          const radius = 1.5 + Math.sin(t * 3) * 0.3;
          
          mesh.position.x = Math.cos(angle) * radius;
          mesh.position.z = Math.sin(angle) * radius;
          mesh.position.y = 0.1 + Math.sin(t * 5 + i) * 0.05;
          mesh.visible = true;
          mesh.scale.setScalar(0.08 + Math.sin(t * 10) * 0.02);
        } else {
          // Inactive pin - hide particle
          mesh.visible = false;
        }
      });
    }
  });

  return (
    <group 
      ref={mainRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Main IC body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshStandardMaterial 
          color={hovered ? "#4B5563" : "#374151"}
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Microcontroller text */}
      <Text
        position={[0, 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.2}
        color="#A855F7"
        anchorX="center"
        anchorY="middle"
      >
        MCU
      </Text>

      {/* Pins */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const radius = 1.2;
        
        return (
          <mesh 
            key={`pin-${i}`} 
            position={[
              Math.cos(angle) * radius, 
              0.1, 
              Math.sin(angle) * radius
            ]}
            scale={[0.1, 0.05, 0.3]}
            rotation={[0, angle, 0]}
          >
            <boxGeometry />
            <meshStandardMaterial 
              color={pinStates[i] ? "#A855F7" : "#6B7280"} 
              emissive={pinStates[i] ? "#A855F7" : "#000000"}
              emissiveIntensity={pinStates[i] ? 0.5 : 0}
            />
          </mesh>
        );
      })}

      {/* Base plate with reflection */}
      <mesh position={[0, -0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
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

      {/* Data flow particles */}
      <group ref={particlesRef}>
        {Array.from({ length: 32 }).map((_, i) => (
          <mesh key={`particle-${i}`} position={[0, 0.1, 0]} visible={false}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#A855F7" 
              emissive="#A855F7"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Circuit traces on the board */}
      {Array.from({ length: 8 }).map((_, i) => {
        const startAngle = (i / 8) * Math.PI * 2;
        const endAngle = ((i + 4) / 8) * Math.PI * 2;
        const radius = 0.8;
        
        return (
          <mesh 
            key={`trace-${i}`} 
            position={[0, 0.11, 0]}
          >
            <torusGeometry args={[radius, 0.02, 16, 16, Math.PI / 4]} />
            <meshStandardMaterial 
              color="#A855F7" 
              emissive="#A855F7"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
    </group>
  );
} 