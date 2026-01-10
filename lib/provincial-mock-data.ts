// Provincial Portal Mock Data
// Aggregates data from districts and provides verification workflow

import { generateCaseRepository } from './district-mock-data';

// Province and District codes for Case ID generation
const DISTRICT_CODES: Record<string, string> = {
    'Lahore': 'LHR',
    'Faisalabad': 'FSD',
    'Multan': 'MLT',
    'Rawalpindi': 'RWP',
    'Gujranwala': 'GJW',
    'Sialkot': 'SKT',
    'Bahawalpur': 'BWP',
    'Sargodha': 'SGD',
    'Sheikhupura': 'SKP',
    'Jhang': 'JHG',
    'Dera Ghazi Khan': 'DGK',
    'Rahim Yar Khan': 'RYK',
    'Kasur': 'KSR',
    'Okara': 'OKR',
    'Sahiwal': 'SHW',
    'Karachi': 'KHI',
    'Hyderabad': 'HYD',
    'Sukkur': 'SKR',
    'Peshawar': 'PSH',
    'Quetta': 'QTA'
};

// Helper function to generate proper Case ID (Punjab = PB)
const generateCaseId = (caseType: string, district: string, sequence: number): string => {
    const typePrefix = caseType === 'TFGBV' ? 'TFG' : 'GBV';
    const distCode = DISTRICT_CODES[district] || district.substring(0, 3).toUpperCase();
    const yearMonth = '2401'; // January 2024
    const seqNumber = sequence.toString().padStart(4, '0');
    return `${typePrefix}-PB-${distCode}-${yearMonth}-${seqNumber}`;
};

// ============================================
// Provincial KPIs
// ============================================
export const generateProvincialKPIs = () => [
    { id: 'p-1', label: 'Total Cases (Province)', value: 1847, trend: 8, trendLabel: 'vs last month', status: 'neutral', icon: 'FileText' },
    { id: 'p-2', label: 'Districts in Compliance', value: '28/36', trend: 3, trendLabel: 'improved', status: 'positive', icon: 'CheckCircle' },
    { id: 'p-3', label: 'Red Zone Districts', value: 4, trend: 1, trendLabel: 'new alert', status: 'critical', icon: 'AlertTriangle' },
    { id: 'p-4', label: 'Avg Conviction Rate', value: '23.4%', trend: 2.1, trendLabel: 'improvement', status: 'positive', icon: 'Scale' },
    { id: 'p-5', label: 'Pending Verifications', value: 142, trend: -18, trendLabel: 'cleared', status: 'positive', icon: 'Clock' },
    { id: 'p-6', label: 'Service Coverage', value: '78%', trend: -2, trendLabel: 'gap identified', status: 'warning', icon: 'Heart' },
];

// ============================================
// District Leaderboard Data
// ============================================
export const generateDistrictLeaderboard = () => {
    const districts = [
        'Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala',
        'Sialkot', 'Bahawalpur', 'Sargodha', 'Sheikhupura', 'Jhang',
        'Dera Ghazi Khan', 'Rahim Yar Khan', 'Kasur', 'Okara', 'Sahiwal'
    ];

    return districts.map((name, i) => ({
        rank: i + 1,
        district: name,
        totalCases: 100 + Math.floor(Math.random() * 200),
        complianceScore: Math.max(60, 100 - (i * 3) + Math.floor(Math.random() * 10)),
        avgResponseTime: (2 + i * 0.3 + Math.random()).toFixed(1),
        convictionRate: Math.max(10, 35 - (i * 1.5) + Math.random() * 5).toFixed(1),
        serviceGap: (5 + i * 2 + Math.random() * 5).toFixed(1),
        trend: i < 5 ? 'up' : i < 10 ? 'stable' : 'down',
        lastSubmission: i < 8 ? '2024-01-08' : i < 12 ? '2024-01-12' : '2024-01-15',
        status: i < 8 ? 'On Time' : i < 12 ? 'Late' : 'Overdue'
    })).sort((a, b) => b.complianceScore - a.complianceScore);
};

// ============================================
// Cases Pending Verification
// ============================================
export const generatePendingVerifications = () => {
    const statuses = ['Pending Review', 'Under Review', 'Needs Clarification', 'Approved', 'Returned'];
    const districts = ['Lahore', 'Faisalabad', 'Multan', 'Rawalpindi', 'Gujranwala'];
    const reviewers = ['Dr. Amna Malik', 'Sarah Khan', 'Fatima Zahra', 'Unassigned'];

    return Array.from({ length: 25 }).map((_, i) => {
        const district = districts[i % districts.length];
        const caseType = i % 3 === 0 ? 'TFGBV' : 'GBV';
        return {
            id: `VER-2024-${(1000 + i).toString()}`,
            caseId: generateCaseId(caseType, district, 100 + i),
            district,
            caseType,
            category: ['Physical', 'Sexual', 'TFGBV', 'Economic'][i % 4],
            submittedOn: `2024-01-${(5 + (i % 5)).toString().padStart(2, '0')}`,
            status: statuses[i % statuses.length],
            priority: i % 5 === 0 ? 'Urgent' : 'Normal',
            assignedTo: reviewers[i % reviewers.length],
            flags: i % 3 === 0 ? ['Missing Medical Exam', 'FIR Delay'] : i % 4 === 0 ? ['Incomplete Services'] : [],
            completeness: Math.floor(70 + Math.random() * 30),
        };
    });
};

// ============================================
// Compliance Flags
// ============================================
export const generateComplianceFlags = () => {
    const issueTypes = [
        'Missing FIR Details',
        'Medical Exam Not Recorded',
        'Incomplete Service Referrals',
        'Duplicate Case ID',
        'Invalid Crime Code',
        'Timeline Inconsistency'
    ];

    return Array.from({ length: 12 }).map((_, i) => {
        const district = ['Lahore', 'Multan', 'Faisalabad', 'Rawalpindi'][i % 4];
        const caseType = i % 3 === 0 ? 'TFGBV' : 'GBV';
        return {
            id: `FLAG-${(100 + i).toString()}`,
            district,
            caseId: generateCaseId(caseType, district, 100 + i),
            issueType: issueTypes[i % issueTypes.length],
            severity: i % 3 === 0 ? 'Critical' : i % 2 === 0 ? 'Warning' : 'Info',
            raisedOn: `2024-01-${(8 - (i % 3)).toString().padStart(2, '0')}`,
            status: i < 4 ? 'Open' : i < 8 ? 'In Progress' : 'Resolved',
            daysOpen: i < 4 ? 2 + i : 0,
            assignedTo: i % 2 === 0 ? 'District Focal Point' : 'Provincial WDD'
        };
    });
};

// ============================================
// Red Zone Alerts
// ============================================
export const generateRedZoneAlerts = () => [
    {
        id: 'ALT-001',
        district: 'Lahore',
        trigger: 'Case Surge (+32%)',
        severity: 'High',
        raisedAt: '2 hours ago',
        status: 'Open',
        assignedTo: 'WDD Director',
        details: 'Monthly cases increased from 145 to 192, exceeding 25% threshold.'
    },
    {
        id: 'ALT-002',
        district: 'Multan',
        trigger: 'Lethality Cluster',
        severity: 'Critical',
        raisedAt: '1 day ago',
        status: 'Escalated',
        assignedTo: 'CS Office',
        details: '3 femicide cases reported within 15km radius in 72 hours.'
    },
    {
        id: 'ALT-003',
        district: 'Dera Ghazi Khan',
        trigger: 'Compliance Failure',
        severity: 'Medium',
        raisedAt: '3 days ago',
        status: 'Under Review',
        assignedTo: 'Provincial Coordinator',
        details: 'No submission received for 2 consecutive months.'
    },
    {
        id: 'ALT-004',
        district: 'Bahawalpur',
        trigger: 'TFGBV Spike (+45%)',
        severity: 'High',
        raisedAt: '5 hours ago',
        status: 'Open',
        assignedTo: 'Cyber Crime Wing',
        details: 'Significant increase in online harassment cases, primarily TikTok-related.'
    }
];

// ============================================
// Institutional Capacity Data
// ============================================
export const generateInstitutionalCapacity = () => ({
    units: [
        { type: 'Women Protection Centers', count: 12, compliant: 10, lastAudit: '2024-11-15' },
        { type: 'Cyber Crime Wings', count: 4, compliant: 3, lastAudit: '2024-10-20' },
        { type: 'Designated GBV Courts', count: 8, compliant: 8, lastAudit: '2024-12-01' },
        { type: 'Shelter Homes (Dar-ul-Aman)', count: 15, compliant: 11, lastAudit: '2024-09-30' },
        { type: 'One-Stop Centers', count: 6, compliant: 5, lastAudit: '2024-11-01' },
    ],
    resourceGaps: [
        { district: 'Lahore', medical: 'adequate', psychosocial: 'adequate', shelter: 'gap', legal: 'adequate', forensics: 'adequate' },
        { district: 'Faisalabad', medical: 'adequate', psychosocial: 'gap', shelter: 'adequate', legal: 'adequate', forensics: 'gap' },
        { district: 'Multan', medical: 'adequate', psychosocial: 'adequate', shelter: 'adequate', legal: 'gap', forensics: 'adequate' },
        { district: 'Rawalpindi', medical: 'adequate', psychosocial: 'adequate', shelter: 'adequate', legal: 'adequate', forensics: 'adequate' },
        { district: 'Dera Ghazi Khan', medical: 'gap', psychosocial: 'gap', shelter: 'gap', legal: 'gap', forensics: 'not available' },
        { district: 'Bahawalpur', medical: 'adequate', psychosocial: 'gap', shelter: 'adequate', legal: 'adequate', forensics: 'not available' },
    ]
});

// ============================================
// Submission Calendar Data
// ============================================
export const generateSubmissionCalendar = () => {
    const districts = ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala', 'Sialkot'];
    return districts.map((district, i) => ({
        district,
        jan: i < 4 ? 'onTime' : i < 5 ? 'late' : 'missing',
        feb: i < 5 ? 'onTime' : 'late',
        mar: 'pending',
        dec: i < 3 ? 'onTime' : i < 5 ? 'late' : 'onTime',
        nov: i < 4 ? 'onTime' : 'onTime',
        oct: 'onTime'
    }));
};

// ============================================
// Monthly Trend Data
// ============================================
export const generateProvincialTrends = () => [
    { month: 'Jul', gbv: 320, tfgbv: 89 },
    { month: 'Aug', gbv: 345, tfgbv: 102 },
    { month: 'Sep', gbv: 298, tfgbv: 95 },
    { month: 'Oct', gbv: 367, tfgbv: 118 },
    { month: 'Nov', gbv: 412, tfgbv: 134 },
    { month: 'Dec', gbv: 389, tfgbv: 156 },
    { month: 'Jan', gbv: 401, tfgbv: 178 },
];

// ============================================
// Case Type Distribution
// ============================================
export const generateCaseTypeDistribution = () => [
    { name: 'Physical Violence', value: 42, color: '#ef4444' },
    { name: 'Sexual Violence', value: 28, color: '#f97316' },
    { name: 'TFGBV / Digital', value: 18, color: '#8b5cf6' },
    { name: 'Economic Abuse', value: 8, color: '#3b82f6' },
    { name: 'Psychological', value: 4, color: '#06b6d4' },
];
