// Case Lifecycle Stage Templates
// Based on NCSW Circular for Mandatory Data Reporting

// Helper function to generate proper Case ID (Lahore District = PB-LHR)
const generateCaseId = (caseType: string, sequence: number): string => {
    const typePrefix = caseType === 'TFGBV' ? 'TFG' : 'GBV';
    const yearMonth = '2401'; // January 2024
    const seqNumber = sequence.toString().padStart(4, '0');
    return `${typePrefix}-PB-LHR-${yearMonth}-${seqNumber}`; // Default to Lahore for district portal
};

// ============================================
// GBV STAGES (Physical, Sexual, Femicide, etc.)
// ============================================
export const GBV_STAGES = [
    {
        code: 'COMPLAINT_RECEIVED',
        name: 'Complaint Received',
        required: true,
        order: 1,
        fields: ['intakeChannel', 'officer', 'method', 'survivorStatus']
    },
    {
        code: 'INITIAL_SCREENING',
        name: 'Initial Screening & Safety Assessment',
        required: true,
        order: 2,
        fields: ['riskLevel', 'urgentProtection', 'violenceType', 'consent']
    },
    {
        code: 'POLICE_COMPLAINT',
        name: 'Police Complaint Registration',
        required: true,
        order: 3,
        fields: ['policeStation', 'ioAssigned', 'complaintNo', 'offence']
    },
    {
        code: 'FIR_REGISTERED',
        name: 'FIR Registration',
        required: false,
        order: 4,
        fields: ['firNo', 'firDate', 'sections', 'courtJurisdiction']
    },
    {
        code: 'MEDICAL_EXAM',
        name: 'Medical Examination & Evidence Recording',
        required: false,
        order: 5,
        fields: ['hospital', 'examDate', 'mloName', 'dnaReport', 'initialReport']
    },
    {
        code: 'INVESTIGATION',
        name: 'Investigation & Trial Detail',
        required: true,
        order: 6,
        fields: ['investigationStatus', 'daysPending', 'evidenceCollected', 'witnesses']
    },
    {
        code: 'ARREST_REMAND',
        name: 'Arrest & Judicial Remand',
        required: false,
        order: 7,
        fields: ['arrestDate', 'remandType', 'bailStatus', 'custody']
    },
    {
        code: 'CHARGE_SHEET',
        name: 'Charge Sheet Filing',
        required: false,
        order: 8,
        fields: ['chargeSheetDate', 'prosecutor', 'chargesFramed']
    },
    {
        code: 'TRIAL',
        name: 'Trial Proceedings',
        required: false,
        order: 9,
        fields: ['court', 'judge', 'hearingDates', 'adjournments']
    },
    {
        code: 'ESCALATION',
        name: 'Escalation & Proceeding History',
        required: false,
        order: 10,
        fields: ['escalationReason', 'escalatedTo', 'escalationDate']
    },
    {
        code: 'DISPOSAL',
        name: 'Disposal & Judgment',
        required: false,
        order: 11,
        fields: ['outcome', 'judgmentDate', 'judge', 'shortOrder', 'sentence']
    },
];

// ============================================
// TFGBV STAGES (Digital Violence)
// ============================================
export const TFGBV_STAGES = [
    {
        code: 'COMPLAINT_RECEIVED',
        name: 'Complaint Received',
        required: true,
        order: 1,
        fields: ['intakeChannel', 'officer', 'method', 'survivorStatus']
    },
    {
        code: 'INITIAL_SCREENING',
        name: 'Initial Screening & Safety Assessment',
        required: true,
        order: 2,
        fields: ['riskLevel', 'urgentProtection', 'tfgbvType', 'consent']
    },
    {
        code: 'DIGITAL_EVIDENCE',
        name: 'Digital Evidence Collection (SOP-2)',
        required: true,
        order: 3,
        fields: ['screenshots', 'urls', 'metadata', 'hashGenerated', 'platformComplaintNo']
    },
    {
        code: 'CYBER_CRIME_REPORT',
        name: 'FIA/Cyber Crime Report',
        required: true,
        order: 4,
        fields: ['reportingUnit', 'reportNo', 'officerAssigned', 'reportDate']
    },
    {
        code: 'PLATFORM_TAKEDOWN',
        name: 'Platform Takedown Request',
        required: true,  // Can be marked N/A
        order: 5,
        fields: ['platform', 'requestDate', 'responseTime', 'takedownStatus', 'reason']
    },
    {
        code: 'FIR_REGISTERED',
        name: 'FIR Registration',
        required: false,
        order: 6,
        fields: ['firNo', 'firDate', 'sections', 'courtJurisdiction']
    },
    {
        code: 'FORENSIC_ANALYSIS',
        name: 'Digital Forensic Analysis',
        required: false,
        order: 7,
        fields: ['forensicLab', 'deviceType', 'reportStatus', 'evidenceAccepted']
    },
    {
        code: 'INVESTIGATION',
        name: 'Investigation',
        required: true,
        order: 8,
        fields: ['investigationStatus', 'daysPending', 'crossBorderRequest', 'mlatStatus']
    },
    {
        code: 'TRIAL',
        name: 'Prosecution & Trial',
        required: false,
        order: 9,
        fields: ['court', 'judge', 'hearingDates', 'evidencePresented']
    },
    {
        code: 'DISPOSAL',
        name: 'Disposal & Judgment',
        required: false,
        order: 10,
        fields: ['outcome', 'judgmentDate', 'judge', 'shortOrder', 'sentence']
    },
];

// ============================================
// Stage Status Options
// ============================================
export const STAGE_STATUS_OPTIONS = [
    { value: 'Pending', label: 'Pending', color: 'bg-gray-100 text-gray-600' },
    { value: 'In Progress', label: 'In Progress', color: 'bg-blue-50 text-blue-600' },
    { value: 'Completed', label: 'Completed', color: 'bg-green-50 text-green-600' },
    { value: 'Delayed', label: 'Delayed', color: 'bg-orange-50 text-orange-600' },
    { value: 'Skipped', label: 'Skipped', color: 'bg-gray-50 text-gray-400' },
    { value: 'N/A', label: 'Not Applicable', color: 'bg-gray-50 text-gray-400 italic' },
];

// ============================================
// Field Labels (Human-readable)
// ============================================
export const FIELD_LABELS: Record<string, string> = {
    intakeChannel: 'Intake Channel',
    officer: 'Receiving Officer',
    method: 'Reporting Method',
    survivorStatus: 'Survivor Status',
    riskLevel: 'Risk Level',
    urgentProtection: 'Urgent Protection Needed',
    violenceType: 'Violence Type',
    tfgbvType: 'TFGBV Sub-Type',
    consent: 'Consent Given',
    policeStation: 'Police Station',
    ioAssigned: 'Inquiry Officer (IO)',
    complaintNo: 'Complaint Application No.',
    offence: 'Applicable Legal Sections',
    firNo: 'FIR Number',
    firDate: 'FIR Date',
    sections: 'Sections Applied',
    courtJurisdiction: 'Court Jurisdiction',
    hospital: 'Hospital Name',
    examDate: 'Examination Date',
    mloName: 'MLO Name',
    dnaReport: 'DNA Report Status',
    initialReport: 'Initial Medical Report',
    investigationStatus: 'Investigation Status',
    daysPending: 'Days Pending',
    evidenceCollected: 'Evidence Collected',
    witnesses: 'Witnesses Recorded',
    arrestDate: 'Arrest Date',
    remandType: 'Remand Type (Physical/Judicial)',
    bailStatus: 'Bail Status',
    custody: 'Custody Status',
    chargeSheetDate: 'Charge Sheet Date',
    prosecutor: 'Prosecutor Name',
    chargesFramed: 'Charges Framed',
    court: 'Court Name',
    judge: 'Presiding Judge',
    hearingDates: 'Hearing Dates',
    adjournments: 'Number of Adjournments',
    escalationReason: 'Escalation Reason',
    escalatedTo: 'Escalated To',
    escalationDate: 'Escalation Date',
    outcome: 'Case Outcome',
    judgmentDate: 'Judgment Date',
    shortOrder: 'Short Order',
    sentence: 'Sentence (if convicted)',
    screenshots: 'Screenshots Captured',
    urls: 'URLs/Links Documented',
    metadata: 'Metadata Extracted',
    hashGenerated: 'Hash Generated',
    platformComplaintNo: 'Platform Complaint No.',
    reportingUnit: 'Reporting Unit',
    reportNo: 'Report Number',
    officerAssigned: 'Officer Assigned',
    reportDate: 'Report Date',
    platform: 'Platform Name',
    requestDate: 'Request Date',
    responseTime: 'Response Time (hours)',
    takedownStatus: 'Takedown Status',
    reason: 'Reason (if rejected)',
    forensicLab: 'Forensic Lab',
    deviceType: 'Device Type',
    reportStatus: 'Report Status',
    evidenceAccepted: 'Evidence Accepted by Court',
    crossBorderRequest: 'Cross-Border Request',
    mlatStatus: 'MLAT Status',
    evidencePresented: 'Evidence Presented',
};

// ============================================
// Generate Initial Timeline based on Case Type
// ============================================
export const generateInitialTimeline = (caseType: 'GBV' | 'TFGBV', crimeCode: string) => {
    const stages = caseType === 'TFGBV' ? TFGBV_STAGES : GBV_STAGES;

    return stages.filter(s => s.required).map((stage, idx) => ({
        id: `stage-${Date.now()}-${idx}`,
        stageCode: stage.code,
        stage: stage.name,
        status: idx === 0 ? 'Completed' : 'Pending',
        date: idx === 0 ? new Date().toISOString().split('T')[0] : 'N/A',
        order: stage.order,
        details: stage.fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
    }));
};

// ============================================
// Get Available Stages to Add (not already in timeline)
// ============================================
export const getAvailableStagesToAdd = (caseType: 'GBV' | 'TFGBV', existingCodes: string[]) => {
    const stages = caseType === 'TFGBV' ? TFGBV_STAGES : GBV_STAGES;
    return stages.filter(s => !existingCodes.includes(s.code));
};

// ============================================
// Mock Data Generator (Updated)
// ============================================
export const generateDistrictKPIs = () => [
    { id: 'd-1', label: 'Total Cases (This Month)', value: 142, trend: 12, trendLabel: 'vs last month', status: 'neutral' },
    { id: 'd-2', label: 'Pending FIR Registration', value: 18, trend: -5, trendLabel: 'improvement', status: 'positive' },
    { id: 'd-3', label: 'High Lethality Risks', value: 7, trend: 2, trendLabel: 'new alerts', status: 'critical' },
    { id: 'd-4', label: 'Reporting Compliance', value: '94%', trend: 0, trendLabel: 'Submit by 10th', status: 'good' },
];

export const generatePendencyWatch = () => [
    { caseId: 'GBV-PEW-2024-001', survivor: 'A. Bibi', daysPending: 5, stage: 'Reported -> FIR', reason: 'Police Station Delay' },
    { caseId: 'GBV-PEW-2024-004', survivor: 'S. Khan', daysPending: 4, stage: 'FIR -> Investigation', reason: 'IO Not Assigned' },
    { caseId: 'TFGBV-PEW-2024-009', survivor: 'M. Ali', daysPending: 3, stage: 'Evidence -> Forensics', reason: 'Device Pending' },
];

export const generateLethalityAlerts = () => [
    { caseId: 'GBV-PEW-2024-012', survivor: 'Fatima Z.', score: 8, risk: 'Extreme', indicators: ['Weapon Involved', 'Stalking', 'Threat to Kill'] },
    { caseId: 'GBV-PEW-2024-015', survivor: 'Zainab B.', score: 6, risk: 'High', indicators: ['Previous Assault', 'Escalating Violence'] },
];

export const generateRecentActivity = () => [
    { id: 1, action: 'New Case Registered', user: 'Officer Jameel', time: '10 mins ago', details: 'Physical Violence case in UC-4' },
    { id: 2, action: 'FIR Uploaded', user: 'Admin Staff', time: '1 hour ago', details: 'Case #2024-001 attached to file' },
    { id: 3, action: 'Service Referral', user: 'Dr. Amna', time: '3 hours ago', details: 'Medical Examination Request sent for Case #2024-008' },
];

export const generateCaseRepository = () => {
    const caseTypes = ['GBV', 'TFGBV'] as const;
    const gbvCodes = ['GB-PH', 'GB-SX', 'GB-FE', 'GB-EC'];
    const tfgbvCodes = ['TF-A1', 'TF-A2', 'TF-A3', 'TF-A4', 'TF-A5'];

    return Array.from({ length: 15 }).map((_, i) => {
        const caseType = caseTypes[i % 2];
        const crimeCode = caseType === 'GBV' ? gbvCodes[i % gbvCodes.length] : tfgbvCodes[i % tfgbvCodes.length];
        const stages = caseType === 'TFGBV' ? TFGBV_STAGES : GBV_STAGES;

        // Generate timeline with varying completion states
        const timeline = stages.slice(0, 5 + (i % 3)).map((stage, idx) => ({
            id: `stage-${i}-${idx}`,
            stageCode: stage.code,
            stage: stage.name,
            status: idx < 2 + (i % 3) ? 'Completed' : (idx === 2 + (i % 3) ? 'In Progress' : 'Pending'),
            date: idx < 3 ? `2024-10-${(10 + idx).toString().padStart(2, '0')}` : 'N/A',
            order: stage.order,
            details: stage.fields.reduce((acc, field, fIdx) => ({
                ...acc,
                [field]: getMockFieldValue(field, i, idx)
            }), {})
        }));

        return {
            id: generateCaseId(caseType, 100 + i),
            caseType,
            crimeCode,
            survivor: ['Ayesha B.', 'Fatima Z.', 'Saima K.', 'Anonymous', 'Zainab M.'][i % 5],
            date: `2024-10-${(10 + i).toString()}`,
            category: caseType === 'GBV' ? ['Physical', 'Sexual', 'Femicide', 'Economic'][i % 4] : 'TFGBV',
            status: ['Reported', 'FIR Registered', 'Investigation', 'Trial', 'Closed'][i % 5],
            risk: ['Low', 'Medium', 'High', 'Critical'][i % 4],
            lastUpdate: `${i + 2} days ago`,
            timeline
        };
    });
};

// Helper to generate realistic mock field values
const getMockFieldValue = (field: string, caseIdx: number, stageIdx: number): string => {
    const mockValues: Record<string, string[]> = {
        intakeChannel: ['Women Protection Center', 'Police Station', 'Helpline 1099', 'Walk-in'],
        officer: ['Officer Sarah Khan', 'Officer Jameel', 'Const. Amna', 'SI Rehman'],
        method: ['In-Person', 'Phone', 'Online Portal', 'Referral'],
        survivorStatus: ['Stable', 'Requires Immediate Care', 'Under Protection'],
        riskLevel: ['Low', 'Medium', 'High', 'Critical'],
        urgentProtection: ['Yes', 'No', 'Under Assessment'],
        violenceType: ['Physical', 'Sexual', 'Psychological', 'Economic'],
        consent: ['Given', 'Pending', 'Refused'],
        policeStation: ['Gulberg PS', 'Sadar PS', 'Model Town PS', 'Defence PS'],
        ioAssigned: ['Inspector Jameel', 'SI Rehman', 'ASI Fatima', 'DSP Ahmed'],
        firNo: [`FIR-${202400 + caseIdx}`, 'Pending'],
        hospital: ['DHQ Hospital', 'Services Hospital', 'Jinnah Hospital'],
        platform: ['WhatsApp', 'Facebook', 'TikTok', 'Instagram', 'X (Twitter)'],
        takedownStatus: ['Requested', 'Completed', 'Rejected', 'Pending'],
        outcome: ['Convicted', 'Acquitted', 'Withdrawn', 'Pending'],
    };

    if (mockValues[field]) {
        return mockValues[field][caseIdx % mockValues[field].length];
    }
    return '';
};
