"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Scale, Shield, BookOpen, Stethoscope, User, FileText, Smartphone, MapPin,
    AlertCircle, Check, CheckCircle, Save, UploadCloud, Calendar, Users,
    Target, Megaphone, DollarSign, Clock, ChevronDown, Send, Plus, X,
    File, Image as ImageIcon, Trash2, Phone, Home, CreditCard, Lock, Globe, Share2,
    Mail, FileDown, MessageSquare
} from "lucide-react";
import { clsx } from "clsx";

// --- CONSTANTS ---
type MainTab = 'cases' | 'prevention' | 'awareness' | 'protection';

const MAIN_TABS = [
    { id: 'cases' as MainTab, label: 'Case Registration', icon: Scale, color: '#659CBF' },
    { id: 'prevention' as MainTab, label: 'Prevention Measures', icon: Shield, color: '#6EA969' },
    { id: 'awareness' as MainTab, label: 'Awareness Campaigns', icon: BookOpen, color: '#D3A255' },
    { id: 'protection' as MainTab, label: 'Protection & Safety', icon: Stethoscope, color: '#BC5F75' }
];

const PROVINCES = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'ICT', 'AJK', 'GB'];

const CRIME_TYPES = [
    { code: 'GB-PH', label: 'Physical Violence' },
    { code: 'GB-SX', label: 'Sexual Violence' },
    { code: 'GB-EC', label: 'Economic Abuse' },
    { code: 'GB-PY', label: 'Psychological Violence' },
    { code: 'GB-FM', label: 'Forced Marriage' },
    { code: 'GB-TR', label: 'Trafficking' },
    { code: 'GB-FE', label: 'Femicide' },
];

const TFGBV_CODES = [
    { code: 'TF-A1', label: 'Cyberstalking' },
    { code: 'TF-A2', label: 'Doxxing' },
    { code: 'TF-A3', label: 'Image-based abuse' },
    { code: 'TF-A4', label: 'Deepfake sexual content' },
    { code: 'TF-A5', label: 'AI voice cloning coercion' },
    { code: 'TF-A6', label: 'Online mob harassment' },
    { code: 'TF-A7', label: 'Sextortion' },
    { code: 'TF-A8', label: 'GPS/location stalking' },
];

const LOCATION_TYPES = ['Home', 'Workplace', 'Transport', 'Street', 'School/University', 'Online Platform', 'Court', 'Police Station'];
const PERPETRATOR_TYPES = ['Intimate Partner', 'Family Member', 'Acquaintance', 'Stranger', 'Employer', 'Official', 'Digital Anonymous'];
const AGE_GROUPS = ['Minor (0-17)', 'Youth (18-24)', 'Adult (25-59)', 'Senior (60+)'];
const CASE_STAGES = ['Reported', 'FIR Registered', 'Investigation', 'Charge Sheet', 'Trial', 'Convicted', 'Closed'];
const PLATFORMS = ['Facebook', 'TikTok', 'WhatsApp', 'X (Twitter)', 'Instagram', 'YouTube', 'Gaming', 'Unknown'];

const PREVENTION_TYPES = ['Education Program', 'Community Outreach', 'Legal Aid Training', 'Economic Empowerment', 'Health Initiative', 'Media Campaign', 'Workplace Training', 'Youth Program'];
const AWARENESS_CHANNELS = ['Social Media', 'TV', 'Radio', 'Community Event', 'Print Media', 'Web Portal'];
const PROTECTION_TYPES = ['Shelter Services', 'Helpline', 'Psychosocial Support', 'Medico-Legal Aid', 'Digital Forensics', 'Legal Representation'];

// Routing Channels for Form Distribution (Official API Routes)
const OFFICIAL_ROUTES = [
    { id: 'fia', name: 'FIA Cyber Crime Wing', icon: Globe, color: '#7c3aed', desc: 'Federal Investigation Agency Portal' },
    { id: 'nccia', name: 'NCCIA Database', icon: Smartphone, color: '#dc2626', desc: 'National Cyber Crime Investigation Agency' },
    { id: 'ncsw', name: 'NCSW Central Registry', icon: Users, color: '#059669', desc: 'National Commission on Status of Women' },
    { id: 'provincial_wpc', name: 'Provincial WPC', icon: Home, color: '#d97706', desc: 'Women Protection Centers Network' },
    { id: 'legal_aid', name: 'Legal Aid Authority', icon: Scale, color: '#0891b2', desc: 'Free Legal Aid Services' },
    { id: 'shelter', name: 'Shelter Network', icon: Home, color: '#be185d', desc: 'Dar-ul-Aman & Safe Houses' },
    { id: 'health', name: 'Health Department', icon: Stethoscope, color: '#16a34a', desc: 'Medico-Legal & Health Services' },
];

// Custom Routing Channels
const CUSTOM_ROUTES = [
    { id: 'email', name: 'Email Route', icon: Mail, color: '#3b82f6', desc: 'Send form summary via email' },
    { id: 'sms_alert', name: 'SMS Alert', icon: MessageSquare, color: '#10b981', desc: 'Notify officers via SMS' },
];


// --- COMPONENT ---
export default function IntakePage() {
    const [activeMainTab, setActiveMainTab] = useState<MainTab>('cases');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [submittedId, setSubmittedId] = useState('');

    // Case Form State
    const [caseForm, setCaseForm] = useState({
        // Incident Info
        date: '', province: '', district: '', locationType: '',

        // Survivor Details (Personal - District Level)
        survivorName: '',
        fatherHusbandName: '',
        cnic: '',
        contactNumber: '',
        address: '',
        survivorAge: '',
        disability: 'None',

        // Crime Details
        crimeCode: '',
        tfgbvCode: '',
        platform: '',
        perpetratorType: '',
        repeatOffence: 'No',

        // Justice & Status
        firStatus: 'Not Filed',
        stage: 'Reported',
        outcome: '',

        // Services
        servicesProvided: {
            medical: false,
            legal: false,
            shelter: false,
            psychosocial: false,
            digitalForensics: false
        },
        notes: ''
    });

    // File States
    const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
    const [applicationForm, setApplicationForm] = useState<File | null>(null);

    // Other Form States
    const [preventionForm, setPreventionForm] = useState({
        title: '', province: '', district: '', type: '', targetBeneficiaries: '',
        startDate: '', endDate: '', description: '', objectives: '', budget: '', priority: 'Normal'
    });

    const [awarenessForm, setAwarenessForm] = useState({
        title: '', province: '', district: '', channel: '', reachEstimate: '',
        startDate: '', endDate: '', description: '', mediaChannels: '', budget: '', priority: 'Normal'
    });

    const [protectionForm, setProtectionForm] = useState({
        title: '', province: '', district: '', type: '', facilityName: '',
        totalCasesHandled: '', referralsReceived: '', referralsGiven: '',
        description: '', priority: 'Normal'
    });

    // Routing Modal State
    const [showRouteModal, setShowRouteModal] = useState(false);
    const [selectedRoutes, setSelectedRoutes] = useState<Set<string>>(new Set());
    const [isRouting, setIsRouting] = useState(false);
    const [routeSuccess, setRouteSuccess] = useState(false);

    // Enhanced Routing State
    const [routeNotes, setRouteNotes] = useState('');
    const [customEmail, setCustomEmail] = useState('');
    const [activeRouteTab, setActiveRouteTab] = useState<'official' | 'custom'>('official');

    const toggleRoute = (id: string) => {
        const newRoutes = new Set(selectedRoutes);
        if (newRoutes.has(id)) {
            newRoutes.delete(id);
        } else {
            newRoutes.add(id);
        }
        setSelectedRoutes(newRoutes);
    };

    const handleRouteSubmit = async () => {
        if (selectedRoutes.size === 0 && !customEmail) return;
        setIsRouting(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsRouting(false);
        setRouteSuccess(true);
        setTimeout(() => {
            setShowRouteModal(false);
            setRouteSuccess(false);
            setSelectedRoutes(new Set());
            setRouteNotes('');
            setCustomEmail('');
        }, 2000);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 1500));
        const prefix = activeMainTab === 'cases' ? 'CASE' : activeMainTab === 'prevention' ? 'PREV' : activeMainTab === 'awareness' ? 'AWR' : 'PROT';
        setSubmittedId(`${prefix}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
        setIsSubmitting(false);
        setShowSuccess(true);
    };

    const activeColor = MAIN_TABS.find(t => t.id === activeMainTab)?.color || '#659CBF';

    // UI Helpers
    const InputField = ({ label, value, onChange, type = 'text', placeholder = '', icon: Icon, required = false, ...props }: any) => (
        <div className="space-y-1.5 flex-1 min-w-[200px]">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                {Icon && <Icon size={12} className="text-gray-400" />}
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                <input type={type} value={value} onChange={onChange} placeholder={placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#659CBF]/50 focus:border-[#659CBF] transition-all outline-none text-sm font-medium text-gray-800" {...props} />
            </div>
        </div>
    );

    const SelectField = ({ label, value, onChange, options, icon: Icon, placeholder = 'Select...', required = false }: any) => (
        <div className="space-y-1.5 flex-1 min-w-[200px]">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                {Icon && <Icon size={12} className="text-gray-400" />}
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <select value={value} onChange={onChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#659CBF]/50 focus:border-[#659CBF] transition-all outline-none text-sm font-medium text-gray-800">
                <option value="">{placeholder}</option>
                {options.map((opt: any) => typeof opt === 'string' ? <option key={opt} value={opt}>{opt}</option> : <option key={opt.code} value={opt.code}>{opt.code}: {opt.label}</option>)}
            </select>
        </div>
    );

    const TextAreaField = ({ label, value, onChange, placeholder = '', rows = 3 }: any) => (
        <div className="space-y-1.5 w-full">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
            <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#659CBF]/50 focus:border-[#659CBF] transition-all outline-none text-sm font-medium text-gray-800 resize-none" />
        </div>
    );

    const FormSection = ({ title, icon: Icon, children, description }: any) => (
        <div className="space-y-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                <div className="p-2 rounded-lg bg-gray-50 text-[#659CBF]">
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 tracking-tight">{title}</h3>
                    {description && <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{description}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {children}
            </div>
        </div>
    );

    // File Upload Handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'evidence' | 'application') => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            if (type === 'evidence') {
                setEvidenceFiles(prev => [...prev, ...files]);
            } else {
                setApplicationForm(files[0]);
            }
        }
    };

    const removeFile = (index: number, type: 'evidence' | 'application') => {
        if (type === 'evidence') {
            setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
        } else {
            setApplicationForm(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-24 px-4 sm:px-6">
            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] shadow-2xl max-w-lg w-full overflow-hidden">
                            <div className="p-10 flex flex-col items-center text-center" style={{ backgroundColor: `${activeColor}15` }}>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg text-white" style={{ backgroundColor: activeColor }}><Check size={40} /></motion.div>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Submission Successful!</h3>
                                <p className="text-base mt-2 font-medium" style={{ color: activeColor }}>The record has been securely saved to the District Registry.</p>
                            </div>
                            <div className="p-10 space-y-8">
                                <div className="text-center p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">System Generated Reference ID</p>
                                    <div className="text-3xl font-mono font-black text-gray-900 tracking-tighter select-all">{submittedId}</div>
                                </div>
                                <button onClick={() => { setShowSuccess(false); window.location.reload(); }} className="w-full py-4 text-sm font-black text-white rounded-2xl transition-all shadow-xl hover:scale-[1.02] active:scale-95" style={{ backgroundColor: activeColor }}>Submit Another Entry</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Case Intake Office</h1>
                    <p className="text-sm text-gray-500 font-medium">District Portal - Official Case Registration & Management</p>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                        <Lock size={16} />
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-wider text-blue-800">
                        Secure District Line<br />
                        <span className="text-blue-500 opacity-60">End-to-End Encrypted</span>
                    </div>
                </div>
            </div>

            {/* Main Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {MAIN_TABS.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveMainTab(tab.id)}
                        className={clsx(
                            "group flex items-center gap-3 p-4 rounded-[22px] text-sm font-bold transition-all duration-300 border-2",
                            activeMainTab === tab.id
                                ? "bg-white shadow-xl border-white scale-105 z-10"
                                : "bg-gray-100/50 border-transparent text-gray-500 hover:bg-white/80 hover:border-gray-200"
                        )}
                        style={{ color: activeMainTab === tab.id ? tab.color : undefined }}>
                        <div className={clsx(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                            activeMainTab === tab.id ? "bg-white" : "bg-gray-200/50 group-hover:bg-white"
                        )} style={{ backgroundColor: activeMainTab === tab.id ? `${tab.color}15` : undefined }}>
                            <tab.icon size={20} strokeWidth={activeMainTab === tab.id ? 2.5 : 2} />
                        </div>
                        <span className="tracking-tight">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Form Container */}
            <div className="bg-gray-50/50 rounded-[32px] p-2 border border-gray-200/50">
                <div className="bg-white rounded-[30px] shadow-2xl overflow-hidden border border-white">
                    <div className="p-8 border-b" style={{ backgroundColor: `${activeColor}08` }}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: activeColor, color: 'white' }}>
                                    {activeMainTab === 'cases' && <Scale size={28} />}
                                    {activeMainTab === 'prevention' && <Shield size={28} />}
                                    {activeMainTab === 'awareness' && <BookOpen size={28} />}
                                    {activeMainTab === 'protection' && <Stethoscope size={28} />}
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tight" style={{ color: activeColor }}>{MAIN_TABS.find(t => t.id === activeMainTab)?.label}</h2>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-0.5">District Entry Protocol v4.2</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Route Form Button - Enhanced */}
                                <button
                                    onClick={() => setShowRouteModal(true)}
                                    className="group relative px-5 py-3 rounded-2xl font-bold text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2 overflow-hidden"
                                    style={{ background: `linear-gradient(135deg, ${activeColor} 0%, ${activeColor}dd 100%)` }}
                                >
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <Share2 size={16} className="relative z-10" />
                                    <span className="relative z-10 text-xs">Route Form</span>
                                    <div className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">→</div>
                                </button>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-xl backdrop-blur-sm">
                                    <button className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-gray-800 flex items-center gap-2 transition-colors rounded-lg hover:bg-white">
                                        <Save size={14} /> Drafts (2)
                                    </button>
                                    <button className="px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 rounded-lg transition-all">
                                        <Trash2 size={14} /> Reset
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-12 space-y-12 bg-gradient-to-b from-white to-gray-50/30">
                        <AnimatePresence mode="wait">
                            {/* CASE REGISTRATION FORM */}
                            {activeMainTab === 'cases' && (
                                <motion.div key="cases" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">

                                    {/* SECTION: INCIDENT LOCATION */}
                                    <FormSection title="Incident Context" icon={MapPin} description="WHERE & WHEN">
                                        <InputField label="Date of Incident" type="date" value={caseForm.date} onChange={(e: any) => setCaseForm(p => ({ ...p, date: e.target.value }))} icon={Calendar} required />
                                        <SelectField label="Province" value={caseForm.province} onChange={(e: any) => setCaseForm(p => ({ ...p, province: e.target.value }))} options={PROVINCES} icon={Globe} required />
                                        <InputField label="District" value={caseForm.district} onChange={(e: any) => setCaseForm(p => ({ ...p, district: e.target.value }))} placeholder="e.g., Peshawar" icon={Target} required />
                                        <SelectField label="Location Type" value={caseForm.locationType} onChange={(e: any) => setCaseForm(p => ({ ...p, locationType: e.target.value }))} options={LOCATION_TYPES} icon={Home} required />
                                    </FormSection>

                                    {/* SECTION: SURVIVOR PII (District Exclusive) */}
                                    <FormSection title="Survivor Personal Information" icon={User} description="SECURE DISTRICT RECORDS">
                                        <InputField label="Full Name" value={caseForm.survivorName} onChange={(e: any) => setCaseForm(p => ({ ...p, survivorName: e.target.value }))} placeholder="As per CNIC" icon={User} required />
                                        <InputField label="Father / Husband Name" value={caseForm.fatherHusbandName} onChange={(e: any) => setCaseForm(p => ({ ...p, fatherHusbandName: e.target.value }))} placeholder="Relation details" icon={Users} />
                                        <InputField label="CNIC Number" value={caseForm.cnic} onChange={(e: any) => setCaseForm(p => ({ ...p, cnic: e.target.value }))} placeholder="42101-XXXXXXX-X" icon={CreditCard} required />
                                        <InputField label="Contact Number" type="tel" value={caseForm.contactNumber} onChange={(e: any) => setCaseForm(p => ({ ...p, contactNumber: e.target.value }))} placeholder="03XX-XXXXXXX" icon={Phone} required />
                                        <SelectField label="Age Group" value={caseForm.survivorAge} onChange={(e: any) => setCaseForm(p => ({ ...p, survivorAge: e.target.value }))} options={AGE_GROUPS} icon={Clock} required />
                                        <SelectField label="Disability Status" value={caseForm.disability} onChange={(e: any) => setCaseForm(p => ({ ...p, disability: e.target.value }))} options={['None', 'Physical', 'Visual/Hearing', 'Intellectual']} icon={Shield} />
                                        <div className="md:col-span-2 lg:col-span-3">
                                            <TextAreaField label="Residential Address" value={caseForm.address} onChange={(e: any) => setCaseForm(p => ({ ...p, address: e.target.value }))} placeholder="Complete house address, street, and area..." />
                                        </div>
                                    </FormSection>

                                    {/* SECTION: CRIME DETAILS */}
                                    <FormSection title="Incident Classification" icon={FileText} description="CODES & CATEGORIES">
                                        <SelectField label="Crime Type (Primary)" value={caseForm.crimeCode} onChange={(e: any) => setCaseForm(p => ({ ...p, crimeCode: e.target.value }))} options={CRIME_TYPES} icon={Scale} required />
                                        <SelectField label="TFGBV Code (Specific)" value={caseForm.tfgbvCode} onChange={(e: any) => setCaseForm(p => ({ ...p, tfgbvCode: e.target.value }))} options={TFGBV_CODES} icon={Smartphone} />
                                        <SelectField label="Digital Platform" value={caseForm.platform} onChange={(e: any) => setCaseForm(p => ({ ...p, platform: e.target.value }))} options={PLATFORMS} icon={Globe} />
                                        <SelectField label="Perpetrator Type" value={caseForm.perpetratorType} onChange={(e: any) => setCaseForm(p => ({ ...p, perpetratorType: e.target.value }))} options={PERPETRATOR_TYPES} icon={Users} required />
                                        <SelectField label="Repeat Offence" value={caseForm.repeatOffence} onChange={(e: any) => setCaseForm(p => ({ ...p, repeatOffence: e.target.value }))} options={['No', 'Yes - Previous Cases Exist', 'Yes - Escalating Pattern']} icon={AlertCircle} />
                                    </FormSection>

                                    {/* SECTION: CASE MGT & JUSTICE */}
                                    <FormSection title="Justice System Progress" icon={Shield} description="LEGAL STATUS">
                                        <SelectField label="FIR Status" value={caseForm.firStatus} onChange={(e: any) => setCaseForm(p => ({ ...p, firStatus: e.target.value }))} options={['Not Filed', 'FIR Registered', 'Pending Investigation', 'Closed No Evidence']} icon={FileText} />
                                        <SelectField label="Current Case Stage" value={caseForm.stage} onChange={(e: any) => setCaseForm(p => ({ ...p, stage: e.target.value }))} options={CASE_STAGES} icon={Clock} />
                                        <InputField label="Outcome Details" value={caseForm.outcome} onChange={(e: any) => setCaseForm(p => ({ ...p, outcome: e.target.value }))} placeholder="e.g. Case Transferred" icon={Plus} />
                                    </FormSection>

                                    {/* SECTION: EVIDENCE UPLOAD */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                            <div className="p-2 rounded-lg bg-gray-50 text-[#659CBF]">
                                                <UploadCloud size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 tracking-tight">Documentation & Evidence</h3>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">FILES & ATTACHMENTS</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {/* Evidence Upload */}
                                            <div className="space-y-4">
                                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Digital & Physical Evidence (Photos, PDFs, Docs)</label>
                                                <div className="relative group">
                                                    <input type="file" multiple onChange={(e) => handleFileChange(e, 'evidence')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                    <div className="p-8 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50 group-hover:bg-blue-50 group-hover:border-[#659CBF] transition-all flex flex-col items-center justify-center text-center gap-3">
                                                        <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-[#659CBF] shadow-sm transition-colors">
                                                            <UploadCloud size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-700">Click or Drag to Upload Evidence</p>
                                                            <p className="text-xs text-gray-400 mt-1">Maximum 10 files. Up to 50MB each.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                {evidenceFiles.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {evidenceFiles.map((file, i) => (
                                                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600">
                                                                <ImageIcon size={14} className="text-blue-500" />
                                                                <span className="max-w-[120px] truncate">{file.name}</span>
                                                                <button onClick={() => removeFile(i, 'evidence')} className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Application Form */}
                                            <div className="space-y-4">
                                                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Complaint / Application Form (Scanned Copy)</label>
                                                <div className="relative group">
                                                    <input type="file" onChange={(e) => handleFileChange(e, 'application')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                                    <div className={clsx(
                                                        "p-8 border-2 border-dashed rounded-3xl transition-all flex flex-col items-center justify-center text-center gap-3",
                                                        applicationForm
                                                            ? "bg-green-50 border-green-200"
                                                            : "bg-gray-50 border-gray-200 group-hover:bg-blue-50 group-hover:border-[#659CBF]"
                                                    )}>
                                                        <div className={clsx(
                                                            "w-12 h-12 rounded-2xl border flex items-center justify-center shadow-sm transition-colors",
                                                            applicationForm ? "bg-white border-green-100 text-green-500" : "bg-white border-gray-100 text-gray-400 group-hover:text-[#659CBF]"
                                                        )}>
                                                            <FileText size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-gray-700">{applicationForm ? applicationForm.name : 'Upload Application Form'}</p>
                                                            <p className="text-xs text-gray-400 mt-1">{applicationForm ? (applicationForm.size / 1024).toFixed(1) + ' KB' : 'Single file - Scanned PDF or JPG'}</p>
                                                        </div>
                                                        {applicationForm && (
                                                            <button onClick={(e) => { e.stopPropagation(); removeFile(0, 'application') }} className="mt-2 text-[10px] font-bold text-red-500 hover:underline">Remove File</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SECTION: SERVICES & NOTES */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                                            <div className="p-2 rounded-lg bg-gray-50 text-[#659CBF]">
                                                <Plus size={20} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-800 tracking-tight">Services & Final Notes</h3>
                                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">OFFICIAL REMARKS</p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Immediate Services Provided</label>
                                            <div className="flex flex-wrap gap-4">
                                                {Object.keys(caseForm.servicesProvided).map(key => (
                                                    <button key={key} type="button" onClick={() => setCaseForm(p => ({ ...p, servicesProvided: { ...p.servicesProvided, [key]: !p.servicesProvided[key as keyof typeof p.servicesProvided] } }))}
                                                        className={clsx(
                                                            "flex items-center gap-3 px-5 py-3 rounded-2xl text-xs font-bold border-2 transition-all",
                                                            caseForm.servicesProvided[key as keyof typeof caseForm.servicesProvided]
                                                                ? "bg-[#659CBF] text-white border-[#659CBF] shadow-lg shadow-[#659CBF]/20"
                                                                : "bg-white text-gray-500 border-gray-100 hover:border-gray-200"
                                                        )}>
                                                        <div className={clsx("w-2 h-2 rounded-full", caseForm.servicesProvided[key as keyof typeof caseForm.servicesProvided] ? "bg-white" : "bg-gray-200")} />
                                                        {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <TextAreaField label="Investigating Officer's Preliminary Notes" value={caseForm.notes} onChange={(e: any) => setCaseForm(p => ({ ...p, notes: e.target.value }))} placeholder="Enter relevant observations, safety concerns, or priority flags..." rows={5} />
                                    </div>
                                </motion.div>
                            )}

                            {/* PREVENTION FORM */}
                            {activeMainTab === 'prevention' && (
                                <motion.div key="prevention" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <FormSection title="Program Overview" icon={Shield}>
                                        <div className="md:col-span-2">
                                            <InputField label="Program Title" value={preventionForm.title} onChange={(e: any) => setPreventionForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Women's Digital Safety Workshop" required />
                                        </div>
                                        <SelectField label="Program Type" value={preventionForm.type} onChange={(e: any) => setPreventionForm(p => ({ ...p, type: e.target.value }))} options={PREVENTION_TYPES} required />
                                        <SelectField label="Province" value={preventionForm.province} onChange={(e: any) => setPreventionForm(p => ({ ...p, province: e.target.value }))} options={PROVINCES} required />
                                        <InputField label="District" value={preventionForm.district} onChange={(e: any) => setPreventionForm(p => ({ ...p, district: e.target.value }))} placeholder="e.g., Lahore" required />
                                        <InputField label="Target Beneficiaries" type="number" value={preventionForm.targetBeneficiaries} onChange={(e: any) => setPreventionForm(p => ({ ...p, targetBeneficiaries: e.target.value }))} placeholder="e.g., 500" />
                                    </FormSection>

                                    <FormSection title="Schedule & Budget" icon={Calendar}>
                                        <InputField label="Start Date" type="date" value={preventionForm.startDate} onChange={(e: any) => setPreventionForm(p => ({ ...p, startDate: e.target.value }))} />
                                        <InputField label="End Date" type="date" value={preventionForm.endDate} onChange={(e: any) => setPreventionForm(p => ({ ...p, endDate: e.target.value }))} />
                                        <InputField label="Budget (PKR)" type="number" value={preventionForm.budget} onChange={(e: any) => setPreventionForm(p => ({ ...p, budget: e.target.value }))} placeholder="e.g., 500000" />
                                        <SelectField label="Priority" value={preventionForm.priority} onChange={(e: any) => setPreventionForm(p => ({ ...p, priority: e.target.value }))} options={['Normal', 'High', 'Urgent']} />
                                    </FormSection>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <TextAreaField label="Description" value={preventionForm.description} onChange={(e: any) => setPreventionForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the program's goals and activities..." rows={4} />
                                        <TextAreaField label="Objectives (one per line)" value={preventionForm.objectives} onChange={(e: any) => setPreventionForm(p => ({ ...p, objectives: e.target.value }))} placeholder="- Objective 1\n- Objective 2" rows={4} />
                                    </div>
                                </motion.div>
                            )}

                            {/* AWARENESS FORM */}
                            {activeMainTab === 'awareness' && (
                                <motion.div key="awareness" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <FormSection title="Campaign Intelligence" icon={Megaphone}>
                                        <div className="md:col-span-2">
                                            <InputField label="Campaign Title" value={awarenessForm.title} onChange={(e: any) => setAwarenessForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., #SafeOnline National Campaign" required />
                                        </div>
                                        <SelectField label="Primary Channel" value={awarenessForm.channel} onChange={(e: any) => setAwarenessForm(p => ({ ...p, channel: e.target.value }))} options={AWARENESS_CHANNELS} required />
                                        <SelectField label="Province" value={awarenessForm.province} onChange={(e: any) => setAwarenessForm(p => ({ ...p, province: e.target.value }))} options={PROVINCES} required />
                                        <InputField label="District" value={awarenessForm.district} onChange={(e: any) => setAwarenessForm(p => ({ ...p, district: e.target.value }))} placeholder="e.g., Karachi" required />
                                        <InputField label="Estimated Reach" type="number" value={awarenessForm.reachEstimate} onChange={(e: any) => setAwarenessForm(p => ({ ...p, reachEstimate: e.target.value }))} placeholder="e.g., 100000" />
                                    </FormSection>

                                    <FormSection title="Logistics" icon={Clock}>
                                        <InputField label="Start Date" type="date" value={awarenessForm.startDate} onChange={(e: any) => setAwarenessForm(p => ({ ...p, startDate: e.target.value }))} />
                                        <InputField label="End Date" type="date" value={awarenessForm.endDate} onChange={(e: any) => setAwarenessForm(p => ({ ...p, endDate: e.target.value }))} />
                                        <InputField label="Budget (PKR)" type="number" value={awarenessForm.budget} onChange={(e: any) => setAwarenessForm(p => ({ ...p, budget: e.target.value }))} placeholder="e.g., 1000000" />
                                        <InputField label="All Media Channels" value={awarenessForm.mediaChannels} onChange={(e: any) => setAwarenessForm(p => ({ ...p, mediaChannels: e.target.value }))} placeholder="e.g., Facebook, TV, Radio" />
                                    </FormSection>

                                    <TextAreaField label="Campaign Strategy & Messaging" value={awarenessForm.description} onChange={(e: any) => setAwarenessForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the campaign's messaging and strategy..." rows={4} />
                                </motion.div>
                            )}

                            {/* PROTECTION FORM */}
                            {activeMainTab === 'protection' && (
                                <motion.div key="protection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                                    <FormSection title="Facility Reporting" icon={Home}>
                                        <div className="md:col-span-2">
                                            <InputField label="Report Title" value={protectionForm.title} onChange={(e: any) => setProtectionForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g., Monthly Shelter Intake Report - Q4" required />
                                        </div>
                                        <SelectField label="Service Type" value={protectionForm.type} onChange={(e: any) => setProtectionForm(p => ({ ...p, type: e.target.value }))} options={PROTECTION_TYPES} required />
                                        <InputField label="Facility Name" value={protectionForm.facilityName} onChange={(e: any) => setProtectionForm(p => ({ ...p, facilityName: e.target.value }))} placeholder="e.g., Dar-ul-Aman Peshawar" />
                                        <SelectField label="Province" value={protectionForm.province} onChange={(e: any) => setProtectionForm(p => ({ ...p, province: e.target.value }))} options={PROVINCES} required />
                                        <InputField label="District" value={protectionForm.district} onChange={(e: any) => setProtectionForm(p => ({ ...p, district: e.target.value }))} placeholder="e.g., Peshawar" required />
                                    </FormSection>

                                    <FormSection title="Operational Metrics" icon={Scale}>
                                        <InputField label="Total Cases Handled" type="number" value={protectionForm.totalCasesHandled} onChange={(e: any) => setProtectionForm(p => ({ ...p, totalCasesHandled: e.target.value }))} placeholder="e.g., 150" />
                                        <InputField label="Referrals Received" type="number" value={protectionForm.referralsReceived} onChange={(e: any) => setProtectionForm(p => ({ ...p, referralsReceived: e.target.value }))} placeholder="e.g., 50" />
                                        <InputField label="Referrals Given" type="number" value={protectionForm.referralsGiven} onChange={(e: any) => setProtectionForm(p => ({ ...p, referralsGiven: e.target.value }))} placeholder="e.g., 30" />
                                        <SelectField label="Priority Level" value={protectionForm.priority} onChange={(e: any) => setProtectionForm(p => ({ ...p, priority: e.target.value }))} options={['Normal', 'High', 'Urgent']} />
                                    </FormSection>

                                    <TextAreaField label="Observational Notes" value={protectionForm.description} onChange={(e: any) => setProtectionForm(p => ({ ...p, description: e.target.value }))} placeholder="Any relevant notes about the reporting period..." rows={4} />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Route Form Modal */}
                        <AnimatePresence>
                            {showRouteModal && (
                                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !isRouting && setShowRouteModal(false)}>
                                    <motion.div
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.9, opacity: 0 }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="bg-white rounded-[32px] shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col"
                                    >
                                        {routeSuccess ? (
                                            <div className="p-10 flex flex-col items-center text-center bg-green-50">
                                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 12 }} className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg text-white bg-green-500">
                                                    <Check size={40} />
                                                </motion.div>
                                                <h3 className="text-2xl font-black text-gray-900">Routed Successfully!</h3>
                                                <p className="text-sm text-green-600 mt-2">Form data sent to {selectedRoutes.size + (customEmail ? 1 : 0)} destination(s)</p>
                                            </div>
                                        ) : (
                                            <>
                                                {/* Modal Header */}
                                                <div className="p-6 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: `${activeColor}08` }}>
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg" style={{ backgroundColor: activeColor, color: 'white' }}>
                                                            <Share2 size={24} />
                                                        </div>
                                                        <div>
                                                            <h2 className="text-lg font-black text-gray-900">Route Form to Departments</h2>
                                                            <p className="text-xs text-gray-500">Select official channels or custom routes</p>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setShowRouteModal(false)} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
                                                        <X size={20} />
                                                    </button>
                                                </div>

                                                {/* Tab Switcher */}
                                                <div className="px-6 pt-4">
                                                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                                                        <button
                                                            onClick={() => setActiveRouteTab('official')}
                                                            className={clsx("flex-1 px-4 py-2.5 rounded-lg text-xs font-bold transition-all",
                                                                activeRouteTab === 'official' ? 'bg-white shadow text-[#055b65]' : 'text-gray-500 hover:text-gray-700'
                                                            )}
                                                        >
                                                            <Shield size={14} className="inline mr-2" />
                                                            Official Department Routes
                                                        </button>
                                                        <button
                                                            onClick={() => setActiveRouteTab('custom')}
                                                            className={clsx("flex-1 px-4 py-2.5 rounded-lg text-xs font-bold transition-all",
                                                                activeRouteTab === 'custom' ? 'bg-white shadow text-[#055b65]' : 'text-gray-500 hover:text-gray-700'
                                                            )}
                                                        >
                                                            <Mail size={14} className="inline mr-2" />
                                                            Custom Routes
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Route Channels */}
                                                <div className="p-6 max-h-[300px] overflow-y-auto flex-1">
                                                    {activeRouteTab === 'official' ? (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {OFFICIAL_ROUTES.map((channel) => {
                                                                const isSelected = selectedRoutes.has(channel.id);
                                                                const IconComp = channel.icon;
                                                                return (
                                                                    <button
                                                                        key={channel.id}
                                                                        onClick={() => toggleRoute(channel.id)}
                                                                        className={clsx(
                                                                            "p-4 rounded-2xl border-2 text-left transition-all duration-200 group",
                                                                            isSelected ? "shadow-lg scale-[1.02]" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                                                        )}
                                                                        style={isSelected ? { borderColor: channel.color, backgroundColor: `${channel.color}10` } : {}}
                                                                    >
                                                                        <div className="flex items-start gap-3">
                                                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: channel.color }}>
                                                                                <IconComp size={18} />
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <div className="flex items-center justify-between">
                                                                                    <h4 className="font-bold text-sm text-gray-800">{channel.name}</h4>
                                                                                    <div className={clsx("w-5 h-5 rounded-full border-2 flex items-center justify-center", isSelected ? "" : "border-gray-300")}
                                                                                        style={isSelected ? { borderColor: channel.color, backgroundColor: channel.color } : {}}>
                                                                                        {isSelected && <Check size={12} className="text-white" />}
                                                                                    </div>
                                                                                </div>
                                                                                <p className="text-[10px] text-gray-500 mt-1">{channel.desc}</p>
                                                                            </div>
                                                                        </div>
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            {/* Custom Route Cards */}
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                                {CUSTOM_ROUTES.map((channel) => {
                                                                    const isSelected = selectedRoutes.has(channel.id);
                                                                    const IconComp = channel.icon;
                                                                    return (
                                                                        <button
                                                                            key={channel.id}
                                                                            onClick={() => toggleRoute(channel.id)}
                                                                            className={clsx(
                                                                                "p-4 rounded-2xl border-2 text-center transition-all duration-200",
                                                                                isSelected ? "shadow-lg scale-[1.02]" : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                                                            )}
                                                                            style={isSelected ? { borderColor: channel.color, backgroundColor: `${channel.color}10` } : {}}
                                                                        >
                                                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-3" style={{ backgroundColor: channel.color }}>
                                                                                <IconComp size={22} />
                                                                            </div>
                                                                            <h4 className="font-bold text-sm text-gray-800">{channel.name}</h4>
                                                                            <p className="text-[10px] text-gray-500 mt-1">{channel.desc}</p>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>

                                                            {/* Email Input (if email route selected) */}
                                                            {selectedRoutes.has('email') && (
                                                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                                                    <label className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 block">Email Recipients</label>
                                                                    <input
                                                                        type="email"
                                                                        value={customEmail}
                                                                        onChange={(e) => setCustomEmail(e.target.value)}
                                                                        placeholder="Enter email addresses (comma separated)"
                                                                        className="w-full px-4 py-3 rounded-xl border border-blue-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Route Notes */}
                                                <div className="px-6 pb-4">
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Route Notes (Optional)</label>
                                                    <textarea
                                                        value={routeNotes}
                                                        onChange={(e) => setRouteNotes(e.target.value)}
                                                        placeholder="Add any special instructions or notes for recipient departments..."
                                                        rows={2}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#055b65] focus:bg-white resize-none"
                                                    />
                                                </div>

                                                {/* Modal Footer */}
                                                <div className="p-6 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
                                                    <div className="text-xs text-gray-500">
                                                        <span className="font-bold text-gray-700">{selectedRoutes.size}</span> channel(s) selected
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button onClick={() => setShowRouteModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 border border-gray-200 bg-white hover:bg-gray-50 transition-all">
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={handleRouteSubmit}
                                                            disabled={(selectedRoutes.size === 0 && !customEmail) || isRouting}
                                                            className="px-8 py-3 rounded-xl font-black text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                                            style={{ backgroundColor: activeColor }}
                                                        >
                                                            {isRouting ? 'Routing...' : <><Send size={16} /> Route Form</>}
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </motion.div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="p-8 md:p-12 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3 text-gray-400">
                            <Lock size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Authorized District Entry Only</span>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <button className="flex-1 sm:flex-none px-8 py-4 rounded-2xl font-bold text-gray-500 border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                                <Save size={18} /> Save Progress
                            </button>
                            <button onClick={handleSubmit} disabled={isSubmitting}
                                className="flex-1 sm:flex-none px-12 py-4 rounded-2xl font-black text-white shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                style={{ backgroundColor: activeColor, boxShadow: `0 20px 40px -12px ${activeColor}50` }}>
                                {isSubmitting ? 'Processing...' : <><Send size={18} /> File Case</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

