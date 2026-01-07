
"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Shield, CheckCircle2 } from "lucide-react";
import NerveCenter from "@/components/sections/NerveCenter";

const MapIllustration = () => (
    <svg viewBox="0 0 800 600" className="w-full h-full opacity-30 absolute top-0 right-0 -z-10 text-brand-teal/20 pointer-events-none">
        <motion.path
            d="M400,300 L500,200 L600,350 L450,450 Z"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <circle cx="400" cy="300" r="4" fill="#055b65" />
        <circle cx="500" cy="200" r="4" fill="#055b65" />
        <motion.line x1="400" y1="300" x2="500" y2="200" stroke="#1bd488" strokeWidth="2"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }} />
    </svg>
);

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-canvas">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-[-10%] w-[60%] h-[60%] bg-brand-soft/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-100/30 rounded-full blur-[100px]" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Column */}
                <div className="max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-surface border border-brand-teal/20 text-brand-dark mb-6"
                    >
                        <Shield size={16} className="text-primary-600" />
                        <span className="text-xs font-semibold tracking-wide uppercase">Official Govt Platform • Mandated by NCSW</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-brand-dark leading-[1.1] mb-6"
                    >
                        National Gender Data <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-brand-teal">
                            Reporting System
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-brand-teal/80 mb-8 leading-relaxed max-w-lg"
                    >
                        Pakistan's unified digital ecosystem connecting Police, Health, Prosecution, and Social Welfare
                        for real-time GBV case management and survivor support.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 mb-12"
                    >
                        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:translate-y-1">
                            Explore System
                            <ArrowRight size={20} />
                        </button>
                        <button className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-brand-surface border border-brand-surface text-brand-dark font-semibold rounded-xl transition-all">
                            <PlayCircle size={20} />
                            Watch Demo
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-6 items-center text-sm font-medium text-brand-dark/60"
                    >
                        <span>Compliance Standards:</span>
                        {["CEDAW", "SDG 5", "EU GSP+", "GBVIMS"].map((std) => (
                            <div key={std} className="flex items-center gap-1.5 px-3 py-1 bg-white rounded-md border border-brand-surface/50 shadow-sm">
                                <CheckCircle2 size={14} className="text-primary-500" />
                                {std}
                            </div>
                        ))}
                    </motion.div>
                </div>



                {/* Visual Column / Abstract Map */}
                <div className="relative h-[600px] hidden lg:block">
                    <NerveCenter />
                </div>
            </div>
        </section>
    );
}
