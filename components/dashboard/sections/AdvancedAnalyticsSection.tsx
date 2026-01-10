"use client";

import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, Smartphone, Target, RotateCcw, Zap } from "lucide-react";
import { ChartCard } from "./OverviewSection"; // Reusing the consistent card wrapper

// --- MOCK DATA ---
const provincialTrends = [
    { month: 'Jul', Punjab: 450, Sindh: 380, KPK: 210, Balochistan: 120, ICT: 45 },
    { month: 'Aug', Punjab: 480, Sindh: 400, KPK: 230, Balochistan: 130, ICT: 52 },
    { month: 'Sep', Punjab: 520, Sindh: 420, KPK: 250, Balochistan: 140, ICT: 48 },
    { month: 'Oct', Punjab: 580, Sindh: 450, KPK: 280, Balochistan: 160, ICT: 60 },
    { month: 'Nov', Punjab: 620, Sindh: 480, KPK: 310, Balochistan: 180, ICT: 58 },
    { month: 'Dec', Punjab: 680, Sindh: 510, KPK: 340, Balochistan: 200, ICT: 65 },
];

const takedownSuccessData = [
    { platform: 'Facebook', requested: 1200, successful: 1050, rate: 87 },
    { platform: 'WhatsApp', requested: 800, successful: 620, rate: 77 },
    { platform: 'TikTok', requested: 950, successful: 880, rate: 92 },
    { platform: 'Instagram', requested: 600, successful: 540, rate: 90 },
    { platform: 'YouTube', requested: 300, successful: 290, rate: 96 },
    { platform: 'X (Twitter)', requested: 450, successful: 210, rate: 46 },
];

const closureReasonData = [
    { name: 'Lack of Evidence', value: 450, color: '#ef4444' },
    { name: 'Settlement/Compromise', value: 320, color: '#f59e0b' },
    { name: 'Prior Withdrawal', value: 280, color: '#3b82f6' },
    { name: 'Jurisdiction Transfer', value: 150, color: '#8b5cf6' },
    { name: 'Convicted (Judgment)', value: 890, color: '#1bd488' },
];

const dataConsistencyData = [
    { province: 'Punjab', timeliness: 95, completeness: 98, freq: 100 },
    { province: 'ICT', timeliness: 92, completeness: 95, freq: 100 },
    { province: 'Sindh', timeliness: 82, completeness: 88, freq: 90 },
    { province: 'KPK', timeliness: 88, completeness: 82, freq: 95 },
    { province: 'AJK', timeliness: 75, completeness: 80, freq: 85 },
    { province: 'GB', timeliness: 68, completeness: 75, freq: 70 },
    { province: 'Baloch.', timeliness: 62, completeness: 65, freq: 65 },
];

// --- BRAND CONSTANTS ---
const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
    dark: "#055b65",
    soft: "#b2c9c5",
    red: "#ef4444",
    amber: "#f59e0b",
    purple: "#8b5cf6",
    surface: "#f8fafb"
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-brand-soft/30 p-3 rounded-xl shadow-xl shadow-brand-dark/5 ring-1 ring-black/5">
                <p className="text-sm font-bold text-brand-dark mb-2">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 justify-between">
                            <span className="text-[10px] font-bold text-brand-teal uppercase">{entry.name}</span>
                            <span className="text-xs font-black text-brand-dark">
                                {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default function AdvancedAnalyticsSection() {
    return (
        <section id="advanced-analytics" className="space-y-6 scroll-mt-28">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Strategic Intelligence</h2>
                    <p className="text-brand-teal mt-1">Advanced Monitoring & Performance Analytics</p>
                </div>
                <div className="px-3 py-1 bg-brand-dark/5 rounded-full border border-brand-dark/10">
                    <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">National Metrics</span>
                </div>
            </div>

            {/* SECTION 1: PROVINCIAL TRENDS & CONSISTENCY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ChartCard title="Monthly Cases by Province" subtitle="Comparative trends (Last 6 Months)">
                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={provincialTrends} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#45828b', fontSize: 10, fontWeight: 700 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: 20, fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }} />
                                    <Line type="monotone" dataKey="Punjab" stroke="#055b65" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="Sindh" stroke="#1bd488" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="KPK" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                                    <Line type="monotone" dataKey="Balochistan" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>
                </div>

                <div>
                    <ChartCard title="Data Consistency" subtitle="Timeliness vs Completeness Score">
                        <div className="h-[350px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataConsistencyData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="province" type="category" axisLine={false} tickLine={false} tick={{ fill: '#055b65', fontSize: 10, fontWeight: 800 }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="timeliness" name="Timeliness" fill="#1bd488" radius={[0, 4, 4, 0]} barSize={8} />
                                    <Bar dataKey="completeness" name="Completeness" fill="#45828b" radius={[0, 4, 4, 0]} barSize={8} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>
                </div>
            </div>

            {/* SECTION 2: SPECIALIZED ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Social Media Takedowns" subtitle="PECA Request Success Rate">
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={takedownSuccessData} layout="vertical" margin={{ top: 0, right: 20, left: 40, bottom: 0 }} barGap={0}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="platform" type="category" axisLine={false} tickLine={false} tick={{ fill: '#45828b', fontSize: 10, fontWeight: 700 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend iconType="circle" wrapperStyle={{ paddingTop: 10, fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }} />
                                <Bar dataKey="requested" name="Requests" fill="#cbd5e1" radius={[0, 6, 6, 0]} barSize={12} />
                                <Bar dataKey="successful" name="Success" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </ChartCard>

                <ChartCard title="Case Closure Reasons" subtitle="Outcome distribution analysis">
                    <div className="flex items-center h-[300px]">
                        <div className="flex-1 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={closureReasonData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                        {closureReasonData.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/3 space-y-3 pr-4">
                            {closureReasonData.map(d => (
                                <div key={d.name} className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                                    <span className="text-xs font-bold text-gray-600 leading-tight">{d.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChartCard>
            </div>
        </section>
    );
}
