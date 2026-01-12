/**
 * AI Summary Generator for Case Timeline
 * Generates a narrative storyline from case data
 */

import { FIELD_LABELS } from './district-mock-data';

interface CaseData {
    caseId: string;
    caseType: 'GBV' | 'TFGBV';
    crimeCode: string;
    survivor: string;
    date: string;
    category: string;
    status: string;
    risk: string;
    province: string;
    district: string;
    timeline: TimelineStage[];
}

interface TimelineStage {
    id: string;
    stageCode: string;
    stage: string;
    status: string;
    date: string;
    details: Record<string, string>;
}

/**
 * Extracts a field value from any stage in the timeline
 */
const getTimelineField = (timeline: TimelineStage[], key: string): string => {
    const foundStage = timeline.find(s => s.details && s.details[key]);
    return foundStage ? foundStage.details[key] : '';
};

/**
 * Gets the crime description based on crime code
 */
const getCrimeDescription = (crimeCode: string, caseType: string): string => {
    const descriptions: Record<string, string> = {
        'GB-PH (Physical)': 'physical violence and assault',
        'GB-SX (Sexual)': 'sexual assault',
        'GB-FE (Femicide)': 'attempted femicide',
        'GB-EC (Economic)': 'economic abuse and coercion',
        'TF-A1 (Image Abuse)': 'non-consensual intimate image sharing',
        'TF-A2 (Stalking)': 'cyberstalking and online harassment',
        'TF-A3 (Extortion)': 'digital extortion and blackmail',
        'TF-A4 (Deepfake)': 'deepfake content creation and distribution'
    };
    return descriptions[crimeCode] || (caseType === 'TFGBV' ? 'technology-facilitated violence' : 'gender-based violence');
};

/**
 * Gets perpetrator description
 */
const getPerpetratorDescription = (perpetratorType: string): string => {
    const descriptions: Record<string, string> = {
        'Intimate Partner': 'her intimate partner',
        'Family Member': 'a family member',
        'Acquaintance': 'an acquaintance',
        'Stranger': 'an unknown perpetrator',
        'Employer': 'her employer'
    };
    return descriptions[perpetratorType] || 'the accused';
};

/**
 * Generates a narrative AI summary from case data
 */
export function generateAISummary(caseData: CaseData): string {
    const { survivor, date, crimeCode, caseType, status, timeline, district } = caseData;

    // Extract key fields from timeline stages
    const intakeChannel = getTimelineField(timeline, 'intakeChannel');
    const perpetratorType = getTimelineField(timeline, 'perpetratorType');
    const violenceType = getTimelineField(timeline, 'violenceType') || getTimelineField(timeline, 'tfgbvType');
    const incidentLocation = getTimelineField(timeline, 'incidentLocation');
    const policeStation = getTimelineField(timeline, 'policeStation');
    const policeResponseTime = getTimelineField(timeline, 'policeResponseTime');
    const firNo = getTimelineField(timeline, 'firNo');
    const firDate = getTimelineField(timeline, 'firDate');
    const sections = getTimelineField(timeline, 'sections');
    const hospital = getTimelineField(timeline, 'hospital');
    const examDate = getTimelineField(timeline, 'examDate');
    const mloName = getTimelineField(timeline, 'mloName');
    const dnaReport = getTimelineField(timeline, 'dnaReport');
    const ioAssigned = getTimelineField(timeline, 'ioAssigned');
    const chargeSheetDate = getTimelineField(timeline, 'chargeSheetDate');
    const arrestDate = getTimelineField(timeline, 'arrestDate');
    const remandType = getTimelineField(timeline, 'remandType');
    const jailLocation = getTimelineField(timeline, 'jailLocation');
    const bailStatus = getTimelineField(timeline, 'bailStatus');
    const outcome = getTimelineField(timeline, 'outcome');
    const judgmentDate = getTimelineField(timeline, 'judgmentDate');
    const judgeName = getTimelineField(timeline, 'judgeName');
    const sentenceDetail = getTimelineField(timeline, 'sentenceDetail');
    const recurrence = getTimelineField(timeline, 'recurrence');
    const riskLevel = getTimelineField(timeline, 'riskLevel');

    // Build the narrative sections
    const narrativeParts: string[] = [];

    // Opening - Survivor's approach
    const crimeDesc = getCrimeDescription(crimeCode, caseType);
    const perpetratorDesc = getPerpetratorDescription(perpetratorType);

    const reportingLocation = intakeChannel
        ? intakeChannel
        : (policeStation ? policeStation : 'the local authorities');

    narrativeParts.push(
        `${survivor} approached ${reportingLocation} on ${date} to report a case of ${crimeDesc}.`
    );

    // Describe the incident
    if (perpetratorType || incidentLocation) {
        let incidentPart = 'The survivor reported that ';
        if (perpetratorType) {
            incidentPart += `${perpetratorDesc} `;
        }
        if (violenceType) {
            incidentPart += `perpetrated ${violenceType.toLowerCase()
                .replace('(ppc', 'under PPC')
                .replace('(peca', 'under PECA')
                .replace(')', '')} `;
        } else {
            incidentPart += 'committed the offense ';
        }
        if (incidentLocation) {
            incidentPart += `at ${incidentLocation.toLowerCase()}.`;
        } else {
            incidentPart += 'against her.';
        }
        narrativeParts.push(incidentPart);
    }

    // Risk and recurrence context
    if (riskLevel || recurrence) {
        let riskPart = '';
        if (riskLevel && riskLevel.toLowerCase().includes('critical')) {
            riskPart += 'The case was flagged as critical requiring immediate intervention. ';
        }
        if (recurrence && recurrence.toLowerCase().includes('repeat')) {
            riskPart += 'This was identified as a repeat offense with escalating pattern.';
        }
        if (riskPart) narrativeParts.push(riskPart.trim());
    }

    // Police Response
    if (policeResponseTime || firNo) {
        let policePart = 'Upon receiving the complaint, the authorities ';
        if (policeResponseTime) {
            if (policeResponseTime.includes('30')) {
                policePart += 'responded swiftly within 30 minutes. ';
            } else if (policeResponseTime.includes('1-2')) {
                policePart += 'responded within 1-2 hours. ';
            } else {
                policePart += `responded ${policeResponseTime.toLowerCase()}. `;
            }
        } else {
            policePart += 'initiated the appropriate legal procedures. ';
        }

        if (firNo) {
            policePart += `A First Information Report (${firNo}) was registered`;
            if (firDate) policePart += ` on ${firDate}`;
            if (sections) policePart += ` under sections ${sections}`;
            if (policeStation) policePart += ` at ${policeStation}`;
            policePart += '.';
        }
        narrativeParts.push(policePart);
    }

    // Medical Examination
    if (hospital || mloName) {
        let medicalPart = '';
        if (hospital) {
            medicalPart += `The survivor underwent a comprehensive medical examination at ${hospital}`;
            if (examDate) medicalPart += ` on ${examDate}`;
            medicalPart += '. ';
        }
        if (mloName) {
            medicalPart += `Dr. ${mloName.replace('Dr. ', '')} conducted the Medico-Legal examination and documented all forensic evidence. `;
        }
        if (dnaReport) {
            medicalPart += `DNA evidence status: ${dnaReport}.`;
        }
        if (medicalPart) narrativeParts.push(medicalPart.trim());
    }

    // Investigation
    if (ioAssigned || chargeSheetDate) {
        let investigationPart = '';
        if (ioAssigned) {
            investigationPart += `The case was assigned to ${ioAssigned} as the Investigation Officer, who conducted a thorough inquiry. `;
        }
        if (chargeSheetDate && chargeSheetDate !== 'Pending') {
            investigationPart += `A comprehensive charge sheet was submitted to the court on ${chargeSheetDate}.`;
        }
        if (investigationPart) narrativeParts.push(investigationPart.trim());
    }

    // Arrest & Remand
    if (arrestDate) {
        let arrestPart = `The accused was arrested on ${arrestDate}`;
        if (remandType) arrestPart += ` and placed under ${remandType}`;
        if (jailLocation) arrestPart += ` at ${jailLocation}`;
        arrestPart += '. ';
        if (bailStatus) arrestPart += `Bail status: ${bailStatus}.`;
        narrativeParts.push(arrestPart);
    }

    // Court Proceedings & Outcome
    if (outcome || judgmentDate) {
        let courtPart = '';
        if (judgeName) {
            courtPart += `The case was adjudicated by ${judgeName}. `;
        }
        if (outcome) {
            if (outcome.toLowerCase().includes('convicted')) {
                courtPart += `After thorough examination of evidence and witness testimonies, the court delivered a verdict of conviction. `;
                if (sentenceDetail) {
                    courtPart += `The accused was sentenced to ${sentenceDetail}.`;
                }
            } else if (outcome.toLowerCase().includes('trial')) {
                courtPart += 'The case is currently under trial proceedings.';
            } else {
                courtPart += `Case outcome: ${outcome}.`;
            }
        }
        if (courtPart) narrativeParts.push(courtPart.trim());
    }

    // Closing assessment
    const completedStages = timeline.filter(s => s.status === 'Completed').length;
    const totalStages = timeline.length;
    const progressPercent = Math.round((completedStages / totalStages) * 100);

    if (status === 'Convicted') {
        narrativeParts.push(
            `This case represents a successful prosecution with ${progressPercent}% process completion, demonstrating adherence to standard operating procedures throughout the judicial lifecycle.`
        );
    } else if (progressPercent < 50) {
        narrativeParts.push(
            `Currently at ${progressPercent}% progress, this case requires continued attention to ensure timely progression through remaining stages.`
        );
    } else {
        narrativeParts.push(
            `With ${progressPercent}% of the process completed, this case is progressing through the standard judicial pathway with consistent SOP adherence.`
        );
    }

    return narrativeParts.join(' ');
}

export default generateAISummary;
