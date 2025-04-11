import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  twinkling: boolean;
}

const PixelSpaceBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Star[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Generate initial stars
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    const newStars: Star[] = [];
    
    const starColors = ['#FFFFFF', '#61DCFF', '#FF61DC', '#FFD700', '#61FF8D'];
    
    // Generate 100 stars
    for (let i = 0; i < 100; i++) {
      newStars.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.floor(Math.random() * 3) + 1,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        speed: Math.random() * 0.05 + 0.01,
        twinkling: Math.random() > 0.7
      });
    }
    
    setStars(newStars);
  }, []);
  
  // Update star positions based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top } = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - left,
        y: e.clientY - top
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Update star positions based on mouse movement
  useEffect(() => {
    if (stars.length === 0) return;
    
    const moveStars = () => {
      setStars(prevStars => 
        prevStars.map(star => {
          // Calculate distance from mouse
          const dx = mousePosition.x - star.x;
          const dy = mousePosition.y - star.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Move away from mouse if close enough
          if (distance < 100) {
            const angle = Math.atan2(dy, dx);
            return {
              ...star,
              x: star.x - Math.cos(angle) * star.speed * (100 - distance) / 10,
              y: star.y - Math.sin(angle) * star.speed * (100 - distance) / 10
            };
          }
          
          // Otherwise, slowly return to original position
          return star;
        })
      );
    };
    
    const intervalId = setInterval(moveStars, 16);
    return () => clearInterval(intervalId);
  }, [mousePosition, stars]);
  
  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ imageRendering: 'pixelated' }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-none"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
          animate={star.twinkling ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={star.twinkling ? {
            duration: 2 + Math.random(),
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        />
      ))}
      
      {/* Add some larger moving pixel planet elements */}
      <motion.div
        className="absolute w-4 h-4 rounded-none bg-pixel-pink"
        initial={{ x: "10%", y: "20%" }}
        animate={{ 
          x: ["10%", "15%", "10%"],
          y: ["20%", "22%", "20%"]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-6 h-6 rounded-none bg-pixel-cyan"
        initial={{ x: "80%", y: "70%" }}
        animate={{ 
          x: ["80%", "75%", "80%"],
          y: ["70%", "75%", "70%"]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute w-3 h-3 rounded-none bg-pixel-yellow"
        initial={{ x: "30%", y: "85%" }}
        animate={{ 
          x: ["30%", "35%", "30%"],
          y: ["85%", "80%", "85%"]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default PixelSpaceBackground;
