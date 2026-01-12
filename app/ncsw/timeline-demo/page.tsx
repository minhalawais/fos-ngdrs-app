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

    // Dashboard Colors for Stages
    const STAGE_COLORS = [
        { border: 'border-blue-500', bg: 'bg-blue-500', light: 'bg-blue-50', text: 'text-blue-700', shadow: 'shadow-blue-200' },
        { border: 'border-indigo-500', bg: 'bg-indigo-500', light: 'bg-indigo-50', text: 'text-indigo-700', shadow: 'shadow-indigo-200' },
        { border: 'border-purple-500', bg: 'bg-purple-500', light: 'bg-purple-50', text: 'text-purple-700', shadow: 'shadow-purple-200' },
        { border: 'border-amber-500', bg: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-700', shadow: 'shadow-amber-200' },
        { border: 'border-orange-500', bg: 'bg-orange-500', light: 'bg-orange-50', text: 'text-orange-700', shadow: 'shadow-orange-200' },
        { border: 'border-rose-500', bg: 'bg-rose-500', light: 'bg-rose-50', text: 'text-rose-700', shadow: 'shadow-rose-200' },
        { border: 'border-emerald-600', bg: 'bg-emerald-600', light: 'bg-emerald-50', text: 'text-emerald-700', shadow: 'shadow-emerald-200' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrolling.current) return;

                entries.forEach((entry) => {
                    // Only update if the element intersects the center line
                    if (entry.isIntersecting) {
                        setActiveStage(entry.target.id);
                    }
                });
            },
            {
                // This creates a narrow detection area in the vertical center of the viewport
                rootMargin: '-45% 0px -45% 0px',
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
            // Adjust offset for sticky header
            const y = el.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top: y, behavior: 'smooth' });

            // Reset scrolling lock after animation
            setTimeout(() => {
                isScrolling.current = false;
            }, 800);
        }
    };

    // Helper to format dates to readable format
    const formatDate = (dateStr: string) => {
        if (!dateStr || dateStr === 'N/A') return dateStr;
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return dateStr;
            return date.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        } catch (e) {
            return dateStr;
        }
    };

    // Helper to safely extract field from any stage in timeline
    const getField = (key: string) => {
        const foundStage = idealCase.timeline.find((s: any) => s.details && s.details[key]);
        const val = foundStage ? foundStage.details[key] : 'N/A';
        // Auto-format if it's a date field
        if (key.toLowerCase().includes('date')) return formatDate(val);
        return val;
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
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Case Timeline</h1>
                                <span className="px-3 py-1 rounded-full bg-emerald-100/50 text-emerald-700 text-xs font-bold border border-emerald-200/60 flex items-center gap-1.5 shadow-sm">
                                    <CheckCircle size={12} className="fill-current" />
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

                {/* AI Summary Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10 p-1 rounded-[24px] bg-gradient-to-r from-brand-teal via-cyan-400 to-blue-500 shadow-lg shadow-brand-teal/10"
                >
                    <div className="bg-white rounded-[22px] p-6 relative overflow-hidden">
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-brand-teal/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60" />

                        <div className="flex gap-5 relative z-10">
                            <div className="shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-teal/10 to-blue-50 flex items-center justify-center text-brand-teal ring-4 ring-brand-teal/5 shadow-inner">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-brand-teal/20 blur-lg rounded-full animate-pulse" />
                                        <span className="relative text-2xl">✨</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-teal flex items-center gap-2">
                                    AI Case Summary
                                </h2>
                                <div className="text-gray-700 leading-relaxed text-sm md:text-base space-y-4">
                                    <p>
                                        On {formatDate(idealCase.date)}, {idealCase.survivor} sought justice at {getField('intakeChannel') || 'the reporting center'} ({getField('policeStation')}) in {idealCase.district}, {idealCase.province}, reporting a distressing incident of {idealCase.crimeCode.split('(')[1]?.replace(')', '') || idealCase.category}. She provided a detailed account of how {getField('perpetratorType')?.toLowerCase() || 'a perpetrator'} perpetrated {getField('violenceType')?.split('(')[0]?.trim().toLowerCase() || 'an offense'} at {getField('incidentLocation')?.toLowerCase() || 'a specific location'}.
                                    </p>
                                    <p>
                                        Following the initial report, the law enforcement team at {getField('policeStation')} moved swiftly, responding {getField('policeResponseTime')?.toLowerCase() || 'promptly'}. To formalize the state's narrative, FIR Number {getField('firNo')} was registered under sections {getField('sections')} on {getField('firDate')}. The investigation, led by {getField('ioAssigned')}, focused on consolidating the survivor's testimony with forensic evidence.
                                    </p>
                                    <p>
                                        Medical verification was promptly conducted at {getField('hospital')} on {getField('examDate')}, where {getField('mloName')} meticulously documented all physical evidence. The subsequent DNA analysis ({getField('dnaReport')?.toLowerCase()}) provided critical scientific backing to the case. As the investigation reached its peak, the police executed the arrest of the accused on {getField('arrestDate')}, subsequent to which the individual was placed under {getField('remandType')?.toLowerCase()} at {getField('jailLocation')}.
                                    </p>
                                    <p>
                                        The pursuit of justice culminated in the court of {getField('judgeName')}. Upon weighing the survivor's courageous testimony against the police's evidential findings, the court delivered a verdict of {idealCase.status.toLowerCase()}. The case concluded with a sentence of {getField('sentenceDetail')}, ensuring accountability and achieving a {idealCase.completeness}% success rate according to the national GBV reporting framework.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

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
                                { label: 'Date', val: formatDate(idealCase.date) },
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

                <div className="grid grid-cols-12 gap-8">

                    {/* LEFT COLUMN: Sticky Navigation */}
                    <div className="hidden lg:block lg:col-span-3 relative">
                        <div className="sticky top-28 space-y-6">

                            {/* Navigation Card */}
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                <div className="p-5 border-b border-gray-100 bg-gradient-to-br from-gray-50/80 to-white/50 backdrop-blur">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-sm">
                                        <Activity size={16} className="text-brand-teal" />
                                        Process Flow
                                    </h3>
                                </div>

                                <div className="p-3 bg-white relative max-h-[calc(100vh-320px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {/* Timeline Vertical Line */}
                                    <div className="absolute left-[35px] top-6 bottom-6 w-[2px] bg-gray-100">
                                        {/* Dynamic Gradient Bar */}
                                        <motion.div
                                            className="w-full bg-gradient-to-b from-blue-400 via-purple-400 to-emerald-400 origin-top"
                                            initial={{ height: 0 }}
                                            animate={{
                                                height: `${Math.min(100, (idealCase.timeline.findIndex((s: any) => s.id === activeStage) + 1) / idealCase.timeline.length * 100)}%`
                                            }}
                                            transition={{ type: "spring", stiffness: 40 }}
                                        />
                                    </div>

                                    <div className="space-y-1 relative">
                                        {idealCase.timeline.map((stage: any, idx: number) => {
                                            const isActive = activeStage === stage.id;
                                            const isPast = idealCase.timeline.findIndex((s: any) => s.id === activeStage) > idx;
                                            const color = STAGE_COLORS[idx % STAGE_COLORS.length];

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => scrollToStage(stage.id)}
                                                    className={clsx(
                                                        "w-full flex items-center text-left p-2.5 rounded-xl transition-all duration-300 relative z-10 group outline-none",
                                                        isActive
                                                            ? `${color.light} ${color.text} shadow-sm translate-x-1`
                                                            : "hover:bg-gray-50 hover:translate-x-1"
                                                    )}
                                                >
                                                    <div className={clsx(
                                                        "w-7 h-7 rounded-full border-[2px] flex items-center justify-center shrink-0 mr-3 transition-all duration-300 z-10",
                                                        isActive
                                                            ? `${color.bg} ${color.border} text-white shadow-lg ${color.shadow} scale-105`
                                                            : isPast
                                                                ? `bg-white ${color.border} ${color.text}`
                                                                : "bg-white border-gray-200 text-gray-300"
                                                    )}>
                                                        {isActive || isPast ? (
                                                            <div className={clsx("w-1.5 h-1.5 rounded-full", isActive ? "bg-white" : color.bg)} />
                                                        ) : (
                                                            <div className="w-1 h-1 rounded-full bg-gray-300" />
                                                        )}
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className={clsx(
                                                            "text-[13px] font-bold transition-colors truncate px-1",
                                                            isActive ? "text-gray-900" : isPast ? "text-gray-700" : "text-gray-400"
                                                        )}>
                                                            {stage.stage}
                                                        </p>
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Services Gap - Compact */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Service Provided</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-gray-600">Legal Aid</span>
                                        <span className="text-emerald-600 font-bold">Provided</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1 rounded-full"><div className="w-full h-full bg-emerald-500 rounded-full" /></div>

                                    <div className="flex justify-between items-center text-xs mt-2">
                                        <span className="text-gray-600">Counseling</span>
                                        <span className="text-orange-500 font-bold">Pending</span>
                                    </div>
                                    <div className="w-full bg-gray-100 h-1 rounded-full"><div className="w-1/3 h-full bg-orange-400 rounded-full" /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Detailed View (Wider) */}
                    <div className="col-span-12 lg:col-span-9 space-y-6">
                        {idealCase.timeline.map((stage: any, idx: number) => {
                            const isLast = idx === idealCase.timeline.length - 1;
                            const isActive = activeStage === stage.id;
                            const color = STAGE_COLORS[idx % STAGE_COLORS.length];

                            return (
                                <div key={idx} ref={(el) => (sectionRefs.current[stage.id] = el)} id={stage.id} className="scroll-mt-32">
                                    <motion.div
                                        initial={{ opacity: 0, y: 32 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className={clsx(
                                            "bg-white rounded-[24px] border transition-all duration-500 overflow-hidden relative group",
                                            isActive
                                                ? `${color.border}/30 ${color.shadow} ring-1 ring-${color.bg.split('-')[1]}/20`
                                                : "border-gray-100 shadow-sm opacity-95"
                                        )}
                                    >
                                        {/* Colored Status Stripe */}
                                        <div className={clsx(
                                            "absolute top-0 left-0 w-1.5 h-full transition-colors duration-500",
                                            isActive ? color.bg : "bg-gray-100"
                                        )} />

                                        {/* Card Header */}
                                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
                                            <div className="flex items-center gap-4">
                                                <div className={clsx(
                                                    "w-10 h-10 rounded-xl border flex items-center justify-center text-lg font-bold font-mono transition-colors duration-300",
                                                    isActive ? `${color.bg} text-white border-transparent` : "bg-white text-gray-400 border-gray-200"
                                                )}>
                                                    {String(idx + 1).padStart(2, '0')}
                                                </div>
                                                <div>
                                                    <h3 className={clsx("text-lg font-bold transition-colors", isActive ? "text-gray-900" : "text-gray-700")}>{stage.stage}</h3>
                                                    <p className={clsx("text-xs font-medium flex items-center gap-1 mt-0.5", isActive ? color.text : "text-gray-500")}>
                                                        {isActive && <CheckCircle size={12} />}
                                                        <span className="text-gray-500">Reported:</span> {formatDate(stage.date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block">
                                                <span className={clsx(
                                                    "px-3 py-1 rounded-full text-xs font-bold border",
                                                    isActive ? `${color.light} ${color.text} ${color.border.split('-')[1]}-100` : "bg-gray-50 text-gray-400 border-gray-100"
                                                )}>
                                                    {stage.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 2-Column Layout with SWAPPED content (Fields Top, Description Bottom) */}
                                        <div className="flex flex-col lg:flex-row">
                                            {/* Left: Content (Fields First, then Description) */}
                                            <div className="flex-1 p-6 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col gap-6">

                                                {/* 1. Fields Grid (Moved to TOP) */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                    {Object.entries(stage.details).map(([key, value]) => {
                                                        const label = key.replace(/([A-Z])/g, ' $1').trim();
                                                        return (
                                                            <div key={key} className="group/field">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <div className={clsx("w-1 h-1 rounded-full", isActive ? color.bg : "bg-gray-300")} />
                                                                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{label}</span>
                                                                </div>
                                                                <div className={clsx(
                                                                    "text-sm font-bold border-l-2 pl-2 -ml-2 transition-all",
                                                                    isActive ? "text-gray-900 border-transparent group-hover/field:border-" + color.bg.split('-')[1] + "-500" : "text-gray-700 border-transparent"
                                                                )}>
                                                                    {value as string || '—'}
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>

                                                {/* 2. Description (Moved to BOTTOM) */}
                                                {stage.description && (
                                                    <div className={clsx(
                                                        "p-4 rounded-xl border",
                                                        isActive ? `${color.light} border-${color.bg.split('-')[1]}-100` : "bg-gray-50 border-gray-100"
                                                    )}>
                                                        <h5 className={clsx("text-[10px] font-black uppercase tracking-widest mb-2", isActive ? color.text : "text-gray-400")}>
                                                            Description
                                                        </h5>
                                                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                                            {stage.description}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right: Evidence Column */}
                                            <div className="w-full lg:w-72 bg-gray-50/50 p-5 flex flex-col gap-4">
                                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                                    <FileText size={14} className="text-brand-dark" />
                                                    Attached Evidence
                                                </h4>

                                                {stage.attachments && stage.attachments.length > 0 ? (
                                                    <div className="space-y-3">
                                                        {stage.attachments.map((file: any, fIdx: number) => (
                                                            <div key={fIdx} className="group/file p-3 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer flex items-start gap-3 relative overflow-hidden">
                                                                <div className={clsx("absolute top-0 left-0 w-0.5 h-full transition-all", `group-hover/file:${color.bg}`)} />
                                                                <div className={clsx("w-8 h-8 rounded-lg flex items-center justify-center transition-colors", `${color.light} ${color.text}`)}>
                                                                    {file.type === 'image' ? <Eye size={16} /> : <FileText size={16} />}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-bold text-gray-700 truncate group-hover/file:text-gray-900 transition-colors">{file.name}</p>
                                                                    <p className="text-[10px] text-gray-400 mt-0.5">Verified • 2MB</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2 min-h-[100px]">
                                                        <FileText size={24} className="opacity-20" />
                                                        <span className="text-xs">No documents attached</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Connector Line */}
                                        {!isLast && (
                                            <div className="absolute left-11 -bottom-6 w-[2px] h-6 bg-gray-200 -z-10 hidden lg:block" />
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
