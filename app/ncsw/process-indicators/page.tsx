"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Database,
    Search,
    Filter,
    Download,
    Eye,
    X,
    Activity,
    CheckCircle2,
    AlertTriangle,
    BarChart3,
    ArrowUpRight,
    ArrowDownRight,
    Scale,
    FileText,
    Calendar,
    UserCheck
} from "lucide-react";
import { generateIndicatorSubmissions, INDICATOR_CATEGORIES } from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const allIndicators = generateIndicatorSubmissions();

const STATUS_STYLES: Record<string, string> = {
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
    'Needs Clarification': 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function ProcessIndicatorsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [selectedIndicator, setSelectedIndicator] = useState<any>(null);

    // Filter logic
    const filteredIndicators = allIndicators.filter((ind: any) =>
        (categoryFilter === "All" || ind.category === categoryFilter) &&
        (ind.indicatorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ind.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ind.province.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Aggregate Stats
    const totalIndicators = filteredIndicators.length;
    const meetingTarget = filteredIndicators.filter(i => i.currentValue >= i.targetValue).length;
    const complianceRate = totalIndicators > 0 ? Math.round((meetingTarget / totalIndicators) * 100) : 0;
    const criticalFlags = filteredIndicators.filter(i => i.currentValue < (i.targetValue * 0.5)).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Database className="text-brand-teal" size={28} />
                        Process Indicators Registry
                    </h1>
                    <p className="text-sm text-brand-teal">Monitoring metrics for SOP implementation and legal compliance</p>
                </div>
                <button className="px-5 py-2 bg-white border border-brand-surface hover:bg-gray-50 text-brand-dark font-bold rounded-xl text-sm shadow-sm transition-all flex items-center gap-2">
                    <Download size={16} /> Export Data
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalIndicators}</p>
                            <p className="text-xs text-gray-500">Total Indicators</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{complianceRate}%</p>
                            <p className="text-xs text-gray-500">Meeting Targets</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{criticalFlags}</p>
                            <p className="text-xs text-gray-500">Critical Flags</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <BarChart3 size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{meetingTarget}/{totalIndicators}</p>
                            <p className="text-xs text-gray-500">Performance Ratio</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Table Container */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                {/* Filter Bar */}
                <div className="p-4 border-b border-brand-surface bg-gray-50/50 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search indicators, districts, or provinces..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-400" />
                        <select
                            className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white min-w-[200px]"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="All">All Categories</option>
                            {INDICATOR_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Indicator ID</th>
                                <th className="px-6 py-4">Indicator Name</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Current Value</th>
                                <th className="px-6 py-4">Target</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-surface">
                            {filteredIndicators.map((ind) => (
                                <tr key={ind.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{ind.id}</td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-brand-dark block max-w-xs">{ind.indicatorName}</span>
                                        <span className="text-xs text-gray-400">{ind.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <span className="font-bold text-brand-dark text-sm">{ind.province}</span>
                                            <p className="text-xs text-gray-400">{ind.district}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-brand-dark">{ind.currentValue}</span>
                                            <span className="text-xs text-gray-500">{ind.unit}</span>
                                            {ind.trend === 'up' ?
                                                <ArrowUpRight size={14} className="text-green-500" /> :
                                                <ArrowDownRight size={14} className="text-red-500" />
                                            }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {ind.targetValue} {ind.unit}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border",
                                            ind.currentValue >= ind.targetValue ? "bg-green-50 text-green-700 border-green-200" :
                                                ind.currentValue >= (ind.targetValue * 0.7) ? "bg-orange-50 text-orange-700 border-orange-200" :
                                                    "bg-red-50 text-red-700 border-red-200"
                                        )}>
                                            {ind.currentValue >= ind.targetValue ? 'On Track' : 'At Risk'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => setSelectedIndicator(ind)}
                                            className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Read-Only Detail Modal */}
            <AnimatePresence>
                {selectedIndicator && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedIndicator(null)}>
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="w-full max-w-2xl bg-white shadow-2xl h-full flex flex-col overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 bg-brand-surface/20 flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 bg-brand-dark text-white text-xs font-mono rounded">{selectedIndicator.id}</span>
                                        <span className={clsx("px-2 py-1 rounded text-xs font-bold border", STATUS_STYLES[selectedIndicator.status])}>{selectedIndicator.status}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-brand-dark">{selectedIndicator.indicatorName}</h2>
                                    <p className="text-sm text-brand-teal mt-1">{selectedIndicator.category}</p>
                                </div>
                                <button onClick={() => setSelectedIndicator(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Performance Visualization */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white rounded-xl border border-gray-200 text-center relative overflow-hidden">
                                        <div className={clsx("absolute top-0 left-0 w-1 h-full", selectedIndicator.trend === 'up' ? "bg-green-500" : "bg-red-500")} />
                                        <p className="text-sm text-gray-500 mb-1">Current Value</p>
                                        <p className="text-3xl font-bold text-brand-dark">{selectedIndicator.currentValue} <span className="text-sm font-normal text-gray-400">{selectedIndicator.unit}</span></p>
                                        <div className="flex items-center justify-center gap-1 mt-2 text-xs font-bold text-gray-500">
                                            {selectedIndicator.trend === 'up' ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownRight size={14} className="text-red-500" />}
                                            vs Previous Period
                                        </div>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                                        <p className="text-sm text-gray-500 mb-1">Target Goal</p>
                                        <p className="text-3xl font-bold text-gray-400">{selectedIndicator.targetValue} <span className="text-sm font-normal text-gray-300">{selectedIndicator.unit}</span></p>
                                        <p className="text-xs text-brand-teal mt-2">Achieved: {Math.round((selectedIndicator.currentValue / selectedIndicator.targetValue) * 100)}%</p>
                                    </div>
                                </div>

                                {/* Verification Data */}
                                <div className="bg-white p-5 rounded-xl border border-gray-200">
                                    <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-green-600" /> Data Verification
                                    </h3>
                                    <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Methodology</span>
                                            <p className="font-medium text-gray-700">{selectedIndicator.details.methodology}</p>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Data Source</span>
                                            <p className="font-medium text-gray-700">{selectedIndicator.details.dataSource}</p>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Verified By</span>
                                            <div className="flex items-center gap-2">
                                                <UserCheck size={14} className="text-brand-teal" />
                                                <p className="font-medium text-gray-700">{selectedIndicator.details.verifiedBy}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="block text-xs font-bold text-gray-400 uppercase mb-1">Verification Date</span>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-400" />
                                                <p className="font-medium text-gray-700">{selectedIndicator.details.verificationDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments/Notes */}
                                <div className="space-y-3">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <FileText size={14} /> Reporting Notes
                                    </h3>
                                    <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 italic border border-gray-100">
                                        "Data collected through semi-annual district reports. Validated against provincial registry records. Minor discrepancies noted in remote area reporting."
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
