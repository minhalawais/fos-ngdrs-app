
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Quote, Shield, Users, MapPin, Clock } from "lucide-react";
import Link from "next/link";

// Inspiring quotes about women's rights and protection
const quotes = [
    {
        text: "A nation's progress is measured by how it protects its women.",
        author: "NCSW Vision"
    },
    {
        text: "Survivor-centered. Data-driven. Justice-focused.",
        author: "NGDRS Mission"
    },
    {
        text: "From silence to action, from data to justice.",
        author: "National Commitment"
    }
];

// Key stakeholders/entities connected
const connectedEntities = [
    { icon: Users, label: "6 Provinces", desc: "Connected" },
    { icon: MapPin, label: "170+ Districts", desc: "Reporting" },
    { icon: Clock, label: "24/7", desc: "Monitoring" },
];

export default function NerveCenter() {
    const [currentQuote, setCurrentQuote] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentQuote((prev) => (prev + 1) % quotes.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-full w-full overflow-hidden">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-[#0d2a30] to-brand-dark rounded-2xl" />

            {/* Decorative Shield Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <img src="/ncsw.png" alt="watermark" className="w-[500px] h-[500px] object-contain grayscale" />
            </div>

            {/* Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-teal/20 rounded-full blur-[60px]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col p-6">

                {/* Header: NCSW Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 mb-8"
                >

                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1 border border-primary-500/30">
                        <img src="/ncsw.png" alt="NCSW" className="w-full h-full object-contain" />
                    </div>

                    <div>
                        <div className="text-white font-bold text-sm">National Commission</div>
                        <div className="text-primary-400 text-xs">on the Status of Women</div>
                    </div>
                </motion.div>

                {/* Main Quote Section */}
                <div className="flex-1 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <Quote size={24} className="text-primary-500/50 mb-3" />
                        <motion.div
                            key={currentQuote}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-2xl font-semibold text-white leading-relaxed mb-3"
                        >
                            {quotes[currentQuote].text}
                        </motion.div>
                        <div className="text-sm text-primary-400">
                            — {quotes[currentQuote].author}
                        </div>
                    </motion.div>

                    {/* Quote Navigation Dots */}
                    <div className="flex gap-2 mb-8">
                        {quotes.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQuote(idx)}
                                className={`h-1 rounded-full transition-all ${idx === currentQuote
                                    ? 'w-8 bg-primary-500'
                                    : 'w-3 bg-white/20 hover:bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Connected Network Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                >
                    <div className="flex gap-3">
                        {connectedEntities.map((item, idx) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-center hover:bg-white/10 transition-colors"
                            >
                                <item.icon size={18} className="text-primary-400 mx-auto mb-1" />
                                <div className="text-white font-bold text-sm">{item.label}</div>
                                <div className="text-brand-soft text-[10px]">{item.desc}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <Link href="/dashboard">
                        <div className="group flex items-center justify-center gap-2 w-full py-3.5 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-600/20">
                            <span>Explore the System</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
