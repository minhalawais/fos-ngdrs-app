# National Gender Data Reporting System (NGDRS)
# Software Requirements Specification (SRS)

**Version:** 1.0  
**Date:** January 7, 2026  
**Status:** Pre-Development  
**Classification:** Government - Confidential

---

## Document Control

| Version | Date | Author | Description |
|---------|------|--------|-------------|
| 1.0 | 2026-01-07 | NCSW Technical Team | Initial SRS Release |
| 1.1 | 2026-01-07 | NCSW Technical Team | Added 5 critical fields from NCSW Circular gap analysis |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Overview](#2-system-overview)
3. [Functional Requirements](#3-functional-requirements)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Data Requirements](#5-data-requirements)
6. [Integration Requirements](#6-integration-requirements)
7. [Security Requirements](#7-security-requirements)
8. [User Interface Requirements](#8-user-interface-requirements)
9. [Technical Architecture](#9-technical-architecture)
10. [Deployment Requirements](#10-deployment-requirements)
11. [Testing Requirements](#11-testing-requirements)
12. [Appendices](#12-appendices)

---

## 1. Introduction

### 1.1 Purpose
This Software Requirements Specification (SRS) defines the complete technical and functional requirements for the National Gender Data Reporting System (NGDRS). This document serves as the authoritative reference for development, testing, and deployment teams.

### 1.2 Scope
The NGDRS is a national-level enterprise platform designed to:
- Aggregate, validate, and visualize GBV/TFGBV data across Pakistan
- Connect Police, Health, Prosecution, and Social Welfare departments
- Provide real-time decision support for policymakers
- Monitor compliance with CEDAW, SDG 5, and EU GSP+ requirements

### 1.3 Critical Deadline
> **⚠️ MANDATORY: System must be operational before January 28, 2026**

### 1.4 Definitions & Acronyms

| Acronym | Definition |
|---------|------------|
| NGDRS | National Gender Data Reporting System |
| NCSW | National Commission on the Status of Women |
| GBV | Gender-Based Violence |
| TFGBV | Technology-Facilitated Gender-Based Violence |
| NCCIA | National Cyber Crime Investigation Agency |
| SMRA | Social Media Protection and Regulatory Authority |
| GBVIMS | Gender-Based Violence Information Management System |
| ODW | Original Data Warehouse (contains PII) |
| DDW | De-identified Data Warehouse (anonymized) |
| CWSP | Chinese Wall Security Policy |
| PII | Personally Identifiable Information |

---

## 2. System Overview

### 2.1 System Vision
The NGDRS shall function as a **compliance-driven, survivor-centric enterprise platform** and **intelligent decision-support system** that:
1. Standardizes and centralizes GBV/TFGBV reporting
2. Monitors Pakistan's international commitments
3. Provides actionable intelligence to policymakers
4. Guides frontline officers through procedures
5. Enforces accountability through data transparency

### 2.2 User Classes

| User Class | Role | Access Level |
|------------|------|--------------|
| **Policymakers** | PM, CMs, NCSW Chairperson | Executive Dashboard (DDW only) |
| **District Focal Persons** | Police, WPC, Health | Field Entry Portal (ODW) |
| **Data Reviewers** | District/Provincial | Triangulation Workbench |
| **Law Enforcement** | NCCIA, Provincial Police | Case Management |
| **Data Analysts** | Research Staff | DDW Analytics Only |
| **System Administrators** | IT Staff | Full System Access |

### 2.3 Operating Environment

| Requirement | Specification |
|-------------|---------------|
| **Hosting** | Government Private Cloud (NTC) |
| **Architecture** | Progressive Web App (PWA) |
| **Connectivity** | Offline-First with automatic sync |
| **Encryption** | AES-256 at rest, TLS 1.3 in transit |

---

## 3. Functional Requirements

### 3.1 Case Management Module

#### FR-CM-001: Case Registration
- **Priority:** Critical
- **Description:** System shall generate unique anonymized Case_ID upon new case creation
- **Format:** `{Province}-{District}-{Year}-{Sequence}` (e.g., PB-LHR-2026-00123)
- **Timing:** Must complete within 24 hours of survivor encounter

#### FR-CM-002: Crime Classification
- **Priority:** Critical
- **Description:** System shall enforce selection from standardized dropdown menus
- **GBV Codes:** GB-PH, GB-SX, GB-EC, GB-PY, GB-FM, GB-TR, GB-FE
- **TFGBV Codes:** TF-A1 through TF-A9

#### FR-CM-003: Multi-Crime Tagging
- **Priority:** High
- **Description:** System shall support primary + associated crime type recording

#### FR-CM-004: Digital Evidence Checklist
- **Priority:** Critical
- **Description:** For TFGBV cases, system shall require:
  - Screenshots
  - Metadata
  - URL/timestamps
  - Hash copies
  - Platform complaint number

#### FR-CM-005: Lethality Assessment
- **Priority:** Critical
- **Description:** System shall calculate risk score based on keywords
- **Triggers:** "Choking", "Weapon Display", "Death Threats"
- **Action:** High Risk score triggers immediate rescue alert

### 3.2 Routing & Workflow Module

#### FR-RW-001: Jurisdictional Routing
- **Priority:** Critical
- **Description:** System shall auto-route cases based on crime type:
  - Physical Violence → Provincial Police & Prosecution
  - Digital Violence (TFGBV) → NCCIA
  - Online Content Harm → SMRA (24-hour takedown trigger)
  - Hybrid Crimes → Joint Alert to Police + NCCIA

#### FR-RW-002: Legal Logic - Mediation Block
- **Priority:** Critical
- **Description:** System shall BLOCK mediation workflow for non-compoundable offenses
- **Blocked:** Rape (Section 375/376), Sexual Abuse (Section 377A)
- **Allowed:** Sexual Harassment (Section 509)

#### FR-RW-003: Medical Protocol Enforcement
- **Priority:** Critical
- **Description:**
  - Trigger "Medical Exam" checklist when "Rape" is selected
  - Generate alert if exam not conducted within 72 hours
  - **BLOCK** entry of "Two-Finger Test" results (illegal practice)

#### FR-RW-004: Auto-Referral System
- **Priority:** High
- **Description:** System shall auto-populate nearest services based on survivor location:
  - Dar-ul-Aman (Shelter)
  - Women Protection Officer (WPO)
  - Legal Aid Organizations
  - Hospitals with MLO services

### 3.3 Data Validation Module

#### FR-DV-001: Triangulation Engine
- **Priority:** Critical
- **Description:** Prior to monthly submission, system shall cross-check:
  - Police records vs Health records
  - Shelter registrations vs Case registrations
  - Medical exams conducted vs Rape cases reported
- **Example Alert:** "5 Rape Cases reported by Police, 0 Medico-Legal Exams by Health"

#### FR-DV-002: Discrepancy Lock
- **Priority:** High
- **Description:** Flagged records shall be LOCKED from submission
- **Remedy Period:** 72 hours for originating office to rectify

#### FR-DV-003: De-duplication
- **Priority:** High
- **Description:** System shall detect and flag potential duplicate entries

### 3.4 Alerting Module

#### FR-AL-001: Red Zone Detection
- **Priority:** Critical
- **Description:** System shall calculate risk thresholds per district:
  - **Density:** Cases / 100,000 population > 50
  - **Velocity:** >25% increase vs previous month
- **Action:** Auto-tag as RED ZONE, send SMS + Email to Chief Secretary & NCSW Chairperson

#### FR-AL-002: Repeat Offender Alert
- **Priority:** High
- **Description:** Alert when survivor has 3+ repeated incidents

#### FR-AL-003: Evidence Failure Alert
- **Priority:** Medium
- **Description:** Alert when >30% of digital evidence rejected in court in a district

#### FR-AL-004: Platform Threat Alert
- **Priority:** Medium
- **Description:** Alert when >10% month-on-month increase on specific platform

### 3.5 Dashboard Module

#### FR-DB-001: National Command Center View
- **Priority:** Critical
- **KPIs Required:**
  - Total Incident Volume (YTD)
  - Red Zone Counter
  - TFGBV Ratio (Donut Chart)
  - Conviction Rate (Gauge)
  - Reporting Compliance (Bar Chart)
  - Monthly Trend vs Previous Year (Line Chart)

#### FR-DB-002: Justice Funnel View
- **Priority:** Critical
- **Visualization:** Sankey Diagram
- **Stages:** Reported → FIR → Investigation → Charge Sheet → Trial → Conviction
- **Metrics:** Attrition Rate at each stage, Avg Time to Justice

#### FR-DB-003: Geospatial Risk Map (GIS)
- **Priority:** Critical
- **Type:** Interactive Chloropleth Map
- **Risk Levels:** Green (<20/100k), Amber (20-50/100k), Red (>50/100k)
- **Filters:** Date Range, Violence Category, Crime Type, Perpetrator Type, Age Group

#### FR-DB-004: TFGBV Platform Accountability View
- **Priority:** High
- **Metrics per Platform (TikTok, Meta, WhatsApp, X, etc.):**
  - Total Complaints
  - Takedown Success Rate (%)
  - Average Response Time (hours)
  - Compliance Score

#### FR-DB-005: Survivor Support Matrix View
- **Priority:** High
- **Metrics:**
  - Service Provision vs Requirement (Radar Chart)
  - Shelter Occupancy
  - % receiving Medical/Legal/Psychosocial services
  - Triangulation Check Status

### 3.6 Reporting Module

#### FR-RP-001: CEDAW Report Generator
- **Priority:** Critical
- **Description:** One-click generation of CEDAW Compliance Report PDF
- **Auto-mapping:** Cases tagged with SDG 5.2.1, CEDAW Art 2, etc.

#### FR-RP-002: Chief Secretary Letter Generator
- **Priority:** High
- **Description:** Auto-generate non-compliance notification letters for districts missing deadlines

#### FR-RP-003: Annual Transparency Report
- **Priority:** Medium
- **Description:** Generate Annual GBV & TFGBV Data Transparency Report

#### FR-RP-004: Monthly/Quarterly Reports
- **Priority:** High
- **Frequency:**
  - Monthly Reports: Due by 10th of each month
  - Quarterly Briefs: Due by 15th of following quarter

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Requirement | Specification |
|-------------|---------------|
| **NFR-P-001** | Page load time < 3 seconds on 3G connection |
| **NFR-P-002** | Support 10,000 concurrent users |
| **NFR-P-003** | Dashboard refresh < 5 seconds |
| **NFR-P-004** | Report generation < 30 seconds |
| **NFR-P-005** | Offline sync < 2 minutes for 100 records |

### 4.2 Availability

| Requirement | Specification |
|-------------|---------------|
| **NFR-A-001** | 99.9% uptime (excludes scheduled maintenance) |
| **NFR-A-002** | Maximum planned downtime: 4 hours/month |
| **NFR-A-003** | Disaster recovery: RTO < 4 hours, RPO < 1 hour |

### 4.3 Scalability

| Requirement | Specification |
|-------------|---------------|
| **NFR-S-001** | Support 500,000 annual case records |
| **NFR-S-002** | Support 170+ districts across 6 provinces |
| **NFR-S-003** | Horizontal scaling capability |

### 4.4 Usability

| Requirement | Specification |
|-------------|---------------|
| **NFR-U-001** | Bilingual interface: English + Urdu |
| **NFR-U-002** | Mobile-responsive design |
| **NFR-U-003** | WCAG 2.1 AA accessibility compliance |
| **NFR-U-004** | Training time: < 4 hours for basic operations |

### 4.5 Compliance

| Requirement | Specification |
|-------------|---------------|
| **NFR-C-001** | GBVIMS standard compliance |
| **NFR-C-002** | CEDAW indicator mapping |
| **NFR-C-003** | Pakistan Personal Data Protection compliance |
| **NFR-C-004** | Government IT security policies |

---

## 5. Data Requirements

### 5.1 Core Database Schema

#### Table: Survivor_Cases
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
Case_ID                VARCHAR(20)       PK, Anonymized Hash
Date_Reported          TIMESTAMP         NOT NULL
Province_ID            INT               FK → Geo_Registry
District_ID            INT               FK → Geo_Registry
Created_By             INT               FK → Users
Created_At             TIMESTAMP         DEFAULT NOW()
Updated_At             TIMESTAMP         
Status                 ENUM              Active/Closed
```

#### Table: Incident_Details
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
ID                     INT               PK, AUTO_INCREMENT
Case_ID                VARCHAR(20)       FK → Survivor_Cases
Crime_Code             VARCHAR(10)       FK → Crime_Types
TF_Code                VARCHAR(10)       FK → TFGBV_Types (nullable)
Location_Type          ENUM              Home/Street/School/etc.
Perpetrator_Type       ENUM              Partner/Family/Stranger/etc.
Survivor_Age_Group     ENUM              Minor/Youth/Adult/Senior
Disability_Status      BOOLEAN           
Recurrence             ENUM              Single/Repeat/Escalating (per NCSW Circular)
Police_Response_Time   ENUM              <24h/24-72h/>72h (per NCSW Circular)
Geo_Coordinates        POINT             PostGIS
Notes                  TEXT              Free-text case notes (per NCSW Circular)
Requires_Escalation    BOOLEAN           Urgent cases flag (per NCSW Circular)
```

#### Table: TFGBV_Specifics
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
ID                     INT               PK, AUTO_INCREMENT
Case_ID                VARCHAR(20)       FK → Survivor_Cases
Platform               ENUM              TikTok/Meta/WhatsApp/X/etc.
TF_Code                VARCHAR(10)       TF-A1 to TF-A9
Takedown_Requested     BOOLEAN           
Takedown_Time_Hours    INT               
Evidence_Hash          VARCHAR(64)       SHA-256
Content_URL            TEXT              Encrypted
```

#### Table: Justice_Funnel
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
ID                     INT               PK, AUTO_INCREMENT
Case_ID                VARCHAR(20)       FK → Survivor_Cases
Current_Stage          ENUM              FIR/Investigation/ChargeSheet/Trial/Conviction/Closed
Stage_Date             TIMESTAMP         
Attrition_Reason       TEXT              
Case_Duration_Days     INT               Calculated
Evidence_Accepted      BOOLEAN           (for TFGBV)
Evidence_Rejection_Reason TEXT           Reason for court rejection (per NCSW Circular)
```

#### Table: Service_Provision
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
ID                     INT               PK, AUTO_INCREMENT
Case_ID                VARCHAR(20)       FK → Survivor_Cases
Medical_Aid            BOOLEAN           
Psychosocial_Support   BOOLEAN           
Legal_Aid              BOOLEAN           
Shelter_Provided       BOOLEAN           
Digital_Forensics      BOOLEAN           
Economic_Rehab         BOOLEAN           
```

#### Table: Geo_Registry
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
ID                     INT               PK
Province_ID            INT               
Province_Name          VARCHAR(100)      
District_ID            INT               UNIQUE
District_Name          VARCHAR(100)      
Population_Female      INT               For per-100k calculations
GPS_Center             POINT             PostGIS
Risk_Index             DECIMAL(3,2)      Calculated
```

#### Table: Platforms (NEW - per NCSW Circular)
```
Field                  Type              Constraints
─────────────────────────────────────────────────────
ID                     INT               PK, AUTO_INCREMENT
Platform_Name          VARCHAR(50)       UNIQUE (TikTok, Meta, WhatsApp, etc.)
Avg_Response_Time_Hrs  DECIMAL(5,2)      Average takedown response time
Total_Complaints_YTD   INT               Aggregated count
Takedown_Success_Rate  DECIMAL(5,2)      Percentage
Compliance_Score       INT               0-100 score
Last_Updated           TIMESTAMP         
```

### 5.2 Enumeration Values

#### Violence Category Codes
| Code | Category |
|------|----------|
| GB-PH | Physical |
| GB-SX | Sexual |
| GB-EC | Economic |
| GB-PY | Psychological |
| GB-FM | Forced Marriage |
| GB-TR | Trafficking |
| GB-FE | Femicide |

#### TFGBV Type Codes
| Code | Type |
|------|------|
| TF-A1 | Cyberstalking |
| TF-A2 | Doxxing |
| TF-A3 | Threats/Extortion |
| TF-A4 | Deepfake Sexual Content |
| TF-A5 | Non-consensual Image Sharing |
| TF-A6 | AI Voice Cloning Coercion |
| TF-A7 | Online Harassment/Mobbing |
| TF-A8 | Sextortion/Blackmail |
| TF-A9 | GPS Stalking |

#### Justice Stages
| Stage | Description |
|-------|-------------|
| Filed | Initial complaint filed |
| FIR | FIR Registered |
| Investigation | Under investigation |
| Charge_Sheet | Charge sheet submitted |
| Trial | Court trial ongoing |
| Convicted | Conviction obtained |
| Closed | Case closed (with reason) |

---

## 6. Integration Requirements

### 6.1 External System Integrations

| System | Integration Type | Purpose |
|--------|------------------|---------|
| **NCCIA CMS** | REST API | TFGBV case routing, status updates |
| **National Helplines (1043/1737)** | REST API | Case intake from helplines |
| **Provincial Prosecution DB** | REST API | Justice funnel updates |
| **SMRA Platform** | REST API | Takedown requests/responses |
| **NTC SMS Gateway** | API | Alert notifications |
| **NTC Email Service** | SMTP | Report distribution |

### 6.2 API Specifications

#### Inbound API (Case Ingestion)
```
POST /api/v1/cases
Content-Type: application/json
Authorization: Bearer {JWT}

{
  "source": "helpline_1043",
  "date_reported": "2026-01-07T10:30:00Z",
  "province_id": 1,
  "district_id": 12,
  "crime_code": "GB-SX",
  "tf_code": null,
  "survivor_age_group": "adult",
  "perpetrator_type": "partner"
}

Response: 201 Created
{
  "case_id": "PB-LHR-2026-00123",
  "status": "registered"
}
```

#### Outbound API (Routing Alert)
```
POST /api/v1/alerts/route
Content-Type: application/json

{
  "case_id": "PB-LHR-2026-00123",
  "target_agency": "NCCIA",
  "crime_type": "TF-A4",
  "priority": "high"
}
```

---

## 7. Security Requirements

### 7.1 Data Protection

| Requirement | Specification |
|-------------|---------------|
| **SEC-001** | AES-256 encryption for all data at rest |
| **SEC-002** | TLS 1.3 for all data in transit |
| **SEC-003** | Zero-Knowledge Proofs for survivor identity verification |
| **SEC-004** | Cryptographic hashing for evidence chain of custody |

### 7.2 Access Control

| Requirement | Specification |
|-------------|---------------|
| **SEC-005** | Role-Based Access Control (RBAC) |
| **SEC-006** | Chinese Wall Security Policy (CWSP) between ODW and DDW |
| **SEC-007** | Multi-Factor Authentication (MFA) for all users |
| **SEC-008** | Session timeout: 30 minutes inactivity |
| **SEC-009** | Failed login lockout: 5 attempts |

### 7.3 Privacy & Anonymization

| Requirement | Specification |
|-------------|---------------|
| **SEC-010** | K-Anonymity (k≥5) for all public visualizations |
| **SEC-011** | Auto-suppress locations with <5 cases |
| **SEC-012** | PII stripped before data reaches DDW |
| **SEC-013** | Federal dashboards limited to District-level granularity |
| **SEC-014** | Comprehensive audit logging for all data access |

### 7.4 Data Warehousing Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    DISTRICT LEVEL (ODW)                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  District A │  │  District B │  │  District C │  ...    │
│  │   (Full PII)│  │   (Full PII)│  │   (Full PII)│         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         └────────────────┼────────────────┘                 │
│                          │                                  │
│                  ┌───────▼───────┐                          │
│                  │  ANONYMIZER   │                          │
│                  │  - Strip PII  │                          │
│                  │  - Hash IDs   │                          │
│                  │  - K-Anonymity│                          │
│                  └───────┬───────┘                          │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
                   ┌───────▼───────┐
                   │ FEDERAL (DDW) │
                   │  Anonymized   │
                   │  Aggregated   │
                   │  District-min │
                   └───────────────┘
```

---

## 8. User Interface Requirements

### 8.1 Portal Structure

| Portal | Users | Key Features |
|--------|-------|--------------|
| **Field Entry Portal** | District Focal Persons | Smart Intake Form, Evidence Checklist |
| **Provincial Portal** | WDD Staff | Triangulation Workbench, Submission Certifier |
| **National Admin Portal** | NCSW Staff | Audit Log, Report Generator |
| **Executive Dashboard** | Policymakers | KPIs, Heatmaps, Analytics |

### 8.2 Field Entry Portal Requirements

#### UI-FE-001: Smart Intake Form
- Progressive form with conditional fields
- Auto-complete for location selection
- Legal section auto-tagging (e.g., PECA Section 21)
- Offline data entry with sync indicator

#### UI-FE-002: Evidence Checklist
- Checkbox list for TFGBV evidence items
- File upload capability (encrypted)
- Auto-hash generation for uploaded files

### 8.3 Dashboard Requirements

#### UI-DB-001: Responsive Design
- Desktop: Full dashboard view
- Tablet: Collapsible panels
- Mobile: Single-column scroll

#### UI-DB-002: Interactive Maps
- Click-to-drill-down on districts
- Filter panel with:
  - Date range picker
  - Crime type multi-select
  - Platform filter (TFGBV)
  - Age group filter

#### UI-DB-003: Export Capabilities
- PDF export for all reports
- CSV export for data tables
- PowerBI embedded sharing

---

## 9. Technical Architecture

### 9.1 Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js / Next.js |
| **Backend** | Node.js (NestJS) with TypeScript |
| **Database** | PostgreSQL 15+ with PostGIS |
| **Cache** | Redis |
| **Queue** | Bull (Redis-based) |
| **Search** | Elasticsearch (optional) |
| **Dashboard** | PowerBI Embedded |
| **PWA** | Service Workers + IndexedDB |

### 9.2 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENTS                               │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Browser │  │  PWA    │  │ Mobile  │  │ API     │        │
│  │ (React) │  │(Offline)│  │ Browser │  │ Clients │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
└───────┼────────────┼────────────┼────────────┼──────────────┘
        │            │            │            │
        └────────────┴────────────┴────────────┘
                           │
                    ┌──────▼──────┐
                    │   NTC CDN   │
                    │   + WAF     │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │   NGINX     │
                    │   Gateway   │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                   │
 ┌──────▼──────┐   ┌───────▼───────┐   ┌──────▼──────┐
 │   API       │   │  Auth Service │   │  File       │
 │   Service   │   │  (JWT/MFA)    │   │  Service    │
 │   (NestJS)  │   │               │   │             │
 └──────┬──────┘   └───────────────┘   └─────────────┘
        │
        ├────────────────┬────────────────┐
        │                │                │
 ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
 │ PostgreSQL  │  │   Redis     │  │   Bull      │
 │ + PostGIS   │  │   Cache     │  │   Queue     │
 │ (Primary)   │  │             │  │             │
 └──────┬──────┘  └─────────────┘  └─────────────┘
        │
 ┌──────▼──────┐
 │ PostgreSQL  │
 │ (Replica)   │
 └─────────────┘
```

### 9.3 Microservices Architecture

| Service | Responsibility |
|---------|----------------|
| **API Gateway** | Request routing, rate limiting, authentication |
| **Case Service** | Case CRUD, validation, workflow |
| **Routing Service** | Jurisdictional routing logic |
| **Alert Service** | Red zone calculation, notifications |
| **Report Service** | Report generation, CEDAW compliance |
| **Analytics Service** | Dashboard aggregations |
| **Sync Service** | Offline data synchronization |
| **Auth Service** | Authentication, authorization, MFA |

---

## 10. Deployment Requirements

### 10.1 Infrastructure

| Requirement | Specification |
|-------------|---------------|
| **Hosting** | NTC Government Private Cloud |
| **Region** | Pakistan (Primary), DR site TBD |
| **Containers** | Docker + Kubernetes |
| **CI/CD** | GitLab CI or Azure DevOps |

### 10.2 Environments

| Environment | Purpose |
|-------------|---------|
| **Development** | Feature development |
| **Staging** | QA and UAT |
| **Production** | Live system |
| **DR** | Disaster Recovery |

### 10.3 Backup & Recovery

| Requirement | Specification |
|-------------|---------------|
| **Database Backup** | Daily full, hourly incremental |
| **Retention** | 90 days for backups, 7 years for archives |
| **RTO** | < 4 hours |
| **RPO** | < 1 hour |

---

## 11. Testing Requirements

### 11.1 Test Categories

| Category | Coverage |
|----------|----------|
| **Unit Testing** | >80% code coverage |
| **Integration Testing** | All API endpoints |
| **E2E Testing** | Critical user journeys |
| **Security Testing** | OWASP Top 10, Penetration testing |
| **Performance Testing** | Load testing, stress testing |
| **UAT** | User acceptance by NCSW staff |

### 11.2 Critical Test Scenarios

1. **Case Registration Flow**
   - Create case with all required fields
   - Verify Case_ID generation
   - Verify routing to correct agency

2. **Data Triangulation**
   - Create discrepancy scenario
   - Verify alert generation
   - Verify record locking

3. **Red Zone Alert**
   - Simulate >50 cases/100k threshold
   - Verify SMS/Email dispatch

4. **Offline Sync**
   - Create records offline
   - Restore connectivity
   - Verify successful sync

5. **Security Tests**
   - CWSP enforcement (DDW vs ODW separation)
   - K-Anonymity in map visualizations
   - MFA authentication flow

---

## 12. Appendices

### Appendix A: Legal Reference Mapping

| Crime Type | PPC/PECA Section | Compoundable |
|------------|------------------|--------------|
| Rape | Section 375/376 | **NO** |
| Sexual Assault | Section 354 | Yes |
| Sexual Abuse | Section 377A | **NO** |
| Sexual Harassment | Section 509 | Yes |
| Image-Based Abuse | PECA Section 21 | Yes |
| Deepfake | PECA Section 21 + 16 | Yes |
| Cyberstalking | PECA Section 24 | Yes |

### Appendix B: CEDAW Indicator Mapping

| Indicator | CEDAW Reference | NGDRS Data Source |
|-----------|-----------------|-------------------|
| GBV incidence rate | SDG 5.2.1 | Cases / Population |
| Conviction rate | Art. 2(c) | Justice_Funnel |
| Attrition rate | GR 35 | Stage progression |
| Service provision | Art. 2(c) | Service_Provision table |

### Appendix C: Submission Deadlines

| Report Type | Deadline |
|-------------|----------|
| Monthly District Reports | 10th of each month |
| Quarterly Provincial Brief | 15th of following quarter |
| Annual CEDAW Report | TBD by NCSW |
| Emergency Red Zone Alert | Within 72 hours of trigger |

### Appendix D: Contact Information

| Role | Department | Email |
|------|------------|-------|
| NCSW Data Unit | NCSW | data@ncsw.gov.pk |
| Technical Support | TBD | TBD |
| Provincial Focal Points | Various | [Provincial list] |

---

## Document Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | NCSW Chairperson | _________ | ________ |
| Technical Lead | TBD | _________ | ________ |
| Security Officer | TBD | _________ | ________ |
| QA Lead | TBD | _________ | ________ |

---

**END OF DOCUMENT**
