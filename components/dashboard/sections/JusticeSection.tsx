
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    ScatterChart, Scatter
} from 'recharts';

import { AlertCircle, FileX, Scale, TrendingDown, Gavel, Activity, ArrowRight, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { ChartCard } from "./OverviewSection";
import { clsx } from "clsx";



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



export default function JusticeSection() {
    return (
        <section id="justice" className="space-y-8 scroll-mt-28">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Justice & Accountability Funnel</h2>
                    <p className="text-brand-teal mt-1">Tracking Attrition from Reporting to Conviction</p>
                </div>
                <div className="px-3 py-1 bg-red-100 rounded-full border border-red-200">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Attrition Alert</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* KPIs & Analysis */}
                <div className="space-y-6 lg:col-span-3">
                    {/* Conviction Rate KPI & Attrition Stats Combined */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden group flex flex-col gap-6"
                        >
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-400" />

                            {/* Conviction Rate Top Section */}
                            <div className="text-center">
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
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-brand-surface/80 shadow-sm bg-brand-surface/20"
                        >
                            {/* Attrition Reasons Section */}
                            <div>
                                <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <FileX size={14} className="text-brand-teal" />
                                    Top Attrition Factors
                                </h4>
                                <ul className="space-y-4">
                                    {closureReasons.map((r, i) => (
                                        <li key={i} className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                <span className="text-brand-dark/70 font-medium text-xs">{r.reason}</span>
                                            </div>
                                            <span className="font-bold text-brand-dark bg-white border border-brand-surface px-2 py-0.5 rounded text-[10px]">{r.count} cases</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Closure Reasons Chart */}
                <ChartCard title="Reasons for Case Closure" subtitle="Primary attrition factors">
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
                <ChartCard title="Duration vs. Conviction Probability" subtitle="Correlation analysis">
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
        </section>
    );
}
