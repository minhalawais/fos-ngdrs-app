"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Search,
    Filter,
    Download,
    Eye,
    X,
    LayoutDashboard,
    Users,
    Target,
    MapPin,
    Calendar,
    Briefcase,
    FileText
} from "lucide-react";
import { generatePreventionSubmissions } from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const allProjects = generatePreventionSubmissions();

const STATUS_STYLES: Record<string, string> = {
    'Pending Review': 'bg-gray-100 text-gray-700 border-gray-200',
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200',
    'Approved': 'bg-green-50 text-green-700 border-green-200',
    'Returned': 'bg-red-50 text-red-700 border-red-200',
    'Needs Clarification': 'bg-orange-50 text-orange-700 border-orange-200',
};

const TYPE_COLORS: Record<string, string> = {
    'Education': 'bg-blue-100 text-blue-700',
    'Community': 'bg-green-100 text-green-700',
    'Legal': 'bg-purple-100 text-purple-700',
    'Economic': 'bg-orange-100 text-orange-700',
    'Health': 'bg-red-100 text-red-700',
    'Media': 'bg-cyan-100 text-cyan-700',
    'Workplace': 'bg-indigo-100 text-indigo-700',
    'Youth': 'bg-pink-100 text-pink-700'
};

export default function PreventionActionsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Filter logic
    const filteredProjects = allProjects.filter((project: any) =>
        (statusFilter === "All" || project.status === statusFilter) &&
        (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.province.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Aggregate Stats
    const totalProjects = filteredProjects.length;
    const totalBeneficiaries = filteredProjects.reduce((acc, curr) => acc + curr.targetBeneficiaries, 0);
    const activeProvinces = new Set(filteredProjects.map(p => p.province)).size;
    const activeDistricts = new Set(filteredProjects.map(p => p.district)).size;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Shield className="text-brand-teal" size={28} />
                        Prevention Actions Registry
                    </h1>
                    <p className="text-sm text-brand-teal">Database of GBV prevention initiatives and community programs</p>
                </div>
                <button className="px-5 py-2 bg-white border border-brand-surface hover:bg-gray-50 text-brand-dark font-bold rounded-xl text-sm shadow-sm transition-all flex items-center gap-2">
                    <Download size={16} /> Export Registry
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Briefcase size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalProjects}</p>
                            <p className="text-xs text-gray-500">Total Projects</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalBeneficiaries.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Beneficiaries Reached</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{activeDistricts}</p>
                            <p className="text-xs text-gray-500">Active Districts</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{activeProvinces}</p>
                            <p className="text-xs text-gray-500">Active Provinces</p>
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
                            placeholder="Search projects, districts, or provinces..."
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
                                <th className="px-6 py-4">Project ID</th>
                                <th className="px-6 py-4">Program Title</th>
                                <th className="px-6 py-4">Location</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Beneficiaries</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-surface">
                            {filteredProjects.map((project) => {
                                const typeKey = Object.keys(TYPE_COLORS).find(k => project.type.includes(k)) || 'Community';
                                return (
                                    <tr key={project.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{project.id}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-brand-dark block max-w-xs truncate" title={project.title}>{project.title}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <span className="font-bold text-brand-dark text-sm">{project.province}</span>
                                                <p className="text-xs text-gray-400">{project.district}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx("px-2 py-0.5 rounded text-[10px] font-bold uppercase", TYPE_COLORS[typeKey])}>
                                                {typeKey}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-mono text-sm text-brand-dark">
                                            {project.targetBeneficiaries.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx("px-2.5 py-1 rounded-md text-xs font-bold border", STATUS_STYLES[project.status])}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedProject(project)}
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
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
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
                                        <span className="px-2 py-1 bg-brand-dark text-white text-xs font-mono rounded">{selectedProject.id}</span>
                                        <span className={clsx("px-2 py-1 rounded text-xs font-bold border", STATUS_STYLES[selectedProject.status])}>{selectedProject.status}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-brand-dark">{selectedProject.title}</h2>
                                    <p className="text-sm text-brand-teal mt-1">{selectedProject.district}, {selectedProject.province}</p>
                                </div>
                                <button onClick={() => setSelectedProject(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {/* Key Metrics Bar */}
                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="flex items-center gap-2 text-gray-500 mb-1">
                                        <Users size={16} /> <span className="text-xs font-bold uppercase">Beneficiaries</span>
                                    </div>
                                    <p className="text-xl font-bold text-brand-dark">{selectedProject.targetBeneficiaries.toLocaleString()}</p>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                        <FileText size={14} /> Project Description
                                    </h3>
                                    <p className="text-sm text-gray-700 leading-relaxed bg-white p-4 border border-gray-100 rounded-xl">
                                        {selectedProject.details.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Target size={14} /> Objectives
                                        </h3>
                                        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                            {selectedProject.details.objectives.map((obj: string, i: number) => (
                                                <li key={i}>{obj}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                            <Calendar size={14} /> Timeline
                                        </h3>
                                        <div className="text-sm text-gray-700">
                                            <p><span className="font-semibold">Start:</span> {selectedProject.startDate}</p>
                                            <p><span className="font-semibold">End:</span> {selectedProject.endDate}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Implementation Contact</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
                                        <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal font-bold">
                                            {selectedProject.details.contactPerson.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-dark">{selectedProject.details.contactPerson}</p>
                                            <p>{selectedProject.details.contactEmail}</p>
                                            <p className="text-xs">{selectedProject.details.contactPhone}</p>
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
