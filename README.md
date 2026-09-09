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
