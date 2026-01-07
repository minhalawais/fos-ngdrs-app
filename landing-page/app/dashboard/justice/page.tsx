
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ScatterChart, Scatter
} from 'recharts';
import { generateFunnelData } from "@/lib/mock-data";
import { AlertCircle, FileX, Scale, TrendingDown, Gavel, Activity, ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const funnelData = generateFunnelData();

const closureReasons = [
    { reason: "Compromise/Sulh", count: 450 },
    { reason: "Lack of Evidence", count: 320 },
    { reason: "Witness Hostility", count: 210 },
    { reason: "Procedural Delay", count: 180 },
    { reason: "Survivor Withdrawal", count: 150 },
];

const scatterData = [
    { duration: 10, outcome: 100 },
    { duration: 50, outcome: 80 },
    { duration: 100, outcome: 40 },
    { duration: 200, outcome: 10 },
    { duration: 300, outcome: 0 },
    { duration: 20, outcome: 90 },
    { duration: 80, outcome: 50 },
];

const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
    dark: "#055b65",
    red: "#ef4444",
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-dark text-white px-4 py-3 rounded-xl shadow-xl border border-white/10">
                <p className="text-xs text-brand-teal font-semibold mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-white/70">{entry.name}:</span>
                        <span className="font-bold">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Chart Card Component
function ChartCard({ title, subtitle, children, className, icon: Icon, headerRight }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={clsx(
                "bg-white rounded-2xl border border-brand-surface/80 shadow-sm overflow-hidden",
                "hover:shadow-lg hover:border-primary-500/10 transition-all duration-300",
                className
            )}
        >
            <div className="h-0.5 bg-gradient-to-r from-primary-500/50 via-brand-teal/30 to-transparent" />
            <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                        {subtitle && <p className="text-xs text-brand-teal mt-1">{subtitle}</p>}
                    </div>
                    <div className="flex items-center gap-3">
                        {headerRight}
                        {Icon && (
                            <div className="w-8 h-8 rounded-lg bg-brand-surface/50 flex items-center justify-center opacity-50">
                                <Icon size={16} className="text-brand-teal" />
                            </div>
                        )}
                    </div>
                </div>
                {children}
            </div>
        </motion.div>
    );
}

// Proper Trapezoid Funnel Component
function TrapezoidFunnel({ data }: { data: typeof funnelData }) {
    const maxValue = data[0].value;
    const height = 450; // Maintained increased height
    const width = 500;
    const gap = 8;
    const stageHeight = (height - (gap * (data.length - 1))) / data.length;
    const minWidth = 100; // Enforce minimum width for text readability

    // Helper to calculate visual width with minimum constraint
    const getVisualWidth = (val: number) => {
        const rawWidth = (val / maxValue) * width;
        return Math.max(rawWidth, minWidth);
    };

    // Funnel gradient colors
    const funnelColors = [
        { from: "#94a3b8", to: "#64748b" },      // Reported - Slate
        { from: "#45828b", to: "#2d5a60" },      // FIR - Teal
        { from: "#1bd488", to: "#15a366" },      // Investigation - Primary
        { from: "#10b981", to: "#059669" },      // Charge Sheet - Emerald
        { from: "#055b65", to: "#033d45" },      // Trial - Dark Teal
        { from: "#dc2626", to: "#991b1b" },      // Convicted - Emphasis Red
    ];

    return (
        <div className="w-full flex justify-center py-4 h-[480px]">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-2xl overflow-visible">
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.1" />
                    </filter>
                    {funnelColors.map((color, i) => (
                        <linearGradient key={i} id={`funnelGrad${i}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={color.from} />
                            <stop offset="100%" stopColor={color.to} />
                        </linearGradient>
                    ))}
                </defs>

                {data.map((item, i) => {
                    const topY = i * (stageHeight + gap);
                    const bottomY = topY + stageHeight;

                    // Width Calculations with Min Width Enforcement
                    const topW = getVisualWidth(item.value);

                    // Bottom width logic
                    let bottomW;
                    if (i < data.length - 1) {
                        bottomW = getVisualWidth(data[i + 1].value);
                    } else {
                        bottomW = Math.max(getVisualWidth(item.value) * 0.7, minWidth * 0.8);
                    }

                    // Centering
                    const topX = (width - topW) / 2;
                    const bottomX = (width - bottomW) / 2;

                    // Points for Polygon
                    const points = `
                        ${topX},${topY} 
                        ${topX + topW},${topY} 
                        ${bottomX + bottomW},${bottomY} 
                        ${bottomX},${bottomY}
                    `;

                    // Drop Stats
                    const prevVal = i > 0 ? data[i - 1].value : 0;
                    const dropPct = i > 0 ? Math.round(((prevVal - item.value) / prevVal) * 100) : 0;

                    return (
                        <g key={i} className="group cursor-pointer">
                            {/* The Shape */}
                            <motion.polygon
                                initial={{ opacity: 0, scale: 0.9, transformOrigin: 'center' }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                points={points}
                                fill={`url(#funnelGrad${i})`}
                                filter="url(#shadow)"
                                className="transition-all duration-300 hover:opacity-90"
                            />

                            {/* Center Text (Value) */}
                            <motion.text
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                x={width / 2}
                                y={topY + (stageHeight / 2)}
                                dy=".35em"
                                textAnchor="middle"
                                className="fill-white font-black text-2xl drop-shadow-md pointer-events-none"
                            >
                                {item.value.toLocaleString()}
                            </motion.text>

                            {/* Left Label (Stage Name) - Restored Dashed Line */}
                            <motion.g
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + (i * 0.1) }}
                            >
                                <line x1={topX - 10} y1={topY + (stageHeight / 2)} x2={topX - 30} y2={topY + (stageHeight / 2)} stroke="#cbd5e1" strokeDasharray="2 2" />
                                <text x={topX - 40} y={topY + (stageHeight / 2)} dy="0.35em" textAnchor="end" className="text-sm font-bold fill-brand-dark">
                                    {i + 1}. {item.name}
                                </text>
                            </motion.g>

                            {/* Right Label (Drop %) - Restored Boxed Styling */}
                            {i > 0 && (
                                <motion.g
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                >
                                    <line x1={topX + topW + 10} y1={topY + (stageHeight / 2)} x2={topX + topW + 30} y2={topY + (stageHeight / 2)} stroke="#fecaca" strokeWidth={1} strokeDasharray="2 2" />
                                    <rect x={topX + topW + 35} y={topY + (stageHeight / 2) - 10} width="65" height="20" rx="6" fill="#fef2f2" stroke="#fecaca" />
                                    <text x={topX + topW + 67.5} y={topY + (stageHeight / 2)} dy="0.35em" textAnchor="middle" className="text-[10px] font-bold fill-red-500">
                                        -{dropPct}% Drop
                                    </text>
                                </motion.g>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

export default function JusticePage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 bg-red-100 rounded-full border border-red-200">
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Attrition Alert</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-brand-dark">Justice & Accountability Funnel</h1>
                    <p className="text-brand-teal/80 mt-1">Tracking Attrition from Reporting to Conviction</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Funnel Chart */}
                <ChartCard
                    title="Case Attrition Pipeline"
                    subtitle="Visual breakdown of justice system attrition"
                    className="lg:col-span-2"
                    icon={Activity}
                    headerRight={
                        <div className="flex items-center gap-2 text-sm text-red-600 font-bold bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                            <AlertCircle size={16} />
                            Critical Drop-off
                        </div>
                    }
                >
                    <TrapezoidFunnel data={funnelData} />
                </ChartCard>

                {/* KPIs & Analysis */}
                <div className="space-y-6">
                    {/* Conviction Rate KPI */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm text-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-400" />

                        <div className="relative mb-4 mx-auto w-20 h-20">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="40" cy="40" r="36" stroke="#fecaca" strokeWidth="6" fill="transparent" />
                                <circle cx="40" cy="40" r="36" stroke="#ef4444" strokeWidth="6" fill="transparent" strokeDasharray="226.2" strokeDashoffset={226.2 * (1 - 0.045)} className="animate-[dash_1.5s_ease-out_forwards]" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-red-600">
                                <Scale size={24} />
                            </div>
                        </div>

                        <h4 className="text-sm font-bold text-brand-teal uppercase mb-2">Conviction Rate</h4>
                        <div className="text-5xl font-black text-brand-dark tracking-tight">4.5%</div>
                        <div className="flex items-center justify-center gap-1 text-red-500 font-medium mt-3">
                            <TrendingDown size={14} />
                            <span className="text-xs">0.2% vs last month</span>
                        </div>
                    </motion.div>

                    {/* Attrition Reasons List */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-brand-surface/80 shadow-sm"
                    >
                        <div className="h-0.5 bg-gradient-to-r from-brand-teal/50 to-transparent -mx-6 -mt-6 mb-4" />
                        <h4 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <Gavel size={16} className="text-brand-teal" />
                            Top Attrition Reasons
                        </h4>
                        <ul className="space-y-3">
                            {closureReasons.slice(0, 3).map((r, i) => (
                                <li key={i} className="flex justify-between items-center text-sm py-2 border-b border-brand-surface/50 last:border-b-0 hover:bg-brand-surface/20 px-2 rounded-lg transition-colors -mx-2">
                                    <span className="text-brand-dark/80 font-medium">{r.reason}</span>
                                    <span className="font-bold text-brand-dark bg-brand-surface/50 px-2 py-0.5 rounded text-xs">{r.count}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full mt-4 py-2.5 text-xs font-bold text-primary-600 uppercase border border-primary-100 hover:bg-primary-50 rounded-xl transition-all flex items-center justify-center gap-2">
                            View Full Analysis <ArrowRight size={14} />
                        </button>
                    </motion.div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Closure Reasons Chart */}
                <ChartCard title="Reasons for Case Closure" subtitle="Primary attrition factors" icon={FileX}>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={closureReasons} margin={{ left: 20 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor={BRAND_COLORS.teal} stopOpacity={1} />
                                        <stop offset="100%" stopColor={BRAND_COLORS.primary} stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="reason" type="category" width={130} tick={{ fontSize: 11, fill: BRAND_COLORS.teal, fontWeight: 500 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="count" fill="url(#barGradient)" radius={[0, 8, 8, 0]} barSize={18} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Scatter Plot */}
                <ChartCard title="Duration vs. Conviction Probability" subtitle="Correlation analysis" icon={Activity}>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="duration" name="Days" unit="d" tick={{ fontSize: 11 }} stroke={BRAND_COLORS.teal} />
                                <YAxis type="number" dataKey="outcome" name="Probability" unit="%" tick={{ fontSize: 11 }} stroke={BRAND_COLORS.teal} />
                                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Cases" data={scatterData} fill={BRAND_COLORS.primary}>
                                </Scatter>
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}
