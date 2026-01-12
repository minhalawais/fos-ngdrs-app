"use client";

import { useState } from "react";
import Link from 'next/link';
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
    BookOpen,
    Megaphone,
    Target,
    BarChart,
    Download,
    Calendar,
    DollarSign,
    Users,
    Activity
} from "lucide-react";
import {
    generateProvincialSubmissions,
    generateDataUpdateRequests,
    generateCaseProgressRequests,
    generatePreventionSubmissions,
    generateProtectionSubmissions,
    generateAwarenessSubmissions,
} from "@/lib/ncsw-mock-data";
import { FIELD_LABELS } from "@/lib/district-mock-data";
import { clsx } from "clsx";

const submissions = generateProvincialSubmissions();
const updateRequests = generateDataUpdateRequests();
const initialCaseRequests = generateCaseProgressRequests();
const initialPrevention = generatePreventionSubmissions();
const initialProtection = generateProtectionSubmissions();
const initialAwareness = generateAwarenessSubmissions();

// Brand Colors synced with National Dashboard
const BRAND_COLORS = {
    primary: "#1bd488",
    teal: "#45828b",
    dark: "#055b65",
    soft: "#b2c9c5",
    red: "#ef4444",
    amber: "#f59e0b",
    blue: "#3b82f6",
    purple: "#8b5cf6",
    surface: "#f8fafb"
};

const STATUS_STYLES: Record<string, string> = {
    'Pending': 'bg-gray-100 text-gray-700 border-gray-200',
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Verified': 'bg-green-50 text-green-700 border-green-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Needs Clarification': 'bg-amber-50 text-amber-700 border-amber-200',
    'Rejected': 'bg-red-50 text-red-700 border-red-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
    'Awaiting Data': 'bg-purple-50 text-purple-700 border-purple-200',
};

const getStageCategoryColor = (stageCode: string) => {
    switch (stageCode) {
        case 'COMPLAINT_RECEIVED':
        case 'INITIAL_SCREENING':
            return {
                bg: 'bg-blue-50',
                text: 'text-blue-600',
                border: 'border-blue-100',
                iconBg: 'bg-[#3b82f6]',
                glow: 'shadow-blue-500/20'
            };
        case 'FIR_REGISTERED':
        case 'CYBER_EVIDENCE':
        case 'INVESTIGATION':
            return {
                bg: 'bg-brand-surface/30',
                text: 'text-brand-teal',
                border: 'border-brand-soft/30',
                iconBg: 'bg-[#45828b]',
                glow: 'shadow-brand-teal/20'
            };
        case 'MEDICAL_EXAM':
        case 'FORENSIC_EVIDENCE':
            return {
                bg: 'bg-primary-50',
                text: 'text-primary-700',
                border: 'border-primary-100',
                iconBg: 'bg-[#1bd488]',
                glow: 'shadow-primary-500/20'
            };
        case 'TRIAL_PROSECUTION':
        case 'DISPOSAL_JUDGMENT':
            return {
                bg: 'bg-amber-50',
                text: 'text-amber-700',
                border: 'border-amber-100',
                iconBg: 'bg-[#f59e0b]',
                glow: 'shadow-amber-500/20'
            };
        case 'SURVIVOR_SUPPORT':
            return {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                border: 'border-purple-100',
                iconBg: 'bg-[#8b5cf6]',
                glow: 'shadow-purple-500/20'
            };
        default:
            return {
                bg: 'bg-gray-50',
                text: 'text-gray-600',
                border: 'border-gray-100',
                iconBg: 'bg-gray-600',
                glow: 'shadow-gray-500/20'
            };
    }
};

type TabType = 'progress' | 'new' | 'returned' | 'data-update';

const TABS = [
    { id: 'progress' as TabType, label: 'Case Progress Submissions', icon: Clock, color: BRAND_COLORS.teal },
    { id: 'new' as TabType, label: 'New Case Submissions', icon: Plus, color: BRAND_COLORS.primary },
    { id: 'returned' as TabType, label: 'Returned Cases Submissions', icon: RotateCcw, color: BRAND_COLORS.amber },
    { id: 'data-update' as TabType, label: 'Data Update Requests', icon: FileWarning, color: BRAND_COLORS.red },
];

export default function ProvincialSubmissionsPage() {
    const [caseRequests, setCaseRequests] = useState(initialCaseRequests);
    const [preventionSubmissions, setPreventionSubmissions] = useState(initialPrevention);
    const [protectionSubmissions, setProtectionSubmissions] = useState(initialProtection);
    const [awarenessSubmissions, setAwarenessSubmissions] = useState(initialAwareness);

    // Modal State
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalType, setModalType] = useState<'case' | 'prevention' | 'protection' | 'awareness' | null>(null);

    const [activeTab, setActiveTab] = useState<TabType>('progress');
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedStages, setExpandedStages] = useState<string[]>([]);

    // Collapsible Sections State (Deprecated for Tabbed Layout but kept for internal logic if needed)
    const [sectionsOpen, setSectionsOpen] = useState({
        cases: true,
        prevention: true,
        protection: true,
        awareness: true
    });

    // NEW: Main Tab State
    type MainTab = 'cases' | 'prevention' | 'awareness' | 'protection';
    const [activeMainTab, setActiveMainTab] = useState<MainTab>('cases');

    const MAIN_TABS = [
        { id: 'cases' as MainTab, label: 'Cases Submissions', icon: Scale, color: BRAND_COLORS.teal },
        { id: 'prevention' as MainTab, label: 'Prevention Measures', icon: Shield, color: BRAND_COLORS.primary },
        { id: 'awareness' as MainTab, label: 'Awareness Measures', icon: BookOpen, color: BRAND_COLORS.amber },
        { id: 'protection' as MainTab, label: 'Protection & Safety', icon: Stethoscope, color: BRAND_COLORS.purple }
    ];

    const toggleSection = (section: keyof typeof sectionsOpen) => {
        setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
    };

    // Filter data based on active tab (for Cases only)
    const getTabCaseData = () => {
        switch (activeTab) {
            case 'new': return caseRequests.filter(c => c.status === 'Pending Review');
            case 'returned': return caseRequests.filter(c => c.status === 'Returned' || c.status === 'Needs Clarification');
            case 'data-update': return caseRequests.filter(c => c.status === 'Rejected'); // Now showing rejected cases awaiting overhaul
            case 'progress': return caseRequests.filter(c => c.status === 'Under Review');
            default: return caseRequests.filter(c => c.status === 'Under Review');
        }
    };

    const caseData = getTabCaseData();

    // Stats
    const progressCount = caseRequests.filter(c => c.status === 'Under Review').length;
    const newCount = caseRequests.filter(c => c.status === 'Pending Review').length;
    const returnedCount = caseRequests.filter(c => c.status === 'Returned' || c.status === 'Needs Clarification').length;
    const rejectedCount = caseRequests.filter(c => c.status === 'Rejected').length;

    // Status Handlers
    const handleStatusChange = (id: string, newStatus: string, type: 'case' | 'prevention' | 'protection' | 'awareness') => {
        if (type === 'case') {
            setCaseRequests(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        } else if (type === 'prevention') {
            setPreventionSubmissions(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        } else if (type === 'protection') {
            setProtectionSubmissions(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
        } else if (type === 'awareness') {
            setAwarenessSubmissions(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
        }
        setSelectedItem(null);
        setModalType(null);
    };

    const toggleStageExpand = (stageId: string) => {
        setExpandedStages(prev => prev.includes(stageId) ? prev.filter(id => id !== stageId) : [...prev, stageId]);
    };

    const openModal = (item: any, type: 'case' | 'prevention' | 'protection' | 'awareness') => {
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
                <div className="flex gap-3">
                    <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2">
                        <Send size={16} /> Publish All Approved
                    </button>
                </div>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex gap-4 p-1.5 bg-gray-100/50 rounded-2xl border border-white/50 backdrop-blur-sm">
                {MAIN_TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveMainTab(tab.id)}
                        className={clsx(
                            "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300",
                            activeMainTab === tab.id
                                ? "bg-white shadow-md scale-[1.02]"
                                : "text-gray-500 hover:bg-white/50 hover:text-gray-700"
                        )}
                        style={{
                            color: activeMainTab === tab.id ? tab.color : undefined,
                            borderTop: activeMainTab === tab.id ? `4px solid ${tab.color}` : '4px solid transparent'
                        }}
                    >
                        <tab.icon size={18} className={clsx("transition-transform", activeMainTab === tab.id ? "scale-110" : "")} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* SECTION 1: CASES SUBMISSION */}
            {/* SECTION 1: CASES SUBMISSION */}
            {activeMainTab === 'cases' && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                                <Scale size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-brand-dark">Case Submissions</h2>
                                <p className="text-xs text-brand-teal">Manage individual GBV and TFGBV case files</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Stats as Tabs */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                {
                                    id: 'progress',
                                    label: 'Case Progress Submissions',
                                    count: progressCount,
                                    icon: Clock,
                                    color: BRAND_COLORS.teal,
                                    bg: BRAND_COLORS.teal + '30',
                                    borderColor: BRAND_COLORS.teal
                                },
                                {
                                    id: 'new',
                                    label: 'New Case Submissions',
                                    count: newCount,
                                    icon: Plus,
                                    color: BRAND_COLORS.primary,
                                    bg: BRAND_COLORS.primary + '30',
                                    borderColor: BRAND_COLORS.primary
                                },
                                {
                                    id: 'returned',
                                    label: 'Returned Cases Submissions',
                                    count: returnedCount,
                                    icon: RotateCcw,
                                    color: BRAND_COLORS.amber,
                                    bg: BRAND_COLORS.amber + '30',
                                    borderColor: BRAND_COLORS.amber
                                },
                                {
                                    id: 'data-update',
                                    label: 'Data Update Requests',
                                    count: rejectedCount,
                                    icon: FileWarning,
                                    color: BRAND_COLORS.red,
                                    bg: BRAND_COLORS.red + '30',
                                    borderColor: BRAND_COLORS.red
                                },
                            ].map((stat) => (
                                <div
                                    key={stat.id}
                                    onClick={() => setActiveTab(stat.id as TabType)}
                                    className={clsx(
                                        "rounded-2xl border p-4 shadow-sm cursor-pointer transition-all duration-300 group relative overflow-hidden",
                                        activeTab === stat.id
                                            ? "bg-white ring-1 ring-inset"
                                            : "border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 hover:shadow-md"
                                    )}
                                    style={{
                                        borderColor: activeTab === stat.id ? stat.borderColor : undefined,
                                        boxShadow: activeTab === stat.id ? `0 8px 20px ${stat.color}20` : undefined
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={clsx(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                                                activeTab === stat.id ? "scale-110 shadow-sm" : "group-hover:scale-105"
                                            )}
                                            style={{ backgroundColor: stat.bg, color: stat.color }}
                                        >
                                            <stat.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-black text-brand-dark tracking-tight">{stat.count}</p>
                                            <p className={clsx(
                                                "text-[10px] font-bold uppercase tracking-widest transition-colors leading-tight",
                                                activeTab === stat.id ? "text-brand-dark" : "text-gray-400"
                                            )}>{stat.label}</p>
                                        </div>
                                    </div>
                                    {activeTab === stat.id && (
                                        <div
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full"
                                            style={{ backgroundColor: stat.color }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Cases Table */}
                        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">Case ID</th>
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
                                        (caseData as any[]).map((req) => (
                                            <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{req.caseId}</td>
                                                <td className="px-6 py-4">
                                                    <div><span className="font-bold text-brand-dark">{req.province}</span><p className="text-xs text-gray-400">{req.district}</p></div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 rounded-lg bg-gray-100 text-[10px] font-bold text-gray-600 uppercase tracking-tight">{req.caseType}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500"><Calendar size={12} /> {req.submittedOn}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700">Action Required</span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => openModal(req, 'case')}
                                                        className="text-brand-teal font-bold text-xs hover:underline"
                                                    >
                                                        Review & Fix
                                                    </button>
                                                </td>
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
                </div>
            )}      {/* SECTION 3: PREVENTION SUBMISSION */}
            {activeMainTab === 'prevention' && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-brand-dark">Prevention Measures</h2>
                                <p className="text-xs text-brand-teal">Review community programs, training, and strategic initiatives</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Prevention Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Total Projects', count: preventionSubmissions.length, icon: Target, color: BRAND_COLORS.teal, bg: BRAND_COLORS.teal + '30' },
                                { label: 'Active/Approved', count: preventionSubmissions.filter(p => p.status === 'Approved').length, icon: CheckCircle, color: BRAND_COLORS.primary, bg: BRAND_COLORS.primary + '30' },
                                { label: 'Review Pending', count: preventionSubmissions.filter(p => p.status.includes('Review')).length, icon: Clock, color: BRAND_COLORS.amber, bg: BRAND_COLORS.amber + '30' },
                                { label: 'Submissions Req', count: preventionSubmissions.filter(p => p.status === 'Needs Clarification').length, icon: AlertTriangle, color: BRAND_COLORS.red, bg: BRAND_COLORS.red + '30' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg, color: stat.color }}><stat.icon size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-brand-dark">{stat.count}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">ID</th>
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
                </div>
            )}

            {/* SECTION 4: PROTECTION & SUPPORT SUBMISSION */}
            {activeMainTab === 'protection' && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                                <Stethoscope size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-brand-dark">Protection & Support</h2>
                                <p className="text-xs text-brand-teal">Review shelters, helplines, and medico-legal reports</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Protection Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Total Reports', count: protectionSubmissions.length, icon: FileText, color: BRAND_COLORS.teal, bg: BRAND_COLORS.teal + '30' },
                                { label: 'Verified', count: protectionSubmissions.filter(p => p.status === 'Approved').length, icon: CheckCircle, color: BRAND_COLORS.primary, bg: BRAND_COLORS.primary + '30' },
                                { label: 'Under Review', count: protectionSubmissions.filter(p => p.status === 'Under Review').length, icon: Clock, color: BRAND_COLORS.amber, bg: BRAND_COLORS.amber + '30' },
                                { label: 'Issues Flagged', count: protectionSubmissions.filter(p => p.status === 'Needs Clarification' || p.status === 'Returned').length, icon: AlertTriangle, color: BRAND_COLORS.red, bg: BRAND_COLORS.red + '30' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg, color: stat.color }}><stat.icon size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-brand-dark">{stat.count}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">ID</th>
                                        <th className="px-6 py-4">Report Title</th>
                                        <th className="px-6 py-4">Province / District</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">Beneficiaries</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-surface">
                                    {protectionSubmissions.map((prot) => (
                                        <tr key={prot.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-gray-500">{prot.id}</td>
                                            <td className="px-6 py-4"><span className="font-medium text-brand-dark block max-w-xs truncate">{prot.title}</span></td>
                                            <td className="px-6 py-4">
                                                <div><span className="font-bold text-brand-dark">{prot.province}</span><p className="text-xs text-gray-400">{prot.district}</p></div>
                                            </td>
                                            <td className="px-6 py-4"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 uppercase">{prot.type.split(' ')[0]}</span></td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{prot.beneficiaries.toLocaleString()}</td>
                                            <td className="px-6 py-4"><span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[prot.status] || "bg-gray-100")}>{prot.status}</span></td>
                                            <td className="px-6 py-4 text-right">
                                                <button onClick={() => openModal(prot, 'protection')} className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"><Eye size={16} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* SECTION 5: AWARENESS SUBMISSION */}
            {activeMainTab === 'awareness' && (
                <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                                <BookOpen size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-brand-dark">Awareness Measures</h2>
                                <p className="text-xs text-brand-teal">Review media campaigns, public service announcements, and events</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Awareness Stats */}
                        <div className="grid grid-cols-4 gap-4">
                            {[
                                { label: 'Total Campaigns', count: awarenessSubmissions.length, icon: Megaphone, color: BRAND_COLORS.teal, bg: BRAND_COLORS.teal + '30' },
                                { label: 'Certified', count: awarenessSubmissions.filter(a => a.status === 'Approved').length, icon: CheckCircle, color: BRAND_COLORS.primary, bg: BRAND_COLORS.primary + '30' },
                                { label: 'Under Review', count: awarenessSubmissions.filter(a => a.status === 'Under Review').length, icon: Clock, color: BRAND_COLORS.amber, bg: BRAND_COLORS.amber + '30' },
                                { label: 'Rejected/Returned', count: awarenessSubmissions.filter(a => a.status === 'Rejected' || a.status === 'Returned').length, icon: XCircle, color: BRAND_COLORS.red, bg: BRAND_COLORS.red + '30' },
                            ].map((stat, idx) => (
                                <div key={idx} className="bg-gray-50 rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg, color: stat.color }}><stat.icon size={20} /></div>
                                    <div>
                                        <p className="text-xl font-bold text-brand-dark">{stat.count}</p>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-xs text-gray-500 uppercase font-bold tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">ID</th>
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
                </div>
            )}

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
                                            {modalType === 'case' ? 'Case Timeline & Progress' : selectedItem.title}
                                        </h2>
                                        <p className="text-sm text-brand-teal">{selectedItem.province} • {selectedItem.district} • {modalType === 'case' ? selectedItem.category : (selectedItem.type || selectedItem.category)}</p>
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"><X size={20} /></button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-brand-canvas space-y-6">
                                {/* GENERIC CONTENT FOR NON-CASE TYPES */}
                                {modalType !== 'case' && (
                                    <div className="space-y-6">
                                        <div className="bg-white p-6 rounded-3xl border border-brand-surface shadow-sm">
                                            <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                                <FileText size={16} className="text-brand-teal" />
                                                Report Details
                                            </h3>
                                            <div className="grid grid-cols-2 gap-6">
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Submitted By</p>
                                                    <p className="text-sm font-bold text-brand-dark">{selectedItem.submittedBy}</p>
                                                    <p className="text-xs text-gray-500">{selectedItem.submittedOn}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Priority</p>
                                                    <span className={clsx(
                                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                        selectedItem.priority === 'High' ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                                                    )}>{selectedItem.priority}</span>
                                                </div>
                                                {selectedItem.details && (
                                                    <>
                                                        <div className="col-span-2">
                                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Description</p>
                                                            <p className="text-sm text-gray-700 leading-relaxed">{selectedItem.details.description}</p>
                                                        </div>
                                                        {selectedItem.details.metrics && (
                                                            <div className="col-span-2 space-y-3">
                                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Key Metrics</p>
                                                                {selectedItem.details.metrics.map((m: any, idx: number) => (
                                                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                                                        <span className="text-xs font-bold text-gray-600">{m.name}</span>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-sm font-bold text-brand-dark">{m.current.toLocaleString()}</span>
                                                                            <span className="text-[10px] text-gray-400">/ {m.target.toLocaleString()}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                        {/* Protection Specific Fields */}
                                                        {modalType === 'protection' && (
                                                            <>
                                                                <div>
                                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Facility Name</p>
                                                                    <p className="text-sm font-bold text-brand-dark">{selectedItem.details.facilityName}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Total Cases</p>
                                                                    <p className="text-lg font-black text-brand-dark">{selectedItem.details.totalCasesHandled}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Referrals In/Out</p>
                                                                    <p className="text-sm font-bold text-gray-600">{selectedItem.details.referralsReceived} In / {selectedItem.details.referralsGiven} Out</p>
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Review Actions */}
                                        <div className="bg-white p-6 rounded-3xl border border-brand-surface shadow-sm sticky bottom-0">
                                            <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                                                <CheckCircle size={16} className="text-brand-teal" />
                                                Review Actions
                                            </h3>
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => handleStatusChange(selectedItem.id, 'Approved', modalType as any)}
                                                    className="flex-1 py-3 bg-brand-teal hover:bg-brand-dark text-white font-bold rounded-xl shadow-lg shadow-brand-teal/20 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <CheckCircle size={18} /> Approve Submission
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(selectedItem.id, 'Needs Clarification', modalType as any)}
                                                    className="flex-1 py-3 bg-white border border-brand-surface hover:bg-orange-50 text-brand-dark font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                                                >
                                                    <AlertTriangle size={18} className="text-orange-500" /> Request Clarification
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* CONTENT FOR CASES */}
                                {modalType === 'case' && (
                                    <div className="space-y-6">
                                        {/* Personal Information & Incident Details */}
                                        <div className="bg-white p-6 rounded-3xl border border-brand-surface shadow-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs flex items-center gap-2">
                                                    <User size={16} className="text-brand-teal" />
                                                    Personal & Incident Profile
                                                </h3>
                                                <span className="px-2 py-1 bg-brand-teal/10 text-brand-teal text-[10px] font-bold rounded uppercase">
                                                    Restricted Access
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                {(() => {
                                                    // Helper to safely extract field from any stage in timeline
                                                    const getTimelineField = (key: string) => {
                                                        return selectedItem.timeline?.find((s: any) => s.details && s.details[key])?.details[key] || 'N/A';
                                                    };

                                                    return (
                                                        <>
                                                            <div className="p-4 bg-gray-50/50 rounded-2xl border border-brand-surface/50 group hover:border-brand-teal/30 hover:shadow-md transition-all">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                                                        <User size={16} />
                                                                    </div>
                                                                    <span className="text-[10px] uppercase font-bold text-gray-400">Survivor Profile</span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-brand-dark text-sm">{getTimelineField('survivorAge')}</p>
                                                                    <p className="text-xs text-gray-500 mt-0.5">{getTimelineField('disabilityStatus')}</p>
                                                                    <p className="text-[10px] text-blue-600 font-bold mt-1 bg-blue-50 px-1.5 py-0.5 rounded inline-block">{getTimelineField('recurrence')}</p>
                                                                </div>
                                                            </div>

                                                            <div className="p-4 bg-gray-50/50 rounded-2xl border border-brand-surface/50 group hover:border-brand-teal/30 hover:shadow-md transition-all">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                                                                        <Shield size={16} />
                                                                    </div>
                                                                    <span className="text-[10px] uppercase font-bold text-gray-400">Accused & Risk</span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-brand-dark text-sm">{getTimelineField('perpetratorType')}</p>
                                                                    <p className="text-xs text-gray-500 mt-0.5">Primary Suspect</p>
                                                                </div>
                                                            </div>

                                                            <div className="p-4 bg-gray-50/50 rounded-2xl border border-brand-surface/50 group hover:border-brand-teal/30 hover:shadow-md transition-all">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                                                                        <MapPin size={16} />
                                                                    </div>
                                                                    <span className="text-[10px] uppercase font-bold text-gray-400">Location & Response</span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-bold text-brand-dark text-sm">{getTimelineField('incidentLocation')}</p>
                                                                    <p className="text-xs text-gray-500 mt-0.5">Resp: <span className="font-bold">{getTimelineField('policeResponseTime')}</span></p>
                                                                </div>
                                                            </div>

                                                            <div className="p-4 bg-gray-50/50 rounded-2xl border border-brand-surface/50 group hover:border-brand-teal/30 hover:shadow-md transition-all">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                                                        <Activity size={16} />
                                                                    </div>
                                                                    <span className="text-[10px] uppercase font-bold text-gray-400">Services</span>
                                                                </div>
                                                                <div>
                                                                    <p className="font-medium text-brand-dark text-xs leading-tight">{getTimelineField('servicesRequired')}</p>
                                                                    <p className="text-[10px] text-gray-400 mt-1">Status: Pending</p>
                                                                </div>
                                                            </div>

                                                            <div className="p-4 bg-gray-50/50 rounded-2xl border border-brand-surface/50 group hover:border-brand-teal/30 hover:shadow-md transition-all">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                                                                        <AlertTriangle size={16} />
                                                                    </div>
                                                                    <span className="text-[10px] uppercase font-bold text-gray-400">Risk Assessment</span>
                                                                </div>
                                                                <div>
                                                                    <p className={clsx(
                                                                        "font-bold text-sm",
                                                                        selectedItem.risk === 'Critical' ? "text-red-600" :
                                                                            selectedItem.risk === 'High' ? "text-orange-600" :
                                                                                "text-brand-dark"
                                                                    )}>{selectedItem.risk || 'Pending'}</p>
                                                                    <p className="text-xs text-gray-500 mt-0.5">Initial Evaluation</p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                        </div>

                                        {/* Case Life-cycle Header */}
                                        <div className="bg-white p-6 rounded-3xl border border-brand-surface shadow-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs flex items-center gap-2">
                                                        <BarChart size={16} className="text-brand-teal" />
                                                        Justice System Life-cycle
                                                    </h3>
                                                    <p className="text-[10px] text-gray-400 font-medium">Provincial Submission Audit (SOP Compliance)</p>
                                                </div>
                                                <div className="text-right font-mono">
                                                    <span className="text-2xl font-black text-brand-dark">
                                                        {Math.round((selectedItem.timeline?.filter((s: any) => s.status === 'Completed').length / selectedItem.timeline?.length) * 100)}%
                                                    </span>
                                                    <span className="text-xs text-brand-teal ml-1 font-bold">Audit Multiplier</span>
                                                </div>
                                            </div>

                                            <div className="relative h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100 flex p-0.5">
                                                {selectedItem.timeline?.map((stage: any, sIdx: number) => (
                                                    <div
                                                        key={sIdx}
                                                        className={clsx(
                                                            "h-full flex-1 first:rounded-l-full last:rounded-r-full transition-all duration-500 mx-0.5",
                                                            stage.status === 'Completed' ? "bg-brand-teal shadow-[0_0_8px_rgba(40,152,154,0.3)]" :
                                                                stage.status === 'In Progress' ? "bg-brand-teal/30 animate-pulse" : "bg-gray-200"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                            <div className="grid grid-cols-4 gap-2 mt-4 text-[9px] font-bold uppercase tracking-tighter text-gray-400">
                                                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Intake</div>
                                                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Evidence</div>
                                                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Medical</div>
                                                <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Trial</div>
                                            </div>
                                        </div>

                                        {/* Audit Timeline */}
                                        <div className="relative pl-8 space-y-0">
                                            {/* Continuous vertical line background */}
                                            <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-gray-100/80 -z-10" />

                                            {selectedItem.timeline?.map((stage: any, idx: number) => {
                                                const isCompleted = stage.status === 'Completed';
                                                const isInProgress = stage.status === 'In Progress';
                                                const isConvicted = stage.stageCode === 'DISPOSAL_JUDGMENT' && isCompleted;
                                                const colors = getStageCategoryColor(stage.stageCode);

                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: idx * 0.08, type: "spring", stiffness: 200 }}
                                                        className="group/timeline-item relative pb-10 last:pb-0"
                                                    >
                                                        <div className="flex gap-6">
                                                            {/* Timeline Marker Column */}
                                                            <div className="flex flex-col items-center flex-shrink-0 relative">
                                                                {/* Connector overlay for active state */}
                                                                {idx !== selectedItem.timeline.length - 1 && isCompleted && (
                                                                    <div className="absolute top-10 bottom-[-40px] w-0.5 bg-brand-teal transition-all duration-500" />
                                                                )}

                                                                <div className={clsx(
                                                                    "w-14 h-14 rounded-full flex items-center justify-center border-[3px] shadow-sm transition-all duration-300 z-10",
                                                                    isCompleted ? `bg-white border-brand-teal text-brand-teal shadow-[0_0_0_4px_rgba(40,152,154,0.1)]` :
                                                                        isInProgress ? "bg-white border-brand-teal text-brand-teal animate-pulse shadow-[0_0_0_4px_rgba(40,152,154,0.2)]" :
                                                                            "bg-white border-gray-200 text-gray-300"
                                                                )}>
                                                                    {isCompleted ? <CheckCircle size={24} strokeWidth={2.5} /> :
                                                                        isInProgress ? <RefreshCw className="animate-spin-slow" size={24} strokeWidth={2.5} /> :
                                                                            <div className="w-3 h-3 rounded-full bg-gray-300" />}
                                                                </div>
                                                            </div>

                                                            {/* Content Card */}
                                                            <div className={clsx(
                                                                "flex-1 rounded-2xl border transition-all duration-300 relative overflow-visible",
                                                                isCompleted ? "bg-white border-brand-surface/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5" :
                                                                    isInProgress ? "bg-white border-brand-teal/30 shadow-[0_8px_30px_rgba(40,152,154,0.08)] ring-1 ring-brand-teal/10" :
                                                                        "bg-gray-50/50 border-gray-100 opacity-60 grayscale"
                                                            )}>
                                                                {/* Header Section */}
                                                                <div className="p-5 border-b border-gray-50/80 flex justify-between items-start gap-4">
                                                                    <div>
                                                                        <div className="flex items-center gap-2 mb-1.5">
                                                                            {isCompleted && (
                                                                                <span className="px-2 py-0.5 rounded-md bg-brand-teal/5 text-brand-teal text-[10px] uppercase font-black tracking-widest leading-none border border-brand-teal/10">
                                                                                    {stage.date}
                                                                                </span>
                                                                            )}
                                                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                                                {stage.stageCode.replace(/_/g, ' ')}
                                                                            </span>
                                                                        </div>
                                                                        <h4 className={clsx("font-extrabold text-lg tracking-tight leading-tight", isCompleted ? "text-brand-dark" : "text-gray-500")}>
                                                                            {stage.stage}
                                                                        </h4>
                                                                    </div>

                                                                    <div className="text-right">
                                                                        {isConvicted ? (
                                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-dark text-white text-[10px] font-black uppercase tracking-wider rounded-lg shadow-md shadow-brand-dark/20 animate-pulse">
                                                                                <Gavel size={12} /> Convicted
                                                                            </span>
                                                                        ) : (
                                                                            <span className={clsx(
                                                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border",
                                                                                isCompleted ? "bg-green-50 border-green-100 text-green-700" :
                                                                                    isInProgress ? "bg-blue-50 border-blue-100 text-blue-700" :
                                                                                        "bg-gray-100 border-gray-200 text-gray-400"
                                                                            )}>
                                                                                {stage.status}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                {/* Body Section */}
                                                                {(isCompleted || isInProgress) && (
                                                                    <div className="p-5">
                                                                        {/* Data Grid */}
                                                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-5 gap-x-4">
                                                                            {Object.entries((stage.details || {}) as Record<string, any>).map(([k, v]) => (
                                                                                v && (
                                                                                    <div key={k} className="group/field">
                                                                                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1.5 group-hover/field:text-brand-teal transition-colors">
                                                                                            {FIELD_LABELS[k] || k}
                                                                                        </p>
                                                                                        <p className="text-[13px] text-brand-dark font-medium leading-normal break-words">
                                                                                            {v.toString()}
                                                                                        </p>
                                                                                    </div>
                                                                                )
                                                                            ))}
                                                                        </div>

                                                                        {/* Attachments Section */}
                                                                        {stage.attachments && stage.attachments.length > 0 && (
                                                                            <div className="mt-6 pt-5 border-t border-dashed border-gray-200/80">
                                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                                    <FileText size={12} /> Evidence & Documentation
                                                                                </p>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {stage.attachments.map((file: any, fIdx: number) => (
                                                                                        <button
                                                                                            key={fIdx}
                                                                                            className="group/doc relative pl-2 pr-4 py-2 bg-white border border-gray-200/80 rounded-xl hover:border-brand-teal hover:shadow-md hover:translate-y-[-1px] transition-all flex items-start gap-3 text-left w-full sm:w-auto"
                                                                                        >
                                                                                            <div className={clsx(
                                                                                                "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors",
                                                                                                file.type === 'pdf' ? "bg-red-50 text-red-500 group-hover/doc:bg-red-100" : "bg-blue-50 text-blue-500 group-hover/doc:bg-blue-100"
                                                                                            )}>
                                                                                                {file.type === 'pdf' ? <FileText size={16} /> : <Eye size={16} />}
                                                                                            </div>
                                                                                            <div>
                                                                                                <span className="text-xs font-bold text-gray-700 block group-hover/doc:text-brand-dark line-clamp-1">{file.name}</span>
                                                                                                <span className="text-[9px] text-gray-400 font-medium">Verified • 2.4 MB</span>
                                                                                            </div>
                                                                                            <div className="absolute top-2 right-2 opacity-0 group-hover/doc:opacity-100 transition-opacity">
                                                                                                <Download size={12} className="text-brand-teal" />
                                                                                            </div>
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
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
