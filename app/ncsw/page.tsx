"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
    FileText,
    CheckCircle,
    Clock,
    AlertTriangle,
    RotateCcw,
    TrendingUp,
    TrendingDown,
    MapPin,
    ArrowRight,
    Users,
    Database,
    Shield,
    Eye,
    Send,
    Calendar,
    Download
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

// Brand Colors matching National Dashboard
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

// Custom Tooltip component for a more professional look
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-brand-soft/30 p-4 rounded-xl shadow-xl shadow-brand-dark/5 ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
                <p className="text-sm font-bold text-brand-dark mb-2 flex items-center gap-2">
                    <MapPin size={14} className="text-brand-teal" />
                    {label}
                </p>
                <div className="space-y-1.5">
                    {payload.map((entry: any, index: number) => (
                        <div key={`item-${index}`} className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: entry.fill.includes('url') ? entry.color : entry.fill }} />
                                <span className="text-xs font-medium text-brand-teal">{entry.name}</span>
                            </div>
                            <span className="text-sm font-bold text-brand-dark">{entry.value.toLocaleString()}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-3 pt-2 border-t border-brand-surface border-dashed">
                    <div className="flex justify-between items-center text-[10px] text-gray-400">
                        <span>Total Cases</span>
                        <span className="font-bold text-brand-dark">
                            {payload.reduce((sum: number, entry: any) => sum + entry.value, 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

// Provincial submission data
const provincialSubmissions = [
    {
        province: 'Punjab',
        casesSubmitted: 4521,
        approved: 3890,
        pending: 421,
        returned: 210,
        districts: 36,
        activeDistricts: 36,
        lastSubmission: '2 hours ago',
        trend: 12
    },
    {
        province: 'Sindh',
        casesSubmitted: 3892,
        approved: 3102,
        pending: 578,
        returned: 212,
        districts: 30,
        activeDistricts: 28,
        lastSubmission: '5 hours ago',
        trend: 8
    },
    {
        province: 'KPK',
        casesSubmitted: 2134,
        approved: 1890,
        pending: 156,
        returned: 88,
        districts: 35,
        activeDistricts: 35,
        lastSubmission: '1 hour ago',
        trend: 15
    },
    {
        province: 'Balochistan',
        casesSubmitted: 1245,
        approved: 987,
        pending: 189,
        returned: 69,
        districts: 34,
        activeDistricts: 25,
        lastSubmission: '1 day ago',
        trend: -3
    },
    {
        province: 'ICT',
        casesSubmitted: 567,
        approved: 498,
        pending: 45,
        returned: 24,
        districts: 1,
        activeDistricts: 1,
        lastSubmission: '4 hours ago',
        trend: 6
    },
    {
        province: 'AJK',
        casesSubmitted: 234,
        approved: 198,
        pending: 28,
        returned: 8,
        districts: 10,
        activeDistricts: 8,
        lastSubmission: '3 hours ago',
        trend: 4
    },
    {
        province: 'GB',
        casesSubmitted: 154,
        approved: 132,
        pending: 16,
        returned: 6,
        districts: 14,
        activeDistricts: 10,
        lastSubmission: '2 days ago',
        trend: -1
    },
];

// Monthly submission trends
const submissionTrends = [
    { month: 'Aug', submitted: 1245, approved: 1120, pending: 89, returned: 36 },
    { month: 'Sep', submitted: 1567, approved: 1410, pending: 112, returned: 45 },
    { month: 'Oct', submitted: 1823, approved: 1678, pending: 98, returned: 47 },
    { month: 'Nov', submitted: 1956, approved: 1789, pending: 121, returned: 46 },
    { month: 'Dec', submitted: 2134, approved: 1923, pending: 156, returned: 55 },
    { month: 'Jan', submitted: 2456, approved: 2198, pending: 189, returned: 69 },
];

// Case type distribution
const caseTypeData = [
    { name: 'GBV', value: 8245, color: BRAND_COLORS.teal },
    { name: 'TFGBV', value: 4502, color: BRAND_COLORS.purple },
];

// Pending requests by type
const pendingRequestTypes = [
    { type: 'New Case Submissions', count: 892, priority: 'high' },
    { type: 'Data Update Requests', count: 156, priority: 'medium' },
    { type: 'Case Amendments', count: 234, priority: 'low' },
    { type: 'Document Uploads', count: 189, priority: 'medium' },
];

// Calculate totals
const totalSubmitted = provincialSubmissions.reduce((sum, p) => sum + p.casesSubmitted, 0);
const totalApproved = provincialSubmissions.reduce((sum, p) => sum + p.approved, 0);
const totalPending = provincialSubmissions.reduce((sum, p) => sum + p.pending, 0);
const totalReturned = provincialSubmissions.reduce((sum, p) => sum + p.returned, 0);
const totalDistricts = provincialSubmissions.reduce((sum, p) => sum + p.districts, 0);
const activeDistricts = provincialSubmissions.reduce((sum, p) => sum + p.activeDistricts, 0);

// Chart card component matching dashboard style
function ChartCard({ title, subtitle, children, padding = "p-6" }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    padding?: string;
}) {
    return (
        <div className={clsx("bg-white rounded-2xl border border-brand-surface shadow-sm flex flex-col h-full", padding)}>
            <div className="mb-4">
                <h3 className="font-bold text-brand-dark text-lg">{title}</h3>
                {subtitle && <p className="text-xs text-brand-teal">{subtitle}</p>}
            </div>
            <div className="flex-1">{children}</div>
        </div>
    );
}

export default function NCSWDashboardPage() {
    const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Database className="text-brand-teal" size={28} />
                        NCSW National Overview
                    </h1>
                    <p className="text-sm text-brand-teal">Case Submissions & Provincial Data Management • FY 2024</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-surface rounded-xl text-sm font-medium text-brand-dark hover:border-brand-teal/50 hover:shadow-sm transition-all">
                        <Calendar size={16} className="text-brand-teal" />
                        This Month
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                        <Send size={16} /> Export Report
                    </button>
                </div>
            </div>

            {/* KPI Cards - Matching Dashboard Style */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <FileText size={20} className="text-brand-teal" />
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-600">
                            <TrendingUp size={14} />
                            8.2%
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-brand-dark">{totalSubmitted.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Total Submissions</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                            <CheckCircle size={20} className="text-green-500" />
                        </div>
                        <span className="text-xs font-bold text-green-600">{Math.round((totalApproved / totalSubmitted) * 100)}%</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-dark">{totalApproved.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Approved Cases</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-white rounded-2xl border border-orange-200 p-5 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                            <Clock size={20} className="text-orange-500" />
                        </div>
                        <span className="text-xs font-bold text-orange-600">Action Required</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-dark">{totalPending.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Pending Review</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                            <RotateCcw size={20} className="text-red-500" />
                        </div>
                        <span className="text-xs font-bold text-red-600">{Math.round((totalReturned / totalSubmitted) * 100)}%</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-dark">{totalReturned.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">Returned Cases</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <MapPin size={20} className="text-brand-teal" />
                        </div>
                        <span className="text-xs font-bold text-brand-teal">{activeDistricts}/{totalDistricts}</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-dark">{provincialSubmissions.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Provinces Reporting</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm hover:shadow-md transition-all"
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Shield size={20} className="text-purple-500" />
                        </div>
                        <span className="text-xs font-bold text-purple-600">35%</span>
                    </div>
                    <p className="text-2xl font-bold text-brand-dark">{(caseTypeData[1].value).toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mt-1">TFGBV Cases</p>
                </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Provincial Submissions Overview - 2 columns */}
                <div className="lg:col-span-2">
                    <ChartCard
                        title="Provincial Submissions Overview"
                        subtitle="Case submissions by province with approval status"
                    >
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={provincialSubmissions}
                                    layout="horizontal"
                                    margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                                    barGap={0}
                                >
                                    <defs>
                                        <linearGradient id="barGradientApproved" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={BRAND_COLORS.primaryGradient[0]} />
                                            <stop offset="100%" stopColor={BRAND_COLORS.primaryGradient[1]} />
                                        </linearGradient>
                                        <linearGradient id="barGradientPending" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={BRAND_COLORS.amberGradient[0]} />
                                            <stop offset="100%" stopColor={BRAND_COLORS.amberGradient[1]} />
                                        </linearGradient>
                                        <linearGradient id="barGradientReturned" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={BRAND_COLORS.redGradient[0]} />
                                            <stop offset="100%" stopColor={BRAND_COLORS.redGradient[1]} />
                                        </linearGradient>
                                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                            <feOffset dx="0" dy="2" result="offsetblur" />
                                            <feComponentTransfer>
                                                <feFuncA type="linear" slope="0.1" />
                                            </feComponentTransfer>
                                            <feMerge>
                                                <feMergeNode />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="province"
                                        tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
                                        axisLine={{ stroke: '#e2e8f0' }}
                                        tickLine={false}
                                        dy={10}
                                    />
                                    <YAxis
                                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                                        axisLine={false}
                                        tickLine={false}
                                        tickFormatter={(value) => value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                                    />
                                    <Tooltip
                                        content={<CustomTooltip />}
                                        cursor={{ fill: 'rgba(203, 213, 225, 0.15)', radius: 8 }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="circle"
                                        iconSize={8}
                                        wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600, color: '#475569' }}
                                    />
                                    <Bar
                                        dataKey="approved"
                                        name="Approved"
                                        stackId="a"
                                        fill="url(#barGradientApproved)"
                                        radius={[0, 0, 0, 0]}
                                        barSize={45}
                                        animationDuration={1500}
                                        animationBegin={0}
                                    />
                                    <Bar
                                        dataKey="pending"
                                        name="Pending"
                                        stackId="a"
                                        fill="url(#barGradientPending)"
                                        radius={[0, 0, 0, 0]}
                                        animationDuration={1500}
                                        animationBegin={200}
                                    />
                                    <Bar
                                        dataKey="returned"
                                        name="Returned"
                                        stackId="a"
                                        fill="url(#barGradientReturned)"
                                        radius={[6, 6, 0, 0]}
                                        animationDuration={1500}
                                        animationBegin={400}
                                        style={{ filter: 'url(#shadow)' }}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>
                </div>

                {/* Case Type Distribution */}
                <div>
                    <ChartCard
                        title="Case Type Distribution"
                        subtitle="GBV vs TFGBV cases"
                    >
                        <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={caseTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={50}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {caseTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-6 mt-2">
                            {caseTypeData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-sm font-medium text-brand-dark">{item.name}</span>
                                    <span className="text-xs text-gray-500">{item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        {/* Pending Request Types */}
                        <div className="mt-6 pt-4 border-t border-brand-surface">
                            <h4 className="text-sm font-bold text-brand-dark mb-3">Pending by Type</h4>
                            <div className="space-y-2">
                                {pendingRequestTypes.map((req) => (
                                    <div key={req.type} className="flex items-center justify-between p-2 bg-brand-surface/30 rounded-lg">
                                        <span className="text-xs font-medium text-brand-dark">{req.type}</span>
                                        <span className={clsx(
                                            "px-2 py-0.5 rounded text-xs font-bold",
                                            req.priority === 'high' ? "bg-red-100 text-red-600" :
                                                req.priority === 'medium' ? "bg-orange-100 text-orange-600" :
                                                    "bg-green-100 text-green-600"
                                        )}>
                                            {req.count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </div>

            {/* Submission Trends & Provincial Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Submission Trends */}
                <ChartCard
                    title="Monthly Submission Trends"
                    subtitle="Case submissions and approvals over time"
                >
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={submissionTrends} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={BRAND_COLORS.dark} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={BRAND_COLORS.dark} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={BRAND_COLORS.primary} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={BRAND_COLORS.primary} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e5e9" />
                                <XAxis dataKey="month" tick={{ fill: '#055b65', fontSize: 12 }} />
                                <YAxis tick={{ fill: '#45828b', fontSize: 11 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e5e9',
                                        borderRadius: '12px'
                                    }}
                                />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="submitted"
                                    name="Submitted"
                                    stroke={BRAND_COLORS.dark}
                                    fillOpacity={1}
                                    fill="url(#colorSubmitted)"
                                    strokeWidth={2}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="approved"
                                    name="Approved"
                                    stroke={BRAND_COLORS.primary}
                                    fillOpacity={1}
                                    fill="url(#colorApproved)"
                                    strokeWidth={2}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Provincial Detail Table */}
                <ChartCard
                    title="Provincial Status"
                    subtitle="Detailed breakdown by province"
                    padding="p-0"
                >
                    <div className="overflow-hidden rounded-b-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-brand-surface/30 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                                <tr>
                                    <th className="px-4 py-3">Province</th>
                                    <th className="px-4 py-3 text-center">Districts</th>
                                    <th className="px-4 py-3 text-center">Pending</th>
                                    <th className="px-4 py-3 text-center">Trend</th>
                                    <th className="px-4 py-3">Last Update</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-surface">
                                {provincialSubmissions.map((prov) => (
                                    <tr key={prov.province} className="hover:bg-brand-surface/20 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-brand-teal" />
                                                <span className="font-bold text-brand-dark">{prov.province}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={clsx(
                                                "text-xs font-bold",
                                                prov.activeDistricts === prov.districts ? "text-green-600" : "text-orange-600"
                                            )}>
                                                {prov.activeDistricts}/{prov.districts}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={clsx(
                                                "px-2 py-1 rounded-lg text-xs font-bold",
                                                prov.pending > 300 ? "bg-red-100 text-red-600" :
                                                    prov.pending > 100 ? "bg-orange-100 text-orange-600" :
                                                        "bg-green-100 text-green-600"
                                            )}>
                                                {prov.pending}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <div className={clsx(
                                                "flex items-center justify-center gap-1 text-xs font-bold",
                                                prov.trend > 0 ? "text-green-600" : "text-red-600"
                                            )}>
                                                {prov.trend > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                                {Math.abs(prov.trend)}%
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">{prov.lastSubmission}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ChartCard>
            </div>

            {/* Bottom Row - Two Functional Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* District Coverage by Province */}
                <ChartCard
                    title="District Coverage by Province"
                    subtitle="Active vs total districts reporting"
                >
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={provincialSubmissions}
                                layout="vertical"
                                margin={{ top: 10, right: 30, left: 60, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e5e9" />
                                <XAxis type="number" tick={{ fill: '#45828b', fontSize: 11 }} />
                                <YAxis
                                    dataKey="province"
                                    type="category"
                                    tick={{ fill: '#055b65', fontSize: 12, fontWeight: 600 }}
                                    width={55}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e5e9',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                                <Bar
                                    dataKey="districts"
                                    name="Total Districts"
                                    fill={BRAND_COLORS.soft}
                                    radius={[0, 4, 4, 0]}
                                />
                                <Bar
                                    dataKey="activeDistricts"
                                    name="Active Districts"
                                    fill={BRAND_COLORS.primary}
                                    radius={[0, 4, 4, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Approval Rate by Province - Radar Chart */}
                <ChartCard
                    title="Approval Rate by Province"
                    subtitle="Percentage of cases approved per province"
                >
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart
                                cx="50%"
                                cy="50%"
                                outerRadius="70%"
                                data={provincialSubmissions.map(p => ({
                                    province: p.province,
                                    approvalRate: Math.round((p.approved / p.casesSubmitted) * 100),
                                    pendingRate: Math.round((p.pending / p.casesSubmitted) * 100),
                                }))}
                            >
                                <PolarGrid stroke="#e0e5e9" />
                                <PolarAngleAxis
                                    dataKey="province"
                                    tick={{ fill: '#055b65', fontSize: 11, fontWeight: 600 }}
                                />
                                <PolarRadiusAxis
                                    angle={30}
                                    domain={[0, 100]}
                                    tick={{ fill: '#45828b', fontSize: 10 }}
                                />
                                <Radar
                                    name="Approval Rate %"
                                    dataKey="approvalRate"
                                    stroke={BRAND_COLORS.primary}
                                    fill={BRAND_COLORS.primary}
                                    fillOpacity={0.5}
                                    strokeWidth={2}
                                />
                                <Radar
                                    name="Pending Rate %"
                                    dataKey="pendingRate"
                                    stroke={BRAND_COLORS.amber}
                                    fill={BRAND_COLORS.amber}
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e0e5e9',
                                        borderRadius: '12px'
                                    }}
                                />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>
        </div>
    );
}
