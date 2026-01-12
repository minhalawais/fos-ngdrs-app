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
// ============================================
// GBV STAGES (Physical, Sexual, Femicide, etc.)
// ============================================
// ============================================
// GBV STAGES (Physical, Sexual, Femicide, etc.)
// ============================================
export const GBV_STAGES = [
    {
        code: 'COMPLAINT_RECEIVED',
        name: 'Complaint Received',
        required: true,
        order: 1,
        description: 'The initial intake process involves the formal recording of the survivor’s grievance via multiple designated channels, including the 24/7 Helpline 1099, direct walk-ins at Women Protection Centers, or the NCSW Mobile App. During this stage, critical biodata is captured, the immediate nature of the threat is assessed, and a unique Case ID is generated for tracking throughout the judicial lifecycle.',
        fields: ['intakeChannel', 'reportingDate', 'survivorAge', 'disabilityStatus', 'perpetratorType']
    },
    {
        code: 'INITIAL_SCREENING',
        name: 'Initial Screening & Police Complaint Registration',
        required: true,
        order: 2,
        description: 'A comprehensive risk assessment is conducted to determine the severity and type of violence. If a criminal offense is identified, the complaint is formally routed to the relevant Police Station. This stage includes verifying jurisdiction, documenting the initial narrative, and ensuring immediate safety measures are activated for high-risk cases.',
        fields: ['riskLevel', 'urgentProtection', 'violenceType', 'incidentLocation', 'complaintNo', 'policeStation', 'referralType', 'recurrence', 'previousIncidents']
    },
    {
        code: 'MEDICAL_EXAM',
        name: 'Medical Examination & Evidence Recording',
        required: true,
        order: 3,
        description: 'The survivor is referred to a Gazetted Medical Officer for a detailed Medico-Legal Examination (MLC). The MLO records all visible and non-visible injuries, collects forensic samples for DNA analysis, and documents the physical state of the survivor. Concurrently, a statement under Section 161 (Police) or 164 (Magistrate) CrPC is recorded to preserve the testimony.',
        fields: ['hospital', 'examDate', 'mloName', 'dnaReport', 's164Statement', 'evidenceType']
    },
    {
        code: 'FIR_REGISTERED',
        name: 'FIR Registration',
        required: true,
        order: 4,
        description: 'Based on the complaint and corroborating medical evidence, a First Information Report (FIR) is formally registered under the relevant sections of the Pakistan Penal Code (PPC). This marks the official commencement of the criminal investigation, where specific legal charges are levied against the accused.',
        fields: ['firNo', 'firDate', 'sections', 'legalSections', 'firCopy']
    },
    {
        code: 'INVESTIGATION_CHARGE',
        name: 'Investigation & Charge Sheet',
        required: true,
        order: 5,
        description: 'The Investigation Officer (IO) conducts a thorough inquiry, which includes visiting the crime scene, securing forensic evidence, and recording statements from witnesses. Upon completion, a final report (Challan/Charge Sheet) is submitted to the court, detailing the findings and the evidence arrayed against the accused for trial.',
        fields: ['ioAssigned', 'chargeSheetDate', 'prosecutor', 'evidenceUsability', 'policeResponseTime']
    },
    {
        code: 'ARREST_REMAND',
        name: 'Arrest & Judicial Remand',
        required: true,
        order: 6,
        description: 'Following the FIR and initial investigation, the accused is apprehended. The police present the custody to the Magistrate for physical or judicial remand. This period is crucial for recoveries (e.g., weapon of offense) and further interrogation before the accused is sent to judicial lock-up pending trial.',
        fields: ['arrestDate', 'remandType', 'remandDuration', 'jailLocation', 'bailStatus']
    },
    {
        code: 'DISPOSAL_JUDGMENT',
        name: 'Disposal & Judgment (Convicted)',
        required: true,
        order: 7,
        description: 'The court concludes the trial after hearing arguments from both prosecution and defense. A final judgment is pronounced based on the strength of evidence and witness cross-examination. In a conviction scenario, the specific sentence (imprisonment/fine) is recorded, and the case file is marked as "Disposed - Convicted" in the central registry.',
        fields: ['outcome', 'judgmentDate', 'judgeName', 'shortOrder', 'sentenceDetail']
    },
];

// ============================================
// TFGBV STAGES (Digital Violence) - MAPPED TO SAME STRUCTURE FOR CONSISTENCY
// ============================================
export const TFGBV_STAGES = [
    {
        code: 'COMPLAINT_RECEIVED',
        name: 'Complaint Received',
        required: true,
        order: 1,
        description: 'Digital abuse incidents are reported through the Cyber Harassment Helpline or the NCSW Online Portal. The intake officer meticulously verifies the jurisdiction and nature of the digital threat (e.g., non-consensual image sharing, cyberstalking) and assigns a specialized tracking number.',
        fields: ['intakeChannel', 'reportingDate', 'survivorAge', 'disabilityStatus', 'perpetratorType']
    },
    {
        code: 'INITIAL_SCREENING',
        name: 'Initial Screening & Police Complaint Registration',
        required: true,
        order: 2,
        description: 'The reported content is assessed for violations under the Prevention of Electronic Crimes Act (PECA). High-priority cases involving immediate threats or leakage of intimate material are flagged for urgent processing. The complaint is formally forwarded to the FIA Cyber Crime Wing for technical verification.',
        fields: ['riskLevel', 'urgentProtection', 'tfgbvType', 'incidentLocation', 'platformComplaintNo', 'reportingUnit', 'referralType']
    },
    {
        code: 'MEDICAL_EXAM',
        name: 'Medical Examination & Evidence Recording',
        required: true,
        order: 3,
        description: 'Technical teams preserve digital evidence using forensic imaging tools to ensure integrity. This includes capturing hash values, verified screenshots, URL logs, and metadata analysis. In parallel, if psychological trauma is evident, a psychosocial impact assessment is documented to support the case.',
        fields: ['screenshots', 'urls', 'metadata', 'hashCopies', 'forensicForensics']
    },
    {
        code: 'FIR_REGISTERED',
        name: 'FIR Registration',
        required: true,
        order: 4,
        description: 'A formal FIR is registered under the PECA 2016 Act after preliminary enquiry establishes a cognizable offense. Relevant sections (e.g., Sec 20 for dignity, Sec 21 for cyberstalking) are applied, and the legal framework for prosecution is established.',
        fields: ['firNo', 'firDate', 'sections', 'legalSections', 'firCopy']
    },
    {
        code: 'INVESTIGATION_CHARGE',
        name: 'Investigation & Charge Sheet',
        required: true,
        order: 5,
        description: 'FIA Investigators compile a comprehensive technical report linking the digital footprint to the perpetrator. Platform takedown requests are processed to remove harmful content. The final Challan, supported by the forensic analysis report, is submitted to the Cyber Crime Court.',
        fields: ['officerAssigned', 'reportNo', 'takedownStatus', 'platformEvidence', 'chargeSheetDate']
    },
    {
        code: 'ARREST_REMAND',
        name: 'Arrest & Judicial Remand',
        required: true,
        order: 6,
        description: 'The accused linked to the digital crime is arrested, and their devices are confiscated for forensic analysis. The court grants remand to allow investigators to recover deleted data or access secure accounts, ensuring all digital trails are secured before the trial begins.',
        fields: ['arrestDate', 'remandType', 'remandDuration', 'jailLocation', 'bailStatus']
    },
    {
        code: 'DISPOSAL_JUDGMENT',
        name: 'Disposal & Judgment (Convicted)',
        required: true,
        order: 7,
        description: 'The Cyber Court delivers its verdict after evaluating technical evidence and forensic reports. Penalties, including imprisonment and heavy fines as stipulated in PECA, are awarded. The case is detailed in the National Cybercrime Registry as a conviction.',
        fields: ['outcome', 'judgmentDate', 'judgeName', 'shortOrder', 'sentenceDetail']
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
    reportingDate: 'Reporting Date',
    survivorAge: 'Survivor Age Group',
    disabilityStatus: 'Disability Status',
    perpetratorType: 'Perpetrator Type',
    riskLevel: 'Immediate Risk Level',
    urgentProtection: 'Urgent Protection Required',
    violenceType: 'Type of Violence',
    tfgbvType: 'TFGBV Sub-Type',
    consentForm: 'Complainant Consent (Form)',
    referralType: 'Initial Referral',
    recurrence: 'Recurrence Status',
    previousIncidents: 'Previous Incidents (Qty)',
    servicesRequired: 'Services Required',
    policeResponseTime: 'Police Response Time',
    policeStation: 'Police Station Name',
    ioAssigned: 'Inquiry Officer (IO)',
    complaintNo: 'Complaint Application No.',
    offenceType: 'Offence Type',
    incidentLocation: 'Incident Location Type',
    firNo: 'FIR Number',
    firDate: 'Date of FIR',
    sections: 'PPC / PECA Sections',
    legalSections: 'Applicable Legal Sections',
    firCopy: 'FIR Copy Status',
    hospital: 'Hospital Name',
    examDate: 'Medical Examination Date',
    mloName: 'MLO Name (Verified)',
    dnaReport: 'DNA Report Status',
    s164Statement: 's.164 CPRC (Statement)',
    arrestDate: 'Arrest Date',
    evidenceType: 'Key Evidence Type',
    chargeSheetDate: 'Charge Sheet Submission',
    prosecutor: 'Assigned Prosecutor',
    evidenceUsability: 'Evidence Accepted by Court',
    remandType: 'Remand Type (Physical/Judicial)',
    remandDuration: 'Remand Duration (Days)',
    jailLocation: 'Judicial Custody Location',
    bailStatus: 'Bail Status / Outcome',
    outcome: 'Final Case Outcome',
    judgmentDate: 'Date of Final Decision',
    judgeName: 'Decided By (Presiding Judge)',
    shortOrder: 'Final Short Order',
    sentenceDetail: 'Sentence Details (if Convicted)',
    screenshots: 'Screenshots Captured (Qty)',
    urls: 'URLs/Links (Verified)',
    metadata: 'Metadata Extracted',
    hashCopies: 'Hash Copies Generated',
    platformComplaintNo: 'Platform Complaint No.',
    reportingUnit: 'Cyber Crime Reporting Unit',
    reportNo: 'Forensic Report Number',
    officerAssigned: 'Cyber Officer Assigned',
    forensicForensics: 'Digital Forensic Status',
    platform: 'Online Platform',
    requestDate: 'Takedown Request Date',
    responseTime: 'Platform Response Time',
    takedownStatus: 'Content Removal Status',
    platformEvidence: 'Platform Response Evidence',
    court: 'Trial Court Name',
    judge: 'Special Court Judge',
    hearingDates: 'Major Hearing Dates',
    crossBorderRequest: 'MLAT / Cross-Border Request',
    mlatStatus: 'MLAT Execution Status',
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
    const gbvCodes = ['GB-PH (Physical)', 'GB-SX (Sexual)', 'GB-FE (Femicide)', 'GB-EC (Economic)'];
    const tfgbvCodes = ['TF-A1 (Image Abuse)', 'TF-A2 (Stalking)', 'TF-A3 (Extortion)', 'TF-A4 (Deepfake)'];

    return Array.from({ length: 15 }).map((_, i) => {
        const caseType = i === 0 ? 'GBV' : (caseTypes[i % 2]); // First case is always the Ideal Case
        const crimeCode = caseType === 'GBV' ? gbvCodes[i % gbvCodes.length] : tfgbvCodes[i % tfgbvCodes.length];
        const stages = caseType === 'TFGBV' ? TFGBV_STAGES : GBV_STAGES;

        // Force first case to be "Convicted" (Ideal Path)
        const isIdeal = i === 0;

        // Generate timeline with all 8 stages
        const timeline = stages.map((stage, idx) => {
            const isCompleted = isIdeal || idx < 3 + (i % 4);
            const isInProgress = !isIdeal && idx === 3 + (i % 4);

            // Calculate a logical base date for this stage (roughly 2-3 days apart)
            const stageBaseDate = new Date(2024, 0, 10 + (idx * 2));
            const dateStr = stageBaseDate.toISOString().split('T')[0];

            return {
                id: `stage-${i}-${idx}`,
                stageCode: stage.code,
                stage: stage.name,
                description: (stage as any).description,
                status: isCompleted ? 'Completed' : (isInProgress ? 'In Progress' : 'Pending'),
                date: isCompleted ? dateStr : 'N/A',
                order: stage.order,
                details: stage.fields.reduce((acc, field) => {
                    let val = getMockFieldValue(field, i, idx);

                    // Force internal date fields to be logically consistent with the stage date
                    if (field.toLowerCase().includes('date') && field !== 'reportingDate') {
                        // For fields like firDate, examDate, etc., use the stage date or offset it slightly
                        const fieldDate = new Date(stageBaseDate);
                        if (field === 'firDate' || field === 'examDate' || field === 'arrestDate') {
                            fieldDate.setDate(fieldDate.getDate() + 1); // FIR usually 1 day after stage start in this mock
                        }
                        val = fieldDate.toISOString().split('T')[0];
                    } else if (field === 'reportingDate') {
                        // Reporting date should match the first stage date
                        val = '2024-01-10';
                    }

                    return { ...acc, [field]: val };
                }, {}),
                attachments: isCompleted ? [
                    { name: `${stage.name} Document.pdf`, type: 'pdf', url: '#' },
                    { name: `Evidence_Snapshot_${idx + 1}.jpg`, type: 'image', url: '#' }
                ] : []
            };
        });

        return {
            id: generateCaseId(caseType, 100 + i),
            caseId: generateCaseId(caseType, 100 + i),
            caseType,
            crimeCode,
            survivor: isIdeal ? 'Ayesha Bibi' : ['Fatima Z.', 'Saima K.', 'Anonymous', 'Zainab M.'][i % 4],
            date: `2024-01-10`,
            category: caseType === 'GBV' ? ['Physical', 'Sexual', 'Femicide', 'Economic'][i % 4] : 'TFGBV',
            status: isIdeal ? 'Convicted' : (i % 3 === 0 ? 'FIR Registered' : (i % 2 === 0 ? 'Investigation' : 'Reported')),
            risk: isIdeal ? 'Critical' : ['Low', 'Medium', 'High', 'Critical'][i % 4],
            lastUpdate: `${i + 2} days ago`,
            completeness: isIdeal ? 100 : 40 + (i * 10) % 60,
            province: 'Punjab',
            district: 'Lahore',
            timeline
        };
    });
};

// Helper to generate realistic mock field values
const getMockFieldValue = (field: string, caseIdx: number, stageIdx: number): string => {
    const mockValues: Record<string, string[]> = {
        intakeChannel: ['Police Station (Direct)', 'Women Protection Center (WPC)', 'National Helpline 1099', 'Punjab Police Pakistan App'],
        reportingDate: ['2023-12-05', '2024-01-02', '2024-01-10'],
        survivorAge: ['Adult (25-40)', 'Youth (18-24)', 'Minor (under 18)', 'Senior (60+)'],
        disabilityStatus: ['None', 'Physical Disability', 'Speech/Hearing Impaired', 'Not Disclosed'],
        perpetratorType: ['Intimate Partner', 'Family Member', 'Acquaintance', 'Stranger', 'Employer'],
        riskLevel: ['Critical (Immediate Intervention)', 'High Risk', 'Medium', 'Low'],
        urgentProtection: ['Yes - Shelter Provided', 'Yes - Protection Order Issued', 'No - Survivor in Safe Location'],
        violenceType: ['Physical Abuse (PPC 324)', 'Sexual Assault (PPC 376)', 'Domestic Violence', 'Acid Attack (PPC 336B)'],
        tfgbvType: ['Cyberstalking (PECA 24)', 'Non-consensual Image Sharing (PECA 21)', 'Deepfake Content', 'Online Harassment'],
        consentForm: ['Signed & Witnessed', 'Digital Consent Recorded', 'Pending Verification'],
        referralType: ['Medical/Forensic', 'Shelter/Safe Home', 'Legal Aid Services'],
        recurrence: ['First Incident', 'Repeat Offence', 'Escalating Violence', 'Chronic History'],
        previousIncidents: ['0', '1', '2', '3+'],
        servicesRequired: ['Medical, Psychosocial', 'Legal Aid, Shelter', 'Medical, Legal, Digital Forensics', 'Psychosocial Only'],
        policeResponseTime: ['< 30 Mins', '1-2 Hours', '24 Hours', '> 48 Hours'],
        policeStation: ['Civil Lines PS', 'Sadar PS', 'Model Town PS', 'Defence PS', 'Women PS Lahore'],
        ioAssigned: ['Inspector Muhammad Sharif', 'SI Nasir Ahmed', 'ASI Amna Khan', 'SI Rabia Zafar'],
        complaintNo: [`APP-2024-${1000 + caseIdx}`, `REG-PB-${2000 + caseIdx}`],
        offenceType: ['PPC 324 / 354', 'PPC 376 / 506', 'PECA 2016 Sec 21'],
        incidentLocation: ['Residence', 'Public Space', 'Workplace', 'Online Platform'],
        firNo: [`FIR-${2024}-${300 + caseIdx}`, 'FIR-LHR-2024-045'],
        firDate: ['2024-01-05', '2024-01-12', '2024-01-18'],
        sections: ['PPC 376, 506-II', 'PPC 324, 337-A', 'PECA 21, 24'],
        legalSections: ['PPC 376/506', 'PPC 324', 'PECA 2016'],
        firCopy: ['Uploaded - Digital Scan', 'Certified Copy in File'],
        hospital: ['Mayo Hospital Lahore', 'Jinnah Hospital', 'General Hospital'],
        examDate: ['2024-01-06', '2024-01-13', '2024-01-19'],
        mloName: ['Dr. Fatima Aziz (WMLO)', 'Dr. Sarah Ahmed', 'Dr. Noreen Malik'],
        dnaReport: ['Collected - Sent to Forensic Lab', 'Report Received - Positive Match', 'Pending'],
        s164Statement: ['Recorded before Magistrate', 'Scheduled for 2024-01-25', 'N/A'],
        arrestDate: ['2024-01-10', '2024-01-20', '2024-01-28'],
        evidenceType: ['Medical Report + Witness Testimony', 'Digital Forensic Metadata', 'CCTV Footage + DNA'],
        chargeSheetDate: ['2024-01-25', '2024-02-05', 'Pending'],
        prosecutor: ['Adv. Usman Ali', 'Adv. Mehak Sheikh', 'Adv. Khalid Mansoor'],
        evidenceUsability: ['Accepted by Trial Court', 'Under Judicial Review', 'Challenged by Defence'],
        remandType: ['Judicial Remand', 'Physical Remand (3 Days)', 'Physical Remand (7 Days)'],
        remandDuration: ['14 Days', '3 Days', '7 Days'],
        jailLocation: ['Central Jail Kot Lakhpat', 'Camp Jail Lahore', 'District Jail'],
        bailStatus: ['Bail Rejected', 'Bail Postponed', 'In Custody'],
        outcome: ['Convicted - 10 Years Imprisonment', 'Convicted - Life Sentence', 'Case in Trial'],
        judgmentDate: ['2024-02-15', '2024-03-01', 'Pending'],
        judgeName: ['Mr. Muhammad Sharif, ASJ', 'Justice Nasir Saeed', 'Ms. Rabia Ahmed, Magistrate'],
        shortOrder: ['Conviction Awarded under Sec 376', 'Life Imprisonment + Fine', 'Rigorous Imprisonment'],
        sentenceDetail: ['10 Years + PKR 100,000 Fine', 'Life Imprisonment', '7 Years'],
        screenshots: ['15 Verified Screenshots', '8 Screenshots with Hash', '24 Digital Captures'],
        urls: ['3 Active Links Documented', 'Archive.is links saved'],
        metadata: ['EXIF Data Extracted', 'IP Logs Verified', 'Device ID Matched'],
        hashCopies: ['SHA-256 Hashes Generated', 'Forensic Image Created'],
        platformComplaintNo: [`TKD-FB-2024-${500 + caseIdx}`, `TKT-2401-${caseIdx}`],
        reportingUnit: ['Cyber Crime Wing (CCW) Lahore', 'FIA Karachi Unit'],
        reportNo: [`FORENSIC-${2024}-${100 + caseIdx}`, 'FIA-RPT-089'],
        officerAssigned: ['SI Bilal Ahmed (Cyber)', 'Inspector Sana Khan'],
        forensicForensics: ['Analysis Completed', 'Device in Lab', 'Report Signed'],
        platform: ['Facebook / Meta', 'TikTok / ByteDance', 'WhatsApp', 'X (Twitter)', 'Instagram'],
        requestDate: ['2024-01-05', '2024-01-10'],
        responseTime: ['6 Hours', '24 Hours', '72 Hours'],
        takedownStatus: ['Content Removed Successfully', 'Request Sent - Pending', 'Rejected by Platform'],
        platformEvidence: ['Email Confirmation from Platform', 'Dashboard Screenshot'],
        court: ['Special Court (Anti-Rape)', 'Session Court Lahore', 'Cyber Crime Court'],
        judge: ['Mr. Justice Ali Khan', 'Ms. Justice Sarah Bibi'],
        hearingDates: ['2024-02-01, 2024-02-10', '2024-02-15'],
        crossBorderRequest: ['Required - MLAT Prepared', 'Not Required', 'MLAT Sent to US'],
        mlatStatus: ['Awaiting US Dept of Justice Response', 'Execution Completed', 'N/A'],
    };

    if (mockValues[field]) {
        return mockValues[field][caseIdx % mockValues[field].length];
    }
    return '';
};
