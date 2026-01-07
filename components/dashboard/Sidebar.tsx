"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard, Map, Scale, HeartHandshake, Database, Globe,
    Settings, LogOut, Bell, Search, User, ShieldCheck, FileText, ChevronRight
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
    { href: "/dashboard", label: "National Overview", icon: LayoutDashboard },
    { href: "/dashboard/map", label: "Geospatial Heatmaps", icon: Map },
    { href: "/dashboard/justice", label: "Justice Funnel", icon: Scale },
    { href: "/dashboard/services", label: "Survivor Support", icon: HeartHandshake },
    { href: "/dashboard/platform", label: "Platform Accountability", icon: Database },
    { href: "/dashboard/compliance", label: "Strategic Compliance", icon: Globe },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-brand-dark text-white flex flex-col fixed inset-y-0 left-0 z-50 shadow-2xl">
            {/* Logo Section */}
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center p-1.5 border border-white/10 shadow-lg">
                    <img src="/ncsw.png" alt="NCSW Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                    <span className="block font-heading font-bold text-lg tracking-tight">NGDRS</span>
                    <span className="block text-[10px] text-primary-400 uppercase font-semibold tracking-wider">Govt. of Pakistan</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
                <div className="px-3 mb-4 text-[10px] font-bold text-brand-teal uppercase tracking-widest">Main Modules</div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group relative overflow-hidden",
                                isActive
                                    ? "bg-gradient-to-r from-primary-600/20 to-transparent text-white"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-r-full" />
                            )}

                            <div className={clsx(
                                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                isActive ? "bg-primary-500/20 text-primary-400" : "bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white"
                            )}>
                                <item.icon size={16} />
                            </div>
                            <span className="flex-1">{item.label}</span>
                            {isActive && <ChevronRight size={14} className="text-primary-400" />}
                        </Link>
                    );
                })}


            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 text-red-400 group-hover:bg-red-500/20 transition-all">
                        <LogOut size={16} />
                    </div>
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
