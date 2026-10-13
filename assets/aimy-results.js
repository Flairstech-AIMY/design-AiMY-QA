/*
 * AiMY QA Results: current-user view. UI prototype only.
 * Ported from AiMY_QA_Smart_Simple_My_Results.html (qa-results-scope-engine).
 * The returned data MUST already be permission-filtered on the server in production.
 * Do not use a browser toggle to enforce access control.
 *
 * Wire authenticated data (never derive user ID from the visible avatar/name):
 *   window.AIMY_QA_RESULTS_SCOPE.setSession({ id: auth.userId, name: auth.name });
 *   window.AIMY_QA_RESULTS_SCOPE.setRecords(authorizedReviewRows);
 * Each row requires evaluatedUserId to qualify for "My results". reviewerId,
 * createdBy and assignedTo are NOT interchangeable with evaluatedUserId.
 *
 * Prototype behavior: turning My results on with no connected data opens the
 * clearly labeled sample preview directly; turning it off restores the dashboard.
 */
(function () {
  'use strict';
  var root = document.documentElement;
  var byId = function (id) { return document.getElementById(id); };
  var mineButton = byId('qaScopeMine');
  var workspace = byId('qaResultsWorkspace');
  if (!workspace) return;
  var mode = root.getAttribute('data-qa-results-scope') === 'mine' ? 'mine' : 'all';
  var session = null, records = [], recordsLoaded = false, loading = false, demoMode = false, autoDemo = false, backup = null;
  var exportButtons = Array.prototype.slice.call(document.querySelectorAll('.gps-export-btn'));
  var initialExports = exportButtons.map(function (button) {
    return { button: button, disabled: button.disabled, title: button.getAttribute('title'), aria: button.getAttribute('aria-label') };
  });
  var DEFAULT_FROM = '2026-01-01', DEFAULT_TO = '2026-09-15';

  function cleanSession(value) {
    if (!value || typeof value !== 'object' || typeof value.id !== 'string' || !value.id.trim()) return null;
    return { id: value.id.trim(), name: String(value.name || 'Current user').trim() || 'Current user' };
  }
  function cleanRecords(value) {
    if (!Array.isArray(value)) return [];
    return value.filter(function (r) { return r && typeof r === 'object'; })
      .map(function (r) { return Object.assign({}, r); });
  }
  function copyRows(rows) { return rows.map(function (r) { return Object.assign({}, r); }); }
  function node(tag, className, content) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (content !== undefined) n.textContent = String(content);
    return n;
  }
  function text(id, value) { var el = byId(id); if (el) el.textContent = String(value); }
  function setHidden(id, hidden) { var el = byId(id); if (el) el.hidden = hidden; }
  function pageFilters() {
    var supplied = window.AIMY_QA_FILTERS && typeof window.AIMY_QA_FILTERS.get === 'function'
      ? window.AIMY_QA_FILTERS.get() : {};
    return {
      interaction: supplied.interaction || 'all',
      clients: Array.isArray(supplied.client) ? supplied.client : [],
      products: window.AIMY_SCOPE && typeof window.AIMY_SCOPE.get === 'function'
        ? window.AIMY_SCOPE.get() : (Array.isArray(supplied.product) ? supplied.product : []),
      from: typeof supplied.from === 'string' ? supplied.from : '',
      to: typeof supplied.to === 'string' ? supplied.to : ''
    };
  }
  function belongsToCurrentUser(row) {
    // Do not treat reviews CREATED BY a user as reviews OF their work.
    return !!session && typeof row.evaluatedUserId === 'string' && row.evaluatedUserId === session.id;
  }
  function personalRecords() { return records.filter(belongsToCurrentUser); }
  function filterRows(list, filters) {
    return list.filter(function (r) {
      if (filters.interaction !== 'all' && r.interaction !== filters.interaction) return false;
      if (filters.clients.length && filters.clients.indexOf(r.client) < 0) return false;
      if (filters.products.length && filters.products.indexOf(r.product) < 0) return false;
      // Missing dates must not silently pass a bounded date selection.
      if (filters.from && (typeof r.reviewDate !== 'string' || r.reviewDate < filters.from)) return false;
      if (filters.to && (typeof r.reviewDate !== 'string' || r.reviewDate > filters.to)) return false;
      return true;
    });
  }
  function visibleRecords() {
    return filterRows(mode === 'mine' ? personalRecords() : records, pageFilters());
  }
  function score(row) {
    return typeof row.score === 'number' && Number.isFinite(row.score) && row.score >= 0 && row.score <= 100
      ? row.score : null;
  }
  function fmtPct(value) { return value === null ? 'Not available' : value.toFixed(1) + '%'; }
  function getMetrics(rows) {
    var scored = rows.filter(function (r) { return score(r) !== null; });
    var decisions = rows.filter(function (r) { return typeof r.passed === 'boolean'; });
    return {
      totalReviews: rows.length,
      scoredReviews: scored.length,
      averageScore: scored.length ? scored.reduce(function (a, r) { return a + score(r); }, 0) / scored.length : null,
      assessedReviews: decisions.length,
      passRate: decisions.length ? decisions.filter(function (r) { return r.passed; }).length / decisions.length * 100 : null,
      needsAttention: rows.filter(function (r) { return r.status === 'needs-attention'; }).length
    };
  }
  function anyExtraFilters() {
    var f = pageFilters();
    return f.interaction !== 'all' || f.clients.length > 0 || f.products.length > 0 ||
      (f.from && f.from !== DEFAULT_FROM) || (f.to && f.to !== DEFAULT_TO);
  }
  function empty(heading, explanation, allowPreview, allowClear) {
    text('qaResultsEmptyTitle', heading);
    text('qaResultsEmptyText', explanation);
    setHidden('qaResultsPreviewDemo', !allowPreview);
    setHidden('qaResultsClearFilters', !allowClear);
    setHidden('qaResultsEmpty', false);
    setHidden('qaResultsData', true);
  }
  function renderStats(rows) {
    var m = getMetrics(rows);
    var cells = [
      ['QA reviews', String(m.totalReviews), 'Results matching this view'],
      ['Average quality', fmtPct(m.averageScore), m.scoredReviews + ' scored of ' + m.totalReviews + ' reviews'],
      ['Pass rate', fmtPct(m.passRate), m.assessedReviews + ' explicit pass/fail decisions'],
      ['Need attention', String(m.needsAttention), 'Explicitly flagged for follow-up']
    ];
    var grid = byId('qaResultsStats');
    grid.replaceChildren();
    cells.forEach(function (c) {
      var item = node('div', 'qa-results-stat');
      item.appendChild(node('div', 'qa-results-stat-label', c[0]));
      item.appendChild(node('div', 'qa-results-stat-value', c[1]));
      item.appendChild(node('div', 'qa-results-stat-detail', c[2]));
      grid.appendChild(item);
    });
  }
  function addCell(row, content, strong) {
    row.appendChild(node('td', strong ? 'qa-strong' : '', content == null || content === '' ? 'Not specified' : content));
  }
  function renderRows(rows) {
    var body = byId('qaResultsRows');
    body.replaceChildren();
    rows.slice().sort(function (a, b) {
      return String(b.reviewDate || '').localeCompare(String(a.reviewDate || ''));
    }).forEach(function (r) {
      var tr = node('tr');
      addCell(tr, r.id || r.title || 'Review', true);
      addCell(tr, r.reviewDate || null);
      addCell(tr, r.productLabel || r.product || null);
      addCell(tr, r.client || null);
      addCell(tr, r.interaction === 'calls' ? 'Call' : r.interaction === 'tickets' ? 'Ticket' : r.interaction || null);
      addCell(tr, r.evaluatorName || null);
      addCell(tr, score(r) === null ? null : fmtPct(score(r)), true);
      var outcome = r.status === 'needs-attention' ? ['Needs attention', 'attention']
        : r.status === 'completed' ? ['Completed', 'completed'] : ['Not specified', ''];
      var td = node('td'); td.appendChild(node('span', 'qa-results-pill ' + outcome[1], outcome[0]));
      tr.appendChild(td);
      body.appendChild(tr);
    });
    text('qaResultsCount', rows.length + ' review' + (rows.length === 1 ? '' : 's') + ' matching the current scope and filters');
    text('qaResultsFootnote', 'Scores and exports match the current scope and filters.');
  }
  function syncExport(active) {
    var count = active && !loading ? visibleRecords().length : 0;
    var inner = byId('qaResultsExport');
    if (inner) inner.disabled = count === 0;
    initialExports.forEach(function (item) {
      if (active) {
        item.button.disabled = count === 0;
        item.button.setAttribute('aria-label', 'Export visible QA reviews');
        item.button.title = count === 0 ? 'No matching review records to export' : 'Export displayed QA reviews as CSV';
      } else {
        item.button.disabled = item.disabled;
        if (item.title === null) item.button.removeAttribute('title'); else item.button.title = item.title;
        if (item.aria === null) item.button.removeAttribute('aria-label'); else item.button.setAttribute('aria-label', item.aria);
      }
    });
  }
  function render() {
    root.setAttribute('data-qa-results-scope', mode);
    if (mineButton) {
      mineButton.setAttribute('aria-pressed', String(mode === 'mine'));
      mineButton.title = mode === 'mine'
        ? 'Turn off My results to return to the dashboard'
        : 'Show QA reviews of work you performed';
    }
    setHidden('qaScopeIndicator', mode !== 'mine');
    var scopeDetail = '';
    if (mode === 'mine') {
      if (loading) scopeDetail = ' · Loading reviews';
      else if (!session) scopeDetail = ' · Account data not connected';
      else if (!recordsLoaded) scopeDetail = ' · Review data not connected';
      else {
        var ownCount = visibleRecords().length;
        var allCount = filterRows(records, pageFilters()).length;
        scopeDetail = ownCount === 0
          ? ' · No matching reviews' : ' · ' + ownCount + ' of ' + allCount + ' accessible reviews';
      }
    }
    text('qaScopeIndicatorDetail', scopeDetail);
    var active = mode === 'mine' || loading;
    workspace.hidden = !active;
    workspace.setAttribute('aria-busy', String(loading));
    root.setAttribute('data-qa-results-workspace', active ? 'active' : 'inactive');
    syncExport(active);
    if (!active) return; // The aggregate dashboard remains unchanged.
    setHidden('qaResultsDemoBanner', !demoMode);
    setHidden('qaResultsExitDemo', !demoMode);
    text('qaResultsDescription', 'Review-level quality metrics and evaluations for your selected filters.');
    if (loading) {
      empty('Loading QA results', 'Loading the review records for the selected results scope and filters.', false, false);
      return;
    }
    if (!session) {
      empty('Personal QA data not connected',
        'This prototype has no authenticated user ID. It cannot infer your personal QA reviews from the team dashboard. Connect the signed-in user and review records, or preview clearly labeled sample data.',
        !demoMode, false);
      return;
    }
    if (!recordsLoaded) {
      empty('QA review records not connected',
        'This prototype needs review-level records to display results for your account.', !demoMode, false);
      return;
    }
    if (!personalRecords().length) {
      empty('No evaluations of your work available',
        'None of the supplied QA records identify the signed-in user as the person evaluated. Reviews you authored about someone else are not counted.',
        !demoMode, false);
      return;
    }
    var rows = visibleRecords();
    if (!rows.length) {
      empty('No QA results match these filters',
        'There are reviews in this view, but none match the selected interaction, client, product and date filters. Try clearing the other filters.',
        false, anyExtraFilters());
      return;
    }
    setHidden('qaResultsEmpty', true);
    setHidden('qaResultsData', false);
    renderStats(rows);
    renderRows(rows);
  }
  function hasConnectedData() { return !!session && recordsLoaded; }
  function setScope(next, options) {
    if (next !== 'all' && next !== 'mine') return false;
    var previous = mode;
    mode = next;
    if (mode === 'mine' && !demoMode && !loading && !hasConnectedData()) {
      autoDemo = true;
      previewDemo();
    } else if (mode === 'all' && autoDemo) {
      exitDemo();
    } else {
      render();
    }
    if (previous !== mode && !(options && options.silent)) {
      window.dispatchEvent(new CustomEvent('aimy:results-scope-changed', {
        detail: { scope: mode, previous: previous, timestamp: Date.now() }
      }));
    }
    return true;
  }
  function exitDemo() {
    autoDemo = false;
    if (!demoMode) { render(); return; }
    var prior = backup;
    demoMode = false;
    backup = null;
    session = prior.session;
    records = prior.records;
    recordsLoaded = prior.loaded;
    render();
  }
  function previewDemo() {
    if (!demoMode) backup = { session: session, records: records, loaded: recordsLoaded };
    demoMode = true;
    session = { id: 'qa-demo-user', name: 'Demo user' };
    // Fictional data. A review of someone else's work authored by the demo user
    // deliberately tests the difference between reviewerId and evaluatedUserId.
    records = [
      { id: 'DEMO-101', evaluatedUserId: 'qa-demo-user', reviewerId: 'qa-reviewer-1', evaluatorName: 'Reviewer A', reviewDate: '2026-09-10', product: 'asteris', productLabel: 'Asteris', client: 'Adestra', interaction: 'tickets', score: 94, passed: true, status: 'completed' },
      { id: 'DEMO-102', evaluatedUserId: 'qa-demo-user', reviewerId: 'qa-reviewer-2', evaluatorName: 'Reviewer B', reviewDate: '2026-09-12', product: 'secondstreet', productLabel: 'SecondStreet', client: 'Second Street', interaction: 'calls', score: 82, passed: false, status: 'needs-attention' },
      { id: 'DEMO-103', evaluatedUserId: 'qa-demo-user', reviewerId: 'qa-reviewer-2', evaluatorName: 'Reviewer B', reviewDate: '2026-08-26', product: 'upland', productLabel: 'Upland', client: 'InterFax', interaction: 'tickets', score: 88, passed: true, status: 'completed' },
      { id: 'DEMO-104', evaluatedUserId: 'qa-demo-user', reviewerId: 'qa-reviewer-1', evaluatorName: 'Reviewer A', reviewDate: '2026-08-21', product: 'asteris', productLabel: 'Asteris', client: 'Adestra', interaction: 'calls', score: 91, passed: true, status: 'completed' },
      { id: 'DEMO-105', evaluatedUserId: 'another-demo-user', reviewerId: 'qa-demo-user', evaluatorName: 'Demo user', reviewDate: '2026-09-11', product: 'upland', productLabel: 'Upland', client: 'Adestra', interaction: 'tickets', score: 55, passed: false, status: 'needs-attention' },
      { id: 'DEMO-106', evaluatedUserId: 'another-demo-user', reviewerId: 'qa-reviewer-3', evaluatorName: 'Reviewer C', reviewDate: '2026-09-13', product: 'secondstreet', productLabel: 'SecondStreet', client: 'Second Street', interaction: 'calls', score: 68, passed: false, status: 'needs-attention' }
    ];
    recordsLoaded = true;
    render();
  }
  function exportCSV() {
    if (loading || !recordsLoaded || (mode === 'mine' && !session)) return false;
    var rows = visibleRecords().sort(function (a, b) {
      return String(b.reviewDate || '').localeCompare(String(a.reviewDate || ''));
    });
    if (!rows.length) return false;
    var fields = [
      ['Review', 'id'], ['Date', 'reviewDate'], ['Product', 'productLabel'], ['Client', 'client'],
      ['Interaction', 'interaction'], ['Evaluator', 'evaluatorName'], ['Score', 'score'], ['Status', 'status']
    ];
    function escapeCSV(value) {
      var v = String(value == null ? '' : value);
      // Prevent spreadsheet formula execution from untrusted row values.
      if (/^[\s\t\r\n]*[=+@-]/.test(v)) v = "'" + v;
      return '"' + v.replace(/"/g, '""') + '"';
    }
    var output = [fields.map(function (f) { return escapeCSV(f[0]); }).join(',')]
      .concat(rows.map(function (r) {
        return fields.map(function (f) {
          return escapeCSV(f[1] === 'productLabel' ? (r.productLabel || r.product) : r[f[1]]);
        }).join(',');
      })).join('\r\n');
    var href = URL.createObjectURL(new Blob(['﻿' + output], { type: 'text/csv;charset=utf-8' }));
    var link = document.createElement('a');
    link.href = href;
    link.download = mode === 'mine' ? 'my-qa-results.csv' : 'qa-results.csv';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(href); }, 1000);
    return true;
  }

  // Pressing the same button again returns to the aggregate dashboard.
  if (mineButton) {
    mineButton.addEventListener('click', function () {
      setScope(mode === 'mine' ? 'all' : 'mine');
    });
  }
  var previewButton = byId('qaResultsPreviewDemo');
  if (previewButton) previewButton.addEventListener('click', previewDemo);
  var exitButton = byId('qaResultsExitDemo');
  if (exitButton) exitButton.addEventListener('click', exitDemo);
  var clearButton = byId('qaResultsClearFilters');
  if (clearButton) clearButton.addEventListener('click', function () {
    var keep = mode;
    if (window.AIMY_QA_FILTERS && window.AIMY_QA_FILTERS.restore) {
      window.AIMY_QA_FILTERS.restore({ interaction: 'all', client: [], product: [], from: DEFAULT_FROM, to: DEFAULT_TO, resultsScope: keep });
    }
    render();
  });
  var innerExport = byId('qaResultsExport');
  if (innerExport) innerExport.addEventListener('click', exportCSV);
  exportButtons.forEach(function (button) {
    button.addEventListener('click', function (e) {
      if (!workspace.hidden) {
        e.preventDefault();
        e.stopImmediatePropagation();
        exportCSV();
      }
    }, true);
  });
  ['aimy:interaction-type-changed', 'aimy:client-filter-changed', 'aimy:date-range-changed',
    'aimy:scope-changed', 'aimy:scope-synced', 'aimy:filter-applied', 'aimy:qa-filters-committed'].forEach(function (event) {
    window.addEventListener(event, render);
  });

  session = cleanSession(window.AIMY_QA_CURRENT_USER || window.AIMY_QA_SESSION);
  if (Array.isArray(window.AIMY_QA_REVIEW_RECORDS)) {
    records = cleanRecords(window.AIMY_QA_REVIEW_RECORDS);
    recordsLoaded = true;
  }
  window.AIMY_QA_RESULTS_SCOPE = {
    get: function () { return mode; },
    set: setScope,
    getSession: function () { return session ? Object.assign({}, session) : null; },
    setSession: function (value) { exitDemo(); session = cleanSession(value); records = []; recordsLoaded = false; render(); },
    setRecords: function (value) { exitDemo(); records = cleanRecords(value); recordsLoaded = Array.isArray(value); loading = false; render(); },
    setLoading: function (value) { loading = !!value; render(); },
    getVisibleRecords: function () { return copyRows(visibleRecords()); },
    getPersonalRecords: function () { return copyRows(personalRecords()); },
    getMetrics: function () { return getMetrics(visibleRecords()); },
    exportCSV: exportCSV,
    previewDemo: previewDemo,
    exitDemo: exitDemo
  };
  setScope(mode, { silent: true });
})();
