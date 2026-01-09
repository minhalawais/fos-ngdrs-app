
export const generateProcessIndicatorsData = () => {
    return [
        {
            category: "A. Prevention",
            items: [
                { title: "Education", indicator: "Curriculum Alignment", value: "Level 1 (Pilot)", target: "Level 3", color: "bg-blue-500", wef: "Education" },
                { title: "Media Literacy", indicator: "Digital Hygiene Reach", value: "12.5%", target: "50%", color: "bg-indigo-500", wef: "Tech Access" },
                { title: "Workforce", indicator: "ILO 190 Compliance", value: "35%", target: "80%", color: "bg-cyan-500", wef: "Economic Participation" },
                { title: "Digital Literacy", indicator: "Gender Digital Gap", value: "-5.2%", target: "-2%", color: "bg-teal-500", wef: "Eco Participation" },
            ]
        },
        {
            category: "B. Protection & Support",
            items: [
                { title: "Services", indicator: "One-Stop Centers", value: "4/District", target: "1/District", color: "bg-emerald-500", sub: "Qual Score: 8/10" },
                { title: "Helplines", indicator: "Multi-channel Coverage", value: "Partial", target: "Full 24/7", color: "bg-green-500", sub: "WhatsApp Active" },
                { title: "Psychosocial", indicator: "Full Service Resolution", value: "42%", target: "100%", color: "bg-lime-500", sub: "Legal+Med+PSS" },
                { title: "TFGBV Evidence", indicator: "Chain-of-Custody", value: "68%", target: "95%", color: "bg-amber-500", sub: "Court Acceptance" },
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
