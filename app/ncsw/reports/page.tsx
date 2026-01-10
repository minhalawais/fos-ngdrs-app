"use client";

import {
    FileText,
    Download,
    Calendar,
    CheckCircle,
    Clock,
    BarChart3,
    Globe,
    Printer
} from "lucide-react";
import { clsx } from "clsx";

const reports = [
    {
        id: 'RPT-2024-Q4',
        title: 'Annual GBV & TFGBV Data Transparency Report',
        subtitle: 'FY 2024 (Q1-Q4)',
        status: 'Ready',
        type: 'Annual',
        pages: 124,
        lastUpdated: '2024-01-15'
    },
    {
        id: 'RPT-2024-Q3',
        title: 'Quarterly Statistical Bulletin',
        subtitle: 'Q3 2024 (Jul-Sep)',
        status: 'Published',
        type: 'Quarterly',
        pages: 48,
        lastUpdated: '2024-10-15'
    },
    {
        id: 'RPT-CEDAW-2024',
        title: 'CEDAW Periodic Report Supplement',
        subtitle: 'GBV Data Annex',
        status: 'Draft',
        type: 'Treaty',
        pages: 32,
        lastUpdated: '2024-01-10'
    },
    {
        id: 'RPT-SDG5-2024',
        title: 'SDG 5 Progress Report',
        subtitle: 'National Indicators',
        status: 'Ready',
        type: 'International',
        pages: 28,
        lastUpdated: '2024-01-12'
    },
];

const sections = [
    { name: 'Executive Summary', pages: '1-4', status: 'Complete' },
    { name: 'National Case Statistics', pages: '5-24', status: 'Complete' },
    { name: 'Provincial Breakdown', pages: '25-48', status: 'Complete' },
    { name: 'Case Attrition Analysis', pages: '49-64', status: 'Complete' },
    { name: 'Service Provision Gaps', pages: '65-78', status: 'Complete' },
    { name: 'TFGBV Platform Accountability', pages: '79-92', status: 'Complete' },
    { name: 'Treaty Compliance Status', pages: '93-108', status: 'In Review' },
    { name: 'Recommendations', pages: '109-124', status: 'Draft' },
];

const TYPE_COLORS: Record<string, string> = {
    'Annual': 'bg-purple-100 text-purple-700',
    'Quarterly': 'bg-blue-100 text-blue-700',
    'Treaty': 'bg-green-100 text-green-700',
    'International': 'bg-orange-100 text-orange-700',
};

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <FileText className="text-brand-teal" size={28} />
                        Annual Reports & Exports
                    </h1>
                    <p className="text-sm text-brand-teal">Generate and publish mandatory transparency reports</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    <BarChart3 size={16} /> Generate New Report
                </button>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reports.map((report) => (
                    <div
                        key={report.id}
                        className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={clsx(
                                    "px-2.5 py-1 rounded-lg text-xs font-bold mb-2 inline-block",
                                    TYPE_COLORS[report.type]
                                )}>
                                    {report.type}
                                </span>
                                <h3 className="font-bold text-brand-dark text-lg">{report.title}</h3>
                                <p className="text-sm text-gray-500">{report.subtitle}</p>
                            </div>
                            <span className={clsx(
                                "px-2.5 py-1 rounded-lg text-xs font-bold",
                                report.status === 'Ready' ? "bg-green-100 text-green-700" :
                                    report.status === 'Published' ? "bg-blue-100 text-blue-700" :
                                        "bg-yellow-100 text-yellow-700"
                            )}>
                                {report.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <span className="flex items-center gap-1">
                                <FileText size={14} /> {report.pages} pages
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={14} /> {report.lastUpdated}
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 py-2 px-4 bg-brand-surface/50 text-brand-dark font-bold rounded-xl text-sm hover:bg-brand-surface transition-all flex items-center justify-center gap-2">
                                <Printer size={16} /> Preview
                            </button>
                            <button className="flex-1 py-2 px-4 bg-brand-dark text-white font-bold rounded-xl text-sm hover:bg-brand-teal transition-all flex items-center justify-center gap-2">
                                <Download size={16} /> Export PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Annual Report Builder */}
            <div className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <FileText size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <h3 className="font-bold text-brand-dark">Annual Transparency Report Builder</h3>
                            <p className="text-xs text-brand-teal">FY 2024 • Auto-populated from dashboard data</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-brand-surface/50 text-brand-dark font-bold rounded-xl text-sm hover:bg-brand-surface">
                            Save Draft
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white font-bold rounded-xl text-sm hover:bg-green-700 flex items-center gap-2">
                            <Globe size={16} /> Publish Publicly
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-brand-surface/30 rounded-xl hover:bg-brand-surface/50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-white text-gray-500 flex items-center justify-center text-sm font-bold border border-brand-surface">
                                    {idx + 1}
                                </span>
                                <div>
                                    <p className="font-bold text-brand-dark">{section.name}</p>
                                    <p className="text-xs text-gray-400">Pages {section.pages}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={clsx(
                                    "px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1",
                                    section.status === 'Complete' ? "bg-green-100 text-green-700" :
                                        section.status === 'In Review' ? "bg-blue-100 text-blue-700" :
                                            "bg-yellow-100 text-yellow-700"
                                )}>
                                    {section.status === 'Complete' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                    {section.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Export Options */}
            <div className="bg-gradient-to-br from-brand-dark to-brand-dark/90 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Export Options</h3>
                        <p className="text-brand-teal text-sm">Download data in multiple formats</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2">
                            <Download size={16} /> Excel Workbook
                        </button>
                        <button className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2">
                            <BarChart3 size={16} /> PowerBI Package
                        </button>
                        <button className="px-6 py-3 bg-white text-brand-dark font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center gap-2">
                            <FileText size={16} /> Full PDF Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
