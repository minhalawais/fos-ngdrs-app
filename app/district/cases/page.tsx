"use client";

import { useState } from "react";
import {
    Search,
    Filter,
    MoreHorizontal,
    FileEdit,
    Eye,
    Trash2,
    CheckCircle2,
    Clock,
    AlertTriangle,
    XCircle
} from "lucide-react";
import { generateCaseRepository } from "@/lib/district-mock-data";
import { clsx } from "clsx";
import CaseDetailView from "@/components/district/CaseDetailView";
import { AnimatePresence } from "framer-motion";

const initialCases = generateCaseRepository();

const STATUS_Styles = {
    'Reported': 'bg-gray-100 text-gray-700 border-gray-200',
    'FIR Registered': 'bg-blue-50 text-blue-700 border-blue-200',
    'Investigation': 'bg-amber-50 text-amber-700 border-amber-200',
    'Trial': 'bg-purple-50 text-purple-700 border-purple-200',
    'Closed': 'bg-green-50 text-green-700 border-green-200'
};

const RISK_Styles = {
    'Critical': 'bg-red-100 text-red-700 border-red-200',
    'High': 'bg-orange-100 text-orange-700 border-orange-200',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Low': 'bg-green-100 text-green-700 border-green-200'
};

export default function CaseRepositoryPage() {
    const [cases, setCases] = useState(initialCases);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedCase, setSelectedCase] = useState<any>(null);
    const [startEditing, setStartEditing] = useState(false);

    const handleCaseUpdate = (updatedCase: any) => {
        setCases(prev => prev.map(c => c.id === updatedCase.id ? updatedCase : c));
        setSelectedCase(null);
        setStartEditing(false);
    };

    const filteredCases = cases.filter(c =>
        (statusFilter === "All" || c.status === statusFilter) &&
        (c.survivor.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Case Repository</h2>
                    <p className="text-sm text-brand-teal">Manage & Update Monthly Case Status</p>
                </div>
                <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    Export Excel (Format B)
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Case ID or Survivor Name..."
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select
                            className="pl-10 pr-8 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Reported">Reported</option>
                            <option value="FIR Registered">FIR Registered</option>
                            <option value="Investigation">Investigation</option>
                            <option value="Trial">Trial</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">Case ID</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Survivor (Masked)</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Category</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Current Status</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Risk Level</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Last Update</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredCases.map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{c.id}</td>
                                <td className="px-6 py-4 font-bold text-brand-dark">{c.survivor}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        c.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    )}>
                                        {c.caseType}
                                    </span>
                                    <span className="ml-2 text-sm text-brand-dark/80">{c.category}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold border",
                                        STATUS_Styles[c.status as keyof typeof STATUS_Styles] || "bg-gray-100"
                                    )}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold border flex items-center gap-1 w-fit",
                                        RISK_Styles[c.risk as keyof typeof RISK_Styles] || "bg-gray-100"
                                    )}>
                                        {c.risk === 'Critical' && <AlertTriangle size={12} />}
                                        {c.risk}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">{c.lastUpdate}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => { setSelectedCase(c); setStartEditing(true); }}
                                            className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-transform active:scale-95"
                                            title="Update Status"
                                        >
                                            <FileEdit size={16} />
                                        </button>
                                        <button
                                            onClick={() => setSelectedCase(c)}
                                            className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-transform active:scale-95"
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Detail Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <CaseDetailView
                        caseData={selectedCase}
                        initialEditing={startEditing}
                        onClose={() => { setSelectedCase(null); setStartEditing(false); }}
                        onSave={handleCaseUpdate}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
