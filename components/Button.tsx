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

const hoverTransition: Transition = { duration: 0.18, ease: 'easeOut' };
const tapTransition: Transition = { duration: 0.1 };
const arrowTransition: Transition = { duration: 0.18, ease: 'easeOut' };

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: hoverTransition },
  tap: { scale: 0.98, transition: tapTransition },
};

const arrowVariants = { rest: { x: 0 }, hover: { x: 4, transition: arrowTransition } };

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return cn(
            // premium kiwi gradient + inner highlight
            'bg-gradient-to-b from-[#A7E84F] to-[#94D82D] text-slate-900',
            'shadow-[0_8px_24px_rgba(148,216,45,0.25)] hover:shadow-[0_12px_32px_rgba(148,216,45,0.35)]',
            'hover:ring-1 hover:ring-white/10',
            'before:absolute before:inset-0 before:rounded-2xl before:bg-[linear-gradient(180deg,rgba(255,255,255,0.25),rgba(255,255,255,0))] before:opacity-70 before:pointer-events-none'
          );
        case 'secondary':
          return cn(
            // glass outline
            'border border-white/15 text-white bg-white/5 backdrop-blur-sm',
            'hover:bg-white/8 hover:border-white/25',
            'shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
          );
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
      'relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-2xl transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-accent-kiwi/50 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'font-semibold tracking-tight',
      variant !== 'text' && getSizeClasses(),
      getVariantClasses(),
      className
    );

    const content = (
      <>
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
        {showArrow && !loading && (
          <motion.div variants={arrowVariants} initial="rest" whileHover="hover">
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        )}
      </>
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
          {content}
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
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;