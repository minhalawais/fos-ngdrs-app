"use client";

import { useState } from "react";
import {
    Calendar,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Clock,
    Flag,
    Filter,
    Search
} from "lucide-react";
import { generateComplianceFlags, generateSubmissionCalendar } from "@/lib/provincial-mock-data";
import { clsx } from "clsx";

const flags = generateComplianceFlags();
const calendar = generateSubmissionCalendar();

const SEVERITY_STYLES: Record<string, string> = {
    'Critical': 'bg-red-100 text-red-700 border-red-200',
    'Warning': 'bg-orange-100 text-orange-700 border-orange-200',
    'Info': 'bg-blue-100 text-blue-700 border-blue-200',
};

const CALENDAR_STYLES: Record<string, { bg: string; icon: any }> = {
    'onTime': { bg: 'bg-green-100 text-green-700', icon: CheckCircle },
    'late': { bg: 'bg-yellow-100 text-yellow-700', icon: Clock },
    'missing': { bg: 'bg-red-100 text-red-700', icon: XCircle },
    'pending': { bg: 'bg-gray-100 text-gray-500', icon: Clock },
};

export default function ComplianceTrackerPage() {
    const [flagFilter, setFlagFilter] = useState("All");

    const filteredFlags = flags.filter(f =>
        flagFilter === "All" || f.status === flagFilter
    );

    const openFlags = flags.filter(f => f.status === 'Open').length;
    const criticalFlags = flags.filter(f => f.severity === 'Critical').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Calendar className="text-brand-teal" size={28} />
                        Compliance & Audit Tracker
                    </h1>
                    <p className="text-sm text-brand-teal">Monitor district submissions and data quality flags</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 flex items-center gap-2">
                        <Flag size={18} className="text-orange-500" />
                        <span className="text-sm font-bold text-orange-700">{openFlags} Open Flags</span>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-red-500" />
                        <span className="text-sm font-bold text-red-700">{criticalFlags} Critical</span>
                    </div>
                </div>
            </div>

            {/* Submission Calendar */}
            <div className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                <h3 className="font-bold text-brand-dark mb-4">Submission Calendar (Last 6 Months)</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-4 py-3 border-b border-brand-surface">District</th>
                                <th className="px-4 py-3 border-b border-brand-surface text-center">Oct</th>
                                <th className="px-4 py-3 border-b border-brand-surface text-center">Nov</th>
                                <th className="px-4 py-3 border-b border-brand-surface text-center">Dec</th>
                                <th className="px-4 py-3 border-b border-brand-surface text-center">Jan</th>
                                <th className="px-4 py-3 border-b border-brand-surface text-center">Feb</th>
                                <th className="px-4 py-3 border-b border-brand-surface text-center">Mar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-surface">
                            {calendar.map((row) => (
                                <tr key={row.district} className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-bold text-brand-dark">{row.district}</td>
                                    {['oct', 'nov', 'dec', 'jan', 'feb', 'mar'].map((month) => {
                                        const status = row[month as keyof typeof row] as string;
                                        const style = CALENDAR_STYLES[status] || CALENDAR_STYLES.pending;
                                        const Icon = style.icon;
                                        return (
                                            <td key={month} className="px-4 py-3 text-center">
                                                <span className={clsx(
                                                    "inline-flex items-center justify-center w-8 h-8 rounded-lg",
                                                    style.bg
                                                )}>
                                                    <Icon size={16} />
                                                </span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-center gap-6 text-xs">
                    <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-green-100 flex items-center justify-center"><CheckCircle size={14} className="text-green-600" /></span> On Time
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-yellow-100 flex items-center justify-center"><Clock size={14} className="text-yellow-600" /></span> Late
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-red-100 flex items-center justify-center"><XCircle size={14} className="text-red-600" /></span> Missing
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"><Clock size={14} className="text-gray-400" /></span> Pending
                    </span>
                </div>
            </div>

            {/* Quality Flags Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <div className="p-4 border-b border-brand-surface flex items-center justify-between">
                    <h3 className="font-bold text-brand-dark flex items-center gap-2">
                        <Flag size={18} className="text-orange-500" />
                        Data Quality Flags (SOP-5)
                    </h3>
                    <select
                        className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal bg-white text-sm"
                        value={flagFilter}
                        onChange={(e) => setFlagFilter(e.target.value)}
                    >
                        <option value="All">All Flags</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">Flag ID</th>
                            <th className="px-6 py-4 border-b border-brand-surface">District</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Case ID</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Issue Type</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Severity</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Status</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Days Open</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Assigned To</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredFlags.map((flag) => (
                            <tr key={flag.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm font-medium text-brand-dark">{flag.id}</td>
                                <td className="px-6 py-4 font-bold text-brand-dark">{flag.district}</td>
                                <td className="px-6 py-4 font-mono text-sm text-gray-600">{flag.caseId}</td>
                                <td className="px-6 py-4 text-sm text-brand-dark/80">{flag.issueType}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold border",
                                        SEVERITY_STYLES[flag.severity]
                                    )}>
                                        {flag.severity}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold",
                                        flag.status === 'Open' ? "bg-red-50 text-red-700" :
                                            flag.status === 'In Progress' ? "bg-yellow-50 text-yellow-700" :
                                                "bg-green-50 text-green-700"
                                    )}>
                                        {flag.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    {flag.daysOpen > 0 ? (
                                        <span className={clsx(
                                            "font-bold",
                                            flag.daysOpen >= 3 ? "text-red-600" : "text-orange-600"
                                        )}>
                                            {flag.daysOpen} days
                                        </span>
                                    ) : (
                                        <span className="text-gray-400">—</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{flag.assignedTo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
