"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FilePlus,
    FolderOpen,
    FileText,
    Settings,
    LogOut,
    Building2,
    ShieldAlert
} from "lucide-react";
import { clsx } from "clsx";

const MENU_ITEMS = [
    { name: "Operational Dashboard", href: "/district", icon: LayoutDashboard },
    { name: "Intake & Registration", href: "/district/intake", icon: FilePlus },
    { name: "Case Repository", href: "/district/cases", icon: FolderOpen },
    { name: "Compliance Reports", href: "/district/reports", icon: FileText },
];

export default function DistrictSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-72 bg-brand-dark fixed inset-y-0 left-0 z-50 flex flex-col text-white shadow-xl">
            {/* Header / Logo */}
            <div className="h-20 flex items-center px-6 border-b border-white/10 bg-black/10">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center p-1.5 border border-white/10 shadow-lg">
                        <img src="/ncsw.png" alt="NCSW Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg leading-tight tracking-tight text-white">District Portal</span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-primary-400">Peshawar Admin</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest px-4 mb-2">Core Modules</div>
                {MENU_ITEMS.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "bg-white/10 text-white shadow-lg border border-white/5"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-r-full" />
                            )}
                            <item.icon size={20} className={clsx("transition-colors", isActive ? "text-primary-400" : "group-hover:text-primary-300")} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}

                <div className="mt-8 text-xs font-bold text-white/40 uppercase tracking-widest px-4 mb-2">System</div>
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group"
                >
                    <Settings size={20} className="group-hover:text-brand-soft" />
                    <span className="font-medium">Settings</span>
                </Link>
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-white/10 bg-black/20">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                        FA
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-white truncate">Fatima Ahmed</p>
                        <p className="text-[10px] text-white/50 truncate">District Focal Point</p>
                    </div>
                    <LogOut size={16} className="text-white/40 group-hover:text-red-400 transition-colors" />
                </div>
            </div>
        </aside>
    );
}
