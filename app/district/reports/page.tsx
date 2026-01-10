"use client";

import { clsx } from "clsx";
import {
    FileSpreadsheet,
    Download,
    Send,
    AlertCircle,
    CheckCircle,
    RefreshCcw,
    FileCheck
} from "lucide-react";

const REPORT_FIELDS = [
    { label: 'Total GBV Cases', value: 142 },
    { label: 'Total TFGBV Cases', value: 36 },
    { label: 'Red Zone Triggered?', value: 'No' },
    { label: 'Top 3 High Risk Locations', value: 'Hayatabad, Saddar, University Rd' },
    { label: 'Service Provision Gap', value: '12%' },
];

export default function ReportsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Compliance Reporting</h2>
                    <p className="text-sm text-brand-teal">Format A (Monthly) & Format B (Case Level)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Status Card */}
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-brand-surface shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-orange-50 border-4 border-orange-100 flex items-center justify-center text-orange-600">
                            <AlertCircle size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-brand-dark">Report Submission Due: Oct 10th</h3>
                            <p className="text-sm text-brand-teal">District Peshawar • Status: <span className="font-bold text-orange-600">Draft Incomplete</span></p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-brand-surface text-brand-dark font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                            <RefreshCcw size={18} /> Re-validate
                        </button>
                        <button className="flex-1 md:flex-none px-8 py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transition-all">
                            Submit to Province <Send size={18} />
                        </button>
                    </div>
                </div>

                {/* Templates Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                        <div className="p-5 border-b border-brand-surface bg-gray-50/50 flex justify-between items-center">
                            <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                <FileSpreadsheet className="text-brand-teal" size={18} />
                                Preview: Template A (Consolidated)
                            </h3>
                            <span className="text-xs font-bold text-gray-400">Generated: Just now</span>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            <div className="col-span-full pb-4 border-b border-dashed border-gray-200 mb-2">
                                <div className="text-xs uppercase font-bold text-gray-400 mb-1">Province / District</div>
                                <div className="text-lg font-bold text-brand-dark">Khyber Pakhtunkhwa / Peshawar</div>
                            </div>

                            {REPORT_FIELDS.map((field, i) => (
                                <div key={i}>
                                    <div className="text-xs text-brand-teal font-medium mb-1">{field.label}</div>
                                    <div className="font-bold text-brand-dark">{field.value}</div>
                                </div>
                            ))}

                            <div className="col-span-full pt-4 mt-2 border-t border-dashed border-gray-200">
                                <div className="text-xs text-brand-teal font-medium mb-1">Urgent Cases Esculated</div>
                                <div className="font-bold text-red-600 flex items-center gap-2">
                                    5 Cases <span className="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full uppercase">Review Required</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 border-t border-brand-surface flex justify-end">
                            <button className="text-xs font-bold text-brand-teal hover:text-brand-dark underline">Edit Data Source</button>
                        </div>
                    </div>
                </div>

                {/* Downloads Side */}
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-2xl border border-brand-surface shadow-sm hover:border-brand-teal transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                <FileCheck size={20} />
                            </div>
                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Ready</span>
                        </div>
                        <h4 className="font-bold text-brand-dark mb-1">Format A: Monthly Summary</h4>
                        <p className="text-xs text-brand-teal mb-4">Consolidated stats for Provincial WDD.</p>
                        <button className="w-full py-2 border border-brand-surface rounded-lg text-xs font-bold text-brand-dark hover:bg-brand-dark hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Download size={14} /> Download Excel
                        </button>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-brand-surface shadow-sm hover:border-brand-teal transition-all group cursor-pointer opacity-70 hover:opacity-100">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <FileSpreadsheet size={20} />
                            </div>
                            <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Validating...</span>
                        </div>
                        <h4 className="font-bold text-brand-dark mb-1">Format B: Case Worksheet</h4>
                        <p className="text-xs text-brand-teal mb-4">Detailed case-by-case registry.</p>
                        <button className="w-full py-2 border border-brand-surface rounded-lg text-xs font-bold text-brand-dark hover:bg-brand-dark hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Download size={14} /> Download Excel
                        </button>
                    </div>

                    <div className="bg-brand-dark p-5 rounded-2xl shadow-lg text-white">
                        <h4 className="font-bold mb-2 flex items-center gap-2"><AlertCircle size={16} className="text-orange-400" /> Validation Log</h4>
                        <ul className="text-xs space-y-2 opacity-80">
                            <li className="flex gap-2 text-red-300">✖ Case #2024-099: Missing Disability Status</li>
                            <li className="flex gap-2 text-green-300">✔ TFGBV Codes Verified</li>
                            <li className="flex gap-2 text-green-300">✔ Date Formats Consistent</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
