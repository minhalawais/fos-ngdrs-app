"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Trophy,
    TrendingUp,
    TrendingDown,
    Minus,
    Search,
    Filter,
    ExternalLink,
    AlertTriangle,
    CheckCircle
} from "lucide-react";
import { generateDistrictLeaderboard } from "@/lib/provincial-mock-data";
import { clsx } from "clsx";

const leaderboard = generateDistrictLeaderboard();

export default function DistrictPerformancePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState<'complianceScore' | 'convictionRate' | 'avgResponseTime'>('complianceScore');

    const filteredData = leaderboard
        .filter(d => d.district.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'avgResponseTime') {
                return parseFloat(a[sortBy]) - parseFloat(b[sortBy]);
            }
            return parseFloat(b[sortBy] as string) - parseFloat(a[sortBy] as string);
        });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Trophy className="text-yellow-500" size={28} />
                        District Performance Leaderboard
                    </h1>
                    <p className="text-sm text-brand-teal">Rankings based on compliance, response time, and outcomes</p>
                </div>
                <button className="px-5 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    Export Rankings
                </button>
            </div>

            {/* Top 3 Podium */}
            <div className="grid grid-cols-3 gap-4">
                {filteredData.slice(0, 3).map((district, idx) => (
                    <motion.div
                        key={district.district}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={clsx(
                            "relative bg-white rounded-2xl border p-6 shadow-sm overflow-hidden",
                            idx === 0 ? "border-yellow-300 ring-2 ring-yellow-100" :
                                idx === 1 ? "border-gray-300" :
                                    "border-orange-200"
                        )}
                    >
                        {/* Rank Badge */}
                        <div className={clsx(
                            "absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold",
                            idx === 0 ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg" :
                                idx === 1 ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white" :
                                    "bg-gradient-to-br from-orange-300 to-orange-500 text-white"
                        )}>
                            #{idx + 1}
                        </div>

                        <h3 className="text-xl font-bold text-brand-dark mb-1">{district.district}</h3>
                        <p className="text-sm text-brand-teal mb-4">{district.totalCases} cases this month</p>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-400 text-xs uppercase">Compliance</p>
                                <p className="font-bold text-green-600">{district.complianceScore}%</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs uppercase">Conviction</p>
                                <p className="font-bold text-brand-dark">{district.convictionRate}%</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs uppercase">Response</p>
                                <p className="font-bold text-brand-dark">{district.avgResponseTime} days</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs uppercase">Service Gap</p>
                                <p className="font-bold text-orange-600">{district.serviceGap}%</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search districts..."
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
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                        >
                            <option value="complianceScore">Sort by Compliance</option>
                            <option value="convictionRate">Sort by Conviction Rate</option>
                            <option value="avgResponseTime">Sort by Response Time</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Full Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">Rank</th>
                            <th className="px-6 py-4 border-b border-brand-surface">District</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Cases</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Compliance</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Response Time</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Conviction</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Service Gap</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Trend</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Submission</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredData.map((district, idx) => (
                            <tr key={district.district} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                                        idx === 0 ? "bg-yellow-100 text-yellow-700" :
                                            idx === 1 ? "bg-gray-100 text-gray-700" :
                                                idx === 2 ? "bg-orange-100 text-orange-700" :
                                                    "bg-brand-surface/50 text-gray-500"
                                    )}>
                                        {idx + 1}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-bold text-brand-dark">{district.district}</td>
                                <td className="px-6 py-4 text-sm text-brand-dark/80">{district.totalCases}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={clsx(
                                                    "h-full rounded-full",
                                                    district.complianceScore >= 90 ? "bg-green-500" :
                                                        district.complianceScore >= 70 ? "bg-yellow-500" :
                                                            "bg-red-500"
                                                )}
                                                style={{ width: `${district.complianceScore}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold">{district.complianceScore}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={clsx(
                                        "font-bold",
                                        parseFloat(district.avgResponseTime) <= 3 ? "text-green-600" :
                                            parseFloat(district.avgResponseTime) <= 5 ? "text-yellow-600" :
                                                "text-red-600"
                                    )}>
                                        {district.avgResponseTime} days
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-bold text-brand-dark">{district.convictionRate}%</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className={clsx(
                                        "font-bold",
                                        parseFloat(district.serviceGap) <= 10 ? "text-green-600" :
                                            parseFloat(district.serviceGap) <= 20 ? "text-yellow-600" :
                                                "text-red-600"
                                    )}>
                                        {district.serviceGap}%
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {district.trend === 'up' ? (
                                        <TrendingUp size={18} className="text-green-500" />
                                    ) : district.trend === 'down' ? (
                                        <TrendingDown size={18} className="text-red-500" />
                                    ) : (
                                        <Minus size={18} className="text-gray-400" />
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold",
                                        district.status === 'On Time' ? "bg-green-50 text-green-700" :
                                            district.status === 'Late' ? "bg-yellow-50 text-yellow-700" :
                                                "bg-red-50 text-red-700"
                                    )}>
                                        {district.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
