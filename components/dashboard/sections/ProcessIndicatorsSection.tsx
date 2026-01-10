"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { generateProcessIndicatorsData } from "@/lib/process-indicators-data";
import { clsx } from "clsx";
import { motion } from "framer-motion";

const indicatorsData = generateProcessIndicatorsData();

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
        <div className="group relative w-full min-h-[190px] rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border"
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
                            <span className="text-[10px] font-semibold uppercase" style={{ color: PALETTE.muted }}>{item.valueLabel || 'Current'}</span>
                            <span className="text-2xl font-black text-brand-dark">{item.value}</span>
                        </div>
                        <div className="flex flex-col items-end text-right">
                            <span className="text-[10px] font-semibold uppercase" style={{ color: PALETTE.muted }}>{item.targetLabel || 'Target'}</span>
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

const CategorySlider = ({ category, sectionColor }: { category: any, sectionColor: string }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = 300; // Approx card width + gap
            const targetScroll = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });

            // Re-check after animation
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <div className="group relative w-full rounded-[32px] border border-brand-surface/80 bg-white shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[250px]">
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

                {/* Navigation Buttons */}
                <div className="absolute right-2 top-2 z-20 flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={clsx(
                            "p-1.5 rounded-full backdrop-blur-sm border transition-all",
                            canScrollLeft
                                ? "bg-white/80 border-gray-200 text-brand-dark hover:bg-brand-teal hover:text-white"
                                : "bg-gray-50 border-transparent text-gray-300 cursor-not-allowed"
                        )}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={clsx(
                            "p-1.5 rounded-full backdrop-blur-sm border transition-all",
                            canScrollRight
                                ? "bg-white/80 border-gray-200 text-brand-dark hover:bg-brand-teal hover:text-white"
                                : "bg-gray-50 border-transparent text-gray-300 cursor-not-allowed"
                        )}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    onScroll={checkScroll}
                    className="relative z-10 flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth hide-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {category.items.map((item: any, itemIdx: number) => (
                        <div key={itemIdx} className="min-w-[280px] w-[280px] snap-start flex-shrink-0">
                            <NewIndicatorCard item={item} themeColor={sectionColor} />
                        </div>
                    ))}
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
                {indicatorsData.map((category, idx) => (
                    <CategorySlider
                        key={idx}
                        category={category}
                        sectionColor={CATEGORY_THEMES[idx % CATEGORY_THEMES.length]}
                    />
                ))}
            </div>
            <style jsx>{`
                .vertical-text {
                   writing-mode: vertical-rl;
                   text-orientation: mixed; 
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
