"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, ShieldCheck, Activity, Scale, Award } from "lucide-react";
import { generateProcessIndicatorsData } from "@/lib/process-indicators-data";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const indicatorsData = generateProcessIndicatorsData();

// Map icons to categories or items if needed, for now using generic robust icons
const getIcon = (title: string) => {
    if (title.includes("Education") || title.includes("Literacy")) return <Award size={20} className="text-brand-dark" />;
    if (title.includes("Services") || title.includes("Support")) return <Activity size={20} className="text-brand-dark" />;
    if (title.includes("Justice") || title.includes("Attrition")) return <Scale size={20} className="text-brand-dark" />;
    return <ShieldCheck size={20} className="text-brand-dark" />;
};

const PALETTE = {
    lightest: "#fbfcfc",
    light: "#e0e5e9",
    muted: "#b2c9c5",
    accent: "#1bd488",
    tealMedium: "#45828b",
    tealDark: "#055b65"
};

const CATEGORY_THEMES = [
    PALETTE.tealDark,   // Prevention
    PALETTE.tealMedium, // Protection
    PALETTE.accent      // Justice
];

const NewIndicatorCard = ({ item, themeColor }: { item: any, themeColor: string }) => {
    return (
        <div className="group relative w-full h-[160px] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border"
            style={{ backgroundColor: PALETTE.lightest, borderColor: PALETTE.light }}>

            {/* Top Colored Ribbon - Slim Professional Look */}
            <div className="h-1.5 w-full relative" style={{ background: `linear-gradient(90deg, ${themeColor} 0%, ${themeColor}dd 100%)` }} />

            {/* Content Body */}
            <div className="flex-1 px-4 py-3 flex flex-col justify-between pt-4">
                <div>
                    <h4 className="text-base font-bold text-brand-dark leading-tight mb-1">{item.title}</h4>
                    <p className="text-xs font-medium uppercase tracking-wide opacity-80" style={{ color: PALETTE.tealMedium }}>{item.indicator}</p>
                </div>

                <div className="space-y-2">
                    <div className="flex items-end justify-between border-b pb-2" style={{ borderColor: PALETTE.light }}>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-semibold uppercase" style={{ color: PALETTE.muted }}>Current</span>
                            <span className="text-2xl font-black text-brand-dark">{item.value}</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <span className="text-[10px] font-semibold uppercase" style={{ color: PALETTE.muted }}>Target</span>
                            <span className="text-sm font-bold" style={{ color: themeColor }}>{item.target}</span>
                        </div>
                    </div>

                    {/* Footer / Tag */}
                    <div className="flex items-center justify-between text-[10px] font-semibold" style={{ color: PALETTE.tealMedium }}>
                        {item.wef ? (
                            <span className="px-2 py-1 rounded-md" style={{ backgroundColor: PALETTE.light }}>{item.wef}</span>
                        ) : (
                            <span className="px-2 py-1 rounded-md flex items-center gap-1" style={{ backgroundColor: PALETTE.light }}>
                                <TrendingUp size={10} />
                                {item.sub || "On Track"}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function ProcessIndicatorsSection() {
    return (
        <section className="space-y-4 py-2">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-gradient-to-br from-brand-dark to-brand-teal rounded-xl shadow-lg shadow-brand-teal/20">
                        <TrendingUp className="text-white h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-brand-dark">Process Indicators</h2>
                        <p className="text-sm font-medium" style={{ color: PALETTE.tealMedium }}>State Action, Implementation & Due Diligence Monitoring</p>
                    </div>
                </div>
            </div>

            {/* Overhauled Layout matching reference image */}
            <div className="flex flex-col gap-4 px-2 pt-2">
                {indicatorsData.map((category, idx) => {
                    const sectionColor = CATEGORY_THEMES[idx % CATEGORY_THEMES.length];

                    return (
                        <div key={idx} className="group relative w-full rounded-[32px] border border-brand-surface/80 bg-white shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[220px]">
                            {/* Vertical Category Strip - Left Side */}
                            <div className="md:w-10 w-full md:h-auto h-8 flex items-center justify-center relative overflow-hidden shrink-0"
                                style={{ backgroundColor: sectionColor }}>
                                <h3 className="text-[10px] font-bold text-white whitespace-nowrap uppercase tracking-[0.2em] w-max"
                                    style={{ transform: "rotate(-180deg)", writingMode: "vertical-rl" }}>
                                    {category.category.split(". ")[1]}
                                </h3>
                            </div>

                            {/* Cards Container with Grid Background */}
                            <div className="flex-1 p-4 relative overflow-hidden bg-white">
                                {/* Grid Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{
                                        backgroundImage: `linear-gradient(${sectionColor} 1px, transparent 1px), linear-gradient(90deg, ${sectionColor} 1px, transparent 1px)`,
                                        backgroundSize: '30px 30px'
                                    }}
                                />

                                {/* Header for the specific section if needed, or just the grid */}
                                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {category.items.map((item, itemIdx) => (
                                        <div key={itemIdx} className="w-full">
                                            <NewIndicatorCard item={item} themeColor={sectionColor} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <style jsx>{`
                .vertical-text {
                   writing-mode: vertical-rl;
                   text-orientation: mixed; 
                }
            `}</style>
        </section>
    );
}
