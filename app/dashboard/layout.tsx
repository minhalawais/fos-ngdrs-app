
import { ReactNode } from "react";
import Link from "next/link";
import { Menu, Bell, ChevronDown } from "lucide-react";

// Dashboard Navbar Component
function DashboardNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-brand-surface shadow-sm">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Brand */}
                    <Link href="/dashboard" className="flex items-center gap-4">
                        <img src="/GOP.png" alt="GOP Logo" className="h-16 w-auto object-contain" />
                        <img src="/ncsw.png" alt="NCSW Logo" className="h-16 w-auto object-contain" />
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-xl leading-none text-brand-dark tracking-tight">
                                NCSW
                            </span>
                            <span className="text-[11px] font-bold text-brand-teal uppercase tracking-widest">
                                Government of Pakistan
                            </span>
                        </div>
                    </Link>

                    {/* Center Navigation */}
                    <div className="hidden xl:flex items-center gap-1 bg-brand-surface/30 p-1.5 rounded-xl border border-brand-surface/50">
                        {["Overview", "Geospatial", "Justice", "Services", "Platform", "Compliance"].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="px-4 py-2 text-sm font-bold text-brand-dark/70 hover:text-brand-dark hover:bg-white hover:shadow-sm rounded-lg transition-all"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-xl bg-brand-surface/50 flex items-center justify-center text-brand-teal hover:bg-brand-surface hover:text-brand-dark transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <div className="hidden md:flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl bg-brand-surface/30 border border-brand-surface/50 hover:bg-brand-surface/50 transition-colors cursor-pointer group">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-primary-500/20">
                                A
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-brand-dark leading-none">Admin</span>
                                <span className="text-[10px] text-brand-teal font-medium leading-none mt-1">Super User</span>
                            </div>
                            <ChevronDown size={14} className="text-brand-teal ml-1" />
                        </div>
                        <button className="xl:hidden w-10 h-10 rounded-xl bg-brand-surface/50 flex items-center justify-center text-brand-teal">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen bg-brand-canvas font-sans">
            <DashboardNavbar />
            <main className="pt-20 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
                {children}
            </main>
        </div>
    );
}
