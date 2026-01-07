# NGDRS Dashboard Implementation Plan

## 1. Architecture & Layout
We will extend the existing Next.js application with a dedicated `/dashboard` route group.
- **Layout (`/app/dashboard/layout.tsx`)**:
  - **Sidebar:** Fixed left navigation with Lucide icons (Home, Map, Gavel, HeartHandshake, Smartphone).
  - **Top Bar:** Breadcrumbs, Date Range Picker (Global Filter), User Profile, Notification Bell.
  - **Main Content:** Scrollable area with gray background (`bg-brand-canvas`).

## 2. Mock Data Layer (`/lib/mock-data.ts`)
We will create a robust factory function to generate deterministic but realistic dummy data.
- **Generators:**
  - `generateDistrictData()`: Returns 170+ records with population, risk index, coordinates.
  - `generateCaseTrends()`: Monthly data for Line Charts.
  - `generateFunnelData()`: Data for the Justice Sankey diagram.
  - `generatePlatformStats()`: Meta, TikTok, etc., with compliance scores.

## 3. Technology Additions
- **Charts:** `recharts` (Standard, highly customizable).
- **Maps:** `react-leaflet` (Interactive choropleth maps) + `leaflet` CSS.
- **UI Components:** Continue using Tailwind + Framer Motion.

## 4. Page Breakdown

### Page 1: National Overview (`/dashboard/page.tsx`)
- **KPI Cards:** Top row (Total Cases, Red Zones, Conviction Rate).
- **Charts:**
  - `CrimeDistributionChart` (Bar): Physical vs Sexual etc.
  - `TrendAnalysisChart` (Line): Monthly trend.
  - `TFGBVRatio` (Donut).

### Page 2: Geospatial Heatmaps (`/dashboard/map/page.tsx`)
- **Interactive Map:** Leaflet map with district boundaries (using simplified GeoJSON).
- **Filters:** Floating sidebar for "Violence Type", "Date Range".
- **Interaction:** Hover tooltip showing Risk Index.

### Page 3: Justice Funnel (`/dashboard/justice/page.tsx`)
- **Sankey Diagram:** Custom SVG or Recharts Sankey showing flow from Reporting -> Conviction.
- **Attrition Analysis:** Bar charts showing "Reasons for Closure".
- **Scatter Plot:** Case Duration vs Conviction Outcome.

### Page 4: Survivor Support (`/dashboard/services/page.tsx`)
- **Care Matrix:** Progress rings for Medical, Legal, Shelter.
- **Radar Chart:** "Service Gap Analysis" (Target vs Actual).
- **Shelter Stats:** Table/Cards for shelter occupancy.

### Page 5: Platform Accountability (`/dashboard/platform/page.tsx`)
- **Leaderboard:** Table sorted by Compliance Score (Meta, X, TikTok).
- **Metrics:** Takedown Response Time (Bar chart).
- **Crime Morphology:** Stacked bar (Platform vs Crime Type).

## 5. Execution Steps
1.  **Setup:** Install `recharts`, `react-leaflet`, `leaflet`. Create `/dashboard` layout.
2.  **Data:** Implement `mock-data.ts`.
3.  **Components:** Build reusable `DashboardCard`, `ChartContainer`.
4.  **Pages:** Implement each page sequentially.
5.  **Refinement:** Add Framer Motion entrance animations to distinct widgets.

