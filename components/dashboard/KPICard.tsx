
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { clsx } from "clsx";
import type { KPI } from "@/lib/mock-data";

export default function KPICard({ data }: { data: KPI }) {
    const isPositive = data.status === "up";
    const isNegative = data.status === "down";
    const isNeutral = data.status === "neutral";

    const trendColor = data.alert
        ? "text-red-600 bg-red-100"
        : isPositive ? "text-primary-700 bg-primary-100" : isNegative ? "text-red-700 bg-red-100" : "text-brand-teal bg-brand-surface";

    // Icon background colors
    const iconBg = data.alert
        ? "bg-red-100 text-red-600"
        : isPositive ? "bg-primary-100 text-primary-600" : isNegative ? "bg-red-100 text-red-600" : "bg-brand-surface text-brand-teal";

    return (
        <div className={clsx(
            "relative bg-white rounded-2xl border shadow-sm transition-all duration-300 h-full flex flex-col",
            "hover:shadow-xl hover:-translate-y-1 hover:border-primary-500/20",
            "overflow-hidden group",
            data.alert ? "border-red-200" : "border-brand-surface/80"
        )}>
            {/* Top Gradient Strip */}
            <div className={clsx(
                "absolute top-0 left-0 right-0 h-1 transition-all",
                data.alert ? "bg-gradient-to-r from-red-500 to-red-400" : "bg-gradient-to-r from-primary-500 to-brand-teal"
            )} />

            {/* Subtle Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        {/* Icon with Background */}
                        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", iconBg)}>
                            {isPositive && <TrendingUp size={18} />}
                            {isNegative && <TrendingDown size={18} />}
                            {isNeutral && <Minus size={18} />}
                        </div>
                        <span className="text-sm font-semibold text-brand-teal uppercase tracking-wider">{data.label}</span>
                    </div>
                    {data.alert && (
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertTriangle size={16} className="text-red-500 animate-pulse" />
                        </div>
                    )}
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                    <h3 className="text-4xl font-heading font-black text-brand-dark tracking-tight">{data.value}</h3>
                </div>

                {data.subStats ? (
                    <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-brand-surface/60">
                        {data.subStats.map((stat, i) => (
                            <div key={i} className="relative pl-3">
                                <div className={clsx(
                                    "absolute left-0 top-1 bottom-1 w-1 rounded-full",
                                    stat.color ? stat.color.replace('text-', 'bg-').replace('600', '500') : "bg-brand-teal"
                                )} />
                                <div className="flex flex-col">
                                    <span className={clsx("text-lg font-black tracking-tight leading-none", stat.color || "text-brand-teal")}>
                                        {stat.value}
                                    </span>
                                    <span className="text-[10px] text-brand-teal/60 font-bold uppercase tracking-wider mt-1">{stat.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <div className={clsx(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold",
                            trendColor
                        )}>
                            {isPositive && <TrendingUp size={12} />}
                            {isNegative && <TrendingDown size={12} />}
                            {isNeutral && <Minus size={12} />}
                            <span>{data.trend > 0 ? "+" : ""}{data.trend}%</span>
                        </div>
                        <span className="text-xs text-brand-soft font-medium">{data.trendLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
