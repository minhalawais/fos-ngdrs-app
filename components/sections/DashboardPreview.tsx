
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, Map, Scale, HeartHandshake, Smartphone,
    MoreHorizontal, TrendingUp, TrendingDown, Lock,
    ShieldAlert, AlertTriangle, Eye, EyeOff, Radio, Server
} from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

const tabs = [
    { id: "national", label: "National Overview", icon: LayoutDashboard },
    { id: "heatmap", label: "Heatmaps", icon: Map },
    { id: "justice", label: "Justice Funnel", icon: Scale },
    { id: "services", label: "Survivor Support", icon: HeartHandshake },
    { id: "platform", label: "Platform Accountability", icon: Smartphone },
];

export default function DashboardPreview() {
    const [activeTab, setActiveTab] = useState("national");
    const [isSimulated, setIsSimulated] = useState(true);

    return (
        <section id="dashboard" className="py-24 bg-brand-dark text-white overflow-hidden relative">
            {/* Background Tech/Grid */}
            <div className="absolute inset-0 bg-[url('/grid-pattern-light.svg')] opacity-5" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                                <ShieldAlert size={12} /> Simulation Mode
                            </span>
                            <span className="px-2 py-1 rounded bg-brand-surface border border-white/10 text-brand-soft text-[10px] font-bold uppercase tracking-wider">
                                Synthetic Data
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                            Strategic <span className="text-primary-400">Intelligence</span>
                        </h2>
                        <p className="text-brand-soft/80 text-lg">
                            Experience the power of the NGDRS decision support engine.
                            <br /><span className="text-xs text-brand-dark/50 uppercase tracking-widest">* Data shown is generated for demonstration purposes.</span>
                        </p>
                    </div>

                    <div className="flex gap-2 p-1 bg-white/5 backdrop-blur-sm rounded-xl overflow-x-auto max-w-full no-scrollbar border border-white/10">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={clsx(
                                    "flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                                    activeTab === tab.id
                                        ? "bg-primary-500 text-white shadow-lg"
                                        : "text-white/60 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Simulation Frame */}
                <div className="bg-brand-canvas rounded-2xl md:rounded-3xl p-1 md:p-3 shadow-2xl border border-white/10 ring-4 ring-white/5 relative group">

                    {/* Simulation Overlay Badge */}
                    <div className="absolute top-6 right-6 z-20 flex flex-col items-end pointer-events-none">
                        <div className="bg-amber-500/90 text-brand-dark font-bold px-4 py-1.5 rounded-full text-xs shadow-lg backdrop-blur-md flex items-center gap-2 mb-2">
                            <Radio size={12} className="animate-pulse" /> SIMULATION ACTIVE
                        </div>
                        <div className="bg-brand-dark/80 text-white/50 px-3 py-1 rounded-full text-[10px] backdrop-blur-md flex items-center gap-1.5 border border-white/5">
                            <Server size={10} /> Live Connection: Disconnected
                        </div>
                    </div>

                    <div className="bg-brand-surface/50 rounded-xl md:rounded-2xl overflow-hidden border border-brand-surface relative h-[600px] md:h-[700px]">

                        {/* Simulation Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden">
                            <span className="text-[120px] font-black -rotate-45 whitespace-nowrap">SYNTHETIC DATA</span>
                        </div>

                        {/* Top Bar (Fake Browser) */}
                        <div className="h-12 bg-white border-b border-brand-surface flex items-center px-4 gap-4 justify-between">
                            <div className="flex gap-1.5 opacity-50">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-amber-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>

                            <div className="flex-1 max-w-2xl mx-auto hidden md:flex items-center justify-center gap-2 bg-brand-surface/50 py-1.5 rounded-full text-xs font-medium text-brand-dark/60">
                                <Lock size={10} />
                                <span className="opacity-50">https://</span>
                                <span className="text-brand-teal">secure.ncsw.gov.pk</span>
                                <span className="opacity-50">/dashboard/executive/sim</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 uppercase">
                                    <EyeOff size={12} /> PII Masked
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4 md:p-8 md:bg-brand-surface/30 h-full overflow-y-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full"
                                >
                                    {activeTab === "national" && <NationalView />}
                                    {activeTab === "heatmap" && <HeatmapView />}
                                    {activeTab === "justice" && <JusticeView />}
                                    {activeTab === "services" && <ServicesView />}
                                    {activeTab === "platform" && <PlatformView />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Login Overlay (Strategic Blur) */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-dark via-brand-dark/90 to-transparent z-30 flex items-center justify-center pointer-events-none">
                        {/* This creates a fade out effect at the bottom */}
                    </div>
                </div>

                <div className="mt-8 flex justify-center">
                    <Link href="/auth/login" className="inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
                        <Lock size={14} /> Authorized Personnel Login
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Sub-components (Updated with explicit "Sample" labels)
const NationalView = () => (
    <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: "Total Cases YTD", value: "14,821", trend: "+12%", up: true },
                { label: "Red Zone Districts", value: "12", trend: "+3", up: true, danger: true },
                { label: "Conviction Rate", value: "2.9%", trend: "-0.2%", up: false },
                { label: "Compliance Rate", value: "92%", trend: "+5%", up: true, success: true },
            ].map((kpi, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-brand-surface shadow-sm relative overflow-hidden group">
                    {/* Sample Data Tooltip */}
                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-[9px] px-1.5 py-0.5 rounded transition-opacity pointer-events-none">
                        Simulated
                    </div>
                    <div className="text-sm text-brand-teal mb-1">{kpi.label}</div>
                    <div className="text-3xl font-bold text-brand-dark mb-2 tracking-tight">{kpi.value}</div>
                    <div className={clsx("text-xs font-medium flex items-center gap-1",
                        kpi.danger ? "text-red-500" : kpi.success ? "text-primary-600" : kpi.up ? "text-primary-600" : "text-amber-500"
                    )}>
                        {kpi.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {kpi.trend} vs last month
                    </div>
                </div>
            ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6 h-[400px]">
            <div className="col-span-2 bg-white p-6 rounded-xl border border-brand-surface shadow-sm flex flex-col relative group">
                <div className="flex justify-between mb-6">
                    <h4 className="font-bold text-brand-dark">Crime Type Distribution</h4>
                    <span className="text-xs font-mono text-brand-dark/30 bg-brand-surface px-2 py-1 rounded">DATASET_ID: SYNTH-2025-A</span>
                </div>
                {/* Fake Chart */}
                <div className="flex-1 flex items-end justify-between gap-4 px-4 pb-2 border-b border-brand-surface">
                    {[80, 65, 45, 90, 55, 30, 70].map((h, i) => (
                        <div key={i} className="w-full bg-brand-surface/50 rounded-t-lg relative">
                            <motion.div
                                initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                                className={clsx(
                                    "absolute bottom-0 inset-x-0 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-crosshair",
                                    i === 3 ? "bg-brand-teal" : "bg-primary-500"
                                )}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex justify-between text-[10px] font-medium text-brand-dark/40 mt-3 px-2 uppercase tracking-wider">
                    <span>Punjab</span><span>Sindh</span><span>KPK</span><span>Baloch</span><span>ICT</span><span>GB</span><span>AJK</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-brand-surface shadow-sm flex flex-col items-center justify-center relative">
                <h4 className="font-bold text-brand-dark absolute top-6 left-6">Digital/Physical Ratio</h4>
                <div className="relative w-48 h-48">
                    <svg viewBox="0 0 100 100" className="rotate-[-90deg]">
                        <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                        <motion.circle cx="50" cy="50" r="40" stroke="#1bd488" strokeWidth="12" fill="none"
                            strokeDasharray="251" strokeDashoffset="251" animate={{ strokeDashoffset: 195 }} transition={{ duration: 1.5, delay: 0.5 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-brand-dark">22%</span>
                        <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mt-1">Digital GBV</span>
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-xs text-brand-soft">Cyber-Harassment Trends</p>
                    <div className="flex items-center w-full gap-2 mt-2">
                        <div className="h-1.5 flex-1 bg-brand-teal rounded-full" />
                        <span className="text-[10px] font-mono text-brand-dark/50">Online</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const HeatmapView = () => (
    <div className="h-full bg-white rounded-xl border border-brand-surface shadow-sm relative overflow-hidden flex">
        <div className="w-64 border-r border-brand-surface p-4 hidden md:block bg-brand-surface/30">
            <div className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-6 px-1">Risk Parameters</div>
            <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg border border-brand-surface shadow-sm">
                    <div className="h-2 w-1/2 bg-brand-dark/10 rounded mb-2" />
                    <div className="h-2 w-3/4 bg-brand-dark/5 rounded" />
                </div>
                <div className="bg-white p-3 rounded-lg border border-brand-surface shadow-sm opacity-50">
                    <div className="h-2 w-1/2 bg-brand-dark/10 rounded mb-2" />
                    <div className="h-2 w-3/4 bg-brand-dark/5 rounded" />
                </div>
                <div className="mt-8 pt-4 border-t border-brand-surface/50">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-xs font-bold text-brand-dark">Critical Zones</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-xs font-medium text-brand-dark/70">Watchlist</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex-1 bg-brand-surface/10 relative p-8 flex items-center justify-center">
            {/* Map Placeholder Graphic */}
            <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]" />
            <div className="text-center">
                <Map size={48} className="text-brand-dark/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-brand-dark/40">Geospatial Simulation</h3>
                <p className="text-sm text-brand-dark/30 max-w-xs mx-auto mt-2">
                    Heatmap visualization data has been cleared for this public demo session.
                </p>
                <button className="mt-6 px-4 py-2 bg-brand-dark/5 text-brand-dark/40 font-bold text-xs rounded-lg cursor-not-allowed">
                    Load Sample Raster
                </button>
            </div>

            {/* Fake pulsing hotspots */}
            <div className="absolute top-1/4 right-1/3">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] px-1.5 rounded font-bold whitespace-nowrap opacity-0 md:opacity-100">Simulated Alert</span>
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-white shadow-sm" />
            </div>
        </div>
    </div>
);

const JusticeView = () => (
    <div className="bg-white p-8 rounded-xl border border-brand-surface shadow-sm h-full flex flex-col justify-center">
        <div className="text-center mb-8">
            <h4 className="text-lg font-bold text-brand-dark">Justice Attrition Funnel</h4>
            <p className="text-sm text-brand-soft">Simulated flow from FIR to Conviction</p>
        </div>

        <div className="flex-1 relative max-h-[400px]">
            <div className="absolute inset-0 flex items-end justify-between px-4 md:px-12 pb-8">
                {[
                    { label: "Reported", val: "100%", h: "h-full", c: "bg-brand-surface" },
                    { label: "FIR Registered", val: "72%", h: "h-[70%]", c: "bg-brand-teal/40" },
                    { label: "Investigation", val: "45%", h: "h-[45%]", c: "bg-brand-teal/60" },
                    { label: "Challan", val: "31%", h: "h-[30%]", c: "bg-brand-teal/80" },
                    { label: "Trial", val: "19%", h: "h-[20%]", c: "bg-brand-teal" },
                    { label: "Conviction", val: "3%", h: "h-[5%]", c: "bg-brand-dark" },
                ].map((stage, i) => (
                    <div key={i} className="flex flex-col items-center justify-end h-full gap-3 group w-full mx-1">
                        <div className="text-xl font-bold text-brand-dark mb-1 group-hover:-translate-y-1 transition-transform">{stage.val}</div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100%" }}
                            transition={{ delay: i * 0.1 }}
                            className={`w-full max-w-[80px] ${stage.h} ${stage.c} rounded-t-lg relative overflow-hidden`}
                        >
                            <div className="absolute inset-x-0 top-0 h-1 bg-white/20" />
                        </motion.div>
                        <div className="h-8 flex items-start justify-center">
                            <div className="text-[10px] md:text-xs font-bold text-brand-dark/70 uppercase tracking-tight text-center leading-tight">{stage.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ServicesView = () => (
    <div className="grid md:grid-cols-2 gap-6 h-full items-center">
        <div className="bg-white p-8 rounded-xl border border-brand-surface flex flex-col items-center justify-center text-center h-[300px]">
            <div className="relative w-48 h-48 mb-6">
                {/* Fake Donut */}
                <svg viewBox="0 0 100 100" className="-rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#0ea5e9" strokeWidth="10" strokeDasharray="251" strokeDashoffset="20" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-brand-dark">92%</span>
                    <span className="text-[10px] uppercase font-bold text-brand-soft">Referral Match</span>
                </div>
            </div>
            <p className="text-sm font-medium text-brand-dark max-w-xs">
                Simulated AI-Matching efficiency for survivor service allocation.
            </p>
        </div>

        <div className="space-y-4">
            {[
                { l: "Medical Aid", v: 90, c: "bg-primary-500" },
                { l: "Psychosocial Support", v: 60, c: "bg-brand-teal" },
                { l: "Legal Aid", v: 30, c: "bg-amber-500" },
                { l: "Shelter Provided", v: 50, c: "bg-brand-dark" },
            ].map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-brand-surface">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold text-brand-dark">{s.l}</span>
                        <span className="text-sm font-mono text-brand-dark/50">{s.v}% (Sim)</span>
                    </div>
                    <div className="h-2 bg-brand-surface rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }} animate={{ width: `${s.v}%` }}
                            className={`h-full ${s.c}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const PlatformView = () => (
    <div className="bg-white rounded-xl border border-brand-surface h-full overflow-hidden flex flex-col">
        <div className="p-4 bg-brand-surface/30 border-b border-brand-surface flex justify-between items-center">
            <h4 className="font-bold text-brand-dark text-sm">Platform Accountability Matrix</h4>
            <div className="text-[10px] font-mono text-brand-dark/40 uppercase">Synthetic Report #9942</div>
        </div>
        <table className="w-full text-left">
            <thead className="bg-white text-brand-dark/40 text-[10px] uppercase font-bold tracking-wider">
                <tr>
                    <th className="p-4">Platform</th>
                    <th className="p-4">Vol (Sim)</th>
                    <th className="p-4">Compliance %</th>
                    <th className="p-4">Avg Time</th>
                    <th className="p-4">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-brand-surface">
                {[
                    { n: "Meta", c: "985", t: "82%", r: "11 hrs", s: "good" },
                    { n: "TikTok", c: "1,240", t: "65%", r: "18 hrs", s: "mid" },
                    { n: "X (Twitter)", c: "750", t: "31%", r: "46 hrs", s: "bad" },
                    { n: "WhatsApp", c: "1,512", t: "15%", r: "72+ hrs", s: "fail" },
                ].map((row, i) => (
                    <tr key={i} className="hover:bg-brand-surface/20 transition-colors">
                        <td className="p-4 font-bold text-brand-dark">{row.n}</td>
                        <td className="p-4 font-mono text-xs text-brand-teal">{row.c}</td>
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-brand-surface rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${row.s === 'good' ? 'bg-primary-500' : row.s === 'mid' ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: row.t }} />
                                </div>
                                <span className="text-xs font-medium">{row.t}</span>
                            </div>
                        </td>
                        <td className="p-4 text-xs text-brand-dark/70 font-mono">{row.r}</td>
                        <td className="p-4">
                            <span className={clsx("px-2 py-1 rounded text-[10px] font-bold uppercase",
                                row.s === "good" ? "bg-primary-100 text-primary-700" :
                                    row.s === "mid" ? "bg-blue-100 text-blue-700" :
                                        "bg-red-100 text-red-700"
                            )}>{row.s === 'fail' ? 'Non-Compliant' : 'Compliant'}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
