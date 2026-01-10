
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MapPin, ChevronDown, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

// Dynamic import for Leaflet map to avoid SSR issues
const DistrictMap = dynamic(() => import("@/components/dashboard/maps/DistrictMap"), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-brand-surface/20 animate-pulse rounded-2xl flex flex-col items-center justify-center text-brand-teal gap-3">
            <MapPin size={32} className="animate-bounce" />
            <span className="font-medium">Loading Geospatial Data...</span>
        </div>
    )
});

// Violence Type Categories
const violenceCategories = {
    "physical-sexual": {
        label: "Physical & Sexual Violence",
        shortLabel: "Physical & Sexual",
        color: "#ef4444",
        subtypes: [
            { code: "PS-1", name: "Domestic Violence (IPV)" },
            { code: "PS-2", name: "Rape & Sexual Assault" },
            { code: "PS-3", name: "Femicide" },
            { code: "PS-4", name: "Honor-based Crimes" },
            { code: "PS-5", name: "Acid Crimes / Burning" },
            { code: "PS-6", name: "Forced Marriage" },
            { code: "PS-7", name: "Child Marriage" },
        ]
    },
    "psychological-economic": {
        label: "Psychological & Economic",
        shortLabel: "Psychological & Economic",
        color: "#f59e0b",
        subtypes: [
            { code: "PE-1", name: "Coercive Control" },
            { code: "PE-2", name: "Economic Deprivation" },
            { code: "PE-3", name: "Forced Labour / Trafficking" },
        ]
    },
    "tfgbv": {
        label: "Technology-Facilitated GBV",
        shortLabel: "TFGBV",
        color: "#8b5cf6",
        subtypes: [
            { code: "TF-A1", name: "Cyberstalking / Digital Monitoring" },
            { code: "TF-A2", name: "Doxxing (Personal Info Leak)" },
            { code: "TF-A3", name: "Threats / Extortion" },
            { code: "TF-A4", name: "Deepfake Sexual Content" },
            { code: "TF-A5", name: "Non-consensual Image/Video Sharing" },
            { code: "TF-A6", name: "AI Voice Cloning Coercion" },
            { code: "TF-A7", name: "Online Harassment / Mobbing" },
            { code: "TF-A8", name: "Sextortion / Blackmail" },
            { code: "TF-A9", name: "Location-based Targeting (GPS)" },
        ]
    }
};

type CategoryKey = keyof typeof violenceCategories;

export default function GeospatialSection() {
    const [activeCategory, setActiveCategory] = useState<CategoryKey | null>(null);
    const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const currentCategory = activeCategory ? violenceCategories[activeCategory] : null;

    // Generate filter string for map
    const currentFilter = selectedSubtype || activeCategory || "all";

    return (
        <section id="geospatial" className="space-y-3 scroll-mt-28">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Geospatial Risk Heatmap</h2>
                </div>
            </div>

            {/* Map Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden border border-brand-surface shadow-lg bg-white"
            >
                {/* Top Gradient Strip */}
                <div className="h-1 bg-gradient-to-r from-primary-500 via-brand-teal to-purple-500" />

                {/* Map Container with Overlay Filters */}
                <div className="h-[500px] w-full relative">
                    <DistrictMap key={currentFilter} filter={currentFilter} />

                    {/* Filter Panel - Top Right Overlay */}
                    <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
                        {/* Category Tabs */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-1 shadow-lg border border-brand-surface/50">
                            <div className="flex flex-col gap-0.5">
                                {(Object.keys(violenceCategories) as CategoryKey[]).map((key) => {
                                    const cat = violenceCategories[key];
                                    const isActive = activeCategory === key;
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => {
                                                if (activeCategory === key) {
                                                    setActiveCategory(null);
                                                } else {
                                                    setActiveCategory(key);
                                                }
                                                setSelectedSubtype(null);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={clsx(
                                                "px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide rounded-lg transition-all duration-200 text-left",
                                                isActive
                                                    ? "text-white shadow-md"
                                                    : "text-brand-dark/70 hover:bg-brand-surface/50"
                                            )}
                                            style={isActive ? { backgroundColor: cat.color } : {}}
                                        >
                                            {cat.shortLabel}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Subtype Dropdown - Only show when category selected */}
                        {currentCategory && (
                            <>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className={clsx(
                                            "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all w-full",
                                            "bg-white/95 backdrop-blur-sm border shadow-lg hover:shadow-xl",
                                            selectedSubtype
                                                ? "border-primary-300 text-brand-dark"
                                                : "border-brand-surface text-brand-dark/70"
                                        )}
                                    >
                                        <Filter size={12} className="text-brand-teal shrink-0" />
                                        <span className="truncate text-[10px]">
                                            {selectedSubtype
                                                ? currentCategory.subtypes.find(s => s.code === selectedSubtype)?.name || "Select"
                                                : "All Subtypes"}
                                        </span>
                                        <ChevronDown size={12} className={clsx("transition-transform shrink-0", isDropdownOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute top-full mt-2 right-0 w-64 bg-white/95 backdrop-blur-sm border border-brand-surface rounded-xl shadow-xl z-20 py-1 overflow-hidden max-h-[300px] overflow-y-auto"
                                                >
                                                    <div className="px-3 py-2 bg-gray-50/80 border-b border-brand-surface text-[10px] font-bold uppercase tracking-wider" style={{ color: currentCategory.color }}>
                                                        {currentCategory.label}
                                                    </div>
                                                    <button
                                                        onClick={() => { setSelectedSubtype(null); setIsDropdownOpen(false); }}
                                                        className={clsx(
                                                            "w-full text-left px-3 py-2 text-xs font-medium transition-colors",
                                                            !selectedSubtype
                                                                ? "bg-brand-surface/30 text-brand-dark"
                                                                : "text-brand-dark/70 hover:bg-brand-surface/50"
                                                        )}
                                                    >
                                                        All Subtypes
                                                    </button>
                                                    {currentCategory.subtypes.map((subtype) => (
                                                        <button
                                                            key={subtype.code}
                                                            onClick={() => { setSelectedSubtype(subtype.code); setIsDropdownOpen(false); }}
                                                            className={clsx(
                                                                "w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2",
                                                                selectedSubtype === subtype.code
                                                                    ? "bg-brand-surface/30 text-brand-dark"
                                                                    : "text-brand-dark/70 hover:bg-brand-surface/50"
                                                            )}
                                                        >
                                                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white shrink-0" style={{ backgroundColor: currentCategory.color }}>
                                                                {subtype.code}
                                                            </span>
                                                            <span className="truncate text-[10px]">{subtype.name}</span>
                                                        </button>
                                                    ))}
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Active Filter Badge */}
                                {selectedSubtype && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-[10px] font-bold text-white shadow-lg"
                                        style={{ backgroundColor: currentCategory.color }}
                                    >
                                        <span>{currentCategory.subtypes.find(s => s.code === selectedSubtype)?.code}: {currentCategory.subtypes.find(s => s.code === selectedSubtype)?.name}</span>
                                        <button
                                            onClick={() => setSelectedSubtype(null)}
                                            className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                                        >
                                            ×
                                        </button>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
