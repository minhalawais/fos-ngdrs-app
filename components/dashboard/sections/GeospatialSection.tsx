
"use client";

import dynamic from "next/dynamic";
import { Download, Share2, MapPin } from "lucide-react";
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

export default function GeospatialSection() {
    return (
        <section id="geospatial" className="space-y-6 scroll-mt-28">
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="px-3 py-1 bg-red-100 rounded-full border border-red-200">
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                Live Monitoring
                            </span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-brand-dark">Geospatial Risk Heatmap</h2>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-brand-surface rounded-xl text-sm font-medium text-brand-dark hover:border-primary-500/30 hover:shadow-md transition-all flex items-center gap-2 group">
                        <Download size={16} className="text-brand-teal group-hover:text-primary-600 transition-colors" />
                        Export PDF
                    </button>
                    <button className="px-4 py-2 bg-brand-dark hover:bg-brand-teal text-white rounded-xl text-sm font-bold shadow-lg transition-all flex items-center gap-2">
                        <Share2 size={16} />
                        Share View
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-[600px] w-full rounded-2xl overflow-hidden border border-brand-surface shadow-lg bg-white"
            >
                <DistrictMap />
            </motion.div>
        </section>
    );
}
