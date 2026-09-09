import './aimy-storybook.css';

const card = ({ label, value, caption, status, tone = '', badge = '' }) => `
  <article class="sb-card">
    <div class="sb-card-meta">
      <span class="sb-label">${label}</span>
      ${badge ? `<span class="sb-pill ${tone}">${badge}</span>` : ''}
    </div>
    <div class="sb-value ${tone}">${value}</div>
    <div class="sb-caption">${caption}</div>
    <div class="sb-status ${tone}">${status}</div>
  </article>`;

export default {
  title: 'AiMY QA/Dashboard',
  parameters: { layout: 'fullscreen' }
};

export const ClientLens = {
  render: () => `
    <main class="sb-page">
      <div class="sb-shell">
        <div class="sb-heading">
          <div class="sb-eyebrow">Source of truth · dashboard lens</div>
          <h1>Choose the client contract before reading the numbers</h1>
          <p>Audit, evaluation, and combined views use the same visual language with a different focus.</p>
        </div>
        <section class="sb-card sb-lens">
          <div class="sb-lens-copy"><span class="sb-label">Client lens</span><div><strong>Audit + Evaluation</strong> · both perspectives remain visible with a clear boundary.</div></div>
          <div class="sb-lens-options"><button class="active">Audit client</button><button>Evaluation client</button><button>Both</button></div>
        </section>
      </div>
    </main>`
};

export const SummaryCards = {
  render: () => `
    <main class="sb-page"><div class="sb-shell">
      <div class="sb-heading"><div class="sb-eyebrow">Audit health</div><h1>Four summary signals, with units and meaning</h1><p>Numbers are labeled so the metric never depends on guesswork.</p></div>
      <div class="sb-grid">
        ${card({ label: 'Fail Rate', value: '7.3%', caption: 'of audits fail', status: '29 of 396 audited tickets', tone: 'ok', badge: 'P3 · HEALTHY' })}
        ${card({ label: 'Audit KPIs', value: '3', caption: 'KPIs below target', status: 'Lowest: empathy 32%', tone: 'err', badge: 'P1 · URGENT' })}
        ${card({ label: 'Sentiment', value: 'Positive', caption: 'sentiment', status: '39 positive interactions this week', tone: 'ok', badge: 'P3 · POSITIVE' })}
        ${card({ label: 'CSAT', value: '100%', caption: 'positive outcome', status: '5 of 5 rated good', tone: 'ok', badge: 'THIS WEEK' })}
      </div>
    </div></main>`
};

export const PortfolioAuditQuality = {
  render: () => `
    <main class="sb-page"><div class="sb-shell">
      <div class="sb-heading"><div class="sb-eyebrow">Director view</div><h1>Portfolio audit quality</h1><p>Average audit quality score by portfolio · CSAT for context.</p></div>
      <section class="sb-card">
        <h2 class="sb-panel-title">Portfolio comparison</h2>
        <p class="sb-panel-subtitle">Average audit quality vs 90% target</p>
        <div class="sb-portfolio">
          ${[['Objectif Lune','79.2%','72%','warn'],['Qvidian','80.1%','74%','warn'],['Second Street','86.0%','83%','warn'],['InterFax','88.4%','86%','warn'],['RightAnswers','91.3%','89%','ok'],['Adestra','93.7%','91%','ok']].map(([name, quality, csat, tone]) => `<div class="sb-portfolio-row"><span class="sb-portfolio-name">${name}</span><span class="sb-portfolio-metrics">CSAT ${csat} · <strong>${quality} quality</strong></span><div class="sb-track"><div class="sb-fill ${tone}" style="width:${quality.replace('%','')}%"></div></div></div>`).join('')}
        </div>
      </section>
    </div></main>`
};
