
"use client";

import { Bell, Search, User, Calendar, ChevronDown, Settings } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 bg-white border-b border-brand-surface flex items-center justify-between px-6 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
            {/* Search / Breadcrumb Placeholder */}
            <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-teal/50 group-focus-within:text-primary-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search data, districts..."
                        className="pl-9 pr-4 py-2.5 bg-brand-surface/30 border border-transparent rounded-xl text-sm text-brand-dark placeholder:text-brand-soft focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/30 focus:bg-white w-72 transition-all"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                {/* Date Range Selector */}
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-surface/30 hover:bg-brand-surface/50 rounded-xl text-xs font-medium text-brand-dark border border-brand-surface/50 transition-all hover:border-primary-500/20 group">
                    <Calendar size={14} className="text-brand-teal group-hover:text-primary-500 transition-colors" />
                    <span>Jan 2026 - Present</span>
                    <ChevronDown size={12} className="text-brand-soft" />
                </button>

                <div className="h-8 w-px bg-brand-surface"></div>

                {/* Notification Bell */}
                <button className="relative p-2.5 rounded-xl hover:bg-brand-surface/50 transition-all group">
                    <Bell size={18} className="text-brand-dark/70 group-hover:text-brand-dark transition-colors" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>



                <div className="h-8 w-px bg-brand-surface"></div>

                {/* User Profile */}
                <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                    <div className="text-right hidden md:block">
                        <div className="text-sm font-bold text-brand-dark group-hover:text-primary-600 transition-colors">Nilofar Bakhtiar</div>
                        <div className="text-[11px] text-brand-teal font-medium">Chairperson NCSW</div>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-brand-teal rounded-xl flex items-center justify-center border-2 border-white shadow-lg shadow-primary-500/20 overflow-hidden">
                        <span className="text-white font-bold text-sm">NB</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
