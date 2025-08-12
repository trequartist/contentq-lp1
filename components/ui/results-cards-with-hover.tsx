import { cn } from "@/lib/utils";
import {
  IconTrendingUp,
  IconRobot,
  IconUsers,
  IconTarget,
} from "@tabler/icons-react";

export function ResultsCardsWithHover() {
  const results = [
    {
      metric: "200%",
      title: "More Organic Traffic",
      description: "2–3x increase in qualified organic search traffic",
      icon: <IconTrendingUp className="w-8 h-8" />,
    },
    {
      metric: "+200%",
      title: "First Citations",
      description: "Appearing in ChatGPT & Claude responses",
      icon: <IconRobot className="w-8 h-8" />,
    },
    {
      metric: "5x",
      title: "Engagement Growth",
      description: "LinkedIn engagement and reach expansion",
      icon: <IconUsers className="w-8 h-8" />,
    },
    {
      metric: "New SQLs",
      title: "From Content",
      description: "Content that compounds and converts",
      icon: <IconTarget className="w-8 h-8" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto bg-white">
      {results.map((result, index) => (
        <ResultCard key={result.title} {...result} index={index} />
      ))}
    </div>
  );
}

const ResultCard = ({
  metric,
  title,
  description,
  icon,
  index,
}: {
  metric: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-gray-200",
        (index === 0 || index === 4) && "lg:border-l border-gray-200",
        index < 4 && "lg:border-b border-gray-200"
        "border-b lg:border-b-0"
      )}
    >
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#94D82D]/5 to-transparent pointer-events-none" />
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#94D82D]/5 to-transparent pointer-events-none" />
      
      {/* Icon */}
      <div className="mb-4 relative z-10 px-10 text-[#94D82D] group-hover/feature:text-gray-800 transition-colors duration-200">
        {icon}
      </div>
      
      {/* Metric */}
      <div className="text-4xl font-bold mb-2 relative z-10 px-10 text-gray-900">
        <div className="absolute left-0 inset-y-0 h-8 group-hover/feature:h-12 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-[#94D82D] transition-all duration-300 origin-center" />
        <span className="group-hover/feature:translate-x-3 transition duration-300 inline-block text-4xl font-bold text-white ml-4">
          {metric}
        </span>
      </div>
      
      {/* Title */}
      <div className="text-lg font-semibold mb-2 relative z-10 px-10 text-gray-900 group-hover/feature:text-[#94D82D] transition-colors duration-200">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm text-gray-600 group-hover/feature:text-gray-800 max-w-xs relative z-10 px-10 transition-colors duration-200">
        {description}
      </p>
    </div>
  );
};