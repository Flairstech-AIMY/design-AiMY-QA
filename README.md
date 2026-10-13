# AiMY QA

AiMY QA is a static HTML dashboard for quality auditing, evaluation feedback, and portfolio-level quality reporting. This repository is intentionally lightweight: the product surfaces are HTML pages, shared CSS/JS assets, and Storybook stories for the key UI contracts.

## Source Of Truth

This README is the product and UI source of truth. The HTML and CSS implement the decisions recorded here; they should not silently introduce a different terminology, metric definition, or client boundary.

When a product decision changes:

1. Update the relevant section below.
2. Add a dated entry to the change log.
3. Update the affected HTML and Storybook story in the same change.
4. Run `npm run build-storybook` to verify the documented surface still builds.

## Client Contracts

The dashboard supports three client contracts. All information can remain available, but each contract has a different first-order focus.

| Client | Primary focus | Must foreground | Must not imply |
| --- | --- | --- | --- |
| Audit client | Audit health | Audited interactions, audit KPIs, fail rate, quality score, product comparison, improvement actions | Evaluation goals or feedback workflow as the main model |
| Evaluation client | Evaluation and feedback operations | Evaluated interactions, feedback loops, coaching, sentiment, agent follow-through | Audit KPIs as if they were evaluation goals |
| Audit + Evaluation client | Both perspectives | Both datasets with explicit section boundaries | A blended metric with no provenance |

The dashboard uses the combined `Both` view by default. Audit and evaluation content remains visible together, with explicit section boundaries and no separate lens control.

## Terminology Rules

- Use **audit** or **audited ticket/interaction** for quality-auditing data.
- Use **evaluation** for scored feedback or agent evaluation data.
- Use **audit KPI** for audit dimensions such as ticket status accuracy, grammar and clarity, or update cadence.
- Use **goal** only for evaluation/feedback goals. Do not use “goals” as a generic replacement for audit KPIs.
- Never show a bare count. Include its unit: `411 tickets`, `39 interactions`, `5 rated good`.
- Never show a bare percentage when the metric is ambiguous. Name it: `79.2% quality`, `CSAT 72%`, or `7.3% of audits fail`.
- Important numbers and words may be bold or semantic-colored. Supporting prose stays quiet.
- Sentiment is categorical: **Positive**, **Neutral**, or **Negative**. A sentiment category is not a numeric score.
- A quality score must remain visually discoverable and should not be buried beneath generic insight copy.

## Dashboard Surfaces

### Manager / Audit health

The manager dashboard summary row contains:

- **Fail Rate**: `7.3% of audits fail`, with the audited-ticket denominator shown.
- **Total audits**: `396 audited tickets`, with the count of tickets that failed at least one KPI.
- **Sentiment**: semantic sentiment state with supporting interaction count.
- **CSAT**: positive outcome and rated-good count when the client lens includes evaluation data.

The next section is **Audit KPI detail**, which presents target, evidence, and an improvement action.

### Director / Portfolio audit quality

The director panel is titled **Portfolio audit quality**. It compares:

- Average audit quality score by portfolio versus the 90% target.
- CSAT as a contextual companion metric.
- Product/portfolio names and explicit units for every value.

The intended executive question is: **How is the organization performing, and is it improving or declining over time and across portfolios?**

### Evaluation / feedback loop

Evaluation content is grouped under the feedback loop and evaluation client lens. It covers feedback waiting, acknowledgement, coaching, follow-through, and sentiment actions. It should not be presented as audit KPI performance.

### My results

- The dashboard no longer has a QA results workspace or a **My results** toggle. Both were removed by decision.
- **View my QA** in the account menu (the profile pill in the top bar, [`assets/aimy-user-menu.js`](assets/aimy-user-menu.js)) is a checkbox only. Picking it ticks or unticks it and closes the menu. It opens no view and changes no filter. The tick is remembered per browser in `localStorage['aimy-qa-view-my-qa']`, a preference flag that holds no identity or records.
- The results engine ([`assets/aimy-results.js`](assets/aimy-results.js)) now runs only on the standalone [`my-qa.html`](my-qa.html) page. The rules below describe that page.
- “My” matches a review's `evaluatedUserId` to an explicitly supplied session `id`: work performed by the evaluated user, not reviews they authored. The displayed profile name/initials are never authentication. Production must provide server-authorized records; this browser scope is not access control.
- `window.AIMY_QA_RESULTS_SCOPE` exposes `get/set`, `getSession/setSession`, `setRecords`, `setLoading`, `getVisibleRecords`, `getPersonalRecords`, `getMetrics`, `previewDemo`, `exitDemo`, and `exportCSV`. Supply session before records. Changing the session ID or signing out clears loaded records; callers must discard obsolete asynchronous responses themselves.
- Initial data is disconnected. **Preview sample data** loads the six fictional source-prototype reviews, clearly labeled; four evaluate the sample user. Preview never changes existing filters. Exit restores the pre-preview in-memory data; it does not turn off the scope.
- Interaction, client, product and date filters determine rows, metrics and CSV. Average quality uses valid numeric scores from 0–100; pass rate uses only explicit boolean pass/fail decisions; attention uses explicit `needs-attention` flags. Missing/invalid dates cannot pass bounded ranges. Missing scores are unavailable, not zero. The current prototype's default period remains 1 January–15 September 2026.
- CSV uses the displayed newest-first order and normalized table values, quotes/escapes cells and guards spreadsheet formulas. No rows or loading disables export; turning My results off restores the original dashboard export state.
- Filter values travel in the My QA page URL and back to the dashboard's existing filter restoration. User identity and review records are never included in URLs, local-storage view presets, or conversation snapshots.
- Chat is not connected to these records: My QA discloses this boundary, and new personal-scope questions return an honest unavailable answer instead of canned aggregate metrics.

### AiMY insights panel (left rail)

- Built by [`assets/aimy-rail.js`](assets/aimy-rail.js) and [`assets/aimy-rail.css`](assets/aimy-rail.css) on all six product pages (Dashboard, Reviews, My Profile, Goal Hub, Data, Settings). Its job is to report AiMY's findings per page, with each finding leading to its page.
- **Open (272px):** one section per page, with the page's icon and name as a header link, then its findings as compact rows (figure + label; Reviews rows add a proportion bar and deep-link to their queue). The current page comes first, tinted, with a "You're here" tag instead of a link. The other pages keep a fixed order.
- **Collapsed (64px):** the AiMY mark with the total insight count (expands the panel), then the six page icons, each with its headline figure as a badge (Reviews shows the total items waiting). Hover or focus shows "Page — finding".
- **State:** `<html data-rail="open|collapsed">`, set before paint by `assets/aimy-viewport.js`. At 1100px and wider the choice is remembered in `localStorage['aimy-qa-rail']` and is open by default. Below 1100px the panel is always collapsed, and expanding it opens a temporary overlay drawer (Escape, the scrim or a link closes it) that is not remembered.
- Findings are prototype constants (Reviews reads the page's live review summary when available). Every figure is a single neutral accent, with no severity colours.

## Interaction Rules

- Every metric card should answer “what is this?” without requiring a hover or chat interaction.
- Actions should name the decision or next step, for example `Review the fail-rate trend` or `Approve the response-time fix`.
- AiMY can provide deeper charts and drill-downs, but the dashboard should show the key trend or comparison directly when that trend is central to the user’s decision.
- Manager and Director views share information. Their difference is emphasis and available actions, not hidden data.

## Storybook

Storybook documents the UI contracts that are easiest to regress:

- `AiMY QA/Dashboard/Client Lens`
- `AiMY QA/Dashboard/Summary Cards`
- `AiMY QA/Dashboard/Portfolio Audit Quality`

Run Storybook locally with:

```powershell
npm.cmd run storybook
```

Build the static Storybook output with:

```powershell
npm.cmd run build-storybook
```

The Storybook stories are intentionally standalone HTML renderings. They use the same visual language and metric definitions as the dashboard without importing the entire interactive page.

## Node Version

This project uses Node `24.20.0`, the current Node 24 LTS patch available in this environment. The version is pinned in both `.nvmrc` and `.nvm` for tooling compatibility.

With NVM for Windows installed, open a new terminal so the installer PATH changes are loaded, then run:

```powershell
nvm use 24.20.0
node --version
npm.cmd install
```

The expected Node version is `v24.20.0`. The package manifest also declares the supported range as `>=24.20.0 <25`.

## Change Log

### 2026-10-12

- Redesigned the AiMY insights panel. Open, it groups findings by page in compact sections, with the current page first. Collapsed, it shows badged page icons and an AiMY expand button instead of a hamburger menu. It can now be collapsed at any width, and the choice is remembered across pages.
- The collapsed AiMY rail is now borderless. Each icon sits in a plain 40px square. Hovering gives it a soft wash, and the current page gets an accent tint without an outline or glow. The count badges are a faint accent wash with medium-weight figures. The rail is identical on every page except for one thing: the page you're on moves to the top, just under the AiMY mark. The other five follow in their usual order at an even spacing. Picking another page animates that reorder before the page changes. In both views the item you picked slides up into the top slot and the one you're leaving drops back into place, over 240ms. Keyboard activation, opening in a new tab, and reduced motion all skip the animation.
- The profile pill in the top bar is now a menu button on all six pages. Its menu has one item, **View my QA**, a checkbox that ticks or unticks and closes the menu without opening anything. The dashboard's **My results** toolbar button and its QA results workspace are removed. The menu uses the notifications panel's surface with the design system's compact dropdown sizing and motion. It works with the keyboard: Enter or the down arrow opens it, and Escape closes it.
- Fixed the Reviews page's CSS reset, which a stray line of script had disabled. Without it the page kept the browser's 8px body margin, so the whole app, rail included, sat 8px in from the window edge.
- Every vertical scroller on the product pages now uses an animated scroll indicator instead of the native scrollbar. This includes surfaces that open later, such as the evaluation panel and the full email thread. It's a translucent accent dot with no visible track. While scrolling it trails a flame sized by scroll speed, and when scrolling stops it lands with a bounce. Drag the dot to scroll. The dot sits on the far right, where the native scrollbar was. For centered reading columns, such as the chat and the email thread, that's the right edge of the surrounding panel. It's shared in `assets/aimy-scroll.js` and `assets/aimy-scroll.css` and finds scrollers automatically. The AiMY chat adds a clickable track and shows a **Latest** pill once you've scrolled away from the newest message. Surfaces that scroll both ways, such as wide tables, keep the shared native bar. You can opt a subtree out with `data-scroll-dot="off"`. Reduced-motion users get the dot without the flame or bounce.
- **My results** on the dashboard toolbar now opens the QA results workspace (sample banner, four summary cards, evaluation records table), ported from the Smart Simple My Results prototype. With no connected account data, it opens the labeled sample preview directly.

### 2026-10-08

- Added a dedicated My QA results page linked from the dashboard filter toolbar; the link carries active dashboard filters and the return link restores them for editing.
- Added functional, labeled sample preview; explicit user matching; filtered metrics and safe CSV; account-change clearing; personal-chat context disclosure.
- Preserved the aggregate dashboard shell, role/content choices, filter controls, shortcuts, icons and shared responsive assets.

### 2026-09-08

- Aligned dashboard typography with the AiMY design system by loading Poppins and JetBrains Mono, binding the shared font tokens, and using the display face for the Audit health heading.
- Added the Client lens with Audit client, Evaluation client, and Audit + Evaluation modes.
- Removed the Client lens control and made the combined Audit + Evaluation view the fixed dashboard default.
- Established the audit-versus-evaluation boundary in the dashboard.
- Renamed ambiguous “Goals Off Track” language to **Audit KPIs** and added an Audit KPI detail heading.
- Added explicit summary cards for Fail Rate, Sentiment, and CSAT.
- Removed the Audit KPIs summary card to keep the Audit health row focused on the primary quality signals.
- Changed Fail Rate to a healthy `7.3%`, with `29 of 396 audited tickets`, and aligned the state/action copy.
- Changed Sentiment to a semantic **Positive** state rather than a numeric value.
- Revised the Director panel to **Portfolio audit quality** and labeled the values as average audit quality and CSAT.
- Added units to product counts and metric labels, including `tickets`, `quality`, and `CSAT`.
- Connected the CSAT period badge to the Quality Score range filter: YTD, 90D, 30D, and 7D now show matching evaluation periods.
- Added Storybook with the HTML/Vite framework and stories for the client lens, summary cards, and portfolio comparison.

## Repository Map

- `index.html`: main dashboard implementation.
- `assets/`: shared canvas, rail, responsive, and viewport behavior.
- `design-strategy/`: design doctrine and remediation references.
- `stories/`: Storybook documentation for stable UI contracts.
- `.storybook/`: Storybook configuration.
