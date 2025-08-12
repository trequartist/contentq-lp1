'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Section from '@/components/Section';
import Button from '@/components/Button';
import { Footer } from '@/components/ui/large-name-footer';
import { Stats } from '@/components/ui/stats-section';
import { HeroPill, StarIcon } from '@/components/ui/hero-pill';
import { HeroHeadline, SectionHeadline, Subheadline, BodyText, Caption } from '@/components/Typography';
import { staggerChildren, fadeInUp, cardEntrance } from '@/components/AnimationPrimitives';
import { CardSpotlight } from '@/components/ui/card-spotlight';
import { Testimonial } from '@/components/ui/testimonial';
import { useState, useEffect, useRef, useCallback } from 'react';
import WhatWeDoSection from '@/components/ui/what-we-do-section';
import { StatsWithText } from '@/components/ui/stats-section-with-text';
import { StatsNew } from '@/components/ui/stats-section-new';
import { HeroSection } from '@/components/ui/galaxy-interactive-hero-section';
import AuthoritySprintSection from '@/components/ui/authority-sprint';
import ResultsSection from '@/components/ui/results-section';
import WeSeeYouSection from '@/components/ui/we-see-you-section';

// Replace legacy hero with new interactive hero section

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);

  // Mount detection
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Statistics data for the pulse section
  const stats = [
    { 
      value: '13', 
      statText: 'number of pieces of content consumed by B2B buyers before sales',
      source: 'Forrester B2B Buyer Journey Report, 2024'
    },
    { 
      value: '1,500', 
      statText: 'AI scrapes your content this many times for every 1 visitor it sends back',
      source: 'OpenAI traffic analysis / Web scrape-to-visit ratios, 2024'
    },
    { 
      value: '89%', 
      statText: 'B2B buyers say executive thought leadership directly influences vendor selection',
      source: 'LinkedIn–Edelman B2B Thought Leadership Study, 2024'
    }
  ] as const;

  // Refs for animation management
  const statListRef = useRef<HTMLUListElement>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  // Animation functions
  const cycleStats = useCallback(() => {
    setCurrentStatIndex(prevIndex => (prevIndex + 1) % stats.length);
  }, [stats.length]);

  const startCycle = useCallback(() => {
    if (intervalIdRef.current) return; // Already running
    
    // Start interval
    intervalIdRef.current = setInterval(cycleStats, 3000);
  }, [cycleStats]);

  const pauseCycle = useCallback(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  }, []);

  const resumeCycle = useCallback(() => {
    startCycle();
  }, [startCycle]);

  // Set up intersection observer and hover events - client-only
  useEffect(() => {
    if (!isMounted) return;

    const section = document.querySelector('.shift-section');
    const statList = statListRef.current;
    
    if (!section || !statList) return;

    // Intersection Observer for viewport visibility
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCycle();
        } else {
          pauseCycle();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    // Hover events for pause/resume
    const handleMouseEnter = () => pauseCycle();
    const handleMouseLeave = () => resumeCycle();

    statList.addEventListener('mouseenter', handleMouseEnter);
    statList.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      observer.unobserve(section);
      statList.removeEventListener('mouseenter', handleMouseEnter);
      statList.removeEventListener('mouseleave', handleMouseLeave);
      pauseCycle();
    };
  }, [isMounted, startCycle, pauseCycle, resumeCycle]);

  return (
    <>
      <main className="relative overflow-x-hidden">
      {/* Hero Section - New Interactive version */}
      <HeroSection />

      {/* The Shift Section (restored copy, compact visuals) */}
      <Section variant="dark" className="shift-section" style={{ backgroundColor: '#001233' }}>
        <div className="space-y-6 max-w-6xl mx-auto text-center">
          <SectionHeadline>
            <span className="text-white">The shift is already here.</span>
            <div className="shift-underline"></div>
          </SectionHeadline>
          <StatsNew
            stats={stats.map((stat, index) => ({
              ...stat,
              trendDirection: (index % 2 === 0 ? 'up' : 'down') as 'up' | 'down',
              trend: index === 0 ? '+12%' : index === 1 ? '+15%' : '+8%'
            }))}
            currentStatIndex={currentStatIndex}
            colorMode="light"
          />
          <div className="shift-question">
            So where exactly are buyers finding you? Or your competitors?
          </div>
        </div>
      </Section>

      <WhatWeDoSection />

      {/* 90-Day Sprint Section */}
      <AuthoritySprintSection />

      {/* Testimonial Section */}
      <Section variant="dark" id="testimonial" className="lg:py-[60px] lg:px-[60px]" style={{ backgroundColor: '#001233' }}>
        <div className="max-w-6xl mx-auto">
          <Testimonial
            quote="We're a startup with a handful of customers, not thousands. That means we'll work harder for your success than anyone else—because our survival depends on it."
            authorName="Anish Acharya"
            authorPosition="CEO & Founder"
            className="py-0 text-white [&_p]:text-white [&_h5]:text-white/80 [&_h5:last-of-type]:text-white/60"
          />
        </div>
      </Section>

      {/* Results That Matter Section */}
      <ResultsSection />

      {/* We See You Section */}
      <WeSeeYouSection />

      {/* Bottom Line Section */}
      <Section variant="white" id="bottom-line" className="py-0">
        <CTA
          badge="The Future is Now"
          title="The Future of B2B Discovery is Being Written Right Now"
          subtitle="Will you define the playbook or follow it?"
          description="ContentQ helps you build authority that dominates Google, gets cited by AI, and built trust on LinkedIn."
          primaryButtonText="Start Building Authority – Free Trial"
          secondaryButtonText="Book 15‑Min Strategy Call"
        />
        <FounderVisionCard />
      </Section>

      {/* Footer */}
      <Footer />
      </main>
    </>
  );
}