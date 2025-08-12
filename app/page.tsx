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
import { HeroSection } from '@/components/ui/galaxy-interactive-hero-section';
import AuthoritySprintSection from '@/components/ui/authority-sprint';
import ResultsSection from '@/components/ui/results-section';
import WeSeeYouSection from '@/components/ui/we-see-you-section';

// Replace legacy hero with new interactive hero section

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedFounder, setExpandedFounder] = useState(false);
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
          <Stats
            stats={stats.map((stat, index) => ({
              ...stat,
              trendDirection: index % 2 === 0 ? 'up' : 'down',
              trend: index === 0 ? '+12%' : index === 1 ? '+15%' : index === 2 ? '+8%' : '+5%'
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
      <Section variant="white" id="bottom-line" className="lg:py-[60px] lg:px-[60px]">
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <SectionHeadline>
              The Future of B2B Discovery is Being Written Right Now
            </SectionHeadline>
            <BodyText className="text-xl max-w-3xl mx-auto text-slate-700">
              Will you define the playbook or follow it?
            </BodyText>
            <div className="max-w-5xl mx-auto rounded-3xl border border-slate-200/70 bg-white/80 backdrop-blur-md p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <p className="text-2xl md:text-3xl font-semibold text-slate-900">
                ContentQ helps you build authority that dominates Google, gets cited by AI, and built trust on LinkedIn.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" showArrow>
              Start Building Authority – Free Trial
            </Button>
            <Button variant="secondary" size="lg">
              Book 15‑Min Strategy Call
            </Button>
          </div>

          {/* Focus overlay when expanded */}
          {expandedFounder && (
            <div className="fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300"></div>
          )}

          {/* Founder note card (glass, subtle kiwi accent) */}
          <motion.div
            variants={fadeInUp}
            className={cn(
              "relative max-w-4xl mx-auto mt-14 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-md p-8",
              expandedFounder ? "z-[70]" : "z-10"
            )}
          >
            <span className="absolute -top-3 right-4 inline-flex items-center gap-2 rounded-full bg-[#94D82D] text-white px-3 py-1 text-xs font-semibold shadow-sm">
              Founder’s Vision
            </span>
            <div className="space-y-4 text-slate-800">
              {/* Visible Content */}
              <BodyText>
                <span className="font-medium">💭 Why We Built This</span>
              </BodyText>
              <BodyText>
                "We're building AI that actually knows you. Most people don't realize what's possible yet. AI can be so much more than a writing assistant. We're building systems with actual memory — that learn your voice, carry your context, and get smarter about your business every single day. Raunak led ML at Google Gemini. I've been obsessed with storytelling for years."
              </BodyText>

              {/* Toggle */}
              {!expandedFounder && (
                <button
                  onClick={() => setExpandedFounder(true)}
                  className="group inline-flex items-center gap-2 text-[#94D82D] font-medium"
                >
                  Continue reading
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              )}

              {/* Expanded Content */}
              <div className={cn(
                "transition-all duration-300 ease-linear overflow-hidden",
                expandedFounder ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
              )}>
                <div className="space-y-4 pt-2">
                  <BodyText>
                    "We're building AI that actually knows you. Most people don't realize what's possible yet. AI can be so much more than a writing assistant. We're building systems with actual memory — that learn your voice, carry your context, and get smarter about your business every single day. Raunak led ML at Google Gemini. I've been obsessed with storytelling for years."
                  </BodyText>
                  <BodyText>
                    Here's what we realized: Telling your story effectively takes massive expertise and bandwidth. You need to understand every platform's language, every algorithm's preference, every audience's context. Few have the bandwidth to do this, and fewer still have the multi-platform expertise to do it right. That's where real AI intelligence changes everything — it becomes the bridge between what you know and what gets heard.
                  </BodyText>
                  <BodyText>
                    ContentQ is teammate #1. It builds your knowledge graph and uses that intelligence to tell your story authentically across every channel that matters. But we're just getting started. We're building AI that doesn't just execute tasks — it thinks with you, sees patterns you miss, and helps you articulate things you couldn't quite put into words.
                  </BodyText>
                  <BodyText>
                    The future belongs to companies that truly understand their customers and can tell stories that move them. We're building the AI to make that happen. Ready?
                  </BodyText>
                  <button
                    onClick={() => setExpandedFounder(false)}
                    className="mt-2 inline-flex items-center gap-2 text-[#94D82D] font-medium"
                  >
                    Show less
                    <span className="transition-transform duration-300">↑</span>
                  </button>
                </div>
              </div>

              {/* Signature pinned bottom */}
              <BodyText className="text-slate-500">— Anish, CEO (with Raunak, CTO)</BodyText>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <Footer />
      </main>
    </>
  );
}