import { cn } from "@/lib/utils";

interface StatItem {
  value: string;
  statText: string;
  trend?: string; // ignored per new design
  trendDirection?: 'up' | 'down'; // ignored per new design
  source?: string;
}

interface StatsProps {
  stats: StatItem[];
  currentStatIndex?: number;
  colorMode?: 'dark' | 'light';
}

function Stats({ stats, currentStatIndex = 0, colorMode = 'light' }: StatsProps) {
  const isLight = colorMode === 'light';
  const numberClass = cn(
    'font-semibold tracking-tight',
    'text-3xl sm:text-4xl lg:text-5xl',
    isLight ? 'text-slate-900' : 'text-white'
  );
  const labelClass = cn(
    'text-sm sm:text-base leading-snug tracking-tight',
    isLight ? 'text-slate-700' : 'text-white/75'
  );
  const sourceClass = cn('text-[11px] sm:text-xs mt-1', isLight ? 'text-slate-500' : 'text-white/50');
  const containerClass = cn(
    'rounded-2xl backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.15)] p-4 sm:p-5',
    isLight ? 'border border-slate-200/70 bg-white/70' : 'border border-white/10 bg-white/5'
  );
  const cardBgHover = isLight ? 'hover:bg-slate-50/70' : 'hover:bg-white/[0.04]';
  const ringActive = isLight ? 'ring-1 ring-[#94D82D]/50' : 'ring-1 ring-[#94D82D]/40';
  const railColor = isLight
    ? 'bg-gradient-to-b from-[#94D82D]/60 to-[#94D82D]/20'
    : 'bg-gradient-to-b from-[#94D82D]/50 to-[#94D82D]/10';

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className={containerClass}>
          <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-3 sm:gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  'relative flex flex-col gap-2 rounded-xl px-4 py-3 transition-colors duration-300',
                  'transition-transform hover:-translate-y-0.5',
                  index === currentStatIndex ? ringActive : cardBgHover
                )}
              >
                <div className="flex items-baseline gap-3">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#94D82D]" />
                  <div className={numberClass}>{stat.value}</div>
                </div>
                <p className={labelClass}>{stat.statText}</p>
                {stat.source && <p className={sourceClass}>{stat.source}</p>}
                <div className={cn('absolute left-0 top-2 bottom-2 w-[2px] rounded-full', railColor)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { Stats };