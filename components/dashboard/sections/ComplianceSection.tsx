
"use client";

import { useState } from "react";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Legend
} from 'recharts';
import { generateComplianceData, generateAIThreats, generateRiskData } from "@/lib/mock-data";
import { clsx } from "clsx";
import { ShieldAlert, Globe, FileCheck, Info, AlertTriangle, BrainCircuit, X, Calculator, Database, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const complianceData = generateComplianceData();
const aiData = generateAIThreats();
const riskData = generateRiskData();

const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
    dark: "#055b65",
};

// Custom Tooltip
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

export default function ComplianceSection() {
    const [selectedIndicator, setSelectedIndicator] = useState<typeof complianceData[0] | null>(null);

    return (
        <section id="compliance" className="space-y-8 relative scroll-mt-28">
            {/* Detail Modal */}
            <AnimatePresence>
                {selectedIndicator && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
                        onClick={() => setSelectedIndicator(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-brand-surface"
                        >
                            <div className="h-1 bg-gradient-to-r from-primary-500 to-brand-teal" />
                            <div className="p-6 border-b border-brand-surface flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-brand-dark">{selectedIndicator.indicator}</h3>
                                    <span className={clsx("text-xs font-bold px-3 py-1 rounded-lg mt-2 inline-block",
                                        selectedIndicator.status === "Critical" ? "bg-red-100 text-red-700" :
                                            selectedIndicator.status === "Warning" ? "bg-amber-100 text-amber-700" :
                                                "bg-primary-100 text-primary-700"
                                    )}>
                                        {selectedIndicator.status} Status
                                    </span>
                                </div>
                                <button onClick={() => setSelectedIndicator(null)} className="w-8 h-8 rounded-lg bg-brand-surface/50 flex items-center justify-center text-brand-soft hover:text-brand-dark hover:bg-brand-surface transition-all">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 text-primary-700 font-bold mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                                            <Calculator size={16} />
                                        </div>
                                        <h4>Calculation Methodology</h4>
                                    </div>
                                    <div className="bg-brand-canvas p-4 rounded-xl border border-brand-surface text-sm font-mono text-brand-dark/80">
                                        {selectedIndicator.formula}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 text-brand-teal font-bold mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-brand-surface/50 flex items-center justify-center">
                                            <Database size={16} />
                                        </div>
                                        <h4>Data Source</h4>
                                    </div>
                                    <p className="text-sm text-brand-soft leading-relaxed">
                                        {selectedIndicator.source}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-brand-surface/30 text-xs text-center text-brand-soft border-t border-brand-surface">
                                Verified by NCSW Statistical Wing • Last Audited: 24h ago
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* Section 1: International Treaty Tracker */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-brand-surface/80 shadow-sm overflow-hidden"
            >
                <div className="h-0.5 bg-gradient-to-r from-blue-500/50 via-brand-teal/30 to-transparent" />
                <div className="p-6 border-b border-brand-surface flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Globe size={20} />
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark">Global Treaty Tracker</h2>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {complianceData.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedIndicator(item)}
                                className="bg-brand-canvas p-5 rounded-xl border border-brand-surface relative overflow-hidden group hover:shadow-lg transition-all cursor-pointer hover:border-primary-500/30 hover:-translate-y-1"
                            >
                                <div className={clsx("absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-full transition-colors",
                                    item.status === "Critical" ? "bg-red-500" : item.status === "Warning" ? "bg-amber-500" : "bg-primary-500"
                                )} />

                                <div className="absolute top-3 right-3 w-6 h-6 rounded-md bg-white/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                                    <Info size={14} className="text-brand-teal" />
                                </div>

                                <h3 className="text-sm font-bold text-brand-dark h-10 mb-3">{item.indicator}</h3>

                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-3xl font-black text-brand-dark">{item.current}%</span>
                                    <span className="text-xs text-brand-teal font-medium mb-1">Target: {item.target}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full h-2.5 bg-brand-surface rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${(item.current / (item.target > item.current ? item.target * 1.5 : item.current)) * 100}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className={clsx("h-full rounded-full",
                                            item.status === "Critical" ? "bg-gradient-to-r from-red-500 to-red-400" : item.status === "Warning" ? "bg-gradient-to-r from-amber-500 to-amber-400" : "bg-gradient-to-r from-primary-500 to-primary-400"
                                        )}
                                    />
                                </div>

                                <div className="flex items-center gap-1.5 mt-4 text-xs font-bold">
                                    {item.status === "Critical" ? <AlertTriangle size={12} className="text-red-500" /> : <FileCheck size={12} className="text-primary-500" />}
                                    <span className={clsx(
                                        item.status === "Critical" ? "text-red-600" : item.status === "Warning" ? "text-amber-600" : "text-primary-600"
                                    )}>{item.status}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </section>
    );
}
