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

// Dynamic import for client-only component - prevents SSR hydration issues
const DigitalSerenity = dynamic(
  () => import('@/components/ui/digital-serenity-animated-landing-page'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }
);

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
      value: '73%', 
      statText: 'of B2B buyers start with AI now'
    },
    { 
      value: '800%', 
      statText: 'growth in AI-driven discovery this year'
    },
    { 
      value: '67%', 
      statText: 'trust LinkedIn peers over vendor content'
    },
    { 
      value: '3.2x', 
      statText: 'more likely to buy when you\'re everywhere'
    }
  ];

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
      {/* Hero Section - Dynamic import prevents hydration issues */}
      <DigitalSerenity />

      {/* The Shift Section */}
      <Section variant="dark" className="shift-section" style={{ backgroundColor: '#001233' }}>
        <div className="space-y-12 max-w-6xl mx-auto text-center">
          <SectionHeadline>
            <span className="text-white">The shift is already here.</span>
            <div className="shift-underline"></div>
          </SectionHeadline>
          {/* Enhanced Stats Component */}
          <Stats 
            stats={stats.map((stat, index) => ({
              ...stat,
              trendDirection: index % 2 === 0 ? 'up' : 'down',
              trend: index === 0 ? '+12%' : index === 1 ? '+15%' : index === 2 ? '+8%' : '+5%'
            }))} 
            currentStatIndex={currentStatIndex}
          />
          
          <div className="shift-question">
            So where exactly are buyers finding you? Or your competitors?
          </div>
        </div>
      </Section>


      {/* What We Actually Do Section */}
      <Section variant="dark" id="what-we-do" className="py-2 lg:py-[60px] lg:px-[60px]" style={{ backgroundColor: '#001233' }}>
        <div className="space-y-3 max-w-6xl mx-auto">
          <div className="text-center space-y-1 mb-1">
            <SectionHeadline>
              <span className="text-white">What We Actually Do</span>
            </SectionHeadline>
            <BodyText className="max-w-3xl mx-auto text-white/80 text-base">
              <span className="text-white/90">We don't just write about what you know. We help you know what to write about.</span>
            </BodyText>
          </div>
          
          {/* Metrics Pills */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, 0.6, 0.4, 1] }}
          >
            <HeroPill
              icon={<StarIcon />}
              text="Built by ex-Google Gemini ML lead"
              className="mb-0"
            />
            <HeroPill
              icon={<StarIcon />}
              text="500K+ B2B content pieces analyzed"
              className="mb-0"
            />
            <HeroPill
              icon={<StarIcon />}
              text="Trained on what actually gets cited"
              className="mb-0"
            />
          </motion.div>
          
          {/* Premium Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
            {[
              {
                title: 'Predictive Intelligence',
                description: 'Next quarter\'s trending searches, ChatGPT\'s citation preferences, untapped content opportunities',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: 'Strategic Storytelling',
                description: 'Original research articles, executive thought pieces, industry perspective posts',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ),
              },
              {
                title: 'Dual-Channel Execution',
                description: 'Your Founder Voice: 3-5 posts/week in your style. Company Authority: 2-4 long-form articles/month',
                icon: (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                ),
              },
              {
                title: 'Visibility Tracking',
                description: 'Screenshots of ChatGPT citing you, Google ranking reports, LinkedIn reach analytics',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col lg:border-r py-10 relative group/feature border-white/20",
                  (index === 0 || index === 4) && "lg:border-l border-white/20",
                  index < 4 && "lg:border-b border-white/20"
                )}
              >
                {index < 4 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                )}
                {index >= 4 && (
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                )}
                <div className="mb-4 relative z-10 px-10 text-white/60">
                  {feature.icon}
                </div>
                <div className="text-lg font-bold mb-2 relative z-10 px-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/30 group-hover/feature:bg-accent-kiwi transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
                    {feature.title}
                  </span>
                </div>
                <p className="text-sm text-white/70 max-w-xs relative z-10 px-10">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* System Description */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-1"
          >
            <BodyText className="max-w-3xl mx-auto text-white/80 leading-relaxed text-sm">
              We don't just use AI—we built AI specifically for B2B content authority. We know exactly what content gets cited, and we deliver it through the channels that matter.
            </BodyText>
          </motion.div>
          
          {/* Premium Pull Quote */}
          <motion.div 
            variants={fadeInUp} 
            className="text-center mt-1"
          >
            <HeroPill
              icon={<StarIcon />}
              text="We bring the intelligence. You bring the expertise. Together, we build the authority."
              className="mb-0 mx-auto max-w-4xl"
              animate={false}
            />
          </motion.div>
        </div>
      </Section>

      {/* 90-Day Sprint Section */}
      <Section variant="dark" id="sprint" className="py-2 lg:py-[60px] lg:px-[60px]" style={{ backgroundColor: '#001233' }}>
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <SectionHeadline>
              <span className="text-white">Your 90-Day Authority Sprint</span>
            </SectionHeadline>
            <BodyText className="max-w-2xl mx-auto text-white/80">
              A systematic approach to building content authority across AI, search, and social platforms
            </BodyText>
          </div>
          
          {/* Clean Month Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
            {[
              {
                number: '01',
                title: 'Month 1: Foundation',
                timeCommitment: 'Your time commitment: 2 hours total',
                items: [
                  'Deep-dive strategy session to capture your voice',
                  'AI system learns your unique perspective and style',
                  'First authority assets: blog content + LinkedIn posts'
                ],
                icon: (
                  <div className="w-8 h-8 rounded-full bg-accent-kiwi/20 flex items-center justify-center text-accent-kiwi font-bold text-lg">
                    01
                  </div>
                ),
              },
              {
                number: '02',
                title: 'Month 2: Momentum',
                timeCommitment: 'Your time commitment: 1 hour per week',
                items: [
                  'Launch coordinated content campaigns',
                  'Content optimized for search and AI discovery',
                  'Establish thought leadership in key topics'
                ],
                icon: (
                  <div className="w-8 h-8 rounded-full bg-accent-kiwi/20 flex items-center justify-center text-accent-kiwi font-bold text-lg">
                    02
                  </div>
                ),
              },
              {
                number: '03',
                title: 'Month 3: Scale',
                timeCommitment: 'Your time commitment: 30 minutes per week',
                items: [
                  'Automated content system running smoothly',
                  'Measurable authority growth across platforms',
                  'Self-reinforcing content ecosystem established'
                ],
                icon: (
                  <div className="w-8 h-8 rounded-full bg-accent-kiwi/20 flex items-center justify-center text-accent-kiwi font-bold text-lg">
                    03
                  </div>
                ),
              }
            ].map((month, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col lg:border-r py-10 relative group/feature border-white/20",
                  index === 0 && "lg:border-l border-white/20",
                  "lg:border-b border-white/20"
                )}
              >
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
                <div className="mb-4 relative z-10 px-10 text-white/60">
                  {month.icon}
                </div>
                <div className="text-lg font-bold mb-2 relative z-10 px-10">
                  <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/30 group-hover/feature:bg-accent-kiwi transition-all duration-200 origin-center" />
                  <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
                    {month.title}
                  </span>
                </div>
                <p className="text-sm text-white/70 mb-4 relative z-10 px-10">
                  {month.timeCommitment}
                </p>
                <ul className="space-y-2 relative z-10 px-10">
                  {month.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-kiwi mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Clean Tech + Team Section */}
          <motion.div 
            variants={fadeInUp}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <SectionHeadline>
                <span className="text-white">Powered by AI + Human Expertise</span>
              </SectionHeadline>
            </div>
            <div className="grid md:grid-cols-2 gap-6 w-full">
              <CardSpotlight className="h-auto w-full border-white/20 bg-slate-900/50">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-blue-400 mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white relative z-20">AI Intelligence</h4>
                </div>
                <p className="text-white/80 relative z-20 leading-relaxed">
                  Multi-agent system trained on 500K+ B2B content pieces with persistent memory of your business
                </p>
              </CardSpotlight>
              
              <CardSpotlight className="h-auto w-full border-white/20 bg-slate-900/50">
                <div className="flex items-center mb-4">
                  <svg className="w-8 h-8 text-purple-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                  <h4 className="text-xl font-bold text-white relative z-20">Human Experts</h4>
                </div>
                <p className="text-white/80 relative z-20 leading-relaxed">
                  Dedicated strategists who add nuance, story, and strategic thinking that AI can't replicate
                </p>
              </CardSpotlight>
            </div>
          </motion.div>
        </div>
      </Section>

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
      <Section variant="white" id="results" className="lg:py-[60px] lg:px-[60px]">
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center">
            <SectionHeadline>
              What Success Actually Looks Like
            </SectionHeadline>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: '🔍', metric: '2-3x', desc: 'more organic traffic', detail: 'Your content climbing Google rankings' },
              { icon: '🤖', metric: 'First citations', desc: 'appearing', detail: 'Getting recommended by ChatGPT & Claude' },
              { icon: '💼', metric: '5x', desc: 'engagement growth', detail: 'Building real thought leadership' },
              { icon: '💰', metric: 'New SQLs', desc: 'from content', detail: 'Buyers finding you, not vice versa' }
            ].map((result, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(148, 216, 45, 0.08) 0%, rgba(255, 255, 255, 1) 100%)' 
                }}
                variants={cardEntrance}
                whileHover={{ y: -4 }}
              >
                <div className="text-4xl mb-4">{result.icon}</div>
                <div className="text-4xl font-bold mb-2" style={{ color: '#94D82D' }}>{result.metric}</div>
                <div className="text-xl font-medium text-primary mb-2">{result.desc}</div>
                <BodyText className="text-secondary">{result.detail}</BodyText>
              </motion.div>
            ))}
          </div>
          
          {/* The Compound Effect */}
          <motion.div variants={fadeInUp} className="mt-16 text-center">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-5">
                <svg width="200" height="100" viewBox="0 0 200 100" className="text-accent-kiwi">
                  <path d="M10 80 Q 100 20 190 40" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              {[
                'Month 1-3: Foundation laid',
                'Month 4-6: Momentum building',
                'Month 7+: Authority compounding'
              ].map((phase, index) => (
                <div key={index} className="flex items-center relative z-10">
                  <div className="bg-accent-kiwi/10 border border-accent-kiwi/30 rounded-lg px-4 py-2">
                    <span className="font-medium text-primary">{phase}</span>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block mx-4 text-accent-kiwi text-2xl">→</div>
                  )}
                </div>
              ))}
            </div>
            <BodyText className="text-xl max-w-3xl mx-auto mb-8">
              While competitors start from zero each month, every piece you publish makes your entire library stronger.
            </BodyText>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" showArrow>
                Start Compounding
              </Button>
              <Button variant="secondary" size="lg">
                Book Strategy Call
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* We See You Section */}
      <Section variant="warm" id="we-see-you" className="lg:py-[60px] lg:px-[60px]" style={{ backgroundColor: '#001233' }}>
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center">
            <SectionHeadline>
              <span className="text-white">We See You</span>
            </SectionHeadline>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'The Founder Who Owns It All',
                subtitle: 'Content is critical but you\'re already stretched...',
                problems: [
                  'Company blog needs your expertise',
                  'LinkedIn presence expected',
                  'No bandwidth to build the system'
                ],
                solution: 'We handle it: We build your complete content system—from company blog to founder thought leadership—powered by your insights, not your time'
              },
              {
                title: 'The Marketer Under Pressure',
                subtitle: 'You\'re fighting on all fronts...',
                problems: [
                  'Prove ROI yesterday',
                  'Compete with AI spam',
                  'Limited resources'
                ],
                solution: 'We deliver: Campaigns that convert with clear attribution'
              },
              {
                title: 'The Consultant Juggling Everything',
                subtitle: 'You\'re scaling but...',
                problems: [
                  'Multiple client voices',
                  'Quality vs. speed',
                  'Proving value'
                ],
                solution: 'We enable: Authentic content at scale for every client'
              }
            ].map((persona, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 relative"
                variants={cardEntrance}
                whileHover={{ y: -4 }}
              >
                <div className="p-8 relative">
                  {/* Split background effect */}
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 bg-red-50/30"></div>
                    <div className="w-1/2 bg-green-50/30"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <Subheadline className="mb-2">{persona.title}</Subheadline>
                    <BodyText className="text-secondary mb-6">{persona.subtitle}</BodyText>
                    
                    {/* Problems */}
                    <div className="bg-red-50/50 p-4 rounded-lg mb-4 border-l-4 border-red-200">
                      <ul className="space-y-2">
                        {persona.problems.map((problem, problemIndex) => (
                          <li key={problemIndex} className="flex items-start gap-2">
                            <span className="text-red-600 text-xl mt-0.5 flex-shrink-0">❌</span>
                            <BodyText className="text-red-800 text-sm">{problem}</BodyText>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Solution */}
                    <div className="bg-green-50/50 p-4 rounded-lg border-l-4 border-green-200">
                      <div className="flex items-start gap-2">
                        <span className="text-green-600 text-xl mt-0.5 flex-shrink-0">✅</span>
                        <BodyText className="text-green-800 text-sm">{persona.solution}</BodyText>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <BodyText className="text-xl mb-6">Ready to breathe easier?</BodyText>
            <Button variant="primary" size="lg" showArrow>
              Chat With Us
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Bottom Line Section */}
      <Section variant="white" id="bottom-line" className="lg:py-[60px] lg:px-[60px]">
        <div className="space-y-12 max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <SectionHeadline>
              The Future of B2B Discovery is Being Written Right Now
            </SectionHeadline>
            <BodyText className="text-xl max-w-3xl mx-auto">
              Will you define the playbook or follow it?
            </BodyText>
            <BodyText className="text-2xl max-w-4xl mx-auto font-medium">
              ContentQ exists to make you a pioneer—building authority that dominates Google, gets cited by AI, and spreads on LinkedIn.
            </BodyText>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" showArrow>
              Start Building Authority - Free Trial
            </Button>
            <Button variant="secondary" size="lg">
              Book 15-Min Strategy Call
            </Button>
          </div>
          
          {/* Founder's Note */}
          <motion.div 
            variants={fadeInUp}
            className="p-8 rounded-xl shadow-md relative transform rotate-1 hover:rotate-0 transition-transform duration-300 max-w-4xl mx-auto mt-16"
            style={{ backgroundColor: '#F8F8F6' }}
          >
            <div className="absolute top-4 right-4">
              <span className="bg-accent-kiwi text-white px-3 py-1 rounded-full text-sm font-medium">
                Founder's Vision
              </span>
            </div>
            
            <div className="space-y-4">
              <BodyText>
                "I've been thinking about this problem for years. How do you build real authority in a world where everyone's fighting for attention?"
              </BodyText>
              
              <button
                onClick={() => setExpandedFounder(!expandedFounder)}
                className="text-accent-kiwi font-medium hover:underline"
              >
                {expandedFounder ? 'Read less' : 'Read more...'}
              </button>
              
              <div className={`space-y-4 transition-all duration-300 ${expandedFounder ? 'opacity-100 max-h-none' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                {expandedFounder && (
                  <>
                    <BodyText>
                      "The answer isn't more content. It's smarter content. Content that understands where your buyers are looking, what they're asking, and how to position you as the definitive answer."
                    </BodyText>
                    <BodyText>
                      "That's what we're building. Not just another content tool, but a system that becomes an extension of your expertise. One that gets smarter about your industry, your voice, your audience with every piece of content it helps create."
                    </BodyText>
                    <BodyText>
                      "We're not trying to replace human insight - we're trying to amplify it. To give you the intelligence and scale you need to build real authority in a world where everyone else is just following templates."
                    </BodyText>
                  </>
                )}
              </div>
            </div>
            
            <Caption className="text-secondary mt-4">
              —Anish Acharya, CEO & Founder
            </Caption>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <Footer />
      </main>
    </>
  );
}