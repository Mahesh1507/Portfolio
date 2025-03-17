import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { FallbackContent } from './FallbackContent';

interface Scene3DProps {
  children: React.ReactNode;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  intensity?: number;
  background?: boolean;
}

export function Scene3D({
  children,
  autoRotate = true,
  enableZoom = false,
  enablePan = false,
  intensity = 0.5,
  background = false
}: Scene3DProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FallbackContent />;
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: background ? '#111827' : 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={intensity} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          {children}
          
          <OrbitControls 
            autoRotate={autoRotate}
            enableZoom={enableZoom}
            enablePan={enablePan}
            autoRotateSpeed={0.5}
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
} 