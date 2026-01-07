
"use client";

import { motion } from "framer-motion";
import {
    Clock, CheckCircle, Database, Shield,
    ChevronRight, AlertTriangle, Stethoscope,
    Smartphone, Split, GitMerge, FileText,
    ArrowRight, Lock, Server, FileJson, Globe, Scale, Briefcase
} from "lucide-react";
import { clsx } from "clsx";

/**
 * Workflow Pipeline Redesign
 * Concept: "The Protocol Encyclopedia"
 * A comprehensive technical reference for the NGDRS reporting protocol.
 */

const steps = [
    {
        id: 1,
        title: "SOP 1: Intake & Registration",
        time: "Within 24 Hours",
        desc: "Survivor encounter documented with Unique Case ID and standardized GBV/TFGBV coding.",
        icon: FileText,
        color: "blue",
        status: "Digital Entry",
        protocol: [
            "Mandatory Fields: Case_ID, Survivor_Age, Disability_Status",
            "Coding Standard: GB-PH (Physical) / TF-A1..A9 (Digital)",
            "Safety Protocol: Immediate 'No Wrong Door' activation"
        ]
    },
    {
        id: 2,
        title: "SOP 3: Triangulation",
        time: "72-Hour Rectification",
        desc: "District Focal Points verify consistency across Police, Health, and Prosecution records.",
        icon: CheckCircle,
        color: "amber",
        status: "Verification",
        protocol: [
            "Cross-Check: FIR vs Medico-Legal Request (MLR)",
            "Correction Mechanism: Flagged & returned to origin",
            "Duplication Audit: CNIC & Mobile # hashing"
        ]
    },
    {
        id: 3,
        title: "SOP 5: Submission",
        time: "Monthly by 10th",
        desc: "Provincial Focal Points certify master sheets for secure transmission to the Federal Node.",
        icon: Database,
        color: "primary",
        status: "Certification",
        protocol: [
            "Format: NCSW Standardized Excel / PowerBI Template",
            "Certification: E-signature by Provincial Secretary",
            "Transmission: AES-256 Encrypted Secure Channel"
        ]
    },
    {
        id: 4,
        title: "National Compliance",
        time: "Real-time Audit",
        desc: "NCSW Data Unit performs integrity checks, duplication removal, and Red Zone alerting.",
        icon: Shield,
        color: "purple",
        status: "Federal Review",
        protocol: [
            "Red Zone Trigger: >50 cases/100k pop. or +25% spike",
            "Privacy: Automated PII Scrubbing (K-Anonymity ≥ 5)",
            "Output: Annual GBV Data Transparency Report"
        ]
    }
];

export default function Workflow() {
    return (
        <section id="workflow" className="py-24 bg-brand-canvas relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <span className="text-brand-teal font-semibold tracking-wider uppercase text-sm mb-4 block">Standard Operating Procedures</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-6">
                        Mandatory <span className="text-primary-600">Reporting Cycle</span>
                    </h2>
                    <p className="text-lg text-brand-soft">
                        A standardized compliance pipeline governed by <span className="font-bold text-brand-dark">Federal Mandate 2026</span>.
                        <br className="hidden md:block" />
                        Ensuring valid, uniform data flow from district intake to national intelligence.
                    </p>
                </div>

                {/* Main Pipeline Component */}
                <div className="relative mb-32">

                    {/* The Physical Pipe (Desktop) */}
                    <div className="hidden lg:block absolute top-[40%] left-0 right-0 h-3 bg-brand-surface -translate-y-1/2 rounded-full overflow-hidden">
                        {/* Animated Flow Gradient */}
                        <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"
                        />
                    </div>

                    {/* Nodes Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                        {steps.map((step, index) => {
                            const isLast = index === steps.length - 1;

                            return (
                                <div key={step.id} className="relative z-10 group h-full">
                                    {/* Mobile Pipe Connectors (Vertical) */}
                                    {!isLast && (
                                        <div className="lg:hidden absolute left-8 top-full h-8 w-1 bg-brand-surface z-0" />
                                    )}

                                    {/* The Card / Module */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15 }}
                                        className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm hover:shadow-xl transition-all duration-300 relative h-full flex flex-col items-center text-center lg:items-start lg:text-left"
                                    >
                                        {/* Connector Node (Desktop) */}
                                        <div className="hidden lg:block absolute top-[40%] -translate-y-1/2 -right-4 w-8 h-8 rounded-full bg-brand-canvas border-4 border-brand-surface z-20">
                                            {/* Inner dot */}
                                            <div className="absolute inset-1 rounded-full bg-brand-surface" />
                                        </div>
                                        {/* Hide connector for last item */}
                                        {isLast && <div className="hidden lg:block absolute top-[40%] -right-4 w-8 h-10 bg-brand-canvas z-30" />}

                                        {/* Status Badge */}
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 bg-${step.color === 'primary' ? 'primary' : step.color}-50 text-${step.color === 'primary' ? 'primary' : step.color}-600 border border-${step.color === 'primary' ? 'primary' : step.color}-100`}>
                                            <div className={`w-1.5 h-1.5 rounded-full bg-${step.color === 'primary' ? 'primary' : step.color}-500 animate-pulse`} />
                                            {step.status}
                                        </div>

                                        {/* Icon Ring */}
                                        <div className={`w-14 h-14 rounded-2xl bg-${step.color === 'primary' ? 'primary' : step.color}-50 text-${step.color === 'primary' ? 'primary' : step.color}-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <step.icon size={28} />
                                        </div>

                                        <h3 className="text-xl font-bold text-brand-dark mb-2">{step.title}</h3>
                                        <p className="text-sm text-brand-soft leading-relaxed mb-6">{step.desc}</p>

                                        {/* Technical Protocol List */}
                                        <div className="w-full bg-brand-surface/30 rounded-lg p-3 text-left mb-4">
                                            <div className="text-[10px] font-bold text-brand-dark/40 uppercase mb-2 tracking-wider">Required Specifications</div>
                                            <ul className="space-y-1.5">
                                                {step.protocol.map((item, idx) => (
                                                    <li key={idx} className="flex items-start gap-2 text-xs text-brand-dark/70 font-medium">
                                                        <div className={`w-1 h-1 rounded-full mt-1.5 bg-${step.color === 'primary' ? 'primary' : step.color}-400 shrink-0`} />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="mt-auto pt-4 border-t border-brand-surface w-full flex items-center justify-between text-xs font-mono text-brand-dark/50">
                                            <span>SLA LIMIT:</span>
                                            <span className="font-bold text-brand-dark">{step.time}</span>
                                        </div>
                                    </motion.div>

                                    {/* Data Packet Animation (Desktop) */}
                                    <div className="hidden lg:block absolute top-[40%] left-full -translate-y-1/2 w-8 h-8 pointer-events-none overflow-visible">
                                        {!isLast && (
                                            <motion.div
                                                animate={{ x: [0, 200], opacity: [1, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                                className="absolute top-1/2 w-2 h-2 rounded-full bg-primary-500"
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Divergent Investigation Paths */}
                <div className="bg-brand-surface/30 rounded-3xl p-8 md:p-12 border border-brand-surface">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <GitMerge className="text-brand-dark opacity-50" size={24} />
                            <h3 className="text-2xl font-bold text-brand-dark">Divergent Investigation Paths</h3>
                        </div>
                        <p className="text-brand-soft text-sm">
                            Based on the nature of the offence, cases are routed through specialized response protocols
                            ensuring appropriate handling for physical, digital, or hybrid incidents.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Physical GBV Path */}
                        <div className="bg-white p-6 rounded-2xl border border-brand-surface shadow-sm hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-surface">
                                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Stethoscope size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark">Physical GBV</h4>
                                    <span className="text-[10px] font-mono text-brand-soft bg-brand-surface px-2 py-0.5 rounded">GB-PH / GB-SX / GB-FM</span>
                                </div>
                            </div>

                            <p className="text-sm text-brand-soft mb-6 leading-relaxed">
                                Cases involving domestic violence, sexual assault, forced marriage, or physical harm follow the
                                standard justice pathway with mandatory medical examination.
                            </p>

                            <div className="space-y-3">
                                {[
                                    { step: "FIR Registration", time: "Immediate" },
                                    { step: "Medico-Legal Exam", time: "Within 72 Hours" },
                                    { step: "Shelter / Safe House", time: "If Required" },
                                    { step: "Prosecution & Trial", time: "Case Dependent" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-brand-surface/50 last:border-b-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                                            <span className="text-sm font-medium text-brand-dark">{item.step}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-brand-soft">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
                                <AlertTriangle size={14} className="text-red-500 shrink-0" />
                                <span className="text-[11px] font-medium text-red-700">No Mediation for Rape / Abuse Cases</span>
                            </div>
                        </div>

                        {/* Digital TFGBV Path */}
                        <div className="bg-white p-6 rounded-2xl border border-brand-surface shadow-sm hover:shadow-lg transition-shadow">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-surface">
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                    <Smartphone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark">Digital TFGBV</h4>
                                    <span className="text-[10px] font-mono text-brand-soft bg-brand-surface px-2 py-0.5 rounded">TF-A1 to TF-A9</span>
                                </div>
                            </div>

                            <p className="text-sm text-brand-soft mb-6 leading-relaxed">
                                Technology-facilitated cases including cyberstalking, deepfakes, sextortion, and
                                non-consensual image sharing are routed through digital forensics channels.
                            </p>

                            <div className="space-y-3">
                                {[
                                    { step: "FIA / Cyber Crime Routing", time: "Immediate" },
                                    { step: "Evidence Hashing & Preservation", time: "Critical" },
                                    { step: "Platform Takedown Request", time: "24 Hour SLA" },
                                    { step: "Court Adjudication", time: "SMRA Compliance" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-brand-surface/50 last:border-b-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                                            <span className="text-sm font-medium text-brand-dark">{item.step}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-brand-soft">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-indigo-50 rounded-lg border border-indigo-100 flex items-center gap-2">
                                <Lock size={14} className="text-indigo-600 shrink-0" />
                                <span className="text-[11px] font-medium text-indigo-700">Digital Evidence Checklist Required</span>
                            </div>
                        </div>

                        {/* Hybrid Response Path */}
                        <div className="bg-white p-6 rounded-2xl border-2 border-primary-500/30 shadow-sm hover:shadow-lg transition-shadow ring-2 ring-primary-500/10">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-brand-surface">
                                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                                    <Split size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark">Hybrid Response</h4>
                                    <span className="text-[10px] font-mono text-brand-soft bg-brand-surface px-2 py-0.5 rounded">Physical + Digital</span>
                                </div>
                            </div>

                            <p className="text-sm text-brand-soft mb-6 leading-relaxed">
                                Cases with both physical and digital elements trigger a joint response protocol,
                                unifying agency action for comprehensive survivor protection.
                            </p>

                            <div className="space-y-3">
                                {[
                                    { step: "Joint Agency Alert", time: "Simultaneous" },
                                    { step: "Parallel Investigation", time: "Police + FIA" },
                                    { step: "Unified Case File", time: "Single Docket" },
                                    { step: "Consolidated Prosecution", time: "Multi-Charge" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center justify-between py-2 border-b border-brand-surface/50 last:border-b-0">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px] font-bold">{i + 1}</div>
                                            <span className="text-sm font-medium text-brand-dark">{item.step}</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-brand-soft">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-3 bg-green-50 rounded-lg border border-green-100 flex items-center gap-2">
                                <Shield size={14} className="text-green-600 shrink-0" />
                                <span className="text-[11px] font-medium text-green-700">Unified Agency Response Protocol</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compliance Matrix */}
                <div className="mt-20 pt-12 border-t border-brand-surface">
                    <div className="text-center mb-10">
                        <h3 className="text-xl font-bold text-brand-dark mb-2">Enhanced CEDAW-Aligned Indicator Matrix</h3>
                        <p className="text-sm text-brand-soft">Connecting local data points to international treaty obligations.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                domain: "Legal & Justice",
                                indicator: "Conviction Rate & Attrition",
                                treaty: "ICCPR / Access to Justice",
                                icon: Scale,
                                color: "amber"
                            },
                            {
                                domain: "Digital Rights",
                                indicator: "TFGBV Offence Score",
                                treaty: "Budapest Convention / EU GSP+",
                                icon: Globe,
                                color: "blue"
                            },
                            {
                                domain: "Workforce Safety",
                                indicator: "Anti-Harassment Compliance",
                                treaty: "ILO Convention 190",
                                icon: Briefcase,
                                color: "purple"
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-5 rounded-xl border border-brand-surface flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-lg bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center shrink-0`}>
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-brand-dark/40 uppercase tracking-wider mb-1">{item.domain}</div>
                                    <div className="text-base font-bold text-brand-dark mb-1">{item.indicator}</div>
                                    <div className="text-xs font-medium text-brand-teal bg-brand-teal/5 px-2 py-1 rounded inline-block">
                                        {item.treaty}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

function SubRoutineCard({ title, icon: Icon, color, steps }: any) {
    const colors: any = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
        green: "bg-green-50 text-green-600 border-green-100"
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-brand-surface shadow-sm hover:border-brand-teal/30 transition-colors group">
            <div className="flex items-center gap-3 mb-6">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
                    <Icon size={20} />
                </div>
                <h4 className="font-bold text-brand-dark">{title}</h4>
            </div>

            <div className="space-y-3 relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-brand-surface" />
                {steps.map((step: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 relative z-10">
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-brand-surface flex items-center justify-center text-[8px] font-bold text-brand-dark/40 group-hover:border-primary-500 group-hover:text-primary-600 transition-colors">
                            {i + 1}
                        </div>
                        <span className="text-sm font-medium text-brand-soft group-hover:text-brand-dark transition-colors">{step}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
