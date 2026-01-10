"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ClipboardCheck,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    AlertTriangle,
    RotateCcw,
    Eye,
    ChevronRight,
    Clock,
    Flag,
    Send
} from "lucide-react";
import { generatePendingVerifications } from "@/lib/provincial-mock-data";
import { clsx } from "clsx";

const pendingCases = generatePendingVerifications();

const STATUS_STYLES: Record<string, string> = {
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Needs Clarification': 'bg-orange-50 text-orange-700 border-orange-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
};

export default function CaseVerificationPage() {
    const [cases, setCases] = useState(pendingCases);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedCase, setSelectedCase] = useState<any>(null);

    const filteredCases = cases.filter(c =>
        (statusFilter === "All" || c.status === statusFilter) &&
        (c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.district.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleStatusChange = (caseId: string, newStatus: string) => {
        setCases(prev => prev.map(c =>
            c.id === caseId ? { ...c, status: newStatus } : c
        ));
        setSelectedCase(null);
    };

    const pendingCount = cases.filter(c => c.status === 'Pending Review').length;
    const approvedCount = cases.filter(c => c.status === 'Approved').length;
    const returnedCount = cases.filter(c => c.status === 'Returned').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <ClipboardCheck className="text-brand-teal" size={28} />
                        Case Verification Queue
                    </h1>
                    <p className="text-sm text-brand-teal">Review and approve district submissions before forwarding to NCSW</p>
                </div>
                <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2">
                    <Send size={16} /> Forward Approved to NCSW
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <Clock size={24} className="text-gray-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{pendingCount}</p>
                            <p className="text-xs text-gray-500">Pending Review</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Eye size={24} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{cases.filter(c => c.status === 'Under Review').length}</p>
                            <p className="text-xs text-gray-500">Under Review</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{approvedCount}</p>
                            <p className="text-xs text-gray-500">Approved</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <RotateCcw size={24} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{returnedCount}</p>
                            <p className="text-xs text-gray-500">Returned</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Case ID or District..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <select
                        className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending Review">Pending Review</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Needs Clarification">Needs Clarification</option>
                        <option value="Approved">Approved</option>
                        <option value="Returned">Returned</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">Case ID</th>
                            <th className="px-6 py-4 border-b border-brand-surface">District</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Type</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Submitted</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Status</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Completeness</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Flags</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredCases.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{c.caseId}</td>
                                <td className="px-6 py-4 font-bold text-brand-dark">{c.district}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        c.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    )}>
                                        {c.caseType}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{c.submittedOn}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold border",
                                        STATUS_STYLES[c.status] || "bg-gray-100"
                                    )}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={clsx(
                                                    "h-full rounded-full",
                                                    c.completeness >= 90 ? "bg-green-500" :
                                                        c.completeness >= 70 ? "bg-yellow-500" :
                                                            "bg-red-500"
                                                )}
                                                style={{ width: `${c.completeness}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-medium">{c.completeness}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {c.flags.length > 0 ? (
                                        <div className="flex items-center gap-1">
                                            <Flag size={14} className="text-orange-500" />
                                            <span className="text-xs text-orange-600 font-medium">{c.flags.length}</span>
                                        </div>
                                    ) : (
                                        <CheckCircle size={16} className="text-green-500" />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setSelectedCase(c)}
                                            className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal"
                                            title="Review Case"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        {c.status !== 'Approved' && (
                                            <button
                                                onClick={() => handleStatusChange(c.id, 'Approved')}
                                                className="p-2 hover:bg-green-50 rounded-lg text-green-600"
                                                title="Approve"
                                            >
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        {c.status !== 'Returned' && (
                                            <button
                                                onClick={() => handleStatusChange(c.id, 'Returned')}
                                                className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                                                title="Return to District"
                                            >
                                                <RotateCcw size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Review Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedCase(null)}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-brand-dark">Case Review</h2>
                                        <p className="text-sm text-brand-teal">{selectedCase.caseId} • {selectedCase.district}</p>
                                    </div>
                                    <span className={clsx(
                                        "px-3 py-1.5 rounded-lg text-sm font-bold border",
                                        STATUS_STYLES[selectedCase.status]
                                    )}>
                                        {selectedCase.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
                                {/* Completeness Checklist */}
                                <div>
                                    <h3 className="font-bold text-brand-dark mb-3">Data Completeness Checklist</h3>
                                    <div className="space-y-2">
                                        {['Survivor Profile', 'Incident Classification', 'FIR Details', 'Medical Examination', 'Service Referrals'].map((item, idx) => (
                                            <div key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                                {idx < 3 || selectedCase.completeness > 80 ? (
                                                    <CheckCircle size={18} className="text-green-500" />
                                                ) : (
                                                    <AlertTriangle size={18} className="text-orange-500" />
                                                )}
                                                <span className="text-sm font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Flags */}
                                {selectedCase.flags.length > 0 && (
                                    <div>
                                        <h3 className="font-bold text-brand-dark mb-3 flex items-center gap-2">
                                            <Flag size={16} className="text-orange-500" />
                                            Quality Flags
                                        </h3>
                                        <div className="space-y-2">
                                            {selectedCase.flags.map((flag: string, idx: number) => (
                                                <div key={idx} className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-sm text-orange-800">
                                                    {flag}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                                <button
                                    onClick={() => { handleStatusChange(selectedCase.id, 'Returned'); }}
                                    className="flex-1 py-3 bg-white border border-orange-200 text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw size={18} /> Return to District
                                </button>
                                <button
                                    onClick={() => { handleStatusChange(selectedCase.id, 'Approved'); }}
                                    className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-md"
                                >
                                    <CheckCircle size={18} /> Approve & Forward
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
