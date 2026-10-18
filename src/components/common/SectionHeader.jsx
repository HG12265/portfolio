import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader = ({ 
  badge, 
  title, 
  highlightTitle, 
  subtitle, 
  center = true, 
  className = '' 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 lg:mb-16 ${center ? 'text-center' : ''} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
          {badge}
        </span>
      )}
      
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 font-heading">
        {title}{' '}
        {highlightTitle && (
          <span className="text-gradient-blue">{highlightTitle}</span>
        )}
      </h2>
      
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
