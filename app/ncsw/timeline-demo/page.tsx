'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, CheckCircle, Clock, FileText, Eye,
    Printer, Shield, User, AlertTriangle, Scale,
    Download, MapPin, ChevronRight, Activity, Calendar
} from 'lucide-react';
import Link from 'next/link';
import { generateCaseRepository } from '@/lib/district-mock-data';
import clsx from 'clsx';

export default function FullTimelinePage() {
    // Get the "Ideal Case" (Index 0) which is fully completed
    const idealCase = generateCaseRepository()[0] as any;
    const [activeStage, setActiveStage] = useState<string | null>(idealCase.timeline[0].id);

    // Scroll Spy & Navigation Refs
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const isScrolling = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrolling.current) return; // Skip observer updates during manual scroll

                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveStage(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px', // Trigger when component is in the upper middle of viewport
                threshold: 0
            }
        );

        Object.values(sectionRefs.current).forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToStage = (id: string) => {
        isScrolling.current = true;
        setActiveStage(id);

        const el = sectionRefs.current[id];
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 180; // Offset for sticky header
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Re-enable observer after scroll animation finishes
            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        }
    };

    // Helper to safely extract field from any stage in timeline
    const getField = (key: string) => {
        const foundStage = idealCase.timeline.find((s: any) => s.details && s.details[key]);
        return foundStage ? foundStage.details[key] : 'N/A';
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-brand-dark pb-32">
            {/* Sticky Header with Glassmorphism */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm supports-[backdrop-filter]:bg-white/60">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/ncsw/approvals" className="p-2.5 -ml-2 rounded-xl hover:bg-gray-100/80 text-gray-500 hover:text-brand-dark transition-all duration-300 group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Case Timeline Analysis</h1>
                                <span className="px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-bold border border-emerald-200/60 flex items-center gap-1.5 shadow-sm">
                                    <CheckCircle size={12} weight="fill" />
                                    {idealCase.status}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 border border-gray-200">{idealCase.caseId}</span>
                                <span className="text-gray-300">|</span>
                                <span className="flex items-center gap-1.5"><MapPin size={12} /> {idealCase.province}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{idealCase.district}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200/80 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-300">
                            <Printer size={16} />
                            Print
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-xl text-sm font-bold hover:bg-brand-teal hover:shadow-lg hover:shadow-brand-teal/20 active:scale-95 transition-all duration-300">
                            <Download size={16} />
                            Export Report
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-10">

                {/* Top Summary Cards - Enhanced Visuals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {[
                        {
                            title: 'Survivor Profile',
                            sub: 'Confidential',
                            icon: User,
                            color: 'blue',
                            data: [
                                { label: 'Name (Alias)', val: idealCase.survivor },
                                { label: 'Age Group', val: getField('survivorAge') },
                                { label: 'Disability', val: getField('disabilityStatus') },
                                { label: 'Recurrence', val: getField('recurrence'), badge: true }
                            ]
                        },
                        {
                            title: 'Incident Details',
                            sub: `${idealCase.risk} Risk`,
                            subColor: idealCase.risk === 'Critical' ? 'text-red-500' : 'text-gray-500',
                            icon: AlertTriangle,
                            color: 'red',
                            data: [
                                { label: 'Type', val: idealCase.crimeCode },
                                { label: 'Location', val: getField('incidentLocation') },
                                { label: 'Date', val: idealCase.date },
                                { label: 'Police Resp.', val: getField('policeResponseTime') }
                            ]
                        },
                        {
                            title: 'Legal Status',
                            sub: 'Judicial Process',
                            icon: Scale,
                            color: 'purple',
                            data: [
                                { label: 'FIR No.', val: getField('firNo') || 'N/A', monospace: true },
                                { label: 'Investigation', val: 'Complete', icon: <CheckCircle size={14} className="text-emerald-500" /> },
                                { label: 'Outcome', val: idealCase.status, badge: true }
                            ]
                        }
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] transition-all duration-500 group"
                        >
                            <div className="flex items-center gap-4 mb-5">
                                <div className={`w-14 h-14 rounded-2xl bg-${card.color}-50 border border-${card.color}-100 flex items-center justify-center text-${card.color}-600 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                    <card.icon size={26} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 leading-tight">{card.title}</h3>
                                    <p className={clsx("text-xs uppercase tracking-wider font-bold mt-0.5", card.subColor || "text-gray-400")}>{card.sub}</p>
                                </div>
                            </div>
                            <div className="space-y-3.5">
                                {card.data.map((item: any, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-0.5">
                                        <span className="text-sm text-gray-500 font-medium">{item.label}</span>
                                        {item.badge ? (
                                            <span className="text-xs font-bold bg-gray-900 text-white px-2 py-1 rounded-lg shadow-sm">{item.val}</span>
                                        ) : (
                                            <span className={clsx(
                                                "text-sm font-bold text-gray-900 flex items-center gap-1.5",
                                                item.monospace && "font-mono text-gray-600 bg-gray-50 px-1.5 rounded border border-gray-100"
                                            )}>
                                                {item.icon}{item.val}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-12 gap-10">

                    {/* LEFT COLUMN: Sticky Navigation */}
                    <div className="hidden lg:block lg:col-span-4 relative">
                        <div className="sticky top-28 space-y-6">

                            {/* Navigation Card */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-gray-50/80 to-white/50 backdrop-blur">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Activity size={18} className="text-brand-teal" />
                                        Process Flow
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">Interactive timeline navigation</p>
                                </div>

                                <div className="p-4 bg-white relative max-h-[calc(100vh-320px)] overflow-y-auto custom-scrollbar">
                                    {/* Timeline Vertical Line */}
                                    <div className="absolute left-[39px] top-6 bottom-6 w-[2px] bg-gray-100">
                                        <motion.div
                                            className="w-full bg-brand-teal origin-top"
                                            initial={{ height: 0 }}
                                            animate={{
                                                height: `${Math.min(100, (idealCase.timeline.findIndex((s: any) => s.id === activeStage) + 1) / idealCase.timeline.length * 100)}%`
                                            }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                        />
                                    </div>

                                    <div className="space-y-1 relative">
                                        {idealCase.timeline.map((stage: any, idx: number) => {
                                            const isActive = activeStage === stage.id;
                                            const isPast = idealCase.timeline.findIndex((s: any) => s.id === activeStage) > idx;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => scrollToStage(stage.id)}
                                                    className={clsx(
                                                        "w-full flex items-center text-left p-3 rounded-2xl transition-all duration-300 relative z-10 group outline-none focus:ring-2 ring-brand-teal/20",
                                                        isActive
                                                            ? "bg-brand-surface/50 text-brand-dark shadow-sm translate-x-2"
                                                            : "hover:bg-gray-50 hover:translate-x-1"
                                                    )}
                                                >
                                                    <div className={clsx(
                                                        "w-8 h-8 rounded-full border-[3px] flex items-center justify-center shrink-0 mr-4 transition-all duration-300 z-10",
                                                        isActive
                                                            ? "bg-brand-teal border-brand-teal text-white shadow-lg shadow-brand-teal/30 scale-110"
                                                            : isPast
                                                                ? "bg-white border-brand-teal text-brand-teal"
                                                                : "bg-white border-gray-200 text-gray-300"
                                                    )}>
                                                        {isActive || isPast ? (
                                                            <div className={clsx("w-2 h-2 rounded-full", isActive ? "bg-white" : "bg-brand-teal")} />
                                                        ) : (
                                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center w-full">
                                                            <p className={clsx(
                                                                "text-sm font-bold transition-colors truncate pr-2",
                                                                isActive ? "text-brand-dark" : isPast ? "text-gray-700" : "text-gray-400"
                                                            )}>
                                                                {stage.stage}
                                                            </p>
                                                            {isActive && <ChevronRight size={14} className="text-brand-teal animate-pulse" />}
                                                        </div>
                                                        <p className="text-[10px] text-gray-400 font-mono mt-0.5 tracking-tight">{stage.date}</p>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Services Gap Analysis Card (New) */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Activity size={18} className="text-purple-600" />
                                        Services Provided
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">Gaps Analysis & Support</p>
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Required</span>
                                            <span className="font-medium text-gray-900">{getField('servicesRequired') || 'N/A'}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-3/4" />
                                        </div>
                                        <p className="text-[10px] text-gray-400 text-right">75% Services Delivered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Services Gap Analysis Card (New) */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <Activity size={18} className="text-purple-600" />
                                        Services Provided
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">Gaps Analysis & Support</p>
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gray-500">Required</span>
                                            <span className="font-medium text-gray-900">{getField('servicesRequired') || 'N/A'}</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-3/4" />
                                        </div>
                                        <p className="text-[10px] text-gray-400 text-right">75% Services Delivered</p>
                                    </div>
                                </div>
                            </div>

                            {/* Alert Box */}
                            <div className="bg-brand-dark/5 p-6 rounded-3xl border border-brand-dark/10">
                                <h4 className="font-bold text-brand-dark text-sm mb-2 flex items-center gap-2">
                                    <AlertTriangle size={16} className="text-amber-500" />
                                    Verify Data Integrity
                                </h4>
                                <p className="text-xs text-brand-dark/60 leading-relaxed mb-3">
                                    Ensure all digital evidence hashes match the Chain of Custody logs before approving for final judgment.
                                </p>
                                <button className="w-full py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
                                    Last Audit: 2 Hours Ago
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Detailed View */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        {idealCase.timeline.map((stage: any, idx: number) => {
                            const isLast = idx === idealCase.timeline.length - 1;
                            const isActive = activeStage === stage.id;

                            return (
                                <div key={idx} ref={(el) => (sectionRefs.current[stage.id] = el)} id={stage.id} className="scroll-mt-32">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className={clsx(
                                            "bg-white rounded-[32px] border transition-all duration-500 overflow-hidden relative group",
                                            isActive
                                                ? "border-brand-teal/40 shadow-[0_20px_60px_rgb(0,0,0,0.08)] ring-4 ring-brand-teal/5"
                                                : "border-gray-100 shadow-[0_4px_10px_rgb(0,0,0,0.02)] opacity-95"
                                        )}
                                    >
                                        {/* Status Stripe */}
                                        <div className={clsx(
                                            "absolute top-0 left-0 w-1.5 h-full transition-colors duration-500",
                                            isActive ? "bg-brand-teal" : "bg-gray-100"
                                        )} />

                                        {/* Card Header */}
                                        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white relative z-10">
                                            <div className="flex items-center gap-5">
                                                <div className={clsx(
                                                    "w-12 h-12 rounded-2xl border shadow-sm flex items-center justify-center text-lg font-bold transition-all duration-500",
                                                    isActive
                                                        ? "bg-brand-dark text-white border-brand-dark scale-105 shadow-brand-dark/20"
                                                        : "bg-white text-gray-400 border-gray-200"
                                                )}>
                                                    <span className="font-mono">{String(idx + 1).padStart(2, '0')}</span>
                                                </div>
                                                <div>
                                                    <h3 className={clsx("text-xl font-bold transition-colors", isActive ? "text-gray-900" : "text-gray-700")}>{stage.stage}</h3>
                                                    <p className="text-sm text-emerald-600 font-bold flex items-center gap-1.5 mt-0.5">
                                                        <CheckCircle size={14} weight="fill" />
                                                        Completed on {stage.date}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block text-right">
                                                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-1">SOP ADHERENCE</span>
                                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                                                    <Shield size={12} /> VERIFIED
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card Body - Dynamic Fields */}
                                        <div className="p-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                                {Object.entries(stage.details).map(([key, value]) => {
                                                    // Convert camelCase to Label
                                                    const label = key.replace(/([A-Z])/g, ' $1').trim();

                                                    return (
                                                        <div key={key} className="group/field">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-teal/30 group-hover/field:bg-brand-teal transition-colors" />
                                                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider group-hover/field:text-brand-dark transition-colors">
                                                                    {label}
                                                                </span>
                                                            </div>
                                                            <div className="pl-3.5 text-base text-gray-900 font-medium border-l-2 border-gray-100 group-hover/field:border-brand-teal/30 transition-all py-0.5">
                                                                {value as string || <span className="text-gray-300 italic">Not recorded</span>}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Documentation Strip */}
                                            {stage.attachments && stage.attachments.length > 0 && (
                                                <div className="mt-10 pt-8 border-t border-dashed border-gray-200">
                                                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                                        <FileText size={14} className="text-brand-teal" />
                                                        Attached Evidence & Docs
                                                    </h4>
                                                    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                                                        {stage.attachments.map((file: any, fIdx: number) => (
                                                            <motion.div
                                                                whileHover={{ y: -4, borderColor: '#5F9EA0' }}
                                                                key={fIdx}
                                                                className="flex-shrink-0 flex items-center gap-3 p-3 pr-6 bg-white rounded-xl border border-gray-200 shadow-sm cursor-pointer min-w-[200px]"
                                                            >
                                                                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 border border-gray-100">
                                                                    {file.type === 'image' ? <Eye size={18} /> : <FileText size={18} />}
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-bold text-gray-800 truncate max-w-[120px]">{file.name}</p>
                                                                    <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">{file.type} • 2.4 MB</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Connector to next card (Visual only) */}
                                        {!isLast && (
                                            <div className="absolute left-1/2 -bottom-8 w-[2px] h-8 bg-gray-200 -z-10 hidden lg:block" />
                                        )}
                                    </motion.div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </main>
        </div>
    );
}
