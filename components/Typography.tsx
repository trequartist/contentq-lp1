'use client';

import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TypographyProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.6, 0.4, 1] },
  },
};

// Hero Headline Component
export const HeroHeadline = forwardRef<HTMLHeadingElement, TypographyProps>(({
  children,
  className,
  animate = true,
  ...props
}, ref) => {
  const Component = animate ? motion.h1 : 'h1';
  
  return (
    <Component
      ref={ref}
      className={cn('font-hero text-primary', className)}
      variants={animate ? textVariants : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

// Section Headline Component
export const SectionHeadline = forwardRef<HTMLHeadingElement, TypographyProps>(({
  children,
  className,
  animate = true,
  ...props
}, ref) => {
  const Component = animate ? motion.h2 : 'h2';
  
  return (
    <Component
      ref={ref}
      className={cn('font-section-header text-primary', className)}
      variants={animate ? textVariants : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

// Subheadline Component
export const Subheadline = forwardRef<HTMLHeadingElement, TypographyProps>(({
  children,
  className,
  animate = true,
  ...props
}, ref) => {
  const Component = animate ? motion.h3 : 'h3';
  
  return (
    <Component
      ref={ref}
      className={cn('font-subsection text-primary', className)}
      variants={animate ? textVariants : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

// Body Text Component
export const BodyText = forwardRef<HTMLParagraphElement, TypographyProps>(({
  children,
  className,
  animate = true,
  ...props
}, ref) => {
  const Component = animate ? motion.p : 'p';
  
  return (
    <Component
      ref={ref}
      className={cn('font-body text-secondary', className)}
      variants={animate ? textVariants : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

// Caption Component
export const Caption = forwardRef<HTMLParagraphElement, TypographyProps>(({
  children,
  className,
  animate = true,
  ...props
}, ref) => {
  const Component = animate ? motion.p : 'p';
  
  return (
    <Component
      ref={ref}
      className={cn('font-caption text-muted', className)}
      variants={animate ? textVariants : undefined}
      {...props}
    >
      {children}
    </Component>
  );
});

HeroHeadline.displayName = 'HeroHeadline';
SectionHeadline.displayName = 'SectionHeadline';
Subheadline.displayName = 'Subheadline';
BodyText.displayName = 'BodyText';
Caption.displayName = 'Caption';