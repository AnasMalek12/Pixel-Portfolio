
import React from 'react';
import { motion } from 'framer-motion';
import PixelWindow from '@/components/PixelWindow';
import PixelContactForm from '@/components/PixelContactForm';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <motion.div 
      className="min-h-screen py-8 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <PixelWindow title="contact.txt">
          <div className="mb-6 flex justify-between items-center">
            <motion.h1 
              className="font-pixel text-lg text-pixel-cyan"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ color: "#FF61DC" }}
            >
              Contact Me
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="font-mono text-sm mb-4">
              Have a question or want to work together? Fill out the form below and I'll get back to you as soon as possible.
            </p>
            <PixelContactForm />
          </motion.div>
        </PixelWindow>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
