
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import portfolioConfig from '@/config/portfolioConfig';
import PixelWindow from '@/components/PixelWindow';
import { useToast } from '@/components/ui/use-toast';

const ProjectDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Find the project by ID (using title as ID for simplicity)
  const project = portfolioConfig.projects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-') === id
  );

  useEffect(() => {
    // Show toast when project loads
    if (project) {
      toast({
        title: "Project Loaded",
        description: `Now viewing: ${project.title}`,
      });
    }
  }, [project, toast]);

  if (!project) {
    return (
      <div className="min-h-screen py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <PixelWindow title="error.txt">
            <div className="flex flex-col items-center justify-center h-60">
              <h1 className="font-pixel text-pixel-pink text-xl mb-4">Project Not Found</h1>
              <p className="mb-6 font-mono">Sorry, the project you're looking for doesn't exist.</p>
              <Link to="/projects" className="pixel-btn">
                Back to Projects
              </Link>
            </div>
          </PixelWindow>
        </div>
      </div>
    );
  }

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
        <PixelWindow title={`project_${id}.txt`}>
          <div className="mb-6 flex justify-between items-center">
            <motion.h1 
              className="font-pixel text-lg text-pixel-cyan"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ color: "#FF61DC" }}
            >
              {project.title}
            </motion.h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <Link to="/projects" className="pixel-btn">
                Back
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full rounded-md border-2 border-pixel-purple"
                style={{ imageRendering: 'pixelated' }}
              />
            </motion.div>

            {/* Project Details */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="font-pixel text-base text-white mb-2">DESCRIPTION</h2>
                <p className="font-mono text-sm mb-6">{project.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="font-pixel text-base text-white mb-2">TECH STACK</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <motion.span 
                      key={index} 
                      className="bg-pixel-deepPurple text-white px-2 py-1 text-xs font-mono"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ 
                        backgroundColor: "#FF61DC",
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {project.link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="pixel-btn inline-block"
                  >
                    Live Demo
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        </PixelWindow>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
