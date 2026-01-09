
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
    subStats?: { label: string; value: string; color?: string }[];
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
    {
        id: "kpi-1",
        label: "Total Cases (YTD)",
        value: "12,450",
        trend: 12.5,
        trendLabel: "vs last month",
        status: "up",
        subStats: [
            { label: "GBV", value: "8,200", color: "text-brand-teal" },
            { label: "TFGBV", value: "4,250", color: "text-indigo-600" }
        ]
    },
    { id: "kpi-2", label: "Conviction Rate", value: "3.2%", trend: -0.5, trendLabel: "vs last month", status: "down", alert: true },
    { id: "kpi-3", label: "Red Zone Districts", value: "14", trend: 2, trendLabel: "New this week", status: "up", alert: true },
    { id: "kpi-4", label: "Prevention & Awareness Actions", value: "185", trend: 0, trendLabel: "Stable", status: "neutral" },
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
    { name: "Meta (FB/Insta)", complaints: 1450, takedownPct: 88, responseTime: 12, score: 92, color: "#0866FF" },
    { name: "TikTok", complaints: 2100, takedownPct: 75, responseTime: 24, score: 78, color: "#000000" },
    { name: "X (Twitter)", complaints: 650, takedownPct: 45, responseTime: 48, score: 55, color: "#14171A" },
    { name: "YouTube", complaints: 320, takedownPct: 95, responseTime: 8, score: 96, color: "#FF0000" },
    { name: "WhatsApp", complaints: 3100, takedownPct: 15, responseTime: 72, score: 30, color: "#25D366" },
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

// Detailed Breakdown Data for Overview Section
export const generateDetailedBreakdown = () => {
    return {
        gbv: [
            { code: "GB-PH", label: "Physical Violence", value: 3450, color: "#ef4444" },
            { code: "GB-SX", label: "Sexual Violence", value: 1240, color: "#f97316" },
            { code: "GB-PY", label: "Psychological Abuse", value: 2100, color: "#f59e0b" },
            { code: "GB-EC", label: "Economic Abuse", value: 890, color: "#10b981" },
            { code: "GB-FM", label: "Forced Marriage", value: 430, color: "#06b6d4" },
            { code: "GB-TR", label: "Trafficking", value: 120, color: "#6366f1" },
            { code: "GB-FE", label: "Femicide", value: 45, color: "#9f1239" },
        ],
        tfgbv: [
            { code: "TF-A1", label: "Cyberstalking", value: 1850, risk: "High", color: "#055b65" },
            { code: "TF-A7", label: "Sextortion", value: 920, risk: "Critical", color: "#ef4444" },
            { code: "TF-A3", label: "Image-based Abuse", value: 850, risk: "Critical", color: "#f97316" },
            { code: "TF-A6", label: "Online Mob Harassment", value: 640, risk: "Medium", color: "#f59e0b" },
            { code: "TF-A4", label: "Deepfake Sexual Content", value: 420, risk: "Critical", color: "#1bd488" },
            { code: "TF-A2", label: "Doxxing", value: 310, risk: "High", color: "#45828b" },
            { code: "TF-A5", label: "Voice Cloning", value: 150, risk: "Critical", color: "#6366f1" },
        ]
    };
};

// Reporting Channels Data
// Reporting Channels Data
export const generateReportingChannelData = () => {
    return {
        gbv: [
            { name: "Police Station", value: 2450, color: "#055b65" },
            { name: "Women Protection Center (WPC)", value: 1800, color: "#1bd488" },
            { name: "Ministry of Human Rights Helpline", value: 1200, color: "#f59e0b" },
            { name: "Punjab Police Pakistan App", value: 350, color: "#45828b" },
            { name: "Judicial Magistrate / Courts", value: 890, color: "#9f1239" },
        ],
        tfgbv: [
            { name: "Federal Investigation Agency (FIA)", value: 1890, color: "#055b65" },
            { name: "NCCIA (Cyber Crime Agency)", value: 4500, color: "#ef4444" },
            { name: "Online Complaint Form", value: 2100, color: "#f97316" },
            { name: "Helpline 1991", value: 950, color: "#f59e0b" },
            { name: "Direct Email / Walk-in", value: 420, color: "#45828b" },
        ]
    };
};

export const generateRiskData = () => {
    return [
        { level: "Extreme (Immediate Threat)", count: 142, color: "#ef4444", desc: "Weapon involvement, stalking, death threats" },
        { level: "High (Escalating)", count: 356, color: "#f97316", desc: "Repeat incidents, violation of restraining orders" },
        { level: "Medium (Monitoring)", count: 890, color: "#eab308", desc: " Verbal abuse, online harassment" },
    ];
};
// Closure/Attrition Reasons
export const generateClosureReasons = () => [
    { reason: "Compromise/Sulh", count: 450 },
    { reason: "Lack of Evidence", count: 320 },
    { reason: "Witness Hostility", count: 210 },
    { reason: "Procedural Delay", count: 180 },
    { reason: "Survivor Withdrawal", count: 150 },
];

export const generateDistrictHotspots = () => [
    { category: "Domestic Violence", districts: ["Mardan", "Dera Ghazi Khan", "Jacobabad"] },
    { category: "Cyber Harassment", districts: ["Swat", "Peshawar", "Islamabad"] },
    { category: "Workplace", districts: ["Faisalabad", "Karachi Central"] }
];

export const generateShelterPrograms = () => [
    { name: "Youth Digital Resilience Bootcamps", count: 42 },
    { name: "Safe Schools, Safe Futures Programme", count: 78 },
    { name: "Workplace GBV Awareness Sessions", count: 156 },
    { name: "Grievance Redressal Mechanism Implementation", count: 34 },
];

// Demographic Breakdowns for Stacked Bar Charts
export const generatePerpetratorTypeData = () => [
    { name: "Intimate Partner", value: 3200, color: "#1bd488" },
    { name: "Family", value: 2800, color: "#45828b" },
    { name: "Acquaintance", value: 1500, color: "#055b65" },
    { name: "Stranger", value: 1200, color: "#f97316" },
    { name: "Employer", value: 850, color: "#8b5cf6" },
    { name: "Official", value: 620, color: "#ec4899" },
    { name: "Digital Anonymous", value: 1830, color: "#6366f1" },
];

export const generateLocationTypeData = () => [
    { name: "Home", value: 4200, color: "#1bd488" },
    { name: "Street", value: 1800, color: "#45828b" },
    { name: "School", value: 650, color: "#055b65" },
    { name: "University", value: 480, color: "#f97316" },
    { name: "Workplace", value: 1100, color: "#8b5cf6" },
    { name: "Public Transport", value: 720, color: "#ec4899" },
    { name: "Police Station", value: 180, color: "#ef4444" },
    { name: "Court", value: 120, color: "#eab308" },
    { name: "Online Platform", value: 1750, color: "#6366f1" },
];

export const generateSurvivorAgeData = () => [
    { name: "Minor (0-17)", value: 2100, color: "#ef4444" },
    { name: "Youth (18-24)", value: 4500, color: "#f97316" },
    { name: "Adult (25+)", value: 4800, color: "#1bd488" },
    { name: "Senior (60+)", value: 600, color: "#45828b" },
];
