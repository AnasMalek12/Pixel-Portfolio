import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import portfolioConfig from '@/config/portfolioConfig';
import PixelAvatar from '@/components/PixelAvatar';
import PixelWindow from '@/components/PixelWindow';
import PixelSocialLink from '@/components/PixelSocialLink';
import PixelSkillDots from '@/components/PixelSkillDots';
import PixelExperienceItem from '@/components/PixelExperienceItem';
import PixelEducationItem from '@/components/PixelEducationItem';
import PixelProjectCard from '@/components/PixelProjectCard';
import PixelContactForm from '@/components/PixelContactForm';
import PixelMiniGame from '@/components/PixelMiniGame';

const Index = () => {
  const { scrollY } = useScroll();
  const ref = useRef(null);
  
  const scrollVelocity = useSpring(useTransform(scrollY, [0, 100], [0, 1]), {
    stiffness: 500,
    damping: 90
  });
  
  const y = useTransform(scrollVelocity, [0, 1], [0, -5]);
  const rotate = useTransform(scrollVelocity, [0, 1], [0, 1]);

  // Interactive animations for sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-pixel-dark text-pixel-light py-8 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        style={{ y }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Profile */}
          <motion.div 
            className="md:col-span-1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <PixelWindow title="profile.txt" className="h-full">
              <div className="flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <PixelAvatar 
                    src={portfolioConfig.avatar} 
                    alt={portfolioConfig.name} 
                    className="w-40 h-40 mb-4 animate-pixel-float"
                  />
                </motion.div>
                
                <motion.h1 
                  className="font-pixel text-lg text-pixel-cyan mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{ scale: 1.05, color: "#FF61DC" }}
                >
                  {portfolioConfig.name}
                </motion.h1>
                
                <motion.p 
                  className="font-mono text-sm mb-4 text-pixel-pink"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {portfolioConfig.title}
                </motion.p>

                {/* Status Indicator - Now using the config value */}
                {portfolioConfig.availableForWork && (
                  <motion.div
                    className="mb-4 px-3 py-1 bg-green-600/20 border border-green-500 rounded flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                    <span className="font-pixel text-xs text-green-400">Available for work</span>
                  </motion.div>
                )}
                
                <div className="w-full">
                  <motion.h2 
                    className="font-pixel text-sm text-white mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    My Contacts:
                  </motion.h2>
                  
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, staggerChildren: 0.2 }}
                  >
                    {portfolioConfig.socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.1 + (index * 0.1) }}
                        whileHover={{ x: 5, backgroundColor: "rgba(255, 97, 220, 0.1)", scale: 1.02 }}
                        className="px-2 py-1 rounded"
                      >
                        <PixelSocialLink social={social} />
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="mt-6 text-center flex flex-wrap gap-2 justify-center"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link 
                      to="/projects" 
                      className="pixel-btn inline-block"
                    >
                      Projects
                    </Link>
                    <Link 
                      to="/contact" 
                      className="pixel-btn inline-block bg-pixel-purple"
                    >
                      Contact
                    </Link>
                  </motion.div>

                  {/* Resume Download Section - UPDATED STYLES */}
                  <motion.div
                    className="mt-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    {portfolioConfig.resumeUrl && (
                      <motion.a
                        href={portfolioConfig.resumeUrl}
                        className="pixel-btn inline-block bg-pixel-green"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download CV
                      </motion.a>
                    )}
                  </motion.div>
                  
                  {/* Mini-Game Section */}
                  <motion.div 
                    className="mt-6"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 }} // Adjusted delay
                  >
                    <motion.h2 
                      className="font-pixel text-sm text-white mb-4 text-center flex items-center justify-center gap-2"
                      whileHover={{ color: "#61DCFF" }}
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-pixel-pink rounded-none"></span>
                      PIXEL INVADERS
                      <span className="inline-block w-1.5 h-1.5 bg-pixel-pink rounded-none"></span>
                    </motion.h2>
                    <PixelMiniGame />

                    {/* Game Instructions */}
                    <div className="mt-4 p-2 border border-dashed border-pixel-purple/50 bg-black/30">
                      <h3 className="font-pixel text-xs text-pixel-pink mb-1">HOW TO PLAY:</h3>
                      <ul className="font-mono text-xs list-disc list-inside space-y-1 text-white/70">
                        <li>Arrow keys / Drag to move</li>
                        <li>Space / Tap to shoot</li>
                        <li>Collect green power-ups</li>
                        <li>Avoid pink enemies</li>
                      </ul>
                      <div className="text-center mt-2">
                        <div className="inline-block px-3 py-1 bg-black/50 border border-pixel-cyan/50 rounded">
                          <span className="font-pixel text-xs text-pixel-cyan">
                            Beat your high score!
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </PixelWindow>
          </motion.div>
          
          {/* Right Column - Content */}
          <motion.div 
            className="md:col-span-2 space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -3 }}
            >
              <PixelWindow title="about.txt">
                <div>
                  <motion.h2 
                    className="font-pixel text-base text-white mb-4"
                    whileHover={{ color: "#61DCFF" }}
                  >
                    ABOUT ME
                  </motion.h2>
                  <motion.p 
                    className="font-mono text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {portfolioConfig.about}
                  </motion.p>
                  
                  <div className="mt-8">
                    <motion.h2 
                      className="font-pixel text-base text-white mb-4"
                      whileHover={{ color: "#61DCFF" }}
                    >
                      MAIN SKILLS
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolioConfig.skills.map((skill, index) => (
                        <motion.div 
                          key={index} 
                          className="flex justify-between items-center p-2 rounded"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + (index * 0.1) }}
                          whileHover={{ 
                            backgroundColor: "rgba(123, 97, 255, 0.2)",
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.span 
                            className="font-mono text-sm"
                            whileHover={{ color: "#FF61DC" }}
                          >
                            {skill.name}
                          </motion.span>
                          <PixelSkillDots level={skill.level} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <motion.h2 
                      className="font-pixel text-base text-white mb-4"
                      whileHover={{ color: "#61DCFF" }}
                    >
                      SOFTWARE
                    </motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolioConfig.software.map((software, index) => (
                        <motion.div 
                          key={index} 
                          className="flex justify-between items-center p-2 rounded"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + (index * 0.1) }}
                          whileHover={{ 
                            backgroundColor: "rgba(123, 97, 255, 0.2)",
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.span 
                            className="font-mono text-sm"
                            whileHover={{ color: "#61FF8D" }}
                          >
                            {software.name}
                          </motion.span>
                          <PixelSkillDots level={software.level} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </PixelWindow>
            </motion.div>
            
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ rotate }}
              whileHover={{ y: -3 }}
            >
              <PixelWindow title="experience.txt">
                <div>
                  <motion.h2 
                    className="font-pixel text-base text-white mb-4"
                    whileHover={{ color: "#61DCFF" }}
                  >
                    EXPERIENCE
                  </motion.h2>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {portfolioConfig.experience.map((exp, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <PixelExperienceItem experience={exp} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </PixelWindow>
            </motion.div>
            
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -3 }}
            >
              <PixelWindow title="education.txt">
                <div>
                  <motion.h2 
                    className="font-pixel text-base text-white mb-4"
                    whileHover={{ color: "#61DCFF" }}
                  >
                    EDUCATION
                  </motion.h2>
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {portfolioConfig.education.map((edu, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <PixelEducationItem education={edu} index={index} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </PixelWindow>
            </motion.div>
            
            {/* Projects Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ y: -3 }}
            >
              <PixelWindow title="projects.txt">
                <div>
                  <motion.h2 
                    className="font-pixel text-base text-white mb-4"
                    whileHover={{ color: "#61DCFF" }}
                  >
                    FEATURED PROJECTS
                  </motion.h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {portfolioConfig.projects.slice(0, 2).map((project, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + (index * 0.2) }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PixelProjectCard project={project} />
                      </motion.div>
                    ))}
                  </div>
                  <motion.div 
                    className="text-center mt-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link 
                      to="/projects" 
                      className="pixel-btn inline-block"
                    >
                      See All Projects
                    </Link>
                  </motion.div>
                </div>
              </PixelWindow>
            </motion.div>
            
            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ y: -3 }}
            >
              <PixelWindow title="contact.txt">
                <div>
                  <motion.h2 
                    className="font-pixel text-base text-white mb-4"
                    whileHover={{ color: "#61DCFF" }}
                  >
                    CONTACT ME
                  </motion.h2>
                  <p className="font-mono text-sm mb-6">
                    Have a project in mind? Need a new website? Want to collaborate? Feel free to drop me a message!
                  </p>
                  <PixelContactForm />
                </div>
              </PixelWindow>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;