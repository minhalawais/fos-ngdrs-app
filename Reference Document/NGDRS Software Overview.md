### From Fragmented Reporting to a National Justice Engine
```
The National Gender Data Reporting System (NGDRS) Specification
```
```
Before: The Current State After: The NGDRS Ecosystem
```
Data SilosA
*
I
\ | I
\ /
i i
T?
Police Health
,->I
I
I
I
I
I
»*`\ I
\ J
A A
é**\ I
¢'* f\
»"* *ZI
\ /'|
*s I \\
\
\ Q s
\s \
\
Manual Entry
|\
I *\
x
I \
/ I,
4~ --I ' ~./r Under-reporting
\
\ I\
s/*\
\
\\
"\
\\
\\ >
\ > '` <f
`\.
I
```
I I -r * \\_(
```
I \
I
I /
```
I ( I
```
I II \I
I
\
\
a
I
I\`¢II\
*
/`*
\ \
U ,'
v ..
"kw"
I
\ ` *
~+ Q
ACourts Shelters
<3% Conviction Rate
\ - 0-> g
```
L@€)I I
```
police
Evidence-Based
Policy
E
J? o_>
```
(Q),
```
```
Health)
```
e -YE
\
```
g ( 1;
```
./,.-
o--> E
CEDAW
Compliance
NGDRS EngineCourts
be
°->O
Survivor-Centric
JusticeShelters
Key Objective: "To transition Pakistan from fragmented, manual reporting to a Standardised Digital Ecosystem that connects Police,
Health, Prosecution, and Social Welfare departments, ensuring real-time visibility into case progression and service delivery gaps."
an NotebookLM
The NGDRS Architecture: A Blueprint for Evidence-Based Policy
I I
I .
I I
Q,<@lb,
g
l>
```
The Data Pipeline (The Workflow) The Knowledge Base (The Rules Engine)
```
A mandated, four-step process that governs how data is
ingested, validated, aggregated, and reviewed, enforcing
```
the NCSW's Standard Operating Procedures (SOPs).
```
The system's "brain." A pre-loaded repository of legal
statutes, operational protocols, and international
standards that guides users and automates compliance.
```
NGDRS:
```
. T
/'
Justice Engine
IL
```
The User Portals (The Interfaces) The Executive Dashboard (The Command Center)
```
Three distinct, role-based interfaces for field-level data
entry, provincial-level compliance management, and
national-level administration and oversight.
The strategic output. A multi-view dashboard transforming raw
data into actionable intelligence for policymakers, tracking
everything from justice attrition to platform accountability.
I • I
l*\x
KPI
to/ull
I
an ilotebookLM
The Data Pipeline: Enforcing Standard Operating Procedures in Real-Time
I I
1
=®
Step 1: Intake & Digital
```
Entry (SOP 1 &2) --n
```
```
Action: Survivor encounters a
```
```
reporting entity (Police, Shelter).
```
®24 hours
System Task: Within 24 hours,
an officer uses the Field Entry
Portal to:
. Generate a unique,
provincial-level Case_ID.
• Classify the crime using the
mandatory GBV/TFGBV
```
Codebook (e.g., GB-PH, TF-A4)
```
• Complete a Digital Evidence
Checklist if the crime is
technology-facilitated.
J \/
> I
```
Step2: Triangulation &
```
```
Validation (SOP3)
```
```
Action: District Focal Point verifies
```
data before it leaves the district.
®72 hours
System Task: The 'Triangulation
Workbench' automatically
automatically cross-checks
Police, Health, and Prosecution
data.
```
. Flags discrepancies (e.g.,
```
Police report rape, Health has
```
no medical exam).
```
- Returns flagged data to the
origin office for correction
within 72 hours.
or
> I
Step 3: Submission &
```
Aggregation (SOP5)
```
```
Action: Provincial Focal Points
```
submit certified data to NCSW.
._.
E
Aggregates district data into a
Provincial Master Sheet.
• Frequency: Monthly reports
byt e 10th, Quarterly briefs
by the 15th.
```
),
```
Step 4: National Review
```
> & Anonymization (SOP 4)
```
```
Action: NCSW reviews national
```
trends for policy and international
reporting.
_
System Task:
. Automatically strips all
Personally Identifiable
```
Information (PII) before data
```
enters the national dashboard.
Triggers Red Zone Alerts if a
district exceeds thresholds
```
(>50 cases/100k or a 25%
```
```
increase)
```
I
I
an ilotebookLM
The Knowledge Base: Embedding Law and Procedure into the System's DNA
I I
I
```
The NGDRS is not a passive database; it is an active participant in the justice process, designed to guide users and prevent systemic errors.
```
Module Name Content System Action
Legal Logic
Auto-tags PECA Section 21 for image abuse. <brl>
® Blocks "MediationlReconciliation" workflow for
```
non-compoundable crimes like Rape (Section 376).
```
Typology &
Taxonomy
```
GBVIMS6 Core Types (Rape, Physical Assault,
```
```
etc.).
```
```
NCSW-mandated TFGBV codes (TF-A1 to TF-A9).
```
Enforces standardized dropdowns for consistent, interoperable
data, enabling Un-level reporting.
Operational
Protocols
```
Geo-tagged directory of services (Shelters,
```
```
Legal Aid).
```
Medical & Forensic rules.
9 Auto-populates nearest Dar-ul-Aman based on survivor's
location. <br/>
A Triggers a critical alert if a medical exam for rape is not
conducted within 72 hours.
Blocks entry of the illegal "Two-Finger Test."
Data Privacy
& Security
```
Chinese Wall Security Policy (CWSP).
```
K~Anonymity rules.
```
B Technically separates the Original Data Warehouse (ODW) from
```
```
the De-identified Data Warehouse (DDW).
```
Prevents pinpointing survivors on heatmaps by aggregating data
if case counts in an area are <5.
International
Reporting
CEDAW & SDG Indicator Mapping.
```
® Automatically tags each case with relevant indicators (e.g.,
```
```
SDG 5.2.1), enabling one-click generation ofthe "Annual CEDAW
```
Compliance Report.
PPC & PECA sections mapped to crime types.
Compoundable vs. Non-Compoundable rules.
I
an IlotebookLM
l
-l +
I
I
I
I
I
I
I
I
I
l
I
- L
+
+
*
The System Interfaces: Role-Based Portals for Every Level of the Justice Chain
Field Entry Portal
```
(District Level)
```
Ei
```
I)
```
- l
```
Users: Police Station Officers, Medical Officers,
```
Shelter Managers.
-¢. _ |§- -¢.IIII
Provincial Compliance
```
Q Portal (Manager Level)
```
```
Users: Provincial Women Development
```
```
Departments (WDD).
```
I I
I I+ -+'
NCSW National
Admin Portal
```
Users: NCSW Data Unit, Ministry of Human
```
Rights.
I I
I I
Primary Feature: "Triangulation Workbench" Primary Feature: "Audit Log"Primary Feature: "Smart Intake Form"
4* J1- r #. . .
Case_ID
Crime_Type
GBVIMStaxonomy
TFGBV_CodeI
Service_Provided
go Police Record
```
Crime:
```
Rape
too
Health Record
49
&\
4*0
L /f
```
)
```
MedicoLegal Exam:
Missing
I
_
Push Back for CorrectionI
'FI- *T J' *T
. . .
| IProvir\ce: Sindh] [Status:Suhmit!ed OnTime Q] Date: 09/11/2025] |
```
(up)
```
r
x...|
Platform Reporter for NCCIA,
capturing Platform,
Takedown_Request status, and
Response_Time.
El
"Submission Certifier" - A digital
signature tool to certify data validity
before transmission to NCSW. ra'Report Generator' - One-click
generation of the 'Annual GBV &
TFGBV Data Transparency Report' for
CEDAW and GSP+ monitoring,
I I I I. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .I I I I I I
'+-
#
J'
+
I
an No\ebookLM
The Command Center: NCSW Executive Dashboard
Transforming granular data into strategic, national-level intelligence for the Prime Minister, Chief Ministers, and NCSW Chairperson.
```
Page 1: National Overview (The "Pulse")
```
To provide an immediate "health check" of the nation regarding women's safety and administrative compliance.
I
Total GBV/TFGBV
```
Cases (YTD)
```
14,821 .
•
•I
'Red Zone' Districts
12 A
```
*Count of districts where (Cases/Pop"100k) > 50
```
50 OR MoM Increase > 25%'
Conviction Rate
2.9%
*The ultimate outcome indicator.
,=»
I Reporting
Compliance
92%
*% of districts submitting data by the I
10th of the month.
TFGBV Ratio
```
TechFacilitated (22%)
```
Total
Cases
<>
```
Physical GBV (78%)
```
Cases by Crime Type
4500
3200
1800
1200
he
e@,Q
RapePhysical
Assault
Cyberstalking
```
(TFA1)
```
Deepfakes
```
(TFA4)
```
Monthly Trend
5000
4000
3000
.`..2000
1000
0
Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
Current Year . Previous Year
an NotebookLM
Architectural Blueprint
```
The Command Center: Geospatial Heatmaps (The 'Risk Map')
```
```
Purpose: To visualize the geographic concentration of violence and identify emerging hotspots for immediate intervention.
```
Filters
o--o-
o-
Date Range:
Violence Category:=
=
Crime Type:
Q
Perpetrator Type:O
I`®
Survivor Age Group:O o
0%
Case density
Iv
\ x
al12 X
< 20 case 100k
20 50 cases 100k
> 50 cases /100k
2
_
.
ii
fir'
,of
J
. J
go
```
}v,.;*»,*
```
Tsf'
yf*
at
»¢
l
L
.1 ° II
E4,
I
an NotebookLM
Architectural Blueprint
```
The Command Center: Justice & Accountability (The 'FunneI')
```
```
Purpose: To pinpoint exactly where cases are lost in the justice system, from initial reporting to final conviction.
```
The Attrition Funnel Conviction Rate
Avg. Time to Justice
421 Days
Reported
```
(100%)Attrition:
```
289
Attrition
27%
2.8%
Measures the efficiency of the
courts.
Attrition
14% Attrition
12%
The ultimate measure of the justice
system's effectiveness.
TFGBV Evidence
Acceptance Rate
>
Reasons for Case Closure
Rejected
```
(35%)
```
Accepted
```
(65%)
```
FIR Registered
```
(72%)
```
Investigation
```
Complete (45%)
```
Charge Sheet
```
Submitted (31%)
```
Trial
```
(19%)
```
Conviction
```
(2.8%)
```
Highlights needs for forensic training
or judicial sensitization.
an NotebookLM
Architectural Blueprint
```
The Command Center: Survivor Support Services (The "Care Matrix")
```
To monitor the implementation of a "survivor-centered" approach by tracking the provision of essential services and identifying resource gaps
```
Service Provision vs. Requirement Shelter Occupancy (Lahore District)
```
<>
Medical Aid
90%
80%
```
Insight: While 80% of survivors
```
receive medical aid, only 30%
receive essential legal aid.
112
Digital Forensics 80%
I
I
I
I
I, .
I \
I
I
2S%I
l
\
\
\
\
\
\
\
50%*----_____.:
\
\
\ 30%
w
I
I
I
I
I
I
I
60%
QI?
85% Legal Aid
I
I
go
I
as
Shelter Referrals Shelter Capacity
Informs budget allocation for new Dar-ul-Amans.
Survivor Demographics
```
Minor (30%
```
I
F' High Vulnerability
```
Triangulation Check (Current Month)
```
85%
Q Shelter
Services Required - - Services Provided
80%
. O
Psychosocial Support V#
Service Gapl
I I
314
```
Data Mismatches (Police vs. Health)
```
Serves as an audit tool for data integrity.
an NotebookLM
The Command Center: TFGBV & Platform Accountability
```
Purpose: To analyze the morphology of digital crimes and provide the state with concrete data to hold social media platforms accountable.
```
Platform Compliance Matrix
Decision Value:
Provides political
leverage for
PTA/MOIT to fine
or ban non-
compliant
platforms.
OO Meta 985 82% 11 hrs ....
X 750 31% 46 hrs ¢ooo
```
WhatsAppQ 1,512 15% 72+ hrs v(in
```
d' TikTok 1,240 65% 18 hrs O...
```
Crime Morphology (TFGBV Cases YTD) Violence Vectors (Platform vs. Crime Type)
```
TF-A1 Cyberstalking I
TFA8 Sextortion
TF-A4 Deepfakes I
TF-A2 WhatsApp I
\Informs legislators about emerging
threats that require new laws.
TikTok
Meta
Telegram I
WhatsApp i
0 200 400 600
StalkingDeepfakes Sextortion
```
Insight: Highlights high-risk platform-crime correlations.
```
an NotebookLM
Architectural Blueprint
Driving International Compliance: From Local Data to Global Standards
The NGDRS is architected to align with the CEDAW-Aligned Indicator Matrix, automating the evidence needed for international reporting.
Indicator Type CEDAW Requirement How the NGDRS Delivers
Structural Indicators
```
(Existence of frameworks)
```
```
Is there comprehensive GBV legislation? ;`\
```
Are there specialized TFGBV units
operational?
The Knowledge Base maps all existing
```
laws (PPC, PECA).
```
The system logs all cases handled by
specialized units like the NCCIA. @
Process Indicators
```
(State action & due diligence)
```
What is the attrition rate?
What is the chain-of-custody compliance for
digital evidence?
trackse
The Justice Funnel Dashboard ? provides a
real-time attrition rate.
The TFGBV Evidence Rejection Rate
digital evidence acceptance in court.
Outcome Indicators
```
(Impact on prevalence & safety)
```
What is the GBV incidence rate per 100,000?
What is the prevalence of different TFGBV
types?
so calculates caseThe Geospatial Heat rap
density per look.
The TFGBV Dashboard lnnlltracks prevalence by
```
code (Deepfakes, Doxxing, etc.).
```
```
ii)
```
Automated Reporting
The 'Report Generator' in the NCSW Admin Portal can produce the 'Annual CEDAW Compliance Report' with a single
click, summarizing all mapped indicators.
an NotebookLM
Ensuring Data Integrity: Adopting the Global GBVIMS Standard
To ensure data is consistent and comparable across all provinces and at an international level, the NGDRS embeds
```
the UN-backed Gender-Based Violence Information Management System (GBVIMS) classification standard.
```
The GBVIMS Standard
```
What it is: An inter-agency (UNFPA,
```
```
UNHCR, IRC) system that provides a
```
harmonized approach to collecting,
storing, and analyzing GBV data safely
and ethically.
Core Classifications Embedded in NGDRS
Rape 4. Forced Marriage
Why it Matters: Before GBVIMS, there
was no common terminology,
hampering the ability to understand
national trends. Adopting this
standard ensures every reporting
entity in Pakistan speaks the same
language.
2. Sexual Assault 5.
j
```
(Gt
```
Denial of Resources
Psychological/Emotional
3. Physical Assault 6. q Abuse
Jvl OF lA'
These form the basis of the mandatory dropdowns in the Field Entry
Portal, ensuring every case is classified correctly from the moment
of intake.
an NotebookLM
The NGDRS: A National Asset for Justice,
Accountability, and Protection
By transforming data into intelligence, the NGDRS empowers the state to move from reactive
measures to proactive, evidence-based governance.
EF@
1.
1. Active Monitoring &
Accountability
Red Zone Alerts for immediate
intervention in high-risk
districts.
» Automated 'Chief Secretary
Letters' for non compliant
reporting entities.
» Platform Accountability
Leaderboard to enforce
compliance from tech
companies.
2. r
2. A More Effective
Justice System
. The Justice Funnel pinpoints
and helps resolve systemic
bottlenecks.
» The Legal Knowledge Base
prevents procedural errors that
lead to acquittals.
Improved Digital Evidence
handling increases the
likelihood of convictions in
TFGBV cases.
U3.
3. Survivor-Centric
Support
• The 'No Wrong Door' Policy
•
instantly connects survivors to
geo-located support services.
The Service Gap Matrix ensures
survivors receive the full
spectrum of care they need.
• Strict Anonymization Protocols
protect survivor identity and
confidentiality at the national
level.
The NGDRS is the engine that will power a safer,
more equitable digital and physical Pakistan.
an NotebookLM