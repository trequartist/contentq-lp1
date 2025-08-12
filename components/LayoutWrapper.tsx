'use client';

import { ReactNode, useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import LogoKiwiQ from './LogoKiwiQ';

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id || '');
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  useEffect(() => {
    const headerEl = document.getElementById('app-header');
    if (!headerEl) return;
    const onScroll = () => {
      if (window.scrollY > 12) headerEl.setAttribute('data-scrolled', '');
      else headerEl.removeAttribute('data-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const createParticle = () => {
      const container = document.querySelector('.floating-particles');
      if (!container) return;
      const particle = document.createElement('div');
      const sizes = ['particle-small', 'particle-medium', 'particle-large'];
      const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
      particle.className = `particle ${randomSize}`;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.animationDuration = (8 + Math.random() * 4) + 's';
      particle.style.setProperty('--delay', Math.random() * 4 + 's');
      container.appendChild(particle);
      setTimeout(() => { if (particle.parentNode) { (particle.parentNode as HTMLElement).removeChild(particle); } }, 12000);
    };
    particleIntervalRef.current = setInterval(createParticle, 300);
    return () => { if (particleIntervalRef.current) clearInterval(particleIntervalRef.current); };
  }, [isMounted]);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />

      <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
        <div id="app-header" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pointer-events-auto transition-all duration-300 rounded-b-xl bg-transparent backdrop-blur-0 data-[scrolled]:bg-black/25 data-[scrolled]:backdrop-blur-[6px] data-[scrolled]:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between py-3.5">
            <a href="#" className="inline-flex items-center gap-3 group">
              <LogoKiwiQ className="h-8 w-8 sm:h-9 sm:w-9 transition-transform duration-200 ease-out group-hover:scale-[1.035] group-hover:-rotate-[0.5deg]" />
              <span className="hidden sm:inline text-white/90 group-hover:text-white transition-colors tracking-tight">KiwiQ.AI</span>
            </a>
            <style>{`.group:hover svg { filter: drop-shadow(0 0 6px rgba(148,216,45,0.35)); }`}</style>
            <div className="hidden md:flex items-center gap-4">
              {[
                { href: '#what-we-do', label: 'What we do' },
                { href: '#sprint', label: 'Sprint' },
                { href: '#bottom-line', label: 'Book a call' },
              ].map((l) => (
                <a key={l.href} href={l.href} className="relative text-sm text-zinc-300 hover:text-white transition-colors after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-0 after:bg-white/30 after:transition-all after:duration-200 hover:after:w-full">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grain-overlay" />
      <div className="floating-particles fixed inset-0 pointer-events-none z-0" />
      <div className="relative">{children}</div>
    </>
  );
}