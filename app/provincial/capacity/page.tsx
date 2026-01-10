"use client";

import {
    Building2,
    CheckCircle,
    XCircle,
    AlertTriangle,
    MapPin,
    Users,
    FileText,
    Shield
} from "lucide-react";
import { generateInstitutionalCapacity } from "@/lib/provincial-mock-data";
import { clsx } from "clsx";

const data = generateInstitutionalCapacity();

const GAP_STYLES: Record<string, { icon: any; color: string; bg: string }> = {
    'adequate': { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' },
    'gap': { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
    'not available': { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
};

export default function InstitutionalCapacityPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Building2 className="text-brand-teal" size={28} />
                        Institutional Capacity
                    </h1>
                    <p className="text-sm text-brand-teal">Monitor specialized units and identify resource gaps</p>
                </div>
                <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    Export Capacity Report
                </button>
            </div>

            {/* Units Directory */}
            <div className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm">
                <h3 className="font-bold text-brand-dark mb-6 flex items-center gap-2">
                    <Shield size={18} className="text-brand-teal" />
                    Specialized Units Directory
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.units.map((unit, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-brand-teal transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                                    <Building2 size={24} className="text-brand-teal" />
                                </div>
                                <span className={clsx(
                                    "px-2.5 py-1 rounded-lg text-xs font-bold",
                                    unit.compliant === unit.count
                                        ? "bg-green-100 text-green-700"
                                        : "bg-orange-100 text-orange-700"
                                )}>
                                    {unit.compliant}/{unit.count} Compliant
                                </span>
                            </div>
                            <h4 className="font-bold text-brand-dark mb-2">{unit.type}</h4>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500">Last Audit</span>
                                <span className="font-medium text-brand-dark">{unit.lastAudit}</span>
                            </div>
                            <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={clsx(
                                        "h-full rounded-full",
                                        unit.compliant === unit.count ? "bg-green-500" : "bg-orange-500"
                                    )}
                                    style={{ width: `${(unit.compliant / unit.count) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Resource Gap Analysis */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <div className="p-6 border-b border-brand-surface">
                    <h3 className="font-bold text-brand-dark flex items-center gap-2">
                        <MapPin size={18} className="text-brand-teal" />
                        Resource Gap Analysis by District
                    </h3>
                    <p className="text-sm text-brand-teal">Identifying districts with service provision gaps (NCSW Format A, Field 122)</p>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">District</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-center">Medical</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-center">Psychosocial</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-center">Shelter</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-center">Legal Aid</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-center">Digital Forensics</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {data.resourceGaps.map((row) => (
                            <tr key={row.district} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-brand-dark">{row.district}</td>
                                {['medical', 'psychosocial', 'shelter', 'legal', 'forensics'].map((field) => {
                                    const status = row[field as keyof typeof row] as string;
                                    const style = GAP_STYLES[status] || GAP_STYLES.gap;
                                    const Icon = style.icon;
                                    return (
                                        <td key={field} className="px-6 py-4 text-center">
                                            <span className={clsx(
                                                "inline-flex items-center justify-center w-10 h-10 rounded-xl",
                                                style.bg
                                            )}>
                                                <Icon size={20} className={style.color} />
                                            </span>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 bg-gray-50 border-t border-brand-surface flex justify-center gap-8 text-xs">
                    <span className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" /> Adequate
                    </span>
                    <span className="flex items-center gap-2">
                        <AlertTriangle size={16} className="text-orange-500" /> Gap Identified
                    </span>
                    <span className="flex items-center gap-2">
                        <XCircle size={16} className="text-red-500" /> Not Available
                    </span>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="text-3xl font-bold text-brand-dark">45</div>
                    <p className="text-sm text-gray-500">Total Specialized Units</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="text-3xl font-bold text-green-600">37</div>
                    <p className="text-sm text-gray-500">SOP Compliant</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="text-3xl font-bold text-orange-600">8</div>
                    <p className="text-sm text-gray-500">Gaps Identified</p>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="text-3xl font-bold text-red-600">3</div>
                    <p className="text-sm text-gray-500">Critical Shortages</p>
                </div>
            </div>
        </div>
    );
}
