"use client";

import { ReactNode } from "react";
import DistrictSidebar from "@/components/district/DistrictSidebar";
import { Bell, Search, HelpCircle } from "lucide-react";

export default function DistrictLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-brand-canvas font-sans flex">
            {/* Sidebar */}
            <DistrictSidebar />

            {/* Main Content Area */}
            <main className="flex-1 ml-72 flex flex-col min-h-screen">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-brand-surface sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-brand-dark">District Administration Portal</h1>
                        <p className="text-xs text-brand-teal font-medium">Monitoring & Response System v2.0</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-teal/50 group-focus-within:text-brand-teal transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search Cases (CNIC/ID)..."
                                className="pl-10 pr-4 py-2.5 bg-brand-surface/20 border border-brand-surface rounded-xl text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all w-64 md:w-80 placeholder:text-brand-dark/40"
                            />
                        </div>

                        <div className="h-8 w-px bg-brand-surface mx-2" />

                        <button className="w-10 h-10 rounded-xl bg-brand-surface/20 flex items-center justify-center text-brand-teal hover:bg-brand-surface hover:text-brand-dark transition-colors" title="Help & Resources">
                            <HelpCircle size={20} />
                        </button>

                        <button className="w-10 h-10 rounded-xl bg-brand-surface/20 flex items-center justify-center text-brand-teal hover:bg-brand-surface hover:text-brand-dark transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm ring-2 ring-white"></span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="p-8 max-w-[1600px] w-full mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
