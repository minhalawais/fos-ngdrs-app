"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ClipboardCheck,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Send,
    Eye,
    RotateCcw,
    FileText,
    Clock,
    Flag,
    Search,
    ChevronDown,
    ChevronUp,
    X,
    User,
    Shield,
    Stethoscope,
    Scale,
    Gavel,
    Smartphone,
    MapPin,
    Plus,
    RefreshCw,
    ArrowLeft,
    FileWarning,
    Database,
    BookOpen,
    Megaphone,
    Target,
    BarChart,
    Calendar,
    DollarSign,
    Users
} from "lucide-react";
import {
    generateProvincialSubmissions,
    generateDataUpdateRequests,
    generateCaseProgressRequests,
    generateIndicatorSubmissions,
    generatePreventionSubmissions,
    generateAwarenessSubmissions,
    INDICATOR_CATEGORIES
} from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const submissions = generateProvincialSubmissions();
const updateRequests = generateDataUpdateRequests();
const initialCaseRequests = generateCaseProgressRequests();
const initialIndicators = generateIndicatorSubmissions();
const initialPrevention = generatePreventionSubmissions();
const initialAwareness = generateAwarenessSubmissions();

// Generate mock data for different tabs
const generateNewCaseRequests = () => initialCaseRequests.filter(c => c.status === 'Pending Review').slice(0, 10);
const generateReturnedCases = () => initialCaseRequests.filter(c => c.status === 'Returned' || c.status === 'Needs Clarification');

const STATUS_STYLES: Record<string, string> = {
    'Pending': 'bg-gray-100 text-gray-700 border-gray-200',
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Verified': 'bg-green-50 text-green-700 border-green-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Needs Clarification': 'bg-orange-50 text-orange-700 border-orange-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
    'Awaiting Data': 'bg-purple-50 text-purple-700 border-purple-200',
};

const STAGE_ICONS: Record<string, any> = {
    'COMPLAINT_RECEIVED': User,
    'INITIAL_SCREENING': Shield,
    'FIR_REGISTERED': FileText,
    'MEDICAL_EXAM': Stethoscope,
    'INVESTIGATION': Scale,
    'DISPOSAL': Gavel,
    'PLATFORM_TAKEDOWN': Smartphone,
};

const FIELD_LABELS: Record<string, string> = {
    receivedBy: 'Received By',
    channel: 'Channel',
    urgency: 'Urgency',
    screeningOfficer: 'Screening Officer',
    riskAssessment: 'Risk Assessment',
    immediateNeeds: 'Immediate Needs',
    firNumber: 'FIR Number',
    policeStation: 'Police Station',
    ioName: 'Investigation Officer',
    sections: 'Legal Sections',
    hospital: 'Hospital',
    wmlo: 'WMLO',
    reportSubmitted: 'Report Submitted',
    chargeSheet: 'Charge Sheet',
    courtName: 'Court Name',
    hearings: 'Hearings',
    outcome: 'Outcome',
    platform: 'Platform',
    requestId: 'Request ID',
    status: 'Status',
    responseTime: 'Response Time',
};

type TabType = 'progress' | 'new' | 'returned' | 'data-update';

const TABS = [
    { id: 'progress' as TabType, label: 'Case Progress Requests', icon: Clock, color: 'brand-teal' },
    { id: 'new' as TabType, label: 'New Case Requests', icon: Plus, color: 'green-500' },
    { id: 'returned' as TabType, label: 'Returned Cases', icon: ArrowLeft, color: 'orange-500' },
    { id: 'data-update' as TabType, label: 'Data Update Requests', icon: FileWarning, color: 'purple-500' },
];

export default function ProvincialSubmissionsPage() {
    const [caseRequests, setCaseRequests] = useState(initialCaseRequests);
    const [indicatorSubmissions, setIndicatorSubmissions] = useState(initialIndicators);
    const [preventionSubmissions, setPreventionSubmissions] = useState(initialPrevention);
    const [awarenessSubmissions, setAwarenessSubmissions] = useState(initialAwareness);

    // Modal State
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalType, setModalType] = useState<'case' | 'indicator' | 'prevention' | 'awareness' | null>(null);

    const [activeTab, setActiveTab] = useState<TabType>('progress');
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedStages, setExpandedStages] = useState<string[]>([]);

    // Collapsible Sections State
    const [sectionsOpen, setSectionsOpen] = useState({
        cases: true,
        indicators: true,
        prevention: true,
        awareness: true
    });

    const toggleSection = (section: keyof typeof sectionsOpen) => {
        setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Filter data based on active tab (for Cases only)
    const getTabCaseData = () => {
        switch (activeTab) {
            case 'new': return caseRequests.filter(c => c.status === 'Pending Review');
            case 'returned': return caseRequests.filter(c => c.status === 'Returned' || c.status === 'Needs Clarification');
            case 'data-update': return updateRequests;
            default: return caseRequests;
        }
    };

    const caseData = getTabCaseData();

    // Stats
    const progressCount = caseRequests.filter(c => c.status === 'Under Review' || c.status === 'Pending Review').length;
    const newCount = caseRequests.filter(c => c.status === 'Pending Review').length;
    const returnedCount = caseRequests.filter(c => c.status === 'Returned' || c.status === 'Needs Clarification').length;
    const dataUpdateCount = updateRequests.filter(r => r.status === 'Open').length;

    // Status Handlers
    const handleStatusChange = (id: string, newStatus: string, type: 'case' | 'indicator' | 'prevention' | 'awareness') => {
        if (type === 'case') {
            setCaseRequests(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        } else if (type === 'indicator') {
            setIndicatorSubmissions(prev => prev.map(i => i.id === id ? { ...i, status: newStatus } : i));
        } else if (type === 'prevention') {
            setPreventionSubmissions(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        } else if (type === 'awareness') {
            setAwarenessSubmissions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        }
        setSelectedItem(null);
        setModalType(null);
    };

    const toggleStageExpand = (stageId: string) => {
        setExpandedStages(prev => prev.includes(stageId) ? prev.filter(id => id !== stageId) : [...prev, stageId]);
    };

    const openModal = (item: any, type: 'case' | 'indicator' | 'prevention' | 'awareness') => {
        setSelectedItem(item);
        setModalType(type);
        if (type === 'case') {
            setExpandedStages([item.timeline[0]?.id]);
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <ClipboardCheck className="text-brand-teal" size={28} />
                        Provincial Submissions
                    </h1>
                    <p className="text-sm text-brand-teal">Review case submissions, manage requests, and track data updates</p>
                </div>
                <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2">
                    <Send size={16} /> Publish All Approved
                </button>
            </div>

            {/* SECTION 1: CASES SUBMISSION */}
            <div className="bg-white rounded-3xl border border-brand-surface shadow-sm overflow-hidden">
                <div
                    className="p-6 border-b border-brand-surface flex justify-between items-center bg-gray-50/50 cursor-pointer"
                    onClick={() => toggleSection('cases')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                            <Scale size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-brand-dark">Case Submissions</h2>
                            <p className="text-xs text-gray-500">Manage individual GBV and TFGBV case files</p>
                        </div>
                    </div>
                    {sectionsOpen.cases ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                {sectionsOpen.cases && (
                    <div className="p-6 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { id: 'progress', label: 'In Progress', count: progressCount, icon: Clock, color: 'text-brand-teal', bg: 'bg-brand-surface/50', border: 'border-brand-teal' },
                                { id: 'new', label: 'New Requests', count: newCount, icon: Plus, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-500' },
                                { id: 'returned', label: 'Returned', count: returnedCount, icon: ArrowLeft, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-500' },
                                { id: 'data-update', label: 'Data Updates', count: dataUpdateCount, icon: FileWarning, color: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-500' },
                            ].map((stat) => (
                                <div
                                    key={stat.id}
                                    className={clsx(
                                        "rounded-2xl border p-4 shadow-sm cursor-pointer transition-all hover:shadow-md",
                                        activeTab === stat.id ? `${stat.border} ring-2 ring-opacity-20` : "border-brand-surface"
                                    )}
                                    onClick={() => setActiveTab(stat.id as TabType)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", stat.bg)}>
                                            <stat.icon size={20} className={stat.color} />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-brand-dark">{stat.count}</p>
                                            <p className="text-xs text-gray-500">{stat.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Cases Table */}
                        <div className="rounded-2xl border border-brand-surface overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Case ID</th>
                                        <th className="px-6 py-4">Province / District</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Submitted</th>
                                        {activeTab !== 'data-update' && <th className="px-6 py-4">Completeness</th>}
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-surface">
                                    {activeTab === 'data-update' ? (
                                        (caseData as typeof updateRequests).map((req) => (
                                            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{req.caseId}</td>
                                                <td className="px-6 py-4">
                                                    <div><span className="font-bold text-brand-dark">{req.province}</span><p className="text-xs text-gray-400">{req.district}</p></div>
                                                </td>
                                                <td className="px-6 py-4" colSpan={2}><span className="text-sm text-gray-600">{req.issue}</span></td>
                                                <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700">{req.status}</span></td>
                                                <td className="px-6 py-4 text-right"><button className="text-brand-teal font-bold text-xs hover:underline">Review Update</button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        (caseData as typeof caseRequests).map((c) => (
                                            <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{c.caseId}</td>
                                                <td className="px-6 py-4">
                                                    <div><span className="font-bold text-brand-dark">{c.province}</span><p className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} /> {c.district}</p></div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", c.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700")}>{c.caseType}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{c.submittedOn}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                            <div className={clsx("h-full rounded-full", c.completeness >= 90 ? "bg-green-500" : c.completeness >= 70 ? "bg-yellow-500" : "bg-red-500")} style={{ width: `${c.completeness}%` }} />
                                                        </div>
                                                        <span className="text-xs font-medium">{c.completeness}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[c.status] || "bg-gray-100")}>{c.status}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button onClick={() => openModal(c, 'case')} className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"><Eye size={16} /></button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* SECTION 2: PROCESS INDICATORS SUBMISSION */}
            <div className="bg-white rounded-3xl border border-brand-surface shadow-sm overflow-hidden">
                <div
                    className="p-6 border-b border-brand-surface flex justify-between items-center bg-gray-50/50 cursor-pointer"
                    onClick={() => toggleSection('indicators')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <Database size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-brand-dark">Process Indicators Submission</h2>
                            <p className="text-xs text-gray-500">Track implementation of standard operating procedures and laws</p>
                        </div>
                    </div>
                    {sectionsOpen.indicators ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                {sectionsOpen.indicators && (
                    <div className="p-6">
                        <div className="rounded-2xl border border-brand-surface overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Indicator Name</th>
                                        <th className="px-6 py-4">Province / District</th>
                                        <th className="px-6 py-4">Value</th>
                                        <th className="px-6 py-4">Target</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-surface">
                                    {indicatorSubmissions.map((ind) => (
                                        <tr key={ind.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">{ind.id}</td>
                                            <td className="px-6 py-4"><span className="font-medium text-brand-dark block max-w-xs">{ind.indicatorName}</span><span className="text-xs text-gray-400">{ind.category}</span></td>
                                            <td className="px-6 py-4">
                                                <div><span className="font-bold text-brand-dark">{ind.province}</span><p className="text-xs text-gray-400">{ind.district}</p></div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-brand-dark">{ind.currentValue} <span className="text-xs font-normal text-gray-500">{ind.unit}</span></td>
                                            <td className="px-6 py-4 text-gray-500">{ind.targetValue} {ind.unit}</td>
                                            <td className="px-6 py-4"><span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[ind.status] || "bg-gray-100")}>{ind.status}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => openModal(ind, 'indicator')} className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"><Eye size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* SECTION 3: PREVENTION SUBMISSION */}
            <div className="bg-white rounded-3xl border border-brand-surface shadow-sm overflow-hidden">
                <div
                    className="p-6 border-b border-brand-surface flex justify-between items-center bg-gray-50/50 cursor-pointer"
                    onClick={() => toggleSection('prevention')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Shield size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-brand-dark">Prevention Submission</h2>
                            <p className="text-xs text-gray-500">Review community programs, training, and strategic initiatives</p>
                        </div>
                    </div>
                    {sectionsOpen.prevention ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                {sectionsOpen.prevention && (
                    <div className="p-6">
                        <div className="rounded-2xl border border-brand-surface overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Program Title</th>
                                        <th className="px-6 py-4">Province / District</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Beneficiaries</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-surface">
                                    {preventionSubmissions.map((prev) => (
                                        <tr key={prev.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">{prev.id}</td>
                                            <td className="px-6 py-4"><span className="font-medium text-brand-dark block max-w-xs truncate">{prev.title}</span></td>
                                            <td className="px-6 py-4">
                                                <div><span className="font-bold text-brand-dark">{prev.province}</span><p className="text-xs text-gray-400">{prev.district}</p></div>
                                            </td>
                                            <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600 uppercase">{prev.type.split(' ')[0]}</span></td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{prev.targetBeneficiaries.toLocaleString()}</td>
                                            <td className="px-6 py-4"><span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[prev.status] || "bg-gray-100")}>{prev.status}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => openModal(prev, 'prevention')} className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"><Eye size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* SECTION 4: AWARENESS SUBMISSION */}
            <div className="bg-white rounded-3xl border border-brand-surface shadow-sm overflow-hidden">
                <div
                    className="p-6 border-b border-brand-surface flex justify-between items-center bg-gray-50/50 cursor-pointer"
                    onClick={() => toggleSection('awareness')}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-brand-dark">Awareness Submission</h2>
                            <p className="text-xs text-gray-500">Review media campaigns, public service announcements, and events</p>
                        </div>
                    </div>
                    {sectionsOpen.awareness ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                </div>

                {sectionsOpen.awareness && (
                    <div className="p-6">
                        <div className="rounded-2xl border border-brand-surface overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Campaign Title</th>
                                        <th className="px-6 py-4">Province / District</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Est. Reach</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-surface">
                                    {awarenessSubmissions.map((awr) => (
                                        <tr key={awr.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">{awr.id}</td>
                                            <td className="px-6 py-4"><span className="font-medium text-brand-dark block max-w-xs truncate">{awr.title}</span></td>
                                            <td className="px-6 py-4">
                                                <div><span className="font-bold text-brand-dark">{awr.province}</span><p className="text-xs text-gray-400">{awr.district}</p></div>
                                            </td>
                                            <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-50 text-orange-600 uppercase">{awr.type.split(' ')[0]}</span></td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{awr.reachEstimate.toLocaleString()}</td>
                                            <td className="px-6 py-4"><span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[awr.status] || "bg-gray-100")}>{awr.status}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => openModal(awr, 'awareness')} className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"><Eye size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* UNIFIED MODAL */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full max-w-3xl bg-white shadow-2xl h-full flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 bg-brand-surface/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                                            <span className="px-2.5 py-1 bg-brand-dark text-white text-xs font-bold rounded-lg tracking-wider font-mono">{selectedItem.id || selectedItem.caseId}</span>
                                            <span className={clsx("px-2.5 py-1 rounded-lg text-xs font-bold border", STATUS_STYLES[selectedItem.status])}>{selectedItem.status}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-brand-dark">
                                            {modalType === 'case' ? 'Case Timeline & Progress' :
                                                modalType === 'indicator' ? selectedItem.indicatorName :
                                                    selectedItem.title}
                                        </h2>
                                        <p className="text-sm text-brand-teal">{selectedItem.province} • {selectedItem.district} • {modalType === 'case' ? selectedItem.category : (selectedItem.type || selectedItem.category)}</p>
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={20} /></button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-brand-canvas space-y-6">
                                {/* CONTENT FOR CASES */}
                                {modalType === 'case' && (
                                    <div className="space-y-4">
                                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                                            <h3 className="font-bold text-brand-dark mb-4">Case Progression</h3>
                                            {selectedItem.timeline.map((stage: any, idx: number) => {
                                                const Icon = STAGE_ICONS[stage.stageCode] || FileText;
                                                const isCompleted = stage.status === 'Completed';
                                                const isExpanded = expandedStages.includes(stage.id);
                                                return (
                                                    <div key={stage.id} className="relative pl-12 mb-4">
                                                        {idx !== selectedItem.timeline.length - 1 && <div className={clsx("absolute left-[23px] top-12 bottom-[-24px] w-0.5", isCompleted ? "bg-brand-teal" : "bg-gray-200")} />}
                                                        <div className={clsx("absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all z-10 shadow-sm", isCompleted ? "bg-brand-teal border-white text-white" : "bg-white border-gray-200 text-gray-300")}><Icon size={20} /></div>
                                                        <div className={clsx("bg-white rounded-xl border transition-all shadow-sm overflow-hidden", isCompleted ? "border-brand-teal/30" : "border-gray-200")}>
                                                            <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50" onClick={() => toggleStageExpand(stage.id)}>
                                                                <h4 className="font-bold text-sm">{stage.stage}</h4>
                                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                            </div>
                                                            {isExpanded && <div className="p-4 bg-gray-50 text-xs text-gray-600 grid grid-cols-2 gap-2">{Object.entries(stage.details).map(([k, v]) => <div key={k}><span className="font-bold block uppercase text-[10px] text-gray-400">{FIELD_LABELS[k] || k}</span>{v as string}</div>)}</div>}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* CONTENT FOR INDICATORS */}
                                {modalType === 'indicator' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                                                <p className="text-sm text-gray-500 mb-1">Current Value</p>
                                                <p className="text-3xl font-bold text-brand-dark">{selectedItem.currentValue}<span className="text-sm font-normal text-gray-400 ml-1">{selectedItem.unit}</span></p>
                                                <span className={clsx("text-xs font-bold flex items-center justify-center gap-1 mt-2", selectedItem.trend === 'up' ? "text-green-600" : "text-red-500")}>
                                                    {selectedItem.trend === 'up' ? '▲' : '▼'} vs Last Period
                                                </span>
                                            </div>
                                            <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                                                <p className="text-sm text-gray-500 mb-1">Target</p>
                                                <p className="text-3xl font-bold text-gray-400">{selectedItem.targetValue}<span className="text-sm font-normal text-gray-300 ml-1">{selectedItem.unit}</span></p>
                                                <p className="text-xs text-brand-teal mt-2">Progress: {Math.round((selectedItem.currentValue / selectedItem.targetValue) * 100)}%</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                                            <h3 className="font-bold text-brand-dark mb-3">Verification Details</h3>
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                                <div><span className="block text-xs font-bold text-gray-400 uppercase">Methodology</span>{selectedItem.details.methodology}</div>
                                                <div><span className="block text-xs font-bold text-gray-400 uppercase">Data Source</span>{selectedItem.details.dataSource}</div>
                                                <div><span className="block text-xs font-bold text-gray-400 uppercase">Verified By</span>{selectedItem.details.verifiedBy}</div>
                                                <div><span className="block text-xs font-bold text-gray-400 uppercase">Date</span>{selectedItem.details.verificationDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CONTENT FOR PREVENTION & AWARENESS */}
                                {(modalType === 'prevention' || modalType === 'awareness') && (
                                    <div className="space-y-6">
                                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                                            <h3 className="font-bold text-brand-dark mb-4">Program Overview</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{selectedItem.details.description}</p>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                                                    <span className="block text-xs font-bold text-gray-400 uppercase mb-1">{modalType === 'prevention' ? 'Beneficiaries' : 'Est. Reach'}</span>
                                                    <p className="font-mono font-bold text-brand-dark text-lg">{modalType === 'prevention' ? selectedItem.targetBeneficiaries?.toLocaleString() : selectedItem.reachEstimate?.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                                            <h3 className="font-bold text-brand-dark mb-4">Implementation Details</h3>
                                            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                                <div><span className="block text-xs font-bold text-gray-400 uppercase">Start Date</span>{selectedItem.startDate}</div>
                                                <div><span className="block text-xs font-bold text-gray-400 uppercase">End Date</span>{selectedItem.endDate}</div>
                                                <div className="col-span-2"><span className="block text-xs font-bold text-gray-400 uppercase">Agency</span>{selectedItem.details.implementing}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
                                {selectedItem.status !== 'Returned' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedItem.id, 'Returned', modalType!)}
                                        className="flex-1 py-3 bg-white border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        <XCircle size={18} /> Reject
                                    </button>
                                )}
                                <button
                                    onClick={() => handleStatusChange(selectedItem.id, 'Needs Clarification', modalType!)}
                                    className="flex-1 py-3 bg-white border border-orange-200 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw size={18} /> Request Info
                                </button>
                                {selectedItem.status !== 'Approved' && (
                                    <button
                                        onClick={() => handleStatusChange(selectedItem.id, 'Approved', modalType!)}
                                        className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-md"
                                    >
                                        <CheckCircle size={18} /> Approve
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
