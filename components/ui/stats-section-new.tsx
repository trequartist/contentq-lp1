import { MoveDownLeft, MoveUpRight } from "lucide-react";

interface StatItem {
  value: string;
  statText: string;
  source: string;
  trendDirection: 'up' | 'down';
  trend: string;
}

interface StatsProps {
  stats: StatItem[];
  currentStatIndex?: number;
  colorMode?: 'light' | 'dark';
}

function StatsNew({ stats, currentStatIndex = 0, colorMode = 'dark' }: StatsProps) {
  const textColor = colorMode === 'light' ? 'text-white' : 'text-slate-900';
  const mutedColor = colorMode === 'light' ? 'text-white/70' : 'text-slate-600';
  const borderColor = colorMode === 'light' ? 'border-white/20' : 'border-slate-200';
  
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid text-left grid-cols-1 lg:grid-cols-3 w-full gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`flex gap-0 flex-col justify-between p-6 border rounded-lg transition-all duration-300 ${borderColor} ${
                currentStatIndex === index ? 'ring-2 ring-[#94D82D]/30 bg-white/5' : ''
              }`}
            >
              {stat.trendDirection === 'up' ? (
                <MoveUpRight className="w-4 h-4 mb-6 text-[#94D82D]" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-6 text-orange-500" />
              )}
              
              <h2 className={`text-4xl lg:text-5xl tracking-tighter font-bold flex flex-row gap-3 items-end mb-3 ${textColor}`}>
                {stat.value}
                <span className={`text-sm tracking-normal ${mutedColor}`}>
                  {stat.trend}
                </span>
              </h2>
              
              <p className={`text-base leading-relaxed tracking-tight mb-4 ${mutedColor}`}>
                {stat.statText}
              </p>
              
              <p className={`text-xs tracking-tight ${mutedColor} opacity-75`}>
                {stat.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { StatsNew };