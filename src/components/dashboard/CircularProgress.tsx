import React from 'react';
import { motion } from 'framer-motion';

interface CircularProgressProps {
  value: number;
  color: string;
  label: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ value, color, label }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="relative w-24 h-24"
  >
    <svg className="w-full h-full transform -rotate-90">
      <motion.circle
        className="stroke-current"
        style={{ stroke: color, opacity: 0.1 }}
        strokeWidth="8"
        fill="transparent"
        r="42"
        cx="48"
        cy="48"
      />
      <motion.circle
        className="stroke-current"
        style={{ stroke: color }}
        strokeWidth="8"
        strokeLinecap="round"
        fill="transparent"
        r="42"
        cx="48"
        cy="48"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: Math.min(value / 100, 1) }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </svg>
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className="text-lg font-bold" style={{ color }}>{Math.floor(Math.min(value, 100))}%</span>
      <span className="text-xs mt-1 font-medium text-gray-600">{label}</span>
    </motion.div>
  </motion.div>
);