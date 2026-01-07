
"use client";
import { motion } from "framer-motion";
import { FileInput, GitCompare, Route, MapPin, Gauge, BellRing, FileText, Database } from "lucide-react";

export default function Features() {
    return (
        <section id="features" className="py-24 bg-brand-dark text-white relative overflow-hidden">
            {/* Background noise */}
            {/* Background noise */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Platform Capabilities</span>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Intelligent Decision-Support <br />
                        <span className="text-primary-400">At Every Level</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-brand-soft/70 text-lg">
                        From field-level data entry to executive dashboards, NGDRS provides role-based tools designed for each stakeholder in the justice chain.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
                    {/* Large Feature 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="col-span-1 lg:col-span-2 row-span-2 bg-brand-surface/10 border border-white/10 rounded-2xl p-8 hover:bg-brand-surface/15 transition-colors group"
                    >
                        <div className="w-12 h-12 bg-primary-500/20 text-primary-400 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <MapPin size={24} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Geospatial Risk Mapping</h3>
                        <p className="text-brand-soft/70 mb-8 leading-relaxed">
                            Interactive chloropleth maps detect Red Zones automatically when district cases exceed 50 per 100k population or show &gt;25% Month-over-Month increase.
                        </p>
                        <div className="bg-brand-dark/50 rounded-xl p-4 border border-white/5">
                            <div className="flex items-center gap-3 mb-2 text-sm text-brand-soft">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span>Live Alert: District Lahore</span>
                            </div>
                            <div className="text-xs text-brand-soft/50 font-mono">
                                Density: 52.4/100k • Impact: Critical
                            </div>
                        </div>
                    </motion.div>

                    {/* Standard Feature 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="bg-brand-surface/10 border border-white/10 rounded-2xl p-6 hover:bg-brand-surface/15 transition-colors group"
                    >
                        <FileInput className="text-brand-teal mb-4 group-hover:text-primary-400 transition-colors" size={32} />
                        <h4 className="text-xl font-bold mb-2">Smart Intake</h4>
                        <p className="text-sm text-brand-soft/70">Offline-first PWA with conditional logic for seamless field reporting.</p>
                    </motion.div>

                    {/* Standard Feature 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                        className="bg-brand-surface/10 border border-white/10 rounded-2xl p-6 hover:bg-brand-surface/15 transition-colors group"
                    >
                        <GitCompare className="text-brand-teal mb-4 group-hover:text-primary-400 transition-colors" size={32} />
                        <h4 className="text-xl font-bold mb-2">Triangulation</h4>
                        <p className="text-sm text-brand-soft/70">Auto-verification between Police, Health & Prosecution records.</p>
                    </motion.div>

                    {/* Standard Feature 4 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
                        className="bg-brand-surface/10 border border-white/10 rounded-2xl p-6 hover:bg-brand-surface/15 transition-colors group"
                    >
                        <BellRing className="text-brand-teal mb-4 group-hover:text-primary-400 transition-colors" size={32} />
                        <h4 className="text-xl font-bold mb-2">Auto Alerts</h4>
                        <p className="text-sm text-brand-soft/70">Real-time SMS/Email triggers for Red Zones & Repeat Offenders.</p>
                    </motion.div>

                    {/* Standard Feature 5 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
                        className="bg-brand-surface/10 border border-white/10 rounded-2xl p-6 hover:bg-brand-surface/15 transition-colors group"
                    >
                        <FileText className="text-brand-teal mb-4 group-hover:text-primary-400 transition-colors" size={32} />
                        <h4 className="text-xl font-bold mb-2">CEDAW Reports</h4>
                        <p className="text-sm text-brand-soft/70">One-click generation of international compliance reports.</p>
                    </motion.div>

                    {/* Wide Feature 6 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                        className="col-span-1 md:col-span-2 bg-gradient-to-br from-primary-900/40 to-brand-surface/10 border border-primary-500/20 rounded-2xl p-8 group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-[50px]" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <Gauge size={32} className="text-primary-400" />
                                <h3 className="text-2xl font-bold">Platform Accountability</h3>
                            </div>
                            <p className="text-brand-soft/80 max-w-md">
                                Track social media platform performance with real-time metrics on Takedown Success Rate and Response Time for TFGBV cases.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
