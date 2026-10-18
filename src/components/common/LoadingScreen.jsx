import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white selection:bg-indigo-600 select-none"
    >
      <div className="relative flex items-center justify-center">
        {/* Glow outer ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-28 h-28 rounded-full bg-indigo-500/10 blur-xl absolute"
        />

        {/* Outer rotating gradient ring */}
        <div className="w-16 h-16 border-2 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />

        {/* Center brand mark */}
        <span className="absolute font-heading font-extrabold text-xl text-indigo-600 tracking-wider">
          G
        </span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-6 text-xs font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2"
      >
        <span>GOWTHAM G</span>
        <span className="w-1 h-1 rounded-full bg-indigo-600 animate-ping" />
        <span>PORTFOLIO</span>
      </motion.p>
    </motion.div>
  );
};
