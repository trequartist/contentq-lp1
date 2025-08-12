"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import type { Variants } from "framer-motion";
import Section from "@/components/Section";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Check,
  CheckCircle,
  Target,
  TrendingUp,
  Zap,
  Brain,
  Users,
} from "lucide-react";

// Types
interface PlanStep {
  step: number;
  badge: string;
  title: string;
  timeCommitment: string;
  description: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>; // allow string size
  color: string;
  features: string[];
  duration: string;
}

const planSteps: PlanStep[] = [
  {
    step: 0,
    badge: "01",
    title: "Foundation",
    timeCommitment: "Your time commitment: 2 hours total",
    description:
      "A systematic approach to building content authority across AI, search, and social platforms.",
    icon: Target,
    color: "from-blue-500/20 to-indigo-500/20",
    features: [
      "Deep-dive strategy session to capture your voice",
      "AI system learns your unique perspective and style",
      "First authority assets: blog content + LinkedIn posts",
    ],
    duration: "Month 1",
  },
  {
    step: 1,
    badge: "02",
    title: "Momentum",
    timeCommitment: "Your time commitment: 1 hour per week",
    description:
      "Launch coordinated content campaigns optimized for maximum reach and engagement across all platforms.",
    icon: TrendingUp,
    color: "from-purple-500/20 to-pink-500/20",
    features: [
      "Launch coordinated content campaigns",
      "Content optimized for search and AI discovery",
      "Establish thought leadership in key topics",
    ],
    duration: "Month 2",
  },
  {
    step: 2,
    badge: "03",
    title: "Scale",
    timeCommitment: "Your time commitment: 30 minutes per week",
    description:
      "Automated content system running smoothly with measurable authority growth across all platforms.",
    icon: Zap,
    color: "from-emerald-500/20 to-teal-500/20",
    features: [
      "Automated content system running smoothly",
      "Measurable authority growth across platforms",
      "Self-reinforcing content ecosystem established",
    ],
    duration: "Month 3",
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: cubicBezier(0.23, 0.86, 0.39, 0.96) },
  },
};

export function AuthoritySprintSection(): JSX.Element {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const id = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % planSteps.length);
    }, 4500);
    return () => clearInterval(id);
  }, [isAutoPlaying]);

  const current = useMemo(() => planSteps[currentStep], [currentStep]);

  const handleSelect = useCallback((idx: number) => setCurrentStep(idx), []);

  return (
    <Section
      variant="dark"
      id="sprint"
      className="py-2 lg:py-[60px] lg:px-[60px] relative overflow-hidden"
      style={{ backgroundColor: "#001233" }}
    >
      {/* Subtle animated background tint */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(600px 300px at 15% 10%, rgba(148,216,45,0.25), transparent 60%), radial-gradient(600px 300px at 85% 90%, rgba(0,180,150,0.18), transparent 60%)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="relative z-10 space-y-12">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <Calendar className="h-4 w-4 text-white/80" />
            <span className="text-sm font-semibold tracking-wide text-white/80">
              90-Day Authority Sprint
            </span>
            <div className="w-2 h-2 rounded-full bg-[#94D82D] shadow-[0_0_12px_rgba(148,216,45,0.8)]" />
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-white">
            Your 90-Day Authority Sprint
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            A systematic approach to building content authority across AI, search, and social platforms
          </p>
        </motion.div>

        {/* Technology Foundation - moved to top, centered, wider, more pop */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto w-full max-w-6xl rounded-3xl p-8 md:p-10 border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.35)] ring-1 ring-white/15"
        >
          {/* soft gradient wash */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-40" style={{
            backgroundImage:
              "radial-gradient(800px 300px at 20% 0%, rgba(148,216,45,0.18), transparent 60%), radial-gradient(800px 300px at 80% 100%, rgba(0,180,150,0.14), transparent 60%)"
          }} />

          <div className="relative z-10 text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-sm mb-4">
              <div className="w-2 h-2 bg-[#94D82D] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-white/90">Technology Foundation</span>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold text-white mb-3">Powered by AI + Human Expertise</h3>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">A balanced system combining AI with human creativity and strategy.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* AI */}
            <div className="relative rounded-2xl p-6 md:p-8 border-2 border-blue-400/30 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-indigo-500/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/20">
                    <Brain className="w-7 h-7 text-blue-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">AI Intelligence</h4>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Multi-agent system trained on 500K+ B2B content pieces with persistent memory of your business
                </p>
              </div>
            </div>

            {/* Human */}
            <div className="relative rounded-2xl p-6 md:p-8 border-2 border-emerald-400/30 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-green-500/15 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20">
                    <Users className="w-7 h-7 text-emerald-300" />
                  </div>
                  <h4 className="text-xl font-semibold text-white">Human Experts</h4>
                </div>
                <p className="text-white/90 leading-relaxed">
                  Dedicated strategists who add nuance, story, and strategic thinking that AI can't replicate
                </p>
              </div>
            </div>
          </div>


        </motion.div>

        {/* Stepper */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {planSteps.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => handleSelect(idx)}
              className={cn(
                "relative rounded-2xl border backdrop-blur-md transition-all duration-300 text-left",
                "p-5 focus:outline-none",
                idx === currentStep
                  ? "border-white/20 bg-white/10 shadow-[0_12px_40px_rgba(148,216,45,0.15)]"
                  : "border-white/10 bg-white/5 hover:bg-white/10 hover:shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              )}
            >
              <div className="flex items-start gap-4">
                <div className={cn("p-3 rounded-xl bg-gradient-to-br border border-white/10", step.color)}>
                  <span className="text-xl font-bold text-white/90">{step.badge}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[#94D82D] font-semibold mb-1">{step.duration}</div>
                  <div className="text-white font-semibold">{step.title}</div>
                  <div className="text-white/70 text-xs mt-1">{step.timeCommitment}</div>
                </div>
                {idx < currentStep ? (
                  <CheckCircle className="w-5 h-5 text-[#94D82D]" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20" />
                )}
              </div>
            </button>
          ))}
        </motion.div>

        {/* Content Panel (single column now) */}
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
              >
                <div className="flex items-start gap-5 mb-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10">
                    <current.icon className="w-7 h-7 text-[#94D82D]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#94D82D] font-semibold mb-1">{current.duration}</div>
                    <h3 className="text-xl font-semibold text-white mb-1">{current.title}</h3>
                    <p className="text-white/75 text-sm">{current.timeCommitment}</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed mb-4">{current.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {current.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                    >
                      <Check className="w-4 h-4 text-[#94D82D]" />
                      <span className="text-white/90 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Auto-play control */}
            <button
              onClick={() => setIsAutoPlaying((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              {isAutoPlaying ? (
                <>
                  <div className="w-2 h-2 bg-[#94D82D] rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white/90">Auto-playing</span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-white/30 rounded-full" />
                  <span className="text-sm font-medium text-white/90">Paused</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default AuthoritySprintSection; 