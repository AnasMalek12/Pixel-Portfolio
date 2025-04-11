
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import portfolioConfig from '@/config/portfolioConfig';
import PixelWindow from '@/components/PixelWindow';
import PixelProjectCard from '@/components/PixelProjectCard';

const Projects = () => {
  return (
    <motion.div 
      className="min-h-screen py-8 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PixelWindow title="projects.txt">
          <div className="mb-6 flex justify-between items-center">
            <motion.h1 
              className="font-pixel text-lg text-pixel-cyan"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ color: "#FF61DC" }}
            >
              Projects
            </motion.h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="/" 
                className="pixel-btn"
              >
                Back
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {portfolioConfig.projects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2 + (index * 0.1)
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <PixelProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </PixelWindow>
      </motion.div>
    </motion.div>
  );
};

export default Projects;
