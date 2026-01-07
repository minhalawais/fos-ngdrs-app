
"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Globe, Scale, BookOpen, ExternalLink, ShieldCheck, FileCheck, Landmark, ScrollText } from "lucide-react";
import Image from "next/image";

export default function Compliance() {
    return (
        <section id="compliance" className="py-24 bg-brand-surface/50 relative overflow-hidden border-t border-brand-surface">
            {/* World Map Watermark */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url('/grid-pattern.svg')` }} />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10 pointer-events-none">
                <Globe size={600} strokeWidth={0.5} className="text-brand-teal" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Mission & Stamp (4 cols) */}
                    <div className="lg:col-span-5 sticky top-24">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-brand-dark text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <img src="/ncsw.png" alt="NCSW Seal" className="w-[140px] h-[140px] object-contain grayscale" />
                            </div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-300 text-xs font-bold uppercase tracking-wider mb-6">
                                    <Globe size={12} /> International Treaty Body
                                </span>

                                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 leading-tight">
                                    Aligned with <br />Global Standards
                                </h2>

                                <p className="text-brand-soft/80 mb-8 leading-relaxed">
                                    NGDRS data structures are pre-validated to meet the reporting requirements of United Nations conventions and GSP+ trade monitoring bodies.
                                </p>

                                <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-brand-soft">Audit Status</span>
                                        <span className="text-sm font-bold text-primary-400 flex items-center gap-2">
                                            <CheckCircle2 size={16} /> Verified 2025
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-brand-soft">Treaty Coverage</span>
                                        <span className="text-sm font-bold text-white">4 Major Conventions</span>
                                    </div>
                                </div>

                                <button className="mt-8 w-full py-4 bg-white text-brand-dark font-bold rounded-xl hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
                                    Download Compliance Report <ExternalLink size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Detailed List (8 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                        {/* CEDAW */}
                        <ComplianceRow
                            delay={0.1}
                            icon={Scale}
                            code="CEDAW"
                            title="Convention on the Elimination of Discrimination against Women"
                            desc="Art. 1-2, Art. 5 & General Recommendation 35 data points automatically mapped."
                            color="blue"
                        />
                        {/* SDG */}
                        <ComplianceRow
                            delay={0.2}
                            icon={Globe}
                            code="SDG 5"
                            title="Sustainable Development Goals (Agenda 2030)"
                            desc="Real-time tracking of Indicator 5.2.1 (IPV) and 5.2.2 (Sexual Violence)."
                            color="amber"
                        />
                        {/* GSP+ */}
                        <ComplianceRow
                            delay={0.3}
                            icon={Landmark}
                            code="EU GSP+"
                            title="Generalized Scheme of Preferences Plus"
                            desc="Convention compliance reporting for trade status continuity & ICCPR alignment."
                            color="purple"
                        />
                        {/* ILO 190 */}
                        <ComplianceRow
                            delay={0.4}
                            icon={ScrollText}
                            code="ILO 190"
                            title="Violence & Harassment Convention (Workplace)"
                            desc="Anti-harassment policy compliance tracking for economic participation indicators."
                            color="green"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

function ComplianceRow({ delay, icon: Icon, code, title, desc, color }: any) {
    const colors: any = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        green: "bg-green-50 text-green-600 border-green-100"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-brand-surface shadow-sm hover:shadow-lg hover:border-brand-teal/30 transition-all"
        >
            <div className={`shrink-0 w-16 h-16 ${colors[color]} rounded-2xl flex flex-col items-center justify-center border`}>
                <Icon size={24} className="mb-1" />
                <span className="text-[10px] font-bold uppercase">{code}</span>
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-bold text-brand-dark mb-1 group-hover:text-primary-700 transition-colors">{title}</h3>
                <p className="text-sm text-brand-dark/60">{desc}</p>
            </div>

            <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-brand-dark/50">
                    <CheckCircle2 size={16} />
                </div>
            </div>
        </motion.div>
    );
}
