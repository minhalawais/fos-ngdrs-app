// NCSW Governance Portal Mock Data
// National-level aggregation and policy analytics

// ============================================
// National Strategic KPIs
// ============================================
export const generateNationalKPIs = () => [
    { id: 'n-1', label: 'Total Cases (National)', value: '12,847', trend: 6, status: 'neutral', icon: 'FileText' },
    { id: 'n-2', label: 'National Conviction Rate', value: '23.4%', trend: 2.1, status: 'positive', icon: 'Scale' },
    { id: 'n-3', label: 'Femicide Ratio', value: '18.2%', trend: -0.5, status: 'warning', icon: 'AlertTriangle' },
    { id: 'n-4', label: 'TFGBV Prevalence', value: '34.2%', trend: 8, status: 'critical', icon: 'Smartphone' },
    { id: 'n-5', label: 'Case Attrition Rate', value: '76.8%', trend: -2, status: 'positive', icon: 'TrendingDown' },
    { id: 'n-6', label: 'GDP Impact (Est.)', value: '0.8%', trend: 0.1, status: 'warning', icon: 'DollarSign' },
];

// ============================================
// Case Attrition Funnel Data
// ============================================
export const generateAttritionFunnel = () => [
    { stage: 'Reported', count: 12847, percentage: 100, color: '#3b82f6' },
    { stage: 'FIR Filed', count: 8351, percentage: 65, color: '#6366f1' },
    { stage: 'Investigation', count: 5428, percentage: 42, color: '#8b5cf6' },
    { stage: 'Prosecution', count: 2311, percentage: 18, color: '#a855f7' },
    { stage: 'Conviction', count: 890, percentage: 7, color: '#c026d3' },
];

// ============================================
// Provincial Submissions for Approval
// ============================================
export const generateProvincialSubmissions = () => [
    {
        id: 'SUB-PJ-2024-01',
        province: 'Punjab',
        reportType: 'Monthly',
        period: 'January 2024',
        casesCount: 1847,
        gbvCount: 1423,
        tfgbvCount: 424,
        status: 'Pending',
        submittedOn: '2024-01-14',
        qualityScore: 94,
        districtsReported: 36,
        districtsTotal: 36,
        anomalies: []
    },
    {
        id: 'SUB-SD-2024-01',
        province: 'Sindh',
        reportType: 'Monthly',
        period: 'January 2024',
        casesCount: 1234,
        gbvCount: 956,
        tfgbvCount: 278,
        status: 'Pending',
        submittedOn: '2024-01-15',
        qualityScore: 87,
        districtsReported: 28,
        districtsTotal: 30,
        anomalies: ['2 districts missing', 'Spike in Karachi (+45%)']
    },
    {
        id: 'SUB-KP-2024-01',
        province: 'Khyber Pakhtunkhwa',
        reportType: 'Monthly',
        period: 'January 2024',
        casesCount: 678,
        gbvCount: 589,
        tfgbvCount: 89,
        status: 'Verified',
        submittedOn: '2024-01-12',
        qualityScore: 96,
        districtsReported: 35,
        districtsTotal: 35,
        anomalies: []
    },
    {
        id: 'SUB-BL-2024-01',
        province: 'Balochistan',
        reportType: 'Monthly',
        period: 'January 2024',
        casesCount: 234,
        gbvCount: 212,
        tfgbvCount: 22,
        status: 'Needs Clarification',
        submittedOn: '2024-01-16',
        qualityScore: 72,
        districtsReported: 25,
        districtsTotal: 34,
        anomalies: ['9 districts missing', 'Low TFGBV reporting', 'Incomplete service data']
    },
];

// ============================================
// Data Update Requests
// ============================================
export const generateDataUpdateRequests = () => [
    {
        id: 'DUR-001',
        caseId: 'GBV-SN-KHI-2401-0145',
        province: 'Sindh',
        district: 'Karachi South',
        issue: 'Missing FIR details after 15 days',
        requiredAction: 'Upload FIR document or mark as FIR refused',
        status: 'Open',
        createdAt: '2024-01-12',
        priority: 'High',
        createdBy: 'NCSW Verification Team'
    },
    {
        id: 'DUR-002',
        caseId: 'GBV-PB-LHR-2401-0089',
        province: 'Punjab',
        district: 'Lahore',
        issue: 'Medical examination date precedes complaint date',
        requiredAction: 'Verify and correct timeline dates',
        status: 'In Progress',
        createdAt: '2024-01-10',
        priority: 'Medium',
        createdBy: 'NCSW Verification Team'
    },
    {
        id: 'DUR-003',
        caseId: 'TFG-BL-QTA-2401-0203',
        province: 'Balochistan',
        district: 'Quetta',
        issue: 'Conviction recorded without trial stage',
        requiredAction: 'Add trial proceedings or correct outcome',
        status: 'Open',
        createdAt: '2024-01-14',
        priority: 'Critical',
        createdBy: 'NCSW Verification Team'
    },
];

// ============================================
// Case Progress Requests (Individual cases awaiting NCSW approval)
// ============================================
// Province and District codes for Case ID generation
const PROVINCE_CODES: Record<string, string> = {
    'Punjab': 'PB',
    'Sindh': 'SN',
    'KPK': 'KP',
    'Balochistan': 'BL',
    'ICT': 'IC',
    'AJK': 'AJ',
    'GB': 'GB'
};

const DISTRICT_CODES: Record<string, string> = {
    'Lahore': 'LHR',
    'Faisalabad': 'FSD',
    'Multan': 'MLT',
    'Rawalpindi': 'RWP',
    'Karachi': 'KHI',
    'Hyderabad': 'HYD',
    'Sukkur': 'SKR',
    'Peshawar': 'PSH',
    'Mardan': 'MRD',
    'Abbottabad': 'ABT',
    'Quetta': 'QTA',
    'Gwadar': 'GWD'
};

// Helper function to generate proper Case ID
const generateCaseId = (caseType: string, province: string, district: string, sequence: number): string => {
    const typePrefix = caseType === 'TFGBV' ? 'TFG' : 'GBV';
    const provCode = PROVINCE_CODES[province] || province.substring(0, 2).toUpperCase();
    const distCode = DISTRICT_CODES[district] || district.substring(0, 3).toUpperCase();
    const yearMonth = '2401'; // January 2024
    const seqNumber = sequence.toString().padStart(4, '0');
    return `${typePrefix}-${provCode}-${distCode}-${yearMonth}-${seqNumber}`;
};

export const generateCaseProgressRequests = () => {
    const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan'];
    const districts = {
        'Punjab': ['Lahore', 'Faisalabad', 'Multan', 'Rawalpindi'],
        'Sindh': ['Karachi', 'Hyderabad', 'Sukkur'],
        'KPK': ['Peshawar', 'Mardan', 'Abbottabad'],
        'Balochistan': ['Quetta', 'Gwadar']
    };
    const statuses = ['Pending Review', 'Under Review', 'Approved', 'Returned', 'Needs Clarification', 'Rejected'];
    const caseTypes = ['GBV', 'TFGBV'];
    const crimeCodes = {
        'GBV': ['GB-PH (Physical)', 'GB-SX (Sexual)', 'GB-EC (Economic)', 'GB-DV (Domestic)', 'GB-HR (Harassment)'],
        'TFGBV': ['TF-A1 (Image Abuse)', 'TF-A2 (Cyber Stalking)', 'TF-A4 (Deepfake)', 'TF-BL (Blackmail)']
    };

    const flags = [
        'Missing FIR document',
        'Medical exam date inconsistency',
        'Incomplete perpetrator details',
        'Missing service referral',
        'Timeline data gap detected',
        'Duplicate case suspected',
        'Incomplete survivor profile'
    ];

    return Array.from({ length: 25 }).map((_, i) => {
        const province = provinces[i % provinces.length];
        const districtList = districts[province as keyof typeof districts];
        const district = districtList[i % districtList.length];
        const caseType = caseTypes[i % 2] as 'GBV' | 'TFGBV';
        const codeList = crimeCodes[caseType];
        const crimeCode = codeList[i % codeList.length];

        // Re-use logic from generateCaseRepository
        const { generateCaseRepository } = require('./district-mock-data');
        const repoCases = generateCaseRepository();
        const baseCase = repoCases[i % repoCases.length];

        const completeness = Math.min(100, 60 + (i * 2) % 40);
        const caseFlags = i % 3 === 0 ? [] : flags.slice(0, 1 + (i % 3));

        return {
            ...baseCase,
            id: `CPR-${(1000 + i).toString()}`,
            caseId: generateCaseId(caseType, province, district, 1000 + i),
            province,
            district,
            caseType,
            crimeCode,
            status: statuses[i % statuses.length],
            completeness,
            submittedOn: `2024-01-${(10 + (i % 5)).toString().padStart(2, '0')}`,
            submittedBy: `${province} Provincial Portal`,
            flags: caseFlags,
            risk: ['Low', 'Medium', 'High', 'Critical'][i % 4],
            category: caseType === 'TFGBV'
                ? ['Image Abuse', 'Cyber Stalking', 'Online Harassment'][i % 3]
                : ['Domestic Violence', 'Sexual Assault', 'Physical Abuse'][i % 3],
            verificationNotes: i % 4 === 0 ? 'Needs additional verification' : '',
            lastUpdated: `${1 + (i % 5)} days ago`
        };
    });
};

// ============================================
// Treaty Compliance Indicators
// ============================================
export const generateTreatyIndicators = () => ({
    cedaw: [
        { indicator: 'GBV Incidence per 100,000', value: 78.4, target: 50, unit: '', status: 'critical' },
        { indicator: 'Access to Justice Rate', value: 42, target: 80, unit: '%', status: 'warning' },
        { indicator: 'Conviction Rate', value: 23.4, target: 50, unit: '%', status: 'warning' },
        { indicator: 'Femicide Classification', value: 18, target: 100, unit: '%', status: 'critical' },
        { indicator: 'Survivor Full Service Rate', value: 78, target: 100, unit: '%', status: 'warning' },
    ],
    sdg5: [
        { indicator: '5.2.1 Partner Violence', value: 32, target: 0, unit: '%', status: 'critical' },
        { indicator: '5.2.2 Non-partner Violence', value: 12, target: 0, unit: '%', status: 'warning' },
        { indicator: '5.3.1 Child Marriage', value: 18, target: 0, unit: '%', status: 'critical' },
    ],
    institutional: [
        { domain: 'GBV Legal Coverage', score: 3, max: 5, details: 'DV, Sexual, Harassment covered' },
        { domain: 'TFGBV Offence Coverage', score: 2, max: 4, details: 'Cyberstalking, Image abuse; Deepfakes pending' },
        { domain: 'Specialized Units', score: 82, max: 100, details: '37/45 units SOP compliant' },
        { domain: 'Gender Budget Allocation', score: 1.2, max: 3, details: 'Provincial GBV allocation' },
    ]
});

// ============================================
// Platform Accountability Data
// ============================================
export const generatePlatformData = () => [
    { platform: 'Meta (FB/IG)', cases: 1234, avgResponse: 6, takedownRate: 89, evidenceAccepted: 78, color: '#1877F2' },
    { platform: 'TikTok', cases: 2891, avgResponse: 17, takedownRate: 72, evidenceAccepted: 65, color: '#000000' },
    { platform: 'X (Twitter)', cases: 456, avgResponse: 24, takedownRate: 65, evidenceAccepted: 58, color: '#14171A' },
    { platform: 'WhatsApp', cases: 3102, avgResponse: 48, takedownRate: 45, evidenceAccepted: 42, color: '#25D366' },
    { platform: 'YouTube', cases: 234, avgResponse: 12, takedownRate: 78, evidenceAccepted: 71, color: '#FF0000' },
    { platform: 'Telegram', cases: 189, avgResponse: 72, takedownRate: 23, evidenceAccepted: 18, color: '#0088CC' },
];

// ============================================
// Shelter Directory
// ============================================
export const generateShelterDirectory = () => [
    { id: 'SH-001', name: 'Dar-ul-Aman Lahore', type: 'Dar-ul-Aman', province: 'Punjab', district: 'Lahore', capacity: 50, occupancy: 42, services: ['Shelter', 'Legal', 'Psychosocial'], status: 'Active' },
    { id: 'SH-002', name: 'Women Protection Center Karachi', type: 'WPC', province: 'Sindh', district: 'Karachi', capacity: 30, occupancy: 28, services: ['Shelter', 'Medical', 'Legal'], status: 'Active' },
    { id: 'SH-003', name: 'One-Stop Center Peshawar', type: 'One-Stop', province: 'KPK', district: 'Peshawar', capacity: 25, occupancy: 18, services: ['Shelter', 'Medical', 'Legal', 'Psychosocial', 'Police'], status: 'Active' },
    { id: 'SH-004', name: 'Dar-ul-Aman Quetta', type: 'Dar-ul-Aman', province: 'Balochistan', district: 'Quetta', capacity: 20, occupancy: 12, services: ['Shelter', 'Legal'], status: 'Active' },
    { id: 'SH-005', name: 'Women Safe House Multan', type: 'Safe House', province: 'Punjab', district: 'Multan', capacity: 15, occupancy: 15, services: ['Shelter', 'Psychosocial'], status: 'At Capacity' },
    { id: 'SH-006', name: 'WPC Faisalabad', type: 'WPC', province: 'Punjab', district: 'Faisalabad', capacity: 40, occupancy: 0, services: ['Shelter', 'Legal'], status: 'Under Renovation' },
];

// ============================================
// User Management
// ============================================
export const generateUserDirectory = () => [
    { id: 'USR-001', name: 'Dr. Amna Malik', email: 'amna.malik@ncsw.gov.pk', role: 'NCSW Admin', portal: 'NCSW', status: 'Active', lastLogin: '2024-01-15 09:30' },
    { id: 'USR-002', name: 'Sarah Khan', email: 'sarah.khan@punjab.gov.pk', role: 'Provincial Reviewer', portal: 'Punjab Provincial', status: 'Active', lastLogin: '2024-01-15 10:15' },
    { id: 'USR-003', name: 'Fatima Zahra', email: 'fatima.z@sindh.gov.pk', role: 'Provincial Reviewer', portal: 'Sindh Provincial', status: 'Active', lastLogin: '2024-01-14 16:45' },
    { id: 'USR-004', name: 'Officer Jameel', email: 'jameel.a@lahore.gov.pk', role: 'District Operator', portal: 'Lahore District', status: 'Active', lastLogin: '2024-01-15 08:00' },
    { id: 'USR-005', name: 'Const. Amna', email: 'amna.c@karachi.gov.pk', role: 'District Operator', portal: 'Karachi District', status: 'Inactive', lastLogin: '2024-01-10 12:00' },
    { id: 'USR-006', name: 'SI Rehman', email: 'rehman.s@quetta.gov.pk', role: 'District Operator', portal: 'Quetta District', status: 'Active', lastLogin: '2024-01-15 11:30' },
];

// ============================================
// Districts Registry
// ============================================
export const generateDistrictsRegistry = () => [
    { id: 'DST-PJ-001', name: 'Lahore', province: 'Punjab', population: 11126285, riskIndex: 78, casesYTD: 192, focalPoint: 'Officer Jameel', status: 'Active' },
    { id: 'DST-PJ-002', name: 'Faisalabad', province: 'Punjab', population: 3203846, riskIndex: 65, casesYTD: 134, focalPoint: 'SI Fatima', status: 'Active' },
    { id: 'DST-PJ-003', name: 'Rawalpindi', province: 'Punjab', population: 2098231, riskIndex: 52, casesYTD: 89, focalPoint: 'ASI Khan', status: 'Active' },
    { id: 'DST-SD-001', name: 'Karachi', province: 'Sindh', population: 14910352, riskIndex: 85, casesYTD: 456, focalPoint: 'Const. Amna', status: 'Red Zone' },
    { id: 'DST-SD-002', name: 'Hyderabad', province: 'Sindh', population: 1732693, riskIndex: 58, casesYTD: 78, focalPoint: 'SI Ahmed', status: 'Active' },
    { id: 'DST-KP-001', name: 'Peshawar', province: 'KPK', population: 1970042, riskIndex: 71, casesYTD: 112, focalPoint: 'DSP Iqbal', status: 'Active' },
    { id: 'DST-BL-001', name: 'Quetta', province: 'Balochistan', population: 1001205, riskIndex: 45, casesYTD: 34, focalPoint: 'SI Rehman', status: 'Active' },
];

// ============================================
// National Case Search (Aggregated from all provinces)
// ============================================
export const generateNationalCases = () => {
    // Re-use the detailed case repository logic but customize for national view
    const { generateCaseRepository } = require('./district-mock-data');
    const cases = generateCaseRepository();

    // Add national-specific fields if necessary
    return cases.map((c: any, i: number) => ({
        ...c,
        verificationStatus: i < 30 ? 'Published' : i < 40 ? 'Provincial Verified' : 'Pending',
        reportedDate: c.date
    }));
};

// ============================================
// Provincial Summary for Dashboard
// ============================================
export const generateProvincialSummary = () => [
    { province: 'Punjab', cases: 4521, gbv: 3456, tfgbv: 1065, convictionRate: 24.5, trend: 'up' },
    { province: 'Sindh', cases: 3892, gbv: 2987, tfgbv: 905, convictionRate: 21.2, trend: 'stable' },
    { province: 'KPK', cases: 2134, gbv: 1876, tfgbv: 258, convictionRate: 26.8, trend: 'up' },
    { province: 'Balochistan', cases: 1245, gbv: 1123, tfgbv: 122, convictionRate: 18.9, trend: 'down' },
    { province: 'ICT', cases: 567, gbv: 423, tfgbv: 144, convictionRate: 31.2, trend: 'up' },
    { province: 'AJK', cases: 234, gbv: 198, tfgbv: 36, convictionRate: 22.4, trend: 'stable' },
    { province: 'GB', cases: 154, gbv: 142, tfgbv: 12, convictionRate: 19.8, trend: 'down' },
];

// ============================================
// Process Indicators Data (District Submissions)
// ============================================
export const INDICATOR_CATEGORIES = [
    'A. Prevention Measures',
    'B. Protection & Support',
    'C. Justice & Accountability'
];

export const INDICATOR_TYPES = {
    'A. Prevention': [
        'Curriculum Alignment Index',
        'Digital Hygiene Reach',
        'ILO 190 Compliance',
        'Digital Access Gap Reduction'
    ],
    'B. Protection & Support': [
        'One-Stop Centers Operational',
        'Multi-Channel Reporting Coverage',
        'Full Services Resolution Rate',
        'Chain-of-Custody Compliance'
    ],
    'C. Justice & Accountability': [
        'Case Attrition Rate',
        'Survivor-Centric Justice Score',
        'Cross-Border Cooperation Requests',
        'Conviction Rate'
    ]
};

export const generateIndicatorSubmissions = () => {
    const statuses = ['Pending Review', 'Under Review', 'Approved', 'Returned', 'Needs Clarification'];
    const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan'];
    const districts = {
        'Punjab': ['Lahore', 'Faisalabad', 'Multan', 'Rawalpindi'],
        'Sindh': ['Karachi', 'Hyderabad', 'Sukkur'],
        'KPK': ['Peshawar', 'Mardan', 'Abbottabad'],
        'Balochistan': ['Quetta', 'Gwadar']
    };

    return Array.from({ length: 24 }).map((_, i) => {
        const province = provinces[i % provinces.length];
        const districtList = districts[province as keyof typeof districts];
        const district = districtList[i % districtList.length];
        const status = statuses[i % statuses.length];
        const category = INDICATOR_CATEGORIES[i % INDICATOR_CATEGORIES.length];
        const indicatorTypes = INDICATOR_TYPES[category as keyof typeof INDICATOR_TYPES];
        const indicatorType = indicatorTypes[i % indicatorTypes.length];
        const baseValue = Math.floor(20 + Math.random() * 60);
        const targetValue = Math.floor(70 + Math.random() * 30);
        const previousValue = baseValue - Math.floor(Math.random() * 15) + Math.floor(Math.random() * 10);

        return {
            id: `IND-${PROVINCE_CODES[province] || province.substring(0, 2).toUpperCase()}-${district.substring(0, 3).toUpperCase()}-2401-${(3000 + i).toString().padStart(4, '0')}`,
            indicatorName: indicatorType,
            category,
            province,
            district,
            submittedBy: `${district} District Portal`,
            submittedOn: `2024-01-${(2 + (i % 14)).toString().padStart(2, '0')}`,
            status,
            reportingPeriod: 'January 2024',
            priority: i % 5 === 0 ? 'High' : 'Normal',
            currentValue: baseValue,
            targetValue,
            previousValue,
            unit: indicatorType.includes('Rate') || indicatorType.includes('Score') || indicatorType.includes('Compliance') ? '%' :
                indicatorType.includes('Index') ? 'Level' : 'Count',
            trend: baseValue > previousValue ? 'up' : baseValue < previousValue ? 'down' : 'stable',
            completeness: Math.floor(70 + Math.random() * 30),
            flags: i % 4 === 0 ? ['Data source verification needed', 'Baseline data missing'] : i % 7 === 0 ? ['Calculation methodology unclear'] : [],
            details: {
                description: `This indicator measures ${indicatorType.toLowerCase()} performance for ${district}, ${province}.`,
                methodology: 'Verified against field reports',
                dataSource: ['District Office Records', 'Service Provider Reports', 'Police Data'][i % 3],
                collectionDate: `2024-01-${(20 + (i % 8)).toString().padStart(2, '0')}`,
                frequency: 'Monthly',
                disaggregation: {
                    urban: Math.floor(baseValue * 0.6),
                    rural: Math.floor(baseValue * 0.4),
                    male: 0,
                    female: baseValue
                },
                historicalData: [
                    { period: 'Dec 2023', value: previousValue },
                    { period: 'Jan 2024', value: baseValue }
                ],
                notes: i % 3 === 0 ? 'Data collection faced challenges.' : '',
                verifiedBy: 'Dr. Fatima Ali',
                verificationDate: `2024-01-${(25 + (i % 5)).toString().padStart(2, '0')}`,
                attachments: ['data_sheet.xlsx'],
                contactPerson: 'Dr. Fatima Ali',
                contactEmail: `indicators.${district.toLowerCase()}@${province.toLowerCase()}.gov.pk`
            }
        };
    });
};

// ============================================
// Prevention Actions Data
// ============================================
export const PREVENTION_TYPES = [
    'Education & School Programs',
    'Community Engagement',
    'Legal Framework Strengthening',
    'Economic Empowerment',
    'Health Sector Response',
    'Media Campaigns',
    'Workplace Programs',
    'Youth & Children Programs'
];

export const generatePreventionSubmissions = () => {
    const statuses = ['Pending Review', 'Under Review', 'Approved', 'Returned', 'Needs Clarification'];
    const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan'];
    const districts = {
        'Punjab': ['Lahore', 'Faisalabad', 'Multan', 'Rawalpindi'],
        'Sindh': ['Karachi', 'Hyderabad', 'Sukkur'],
        'KPK': ['Peshawar', 'Mardan', 'Abbottabad'],
        'Balochistan': ['Quetta', 'Gwadar']
    };

    return Array.from({ length: 20 }).map((_, i) => {
        const province = provinces[i % provinces.length];
        const districtList = districts[province as keyof typeof districts];
        const district = districtList[i % districtList.length];
        const status = statuses[i % statuses.length];

        return {
            id: `PRV-${PROVINCE_CODES[province] || province.substring(0, 2).toUpperCase()}-${district.substring(0, 3).toUpperCase()}-2401-${(1000 + i).toString().padStart(4, '0')}`,
            title: [
                'School GBV Prevention Curriculum',
                'Community Safety Committee Formation',
                'Women Legal Aid Clinic Launch',
                'Microfinance for Survivors Program',
                'Hospital Protocol Training',
                'Radio Awareness Campaign',
                'Corporate Anti-Harassment Policy',
                'Youth Ambassador Network'
            ][i % 8],
            type: PREVENTION_TYPES[i % PREVENTION_TYPES.length],
            province,
            district,
            submittedBy: `${district} District Portal`,
            submittedOn: `2024-01-${(5 + (i % 10)).toString().padStart(2, '0')}`,
            status,
            priority: i % 4 === 0 ? 'High' : 'Normal',
            targetBeneficiaries: (500 + (i * 100)) * (i % 5 + 1),
            budget: (50000 + (i * 25000)) * (i % 3 + 1),
            startDate: `2024-02-${(1 + (i % 15)).toString().padStart(2, '0')}`,
            endDate: `2024-06-${(15 + (i % 15)).toString().padStart(2, '0')}`,
            completeness: Math.floor(70 + Math.random() * 30),
            flags: i % 3 === 0 ? ['Missing budget breakdown'] : [],
            details: {
                description: `This initiative aims to address GBV prevention in ${district}.`,
                objectives: ['Increase awareness', 'Train community leaders'],
                targetGroups: 'Women 18-45',
                implementing: 'WDD',
                fundingSource: 'Provincial Budget',
                indicators: [
                    { name: 'People Trained', target: 500, current: 150 }
                ],
                attachments: ['proposal.pdf'],
                contactPerson: 'Dr. Fatima Ali',
                contactEmail: `prevention.${district.toLowerCase()}@${province.toLowerCase()}.gov.pk`,
                contactPhone: '0300-1234567'
            }
        };
    });
};

// ============================================
// Awareness Actions Data
// ============================================
export const AWARENESS_TYPES = [
    'Radio Campaign',
    'TV Campaign',
    'Social Media Campaign',
    'Community Theater',
    'Door-to-Door Campaign',
    'School Awareness Sessions',
    'Public Event / Rally',
    'Digital Media Campaign',
    'Print Media Campaign'
];

export const generateAwarenessSubmissions = () => {
    const statuses = ['Pending Review', 'Under Review', 'Approved', 'Returned', 'Needs Clarification'];
    const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan'];
    const districts = {
        'Punjab': ['Lahore', 'Faisalabad', 'Multan', 'Rawalpindi'],
        'Sindh': ['Karachi', 'Hyderabad', 'Sukkur'],
        'KPK': ['Peshawar', 'Mardan', 'Abbottabad'],
        'Balochistan': ['Quetta', 'Gwadar']
    };

    return Array.from({ length: 20 }).map((_, i) => {
        const province = provinces[i % provinces.length];
        const districtList = districts[province as keyof typeof districts];
        const district = districtList[i % districtList.length];
        const status = statuses[i % statuses.length];
        const campaignType = AWARENESS_TYPES[i % AWARENESS_TYPES.length];

        return {
            id: `AWR-${PROVINCE_CODES[province] || province.substring(0, 2).toUpperCase()}-${district.substring(0, 3).toUpperCase()}-2401-${(2000 + i).toString().padStart(4, '0')}`,
            title: [
                '16 Days of Activism Against GBV',
                'Women\'s Rights Radio Show',
                'TFGBV Awareness TikTok Series',
                'Street Theater Against Violence',
                'Community Dialogue Sessions',
                'School Safety Week',
                'International Women\'s Day Rally',
                'Digital Safety for Women',
                'Newspaper Feature Series'
            ][i % 9],
            type: campaignType,
            province,
            district,
            submittedBy: `${district} District Portal`,
            submittedOn: `2024-01-${(3 + (i % 12)).toString().padStart(2, '0')}`,
            status,
            priority: i % 5 === 0 ? 'High' : 'Normal',
            reachEstimate: (5000 + (i * 2000)) * (i % 5 + 1),
            budget: (25000 + (i * 15000)) * (i % 3 + 1),
            startDate: `2024-01-${(15 + (i % 10)).toString().padStart(2, '0')}`,
            endDate: `2024-02-${(1 + (i % 15)).toString().padStart(2, '0')}`,
            completeness: Math.floor(70 + Math.random() * 30),
            flags: i % 4 === 0 ? ['Missing reach metrics'] : [],
            details: {
                description: `This campaign aims to raise awareness in ${district}.`,
                keyMessages: ['Violence is not acceptable', 'Report GBV'],
                targetAudience: 'General Public',
                mediaChannels: ['Radio', 'Social Media'],
                frequency: 'Daily',
                implementing: 'Information Dept',
                fundingSource: 'UN Women',
                metrics: [
                    { name: 'Estimated Reach', target: 50000, current: 20000 }
                ],
                contentSamples: ['poster.pdf'],
                testimonials: 5,
                mediaCoverage: 2,
                contactPerson: 'Sana Ahmed',
                contactEmail: `awareness.${district.toLowerCase()}@${province.toLowerCase()}.gov.pk`,
                contactPhone: '0321-7654321'
            }
        };
    });
};

// ============================================
// Protection & Support Data
// ============================================
export const PROTECTION_TYPES = [
    'Shelter Occupancy Report',
    'Helpline Call Logs',
    'Medico-Legal Unit Report',
    'Psychosocial Support Stats',
    'Police Women Desk Report',
    'Legal Aid Services Log',
    'Rehabilitation Center Report'
];

export const generateProtectionSubmissions = () => {
    const statuses = ['Pending Review', 'Under Review', 'Approved', 'Returned', 'Needs Clarification'];
    const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan'];
    const districts = {
        'Punjab': ['Lahore', 'Faisalabad', 'Multan', 'Rawalpindi'],
        'Sindh': ['Karachi', 'Hyderabad', 'Sukkur'],
        'KPK': ['Peshawar', 'Mardan', 'Abbottabad'],
        'Balochistan': ['Quetta', 'Gwadar']
    };

    return Array.from({ length: 20 }).map((_, i) => {
        const province = provinces[i % provinces.length];
        const districtList = districts[province as keyof typeof districts];
        const district = districtList[i % districtList.length];
        const status = statuses[i % statuses.length];
        const reportType = PROTECTION_TYPES[i % PROTECTION_TYPES.length];

        return {
            id: `PRT-${PROVINCE_CODES[province] || province.substring(0, 2).toUpperCase()}-${district.substring(0, 3).toUpperCase()}-2401-${(4000 + i).toString().padStart(4, '0')}`,
            title: `${reportType} - ${district}`,
            type: reportType,
            province,
            district,
            submittedBy: `${district} District Portal`,
            submittedOn: `2024-01-${(4 + (i % 12)).toString().padStart(2, '0')}`,
            status,
            priority: i % 6 === 0 ? 'High' : 'Normal',
            beneficiaries: (50 + (i * 20)) * (i % 4 + 1),
            capacityUtilization: Math.min(100, Math.floor(40 + Math.random() * 50)),
            completeness: Math.floor(70 + Math.random() * 30),
            flags: i % 5 === 0 ? ['Capacity mismatch detected'] : [],
            details: {
                description: `Monthly submission for ${reportType} in ${district}.`,
                facilityName: `${district} ${reportType.split(' ')[0]} Center`,
                totalCasesHandled: Math.floor(20 + Math.random() * 100),
                referralsGiven: Math.floor(5 + Math.random() * 30),
                referralsReceived: Math.floor(10 + Math.random() * 40),
                staffOnDuty: Math.floor(5 + Math.random() * 15),
                keyChallenges: ['Staff shortage', 'Funding delay', 'Infrastructure repair needed'][i % 3],
                fundingStatus: i % 2 === 0 ? 'Released' : 'Pending',
                attachments: ['monthly_log.pdf'],
                contactPerson: 'Director Services',
                contactEmail: `protection.${district.toLowerCase()}@${province.toLowerCase()}.gov.pk`
            }
        };
    });
};
