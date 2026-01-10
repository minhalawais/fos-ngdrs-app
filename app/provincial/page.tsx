"use client";

import { motion } from "framer-motion";
import {
    FileText,
    CheckCircle,
    AlertTriangle,
    Scale,
    Clock,
    Heart,
    TrendingUp,
    TrendingDown,
    MapPin,
    ArrowRight
} from "lucide-react";
import {
    generateProvincialKPIs,
    generateProvincialTrends,
    generateCaseTypeDistribution,
    generateRedZoneAlerts
} from "@/lib/provincial-mock-data";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from "recharts";
import Link from "next/link";
import { clsx } from "clsx";

const ICONS: Record<string, any> = {
    FileText, CheckCircle, AlertTriangle, Scale, Clock, Heart
};

const kpis = generateProvincialKPIs();
const trends = generateProvincialTrends();
const caseTypes = generateCaseTypeDistribution();
const alerts = generateRedZoneAlerts();

export default function ProvincialDashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark">Provincial Aggregation Dashboard</h1>
                    <p className="text-sm text-brand-teal">Punjab Province • Real-time district aggregation</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2 bg-white border border-brand-surface text-brand-dark font-bold rounded-xl text-sm hover:bg-gray-50 transition-all">
                        Download Report
                    </button>
                    <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                        CS Quarterly Brief
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {kpis.map((kpi, idx) => {
                    const Icon = ICONS[kpi.icon] || FileText;
                    return (
                        <motion.div
                            key={kpi.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={clsx(
                                "bg-white rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md",
                                kpi.status === 'critical' ? "border-red-200" : "border-brand-surface"
                            )}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className={clsx(
                                    "w-10 h-10 rounded-xl flex items-center justify-center",
                                    kpi.status === 'critical' ? "bg-red-50 text-red-500" :
                                        kpi.status === 'positive' ? "bg-green-50 text-green-500" :
                                            kpi.status === 'warning' ? "bg-orange-50 text-orange-500" :
                                                "bg-brand-surface/50 text-brand-teal"
                                )}>
                                    <Icon size={20} />
                                </div>
                                {kpi.trend !== 0 && (
                                    <div className={clsx(
                                        "flex items-center gap-1 text-xs font-bold",
                                        kpi.trend > 0 && kpi.status !== 'critical' ? "text-green-600" :
                                            kpi.trend < 0 && kpi.status === 'positive' ? "text-green-600" :
                                                "text-red-600"
                                    )}>
                                        {kpi.trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                        {Math.abs(kpi.trend)}%
                                    </div>
                                )}
                            </div>
                            <p className="text-2xl font-bold text-brand-dark">{kpi.value}</p>
                            <p className="text-xs text-gray-500 mt-1">{kpi.label}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Trend Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-brand-dark">Monthly Case Trends</h3>
                            <p className="text-xs text-brand-teal">GBV vs TFGBV comparison</p>
                        </div>
                        <div className="flex gap-4 text-xs font-medium">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500" /> GBV
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-purple-500" /> TFGBV
                            </span>
                        </div>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={trends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                                <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                />
                                <Line type="monotone" dataKey="gbv" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 4 }} />
                                <Line type="monotone" dataKey="tfgbv" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Case Type Distribution */}
                <div className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                    <h3 className="font-bold text-brand-dark mb-2">Case Type Distribution</h3>
                    <p className="text-xs text-brand-teal mb-4">Province-wide breakdown</p>
                    <div className="h-52">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={caseTypes}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                >
                                    {caseTypes.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-4 space-y-2">
                        {caseTypes.slice(0, 3).map((type) => (
                            <div key={type.name} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: type.color }} />
                                    {type.name}
                                </span>
                                <span className="font-bold">{type.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Red Zone Alerts */}
                <div className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                <AlertTriangle size={18} className="text-red-500" />
                                Active Red Zone Alerts
                            </h3>
                            <p className="text-xs text-brand-teal">Requires immediate attention</p>
                        </div>
                        <Link href="/provincial/alerts" className="text-xs font-bold text-brand-teal hover:underline flex items-center gap-1">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {alerts.slice(0, 3).map((alert) => (
                            <div
                                key={alert.id}
                                className={clsx(
                                    "p-4 rounded-xl border-l-4",
                                    alert.severity === 'Critical' ? "bg-red-50 border-red-500" :
                                        alert.severity === 'High' ? "bg-orange-50 border-orange-500" :
                                            "bg-yellow-50 border-yellow-500"
                                )}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-brand-dark">{alert.district}</span>
                                    <span className={clsx(
                                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                                        alert.status === 'Open' ? "bg-red-100 text-red-700" :
                                            alert.status === 'Escalated' ? "bg-purple-100 text-purple-700" :
                                                "bg-yellow-100 text-yellow-700"
                                    )}>
                                        {alert.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{alert.trigger}</p>
                                <p className="text-xs text-gray-400 mt-2">{alert.raisedAt} • {alert.assignedTo}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Provincial GIS Placeholder */}
                <div className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                <MapPin size={18} className="text-brand-teal" />
                                Provincial Risk Heatmap
                            </h3>
                            <p className="text-xs text-brand-teal">District-level aggregation</p>
                        </div>
                    </div>
                    <div className="h-64 bg-gradient-to-br from-brand-surface/30 to-brand-surface/10 rounded-xl flex items-center justify-center border-2 border-dashed border-brand-surface">
                        <div className="text-center">
                            <MapPin size={48} className="mx-auto text-brand-teal/30 mb-3" />
                            <p className="text-sm font-medium text-gray-400">GIS Integration</p>
                            <p className="text-xs text-gray-300">Pakistan district boundaries</p>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-center gap-6 text-xs">
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-green-400" /> Low Risk
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-yellow-400" /> Moderate
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded bg-red-500" /> High Risk
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
