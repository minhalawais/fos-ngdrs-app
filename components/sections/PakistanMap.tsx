
"use client";

import { MapContainer, TileLayer, Marker, Popup, CircleMarker, Tooltip } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Pakistan center coordinates
const PAKISTAN_CENTER: LatLngExpression = [30.3753, 69.3451];
const PAKISTAN_BOUNDS: [[number, number], [number, number]] = [
    [23.5, 60.5],  // Southwest
    [37.5, 78.0]   // Northeast
];

// Major cities with real coordinates
const cities = [
    { name: "Islamabad", coords: [33.6844, 73.0479] as LatLngExpression, cases: 450, status: "active" },
    { name: "Lahore", coords: [31.5204, 74.3587] as LatLngExpression, cases: 1200, status: "critical" },
    { name: "Karachi", coords: [24.8607, 67.0011] as LatLngExpression, cases: 2800, status: "critical" },
    { name: "Peshawar", coords: [34.0151, 71.5249] as LatLngExpression, cases: 380, status: "active" },
    { name: "Quetta", coords: [30.1798, 66.9750] as LatLngExpression, cases: 290, status: "monitoring" },
    { name: "Multan", coords: [30.1575, 71.5249] as LatLngExpression, cases: 520, status: "active" },
    { name: "Faisalabad", coords: [31.4504, 73.1350] as LatLngExpression, cases: 680, status: "active" },
    { name: "Rawalpindi", coords: [33.5651, 73.0169] as LatLngExpression, cases: 410, status: "active" },
];

export default function PakistanMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <MapContainer
            center={PAKISTAN_CENTER}
            zoom={5}
            minZoom={5}
            maxZoom={8}
            maxBounds={PAKISTAN_BOUNDS}
            maxBoundsViscosity={1.0}
            style={{ height: "100%", width: "100%", background: "#0a2f35" }}
            zoomControl={false}
            attributionControl={false}
        >
            {/* Dark themed map tiles */}
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* City Markers with Pulsing Effect */}
            {cities.map((city) => (
                <CircleMarker
                    key={city.name}
                    center={city.coords}
                    radius={city.status === "critical" ? 15 : city.status === "active" ? 10 : 7}
                    pathOptions={{
                        color: city.status === "critical" ? "#ef4444" : city.status === "active" ? "#1bd488" : "#eab308",
                        fillColor: city.status === "critical" ? "#ef4444" : city.status === "active" ? "#1bd488" : "#eab308",
                        fillOpacity: 0.6,
                        weight: 2,
                    }}
                >
                    <Tooltip
                        permanent
                        direction="top"
                        offset={[0, -10]}
                        className="!bg-white/90 !backdrop-blur-sm !border-none !shadow-lg !rounded-lg !px-2 !py-1 !text-xs !font-bold !text-brand-dark"
                    >
                        {city.name}
                    </Tooltip>
                    <Popup className="custom-popup">
                        <div className="text-center">
                            <h3 className="font-bold text-brand-dark">{city.name}</h3>
                            <p className="text-sm text-brand-teal">{city.cases.toLocaleString()} cases</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${city.status === "critical" ? "bg-red-100 text-red-700" :
                                    city.status === "active" ? "bg-primary-100 text-primary-700" :
                                        "bg-amber-100 text-amber-700"
                                }`}>
                                {city.status.toUpperCase()}
                            </span>
                        </div>
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}
