'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Mount detection for client-only features
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Smooth scrolling enhancement
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  // Create floating particles - client-only
  useEffect(() => {
    if (!isMounted) return;

    if (!isMounted) return;

    const createParticle = () => {
      const container = document.querySelector('.floating-particles');
      if (!container) return;

      const particle = document.createElement('div');
      
      // Add variety to particles
      const sizes = ['particle-small', 'particle-medium', 'particle-large'];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      particle.className = `particle ${randomSize}`;
      
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      particle.style.setProperty('--delay', Math.random() * 4 + 's');
      
      container.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 12000);
    };

    // Create initial particles
    particleIntervalRef.current = setInterval(createParticle, 300);
    
    // Cleanup
    return () => {
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
      }
    };
  }, [isMounted]);

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />
      
      {/* Grain texture overlay */}
      <div className="grain-overlay" />
      
      {/* Floating particles container */}
      <div className="floating-particles fixed inset-0 pointer-events-none z-0" />
      
      {/* Main content */}
      <div className="relative">
        {children}
      </div>
    </>
  );
}