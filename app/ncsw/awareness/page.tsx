"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Search,
    Filter,
    Download,
    Eye,
    X,
    Megaphone,
    Users,
    Wallet,
    Calendar,
    MapPin,
    Radio,
    Tv,
    Smartphone,
    Languages,
    Globe
} from "lucide-react";
import { generateAwarenessSubmissions } from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const allCampaigns = generateAwarenessSubmissions();

const STATUS_STYLES: Record<string, string> = {
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
    'Needs Clarification': 'bg-orange-50 text-orange-700 border-orange-200',
};

const CHANNEL_ICONS: Record<string, any> = {
    'Social Media': Smartphone,
    'TV': Tv,
    'Radio': Radio,
    'Community': Users,
    'Print': BookOpen,
    'Web': Globe
};

export default function AwarenessActionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    // Filter logic
    const filteredCampaigns = allCampaigns.filter((campaign: any) =>
        (statusFilter === "All" || campaign.status === statusFilter) &&
        (campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.province.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Aggregate Stats
    const totalCampaigns = filteredCampaigns.length;
    const totalReach = filteredCampaigns.reduce((acc, curr) => acc + curr.reachEstimate, 0);
    const uniqueChannels = new Set(filteredCampaigns.map(c => c.type)).size;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Megaphone className="text-brand-teal" size={28} />
                        Awareness Campaigns Registry
                    </h1>
                    <p className="text-sm text-brand-teal">Archive of public awareness initiatives and media campaigns</p>
                </div>
                <button className="px-5 py-2 bg-white border border-brand-surface hover:bg-gray-50 text-brand-dark font-bold rounded-xl text-sm shadow-sm transition-all flex items-center gap-2">
                    <Download size={16} /> Export Registry
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <Megaphone size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalCampaigns}</p>
                            <p className="text-xs text-gray-500">Total Campaigns</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{(totalReach / 1000000).toFixed(1)}M+</p>
                            <p className="text-xs text-gray-500">Estimated Reach</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                            <Tv size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{uniqueChannels}</p>
                            <p className="text-xs text-gray-500">Media Channels</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <Languages size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">Urdu, Eng</p>
                            <p className="text-xs text-gray-500">Primary Languages</p>
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
                            placeholder="Search campaigns, districts, or provinces..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-400" />
                        <select
                            className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white min-w-[150px]"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Approved">Approved</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Pending Review">Pending Review</option>
                            <option value="Returned">Returned</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Campaign ID</th>
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Channel</th>
                                <th className="px-6 py-4">Est. Reach</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-surface">
                            {filteredCampaigns.map((campaign) => {
                                const ChannelIcon = CHANNEL_ICONS[campaign.type.split(' ')[0]] || Megaphone;
                                return (
                                    <tr key={campaign.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{campaign.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-brand-dark block max-w-xs truncate" title={campaign.title}>{campaign.title}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <span className="font-bold text-brand-dark text-sm">{campaign.province}</span>
                                                <p className="text-xs text-gray-400">{campaign.district}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded bg-orange-50 flex items-center justify-center text-orange-600">
                                                    <ChannelIcon size={12} />
                                                </div>
                                                <span className="text-sm text-gray-700">{campaign.type.split(' ')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-sm text-brand-dark">
                                            {campaign.reachEstimate.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[campaign.status])}>
                                                {campaign.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedCampaign(campaign)}
                                                className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal transition-colors"
                                            >
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Read-Only Detail Modal */}
            <AnimatePresence>
                {selectedCampaign && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedCampaign(null)}>
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
                                        <span className="px-2 py-1 bg-brand-dark text-white text-xs font-mono rounded">{selectedCampaign.id}</span>
                                        <span className={clsx("px-2 py-1 rounded text-xs font-bold border", STATUS_STYLES[selectedCampaign.status])}>{selectedCampaign.status}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-brand-dark">{selectedCampaign.title}</h2>
                                    <p className="text-sm text-brand-teal mt-1">{selectedCampaign.district}, {selectedCampaign.province}</p>
                                </div>
                                <button onClick={() => setSelectedCampaign(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Key Metrics Bar */}
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                                        <Users size={16} /> <span className="text-xs font-bold uppercase">Estimated Reach</span>
                                    </div>
                                    <p className="text-xl font-bold text-brand-dark">{selectedCampaign.reachEstimate.toLocaleString()}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <BookOpen size={14} /> Campaign Details
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed bg-white p-4 border border-gray-100 rounded-xl">
                                        {selectedCampaign.details.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Tv size={14} /> Media Channels
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCampaign.details.channels.map((ch: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                                                    {ch}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-2">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                                                <Languages size={14} /> <span className="font-bold">Languages</span>
                                            </div>
                                            <p className="text-sm text-brand-dark">{selectedCampaign.details.languages.join(", ")}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Calendar size={14} /> Schedule
                                        </h3>
                                        <div className="text-sm text-gray-700">
                                            <p><span className="font-semibold">Start:</span> {selectedCampaign.startDate}</p>
                                            <p><span className="font-semibold">End:</span> {selectedCampaign.endDate}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Implementation Contact</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold">
                                            {selectedCampaign.details.implementing.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-dark">{selectedCampaign.details.implementing}</p>
                                            <p className="text-xs">Funding: {selectedCampaign.details.fundingSource}</p>
                                        </div>
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
