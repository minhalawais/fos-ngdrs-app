"use client";

import { motion } from "framer-motion";
import {
    Clock,
    AlertTriangle,
    CheckCircle2,
    FileText,
    ArrowRight,
    MapPin,
    Calendar,
    MoreVertical,
    Activity
} from "lucide-react";
import {
    generateDistrictKPIs,
    generatePendencyWatch,
    generateLethalityAlerts,
    generateRecentActivity
} from "@/lib/district-mock-data";
import { clsx } from "clsx";

const kpis = generateDistrictKPIs();
const pendency = generatePendencyWatch();
const alerts = generateLethalityAlerts();
const activity = generateRecentActivity();

export default function DistrictDashboard() {
    return (
        <div className="space-y-6">
            {/* Header with Actions */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Operational Overview</h2>
                    <p className="text-sm text-brand-teal">District Peshawar • Reporting Month: October 2023</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white border border-brand-surface rounded-xl text-sm font-bold text-brand-dark hover:bg-brand-surface/20 transition-colors shadow-sm">
                        Download Report
                    </button>
                    <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                        <FileText size={16} />
                        New Case Intake
                    </button>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((stat, i) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-5 rounded-2xl border border-brand-surface shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-brand-teal uppercase tracking-wider">{stat.label}</span>
                            <div className={clsx("p-2 rounded-lg bg-opacity-10",
                                stat.status === 'critical' ? 'bg-red-500 text-red-600' :
                                    stat.status === 'good' ? 'bg-primary-500 text-primary-600' :
                                        'bg-brand-teal text-brand-teal'
                            )}>
                                {stat.status === 'critical' ? <AlertTriangle size={18} /> :
                                    stat.status === 'good' ? <CheckCircle2 size={18} /> :
                                        <Activity size={18} />}
                            </div>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-3xl font-black text-brand-dark">{stat.value}</h3>
                            {typeof stat.trend === 'number' && (
                                <span className={clsx("text-xs font-bold px-1.5 py-0.5 rounded",
                                    (stat.status === 'positive' && stat.trend < 0) || (stat.status !== 'positive' && stat.trend > 0) ? "text-red-600 bg-red-50" : "text-primary-600 bg-primary-50"
                                )}>
                                    {stat.trend > 0 ? '+' : ''}{stat.trend}%
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] font-medium text-brand-dark/50 mt-1">{stat.trendLabel}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Column: Pendency & Map */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Pendency Watch */}
                    <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-brand-surface flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                <Clock className="text-amber-500" size={20} />
                                <h3 className="font-bold text-brand-dark">Pendency Watch</h3>
                            </div>
                            <button className="text-xs font-bold text-brand-teal hover:text-brand-dark flex items-center gap-1">
                                View All <ArrowRight size={12} />
                            </button>
                        </div>
                        <div className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-brand-surface/10 text-xs text-brand-dark/70 font-bold uppercase tracking-wider border-b border-brand-surface">
                                        <tr>
                                            <th className="px-5 py-3">Case ID</th>
                                            <th className="px-5 py-3">Survivor</th>
                                            <th className="px-5 py-3">Stage Delay</th>
                                            <th className="px-5 py-3">Bottleneck</th>
                                            <th className="px-5 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-surface">
                                        {pendency.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-brand-surface/5 transition-colors">
                                                <td className="px-5 py-3 font-mono text-xs font-medium text-brand-dark">{item.caseId}</td>
                                                <td className="px-5 py-3 font-bold text-brand-dark">{item.survivor}</td>
                                                <td className="px-5 py-3">
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-md text-xs font-bold border border-amber-100">
                                                        <Clock size={12} /> {item.daysPending} days
                                                    </span>
                                                </td>
                                                <td className="px-5 py-3 text-xs text-brand-dark/70">{item.reason}</td>
                                                <td className="px-5 py-3">
                                                    <button className="text-xs font-bold text-primary-600 hover:text-primary-700 underline decoration-dotted">
                                                        Escalate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Quick Analytics / Map Placeholder */}
                    <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden min-h-[300px] relative group">
                        <div className="absolute inset-0 bg-[url('https://carto.com/help/images/guides/styling/cartocss/06-points1.png')] bg-cover opacity-10 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />

                        <div className="relative p-6">
                            <h3 className="font-bold text-brand-dark mb-2">High Risk Clusters</h3>
                            <div className="flex gap-2 mb-4">
                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold border border-red-200">2 Hotspots Identified</span>
                                <span className="px-3 py-1 bg-white border border-brand-surface rounded-full text-xs font-bold text-brand-dark/70">UC-45, Hayatabad</span>
                            </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-xl border border-brand-surface flex justify-between items-center shadow-lg">
                            <div>
                                <h4 className="font-bold text-sm text-brand-dark">Geospatial Analysis</h4>
                                <p className="text-xs text-brand-dark/60">Pattern matching enabled for repeat offenses</p>
                            </div>
                            <button className="p-2 rounded-lg bg-brand-dark text-white hover:bg-brand-teal transition-colors">
                                <MapPin size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Alerts & Activity */}
                <div className="space-y-6">
                    {/* Lethality Alert Card */}
                    <div className="bg-red-50 rounded-2xl border border-red-100 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 text-red-700 font-bold border-b border-red-200 pb-3">
                            <AlertTriangle size={20} />
                            <h3>Lethality Alerts (Immediate)</h3>
                        </div>
                        <div className="space-y-3">
                            {alerts.map((alert, idx) => (
                                <div key={idx} className="bg-white p-3 rounded-xl border border-red-100 shadow-sm relative overflow-hidden group hover:border-red-300 transition-colors cursor-pointer">
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-red-500 opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity" />
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-brand-dark">{alert.survivor}</h4>
                                        <span className="text-[10px] font-black bg-red-100 text-red-600 px-1.5 py-0.5 rounded uppercase">{alert.risk}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {alert.indicators.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[9px] font-bold text-brand-dark/70 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="text-[10px] text-brand-dark/50 font-mono">{alert.caseId}</div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors">
                            Access Campbell Protocol
                        </button>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl border border-brand-surface shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4 font-bold text-brand-dark">
                            <Activity size={18} className="text-brand-teal" />
                            <h3>Recent Activity</h3>
                        </div>
                        <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-brand-surface">
                            {activity.map((item, idx) => (
                                <div key={idx} className="relative">
                                    <div className="absolute -left-[16px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-brand-teal shadow-[0_0_0_2px_white]" />
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-brand-dark">{item.action}</span>
                                        <span className="text-[10px] font-bold text-brand-teal/80 mb-0.5">{item.time} • {item.user}</span>
                                        <span className="text-xs text-brand-dark/60 leading-snug">{item.details}</span>
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
