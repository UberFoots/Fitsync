import React from 'react';
import { Header } from './Header';
import { ParallaxBackground } from './Parallax';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95 relative overflow-hidden">
      <ParallaxBackground />
      <Header />
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-4 py-6 max-w-7xl mx-auto relative z-10"
      >
        <Outlet />
      </motion.main>
    </div>
  );
};