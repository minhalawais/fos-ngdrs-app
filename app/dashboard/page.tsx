
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart
} from 'recharts';
import KPICard from "@/components/dashboard/KPICard";
import { generateKPIs, generateCrimeTrends, generateServiceGaps, generatePlatformStats } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Activity, Shield, AlertTriangle, TrendingUp } from "lucide-react";

const kpis = generateKPIs();
const crimeTrends = generateCrimeTrends();
const serviceGaps = generateServiceGaps();
const platformStats = generatePlatformStats();

// Colors
const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
    dark: "#055b65",
    soft: "#b2c9c5",
    red: "#ef4444",
    amber: "#f59e0b"
};

// Transform crime trends for stacked bar
const stackedCrimeData = crimeTrends.map(month => ({
    name: month.month,
    Physical: month.Physical,
    Sexual: month.Sexual,
    Digital: month.Digital,
    Economic: month.Economic
}));

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-dark text-white px-4 py-3 rounded-xl shadow-xl border border-white/10">
                <p className="text-xs text-brand-teal font-semibold mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-white/70">{entry.name}:</span>
                        <span className="font-bold">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Chart Card Wrapper Component
function ChartCard({ title, subtitle, children, className }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={clsx(
                "bg-white rounded-2xl border border-brand-surface/80 shadow-sm",
                "hover:shadow-lg hover:border-primary-500/10 transition-all duration-300",
                "overflow-hidden group",
                className
            )}
        >
            {/* Subtle top border gradient */}
            <div className="h-0.5 bg-gradient-to-r from-primary-500/50 via-brand-teal/30 to-transparent" />

            <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                        {subtitle && <p className="text-xs text-brand-teal mt-1">{subtitle}</p>}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-brand-surface/50 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                        <Activity size={16} className="text-brand-teal" />
                    </div>
                </div>
                {children}
            </div>
        </motion.div>
    );
}

export default function NationalOverview() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 bg-primary-500/10 rounded-full border border-primary-500/20">
                            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Command Center</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="text-xs text-brand-teal font-medium">Live</span>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-brand-dark">National Overview</h1>
                    <p className="text-brand-teal/80 mt-1">Real-time Safety Matrix • All Provinces</p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-surface/30 rounded-xl border border-brand-surface">
                    <Shield size={16} className="text-brand-teal" />
                    <span className="text-sm font-medium text-brand-dark">Data Integrity: <span className="text-primary-600 font-bold">Verified</span></span>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <motion.div
                        key={kpi.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                        <KPICard data={kpi} />
                    </motion.div>
                ))}
            </div>

            {/* Charts Row 1: Trends & Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Trend Area Chart */}
                <ChartCard title="Monthly Case Trends" subtitle="Year-to-Date Progression" className="lg:col-span-2">
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={crimeTrends}>
                                <defs>
                                    <linearGradient id="colorPhysical" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={BRAND_COLORS.teal} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={BRAND_COLORS.teal} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={BRAND_COLORS.primary} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={BRAND_COLORS.primary} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSexual" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={BRAND_COLORS.red} stopOpacity={0.2} />
                                        <stop offset="95%" stopColor={BRAND_COLORS.red} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="month" stroke={BRAND_COLORS.teal} fontSize={11} tickLine={false} axisLine={false} />
                                <YAxis stroke={BRAND_COLORS.teal} fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                                <Area type="monotone" dataKey="Physical" stroke={BRAND_COLORS.teal} strokeWidth={2} fillOpacity={1} fill="url(#colorPhysical)" />
                                <Area type="monotone" dataKey="Digital" stroke={BRAND_COLORS.primary} strokeWidth={2} fillOpacity={1} fill="url(#colorDigital)" />
                                <Area type="monotone" dataKey="Sexual" stroke={BRAND_COLORS.red} strokeWidth={2} fillOpacity={1} fill="url(#colorSexual)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Stacked Bar Distribution */}
                <ChartCard title="Distribution by Type" subtitle="Quarterly Breakdown">
                    <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stackedCrimeData} layout="vertical" barSize={16}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" stroke={BRAND_COLORS.teal} fontSize={11} tickLine={false} axisLine={false} width={35} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar dataKey="Physical" stackId="a" fill={BRAND_COLORS.teal} radius={[0, 0, 0, 0]} />
                                <Bar dataKey="Sexual" stackId="a" fill={BRAND_COLORS.red} />
                                <Bar dataKey="Digital" stackId="a" fill={BRAND_COLORS.primary} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            {/* Charts Row 2: Service Gaps & Platforms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Radar Chart: Service Gaps */}
                <ChartCard title="Service Provision Gaps" subtitle="Requested vs Provided Services">
                    <div className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={serviceGaps}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: BRAND_COLORS.teal, fontSize: 11, fontWeight: 500 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Requested" dataKey="B" stroke={BRAND_COLORS.teal} fill={BRAND_COLORS.teal} fillOpacity={0.15} strokeWidth={2} />
                                <Radar name="Provided" dataKey="A" stroke={BRAND_COLORS.primary} fill={BRAND_COLORS.primary} fillOpacity={0.4} strokeWidth={2} />
                                <Legend iconType="circle" />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Platform Compliance - Enhanced Progress Bars */}
                <ChartCard title="Platform Compliance Scores" subtitle="TFGBV Response Metrics">
                    <div className="space-y-5">
                        {platformStats.sort((a, b) => b.score - a.score).map((p, i) => (
                            <div key={p.name} className="group">
                                <div className="flex justify-between text-sm mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={clsx(
                                            "w-2 h-2 rounded-full",
                                            p.score > 80 ? "bg-primary-500" : p.score > 50 ? "bg-amber-400" : "bg-red-500"
                                        )} />
                                        <span className="font-semibold text-brand-dark">{p.name}</span>
                                    </div>
                                    <span className={clsx(
                                        "font-black tabular-nums",
                                        p.score > 80 ? "text-primary-600" : p.score > 50 ? "text-amber-500" : "text-red-500"
                                    )}>
                                        {p.score}%
                                    </span>
                                </div>
                                <div className="h-3 w-full bg-brand-surface/50 rounded-full overflow-hidden relative">
                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${p.score}%` }}
                                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                                        className={clsx(
                                            "h-full rounded-full relative",
                                            p.score > 80 ? "bg-gradient-to-r from-primary-500 to-primary-400" :
                                                p.score > 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" :
                                                    "bg-gradient-to-r from-red-500 to-red-400"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}
