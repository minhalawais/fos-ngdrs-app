"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Users, MapPin, Calendar, Activity } from "lucide-react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList
} from 'recharts';
import {
    generatePerpetratorTypeData,
    generateLocationTypeData,
    generateSurvivorAgeData,
} from "@/lib/mock-data";

// Data
const perpetratorData = generatePerpetratorTypeData().filter(d => d.name !== 'Official');
const locationData = generateLocationTypeData().filter(d => d.name !== 'Police Station' && d.name !== 'Court');
const ageData = generateSurvivorAgeData();

// Horizontal Stacked Bar Chart Card with Interactivity
function StackedBarCard({
    data,
    title,
    icon: Icon
}: {
    data: { name: string; value: number; color: string }[];
    title: string;
    icon: any
}) {
    const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());
    const [hoveredBar, setHoveredBar] = useState<string | null>(null);

    // Filter visible data
    const visibleData = data.filter(item => !hiddenItems.has(item.name));
    const total = visibleData.reduce((sum, item) => sum + item.value, 0);

    // Transform data for stacked bar - single row with all values
    const stackedData = [{
        name: 'Total',
        ...visibleData.reduce((acc, item) => ({ ...acc, [item.name]: item.value }), {})
    }];

    // Toggle legend item
    const handleLegendClick = (name: string) => {
        const newHidden = new Set(hiddenItems);
        if (newHidden.has(name)) {
            newHidden.delete(name);
        } else {
            // Don't allow hiding all items
            if (newHidden.size < data.length - 1) {
                newHidden.add(name);
            }
        }
        setHiddenItems(newHidden);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={clsx(
                "bg-white rounded-2xl border border-brand-surface/80 shadow-sm",
                "hover:shadow-lg hover:border-primary-500/10 transition-all duration-300",
                "overflow-hidden group flex flex-col"
            )}
        >
            {/* Top Gradient Strip */}
            <div className="h-0.5 bg-gradient-to-r from-primary-500/50 via-brand-teal/30 to-transparent" />

            <div className="p-4 flex-1 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-surface/50 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors">
                            <Icon size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-brand-dark">{title}</h3>
                            <p className="text-[10px] text-brand-teal/70">{total.toLocaleString()} Total Cases</p>
                        </div>
                    </div>

                </div>

                {/* Stacked Bar Chart */}
                <div className="h-14 mb-3">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={stackedData}
                            layout="vertical"
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                            barSize={hoveredBar ? 48 : 40}
                        >
                            <XAxis type="number" hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip
                                cursor={{ fill: 'transparent' }}
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        const item = payload[0];
                                        const pct = ((Number(item.value) / total) * 100).toFixed(1);
                                        return (
                                            <div className="bg-white/95 backdrop-blur-sm border border-brand-surface rounded-xl px-3 py-2 shadow-xl">
                                                <p className="text-xs font-bold text-brand-dark">{item.dataKey}</p>
                                                <p className="text-[10px] text-brand-teal">
                                                    {Number(item.value).toLocaleString()} ({pct}%)
                                                </p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            {visibleData.map((item, idx) => {
                                const pct = ((item.value / total) * 100);
                                const isHovered = hoveredBar === item.name;
                                return (
                                    <Bar
                                        key={idx}
                                        dataKey={item.name}
                                        stackId="a"
                                        fill={item.color}
                                        radius={idx === 0 ? [20, 0, 0, 20] : idx === visibleData.length - 1 ? [0, 20, 20, 0] : [0, 0, 0, 0]}
                                        animationDuration={500}
                                        animationBegin={idx * 30}
                                        style={{
                                            filter: isHovered ? 'brightness(1.15)' : 'brightness(1)',
                                            transition: 'filter 0.2s ease'
                                        }}
                                        onMouseEnter={() => setHoveredBar(item.name)}
                                        onMouseLeave={() => setHoveredBar(null)}
                                    >
                                        {pct > 8 && (
                                            <LabelList
                                                dataKey={item.name}
                                                position="center"
                                                fill="white"
                                                fontSize={9}
                                                fontWeight="bold"
                                                formatter={() => `${pct.toFixed(0)}%`}
                                            />
                                        )}
                                    </Bar>
                                );
                            })}
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend - Center Aligned & Clickable */}
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                    {data.map((item, idx) => {
                        const isHidden = hiddenItems.has(item.name);
                        return (
                            <button
                                key={idx}
                                onClick={() => handleLegendClick(item.name)}
                                className={clsx(
                                    "flex items-center gap-1.5 cursor-pointer transition-all duration-200",
                                    isHidden ? "opacity-40 line-through" : "opacity-100 hover:scale-105"
                                )}
                            >
                                <div
                                    className={clsx(
                                        "w-2.5 h-2.5 rounded-full transition-transform",
                                        !isHidden && "hover:scale-125"
                                    )}
                                    style={{ backgroundColor: isHidden ? '#ccc' : item.color }}
                                />
                                <span className={clsx(
                                    "text-[10px] font-medium transition-colors",
                                    isHidden ? "text-gray-400" : "text-brand-dark/70 hover:text-brand-dark"
                                )}>
                                    {item.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}

export default function DemographicsSection() {
    return (
        <section className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <StackedBarCard
                    data={perpetratorData}
                    title="Cases by Perpetrator Type"
                    icon={Users}
                />
                <StackedBarCard
                    data={locationData}
                    title="Cases by Location Type"
                    icon={MapPin}
                />
                <StackedBarCard
                    data={ageData}
                    title="Cases by Survivor Age"
                    icon={Calendar}
                />
            </div>
        </section>
    );
}
