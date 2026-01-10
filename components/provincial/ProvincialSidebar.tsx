"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Trophy,
    ClipboardCheck,
    Calendar,
    Building2,
    AlertTriangle,
    FileText,
    Settings,
    ChevronRight,
    Shield
} from "lucide-react";
import { clsx } from "clsx";

const menuItems = [
    { href: '/provincial', label: 'Provincial Dashboard', icon: LayoutDashboard },
    { href: '/provincial/districts', label: 'District Performance', icon: Trophy },
    { href: '/provincial/verify', label: 'Case Verification', icon: ClipboardCheck },
    { href: '/provincial/compliance', label: 'Compliance Tracker', icon: Calendar },
    { href: '/provincial/capacity', label: 'Institutional Capacity', icon: Building2 },
    { href: '/provincial/alerts', label: 'Escalation & Alerts', icon: AlertTriangle },
    { href: '/provincial/reports', label: 'Reports & Exports', icon: FileText },
];

export default function ProvincialSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-brand-dark text-white flex flex-col h-screen sticky top-0">
            {/* Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-teal to-primary-500 flex items-center justify-center shadow-lg">
                        <Shield size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Provincial Portal</h1>
                        <p className="text-xs text-brand-teal">Punjab WDD</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/provincial' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-white/10 text-white shadow-lg"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon size={20} className={clsx(isActive && "text-brand-teal")} />
                            <span className="font-medium flex-1">{item.label}</span>
                            {isActive && <ChevronRight size={16} className="text-brand-teal" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-white/10">
                <Link
                    href="/provincial/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all"
                >
                    <Settings size={20} />
                    <span className="font-medium">Settings</span>
                </Link>
                <div className="mt-4 px-4 py-3 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-sm font-bold">
                            SM
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">Secretary WDD</p>
                            <p className="text-xs text-white/50 truncate">Punjab Province</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
