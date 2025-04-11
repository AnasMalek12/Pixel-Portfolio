
import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const PixelCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') ||
          (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div 
      className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block"
      style={{
        x: cursorX,
        y: cursorY
      }}
    >
      <motion.div 
        className={`w-8 h-8 border-2 border-pixel-purple ${isHovering ? 'bg-pixel-purple bg-opacity-30' : ''}`}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
        style={{ imageRendering: 'pixelated' }}
      />
    </motion.div>
  );
};

export default PixelCursor;
