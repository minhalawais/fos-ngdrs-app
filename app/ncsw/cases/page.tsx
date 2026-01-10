"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Filter,
    Eye,
    MapPin,
    CheckCircle,
    Clock,
    AlertTriangle,
    Shield,
    Megaphone,
    X,
    Users,
    Target,
    Briefcase,
    Download,
    Calendar,
    FileText,
    BookOpen,
    Tv,
    Smartphone,
    Languages,
    Globe,
    Radio,
    BarChart,
    RefreshCw
} from "lucide-react";
import {
    generateNationalCases,
    generatePreventionSubmissions,
    generateAwarenessSubmissions
} from "@/lib/ncsw-mock-data";
import { generateCaseRepository, FIELD_LABELS } from "@/lib/district-mock-data";
import { clsx } from "clsx";

// Data sources
const nationalCases = generateNationalCases();
const preventionProjects = generatePreventionSubmissions();
const awarenessCampaigns = generateAwarenessSubmissions();
const detailedCases = generateCaseRepository(); // For timeline view

const STATUS_STYLES: Record<string, string> = {
    'Reported': 'bg-gray-100 text-gray-700',
    'FIR Registered': 'bg-blue-50 text-blue-700',
    'Investigation': 'bg-amber-50 text-amber-700',
    'Trial': 'bg-purple-50 text-purple-700',
    'Closed': 'bg-green-50 text-green-700',
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
    'Needs Clarification': 'bg-orange-50 text-orange-700 border-orange-200',
};

const VERIFICATION_STYLES: Record<string, string> = {
    'Published': 'bg-green-100 text-green-700 border-green-200',
    'Provincial Verified': 'bg-blue-100 text-blue-700 border-blue-200',
    'Pending': 'bg-gray-100 text-gray-600 border-gray-200',
};

const PREVENTION_TYPE_COLORS: Record<string, string> = {
    'Education': 'bg-blue-100 text-blue-700',
    'Community': 'bg-green-100 text-green-700',
    'Legal': 'bg-purple-100 text-purple-700',
    'Economic': 'bg-orange-100 text-orange-700',
    'Health': 'bg-red-100 text-red-700',
    'Media': 'bg-cyan-100 text-cyan-700',
    'Workplace': 'bg-indigo-100 text-indigo-700',
    'Youth': 'bg-pink-100 text-pink-700'
};

const AWARENESS_CHANNEL_ICONS: Record<string, any> = {
    'Social Media': Smartphone,
    'TV': Tv,
    'Radio': Radio,
    'Community': Users,
    'Print': BookOpen,
    'Web': Globe
};

type ExplorerTab = 'cases' | 'prevention' | 'awareness';

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

export default function CaseExplorerPage() {
    const [activeTab, setActiveTab] = useState<ExplorerTab>('cases');
    const [searchTerm, setSearchTerm] = useState("");
    const [provinceFilter, setProvinceFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [modalType, setModalType] = useState<ExplorerTab | null>(null);

    // Filtering logic based on active tab
    const getFilteredData = () => {
        let data: any[] = [];
        if (activeTab === 'cases') data = nationalCases;
        else if (activeTab === 'prevention') data = preventionProjects;
        else if (activeTab === 'awareness') data = awarenessCampaigns;

        return data.filter(item => {
            const matchesSearch =
                (item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.caseId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.district?.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesProvince = provinceFilter === "All" || item.province === provinceFilter;
            const matchesStatus = statusFilter === "All" || (activeTab === 'cases' ? item.verificationStatus === statusFilter : item.status === statusFilter);

            return matchesSearch && matchesProvince && matchesStatus;
        });
    };

    const filteredData = getFilteredData();

    // Stats calculation
    const getStats = () => {
        if (activeTab === 'cases') {
            return [
                { label: 'Total Cases', value: nationalCases.length, icon: Search, color: '#659CBF' },
                { label: 'Published', value: nationalCases.filter((c: any) => c.verificationStatus === 'Published').length, icon: CheckCircle, color: '#6EA969' },
                { label: 'Pending', value: nationalCases.filter((c: any) => c.verificationStatus === 'Pending').length, icon: Clock, color: '#D3A255' },
                { label: 'Critical', value: nationalCases.filter((c: any) => c.risk === 'Critical').length, icon: AlertTriangle, color: '#EE8A7D' },
            ];
        } else if (activeTab === 'prevention') {
            const totalBeneficiaries = preventionProjects.reduce((acc, curr) => acc + curr.targetBeneficiaries, 0);
            return [
                { label: 'Total Projects', value: preventionProjects.length, icon: Briefcase, color: '#659CBF' },
                { label: 'Beneficiaries', value: totalBeneficiaries.toLocaleString(), icon: Users, color: '#6EA969' },
                { label: 'Approved', value: preventionProjects.filter(p => p.status === 'Approved').length, icon: CheckCircle, color: '#D3A255' },
                { label: 'Under Review', value: preventionProjects.filter(p => p.status === 'Under Review').length, icon: Clock, color: '#BC5F75' },
            ];
        } else {
            const totalReach = awarenessCampaigns.reduce((acc, curr) => acc + curr.reachEstimate, 0);
            return [
                { label: 'Total Campaigns', value: awarenessCampaigns.length, icon: Megaphone, color: '#659CBF' },
                { label: 'Est. Reach', value: `${(totalReach / 1000000).toFixed(1)}M+`, icon: Users, color: '#6EA969' },
                { label: 'Approved', value: awarenessCampaigns.filter((a: any) => a.status === 'Approved').length, icon: CheckCircle, color: '#D3A255' },
                { label: 'Media Channels', value: new Set(awarenessCampaigns.map((c: any) => c.type)).size, icon: Tv, color: '#BC5F75' },
            ];
        }
    };

    const handleViewItem = (item: any) => {
        if (activeTab === 'cases') {
            const detailed = detailedCases.find(c => c.id === item.id) || detailedCases[0];
            setSelectedItem(detailed);
        } else {
            setSelectedItem(item);
        }
        setModalType(activeTab);
    };

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Search className="text-brand-teal" size={28} />
                        National Registry Explorer
                    </h1>
                    <p className="text-sm text-brand-teal">Search and audit cases, prevention measures, and awareness campaigns</p>
                </div>
                <button className="px-5 py-2 bg-white border border-brand-surface hover:bg-gray-50 text-brand-dark font-bold rounded-xl text-sm shadow-sm transition-all flex items-center gap-2">
                    <Download size={16} /> Export Registry
                </button>
            </div>

            {/* Main Tabs Explorer */}
            <div className="flex p-1 bg-gray-100 rounded-2xl w-fit">
                {[
                    { id: 'cases', label: 'Case Files', icon: FileText },
                    { id: 'prevention', label: 'Prevention Measures', icon: Shield },
                    { id: 'awareness', label: 'Awareness Campaigns', icon: Megaphone },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => {
                            setActiveTab(tab.id as ExplorerTab);
                            setSearchTerm("");
                            setProvinceFilter("All");
                            setStatusFilter("All");
                        }}
                        className={clsx(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all",
                            activeTab === tab.id
                                ? "bg-white text-brand-dark shadow-sm"
                                : "text-gray-500 hover:text-brand-dark"
                        )}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-4">
                {getStats().map((stat, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{stat.value}</p>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white min-w-[160px]"
                    value={provinceFilter}
                    onChange={(e) => setProvinceFilter(e.target.value)}
                >
                    <option value="All">All Provinces</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Sindh">Sindh</option>
                    <option value="KPK">KPK</option>
                    <option value="Balochistan">Balochistan</option>
                </select>
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white min-w-[160px]"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    {activeTab === 'cases' ? (
                        <>
                            <option value="Published">Published</option>
                            <option value="Provincial Verified">Verified</option>
                            <option value="Pending">Pending</option>
                        </>
                    ) : (
                        <>
                            <option value="Approved">Approved</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Returned">Returned</option>
                        </>
                    )}
                </select>
            </div>

            {/* Main Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden min-h-[400px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">
                                {activeTab === 'cases' ? 'District' : activeTab === 'prevention' ? 'Program Title' : 'Campaign Title'}
                            </th>
                            <th className="px-6 py-4">Province</th>
                            <th className="px-6 py-4">
                                {activeTab === 'cases' ? 'Type' : activeTab === 'prevention' ? 'Type' : 'Channel'}
                            </th>
                            <th className="px-6 py-4">
                                {activeTab === 'cases' ? 'Risk' : activeTab === 'prevention' ? 'Beneficiaries' : 'Est. Reach'}
                            </th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredData.slice(0, 50).map((item) => {
                            const id = item.id || item.caseId;
                            return (
                                <tr key={id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs font-medium text-brand-dark">{id}</td>
                                    <td className="px-6 py-4">
                                        {activeTab === 'cases' ? (
                                            <span className="font-bold text-brand-dark">{item.district}</span>
                                        ) : (
                                            <span className="font-bold text-brand-dark block max-w-xs truncate">{item.title}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{item.province}</td>
                                    <td className="px-6 py-4">
                                        {activeTab === 'cases' ? (
                                            <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", item.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700")}>{item.caseType}</span>
                                        ) : activeTab === 'prevention' ? (
                                            <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", PREVENTION_TYPE_COLORS[item.type.split(' ')[0]] || "bg-gray-100")}>{item.type.split(' ')[0]}</span>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded bg-orange-50 flex items-center justify-center text-orange-600">
                                                    {(() => {
                                                        const Icon = AWARENESS_CHANNEL_ICONS[item.type.split(' ')[0]] || Megaphone;
                                                        return <Icon size={12} />;
                                                    })()}
                                                </div>
                                                <span className="text-xs text-gray-700">{item.type.split(' ')[0]}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {activeTab === 'cases' ? (
                                            <span className={clsx(
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                item.risk === 'Critical' ? "bg-red-100 text-red-700" :
                                                    item.risk === 'High' ? "bg-orange-100 text-orange-700" :
                                                        "bg-green-100 text-green-700"
                                            )}>{item.risk}</span>
                                        ) : activeTab === 'prevention' ? (
                                            <span className="font-mono text-sm">{item.targetBeneficiaries?.toLocaleString()}</span>
                                        ) : (
                                            <span className="font-mono text-sm">{item.reachEstimate?.toLocaleString()}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx(
                                            "px-2.5 py-1 rounded-md text-xs font-bold border whitespace-nowrap",
                                            activeTab === 'cases' ? VERIFICATION_STYLES[item.verificationStatus] : STATUS_STYLES[item.status]
                                        )}>
                                            {activeTab === 'cases' ? item.verificationStatus : item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleViewItem(item)}
                                            className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Consolidated Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-gray-100 bg-brand-surface/20 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="px-2 py-1 bg-brand-dark text-white text-[10px] font-mono rounded tracking-widest">{selectedItem.id || selectedItem.caseId}</span>
                                        <span className={clsx(
                                            "px-2 py-1 rounded text-[10px] font-bold border uppercase tracking-wider",
                                            modalType === 'cases' ? VERIFICATION_STYLES[selectedItem.verificationStatus] : STATUS_STYLES[selectedItem.status]
                                        )}>
                                            {modalType === 'cases' ? selectedItem.verificationStatus : selectedItem.status}
                                        </span>
                                        <span className="px-2 py-1 bg-white border border-brand-surface rounded text-[10px] font-bold text-brand-teal uppercase tracking-widest">Read-Only</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-brand-dark">
                                        {modalType === 'cases' ? 'Case Audit Timeline' : selectedItem.title}
                                    </h2>
                                    <p className="text-sm text-brand-teal mt-1">
                                        {selectedItem.province} • {selectedItem.district} • {selectedItem.caseType || selectedItem.type}
                                    </p>
                                </div>
                                <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full text-gray-400 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-6 bg-brand-canvas space-y-6">
                                {modalType === 'cases' && (
                                    <div className="space-y-6">
                                        {/* Case Life-cycle Header */}
                                        <div className="bg-white p-6 rounded-3xl border border-brand-surface shadow-sm">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <h3 className="font-bold text-brand-dark uppercase tracking-widest text-xs flex items-center gap-2">
                                                        <BarChart size={16} className="text-brand-teal" />
                                                        Justice System Life-cycle
                                                    </h3>
                                                    <p className="text-[10px] text-gray-400 font-medium">Global Progression Tracker (SOP Compliance)</p>
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
                                        <div className="space-y-4">
                                            {selectedItem.timeline?.map((stage: any, idx: number) => {
                                                const isCompleted = stage.status === 'Completed';
                                                const isInProgress = stage.status === 'In Progress';
                                                const isConvicted = stage.stageCode === 'DISPOSAL_JUDGMENT' && isCompleted;
                                                const colors = getStageCategoryColor(stage.stageCode);

                                                return (
                                                    <motion.div
                                                        key={idx}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.05 }}
                                                        className="relative pl-14"
                                                    >
                                                        {/* Enterprise Connector */}
                                                        {idx !== selectedItem.timeline.length - 1 && (
                                                            <div className={clsx(
                                                                "absolute left-[24px] top-12 bottom-[-16px] w-[2px] transition-all duration-700",
                                                                isCompleted ? "bg-gradient-to-b from-brand-teal to-gray-200" : "bg-gray-100"
                                                            )} />
                                                        )}

                                                        {/* Category Icon Marker */}
                                                        <div className={clsx(
                                                            "absolute left-0 top-0 w-12 h-12 rounded-2xl flex items-center justify-center border-4 transition-all duration-500 z-10 shadow-lg",
                                                            isCompleted ? `${colors.iconBg} border-white text-white ${colors.glow} scale-100` :
                                                                isInProgress ? "bg-white border-brand-teal text-brand-teal animate-pulse scale-110" :
                                                                    "bg-white border-gray-50 text-gray-300 scale-90"
                                                        )}>
                                                            {isCompleted ? <CheckCircle size={22} /> : isInProgress ? <RefreshCw className="animate-spin-slow" size={22} /> : <div className="w-2 h-2 rounded-full bg-gray-200" />}
                                                        </div>

                                                        {/* Enterprise Card */}
                                                        <div className={clsx(
                                                            "p-6 rounded-[24px] border transition-all duration-300 relative overflow-hidden",
                                                            isCompleted ? `bg-white border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)]` :
                                                                isInProgress ? "bg-white border-brand-teal/40 shadow-xl shadow-brand-teal/5" :
                                                                    "bg-gray-50/50 border-gray-100 opacity-50 grayscale"
                                                        )}>
                                                            {/* Card Gloss Background */}
                                                            {isCompleted && <div className={clsx("absolute top-0 right-0 w-32 h-32 opacity-[0.03] pointer-events-none -mr-8 -mt-8 rounded-full", colors.iconBg)} />}

                                                            <div className="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                                                                <div>
                                                                    {isCompleted && (
                                                                        <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest block mb-1">
                                                                            Verified Stage • {stage.date}
                                                                        </span>
                                                                    )}
                                                                    <h4 className={clsx("font-black text-lg tracking-tight", isCompleted ? "text-brand-dark" : "text-gray-400")}>
                                                                        {stage.stage}
                                                                    </h4>
                                                                    <p className="text-[11px] text-gray-400 font-medium">Logged on {stage.date !== 'N/A' ? stage.date : 'Pending Verification'}</p>
                                                                </div>
                                                                {isConvicted ? (
                                                                    <div className="flex flex-col items-end gap-1">
                                                                        <span className="px-4 py-1.5 bg-brand-dark text-white text-[11px] font-black rounded-xl uppercase tracking-widest shadow-xl shadow-brand-dark/20 animate-bounce flex items-center gap-2">
                                                                            <Shield size={14} className="text-brand-teal" /> Convicted
                                                                        </span>
                                                                        <span className="text-[9px] font-bold text-brand-dark/40 uppercase">Final Disposal</span>
                                                                    </div>
                                                                ) : (
                                                                    <span className={clsx(
                                                                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                                                        isCompleted ? "bg-green-50 border-green-100 text-green-600" :
                                                                            isInProgress ? "bg-brand-teal text-white border-brand-teal" :
                                                                                "bg-gray-100 border-gray-200 text-gray-400"
                                                                    )}>
                                                                        {stage.status}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* High-Density Details Grid */}
                                                            {(isCompleted || isInProgress) && (
                                                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                                                                    {Object.entries((stage.details || {}) as Record<string, any>).map(([k, v]) => (
                                                                        v && (
                                                                            <div key={k} className="group/field">
                                                                                <span className="text-[9px] text-gray-400 font-black uppercase block tracking-widest mb-1.5 transition-colors group-hover/field:text-brand-teal">
                                                                                    {FIELD_LABELS[k] || k}
                                                                                </span>
                                                                                <div className="text-[13px] text-brand-dark font-bold leading-tight flex items-center gap-2">
                                                                                    {v.toString()}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    ))}
                                                                </div>
                                                            )}

                                                            {/* Enhanced Documentation Strip */}
                                                            {stage.attachments && stage.attachments.length > 0 && (
                                                                <div className="pt-5 border-t border-dashed border-gray-200">
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Verified Attachments</span>
                                                                        <span className="text-[10px] font-bold text-gray-400 italic">Security Hash Verified</span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {stage.attachments.map((file: any, fIdx: number) => (
                                                                            <div key={fIdx} className="flex items-center gap-3 px-4 py-2 bg-gray-50/50 border border-gray-100 rounded-xl hover:bg-white hover:border-brand-teal/30 hover:shadow-md transition-all cursor-pointer group/doc">
                                                                                <div className={clsx(
                                                                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover/doc:scale-110",
                                                                                    file.type === 'pdf' ? "bg-red-50 text-red-500" : "bg-brand-teal/10 text-brand-teal"
                                                                                )}>
                                                                                    {file.type === 'pdf' ? <FileText size={16} /> : <Eye size={16} />}
                                                                                </div>
                                                                                <div>
                                                                                    <span className="text-xs font-bold text-gray-700 block group-hover/doc:text-brand-dark transition-colors">{file.name}</span>
                                                                                    <span className="text-[9px] text-gray-400 font-medium">Digital Evidence • 2.4 MB</span>
                                                                                </div>
                                                                                <Download size={14} className="text-gray-300 group-hover/doc:text-brand-teal ml-2" />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {modalType === 'prevention' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-2xl border border-brand-surface text-center">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Beneficiaries</p>
                                                <p className="text-2xl font-bold text-brand-dark">{selectedItem.targetBeneficiaries?.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-brand-surface text-center">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                                                <p className="text-sm font-bold text-brand-dark">{selectedItem.startDate} - {selectedItem.endDate}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-brand-surface">
                                            <h3 className="font-bold text-sm text-brand-dark uppercase tracking-widest mb-3">Project Description</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{selectedItem.details.description}</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-brand-surface">
                                            <h3 className="font-bold text-sm text-brand-dark uppercase tracking-widest mb-3">Objectives</h3>
                                            <ul className="space-y-2">
                                                {selectedItem.details.objectives.map((obj: string, i: number) => (
                                                    <li key={i} className="text-sm text-gray-600 flex gap-3">
                                                        <CheckCircle size={14} className="text-brand-teal shrink-0 mt-0.5" />
                                                        {obj}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {modalType === 'awareness' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-white p-4 rounded-2xl border border-brand-surface text-center">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Est. Reach</p>
                                                <p className="text-2xl font-bold text-brand-dark">{selectedItem.reachEstimate?.toLocaleString()}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-brand-surface text-center">
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Schedule</p>
                                                <p className="text-sm font-bold text-brand-dark">{selectedItem.startDate} - {selectedItem.endDate}</p>
                                            </div>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-brand-surface">
                                            <h3 className="font-bold text-sm text-brand-dark uppercase tracking-widest mb-3">Campaign Archive</h3>
                                            <p className="text-sm text-gray-600 leading-relaxed">{selectedItem.details.description}</p>
                                        </div>
                                        <div className="bg-white p-5 rounded-2xl border border-brand-surface">
                                            <h3 className="font-bold text-sm text-brand-dark uppercase tracking-widest mb-3">Media Channels</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedItem.details.mediaChannels?.map((ch: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 bg-brand-surface/20 text-brand-dark rounded-lg text-xs font-bold">{ch}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-gray-100 bg-white">
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="w-full py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal transition-all shadow-md"
                                >
                                    Close Auditor View
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
