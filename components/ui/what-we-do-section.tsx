"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import Button from "@/components/Button";
import { Brain, PenTool, Layers, BarChart3, ArrowRight } from "lucide-react";

// Lightweight LinkedIn and Blog icons
const LinkedInIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8.5h4.9V24H.5V8.5Zm7.5 0h4.7v2.12h.07c.65-1.23 2.24-2.52 4.6-2.52 4.92 0 5.83 3.24 5.83 7.46V24h-4.89v-6.8c0-1.62-.03-3.7-2.25-3.7-2.25 0-2.6 1.76-2.6 3.58V24H8V8.5Z" />
  </svg>
);

const BlogIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden>
    <path d="M4 5h16M4 10h16M4 15h10" strokeLinecap="round" />
    <rect x="3" y="3" width="18" height="18" rx="3" strokeOpacity=".8" />
  </svg>
);

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const services: Service[] = [
  {
    icon: <Brain className="h-6 w-6" />,
    title: "Predictive Intelligence",
    description:
      "Forecast what buyers will search and what AI will cite next—so you ship the right stories first.",
    features: [
      "Topic forecasting & gap maps",
      "AI citation preferences",
      "Search trend signals",
      "Persona discovery patterns",
    ],
    popular: true,
  },
  {
    icon: <PenTool className="h-6 w-6" />,
    title: "Strategic Storytelling",
    description:
      "Original research and founder POVs that get cited, remembered, and shared.",
    features: [
      "Executive thought leadership",
      "Research-backed narratives",
      "Editorial system & cadence",
      "Long-form + social cuts",
    ],
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Dual‑Channel Execution",
    description:
      "Founder voice + company authority—running in parallel from one system.",
    features: [
      "Founder posts (3–5/wk)",
      "Company articles (2–4/mo)",
      "Creative & design support",
      "Review loop with leadership",
    ],
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Visibility Tracking",
    description:
      "See what’s actually resonating—across AI answers, search, and social.",
    features: [
      "ChatGPT/Claude citation logs",
      "Google ranking movement",
      "Founder reach analytics",
      "Highlights & next actions",
    ],
  },
];

const CardShell: React.FC<{ children: React.ReactNode; highlight?: boolean }> = ({
  children,
  highlight,
}) => (
  <div
    className={
      "relative h-full rounded-2xl border backdrop-blur-md transition-all duration-300 " +
      (highlight
        ? "border-slate-200/70 bg-white/80 shadow-[0_12px_40px_rgba(148,216,45,0.12)]"
        : "border-slate-200/60 bg-white/70 hover:bg-white/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)]")
    }
  >
    {highlight && (
      <div className="pointer-events-none absolute -inset-1 rounded-3xl bg-[radial-gradient(600px_200px_at_20%_0%,rgba(148,216,45,0.08),transparent_60%)]" />
    )}
    <div className="relative z-10">{children}</div>
  </div>
);

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="py-16 sm:py-20 bg-gradient-to-b from-zinc-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-3 rounded-full border-slate-300/60 bg-white/80 text-slate-700 backdrop-blur-sm">
            What We Do
          </Badge>
          <h2 className="text-2xl md:text-4xl font-semibold text-slate-900 mb-3">
            What We Actually Do
          </h2>
          <p className="text-slate-700 max-w-3xl mx-auto text-base">
            We don't just write about what you know. We help you know what to
            write about.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <CardShell key={idx} highlight={svc.popular}>
              <div className="p-6 h-full flex flex-col">
                <div className="mb-4 p-3 rounded-lg bg-white/70 border border-slate-200/70 w-fit transition-colors duration-300">
                  <div className="text-[#94D82D] transition-transform duration-300">
                    {svc.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {svc.title}
                </h3>
                {svc.title === "Dual‑Channel Execution" && (
                  <div className="mt-1 mb-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700">
                      <BlogIcon className="h-4 w-4 text-[#94D82D]" /> Company Blog
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-700">
                      <LinkedInIcon className="h-4 w-4 text-[#0A66C2]" /> Founder LinkedIn
                    </span>
                  </div>
                )}
                <p className="text-slate-700 mb-4 flex-grow text-sm">
                  {svc.description}
                </p>
                <ul className="space-y-2 mb-5">
                  {svc.features.map((f, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-700">
                      {svc.title === "Dual‑Channel Execution" && i < 2 ? (
                        i === 0 ? (
                          <LinkedInIcon className="h-4 w-4 text-[#0A66C2] mr-2" />
                        ) : (
                          <BlogIcon className="h-4 w-4 text-[#94D82D] mr-2" />
                        )
                      ) : (
                        <span className="w-1.5 h-1.5 bg-[#94D82D] rounded-full mr-3 flex-shrink-0"></span>
                      )}
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant="secondary">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardShell>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-700 mb-4">Ready to build authority everywhere buyers look?</p>
          <Button size="lg" className="px-8">
            Start Compounding
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
} 