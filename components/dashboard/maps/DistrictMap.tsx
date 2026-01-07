
"use client";

import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip as LeafletTooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { generateDistrictData, DistrictData } from "@/lib/mock-data";

const data = generateDistrictData();

export default function DistrictMap({ filter }: { filter?: string }) {
    const position: [number, number] = [30.3753, 69.3451]; // Centered on Pakistan

    return (
        <div className="h-[600px] w-full rounded-xl overflow-hidden border border-brand-surface shadow-md relative z-0">
            <MapContainer center={position} zoom={5} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />
                {data.map((district) => (
                    <CircleMarker
                        key={district.id}
                        center={[district.lat, district.lng]}
                        radius={Math.sqrt(district.cases) / 2} // Scale radius by cases
                        fillColor={district.redZone ? "#ef4444" : district.riskIndex > 50 ? "#f59e0b" : "#1bd488"}
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
            <div className="absolute bottom-6 right-6 bg-white p-4 rounded-lg shadow-lg border border-brand-surface z-[1000] text-sm">
                <h4 className="font-bold mb-2">Risk Levels</h4>
                <div className="space-y-2">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> Critical (&gt;50/100k)</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Warning</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary-500"></div> Normal</div>
                </div>
            </div>
        </div>
    );
}
