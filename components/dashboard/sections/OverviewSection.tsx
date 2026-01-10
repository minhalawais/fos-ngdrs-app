
"use client";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
    RadialBarChart, RadialBar, Cell,
    PieChart, Pie, LabelList
} from 'recharts';
import { useState, useEffect } from 'react';
import KPICard from "@/components/dashboard/KPICard";
import { generateKPIs, generateCrimeTrends, generateServiceGaps, generatePlatformStats, generateDetailedBreakdown, generateReportingChannelData, generateClosureReasons, generateFunnelData, generateDistrictHotspots, generateShelterPrograms } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import {
    Activity, TrendingDown, AlertCircle, Landmark, Shield, HeartHandshake, Phone, Smartphone, Gavel, Globe, FileSearch, Monitor, Building2
} from "lucide-react";

// Trapezoid Funnel Data
const funnelData = generateFunnelData();

// Proper Trapezoid Funnel Component
// Proper Trapezoid Funnel Component
function TrapezoidFunnel({ data }: { data: typeof funnelData }) {
    const maxValue = data[0].value;
    const height = 400;
    const width = 400; // ViewBox width
    const maxWidth = 380; // Actual max width of the funnel shape - Expanded to fill card
    const gap = 4;
    const stageHeight = (height - (gap * (data.length - 1))) / data.length;
    const minWidth = 100;

    const getVisualWidth = (val: number) => {
        const rawWidth = (val / maxValue) * maxWidth;
        return Math.max(rawWidth, minWidth);
    };

    const funnelColors = [
        { from: "#94a3b8", to: "#64748b" },      // Reported - Slate
        { from: "#45828b", to: "#2d5a60" },      // FIR - Teal
        { from: "#1bd488", to: "#15a366" },      // Investigation - Primary
        { from: "#10b981", to: "#059669" },      // Charge Sheet - Emerald
        { from: "#055b65", to: "#033d45" },      // Trial - Dark Teal
        { from: "#dc2626", to: "#991b1b" },      // Convicted - Emphasis Red
    ];

    return (
        <div className="w-full flex justify-center h-[420px]">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-2xl overflow-visible">
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.1" />
                    </filter>
                    {funnelColors.map((color, i) => (
                        <linearGradient key={i} id={`funnelGrad${i}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={color.from} />
                            <stop offset="100%" stopColor={color.to} />
                        </linearGradient>
                    ))}
                </defs>

                {data.map((item, i) => {
                    const topY = i * (stageHeight + gap);
                    const bottomY = topY + stageHeight;
                    const topW = getVisualWidth(item.value);
                    let bottomW;
                    if (i < data.length - 1) {
                        bottomW = getVisualWidth(data[i + 1].value);
                    } else {
                        bottomW = Math.max(getVisualWidth(item.value) * 0.7, minWidth * 0.8);
                    }
                    const topX = (width - topW) / 2;
                    const bottomX = (width - bottomW) / 2;
                    const points = `${topX},${topY} ${topX + topW},${topY} ${bottomX + bottomW},${bottomY} ${bottomX},${bottomY}`;
                    const prevVal = i > 0 ? data[i - 1].value : 0;
                    const dropPct = i > 0 ? Math.round(((prevVal - item.value) / prevVal) * 100) : 0;

                    return (
                        <g key={i} className="group cursor-pointer">
                            <motion.polygon
                                initial={{ opacity: 0, scale: 0.9, transformOrigin: 'center' }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                points={points}
                                fill={`url(#funnelGrad${i})`}
                                filter="url(#shadow)"
                                className="transition-all duration-300 hover:opacity-90"
                            />
                            <motion.text
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                x={width / 2}
                                y={topY + (stageHeight / 2)}
                                textAnchor="middle"
                                className="fill-white drop-shadow-md pointer-events-none"
                            >
                                <tspan x={width / 2} dy="-0.5em" fontSize="10" fontWeight="bold" className="uppercase tracking-wider opacity-90">
                                    {item.name}
                                </tspan>
                                <tspan x={width / 2} dy="1.1em" fontSize="24" fontWeight="900">
                                    {item.value.toLocaleString()}
                                </tspan>
                            </motion.text>

                            {i > 0 && (
                                <motion.g
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + (i * 0.1) }}
                                >
                                    <line x1={topX + topW + 2} y1={topY + (stageHeight / 2)} x2={topX + topW + 10} y2={topY + (stageHeight / 2)} stroke="#fecaca" strokeWidth={1} strokeDasharray="2 2" />
                                    <rect x={topX + topW + 12} y={topY + (stageHeight / 2) - 10} width="65" height="20" rx="6" fill="#fef2f2" stroke="#fecaca" />
                                    <text x={topX + topW + 44.5} y={topY + (stageHeight / 2)} dy="0.35em" textAnchor="middle" className="text-[10px] font-bold fill-red-500">
                                        -{dropPct}% Drop
                                    </text>
                                </motion.g>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

const kpis = generateKPIs();
const crimeTrends = generateCrimeTrends();
const serviceGaps = generateServiceGaps();
const platformStats = generatePlatformStats();
const detailedBreakdown = generateDetailedBreakdown();
const reportingChannels = generateReportingChannelData();
const districtHotspots = generateDistrictHotspots();
const shelterPrograms = generateShelterPrograms();

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

// Interactive Donut Chart Component
function InteractiveDonutChart({
    data,
    title
}: {
    data: { label: string; value: number; color: string }[];
    title: string;
}) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

    const visibleData = data.filter(item => !hiddenItems.has(item.label));
    const total = visibleData.reduce((sum, item) => sum + item.value, 0);

    const handleLegendClick = (label: string) => {
        const newHidden = new Set(hiddenItems);
        if (newHidden.has(label)) {
            newHidden.delete(label);
        } else if (newHidden.size < data.length - 1) {
            newHidden.add(label);
        }
        setHiddenItems(newHidden);
    };

    const onPieEnter = (_: any, index: number) => setActiveIndex(index);
    const onPieLeave = () => setActiveIndex(null);

    return (
        <div className="h-full flex flex-col">
            <h4 className="text-xs font-bold text-brand-teal uppercase tracking-wider opacity-70 mb-1 shrink-0">{title}</h4>
            <div className="flex-1 flex items-center min-h-0">
                {/* Chart */}
                <div className="flex-1 h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={visibleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={activeIndex !== null ? 100 : 90}
                                paddingAngle={2}
                                dataKey="value"
                                nameKey="label"
                                onMouseEnter={onPieEnter}
                                onMouseLeave={onPieLeave}
                                animationDuration={300}
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                                    const x = cx + radius * Math.cos(-(midAngle || 0) * RADIAN);
                                    const y = cy + radius * Math.sin(-(midAngle || 0) * RADIAN);
                                    return (percent || 0) > 0.08 ? (
                                        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={9} fontWeight="bold">
                                            {`${((percent || 0) * 100).toFixed(0)}%`}
                                        </text>
                                    ) : null;
                                }}
                                labelLine={false}
                            >
                                {visibleData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="none"
                                        style={{
                                            filter: activeIndex === index ? 'brightness(1.2) drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'brightness(1)',
                                            transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)',
                                            transformOrigin: 'center',
                                            transition: 'all 0.2s ease'
                                        }}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const item = payload[0].payload;
                                        const pct = ((item.value / total) * 100).toFixed(1);
                                        return (
                                            <div className="bg-white/95 backdrop-blur-sm border border-brand-surface rounded-xl px-3 py-2 shadow-xl">
                                                <p className="text-xs font-bold text-brand-dark">{item.label}</p>
                                                <p className="text-[10px] text-brand-teal">
                                                    {item.value.toLocaleString()} ({pct}%)
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Custom Legend */}
                <div className="w-28 flex flex-col gap-1.5 pl-2">
                    {data.map((item, idx) => {
                        const isHidden = hiddenItems.has(item.label);
                        const pct = !isHidden ? ((item.value / total) * 100).toFixed(0) : '—';
                        return (
                            <button
                                key={idx}
                                onClick={() => handleLegendClick(item.label)}
                                onMouseEnter={() => !isHidden && setActiveIndex(visibleData.findIndex(d => d.label === item.label))}
                                onMouseLeave={() => setActiveIndex(null)}
                                className={clsx(
                                    "flex items-center gap-1.5 text-left transition-all duration-200",
                                    isHidden ? "opacity-40" : "opacity-100 hover:scale-105"
                                )}
                            >
                                <div
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: isHidden ? '#ccc' : item.color }}
                                />
                                <span className={clsx(
                                    "text-[9px] font-medium leading-tight",
                                    isHidden ? "text-gray-400 line-through" : "text-brand-dark/70"
                                )}>
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Icon Helper
// Brand Icons Component with original colors
const BrandIcon = ({ name, size = 16 }: { name: string; size?: number }) => {
    const n = name.toLowerCase();

    if (n.includes("meta") || n.includes("facebook")) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="#0866FF">
                <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874v2.25h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.852z" />
            </svg>
        );
    }
    if (n.includes("tiktok")) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
            </svg>
        );
    }
    if (n.includes("twitter") || n.includes(" x")) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="#000000">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
        );
    }
    if (n.includes("youtube")) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
        );
    }
    if (n.includes("whatsapp")) {
        return (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
        );
    }

    // Default fallback to Lucide component
    return name.includes("Online") || name.includes("Digital") ? <Globe size={size} /> : <Monitor size={size} />;
};

// Icon Helper
const getChannelIcon = (name: string) => {
    // Check for platforms first
    if (name.includes("Meta") || name.includes("Facebook") || name.includes("TikTok") || name.includes("X (Twitter)") || name.includes("YouTube") || name.includes("WhatsApp")) {
        return <BrandIcon name={name} size={16} />;
    }

    if (name.includes("Police") && !name.includes("App")) return <Building2 size={16} />; // Station = Building
    if (name.includes("WPC")) return <HeartHandshake size={16} />;
    if (name.includes("Helpline")) return <Phone size={16} />;
    if (name.includes("App")) return <Smartphone size={16} />;
    if (name.includes("Court") || name.includes("Magistrate")) return <Gavel size={16} />;
    if (name.includes("FIA")) return <FileSearch size={16} />;
    if (name.includes("NCCIA")) return <Monitor size={16} />; // Cyber Agency
    if (name.includes("Online") || name.includes("Complaint Form")) return <Globe size={16} />;
    if (name.includes("Email")) return <Monitor size={16} />;
    return <Landmark size={16} />;
};


// Custom Axis Tick
const CustomAxisTick = ({ x, y, payload }: any) => {
    return (
        <g transform={`translate(${x},${y})`}>
            <foreignObject x={-165} y={-16} width={160} height={32}>
                <div className="flex items-center justify-end gap-3 h-full text-[10px] font-bold text-brand-dark/80">
                    <span className="text-right leading-3 whitespace-normal flex-1">{payload.value}</span>
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-brand-teal/20 flex items-center justify-center text-brand-teal flex-shrink-0 group-hover:bg-brand-teal group-hover:text-white transition-colors">
                        {getChannelIcon(payload.value)}
                    </div>
                </div>
            </foreignObject>
        </g>
    );
};

// Chart Card Wrapper Component - Reusable within this section or globally if exported
export function ChartCard({ title, subtitle, children, className, padding = "p-4" }: { title: string; subtitle?: string; children: React.ReactNode; className?: string; padding?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={clsx(
                "bg-white rounded-2xl border border-brand-surface/80 shadow-sm",
                "hover:shadow-lg hover:border-primary-500/10 transition-all duration-300",
                "overflow-hidden group flex flex-col",
                className
            )}
        >
            {/* Subtle top border gradient */}
            <div className="h-0.5 bg-gradient-to-r from-primary-500/50 via-brand-teal/30 to-transparent shrink-0" />

            <div className={`${padding} flex-1 flex flex-col min-h-0`}>
                <div className="flex items-start justify-between mb-0">
                    <div>
                        <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
                    </div>

                </div>
                {children}
            </div>
        </motion.div>
    );
}

export default function OverviewSection() {
    const [mounted, setMounted] = useState(false);
    const [channelTab, setChannelTab] = useState<'gbv' | 'tfgbv'>('gbv');

    useEffect(() => {
        setMounted(true);
    }, []);

    const ChartSkeleton = () => (
        <div className="w-full h-full flex items-center justify-center bg-brand-surface/20 animate-pulse rounded-xl">
            <Activity className="text-brand-teal/20" size={40} />
        </div>
    );

    return (
        <section id="overview" className="space-y-4 scroll-mt-28">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((kpi, i) => {
                    // Custom Card for Conviction Rate
                    if (kpi.id === "kpi-2") {
                        const closureReasons = generateClosureReasons();
                        return (
                            <motion.div
                                key={kpi.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="h-[200px]"
                            >
                                <div className="relative bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden h-full flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-red-400" />

                                    <div className="p-4 flex flex-col">
                                        {/* Top Stats */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                                                    <Activity size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-brand-teal uppercase tracking-wider block">{kpi.label}</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-black text-brand-dark tracking-tight">{kpi.value}</span>
                                                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                            <TrendingDown size={10} /> {Math.abs(kpi.trend)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-brand-surface mb-3" />

                                        {/* Embedded Attrition List */}
                                        <div className="space-y-2">
                                            {closureReasons.slice(0, 3).map((r: { reason: string; count: number }, idx: number) => (
                                                <div key={idx} className="flex justify-between items-center text-xs">
                                                    <span className="text-brand-dark/70 font-medium truncate pr-2">{r.reason}</span>
                                                    <span className="font-bold text-brand-dark bg-brand-surface/50 px-1.5 py-0.5 rounded-[4px] text-[10px] whitespace-nowrap">{r.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    if (kpi.id === 'kpi-3') { // Red Zone Districts
                        return (
                            <motion.div
                                key={kpi.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="h-[200px]"
                            >
                                <div className="bg-white rounded-2xl border border-red-200 shadow-sm h-full overflow-hidden hover:shadow-md transition-shadow relative group">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400" />

                                    <div className="p-4 flex flex-col">
                                        {/* Top Stats */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                                                    <AlertCircle size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-brand-teal uppercase tracking-wider block">{kpi.label}</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-black text-brand-dark tracking-tight">{kpi.value}</span>
                                                        <span className="text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                            <TrendingDown size={10} className="rotate-180" /> {Math.abs(kpi.trend)} {kpi.trendLabel}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-brand-surface mb-3" />

                                        {/* Embedded District Hotspots */}
                                        <div className="space-y-2">
                                            {districtHotspots.map((h, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-xs">
                                                    <span className="text-brand-dark/70 font-medium truncate pr-2">{h.category}</span>
                                                    <div className="flex flex-wrap justify-end gap-1">
                                                        {h.districts.map((d, dIdx) => (
                                                            <span key={dIdx} className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded-[3px] text-[10px] border border-red-100 whitespace-nowrap">
                                                                {d}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    if (kpi.id === 'kpi-4') { // Active Shelters
                        return (
                            <motion.div
                                key={kpi.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: i * 0.1 }}
                                className="h-[200px]"
                            >
                                <div className="bg-white rounded-2xl border border-primary-200 shadow-sm h-full overflow-hidden hover:shadow-md transition-shadow relative group">
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-brand-teal" />

                                    <div className="p-4 flex flex-col h-full">
                                        {/* Top Stats */}
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                                                    <HeartHandshake size={20} />
                                                </div>
                                                <div>
                                                    <span className="text-xs font-bold text-brand-teal uppercase tracking-wider block">{kpi.label}</span>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-2xl font-black text-brand-dark tracking-tight">{kpi.value}</span>
                                                        <span className="text-[10px] font-bold text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                                                            {kpi.trendLabel}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Divider */}
                                        <div className="w-full h-px bg-brand-surface mb-2" />

                                        {/* Embedded Programs List */}
                                        <div className="space-y-1.5 flex-1 overflow-auto">
                                            {shelterPrograms.map((p, idx) => (
                                                <div key={idx} className="flex justify-between items-center text-xs">
                                                    <span className="text-brand-dark/70 font-medium truncate pr-2">{p.name}</span>
                                                    <span className="font-bold text-brand-dark bg-primary-50 px-1.5 py-0.5 rounded-[4px] text-[10px] whitespace-nowrap">{p.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.div
                            key={kpi.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="h-[200px]"
                        >
                            <KPICard data={kpi} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Charts Row 1: Comparison & Reporting */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                {/* Detailed Dual-Pillar Analysis - Vertical Stack */}
                <ChartCard title="Category Wise Breakdown" subtitle="GBV vs TFGBV Distribution" className="lg:col-span-1">
                    <div className="flex flex-col gap-2 h-[450px]">
                        {/* GBV Donut Chart */}
                        <div className="flex-1 border-b border-dashed border-gray-200">
                            <InteractiveDonutChart
                                data={detailedBreakdown.gbv}
                                title="GBV Categories"
                            />
                        </div>

                        {/* TFGBV Donut Chart */}
                        <div className="flex-1">
                            <InteractiveDonutChart
                                data={detailedBreakdown.tfgbv}
                                title="TFGBV Categories"
                            />
                        </div>
                    </div>
                </ChartCard>

                {/* Case Attrition Pipeline - Middle Column */}
                <ChartCard title="Case Attrition Pipeline" subtitle="Justice System Drop-off" className="lg:col-span-1">
                    <div className="flex flex-col h-[460px] justify-center items-center mt-8">
                        <TrapezoidFunnel data={generateFunnelData()} />
                    </div>
                </ChartCard>

                {/* Right Column: Reporting Channels & Social Media Stack */}
                <div className="lg:col-span-1 flex flex-col gap-3 h-[557px]">

                    {/* Reporting Channels Card */}
                    <ChartCard title="Reporting Channels" subtitle="" className="flex-1" padding="p-3">
                        <div className="flex flex-col h-full">
                            <div className="flex justify-end mb-1">
                                <div className="flex bg-brand-surface/30 rounded-lg p-1 gap-1">
                                    <button
                                        onClick={() => setChannelTab('gbv')}
                                        className={clsx(
                                            "px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-all",
                                            channelTab === 'gbv' ? "bg-brand-dark text-white shadow-sm" : "text-brand-teal hover:bg-brand-surface/40"
                                        )}
                                    >
                                        GBV
                                    </button>
                                    <button
                                        onClick={() => setChannelTab('tfgbv')}
                                        className={clsx(
                                            "px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-all",
                                            channelTab === 'tfgbv' ? "bg-brand-dark text-white shadow-sm" : "text-brand-teal hover:bg-brand-surface/40"
                                        )}
                                    >
                                        TFGBV
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={channelTab === 'gbv' ? reportingChannels.gbv : reportingChannels.tfgbv}
                                        layout="vertical"
                                        margin={{ left: 0, right: 30, top: 0, bottom: 0 }}
                                        barSize={20}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                        <XAxis type="number" fontSize={10} axisLine={false} tickLine={false} hide />
                                        <YAxis dataKey="name" type="category" width={170} tick={<CustomAxisTick />} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="value" position="right" fontSize={10} fontWeight="bold" formatter={(val: any) => {
                                                const currentData = channelTab === 'gbv' ? reportingChannels.gbv : reportingChannels.tfgbv;
                                                const total = currentData.reduce((sum, item) => sum + item.value, 0);
                                                return `${((Number(val) / total) * 100).toFixed(0)}%`;
                                            }} />
                                            {(channelTab === 'gbv' ? reportingChannels.gbv : reportingChannels.tfgbv).map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </ChartCard>

                    {/* TFGBV Platforms Card */}
                    <ChartCard title="TFGBV Platforms" subtitle="Social Media Breakdown" className="flex-1" padding="p-3">
                        <div className="flex flex-col h-full">
                            <div className="flex-1 min-h-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={platformStats}
                                        layout="vertical"
                                        margin={{ left: 0, right: 30, top: 0, bottom: 0 }}
                                        barSize={20}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                                        <XAxis type="number" fontSize={10} axisLine={false} tickLine={false} hide />
                                        <YAxis dataKey="name" type="category" width={170} tick={<CustomAxisTick />} tickLine={false} axisLine={false} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="complaints" name="Complaints" fill={BRAND_COLORS.teal} radius={[0, 4, 4, 0]}>
                                            <LabelList dataKey="complaints" position="right" fontSize={10} fontWeight="bold" />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </ChartCard>
                </div>
            </div>
        </section>
    );
}
