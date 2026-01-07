
import { ShieldCheck, Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-dark text-white border-t border-brand-surface/10 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-lg border border-white/10 p-1">
                                <img src="/ncsw.png" alt="NCSW Logo" className="w-full h-full object-contain" />
                            </div>

                            <div className="flex flex-col">
                                <span className="font-heading font-bold text-xl leading-none">NGDRS</span>
                                <span className="text-xs font-medium text-brand-teal uppercase">Govt. of Pakistan</span>
                            </div>
                        </div>
                        <p className="text-brand-soft/60 text-sm mb-8 leading-relaxed">
                            Official platform of the Government of Pakistan, mandated by the National Commission on the Status of Women (NCSW) under the NCSW Act 2012.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-brand-surface/10 flex items-center justify-center hover:bg-primary-600 transition-colors"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-brand-surface/10 flex items-center justify-center hover:bg-primary-600 transition-colors"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-brand-surface/10 flex items-center justify-center hover:bg-primary-600 transition-colors"><Linkedin size={18} /></a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-brand-soft/60">
                            <li><a href="#overview" className="hover:text-primary-400 transition-colors">System Overview</a></li>
                            <li><a href="#features" className="hover:text-primary-400 transition-colors">Platform Features</a></li>
                            <li><a href="#workflow" className="hover:text-primary-400 transition-colors">Data Pipeline</a></li>
                            <li><a href="#dashboard" className="hover:text-primary-400 transition-colors">Executive Dashboard</a></li>
                            <li><a href="#compliance" className="hover:text-primary-400 transition-colors">Compliance</a></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm text-brand-soft/60">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">NCSW Circular Link</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Data Dictionary</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">User Manuals</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">API Documentation</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Login to Portal</a></li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="font-bold text-lg mb-6">Contact NCSW</h4>
                        <ul className="space-y-4 text-sm text-brand-soft/60">
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-primary-500 mt-0.5" />
                                <span>data@ncsw.gov.pk</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-primary-500 mt-0.5" />
                                <span>+92 51 9040 1043</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary-500 mt-0.5" />
                                <span>NCSW Secretariat, F-8 Sector, Islamabad, Pakistan</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-brand-surface/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-soft/40">
                    <p>&copy; 2026 National Commission on the Status of Women. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Accessibility</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
