"use client";

import { useState } from "react";
import { Filter, Calendar, MapPin, ChevronDown, Check, FileText, Download, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { clsx } from "clsx";

// Section Imports
import OverviewSection from "@/components/dashboard/sections/OverviewSection";
import DemographicsSection from "@/components/dashboard/sections/DemographicsSection";
import ProcessIndicatorsSection from "@/components/dashboard/sections/ProcessIndicatorsSection";
import GeospatialSection from "@/components/dashboard/sections/GeospatialSection";
import JusticeSection from "@/components/dashboard/sections/JusticeSection";
import ServicesSection from "@/components/dashboard/sections/ServicesSection";
import PlatformSection from "@/components/dashboard/sections/PlatformSection";
import ComplianceSection from "@/components/dashboard/sections/ComplianceSection";

// Reports Data
const REPORTS = [
    {
        id: 'RPT-2024-Q4',
        title: 'Annual GBV & TFGBV Data Transparency Report',
        subtitle: 'FY 2024 (Q1-Q4)',
        status: 'Ready',
        type: 'Annual',
        pages: 124,
        lastUpdated: '2024-01-15'
    },
    {
        id: 'RPT-2024-Q3',
        title: 'Quarterly Statistical Bulletin',
        subtitle: 'Q3 2024 (Jul-Sep)',
        status: 'Published',
        type: 'Quarterly',
        pages: 48,
        lastUpdated: '2024-10-15'
    },
    {
        id: 'RPT-CEDAW-2024',
        title: 'CEDAW Periodic Report Supplement',
        subtitle: 'GBV Data Annex',
        status: 'Draft',
        type: 'Treaty',
        pages: 32,
        lastUpdated: '2024-01-10'
    },
    {
        id: 'RPT-SDG5-2024',
        title: 'SDG 5 Progress Report',
        subtitle: 'National Indicators',
        status: 'Ready',
        type: 'International',
        pages: 28,
        lastUpdated: '2024-01-12'
    },
];

const REPORT_TYPE_COLORS: Record<string, string> = {
    'Annual': 'bg-purple-100 text-purple-700',
    'Quarterly': 'bg-blue-100 text-blue-700',
    'Treaty': 'bg-green-100 text-green-700',
    'International': 'bg-orange-100 text-orange-700',
};

function FilterDropdown({ label, icon: Icon, options, value, onChange }: any) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-surface rounded-xl text-sm font-medium text-brand-dark hover:border-brand-teal/50 hover:shadow-sm transition-all min-w-[160px] justify-between"
            >
                <div className="flex items-center gap-2 text-brand-teal">
                    <Icon size={16} />
                    <span className="text-brand-dark">{value || label}</span>
                </div>
                <ChevronDown size={14} className={clsx("transition-transform text-brand-teal/70", isOpen ? "rotate-180" : "")} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full mt-2 left-0 w-56 bg-white border border-brand-surface rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                        <div className="px-3 py-2 bg-brand-surface/20 border-b border-brand-surface text-xs font-bold text-brand-teal uppercase tracking-wider">
                            Select {label}
                        </div>
                        {options.map((opt: string) => (
                            <button
                                key={opt}
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className="w-full text-left px-4 py-2.5 text-sm font-medium text-brand-dark hover:bg-brand-surface/50 hover:text-primary-600 flex items-center justify-between group transition-colors"
                            >
                                {opt}
                                {value === opt && <Check size={14} className="text-primary-500" />}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function DashboardPage() {
    const [dateRange, setDateRange] = useState("Last 30 Days");
    const [province, setProvince] = useState("All Provinces");
    const [violenceType, setViolenceType] = useState("All Categories");
    const [showReports, setShowReports] = useState(false);

    return (
        <div className="space-y-4" onClick={() => setShowReports(false)}>
            {/* Header & Filters Section */}
            <div className="flex flex-col items-center justify-center text-center space-y-3 w-full pt-4 relative z-50">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-black text-brand-dark tracking-tight mb-1" style={{ whiteSpace: 'nowrap' }}>
                        National GBV & TFGBV Monitoring Dashboard
                    </h1>
                </motion.div>

                {/* Filter Row Container */}
                <div className="w-full max-w-[1400px] mx-auto relative flex items-center justify-center">

                    {/* Filters Bar (Centered) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-wrap items-center justify-center gap-3 p-2 bg-brand-surface/30 backdrop-blur-sm border border-brand-surface rounded-2xl relative z-40 shadow-sm"
                    >
                        <div className="flex items-center gap-2 px-3 text-brand-teal font-bold text-sm uppercase tracking-wider hidden md:flex">
                            <Filter size={16} />
                            Filters:
                        </div>

                        <FilterDropdown
                            label="Period"
                            icon={Calendar}
                            value={dateRange}
                            onChange={setDateRange}
                            options={["Last 7 Days", "Last 30 Days", "Last Quarter", "YTD 2026", "Custom Range"]}
                        />

                        <FilterDropdown
                            label="Province"
                            icon={MapPin}
                            value={province}
                            onChange={setProvince}
                            options={["All Provinces", "Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad (ICT)", "Gilgit-Baltistan", "AJK"]}
                        />

                        <FilterDropdown
                            label="Violence Type"
                            icon={Filter}
                            value={violenceType}
                            onChange={setViolenceType}
                            options={[
                                "All Categories",
                                "GB-PH: Physical Violence",
                                "GB-SX: Sexual Violence",
                                "GB-EC: Economic Abuse",
                                "GB-PY: Psychological",
                                "GB-FM: Forced Marriage",
                                "GB-TR: Trafficking",
                                "GB-FE: Femicide",
                                "TF-A1: Cyberstalking",
                                "TF-A2: Doxxing",
                                "TF-A3: Image-based Abuse",
                                "TF-A4: Deepfake Sexual Content",
                                "TF-A5: AI Voice Cloning",
                                "TF-A6: Online Mob Harassment",
                                "TF-A7: Sextortion",
                                "TF-A8: GPS Stalking"
                            ]}
                        />

                        <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all">
                            Apply
                        </button>
                    </motion.div>

                    {/* Right Actions (Absolute Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none md:pointer-events-auto"
                    >
                        {/* Download Reports Button & Dropdown */}
                        <div className="relative pointer-events-auto" onClick={e => e.stopPropagation()}>
                            <button
                                onClick={() => setShowReports(!showReports)}
                                className={clsx(
                                    "flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-bold transition-all shadow-md",
                                    showReports ? "bg-brand-teal text-white border-brand-teal" : "bg-white border-brand-surface text-brand-dark hover:bg-gray-50"
                                )}
                            >
                                <FileText size={16} />
                                <span className="hidden lg:inline">Download Reports</span>
                            </button>

                            {/* Reports Dropdown */}
                            {showReports && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute right-0 top-full mt-2 w-96 bg-white rounded-2xl border border-brand-surface shadow-xl z-50 overflow-hidden text-left"
                                >
                                    <div className="p-4 bg-gray-50 border-b border-brand-surface">
                                        <h3 className="font-bold text-brand-dark text-sm">Available Reports</h3>
                                        <p className="text-xs text-gray-500">Select a report to download</p>
                                    </div>
                                    <div className="max-h-[400px] overflow-y-auto">
                                        {REPORTS.map((report) => (
                                            <div key={report.id} className="p-4 border-b border-brand-surface hover:bg-gray-50 transition-colors group cursor-pointer flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", REPORT_TYPE_COLORS[report.type])}>
                                                            {report.type}
                                                        </span>
                                                        <span className="text-xs text-gray-400 font-mono">{report.lastUpdated}</span>
                                                    </div>
                                                    <p className="text-sm font-bold text-brand-dark group-hover:text-brand-teal transition-colors line-clamp-1" title={report.title}>{report.title}</p>
                                                    <p className="text-xs text-gray-500">{report.subtitle} • {report.pages} pages</p>
                                                </div>
                                                <button className="p-2 text-gray-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors">
                                                    <Download size={18} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-3 bg-gray-50 text-center border-t border-brand-surface">
                                        <Link href="/ncsw/reports" className="text-xs font-bold text-brand-teal hover:underline flex items-center justify-center gap-1">
                                            View All Reports <ArrowRight size={12} />
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-6 pb-8">
                <OverviewSection />
                <DemographicsSection />
                <GeospatialSection />
                <ProcessIndicatorsSection />
                <JusticeSection />
                <ServicesSection />
                <PlatformSection />
                <ComplianceSection />
            </div>
        </div>
    );
}
