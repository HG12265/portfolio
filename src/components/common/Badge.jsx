import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  icon: Icon,
  className = '' 
}) => {
  const variants = {
    default: 'bg-white/5 text-textMuted border border-white/10',
    primary: 'bg-primaryBlue/10 text-accentSky border border-primaryBlue/20',
    accent: 'bg-accentSky/10 text-accentSky border border-accentSky/20',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono font-medium rounded-full ${variants[variant] || variants.default} ${sizes[size] || sizes.sm} ${className}`}>
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};
