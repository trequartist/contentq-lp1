'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, Transition } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  showArrow?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const hoverTransition: Transition = { duration: 0.2, ease: 'easeOut' };
const tapTransition: Transition = { duration: 0.1 };
const arrowTransition: Transition = { duration: 0.2, ease: 'easeOut' };

const buttonVariants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: hoverTransition
  },
  tap: { 
    scale: 0.95,
    transition: tapTransition
  },
};

const arrowVariants = {
  rest: { x: 0 },
  hover: { 
    x: 4,
    transition: arrowTransition
  },
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  showArrow = false,
  onClick,
  href,
  type = 'button',
  ...props
}, ref) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent-kiwi text-primary hover:bg-accent-kiwi/90 shadow-md hover:shadow-lg';
      case 'secondary':
        return 'border-2 border-inverse/30 text-inverse hover:border-inverse/50 hover:bg-inverse/10';
      case 'text':
        return 'text-primary hover:text-accent-kiwi underline-offset-4 hover:underline';
      default:
        return 'bg-accent-kiwi text-primary hover:bg-accent-kiwi/90';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-8 py-4 text-lg';
      default:
        return 'px-6 py-3 text-base';
    }
  };

  const baseClasses = cn(
    'font-button inline-flex items-center justify-center gap-2',
    'rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-accent-kiwi/50 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variant !== 'text' && getSizeClasses(),
    getVariantClasses(),
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref as any}
        className={baseClasses}
        onClick={onClick}
        href={href}
        variants={buttonVariants}
        initial="rest"
        whileTap="tap"
        whileHover="hover"
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
        {showArrow && !loading && (
          <motion.div
            variants={arrowVariants}
            initial="rest"
            whileHover="hover"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as any}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      variants={buttonVariants}
      initial="rest"
      whileTap="tap"
      whileHover="hover"
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
      {showArrow && !loading && (
        <motion.div
          variants={arrowVariants}
          initial="rest"
          whileHover="hover"
        >
          <ArrowRight className="w-4 h-4" />
        </motion.div>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;