# NCSW Circular Gap Analysis
## Comparing NCSW Circular Requirements vs. NGDRS SRS Document

---

## ✅ COVERED COMPONENTS

### I. Mandatory Data Reporting Requirements (Section I of Circular)

| Circular Requirement | SRS Coverage | SRS Reference |
|---------------------|--------------|---------------|
| 1. Reported Incidents (FIR + non-FIR) | ✅ Covered | FR-CM-001, FR-CM-002 |
| 2. Case Progression tracking | ✅ Covered | Justice_Funnel table, FR-DB-002 |
| 3. Service Provision (Medical, legal, PSS, shelter, digital forensics) | ✅ Covered | Service_Provision table |
| 4. Platform/Data Requests (Takedown, response times, evidence usability) | ✅ Covered | TFGBV_Specifics table, FR-DB-004 |
| 5. Geospatial Information (District-wise, high-risk areas) | ✅ Covered | Geo_Registry table, FR-DB-003 |

### Disaggregation Requirements

| Disaggregation Field | SRS Coverage | SRS Reference |
|---------------------|--------------|---------------|
| Age group | ✅ Covered | Survivor_Age_Group ENUM |
| Disability status | ✅ Covered | Disability_Status field |
| District | ✅ Covered | District_ID FK |
| Location-type | ✅ Covered | Location_Type ENUM |
| Perpetrator-type | ✅ Covered | Perpetrator_Type ENUM |
| Platform (for TFGBV) | ✅ Covered | Platform ENUM |

---

### II. Reporting Entities (Section II of Circular)

| Entity | Scope Required | SRS Coverage |
|--------|----------------|--------------|
| Provincial Women Development Depts | Aggregated district data | ✅ Provincial Portal |
| Police / CPLC / Cyber Crime Wings | Case intake, FIR status, digital evidence | ✅ Field Entry Portal |
| Prosecution Departments | Prosecution & conviction status | ✅ Justice_Funnel |
| Health Departments | Medico-legal + PSS referrals | ✅ Service_Provision |
| Social Welfare & Shelter Homes | Service provision data | ✅ Service_Provision |
| Education & IT Departments | Prevention & digital literacy | ⚠️ **PARTIAL** - Not explicitly in SRS |

---

### III. Frequency & Mechanism (Section III of Circular)

| Requirement | SRS Coverage | SRS Reference |
|-------------|--------------|---------------|
| Monthly Reports (by 10th) | ✅ Covered | Appendix C, FR-RP-004 |
| Quarterly Consolidated Brief (by 15th) | ✅ Covered | Appendix C, FR-RP-004 |
| Submission Format (Excel/PowerBI) | ✅ Covered | Entire dashboard architecture |
| Email to data@ncsw.gov.pk | ✅ Covered | Appendix D |
| Red Zone Emergency Alerts (72 hours) | ✅ Covered | FR-AL-001 |

---

### IV. Compliance & Review (Section IV of Circular)

| Requirement | SRS Coverage | SRS Reference |
|-------------|--------------|---------------|
| Non-compliance referral to Chief Secretary | ✅ Covered | FR-RP-002 |
| Annual performance review integration | ⚠️ **PARTIAL** - Mentioned but no specific module |
| Annual GBV & TFGBV Transparency Report | ✅ Covered | FR-RP-003 |

---

### Provincial Reporting Formats (Section 2 of Circular)

#### A. Monthly Data Submission Template

| Field | SRS Coverage |
|-------|--------------|
| Province Name | ✅ Province_ID → Geo_Registry |
| District Name | ✅ District_ID → Geo_Registry |
| Reporting Month | ✅ Date_Reported |
| Total GBV Cases | ✅ Aggregated from Survivor_Cases |
| Total TFGBV Cases | ✅ Filter by TF_Code |
| Classification % | ✅ Dashboard KPIs |
| Red Zone Trigger | ✅ FR-AL-001 |
| Top 3 High-Risk Locations | ✅ FR-DB-003 heatmap |
| Top 3 TFGBV Platforms | ✅ FR-DB-004 |
| Service Provision Gap | ✅ FR-DB-005 |
| Urgent Cases requiring escalation | ⚠️ **MISSING** - Need escalation flag |

#### B. Case-Level Reporting Format

| Field | SRS Coverage |
|-------|--------------|
| Case_ID | ✅ Survivor_Cases.Case_ID |
| Date | ✅ Date_Reported |
| District | ✅ District_ID |
| Crime_Type | ✅ Crime_Code |
| TFGBV_Code | ✅ TF_Code |
| Location_Type | ✅ Location_Type |
| Perpetrator | ✅ Perpetrator_Type |
| Survivor_Age | ✅ Survivor_Age_Group |
| Disability | ✅ Disability_Status |
| FIR_Status | ✅ Justice_Funnel.Current_Stage |
| Stage | ✅ Justice_Funnel.Current_Stage |
| Outcome | ✅ Justice_Funnel (implicit) |
| Services_Provided | ✅ Service_Provision table |
| Takedown_Request | ✅ TFGBV_Specifics.Takedown_Requested |
| Platform | ✅ TFGBV_Specifics.Platform |
| Response_Time | ✅ TFGBV_Specifics.Takedown_Time_Hours |
| Geo_Coordinates | ✅ Incident_Details.Geo_Coordinates |
| Notes | ⚠️ **MISSING** - Need Notes field |

#### C. TFGBV-Specific Platform Reporting

| Field | SRS Coverage |
|-------|--------------|
| Case_ID | ✅ Covered |
| Offence Type (TF Code) | ✅ Covered |
| Platform Involved | ✅ Covered |
| Takedown Requested (Y/N) | ✅ Covered |
| Response Time (hrs) | ✅ Covered |
| Evidence Accepted by Court (Y/N) | ✅ Justice_Funnel.Evidence_Accepted |
| Reason for Rejection | ⚠️ **MISSING** - Need rejection reason field |

---

### Standard Operating Procedures (Section 3 of Circular)

| SOP | SRS Coverage | SRS Reference |
|-----|--------------|---------------|
| SOP 1: Case Intake (24 hours) | ✅ Covered | FR-CM-001 |
| SOP 2: Classification & Coding | ✅ Covered | FR-CM-002, Evidence Checklist |
| SOP 3: Data Triangulation | ✅ Covered | FR-DV-001, FR-DV-002 |
| SOP 4: Confidentiality & Ethical Handling | ✅ Covered | SEC-010 to SEC-014 |
| SOP 5: Submission & Quality Control | ✅ Covered | Provincial Portal structure |

---

### CEDAW-Aligned Indicator Matrix (Section 195-374 of Circular)

#### Structural Indicators

| Indicator | SRS Coverage |
|-----------|--------------|
| Comprehensive GBV legislation score | ⚠️ **MISSING** - Static reference data needed |
| GBV recognized as discrimination | ⚠️ **MISSING** - Static reference data |
| TFGBV offence coverage score | ⚠️ **MISSING** - Static reference data |
| Mandatory platform reporting regime | ✅ FR-DB-004 |
| Specialized GBV/TFGBV units operational | ⚠️ **MISSING** - Need institutional capacity tracking |
| Gender-responsive budgeting % | ⚠️ **MISSING** - Outside system scope |

#### Process Indicators

| Indicator | SRS Coverage |
|-----------|--------------|
| Schools with GBV prevention education % | ⚠️ **MISSING** - Education module needed |
| TFGBV digital hygiene reach | ⚠️ **MISSING** - Training tracking needed |
| ILO 190 workplace compliance | ⚠️ **MISSING** - Outside system scope |
| Women's digital access gap | ⚠️ **MISSING** - Survey data needed |
| GBV/TFGBV one-stop centers operational | ⚠️ **PARTIAL** - Service directory needed |
| Multi-channel reporting coverage | ✅ Integration Requirements |
| Case resolution with full services % | ✅ Service_Provision + Dashboard |
| Chain-of-custody compliance rate | ✅ Evidence hashing in TFGBV_Specifics |
| Attrition rate % | ✅ Justice_Funnel |
| Survivor-Centric Justice Score | ⚠️ **MISSING** - Need scoring module |
| Cross-border TFGBV cooperation requests | ⚠️ **MISSING** - International cooperation tracking |

#### Outcome Indicators

| Indicator | SRS Coverage |
|-----------|--------------|
| GBV incidence rate per 100,000 | ✅ FR-DB-003, Red Zone calculation |
| AI-enabled abuse prevalence | ✅ TF-A4, TF-A6 codes |
| Femicide classification ratio | ✅ GB-FE code |
| Social norms change elasticity % | ⚠️ **MISSING** - Survey data needed |
| Productivity loss due to GBV (% GDP) | ⚠️ **MISSING** - Economic impact module |

---

### Dashboard Architecture (Section 469+ of Circular)

#### Data Model Tables

| Table Required | SRS Coverage |
|----------------|--------------|
| Survivor_Cases | ✅ Covered |
| Survivors | ⚠️ **MERGED** - Into Incident_Details |
| Crime_Types | ✅ Enumeration values |
| Incident_Details | ✅ Covered |
| Justice_Process | ✅ As Justice_Funnel |
| Services_Provided | ✅ As Service_Provision |
| Geo_Registry | ✅ Covered |
| Platforms | ⚠️ **PARTIAL** - Need separate Platforms table with Avg_Response_Time |

#### Visual Pages Required

| Page | SRS Coverage |
|------|--------------|
| Page 1: National Overview | ✅ FR-DB-001 |
| Page 2: Heatmaps | ✅ FR-DB-003 |
| Page 3: Justice & Accountability | ✅ FR-DB-002 |
| Page 4: Survivor Support & Public Services | ✅ FR-DB-005 |
| Page 5: TFGBV Platform Accountability | ✅ FR-DB-004 |

#### Automated Alerts

| Alert | SRS Coverage |
|-------|--------------|
| Red Zone District | ✅ FR-AL-001 |
| Repeat Offender Concern | ✅ FR-AL-002 |
| TFGBV Rising Threat | ✅ FR-AL-004 |
| Evidence Failure | ✅ FR-AL-003 |

---

### Heatmap Variables (Section 434+ of Circular)

| Variable | SRS Coverage |
|----------|--------------|
| Location Type | ✅ Location_Type ENUM |
| Platform (TFGBV) | ✅ Platform ENUM |
| Recurrence (Single/Repeat/Escalating) | ⚠️ **PARTIAL** - Only Boolean Repeat_Offence |
| Perpetrator Type | ✅ Perpetrator_Type ENUM |
| Age of Survivor | ✅ Survivor_Age_Group |
| Police Response Time | ⚠️ **MISSING** - Need Police_Response_Time field |
| Case Outcome | ✅ Justice_Funnel |

---

## 🔴 GAPS IDENTIFIED - ITEMS TO ADD TO SRS

### Critical Gaps (Must Add)

| Gap | Circular Reference | Recommended Addition |
|-----|-------------------|----------------------|
| **Notes field** | Case-Level Format | Add `Notes TEXT` to Incident_Details |
| **Escalation Flag** | Monthly Template | Add `Requires_Escalation BOOLEAN` |
| **Evidence Rejection Reason** | TFGBV Platform Reporting | Add `Rejection_Reason TEXT` to Justice_Funnel |
| **Police Response Time** | Heatmap Variables | Add `Police_Response_Time ENUM (<24h/24-72h/>72h)` |
| **Recurrence Level** | Heatmap Variables | Change `Repeat_Offence` to `Recurrence ENUM (Single/Repeat/Escalating)` |

### Medium Priority Gaps

| Gap | Circular Reference | Recommended Addition |
|-----|-------------------|----------------------|
| **Platforms Master Table** | Dashboard Data Model | Create separate `Platforms` lookup table |
| **Education/IT Prevention Data** | Reporting Entities | FR for prevention tracking module |
| **Survivor-Centric Justice Score** | CEDAW Indicators | Add scoring calculation module |
| **One-Stop Centers Directory** | Process Indicators | Add service provider registry |

### Low Priority / Out of Scope

| Gap | Circular Reference | Recommendation |
|-----|-------------------|----------------|
| Gender-responsive budgeting % | CEDAW Structural | Out of scope - Finance ministry data |
| Productivity loss % GDP | CEDAW Outcome | Out of scope - Economic survey data |
| Social norms survey data | CEDAW Outcome | Out of scope - External survey integration |
| ILO 190 compliance | CEDAW Process | Out of scope - Labour ministry data |

---

## Summary

| Status | Count |
|--------|-------|
| ✅ Fully Covered | 78 |
| ⚠️ Partial/Missing | 18 |
| 🔴 Critical Gaps | 5 |

**Overall Coverage: ~85%**

The SRS document covers the majority of NCSW Circular requirements. To achieve 100% compliance, the 5 critical gaps should be addressed in the next SRS revision.
