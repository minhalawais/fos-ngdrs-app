
import {
    Users, TrendingUp, AlertTriangle, CheckCircle, Smartphone,
    ShieldAlert, Gavel, HeartHandshake, Map, LayoutDashboard
} from "lucide-react";

// Types
export interface KPI {
    id: string;
    label: string;
    value: string;
    trend: number;
    trendLabel: string;
    status: "up" | "down" | "neutral";
    alert?: boolean;
}

export interface DistrictData {
    id: string;
    name: string;
    province: string;
    cases: number;
    population: number;
    riskIndex: number; // 0-100
    redZone: boolean;
    lat: number;
    lng: number;
}

// Generators
export const generateKPIs = (): KPI[] => [
    { id: "kpi-1", label: "Total Cases (YTD)", value: "12,450", trend: 12.5, trendLabel: "vs last month", status: "up" },
    { id: "kpi-2", label: "Conviction Rate", value: "3.2%", trend: -0.5, trendLabel: "vs last month", status: "down", alert: true },
    { id: "kpi-3", label: "Red Zone Districts", value: "14", trend: 2, trendLabel: "New this week", status: "up", alert: true },
    { id: "kpi-4", label: "Active Shelters", value: "185", trend: 0, trendLabel: "Stable", status: "neutral" },
];

export const generateCrimeTrends = () => [
    { month: "Jan", Physical: 450, Sexual: 120, Digital: 80, Economic: 60 },
    { month: "Feb", Physical: 480, Sexual: 130, Digital: 95, Economic: 65 },
    { month: "Mar", Physical: 520, Sexual: 140, Digital: 150, Economic: 70 }, // Spike in digital
    { month: "Apr", Physical: 490, Sexual: 125, Digital: 110, Economic: 68 },
    { month: "May", Physical: 510, Sexual: 135, Digital: 130, Economic: 72 },
    { month: "Jun", Physical: 550, Sexual: 150, Digital: 160, Economic: 75 },
];

export const generatePlatformStats = () => [
    { name: "Meta (FB/Insta)", complaints: 1450, takedownPct: 88, responseTime: 12, score: 92 },
    { name: "TikTok", complaints: 2100, takedownPct: 75, responseTime: 24, score: 78 },
    { name: "X (Twitter)", complaints: 650, takedownPct: 45, responseTime: 48, score: 55 },
    { name: "YouTube", complaints: 320, takedownPct: 95, responseTime: 8, score: 96 },
    { name: "WhatsApp", complaints: 3100, takedownPct: 15, responseTime: 72, score: 30 },
];

export const generateDistrictData = (): DistrictData[] => [
    { id: "d1", name: "Lahore", province: "Punjab", cases: 2500, population: 11000000, riskIndex: 85, redZone: true, lat: 31.5204, lng: 74.3587 },
    { id: "d2", name: "Karachi Central", province: "Sindh", cases: 3200, population: 16000000, riskIndex: 92, redZone: true, lat: 24.8607, lng: 67.0011 },
    { id: "d3", name: "Peshawar", province: "KPK", cases: 1200, population: 4500000, riskIndex: 65, redZone: false, lat: 34.0151, lng: 71.5249 },
    { id: "d4", name: "Quetta", province: "Balochistan", cases: 800, population: 2500000, riskIndex: 55, redZone: false, lat: 30.1798, lng: 66.9750 },
    { id: "d5", name: "Islamabad", province: "Federal", cases: 450, population: 2000000, riskIndex: 40, redZone: false, lat: 33.6844, lng: 73.0479 },
    { id: "d6", name: "Rawalpindi", province: "Punjab", cases: 1100, population: 5000000, riskIndex: 72, redZone: true, lat: 33.5651, lng: 73.0169 },
    { id: "d7", name: "Faisalabad", province: "Punjab", cases: 1400, population: 7000000, riskIndex: 68, redZone: false, lat: 31.4504, lng: 73.1350 },
    { id: "d8", name: "Multan", province: "Punjab", cases: 950, population: 4000000, riskIndex: 62, redZone: false, lat: 30.1575, lng: 71.5249 },
];

export const generateFunnelData = () => [
    { name: "Reported", value: 1000, fill: "#b2c9c5" },
    { name: "FIR Registered", value: 750, fill: "#45828b" },
    { name: "Investigation", value: 500, fill: "#1bd488" },
    { name: "Charge Sheet", value: 300, fill: "#12b872" },
    { name: "Trial", value: 150, fill: "#055b65" },
    { name: "Convicted", value: 45, fill: "#095e3d" },
];

export const generateServiceGaps = () => [
    { subject: 'Medical', A: 90, B: 100, fullMark: 100 },
    { subject: 'Legal', A: 45, B: 100, fullMark: 100 },
    { subject: 'Psychosocial', A: 60, B: 100, fullMark: 100 },
    { subject: 'Shelter', A: 80, B: 100, fullMark: 100 },
    { subject: 'Digital', A: 30, B: 100, fullMark: 100 },
    { subject: 'Economic', A: 20, B: 100, fullMark: 100 },
];

export const generateComplianceData = () => {
    return [
        {
            indicator: "SDG 5.2.1 (Violence Prevalence)",
            target: 15.0,
            current: 28.4,
            status: "Critical",
            formula: "(Total Unique Survivors / Female Population 15-49) * 100",
            source: "Aggregated Case IDs from Police & Health Depts vs Census 2023 Baseline"
        },
        {
            indicator: "CEDAW Legislative Framework",
            target: 100,
            current: 85,
            status: "Good",
            formula: "(Enacted Laws / Required CEDAW Legal Articles) * 100",
            source: "Ministry of Law & Justice: Act 2021 Implementation Status"
        },
        {
            indicator: "EU GSP+ Human Rights Index",
            target: 90,
            current: 72,
            status: "Warning",
            formula: "Weighted Score of 7 Core Human Rights Conventions",
            source: "European Commission Monitoring Report 2024 & NCHR Audits"
        },
        {
            indicator: "Global Gender Gap (Safety)",
            target: 0.8,
            current: 0.64,
            status: "Warning",
            formula: "Safety Sub-Index Score (0-1 Scale)",
            source: "World Economic Forum Methodology applied to NGDRS Data"
        },
    ];
};

export const generateAIThreats = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map(m => ({
        name: m,
        "Standard Cyber-Harassment": Math.floor(Math.random() * 200) + 300,
        "AI-Generated (Deepfakes)": Math.floor(Math.random() * 50) + 10,
        "Voice Cloning": Math.floor(Math.random() * 20) + 5
    }));
};

export const generateRiskData = () => {
    return [
        { level: "Extreme (Immediate Threat)", count: 142, color: "#ef4444", desc: "Weapon involvement, stalking, death threats" },
        { level: "High (Escalating)", count: 356, color: "#f97316", desc: "Repeat incidents, violation of restraining orders" },
        { level: "Medium (Monitoring)", count: 890, color: "#eab308", desc: " Verbal abuse, online harassment" },
    ];
};
