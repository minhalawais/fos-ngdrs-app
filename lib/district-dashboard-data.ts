// District Dashboard Mock Data - Case Management & API Integration Focus

import { Scale, Globe, Smartphone, Users, Home, Stethoscope, Shield, Database } from "lucide-react";

// Types
export interface DashboardKPI {
    id: string;
    label: string;
    value: number;
    trend: number;
    trendLabel: string;
    status: 'good' | 'warning' | 'critical' | 'neutral';
    color: string;
}

export interface CaseStatusData {
    category: string;
    count: number;
    color: string;
}

export interface MonthlyTrendData {
    month: string;
    cases: number;
    updated: number;
}

export interface OfficialAPI {
    id: string;
    name: string;
    shortName: string;
    description: string;
    icon: any;
    color: string;
    recordsAvailable: number;
}

export interface APIRecord {
    id: string;
    type: string;
    date: string;
    status: string;
    details: string;
    source: string;
}

export interface RecentEntry {
    id: string;
    formType: 'case' | 'prevention' | 'awareness' | 'protection';
    title: string;
    submittedBy: string;
    timestamp: string;
    status: 'synced' | 'pending' | 'returned' | 'approved';
}

// Generate Dashboard KPIs
export const generateDashboardKPIs = (): DashboardKPI[] => [
    {
        id: 'total-cases',
        label: 'Total Cases',
        value: 1247,
        trend: 8,
        trendLabel: 'vs last month',
        status: 'neutral',
        color: '#055b65'
    },
    {
        id: 'pending-submissions',
        label: 'Pending Submissions',
        value: 28,
        trend: -12,
        trendLabel: 'clearing queue',
        status: 'warning',
        color: '#f59e0b'
    },
    {
        id: 'routed-forms',
        label: 'Routed Forms',
        value: 156,
        trend: 15,
        trendLabel: 'this month',
        status: 'good',
        color: '#8b5cf6'
    },
    {
        id: 'returned-cases',
        label: 'Returned Cases',
        value: 12,
        trend: 3,
        trendLabel: 'need attention',
        status: 'critical',
        color: '#ef4444'
    }
];

// Generate Case Status Distribution for Bar Chart
export const generateCaseStatusDistribution = (): CaseStatusData[] => [
    { category: 'Cases to Update', count: 45, color: '#f59e0b' },
    { category: 'Cases Returned', count: 12, color: '#ef4444' },
    { category: 'Pending Approvals', count: 28, color: '#8b5cf6' },
    { category: 'Successfully Updated', count: 89, color: '#1bd488' }
];

// Generate Monthly Trends Data
export const generateMonthlyTrends = (): MonthlyTrendData[] => [
    { month: 'Jul', cases: 145, updated: 128 },
    { month: 'Aug', cases: 168, updated: 152 },
    { month: 'Sep', cases: 142, updated: 135 },
    { month: 'Oct', cases: 189, updated: 171 },
    { month: 'Nov', cases: 205, updated: 188 },
    { month: 'Dec', cases: 178, updated: 165 }
];

// Official APIs for Run API Modal
export const generateOfficialAPIs = (): OfficialAPI[] => [
    {
        id: 'punjab-police',
        name: 'Punjab Police App API',
        shortName: 'Punjab Police',
        description: 'FIR records and case status from Punjab Police database',
        icon: Shield,
        color: '#1e40af',
        recordsAvailable: 2847
    },
    {
        id: 'nccia',
        name: 'NCCIA Data API',
        shortName: 'NCCIA',
        description: 'National Cyber Crime Investigation Agency records',
        icon: Smartphone,
        color: '#dc2626',
        recordsAvailable: 1456
    },
    {
        id: 'punjab-shelters',
        name: 'Punjab Shelters API',
        shortName: 'Shelters',
        description: 'Dar-ul-Aman and Women Protection Centers data',
        icon: Home,
        color: '#d97706',
        recordsAvailable: 892
    },
    {
        id: 'fia',
        name: 'FIA Cyber Crime API',
        shortName: 'FIA',
        description: 'Federal Investigation Agency cyber crime portal',
        icon: Globe,
        color: '#7c3aed',
        recordsAvailable: 678
    },
    {
        id: 'ncsw',
        name: 'NCSW Registry API',
        shortName: 'NCSW',
        description: 'National Commission on Status of Women central registry',
        icon: Users,
        color: '#059669',
        recordsAvailable: 3421
    }
];

// Generate Mock API Records (returned after "fetching" from API)
export const generateAPIRecords = (apiId: string): APIRecord[] => {
    const baseRecords: APIRecord[] = [
        { id: 'REC-001', type: 'Domestic Violence', date: '2026-01-11', status: 'Active', details: 'FIR No. 234/2026', source: apiId },
        { id: 'REC-002', type: 'Cyberstalking', date: '2026-01-10', status: 'Under Investigation', details: 'Complaint #TF-4521', source: apiId },
        { id: 'REC-003', type: 'Physical Abuse', date: '2026-01-09', status: 'Resolved', details: 'Case closed with conviction', source: apiId },
        { id: 'REC-004', type: 'Economic Abuse', date: '2026-01-08', status: 'Pending Review', details: 'Awaiting documentation', source: apiId },
        { id: 'REC-005', type: 'Harassment', date: '2026-01-07', status: 'Active', details: 'FIR No. 198/2026', source: apiId },
        { id: 'REC-006', type: 'Sextortion', date: '2026-01-06', status: 'Under Investigation', details: 'Digital evidence collected', source: apiId },
        { id: 'REC-007', type: 'Forced Marriage', date: '2026-01-05', status: 'Court Proceedings', details: 'Hearing scheduled', source: apiId },
        { id: 'REC-008', type: 'Image-based Abuse', date: '2026-01-04', status: 'Active', details: 'Platform notified', source: apiId }
    ];
    return baseRecords.map(r => ({ ...r, id: `${apiId.toUpperCase()}-${r.id}` }));
};

// Generate Recent Entries for Table
export const generateRecentEntries = (): RecentEntry[] => [
    { id: 'CASE-2026-4521', formType: 'case', title: 'Domestic Violence - Physical Abuse', submittedBy: 'Officer Fatima', timestamp: '10 min ago', status: 'synced' },
    { id: 'PREV-2026-0892', formType: 'prevention', title: 'Women Safety Workshop', submittedBy: 'Coordinator Ali', timestamp: '25 min ago', status: 'approved' },
    { id: 'CASE-2026-4520', formType: 'case', title: 'Cyberstalking - Social Media', submittedBy: 'Officer Khan', timestamp: '45 min ago', status: 'pending' },
    { id: 'PROT-2026-0234', formType: 'protection', title: 'Shelter Admission - Emergency', submittedBy: 'Dr. Ayesha', timestamp: '1 hour ago', status: 'synced' },
    { id: 'AWR-2026-0156', formType: 'awareness', title: 'Digital Safety Campaign', submittedBy: 'Coordinator Sara', timestamp: '2 hours ago', status: 'returned' },
    { id: 'CASE-2026-4519', formType: 'case', title: 'Sextortion - WhatsApp', submittedBy: 'Officer Ahmed', timestamp: '3 hours ago', status: 'pending' }
];

// Case Progress Pipeline Data
export const generateCaseProgress = () => [
    { stage: 'Reported', count: 45, color: '#b2c9c5' },
    { stage: 'FIR Filed', count: 38, color: '#45828b' },
    { stage: 'Investigation', count: 28, color: '#1bd488' },
    { stage: 'Charge Sheet', count: 18, color: '#055b65' },
    { stage: 'Trial', count: 12, color: '#8b5cf6' },
    { stage: 'Resolved', count: 8, color: '#059669' }
];

// Form Submission by Type (Donut Chart)
export interface FormTypeDistribution {
    name: string;
    value: number;
    color: string;
    [key: string]: string | number;
}

export const generateFormTypeDistribution = (): FormTypeDistribution[] => [
    { name: 'Case Registration', value: 156, color: '#659CBF' },
    { name: 'Prevention Measures', value: 48, color: '#6EA969' },
    { name: 'Awareness Campaigns', value: 32, color: '#D3A255' },
    { name: 'Protection & Safety', value: 24, color: '#BC5F75' }
];

// Case Resolution Pipeline (Funnel)
export interface PipelineStage {
    stage: string;
    count: number;
    percentage: number;
    color: string;
}

export const generateCaseResolutionPipeline = (): PipelineStage[] => {
    const stages = [
        { stage: 'Reported', count: 1247, color: '#b2c9c5' },
        { stage: 'FIR Registered', count: 986, color: '#45828b' },
        { stage: 'Under Investigation', count: 654, color: '#1bd488' },
        { stage: 'Charge Sheet Filed', count: 312, color: '#055b65' },
        { stage: 'In Trial', count: 156, color: '#8b5cf6' },
        { stage: 'Convicted', count: 42, color: '#059669' }
    ];
    const maxCount = stages[0].count;
    return stages.map(s => ({ ...s, percentage: Math.round((s.count / maxCount) * 100) }));
};

// Pending Actions Queue
export interface PendingAction {
    id: string;
    title: string;
    type: 'approval' | 'routing' | 'correction' | 'sync';
    priority: 'high' | 'medium' | 'low';
    count: number;
    deadline?: string;
    color: string;
}

export const generatePendingActions = (): PendingAction[] => [
    { id: 'PA-001', title: 'Cases Awaiting Approval', type: 'approval', priority: 'high', count: 12, deadline: 'Today', color: '#ef4444' },
    { id: 'PA-002', title: 'Forms Pending Routing', type: 'routing', priority: 'medium', count: 8, deadline: 'Tomorrow', color: '#f59e0b' },
    { id: 'PA-003', title: 'Entries Need Correction', type: 'correction', priority: 'high', count: 5, deadline: 'Today', color: '#dc2626' },
    { id: 'PA-004', title: 'API Sync Pending', type: 'sync', priority: 'low', count: 3, color: '#8b5cf6' }
];

