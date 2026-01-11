"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Clock, AlertTriangle, CheckCircle, FileText, ArrowRight, MapPin, Calendar,
    Activity, Database, TrendingUp, TrendingDown, ArrowUpRight, Shield, Users,
    Zap, RefreshCw, X, Download, Upload, Check, Scale, Globe, Smartphone, Home
} from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, Cell, Legend, PieChart, Pie
} from 'recharts';
import {
    generateDashboardKPIs,
    generateCaseStatusDistribution,
    generateMonthlyTrends,
    generateOfficialAPIs,
    generateAPIRecords,
    generateRecentEntries,
    generateFormTypeDistribution,
    generateCaseResolutionPipeline,
    generatePendingActions
} from "@/lib/district-dashboard-data";
import { clsx } from "clsx";
import Link from "next/link";

// Brand Colors
const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
    dark: "#055b65",
    soft: "#b2c9c5",
    red: "#ef4444",
    amber: "#f59e0b",
    blue: "#3b82f6",
    purple: "#8b5cf6",
    surface: "#f8fafb"
};

// Data
const kpis = generateDashboardKPIs();
const caseStatusData = generateCaseStatusDistribution();
const monthlyTrends = generateMonthlyTrends();
const officialAPIs = generateOfficialAPIs();
const recentEntries = generateRecentEntries();
const formTypeData = generateFormTypeDistribution();
const pipelineData = generateCaseResolutionPipeline();
const pendingActions = generatePendingActions();
const formTypeTotal = formTypeData.reduce((sum, d) => sum + d.value, 0);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-brand-soft/30 p-3 rounded-xl shadow-xl">
                <p className="text-xs font-bold text-[#055b65] mb-2">{label}</p>
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
        );
    }
    return null;
};

// Chart Card Component
function ChartCard({ title, subtitle, children, icon: Icon }: any) {
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
            </div>
            <div className="p-5 flex-1">{children}</div>
        </div>
    );
}

export default function DistrictDashboard() {
    const [showAPIModal, setShowAPIModal] = useState(false);
    const [selectedAPI, setSelectedAPI] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [fetchedRecords, setFetchedRecords] = useState<any[]>([]);
    const [fetchSuccess, setFetchSuccess] = useState(false);

    const handleFetchData = async () => {
        if (!selectedAPI) return;
        setIsFetching(true);
        setFetchedRecords([]);
        await new Promise(r => setTimeout(r, 2000));
        const records = generateAPIRecords(selectedAPI);
        setFetchedRecords(records);
        setIsFetching(false);
        setFetchSuccess(true);
    };

    const handleDownloadCSV = () => {
        const headers = ['ID', 'Type', 'Date', 'Status', 'Details'];
        const csvContent = [
            headers.join(','),
            ...fetchedRecords.map(r => `${r.id},${r.type},${r.date},${r.status},"${r.details}"`)
        ].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedAPI}-data.csv`;
        a.click();
    };

    const resetModal = () => {
        setShowAPIModal(false);
        setSelectedAPI(null);
        setFetchedRecords([]);
        setFetchSuccess(false);
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Run API Modal */}
            <AnimatePresence>
                {showAPIModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !isFetching && resetModal()}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[32px] shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#055b65]/5 to-transparent">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg bg-[#055b65] text-white">
                                        <Database size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-gray-900">Official Data Sources</h2>
                                        <p className="text-xs text-gray-500">Fetch records from connected government APIs</p>
                                    </div>
                                </div>
                                <button onClick={resetModal} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto flex-1">
                                {fetchedRecords.length === 0 ? (
                                    <>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Select Data Source</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {officialAPIs.map((api) => {
                                                const IconComp = api.icon;
                                                const isSelected = selectedAPI === api.id;
                                                return (
                                                    <button
                                                        key={api.id}
                                                        onClick={() => setSelectedAPI(api.id)}
                                                        className={clsx(
                                                            "p-4 rounded-2xl border-2 text-left transition-all duration-200",
                                                            isSelected ? "shadow-lg scale-[1.02]" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                                        )}
                                                        style={isSelected ? { borderColor: api.color, backgroundColor: `${api.color}10` } : {}}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: api.color }}>
                                                                <IconComp size={18} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <div className="flex items-center justify-between">
                                                                    <h4 className="font-bold text-sm text-gray-800">{api.name}</h4>
                                                                    <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all", isSelected ? "" : "border-gray-300")}
                                                                        style={isSelected ? { borderColor: api.color, backgroundColor: api.color } : {}}>
                                                                        {isSelected && <Check size={12} className="text-white" />}
                                                                    </div>
                                                                </div>
                                                                <p className="text-[10px] text-gray-500 mt-1">{api.description}</p>
                                                                <p className="text-[10px] font-bold text-gray-400 mt-2">{api.recordsAvailable.toLocaleString()} records available</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <Check className="text-green-500" size={18} />
                                                <span className="text-sm font-bold text-gray-800">{fetchedRecords.length} Records Fetched</span>
                                            </div>
                                            <button onClick={() => { setFetchedRecords([]); setFetchSuccess(false); }} className="text-xs font-bold text-[#055b65] hover:underline">
                                                ← Back to Sources
                                            </button>
                                        </div>
                                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                                            <table className="w-full text-left">
                                                <thead className="bg-gray-50 text-[10px] text-gray-500 font-black uppercase tracking-widest">
                                                    <tr>
                                                        <th className="px-4 py-3">ID</th>
                                                        <th className="px-4 py-3">Type</th>
                                                        <th className="px-4 py-3">Date</th>
                                                        <th className="px-4 py-3">Status</th>
                                                        <th className="px-4 py-3">Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {fetchedRecords.map((rec, idx) => (
                                                        <tr key={idx} className="hover:bg-gray-50/50">
                                                            <td className="px-4 py-3 text-xs font-mono font-bold text-gray-700">{rec.id}</td>
                                                            <td className="px-4 py-3 text-xs font-medium text-gray-600">{rec.type}</td>
                                                            <td className="px-4 py-3 text-xs text-gray-500">{rec.date}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-lg",
                                                                    rec.status === 'Active' ? 'bg-green-50 text-green-600' :
                                                                        rec.status === 'Resolved' ? 'bg-blue-50 text-blue-600' :
                                                                            'bg-amber-50 text-amber-600'
                                                                )}>{rec.status}</span>
                                                            </td>
                                                            <td className="px-4 py-3 text-xs text-gray-500">{rec.details}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Modal Footer */}
                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
                                {fetchedRecords.length === 0 ? (
                                    <>
                                        <p className="text-xs text-gray-500">
                                            {selectedAPI ? <span className="font-bold text-[#055b65]">1 source selected</span> : 'Select a data source'}
                                        </p>
                                        <button
                                            onClick={handleFetchData}
                                            disabled={!selectedAPI || isFetching}
                                            className="px-8 py-3 rounded-xl font-black text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 bg-[#055b65]"
                                        >
                                            {isFetching ? (
                                                <><RefreshCw size={16} className="animate-spin" /> Fetching...</>
                                            ) : (
                                                <><Database size={16} /> Fetch Data</>
                                            )}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xs text-gray-500">{fetchedRecords.length} records ready for action</p>
                                        <div className="flex items-center gap-3">
                                            <button onClick={handleDownloadCSV} className="px-6 py-3 rounded-xl font-bold text-[#055b65] border-2 border-[#055b65]/20 bg-white hover:bg-[#055b65]/5 transition-all flex items-center gap-2">
                                                <Download size={16} /> Download CSV
                                            </button>
                                            <button className="px-6 py-3 rounded-xl font-black text-white shadow-lg bg-[#1bd488] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
                                                <Upload size={16} /> Load to System
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#055b65] tracking-tight flex items-center gap-3">
                        <Activity className="text-[#1bd488]" size={28} />
                        Operational Overview
                    </h1>
                    <p className="text-sm text-[#45828b] font-medium">District Peshawar • Reporting Cycle: Jan 2026</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#055b65] hover:bg-gray-50 transition-all shadow-sm flex items-center gap-2">
                        <Calendar size={14} className="text-[#45828b]" />
                        This Month
                    </button>
                    <button onClick={() => setShowAPIModal(true)} className="px-4 py-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-xs font-bold text-indigo-600 hover:bg-indigo-100 transition-all shadow-sm flex items-center gap-2">
                        <RefreshCw size={14} />
                        Run API
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
                                        stat.status === 'warning' ? 'bg-amber-500/10 text-amber-600' :
                                            'bg-[#45828b]/10 text-[#45828b]'
                            )}>
                                {stat.status === 'critical' ? <AlertTriangle size={18} /> :
                                    stat.status === 'good' ? <CheckCircle size={18} /> :
                                        stat.status === 'warning' ? <Clock size={18} /> :
                                            <Activity size={18} />}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2 relative">
                            <h3 className="text-3xl font-black text-[#055b65] tracking-tighter">{stat.value.toLocaleString()}</h3>
                            <div className={clsx("flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-lg",
                                stat.trend > 0 && stat.status === 'critical' ? "text-red-600 bg-red-50" :
                                    stat.trend < 0 && stat.status !== 'critical' ? "text-[#14b070] bg-[#1bd488]/10" :
                                        stat.trend > 0 ? "text-[#14b070] bg-[#1bd488]/10" : "text-red-600 bg-red-50"
                            )}>
                                {stat.trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {Math.abs(stat.trend)}%
                            </div>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tight">{stat.trendLabel}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Case Status Distribution Bar Chart */}
                <ChartCard title="Case Status Distribution" subtitle="Current workflow status breakdown" icon={Scale}>
                    <div className="h-[280px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={caseStatusData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#45828b', fontSize: 9, fontWeight: 700 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafb' }} />
                                <Bar dataKey="count" name="Cases" radius={[6, 6, 0, 0]} barSize={50} animationDuration={1500}>
                                    {caseStatusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Monthly Data Trends */}
                <ChartCard title="Monthly Data Trends" subtitle="Case submissions over 6 months" icon={TrendingUp}>
                    <div className="h-[280px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={monthlyTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#055b65" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#055b65" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUpdated" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#1bd488" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="#1bd488" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#45828b', fontSize: 10, fontWeight: 700 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                <Area type="monotone" dataKey="cases" name="New Cases" stroke="#055b65" strokeWidth={2} fillOpacity={1} fill="url(#colorCases)" animationDuration={2000} />
                                <Area type="monotone" dataKey="updated" name="Updated" stroke="#1bd488" strokeWidth={2} fillOpacity={1} fill="url(#colorUpdated)" animationDuration={2000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>

            {/* Second Row: Donut + Pipeline + Pending Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Submission by Type - Donut Chart */}
                <ChartCard title="Form Submissions by Type" subtitle="Distribution of entries this month" icon={FileText}>
                    <div className="h-[260px] w-full mt-2 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={formTypeData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={3}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {formTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute flex flex-col items-center justify-center">
                            <span className="text-3xl font-black text-[#055b65]">{formTypeTotal}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Total</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 mt-2">
                        {formTypeData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-[10px] font-bold text-gray-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </ChartCard>

                {/* Case Resolution Pipeline - Funnel */}
                <ChartCard title="Case Resolution Pipeline" subtitle="Justice system progression" icon={Scale}>
                    <div className="space-y-2 mt-4">
                        {pipelineData.map((stage, idx) => (
                            <div key={idx} className="relative">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase">{stage.stage}</span>
                                    <span className="text-xs font-black text-[#055b65]">{stage.count.toLocaleString()}</span>
                                </div>
                                <div className="h-6 bg-gray-100 rounded-lg overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stage.percentage}%` }}
                                        transition={{ duration: 1, delay: idx * 0.1 }}
                                        className="h-full rounded-lg flex items-center justify-end pr-2"
                                        style={{ backgroundColor: stage.color }}
                                    >
                                        {stage.percentage > 15 && (
                                            <span className="text-[9px] font-black text-white">{stage.percentage}%</span>
                                        )}
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Conviction Rate</span>
                        <span className="text-sm font-black text-[#059669]">{((pipelineData[5].count / pipelineData[0].count) * 100).toFixed(1)}%</span>
                    </div>
                </ChartCard>

                {/* Pending Actions Queue - Cards */}
                <ChartCard title="Pending Actions" subtitle="Items requiring immediate attention" icon={AlertTriangle}>
                    <div className="space-y-3 mt-4">
                        {pendingActions.map((action, idx) => (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer group"
                                style={{ borderLeftWidth: 4, borderLeftColor: action.color }}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-800">{action.title}</h4>
                                        {action.deadline && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <Clock size={10} className="text-gray-400" />
                                                <span className={clsx("text-[10px] font-bold",
                                                    action.deadline === 'Today' ? 'text-red-500' : 'text-amber-500'
                                                )}>{action.deadline}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl font-black" style={{ color: action.color }}>{action.count}</span>
                                        <ArrowRight size={14} className="text-gray-300 group-hover:text-[#055b65] group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button className="w-full mt-4 py-3 bg-[#055b65] hover:bg-[#45828b] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2">
                        View All Pending Items
                    </button>
                </ChartCard>
            </div>

            {/* Recent Entries Table */}
            <ChartCard title="Recent Entries" subtitle="Latest form submissions and their status" icon={FileText}>
                <div className="overflow-x-auto -mx-5 -mb-5">
                    <table className="w-full text-left">
                        <thead className="bg-[#f8fafb] text-[10px] text-[#45828b] font-black uppercase tracking-widest border-y border-gray-100">
                            <tr>
                                <th className="px-6 py-4">Entry ID</th>
                                <th className="px-6 py-4">Form Type</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Submitted By</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 bg-white">
                            {recentEntries.map((entry, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/80 transition-all group">
                                    <td className="px-6 py-4">
                                        <span className="text-xs font-mono font-bold text-[#055b65]">{entry.id}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-lg uppercase",
                                            entry.formType === 'case' ? 'bg-blue-50 text-blue-600' :
                                                entry.formType === 'prevention' ? 'bg-green-50 text-green-600' :
                                                    entry.formType === 'awareness' ? 'bg-amber-50 text-amber-600' :
                                                        'bg-pink-50 text-pink-600'
                                        )}>{entry.formType}</span>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-gray-700 max-w-[200px] truncate">{entry.title}</td>
                                    <td className="px-6 py-4 text-xs text-gray-500">{entry.submittedBy}</td>
                                    <td className="px-6 py-4 text-xs text-gray-400">{entry.timestamp}</td>
                                    <td className="px-6 py-4">
                                        <span className={clsx("text-[10px] font-bold px-2 py-1 rounded-lg",
                                            entry.status === 'synced' || entry.status === 'approved' ? 'bg-green-50 text-green-600' :
                                                entry.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                                                    'bg-red-50 text-red-600'
                                        )}>{entry.status.toUpperCase()}</span>
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
    );
}
