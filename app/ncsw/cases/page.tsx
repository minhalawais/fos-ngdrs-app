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
    AlertTriangle
} from "lucide-react";
import { generateNationalCases } from "@/lib/ncsw-mock-data";
import { generateCaseRepository, GBV_STAGES, TFGBV_STAGES, FIELD_LABELS } from "@/lib/district-mock-data";
import { clsx } from "clsx";

const nationalCases = generateNationalCases();
const detailedCases = generateCaseRepository(); // For timeline view

const STATUS_STYLES: Record<string, string> = {
    'Reported': 'bg-gray-100 text-gray-700',
    'FIR Registered': 'bg-blue-50 text-blue-700',
    'Investigation': 'bg-amber-50 text-amber-700',
    'Trial': 'bg-purple-50 text-purple-700',
    'Closed': 'bg-green-50 text-green-700',
};

const VERIFICATION_STYLES: Record<string, string> = {
    'Published': 'bg-green-100 text-green-700 border-green-200',
    'Provincial Verified': 'bg-blue-100 text-blue-700 border-blue-200',
    'Pending': 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function CaseExplorerPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [provinceFilter, setProvinceFilter] = useState("All");
    const [typeFilter, setTypeFilter] = useState("All");
    const [selectedCase, setSelectedCase] = useState<any>(null);

    const filteredCases = nationalCases.filter(c =>
        (provinceFilter === "All" || c.province === provinceFilter) &&
        (typeFilter === "All" || c.caseType === typeFilter) &&
        (c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.district.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Get detailed case data for timeline view
    const getDetailedCase = (caseId: string) => {
        return detailedCases.find(c => c.id === caseId) || detailedCases[0];
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Search className="text-brand-teal" size={28} />
                        National Case Explorer
                    </h1>
                    <p className="text-sm text-brand-teal">Search and view case timelines across all provinces (read-only)</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-medium">Published: 30</span>
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg font-medium">Verified: 10</span>
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg font-medium">Pending: 10</span>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Case ID or District..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
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
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="GBV">GBV</option>
                    <option value="TFGBV">TFGBV</option>
                </select>
            </div>

            {/* Cases Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">Case ID</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Province / District</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Type</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Status</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Risk</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Verification</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Reported</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-right">View</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredCases.slice(0, 20).map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{c.id}</td>
                                <td className="px-6 py-4">
                                    <div>
                                        <span className="font-bold text-brand-dark">{c.province}</span>
                                        <p className="text-xs text-gray-400 flex items-center gap-1">
                                            <MapPin size={10} /> {c.district}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        c.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    )}>
                                        {c.caseType}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold",
                                        STATUS_STYLES[c.status]
                                    )}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded text-xs font-bold",
                                        c.risk === 'Critical' ? "bg-red-100 text-red-700" :
                                            c.risk === 'High' ? "bg-orange-100 text-orange-700" :
                                                c.risk === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                                                    "bg-green-100 text-green-700"
                                    )}>
                                        {c.risk}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold border",
                                        VERIFICATION_STYLES[c.verificationStatus]
                                    )}>
                                        {c.verificationStatus}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{c.reportedDate}</td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => setSelectedCase(getDetailedCase(c.id))}
                                        className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal opacity-60 group-hover:opacity-100 transition-opacity"
                                        title="View Timeline"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Case Timeline Modal (Read-Only) */}
            <AnimatePresence>
                {selectedCase && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedCase(null)}>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 bg-brand-surface/20">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="px-2.5 py-1 bg-brand-dark text-white text-xs font-bold rounded-lg tracking-wider font-mono">
                                                {selectedCase.id}
                                            </span>
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                                selectedCase.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-blue-100 text-blue-700 border-blue-200"
                                            )}>
                                                {selectedCase.caseType}
                                            </span>
                                            <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold border border-green-200">
                                                READ-ONLY
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-brand-dark">Case Timeline (Audit View)</h2>
                                        <p className="text-sm text-brand-teal">National-level read-only access</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCase(null)}
                                        className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* Data Lineage */}
                                <div className="flex items-center gap-2 text-xs bg-brand-surface/50 p-3 rounded-xl">
                                    <span className="font-bold text-brand-dark">Data Lineage:</span>
                                    <span className="px-2 py-0.5 bg-white rounded text-gray-600">District Created</span>
                                    <span>→</span>
                                    <span className="px-2 py-0.5 bg-white rounded text-gray-600">Provincial Verified</span>
                                    <span>→</span>
                                    <span className="px-2 py-0.5 bg-green-100 rounded text-green-700 font-bold">NCSW Published</span>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="flex-1 overflow-y-auto p-6 bg-brand-canvas">
                                <div className="space-y-4">
                                    {selectedCase.timeline?.map((stage: any, idx: number) => {
                                        const isCompleted = stage.status === 'Completed';
                                        return (
                                            <div key={stage.id || idx} className="relative pl-12">
                                                {/* Connector */}
                                                {idx !== selectedCase.timeline.length - 1 && (
                                                    <div className={clsx(
                                                        "absolute left-[23px] top-12 bottom-[-16px] w-0.5",
                                                        isCompleted ? "bg-brand-teal" : "bg-gray-200"
                                                    )} />
                                                )}

                                                {/* Icon */}
                                                <div className={clsx(
                                                    "absolute left-0 top-3 w-12 h-12 rounded-full flex items-center justify-center border-4 z-10",
                                                    isCompleted
                                                        ? "bg-brand-teal border-white text-white"
                                                        : stage.status === 'In Progress'
                                                            ? "bg-blue-500 border-white text-white"
                                                            : "bg-white border-gray-200 text-gray-300"
                                                )}>
                                                    {isCompleted ? <CheckCircle size={20} /> : <Clock size={20} />}
                                                </div>

                                                {/* Card */}
                                                <div className={clsx(
                                                    "bg-white rounded-2xl border p-4",
                                                    isCompleted ? "border-brand-teal/30" : "border-gray-200"
                                                )}>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <h3 className="font-bold text-brand-dark">{stage.stage}</h3>
                                                        <span className={clsx(
                                                            "text-[10px] font-bold uppercase px-2 py-1 rounded",
                                                            isCompleted ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                                                        )}>
                                                            {stage.status}
                                                        </span>
                                                    </div>
                                                    {stage.date !== 'N/A' && (
                                                        <p className="text-xs text-gray-400 mb-3">Date: {stage.date}</p>
                                                    )}
                                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                                        {Object.entries(stage.details || {}).slice(0, 4).map(([key, value]) => (
                                                            <div key={key}>
                                                                <p className="text-[10px] text-gray-400 uppercase">{FIELD_LABELS[key] || key}</p>
                                                                <p className="font-medium text-brand-dark">{(value as string) || '—'}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
                                <button className="flex-1 py-3 bg-orange-50 text-orange-600 font-bold rounded-xl border border-orange-200 hover:bg-orange-100 transition-all flex items-center justify-center gap-2">
                                    <AlertTriangle size={18} /> Create Data Request
                                </button>
                                <button
                                    onClick={() => setSelectedCase(null)}
                                    className="flex-1 py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
