import ProvincialSidebar from "@/components/provincial/ProvincialSidebar";
import { Search, Bell, HelpCircle } from "lucide-react";

export default function ProvincialLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-brand-canvas">
            <ProvincialSidebar />

            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-brand-surface flex items-center justify-between px-6 sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        {/* Logos & Title Removed as per request */}

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search districts, cases..."
                                className="pl-10 pr-4 py-2 w-64 rounded-xl border border-brand-surface bg-brand-canvas focus:outline-none focus:ring-2 focus:ring-brand-teal text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-xl hover:bg-brand-surface transition-colors text-gray-500">
                            <HelpCircle size={20} />
                        </button>
                        <button className="p-2 rounded-xl hover:bg-brand-surface transition-colors text-gray-500 relative">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                        <div className="h-8 w-px bg-brand-surface" />
                        <span className="text-sm font-medium text-brand-dark">Reporting Period: <strong>Jan 2024</strong></span>
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
