
"use client";

import { motion } from "framer-motion";
import {
    FileInput, Building2, Shield, BarChart3,
    ArrowRight, Users, CheckCircle2, Lock,
    ChevronRight, Scan, KeyRound, Radio
} from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

/**
 * Stakeholder Portals Section - "Command Center Access"
 * Redesigned to use BOLD FULL-COLOR cards to distinguish from the clean white Workflow cards.
 * Aesthetics: "App Icons" or "Launchpads" style.
 */

export default function StakeholderPortals() {
    return (
        <section className="py-24 bg-brand-canvas relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="mb-12 flex flex-col md:items-center md:text-center text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-dark/10 text-brand-dark mb-6"
                    >
                        <Radio size={14} className="text-primary-600 animate-pulse" />
                        <span className="text-xs font-bold tracking-wide uppercase">Live Access Points</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-heading font-bold text-brand-dark mb-4"
                    >
                        Stakeholder <span className="text-primary-600">Gateways</span>
                    </motion.h2>
                    <p className="text-brand-soft text-lg max-w-2xl mx-auto">
                        Secure, role-based environments designed for the specific operational needs of each diverse actor in the justice chain.
                    </p>
                </div>

                {/* Bento Grid layout with Full Color Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* 1. Executive Dashboard (Large - Dark Teal Theme) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="col-span-1 md:col-span-3 lg:col-span-2 row-span-2 group relative overflow-hidden rounded-[2rem] bg-brand-dark text-white p-8 md:p-10 shadow-2xl flex flex-col justify-between"
                    >
                        {/* Background FX */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-8">
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/10 text-xs font-mono text-primary-300">
                                    AUTH: EXEC_VIEW
                                </span>
                                <BarChart3 className="text-primary-400 opacity-80" size={32} />
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold mb-3">Executive Dashboard</h3>
                            <p className="text-brand-soft/70 text-lg max-w-sm leading-relaxed">
                                Strategic decision support with real-time justice funnel analytics and heatmaps.
                            </p>
                        </div>

                        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-4">
                            <Link href="/dashboard" className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary-500/25 flex items-center gap-2">
                                Launch Console <ArrowRight size={18} />
                            </Link>
                            <div className="flex items-center gap-3 text-xs text-brand-soft/50 font-medium px-4">
                                <Lock size={12} /> Read-Only Mode
                            </div>
                        </div>
                    </motion.div>

                    {/* 2. Field Entry Portal (Vertical - Vivid Blue Theme) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="col-span-1 md:col-span-1 lg:col-span-1 row-span-2 group relative overflow-hidden rounded-[2rem] bg-blue-600 text-white p-8 shadow-xl shadow-blue-900/10 flex flex-col justify-between hover:translate-y-[-4px] transition-transform duration-300"
                    >
                        <div className="absolute bottom-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <FileInput size={140} />
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6">
                                <FileInput size={24} className="text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Field Agent</h3>
                            <p className="text-blue-100/80 text-sm leading-relaxed mb-6">
                                Offline-first intake app for District Focal Persons. Auto-syncs when online.
                            </p>
                            <div className="space-y-3">
                                {["Smart Forms", "Evidence Upload", "Biometric Verify"].map(f => (
                                    <div key={f} className="flex items-center gap-2 text-sm text-blue-50 font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-300" /> {f}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link href="/portal/field" className="mt-8 flex items-center justify-between py-3 px-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/10">
                            <span className="font-bold text-sm">Login</span>
                            <ChevronRight size={16} />
                        </Link>
                    </motion.div>

                    {/* 3. Provincial Portal (Horizontal - Amber Theme) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="col-span-1 md:col-span-2 lg:col-span-2 group relative overflow-hidden rounded-[2rem] bg-amber-500 text-white p-8 shadow-xl shadow-amber-900/10 flex items-center justify-between hover:translate-y-[-4px] transition-transform duration-300"
                    >
                        <div className="absolute -left-10 -bottom-10 opacity-10 rotate-12">
                            <Building2 size={180} />
                        </div>

                        <div className="relative z-10 max-w-md">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-white/20 rounded-lg">
                                    <Building2 size={20} />
                                </div>
                                <span className="font-bold opacity-80 uppercase tracking-wider text-xs">Correction & Validation</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Provincial Coordination</h3>
                            <p className="text-amber-100 text-sm">
                                Workbench for WDD officers to triangulate data, resolve discrepancies, and certify monthly reports.
                            </p>
                        </div>

                        <Link href="/portal/provincial" className="relative z-10 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all shrink-0 ml-4">
                            <ArrowRight size={20} />
                        </Link>
                    </motion.div>

                    {/* 4. National Admin (Square - Purple Theme) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="col-span-1 md:col-span-1 lg:col-span-1 group relative overflow-hidden rounded-[2rem] bg-purple-600 text-white p-8 shadow-xl shadow-purple-900/10 hover:translate-y-[-4px] transition-transform duration-300 flex flex-col justify-between"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <img src="/ncsw.png" alt="NCSW" className="w-[100px] h-[100px] object-contain grayscale" />
                        </div>

                        <div>
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <KeyRound size={20} />
                            </div>
                            <h3 className="text-xl font-bold mb-1">NCSW Admin</h3>
                            <p className="text-purple-200 text-xs mb-4">User management & system audits.</p>
                        </div>

                        <Link href="/portal/admin" className="text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                            Access Panel <ArrowRight size={16} />
                        </Link>
                    </motion.div>

                </div>

                {/* Footer Strip */}
                <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-8 text-xs font-medium text-brand-dark/40">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-dark/5">
                        <Lock size={12} className="text-brand-teal" /> End-to-End Encrypted
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-dark/5">
                        <Users size={12} className="text-brand-teal" /> 2FA Enforced
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-dark/5">
                        <Shield size={12} className="text-brand-teal" /> Govt. Cloud Hosted
                    </span>
                </div>
            </div>
        </section>
    );
}
