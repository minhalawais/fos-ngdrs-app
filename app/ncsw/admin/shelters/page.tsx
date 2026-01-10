"use client";

import { useState } from "react";
import {
    Home,
    Search,
    Plus,
    Edit,
    MapPin,
    Users,
    CheckCircle,
    AlertTriangle
} from "lucide-react";
import { generateShelterDirectory } from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const shelters = generateShelterDirectory();

const TYPE_COLORS: Record<string, string> = {
    'Dar-ul-Aman': 'bg-blue-100 text-blue-700',
    'WPC': 'bg-purple-100 text-purple-700',
    'One-Stop': 'bg-green-100 text-green-700',
    'Safe House': 'bg-orange-100 text-orange-700',
};

const STATUS_STYLES: Record<string, string> = {
    'Active': 'bg-green-50 text-green-700 border-green-200',
    'At Capacity': 'bg-orange-50 text-orange-700 border-orange-200',
    'Under Renovation': 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function ShelterDirectoryPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("All");

    const filteredShelters = shelters.filter(s =>
        (typeFilter === "All" || s.type === typeFilter) &&
        (s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.district.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const totalCapacity = shelters.reduce((sum, s) => sum + s.capacity, 0);
    const totalOccupancy = shelters.reduce((sum, s) => sum + s.occupancy, 0);
    const occupancyRate = Math.round((totalOccupancy / totalCapacity) * 100);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Home className="text-brand-teal" size={28} />
                        Shelter Directory
                    </h1>
                    <p className="text-sm text-brand-teal">Manage Dar-ul-Aman, WPCs, and One-Stop Centers nationally</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    <Plus size={16} /> Add New Shelter
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <Home size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{shelters.length}</p>
                            <p className="text-xs text-gray-500">Total Shelters</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <Users size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalCapacity}</p>
                            <p className="text-xs text-gray-500">Total Capacity</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <Users size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{totalOccupancy}</p>
                            <p className="text-xs text-gray-500">Current Occupancy</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                            <AlertTriangle size={24} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{occupancyRate}%</p>
                            <p className="text-xs text-gray-500">Occupancy Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl border border-brand-surface shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search shelters..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="Dar-ul-Aman">Dar-ul-Aman</option>
                    <option value="WPC">WPC</option>
                    <option value="One-Stop">One-Stop Center</option>
                    <option value="Safe House">Safe House</option>
                </select>
            </div>

            {/* Shelter Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredShelters.map((shelter) => (
                    <div
                        key={shelter.id}
                        className="bg-white rounded-2xl border border-brand-surface p-6 shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={clsx(
                                    "px-2.5 py-1 rounded-lg text-xs font-bold mb-2 inline-block",
                                    TYPE_COLORS[shelter.type] || "bg-gray-100 text-gray-700"
                                )}>
                                    {shelter.type}
                                </span>
                                <h3 className="font-bold text-brand-dark text-lg">{shelter.name}</h3>
                                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                    <MapPin size={12} /> {shelter.district}, {shelter.province}
                                </p>
                            </div>
                            <button className="p-2 hover:bg-brand-surface rounded-lg text-gray-400 hover:text-brand-teal transition-colors">
                                <Edit size={16} />
                            </button>
                        </div>

                        {/* Capacity Bar */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-500">Occupancy</span>
                                <span className="font-bold text-brand-dark">{shelter.occupancy}/{shelter.capacity}</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={clsx(
                                        "h-full rounded-full",
                                        shelter.occupancy / shelter.capacity >= 0.9 ? "bg-red-500" :
                                            shelter.occupancy / shelter.capacity >= 0.7 ? "bg-orange-500" :
                                                "bg-brand-teal"
                                    )}
                                    style={{ width: `${(shelter.occupancy / shelter.capacity) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex flex-wrap gap-1 mb-4">
                            {shelter.services.map((service) => (
                                <span key={service} className="px-2 py-0.5 bg-brand-surface/50 text-gray-600 rounded text-xs">
                                    {service}
                                </span>
                            ))}
                        </div>

                        {/* Status */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className={clsx(
                                "px-3 py-1 rounded-lg text-xs font-bold border",
                                STATUS_STYLES[shelter.status]
                            )}>
                                {shelter.status}
                            </span>
                            <span className="text-xs text-gray-400">ID: {shelter.id}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
