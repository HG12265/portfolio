import React from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bgDark"
    >
      <div className="relative flex items-center justify-center">
        {/* Glow outer ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-full bg-primaryBlue/20 blur-xl absolute"
        />

        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-2 border-primaryBlue/20 border-t-accentSky rounded-full animate-spin" />

        {/* Center brand mark */}
        <span className="absolute font-heading font-bold text-lg text-accentSky">
          G
        </span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-sm font-mono tracking-widest text-textMuted uppercase"
      >
        GOWTHAM G &bull; PORTFOLIO
      </motion.p>
    </motion.div>
  );
};
