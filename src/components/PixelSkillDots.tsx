
import React from 'react';
import { motion } from 'framer-motion';

interface PixelSkillDotsProps {
  level: 1 | 2 | 3 | 4 | 5;
}

const PixelSkillDots: React.FC<PixelSkillDotsProps> = ({ level }) => {
  return (
    <div className="pixel-dots">
      {[...Array(5)].map((_, index) => (
        <motion.span 
          key={index} 
          className={`pixel-dot ${index < level ? 'pixel-dot-filled' : 'pixel-dot-empty'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileHover={{ 
            scale: 1.2, 
            backgroundColor: index < level ? 
              ['#FFFFFF', '#61DCFF', '#FF61DC', '#61FF8D', '#FFD700'][Math.floor(Math.random() * 5)] : 
              undefined 
          }}
        />
      ))}
    </div>
  );
};

export default PixelSkillDots;
