
import React, { useRef } from 'react';
import { Education } from '@/config/portfolioConfig';
import { motion, useInView } from 'framer-motion';

interface PixelEducationItemProps {
  education: Education;
  index: number;
}

const PixelEducationItem: React.FC<PixelEducationItemProps> = ({ education, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  return (
    <motion.div 
      ref={ref}
      className="mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
    >
      <motion.h3 
        className="font-pixel text-xs text-white mb-1"
        whileHover={{ color: "#61DCFF" }}
      >
        {education.title}
      </motion.h3>
      <motion.p 
        className="font-mono text-xs mb-1"
        whileHover={{ x: 3 }}
      >
        {education.institution}
      </motion.p>
      <motion.p 
        className="font-mono text-xs text-gray-400 mb-1"
        whileHover={{ x: 3 }}
      >
        {education.period}
      </motion.p>
      {education.description && (
        <motion.p 
          className="font-mono text-xs text-gray-300"
          initial={{ maxHeight: 0, opacity: 0 }}
          animate={{ maxHeight: "100px", opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {education.description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default PixelEducationItem;
