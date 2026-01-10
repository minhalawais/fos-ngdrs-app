"use client";

import { motion } from "framer-motion";
import {
    Clock,
    AlertTriangle,
    CheckCircle,
    FileText,
    ArrowRight,
    MapPin,
    Calendar,
    MoreVertical,
    Activity,
    Database,
    Send,
    TrendingUp,
    TrendingDown,
    ArrowUpRight,
    Shield,
    Users,
    Zap
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import {
    generateDistrictKPIs,
    generatePendencyWatch,
    generateLethalityAlerts,
    generateRecentActivity
} from "@/lib/district-mock-data";
import { clsx } from "clsx";
import Link from "next/link";

// Brand Colors matching NCSW National Dashboard
const BRAND_COLORS = {
    primary: "#1bd488",
    primaryGradient: ["#1bd488", "#14b070"],
    teal: "#45828b",
    dark: "#055b65",
    soft: "#b2c9c5",
    red: "#ef4444",
    redGradient: ["#ef4444", "#dc2626"],
    amber: "#f59e0b",
    amberGradient: ["#f59e0b", "#d97706"],
    blue: "#3b82f6",
    purple: "#8b5cf6",
    surface: "#f8fafb"
};

const kpis = generateDistrictKPIs();
const pendency = generatePendencyWatch();
const alerts = generateLethalityAlerts();
const activity = generateRecentActivity();

// Mock data for charts
const caseStageData = [
    { stage: 'Reported', count: 45, color: BRAND_COLORS.soft },
    { stage: 'FIR Reg.', count: 32, color: BRAND_COLORS.blue },
    { stage: 'Investigation', count: 28, color: BRAND_COLORS.amber },
    { stage: 'Trial', count: 15, color: BRAND_COLORS.purple },
    { stage: 'Convicted', count: 12, color: BRAND_COLORS.primary },
];

const intakeMonthlyData = [
    { month: 'Jun', cases: 38 },
    { month: 'Jul', cases: 42 },
    { month: 'Aug', cases: 35 },
    { month: 'Sep', cases: 48 },
    { month: 'Oct', cases: 52 },
    { month: 'Nov', cases: 45 },
];

// Custom Tooltip for charts
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-brand-soft/30 p-3 rounded-xl shadow-xl ring-1 ring-black/5">
                <p className="text-xs font-bold text-[#055b65] mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-[10px] font-medium text-gray-500">{entry.name}</span>
                            </div>
                            <span className="text-xs font-bold text-[#055b65]">{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

// Chart Card Component
function ChartCard({ title, subtitle, children, icon: Icon, action }: any) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full overflow-hidden">
            <div className="p-5 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="p-2 rounded-lg bg-white shadow-sm text-[#45828b]">
                            <Icon size={16} />
                        </div>
                    )}
                    <div>
                        <h3 className="font-bold text-[#055b65] text-sm tracking-tight">{title}</h3>
                        {subtitle && <p className="text-[10px] text-[#45828b] font-medium">{subtitle}</p>}
                    </div>
                </div>
                {action && action}
            </div>
            <div className="p-5 flex-1">{children}</div>
        </div>
    );
}

export default function DistrictDashboard() {
    return (
        <div className="space-y-6 pb-12">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#055b65] tracking-tight flex items-center gap-3">
                        <Activity className="text-[#1bd488]" size={28} />
                        Operational Overview
                    </h1>
                    <p className="text-sm text-[#45828b] font-medium">District Peshawar • Reporting Cycle: Nov 2023</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#055b65] hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
                        <Calendar size={14} className="text-[#45828b]" />
                        This Month
                    </button>
                    <Link href="/district/intake" className="px-5 py-2.5 bg-[#055b65] hover:bg-[#45828b] text-white font-bold rounded-xl text-xs shadow-lg shadow-[#055b65]/20 transition-all flex items-center gap-2 group">
                        <Zap size={14} className="group-hover:animate-pulse" />
                        New Case Intake
                    </Link>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-gray-50 to-transparent -mr-8 -mt-8 rounded-full" />

                        <div className="flex justify-between items-start mb-4 relative">
                            <span className="text-[10px] font-black text-[#45828b] uppercase tracking-widest">{stat.label}</span>
                            <div className={clsx("p-2 rounded-xl",
                                stat.status === 'critical' ? 'bg-red-500/10 text-red-600' :
                                    stat.status === 'good' ? 'bg-[#1bd488]/10 text-[#14b070]' :
                                        'bg-[#45828b]/10 text-[#45828b]'
                            )}>
                                {stat.status === 'critical' ? <AlertTriangle size={18} /> :
                                    stat.status === 'good' ? <CheckCircle size={18} /> :
                                        <Activity size={18} />}
                            </div>
                        </div>

                        <div className="flex items-baseline gap-2 relative">
                            <h3 className="text-3xl font-black text-[#055b65] tracking-tighter">{stat.value}</h3>
                            {typeof stat.trend === 'number' && (
                                <div className={clsx("flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-lg",
                                    (stat.status === 'positive' && stat.trend < 0) || (stat.status !== 'positive' && stat.trend > 0)
                                        ? "text-red-600 bg-red-50"
                                        : "text-[#14b070] bg-[#1bd488]/10"
                                )}>
                                    {stat.trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {Math.abs(stat.trend)}%
                                </div>
                            )}
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{stat.trendLabel}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard
                    title="Case Lifecycle Distribution"
                    subtitle="Current volume at each procedural stage"
                    icon={Shield}
                >
                    <div className="h-[280px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={caseStageData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#1bd488" />
                                        <stop offset="100%" stopColor="#14b070" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="stage"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#45828b', fontSize: 10, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafb' }} />
                                <Bar
                                    dataKey="count"
                                    name="Cases"
                                    radius={[6, 6, 0, 0]}
                                    barSize={40}
                                    animationDuration={1500}
                                >
                                    {caseStageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard
                    title="Intake Volume Trends"
                    subtitle="Monthly new case registrations"
                    icon={TrendingUp}
                >
                    <div className="h-[280px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={intakeMonthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorIntake" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#055b65" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#055b65" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#45828b', fontSize: 10, fontWeight: 700 }}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="cases"
                                    name="New Cases"
                                    stroke="#055b65"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorIntake)"
                                    animationDuration={2000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Pendency Watch */}
                <div className="lg:col-span-2">
                    <ChartCard
                        title="Pendency Watch"
                        subtitle="Detailed tracking of delayed cases requiring intervention"
                        icon={Clock}
                        action={
                            <button className="text-[10px] font-black text-[#45828b] hover:text-[#055b65] flex items-center gap-1 uppercase tracking-wider transition-colors">
                                View Full Registry <ArrowRight size={12} />
                            </button>
                        }
                    >
                        <div className="overflow-x-auto -mx-5 -mb-5">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8fafb] text-[10px] text-[#45828b] font-black uppercase tracking-widest border-y border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4">Case Descriptor</th>
                                        <th className="px-6 py-4">Current Stage</th>
                                        <th className="px-6 py-4">Stagnation</th>
                                        <th className="px-6 py-4 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 bg-white">
                                    {pendency.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-gray-50/80 transition-all group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black text-[#055b65]">{item.survivor}</span>
                                                    <span className="text-[9px] font-mono font-medium text-gray-400 mt-0.5">{item.caseId}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold text-gray-500 uppercase">{item.stage.split(' -> ')[0]}</span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                                                    <span className="text-xs font-bold text-[#055b65]">{item.stage.split(' -> ')[1]}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-50 rounded-lg border border-amber-100">
                                                    <Clock size={10} className="text-amber-600" />
                                                    <span className="text-[10px] font-black text-amber-700">{item.daysPending} DAYS</span>
                                                </div>
                                                <p className="text-[9px] text-gray-400 mt-1 font-medium italic">{item.reason}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:bg-[#055b65] hover:text-white transition-all group-hover:shadow-md">
                                                    <ArrowUpRight size={14} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ChartCard>
                </div>

                {/* Side Panel: Alerts & Activity */}
                <div className="space-y-6">
                    {/* Lethality Alerts */}
                    <div className="bg-white rounded-2xl border border-red-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <div className="p-5 border-b border-red-50 bg-red-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-red-700">
                                <AlertTriangle size={18} />
                                <h3 className="font-black text-xs uppercase tracking-tighter">Lethality Risks</h3>
                            </div>
                            <span className="px-2 py-0.5 bg-red-600 text-[9px] font-black text-white rounded-full">IMMEDIATE</span>
                        </div>
                        <div className="p-4 space-y-3">
                            {alerts.map((alert, idx) => (
                                <div key={idx} className="p-3 rounded-xl border border-red-50 bg-white hover:border-red-200 transition-colors cursor-pointer group">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-black text-[#055b65] text-xs">{alert.survivor}</h4>
                                        <span className="text-[9px] font-black text-red-600 bg-red-50 px-1.5 py-0.5 rounded uppercase tracking-widest">{alert.risk}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {alert.indicators.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[8px] font-bold text-[#45828b] bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 uppercase">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-black text-[10px] rounded-xl shadow-lg shadow-red-600/20 transition-all uppercase tracking-widest flex items-center justify-center gap-2">
                                <Shield size={12} /> Access Intervention Protocol
                            </button>
                        </div>
                    </div>

                    {/* Timeline Activity */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-1.5 rounded-lg bg-[#45828b]/10 text-[#45828b]">
                                <Database size={16} />
                            </div>
                            <h3 className="font-bold text-[#055b65] text-sm">System Audit Log</h3>
                        </div>
                        <div className="relative pl-6 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-[#45828b] before:to-transparent">
                            {activity.map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[20px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-[#1bd488] shadow-[0_0_0_2px_white] z-10" />
                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[11px] font-black text-[#055b65] leading-none uppercase tracking-tight">{item.action}</span>
                                            <span className="text-[9px] font-bold text-gray-400">{item.time}</span>
                                        </div>
                                        <span className="text-[9px] font-bold text-[#45828b] mt-1 uppercase tracking-widest">{item.user}</span>
                                        <p className="text-[10px] text-gray-500 mt-1.5 leading-relaxed">{item.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
