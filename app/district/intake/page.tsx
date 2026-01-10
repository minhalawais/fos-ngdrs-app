"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User,
    FileText,
    Smartphone,
    Shield,
    ChevronRight,
    ChevronLeft,
    Save,
    UploadCloud,
    Camera,
    MapPin,
    AlertCircle,
    Check,
    CheckCircle
} from "lucide-react";
import { clsx } from "clsx";

const STEPS = [
    { id: 1, title: "Survivor Profile", icon: User },
    { id: 2, title: "Incident Classification", icon: FileText },
    { id: 3, title: "Evidence & Forensics", icon: Smartphone },
    { id: 4, title: "Service Referrals", icon: Shield },
];

const VIOLENCE_CATEGORIES = [
    { id: 'physical', label: 'Physical Violence', icon: AlertCircle, color: 'bg-red-50 text-red-600 border-red-200' },
    { id: 'sexual', label: 'Sexual Violence', icon: AlertCircle, color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { id: 'tfgbv', label: 'TFGBV (Digital)', icon: Smartphone, color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: 'economic', label: 'Economic Abuse', icon: FileText, color: 'bg-blue-50 text-blue-600 border-blue-200' },
];

const TFGBV_TYPES = [
    { code: 'TF-A1', label: 'Cyberstalking / Monitoring' },
    { code: 'TF-A2', label: 'Doxxing (Personal Info Leak)' },
    { code: 'TF-A3', label: 'Non-consensual Image Sharing' },
    { code: 'TF-A4', label: 'Deepfake / AI Content' },
    { code: 'TF-A5', label: 'Online Harassment / Mobbing' },
    { code: 'TF-A6', label: 'AI Voice Cloning Coercion' },
    { code: 'TF-A7', label: 'Sextortion / Blackmail' },
    { code: 'TF-A8', label: 'GPS / Location Stalking' },
];

export default function IntakePage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDraftSuccess, setShowDraftSuccess] = useState(false);
    const [caseId, setCaseId] = useState("");

    const [formData, setFormData] = useState({
        survivorName: '', cnic: '', ageGroup: '', disability: 'None',
        category: '', subType: '', locationType: '',
        evidenceFiles: [], platform: '', url: '',
        referrals: { medical: false, psychosocial: false, shelter: false, legal: false }
    });

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

    const updateField = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleReferral = (key: string) => {
        setFormData(prev => ({
            ...prev,
            referrals: { ...prev.referrals, [key]: !prev.referrals[key as keyof typeof prev.referrals] }
        }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        const newId = `CASE-2024-${Math.floor(1000 + Math.random() * 9000)}`;
        setCaseId(newId);
        setIsSubmitting(false);
        setShowSuccess(true);
    };

    const handleDraftSave = () => {
        // Simulate Draft Save
        setShowDraftSuccess(true);
        setTimeout(() => setShowDraftSuccess(false), 3000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 relative">
            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
                        >
                            <div className="bg-brand-dark p-6 flex flex-col items-center text-center text-white">
                                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30">
                                    <Check size={32} strokeWidth={3} />
                                </div>
                                <h3 className="text-2xl font-bold mb-1">Case Filed Successfully</h3>
                                <p className="text-brand-teal/80 text-sm">Standard Operating Procedure (SOP-1)</p>
                            </div>
                            <div className="p-8 space-y-6">
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm mb-2">System Generated Case ID</p>
                                    <div className="text-3xl font-mono font-bold text-brand-dark tracking-wider bg-gray-50 py-3 rounded-xl border border-dashed border-gray-300 select-all">
                                        {caseId}
                                    </div>
                                    <p className="text-xs text-orange-600 mt-2 font-medium flex items-center justify-center gap-1">
                                        <AlertCircle size={12} /> Store this ID securely to prevent re-identifying survivor.
                                    </p>
                                </div>

                                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800 space-y-2">
                                    <div className="flex gap-2">
                                        <CheckCircle size={16} className="shrink-0 mt-0.5 text-blue-600" />
                                        <span>Data encrypted & logged in District Registry.</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <CheckCircle size={16} className="shrink-0 mt-0.5 text-blue-600" />
                                        <span>Referral notifications sent to chosen services.</span>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => window.location.href = '/district/cases'}
                                        className="flex-1 py-3 text-sm font-bold text-brand-dark border border-brand-surface rounded-xl hover:bg-gray-50"
                                    >
                                        View Case File
                                    </button>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="flex-1 py-3 text-sm font-bold text-white bg-brand-dark rounded-xl hover:bg-brand-teal"
                                    >
                                        New Intake
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Draft Toast */}
            <AnimatePresence>
                {showDraftSuccess && (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="fixed bottom-8 right-8 z-50 bg-brand-dark text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-brand-dark"><Save size={16} /></div>
                        <div>
                            <h4 className="font-bold text-sm">Draft Saved Locally</h4>
                            <p className="text-xs text-brand-teal">You can resume this form later.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-brand-dark">Case Intake & Registration</h2>
                <p className="text-sm text-brand-teal">Standard Operating Procedure (SOP-1)</p>
            </div>

            {/* Stepper */}
            <div className="bg-white p-4 rounded-2xl border border-brand-surface shadow-sm mb-6">
                <div className="flex items-center justify-between relative">
                    <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-100 -z-10" />
                    {STEPS.map((step) => {
                        const isActive = currentStep >= step.id;
                        const isCurrent = currentStep === step.id;
                        return (
                            <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                                <div className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                    isActive ? "bg-brand-dark border-brand-dark text-white shadow-lg" : "bg-white border-gray-200 text-gray-400"
                                )}>
                                    <step.icon size={18} />
                                </div>
                                <span className={clsx(
                                    "text-xs font-bold uppercase tracking-wider",
                                    isCurrent ? "text-brand-dark scale-105" : "text-gray-400"
                                )}>{step.title}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-3xl border border-brand-surface shadow-lg min-h-[500px] flex flex-col overflow-hidden">
                <div className="flex-1 p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {currentStep === 1 && (
                                <div className="space-y-6 max-w-3xl mx-auto">
                                    <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-2">Step 1: Survivor Profile</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-brand-dark uppercase">Full Name</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium"
                                                placeholder="Enter full name" value={formData.survivorName} onChange={e => updateField('survivorName', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-brand-dark uppercase">CNIC / ID (Optional)</label>
                                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium"
                                                placeholder="XXXXX-XXXXXXX-X" value={formData.cnic} onChange={e => updateField('cnic', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-brand-dark uppercase">Age Group</label>
                                            <select className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium text-brand-dark"
                                                value={formData.ageGroup} onChange={e => updateField('ageGroup', e.target.value)}>
                                                <option value="">Select Age Group</option>
                                                <option value="Minor">Minor (0-17)</option>
                                                <option value="Youth">Youth (18-24)</option>
                                                <option value="Adult">Adult (25-59)</option>
                                                <option value="Senior">Senior (60+)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-brand-dark uppercase">Disability Status</label>
                                            <select className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium text-brand-dark"
                                                value={formData.disability} onChange={e => updateField('disability', e.target.value)}>
                                                <option value="None">None</option>
                                                <option value="Physical">Physical Disability</option>
                                                <option value="Visual/Hearing">Visual / Hearing Impairment</option>
                                                <option value="Intellectual">Intellectual Disability</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex gap-3 text-sm text-yellow-800">
                                        <AlertCircle className="shrink-0" size={20} />
                                        <p><strong>PII Warning (SOP-4):</strong> Personally Identifiable Information is encrypted at the district level and will not be shared with the National Dashboard.</p>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-6 max-w-3xl mx-auto">
                                    <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-2">Step 2: Incident Classification</h3>

                                    <div className="space-y-4">
                                        <label className="text-xs font-bold text-brand-dark uppercase">Primary Violence Category</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {VIOLENCE_CATEGORIES.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => updateField('category', cat.id)}
                                                    className={clsx(
                                                        "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all h-32 hover:scale-[1.02]",
                                                        formData.category === cat.id
                                                            ? `bg-brand-dark border-brand-dark text-white shadow-lg`
                                                            : `bg-white border-brand-surface text-brand-dark/60 hover:border-brand-teal`
                                                    )}
                                                >
                                                    <cat.icon size={28} />
                                                    <span className="text-xs font-bold uppercase text-center">{cat.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {formData.category === 'tfgbv' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-4 pt-4 border-t border-dashed border-gray-200"
                                        >
                                            <div className="flex items-center gap-2 text-purple-600 font-bold">
                                                <Smartphone size={18} />
                                                <h4>TFGBV Specific Details</h4>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-brand-dark uppercase">Digital Offence Type</label>
                                                    <select className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium"
                                                        value={formData.subType} onChange={e => updateField('subType', e.target.value)}>
                                                        <option value="">Select Sub-Type Code</option>
                                                        {TFGBV_TYPES.map(t => (
                                                            <option key={t.code} value={t.code}>{t.code}: {t.label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-brand-dark uppercase">Platform Involved</label>
                                                    <select className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium"
                                                        value={formData.platform} onChange={e => updateField('platform', e.target.value)}>
                                                        <option value="">Select Platform</option>
                                                        <option value="WhatsApp">WhatsApp</option>
                                                        <option value="TikTok">TikTok</option>
                                                        <option value="Facebook">Facebook / Meta</option>
                                                        <option value="Instagram">Instagram</option>
                                                        <option value="X (Twitter)">X (Twitter)</option>
                                                        <option value="YouTube">YouTube</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-brand-dark uppercase">Location of Incident</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <select className="w-full pl-12 pr-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 focus:ring-2 focus:ring-brand-teal focus:border-brand-teal transition-all outline-none font-medium"
                                                value={formData.locationType} onChange={e => updateField('locationType', e.target.value)}>
                                                <option value="">Select Location Type</option>
                                                <option value="Home">Home (Domestic)</option>
                                                <option value="Workplace">Workplace</option>
                                                <option value="Educational Inst">School / University</option>
                                                <option value="Public Transport">Public Transport</option>
                                                <option value="Online">Online / Digital Space</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-6 max-w-3xl mx-auto">
                                    <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-2">Step 3: Evidence & Forensics</h3>

                                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-blue-100/50 transition-colors border-dashed border-2">
                                        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                            <UploadCloud size={32} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark">Upload Digital Evidence</h4>
                                            <p className="text-sm text-brand-teal">Drop files here or click to browse (Screenshots, PDFs, Audio)</p>
                                        </div>
                                        <div className="text-[10px] uppercase font-bold text-blue-400 bg-white px-3 py-1 rounded-full">Secure Hash Generation Enabled</div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="font-bold text-brand-dark text-sm uppercase">Forensics Checklist (SOP-2)</h4>
                                        <div className="space-y-3">
                                            {['Timestamp visible on screenshot', 'URL / Profile Link captured', 'Device details logged', 'Hash generated for integrity'].map((item, i) => (
                                                <label key={i} className="flex items-center gap-3 p-3 border border-brand-surface rounded-xl hover:bg-gray-50 cursor-pointer">
                                                    <input type="checkbox" className="w-5 h-5 rounded text-brand-dark focus:ring-brand-teal" />
                                                    <span className="text-sm font-medium text-brand-dark">{item}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-brand-dark uppercase">Evidence URL / Link</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-xl border border-brand-surface bg-brand-surface/10 outline-none font-mono text-sm"
                                            placeholder="https://..." value={formData.url} onChange={e => updateField('url', e.target.value)} />
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-6 max-w-3xl mx-auto">
                                    <h3 className="text-xl font-bold text-brand-dark border-b border-gray-100 pb-2">Step 4: Immediate Service Referrals</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            { id: 'medical', label: 'Medico-legal Examination', desc: 'Hospital Referral' },
                                            { id: 'psychosocial', label: 'Psychosocial Support', desc: 'Counseling Services' },
                                            { id: 'shelter', label: 'Safe Shelter', desc: 'Dar-ul-Aman' },
                                            { id: 'legal', label: 'Legal Aid / Advice', desc: 'District Bar / WPC' },
                                        ].map((service) => (
                                            <button
                                                key={service.id}
                                                onClick={() => toggleReferral(service.id)}
                                                className={clsx(
                                                    "flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left group",
                                                    formData.referrals[service.id as keyof typeof formData.referrals]
                                                        ? "bg-primary-50 border-primary-500 shadow-md"
                                                        : "bg-white border-brand-surface hover:border-brand-teal"
                                                )}
                                            >
                                                <div className={clsx(
                                                    "w-6 h-6 rounded-full flex items-center justify-center border transition-colors",
                                                    formData.referrals[service.id as keyof typeof formData.referrals]
                                                        ? "bg-primary-500 border-primary-500 text-white"
                                                        : "bg-white border-gray-300 group-hover:border-brand-teal"
                                                )}>
                                                    {formData.referrals[service.id as keyof typeof formData.referrals] && <Check size={14} />}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-brand-dark">{service.label}</h4>
                                                    <p className="text-xs text-brand-teal">{service.desc}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="p-6 bg-brand-surface/20 rounded-2xl border border-brand-surface mt-6">
                                        <h4 className="font-bold text-brand-dark mb-4">Summary Review</h4>
                                        <div className="text-sm space-y-2">
                                            <p><span className="font-bold text-brand-teal">Name:</span> {formData.survivorName || 'Not Entered'}</p>
                                            <p><span className="font-bold text-brand-teal">Category:</span> {formData.category?.toUpperCase() || 'Not Selected'}</p>
                                            <p><span className="font-bold text-brand-teal">Platform:</span> {formData.platform || 'N/A'}</p>
                                            <p><span className="font-bold text-brand-teal">Referrals:</span> {Object.entries(formData.referrals).filter(([k, v]) => v).map(([k, v]) => k).join(', ') || 'None'}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-brand-surface p-6 bg-gray-50 flex items-center justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                        className="px-6 py-3 rounded-xl font-bold text-brand-dark disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <ChevronLeft size={18} /> Previous
                    </button>

                    <div className="flex gap-2">
                        <button
                            onClick={handleDraftSave}
                            className="px-6 py-3 rounded-xl font-bold text-brand-dark border border-brand-surface bg-white hover:bg-gray-50 transition-colors"
                        >
                            Save Draft
                        </button>
                        <button
                            onClick={currentStep === 4 ? handleSubmit : handleNext}
                            disabled={isSubmitting}
                            className="px-8 py-3 rounded-xl font-bold text-white bg-brand-dark hover:bg-brand-teal shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {isSubmitting ? 'Submitting...' : currentStep === 4 ? <>Submit Case <Save size={18} /></> : <>Next Step <ChevronRight size={18} /></>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
