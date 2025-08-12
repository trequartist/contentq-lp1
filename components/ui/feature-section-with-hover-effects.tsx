import { cn } from "@/lib/utils";
import {
  IconBrain,
  IconPencil,
  IconUsers,
  IconEye,
  IconTrendingUp,
  IconSearch,
  IconShare,
  IconChartBar,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Predictive Intelligence",
      description:
        "Forecast what buyers will search and what AI will cite next—so you ship the right stories first.",
      icon: <IconBrain />,
      details: [
        "Topic forecasting & gap maps",
        "AI citation preferences", 
        "Search trend signals",
        "Persona discovery patterns"
      ]
    },
    {
      title: "Strategic Storytelling",
      description:
        "Original research and founder POVs that get cited, remembered, and shared.",
      icon: <IconPencil />,
      details: [
        "Executive thought leadership",
        "Research-backed narratives",
        "Editorial system & cadence", 
        "Long-form + social cuts"
      ]
    },
    {
      title: "Dual‑Channel Execution",
      description:
        "Founder voice + company authority—running in parallel from one system.",
      icon: <IconUsers />,
      details: [
        "Founder posts (3–5/wk)",
        "Company articles (2–4/mo)",
        "Creative & design support",
        "Review loop with leadership"
      ]
    },
    {
      title: "Visibility Tracking",
      description:
        "See what's actually resonating—across AI answers, search, and social.",
      icon: <IconEye />,
      details: [
        "ChatGPT/Claude citation logs",
        "Google ranking movement", 
        "Founder reach analytics",
        "Highlights & next actions"
      ]
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  details,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-white/10",
        (index === 0 || index === 4) && "lg:border-l border-white/10",
        index < 2 && "lg:border-b border-white/10"
      )}
    >
      {index < 2 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#94D82D]/5 to-transparent pointer-events-none" />
      )}
      {index >= 2 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#94D82D]/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-white/60 group-hover/feature:text-[#94D82D] transition-colors duration-200">
        <div className="w-8 h-8">
          {icon}
        </div>
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-[#94D82D] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-white/70 max-w-xs relative z-10 px-10 mb-4 group-hover/feature:text-white/90 transition-colors duration-200">
        {description}
      </p>
      <ul className="text-xs text-white/50 relative z-10 px-10 space-y-1 group-hover/feature:text-white/70 transition-colors duration-200">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-center">
            <span className="w-1 h-1 bg-[#94D82D] rounded-full mr-2 opacity-60 group-hover/feature:opacity-100 transition-opacity duration-200"></span>
            {detail}
          </li>
        ))}
      </ul>
      <div className="mt-6 px-10 relative z-10">
        <button className="text-xs text-[#94D82D] hover:text-white transition-colors duration-200 font-medium opacity-0 group-hover/feature:opacity-100 transform translate-y-2 group-hover/feature:translate-y-0 transition-all duration-200">
          Learn More →
        </button>
      </div>
    </div>
  );
};