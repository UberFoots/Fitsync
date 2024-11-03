import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity = useTransform(scrollY, [0, 300], [0.5, 0.2]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 z-0"
      >
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-40 right-[15%] w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-[60%] left-[20%] w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"
        />
      </motion.div>
    </div>
  );
};