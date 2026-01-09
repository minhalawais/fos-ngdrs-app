
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { generatePlatformStats } from "@/lib/mock-data";
import { clsx } from "clsx";
import { CheckCircle2, AlertTriangle, XCircle, Clock, Database } from "lucide-react";
import { motion } from "framer-motion";
import { ChartCard } from "./OverviewSection";

const data = generatePlatformStats();

const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-dark text-white px-4 py-3 rounded-xl shadow-xl border border-white/10">
                <p className="text-xs text-brand-teal font-semibold mb-2">{label || payload[0]?.payload?.name}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-white/70">{entry.name}:</span>
                        <span className="font-bold">{entry.value}{entry.unit || ""}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function PlatformSection() {
    return (
        <section id="platform" className="space-y-8 scroll-mt-28">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Platform Accountability</h2>
                    <p className="text-brand-teal mt-1">Social Media Compliance Monitoring (TFGBV)</p>
                </div>
                <div className="px-3 py-1 bg-indigo-100 rounded-full border border-indigo-200">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">TFGBV Monitoring</span>
                </div>
            </div>

            {/* Leaderboard */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-brand-surface/80 shadow-sm overflow-hidden"
            >
                <div className="h-0.5 bg-gradient-to-r from-indigo-500/50 via-brand-teal/30 to-transparent" />
                <div className="p-6 border-b border-brand-surface flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Database size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-dark">Platform Compliance Leaderboard</h3>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-brand-dark text-white text-xs font-bold uppercase">
                        <tr>
                            <th className="p-4">Rank</th>
                            <th className="p-4">Platform</th>
                            <th className="p-4">Compliance Score</th>
                            <th className="p-4">Response Time</th>
                            <th className="p-4">Takedown Rate</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {[...data].sort((a, b) => b.score - a.score).map((row, i) => (
                            <tr key={i} className={clsx("hover:bg-brand-surface/10 transition-colors", i === 0 ? "bg-primary-50/30" : "")}>
                                <td className="p-4">
                                    <span className={clsx(
                                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm",
                                        i === 0 ? "bg-primary-500 text-white" : "bg-brand-surface text-brand-teal"
                                    )}>
                                        {i + 1}
                                    </span>
                                </td>
                                <td className="p-4 font-bold text-brand-dark text-lg">{row.name}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-20 h-2.5 bg-brand-surface rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${row.score}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className={clsx("h-full rounded-full", row.score > 80 ? "bg-gradient-to-r from-primary-500 to-primary-400" : row.score > 50 ? "bg-gradient-to-r from-amber-500 to-amber-400" : "bg-gradient-to-r from-red-500 to-red-400")}
                                            />
                                        </div>
                                        <span className="font-bold text-brand-dark">{row.score}/100</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-brand-dark">
                                        <Clock size={14} className="text-brand-teal" />
                                        <span className="font-medium">{row.responseTime} hrs</span>
                                    </div>
                                </td>
                                <td className="p-4 font-bold text-brand-dark">{row.takedownPct}%</td>
                                <td className="p-4">
                                    {row.score > 80 ? (
                                        <span className="flex items-center gap-1.5 text-primary-600 font-bold text-xs uppercase bg-primary-50 px-3 py-1.5 rounded-lg">
                                            <CheckCircle2 size={14} /> Compliant
                                        </span>
                                    ) : row.score > 50 ? (
                                        <span className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase bg-amber-50 px-3 py-1.5 rounded-lg">
                                            <AlertTriangle size={14} /> Warning
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-red-600 font-bold text-xs uppercase bg-red-50 px-3 py-1.5 rounded-lg">
                                            <XCircle size={14} /> Violated
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Response Time Chart */}
                <ChartCard title="Average Response Time" subtitle="Hours to first action">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} layout="vertical" margin={{ left: 40 }}>
                                <defs>
                                    <linearGradient id="responseGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor={BRAND_COLORS.teal} stopOpacity={1} />
                                        <stop offset="100%" stopColor={BRAND_COLORS.primary} stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                <XAxis type="number" tick={{ fontSize: 11 }} />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="responseTime" fill="url(#responseGradient)" radius={[0, 8, 8, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Volume vs Success */}
                <ChartCard title="Takedown Success Rate" subtitle="Percentage of successful content removals">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <defs>
                                    <linearGradient id="takedownGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={BRAND_COLORS.primary} stopOpacity={1} />
                                        <stop offset="100%" stopColor={BRAND_COLORS.primary} stopOpacity={0.6} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="takedownPct" fill="url(#takedownGradient)" radius={[8, 8, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>
            </div>
        </section>
    );
}
