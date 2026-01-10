
"use client";

import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { generateDistrictData, DistrictData } from "@/lib/mock-data";

const baseData = generateDistrictData();

// Simple hash function to create consistent but different values based on filter
function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export default function DistrictMap({ filter }: { filter?: string }) {
    const position: [number, number] = [30.3753, 69.3451]; // Centered on Pakistan
    // Approx bounds for Pakistan to prevent panning away
    const bounds: [[number, number], [number, number]] = [
        [23.6, 60.8], // Southwest
        [37.1, 77.9]  // Northeast
    ];

    // Generate filtered data based on filter value
    const data = useMemo(() => {
        if (!filter || filter === 'all') return baseData;

        return baseData.map((district, idx) => {
            // Use filter string to create variation in data, but preserve risk distribution
            const seed = hashCode(filter + district.id);
            const multiplier = 0.7 + (seed % 60) / 100; // Range: 0.7 - 1.3 (preserves more variety)
            const cases = Math.round(district.cases * multiplier);
            const riskIndex = Math.min(100, Math.max(10, Math.round(district.riskIndex * multiplier)));

            return {
                ...district,
                cases,
                riskIndex,
                redZone: riskIndex > 70
            };
        });
    }, [filter]);

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden border border-brand-surface shadow-md relative z-0">
            <MapContainer
                center={position}
                zoom={6}
                minZoom={5}
                maxBounds={bounds}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {data.map((district) => (
                    <CircleMarker
                        key={district.id}
                        center={[district.lat, district.lng]}
                        radius={Math.sqrt(district.cases) / 2} // Scale radius by cases
                        fillColor={
                            district.riskIndex > 50 ? "#ef4444" :  // Critical - Red
                                district.riskIndex > 30 ? "#f59e0b" :  // Warning - Amber
                                    "#10b981"                               // Normal - Emerald
                        }
                        color={district.redZone ? "#b91c1c" : "#055b65"}
                        weight={1}
                        opacity={0.8}
                        fillOpacity={0.6}
                    >
                        <Popup>
                            <div className="p-2 min-w-[150px]">
                                <h3 className="font-bold text-lg text-brand-dark">{district.name}</h3>
                                <span className="text-xs font-semibold text-brand-teal uppercase">{district.province}</span>
                                <div className="mt-2 space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span>Cases:</span>
                                        <span className="font-bold">{district.cases}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Risk Index:</span>
                                        <span className={district.redZone ? "text-red-500 font-bold" : "text-brand-dark"}>
                                            {district.riskIndex}/100
                                        </span>
                                    </div>
                                    {district.redZone && (
                                        <div className="mt-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-center border border-red-200">
                                            RED ZONE ALERT
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Popup>
                        <LeafletTooltip direction="top" offset={[0, -10]} opacity={1}>
                            {district.name}: {district.cases} cases
                        </LeafletTooltip>
                    </CircleMarker>
                ))}
            </MapContainer>

            {/* Legend Override */}
            <div className="absolute bottom-32 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-brand-surface z-[1000] text-sm">
                <h4 className="font-bold mb-3 text-brand-dark text-xs uppercase tracking-wider">Risk Levels</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-red-500 shadow-sm"></div><span className="text-xs">Critical (&gt;50/100k)</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></div><span className="text-xs">Warning</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm"></div><span className="text-xs">Normal</span></div>
                </div>
            </div>
        </div>
    );
}
