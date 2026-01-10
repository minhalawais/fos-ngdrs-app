import NCSWSidebar from "@/components/ncsw/NCSWSidebar";
import { Search, Bell, HelpCircle, User } from "lucide-react";

export default function NCSWLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-brand-canvas">
            <NCSWSidebar />

            {/* Main content area offset by sidebar width */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Top Header matching dashboard style */}
                <header className="h-16 bg-white border-b border-brand-surface flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search cases, provinces, reports..."
                                className="pl-10 pr-4 py-2.5 w-96 rounded-xl border border-brand-surface bg-brand-canvas focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal text-sm transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="w-10 h-10 rounded-xl hover:bg-brand-surface flex items-center justify-center transition-colors text-gray-500 hover:text-brand-dark">
                            <HelpCircle size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-xl hover:bg-brand-surface flex items-center justify-center transition-colors text-gray-500 hover:text-brand-dark relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                        </button>
                        <div className="h-8 w-px bg-brand-surface mx-1" />
                        <div className="flex items-center gap-3 px-3 py-1.5 bg-brand-surface/50 rounded-xl">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-teal to-primary-500 flex items-center justify-center text-white text-xs font-bold">
                                NC
                            </div>
                            <div>
                                <p className="text-xs font-bold text-brand-dark">NCSW Admin</p>
                                <p className="text-[10px] text-gray-400">National Level</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
