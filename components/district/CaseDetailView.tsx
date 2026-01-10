"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    CheckCircle2,
    Circle,
    Clock,
    AlertTriangle,
    FileText,
    Shield,
    Stethoscope,
    Scale,
    Gavel,
    Edit3,
    Save,
    MapPin,
    User,
    Plus,
    Smartphone,
    Camera,
    ChevronDown,
    ChevronUp,
    GripVertical,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import {
    GBV_STAGES,
    TFGBV_STAGES,
    STAGE_STATUS_OPTIONS,
    FIELD_LABELS,
    getAvailableStagesToAdd
} from "@/lib/district-mock-data";

interface CaseDetailProps {
    caseData: any;
    initialEditing?: boolean;
    onClose: () => void;
    onSave?: (updatedCase: any) => void;
}

const STAGE_ICONS: Record<string, any> = {
    'COMPLAINT_RECEIVED': User,
    'INITIAL_SCREENING': Shield,
    'POLICE_COMPLAINT': FileText,
    'FIR_REGISTERED': FileText,
    'MEDICAL_EXAM': Stethoscope,
    'INVESTIGATION': Scale,
    'ARREST_REMAND': Gavel,
    'CHARGE_SHEET': FileText,
    'TRIAL': Gavel,
    'ESCALATION': AlertTriangle,
    'DISPOSAL': Gavel,
    'DIGITAL_EVIDENCE': Camera,
    'CYBER_CRIME_REPORT': FileText,
    'PLATFORM_TAKEDOWN': Smartphone,
    'FORENSIC_ANALYSIS': Stethoscope,
};

const statusColor = (status: string) => {
    const option = STAGE_STATUS_OPTIONS.find(o => o.value === status);
    return option?.color || 'bg-gray-100 text-gray-500';
};

export default function CaseDetailView({ caseData, onClose, onSave, initialEditing = false }: CaseDetailProps) {
    const [isEditing, setIsEditing] = useState(initialEditing);
    const [localCase, setLocalCase] = useState(caseData);
    const [expandedStages, setExpandedStages] = useState<string[]>([localCase.timeline[0]?.id]);
    const [showAddStage, setShowAddStage] = useState(false);

    const handleStageUpdate = (stageId: string, field: string, value: string) => {
        setLocalCase((prev: any) => ({
            ...prev,
            timeline: prev.timeline.map((s: any) =>
                s.id === stageId
                    ? { ...s, details: { ...s.details, [field]: value } }
                    : s
            )
        }));
    };

    const handleTimelineStatusChange = (stageId: string, newStatus: string) => {
        setLocalCase((prev: any) => ({
            ...prev,
            timeline: prev.timeline.map((s: any) =>
                s.id === stageId ? { ...s, status: newStatus } : s
            )
        }));
    };

    const handleStageDateChange = (stageId: string, newDate: string) => {
        setLocalCase((prev: any) => ({
            ...prev,
            timeline: prev.timeline.map((s: any) =>
                s.id === stageId ? { ...s, date: newDate } : s
            )
        }));
    };

    const handleCaseStatusChange = (newStatus: string) => {
        setLocalCase({ ...localCase, status: newStatus });
    };

    const handleRiskChange = (newRisk: string) => {
        setLocalCase({ ...localCase, risk: newRisk });
    };

    const handleSave = () => {
        if (onSave) onSave(localCase);
        setIsEditing(false);
    };

    const toggleStageExpand = (stageId: string) => {
        setExpandedStages(prev =>
            prev.includes(stageId)
                ? prev.filter(id => id !== stageId)
                : [...prev, stageId]
        );
    };

    const addStage = (stageCode: string) => {
        const stages = localCase.caseType === 'TFGBV' ? TFGBV_STAGES : GBV_STAGES;
        const stageTemplate = stages.find(s => s.code === stageCode);
        if (!stageTemplate) return;

        const newStage = {
            id: `stage-${Date.now()}`,
            stageCode: stageTemplate.code,
            stage: stageTemplate.name,
            status: 'Pending',
            date: 'N/A',
            order: stageTemplate.order,
            details: stageTemplate.fields.reduce((acc: any, field: string) => ({ ...acc, [field]: '' }), {})
        };

        // Insert in correct order
        const updatedTimeline = [...localCase.timeline, newStage].sort((a, b) => a.order - b.order);
        setLocalCase({ ...localCase, timeline: updatedTimeline });
        setShowAddStage(false);
        setExpandedStages(prev => [...prev, newStage.id]);
    };

    const removeStage = (stageId: string) => {
        setLocalCase((prev: any) => ({
            ...prev,
            timeline: prev.timeline.filter((s: any) => s.id !== stageId)
        }));
    };

    const existingStageCodes = localCase.timeline.map((s: any) => s.stageCode);
    const availableStages = getAvailableStagesToAdd(localCase.caseType, existingStageCodes);

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full max-w-3xl bg-white shadow-2xl h-full flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
                    <div>
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="px-2.5 py-1 bg-brand-dark text-white text-xs font-bold rounded-lg tracking-wider font-mono">
                                {localCase.id}
                            </span>
                            <span className={clsx(
                                "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                localCase.caseType === 'TFGBV' ? "bg-purple-100 text-purple-700 border-purple-200" : "bg-blue-100 text-blue-700 border-blue-200"
                            )}>
                                {localCase.caseType} • {localCase.crimeCode}
                            </span>
                            {isEditing ? (
                                <select
                                    value={localCase.risk}
                                    onChange={(e) => handleRiskChange(e.target.value)}
                                    className="px-2 py-1 rounded-lg text-xs font-bold border outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                                >
                                    <option value="Low">Low Risk</option>
                                    <option value="Medium">Medium Risk</option>
                                    <option value="High">High Risk</option>
                                    <option value="Critical">Critical Risk</option>
                                </select>
                            ) : (
                                <span className={clsx(
                                    "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                    localCase.risk === 'Critical' ? "bg-red-100 text-red-700 border-red-200" :
                                        localCase.risk === 'High' ? "bg-orange-100 text-orange-700 border-orange-200" :
                                            "bg-green-100 text-green-700 border-green-200"
                                )}>
                                    {localCase.risk} Risk
                                </span>
                            )}
                            {isEditing && (
                                <select
                                    value={localCase.status}
                                    onChange={(e) => handleCaseStatusChange(e.target.value)}
                                    className="px-2 py-1 rounded-lg text-xs font-bold border outline-none bg-blue-50 text-blue-700 border-blue-200 focus:ring-2 focus:ring-primary-500"
                                >
                                    <option value="Reported">Reported</option>
                                    <option value="FIR Registered">FIR Registered</option>
                                    <option value="Investigation">Investigation</option>
                                    <option value="Trial">Trial</option>
                                    <option value="Closed">Closed</option>
                                </select>
                            )}
                        </div>
                        <h2 className="text-xl font-bold text-brand-dark">Case Timeline & Progress</h2>
                        <p className="text-sm text-brand-teal">Survivor: {localCase.survivor} • Category: {localCase.category}</p>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                            className={clsx(
                                "px-4 py-2 rounded-xl transition-all border flex items-center gap-2 text-sm font-bold",
                                isEditing
                                    ? "bg-green-600 text-white border-green-700 shadow-md hover:bg-green-700"
                                    : "bg-white text-brand-dark border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            {isEditing ? <><Save size={16} /> Save All</> : <><Edit3 size={16} /> Edit</>}
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Timeline Content */}
                <div className="flex-1 overflow-y-auto p-6 bg-brand-canvas space-y-4">
                    {localCase.timeline.map((stage: any, idx: number) => {
                        const Icon = STAGE_ICONS[stage.stageCode] || Circle;
                        const isCompleted = stage.status === 'Completed';
                        const isExpanded = expandedStages.includes(stage.id);

                        return (
                            <div key={stage.id} className="relative pl-12 group">
                                {/* Connector Line */}
                                {idx !== localCase.timeline.length - 1 && (
                                    <div className={clsx(
                                        "absolute left-[23px] top-12 bottom-[-16px] w-0.5",
                                        isCompleted ? "bg-primary-500" : "bg-gray-200"
                                    )} />
                                )}

                                {/* Status Icon */}
                                <div className={clsx(
                                    "absolute left-0 top-3 w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all z-10 shadow-sm",
                                    isCompleted
                                        ? "bg-primary-500 border-white text-white"
                                        : stage.status === 'In Progress'
                                            ? "bg-blue-500 border-white text-white animate-pulse"
                                            : "bg-white border-gray-200 text-gray-300"
                                )}>
                                    <Icon size={20} />
                                </div>

                                {/* Content Card */}
                                <div className={clsx(
                                    "bg-white rounded-2xl border transition-all shadow-sm overflow-hidden",
                                    isCompleted ? "border-primary-100" : "border-gray-200/60"
                                )}>
                                    {/* Stage Header - Always Visible */}
                                    <div
                                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleStageExpand(stage.id)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <h3 className={clsx("font-bold", isCompleted ? "text-brand-dark" : "text-gray-500")}>
                                                {stage.stage}
                                            </h3>
                                            {isEditing ? (
                                                <select
                                                    value={stage.status}
                                                    onChange={(e) => { e.stopPropagation(); handleTimelineStatusChange(stage.id, e.target.value); }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-xs font-bold px-2 py-1 rounded border border-gray-300 bg-white focus:ring-2 focus:ring-primary-500"
                                                >
                                                    {STAGE_STATUS_OPTIONS.map(opt => (
                                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <span className={clsx("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded", statusColor(stage.status))}>
                                                    {stage.status}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isEditing && (
                                                <input
                                                    type="date"
                                                    value={stage.date !== 'N/A' ? stage.date : ''}
                                                    onChange={(e) => handleStageDateChange(stage.id, e.target.value)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="text-xs border border-gray-200 rounded px-2 py-1"
                                                />
                                            )}
                                            {!isEditing && stage.date !== 'N/A' && (
                                                <span className="text-xs text-gray-400">{stage.date}</span>
                                            )}
                                            {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-gray-100"
                                            >
                                                <div className="p-4 grid grid-cols-2 gap-4">
                                                    {Object.entries(stage.details).map(([key, value]) => (
                                                        <div key={key} className="space-y-1">
                                                            <label className="text-[10px] font-bold text-brand-teal uppercase tracking-widest block">
                                                                {FIELD_LABELS[key] || key}
                                                            </label>
                                                            {isEditing ? (
                                                                <input
                                                                    type="text"
                                                                    className="w-full text-sm font-medium text-brand-dark border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
                                                                    value={value as string}
                                                                    placeholder={`Enter ${FIELD_LABELS[key] || key}`}
                                                                    onChange={(e) => handleStageUpdate(stage.id, key, e.target.value)}
                                                                />
                                                            ) : (
                                                                <p className="text-sm font-medium text-brand-dark">{(value as string) || <span className="text-gray-300 italic">Not entered</span>}</p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                                {isEditing && (
                                                    <div className="px-4 pb-4 flex justify-end">
                                                        <button
                                                            onClick={() => removeStage(stage.id)}
                                                            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                                                        >
                                                            <Trash2 size={12} /> Remove Stage
                                                        </button>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        );
                    })}

                    {/* Add Stage Button */}
                    {isEditing && availableStages.length > 0 && (
                        <div className="relative pl-12">
                            <div className="absolute left-0 top-3 w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 bg-white text-gray-400">
                                <Plus size={20} />
                            </div>
                            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-4">
                                <button
                                    onClick={() => setShowAddStage(!showAddStage)}
                                    className="w-full text-left font-bold text-gray-500 hover:text-brand-dark flex items-center gap-2"
                                >
                                    <Plus size={16} /> Add New Stage
                                </button>
                                {showAddStage && (
                                    <div className="mt-4 grid grid-cols-2 gap-2">
                                        {availableStages.map(stage => (
                                            <button
                                                key={stage.code}
                                                onClick={() => addStage(stage.code)}
                                                className="p-3 text-left text-sm bg-gray-50 hover:bg-primary-50 hover:text-primary-700 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors"
                                            >
                                                <span className="font-bold block">{stage.name}</span>
                                                <span className="text-[10px] text-gray-400">{stage.required ? 'Required' : 'Optional'}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t border-gray-200 bg-white flex gap-3">
                    <button className="flex-1 py-3 bg-brand-surface/20 text-brand-dark font-bold rounded-xl border border-brand-surface hover:bg-brand-surface transition-all flex items-center justify-center gap-2">
                        <FileText size={18} /> Generate Report (Format B)
                    </button>
                    {isEditing && (
                        <button
                            onClick={handleSave}
                            className="flex-1 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-md"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
