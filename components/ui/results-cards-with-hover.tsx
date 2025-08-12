import { cn } from "@/lib/utils";
import { TrendingUp, Notebook as Robot, Users, Target } from "lucide-react";

export function ResultsCardsWithHover() {
  const results = [
    {
      metric: "200%",
      title: "More Organic Traffic",
      description: "2–3x increase in qualified organic search traffic",
      icon: <TrendingUp />,
    },
    {
      metric: "+200%",
      title: "First Citations",
      description: "Appearing in ChatGPT & Claude responses",
      icon: <Robot />,
    },
    {
      metric: "5x",
      title: "Engagement Growth",
      description: "LinkedIn engagement and reach expansion",
      icon: <Users />,
    },
    {
      metric: "New SQLs",
      title: "From Content",
      description: "Content that compounds and converts",
      icon: <Target />,
    },
  ];

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
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
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#94D82D]/5 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#94D82D]/5 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#94D82D] group-hover/feature:text-gray-700 transition-colors duration-200">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2 relative z-10 px-10 text-gray-900">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-200 group-hover/feature:bg-[#94D82D] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
          {metric}
        </span>
      </div>
      <div className="text-lg font-semibold mb-2 relative z-10 px-10 text-gray-900 group-hover/feature:text-[#94D82D] transition-colors duration-200">
        {title}
      </div>
      <p className="text-sm text-gray-600 group-hover/feature:text-gray-900 transition-colors duration-200 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};