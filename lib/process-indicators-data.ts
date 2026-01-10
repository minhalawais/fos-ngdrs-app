
export const generateProcessIndicatorsData = () => {
    return [
        {
            category: "A. Prevention",
            items: [
                { title: "Public Transport Harassment Prevention", indicator: "Lahore Transport Company (LTC)", value: "11 Apr 2024", target: "Lahore", color: "bg-blue-500", sub: "Metro Stations", valueLabel: "Date", targetLabel: "Location" },
                { title: "Cyberbullying Detection System", indicator: "Punjab School Education Dept", value: "15 Jan - 15 Jun", target: "Peshawar", color: "bg-indigo-500", sub: "Early Warning", valueLabel: "Duration", targetLabel: "Location" },
                { title: "DV Prevention Dialogue", indicator: "Social Welfare Dept, Sindh", value: "26 Mar 2024", target: "Karachi", color: "bg-cyan-500", sub: "Community Based", valueLabel: "Date", targetLabel: "Location" },
                { title: "Youth Digital Literacy Session", indicator: "Ministry of Federal Education", value: "23 Apr 2024", target: "Lahore", color: "bg-teal-500", sub: "Online Risk", valueLabel: "Date", targetLabel: "Location" },
                { title: "Harassment-Free Deterrence Booth", indicator: "District Admin Karachi", value: "10 May 2024", target: "Karachi", color: "bg-rose-500", sub: "Dolmen Mall", valueLabel: "Date", targetLabel: "Location" }
            ]
        },
        {
            category: "B. Protection & Support",
            items: [
                { title: "Govt Shelter Homes (Dar-ul-Amans)", indicator: "Social Welfare Depts", value: "48", target: "Nationwide", color: "bg-emerald-500", sub: "Support: Shelter, food, counselling, rehab", valueLabel: "Shelters", targetLabel: "Scope" },
                { title: "Medico-Legal Units (GBV)", indicator: "Provincial Health Depts", value: "128", target: "Nationwide", color: "bg-green-500", sub: "Support: Medical exams, certificates, evidence", valueLabel: "Hospitals", targetLabel: "Scope" },
                { title: "Police Women Desks", indicator: "Provincial Police Depts", value: "700+", target: "Nationwide", color: "bg-lime-500", sub: "Support: Reporting, FIRs, referrals", valueLabel: "Desks", targetLabel: "Scope" },
                { title: "Psychosocial Support", indicator: "Health & Social Welfare", value: "District Lvl", target: "All Provs", color: "bg-amber-500", sub: "Support: Counselling, crisis intervention", valueLabel: "Available", targetLabel: "Scope" },
                { title: "Protection Helplines (1093/1043)", indicator: "Home & Social Welfare", value: "Active", target: "All + ICT", color: "bg-teal-500", sub: "Support: Emergency response, referrals", valueLabel: "Status", targetLabel: "Coverage" }
            ]
        },
        {
            category: "C. Justice & Accountability",
            items: [
                { title: "Attrition Rate", indicator: "Case Loss (Report->Convict)", value: "85%", target: "<20%", color: "bg-red-500", inverse: true },
                { title: "Survivor Justice", indicator: "Survivor-Centric Score", value: "1.5/4", target: "4/4", color: "bg-orange-500", sub: "Trauma Informed" },
                { title: "Cross-Border", indicator: "Cooperation Requests", value: "12 Executed", target: "100+", color: "bg-rose-500", sub: "MLAT Status" },
            ]
        }
    ];
};
