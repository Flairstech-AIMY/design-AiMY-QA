<!-- Converted from design-system-new.html -->

## Contents

- **Introduction**
  - [Overview](#overview)
  - [Surfaces](#surfaces)
- **Foundations**
  - [Semantic + Type](#palette-update)
  - [Color Tokens](#colors)
  - [Gradients](#gradients)
  - [Typography](#typography)
  - [Spacing & Radius](#spacing)
  - [Motion](#motion)
  - [Shadows](#shadows)
  - [Layout](#layout)
- **Components**
  - [Navigation](#navigation)
  - [Cards](#cards)
  - [Briefing Card (Full)](#bcard-extended)
  - [goal Brief Feed](#goal-feed)
  - [Friction Feed](#friction-feed)
  - [Badges & Status](#badges)
  - [Chips & Filters](#chips)
  - [AiMY Action Chips](#v2-chip)
  - [Dropdown](#v2-dropdown)
  - [Chart Primitives](#chart-primitives)
  - [Buttons](#buttons)
  - [Form Inputs](#forms)
  - [Feed Items](#feeds)
  - [Donut Chart](#donut-chart)
  - [AiMY Insight Panel](#ai-insight-panel)
  - [Chart Annotations](#anno-card)
  - [Context Zone](#context-zone)
  - [Data Viz](#dataviz)
  - [User Identity](#identity)
  - [Overlays](#overlays)
  - [Empty & Loading](#states)
  - [Accessibility](#accessibility)
- **AiMY Canvas**
  - [Float Input Bar](#canvas-float)
  - [Filter Tray](#canvas-filter-tray)
  - [Canvas Overlay](#canvas-overlay)
  - [Chat Messages](#canvas-messages)
  - [AiMY Toast](#canvas-toast)
  - [AiMY Badge](#canvas-badge)
- **Goal Hub**
  - [Goal Hub Shell](#goalhub-shell)
  - [Template Card](#goalhub-tpl-card)
  - [Intel Bar](#goalhub-intel-bar)
  - [Metric Card](#goalhub-metric-table)
  - [Governance CR Card](#goalhub-cr-card)
  - [Permission Matrix](#goalhub-perm-matrix)
  - [Health Card](#goalhub-health-card)
  - [goal Detail Overlay](#goalhub-kdo)
  - [Metric Detail Overlay](#goalhub-mdo)
  - [Scorecard Editor](#goalhub-editor)
  - [Governance Layout](#goalhub-governance)
- **Scorecards**
  - [Roster Panel](#sc-roster-row)
  - [Agent Header](#sc-agent-header)
  - [Lollipop Chart](#sc-lollipop)
  - [Dot Plot](#sc-dotplot)
  - [Heatmap (×2)](#sc-heatmap)
  - [goal Mini Grid](#sc-goal-mini)
  - [Behavioral goal Breakdown](#sc-behav)
  - [Trend Card](#sc-trend-card)
  - [Coaching Feed](#sc-coach-feed)
  - [Coaching Card](#sc-coaching-card)
  - [Evaluation List](#sc-eval-list)
  - [Evaluation Panel](#sc-eval-panel)
  - [Confidence Badge](#sc-conf-badge)
  - [Memory Panel](#sc-memory-panel)
  - [goal Detail Drawer](#sc-goal-drawer)
  - [Brief Card](#sc-brief)
  - [Pattern List](#sc-pattern-list)
  - [Page Header](#sc-page-header)
  - [View Toggle](#sc-view-toggle)
  - [Recovery Goal Banner](#sc-recovery-banner)
  - [Why This Score](#sc-why-score)
  - [Utility Chips](#sc-utility-chips)
- **justifys**
  - [justify Row](#justifys-row)
  - [SLA Indicators](#justifys-sla)
  - [AiMY Suggest Strip](#justifys-suggest)
  - [Change Request Panel](#justifys-detail)
  - [Workspace + APA](#justifys-workspace)
  - [Decision Zone](#justifys-decision)
  - [Audit Trail](#justifys-audit)
  - [Modal + Wizard](#justifys-modal)
- **Data Ingestion**
  - [Source Card](#di-src-card)
  - [Drop Zone](#di-dropzone)
  - [Upload Queue](#di-upload-queue)
  - [AiMY Source Actions](#di-aimy-actions)
  - [Sync / Failed Events](#di-sync-events)
  - [Source Config Modal](#di-config-modal)

---

*AiMY QA Design System*

# Build consistent. Ship confident.

Every token, component, and pattern used across AiMY QA v2, from the AI Chat canvas to the justifys audit trail. One source of truth so every surface feels native to the same product.

## Semantic + Typography Color Update

A focused contrast pass for status, tags, cyan signals, and supporting text. The dark canvas, card surfaces, purple QA accent, and transparent treatments remain unchanged.

### Preserved foundation

- **Canvas #0f1215
- **Card #141b24
- **Raised #1c2630
- **QA purple #8b4ff4
- **Glass rgba(20,27,36,.85)

### New semantic colors

- **Success** (Green) — #4ED6A1 tint 12% · border 30%
- **Warning** (Yellow) — #F7C95C tint 13% · border 32%
- **Critical** (Red) — #FF7282 tint 12% · border 30%
- **AI / Live** (Cyan) — #45D3E6 tint 12% · border 30%

*Use the tinted tag for status and metadata. Use a solid tag only for short, high-priority states. Bright semantic fills use #0d1117 text for contrast; purple keeps its existing treatment.*

## Surfaces

AiMY QA v2 has five distinct surfaces. Each has its own role model, layout, and interaction pattern, but all share the same token layer and component library.

### Role Matrix

| Surface | Agent | QA Manager | Auditor | Admin |
| --- | --- | --- | --- | --- |
| Dashboard | - | Full | Full | Full |
| Reviews | Own only | Full | Full | Full |
| Goal Hub | - | Templates only | - | Full |
| justifys | Own justifys | - | Queue + decisions | Full + export |
| Data Ingestion | - | - | - | Full |

## Color Tokens

Navy-tinted dark scale across 13 steps. Semantic status colors are shared across all surfaces. Click any swatch to copy its value.

> **Warning:** **QA Accent placeholder:** `--qa-accent: #8b4ff4` is borrowed from the Talent product. Replace with the QA-specific magenta from the Figma logo before v2 ships. Nav active states, chip selections, and focus rings all consume this single token, one swap propagates everywhere.

### Dark Scale · `--d`

- **--d950** — #080b10
- **--d900** — #0d1117
- **--d850 · card-bg** — #141b24
- **--d800** — #1c2630
- **--d750** — #233040
- **--d700** — #2e3d50
- **--d600** — #8091a5
- **--d500** — #8394a8
- **--d400** — #93a2b4
- **--d300** — #a8b5c5
- **--d200** — #c3ceda
- **--d100** — #dee5ed
- **--d50 · foreground** — #f5f7fb

### Brand & Accent

- **--brand** — #3369ff · CTAs, focus rings
- **--brand-dim** — rgba(51,105,255,0.15)
- **--qa-accent ⚠** — #8b4ff4 · placeholder
- **--qa-accent-dim** — rgba(139,79,244,0.15)
- **--cyan · --teal alias** — #45d3e6 · AI signals
- **--cyan-bg · --teal-dim alias** — rgba(69,211,230,0.12)

### Semantic Status

- **--ok** — #4ed6a1 · Pass, success
- **--ok-bg** — rgba(78,214,161,0.14)
- **--warn** — #f7c95c · Borderline
- **--warn-bg** — rgba(247,201,92,0.14)
- **--err** — #ff7282 · Fail, critical
- **--err-bg** — rgba(255,114,130,0.14)
- **--info** — #7ea7ff · Informational
- **--info-bg** — rgba(126,167,255,0.14)

### Surface & Card Tokens

- **--body-bg** — #0f1215 · Page background
- **--card-bg** — #141b24 · All card surfaces
- **--card-bg-raised** — #1c2630 · Elevated cards
- **--card-border** — rgba(255,255,255,0.07)
- **--card-border-hover** — rgba(255,255,255,0.14)

| Token | Value | Used on |
| --- | --- | --- |
| --brand | `#3369ff` | Primary CTAs, focus rings, brand buttons, AI canvas accent |
| --qa-accent ⚠ | `#8b4ff4` | Nav active state, chip active, topnav tab active, one swap propagates everywhere |
| --teal | `#45d3e6` | AI identity signals, eyebrows, version badge, gradient endpoint |
| --ok / --warn / --err | Green / Amber / Red | Scores, findings, justifys, pipeline status, badge variants |
| --card-bg | `#141b24` | Every card, sidebar, filter tray, tooltip, shared surface token |
| --body-bg | `#0f1215` | Page background only, never used on elevated surfaces |

## Gradients

Four gradient roles. Direction and stops are fixed, never modify. Click a row to copy the CSS value.

- **--ai** — `linear-gradient(104deg, #0066ff 0%, #61adf1 47%, #45d3e6 100%)`
- **Avatar fill** — `linear-gradient(135deg, #7c3aed, #3369ff)`
- **Ellipse · Primary** — `radial-gradient(ellipse at 30% 50%, #0066ff→#61adf1→#45d3e6→transparent)`
- **Ellipse · Secondary** — `radial-gradient(ellipse at 75% 70%, teal → purple → transparent)`

> **Info:** The **--ai gradient** is the primary AI identity signal. Use it on logo marks, AI Chat canvas accents, and any surface surfacing AI-generated content. Never apply it to decorative elements unrelated to AI.

| Gradient | Usage | Rule |
| --- | --- | --- |
| --ai | Logo mark, AI canvas strip, AI-scored badge background | AI identity only |
| Avatar fill | All user avatars, user pills | Never on non-user elements |
| Ellipse · Primary | Fixed background layer (z-index 0, pointer-events none) | One per page, bottom-left |
| Ellipse · Secondary | Fixed background layer (z-index 0, pointer-events none) | One per page, top-right |

## Typography

One typeface across all surfaces: **Urbanist** (300–800). Code and token values use **JetBrains Mono**. Headings use negative tracking; labels use positive tracking.

### Typography color roles

Supporting text now has explicit roles. Subtext stays clearly separate from body copy while every readable role shown here remains above 4.5:1 against the standard card surface.

| Role | Size | Weight | Tracking | Where |
| --- | --- | --- | --- | --- |
| Hero H1 | 46px | 800 | -0.03em | Design system hero, marketing headers |
| Section H2 | 24px | 800 | -0.02em | Every ds-section heading |
| Page title | 15px | 700 | -0.01em | Topnav surface name, panel titles |
| Body / narrative | 13px | 500 | normal | AI narrative cards, descriptions |
| Card conclusion | 12px | 600 | -0.005em | Briefing card title, finding title |
| Nav item | 13px | 600 | normal | Sidebar links |
| Evidence / sub | 10px | 500–600 | normal | Evidence pills, score sub-labels |
| Label / eyebrow | 10px | 700 | +0.1em | Section labels, nav group headers (uppercase) |
| Badge / pill | 9–10px | 700 | +0.04–0.06em | Tags, priority badges, status chips |
| Mono | 11–12px | 400–500 | normal | Code blocks, token values, API keys |

## Spacing & Border Radius

4px base unit. All spacings are multiples of 4. Card padding is 16px (compact) or 20–24px (comfortable). Border radius follows component size, never mix large radii on small components.

### Spacing Scale

### Border Radius Scale

| Token | Value | Used on |
| --- | --- | --- |
| --r-xs | `4px` | Finding icon, badge icon, rank badge, checkbox |
| --r-sm | `6px` | Buttons (sm), code block label, modal close btn |
| --r-md | `8px` | Buttons, nav items, inputs, filter tray cells, focus ring |
| --r-lg | `10px` | Token swatches, callouts, AFS strip, source connection card |
| --r-xl | `12px` | Surface cards, template cards, code blocks, modals |
| --r-2xl | `16px` | Briefing cards, narrative cards, goal brief, score cards |
| --r-pill | `9999px` | Chips, tags, badges, tabs strip, user pill, search input |

## Motion

Two duration tokens only. Custom keyframe animations define their own durations. All transforms use `--ease-out` for enter and `--ease-spring` for springy feedback.

| Token | Value | Usage |
| --- | --- | --- |
| --t-fast | `150ms` | Color, background, border-color, hover states on chips, badges, buttons |
| --t-base | `200ms` | Transform, box-shadow, card lifts, nav state changes, expand toggles |
| --t-slow | `300ms` | Panel slides, modal entrance, filter tray expand |
| --ease-out | `cubic-bezier(0.22,1,0.36,1)` | All enter/appear animations, strong deceleration |
| --ease-spring | `cubic-bezier(0.34,1.56,0.64,1)` | Chip pop, score ring fill, toggle thumb, slight overshoot |
| hover lift sm | `translateY(-1px)` | Surface cards, subtle tier-primary bcard |
| hover lift md | `translateY(-2px)` | Standard briefing card hover, modal card hover |
| glassShimmer | `keyframes, 2× on mount` | Top-edge shine on filter tray and active-filter-strip |
| afsEntrance | `180ms ease` | Active filter strip slides in from above on appear |
| chipPop | `220ms ease-spring` | Springy chip entrance when a filter is applied |
| shimmer | `1.4s ease-in-out infinite` | Skeleton loader background sweep |
| blink | `1.2s ease-in-out infinite` | Signal badge dot, live alert pulse |

### Runtime CSS variables

These four tokens are not defined in `:root`. They are injected by JavaScript at run-time and consumed by CSS `calc()` expressions. Never set them in CSS. Never rely on them having a default value.

| Token | Set by | Consumed by | Example value |
| --- | --- | --- | --- |
| `--state` | AiMY state detection JS, injected on `.context-zone--state` | Layout sizing of the detected-state zone in the AiMY canvas panel | `auto` |
| `--suggestions` | AiMY chip-render JS, injected on `.context-zone--suggestions` | Layout sizing of the chip tray zone in the AiMY canvas panel | `auto` |
| `--dur` | Data-ingestion progress bar JS, `bar.style.setProperty('--dur','3s')` | `.di-qitem-progbar` animation duration, varies per file size | `3s` |
| `--wide` | Modal/panel JS, injected on wide panel variants | Width override for `.modal-box--wide` and related wide panel variants | `560px` |

### Live Demos

## Shadows & Elevation

Four shadow levels. Used exclusively on cards and overlays, never on inline text or icons.

| Token | Value | Usage |
| --- | --- | --- |
| --shadow-sm | `0 1px 3px rgba(0,0,0,0.3)` | Subtle lift on hovered nav items |
| --shadow-md | `0 4px 16px rgba(0,0,0,0.35)` | Card hover lift, dropdown menus |
| --shadow-lg | `0 8px 32px rgba(0,0,0,0.4)` | Filter tray, detail panels, toast |
| --shadow-xl | `0 16px 48px rgba(0,0,0,0.5)` | Modals, full-page overlays |

## Layout

Every screen uses the same three-zone shell: full-width topnav → fixed sidebar → scrollable main. Two radial ellipse layers sit at z-index 0, fixed, pointer-events none.

| Token / Zone | Value | Notes |
| --- | --- | --- |
| --topbar-height | `60px` | Fixed, z-index 100, blur backdrop |
| --sidebar-width | `220px` | Fixed left, transparent bg with blur |
| body background | `#0f1215` | Sits below ellipse layer, never use on cards |
| #appEllipse | z-index 0, fixed inset 0 | Radial gradient duo, pointer-events: none |
| .app-main scroll pad | `24px 32px 100px` | Top / horiz / bottom inner padding |
| Dashboard tier-1 grid | `repeat(4, 1fr), gap 16px` | 4-column goal briefing row |
| Dashboard tier-2 grid | `1.5fr 1fr, gap 16px` | Narrative card + goal feed split |
| Reviews left panel | `280px` fixed width | Agent list; right panel fills remaining space |
| justifys split | `360px` left list | justify queue + detail view |
| Ingestion split | `300px` source list | Source list + detail / upload area |

### Shell Structure

```html
/* Three-zone shell, identical across all surfaces */
.app-shell {
  display: flex;
  padding-top: var(--topbar-height);
  min-height: 100vh;
}

.app-topnav {
  position: fixed; top: 0; left: 0; right: 0;
  height: var(--topbar-height);
  z-index: 100;
  background: rgba(15,18,21,0.88);
  backdrop-filter: blur(24px);
}

.app-sidebar {
  width: var(--sidebar-width);
  position: fixed;
  top: var(--topbar-height); bottom: 0;
  overflow-y: auto;
}

.app-main {
  margin-left: var(--sidebar-width);
  flex: 1; min-width: 0;
  padding: 24px 32px 100px;
  overflow-y: auto;
}
```

### Dashboard Grid

```html
/* Tier 1, 4-column goal briefing row */
.tier-1-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

/* Tier 2, asymmetric narrative + goal feed */
.tier-2-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 16px;
  align-items: start;
}
```

## Navigation

Two navigation patterns documented here: the sidebar `.nav-item` for page-level routing within QA v2, and the product tab strip for switching tabs. The shared top navigation bar (topnav) is excluded from this design system. It is a shared shell component maintained centrally across all AiMY products.

### Sidebar Nav Item

| State | Background | Color | Border |
| --- | --- | --- | --- |
| default | transparent | `--d400` | transparent |
| hover | `rgba(255,255,255,0.04)` | `--d200` | - |
| active | `--qa-accent-dim` | `--qa-accent` | `rgba(qa-accent-rgb,0.28)` |

### Product Tab Strip

```html
<div class="tabs-strip">
  <div class="tab">Talent</div>
  <div class="tab active">QA</div>
  <div class="tab">Connect</div>
</div>
```

## Cards

Three card types. All share `--card-bg` and `--card-border` but have different anatomy, padding, and interaction. Only one card per dashboard may carry `.tier-primary`.

### Briefing Card · `.bcard`

Primary information unit on the Dashboard. Each card has five structural zones stacked vertically inside `.bcard-body`: meta row (type label + priority badge) → conclusion sentence → evidence pills → divider → action row (`.bcard-action`). The action row (`.bcard-action`) is `flex-direction:column`, the primary `.action-btn` comes first, then the `.expand-toggle` sits **below it**. Below the body sits the collapsible `.bcard-data` grid (hidden by default, opened by the expand-toggle).

### Priority modifiers

| Modifier | Border color | Action btn color |
| --- | --- | --- |
| `.p1` | `rgba(255,114,130,0.18)` | err tint |
| `.p2` | `rgba(247,201,92,0.18)` | warn tint |
| `.p3` | `rgba(78,214,161,0.15)` | ok tint |
| `.ai` | brand tint | - |
| `.tier-primary` | `--card-border` (base) + qa-accent double-ring `box-shadow` | - |

### Anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Card | `.bcard` | card-bg, 14px radius, `position:relative; overflow:hidden`. The `.bcard-accent` div is present in the HTML but has no CSS. It is a hook reserved for future use. Whole card is clickable, `onclick="toggleCard(this)"` |
| Accent hook | `.bcard-accent` | Empty `<div>`, present in HTML, no CSS applied. Hook for future use |
| Body | `.bcard-body` | `padding:16px`, uniform padding, no left offset needed |
| Meta row | `.bcard-meta` | flex, gap 8px, `margin-bottom:8px`. Holds `.severity-dot` (8px semantic circle) + `.type-label` (10px/700 uppercase) + `.priority-badge` (9px/700 pill, `margin-left:auto`) |
| Conclusion | `.bcard-conclusion` | 13px/600, `--d100`, `line-height:1.55; margin:0 0 10px`. Inline semantic `<span>` with priority color for the key figure |
| Evidence row | `.evidence-row` | flex, gap 6px, flex-wrap, `margin-bottom:12px`. Holds `.evidence-pill` chips |
| Evidence pill | `.evidence-pill` | Ghost bg + hairline border, 20px radius. `.ev-value` (bold d50) + label text. `.ev-delta.dn/.up` for change indicators (semantic colors) |
| Divider | `.bcard-divider` | 1px, full-bleed (negative margin to override body padding). `rgba(255,255,255,0.06)` |
| Action row | `.bcard-action` | `flex-direction:column; gap:16px; align-items:center; justify-content:space-between`. Primary `.action-btn` is first; `.expand-toggle` sits **below it** |
| Action button | `.action-btn` | 12px/700, priority-colored tint. flex, gap 7px. Contains label + 13px arrow SVG |
| Expand toggle | `.expand-toggle` | 10px/600, ghost. "Metric Breakdown" label + 12px chevron SVG. Add `.open` to rotate chevron 180° |
| Ack row | `.bcard-ack-row` | Hidden by default. Contains "Acknowledge" + "Dismiss" ghost buttons + `.bcard-dismiss-picker` |
| Expandable data | `.bcard-data` | `display:none`. Add `.open` to show. `background:rgba(0,0,0,0.2)`, top border |
| Data grid | `.data-grid` | `grid-template-columns:repeat(3,1fr); gap:8px`. Each `.data-cell`: `.dc-label` (9px/600 uppercase) + `.dc-val` (14px/700) + `.dc-sub` (10px) |

### Narrative Card · AI Summary

AI-generated performance narrative. Always carries the `tag-ai` badge. Finding items are listed below the narrative body.

```html
/* Finding item, use inside .narrative-card */
<div class="finding f-err">  <!-- f-err | f-warn | f-ok -->
  <div class="finding-icon f-err">✕</div>
  <div>
    <div class="finding-title">Title</div>
    <div class="finding-sub">Supporting detail</div>
  </div>
</div>
```

### Evaluation Result Card · Score States

## Briefing Card · Full Anatomy

The complete `.bcard` as used on the Dashboard. The simple variant (documented in Cards above) is the collapsed state. This section documents every sub-component: the conclusion + evidence zone, the action zone, the ack/dismiss row, and the expandable metric data panel.

> **Info:** Only one `.bcard` per dashboard may carry `.tier-primary`, it elevates with a QA-accent glow ring to draw the eye to the most urgent alert first. The `.is-acknowledged` state auto-desaturates and sends the card to the visual back via CSS `order: 99`.

### Full anatomy · P1 Critical card

### P2 Warning & P3 Positive

### Acknowledged State

| Element | Spec | Notes |
| --- | --- | --- |
| .bcard-body | padding: 16px | All internal children live inside this wrapper. `.bcard-data` sits outside it (full-bleed dark bg). |
| .type-label | 10px/700 uppercase --d400, flex:1 | Category name (Compliance, Coaching, SLA…). flex:1 pushes badge right. |
| .priority-badge | 9px/700 pill, inherits p1/p2/p3 color | Always semantic: p1=err, p2=warn, p3=ok, ai=brand-blue. |
| .bcard-conclusion | 12px/600 --d50, lh 1.45 | AI-generated. Max 2 lines. Never truncate with ellipsis, reduce font size instead. |
| .evidence-pill .ev-value | 700 #fff | The metric number in bold white. Surrounding label text stays --d300. |
| .ev-delta.up/dn/warn | 10px/600 ok/err/warn | Always prefixed with ↑ or ↓ glyph. Positive delta = .up, negative = .dn. |
| .action-btn | 12px/700, 7×14px pad, r-md, inherits p1/p2/p3 color | One per card. SVG icon optional (13×13). Hover darkens the bg by ~6%. |
| .expand-toggle | 10px/600 --d400, SVG rotates 180° on .open | Toggles `.bcard-data.open`. Button text swaps: "Metric Breakdown" ↔ "Hide data". |
| .bcard-ack-btn | 10px/600 --d400, pill, hairline border | Acknowledged state: ok-bg + ok text + pointer-events none. Parent card gains .is-acknowledged. |
| .bcard-data | hidden → display block on .open, dark 0.2 alpha bg, full-bleed | Contains a 3-col .data-grid with .dc-label / .dc-val / .dc-sub per cell. |
| .bcard.is-acknowledged | opacity 0.45, filter saturate(0.4), order 99 | Dimmed + desaturated. Moves to end of CSS grid. Non-interactive. |

```html
<div class="bcard p1 tier-primary">
  <div class="bcard-body">

    <!-- Meta row -->
    <div class="bcard-meta">
      <span class="type-label">Compliance</span>
      <span class="priority-badge">P1 · Critical</span>
    </div>

    <div class="bcard-conclusion">3 agents below 60% threshold. Escalation required today</div>

    <div class="evidence-row">
      <div class="evidence-pill">
        <span class="ev-value">58%</span> avg score <span class="ev-delta dn">↓4.2</span>
      </div>
    </div>

    <div class="bcard-divider"></div>

    <div class="bcard-action">
      <button class="action-btn">Escalate Now</button>
      <button class="expand-toggle">
        Metric Breakdown
        <!-- chevron svg -->
      </button>
    </div>

    <div class="bcard-ack-row">
      <button class="bcard-ack-btn">Acknowledge</button>
      <button class="bcard-ack-btn dismiss">Dismiss</button>
    </div>

  </div>

  <!-- Metric breakdown (hidden by default, toggle with JS) -->
  <div class="bcard-data" id="bcardData-id">
    <div class="data-grid">
      <div class="data-cell">
        <span class="dc-label">Avg Score</span>
        <span class="dc-val">58%</span>
        <span class="dc-sub">Target: ≥ 80%</span>
      </div>
    </div>
  </div>

</div>
```

## goal Brief Feed

A vertically-stacked list of prioritised goal alerts, displayed in the right column of the Dashboard. Each `.goal-brief` row has a ranked icon, a conclusion, evidence items, and a context action button. Color (err/warn/ok) comes from the parent modifier class, never set colors inline.

### Feed Demo

| Element | Spec | Notes |
| --- | --- | --- |
| .goal-feed | flex column, gap 8px | Direct parent of all .goal-brief rows. |
| .goal-brief | flex, pad 10px 14px, bg --card-bg, r-xl, 1px border | Hover: translateX(2px), feeds never lift vertically. Modifier: .kf-err / .kf-warn / .kf-ok. |
| .kf-rank | 20×20px, r-xs, semantic bg per modifier | Rank number (1, 2, 3…). Not a score, it's the feed position number. |
| .kf-conclusion | 11px/700 #fff, lh 1.4 | goal name + inline score. Score uses .kf-score-err/warn/ok for semantic color. |
| .kf-evidence | 10px --d300, flex gap 8px | Metric items in .kf-ev-item. Values bold via .v. Trends via .trend-up/dn/warn. |
| .kf-action | 10px/700, 4×10px pad, r-sm, inherits modifier color | One word max: Review / Coach / View / Flag. Self-aligned center. |
| .passing-toggle | 10px/700 uppercase, full-width, top hairline border | Collapses/expands the passing goals section. SVG chevron rotates 180° when open. |
| .passing-section | display none → block on .open | Contains passing .goal-brief rows (always .kf-ok). Hidden by default. |

```html
<div class="goal-feed">

  <!-- Err row (rank 1) -->
  <div class="goal-brief kf-err">
    <div class="kf-rank">1</div>
    <div class="kf-body">
      <div class="kf-conclusion">SLA Response Time, <span class="kf-score-err">61%</span></div>
      <div class="kf-evidence">
        <div class="kf-ev-item"><span class="v">23</span> breaches</div>
        <div class="kf-ev-item"><span class="trend-dn">↓18%</span> vs last wk</div>
      </div>
    </div>
    <button class="kf-action">Review</button>
  </div>

  <!-- Passing toggle -->
  <button class="passing-toggle">
    <span class="passing-toggle-label">Passing goals · 3</span>
    <!-- chevron svg -->
  </button>
  <div class="passing-section">
    <!-- .goal-brief.kf-ok rows -->
  </div>

</div>
```

## Friction Feed

A compound component on the Dashboard left column. The `.signal-card` is the AI-detected live friction event. It sits above a `.feed-items` strip of related secondary signals. Together they form the `.friction-feed`. The signal card has an expandable driver bar section that reveals the root-cause analysis.

> **Info:** The `.signal-card` and `.feed-items` strip share a **connected border**. The card has no bottom border and the strip has no top radius. They always appear together, never separately. The full-bleed `.raw-data-toggle` button must live inside `.signal-card` (which has `overflow:hidden`) so it bleeds to the edges without needing negative margins.

### Signal Card

The primary friction event. Click "Show driver breakdown" to expand the data panel.

### Signal Card, spec

| Element | Spec | Notes |
| --- | --- | --- |
| .friction-feed | flex column, no gap | Direct parent of .signal-card + .feed-items. Never add gap, the connected border effect relies on touching edges. |
| .signal-card | err-tinted bg, r-2xl top only, err border, no bottom border, overflow hidden | `overflow:hidden` is required so .raw-data-toggle bleeds to edges without negative margins. |
| .signal-badge | 9px/700 uppercase pill, err-bg, animated .signal-badge-dot | The blinking dot uses the shared `blink` keyframe (1.2s). Always present on a live signal. |
| .signal-type | 10px/600 --d300, letter-spacing 0.04em | Category label: "FRICTION DETECTED", "SLA BREACH", "COMPLIANCE FLAG", etc. |
| .signal-statement | 15px/700 --d50, lh 1.52, -0.01em tracking | AI-generated. 1–2 sentences max. Inline `.hl-err` / `.hl-warn` for semantic highlights. |
| .primary-action-btn | 12px/700 err-color, err-bg, r-md, 9×16px pad | Always err-colored for friction signals. One per card. |
| .sec-btn | 10px/600 --d400, 6×11px pad, r-md, hairline border | Ghost style. Up to 3 secondary actions. Never use for the primary CTA. |
| .raw-data-toggle | full-width, 10×20px pad, top hairline, chevron rotates on .open | Lives at the bottom of .signal-card. Toggle class .open on .collapsible-section to reveal driver bars. |

### Driver Bars, spec

| Element | Spec | Notes |
| --- | --- | --- |
| .driver-bars | flex column, gap 8px | Always render bars sorted by impact (highest first). |
| .driver-bar-name | 11px/600 --d50, fixed 140px width | Emoji icon + label + optional .primary-driver-badge for rank 1. |
| .driver-bar-fill.primary | err gradient #ff7282→#fb7067, 0 0 8px err glow | The top driver. Only one per card. |
| .driver-bar-fill.secondary | rgba(err, 0.35) | Secondary contributors. |
| .driver-bar-fill.neutral | rgba(ok, 0.3) | Positive factors, use ok green to contrast with err bars. |
| transform-origin | left center on all fill elements | Required for the CSS `grow` scaleX animation to expand from left. |

### Feed Items Strip, spec

| Element | Spec | Notes |
| --- | --- | --- |
| .feed-items | card-bg, r-2xl bottom only, err-tinted border (15% alpha), no top border | Connected to .signal-card above it. Always the same width. |
| .feed-header | 10px/700 uppercase, dark 12% bg, bottom hairline | Left: label + count pill. Right: "View all →" link. |
| .feed-count | 9px/700, err-bg, r-sm | Number of secondary signals. Matches signal-badge style at smaller scale. |
| .feed-item | flex gap-12, pad 12×16, bottom hairline. Hover: bg rgba(255,255,255,0.025) | Last item has no border-bottom. Max 4–5 items before "View all" pagination. |
| .sentiment-icon | 30×30px, r-md. Variants: .neg (err-bg), .warn (warn-bg), .pos (ok-bg) | Emoji content. Never use an SVG here, emoji communicates sentiment faster. |
| .feed-delta | 11px/700, 2×7px pad, r-sm. Variants: .neg / .warn / .pos | Always includes direction prefix: ↑ or ↓. |

```html
<div class="friction-feed">

  <!-- Signal Card (top, no bottom border/radius) -->
  <div class="signal-card">
    <div class="signal-body">

      <div class="signal-meta">
        <div class="signal-badge">
          <div class="signal-badge-dot"></div>
          Live Signal
        </div>
        <span class="signal-type">FRICTION DETECTED</span>
        <span class="signal-time">2 min ago</span>
      </div>

      <div class="signal-statement">
        Customer expressed frustration <span class="hl-err">3 times</span>. Agent did not acknowledge.
      </div>

      <div class="signal-action-row">
        <button class="primary-action-btn">Review Interaction</button>
        <div class="secondary-actions">
          <button class="sec-btn">Assign coach</button>
          <button class="sec-btn">Dismiss</button>
        </div>
      </div>

    </div>

    <!-- Full-bleed expand toggle -->
    <button class="raw-data-toggle">
      <div class="toggle-icon"><!-- chevron svg --></div>
      <span class="toggle-label">Show driver breakdown</span>
      <span class="toggle-hint">Friction score · Trend · Root cause</span>
    </button>

    <div class="collapsible-section">
      <!-- .driver-section with .driver-bars rows -->
    </div>

  </div>

  <!-- Feed Items strip (bottom, no top radius) -->
  <div class="feed-items">
    <div class="feed-header">
      <span class="feed-header-label">
        Other friction signals <span class="feed-count">4</span>
      </span>
      <span class="feed-view-all">View all →</span>
    </div>
    <div class="feed-item">
      <div class="sentiment-icon neg">😤</div>
      <div class="feed-body">
        <p class="feed-title">Title text</p>
        <p class="feed-detail">Detail text</p>
      </div>
      <div class="feed-right">
        <span class="feed-delta neg">↑38%</span>
      </div>
    </div>
  </div>

</div>
```

## Badges & Status

All badges use uppercase, tight tracking, and weight 700. Status is always communicated through semantic color, never shape or position alone.

### Tag Variants

| Class | Color | Background | When to use |
| --- | --- | --- | --- |
| tag-ok | `--ok` | `--ok-bg` | Pass, success, upheld, active, positive trend |
| tag-warn | `--warn` | `--warn-bg` | Borderline, warning, partial adjust, attention needed |
| tag-err | `--err` | `--err-bg` | Fail, critical, overturned, escalated, P1 |
| tag-ai | `#61adf1` | `rgba(0,102,255,0.1)` | AI-generated content, AI-scored evaluations |
| tag-qa | `--qa-accent` | `--qa-accent-dim` | Manual QA review, QA-specific labels |
| tag-neutral | `--d300` | `rgba(255,255,255,0.05)` | Draft, pending, deprecated, no-status states |
| tag-info | `--info` | `--info-bg` | In review, informational system states |
| tag-teal | `--teal` | `--teal-dim` | Live signals, AI identity eyebrows |

### Signal / Live Badge

```html
<!-- Static tag -->
<span class="tag tag-err">P1 Critical</span>

<!-- Live / pulsing signal badge -->
<div class="signal-badge err">
  <div class="signal-dot"></div>
  Live Alert
</div>
```

## Chips & Filters

Filter chips live in the floating filter tray. Active filters appear in the active-filter-strip (AFS) as dismissible chips with a springy `chipPop` entrance.

### Filter Chip Variants

| Class | Background | Border | Use |
| --- | --- | --- | --- |
| .chip.default | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.08)` | Unselected filter option |
| .chip.active | `--qa-accent-dim` | `rgba(qa-accent,0.3)` | Selected filter. Shows dismiss × |
| .chip.brand | `--brand-dim` | `rgba(brand,0.3)` | AI-specific filter toggle |
| .chip.ok/warn/err | semantic bg | semantic tint | Score-range filter chips |

### Active Filter Strip (AFS)

```html
<div class="afs">
  <span class="afs-label">Filters</span>
  <div class="afs-chip">
    <strong>Team:</strong> Cairo
    <span class="x">×</span>
  </div>
  <span class="afs-clear">Clear all</span>
</div>
```

## AiMY Action Chips

Large, card-like chips surfaced by AiMY as prioritised action suggestions. Each chip has a severity tier (`urgent`, `caution`, `explore`) communicated through border tint, background tint, a 2px top-edge accent line, and a badge. Chips are dismissible, dismissal fires a toast with a 5-second undo window and feeds a learning signal back to AiMY.

### All Variants

| Modifier | Border | Background | Top accent | Badge | Use |
| --- | --- | --- | --- | --- | --- |
| `.v2-chip.urgent` | `rgba(err, 0.3)` | `rgba(err, 0.04)` |   | `.urgent-badge`, err colors | Requires immediate action |
| `.v2-chip.caution` | `rgba(warn, 0.3)` | `rgba(warn, 0.04)` | `--warn` | `.caution-badge`, warn colors | Watch / investigate |
| `.v2-chip.explore` | `rgba(brand, 0.25)` | `rgba(brand, 0.04)` | `--ai` gradient | `.explore-badge`, blue tint | AI-surfaced opportunity |
| `.v2-chip.dismissed` | - | - | - | - | Opacity 0, scale 0.95, pointer-events none, triggers undo toast |

### Anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Container | `.v2-chip` | flex-column, 16px padding, 12px radius, `position:relative; overflow:hidden`, required for `::before` top accent |
| Top accent line | `.v2-chip::before` | 2px tall, full width, `opacity:0` → 1 on hover. Color set by severity modifier |
| Top row | `.v2-chip-top` | flex row, space-between. Holds label + badge |
| Label | `.v2-chip-label` | 12px/700, `--d50` |
| Badge | `.v2-chip-badge` | 9px/700, pill shape. Add severity class: `.urgent-badge`, `.caution-badge`, `.explore-badge` |
| Body text | `.v2-chip-sub` | 11px, `--d300`. Inline `<strong>` uses `--d50` |
| Footer row | `.v2-chip-footer` | flex, space-between. Holds action CTA + dismiss button |
| Action CTA | `.v2-chip-action` | 11px/700. Add color class: `.urgent-action`, `.caution-action`, `.explore-action` |
| Dismiss | `.v2-chip-dismiss` | 11px ✕, calls `dismissChip(i)` which sets `.dismissed` and shows undo toast |

### Chip wrapper

| Class | Role |
| --- | --- |
| `.v2-chips` | flex row, `gap:10px; flex-wrap:wrap`, wraps all chips for a context |
| `.v2-chips-suggested` | Header label above chips: "AiMY Suggested" with AI icon, 10px/700, uppercase, teal color |
| `.v2-chips-context` | Italicised context sentence describing why these chips were surfaced, 12px, `--d400` |
| `.v2-refresh-btn` | Ghost button beside the chips header to refresh suggestions |

```html
<div class="v2-chips">
  <div class="v2-chip urgent" id="chip-0">
    <div class="v2-chip-top">
      <span class="v2-chip-label">5 agents below threshold</span>
      <span class="v2-chip-badge urgent-badge">URGENT</span>
    </div>
    <p class="v2-chip-sub"><strong>3 consecutive weeks</strong> below 80%, SLA risk.</p>
    <div class="v2-chip-footer">
      <span class="v2-chip-action urgent-action">Review agents →</span>
      <span class="v2-chip-dismiss" onclick="dismissChip(0)">✕</span>
    </div>
  </div>
</div>
```

## Dropdown

Custom select component replacing all native `<select>` elements. Fully keyboard-navigable, uses `aria-haspopup="listbox"` and `aria-expanded`. Panel animates in with `translateY(-4px) scale(0.98)` → `translateY(0) scale(1)` at 150ms ease-spring.

### Variants

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.v2-dropdown` | `position:relative; display:inline-flex`. Add `.roster-dd` for full-width variant |
| Trigger button | `.v2-dropdown-btn` | Always `type="button"`, `aria-haspopup="listbox"`, `aria-expanded="false/true"`. Add `.open` when panel visible, `.active-filter` when non-default value selected |
| Label text | `.dd-label-text` | `max-width:120px; overflow:hidden; text-overflow:ellipsis`, prevents layout shift on long labels |
| Panel | `.v2-dropdown-panel` | Absolutely positioned below trigger. Add `.open` class to show. `role="listbox"` |
| Option | `.v2-dropdown-option` | `role="option"`, `data-value="…"`. Add `.selected` to current value, renders a 5px dot indicator via `::before` |

```html
<div class="v2-dropdown" data-dd="my-dropdown">
  <button class="v2-dropdown-btn" type="button"
          aria-haspopup="listbox" aria-expanded="false">
    <span class="dd-label-text">Sort: Quality (low→high)</span>
    <svg viewBox="0 0 10 6" fill="none" stroke="currentColor"
         stroke-width="1.8"><polyline points="1 1 5 5 9 1"/></svg>
  </button>
  <div class="v2-dropdown-panel" role="listbox">
    <div class="v2-dropdown-option selected" role="option" data-value="Quality (low→high)">Quality (low→high)</div>
    <div class="v2-dropdown-option" role="option" data-value="Quality (high→low)">Quality (high→low)</div>
    <div class="v2-dropdown-option" role="option" data-value="Risk level">Risk level</div>
  </div>
</div>
```

## Chart Primitives

Shared structural elements used inside every chart card: a header with title, subtitle, controls toolbar, a stats summary strip, and a legend. These compose into the full chart header pattern used in the Quality Score card and other data panels.

### v2-header · Chart card header

| Class | Role | Notes |
| --- | --- | --- |
| `.v2-header` | Wrapper | flex-column, `gap:12px; margin-bottom:16px` |
| `.v2-header-row1` | Title + action row | flex, space-between. Holds `.v2-header-left` and optional action button |
| `.v2-header-left` | Title stack | flex-column, `gap:3px` |
| `.v2-title` | Chart title | 17px/700, `--d50`, `letter-spacing:-0.01em` |
| `.v2-subtitle` | Subtitle / cadence | 11px, `--d400`, `white-space:nowrap` |
| `.v2-controls` | Controls toolbar | flex, `gap:8px`, `border-top:1px solid rgba(255,255,255,0.05); padding-top:10px` |
| `.range-tabs` | Time-range selector | Pill strip, dark bg. Active tab: `.range-tab.active`, `--d700` bg, `--d50` text |
| `.range-tab` | Individual tab | 10px/600, type="button". Active state via `.active` class toggled in JS |
| `.compare-toggle` | Period comparison toggle | Ghost button. `.active` state: brand blue tint + `#61adf1` text |
| `.ai-insight-btn` | AiMY Analysis trigger | Teal border/text. Toggles the `.ai-insight-panel` |

### v2-stats-row · Metric summary strip

Sits below the chart header, above the chart canvas. Shows 2–4 key metrics with deltas, separated by hairline dividers. Legend aligns right via `margin-left:auto` on `.v2-legend`.

| Class | Role | Notes |
| --- | --- | --- |
| `.v2-stats-row` | Wrapper | flex, `gap:24px; padding-bottom:16px; border-bottom`, separates stats from chart |
| `.v2-stat` | Single metric | flex-column, `gap:2px` |
| `.v2-stat-label` | Metric name | 9px/700, uppercase, `letter-spacing:0.08em`, `--d400` |
| `.v2-stat-value` | Metric value | 20px/800, `--d50`, `letter-spacing:-0.02em`. Secondary stats use 16px |
| `.v2-stat-delta` | Change indicator | 11px/600. Add `.up` (`--ok`) or `.down` (`--err`). Neutral: `--d400` |
| `.v2-stat-divider` | Separator | 1px wide, `rgba(255,255,255,0.07)`, `align-self:stretch; margin:0 8px` |
| `.v2-legend` | Chart legend | `margin-left:auto` pushes it right in the stats row flex container |
| `.legend-item` | Legend entry | flex, `gap:6px`, 10px/500, `--d400` |
| `.legend-line` | Colour swatch | 18×2px, `border-radius:2px`. For dashed lines: `background:transparent; border-top:2px dashed {color}` |

## Buttons

Buttons are always contextual, color inherits from the card priority or action context. Font: Urbanist 12px/700. Padding: 8px 16px. Radius: --r-md.

### All Variants

| Class | Background | Color | Context |
| --- | --- | --- | --- |
| .btn-brand | `--brand` | #fff | Primary CTA, standalone actions |
| .btn-ghost | `rgba(255,255,255,0.05)` | `--d300` | Secondary / cancel / dismiss |
| .btn-err | `--err-bg` | `--err` | P1 cards, escalation, overturned justifys |
| .btn-warn | `--warn-bg` | `--warn` | P2 cards, coaching, borderline actions |
| .btn-ok | `--ok-bg` | `--ok` | P3 cards, resolve, uphold, positive actions |
| .btn-qa | `--qa-accent-dim` | `--qa-accent` | QA-specific overrides and admin actions |
| .btn-sm | - | - | 10.5px / 5px 11px pad, inside cards and feed items |
| .btn-lg | - | - | 13px / 10px 20px pad, hero CTAs and empty states |

```html
<!-- Variants -->
<button class="btn btn-brand">Review Now</button>
<button class="btn btn-ghost">Dismiss</button>
<button class="btn btn-err">Escalate</button>
<button class="btn btn-warn">Schedule Coaching</button>
<button class="btn btn-ok">Mark Resolved</button>

<!-- Sizes -->
<button class="btn btn-brand btn-sm">Small</button>
<button class="btn btn-brand btn-lg">Large</button>
<button class="btn btn-ghost" disabled>Disabled</button>
```

## Form Inputs

All inputs share the same base token layer. Focus uses `--brand` (not the QA accent). API key fields are always masked, a hard design constraint, not just implementation.

### Text Input · States

### Input with Icon Prefix / Suffix

### Search Input (pill)

### Select & Textarea

### Toggle, Checkbox & Radio

### Masked / API Key Input

> **Warning:** **Security constraint:** API key fields must always render as `type="password"` after initial entry. "Edit credentials" must clear the field and require full re-entry, never pre-populate with the stored value.

```html
<!-- Field wrapper -->
<div class="field">
  <label class="field-label">Team</label>
  <input class="input" type="text" placeholder="Enter name…" />
  <span class="field-hint">Helper text</span>
</div>

<!-- Error state -->
<input class="input error" />

<!-- Toggle switch -->
<label class="toggle">
  <input type="checkbox" />
  <div class="toggle-track"></div>
  <div class="toggle-thumb"></div>
</label>

<!-- Masked API key -->
<input class="input" type="password" />
```

| Element | Spec | Notes |
| --- | --- | --- |
| .input default | bg rgba(255,255,255,0.04), border rgba(255,255,255,0.1) | Hover darkens border; focus → --brand border + blue tint bg |
| .input.error | border `--err` | Pair with `.field-error` span below input |
| .input.success | border `--ok` | Pair with green confirmation text |
| .input:disabled | opacity 0.38, cursor not-allowed | Never remove from DOM, use disabled attr |
| select.input | custom chevron via background-image | appearance: none; right-pad 36px for arrow |
| textarea.input | min-height 80px, resize: vertical | Used in justify rationale, coaching notes |
| type="password" | font-family: mono, letter-spacing 0.08em | API keys only, never pre-fill after save |

## Feed Items

Two feed patterns: the goal brief (ranked alert list on the Dashboard) and the coaching / activity feed item used in side panels and agent history.

### goal Brief · Ranked Alert List

### Activity / Coaching Feed Item

## Donut Chart

SVG donut used for pass/fail/borderline breakdowns (Tickets Evaluation panel). Three visible arc segments, pass (green gradient), borderline (warn), fail (err), sit over an invisible track. A layer of transparent `.donut-hit` rings handles hover interactions without gap-flicker between segments. Active segment expands via `stroke-width` and gets a glow filter. Center text updates reactively via JS.

### Live preview

### Arc geometry formula

circumference = 2π × r = 2π × 40 ≈ 251.3 · stroke-dasharray = (pct/100) × 251.3 · stroke-dashoffset = −(sum of all previous arcs)

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.donut-wrap` | 100×100px, `position:relative`. SVG rotated `-90deg` so arcs start at 12 o'clock |
| Track | inline `<circle>` | `stroke:rgba(255,255,255,0.06); stroke-width:10`, the dim background ring |
| Arc | `.donut-arc` | `fill:none; stroke-width:10; stroke-linecap:butt; pointer-events:none`. Active state adds `.active-pass / .active-border / .active-fail` |
| Hit ring | `.donut-hit` | `fill:none; stroke:transparent; stroke-width:28`, fat invisible ring matching the arc. Fires `onmouseenter/leave` |
| Center | `.donut-center` | `position:absolute; inset:0` flex column, centered. `pointer-events:none` |
| Percentage | `.donut-pct` | 20px/800, `--d50`, `letter-spacing:-0.03em`. Updated by JS on hover |
| Label | `.donut-label` | 9px/600, `--d400`, uppercase. Updated by JS on hover |

| Active state class | stroke-width | filter |
| --- | --- | --- |
| `.active-pass` | 13 | `drop-shadow(0 0 7px rgba(78,214,161,0.7))` |
| `.active-border` | 13 | `drop-shadow(0 0 7px rgba(247,201,92,0.7))` |
| `.active-fail` | 13 | `drop-shadow(0 0 7px rgba(255,114,130,0.7))` |
| `.dimmed` | 10 (unchanged) | `opacity:0.25`, applied to non-hovered arcs |

## AiMY Insight Panel

Collapsible panel that sits inside a chart card header, toggled by the `.ai-insight-btn`. Default state is `display:none`, shown via JS toggle adding `.visible` or inline `display:block`. Displays an AiMY logo header, an optional memory-cue pill (signals session continuity), bullet-point findings, and an action CTA. Blue-tinted glass surface to signal AI provenance.

### Preview

| Element | Class | Notes |
| --- | --- | --- |
| Panel | `.ai-insight-panel` | Blue-tinted: `background:rgba(0,102,255,0.07); border:1px solid rgba(0,102,255,0.22)`. Default hidden. Add `.visible` or set `display:block` via JS |
| Header row | `.ai-insight-header` | flex, `gap:8px; margin-bottom:8px`. Holds AiMY logo SVG, label, optional memory-cue pill |
| Header label | `.ai-insight-header span` | 11px/700, uppercase, `letter-spacing:0.06em`, color `#61adf1` |
| Memory cue | `.memory-cue` | Pill signalling session continuity, clock icon + label. `margin-left:auto` pushes it right. Only show when AiMY is resuming a prior thread |
| Bullet list | `.ai-insight-bullets` | flex-column, `gap:7px`. Each `<li>` has `padding-left:14px` and a `::before` dot in `--qa-accent` |
| Body text | `.ai-insight-text` | Alternative to bullets for single-paragraph insights. 13px, `--d300`, `line-height:1.6` |
| Trigger button | `.ai-insight-btn` | Teal border/color, in `.v2-controls` toolbar. Toggles panel visibility |

## Chart Annotations

Floating callouts anchored to a specific data point on a chart. Two variants: **anomaly** (err-tinted, actionable. Has a CTA button) and **peak** (ok-tinted, read-only). Each annotation is a `.chart-annotation` wrapper positioned absolutely over the SVG chart area, containing a card + a dot. The card is hidden by default and revealed on `:hover`.

### Both variants

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.chart-annotation` | `position:absolute` over chart SVG area. `display:flex; flex-direction:column; align-items:center`. Add `.anomaly` or `.peak` modifier |
| Anomaly card | `.anno-card` | Err-tinted border. `position:absolute; bottom:calc(100% + 10px)`, floats above the dot. Hidden until `:hover` |
| Card header | `.anno-header` | flex, space-between. Left: `<strong>` in `--err`. Right: `.anno-score` in `--d50` |
| Card CTA | `.anno-btn` | err-colored ghost button. Always present on anomaly cards, the "action" in "knowledge to action" |
| Peak card | `.peak-card` | Ok-tinted border, read-only. `<span>` inside uses `--ok` + font-weight:700 for the value |
| Dot | `.anno-dot` | 8px circle, `border:2px solid --d800`. `.peak` modifier: `--ok` fill. `.anomaly` modifier: `--err` fill + red glow pulse |

## Context Zone

A two-zone panel attached to the top of the AiMY canvas overlay. Zone 1 (`--state`) surfaces what AiMY has detected, the active state pill + alternative states the user can switch to. Zone 2 (`--suggestions`) shows the AiMY action chips keyed to that detected state. The two zones are always co-present: the detected state drives which chips appear. Changes to the detected state refresh the chips.

### Preview

| Element | Class | Notes |
| --- | --- | --- |
| Panel wrapper | `.aimy-context-panel` | Contains both zones. No padding, zones handle their own |
| Zone (either) | `.context-zone` | `padding:16px 20px` base |
| State zone | `.context-zone--state` | Adds subtle top-surface tint + bottom divider: `border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.015)` |
| Suggestions zone | `.context-zone--suggestions` | `padding-bottom:20px`. Header is flex space-between to push Refresh button right |
| Zone header | `.context-zone-header` | flex, `gap:12px; flex-wrap:wrap; margin-bottom:12px` |
| Header label | `.state-bar-label` | 10px/700, uppercase, `--d400`. Inner `.label-text` span: `#61adf1` |
| Detected state pill | `.state-detected-pill` | qa-accent tinted pill. Holds `.state-detected-dot` + label + `.state-confidence` text |
| Confidence text | `.state-confidence` | 9px/700, `--d400`, `letter-spacing:0.04em` |
| Alternatives row | `.state-alts` | flex, `gap:8px; flex-wrap:wrap`. Label + list of `.state-alt` pill buttons |
| Alt state button | `.state-alt` | 10px/600, ghost pill. Clicking switches the detected state and refreshes chips |

**CSS vars:** `--state` and `--suggestions` are JS-injected layout vars used in some pages to size the two zones dynamically. Document them as runtime tokens, not design tokens. Their values are set in JS, not in `:root`.

## Data Viz

Two data display primitives used across Reviews and Agent Scorecard: the SVG score ring (overall score) and horizontal progress bars (per-category goal breakdown).

### Score Ring

### goal Category Progress Bars

```html
<!-- Score ring (r=36, circumference≈226.2) -->
<div class="score-ring">
  <svg width="88" height="88" viewBox="0 0 88 88">
    <circle class="score-ring-track"
      cx="44" cy="44" r="36" stroke-width="7"/>
    <circle class="score-ring-fill ok"
      cx="44" cy="44" r="36" stroke-width="7"
      stroke-dasharray="226.2"
      stroke-dashoffset="27.1"/> <!-- 88% -->
  </svg>
  <div class="score-ring-center">
    <div class="score-ring-number">88%</div>
    <div class="score-ring-label">Score</div>
  </div>
</div>

<!-- Progress bar -->
<div class="progress-bar-wrap">
  <div class="progress-bar-header">
    <span class="progress-bar-label">Empathy</span>
    <span class="progress-bar-value">84%</span>
  </div>
  <div class="progress-bar-track thick">
    <div class="progress-bar-fill ok" style="width:84%"></div>
  </div>
</div>
```

| Score range | Ring class | Bar class | Label |
| --- | --- | --- | --- |
| ≥ 80% | `score-ring-fill ok` | `progress-bar-fill ok` | Pass, green |
| 60–79% | `score-ring-fill warn` | `progress-bar-fill warn` | Borderline, amber |
| < 60% | `score-ring-fill err` | `progress-bar-fill err` | Fail, red |
| Team avg | `score-ring-fill brand` | `progress-bar-fill brand` | Reference line, blue |

## User Identity

Avatars and user pills appear in the topnav, activity feeds, coaching threads, and audit trails. The avatar gradient is fixed. It is the visual identity of a human actor. AI actions always use the --ai gradient instead.

### Avatar Sizes

| Class | Size | Font | Used in |
| --- | --- | --- | --- |
| .avatar-sm | 24×24px | 9px / 700 | Activity feed thread connector, topnav mention |
| .avatar-md | 32×32px | 11px / 700 | User pill in topnav, agent row in reviews list |
| .avatar-lg | 44×44px | 14px / 700 | Agent scorecard header, justify detail header |
| AI variant | any size | - | Background: `--ai` gradient. Always initials "AI". Never use --grad-avatar on AI actor. |

### User Pill

Used in the topnav right slot. Contains avatar + name stack. Never truncate the name, reduce font size instead.

```html
<!-- Avatar -->
<div class="avatar avatar-md">NK</div>

<!-- User pill -->
<div class="user-pill">
  <div class="avatar avatar-md">NK</div>
  <div>
    <div class="user-pill-name">Nour K.</div>
    <div class="user-pill-role">QA Manager</div>
  </div>
</div>

<!-- AI actor avatar (use --ai gradient, never --grad-avatar) -->
<div class="avatar avatar-md" style="background:var(--ai)">AI</div>
```

### Notification Bell Dot

## Overlays

Two overlay primitives: modals (blocking, backdrop blur) and tooltips (non-blocking, hover-only). Never use a modal for a destructive action without a confirmation step.

### Modal

> **Danger:** **This action is permanent.** Deleting the Zendesk source will remove all ingestion history, pipeline logs, and associated evaluations from this source. It cannot be undone.

| Element | Spec | Notes |
| --- | --- | --- |
| .modal-backdrop | fixed inset 0, bg rgba(0,0,0,0.65), blur(6px) | Click outside = close. z-index 500. |
| .modal | max-width 520px, pad 28px 32px, --r-2xl, --shadow-xl | Never wider than 560px. Always vertically centered. |
| .modal-title | 16px / 800 / -0.01em | Destructive: color --err. Standard: color --d50. |
| .modal-footer | flex, gap 8px, justify flex-end | Confirm always rightmost. Cancel always leftmost. |
| Danger pattern | --err title + .ds-callout.err + confirmation input | Require typed confirmation for irreversible deletes. |

```html
<div class="modal-backdrop">
  <div class="modal">

    <div class="modal-header">
      <div class="modal-title">Override Evaluation Score</div>
      <button class="modal-close">✕</button>
    </div>

    <div class="modal-body">
      Description of the action and its consequences.
    </div>

    <div class="modal-footer">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-brand">Confirm</button>
    </div>

  </div>
</div>
```

### Tooltip

Pure CSS, no JS required. Wrap any trigger element in `.tooltip-wrap` and add a sibling `.tooltip`. Max content: one short sentence.

```html
<div class="tooltip-wrap">
  <button class="btn btn-ghost btn-sm">Trigger</button>
  <div class="tooltip">Tooltip text</div>
</div>

/* CSS, no JS needed */
.tooltip-wrap { position: relative; display: inline-flex; }
.tooltip      { opacity: 0; pointer-events: none; }
.tooltip-wrap:hover .tooltip { opacity: 1; }
```

| Element | Spec | Rule |
| --- | --- | --- |
| .tooltip | 11px / 600, --d800 bg, --r-md, pad 5px 10px | Max one sentence. No interactive elements inside. |
| Position | bottom: calc(100% + 8px) | Always above trigger. Arrow points down via CSS border trick. |
| Max width | implicit (white-space: nowrap) | If content wraps, use a modal or callout instead. |

## Empty & Loading States

Every data surface must handle three states: loading (skeleton), empty (no data), and error (failed fetch). Never show a blank white area, always render the correct state component.

### Skeleton Loader

Skeletons mirror the exact shape of the content they replace. Use the same grid/layout as the loaded state so there is zero layout shift on load.

| Class | Height | Radius | Use |
| --- | --- | --- | --- |
| .skeleton-text | 12px | --r-xs | Body copy lines, meta text, sub-labels |
| .skeleton-title | 20px | --r-sm | Card titles, section headings, agent names |
| .skeleton-block | explicit | --r-xl (or custom) | Avatars, icon boxes, score rings, images |

```html
<!-- Title line -->
<div class="skeleton skeleton-title" style="width:60%"></div>

<!-- Body text line -->
<div class="skeleton skeleton-text" style="width:100%"></div>

<!-- Avatar / icon block -->
<div class="skeleton skeleton-block"
  style="width:34px;height:34px;border-radius:var(--r-lg)"></div>

<!-- Progress bar track skeleton -->
<div class="skeleton skeleton-block"
  style="height:6px;border-radius:var(--r-pill)"></div>
```

### Empty States

Three flavors: no-data (neutral), filtered-empty (interactive, offer to clear filters), and error (red icon, retry CTA).

```html
<div class="empty-state">
  <div class="empty-state-icon">📋</div>
  <div class="empty-state-title">No evaluations yet</div>
  <div class="empty-state-desc">
    Evaluations will appear here once agents complete their first scored interaction.
  </div>
  <button class="btn btn-brand btn-sm">Import Evaluations</button>
</div>

<!-- Error variant -->
<div class="empty-state" style="border-color:rgba(138,71,63,0.14)">
  <div class="empty-state-icon" style="background:var(--err-bg)">⚠</div>
  <div class="empty-state-title" style="color:var(--err)">Failed to load</div>
  <div class="empty-state-desc">Description</div>
  <button class="btn btn-err btn-sm">Retry</button>
</div>
```

### Inline Spinner

Used inside buttons during async actions and in small feed areas. Never replace a full card grid with a spinner, use skeletons instead.

```html
/* Add to :root or global styles */
@keyframes spin {
  to { transform: rotate(360deg); }
}

<!-- Button with inline spinner -->
<button class="btn btn-brand" disabled>
  <svg style="width:13px;height:13px;animation:spin 0.8s linear infinite"
    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83
           M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
  Processing…
</button>
```

## Accessibility

AiMY QA targets WCAG 2.1 AA. These are the non-negotiable rules, not aspirational guidelines. Every new component ships with these applied.

### Focus Rings

Tab through the elements below to see the focus ring. Always `--brand` blue, never the QA accent, which is a placeholder and will change.

```html
/* Global focus, only :focus-visible, never :focus */
*:focus { outline: none; }

button:focus-visible,
a:focus-visible,
[role="button"]:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--brand);
  outline-offset: 2px;
  border-radius: var(--r-md);
}
```

### Color Contrast

All text-on-background pairs used in the product. Minimum AA (4.5:1 for normal text, 3:1 for large/bold ≥18px or bold ≥14px).

| Foreground | Background | Ratio | Grade | Used on |
| --- | --- | --- | --- | --- |
| --d50 #f5f7fb | --card-bg #141b24 | **12.1:1** | AAA | Card titles, primary body text |
| --d300 #a8b5c5 | --card-bg #141b24 | **6.4:1** | AA | Secondary text, field labels, nav items |
| --d400 #93a2b4 | --card-bg #141b24 | **4.1:1** | AA Large | Sub-labels, hints, only at 12px+ bold or 14px+ |
| --ok #4ed6a1 | --card-bg #141b24 | **5.2:1** | AA | Pass labels, ok badge text |
| --warn #f7c95c | --card-bg #141b24 | **7.1:1** | AAA | Warning labels, borderline badge text |
| --err #ff7282 | --card-bg #141b24 | **4.8:1** | AA | Error labels, fail badge text |
| --brand #3369ff | --card-bg #141b24 | **3.8:1** | AA Large | Brand buttons (white text on top passes independently) |
| #fff | --brand #3369ff | **5.7:1** | AA | White text on .btn-brand, the primary CTA |

### ARIA Patterns

| Component | Required attributes | Notes |
| --- | --- | --- |
| Nav sidebar | `role="navigation"`, `aria-label="Main navigation"` | Active link: add `aria-current="page"` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title-id"` | Move focus to first focusable element on open. Return focus to trigger on close. Trap focus inside. |
| Toggle switch | Use native `<input type="checkbox">` | Label via visible `<label>` or `aria-label`. Never use a `<div>` alone. |
| Score ring | `role="img"` on outer div, `aria-label="Score: 88%, Pass"` | SVG is decorative, mark `aria-hidden="true"` on both circles. |
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"` | Include `aria-label` with category name. |
| Icon-only button | `aria-label="descriptive action"` | Never rely on a tooltip alone to convey the action. |
| Live signal badge | `role="status"`, `aria-live="polite"` | Only use `aria-live="assertive"` for critical alerts (P1 justifys). |
| Masked API input | `autocomplete="off"`, `autocomplete="new-password"` | Prevents browser autofill from leaking credentials into the visible DOM. |
| Skeleton | `aria-busy="true"` on the container | Remove when content loads. Announce with `aria-live="polite"` region. |

### Reduced Motion

> **Info:** All animations and transitions must respect `prefers-reduced-motion`. The skeleton shimmer, signal dot blink, score ring fill, and card hover lifts are all animated, include the override below in your global stylesheet.

```html
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:   0.01ms !important;
    animation-iteration-count: 1     !important;
    transition-duration:  0.01ms !important;
    scroll-behavior:      auto   !important;
  }
}
```

> **Warning:** **QA Accent placeholder reminder:** When `--qa-accent` is replaced with the real magenta from Figma, re-check focus ring contrast against `--body-bg` and `--card-bg`. The current purple (#8b4ff4) passes AA. The replacement must too.

## Float Input Bar

The primary AiMY interaction point. Lives absolutely at the bottom of `.app-main`. Pill-shaped, max 760px wide, centered. On focus it gains a `--qa-accent` glow ring and slides up the filter tray. On send it enters a "thinking" spinner state.

> **Info:** The float bar is **not** a standard `.input` field, it uses a bare `<input>` with `.aimy-float-input` so the caret matches `--qa-accent` and no default focus ring appears. Focus feedback is entirely on the outer `.aimy-float-bar` wrapper.

### Anatomy

### Thinking State

| Element | Spec | Notes |
| --- | --- | --- |
| .aimy-float-wrap | position absolute, bottom 20px, z-index 200 | Scoped to `.app-main`. `pointer-events: none` on wrapper so it doesn't block scroll. |
| .aimy-float-bar | max-width 760px, bg #1e2428, border-radius 40px, pad 8px | Default border `rgba(255,255,255,0.09)`. Gains QA accent glow on `:focus-within`. |
| .aimy-float-icon | 36×36px circle, qa-purple-to-blue gradient, 0.25 alpha glow | Always the AiMY logo SVG. Badge shows unread alert count via `.float-badge`. |
| .float-badge | 16px, --err bg, 1.5px body-bg border, top/right -3px | Hide when count = 0. Max display: 9+ if ≥10 alerts. |
| .aimy-float-input | flex 1, no border/outline, 13.5px/500, caret = --qa-accent | Exclude from global `:focus-visible` rule, wrapper handles focus UX. |
| .aimy-float-hint | 11px/500 --d500, no pointer events | Shows "Enter to send". Hidden when typing begins (JS adds opacity:0). |
| .aimy-float-send | 36×36px circle, --qa-accent bg, QA accent box-shadow | Hover: -1px lift + stronger glow. Active: scale(0.97). |
| .thinking state | Send bg → 25% qa-accent, spinner replaces arrow | Add class `.thinking` on send; remove after AI responds. |

```html
<!-- Float wrap (absolute, bottom of .app-main) -->
<div class="aimy-float-wrap" id="aimyFloatWrap">

  <!-- Filter tray lives here, see Filter Tray section -->

  <div class="aimy-float-bar" id="aimyFloatBar">

    <!-- Logo icon with optional unread badge -->
    <div class="aimy-float-icon">
      <span class="float-badge" aria-label="3 unread alerts">3</span>
      <!-- AiMY logo SVG -->
    </div>

    <!-- Text input -->
    <input class="aimy-float-input" id="aimyFloatInput"
           type="text"
           placeholder="Ask AiMY anything…"
           autocomplete="off"
           spellcheck="false" />

    <!-- Keyboard hint -->
    <span class="aimy-float-hint">Enter to send</span>

    <!-- Send / thinking button -->
    <button class="aimy-float-send" aria-label="Send to AiMY">
      <!-- arrow svg / .think-spinner -->
    </button>

  </div>
</div>
```

## Filter Tray

Appears above the float bar when the input is focused. A frosted pill container with dimension chips. Selecting a chip narrows the AiMY query scope (Company, Product, Agents, Time Period). The "Reset all" chip clears all active filters and triggers a `filterFlash` animation on the bar.

### States

| Element | Spec | Notes |
| --- | --- | --- |
| .filter-tray | absolute, bottom 70px, opacity 0 → 1 on .visible | Transition: opacity + translateY(6px→0) in 200ms. Pointer-events none until visible. |
| .filter-tray-inner | flex, gap 6px, pad 7px 12px, border-radius pill | Frosted glass: backdrop-filter blur(12px), bg rgba(20,27,36,0.9). |
| .filter-tray-label | 10px/700 uppercase --d600, right border separator | Static label. Never truncate. |
| .filter-chip | 11px/600, pad 4px 12px, pill shape | Default: subtle bg. Hover: qa-accent tint. Active: qa-accent-dim bg + border. |
| Reset chip | Same as .filter-chip | Clears all active chips and fires the filterFlash animation on .aimy-float-bar. |

```html
<!-- Inside .aimy-float-wrap, above .aimy-float-bar -->
<div class="filter-tray" id="filterTray"
     role="toolbar" aria-label="Filter by dimension">
  <div class="filter-tray-inner">
    <span class="filter-tray-label">Filter via AiMY</span>
    <button class="filter-chip" data-filter="Company">Company</button>
    <button class="filter-chip" data-filter="Product">Product</button>
    <button class="filter-chip" data-filter="Agents">Agents</button>
    <button class="filter-chip" data-filter="Time Period">Time Period</button>
    <button class="filter-chip" data-filter="All">Reset all</button>
  </div>
</div>
```

## Canvas Overlay

A frosted-glass layer that fills `.app-main` when AiMY is in active conversation. Not a blocking modal, sidebar and topbar stay interactive. Enters at opacity 0 → 1 with a 280ms ease-out. Closes on Escape or the close button.

> **Info:** The overlay uses **backdrop-filter: blur(28px) saturate(1.4) brightness(0.85)**, it blurs and slightly dims the content behind it without adding a solid black dim. This preserves context while clearly separating the conversation space.

### Live Demo

| Element | Spec | Notes |
| --- | --- | --- |
| .aimy-overlay | position absolute inset 0, z-index 500, blur(28px) sat(1.4) bright(0.85) | Add `.open` to reveal. Remove to close. Transition: opacity 280ms ease-out. |
| .overlay-badge | abs top-28px center-x, pill, 11px/700 uppercase --d400 | AiMY logo + "AiMY Canvas" label. Fades in with 100ms delay after overlay opens. |
| .overlay-close | abs top-24px right-28px, 36×36px, r-10px | Fades in with overlay. SVG ✕. Keyboard: Escape key also closes. |
| .overlay-thread | max-width 720px, flex column, gap 16px, scroll | Padded top 80px to clear badge. `aria-live="polite"` for screen readers. |
| .overlay-suggestions | flex wrap, gap 7px, centered | Visible only when thread is empty. Hide with JS once first message appears. |
| .overlay-sugg-chip | 12px/600, pill, hover qa-accent tint | Clicking pre-fills the input and triggers a send. |
| .overlay-input-bar | max-width 720px, pill, same bg as float bar | Gains qa-accent glow ring on :focus-within. |

## Chat Messages

Three message types rendered inside `.overlay-thread`: AiMY (left-aligned), User (right-aligned), and an error variant. Avatar is 28×28px with an 8px radius, **square-ish, not circular**. The AiMY avatar uses a purple-tinted dark background with the AiMY logo SVG. The user avatar uses a blue-purple gradient with initials. Border-radius asymmetry signals the speaker: flat top-left for AiMY, flat top-right for user.

| Element | Class | Notes |
| --- | --- | --- |
| Row | `.chat-msg` | flex, `gap:10px; align-items:flex-start; padding:0 4px`. Default = AiMY (left). Add `.user` for `flex-direction:row-reverse` |
| AiMY avatar | `.msg-avatar.aimy-av` | 28×28px, `border-radius:8px` (square-ish). `background:rgba(70,40,140,0.35); border:1px solid rgba(139,79,244,0.3)`. Contains AiMY logo SVG 14×16px |
| User avatar | `.msg-avatar.user-av` | 28×28px, `border-radius:8px`. `background:linear-gradient(135deg,#7c3aed,#3369ff)`. Contains initials in 9px/700 |
| AiMY bubble | `.chat-msg.aimy .msg-bubble` | `border-radius:4px 12px 12px 12px`. Flat top-left. Subtle white tint bg + white-8% border |
| User bubble | `.chat-msg.user .msg-bubble` | `border-radius:12px 4px 12px 12px`, flat top-right. `--qa-accent` tint 14% + 22% border |
| Bubble text | `.msg-bubble` | 14px/500, `--d50`, `line-height:1.6`. `max-width:540px; padding:12px 16px` |
| Typing indicator | `.typing-dots` | 3 × 6px dots, `--d500` fill. Each bounces via `typingBounce` keyframe with 0.15s stagger. Rendered inside a bare `.msg-bubble` without text |
| Error bubble | `.msg-error-bubble` | Replaces `.msg-bubble` content. `--err-bg` tint, err-colored icon, 13px text. Rendered inside a `.msg-bubble` with `padding:0; background:none; border:none` |

```html
<!-- AiMY message -->
<div class="chat-msg aimy">
  <div class="msg-avatar aimy-av">
    <svg width="14" height="16" viewBox="0 0 18 20"><use href="#aimy-logo-small"/></svg>
  </div>
  <div class="msg-bubble">AI response text here.</div>
</div>

<!-- User message -->
<div class="chat-msg user">
  <div class="msg-bubble">User query text here.</div>
  <div class="msg-avatar user-av">NK</div>
</div>

<!-- Error bubble -->
<div class="chat-msg aimy">
  <div class="msg-avatar aimy-av">...</div>
  <div class="msg-bubble" style="padding:0;background:none;border:none">
    <div class="msg-error-bubble">
      <!-- err SVG icon -->
      I couldn't retrieve that data right now.
    </div>
  </div>
</div>
```

## AiMY Toast

Two toast variants exist across the product. Both share the same base shape: fixed bottom-center, glass-frosted surface, 14px radius, slide-up + scale entrance at 220ms ease-spring. They differ in purpose and content.

### Variant 1, AiMY Canvas Toast (`.aimy-toast`)

Used after chip dismissal on the main dashboard. Contains an AiMY logo icon (qa-accent tinted), title, subtitle, a hairline divider, an undo button, and an animated progress bar that runs 5 seconds along the bottom edge using the AI gradient. Centered horizontally at `bottom:90px`.

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.aimy-toast` | `position:fixed; bottom:90px; left:50%; transform:translateX(-50%) translateY(20px) scale(0.97)`. Hidden: `opacity:0; visibility:hidden`. Add `.visible` to show |
| Icon | `.aimy-toast-icon` | 30×30px, 9px radius. `background:rgba(--qa-accent-rgb,0.1); border:1px solid rgba(--qa-accent-rgb,0.2)`. Contains AiMY logo SVG 13px |
| Body | `.aimy-toast-body` | flex-column, `gap:1px; flex:1` |
| Title | `.aimy-toast-title` | 12px/700, `--d50`, `letter-spacing:-0.005em` |
| Subtitle | `.aimy-toast-sub` | 11px/400, `--d400` |
| Divider | `.aimy-toast-divider` | 1px × 28px vertical line, `rgba(255,255,255,0.08)` |
| Undo | `.aimy-toast-undo` | 12px/700, `#61adf1`. Only present when action is reversible. Calls undo logic + hides toast |
| Progress bar | `.aimy-toast-progress` | 2.5px strip, full-width, `position:absolute; bottom:0; left:0`. AI gradient fill. Animates `scaleX(1→0)` over 5s via `toast-countdown` keyframe |

### Variant 2, justifys Toast (`.disp-toast`)

Used after decision actions in the justifys workflow. Simpler, no undo button, no progress bar. Icon uses semantic ok/err tint (not qa-accent). Same positioning and entrance animation.

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.disp-toast` | Same position + entrance as `.aimy-toast`. No progress bar, no undo |
| Icon | `.disp-toast-icon.ok` / `.err` | 28×28px, 8px radius. ok: `--ok-bg` bg + `--ok` color. err: `--err-bg` + `--err` |
| Title | `.disp-toast-title` | 12px/700, `--d50` |
| Subtitle | `.disp-toast-sub` | 11px, `--d400` |

```html
<!-- Canvas toast (chip dismissal, undo) -->
<div class="aimy-toast" id="aimyToast" role="status" aria-live="polite">
  <div class="aimy-toast-icon">
    <svg width="13" height="15" viewBox="0 0 18 20"><use href="#aimy-logo-small"/></svg>
  </div>
  <div class="aimy-toast-body">
    <span class="aimy-toast-title">Suggestion dismissed</span>
    <span class="aimy-toast-sub">AiMY will surface fewer of these.</span>
  </div>
  <div class="aimy-toast-divider"></div>
  <button class="aimy-toast-undo" onclick="undoToast()">Undo</button>
  <div class="aimy-toast-progress"></div>
</div>

<!-- justifys toast (decision confirmation, no undo) -->
<div class="disp-toast" id="dispToast">
  <div class="disp-toast-icon ok" id="dispToastIcon"><!-- ok/err SVG --></div>
  <div>
    <div class="disp-toast-title">Decision logged</div>
    <div class="disp-toast-sub">Audit trail updated · Agent notified</div>
  </div>
</div>
```

## AiMY Badge

Two components. **aimy-badge**, a teal-tinted inline tag for AI-authored content (scores, narratives). **aimy-float-icon**, the circle avatar used inside the canvas text input bar AND in the float bar. Its background is a deep purple-to-navy gradient (`linear-gradient(135deg, #3d1f6b, #1a3a6e, #163b5e)`) with a purple border and a soft glow, not a plain dark bg. The logo SVG inside must be 18×20 to match the `viewBox="0 0 18 20"`.

| Variant | Spec | Used for |
| --- | --- | --- |
| `.aimy-badge` | inline-flex, 9px/700 uppercase, `#61adf1`, opacity 0.7, `margin-left:auto` | Tags AI-scored content. Appears on briefing cards, evaluation rows, narrative cards. |
| `.aimy-float-icon` | 36px circle. Background: `linear-gradient(135deg, #3d1f6b 0%, #1a3a6e 50%, #163b5e 100%)`. Border: `rgba(139,79,244,0.3)`. Box-shadow: `0 0 12px rgba(100,60,200,0.25)`. SVG: 18×20px | Used in canvas text input bar AND float bar. The gradient+glow is what makes the SVG visible against dark backgrounds. |
| `.float-badge` | 16px circle, `--err` bg, 9px/800, top/right -3px on `.aimy-float-icon` | Unread alert count on the float bar icon. Hide when count = 0. |

```html
<!-- AI-authorship badge -->
<span class="aimy-badge">
  <!-- AiMY logo SVG (11px) -->
  AiMY
</span>

<!-- Unread count badge on float icon -->
<div class="aimy-float-icon">
  <span class="float-badge" aria-label="3 unread alerts">3</span>
  <!-- logo SVG -->
</div>
```

## Goal Hub Shell

The Goal Hub is a four-tab admin interface. The page header contains title + subtitle + a global action button. The tab bar sits directly below the header, full-width. Each tab panel is an independent scroll container. Admin-only tabs are hidden entirely for QA Manager role, never grayed or locked.

| Element | Class | Notes |
| --- | --- | --- |
| Page | `.goal-hub-page` | Full-height scroll container. `padding:24px 32px` |
| Header | `.goal-hub-header` | flex space-between, `gap:12px; margin-bottom:16px`. Left: `.goal-hub-header-left` |
| Title | `.goal-hub-title` | 22px/800, `--d50`, `letter-spacing:-0.02em` |
| Subtitle | `.goal-hub-subtitle` | 13px, `--d400`, `margin-top:3px` |
| Tab bar | `.goal-tab-bar` | flex, `gap:2px; border-bottom:1px solid rgba(255,255,255,0.07); flex-shrink:0`. Underline pattern, no pill container, no background. Full width |
| Tab | `.goal-tab` | 12px/600, `--d400`. `border-bottom:2px solid transparent; margin-bottom:-1px`. Add `.active`: `--d50` text + `border-bottom-color:--qa-accent`. Tab icon stroke matches text color; active: qa-accent stroke. Tabs have SVG icons, not icon-only, label is always visible |
| Tab badge | `.admin-tab-badge` | 16px qa-accent circle, 9px/800. Shown on Governance tab when there are pending approvals |
| Tab panel | `.goal-tab-panel` | Full-width panel below tab bar. `display:none` base, `display:block` when tab active |
| Tab toolbar | `.goal-tab-toolbar` | flex space-between, `padding:16px 0 12px`. Holds search/filter controls + view toggle |
| Admin only | `.admin-only` | `display:none` for QA Manager role. JS sets visibility based on `currentRole`. Never gray, remove entirely |

## Template Card

The core unit of the Templates tab. Cards live in a responsive auto-fill grid via `.template-gallery`. Three type variants: **System** (platform-provided, read-only), **Custom** (team-created), **Forked** (customised from system). `.tpl-active-badge` marks the currently applied template with a blinking dot. `.tpl-card-ai-actions` fades in on hover. List-view applies `.list-view` to the gallery wrapper for a row layout override.

| Element | Class | Notes |
| --- | --- | --- |
| Gallery | `.template-gallery` | `display:grid; grid-template-columns:repeat(auto-fill,minmax(220px,1fr)); gap:12px`. Add `.list-view` for row layout |
| Section label | `.template-section-label` | 9px/700, uppercase, `--d500`. Groups System vs Custom cards. `grid-column:1/-1` to span full width |
| Card | `.tpl-card` | card-bg, card-border, 14px radius, 18px padding, flex-column gap 10px. `::after` inner highlight gradient. Hover: lift + border lighten |
| Selected | `.tpl-card.selected` | qa-accent border + double ring shadow |
| Type badge | `.tpl-type-badge.system/.custom/.forked` | 9px/700 uppercase pill. system=brand blue, custom=qa-accent, forked=teal |
| Active badge | `.tpl-active-badge` | ok-tinted pill with `.tpl-active-dot` (5px blinking circle) |
| Name | `.tpl-card-name` | 14px/700, `--d50`, `letter-spacing:-0.01em; line-height:1.3` |
| Desc | `.tpl-card-desc` | 11px, `--d400`. 2-line clamp via `-webkit-line-clamp:2` |
| Meta tags | `.tpl-card-meta` | flex, `gap:6px; flex-wrap:wrap`. Holds `.tpl-industry-tag` + `.tpl-channel-tag` |
| Industry tag | `.tpl-industry-tag` | 10px/600, ghost pill, `--d300` |
| Channel tag | `.tpl-channel-tag` | 10px/600, ghost pill, `--d400`. Holds 10px channel SVG icon |
| Footer | `.tpl-card-footer` | flex space-between, top border. `.tpl-goal-count` (11px/700, --d300) + `.tpl-updated` (10px, --d600) |
| AI actions | `.tpl-card-ai-actions` | Fades in on hover. Contains "AiMY: Suggest improvements" btn + "Fork" ghost btn. When following footer, footer border is removed |

## Intel Bar

A summary strip below the Templates tab toolbar. Shows aggregate stats about the current template set: active template name, total goal count, last review date, and AiMY health signal. Read-only, no interactive controls.

| Element | Class | Notes |
| --- | --- | --- |
| Bar | `.intel-bar` | flex, `gap:16px; padding:12px 16px; flex-wrap:wrap`. Ghost bg + hairline border, 10px radius |
| Stat | `.intel-stat` | flex-column, `gap:2px` |
| Label | `.intel-stat-label` | 9px/700, uppercase, `--d500` |
| Value | `.intel-stat-value` | 13px/700, `--d50` |
| Divider | `.intel-divider` | 1px × 28px, `rgba(255,255,255,0.07)` |
| AiMY signal | `.intel-aimy-signal` | flex, gap 7px, `margin-left:auto`. AiMY logo SVG + status text in semantic color |

## Metric Card (Registry)

The Metric Registry tab displays each metric as a card in a responsive grid (`.metric-card-grid`). Each card shows: name, type badge, source, description, and usage count. Clicking a card opens the `.mdo-*` detail overlay. The grid supports filtering via the tab toolbar's search + type filter.

| Element | Class | Notes |
| --- | --- | --- |
| Grid | `.metric-card-grid` | `display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:10px` |
| Card | `.metric-card` | card-bg, card-border, 12px radius, 16px padding, flex-column gap 8px. Hover: border lighten |
| Header | `.metric-card-header` | flex space-between, gap 8px. Holds name + type badge |
| Name | `.metric-card-name` | 13px/700, `--d50`, `letter-spacing:-0.005em` |
| Type badge | `.metric-card-type` | 9px/700 uppercase pill. Types: Time (brand blue), Score (qa-accent), Boolean (teal), Percentage (ok), Deprecated (err) |
| Source | `.metric-card-source` | 10px/600, `--d500` |
| Desc | `.metric-card-desc` | 11px, `--d400`, `line-height:1.5; flex:1` |
| Footer | `.metric-card-footer` | flex space-between, top border. `.metric-card-usage` (10px/600) + chevron arrow |

## Governance Change Request Card

Used in the Governance tab to surface pending goal weight or scoring changes awaiting approval. Each card shows who submitted the change, what changed, and the proposed vs current values. Approve/Reject action buttons live in the card footer. Admin-only, hidden for QA Manager role.

| Element | Class | Notes |
| --- | --- | --- |
| Card | `.gov-cr-card` | card-bg, card-border, 12px radius, 16px padding, flex-column gap 12px |
| Header | `.gov-cr-header` | flex space-between. Left: title (12px/700) + submitter (10px, --d500). Right: status badge |
| Status | `.gov-cr-status.pending/.approved/.rejected` | pending=warn, approved=ok, rejected=err tinted pills |
| Value diff | `.gov-cr-diff` | Ghost bg, flex row. `.gov-cr-current` (--d300) → arrow → `.gov-cr-proposed` (qa-accent) |
| Rationale | `.gov-cr-rationale` | 11px, --d400, `line-height:1.55`. Quoted submitter justification |
| Actions | `.gov-cr-actions` | flex, gap 8px, top border. Approve (ok tint) + Reject (err tint) + Discuss (ghost) |

## Permission Matrix

A table mapping roles to Goal Hub capabilities. Rows = capabilities, columns = roles. Each cell is a boolean tick or dash. Rendered as a structured table inside the Governance tab. The `.perm-matrix-note` below the table clarifies what each role can and cannot do in plain language.

| Element | Class | Notes |
| --- | --- | --- |
| Table | `.perm-matrix` | Standard HTML `<table>`. `border-collapse:separate`. Full width, overflow-x:auto wrapper |
| Header cell | `.perm-matrix th` | 9px/700 uppercase, `--d500`. Role columns center-aligned |
| Capability cell | `.perm-matrix td:first-child` | 11px/600, `--d200`. Full capability description |
| Permission cell | `.perm-cell.allowed/.denied` | allowed: ok-colored ✓ (font-weight:800). denied: d600-colored, (font-weight:600). Center-aligned |
| Note | `.perm-matrix-note` | 10px, `--d500`, `margin-top:10px; line-height:1.5`. Plain-language role summary |

## Health Card

Cards in the Audit & Health tab showing data coverage, detected issues, and scoring variance for each goal metric. Three severity states: **ok** (green icon), **warn** (amber border + icon), **crit** (red border + icon). The coverage bar animates on mount via `transform:scaleX()`. Alert rows list per-client data gaps. Variance chip signals inter-rater reliability.

| Element | Class | Notes |
| --- | --- | --- |
| Grid | `.health-grid` | `display:grid; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); gap:12px` |
| Card | `.health-card` | card-bg, card-border, 14px radius, 18px padding, flex-column gap 14px. Add `.warn` or `.crit` for colored border |
| Header | `.health-card-header` | flex space-between, gap 10px. Holds metric name/source + severity icon |
| Severity icon | `.health-severity-icon.ok/.warn/.crit` | 28×28px, 7px radius. Semantic tint bg + color + 13px SVG stroke |
| Metric name | `.health-metric-name` | 13px/700, `--d100`, `letter-spacing:-0.01em` |
| Source | `.health-metric-source` | 10px, `--d500`, `margin-top:2px` |
| Coverage row | `.health-coverage-row` | flex-column, gap 5px. Holds label row + bar |
| Coverage pct | `.health-coverage-pct.ok/.warn/.crit` | 14px/800, semantic color |
| Bar track | `.health-bar-track` | 5px height, rgba(255,255,255,0.07) bg, 3px radius, overflow hidden |
| Bar fill | `.health-bar-fill.ok/.warn/.crit` | Semantic color fill. Animates via `transform:scaleX()` on mount, 0.65s |
| Alert row | `.health-alert-row` | flex space-between, 10px font, ghost bg+border, 6px radius. Holds `.health-alert-client` + `.health-alert-pct.warn/.crit` |
| Variance chip | `.health-variance-chip.low/.medium/.high` | 10px/700 pill. low=ok, medium=warn, high=err tints |

## goal Detail Overlay

A fixed-position overlay panel opened when a template card or goal row is clicked. Two-column body: left pane shows a radial weight chart + goal category breakdown; right pane shows a version history toggle + active client list + AiMY action zone. Entrance: `translateY(16px) → 0` at 240ms ease-spring. Shares the same `#151d28` deep-dark surface as the scorecard editor.

| Element | Class | Notes |
| --- | --- | --- |
| Shell | `.kdo-shell` | `background:#151d28; border-radius:20px; overflow:hidden; max-height:90vh; display:flex; flex-direction:column`. Fixed positioned, centered |
| Header | `.kdo-header` | flex, `gap:16px; padding:20px 24px`. Bottom border, subtle bg tint. Holds left + right stacks |
| Type badge | `.kdo-type-badge` | 9px/700 uppercase pill, brand blue tint by default |
| Title | `.kdo-title` | 18px/800, `--d50`, `letter-spacing:-0.02em`. Truncated with ellipsis |
| Subtitle | `.kdo-subtitle` | 11px, `--d400`, `line-height:1.4` |
| Body grid | `.kdo-body` | `display:grid; grid-template-columns:280px 1fr; flex:1; overflow:auto` |
| Left pane | `.kdo-left` | 280px, right border, 24px/20px padding, overflow-y scroll (3px thumb) |
| Right pane | `.kdo-right` | flex:1, 24px padding, flex-column gap 20px, overflow-y scroll |
| Section label | `.kdo-section-label` | 9px/700, uppercase, `--d600`. flex space-between. Right side holds `.kdo-weight-badge` |
| Weight badge | `.kdo-weight-badge` | 11px/800, `--ok`. Add `.err` when weights don't sum to 100% |

### Left pane sub-components

| Class | Role | Notes |
| --- | --- | --- |
| `.kdo-radial-wrap` | Radial chart + legend container | flex-column, centered, gap 16px, margin-bottom 20px |
| `.kdo-radial-svg` | SVG donut chart | Segments colored per category. Hover segment expands + glows |
| `.kdo-radial-legend` | Legend list | flex-column, gap 6px, full width |
| `.kdo-legend-row` | Single legend entry | flex, gap 8px, 11px. Holds dot + name (flex:1) + pct |
| `.kdo-legend-dot` | 8px color circle | Matches SVG segment color |
| `.kdo-goal-cats` | Category rows | flex-column, gap 8px |
| `.kdo-cat-row` | Single category | flex, gap 12px, ghost bg + border, 10px radius. Hover: border lighten |
| `.kdo-cat-icon-wrap` | 32px icon box | 8px radius, ghost bg + border, emoji/icon centered |
| `.kdo-cat-right` | Pct + mini bar | 56px wide, flex-column. `.kdo-cat-pct` (16px/800) + `.kdo-cat-bar/.kdo-cat-bar-fill` (3px) |

### Right pane sub-components

| Class | Role | Notes |
| --- | --- | --- |
| `.kdo-client-row` | Active client row | flex, gap 10px, 8px 0 padding, bottom border. `.kdo-client-dot` (6px ok circle) + `.kdo-client-name` + `.kdo-client-evals` |
| `.kdo-no-clients` | Empty state | 11px, --d600, italic |
| `.kdo-version-toggle` | Version list toggle btn | Ghost pill, 9px/700 uppercase. Toggles `.kdo-version-list.open` |
| `.kdo-version-list` | Version entries | max-height:0 → 400px, opacity 0→1 at 280ms. Add `.open` to expand |
| `.kdo-version-item` | Single version | flex, gap 10px, ghost bg+border, 8px radius. Add `.current`: ok tint |
| `.kdo-version-item-rollback` | Rollback button | warn tint btn. Only on non-current versions |
| `.kdo-aimy-zone` | AiMY action block | Blue tint bg + border, 14px radius, 18px padding. Pushed to bottom via `margin-top:auto` |
| `.kdo-action-chip.primary/.secondary/.ghost` | Action buttons | primary=qa-accent solid, secondary=teal tint, ghost=white tint |

## Metric Detail Overlay

Opened when a metric card is clicked in the Registry tab. Simpler than the goal overlay, single-column body with labeled fields: description, formula (monospace), unit, data source, dependencies (pills), and a deprecation warning when applicable. Footer holds Edit + Close buttons. Shares the same shell dimensions and entrance animation as the goal overlay.

| Element | Class | Notes |
| --- | --- | --- |
| Header | `.mdo-header` | flex, gap 12px, `padding:20px 24px 16px`, bottom border. Holds `.mdo-header-info` + close btn |
| Name | `.mdo-name` | 17px/800, `--d50`, `letter-spacing:-0.02em; margin-bottom:4px` |
| Meta row | `.mdo-meta` | flex, gap 8px, flex-wrap. Holds type badge + source text |
| Body | `.mdo-body` | flex:1, overflow-y auto, padding 24px, flex-column gap 18px |
| Field | `.mdo-field` | flex-column, gap 5px |
| Field label | `.mdo-label` | 9px/700, uppercase, `--d600` |
| Field value | `.mdo-value` | 12px, `--d200`, `line-height:1.55` |
| Formula | `.mdo-formula` | Monospace, 11px, dark bg, teal color. For calculated metrics |
| Deps | `.mdo-deps` | flex, gap 6px, flex-wrap. Holds `.mdo-dep-tag` ghost pills |
| Deprecation warn | `.mdo-depr-warn` | Warn-tinted block, flex, gap 8px. Warn SVG icon + plain text. Only on deprecated metrics |
| AiMY zone | `.mdo-aimy-zone` | Blue tint, 12px radius. Header: `.mdo-aimy-header` (10px/700, uppercase, #61adf1) |
| Footer | `.mdo-footer` | padding 14px 24px, top border, flex right-aligned. Close + Edit metric |

## Scorecard Editor

A full-screen overlay that replaces the Goal Hub page when creating or editing a scorecard. Entrance: `translateY(16px) → 0`, 240ms ease-spring. Two-column body (340px left / 1fr right). Left holds metadata fields. Right holds the category editor with a live weight summary bar. The weight bar turns `.err` when category weights don't sum to 100%.

| Element | Class | Notes |
| --- | --- | --- |
| Overlay | `.editor-overlay` | `position:fixed; inset:--topbar-height 0 0 0; z-index:800; background:#0f161e`. `opacity:0; transform:translateY(16px)` base. Add `.open` |
| Topbar | `.editor-topbar` | 56px, `background:#141b24`, bottom border. 3-section flex: left/center/right |
| Back btn | `.editor-back-btn` | 30px square, 7px radius, ghost. Chevron-left SVG |
| Breadcrumb | `.editor-breadcrumb` | flex, 12px. `.editor-bc-parent` (500 weight, --d400) → chevron → `.editor-bc-current` (700, --d100) |
| Fork badge | `.editor-fork-badge` | Teal-tinted pill. Shown only when editing a forked template |
| Draft btn | `.editor-draft-btn` | Ghost, 12px/700. "Save draft" |
| Publish btn | `.editor-publish-btn` | qa-accent solid. Add `disabled` when weights ≠ 100%, opacity 0.4, no-drop cursor |
| Body grid | `.editor-body` | `display:grid; grid-template-columns:340px 1fr; flex:1; overflow:hidden` |
| Left pane | `.editor-left` | 340px, right border, 28px 24px padding. Holds metadata sections |
| Right pane | `.editor-right` | flex:1, 28px 32px padding. Holds weight summary + category list + add btn |
| Section | `.editor-section` | flex-column, gap 16px |
| Section header | `.editor-section-header` | flex space-between, gap 12px, margin-bottom 4px |
| Section title | `.editor-section-title` | 11px/700, uppercase, `--d600` |
| Field | `.editor-field` | flex-column, gap 6px |
| Label | `.editor-label` | 10px/700, uppercase, `--d500` |
| Input | `.editor-input` | Dark tinted, 8px radius. Focus: qa-accent border |
| Textarea | `.editor-textarea` | Same as input, resize:vertical, min-height 64px |
| Select | `.editor-select` | Same as input, `-webkit-appearance:none` |

### Weight summary + category rows

| Class | Role | Notes |
| --- | --- | --- |
| `.editor-weight-summary` | Weight status panel | Ghost bg, 10px radius. Add `.err`: err tint bg + border when total ≠ 100% |
| `.editor-weight-pct` | Total percentage | 16px/800, --d50 |
| `.editor-weight-status.ok/.err/.warn` | Status label | 10px/700, uppercase, semantic color |
| `.editor-weight-bar-fill.over/.under` | Weight bar fill | ok (balanced), over=err (>100%), under=warn (<100%). Animates via transform:scaleX |
| `.editor-weight-hint` | Error hint text | 11px, err color. "Weights must sum to exactly 100%". Only shown when .err |
| `.editor-categories` | Category list | flex-column, gap 10px |
| `.editor-cat-row` | Single category | `grid-template-columns:32px 1fr 90px 32px`. drag handle \| name+criteria \| weight col \| remove btn |
| `.editor-cat-drag` | Drag handle | drag-dots SVG, cursor grab, --d600 |
| `.editor-cat-name-input` | Category name field | 12px/700, 6px radius, qa-accent focus border |
| `.editor-cat-criteria` | Scoring criteria textarea | 11px/400, no-resize, min-height 52px |
| `.editor-cat-weight-input` | Weight number input | 80px, right-aligned, 16px/800, qa-accent focus border |
| `.editor-cat-remove` | Remove btn | Ghost × icon, --d600 |
| `.editor-add-cat-btn` | Add category | Teal tint btn, 11px/700, + SVG icon |

## Governance Layout

The Governance tab uses a two-column layout: a scrollable main column for change request cards, and a fixed sidebar for status filter chips. Section headers inside the main column group change requests by type (Weight Changes, goal Additions, Deprecations). Each header holds a section title + a status filter strip. The active `.gov-filter-chip` uses qa-accent tint; pending chips show a warn-colored count badge.

| Element | Class | Notes |
| --- | --- | --- |
| Layout | `.governance-layout` | `display:grid; grid-template-columns:1fr 340px; gap:0` |
| Main | `.governance-main` | overflow-y auto, `padding:24px 32px 32px`, right border |
| Sidebar | `.governance-sidebar` | `padding:24px 24px 0`. Contains status filter chips |
| Section header | `.governance-section-header` | flex, gap 12px, margin-bottom 16px. Holds `.governance-section-title` + `.governance-status-filters` |
| Section title | `.governance-section-title` | 11px/700, uppercase, `--d600` |
| Status filters | `.governance-status-filters` | flex, gap 4px, flex-wrap, `margin-left:auto`. Inline chip strip in the section header |
| Filter chip | `.gov-filter-chip` | 10px/600, ghost pill. Add `.active`: qa-accent tint. Contains optional `.gov-chip-count` |
| Count badge | `.gov-chip-count` | 8px/800, warn-tinted mini pill. Shows pending item count. Only on "Pending" chip |

## Roster Panel

The agent list sidebar on the Scorecards page. A sticky panel with a search input, sort dropdown, scrollable row list, and a pagination footer. Sort is handled by `.v2-dropdown.roster-dd` (full-width variant). Each row shows avatar with risk dot, name, meta, and an attention score block. Rows are sorted by a composite attention formula, not raw score.

### Panel structure

### Panel anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Panel | `.roster-panel` | `position:sticky; top:0; max-height:calc(100vh - --topbar-height - 48px)`. Stays in view while main content scrolls. flex-column |
| Header | `.roster-header` | 16px padding, bottom divider. Contains search + controls row |
| Search | `.roster-search` in `.roster-search-wrap` | Icon absolutely positioned left. Focus border: `rgba(--qa-accent-rgb, 0.4)` |
| Controls row | `.roster-controls` | flex, gap 8px. Contains `.v2-dropdown.roster-dd` (flex:1) + `.roster-count` |
| Count label | `.roster-count` | 10px/700, uppercase, `--d400`. Shows "N agents", updates when filtered |
| List | `.roster-list` | flex:1, overflow-y:auto. Thin scrollbar (6px). role="listbox" |
| Footer | `.roster-footer` | Pagination: count label + prev/next `.roster-page-btn` buttons |

### Roster row anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Row | `.roster-row` | flex, gap 10px, 10px padding, 10px radius, transparent border. Add `.is-selected` for active agent |
| Selected | `.roster-row.is-selected` | `background:rgba(--qa-accent-rgb, 0.08); border-color:rgba(--qa-accent-rgb, 0.25)` |
| Avatar | `.roster-avatar` | 32px circle, gradient bg (custom per agent). Always has `.risk-indicator` dot |
| Risk dot | `.risk-indicator.err/.warn/.ok` | 10px circle, bottom-right -1px. Border color matches panel bg. **Never omit**, even ok agents show green |
| Name | `.roster-name` | 13px/700, `--d50`, truncates with ellipsis |
| Meta | `.roster-meta` | 10px/500, `--d400`. Format: "N mo/yr · N evals" |
| Attention block | `.attention-score` | Right-aligned flex-column. Holds val + label + badge |
| Score value | `.attention-val.err/.warn/.ok` | 11px/800. Uses semantic colors, not neutral |
| Score label | `.attention-label` | 8px/600, uppercase, `--d500`. "Quality" |
| Status badge | `.attention-badge.urgent/.needs-action/.handled` | 9px/700 pill. urgent=err, needs-action=warn, handled=ok tints |

### Attention sort formula

attention = (100 − quality) × 0.5 + declineRate × 0.25 + (hasActivePlan ? −20 : 0) + Math.min(oldestActionDays, 30) × 0.5

Agents are sorted descending by attention score, highest attention (most at risk, least managed) first. A coaching plan deducts 20 points from the score, meaning managed agents naturally sink below unmanaged ones at the same quality level.

```html
<div class="roster-row is-selected" role="option" aria-selected="true" tabindex="0">
  <div class="roster-avatar" style="background:linear-gradient(135deg,#1a2a3a,#2d5c8e)">
    OA<span class="risk-indicator err"></span>
  </div>
  <div class="roster-info">
    <div class="roster-name">Omar Abdallah</div>
    <div class="roster-meta">5 mo · 89 evals</div>
  </div>
  <div class="attention-score">
    <span class="attention-val err">64%</span>
    <span class="attention-label">Quality</span>
    <span class="attention-badge urgent">Needs action</span>
  </div>
</div>
```

## Agent Header

The identity strip at the top of the agent detail panel. Large avatar (56px), full name, meta (role · team · coaching count), risk pill, and action buttons. Uses a subtle diagonal shimmer pseudo-element to add depth without a heavy gradient.

| Class | Spec | Notes |
| --- | --- | --- |
| .ds-agent-header | card-bg, card-border, radius 16px, flex, gap 16px, pad 20px 24px | Has diagonal shimmer pseudo-element (`::after` with linear-gradient 135deg). Overflow hidden to contain it. |
| .agent-header-avatar | 56px circle, 18px/800 | Same initials pattern as roster. Gradient set inline per agent. Never use a photo, initials only. |
| .agent-header-name | 20px/800, --d50, letter-spacing -0.02em | Full name only. Truncate with ellipsis if > 24 chars. |
| .brief-risk-pill.risk-err / .risk-warn / .risk-ok | 10px/700 uppercase, semantic bg/border/color, 6px risk-dot | Appears in the name row. Changes when the agent's risk state changes (client-side, no reload). Use only one risk pill per agent context. |
| .agent-header-meta | 12px/500, --d400, .sep = 0 6px margin, 0.5 opacity | Format: Role · Team · Coaching context. Keep to one line. |

```html
<div class="agent-header">
  <div class="agent-header-avatar" style="background:linear-gradient(135deg,#7c3aed,#3369ff)">FA</div>
  <div class="agent-header-info">
    <div class="agent-header-name-row">
      <span class="agent-header-name">Fatima Al-Rashid</span>
      <span class="brief-risk-pill risk-err"><span class="risk-dot"></span>At Risk</span>
    </div>
    <div class="agent-header-meta">
      Senior Agent <span class="sep">·</span> Renewals West
    </div>
  </div>
  <div class="agent-header-actions">
    <!-- action buttons -->
  </div>
</div>
```

## Lollipop Chart

Used in the Team view to compare all agents on a single goal. Each row is a horizontal axis with a stem line ending in a dot at the agent's score. A shared target line runs vertically across all rows. The dot's compound class encodes both color and trend direction: `.ok-up / .ok-stable / .warn-stable / .warn-down / .err-down`. Err-down dots pulse continuously via `@keyframes lolli-pulse`. Action buttons float absolutely over the right edge on hover.

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.lollipop-wrap` | `position:relative; margin-top:8px; padding:16px 16px 8px; overflow:visible` |
| Axis header | `.lollipop-axis` | Same 6-col grid as rows. Contains `.lollipop-axis-track` with tick labels and baseline |
| Row | `.lollipop-row` | `display:grid; grid-template-columns:28px 110px 1fr 60px 70px 80px; gap:12px`. `position:relative; overflow:visible`, required for action overlay |
| Rank badge | `.lollipop-rank.top/.bot` | 11px/800. top=ok, bot=err. Neutral ranks use `--d500` |
| Name cell | `.lollipop-name-cell` | flex, `gap:8px`. Holds 24px avatar + `.lollipop-name` (truncated) |
| Track | `.lollipop-track` | `position:relative; height:22px`. Contains baseline, target-tick, stem, dot, all absolutely positioned |
| Stem | `.lollipop-stem.ok/.warn/.err` | 1.5px high, left=0, width=score%. Gradient from transparent → semantic color at 50% opacity |
| Dot | `.lollipop-dot.ok-up/.ok-stable/.warn-stable/.warn-down/.err-down` | 12px circle, 2px card-bg border. Compound class for color + trend. `.err-down` pulses via `lolli-pulse` keyframe |
| Score | `.lollipop-score.err/.warn` | 13px/800, `--d50` default, semantic override for err/warn |
| Delta | `.lollipop-delta.ok/.warn/.err/.neu` | 10px/700. neu=`--d400` |
| Actions | `.lollipop-actions` | `position:absolute; right:10px`, floats over grid, revealed on row hover. Gradient fade-out left edge hides content behind it |
| Target line | `.lollipop-target-tick` | Vertical 1px line inside each track at the target score position. `.lollipop-target-wrap` wraps it with a hover tooltip |
| Legend | `.lollipop-legend` | Ghost bg strip below chart. Holds `.lollipop-legend-item` entries with `.lollipop-legend-dot` |

## Dot Plot

Maps each behavioral goal to a horizontal axis inside the `.behav-card`. Three background zones (fail/watch/target) create a visual triage at a glance before reading any number. Markers are numbered circles matching the compact list below, clicking a marker highlights the corresponding row. A target line at 85% is the primary benchmark. Hover reveals a tooltip with goal name, score, and trend.

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.dotplot-wrap` | `position:relative; margin:16px 4px 24px; padding:32px 60px 36px 16px`, generous right padding leaves room for the last marker's tooltip |
| Axis | `.dotplot-axis` | `position:relative; height:16px; margin-bottom:12px`. `.dotplot-axis-line` (horizontal rule) + `.dotplot-axis-tick` elements absolutely positioned at each score label |
| Target line | `.dotplot-target-line` | `position:absolute; top:28px; bottom:16px; width:1px` at `left:75%` (85% score mapped to axis). `::before` renders "TARGET 85%" label |
| Canvas | `.dotplot-canvas` | `position:relative; height:56px`. All zones and markers are inside |
| Zone | `.dotplot-zone.fail-zone/.watch-zone/.target-zone` | 8px tall, centered vertically, gradient fills. fail: 0–50%, watch: 50–75%, target: 75–100% |
| Marker | `.dotplot-marker.err/.warn/.ok` | 18px circle, numbered. `position:absolute; left:{pct}%; top:50%`. Border matches card bg. Hover: `scale(1.25)` |
| Marker tooltip | `.dotplot-marker-tip` | Hidden by default (`opacity:0`). Shows on marker `:hover`. qa-accent tinted border. `white-space:nowrap` |
| Legend | `.dotplot-legend` | flex, space-between. Left: `.dotplot-legend-zones` with swatch+label items. Right: "click for detail" hint |

**Score → axis position formula:** `left = (score − 40) / 60 × 100%`, maps the 40–100% score range to the full axis width.

## Heatmap

Two distinct heatmap components are used in the scorecards. **Variant A** (`.heatmap-card`) is a `<table>`-based goal × agent matrix in the Team view, agents as columns, goals as rows, each cell a colored score chip. **Variant B** (`.heatmap-grid`) is a CSS-grid coaching frequency heatmap, agents as rows, weeks as columns, showing at a glance which agents have been coached and when.

### Variant A, goal × Agent table (`.heatmap-card`)

| Element | Class | Notes |
| --- | --- | --- |
| Card | `.heatmap-card` | card-bg, card-border, 16px radius, `overflow:hidden` |
| Header | `.heatmap-header` | flex space-between, bottom divider. Right side: `.heatmap-legend` with `.heatmap-legend-scale` + `.hml-cell` swatches |
| Cell | `.hm-cell.hm-ok/.hm-warn/.hm-err/.hm-na` | 32×24px, 4px radius. Hover: `scale(1.15)` + white outline. Displays score as 2-digit number |
| Coached dot | `.hm-coached` | Add to a cell to show a 3px blue dot below, indicates a coaching event occurred that week |
| Heat scale | Inline class per score range | 60→h-60 (darkest red) through h-95 (richest green). Map score to nearest 5pt bucket |

### Variant B, Coaching frequency grid (`.heatmap-grid`)

| Element | Class | Notes |
| --- | --- | --- |
| Grid | `.heatmap-grid` | `display:grid; grid-template-columns:140px repeat(12,1fr); gap:3px`. Responsive: collapses to 8 cols at 1100px |
| Corner | `.heatmap-corner` | 10px/700 label in the top-left cell |
| Week label | `.heatmap-week-label` | 9px/700, centered, top row |
| Row label | `.heatmap-row-label` | 11px/700, `--d100`, truncated. Left column |
| Cell | `.heatmap-cell.h-60` through `.h-95` | `aspect-ratio:1; border-radius:3px; min-height:22px`. Heat classes set background opacity. Hover: `scale(1.18)` + white glow |
| N/A cell | `.heatmap-cell.h-na` | `rgba(255,255,255,0.04)` bg, no hover state |
| Legend | `.heatmap-legend` | flex row, Low → `.heatmap-legend-bar` (gradient strip) → High |

### Heat scale reference

| Class | Score bucket | Background |
| --- | --- | --- |
| `.h-95` | ≥95% | `rgba(78,214,161,0.72)` |
| `.h-90` | 90–94% | `rgba(78,214,161,0.56)` |
| `.h-85` | 85–89% | `rgba(78,214,161,0.40)` |
| `.h-80` | 80–84% | `rgba(247,201,92,0.52)` |
| `.h-75` | 75–79% | `rgba(247,201,92,0.38)` |
| `.h-70` | 70–74% | `rgba(255,114,130,0.48)` |
| `.h-65` | 65–69% | `rgba(255,114,130,0.60)` |
| `.h-60` | <65% | `rgba(255,114,130,0.72)` |
| `.h-na` | No data | `rgba(255,255,255,0.04)` |

## goal Mini Grid

A 6-column grid of compact goal tiles below the agent header. Each tile shows label, value (with optional unit), delta, and target. The `--err/warn/ok` color on `.goal-mini-value` is the only semantic signal, always pair it with the delta. Breaks to 3 columns below 1400px.

| Class | Spec | Notes |
| --- | --- | --- |
| .ds-goal-six-grid | grid, repeat(6, 1fr), gap 12px; → 3 cols at <1400px | Always exactly 6 tiles, one per core goal. If fewer goals, leave empty tiles rather than changing column count. |
| .goal-mini | card-bg, card-border, radius 12px, pad 14px | Hover: `card-border-hover`. Never add click behavior. These are display-only goal tiles. |
| .goal-mini-value.ok / .warn / .err | 22px/800, semantic color | Only color the value when it deviates from target. If exactly on target, use neutral --d50. |
| .km-unit | 12px/600, inherits parent color, 0.65 opacity | The unit abbreviation (%, min, etc.) inside the value. Never add spaces between value and unit in HTML. |
| .goal-mini-delta.ok / .warn / .err / .neu | 10px/700, semantic color | Period-over-period change with direction prefix. `.neu` for zero change. |
| .goal-mini-target | 10px/600, --d500 | Shows the team target threshold. Right-aligned via flex space-between with delta. |

```html
<div class="goal-six-grid">
  <div class="goal-mini">
    <div class="goal-mini-label">QA Score</div>
    <div class="goal-mini-value err">62<span class="km-unit">%</span></div>
    <div class="goal-mini-meta">
      <span class="goal-mini-delta err">↓ 11%</span>
      <span class="goal-mini-target">Target 85%</span>
    </div>
  </div>
  <!-- repeat for each of the 6 goals -->
</div>
```

## Behavioral goal Breakdown

The `.behav-card` is the primary goal breakdown surface on the agent scorecard. It has two co-present views: a **dot plot** (scores mapped to a horizontal axis with zone bands) and a **compact list** (`.behav-list-compact`) below it showing every goal as a numbered row with score, trend, and a hover-revealed action button. The two views are linked, clicking a dot plot marker highlights the corresponding row, and clicking a row opens a goal detail drawer inline.

### Variant 1, Bar row (summary mode)

Used in the team view and overview contexts where the dotplot is not shown. Each goal is a flex row: label + full-width progress bar on the left, percentage + trend on the right.

| Element | Class | Notes |
| --- | --- | --- |
| Card | `.behav-card` | `background:--card-bg; border:--card-border; border-radius:16px; padding:18px 20px 20px` |
| Header | `.behav-card-header` | flex, space-between, `gap:12px; margin-bottom:4px`. Right side holds action buttons (Ask AiMY + Coach failing goals) |
| Title | `.behav-card-title` | 13px/700, `--d50`, `letter-spacing:-0.005em` |
| Subtitle | `.behav-card-sub` | 11px/500, `--d400`, `margin-bottom:14px` |
| Row | `.behav-row` | flex, `gap:12px; padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.04)`. Last child: no border |
| Bar track | `.behav-row-bar` | 4px height, `rgba(255,255,255,0.06)` bg, overflow hidden |
| Bar fill | `.behav-row-fill.ok/.warn/.err` | Width set inline. Uses `transform:scaleX()` for animation if animating, never animate `width` |
| Percentage | `.behav-row-pct.ok/.warn/.err` | 14px/800, semantic color |
| Trend | `.behav-row-trend.ok/.err` | 10px/600. Neutral (no change): no modifier class, `--d400` |

### Variant 2, Compact list (`.behav-list-compact`)

The primary display inside the full agent scorecard. A 4-column grid: numbered marker circle · question label · score + trend · hover-revealed action button. Clicking a row opens the goal detail drawer inline. The action button label changes by score tier: "Coach on this" (err), "View misses" (warn), "Use as exemplar" (ok).

| Element | Class | Notes |
| --- | --- | --- |
| List wrapper | `.behav-list-compact` | flex-column, `gap:2px` |
| Row | `.behav-compact-row` | `display:grid; grid-template-columns:28px 1fr auto auto; gap:14px`. Add `.goal-row-selectable` + `data-goal="N"` for dot-plot linking |
| Marker | `.behav-compact-marker.err/.warn/.ok` | 22px circle, numbered (1–6 matching dotplot). Background is the semantic color |
| Label | `.behav-compact-label` | 12px/600, `--d100`. Full question text, never truncate |
| Stat block | `.behav-compact-stat` | Right-aligned, holds pct + trend stacked |
| Percentage | `.behav-compact-pct.err/.warn/.ok` | 13px/800, semantic color, `letter-spacing:-0.01em` |
| Trend | `.behav-compact-trend.err/.ok/.neu` | 10px/700. neu = `--d400` "→ Stable" |
| Action | `.behav-compact-action` | `min-width:110px; text-align:right`. Contains `.k-row-action` button with class `.coach / .review / .exemplar` + `.k-row-hover-reveal` (hidden until row hover) |

### Action button labels by score tier

| Score | Tier | Button label | `data-goal-action` |
| --- | --- | --- | --- |
| <70% | err | Coach on this | `coach` |
| 70–84% | warn | View misses | `viewmisses` |
| ≥85% | ok (improving) | See recovery | `recovery` |
| ≥85% | ok (stable/exemplar) | Use as exemplar | `exemplar` |

```html
<!-- Card wrapper -->
<div class="behav-card">
  <div class="behav-card-header">
    <div>
      <div class="behav-card-title">Behavioral goal breakdown</div>
      <div class="behav-card-sub">6 questions · ranked by impact on quality score</div>
    </div>
    <!-- action buttons right-side -->
  </div>

  <!-- Compact list -->
  <div class="behav-list-compact">
    <div class="behav-compact-row goal-row-selectable" data-goal="1">
      <span class="behav-compact-marker err">1</span>
      <div class="behav-compact-label">Did the agent set clear next steps?</div>
      <div class="behav-compact-stat">
        <div class="behav-compact-pct err">47%</div>
        <div class="behav-compact-trend err">↓3 pts</div>
      </div>
      <div class="behav-compact-action">
        <button class="k-row-action coach k-row-hover-reveal"
                data-goal-action="coach" data-goal="1">Coach on this</button>
      </div>
    </div>
    <!-- goal-inline-coach placeholder (populated by JS) -->
    <div class="goal-inline-coach" style="display:none"></div>
  </div>
</div>
```

## Trend Card

A card holding a time-series sparkline for the agent's quality score over 12 weeks. Same card chrome as `.behav-card`. The SVG chart sits in a fixed-height `.trend-svg-wrap`. Annotations are absolutely positioned over the SVG using `.trend-anno`, a small tooltip-style card pinned at a specific data point. Used to surface contextual events (coaching started, workload spike, etc.).

| Element | Class | Notes |
| --- | --- | --- |
| Card | `.trend-card` | Same chrome as `.behav-card`: card-bg, card-border, 16px radius, 18px 20px 20px padding |
| Header | `.trend-card-header` | flex, space-between, `gap:12px; margin-bottom:4px` |
| Title | `.trend-card-title` | 13px/700, `--d50`, `letter-spacing:-0.005em` |
| Subtitle | `.trend-card-sub` | 11px/500, `--d400`, `margin-bottom:16px` |
| Chart area | `.trend-svg-wrap` | `width:100%; height:180px; position:relative`. SVG is `width:100%; height:100%; display:block` |
| Annotation | `.trend-anno` | `position:absolute` over SVG. `--d800` bg, qa-accent tinted border. `<strong>` inside uses `--d50` / 800 weight for the key figure |

## Coaching History Feed

A chronological list of past coaching actions, sessions delivered, goals set, improvements noted. Each row has a semantic icon (ok/warn/err/neu), a title, date, detail text, and an optional outcome pill. This is a read-only feed, not interactive. Distinct from the [Coaching Card](#sc-coaching-card) (which is a live action prompt inside the canvas thread).

| Class | Spec | Notes |
| --- | --- | --- |
| .ds-coach-card | card-bg, card-border, radius 16px, pad 18px 20px 8px | Read-only history. For the actionable in-thread coaching prompt, use `.ds-coaching-card`. |
| .coach-row-icon.ok / .warn / .err / .neu | 28px, radius 8px, semantic bg + color | Icon color matches the row's outcome. Use the filled SVG that best represents the event type (check, warning, info, etc.). |
| .coach-row-title | 12px/700, --d50 | Short label: event type + topic. Max ~40 chars. |
| .coach-row-detail | 11px/500, --d300, line-height 1.5 | One or two sentences max. Bold key nouns via `<strong>`. |
| .coach-row-outcome.ok / .warn | 10px/700, semantic bg, radius 12px, pad 3px 8px | Optional, only show if the event has a terminal outcome (Completed, In Progress). Omit for neutral/informational rows. |

```html
<div class="coach-card">
  <div class="coach-card-header">
    <span class="coach-card-title">Coaching History</span>
  </div>
  <div class="coach-card-sub">Empathy focus, last 90 days</div>
  <div class="coach-row">
    <div class="coach-row-icon ok"><!-- check SVG --></div>
    <div class="coach-row-body">
      <div class="coach-row-top">
        <span class="coach-row-title">Session: Active Listening Drill</span>
        <span class="coach-row-date">May 12</span>
      </div>
      <div class="coach-row-detail">Coaching detail here.</div>
      <span class="coach-row-outcome ok">Completed</span>
    </div>
  </div>
</div>
```

## Coaching Card

A rich canvas card that AiMY injects into the AiMY Canvas thread to deliver a coaching recommendation. Three action buttons, **Accept**, **Defer** (with snooze picker), **Dismiss**. Once actioned, the card transitions to a terminal state (accepted = green header; deferred = warn state pill) and hides the actions. Uses `backdrop-filter: blur(8px)` for the frosted glass surface.

| Class | Spec | Notes |
| --- | --- | --- |
| .ds-coaching-card | d800 60% bg, white 10% border, radius 12px, backdrop-filter blur(8px), max-width 540px | Lives inside the canvas thread (`.overlay-thread`). Same frosted glass surface as `.chat-msg.aimy`. |
| .coaching-confidence | 10px/600, teal, teal 7% bg, teal 20% border, radius 20px | Shows AiMY's confidence in the recommendation. Only render if confidence ≥ 80%. |
| .coaching-why | 11px, --d400, left 2px border (rgba white 0.1), right-only radius 0 6px 6px 0 | The rationale block. Left border acts as a blockquote indicator. Bold numbers and goal names via `<strong>`. |
| .coach-btn.accept | ok 12% bg, ok 25% border, ok text | One-shot. On click: add `.state-accepted` to card → hides actions, greens header. |
| .coach-btn.defer | qa-accent 8% bg, qa-accent 20% border | Toggles `.ds-defer-picker.open`. Snooze option click adds `.state-deferred` to card. |
| .coach-btn.dismiss-coaching | white 3% bg, white 7% border, margin-left auto | Pushes to the far right. On click: removes card from DOM (or hides with fade). |
| .ds-coaching-card.state-accepted / .state-deferred | accepted: green header, no actions, state pill visible (ok). deferred: warn state pill. | Terminal states. Never show both action buttons and a state pill at the same time. |

```html
<div class="coaching-card">
  <div class="coaching-card-header">
    <!-- AiMY logo SVG -->
    <span class="coaching-card-type">Coaching Recommendation</span>
    <span class="coaching-confidence">91% match</span>
  </div>
  <div class="coaching-card-body">
    <div class="coaching-agent-row">
      <div class="coaching-agent-av">FA</div>
      <span class="coaching-agent-name">Fatima Al-Rashid</span>
      <a class="coaching-agent-link">View scorecard →</a>
    </div>
    <div class="coaching-what">Schedule a 30-min de-escalation role-play session</div>
    <div class="coaching-why">Empathy score dropped to <strong>45%</strong>, below threshold.</div>
  </div>
  <div class="coaching-card-actions">
    <button class="coach-btn accept">✓ Accept</button>
    <button class="coach-btn defer">⏱ Defer</button>
    <button class="coach-btn dismiss-coaching">Dismiss</button>
  </div>
  <!-- defer snooze picker -->
  <div class="ds-defer-picker">
    <span class="defer-picker-label">Snooze for</span>
    <div class="defer-options">
      <button class="defer-opt">Tomorrow</button>
      <button class="defer-opt">3 days</button>
      <button class="defer-opt">1 week</button>
    </div>
  </div>
  <!-- state pill (hidden until actioned) -->
  <div class="coaching-state-pill">
    <!-- check or clock SVG -->
    Accepted, session scheduled
  </div>
</div>
```

## Evaluation List

A filterable, sortable, bulk-selectable list of evaluations. The header holds title + subtitle + a "Select all" control. Below it: a `.eval-filter-strip` of `.v2-dropdown` filters (date, agent, channel, score, confidence, outcome, sentiment, type), a `.eval-sort-bar`, an `.eval-bulk-bar` (hidden until rows are checked), and then the row list. Clicking a row opens the evaluation detail overlay.

| Element | Class | Notes |
| --- | --- | --- |
| List | `.eval-list` | flex-column, `gap:4px` |
| Row | `.eval-row` | `display:grid; grid-template-columns:20px 1fr auto auto auto auto auto auto`. Hover: `translateX(2px)` + border lighten |
| Low-conf row | `.eval-row.low-conf-row` | err-tinted border + subtle red bg, signals evaluations needing human review |
| Selected row | `.eval-row.selected` | Brand blue tint, applied when checkbox checked |
| Checkbox | `.eval-row-check` | 14px, `accent-color:--brand`. Click stops propagation so row click and checkbox click are separate |
| Agent + date stack | `.eval-row-agent` + `.eval-row-date` | 12px/700 d100 + 11px d400. Date format: "Month D, YYYY · Channel" |
| Channel badge | `.channel-badge` | 10px/600, d400. Ghost bg + border pill. Contains channel SVG icon |
| Interaction flag | `.interaction-type-flag.human-flag/.ai-flag` | 9px/700 pill. human-flag = "Agent" text; ai-flag = AiMY logo SVG + "AiMY" text |
| Score | `.eval-row-score.ok/.err` | 13px/800, semantic color, `min-width:36px; text-align:right` |
| Status badge | `.eval-status.pass/.fail/.border` | 10px/700 pill with semantic tint. pass=ok, fail=err, border=warn |
| Confidence badge | `.conf-badge.conf-high/.conf-med/.conf-low` | 3 vertical bars, stepwise heights (8/12/16px). Colors: high=ok, med=warn, low=err. Inactive bars dim to white 12–18% opacity |
| Sentiment | `.eval-row-sentiment.pos/.neg/.neu` | 10px/700. pos=ok, neg=err, neu=d400 |

### Supporting bar + bulk components

| Class | Role | Notes |
| --- | --- | --- |
| `.eval-filter-strip` | Filter tray above list | Ghost bg strip. Holds "Filter" label + row of `.v2-dropdown` components. 8 filters: date, agent, channel, score, confidence, outcome, sentiment, type |
| `.eval-sort-bar` | Sort control bar | Ghost strip below filter. `.sort-btn` pills, active state: brand tint. Defaults to "Date ↓" |
| `.eval-bulk-bar` | Bulk action bar | Hidden by default (`display:none`). Add `.visible` when ≥1 row selected. Brand-tinted. Holds count + "Export selected" + "Flag for review" + "Clear" buttons |
| `.eval-list-header` | Section header above filters | flex space-between. Left: title + subtitle stack. Right: "Select all" ghost button |

## Evaluation Panel

The full evaluation detail view, opens as an overlay or slide-in. Contains: header (title, subtitle, live badge), donut + bar chart section, trend strip, AiMY insight block, action row, and optionally a detail-page with `.eval-result-card`, `.eval-goal-breakdown`, `.eval-sentiment-card`, `.eval-related-card`.

| Element | Class | Notes |
| --- | --- | --- |
| Panel wrapper | `.eval-panel` | card-bg, card-border, 16px radius, `overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.2)` |
| Header | `.eval-header` | flex space-between, bottom divider. Left: `.eval-header-left` (title + subtitle). Right: `.eval-live-badge` |
| Live badge | `.eval-live-badge` | Brand-blue pill, "Live / updated N min ago". Add `.spike` for anomaly state: err color + blinking dot |
| Chart section | `.eval-chart-section` | flex, `gap:20px; padding:16px 20px; position:relative` (anchors causes float). Holds `.donut-wrap` left + `.eval-bars` right |
| Bar row | `.eval-bar-row` | flex-column, `gap:4px; padding:4px 6px; border-radius:8px`. Clickable, hover bg. Contains `.eval-bar-top` + `.eval-bar-track/.eval-bar-fill` |
| Bar label dot | `.eval-dot` | 7px circle, color matches fill. Sits inline in `.eval-bar-label` |
| Causes float | `.eval-causes-float` | Absolutely positioned tooltip-style panel. Hidden (`opacity:0; visibility:hidden`). Add `.visible` on bar row hover |
| Trend strip | `.eval-trend-strip` | flex row of `.eval-trend-ok` (positive signal) + `.eval-borderline-badge` (warn pill for borderline goals) |
| AiMY insight | `.eval-insight` | Blue-tinted, brand left border (3px). Header: `.eval-insight-header` + AiMY logo + `.eval-insight-label`. Body: `.eval-insight-text` with `.hl-warn / .hl-err` inline highlights |
| justify btn | `.eval-justify-btn` | Full-width err-tinted button. Add `.dimmed` (opacity 0.4, pointer-events none) when confidence is too low to justify |
| Export btn | `.eval-export-btn` | Full-width ghost button beside justify btn |

### Detail page cards (inside eval-panel)

| Card | Class | Key children |
| --- | --- | --- |
| Result summary | `.eval-result-card` | `.erc-score-num` (32px/800) + `.erc-score-label` + `.erc-badges` (flag row) |
| goal breakdown | `.eval-goal-breakdown` | `.ekb-title` + `.ekb-row` per goal → `.ekb-row-top` (question + score) + `.ekb-rationale` |
| Sentiment | `.eval-sentiment-card` | `.esc-header` (title + score) + `.esc-bar-track/.esc-bar-fill` + `.esc-trend` |
| Related evals | `.eval-related-card` | `.erel-header` + `.erel-section-label` + `.erel-row` (date + agent + score) |

## Confidence Badge

A three-bar signal widget showing AiMY's confidence in an evaluation score, compact enough to sit inline in a list row, readable at a glance. Two variants: **compact** (`.conf-badge`, bars only) for list rows, and **labeled** (`.conf-badge-label`, bars + text + pill background) for detail page headers.

| Variant | Class | Bar heights | Use |
| --- | --- | --- | --- |
| Compact | `.conf-badge.conf-high/.conf-med/.conf-low` | 8 / 12 / 16px, 3px wide, `gap:4px` | List rows, no text label |
| Labeled | `.conf-badge-label.conf-high/.conf-med/.conf-low` | 7 / 10 / 14px, 3px wide, `gap:2px` | Detail headers, pill bg + text label |

| State | Filled bars | Bar color | Inactive bar color |
| --- | --- | --- | --- |
| `.conf-high` | All 3 | `#4ed6a1` | - |
| `.conf-med` | Bars 1 + 2 | `#f7c95c` | `rgba(255,255,255,0.12)` |
| `.conf-low` | Bar 1 only | `#ff7282` | `rgba(255,255,255,0.12)` |

```html
<!-- Compact (list row) -->
<span class="conf-badge conf-high" aria-label="High confidence">
  <span class="conf-bar"></span>
  <span class="conf-bar"></span>
  <span class="conf-bar"></span>
</span>

<!-- Labeled (detail header) -->
<span class="conf-badge-label conf-high">
  <span class="conf-bars">
    <span class="conf-bar"></span>
    <span class="conf-bar"></span>
    <span class="conf-bar"></span>
  </span>
  High confidence
</span>
```

## Memory Panel

AiMY's persistent knowledge surface for a specific agent. Sits at the top of the agent scorecard, above the goal grid. Shows how long AiMY has been tracking the agent, accumulated evidence stats, the primary detected pattern, a trajectory confidence bar, and an expandable full detection timeline. Styled with an AI gradient tint (blue→teal) and a top-edge gradient shimmer line via `::before`. The `.memory-cue` pill is a compact variant used inside the `.ai-insight-panel` header to signal session continuity.

### Panel anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Panel | `.memory-panel` | AI gradient bg (blue→teal), teal-tinted border. `position:relative; overflow:hidden`, required for `::before` shimmer line |
| Top shimmer | `.memory-panel::before` | 1px gradient line, transparent → teal 40% → brand 70% → transparent. Signals AI provenance |
| Header | `.memory-panel-header` | flex, `gap:8px; margin-bottom:12px`. AiMY logo SVG + `.memory-panel-title` (flex:1, teal) + `.memory-panel-age` + `.memory-panel-expand` button |
| Expand button | `.memory-panel-expand` | Ghost. Add `.open` to rotate the chevron 180°. Toggles `.memory-detail` |
| Stats grid | `.memory-stats` | `display:grid; grid-template-columns:repeat(4,1fr); gap:8px`. Each cell: `.memory-stat` with dark tinted bg |
| Stat value | `.memory-stat-val` | 15px/800, `--d50`. Override with semantic color inline when the value is flagged |
| Stat label | `.memory-stat-label` | 9px/600, uppercase, `--d500` |
| Trajectory | `.memory-trajectory` | flex row: label + bar + pct. Top border separates from key insight text |
| Traj bar | `.memory-traj-bar` + `.memory-traj-fill` | 5px, `--ok` fill. Width set inline. Animates in via `600ms cubic-bezier(0.22,1,0.36,1)` |
| Expandable detail | `.memory-detail` | `display:none`. Add `.open` to show. Contains `.memory-timeline` |

### Timeline events

| Element | Class | Notes |
| --- | --- | --- |
| Timeline | `.memory-timeline` | flex-column, `gap:0`. Each row separated by a bottom border |
| Event row | `.memory-event` | flex, `gap:10px; padding:7px 0`. Last child has no border |
| Event dot | `.memory-event-dot.detect/.coaching/.improvement/.neutral` | 7px circle. detect=err, coaching=brand, improvement=ok, neutral=d600 |
| Label | `.memory-event-label` | 11px/600, `--d200` |
| Sub | `.memory-event-sub` | 10px, `--d400` |
| Date | `.memory-event-date` | 10px, `--d500`, `flex-shrink:0; margin-top:3px` |

### Memory cue (compact inline variant)

A pill used inside the `.ai-insight-panel` header, pushed right via `margin-left:auto`. Signals that AiMY is resuming a prior thread rather than starting fresh. Only shown when continuity exists.

| Class | Notes |
| --- | --- |
| `.memory-cue` | 9px/700, uppercase, ghost pill. `margin-left:auto` in flex header. Clock SVG icon 9px. Only render when AiMY has prior context for this agent/session |

## goal Detail Drawer

An inline expand panel that opens inside `.behav-card` between the dot plot and the compact list when a marker or row is clicked. It slides down via `max-height` animation (`0 → 600px`, 200ms ease-spring) and renders the goal number badge, full question title, score, mini progress bar, explanation body, and action buttons. The wrapper `#goalDetailDrawer` is permanently in the DOM. Content is injected by JS.

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `#goalDetailDrawer` | Always in DOM. `margin:0 -20px; padding:0 20px`, bleeds to card edges. Dark bg, top+bottom borders. Add `.goal-drawer-open` to show, `.goal-drawer-closing` to animate out |
| Open state | `.goal-drawer-open` | `opacity:1; max-height:600px; transform:translateY(0)` at 200ms ease-spring |
| Closing state | `.goal-drawer-closing` | `opacity:0; max-height:0; transform:translateY(4px)` at 120ms, applied by JS before removing from view |
| Header | `.goal-drawer-header` | flex, `gap:10px; margin-bottom:12px`. Holds num badge + title + score + close button |
| Number badge | `.goal-drawer-num.err/.warn/.ok` | 24px square, 6px radius. Tinted bg + semantic text color matching marker |
| Title | `.goal-drawer-title` | 13px/700, `--d50`, `flex:1` |
| Score | `.goal-drawer-score` | 20px/800, `letter-spacing:-0.02em`. Color set inline from JS |
| Close button | `.goal-drawer-close` | Ghost ×. Hover: `--d200` |
| Mini bar | `.goal-drawer-minibar` + `.goal-drawer-minibar-fill` | 6px track. Fill width animates from 0 → score% on open (600ms ease-spring). Color set inline |
| Body | `.goal-drawer-body` | 12px, `--d300`, `line-height:1.65`. AiMY-generated explanation of why this goal is failing |
| Actions | `.goal-drawer-actions` | flex, `gap:6px; flex-wrap:wrap`. Holds qa-accent primary btn + ghost secondary btns |

### Row interaction states

| Class | Applied to | Effect |
| --- | --- | --- |
| `.goal-row-selectable` | `.behav-compact-row` | Cursor pointer + hover bg. Add to every row |
| `.goal-row-active` | `.behav-compact-row` | Slightly elevated bg, applied to the row whose drawer is currently open. "Click to view detail" tooltip suppressed |
| `.goal-inline-coach` | Sibling div after each row | Hidden by default (`display:none`). Populated by JS when "Coach on this" is clicked. Indented coaching prompt panel |

## Brief Card

The morning brief surfaces the top coaching priority agents at the top of the Scorecards page. Two display densities: **primary brief** (full card with evidence, recovery goal banner, and action buttons) and **compact brief** (abbreviated card for secondary agents). Both share the `.brief-risk-pill` component and `.brief-*-btn` button system. The primary brief nests inside a `.bcard` wrapper; the compact lives in a secondary column card.

### Primary brief, agent strip + actions

### Compact brief, secondary agents

| Element | Class | Notes |
| --- | --- | --- |
| Agent strip | `.brief-agent-strip` | flex, `gap:12px; padding:16px 20px 0`. Holds avatar, info stack, risk pill |
| Avatar | `.brief-avatar` | 40px circle, gradient bg, 13px/700 initials |
| Name | `.brief-agent-name` | 14px/700, `--d50`, `letter-spacing:-0.01em` |
| Meta | `.brief-agent-meta` | 11px/500, `--d400`. `.sep` spans provide mid-dot separators |
| Risk pill | `.brief-risk-pill.risk-err/.risk-warn/.risk-ok` | 10px/700 uppercase pill. risk-err=err tint, risk-warn=warn tint, risk-ok=ok tint. Always has `.risk-dot` (6px circle, `background:currentColor`) |
| Primary CTA | `.brief-primary-btn` | qa-accent solid btn with glow shadow. Hover: lift + stronger shadow |
| Secondary CTA | `.brief-sec-btn` | Ghost btn, 12px/600. Reused in recovery goal banner and compact card |
| Actions wrapper | `.brief-actions` | flex, `gap:8px; flex-wrap:wrap` |

### Compact brief anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Strip | `.brief-compact-strip` | flex, `gap:10px; margin-bottom:10px`. Holds 32px avatar + name/tag stack + risk pill |
| Avatar | `.brief-compact-avatar` | 32px circle, 11px/700 initials |
| Name | `.brief-compact-name` | 13px/700, `--d50` |
| Tag | `.brief-compact-tag` | 10px/600, `--d400`. Risk tier + tenure |
| Body text | `.brief-compact-text` | 12px, `--d100`, `line-height:1.55`. `strong` uses `--d50`/700. AiMY-generated summary |
| Action CTA | `.brief-compact-action` | Ghost inline button, 11px/700, arrow chevron SVG. No bg. Reads as an inline link |

## Pattern List

A ranked list of recurring failure patterns detected by AiMY across the team. Each row is a 4-column grid: rank number, pattern name + meta, instance count + frequency label, and a hover-revealed action strip. Rows can carry a `.loop-state` pill inline in the pattern name to show the resolution workflow status (in-progress / acknowledged / monitoring). Once resolved, `.is-resolved` dims the row and swaps the action buttons for a `.pattern-resolved-state` confirmation strip.

| Element | Class | Notes |
| --- | --- | --- |
| List | `.pattern-list` | flex-column, `gap:6px` |
| Row | `.pattern-row` | `display:grid; grid-template-columns:22px 1fr auto auto; gap:12px`. Ghost bg + hairline border. Hover: bg + border lighten |
| Rank | `.pattern-rank` | 10px/800, `--d500`, `letter-spacing:0.04em`. Text: "#1", "#2" etc. |
| Info | `.pattern-info` | `min-width:0`. Holds `.pattern-name` + `.pattern-meta` |
| Name | `.pattern-name` | 12px/700, `--d50`. Can contain an inline `.loop-state` pill for resolution status |
| Meta | `.pattern-meta` | 10px/600, `--d400`. `strong` uses `--d100`/700. Shows agent count, CSAT impact |
| Frequency | `.pattern-freq.err/.warn` | 14px/800, semantic color. Shows raw instance count |
| Freq label | `.pattern-freq-sub` | 10px/600, `--d400`, right-aligned. "instances" |
| Arrow | `.pattern-arrow` | 14px chevron, `--d500`. Hover: `--d100` |
| Action strip | `.pattern-row-actions` | flex, `gap:6px`. Hidden at base, revealed on row hover via `.k-row-hover-reveal`. Contains contextual CTAs |

### States

| State | Class | Visual |
| --- | --- | --- |
| Resolved | `.pattern-row.is-resolved` | Row opacity 0.55. `.pattern-row-actions` hidden. `.pattern-resolved-state` shown (ok-colored "✓ Resolved" strip) |
| In progress | `.loop-state.in-progress` | Brand-blue pill inline in `.pattern-name` |
| Acknowledged | `.loop-state.acknowledged` | d500-tinted pill, "Acknowledged · improving" |
| Monitoring | `.loop-state.monitoring` | teal-tinted pill, "Monitoring" |

## Scorecard Page Header

The top of the Scorecards page, title, subtitle, and right-side controls (export, period selector, team filter). Also includes `.sc-section-label`, a rule-line divider used between the roster strip, briefing area, and other page sections. The `.sc-aimy-hint` inline badge appears inside the section label when AiMY has context about what's in that section.

| Element | Class | Notes |
| --- | --- | --- |
| Header | `.sc-page-header` | flex, `align-items:flex-end; justify-content:space-between; gap:16px; margin-bottom:20px` |
| Title | `.sc-page-title` | 22px/800, `--d50`, `letter-spacing:-0.02em; margin-bottom:4px` |
| Subtitle | `.sc-page-sub` | 12px/500, `--d400`. `strong` → `--d100`/700. Shows agent count + team + period |
| Section divider | `.sc-section-label` | flex, uppercase, 10px/700, `--d400`. `::after` is a flex:1 hairline rule. Groups briefing, roster, team view |
| AiMY hint | `.sc-aimy-hint` | Inside `.sc-section-label`. 9px/700, teal. AiMY logo SVG + short label. Signals AiMY has detected something in this section |

## View Toggle

Three-way pill toggle switching between Team, Agent, and Evaluations views. Sits in a `.view-toggle-row` above the content area. Active button uses a solid qa-accent fill. `.view-toggle-context` is a trailing label (right-aligned via `margin-left:auto`) that describes what's currently visible, e.g. "Viewing Omar Abdallah". `.view-pane` controls content visibility, only one is active at a time.

| Element | Class | Notes |
| --- | --- | --- |
| Row wrapper | `.view-toggle-row` | flex, gap 12px, `margin-bottom:16px` |
| Toggle strip | `.view-toggle` | inline-flex, ghost bg + border, 10px radius, 3px padding, gap 2px |
| Button | `.view-toggle-btn` | 12px/700, 7px 16px padding, 7px radius. Ghost base. Add `.is-active`: qa-accent solid + glow shadow |
| Context label | `.view-toggle-context` | 11px/500, `--d400`, `margin-left:auto`. `strong` → `--d100`/700 |
| View pane | `.view-pane` | `display:none` base. Add `.is-active` to show. Only one active at a time |

## Recovery Goal Banner

Shown on a brief card once a recovery goal has been set for an agent. Replaces the risk pill with a progress-tracking state. Brand-blue tinted, with a progress bar using the AI gradient. Ghost action buttons on the right (Update goal, Mark resolved).

| Element | Class | Notes |
| --- | --- | --- |
| Banner | `.recovery-goal-banner` | flex, gap 10px, brand-blue tint bg + border, 10px radius. `margin-bottom:14px`. Sits above the agent card content |
| Icon | `.rgb-icon` | 28×28px, 8px radius, brand-blue tint. Clock/target SVG |
| Body | `.rgb-body` | flex:1, min-width:0 |
| Title row | `.rgb-title` | 11px/700, `--d50`, flex, gap 6px. Holds label + `.rgb-badge` (9px, week indicator) |
| Progress row | `.rgb-progress-row` | flex, gap 8px. Holds bar track + label |
| Bar | `.rgb-bar-track` + `.rgb-bar-fill` | 4px height. Fill uses AI gradient. Width updated by JS |
| Label | `.rgb-progress-label` | 10px/700, `#61adf1`, flex-shrink:0 |
| Actions | `.rgb-actions` | flex, gap 6px, flex-shrink:0. Ghost ghost buttons |

## Why This Score

A collapsible explanation drawer attached to the eval score in the roster card or agent header. A ghost trigger button opens `.why-score-body` which shows a plain-text explanation + a list of per-goal rows (`.why-goal-rows`). Each row uses `.wk-*` classes: `.wk-name` (flex:1 label), `.wk-score` (right-aligned number), `.wk-status` (pass/fail/border label using `.wk-pass`, `.wk-fail`, `.wk-border` color modifiers).

| Element | Class | Notes |
| --- | --- | --- |
| Wrapper | `.why-score-section` | `margin-top:10px; border-top:1px solid rgba(255,255,255,0.07); padding-top:10px` |
| Trigger | `.why-score-trigger` | Ghost btn, 11px/700, --d400. Add `.open` to rotate chevron 180° |
| Body | `.why-score-body` | `display:none; padding-top:10px`. Add `.open` to show |
| Text | `.why-score-text` | 12px, `--d300`, `line-height:1.6; margin-bottom:8px` |
| Rows | `.why-goal-rows` | flex-column, gap 5px |
| Row | `.why-goal-row` | flex, gap 8px, 11px, ghost bg, 6px radius. Holds `.wk-name` + `.wk-score` + `.wk-status` |
| Name | `.wk-name` | flex:1 |
| Score | `.wk-score` | font-weight:700, min-width:30px, right-aligned |
| Status | `.wk-status` | min-width:38px, right-aligned. Add `.wk-pass` (ok), `.wk-fail` (err), or `.wk-border` (warn) |

## Utility Chips

Two small inline chips used across the scorecards and justifys flows.

### Open Actions Chip (`.open-actions-chip`)

Attached to a brief card or roster row to show how many coaching/justify actions are still open and how long the oldest one has been waiting. Warn-tinted pill.

| Class | Notes |
| --- | --- |
| `.open-actions-chip` | Warn-tinted pill. Holds plain text + `.oac-count` (font-weight:800, warn color) + `.oac-age` (10px, warn color) |

### AiMY Decision Summary (`.ads-*`), justifys

Shown in the justify workspace after a decision is confirmed. A teal-tinted confirmation block with a header (AiMY logo + "Decision logged"), a narrative sentence, and teal ghost action buttons. Rendered as a replacement for the decision zone once the ruling is saved.

| Element | Class | Notes |
| --- | --- | --- |
| Header | `.ads-header` | flex, gap 8px, 10px/700, uppercase, `--teal`. Holds AiMY logo SVG + "Decision logged · timestamp" |
| Narrative | `.ads-narrative` | 13px, `--d200`, `line-height:1.7`. `strong` → `--d50` |
| Actions | `.ads-actions` | flex, gap 8px, flex-wrap |
| Action btn | `.ads-action-btn` | Teal tint ghost pill. 11px/700. Hover: darker teal tint |

## justify Row

Each row in the justifys queue list. Three state variants, Pending, In Review, Resolved, plus an SLA-breached variant (red tint). Selected state uses `--qa-accent` tint. `.disp-status-dot` is the only visual status signal; `.disp-status-label` is visually hidden for screen readers only. The `--with-suggest` modifier restructures the row into a two-row flex layout when an AiMY suggest strip is embedded below.

| Element | Class | Notes |
| --- | --- | --- |
| Row | `.disp-row` | flex space-between, `gap:8px; padding:11px 14px; margin:4px 8px; border-radius:8px; border:1px solid transparent`. Hover: bg lighten. role="option", aria-selected |
| Selected | `.disp-row.selected` | `background:--qa-accent-dim; border-color:rgba(--qa-accent-rgb,0.22)` |
| SLA breach | `.sla-row` | Err tint bg + border. Selected SLA row: darker err tint |
| Resolved | `.resolved-row` | `opacity:0.7`, restores on hover |
| With suggest | `.disp-row--with-suggest` | flex-direction:column. `.disp-row-main` wraps the normal row content. `.disp-row-right` gets `flex-direction:row; align-items:center` |
| Left section | `.disp-row-left` | flex, `gap:10px; flex:1; min-width:0`. Holds status dot + body |
| Status dot | `.disp-status-dot.pending/.in-review/.resolved` | 8px circle. pending=warn, in-review=brand, resolved=ok. `margin-top:5px; flex-shrink:0` |
| Agent name | `.disp-row-agent` | 13px/700, `--d100`, truncated |
| Eval ID | `.disp-eval-id` | 9px/600, `--d600`, `display:block; margin-top:1px` |
| goals | `.disp-row-goals` | 10px, `--d400`, truncated. Shows justifyd goal names |
| Auditor | `.disp-row-auditor` | 9px, `--d600`, `margin-top:1px` |
| Right col | `.disp-row-right` | flex-column, align-items flex-end, gap 4px, flex-shrink 0 |
| Timestamp | `.disp-time` | 10px, `--d600` |
| SLA badge | `.sla-breach-badge` | 9px/700, err colors, 2px 7px pad, 4px radius |
| Outcome badge | `.outcome-badge.upheld/.overturned/.partial` | upheld=neutral grey, overturned=ok tint, partial=qa-accent tint |

## SLA Indicators

SLA status is signalled at two levels: the **section label** above a group of rows (carries an animated dot when any row in the group is breached) and the **SLA badge** inside `.disp-row-right` of individual rows. Section labels also group rows by status (Pending · In Review · Resolved) and carry a count badge.

| Element | Class | Notes |
| --- | --- | --- |
| Section label | `.disp-section-label` | 9px/700, uppercase, `--d500`. Padding `6px 14px 2px; margin-top:4px`. Holds status text + count badge + optional SLA indicator |
| Count badge | `.disp-section-count` | 9px/700, ghost pill. Updates via JS when rows are filtered |
| SLA indicator | `.disp-sla-indicator` | inline-flex, err color + blinking 5px dot via `@keyframes sla-blink`. Added to section label when ≥1 row in that group is breached |
| SLA badge (row) | `.sla-breach-badge` | Inside `.disp-row-right`. Only when the row's SLA is breached. 9px/700, err-bg + err color |

## AiMY Suggest Strip

An inline suggestion band embedded inside a `.disp-row--with-suggest` row, below the main row content. AiMY surfaces a one-line resolution recommendation with a confidence level. The strip uses the AI gradient left border and teal text. Dismissing it via the × button removes the `--with-suggest` modifier and reverts the row to normal height.

| Element | Class | Notes |
| --- | --- | --- |
| Row modifier | `.disp-row--with-suggest` | Changes row to flex-column. `.disp-row-main` wraps the normal horizontal content |
| Main wrapper | `.disp-row-main` | Only present on `--with-suggest` rows. Contains the normal left+right content |
| Suggest strip | `.disp-suggest-strip` | flex, `gap:8px; padding:8px 10px`. Blue tint bg, teal left border (2px). AiMY logo + label + text + dismiss × |
| AiMY label | `.disp-suggest-label` | 11px/700, `--teal` |
| Suggest text | `.disp-suggest-text` | 11px, `--d300`. `strong` uses `--d100` |
| Dismiss | `.disp-suggest-dismiss` | Ghost ×. Removes `--with-suggest` class from parent row |

## Change Request Panel

The detail panel shown when a justify row is selected. Displays the auditor's original assessment as a structured document: label (teal, uppercase), body text, section titles, an AiMY insight block, a goal trend table, and action buttons. The panel is scrollable and not a modal. It lives in `.disp-detail-col` alongside the queue list.

| Element | Class | Notes |
| --- | --- | --- |
| Label | `.cr-label` | 11px/700, uppercase, `--teal`. flex, gap 5px. Holds AiMY logo SVG |
| Body text | `.cr-body` | 13px, `--d200`, `line-height:1.65`. `strong` → `--d50`/700 |
| Section | `.cr-section` | `margin-bottom:12px`. Groups related content |
| Section title | `.cr-section-title` | 10px/700, uppercase, `--d400`, `letter-spacing:0.07em` |
| AiMY insight | `.cr-insight` | Blue-tinted block. 12px, `--d300`. `strong` → `--d50`/700 |
| Doc block | `.cr-doc-block` | Ghost bg, hairline border, 8px radius. Groups a supporting document reference with `.cr-doc-meta` (italic 10px) |
| Trend table | `.cr-trend-table` | full-width, `overflow:hidden; border:1px solid rgba(255,255,255,0.07)` |
| Trend row | `.cr-trend-row.header/.bad/.warn/.ok/.neutral` | 4-col grid. header=dark bg + uppercase; bad/warn/ok=semantic tint bg |
| Score cell | `.cr-score.bad/.warn/.ok/.neutral` | font-weight:700 + semantic color |
| Actions | `.cr-actions` | flex, `gap:8px; flex-wrap:wrap; margin-top:12px` |
| Primary btn | `.cr-btn` | Teal tint border + bg. Signals this is an AiMY-guided action |
| Secondary btn | `.cr-btn-sec` | Ghost. Added as modifier to `.cr-btn` |

## justify Workspace

The active review surface in the detail column. Contains: the AiMY draft banner (pre-populated decision suggestion), the agent performance annotation panel (`.apa-*`), and optionally the overturn score editor. The workspace is where the reviewer reads AiMY's suggested ruling, accepts or clears it, and either confirms or overrides.

### AiMY Draft Banner

| Element | Class | Notes |
| --- | --- | --- |
| Banner | `.aimy-draft-banner` | flex, `gap:10px; padding:10px 14px`. Blue tint bg + border. AiMY logo SVG 12px + label + accept + clear buttons |
| Label | `.aimy-draft-banner-label` | 12px, `--d200`, `flex:1`. `strong` → `--d50`/700. Pre-populated by AiMY before reviewer touches anything |
| Accept | `.aimy-draft-accept` | Brand-blue tint btn. Clicking populates the decision form with AiMY's values |
| Clear | `.aimy-draft-clear` | Ghost btn. Resets the draft without populating the form |

### Agent Performance Annotation (APA)

A compact evidence row surfacing one key contextual signal about the agent, trend direction, known coaching gap, performance anomaly. Each APA item has an icon (semantic color), a label with a status dot, and a text explanation. Multiple APA items stack vertically.

| Element | Class | Notes |
| --- | --- | --- |
| Item | `.apa-item` (implicit wrapper) | flex, `gap:10px; padding:10px 12px`. Ghost bg + hairline border, 8px radius |
| Icon | `.apa-icon` | 28×28px, 7px radius. Semantic tint bg + color. 13px SVG inside |
| Body | `.apa-body` | `flex:1; min-width:0` |
| Label row | `.apa-label` | flex, 11px/700, `--d100`, `margin-bottom:3px`. Holds `.apa-label-dot` (5px semantic circle) + label text |
| Text | `.apa-text` | 12px, `--d200`, `line-height:1.55`. `strong` → `--d50`/700 |
| Action | `.apa-action` | Ghost inline-flex btn. Optional, only shown on APA items that have a direct action. `:hover` opacity 0.75 |

## Decision Zone

The ruling form where the reviewer picks an outcome. A row of `.decision-tab` pills (Uphold / Partial Adjust / Overturn) acts as a single-select. Selecting "Partial Adjust" or "Overturn" reveals the `.goal-adjuster-list` and `.overturn-panel`. Once a decision is confirmed, the `.aimy-decision-summary` strip replaces the tab row.

| Element | Class | Notes |
| --- | --- | --- |
| Zone wrapper | `.decision-zone` | Contains header, tabs, adjuster list, and submit button |
| Zone header | `.decision-zone-header` | `margin-bottom:16px`. Holds `.decision-zone-label` (13px/700) + `.decision-zone-sub` (11px, --d500) |
| Tabs row | `.decision-tabs` | flex, `gap:8px; margin-bottom:16px; flex-wrap:wrap` |
| Tab | `.decision-tab` | flex-column, centered. Holds SVG icon + label + `.decision-tab-sub`. Ghost bg + border |
| Active tab | `.decision-tab.active` | qa-accent tint bg + border + text color. Pre-selected by AiMY recommendation |
| goal adjuster list | `.goal-adjuster-list` | flex-column, `gap:10px; margin-bottom:14px`. Hidden until Partial/Overturn tab selected |
| Adjuster row | `.goal-adjuster-row` | 2-col grid: `.goal-adjuster-name` (flex, checkbox + label) \| `.goal-adjuster-controls` (number input + % label) |
| Score input | `.overturn-score-input` | 52px wide, center-aligned number. `focus`: qa-accent border. `.overturn-pct` sits beside it (16px/700, --d300) |

### AiMY Decision Summary (post-confirm)

Replaces the tab row after the decision is confirmed. Shows the outcome in a teal/ok-tinted strip.

| Class | Notes |
| --- | --- |
| `.aimy-decision-summary` | `display:none` by default. Add `.visible` to show (`display:flex`). Teal/ok tint, AiMY logo + decision text + "Audit logged" timestamp |

## Audit Trail

A chronological log of every action taken on a justify, opened, reviewed, decision made, agent notified. Each event is a flex row with an icon (semantic tint), label, and timestamp. Read-only; never interactive. Always visible once a justify has been touched.

| Element | Class | Notes |
| --- | --- | --- |
| Trail wrapper | `.audit-trail` | flex-column, `gap:0`. Each event has a bottom hairline border; last child none |
| Event row | `.audit-event` | flex, `gap:10px; padding:8px 0` |
| Icon | `.audit-icon` | 24×24px, 6px radius, semantic tint bg + color |
| Label | `.audit-label` | 11px/700, `--d100` |
| Detail | `.audit-detail` | 10px, `--d400`, `margin-top:1px` |
| Timestamp | `.audit-time` | 10px, `--d600`, `flex-shrink:0; margin-top:1px` |

## Modal + Create justify Wizard

Two modal variants: **standard** (`.modal-box`, max-width 420px) for confirmations and warnings, and **wide** (`.modal-box--wide`, 560px) for the multi-step Create justify wizard. The overlay uses `position:fixed; inset:0`, backdrop blur, and scale entrance. The wizard uses a `.cd-steps` progress indicator with active/done states.

### Modal anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Overlay | `.modal-overlay` | `position:fixed; inset:0; backdrop-filter:blur(6px)`. `opacity:0; pointer-events:none` base. Add `.open` to show |
| Box | `.modal-box` | `--d800` bg, 14px radius, 24px padding. Entrance: `scale(0.97→1)` at 200ms |
| Wide box | `.modal-box--wide` | Additional modifier, `max-width:560px` |
| Close X | `.modal-close-x` | Ghost icon btn, 16px SVG ×. `flex-shrink:0` |
| Subtitle | `.modal-subtitle` | 11px, `--d400`, `margin-top:3px`. Only in wide/wizard modals |
| Title | `.modal-title` | 16px/800, `--d50`, `letter-spacing:-0.01em` |
| Body | `.modal-body` | 13px, `--d300`, `line-height:1.6; margin-bottom:20px`. `strong` → `--d50` |
| Warning | `.modal-warning` | 11px/700, `--warn`. flex, gap 5px. Warning SVG + text. `margin-top:10px` |
| Actions | `.modal-actions` | flex, `gap:10px; justify-content:flex-end` |
| Cancel | `.modal-cancel` | Ghost btn 13px/700 |
| Confirm | `.modal-confirm` | qa-accent solid btn + glow shadow |

### Create justify wizard steps

| Element | Class | States |
| --- | --- | --- |
| Steps row | `.cd-steps` | flex, `align-items:center; margin-bottom:20px` |
| Step | `.cd-step` | flex, `gap:6px`. Add `.active` (qa-accent num) or `.done` (ok num + ok label) |
| Step number | `.cd-step-num` | 22px circle. Base: ghost bg + d500 color. active: qa-accent bg+color #fff. done: ok bg+color #fff |
| Step label | `.cd-step-label` | 11px/600, d500 base → d100 active → ok done |
| Connector | `.cd-step-line` | flex:1, 1px height, `rgba(255,255,255,0.08)`. Add `.done` for ok tint |

### Wizard form field components

| Class | Role |
| --- | --- |
| `.cd-field-label` | 11px/700, --d300, `display:block; margin-bottom:8px` |
| `.cd-field-hint` | 11px, --d500, `margin-bottom:10px; line-height:1.55` |
| `.cd-optional` | Modifier on label text, 400 weight, --d600, 10px. "(optional)" |
| `.cd-search-wrap` | Agent search input wrapper, dark bg, qa-accent focus border. Holds search SVG + `.cd-search-input` |
| `.cd-agent-list` | flex-column, gap 3px, max-height 220px, overflow-y auto |
| `.cd-agent-row` | Ghost btn row. `.selected`: qa-accent tint. Holds avatar + `.cd-agent-info` (name + meta) |
| `.cd-selected-eval` | qa-accent tinted confirmation block showing selected eval. Holds `.cd-sel-label`, `.cd-sel-row` (agent + ID + score badge + clear btn) |
| `.cd-goal-grid` | 2-col grid of `.cd-goal-check` checkbox rows. checked: qa-accent tint |
| `.cd-upload-zone` | Dashed border dropzone. Hover: qa-accent tint. `.cd-upload-hint` (10px caption) |
| `.cd-footer` | flex, right-aligned, top border. Back + Next/Submit buttons |
| `.cd-success-icon` | 48px ok-tinted circle with ok checkmark SVG. Shown on step 3 success |

## Source Card

The compact source health card in the Data Ingestion header strip. Each card is a `<button>` with `data-src` attribute. Status signals on two axes: the `.di-sc-pill` chip (Active / Stale / Error) and the card border/background tint. The freshness bar (`.di-sc-freshbar`) is structurally present but `display:none` by default, a visual ledger line reserved for future use. Icon containers reveal a per-integration color tint on hover/selected.

| Class / Modifier | Purpose | Token / Value |
| --- | --- | --- |
| `.di-src-card` | Base card, ghost bg, 10px radius, flex column, `<button>` element with `data-src` | `rgba(255,255,255,0.025)` bg, `rgba(255,255,255,0.07)` border |
| `.di-src-selected` | Active selection, brand blue tint | border `rgba(51,105,255,0.5)`, bg `rgba(51,105,255,0.06)` |
| `.di-src-warn` | Stale source, amber border tint | border `rgba(247,201,92,0.28)`, bg `rgba(247,201,92,0.03)` |
| `.di-src-error` | Failing source, red border + ambient glow | border `rgba(255,114,130,0.35)` + double box-shadow |
| `.di-sc-pill` | Status chip wrapper | Pair with `.pill-active`, `.pill-warn`, or `.pill-error`, note: NOT `di-pill-*` |
| `.di-pill-dot` | 5px pulsing dot inside pill | `background:currentColor`. Active variant animates via `@keyframes dotPulse` |
| `.ic-zendesk/.ic-freshdesk/.ic-s3/.ic-connect` | Icon container, base tint + per-integration hover reveal | Base: `rgba(255,255,255,0.06)`. Hover/selected: per-integration color tint |
| `.di-sc-freshbar` | Bottom ledger line, structurally present, visually hidden | `display:none` in current product. Reserved for future freshness visualization |

```html
<button class="di-src-card di-src-selected" data-src="zendesk" onclick="diSelectSrc('zendesk',this)">
  <div class="di-sc-row">
    <div class="di-sc-left">
      <div class="di-sc-icon ic-zendesk"><!-- svg --></div>
      <div>
        <div class="di-sc-name">Zendesk</div>
        <div class="di-sc-url">api.yourco.zendesk.com</div>
      </div>
    </div>
    <span class="di-sc-pill pill-active">
      <span class="di-pill-dot"></span>Active
    </span>
  </div>
  <div class="di-sc-metrics">
    <div class="di-sc-metric">
      <span class="di-sc-metric-val">2,847</span>
      <span class="di-sc-metric-lbl">interactions / 24h</span>
    </div>
    <div class="di-sc-metric di-sc-metric-right">
      <span class="di-sc-metric-val">4m</span>
      <span class="di-sc-metric-lbl">last sync</span>
    </div>
  </div>
  <div class="di-sc-freshbar fresh"></div>
</button>
```

## Drop Zone

The file upload zone used when ingesting evaluation files into a source. Default state: dashed border, ghost bg, centred icon + headline. Hover and `.drag-over` state: brand-blue border tint. Accepts `tabindex="0"` and keyboard activation. A `.di-format-info` strip below shows supported formats, max file size, and encoding requirements.

| Element | Class | Notes |
| --- | --- | --- |
| Zone | `.di-dropzone` | `border:1.5px dashed rgba(255,255,255,0.1); border-radius:14px; padding:36px 24px 32px; text-align:center; cursor:pointer`. `tabindex="0"` for keyboard access |
| Hover / drag | `.di-dropzone:hover, .di-dropzone.drag-over` | Brand-blue border + subtle bg tint. JS adds `.drag-over` on `dragenter`, removes on `dragleave` |
| Visual | `.di-dz-visual` | flex, centered, `margin-bottom:16px`. Wraps the upload icon ring |
| Headline | `.di-dz-headline` | 13px/600, `--d100`, `margin-bottom:6px`. `.di-browse` inline span uses brand color + underline |
| Sub text | `.di-dz-sub` | 12px, `--d500` |
| Format strip | `.di-format-info` | `margin-top:14px`, ghost bg + hairline border, 10px radius, flex-column gap 10px |
| Format row | `.di-format-row` | flex space-between, gap 8px |
| Label | `.di-format-label` | 11px/500, `--d500` |
| Value | `.di-format-val` | 11px, `--d300` |
| Format chips | `.di-format-chips` | flex, gap 4px. Each `.di-chip`: 10px/600, ghost bg, 5px radius |

## Upload Queue

Each file dropped or selected becomes a `.di-qitem` card in the queue. A 2px progress bar uses the **AI gradient** while in-progress, then snaps to `--ok` (complete) or `--err` (failed). The cancel button turns red on hover. `.di-qitem-status` renders "Uploading…", "Complete ✓", or "Failed ✕" with semantic color modifiers. The queue header holds a title + a "Clear completed" text button.

| Element | Class | Notes |
| --- | --- | --- |
| Queue header | `.di-queue-header` | flex space-between, `margin-bottom:12px`. `.di-section-title` (11px/700 uppercase --d400) + `.di-text-btn` (ghost "Clear completed") |
| Queue item | `.di-qitem` | Ghost bg + hairline border, 9px radius, 12px 14px padding, `margin-bottom:8px` |
| Item header | `.di-qitem-hd` | flex, gap 8px, `margin-bottom:8px`. Holds name + size + cancel btn |
| Name | `.di-qitem-name` | flex:1, 12px/500, `--d100`, truncated |
| Size | `.di-qitem-size` | 11px, `--d500`, flex-shrink:0 |
| Cancel | `.di-qitem-cancel` | Ghost × btn, `--d600`. `:hover`: `--err` |
| Progress track | `.di-qitem-prog` | 2px height, `rgba(255,255,255,0.07)` bg, `margin-bottom:6px` |
| Progress bar | `.di-qitem-progbar` | AI gradient while uploading. Add `.done`: `--ok`. Add `.failed`: `--err`. Width controlled by JS via inline style |
| Status text | `.di-qitem-status` | 10px, `--d500`. Add `.ok`: `--ok`. Add `.err`: `--err` |

## AiMY Actions Strip

A blue-tinted contextual action strip shown after a successful upload. AiMY surfaces 3–5 suggested next steps as pill chips. Each chip fires a specific action when clicked (map columns, validate schema, preview data, schedule sync). The strip sits above the pipeline table and is dismissed after all actions are taken or the user closes it.

| Element | Class | Notes |
| --- | --- | --- |
| Strip wrapper | `.di-aimy-actions` | flex, flex-wrap, gap 8px, `padding:16px 18px; margin-bottom:32px`. Blue tint bg + border, 12px radius |
| Label row | `.di-aimy-actions-label` | `width:100%`, 10px/700, uppercase, brand-blue tint color, margin-bottom 6px. Holds AiMY logo SVG + "AiMY suggests" |
| Chip | `.di-aimy-chip` | Brand-blue tinted pill, ghost bg + border. 11px/500, gap 6px. Hover: darker tint. SVG icon `opacity:0.7` |

## Sync Events

A chronological list of recent sync runs for the selected source. Each event is a flex row: a 7px status dot, a timestamp, and an outcome text. Read-only. Used in the source detail panel to show recent activity at a glance. Failed events expose a `.di-failed-item` card with error type, message, and retry/dismiss actions.

| Element | Class | Notes |
| --- | --- | --- |
| Event row | `.di-sync-event` | flex, gap 14px, `padding:11px 0; border-bottom:1px solid rgba(255,255,255,0.05)`. Last child: no border |
| Status dot | `.di-sync-dot.di-sync-ok/.di-sync-fail` | 7px circle. ok=`--ok`, fail=`--err` |
| Timestamp | `.di-sync-time` | `--d300`, flex:1 |
| Outcome | `.di-sync-out.ok/.fail` | 12px/600. ok=`--ok`, fail=`--err` |
| Failed item card | `.di-failed-item` | err-tinted bg + border, 10px radius. flex row: icon + info + actions |
| Failed ID | `.di-failed-id` | 13px/600, `--d100` |
| Error type | `.di-failed-type` | 11px/600, `--warn` |
| Error message | `.di-failed-msg` | 12px, `--d400`, `line-height:1.5` |
| Timestamp | `.di-failed-ts` | 10px, `--d500`, `margin-top:5px` |
| Actions | `.di-failed-actions` | flex, gap 4px, flex-shrink:0. Each `.di-icon-btn`: ghost, 6px radius, 6px padding |

## Config Modal + Add Source Wizard

Two modal variants share the same `.di-modal` shell: the **Config modal** (edit an existing source, tab-based: Connection / Sync settings / Danger zone) and the **Add Source wizard** (multi-step flow with a `.di-wiz-steps` progress indicator). Both use `background:#1a2330`, entrance animation `mIn` (translateY(10px)+scale(0.97) → identity, 260ms). Size variants: default 480px, `.di-modal-lg` 560px, `.di-modal-sm` 400px.

### Modal anatomy

| Element | Class | Notes |
| --- | --- | --- |
| Modal | `.di-modal` | `background:#1a2330; border-radius:14px; width:480px; max-width:94vw`. Animates in via `mIn` keyframe |
| Wide | `.di-modal-lg` | Added to `.di-modal` · 560px width |
| Small | `.di-modal-sm` | Added to `.di-modal` · 400px width |
| Header | `.di-modal-hd` | flex space-between, `padding:22px 22px 18px`, bottom border |
| Title | `.di-modal-title` | 14px/700, `--d50` |
| Close btn | `.di-modal-x` | Ghost icon btn, 6px radius, 6px pad. `:hover`: --d50 + white-09% bg |
| Body | `.di-modal-bd` | `padding:22px; overflow-y:auto; flex:1`. Thin scrollbar (4px) |
| Footer | `.di-modal-ft` | `padding:16px 22px`, top border, flex right-aligned, gap 8px |

### Wizard step indicator (`.di-wiz-steps`)

| Element | Class | Notes |
| --- | --- | --- |
| Steps row | `.di-wiz-steps` | flex, gap 6px, `margin-top:8px` |
| Step circle | `.di-ws` | 24px circle, ghost bg. Add `.on`: brand fill. Add `.done`: ok fill + ✓ content |
| Connector | `.di-ws-ln` | flex:1, 1px height, `rgba(255,255,255,0.09)` |

### Source selector grid (`.di-wiz-src-grid`)

| Element | Class | Notes |
| --- | --- | --- |
| Grid | `.di-wiz-src-grid` | `display:grid; grid-template-columns:1fr 1fr; gap:10px` |
| Option | `.di-wiz-src-opt` | Ghost bg + border, 10px radius, 16px pad. `:hover`: brand tint. `.selected`: brand border + bg |
| Icon | `.di-wiz-src-ico` | 18px emoji, `margin-bottom:10px` |
| Name | `.di-wiz-src-nm` | 13px/600, `--d100` |
| Sub | `.di-wiz-src-sub` | 11px, `--d500` |

### Config modal tabs

| Element | Class | Notes |
| --- | --- | --- |
| Tab strip | `.di-cfg-tabs` | flex, border-bottom, `margin-bottom:18px` |
| Tab | `.di-cfg-tab` | 11px/600, `--d400`, ghost. Add `.active`: 2px `--brand` bottom border + `--d50` text |
| Form field | `.di-field` | Ghost bg, 8px radius, brand focus border. Text/password/select inputs |
| Password field | `.di-field-pw` | Added to `.di-field`, monospace font, `letter-spacing:0.1em`, always masked |
| Danger zone | `.di-danger-zone` | err-tinted border block at modal bottom. Holds "Pause ingestion" (ghost) + "Delete source" (err) btns |
| Test status | `.di-test-status.di-test-ok/.di-test-fail` | Semantic-tinted block shown after "Test connection", ok or fail |
