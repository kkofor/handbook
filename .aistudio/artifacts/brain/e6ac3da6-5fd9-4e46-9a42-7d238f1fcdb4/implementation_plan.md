# VanStro Cabinet Care Handbook — Luxury Editorial Web Mockup

VanStro custom cabinetry detail page: an Architectural Digest-inspired, 3-column asymmetric editorial care guide featuring interactive finish tab switching, active table-of-contents tracking, visual Do's & Don'ts comparisons, curated moodboard photography, and a printable care checklist modal.

### User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed during the interactive interview:
> - **Dynamic Finish Matrix**: Selecting finish tabs (`Veneer`, `Painted`, `Thermofoil`, `Hardware`) dynamically updates the care parameters, cleaner specifications, pH limits, and custom Do/Don't recommendations in the middle column.
> - **Printable Checklist Modal**: Clicking the primary CTA (`[ Download Free Guide ]`) triggers an elegant, print-ready checklist modal with quick checkboxes, export/print options, and care routines.
> - **Editorial Webpage Presentation**: Rendered as a full desktop editorial layout with sticky navigation, live table of contents scroll-spy highlighting, and smooth section jumps.

---

### 1. Overview & Core Concept

- **What It Does**: VanStro's "Cabinet Care Handbook" is an architectural detail and maintenance guide for owners, interior designers, and luxury millwork clients. It provides daily maintenance protocols, finish-specific chemical guidelines, side-by-side visual Do's and Don'ts, and a downloadable quick-reference sheet.
- **Target Audience / Persona**: High-end homeowners, residential architects, luxury cabinet installers, and design enthusiasts who demand pristine upkeep for bespoke woodwork.
- **Key Value**: Replaces dry technical manuals with a publication-grade, tactile digital experience matching Architectural Digest editorial standards while maintaining clear, actionable maintenance rules.

---

### 2. User Experience & Visual Design

- **Key User Flows**:
  1. *Header & Hero Entry*: User browses the minimalist navbar (`VANSTRO`, `Kitchens`, `Vanities`, `Resources`, `Dealer`, `[ Contact ]`), notes the subtle `← Back to Guides` breadcrumb, and reads the prominent serif title "Cabinet Care Handbook" with metadata `4 MIN READ · CARE GUIDE`.
  2. *Table of Contents Navigation*: User clicks or scrolls past sticky left-column sections (`01 Daily Rules`, `02 Material Care`, `03 Do's & Don'ts`, `04 Hardware`) with smooth active-indicator transitions.
  3. *Finish Inspection*: In section 02, user clicks finish pills (`Veneer`, `Painted`, `Thermofoil`, `Hardware`) to toggle custom cleaning formulas, sponge recommendations, and temperature/moisture tolerances.
  4. *Visual Do's & Don'ts*: In section 03, user compares side-by-side cards featuring photographic evidence of proper wiping technique versus water-pooling damage.
  5. *Checklist Download*: User clicks `[ Download Free Guide ]` in the dark charcoal footer banner to open the printable checklist modal, toggle maintenance tasks, and trigger browser print/PDF view.

- **Visual Identity & Theme**:
  - *Aesthetic Direction*: Architectural Digest luxury interior aesthetic, warm minimalism, tactile materials, high negative space, no clutter, pixel-perfect alignment.
  - *Color Palette & Mood*:
    - Canvas: Clean warm off-white background (`#F9F8F6`)
    - Structure: Soft warm stone borders (`#E7E5E0`), muted warm gray text (`#73706B`), charcoal typography (`#1C1A17`)
    - Accents: Subtle sage green (`#2F5233` / `#E8EFE9`) for DO states, understated terracotta/wine (`#8B3A2B` / `#F8ECE9`) for DON'T states, warm bronze (`#9B7A4F` / hover `#85663F`) for primary guide action
    - Footer Banner: Deep rich charcoal (`#181715`) with warm off-white typography and bronze button
  - *Typography & Hierarchy*:
    - Display / Wordmark: Classic editorial serif (`Cormorant Garamond` / `Playfair Display`) for logo, main headers, and section numbers
    - Body / Controls: Refined geometric sans (`Plus Jakarta Sans` / `Manrope`) for high readability, single-line buttons, and metadata
    - Data & Metrics: Tabular numerals (`tabular-nums`) for guide times and numbered lists
  - *Component Styling & Layout (2 : 5 : 3 Ratio)*:
    - Left Column (18% width): Sticky minimalist table of contents under `CONTENTS` with clean text items
    - Middle Column (52% width):
      - 3 horizontal quick-rule cards side-by-side with minimal outline icons (*Wipe Spills*, *Soft Microfiber*, *Mild PH Soap*)
      - Finish selection segmented control with rounded pill-shaped tabs
      - Side-by-side Do's and Don'ts comparison cards with badges and photography
    - Right Column (30% width): Vertical editorial moodboard collage featuring 3 stacked architectural detail photos (macro oak wood grain, brushed brass cabinetry handle, folded organic linen cloths)

- **Interactive Feedback & Motion**:
  - Subtle hover lift on quick-rule cards and photography moodboard
  - Smooth sliding tab indicator for finish selection
  - Real-time scroll spy highlighting current TOC section
  - Tactile dialog entrance with backdrop blur for the printable care checklist

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Dynamic Finish State Engine**
  - *Chosen Approach*: When a finish tab is clicked, update both the specification badges, cleaner tolerance formulas, and tailored Do's/Don'ts contextual callouts.
  - *Why*: Provides genuine interactive utility for actual cabinet owners rather than a static visual snapshot.
  - *Alternatives Considered*: Showing all finishes in one tall static page (rejected: causes overwhelming text scroll and dilutes the visual layout).

- **Decision 2: Interactive Print/PDF Checklist Modal**
  - *Chosen Approach*: Implement an on-page modal with interactive checkboxes, a printable formatted layout, and `@media print` CSS stylesheet rules.
  - *Why*: Gives users immediate visual satisfaction on click, allows checking off items, and provides native print-to-PDF without broken external PDF links.
  - *Alternatives Considered*: Dummy file download or external link (rejected: unreliable in sandbox environment).

- **Decision 3: Curated Domain Imagery via Parallel `generate_image`**
  - *Chosen Approach*: Generate high-fidelity photography assets in a single parallel batch:
    1. Close-up macro oak wood grain (4:3)
    2. Brushed brass cabinetry handle hardware (4:3)
    3. Folded organic linen cleaning cloths (4:3)
    4. Natural wood gentle wiping with microfiber cloth (16:9)
    5. Wood surface edge water pooling / damage comparison (16:9)
  - *Why*: Replaces fragile external placeholder links with bespoke Architectural Digest-quality assets.
  - *Alternatives Considered*: Unsplash links (prohibited by frontend constitution).

---

### 4. Technical Architecture & Data Strategy *(Technical Reference)*

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Top Navigation Bar                              │
│   VANSTRO (Serif)  ·  Kitchens  ·  Vanities  ·  Resources  ·  [Contact]│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│   Hero Header: ← Back to Guides                                       │
│   "Cabinet Care Handbook" (Editorial Serif)                           │
│   4 MIN READ · CARE GUIDE · VANSTRO ARCHITECTURAL MILLWORK             │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │ (18% Column)            │ (52% Column)            │ (30% Column)
          ▼                         ▼                         ▼
┌────────────────────┐   ┌──────────────────────┐   ┌────────────────────┐
│ Table of Contents  │   │ Quick Rules (3 Cards)│   │ Moodboard Collage  │
│ [Sticky Sidebar]   │   │ · Wipe Spills        │   │ · Oak Wood Grain   │
│ · 01 Daily Rules   │   │ · Soft Microfiber    │   │ · Brushed Brass    │
│ · 02 Material Care │   │ · Mild pH Soap       │   │ · Linen Cloths     │
│ · 03 Do's & Don'ts │   ├──────────────────────┤   └────────────────────┘
│ · 04 Hardware      │   │ Finish Selection     │
└────────────────────┘   │ [Veneer][Painted]... │
                         ├──────────────────────┤
                         │ Do's & Don'ts Cards  │
                         │ [DO] Wood Microfiber │
                         │ [DON'T] Water Splash │
                         └──────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│   Full-Width Charcoal Banner: "Download the Printable Care Checklist"  │
│   [ Download Free Guide ] (Warm Bronze CTA)                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (triggers)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│   Printable Checklist Modal (Interactive check state + print layout)   │
└────────────────────────────────────────────────────────────────────────┘
```

- **Component Hierarchy & File Structure**:
  - `app/layout.tsx`: Configured with Google fonts (`Cormorant Garamond`, `Plus Jakarta Sans`), page metadata, and base background color `#F9F8F6`.
  - `app/globals.css`: Tailwind CSS v4 setup with custom print rules and smooth scroll utilities.
  - `app/page.tsx`: Root page orchestrating navbar, hero breadcrumb, 3-column asymmetric layout, footer banner, and printable modal state.
  - `components/Navbar.tsx`: Strict 1-row 3-zone header per top-bar contract.
  - `components/TableOfContents.tsx`: Sticky 18% sidebar with scroll-spy intersection observers and smooth anchor links.
  - `components/QuickRules.tsx`: 3 side-by-side cards with minimal SVG outline icons.
  - `components/FinishTabs.tsx`: Segmented finish selector with tailored specification matrix.
  - `components/DoAndDontCards.tsx`: Side-by-side DO/DON'T comparative cards with green/red badges and photographic evidence.
  - `components/MoodboardCollage.tsx`: 3 stacked architectural editorial photos with subtle hover depth.
  - `components/PrintableChecklistModal.tsx`: Accessible interactive checklist dialog with print trigger.
  - `data/handbook-data.ts`: Complete data definitions for finishes, rules, maintenance schedule, and care specs.

- **Data Model & State**:
  - `activeSection`: Tracks current visible section (`daily-rules`, `material-care`, `dos-donts`, `hardware`) for TOC active indicators.
  - `activeFinish`: Current selected finish tab (`veneer` | `painted` | `thermofoil` | `hardware`) updating specifications and warnings.
  - `isChecklistOpen`: Boolean controlling the printable checklist modal.
  - `checklistItems`: Array of interactive checklist tasks with toggled completion states.
