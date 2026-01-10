"use client";

import { useState } from "react";
import {
    Users,
    Search,
    Plus,
    Edit,
    Shield,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react";
import { generateUserDirectory } from "@/lib/ncsw-mock-data";
import { clsx } from "clsx";

const users = generateUserDirectory();

const ROLE_COLORS: Record<string, string> = {
    'NCSW Admin': 'bg-purple-100 text-purple-700 border-purple-200',
    'Provincial Reviewer': 'bg-blue-100 text-blue-700 border-blue-200',
    'District Operator': 'bg-green-100 text-green-700 border-green-200',
};

export default function UserManagementPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All");

    const filteredUsers = users.filter(u =>
        (roleFilter === "All" || u.role === roleFilter) &&
        (u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const activeUsers = users.filter(u => u.status === 'Active').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-brand-dark flex items-center gap-3">
                        <Users className="text-brand-teal" size={28} />
                        User Management
                    </h1>
                    <p className="text-sm text-brand-teal">Manage portal users across District, Provincial, and NCSW levels</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-dark hover:bg-brand-teal text-white font-bold rounded-xl text-sm shadow-md transition-all">
                    <Plus size={16} /> Add New User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-surface/50 flex items-center justify-center">
                            <Users size={24} className="text-brand-teal" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{users.length}</p>
                            <p className="text-xs text-gray-500">Total Users</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                            <CheckCircle size={24} className="text-green-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{activeUsers}</p>
                            <p className="text-xs text-gray-500">Active Users</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Shield size={24} className="text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{users.filter(u => u.role === 'NCSW Admin').length}</p>
                            <p className="text-xs text-gray-500">NCSW Admins</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-brand-surface p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                            <Clock size={24} className="text-orange-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-brand-dark">{users.filter(u => u.status === 'Inactive').length}</p>
                            <p className="text-xs text-gray-500">Inactive Users</p>
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
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 rounded-xl border border-brand-surface focus:outline-none focus:ring-2 focus:ring-brand-teal/50 bg-white"
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                >
                    <option value="All">All Roles</option>
                    <option value="NCSW Admin">NCSW Admin</option>
                    <option value="Provincial Reviewer">Provincial Reviewer</option>
                    <option value="District Operator">District Operator</option>
                </select>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-brand-surface shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-surface/20 text-xs text-brand-dark/70 uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4 border-b border-brand-surface">User</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Role</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Portal</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Status</th>
                            <th className="px-6 py-4 border-b border-brand-surface">Last Login</th>
                            <th className="px-6 py-4 border-b border-brand-surface text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-surface">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-teal to-brand-dark flex items-center justify-center text-white font-bold text-sm">
                                            {user.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-dark">{user.name}</p>
                                            <p className="text-xs text-gray-400">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <span className={clsx(
                                        "px-3 py-1.5 rounded-lg text-xs font-bold border",
                                        ROLE_COLORS[user.role] || "bg-gray-100 text-gray-700"
                                    )}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-600">{user.portal}</td>
                                <td className="px-6 py-5">
                                    <span className={clsx(
                                        "px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 w-fit",
                                        user.status === 'Active'
                                            ? "bg-green-50 text-green-700"
                                            : "bg-gray-100 text-gray-500"
                                    )}>
                                        {user.status === 'Active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-5 text-sm text-gray-500">{user.lastLogin}</td>
                                <td className="px-6 py-5 text-right">
                                    <button className="p-2 hover:bg-brand-surface rounded-lg text-gray-400 hover:text-brand-teal transition-colors opacity-60 group-hover:opacity-100">
                                        <Edit size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
