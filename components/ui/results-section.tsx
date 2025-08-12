"use client";

import React, { useEffect, useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import Section from "@/components/Section";
import { SectionHeadline } from "@/components/Typography";
import { cn } from "@/lib/utils";
import { TrendingUp, Globe, Zap, BarChart3, ArrowUpRight, Award } from "lucide-react";

type Trend = "up" | "down";

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  valueDisplay: string;
  countTo?: number; // optional numeric counter
  suffix?: string; // e.g. "%" or "+"
  trend?: Trend;
  changeLabel?: string; // e.g. "+12%"
  delay?: number;
}

const ease = cubicBezier(0.23, 0.86, 0.39, 0.96);

function MetricCard({ icon, label, valueDisplay, countTo, suffix = "", trend = "up", changeLabel, delay = 0 }: MetricCardProps): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof countTo !== "number") return;
    const totalSteps = 40;
    const step = countTo / totalSteps;
    const timer = setTimeout(() => {
      const id = setInterval(() => {
        setCount((prev) => {
          const next = prev + step;
          if (next >= countTo) {
            clearInterval(id);
            return countTo;
          }
          return next;
        });
      }, 24);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [countTo, delay]);

  const displayValue = typeof countTo === "number" ? `${Math.round(count)}${suffix}` : valueDisplay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease, delay }}
      whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6",
        "border border-slate-200/60 bg-white/70 backdrop-blur-md",
        "shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)]"
      )}
    >
      {/* hover wash */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(600px_200px_at_20%_0%, rgba(148,216,45,0.08), transparent_60%), radial-gradient(600px_200px_at_80%_100%, rgba(0,180,150,0.06), transparent_60%)",
        }}
      />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl border border-slate-200/70 bg-white/80 flex items-center justify-center mb-4 text-[#94D82D]">
          {icon}
        </div>
        <div className="text-3xl font-semibold tracking-tight text-slate-900 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)] mb-1">
          {displayValue}
        </div>
        <div className="text-slate-600 text-sm mb-4">{label}</div>
        {changeLabel && (
          <div
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
              trend === "up"
                ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-700 border border-rose-500/20"
            )}
          >
            <ArrowUpRight className={cn("w-3 h-3", trend === "down" && "rotate-90")} />
            {changeLabel}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ResultsSection(): JSX.Element {
  const metrics: MetricCardProps[] = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      valueDisplay: "+200%",
      suffix: "%",
      countTo: 200,
      label: "more organic traffic (2–3x)",
      trend: "up",
      changeLabel: "+200%",
      delay: 0.2,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      valueDisplay: "First citations",
      label: "appearing in ChatGPT & Claude",
      trend: "up",
      delay: 0.3,
    },
    {
      icon: <Award className="w-6 h-6" />,
      valueDisplay: "5x",
      label: "engagement growth on LinkedIn",
      trend: "up",
      delay: 0.4,
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      valueDisplay: "New SQLs",
      label: "from content that compounds",
      trend: "up",
      delay: 0.5,
    },
  ];

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
          <p className="text-slate-600 max-w-3xl mx-auto mt-2">
            Outcomes compound across AI, search, and social—measured in visibility, engagement, and pipeline.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease }}
        >
          {metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </motion.div>

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
} 