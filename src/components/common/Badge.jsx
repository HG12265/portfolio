import React from 'react';

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'sm', 
  icon: Icon,
  className = '' 
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    primary: 'bg-indigo-50 text-indigo-700 border border-indigo-200/80',
    accent: 'bg-blue-50 text-blue-700 border border-blue-200/80',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200/80',
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
