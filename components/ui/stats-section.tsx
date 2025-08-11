import { MoveDownLeft, MoveUpRight } from "lucide-react";

interface StatItem {
  value: string;
  statText: string;
  trend?: string;
  trendDirection?: 'up' | 'down';
}

interface StatsProps {
  stats: StatItem[];
  currentStatIndex?: number;
}

function Stats({ stats, currentStatIndex = 0 }: StatsProps) {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`flex gap-0 flex-col justify-between p-6 border border-white/20 rounded-md bg-white/5 backdrop-blur-sm transition-all duration-300 ${
                index === currentStatIndex ? 'ring-2 ring-accent-kiwi/50 bg-white/10' : ''
              }`}
            >
              {stat.trendDirection === 'up' ? (
                <MoveUpRight className="w-4 h-4 mb-10 text-accent-kiwi" />
              ) : (
                <MoveDownLeft className="w-4 h-4 mb-10 text-red-400" />
              )}
              <h2 className="text-4xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-4 items-end text-white">
                {stat.value}
                {stat.trend && (
                  <span className="text-white/60 text-sm tracking-normal">
                    {stat.trend}
                  </span>
                )}
              </h2>
              <p className="text-base leading-relaxed tracking-tight text-white/70 max-w-xl text-left">
                {stat.statText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Stats };