
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ShieldCheck, Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    return (
        <motion.nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                scrolled
                    ? "bg-white/90 backdrop-blur-md border-brand-surface py-3 shadow-sm"
                    : "bg-transparent border-transparent py-5"
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 flex items-center justify-center">
                        <img src="/ncsw.png" alt="NCSW Logo" className="w-full h-full object-contain" />
                    </div>

                    <div className="flex flex-col">
                        <span className="font-heading font-bold text-xl leading-none text-brand-dark tracking-tight">
                            NGDRS
                        </span>
                        <span className="text-xs font-medium text-brand-teal uppercase tracking-wider">
                            Govt. of Pakistan
                        </span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    {["Overview", "Features", "Workflow", "Dashboard", "Compliance"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-brand-dark/70 hover:text-primary-600 transition-colors"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button className="text-sm font-semibold text-brand-dark hover:text-primary-600 px-4 py-2 border border-brand-surface rounded-lg hover:bg-brand-surface/50 transition-all">
                        Documentation
                    </button>
                    <button className="group flex items-center gap-2 text-sm font-semibold text-white bg-brand-dark hover:bg-brand-dark/90 px-5 py-2.5 rounded-lg shadow-lg shadow-brand-dark/20 transition-all hover:translate-y-0.5">
                        Access Portal
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <button className="md:hidden text-brand-dark">
                    <Menu size={24} />
                </button>
            </div>
        </motion.nav>
    );
}
