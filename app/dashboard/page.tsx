"use client";

import { useState } from "react";
import { Filter, Calendar, MapPin, ChevronDown, Check } from "lucide-react";
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

    return (
        <div className="space-y-8">
            {/* Header & Filters Section */}
            <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-4xl mx-auto pt-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-black text-brand-dark tracking-tight mb-2" style={{ whiteSpace: 'nowrap' }}>
                        National GBV & TFGBV Monitoring Dashboard
                    </h1>
                </motion.div>

                {/* Filters Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-3 p-2 bg-brand-surface/30 backdrop-blur-sm border border-brand-surface rounded-2xl w-full max-w-3xl relative z-50"
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

                    <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all ml-auto">
                        Apply
                    </button>
                </motion.div>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-8 pb-12">
                <OverviewSection />
                <DemographicsSection />
                <ProcessIndicatorsSection />
                <GeospatialSection />
                <JusticeSection />
                <ServicesSection />
                <PlatformSection />
                <ComplianceSection />
            </div>
        </div>
    );
}
