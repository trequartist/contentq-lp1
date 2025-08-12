import { MoveDownLeft, MoveUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface StatItem {
  value: string;
  statText: string;
  trend?: string;
  trendDirection?: "up" | "down";
}

interface StatsWithTextProps {
  badge?: string;
  title: string;
  description?: string;
  stats: StatItem[];
  currentStatIndex?: number;
}

export function StatsWithText({
  badge = "Platform",
  title,
  description,
  stats,
  currentStatIndex = 0,
}: StatsWithTextProps) {
  return (
    <section className="w-full py-20 lg:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left copy */}
          <div className="flex flex-col gap-4 items-start">
            <div>
              <Badge className="rounded-full border-white/15 bg-white/10 text-white/80 backdrop-blur-sm">
                {badge}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tight lg:max-w-xl text-left text-white">
                {title}
              </h2>
              {description && (
                <p className="text-base lg:max-w-sm leading-relaxed tracking-tight text-white/75 text-left">
                  {description}
                </p>
              )}
            </div>
          </div>
          {/* Right stats grid */}
          <div className="flex justify-center items-center">
            <div className="grid text-left grid-cols-1 sm:grid-cols-2 w-full gap-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={
                    "flex gap-0 flex-col justify-between p-6 rounded-md border border-white/10 bg-white/5 backdrop-blur-md " +
                    (index === currentStatIndex
                      ? "ring-1 ring-[#94D82D]/40"
                      : "hover:bg-white/[0.06]")
                  }
                >
                  {stat.trendDirection === "up" ? (
                    <MoveUpRight className="w-4 h-4 mb-8 text-[#94D82D]" />
                  ) : (
                    <MoveDownLeft className="w-4 h-4 mb-8 text-red-400" />
                  )}
                  <h2 className="text-4xl tracking-tight max-w-xl text-left font-semibold flex flex-row gap-4 items-end text-white">
                    {stat.value}
                    {stat.trend && (
                      <span className="text-white/60 text-sm tracking-normal">{stat.trend}</span>
                    )}
                  </h2>
                  <p className="text-base leading-relaxed tracking-tight text-white/75 max-w-xl text-left">
                    {stat.statText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 