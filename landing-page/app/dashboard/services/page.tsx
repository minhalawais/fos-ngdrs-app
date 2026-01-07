
"use client";

import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts';
import { generateServiceGaps } from "@/lib/mock-data";
import { Check, X, HeartHandshake, Home, Activity } from "lucide-react";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const data = generateServiceGaps();

const services = [
    { name: "Medical Aid", value: 92, color: "#1bd488" },
    { name: "Psychosocial Support", value: 65, color: "#45828b" },
    { name: "Legal Aid", value: 45, color: "#f59e0b" },
    { name: "Shelter Provided", value: 78, color: "#055b65" },
];

const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
};

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-brand-dark text-white px-4 py-3 rounded-xl shadow-xl border border-white/10">
                <p className="text-xs text-brand-teal font-semibold mb-2">{payload[0]?.payload?.subject}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-white/70">{entry.name}:</span>
                        <span className="font-bold">{entry.value}%</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// Chart Card Component
function ChartCard({ title, subtitle, children, className }: any) {
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
                    <div className="w-8 h-8 rounded-lg bg-brand-surface/50 flex items-center justify-center opacity-50">
                        <Activity size={16} className="text-brand-teal" />
                    </div>
                </div>
                {children}
            </div>
        </motion.div>
    );
}

export default function ServicesPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex items-end justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="px-3 py-1 bg-primary-100 rounded-full border border-primary-200">
                            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">Survivor-Centric</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-heading font-bold text-brand-dark">Survivor Support Matrix</h1>
                    <p className="text-brand-teal/80 mt-1">Monitoring Service Provision & Resource Gaps</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Radar Chart */}
                <ChartCard title="Service Gap Analysis" subtitle="Comparison of Requested vs Provided Services">
                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: BRAND_COLORS.teal, fontSize: 12, fontWeight: 600 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Requested" dataKey="B" stroke={BRAND_COLORS.teal} fill={BRAND_COLORS.teal} fillOpacity={0.15} strokeWidth={2} />
                                <Radar name="Provided" dataKey="A" stroke={BRAND_COLORS.primary} fill={BRAND_COLORS.primary} fillOpacity={0.4} strokeWidth={2} />
                                <Tooltip content={<CustomTooltip />} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                {/* Circular Progress Care Matrix */}
                <div className="grid grid-cols-2 gap-4">
                    {services.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-brand-surface/80 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                                {/* CSS Conic Gradient for simple circular progress */}
                                <div
                                    className="absolute inset-0 rounded-full transition-transform group-hover:scale-105"
                                    style={{
                                        background: `conic-gradient(${s.color} ${s.value}%, #e5e7eb ${s.value}%)`,
                                        mask: 'radial-gradient(transparent 55%, black 56%)',
                                        WebkitMask: 'radial-gradient(transparent 55%, black 56%)'
                                    }}
                                />
                                <span className="text-3xl font-black text-brand-dark">{s.value}%</span>
                            </div>
                            <h4 className="font-bold text-brand-dark">{s.name}</h4>
                            <span className="text-xs text-brand-teal/80 mt-1">Target: 100%</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Shelter Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-brand-surface/80 shadow-sm overflow-hidden"
            >
                <div className="h-0.5 bg-gradient-to-r from-primary-500/50 via-brand-teal/30 to-transparent" />
                <div className="p-6 border-b border-brand-surface flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                            <Home size={20} />
                        </div>
                        <h3 className="text-lg font-bold text-brand-dark">Shelter Capacity Status</h3>
                    </div>
                    <button className="text-sm font-bold text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg transition-colors">
                        View All Shelters
                    </button>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-brand-dark text-white text-xs font-bold uppercase">
                        <tr>
                            <th className="p-4">District</th>
                            <th className="p-4">Shelter Name</th>
                            <th className="p-4">Capacity</th>
                            <th className="p-4">Occupancy</th>
                            <th className="p-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {[
                            { d: "Lahore", n: "Dar-ul-Aman 1", c: 50, o: 48, s: "Full" },
                            { d: "Karachi", n: "Panah Shelter", c: 100, o: 65, s: "Available" },
                            { d: "Islamabad", n: "Shaheed Benazir Center", c: 40, o: 12, s: "Available" },
                            { d: "Peshawar", n: "Women Crisis Center", c: 30, o: 30, s: "Critical" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-brand-surface/10 transition-colors">
                                <td className="p-4 font-medium text-brand-dark">{row.d}</td>
                                <td className="p-4 text-brand-teal">{row.n}</td>
                                <td className="p-4">{row.c}</td>
                                <td className="p-4 font-bold">{row.o}</td>
                                <td className="p-4">
                                    <span className={clsx("px-3 py-1.5 rounded-lg text-xs font-bold",
                                        row.s === "Full" || row.s === "Critical" ? "bg-red-100 text-red-700" : "bg-primary-100 text-primary-700"
                                    )}>
                                        {row.s}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
