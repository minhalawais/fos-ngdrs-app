"use client";

import {
    AlertTriangle,
    Bell,
    Send,
    Clock,
    MapPin,
    FileText,
    ChevronRight,
    ExternalLink
} from "lucide-react";
import { generateRedZoneAlerts } from "@/lib/provincial-mock-data";
import { clsx } from "clsx";

const alerts = generateRedZoneAlerts();

const SEVERITY_STYLES: Record<string, { bg: string; border: string; text: string }> = {
    'Critical': { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700' },
    'High': { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-700' },
    'Medium': { bg: 'bg-yellow-50', border: 'border-yellow-500', text: 'text-yellow-700' },
};

export default function AlertsPage() {
    const openAlerts = alerts.filter(a => a.status === 'Open').length;
    const escalatedAlerts = alerts.filter(a => a.status === 'Escalated').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <AlertTriangle className="text-red-500" size={28} />
                        Escalation & Red Zone Alerts
                    </h1>
                    <p className="text-sm text-brand-teal">Monitor critical alerts and manage escalations to Chief Secretary</p>
                </div>
                <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2">
                    <Bell size={16} /> Emergency Brief to CS
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                            <AlertTriangle size={24} className="text-red-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{openAlerts}</p>
                            <p className="text-xs text-gray-500">Open Alerts</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Send size={24} className="text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{escalatedAlerts}</p>
                            <p className="text-xs text-gray-500">Escalated to CS</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                            <MapPin size={24} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">4</p>
                            <p className="text-xs text-gray-500">Red Zone Districts</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <Clock size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">18h</p>
                            <p className="text-xs text-gray-500">Avg Response Time</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Alert Cards */}
            <div className="space-y-4">
                {alerts.map((alert) => {
                    const style = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.Medium;
                    return (
                        <div
                            key={alert.id}
                            className={clsx(
                                "bg-white rounded-2xl border-l-4 border shadow-sm overflow-hidden",
                                style.border,
                                "border-r border-t border-b border-brand-surface"
                            )}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className={clsx(
                                            "w-14 h-14 rounded-xl flex items-center justify-center",
                                            style.bg
                                        )}>
                                            <AlertTriangle size={28} className={style.text} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-bold text-xl text-brand-dark">{alert.district}</h3>
                                                <span className={clsx(
                                                    "px-2.5 py-1 rounded-lg text-xs font-bold",
                                                    alert.status === 'Open' ? "bg-red-100 text-red-700" :
                                                        alert.status === 'Escalated' ? "bg-purple-100 text-purple-700" :
                                                            "bg-yellow-100 text-yellow-700"
                                                )}>
                                                    {alert.status}
                                                </span>
                                                <span className={clsx(
                                                    "px-2.5 py-1 rounded-lg text-xs font-bold border",
                                                    `${style.bg} ${style.text}`
                                                )}>
                                                    {alert.severity} Severity
                                                </span>
                                            </div>
                                            <p className="text-sm text-brand-teal font-medium">{alert.trigger}</p>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm">
                                        <p className="text-gray-400">{alert.raisedAt}</p>
                                        <p className="font-medium text-brand-dark">{alert.assignedTo}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                    <p className="text-sm text-gray-700">{alert.details}</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> 72h response required
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> District boundary alert
                                        </span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 text-sm font-bold text-brand-dark bg-white border border-brand-surface rounded-xl hover:bg-gray-50 flex items-center gap-2">
                                            <FileText size={16} /> View Details
                                        </button>
                                        {alert.status !== 'Escalated' && (
                                            <button className="px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 flex items-center gap-2 shadow-md">
                                                <Send size={16} /> Escalate to CS
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* CS Quarterly Briefing Generator */}
            <div className="bg-gradient-to-br from-brand-dark to-brand-dark/90 rounded-2xl p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Chief Secretary Quarterly Briefing</h3>
                        <p className="text-brand-teal text-sm">Auto-generate consolidated report for Provincial Cabinet review</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-brand-dark font-bold rounded-xl hover:bg-gray-100 transition-all flex items-center gap-2 shadow-lg">
                        <FileText size={18} /> Generate Q4 Report
                    </button>
                </div>
                <div className="mt-6 grid grid-cols-4 gap-4">
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">1,847</p>
                        <p className="text-xs text-brand-teal">Total Cases (Quarter)</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">23.4%</p>
                        <p className="text-xs text-brand-teal">Conviction Rate</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">4</p>
                        <p className="text-xs text-brand-teal">Red Zone Districts</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-2xl font-bold">78%</p>
                        <p className="text-xs text-brand-teal">Service Coverage</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
