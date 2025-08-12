'use client';

import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants, Transition, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionProps extends Omit<HTMLMotionProps<'section'>, 'children' | 'className' | 'id' | 'ref'> {
  children: ReactNode;
  variant?: 'light' | 'white' | 'dark' | 'warm';
  className?: string;
  id?: string;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  noPadding?: boolean;
}

const sectionTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1.0]
};

const sectionVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: sectionTransition
  }
};

const containerSizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-8xl',
  full: 'max-w-full',
};

const Section = forwardRef<HTMLElement, SectionProps>(({ 
  children,
  variant = 'white',
  className,
  id,
  containerSize = 'xl',
  noPadding = false,
  ...props
}, ref) => {
  const getBackgroundClass = () => {
    switch (variant) {
      case 'light':
        return 'bg-light';
      case 'white':
        return 'bg-white';
      case 'warm':
        return 'bg-warm';
      case 'dark':
        return 'bg-hero text-inverse';
      default:
        return 'bg-white';
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn(
        'relative w-full',
        getBackgroundClass(),
        !noPadding && 'section-padding',
        className
      )}
      {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className={cn('mx-auto', containerSizes[containerSize])}>
        {children}
      </div>
    </motion.section>
  );
});

Section.displayName = 'Section';

export default Section;