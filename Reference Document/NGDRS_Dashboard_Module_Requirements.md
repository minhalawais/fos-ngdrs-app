# NGDRS Dashboard & Analytics Module
# Requirements Specification Document

**Version:** 1.0  
**Date:** January 7, 2026  
**Module:** Dashboard & Analytics  
**Parent Document:** NGDRS Software Requirements Specification v1.1  
**Classification:** Government - Confidential

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-01-07 | NCSW Technical Team | Initial Dashboard Module Requirements |
| 1.1 | 2026-01-07 | NCSW Technical Team | Added 3 missing NCSW Circular components |

---

## Table of Contents

1. [Module Overview](#1-module-overview)
2. [Dashboard Pages Specification](#2-dashboard-pages-specification)
3. [Data Model Requirements](#3-data-model-requirements)
4. [KPI Definitions](#4-kpi-definitions)
5. [Visualization Requirements](#5-visualization-requirements)
6. [Filter & Drill-Down Requirements](#6-filter--drill-down-requirements)
7. [Automated Alerts & Triggers](#7-automated-alerts--triggers)
8. [Export & Reporting](#8-export--reporting)
9. [Technical Implementation](#9-technical-implementation)
10. [Acceptance Criteria](#10-acceptance-criteria)

---

## 1. Module Overview

### 1.1 Purpose
The Dashboard & Analytics Module serves as the **command center** for the NGDRS, transforming granular case data into strategic, national-level intelligence for policymakers including the Prime Minister, Chief Ministers, and NCSW Chairperson.

### 1.2 Reference Documents
- NCSW Circular for Mandatory Data Reporting (Section: Dashboard Architecture)
- NGDRS Software Requirements Specification v1.1 (Section 3.5, 6.1)

### 1.3 Key Objectives
1. Provide immediate "health check" of women's safety nationwide
2. Visualize geographic concentration of violence (hotspots)
3. Track justice system attrition from report to conviction
4. Monitor survivor support service provision
5. Hold social media platforms accountable for TFGBV response

---

## 2. Dashboard Pages Specification

### 2.1 Page 1: National Overview (Command Center)

**Purpose:** Immediate national health check on women's safety and administrative compliance

#### 2.1.1 KPI Cards (Top Row)

| KPI ID | Metric | Visual Type | Data Source | Update Frequency |
|--------|--------|-------------|-------------|------------------|
| KPI-01 | Total GBV Cases (YTD) | Card with trend arrow | `Survivor_Cases` COUNT | Real-time |
| KPI-02 | Total TFGBV Cases (YTD) | Card with trend arrow | `Incident_Details` WHERE TF_Code NOT NULL | Real-time |
| KPI-03 | Red Zone Districts | Card (Red highlight) | Districts WHERE (Cases/Pop*100k) > 50 OR MoM > 25% | Daily |
| KPI-04 | Conviction Rate | Gauge Chart | `Justice_Funnel` (Convicted / Total) | Weekly |
| KPI-05 | Reporting Compliance | Progress Bar | Districts submitting by 10th / Total Districts | Monthly |
| KPI-06 | % Survivors with Full Services | Card | `Service_Provision` (all services = True) | Real-time |
| KPI-09 | Case Attrition Rate | Card with trend | (Reported - Convicted) / Reported * 100 | Weekly |

#### 2.1.2 Charts

| Chart ID | Title | Visual Type | Fields | Purpose |
|----------|-------|-------------|--------|---------|
| CH-01 | TFGBV Ratio | Donut Chart | TFGBV % vs Physical GBV % | Show digital violence proportion |
| CH-02 | Cases by Crime Type | Horizontal Bar | Crime_Code, COUNT | Identify prevalent violence types |
| CH-03 | Top Platforms (TFGBV) | TreeMap | Platform, COUNT | Identify high-risk platforms |
| CH-04 | Monthly Trend | Line Chart | Month, Cases (Current Year vs Previous) | Trend analysis |
| CH-05 | Service Provision Gap | Radar Chart | Medical/Legal/Shelter/PSS % | Identify service gaps |

#### 2.1.3 Required Fields from NCSW Circular
```
Provincial Data Template Fields:
- Province Name
- District Name  
- Reporting Month (MM-YYYY)
- Total GBV Cases (Numeric)
- Total TFGBV Cases (Numeric)
- Classification % (Physical/Sexual/Economic/Psychological/TFGBV)
- Red Zone Trigger (Yes/No)
- Top 3 High-Risk Locations
- Top 3 TFGBV Platforms
- Service Provision Gap (% missing required services)
- Urgent Cases requiring escalation (Numeric)
```

---

### 2.2 Page 2: Geospatial Heatmaps (Risk Map)

**Purpose:** Visualize geographic concentration of violence and identify emerging hotspots for intervention

#### 2.2.1 Map Specifications

| Spec ID | Requirement | Value |
|---------|-------------|-------|
| MAP-01 | Map Type | Interactive Chloropleth |
| MAP-02 | Base Layer | Pakistan Administrative Districts |
| MAP-03 | Data Granularity | District Level (170+ districts) |
| MAP-04 | Color Coding | Green (<20/100k), Amber (20-50/100k), Red (>50/100k) |
| MAP-05 | K-Anonymity | Suppress pinpoints if cases < 5 in area |

#### 2.2.2 Map Filters Panel

| Filter ID | Filter Name | Options | Type |
|-----------|-------------|---------|------|
| FLT-01 | Date Range | Custom date picker | Date Range |
| FLT-02 | Violence Category | GB-PH, GB-SX, GB-EC, GB-PY, GB-FM, GB-TR, GB-FE | Multi-select |
| FLT-03 | TFGBV Type | TF-A1 to TF-A9 | Multi-select |
| FLT-04 | Crime Type | All crime codes | Multi-select |
| FLT-05 | Perpetrator Type | Partner, Family, Acquaintance, Stranger, Employer, Official, Digital Anonymous | Multi-select |
| FLT-06 | Survivor Age Group | Minor (0-17), Youth (18-24), Adult (25+), Senior | Multi-select |
| FLT-07 | Platform | TikTok, WhatsApp, FB, X, Instagram, YouTube, Gaming, Other | Multi-select |
| FLT-08 | Recurrence | Single, Repeat, Escalating | Multi-select |
| FLT-09 | Location Type | Home, Street, School, University, Workplace, Transport, Shelter, Police Station, Court, Online | Multi-select |

#### 2.2.3 Drill-Down Behavior

| Action | Result |
|--------|--------|
| Click on Province | Zoom to Province, show District breakdown |
| Click on District | Open District Detail Panel |
| Hover on District | Tooltip: District Name, Case Count, Rate/100k, Risk Level |

#### 2.2.4 District Detail Panel

| Field | Source |
|-------|--------|
| District Name | `Geo_Registry.District_Name` |
| Province | `Geo_Registry.Province_Name` |
| Total Cases (Selected Period) | Aggregated COUNT |
| Rate per 100,000 | Cases / `Geo_Registry.Population_Female` * 100,000 |
| Risk Index | `Geo_Registry.Risk_Index` |
| Top 3 Crime Types | Aggregated by Crime_Code |
| Top 3 Locations | Aggregated by Location_Type |
| Focal Person Contact | External lookup |
| Red Zone Status | Calculated |
| Last Submission Date | Audit log |

---

### 2.3 Page 3: Justice & Accountability (The Funnel)

**Purpose:** Pinpoint exactly where cases are lost in the justice system

#### 2.3.1 Justice Funnel Visualization

| Spec ID | Requirement | Value |
|---------|-------------|-------|
| FNL-01 | Chart Type | Sankey Diagram |
| FNL-02 | Stages | Reported → FIR → Investigation → Charge Sheet → Trial → Conviction |
| FNL-03 | Flow Width | Proportional to case volume |
| FNL-04 | Dropout Lines | Show attrition at each stage |
| FNL-05 | Colors | Green (progressing), Red (dropped), Amber (pending) |

#### 2.3.2 Funnel Stages Data

| Stage | Query Logic | Attrition Calculation |
|-------|-------------|----------------------|
| Reported | COUNT(*) FROM Survivor_Cases | Base (100%) |
| FIR Registered | WHERE Current_Stage IN ('FIR', 'Investigation', 'Charge_Sheet', 'Trial', 'Convicted') | (Reported - FIR) / Reported |
| Investigation Complete | WHERE Current_Stage IN ('Investigation', 'Charge_Sheet', 'Trial', 'Convicted') | (FIR - Investigation) / FIR |
| Charge Sheet Submitted | WHERE Current_Stage IN ('Charge_Sheet', 'Trial', 'Convicted') | (Investigation - ChargeSheet) / Investigation |
| Trial | WHERE Current_Stage IN ('Trial', 'Convicted') | (ChargeSheet - Trial) / ChargeSheet |
| Convicted | WHERE Current_Stage = 'Convicted' | (Trial - Convicted) / Trial |

#### 2.3.3 Justice KPIs

| KPI ID | Metric | Visual | Formula |
|--------|--------|--------|---------|
| JUS-01 | Conviction Rate | Gauge (0-100%) | Convicted / Reported * 100 |
| JUS-02 | Avg Time to Justice | Card (Days) | AVG(Case_Duration_Days) WHERE Convicted |
| JUS-03 | TFGBV Evidence Acceptance Rate | Donut | Evidence_Accepted = True / Total TFGBV |
| JUS-04 | Top 3 Attrition Reasons | Horizontal Bar | Attrition_Reason COUNT |

#### 2.3.4 Case Closure Analysis

| Chart | Type | Fields |
|-------|------|--------|
| Reasons for Closure | TreeMap | Attrition_Reason, COUNT |
| Duration by Stage | Box Plot | Current_Stage, Case_Duration_Days |
| Evidence Rejection Analysis | Bar Chart | Evidence_Rejection_Reason, COUNT |
| Case Duration vs Conviction | Scatter Plot | Case_Duration_Days (X), Conviction Outcome (Y) |

---

### 2.4 Page 4: Survivor Support Services (Care Matrix)

**Purpose:** Monitor survivor-centered service provision and identify resource gaps

#### 2.4.1 Service Provision Matrix

| Service | Field | Target % | Chart Type |
|---------|-------|----------|------------|
| Medical Aid | `Service_Provision.Medical_Aid` | 100% | Progress Ring |
| Psychosocial Support | `Service_Provision.Psychosocial_Support` | 80% | Progress Ring |
| Legal Aid | `Service_Provision.Legal_Aid` | 70% | Progress Ring |
| Shelter Provided | `Service_Provision.Shelter_Provided` | As needed | Progress Ring |
| Digital Forensics | `Service_Provision.Digital_Forensics` | 100% (TFGBV) | Progress Ring |
| Economic Rehabilitation | `Service_Provision.Economic_Rehab` | 50% | Progress Ring |

#### 2.4.2 Service Gap Radar Chart

```
Axes:
- Medical (0-100%)
- Psychosocial (0-100%)
- Legal Aid (0-100%)
- Shelter (0-100%)
- Digital Forensics (0-100%)
- Economic Rehab (0-100%)

Overlay: Target vs Actual
```

#### 2.4.3 Shelter Analytics

| Metric | Visual | Source |
|--------|--------|--------|
| Shelter Occupancy by District | Bar Chart | External shelter data |
| Shelters per 100,000 Women | Card | External + Geo_Registry |
| Referral Success Rate | Gauge | Cases with Shelter_Provided = True |

#### 2.4.4 Data Quality Metrics

| Metric | Visual | Formula |
|--------|--------|---------|
| Data Triangulation Score | Gauge (0-100%) | Cases passing triangulation / Total |
| Data Mismatches (Police vs Health) | Card | Discrepancy count from validation |
| Cases with Complete Data | Progress Bar | Cases with all required fields / Total |

#### 2.4.5 Demographic Breakdown

| Chart | Type | Dimension |
|-------|------|-----------|
| By Age Group | Stacked Bar | Minor / Youth / Adult / Senior |
| By Disability Status | Pie | Disabled / Non-Disabled |
| High Vulnerability Flag | Card with Alert | Minor + Disability = True |

---

### 2.5 Page 5: TFGBV & Platform Accountability

**Purpose:** Analyze digital crime trends and hold social media platforms accountable

#### 2.5.1 Platform Compliance Matrix

| Column | Source | Purpose |
|--------|--------|---------|
| Platform Name | `Platforms.Platform_Name` | Identifier |
| Total Complaints | `Platforms.Total_Complaints_YTD` | Volume |
| Takedown Success Rate (%) | `Platforms.Takedown_Success_Rate` | Compliance metric |
| Avg Response Time (hrs) | `Platforms.Avg_Response_Time_Hrs` | Speed metric |
| Compliance Score | `Platforms.Compliance_Score` | Overall rating |
| Trend | Calculated MoM | Direction indicator |

#### 2.5.2 Platform Leaderboard

| Visual | Sorting | Conditional Formatting |
|--------|---------|------------------------|
| Matrix Table | By Compliance Score DESC | Red (<50%), Amber (50-80%), Green (>80%) |

#### 2.5.3 Crime Morphology Analysis

| Chart | Type | Fields | Purpose |
|-------|------|--------|---------|
| TFGBV by Code | Horizontal Bar | TF_Code, COUNT | Identify prevalent digital crimes |
| Crime-Platform Correlation | Stacked Bar | Platform, TF_Code, COUNT | High-risk platform-crime pairs |
| Monthly TFGBV Trend | Line Chart | Month, TF_Code, COUNT | Trend by crime type |

#### 2.5.4 Platform Detail Panel (On Click)

| Field | Source |
|-------|--------|
| Platform Name | `Platforms.Platform_Name` |
| Total Complaints (YTD) | `Platforms.Total_Complaints_YTD` |
| Takedown Requests | `TFGBV_Specifics` WHERE Takedown_Requested = True |
| Successful Takedowns | `TFGBV_Specifics` WHERE Takedown_Time_Hours IS NOT NULL |
| Success Rate | Calculated |
| Average Response Time | AVG(Takedown_Time_Hours) |
| Evidence Court Acceptance | AVG(Evidence_Accepted) |
| Top Crime Types | Aggregated by TF_Code |

#### 2.5.5 TFGBV Type Definitions (From NCSW Circular)

| Code | Type | Description |
|------|------|-------------|
| TF-A1 | Cyberstalking | Persistent digital monitoring |
| TF-A2 | Doxxing | Leak of personal information |
| TF-A3 | Threats/Extortion | Digital threats or extortion |
| TF-A4 | Deepfake Sexual Content | AI-generated sexual content |
| TF-A5 | Non-consensual Image Sharing | Intimate images shared without consent |
| TF-A6 | AI Voice Cloning Coercion | Voice synthesis for coercion |
| TF-A7 | Online Harassment/Mobbing | Coordinated online attacks |
| TF-A8 | Sextortion/Blackmail | Sexual extortion |
| TF-A9 | GPS Stalking | Location-based targeting |

---

## 3. Data Model Requirements

### 3.1 Required Tables

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `Survivor_Cases` | Core case registry | Case_ID, Date_Reported, Province_ID, District_ID |
| `Incident_Details` | Case details | Crime_Code, TF_Code, Location_Type, Perpetrator_Type, Recurrence, Police_Response_Time, Notes, Requires_Escalation |
| `TFGBV_Specifics` | Digital crime details | Platform, Takedown_Requested, Takedown_Time_Hours, Evidence_Hash |
| `Justice_Funnel` | Case progression | Current_Stage, Stage_Date, Attrition_Reason, Evidence_Accepted, Evidence_Rejection_Reason |
| `Service_Provision` | Survivor services | Medical_Aid, Psychosocial_Support, Legal_Aid, Shelter_Provided, Digital_Forensics, Economic_Rehab |
| `Geo_Registry` | Geographic reference | Province_ID, District_ID, Population_Female, GPS_Center, Risk_Index |
| `Platforms` | Social media tracking | Platform_Name, Avg_Response_Time_Hrs, Takedown_Success_Rate, Compliance_Score |

### 3.2 Aggregation Views

```sql
-- View: vw_District_Summary
CREATE VIEW vw_District_Summary AS
SELECT 
    gr.District_ID,
    gr.District_Name,
    gr.Province_Name,
    gr.Population_Female,
    COUNT(sc.Case_ID) AS Total_Cases,
    COUNT(sc.Case_ID) * 100000.0 / gr.Population_Female AS Rate_Per_100k,
    COUNT(CASE WHEN id.TF_Code IS NOT NULL THEN 1 END) AS TFGBV_Cases,
    CASE 
        WHEN COUNT(sc.Case_ID) * 100000.0 / gr.Population_Female > 50 THEN 'RED'
        WHEN COUNT(sc.Case_ID) * 100000.0 / gr.Population_Female > 20 THEN 'AMBER'
        ELSE 'GREEN'
    END AS Risk_Level
FROM Geo_Registry gr
LEFT JOIN Survivor_Cases sc ON gr.District_ID = sc.District_ID
LEFT JOIN Incident_Details id ON sc.Case_ID = id.Case_ID
GROUP BY gr.District_ID, gr.District_Name, gr.Province_Name, gr.Population_Female;

-- View: vw_Justice_Funnel_Stats
CREATE VIEW vw_Justice_Funnel_Stats AS
SELECT
    COUNT(*) AS Total_Reported,
    COUNT(CASE WHEN Current_Stage != 'Filed' THEN 1 END) AS FIR_Registered,
    COUNT(CASE WHEN Current_Stage IN ('Investigation','Charge_Sheet','Trial','Convicted') THEN 1 END) AS Investigation_Complete,
    COUNT(CASE WHEN Current_Stage IN ('Charge_Sheet','Trial','Convicted') THEN 1 END) AS Charge_Sheet,
    COUNT(CASE WHEN Current_Stage IN ('Trial','Convicted') THEN 1 END) AS Trial,
    COUNT(CASE WHEN Current_Stage = 'Convicted' THEN 1 END) AS Convicted,
    AVG(Case_Duration_Days) AS Avg_Duration
FROM Justice_Funnel;

-- View: vw_Platform_Stats
CREATE VIEW vw_Platform_Stats AS
SELECT 
    ts.Platform,
    COUNT(*) AS Total_Complaints,
    COUNT(CASE WHEN ts.Takedown_Requested = TRUE THEN 1 END) AS Takedown_Requests,
    AVG(ts.Takedown_Time_Hours) AS Avg_Response_Time,
    COUNT(CASE WHEN ts.Takedown_Time_Hours IS NOT NULL THEN 1 END) * 100.0 / 
        NULLIF(COUNT(CASE WHEN ts.Takedown_Requested = TRUE THEN 1 END), 0) AS Takedown_Success_Rate
FROM TFGBV_Specifics ts
GROUP BY ts.Platform;
```

### 3.3 Data Refresh Requirements

| Data Type | Refresh Frequency | Method |
|-----------|-------------------|--------|
| Case Data | Real-time | Event-driven |
| Aggregations | Every 15 minutes | Scheduled job |
| Risk Calculations | Daily (00:00) | Batch job |
| Platform Stats | Hourly | Scheduled job |
| Heatmap Tiles | Every 6 hours | Pre-computed |

---

## 4. KPI Definitions

### 4.1 National Overview KPIs

| KPI ID | Name | Formula | Unit | Target |
|--------|------|---------|------|--------|
| KPI-01 | Total GBV Cases YTD | COUNT(Survivor_Cases) WHERE YEAR = Current | Number | - |
| KPI-02 | Total TFGBV Cases YTD | COUNT(*) WHERE TF_Code IS NOT NULL | Number | - |
| KPI-03 | Red Zone Districts | COUNT(Districts) WHERE Rate > 50 OR MoM > 25% | Number | 0 |
| KPI-04 | Conviction Rate | (Convicted / Reported) * 100 | Percentage | >10% |
| KPI-05 | Reporting Compliance | (Submitted by 10th / Total Districts) * 100 | Percentage | 100% |
| KPI-06 | Full Service Provision | (All Services True / Total Cases) * 100 | Percentage | >80% |
| KPI-07 | TFGBV Ratio | (TFGBV / Total Cases) * 100 | Percentage | - |
| KPI-08 | Avg Case Duration | AVG(Case_Duration_Days) | Days | <180 |

### 4.2 Red Zone Calculation (From NCSW Circular)

```
RED ZONE TRIGGERS:
1. Density: (Cases / Population_Female) * 100,000 > 50
   OR
2. Velocity: Month-over-Month increase > 25%

ALERT ACTIONS:
- Auto-tag district as RED ZONE
- Send SMS to Chief Secretary
- Send Email to NCSW Chairperson
- Flag within 72 hours of trigger detection
```

### 4.3 Platform Compliance Score

```
COMPLIANCE SCORE (0-100):
- Takedown Success Rate (40%): (Successful / Requested) * 40
- Response Time Score (40%): 
  - <6 hours: 40 points
  - 6-24 hours: 30 points
  - 24-48 hours: 20 points
  - 48-72 hours: 10 points
  - >72 hours: 0 points
- Evidence Quality (20%): (Evidence_Accepted / Total) * 20
```

---

## 5. Visualization Requirements

### 5.1 Chart Specifications

| Chart Type | Library | Use Case |
|------------|---------|----------|
| Chloropleth Map | Mapbox GL / Leaflet | Geospatial heatmaps |
| Sankey Diagram | D3.js / ECharts | Justice funnel |
| Donut/Pie Chart | Chart.js / Recharts | Ratio displays |
| Bar Chart | Chart.js / Recharts | Category comparisons |
| Line Chart | Chart.js / Recharts | Trend analysis |
| Gauge Chart | Custom SVG | Progress indicators |
| Radar Chart | Chart.js | Multi-axis comparisons |
| TreeMap | D3.js | Hierarchical data |
| Matrix Table | Custom / AG Grid | Platform leaderboard |

### 5.2 Color Palette

| Context | Color | Hex Code |
|---------|-------|----------|
| Success / Green Zone | Green | #22C55E |
| Warning / Amber Zone | Amber | #F59E0B |
| Danger / Red Zone | Red | #EF4444 |
| TFGBV Cases | Purple | #8B5CF6 |
| Physical GBV | Blue | #3B82F6 |
| Neutral | Gray | #6B7280 |
| Background | Off-white | #F9FAFB |
| Text | Dark Gray | #1F2937 |

### 5.3 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|------------|--------|
| Desktop | >1280px | Full dashboard grid |
| Tablet | 768-1280px | Collapsible side panels |
| Mobile | <768px | Single column, stacked cards |

---

## 6. Filter & Drill-Down Requirements

### 6.1 Global Filters (Apply to All Pages)

| Filter | Type | Default |
|--------|------|---------|
| Date Range | Date Picker | Current Month |
| Province | Multi-select | All |
| District | Multi-select | All |

### 6.2 Page-Specific Filters

| Page | Additional Filters |
|------|-------------------|
| National Overview | Crime Type, TFGBV Code |
| Heatmaps | Violence Category, Perpetrator, Age Group, Recurrence, Location Type, Platform |
| Justice Funnel | Stage Status, Attrition Reason |
| Survivor Support | Service Type, Disability Status |
| Platform Accountability | Platform, TF Code |

### 6.3 Drill-Down Hierarchy

```
National → Province → District → Case List (ODW only)

At each level:
- Click to drill down
- Breadcrumb navigation to drill up
- Context-aware tooltips
```

---

## 7. Automated Alerts & Triggers

### 7.1 Alert Definitions (From NCSW Circular)

| Alert ID | Trigger Condition | Action | Recipients |
|----------|-------------------|--------|------------|
| ALT-01 | Red Zone: Rate > 50/100k OR MoM > 25% | SMS + Email | Chief Secretary, NCSW Chairperson |
| ALT-02 | Repeat Offender: Survivor with 3+ incidents | Dashboard Flag | District Focal Point |
| ALT-03 | TFGBV Rising: Platform MoM > 10% | Dashboard Alert | NCSW Data Unit |
| ALT-04 | Evidence Failure: District rejection > 30% | Report Flag | Prosecution Dept |
| ALT-05 | Submission Overdue: No data by 12th | Email Warning | Provincial Focal Point |
| ALT-06 | Escalation Required: Requires_Escalation = True | Priority Queue | District Supervisor |

### 7.2 Alert Visualization

| Component | Display |
|-----------|---------|
| Badge Counter | Red badge on navbar showing active alerts |
| Alert Panel | Slide-out panel with alert list |
| Toast Notifications | Real-time popup for new critical alerts |
| Alert History | Searchable log of past alerts |

---

## 8. Export & Reporting

### 8.1 Export Formats

| Format | Use Case | Pages |
|--------|----------|-------|
| PDF | Executive reports, printable summaries | All |
| CSV/Excel | Data analysis, custom reporting | Tables only |
| PNG/SVG | Presentations, documents | Charts only |
| PowerBI Share | Embedded dashboards | All |

### 8.2 Scheduled Reports (From NCSW Circular)

| Report | Frequency | Recipients | Format |
|--------|-----------|------------|--------|
| Monthly District Summary | 10th of month | NCSW, Provincial Focal Points | PDF + Excel |
| Quarterly Consolidated Brief | 15th of quarter | Cabinet, NCSW | PDF |
| Annual CEDAW Compliance Report | Annual | UN Committee, NCSW | PDF |
| Red Zone Emergency Report | Within 72 hours | Chief Secretary, NCSW | Email + PDF |

### 8.3 Report Templates

#### Monthly Report Template
```
Header: Province | District | Month-Year
─────────────────────────────────────────
Section 1: Summary KPIs
- Total Cases, TFGBV Cases, Red Zone Status

Section 2: Crime Breakdown
- Bar chart by Crime Type
- Service provision table

Section 3: Justice Status
- Funnel stage counts
- Conviction rate

Section 4: Alerts & Actions
- Active alerts
- Required follow-ups
─────────────────────────────────────────
Footer: Generated by NGDRS | Date | Page X of Y
```

---

## 9. Technical Implementation

### 9.1 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Dashboard Framework | PowerBI Embedded | Primary dashboard engine |
| Alternative | Next.js + Recharts | Custom web dashboard |
| Map Engine | Mapbox GL JS | Geospatial visualization |
| Data Layer | PostgreSQL + PostGIS | Spatial queries |
| Cache | Redis | Dashboard data caching |
| API | REST + GraphQL | Data retrieval |

### 9.2 Performance Requirements

| Metric | Target |
|--------|--------|
| Initial Dashboard Load | < 3 seconds |
| Filter Apply | < 1 second |
| Drill-down Navigation | < 2 seconds |
| Map Render | < 2 seconds |
| Export Generation | < 30 seconds |
| Concurrent Users | 500+ |

### 9.3 Caching Strategy

| Data Type | Cache Duration | Invalidation |
|-----------|----------------|--------------|
| Aggregated KPIs | 15 minutes | On new case insert |
| District Summaries | 1 hour | On daily refresh |
| Platform Stats | 1 hour | On takedown update |
| Map Tiles | 24 hours | On manual refresh |
| Historical Data | Persistent | Never (append-only) |

### 9.4 Security for Dashboard

| Requirement | Implementation |
|-------------|----------------|
| Row-Level Security | PowerBI RLS / PostgreSQL RLS |
| CWSP Enforcement | DDW only for federal dashboards |
| K-Anonymity | Suppress locations with < 5 cases |
| Audit Logging | Log all dashboard access |
| MFA | Required for all dashboard users |

---

## 10. Acceptance Criteria

### 10.1 Functional Acceptance

| ID | Criteria | Verified By |
|----|----------|-------------|
| AC-01 | All 5 dashboard pages render correctly | QA Team |
| AC-02 | Heatmap shows all 170+ districts | QA Team |
| AC-03 | Filters apply correctly across all visuals | QA Team |
| AC-04 | Red Zone alerts trigger within 72 hours | NCSW Staff |
| AC-05 | Drill-down works National → Province → District | QA Team |
| AC-06 | All exports generate correctly | QA Team |
| AC-07 | CEDAW report includes all mapped indicators | NCSW Staff |
| AC-08 | Platform leaderboard updates hourly | QA Team |

### 10.2 Performance Acceptance

| ID | Criteria | Target |
|----|----------|--------|
| PA-01 | Dashboard loads in < 3 seconds | Pass |
| PA-02 | 500 concurrent users supported | Pass |
| PA-03 | No data shown for k < 5 locations | Pass |
| PA-04 | All scheduled reports delivered on time | Pass |

### 10.3 Security Acceptance

| ID | Criteria |
|----|----------|
| SA-01 | DDW users cannot access ODW data |
| SA-02 | K-Anonymity enforced on all public visualizations |
| SA-03 | Audit logs capture all dashboard access |
| SA-04 | MFA enforced for all users |

---

## Appendix A: NCSW Circular Dashboard Requirements Mapping

| Circular Section | SRS Section | Status |
|-----------------|-------------|--------|
| Page 1: National Overview | 2.1 | ✅ Covered |
| Page 2: Heatmaps | 2.2 | ✅ Covered |
| Page 3: Justice & Accountability | 2.3 | ✅ Covered |
| Page 4: Survivor Support | 2.4 | ✅ Covered |
| Page 5: TFGBV Platform Accountability | 2.5 | ✅ Covered |
| Red Zone Alert (>50/100k or +25%) | 7.1 | ✅ Covered |
| Repeat Offender Concern | 7.1 | ✅ Covered |
| TFGBV Rising Threat | 7.1 | ✅ Covered |
| Evidence Failure Alert | 7.1 | ✅ Covered |
| Monthly Reports by 10th | 8.2 | ✅ Covered |
| Quarterly Brief by 15th | 8.2 | ✅ Covered |
| CEDAW Compliance Report | 8.2 | ✅ Covered |

---

## Appendix B: Wireframe References

> Note: Detailed wireframes should be developed during UI/UX design phase based on this specification.

### Recommended Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Logo   │ Page Tabs: Overview │ Maps │ Justice │ Services │ │
│         │                                                    │
│ Filters │ Platform    │ Export │ Alerts (Badge) │ User ▼   │
├──────────┬───────────────────────────────────────────────────┤
│          │                                                   │
│  Global  │              MAIN VISUALIZATION AREA              │
│  Filter  │                                                   │
│  Panel   │   ┌─────────┐ ┌─────────┐ ┌─────────┐            │
│          │   │  KPI 1  │ │  KPI 2  │ │  KPI 3  │ ...        │
│  Date    │   └─────────┘ └─────────┘ └─────────┘            │
│  Range   │                                                   │
│          │   ┌─────────────────────────────────────────┐    │
│  Province│   │          PRIMARY CHART AREA             │    │
│          │   │      (Map / Funnel / Matrix)            │    │
│  District│   │                                         │    │
│          │   └─────────────────────────────────────────┘    │
│          │                                                   │
│          │   ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│          │   │ Chart 1    │ │ Chart 2    │ │ Chart 3    │   │
│          │   └────────────┘ └────────────┘ └────────────┘   │
│          │                                                   │
└──────────┴───────────────────────────────────────────────────┘
```

---

**END OF DOCUMENT**
