"use client";

import { useState } from "react";
import {
    MapPin,
    Search,
    Plus,
    Edit,
    AlertTriangle,
    Users,
    FileText
} from "lucide-react";
import { generateDistrictsRegistry } from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const districts = generateDistrictsRegistry();

export default function DistrictsRegistryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [provinceFilter, setProvinceFilter] = useState("All");

    const filteredDistricts = districts.filter(d =>
        (provinceFilter === "All" || d.province === provinceFilter) &&
        (d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const redZoneCount = districts.filter(d => d.status === 'Red Zone').length;
    const totalCases = districts.reduce((sum, d) => sum + d.casesYTD, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <MapPin className="text-brand-teal" size={28} />
                        Districts Registry
                    </h1>
                    <p className="text-sm text-brand-teal">Manage district configurations, focal points, and risk indices</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    <Plus size={16} /> Add District
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <MapPin size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{districts.length}</p>
                            <p className="text-xs text-gray-500">Total Districts</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <AlertTriangle size={24} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{redZoneCount}</p>
                            <p className="text-xs text-gray-500">Red Zone Districts</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <FileText size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalCases.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Cases YTD</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <Users size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">36M+</p>
                            <p className="text-xs text-gray-500">Population Covered</p>
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
                        placeholder="Search districts..."
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
            </div>

            {/* Districts Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">District</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Province</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Population</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Risk Index</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Cases YTD</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Focal Point</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Status</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredDistricts.map((district) => (
                            <tr key={district.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                                            <MapPin size={18} className="text-brand-teal" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-dark">{district.name}</p>
                                            <p className="text-xs text-gray-400 font-mono">{district.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-600">{district.province}</td>
                                <td className="px-6 py-5 text-sm font-medium text-brand-dark">
                                    {district.population.toLocaleString()}
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-12 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={clsx(
                                                    "h-full rounded-full",
                                                    district.riskIndex >= 75 ? "bg-red-500" :
                                                        district.riskIndex >= 50 ? "bg-orange-500" :
                                                            "bg-brand-teal"
                                                )}
                                                style={{ width: `${district.riskIndex}%` }}
                                            />
                                        </div>
                                        <span className={clsx(
                                            "text-xs font-bold",
                                            district.riskIndex >= 75 ? "text-red-600" :
                                                district.riskIndex >= 50 ? "text-orange-600" :
                                                    "text-brand-teal"
                                        )}>
                                            {district.riskIndex}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-5 font-bold text-brand-dark">{district.casesYTD}</td>
                                <td className="px-6 py-5 text-sm text-gray-600">{district.focalPoint}</td>
                                <td className="px-6 py-5">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold",
                                        district.status === 'Red Zone'
                                            ? "bg-red-100 text-red-700"
                                            : "bg-green-100 text-green-700"
                                    )}>
                                        {district.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-2 hover:bg-brand-surface rounded-lg text-gray-400 hover:text-brand-teal transition-colors opacity-60 group-hover:opacity-100">
                                        <Edit size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
