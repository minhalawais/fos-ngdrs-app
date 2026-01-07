# NGDRS Enterprise Landing Page - Implementation Plan

## 1. Project Vision
To create a "Production-Grade" Enterprise Landing Page that feels essential, authoritative, and technologically advanced. It must communicate the scale (National), the mandate (NCSW/Government), and the sophistication (Real-time analytics, AI, Framer Motion) of the NGDRS.

**Design Philosophy:** "Digital Governance meets Silicon Valley Polish."
- **Authority:** Serif headings (optional) or strong Sans-Serif (Inter/Jakarta), structured layouts.
- **Modernity:** Glassmorphism, subtle glowing gradients, smooth scroll animations (Framer Motion).
- **Clarity:** Complex workflows visualized simply.

## 2. Technology Stack
- **Framework:** React 18 (Vite)
- **Styling:** TailwindCSS (for structure) + Custom CSS Modules (for enterprise polish)
- **Animations:** Framer Motion (Orchestrated sequences, scroll reveals)
- **Icons:** Lucide React
- **Fonts:** `Plus Jakarta Sans` (Headings), `Inter` (Body) - *Standard for modern enterprise SaaS*

## 3. Color Strategy (Strict Adherence)
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Canvas** | Off-White | `#fbfcfc` | Main background, clean look |
| **Surface** | Light Gray | `#e0e5e9` | Card backgrounds, borders, subtle sections |
| **Accent 1** | Soft Teal | `#b2c9c5` | Secondary buttons, tags, illustrations |
| **Primary** | Vivid Green | `#1bd488` | CTAs, Success states, "Go" signals |
| **Secondary** | Muted Teal | `#45828b` | Sub-headings, icons, active states |
| **Strong** | Deep Teal | `#055b65` | Main Headings, Footer background, Strong text |

## 4. Site Architecture (Single Page)

### I. Hero Section (The "Hook")
- **Visual:** 3D-style abstract map of Pakistan or Data nodes connecting (Framer Motion SVG animation).
- **Headline:** "From Fragmented Data to National Justice."
- **Sub-head:** Mandated by NCSW. Powered by NGDRS.
- **Micro-interactions:** Live counter simulation (Districts connected).
- **CTA:** "Access Executive Dashboard" / "View Mandate".

### II. The Mandate (Credibility)
- **Logos:** NCSW, Ministry of Human Rights, SDG, EU GSP+.
- **Timeline Component:** Horizontal scroll timeline showing the **Jan 28, 2026** critical deadline.

### III. Problem vs. Solution (Contrast)
- **Before:** Siloed police, manual health records, disconnected shelters (Grey/Muted).
- **After (NGDRS):** Unified ecosystem, real-time sync, automated triangulation (Color/Animated).

### IV. Specialized Workflows (The "Meat")
*Interactive Tab/Accordion Component*
1.  **Physical GBV:** Police → Health (72hr) → Prosecution.
2.  **TFGBV (Digital):** Helpline → NCCIA → SMRA (Takedown).
3.  **Hybrid:** Divergent path visualization.

### V. Feature Deep Dive (Bento Grid Layout)
- **Smart Intake:** Offline-first PWA.
- **Triangulation Engine:** The "Truth Check" algorithms.
- **Red Zone Alerts:** Pulsing map visualization.
- **Justice Funnel:** Sankey diagram representation.

### VI. The Dashboard (Interactive Preview)
- **Fake UI:** A mocked-up version of the dashboard within a "Laptop Frame".
- **Interaction:** Hovering over "Heatmap" tab changes the screen content.

### VII. Compliance & Security (Trust)
- **Cards:** AES-256, Chinese Wall Security Policy, ISO 27001.
- **Compliance:** SDG 5.2.1 Reporting.

### VIII. Footer
- Government Official links, Technical Support, Privacy Policy.

## 5. Implementation Steps
1.  **Scaffold Project:** `npm create vite@latest`
2.  **Tailwind Config:** Map the 6 color codes to `primary`, `secondary`, `accent`, etc.
3.  **Component Build:**
    - `Navbar` (Floating, glass)
    - `Hero` (Framer Motion text stagger)
    - `WorkflowDiagram` (SVG paths animating)
    - `DashboardPreview` (Tabs state)
4.  **Polish:** Add "noise" textures, subtle gradients, and micro-interactions.

## 6. Directory Structure
```
/src
  /components
    /layout (Navbar, Footer)
    /sections (Hero, Workflow, Dashboard, etc.)
    /ui (Button, Card, Badge)
  /styles
    index.css (Tailwind directives)
  App.jsx
```
