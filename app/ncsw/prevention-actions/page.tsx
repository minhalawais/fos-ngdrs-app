"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Save,
    Plus,
    Edit3,
    Trash2,
    CheckCircle,
    X,
    Calendar,
    Users,
    MapPin,
    Target,
    Megaphone,
    FileText,
    Eye,
    Clock
} from "lucide-react";
import { clsx } from "clsx";

// Initial prevention actions data
const initialActions = [
    {
        id: 'act-1',
        title: 'National Anti-Harassment Campaign',
        type: 'Awareness Campaign',
        province: 'All Provinces',
        startDate: '2024-01-15',
        endDate: '2024-03-31',
        status: 'Active',
        reach: '2.5M',
        budget: '15M PKR',
        description: 'Multi-media campaign across TV, radio, and social media platforms',
        outcomes: ['42% increase in helpline calls', '18 community dialogues held']
    },
    {
        id: 'act-2',
        title: 'School Curriculum Integration Pilot',
        type: 'Education Program',
        province: 'Punjab',
        startDate: '2024-02-01',
        endDate: '2024-06-30',
        status: 'Active',
        reach: '50K+ Students',
        budget: '8M PKR',
        description: 'Integration of GBV awareness in secondary school curriculum',
        outcomes: ['150 schools enrolled', '500 teachers trained']
    },
    {
        id: 'act-3',
        title: 'Workplace Safety Training (ILO C190)',
        type: 'Corporate Training',
        province: 'Sindh',
        startDate: '2024-01-10',
        endDate: '2024-04-15',
        status: 'Active',
        reach: '12K Employees',
        budget: '5M PKR',
        description: 'Mandatory harassment prevention training for corporate sector',
        outcomes: ['45 companies onboarded', '85% completion rate']
    },
    {
        id: 'act-4',
        title: 'Digital Safety Awareness Program',
        type: 'TFGBV Prevention',
        province: 'All Provinces',
        startDate: '2024-03-01',
        endDate: '2024-12-31',
        status: 'Planned',
        reach: 'Target: 1M',
        budget: '20M PKR',
        description: 'Online safety education targeting youth and parents',
        outcomes: ['Program design completed', 'Partnerships with MOITT established']
    },
    {
        id: 'act-5',
        title: 'Community Dialogue Series - Rural',
        type: 'Community Engagement',
        province: 'Balochistan',
        startDate: '2023-10-01',
        endDate: '2024-01-31',
        status: 'Completed',
        reach: '15K Participants',
        budget: '3M PKR',
        description: 'Grassroots dialogues with community leaders on GBV prevention',
        outcomes: ['78 dialogues completed', '12 village action plans']
    },
];

const TYPE_COLORS: Record<string, string> = {
    'Awareness Campaign': 'bg-purple-100 text-purple-700 border-purple-200',
    'Education Program': 'bg-blue-100 text-blue-700 border-blue-200',
    'Corporate Training': 'bg-green-100 text-green-700 border-green-200',
    'TFGBV Prevention': 'bg-orange-100 text-orange-700 border-orange-200',
    'Community Engagement': 'bg-teal-100 text-teal-700 border-teal-200',
};

const STATUS_STYLES: Record<string, string> = {
    'Active': 'bg-green-50 text-green-700 border-green-200',
    'Planned': 'bg-blue-50 text-blue-700 border-blue-200',
    'Completed': 'bg-gray-100 text-gray-600 border-gray-200',
    'On Hold': 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function PreventionActionsPage() {
    const [actions, setActions] = useState(initialActions);
    const [selectedAction, setSelectedAction] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [filterType, setFilterType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");
    const [hasChanges, setHasChanges] = useState(false);

    const filteredActions = actions.filter(a =>
        (filterType === "All" || a.type === filterType) &&
        (filterStatus === "All" || a.status === filterStatus)
    );

    const handleDeleteAction = (actionId: string) => {
        if (confirm("Are you sure you want to delete this action?")) {
            setActions(prev => prev.filter(a => a.id !== actionId));
            setHasChanges(true);
        }
    };

    const handleSaveAll = () => {
        setHasChanges(false);
        alert("Changes saved successfully! Dashboard KPI will reflect updated action count.");
    };

    const activeCount = actions.filter(a => a.status === 'Active').length;
    const plannedCount = actions.filter(a => a.status === 'Planned').length;
    const completedCount = actions.filter(a => a.status === 'Completed').length;
    const totalReach = '5.1M+';

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <BookOpen className="text-brand-teal" size={28} />
                        Prevention & Awareness Actions
                    </h1>
                    <p className="text-sm text-brand-teal">Manage awareness campaigns, training programs, and prevention initiatives</p>
                </div>
                <div className="flex gap-3">
                    {hasChanges && (
                        <span className="px-3 py-2 bg-orange-50 text-orange-600 text-sm font-medium rounded-xl border border-orange-200">
                            Unsaved Changes
                        </span>
                    )}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-surface rounded-xl text-sm font-medium text-brand-dark hover:border-brand-teal/50 hover:shadow-sm transition-all"
                    >
                        <Plus size={16} /> Add New Action
                    </button>
                    <button
                        onClick={handleSaveAll}
                        disabled={!hasChanges}
                        className={clsx(
                            "flex items-center gap-2 px-5 py-2 font-bold rounded-xl text-sm shadow-md transition-all",
                            hasChanges
                                ? "bg-brand-dark hover:bg-brand-teal text-white"
                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        )}
                    >
                        <Save size={16} /> Publish Changes
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <Megaphone size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{actions.length}</p>
                            <p className="text-xs text-gray-500">Total Actions</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <Target size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{activeCount}</p>
                            <p className="text-xs text-gray-500">Active Programs</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Clock size={24} className="text-blue-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{plannedCount}</p>
                            <p className="text-xs text-gray-500">Planned</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Users size={24} className="text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalReach}</p>
                            <p className="text-xs text-gray-500">Total Reach</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                    <p className="font-bold text-blue-800">Dashboard KPI Display</p>
                    <p className="text-sm text-blue-700">The total count of actions here is displayed in the "Prevention & Awareness Actions" KPI on the National GBV & TFGBV Monitoring Dashboard.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Awareness Campaign">Awareness Campaign</option>
                    <option value="Education Program">Education Program</option>
                    <option value="Corporate Training">Corporate Training</option>
                    <option value="TFGBV Prevention">TFGBV Prevention</option>
                    <option value="Community Engagement">Community Engagement</option>
                </select>
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Planned">Planned</option>
                    <option value="Completed">Completed</option>
                    <option value="On Hold">On Hold</option>
                </select>
            </div>

            {/* Actions Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredActions.map((action) => (
                    <div
                        key={action.id}
                        className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                        TYPE_COLORS[action.type] || "bg-gray-100 text-gray-700"
                                    )}>
                                        {action.type}
                                    </span>
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                        STATUS_STYLES[action.status]
                                    )}>
                                        {action.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-brand-dark text-lg">{action.title}</h3>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setSelectedAction(action)}
                                    className="p-2 hover:bg-brand-surface/50 rounded-lg text-brand-teal"
                                    title="View Details"
                                >
                                    <Eye size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteAction(action.id)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-red-500"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{action.description}</p>

                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin size={14} className="text-gray-400" />
                                <span className="text-gray-600">{action.province}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Users size={14} className="text-gray-400" />
                                <span className="font-medium text-brand-dark">{action.reach}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar size={14} className="text-gray-400" />
                                <span className="text-gray-600">{action.startDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <FileText size={14} className="text-gray-400" />
                                <span className="text-gray-600">{action.budget}</span>
                            </div>
                        </div>

                        {/* Outcomes */}
                        <div className="border-t border-gray-100 pt-4">
                            <p className="text-xs font-bold text-gray-500 uppercase mb-2">Outcomes</p>
                            <div className="flex flex-wrap gap-2">
                                {action.outcomes.map((outcome, idx) => (
                                    <span key={idx} className="px-2 py-1 bg-green-50 text-green-700 rounded-lg text-xs">
                                        ✓ {outcome}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedAction && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedAction(null)}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-gray-100 bg-brand-surface/20">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                                TYPE_COLORS[selectedAction.type]
                                            )}>
                                                {selectedAction.type}
                                            </span>
                                            <span className={clsx(
                                                "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                                STATUS_STYLES[selectedAction.status]
                                            )}>
                                                {selectedAction.status}
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-bold text-brand-dark">{selectedAction.title}</h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedAction(null)}
                                        className="p-2 rounded-xl bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-6 overflow-y-auto max-h-[50vh]">
                                <p className="text-gray-700">{selectedAction.description}</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-brand-surface/30 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Province</p>
                                        <p className="font-bold text-brand-dark">{selectedAction.province}</p>
                                    </div>
                                    <div className="bg-brand-surface/30 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Reach</p>
                                        <p className="font-bold text-brand-dark">{selectedAction.reach}</p>
                                    </div>
                                    <div className="bg-brand-surface/30 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Duration</p>
                                        <p className="font-bold text-brand-dark">{selectedAction.startDate} → {selectedAction.endDate}</p>
                                    </div>
                                    <div className="bg-brand-surface/30 rounded-xl p-4">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">Budget</p>
                                        <p className="font-bold text-brand-dark">{selectedAction.budget}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-brand-dark mb-3">Key Outcomes</p>
                                    <div className="space-y-2">
                                        {selectedAction.outcomes.map((outcome: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                                                <CheckCircle size={16} className="text-green-600" />
                                                <span className="text-sm text-green-800">{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-100 bg-brand-surface/20 flex gap-3">
                                <button
                                    onClick={() => setSelectedAction(null)}
                                    className="flex-1 py-3 bg-white border border-brand-surface text-brand-dark font-bold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(true);
                                        // In a real app, this would open edit mode
                                    }}
                                    className="flex-1 py-3 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-teal transition-all flex items-center justify-center gap-2"
                                >
                                    <Edit3 size={18} /> Edit Action
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Summary Footer */}
            <div className="bg-gradient-to-br from-brand-dark to-brand-dark/90 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Dashboard Summary</h3>
                        <p className="text-brand-teal text-sm">
                            Current count: <span className="font-bold text-white">{actions.length} Prevention & Awareness Actions</span> displayed on Dashboard KPI
                        </p>
                    </div>
                    <a
                        href="/dashboard"
                        target="_blank"
                        className="px-6 py-3 bg-white text-brand-dark font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                    >
                        View Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
}
