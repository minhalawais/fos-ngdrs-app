
"use client";

import dynamic from "next/dynamic";
import { Filter, MapPin, AlertTriangle, Download, Share2 } from "lucide-react";
import { motion } from "framer-motion";

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

export default function MapPage() {
    return (
        <div className="flex gap-6 h-[calc(100vh-8rem)]">
            {/* Filters Sidebar */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-72 bg-white rounded-2xl border border-brand-surface/80 shadow-sm hidden lg:flex lg:flex-col overflow-hidden"
            >
                {/* Gradient Top Strip */}
                <div className="h-1 bg-gradient-to-r from-primary-500 to-brand-teal" />

                <div className="p-5 border-b border-brand-surface">
                    <div className="flex items-center gap-3 text-brand-dark font-bold">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                            <Filter size={18} />
                        </div>
                        <span className="text-lg">Filters</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-teal uppercase tracking-wider">Violence Category</label>
                        {["Physical", "Sexual", "Psychological", "Economic", "TFGBV (Digital)"].map(type => (
                            <label key={type} className="flex items-center gap-3 text-sm text-brand-dark cursor-pointer hover:text-primary-600 transition-colors group">
                                <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500 border-brand-surface" defaultChecked />
                                <span className="group-hover:translate-x-1 transition-transform">{type}</span>
                            </label>
                        ))}
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-teal uppercase tracking-wider">Time Period</label>
                        <select className="w-full text-sm border-brand-surface rounded-xl p-3 bg-brand-canvas focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 transition-all">
                            <option>Last 30 Days</option>
                            <option>Last Quarter</option>
                            <option>YTD (2026)</option>
                            <option>Custom Range</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-bold text-brand-teal uppercase tracking-wider">Risk Level</label>
                        <label className="flex items-center gap-3 text-sm text-brand-dark cursor-pointer group">
                            <input type="checkbox" className="rounded text-red-500 focus:ring-red-500 border-brand-surface" defaultChecked />
                            <span className="flex items-center gap-2">
                                <AlertTriangle size={14} className="text-red-500" />
                                Red Zones Only
                            </span>
                        </label>
                    </div>
                </div>

                <div className="p-4 border-t border-brand-surface bg-brand-surface/20">
                    <button className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors text-sm">
                        Apply Filters
                    </button>
                </div>
            </motion.div>

            {/* Map Area */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col"
            >
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="px-3 py-1 bg-red-100 rounded-full border border-red-200">
                                <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    Live Monitoring
                                </span>
                            </div>
                        </div>
                        <h1 className="text-2xl font-heading font-bold text-brand-dark">Geospatial Risk Heatmap</h1>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2.5 bg-white border border-brand-surface rounded-xl text-sm font-medium text-brand-dark hover:border-primary-500/30 hover:shadow-md transition-all flex items-center gap-2 group">
                            <Download size={16} className="text-brand-teal group-hover:text-primary-600 transition-colors" />
                            Export PDF
                        </button>
                        <button className="px-4 py-2.5 bg-brand-dark hover:bg-brand-teal text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2">
                            <Share2 size={16} />
                            Share View
                        </button>
                    </div>
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden border border-brand-surface shadow-lg">
                    <DistrictMap />
                </div>
            </motion.div>
        </div>
    );
}
