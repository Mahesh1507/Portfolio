import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FirmwareBackgroundProps {
  variant?: 'circuit' | 'microcontroller' | 'code';
  opacity?: number;
}

export function FirmwareBackground({ variant = 'circuit', opacity = 0.3 }: FirmwareBackgroundProps) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ opacity: opacity * 2 }}>
      {variant === 'circuit' && <CircuitBackground />}
      {variant === 'microcontroller' && <MicrocontrollerBackground />}
      {variant === 'code' && <CodeBackground />}
    </div>
  );
}

function CircuitBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-900">
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-repeat opacity-20"></div>
      
      {/* Interactive glow effect following mouse */}
      <div 
        className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        style={{ 
          left: `${mousePosition.x - 128}px`, 
          top: `${mousePosition.y - 128}px`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out'
        }}
      />
      
      {/* Animated circuit traces */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-blue-500/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 5}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              boxShadow: [
                '0 0 2px rgba(59, 130, 246, 0.3)',
                '0 0 8px rgba(59, 130, 246, 0.6)',
                '0 0 2px rgba(59, 130, 246, 0.3)',
              ],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Circuit nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
              boxShadow: [
                '0 0 0px rgba(59, 130, 246, 0.3)',
                '0 0 10px rgba(59, 130, 246, 0.6)',
                '0 0 0px rgba(59, 130, 246, 0.3)',
              ],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Data flow particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 40;
          const centerX = 50;
          const centerY = 50;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{
                left: `${centerX}%`,
                top: `${centerY}%`,
              }}
              animate={{
                x: [
                  0,
                  Math.cos(angle) * radius,
                  Math.cos(angle + Math.PI) * radius,
                  0
                ],
                y: [
                  0,
                  Math.sin(angle) * radius,
                  Math.sin(angle + Math.PI) * radius,
                  0
                ],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear"
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function MicrocontrollerBackground() {
  return (
    <div className="relative w-full h-full bg-gray-900">
      <div className="absolute inset-0 bg-[url('/images/microchip-pattern.svg')] bg-repeat opacity-10"></div>
      
      {/* Data pulses */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/80 to-blue-500/0"
            style={{
              left: '0%',
              top: `${5 + i * 12}%`,
              width: '100%',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>
      
      {/* Processing nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-purple-500"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0.3, 0.7, 0.3],
              boxShadow: [
                '0 0 0px rgba(168, 85, 247, 0.5)',
                '0 0 15px rgba(168, 85, 247, 0.8)',
                '0 0 0px rgba(168, 85, 247, 0.5)',
              ],
            }}
            transition={{
              duration: Math.random() * 5 + 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
      
      {/* Animated chip */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-40 h-40 border-2 border-purple-500/50 rounded-lg relative"
          animate={{
            boxShadow: [
              '0 0 0px rgba(168, 85, 247, 0.3)',
              '0 0 30px rgba(168, 85, 247, 0.5)',
              '0 0 0px rgba(168, 85, 247, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Chip pins */}
          {Array.from({ length: 24 }).map((_, i) => {
            const side = Math.floor(i / 6);
            const position = i % 6;
            const spacing = 100 / 7; // 7 segments (6 pins + spacing on both ends)
            
            let style = {};
            if (side === 0) { // top
              style = { left: `${spacing * (position + 1)}%`, top: '-5px', width: '2px', height: '5px' };
            } else if (side === 1) { // right
              style = { right: '-5px', top: `${spacing * (position + 1)}%`, width: '5px', height: '2px' };
            } else if (side === 2) { // bottom
              style = { left: `${spacing * (6 - position)}%`, bottom: '-5px', width: '2px', height: '5px' };
            } else { // left
              style = { left: '-5px', top: `${spacing * (6 - position)}%`, width: '5px', height: '2px' };
            }
            
            return (
              <motion.div
                key={`pin-${i}`}
                className="absolute bg-purple-500"
                style={style}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            );
          })}
          
          {/* Inner components */}
          <motion.div
            className="absolute left-1/4 top-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

function CodeBackground() {
  const [typingText, setTypingText] = useState('');
  const codeSnippets = [
    '#include <Arduino.h>',
    'void setup() {',
    '  pinMode(LED_BUILTIN, OUTPUT);',
    '}',
    'void loop() {',
    '  digitalWrite(LED_BUILTIN, HIGH);',
    '  delay(1000);',
    '  digitalWrite(LED_BUILTIN, LOW);',
    '  delay(1000);',
    '}'
  ];
  
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingInterval: NodeJS.Timeout;
    
    const type = () => {
      const currentText = codeSnippets[currentLine];
      
      if (isDeleting) {
        setTypingText(prev => prev.substring(0, prev.length - 1));
        if (typingText === '') {
          isDeleting = false;
          currentLine = (currentLine + 1) % codeSnippets.length;
          currentChar = 0;
        }
      } else {
        if (currentChar < currentText.length) {
          setTypingText(prev => prev + currentText.charAt(currentChar));
          currentChar++;
        } else {
          // Pause at the end of line
          setTimeout(() => {
            isDeleting = true;
          }, 1500);
        }
      }
    };
    
    typingInterval = setInterval(type, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative w-full h-full bg-gray-900">
      <div className="absolute inset-0 bg-[url('/images/binary-pattern.svg')] bg-repeat opacity-5"></div>
      
      {/* Animated code lines */}
      <div className="absolute inset-0 flex flex-col justify-between py-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-2 bg-gradient-to-r from-gray-800 via-green-500/20 to-gray-800"
            style={{ width: `${Math.random() * 40 + 30}%`, marginLeft: `${Math.random() * 50}%` }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              width: [`${Math.random() * 40 + 30}%`, `${Math.random() * 40 + 40}%`, `${Math.random() * 40 + 30}%`],
            }}
            transition={{
              duration: Math.random() * 8 + 10,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      {/* Typing code effect */}
      <div className="absolute top-1/4 left-1/4 w-1/2 bg-gray-800/80 p-4 rounded-md font-mono text-sm">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-green-400">
          {typingText}
          <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
        </div>
      </div>
      
      {/* Blinking cursors */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-4 bg-green-500"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
            }}
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: Math.random() * 1,
            }}
          />
        ))}
      </div>
      
      {/* Matrix-style falling characters */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`matrix-${i}`}
            className="absolute text-green-500/40 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
            animate={{
              y: ['0vh', '100vh'],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((_, j) => (
              <div key={j} className="my-2">
                {Math.random() > 0.5 ? '0' : '1'}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 