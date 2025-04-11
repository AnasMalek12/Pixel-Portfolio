
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProjectType } from '@/config/portfolioConfig';

interface PixelProjectCardProps {
  project: ProjectType;
}

const PixelProjectCard: React.FC<PixelProjectCardProps> = ({ project }) => {
  // Create URL-friendly ID from project title
  const projectId = project.title.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="pixel-window overflow-hidden">
      <div className="pixel-window-title">
        <span className="font-pixel text-xs">{project.title}</span>
      </div>
      <div className="bg-pixel-black">
        <div className="h-40 overflow-hidden">
          <motion.img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover object-center"
            style={{ imageRendering: 'pixelated' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="p-4">
          <p className="font-mono text-xs mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, index) => (
              <motion.span 
                key={index} 
                className="bg-pixel-deepPurple text-white px-2 py-1 text-[10px] font-mono"
                whileHover={{ backgroundColor: "#FF61DC" }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={`/project/${projectId}`}
                className="inline-block pixel-btn text-[10px] py-1"
              >
                View Project
              </Link>
            </motion.div>
            {project.link && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-pixel-deepPurple text-white px-4 py-1 text-[10px] border-2 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:bg-pixel-purple transition-colors duration-200"
                >
                  Live Demo
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelProjectCard;
