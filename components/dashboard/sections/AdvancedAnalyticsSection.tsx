"use client";

import { motion } from "framer-motion";
import { AlertCircle, FileX, Scale, TrendingDown, Gavel, Activity, ArrowRight, ArrowDown, Database, Clock } from "lucide-react";
import { generatePlatformStats } from "@/lib/mock-data";
import { ChartCard } from "./OverviewSection";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
} from 'chart.js';
import { Line, Bar, Scatter, Doughnut } from 'react-chartjs-2';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { useState } from 'react';
import { clsx } from "clsx";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);

// --- RECHARTS COMPONENTS ADAPTED FROM OVERVIEW ---

// Interactive Donut Chart Component (Adapted for Trends)
function InteractiveTrendsPie({
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
                            <RechartsTooltip
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
                <div className="w-auto flex flex-col gap-1 pl-0 ml-[-25px]">
                    {data.map((item, idx) => {
                        const isHidden = hiddenItems.has(item.label);
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
                                    className="w-3 h-3 rounded-full shrink-0"
                                    style={{ backgroundColor: isHidden ? '#ccc' : item.color }}
                                />
                                <span className={clsx(
                                    "text-xs font-bold leading-tight whitespace-nowrap",
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

// --- MOCK DATA: ADVANCED ANALYTICS ---
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const provincialTrendsRaw = [
    { month: 'Jul', Punjab: 620, Sindh: 310, KPK: 210, Balochistan: 120, ICT: 45 },
    { month: 'Aug', Punjab: 480, Sindh: 390, KPK: 280, Balochistan: 105, ICT: 52 },
    { month: 'Sep', Punjab: 420, Sindh: 450, KPK: 390, Balochistan: 210, ICT: 48 },
    { month: 'Oct', Punjab: 550, Sindh: 410, KPK: 480, Balochistan: 130, ICT: 60 },
    { month: 'Nov', Punjab: 490, Sindh: 520, KPK: 310, Balochistan: 180, ICT: 58 },
    { month: 'Dec', Punjab: 680, Sindh: 480, KPK: 410, Balochistan: 250, ICT: 65 },
];

// District Reporting Data (Count of active districts over time)
const districtsTrendRaw = [
    { month: 'Jul', Punjab: 32, Sindh: 18, KPK: 20, Balochistan: 12 },
    { month: 'Aug', Punjab: 35, Sindh: 20, KPK: 22, Balochistan: 10 },
    { month: 'Sep', Punjab: 30, Sindh: 22, KPK: 25, Balochistan: 15 },
    { month: 'Oct', Punjab: 38, Sindh: 19, KPK: 24, Balochistan: 13 },
    { month: 'Nov', Punjab: 40, Sindh: 21, KPK: 28, Balochistan: 16 },
    { month: 'Dec', Punjab: 38, Sindh: 22, KPK: 28, Balochistan: 18 },
];

const closureReasons = [
    { label: "Compromise/Sulh", value: 450, color: "#45828b" },
    { label: "Lack of Evidence", value: 320, color: "#1bd488" },
    { label: "Witness Hostility", value: 210, color: "#f59e0b" },
    { label: "Procedural Delay", value: 180, color: "#ef4444" },
    { label: "Survivor Withdrawal", value: 150, color: "#8b5cf6" },
];

const scatterDataRaw = [
    { x: 10, y: 100 },
    { x: 50, y: 80 },
    { x: 100, y: 40 },
    { x: 200, y: 10 },
    { x: 300, y: 0 },
    { x: 20, y: 90 },
    { x: 80, y: 50 },
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

const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom' as const,
            labels: {
                usePointStyle: true,
                padding: 25,
                font: { size: 10, weight: 900 },
                color: '#055b65',
                boxWidth: 6,
                boxHeight: 6,
                generateLabels: (chart: any) => {
                    const datasets = chart.data.datasets;
                    return datasets.map((dataset: any, i: number) => ({
                        text: (dataset.label || '').toUpperCase(),
                        fillStyle: dataset.borderColor as string,
                        strokeStyle: dataset.borderColor as string,
                        pointStyle: 'circle',
                        datasetIndex: i
                    }));
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            titleColor: '#055b65',
            bodyColor: '#45828b',
            borderColor: 'rgba(5, 91, 101, 0.1)',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 12,
            displayColors: true,
            usePointStyle: true,
            boxPadding: 6
        }
    },
    scales: {
        x: {
            grid: { display: false },
            ticks: {
                font: { size: 10, weight: 'bold' as const },
                color: '#45828b',
                padding: 8
            }
        },
        y: {
            grid: { color: '#f1f5f9' },
            ticks: {
                font: { size: 10 },
                color: '#94a3b8',
                padding: 8
            }
        }
    }
};

export default function AdvancedAnalyticsSection() {
    // Chart 1 Data: Monthly Cases
    const provincialData = {
        labels: months,
        datasets: [
            {
                label: 'Punjab',
                data: provincialTrendsRaw.map(d => d.Punjab),
                borderColor: BRAND_COLORS.dark,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
            },
            {
                label: 'Sindh',
                data: provincialTrendsRaw.map(d => d.Sindh),
                borderColor: BRAND_COLORS.primary,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
            },
            {
                label: 'KPK',
                data: provincialTrendsRaw.map(d => d.KPK),
                borderColor: BRAND_COLORS.purple,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
            },
            {
                label: 'Balochistan',
                data: provincialTrendsRaw.map(d => d.Balochistan),
                borderColor: BRAND_COLORS.red,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: false,
            },
        ]
    };

    // Chart 2 Data: Data Consistency (Districts Reporting)
    // Modified per request: Y-axis months, X-axis districts
    const consistencyData = {
        labels: months,
        datasets: [
            {
                label: 'Punjab',
                data: districtsTrendRaw.map(d => d.Punjab),
                borderColor: BRAND_COLORS.dark,
                backgroundColor: BRAND_COLORS.dark + '10',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
            },
            {
                label: 'Sindh',
                data: districtsTrendRaw.map(d => d.Sindh),
                borderColor: BRAND_COLORS.primary,
                backgroundColor: BRAND_COLORS.primary + '10',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
            },
            {
                label: 'KPK',
                data: districtsTrendRaw.map(d => d.KPK),
                borderColor: BRAND_COLORS.purple,
                backgroundColor: BRAND_COLORS.purple + '10',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
            },
            {
                label: 'Balochistan',
                data: districtsTrendRaw.map(d => d.Balochistan),
                borderColor: BRAND_COLORS.red,
                backgroundColor: BRAND_COLORS.red + '10',
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
            },
        ]
    };

    const consistencyOptions = {
        ...commonOptions,
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { size: 10, weight: 'bold' as const }, color: '#45828b' }
            },
            y: {
                title: { display: true, text: 'No. of Districts', font: { size: 10, weight: 'bold' as const } },
                grid: { color: '#f1f5f9' },
                ticks: { font: { size: 10 } }
            }
        }
    };

    return (
        <section id="trends" className="space-y-6 scroll-mt-28">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Trends</h2>
                    <p className="text-brand-teal mt-1">Strategic Intelligence & Justice Analytics</p>
                </div>
                <div className="flex gap-2">
                    <div className="px-3 py-1 bg-brand-dark/5 rounded-full border border-brand-dark/10">
                        <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">National Metrics</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <ChartCard title="Monthly Cases by Province" subtitle="Comparative trends (Last 6 Months)">
                        <div className="h-[350px] w-full mt-4">
                            <Line data={provincialData} options={commonOptions} />
                        </div>
                    </ChartCard>
                </div>

                <div>
                    <ChartCard title="Data Consistency" subtitle="District Participation Trends">
                        <div className="h-[350px] w-full mt-4">
                            <Line data={consistencyData} options={consistencyOptions} />
                        </div>
                    </ChartCard>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 pt-6 border-t border-brand-surface">
                <ChartCard title="Reasons for Case Closure">
                    <div className="h-[300px] w-full mt-4">
                        <InteractiveTrendsPie data={closureReasons} title="Attrition Factors" />
                    </div>
                </ChartCard>

                <ChartCard title="Takedown Success Rate" subtitle="Content removal success by platform">
                    <div className="h-[300px] w-full mt-4">
                        <Bar
                            data={{
                                labels: generatePlatformStats().map(p => p.name),
                                datasets: [
                                    {
                                        label: 'Requests',
                                        data: generatePlatformStats().map(p => p.complaints),
                                        backgroundColor: '#cbd5e1',
                                        borderRadius: 4,
                                        barPercentage: 0.7,
                                        categoryPercentage: 0.8,
                                        barThickness: 12,
                                    },
                                    {
                                        label: 'Success',
                                        data: generatePlatformStats().map(p => Math.round(p.complaints * (p.takedownPct / 100))),
                                        backgroundColor: '#8b5cf6',
                                        borderRadius: 4,
                                        barPercentage: 0.7,
                                        categoryPercentage: 0.8,
                                        barThickness: 12,
                                    }
                                ]
                            }}
                            options={{
                                ...commonOptions,
                                indexAxis: 'y' as const,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                        align: 'center',
                                        labels: {
                                            usePointStyle: true,
                                            boxWidth: 8,
                                            boxHeight: 8,
                                            padding: 20,
                                            font: { size: 10, weight: 'bold' },
                                            color: '#94a3b8', // Grayish text for legend
                                            generateLabels: (chart) => {
                                                const datasets = chart.data.datasets;
                                                return datasets.map((dataset, i) => ({
                                                    text: dataset.label?.toUpperCase(),
                                                    fillStyle: dataset.backgroundColor as string,
                                                    strokeStyle: dataset.backgroundColor as string,
                                                    lineWidth: 0,
                                                    hidden: !chart.isDatasetVisible(i),
                                                    index: i
                                                }));
                                            }
                                        }
                                    },
                                    tooltip: {
                                        ...commonOptions.plugins.tooltip,
                                        callbacks: {
                                            label: (context) => {
                                                return ` ${context.dataset.label}: ${context.raw?.toLocaleString()}`;
                                            }
                                        }
                                    }
                                },
                                scales: {
                                    x: {
                                        display: false, // Hide X axis as per image (or minimalist look)
                                        grid: { display: false }
                                    },
                                    y: {
                                        grid: { display: false },
                                        ticks: {
                                            font: { size: 11, weight: 'bold' },
                                            color: '#334155', // Darker gray for labels
                                            autoSkip: false,
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </ChartCard>
            </div>
        </section>
    );
}
