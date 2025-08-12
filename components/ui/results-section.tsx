"use client";

import { motion } from 'framer-motion';
import Section from '../Section';
import { SectionHeadline, BodyText } from '../Typography';
import { ResultsCardsWithHover } from './results-cards-with-hover';

export default function ResultsSection() {
  return (
    <Section
      variant="white"
      id="results"
      className="relative lg:py-[60px] lg:px-[60px] overflow-hidden bg-gradient-to-b from-zinc-50 to-white"
    >
      {/* subtle metallic radial accents */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(900px_360px_at_10%_-10%, rgba(148,216,45,0.10), transparent_60%), radial-gradient(900px_360px_at_90%_110%, rgba(0,180,150,0.08), transparent_60%)",
          backgroundSize: "200%_200%",
        }}
      />

      <div className="relative z-10 space-y-10">
        <div className="text-center">
          <SectionHeadline>
            <span className="text-slate-900">What Success Actually Looks Like</span>
          </SectionHeadline>
          <BodyText className="text-slate-600 max-w-3xl mx-auto mt-2">
            Outcomes compound across AI, search, and social—measured in visibility, engagement, and pipeline.
          </BodyText>
        </div>

        {/* Results Cards with Hover Effects */}
        <ResultsCardsWithHover />

        {/* subtle bottom CTA ribbon */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#94D82D] animate-pulse" />
            <span className="text-sm text-slate-700">The compound effect starts in 90 days</span>
          </div>
        </div>
      </div>
    </Section>
  );
      <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">