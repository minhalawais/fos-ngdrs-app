
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";
import type { KPI } from "@/lib/mock-data";

export default function KPICard({ data }: { data: KPI }) {
    const isPositive = data.status === "up";
    const isNegative = data.status === "down";

    // Determine Gradient based on status or type
    const gradientBg = data.alert
        ? "bg-gradient-to-br from-red-600 to-rose-600"
        : isPositive
            ? "bg-gradient-to-br from-teal-600 to-emerald-600"
            : "bg-gradient-to-br from-blue-600 to-cyan-600";

    return (
        <div className={clsx(
            "relative rounded-2xl shadow-sm transition-all duration-300 h-full flex flex-col overflow-hidden group",
            "hover:shadow-xl hover:-translate-y-1 hover:shadow-brand-teal/20",
            gradientBg
        )}>
            {/* Glass effect overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -left-6 -bottom-6 w-32 h-32 rounded-full bg-black/5 blur-2xl" />

            <div className="p-5 relative z-10 flex flex-col h-full justify-between">

                {/* Header: Icon + Stats Side-by-Side */}
                <div className="flex items-center gap-4 mb-2">
                    {/* Icon with Glass Background */}
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/10 shrink-0">
                        {isPositive && <TrendingUp size={24} />}
                        {isNegative && <TrendingDown size={24} />}
                        {!isPositive && !isNegative && <Minus size={24} />}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-white/80 uppercase tracking-widest leading-none mb-1">{data.label}</span>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-white tracking-tight drop-shadow-sm leading-none">{data.value}</h3>
                            {!data.subStats && (
                                <span className="text-[10px] font-bold text-white bg-white/20 px-1.5 py-0.5 rounded flex items-center gap-0.5 backdrop-blur-sm self-center border border-white/10">
                                    {isPositive && <TrendingUp size={8} />}
                                    {isNegative && <TrendingDown size={8} />}
                                    {data.trend > 0 ? "+" : ""}{data.trend}%
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sub Stats Grid - If exists */}
                {data.subStats ? (
                    <div className="grid grid-cols-2 gap-3 mt-auto pt-3 border-t border-white/20">
                        {data.subStats.map((stat, i) => (
                            <div key={i} className="relative pl-3">
                                <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-white/40" />
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-white tracking-tight leading-none">
                                        {stat.value}
                                    </span>
                                    <span className="text-[9px] text-white/70 font-bold uppercase tracking-wider mt-1">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-auto pt-2">
                        <span className="text-xs text-white/70 font-medium block">{data.trendLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
