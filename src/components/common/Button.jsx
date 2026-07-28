import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  href,
  target,
  download,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium font-body rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accentSky/50 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer select-none';

  const variants = {
    primary: 'bg-primaryBlue hover:bg-blue-600 text-white shadow-lg shadow-primaryBlue/20 hover:shadow-primaryBlue/35 border border-blue-500/30',
    secondary: 'bg-surfaceDark hover:bg-slate-800 text-textLight border border-white/10 hover:border-white/20 shadow-sm',
    accent: 'bg-accentSky text-bgDark font-semibold hover:bg-sky-400 shadow-md shadow-accentSky/20',
    outline: 'bg-transparent text-textLight border border-white/15 hover:border-accentSky hover:text-accentSky hover:bg-accentSky/5',
    ghost: 'bg-transparent text-textMuted hover:text-textLight hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5',
  };

  const combinedClass = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  const content = (
    <>
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      
      <span>{children}</span>

      {!loading && Icon && iconPosition === 'right' && (
        <Icon className="w-4 h-4 shrink-0" />
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        download={download}
        className={combinedClass}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClass}
      {...props}
    >
      {content}
    </motion.button>
  );
};
