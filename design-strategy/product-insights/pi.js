/* Product Insights option mocks.

   Loaded by the copies of the Dashboard and Reviews in this folder (see
   build.mjs), after the page's own scripts and before the shared rail and
   canvas scripts. It places one option onto the real page:

     A  Dashboard card under Audit performance by product, detail in AiMY.
        The Detected strip is merged away to stay inside the block budget.
     B  No new block: a sentence and question in Since your last visit, and
        one card in Improvement opportunities.
     C  AiMY only: a rail finding, a nudge above the Ask AiMY bar, and
        suggested questions in the conversation.
     D  Its own page, Customer issues, after Reviews in the rail, with a
        one-line teaser on the Dashboard.
     E  An Issues tab in Reviews, next to Calls, Tickets, Disputes, Agents.

   Answers register on the page's own RESPONSE_BY_TOPIC, buttons use the
   product's data-entry-mode contract, and the knowledge draft is the page's
   own decision zone. All figures are illustrative. */
(function () {
  "use strict";

  var SCRIPT = document.currentScript;
  var PAGE = (SCRIPT && SCRIPT.getAttribute("data-pi-page")) || "dashboard";
  var OPT = document.documentElement.getAttribute("data-pi-option") || "a";
  // Customer issues exists only in option D.
  if (PAGE === "customer-issues" && OPT !== "d") {
    OPT = "d";
    document.documentElement.setAttribute("data-pi-option", "d");
    try { sessionStorage.setItem("pi-option", "d"); } catch (e) {}
  }
  var ROOT = "../../";

  /* ═══ DATA (illustrative) ═══════════════════════════════════════════════
     Ranked by support time, not count: a frequent short call can cost less
     than a rarer long one (Invoice outranks Login here). */
  var TOTAL = { calls: "2,486", avg: "7m 24s", hours: 307, recurring: 12, recurringHours: 112, share: 36 };
  var ISSUES = [
    { id: "setup", name: "Setup instructions unclear", type: "Onboarding", product: "Upland", calls: 184, clients: 6, med: "9m 40s", hours: 30, state: "recommended",
      why: "Customers finish the first setup step and nothing tells them what comes next.",
      q: "Why do customers keep calling about unclear setup instructions?" },
    { id: "invoice", name: "Invoice total differs from quote", type: "Billing", product: "Asteris", calls: 97, clients: 4, med: "11m 05s", hours: 18, state: "detected",
      why: "Renewal invoices add a usage line that the quote never mentioned.",
      q: "Why do invoice totals differ from the quote?" },
    { id: "login", name: "Login code not received", type: "Access", product: "Upland", calls: 142, clients: 5, med: "6m 15s", hours: 15, state: "detected",
      why: "Codes go to an old email address after a domain change.",
      q: "What changed about login codes?" },
    { id: "refund", name: "Agent could not find the refund policy", type: "Knowledge", product: "SecondStreet", calls: 58, clients: 4, med: "12m 30s", hours: 12, state: "recommended",
      why: "Two articles disagree on the refund window, so agents put customers on hold to check.",
      q: "Which article should change for refunds?" },
    { id: "export", name: "Export fails for large files", type: "Product defect", product: "Upland", calls: 71, clients: 3, med: "8m 20s", hours: 10, state: "drafted",
      why: "Exports over 2 GB time out without an error message.",
      q: "Why do large exports fail?" },
    { id: "sso", name: "SSO setup fails on first try", type: "Access", product: "Asteris", calls: 44, clients: 3, med: "10m 10s", hours: 7, state: "detected",
      why: "The metadata URL field rejects a trailing slash.", q: "Why does SSO setup fail on the first try?" },
    { id: "seats", name: "Seat count not updated after upgrade", type: "Billing", product: "Upland", calls: 51, clients: 4, med: "6m 40s", hours: 6, state: "detected",
      why: "Upgrades apply at the next billing cycle, not straight away.", q: "Why is the seat count not updated after an upgrade?" },
    { id: "report", name: "Scheduled report arrives empty", type: "Product defect", product: "SecondStreet", calls: 33, clients: 2, med: "7m 50s", hours: 4, state: "detected",
      why: "Reports scheduled before data sync finishes send with no rows.", q: "Why do scheduled reports arrive empty?" }
  ];
  var MORE = TOTAL.recurring - ISSUES.length; // 4 more, not drawn
  var CLIENTS = [
    { name: "Objectif Lune", calls: 126, issues: 3, top: "Setup instructions unclear" },
    { name: "RightAnswers", calls: 88, issues: 2, top: "Login code not received" },
    { name: "Panviva", calls: 61, issues: 2, top: "Setup instructions unclear" },
    { name: "InterFax", calls: 40, issues: 1, top: "Invoice total differs from quote" }
  ];
  var PRODUCTS = [
    { name: "Upland", calls: 448, share: 64, issues: 5 },
    { name: "Asteris", calls: 141, share: 20, issues: 4 },
    { name: "SecondStreet", calls: 91, share: 13, issues: 3 }
  ];
  var QUOTES = {
    setup: [
      { call: "Call 10442", who: "Objectif Lune", date: "9 Sep", at: "02:14", text: "I did the first step and then nothing tells me what to do next." },
      { call: "Call 10577", who: "Panviva", date: "14 Sep", at: "04:51", text: "The guide stops at the login page, so I had to call." }
    ]
  };
  var ARTICLES = {
    setup: [
      { title: "Getting started with Upland", src: "Your knowledge base", date: "updated 2 Mar 2026", why: "Stops at the login page, which is where customers get stuck." },
      { title: "Guided setup checklist", src: "External · Vendor help center", date: "retrieved 10 Oct 2026", why: "Shows setup as numbered steps with a progress marker." }
    ]
  };
  function issue(id) { for (var i = 0; i < ISSUES.length; i++) if (ISSUES[i].id === id) return ISSUES[i]; return null; }
  var byCost = ISSUES.slice().sort(function (a, b) { return b.hours - a.hours; });
  var maxHours = byCost[0].hours;

  /* ═══ HELPERS ═══════════════════════════════════════════════════════════ */
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function mark(w, h) { return '<svg viewBox="0 0 18 20" width="' + (w || 16) + '" height="' + (h || 18) + '" aria-hidden="true"><use href="#aimy-logo-small"/></svg>'; }
  var STATE_LABEL = { detected: "Detected", recommended: "Recommended", drafted: "Drafted", staged: "Staged", completed: "Done", failed: "Blocked" };
  function ws(state) {
    return '<span class="work-state ws-' + state + '" data-work-state="' + state + '"><span class="ws-dot"></span>' + STATE_LABEL[state] + "</span>";
  }
  function em(mode, topic, ask, label, extra) {
    return '<button class="entry-action em-' + mode + ' ea-sm" type="button" data-entry-mode="' + mode + '" data-aimy-topic="' + topic + '" data-aimy-ask="' + esc(ask) + '"' + (extra || "") + ">"
      + '<svg class="em-ico" aria-hidden="true"><use href="#em-ico-' + mode + '"/></svg>' + label + "</button>";
  }
  function pill(value, label) { return '<span class="evidence-pill"><span class="ev-value">' + value + "</span>" + label + "</span>"; }
  function toast(title, sub) {
    if (typeof window.showToast === "function") { try { window.showToast({ title: title, sub: sub || "" }); return; } catch (e) {} }
  }

  /* The scope sentence reads the real filter row, so it changes when the
     filters do. The counts are prototype constants and do not re-filter. */
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(iso) { var p = String(iso || "").split("-"); return p.length === 3 ? (+p[2]) + " " + MONTHS[+p[1] - 1] + " " + p[0] : iso; }
  function filters() {
    var f = window.AIMY_QA_FILTERS && window.AIMY_QA_FILTERS.get ? window.AIMY_QA_FILTERS.get() : null;
    return f || { interaction: "all", client: [], product: [], from: "2026-01-01", to: "2026-09-15" };
  }
  function list(arr, all) { return !arr || !arr.length ? all : arr.length > 2 ? arr.length + " " + all.replace(/^All /, "").toLowerCase() : arr.join(", "); }
  function scopeParts() {
    var f = filters();
    return [TOTAL.calls + " analyzed calls", list(f.client, "All clients"), list(f.product, "All products"), fmtDate(f.from) + " – " + fmtDate(f.to)];
  }
  function scopeLine() {
    var f = filters(), p = scopeParts();
    var note = f.interaction === "tickets"
      ? '<span class="pi-scope-note">Call length applies to calls. Tickets are counted, but not timed.</span>' : "";
    return "Based on <b>" + p[0] + "</b> · " + p[1] + " · " + p[2] + " · " + p[3] + note;
  }
  function paintScope() { $$("[data-pi-scope]").forEach(function (n) { n.innerHTML = scopeLine(); }); }
  ["aimy:client-filter-changed", "aimy:date-range-changed", "aimy:interaction-type-changed", "aimy:scope-changed"].forEach(function (ev) {
    window.addEventListener(ev, paintScope);
    document.addEventListener(ev, paintScope);
  });

  /* One row anatomy everywhere an issue is listed: the product card's bar
     row, with the bar as share of support time. */
  function issueRow(it, opts) {
    opts = opts || {};
    var pct = Math.max(6, Math.round(it.hours / maxHours * 100));
    var attrs = opts.select
      ? ' data-pi-select="' + it.id + '" role="option" aria-selected="false" tabindex="0"'
      : ' data-entry-mode="investigate" data-aimy-topic="pi-issue-' + it.id + '" data-aimy-ask="' + esc(it.q) + '" role="button" tabindex="0"';
    return '<div class="eval-bar-row" data-pi-issue="' + it.id + '"' + attrs + ' aria-label="' + esc(it.name + ", " + it.calls + " calls, " + it.hours + " hours of support") + '">'
      + '<div class="eval-bar-top"><span class="eval-bar-label">' + esc(it.name) + "</span>"
      + '<div class="eval-bar-right"><span class="eval-bar-count">' + it.calls + " calls · " + it.med + ' median</span><span class="eval-bar-avg">' + it.hours + " h</span></div></div>"
      + '<div class="eval-bar-track"><div class="eval-bar-fill" style="width:' + pct + '%"></div></div>'
      + '<div class="pi-row-meta">' + ws(it.state) + "<span>" + it.clients + " clients · " + it.product + (opts.type ? " · " + it.type : "") + "</span></div>"
      + "</div>";
  }
  function plainRow(label, count, right, pct, topic, ask) {
    return '<div class="eval-bar-row" role="button" tabindex="0" data-entry-mode="investigate" data-aimy-topic="' + topic + '" data-aimy-ask="' + esc(ask) + '">'
      + '<div class="eval-bar-top"><span class="eval-bar-label">' + esc(label) + '</span><div class="eval-bar-right"><span class="eval-bar-count">' + count + '</span><span class="eval-bar-avg">' + right + "</span></div></div>"
      + '<div class="eval-bar-track"><div class="eval-bar-fill" style="width:' + pct + '%"></div></div></div>';
  }

  /* ═══ AiMY ANSWERS ══════════════════════════════════════════════════════
     Four labelled parts so observed facts, outside research and AiMY's own
     suggestion never blend (UI/UX plan, issue detail anatomy). */
  function quotesHtml(id) {
    var qs = QUOTES[id];
    if (!qs) return "<p>" + "Customers describe it the same way across calls: " + esc(issue(id).why.charAt(0).toLowerCase() + issue(id).why.slice(1)) + "</p>";
    return qs.map(function (q) {
      return '<blockquote class="pi-quote"><q>' + esc(q.text) + "</q><footer><span>" + q.call + " · " + q.who + " · " + q.date + "</span>"
        + '<a class="msg-data-ref" href="' + ROOT + 'manual-audit.html" title="Opens the call recording at ' + q.at + '">Play from ' + q.at + "</a></footer></blockquote>";
    }).join("");
  }
  function articlesHtml(id) {
    var arts = ARTICLES[id];
    if (!arts) return "<p><strong>No related articles found for this issue yet.</strong> The suggestion below is based on your calls only.</p>";
    return arts.map(function (a) {
      return '<div class="pi-art"><span class="pi-art-main"><b>' + esc(a.title) + "</b><small>" + esc(a.src) + " · " + esc(a.date) + "</small><span>" + esc(a.why) + "</span></span>"
        + '<button class="msg-data-ref" type="button" data-pi-article="' + esc(a.title) + '">Open article</button></div>';
    }).join("");
  }
  function suggestionHtml(it) {
    var arts = ARTICLES[it.id];
    var basis = "Based on " + it.calls + " calls" + (arts ? " and " + arts.length + " related articles" : " only") + ". Not yet tested with your customers.";
    var text = it.id === "setup" ? "<strong>Add numbered steps to “Getting started with Upland”</strong>, carrying on past the login page where customers get stuck."
      : it.id === "refund" ? "<strong>Merge the two refund articles into one</strong> with a single refund window."
      : "<strong>Write a knowledge article for “" + esc(it.name) + "”</strong> so agents and customers have one answer.";
    if (it.state === "staged") {
      return '<div class="pi-sec"><div class="pi-sec-label">Suggested next step</div><p><strong>A draft is in the knowledge review queue.</strong> A Knowledge Manager approves it before anything publishes.</p>'
        + '<div class="canvas-action-row">' + em("investigate", "pi-queue", "Show the knowledge drafts waiting for review.", "See the review queue") + "</div></div>";
    }
    if (it.state === "drafted") {
      return '<div class="pi-sec"><div class="pi-sec-label">Suggested next step</div><p><strong>AiMY drafted an article for this issue.</strong> It has not been sent for review yet.</p>'
        + '<div class="canvas-action-row">' + em("review", "pi-draft-" + it.id, "Show the knowledge draft for " + it.name + ".", "Review the draft") + "</div></div>";
    }
    return '<div class="pi-sec"><div class="pi-sec-label">Suggested next step</div><p>' + text + '</p><p class="pi-basis">' + basis + "</p>"
      + '<div class="canvas-action-row">'
      + em("review", "pi-draft-" + it.id, "Draft a knowledge article for " + it.name + ".", "Draft a knowledge article")
      + '<button class="btn btn-ghost btn-sm" type="button" data-entry-mode="direct" data-aimy-topic="pi-dismiss-' + it.id + '" data-aimy-ask="Dismiss suggestion">Dismiss</button>'
      + "</div></div>";
  }
  function renderIssue(id) {
    var it = issue(id);
    if (!it) return null;
    return '<div class="canvas-render pi-ans" data-pi-answer="' + id + '">'
      + '<div class="canvas-type-label">Customer issue · ' + it.product + " · " + it.type + "</div>"
      + '<p class="pi-ans-lead"><strong>' + esc(it.name) + "</strong>: <strong>" + it.calls + " calls</strong> from " + it.clients + " clients, median call <strong>" + it.med + "</strong>, about <strong>" + it.hours + " hours</strong> of support. " + esc(it.why) + "</p>"
      + '<div class="pi-sec"><div class="pi-sec-label">From your calls</div>' + quotesHtml(id) + "</div>"
      + '<div class="pi-sec"><div class="pi-sec-label">Related articles</div>' + articlesHtml(id) + "</div>"
      + suggestionHtml(it)
      + '<div class="canvas-action-row">'
      + em("investigate", "pi-calls-" + id, "Show all " + it.calls + " calls about " + it.name + ".", "Show all " + it.calls + " calls")
      + em("prompt", "pi-trend-" + id, "Has " + it.name.toLowerCase() + " grown since last month?", "Ask if it is growing")
      + "</div></div>";
  }
  function renderAll() {
    return '<div class="canvas-render pi-ans">'
      + '<div class="canvas-type-label">Product insights · recurring issues</div>'
      + '<p class="pi-ans-lead"><strong>' + TOTAL.recurring + " issues keep coming back</strong> and take <strong>" + TOTAL.share + "% of support time</strong>, " + TOTAL.recurringHours + " of " + TOTAL.hours + " hours. Setup costs the most; refund calls run longest at 12m 30s.</p>"
      + '<div class="evidence-row">' + pill(TOTAL.recurring, " recurring issues") + pill(TOTAL.avg, " average call") + pill(TOTAL.hours + " h", " of support") + "</div>"
      + '<div class="pi-sec"><div class="pi-sec-label">Ranked by support time</div><div class="eval-bars">' + byCost.map(function (it) { return issueRow(it); }).join("") + "</div>"
      + '<p class="pi-basis">' + MORE + " more issues under 4 hours each are not shown.</p></div>"
      + '<div class="canvas-action-row">'
      + em("investigate", "pi-customers", "Which clients keep hitting the same issues?", "Which clients repeat")
      + em("investigate", "pi-products", "Which products do the recurring issues come from?", "By product")
      + "</div></div>";
  }
  function renderCustomers() {
    var max = CLIENTS[0].calls;
    return '<div class="canvas-render pi-ans">'
      + '<div class="canvas-type-label">Product insights · by client</div>'
      + '<p class="pi-ans-lead"><strong>Four clients</strong> keep hitting the same issues. Objectif Lune repeats the most, mostly on setup.</p>'
      + '<div class="eval-bars">' + CLIENTS.map(function (c) {
        return plainRow(c.name, c.calls + " calls · " + c.issues + (c.issues === 1 ? " issue" : " issues"), c.top.split(" ")[0], Math.round(c.calls / max * 100), "pi-issue-setup", "What repeats for " + c.name + "?");
      }).join("") + "</div>"
      + '<div class="canvas-action-row">' + em("investigate", "pi-issue-setup", "What repeats for Objectif Lune?", "What repeats for Objectif Lune") + "</div></div>";
  }
  function renderProducts() {
    return '<div class="canvas-render pi-ans">'
      + '<div class="canvas-type-label">Product insights · by product</div>'
      + '<p class="pi-ans-lead"><strong>Upland</strong> raises ' + PRODUCTS[0].share + "% of recurring calls, mostly about setup and login.</p>"
      + '<div class="eval-bars">' + PRODUCTS.map(function (p) {
        return plainRow(p.name, p.calls + " calls · " + p.issues + " issues", p.share + "%", p.share, "pi-all", "Which recurring issues come from " + p.name + "?");
      }).join("") + "</div></div>";
  }
  function renderCalls(id) {
    var it = issue(id);
    return '<div class="canvas-render pi-ans"><div class="canvas-type-label">Customer issue · calls</div>'
      + '<p class="pi-ans-lead">The <strong>' + it.calls + " calls</strong> about " + esc(it.name.toLowerCase()) + " are listed in Reviews, filtered to this issue, newest first.</p>"
      + '<div class="canvas-action-row"><a class="msg-action-link" href="agent-scorecards.html?view=evals&amp;tbl=calls">Open the ' + it.calls + " calls in Reviews</a></div></div>";
  }
  function renderTrend(id) {
    var it = issue(id);
    return '<div class="canvas-render pi-ans"><div class="canvas-type-label">Customer issue · trend</div>'
      + '<p class="pi-ans-lead"><strong>' + esc(it.name) + "</strong> rose from <strong>38</strong> calls in July to <strong>61</strong> in August, then held at <strong>58</strong> in the first half of September. The rise started the week Upland 4.2 shipped.</p></div>";
  }
  function renderQueue() {
    return '<div class="canvas-render pi-ans"><div class="canvas-type-label">Knowledge review queue</div>'
      + '<p class="pi-ans-lead">Drafts wait here until a <strong>Knowledge Manager</strong> approves them. Nothing publishes on its own.</p>'
      + queueRows() + "</div>";
  }
  function queueRows() {
    var rows = ISSUES.filter(function (it) { return it.state === "staged" || it.state === "drafted"; });
    if (!rows.length) return '<p class="pi-basis">No drafts are waiting.</p>';
    return rows.map(function (it) {
      return '<div class="pi-queue-row"><span class="pi-queue-main"><b>' + (it.id === "setup" ? "Finish setting up Upland" : esc(it.name) + ": what to do") + "</b><small>From “" + esc(it.name) + "” · " + it.calls + " calls</small></span>"
        + ws(it.state) + em("review", "pi-draft-" + it.id, "Show the knowledge draft for " + it.name + ".", it.state === "staged" ? "View" : "Review") + "</div>";
    }).join("");
  }
  function renderDraft(id) {
    var it = issue(id);
    if (!it) return null;
    var title = id === "setup" ? "Finish setting up Upland" : it.name + ": what to do";
    var body = id === "setup"
      ? "<span>1. Sign in and open <b>Settings</b>.</span><ins>2. Complete the three steps on the setup checklist.</ins><ins>3. The “What to do next” panel confirms setup is done.</ins><del>Contact support to finish setup.</del>"
      : "<span>What customers report: " + esc(it.why) + "</span><ins>What to do: the steps an agent should follow, from " + it.calls + " calls.</ins>";
    return '<div class="canvas-render">'
      + '<div class="canvas-type-label">Reviewed action · Knowledge draft</div>'
      + '<div style="font-size:12.5px;line-height:1.65;color:var(--d300);margin-bottom:12px">I drafted an update from <strong>' + it.calls + " calls</strong>" + (QUOTES[id] ? ", with " + QUOTES[id].length + " quotes attached" : "") + (ARTICLES[id] ? " and " + ARTICLES[id].length + " related articles" : "") + ".</div>"
      + '<div class="pi-draft" style="margin-bottom:12px"><b>' + esc(title) + "</b>" + body + "</div>"
      + '<div class="decision-zone" style="max-width:none" data-dz-topic="pi-draft-' + id + '" data-dz-label="Knowledge draft"'
      + ' data-dz-accepted="Draft sent to the knowledge review queue."'
      + ' data-dz-accepted-meta="Sent by Engy Y. · 09:16 · you can withdraw it until it is reviewed"'
      + ' data-dz-audit="Knowledge draft sent for review: ' + esc(title) + '"'
      + ' data-dz-rejected="Draft discarded. Nothing was sent."'
      + ' data-dz-rejected-meta="Rejected by Engy Y. · 09:16 · tell AiMY what was wrong and it can write another"'
      + ' data-dz-reject-label="What was wrong with the draft"'
      + ' data-dz-edit-fields="Title|' + esc(title) + '||Article|Getting started with Upland"'
      + ' data-dz-undone="Withdrawn. Back to awaiting your decision.">'
      + '<p class="dz-prompt">Send this draft to the knowledge review queue?</p>'
      + '<div class="dz-consequence"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>'
      + "<span>A <strong>Knowledge Manager</strong> reviews it before anything publishes. The live article does not change until then. You can withdraw it while it waits.</span></div>"
      + '<div class="dz-actions"><button class="btn btn-brand btn-sm" type="button" data-hr-decision="accept">Accept</button>'
      + '<button class="btn btn-ghost btn-sm" type="button" data-hr-decision="edit">Edit first</button>'
      + '<button class="btn btn-ghost btn-sm" type="button" data-hr-decision="reject">Reject</button>'
      + '<span class="dz-spacer"></span><span class="work-state ws-staged" data-work-state="staged"><span class="ws-dot"></span>Awaiting you</span></div>'
      + '<div class="dz-meta"><span>Proposed by AiMY · 09:14</span><span>·</span><span>Requires: <strong style="color:var(--d300)">Manager</strong></span><span>·</span><span>Decision is logged</span></div>'
      + "</div></div>";
  }

  var RBT = window.RESPONSE_BY_TOPIC;
  if (RBT) {
    ISSUES.forEach(function (it) {
      RBT["pi-issue-" + it.id] = function () { return renderIssue(it.id); };
      RBT["pi-draft-" + it.id] = function () { return renderDraft(it.id); };
      RBT["pi-calls-" + it.id] = function () { return renderCalls(it.id); };
      RBT["pi-trend-" + it.id] = function () { return renderTrend(it.id); };
    });
    RBT["pi-all"] = renderAll;
    RBT["pi-customers"] = renderCustomers;
    RBT["pi-products"] = renderProducts;
    RBT["pi-queue"] = renderQueue;
  }

  /* "Based on" shows the scope of the question, not the page's scenario. */
  function basisFor(topic) {
    var p = scopeParts();
    var m = /^pi-(issue|draft|calls|trend)-(.+)$/.exec(topic || "");
    if (m && issue(m[2])) { var it = issue(m[2]); return [it.name, it.calls + " calls", it.clients + " clients", p[3]]; }
    return p;
  }
  function paintBasis(topic) {
    var tags = $("#overlayContextTags");
    if (!tags) return;
    tags.innerHTML = basisFor(topic).map(function (t) { return '<span class="overlay-context-tag">' + esc(t) + "</span>"; }).join("");
  }
  var PI_SUGG = ["What are customers calling about most?", "Which clients keep repeating issues?", "Which recurring issue costs the most support time?"];
  var SUGG_TOPIC = { 0: "pi-all", 1: "pi-customers", 2: "pi-issue-setup" };
  if (typeof window.openOverlay === "function") {
    var openOrig = window.openOverlay;
    window.openOverlay = function (text) {
      var topic = window.__aimyTopic;
      var r = openOrig.apply(this, arguments);
      if (topic && /^pi-/.test(topic)) paintBasis(topic);
      // Option C has nothing on the page, so the conversation offers it.
      if (!text && (OPT === "c" || PAGE === "customer-issues")) {
        var sugg = $("#overlaySuggestions");
        if (sugg && !sugg.querySelector("[data-pi-sugg]")) {
          sugg.insertAdjacentHTML("afterbegin", PI_SUGG.map(function (q, i) {
            return '<button class="overlay-sugg-chip" type="button" data-pi-sugg="' + i + '">' + esc(q) + "</button>";
          }).join(""));
        }
      }
      return r;
    };
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-pi-sugg]");
    if (!b) return;
    e.stopPropagation();
    window.__aimyTopic = SUGG_TOPIC[b.getAttribute("data-pi-sugg")];
    paintBasis(window.__aimyTopic);
    if (typeof window.overlaySuggestion === "function") window.overlaySuggestion(b);
  }, true);

  /* Typed questions about customers reach the same answers, from the Ask
     AiMY bar and from inside the conversation. */
  var PI_WORDS = /\b(customers?|recurring|calling about|contact reasons?|knowledge (article|gap)s?|repeat(ing)? issues?|product insights?)\b/i;
  function routeTyped(text) {
    if (!text || !PI_WORDS.test(text) || window.__aimyTopic) return;
    window.__aimyTopic = /client|customer.*repeat|which customers/i.test(text) ? "pi-customers"
      : /setup/i.test(text) ? "pi-issue-setup" : "pi-all";
    paintBasis(window.__aimyTopic);
  }
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" || e.shiftKey) return;
    if (e.target && (e.target.id === "overlayInput" || e.target.id === "aimyFloatInput")) routeTyped(e.target.value);
  }, true);
  document.addEventListener("click", function (e) {
    var send = e.target.closest && e.target.closest("#overlaySend, #aimyFloatSend");
    if (!send) return;
    var inp = $(send.id === "overlaySend" ? "#overlayInput" : "#aimyFloatInput");
    if (inp) routeTyped(inp.value);
  }, true);
  /* Rows are keyboard-operable like buttons. */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var row = e.target.closest && e.target.closest('.eval-bar-row[role="button"], .eval-bar-row[role="option"], .eval-row[data-pi-issue]');
    if (!row || row !== e.target) return;
    e.preventDefault();
    row.click();
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-pi-article]");
    if (!a) return;
    toast("Opens “" + a.getAttribute("data-pi-article") + "”", "In a new tab, from its source. Illustrative in this mock.");
  });

  /* ═══ CLOSING THE LOOP ══════════════════════════════════════════════════
     A sent draft is staged in review, not done: a Knowledge Manager still
     has to approve it. The page's applyOutcome would settle it as Done, so
     Product Insights topics resolve here instead. Every place that lists the
     issue moves together. */
  function setIssueState(id, state) {
    var it = issue(id);
    if (!it) return;
    it.state = state;
    $$('[data-pi-issue="' + id + '"] .work-state').forEach(function (b) {
      b.className = "work-state ws-" + state;
      b.setAttribute("data-work-state", state);
      b.innerHTML = '<span class="ws-dot"></span>' + STATE_LABEL[state];
    });
    $$('[data-pi-action="' + id + '"]').forEach(function (row) {
      var badge = row.querySelector(".work-state");
      if (badge) { badge.className = "work-state ws-" + state; badge.setAttribute("data-work-state", state); badge.innerHTML = '<span class="ws-dot"></span>' + STATE_LABEL[state]; }
      var text = row.querySelector(".aimy-done-text");
      if (text && state === "staged") text.innerHTML = "<b>Setup article draft</b> is in the knowledge review queue";
      if (text && state === "recommended") text.innerHTML = "<b>Setup article</b> needs numbered steps";
      var btn = row.querySelector("[data-entry-mode]");
      if (btn && state === "staged") { btn.textContent = "See the draft in review"; btn.setAttribute("data-entry-mode", "investigate"); btn.setAttribute("data-aimy-topic", "pi-queue"); btn.setAttribute("data-aimy-ask", "Show the knowledge drafts waiting for review."); }
      if (btn && state === "recommended") { btn.textContent = "Draft the article update"; btn.setAttribute("data-entry-mode", "review"); btn.setAttribute("data-aimy-topic", "pi-draft-" + id); btn.setAttribute("data-aimy-ask", "Draft a knowledge article for " + it.name + "."); }
    });
    document.dispatchEvent(new CustomEvent("pi:state", { detail: { id: id, state: state } }));
  }
  var prevState = {};
  function piOutcome(env) {
    var m = env && /^pi-(draft|dismiss)-(.+)$/.exec(env.topic || "");
    if (!m) return false;
    var id = m[2], it = issue(id);
    if (!it) return true;
    prevState[id] = it.state;
    if (m[1] === "draft") {
      setIssueState(id, "staged");
      toast("Draft sent to the knowledge review queue", it.name + " is now Staged");
    } else {
      setIssueState(id, "detected");
      var btn = env.el;
      if (btn) { btn.textContent = "Dismissed"; btn.disabled = true; }
      toast("Suggestion dismissed", it.name + " stays Detected.");
    }
    return true;
  }
  var applyOrig = typeof window.applyOutcome === "function" ? window.applyOutcome : null;
  window.applyOutcome = function (env) {
    if (piOutcome(env)) return;
    if (applyOrig) return applyOrig.apply(this, arguments);
  };

  /* Reviews' decision handler is written for its HR meeting only, so on
     that page the knowledge draft's zone is resolved here, with the same
     anatomy and copy the Dashboard's handler gives it. */
  if (PAGE === "reviews") {
    document.addEventListener("click", function (e) {
      var b = e.target.closest && e.target.closest("[data-hr-decision]");
      var zone = b && b.closest('.decision-zone[data-dz-topic^="pi-"]');
      if (!zone) return;
      e.stopImmediatePropagation();
      var d = b.getAttribute("data-hr-decision"), topic = zone.getAttribute("data-dz-topic");
      if (!zone.__piOrig) zone.__piOrig = zone.innerHTML;
      if (d === "accept") {
        zone.querySelector(".dz-prompt").textContent = zone.getAttribute("data-dz-accepted");
        var c = zone.querySelector(".dz-consequence"); if (c) c.remove();
        zone.querySelector(".dz-actions").innerHTML = '<span class="work-state ws-completed" data-work-state="completed"><span class="ws-dot"></span>Accepted</span><span class="dz-spacer"></span><button class="btn btn-ghost btn-sm" type="button" data-hr-decision="undo">Undo</button>';
        zone.querySelector(".dz-meta").innerHTML = "<span>" + zone.getAttribute("data-dz-accepted-meta") + "</span>";
        piOutcome({ topic: topic, resolution: "accepted" });
      } else if (d === "reject") {
        zone.querySelector(".dz-prompt").textContent = zone.getAttribute("data-dz-rejected");
        zone.querySelector(".dz-actions").innerHTML = '<span class="work-state ws-failed" data-work-state="failed"><span class="ws-dot"></span>Rejected</span><span class="dz-spacer"></span><button class="btn btn-ghost btn-sm" type="button" data-hr-decision="undo">Undo</button>';
        zone.querySelector(".dz-meta").innerHTML = "<span>" + zone.getAttribute("data-dz-rejected-meta") + "</span>";
      } else if (d === "edit") {
        toast("Opens the draft for editing", "Illustrative in this mock.");
      } else if (d === "undo") {
        zone.innerHTML = zone.__piOrig;
        var id = topic.replace("pi-draft-", "");
        setIssueState(id, prevState[id] || "recommended");
      }
    }, true);
  }

  /* "Based on" for Product Insights questions on pages whose overlay opens
     through an internal function. */
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest('[data-entry-mode][data-aimy-topic^="pi-"]');
    if (!el) return;
    var topic = el.getAttribute("data-aimy-topic");
    setTimeout(function () { paintBasis(topic); }, 160);
  }, true);
  document.addEventListener("click", function (e) {
    var u = e.target.closest && e.target.closest('[data-hr-decision="undo"]');
    if (!u) return;
    var zone = u.closest(".canvas-render") && u.closest(".canvas-render").querySelector('[data-dz-topic^="pi-draft-"]');
    if (!zone) return;
    var id = zone.getAttribute("data-dz-topic").replace("pi-draft-", "");
    setIssueState(id, prevState[id] || "recommended");
  });

  /* ═══ OPTION A — the Product insights card ══════════════════════════════ */
  function productCard(id) {
    var top = byCost.slice(0, 3);
    return '<section class="eval-panel pi-card" id="' + id + '" aria-labelledby="' + id + 'Title">'
      + '<div class="eval-header"><div class="eval-header-left"><h2 class="eval-title" id="' + id + 'Title">Product insights</h2>'
      + '<span class="eval-header-sub">what customers keep calling about</span></div></div>'
      + '<div class="eval-products-section">'
      + '<p class="pi-mine-note" data-my-qa="only">Team-wide: customer issues do not change with Only my results.</p>'
      + '<p class="pi-scope" data-pi-scope>' + scopeLine() + "</p>"
      + '<div class="evidence-row">' + pill(TOTAL.recurring, " recurring issues") + pill(TOTAL.avg, " average call") + pill(TOTAL.hours + " h", " of support") + "</div>"
      + '<div class="eval-bars-section-label"><span>Costliest recurring issues</span><span class="eval-bars-column-label">Support time</span></div>'
      + '<div class="eval-bars">' + top.map(function (it) { return issueRow(it); }).join("") + "</div>"
      + "</div>"
      + '<div class="eval-insight">' + '<svg class="eval-insight-mark" width="16" height="18" viewBox="0 0 18 20" aria-hidden="true"><use href="#aimy-logo-small"/></svg>'
      + '<p class="eval-insight-text"><strong>' + TOTAL.recurring + " issues</strong> take <span class=\"hl-warn\">" + TOTAL.share + "% of support time</span> · refund calls run longest at 12m 30s</p></div>"
      + '<div class="eval-action-row" data-pi-action="setup"><div class="aimy-done" style="width:100%;border-top:none;padding-top:0;margin-top:0">'
      + ws("recommended") + '<span class="aimy-done-text"><b>Setup article</b> needs numbered steps</span>'
      + '<span class="aimy-done-actions"><button type="button" class="aimy-done-link primary" data-entry-mode="review" data-aimy-topic="pi-draft-setup" data-aimy-ask="Draft a knowledge article for Setup instructions unclear.">Draft the article update</button></span></div></div>'
      + '<div class="eval-action-row"><div class="aimy-done" style="width:100%;border-top:none;padding-top:0;margin-top:0">'
      + '<span class="aimy-done-text">' + (TOTAL.recurring - 3) + " more issues, and which clients repeat</span>"
      + '<span class="aimy-done-actions"><button type="button" class="aimy-done-link primary" data-entry-mode="investigate" data-aimy-topic="pi-all" data-aimy-ask="What are the other ' + (TOTAL.recurring - 3) + ' recurring issues?">See all ' + TOTAL.recurring + "</button></span></div></div>"
      + "</section>";
  }
  function optionA() {
    // The Dashboard now ships option A itself; a mock rebuilt from it keeps the real card.
    if ($("#productInsights")) return;
    var col = $("#viewManager .tier-2-grid > .layout-column:last-child");
    var panel = col && col.querySelector(".eval-panel");
    if (panel) panel.insertAdjacentHTML("afterend", productCard("piCard"));
    /* Evaluation clients see it too: their view has no two-column row, so the
       card follows the KPI row in a column of the same width. */
    var kpis = $("#viewManager > .tier-1-grid");
    if (kpis) kpis.insertAdjacentHTML("afterend", '<div class="tier-2-grid evaluation-only" hidden data-pi-eval-slot><div class="layout-column">' + productCard("piCardEval") + '</div><div class="layout-column"></div></div>');
    syncEvalSlot();
  }
  /* The page toggles audit-only/evaluation-only with [hidden]; follow it. */
  function syncEvalSlot() {
    var slot = $("[data-pi-eval-slot]"), fl = $("#viewManager .floop");
    if (slot && fl) slot.hidden = fl.hidden;
  }
  if (window.MutationObserver) {
    var fl = $("#viewManager .floop");
    if (fl) new MutationObserver(syncEvalSlot).observe(fl, { attributes: true, attributeFilter: ["hidden"] });
  }

  /* ═══ OPTION B — folded into blocks that exist ══════════════════════════ */
  function optionB() {
    var line = $("#briefingOpenerText");
    if (line) line.insertAdjacentHTML("beforeend", " Customers also called <b>184 times</b> about unclear setup, the costliest recurring issue at <b>30 hours</b> of support.");
    var sig = $("#briefingOpenerSignals");
    if (sig) sig.insertAdjacentHTML("beforeend", em("investigate", "pi-issue-setup", ISSUES[0].q, "Ask why setup keeps coming up"));
    var list = $('#viewManager .ai-insights[data-my-qa="hide"]') || $("#viewManager .ai-insights:not([data-my-qa])");
    var it = ISSUES[0];
    if (list) {
      var card = '<article class="ai-insight" data-classification="customer-issue" data-severity="warning" data-pi-issue="setup" tabindex="0" style="--pct:36" aria-labelledby="pi-insight-setup">'
        + '<div class="ai-insight__row"><h3 class="ai-insight__name" id="pi-insight-setup">Customers: ' + esc(it.name.toLowerCase()) + '</h3>'
        + '<span class="ai-insight__metric ai-insight__metric--warn">' + it.calls + "<small>calls</small></span></div>"
        + '<p class="ai-insight__problem">The costliest of <b>' + TOTAL.recurring + " recurring issues</b>: median call " + it.med + ", about <b>" + it.hours + " hours</b> of support across " + it.clients + " clients.</p>"
        + '<p class="ai-insight__solution">' + mark() + " Add numbered steps to the setup article, past the login page. " + ws(it.state) + "</p>"
        + '<div class="ai-insight__actions">' + em("investigate", "pi-issue-setup", it.q, "Review the setup issue") + "</div></article>";
      var first = list.querySelector(".ai-insight");
      if (first) first.insertAdjacentHTML("afterend", card); else list.insertAdjacentHTML("afterbegin", card);
    }
  }

  /* ═══ RAIL FINDINGS (C, D, E) ═══════════════════════════════════════════
     The rail draws its findings from a constant in the shared script, so the
     mock adds its row to the drawn panel and redraws it if the rail does. */
  function railFinding(pageKey, fig, text, href) {
    function apply() {
      var section = $('.rail-section[data-rail-page="' + pageKey + '"]');
      if (!section) return;
      var sec = section.querySelector(".rail-findings");
      if (!sec) {
        // A page the rail has no finding for draws no list; give it one.
        section.insertAdjacentHTML("beforeend", '<ul class="rail-findings" aria-label="Findings"></ul>');
        sec = section.querySelector(".rail-findings");
      }
      if (sec.querySelector("[data-pi-finding]")) return;
      var row = href
        ? '<a class="rail-finding-row" href="' + href + '"><span class="rail-fig">' + fig + '</span><span class="rail-finding-text">' + text + "</span></a>"
        : '<div class="rail-finding-row"><span class="rail-fig">' + fig + '</span><span class="rail-finding-text">' + text + "</span></div>";
      sec.insertAdjacentHTML("beforeend", '<li class="rail-finding" data-pi-finding>' + row + "</li>");
    }
    var tries = 0, t = setInterval(function () { apply(); if (++tries > 40) clearInterval(t); }, 250);
    var side = $(".app-sidebar");
    if (side && window.MutationObserver) new MutationObserver(apply).observe(side, { childList: true, subtree: true });
  }

  /* ═══ OPTION C — AiMY only ══════════════════════════════════════════════ */
  function optionC() {
    railFinding("index", TOTAL.recurring, "recurring customer issues");
    /* A nudge above the Ask AiMY bar, in the conversation-resume pill's
       component, so it reads as AiMY offering something, not a new block. */
    var wrap = $("#aimyFloatWrap");
    if (!wrap) return;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "overlay-resume pi-nudge is-visible";
    b.setAttribute("data-entry-mode", "investigate");
    b.setAttribute("data-aimy-topic", "pi-all");
    b.setAttribute("data-aimy-ask", "What are customers calling about most?");
    b.innerHTML = mark(16, 18) + "<span>New · <span class=\"ores-topic\">" + TOTAL.recurring + " issues customers keep calling about</span></span>"
      + '<span class="ores-meta">' + TOTAL.share + "% of support time</span>";
    wrap.appendChild(b);
    var input = $("#aimyFloatInput");
    if (input) input.setAttribute("placeholder", "Ask AiMY anything, e.g. what are customers calling about?");
  }

  /* ═══ OPTION D — a page of its own ══════════════════════════════════════ */
  function teaserD() {
    // The Detected strip left the Dashboard with option A; fall back to the KPI row.
    var anchor = $("#aimyDetectedStrip") || $("#viewManager > .tier-1-grid");
    if (!anchor) return;
    anchor.insertAdjacentHTML("afterend",
      '<div class="aimy-detected-strip" role="complementary" aria-label="Customer issues summary">'
      + '<div class="ads-left"><svg class="ads-logo" width="18" height="20" viewBox="0 0 18 20" aria-hidden="true"><use href="#aimy-logo-small"/></svg>'
      + '<span class="ads-label">AiMY</span>' + ws("detected")
      + '<span class="ads-state">' + TOTAL.recurring + " recurring customer issues · " + TOTAL.share + "% of support time · setup costs the most</span></div>"
      + '<a class="ads-cta" href="customer-issues.html">Open customer issues<svg viewBox="0 0 13 13" fill="none" width="11" height="11" aria-hidden="true"><path d="M2 6.5H11M7 2.5L11 6.5L7 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>'
      + "</div>");
  }
  var GROUPS = { issue: "Issue", client: "Client", product: "Product" };
  var pageState = { tab: "issues", group: "issue", selected: "setup" };
  function statCard(type, badge, value, cap, status, action) {
    return '<div class="bcard p2" role="region" tabindex="0" aria-label="' + esc(type) + '"><div class="bcard-accent"></div><div class="bcard-body">'
      + '<div class="bcard-meta"><span class="type-label">' + type + '</span><span class="priority-badge">' + badge + "</span></div>"
      + '<div class="bcard-stat-line"><span class="bcard-stat">' + value + '</span><span class="bcard-stat-cap">' + cap + "</span></div>"
      + '<div class="bcard-status">' + status + "</div>" + (action || "") + "</div></div>";
  }
  function doneRow(state, text, btn) {
    return '<div class="aimy-done"><svg class="aimy-done-mark" viewBox="0 0 18 20" aria-hidden="true"><use href="#aimy-logo-small"/></svg>' + (state ? ws(state) : "")
      + '<span class="aimy-done-text">' + text + '</span><span class="aimy-done-actions">' + btn + "</span></div>";
  }
  function pageList() {
    if (pageState.group === "client") {
      var max = CLIENTS[0].calls;
      return CLIENTS.map(function (c) { return plainRow(c.name, c.calls + " calls · " + c.issues + " issues", c.top.split(" ")[0], Math.round(c.calls / max * 100), "pi-issue-setup", "What repeats for " + c.name + "?"); }).join("");
    }
    if (pageState.group === "product") {
      return PRODUCTS.map(function (p) { return plainRow(p.name, p.calls + " calls · " + p.issues + " issues", p.share + "%", p.share, "pi-all", "Which recurring issues come from " + p.name + "?"); }).join("");
    }
    return byCost.map(function (it) { return issueRow(it, { select: true, type: true }); }).join("")
      + '<p class="pi-basis" style="margin:8px 0 0">' + MORE + " more issues under 4 hours each.</p>";
  }
  function renderPage(part) {
    if (typeof part !== "string") part = "head";
    var host = $("#piPage");
    if (!host) return;
    var drafts = ISSUES.filter(function (it) { return it.state === "staged" || it.state === "drafted"; }).length;
    var head = '<div class="dashboard-section-head"><h2>Customer issues</h2><span>What customers keep calling about, what it costs, and what to change</span></div>'
      + '<p class="pi-scope" data-pi-scope style="margin:0">' + scopeLine() + "</p>"
      + '<div class="tier-1-grid">'
      + statCard("Recurring issues", "3 new", TOTAL.recurring, "issues · <b>676</b> calls", "&#8593; 3 since last month",
          doneRow("detected", "<b>Setup</b> costs the most", '<button type="button" class="aimy-done-link primary" data-entry-mode="investigate" data-aimy-topic="pi-issue-setup" data-aimy-ask="' + esc(ISSUES[0].q) + '">Investigate setup</button>'))
      + statCard("Support time", "Cost", TOTAL.hours + " h", "average call <b>" + TOTAL.avg + "</b>", TOTAL.share + "% on recurring issues",
          doneRow("", "<b>" + TOTAL.recurringHours + " h</b> on " + TOTAL.recurring + " issues", '<button type="button" class="aimy-done-link primary" data-entry-mode="investigate" data-aimy-topic="pi-all" data-aimy-ask="Which recurring issues cost the most support time?">See where it goes</button>'))
      + statCard("Clients affected", "Watch", CLIENTS.length, "repeat the same issues", "Objectif Lune repeats most",
          doneRow("", "<b>126</b> calls from Objectif Lune", '<button type="button" class="aimy-done-link primary" data-entry-mode="investigate" data-aimy-topic="pi-customers" data-aimy-ask="Which clients keep hitting the same issues?">Which clients repeat</button>'))
      + statCard("Knowledge drafts", "Review", drafts, "waiting for review", "A Knowledge Manager approves each one",
          doneRow("staged", "Nothing publishes on its own", '<button type="button" class="aimy-done-link primary" data-pi-tab-go="drafts">Open the queue</button>'))
      + "</div>"
      + '<div class="pi-toolbar">'
      + '<div class="content-view-toggle pi-seg" role="tablist" aria-label="Customer issues view">'
      + '<button type="button" role="tab" data-pi-tab="issues" class="' + (pageState.tab === "issues" ? "active" : "") + '" aria-selected="' + (pageState.tab === "issues") + '">Issues</button>'
      + '<button type="button" role="tab" data-pi-tab="drafts" class="' + (pageState.tab === "drafts" ? "active" : "") + '" aria-selected="' + (pageState.tab === "drafts") + '">Knowledge drafts (' + drafts + ")</button></div>"
      + (pageState.tab === "issues"
        ? '<div class="pi-toolbar-group"><span id="piGroupLabel">Group by</span><div class="content-view-toggle pi-seg" role="tablist" aria-labelledby="piGroupLabel">'
          + Object.keys(GROUPS).map(function (k) { return '<button type="button" role="tab" data-pi-group="' + k + '" class="' + (pageState.group === k ? "active" : "") + '" aria-selected="' + (pageState.group === k) + '">' + GROUPS[k] + "</button>"; }).join("")
          + "</div></div>" : "")
      + "</div>";
    var body;
    if (pageState.tab === "drafts") {
      body = '<section class="eval-panel"><div class="eval-header"><div class="eval-header-left"><h2 class="eval-title">Knowledge review queue</h2><span class="eval-header-sub">drafts from customer issues · reviewed before anything publishes</span></div></div>'
        + '<div class="eval-products-section">' + queueRows() + "</div></section>";
    } else {
      var it = issue(pageState.selected) || byCost[0];
      body = '<div class="pi-page-grid">'
        + '<section class="eval-panel pi-list"><div class="eval-header"><div class="eval-header-left"><h2 class="eval-title">' + (pageState.group === "issue" ? "Recurring issues" : "By " + GROUPS[pageState.group].toLowerCase()) + '</h2><span class="eval-header-sub">ranked by support time</span></div></div>'
        + '<div class="eval-products-section"><div class="eval-bars" role="' + (pageState.group === "issue" ? "listbox" : "list") + '" aria-label="Recurring issues">' + pageList() + "</div></div></section>"
        + '<section class="eval-panel pi-detail" aria-live="polite" aria-labelledby="piDetailTitle">'
        + '<div class="eval-header"><div class="eval-header-left"><h2 class="eval-title" id="piDetailTitle">' + (pageState.group === "issue" ? esc(it.name) : "Pick a " + GROUPS[pageState.group].toLowerCase()) + "</h2>"
        + '<span class="eval-header-sub">' + (pageState.group === "issue" ? "evidence, related articles and AiMY’s suggestion" : "AiMY answers what repeats there") + "</span></div>"
        + (pageState.group === "issue" ? em("prompt", "pi-issue-" + it.id, "Tell me more about " + it.name.toLowerCase() + ": ", "Ask AiMY") : "") + "</div>"
        + '<div class="eval-products-section">' + (pageState.group === "issue" ? renderIssue(it.id)
          : '<p class="pi-basis" style="margin:0">Each row opens the conversation with the question asked for you.</p>')
        + "</div></section></div>";
    }
    /* The summary cards are drawn once (their entrance plays once); the
       toolbar and lists redraw on a tab or grouping change. */
    if (!host.firstChild || part === "all") host.innerHTML = '<div class="pi-page" id="piPageHead"></div><div class="pi-page" id="piPageBody"></div>';
    var cut = head.indexOf('<div class="pi-toolbar">');
    if (part !== "body") $("#piPageHead").innerHTML = head.slice(0, cut);
    $("#piPageBody").innerHTML = head.slice(cut) + body;
    $$('[data-pi-select="' + pageState.selected + '"]', host).forEach(function (r) { r.setAttribute("aria-selected", "true"); });
  }
  /* Picking an issue changes the detail only. */
  function selectIssue(id) {
    pageState.selected = id;
    var it = issue(id);
    $$("[data-pi-select]").forEach(function (r) { r.setAttribute("aria-selected", String(r.getAttribute("data-pi-select") === id)); });
    var title = $("#piDetailTitle"), section = $(".pi-detail .eval-products-section"), ask = $(".pi-detail .eval-header [data-entry-mode]");
    if (title) title.textContent = it.name;
    if (section) section.innerHTML = renderIssue(id);
    if (ask) { ask.setAttribute("data-aimy-topic", "pi-issue-" + id); ask.setAttribute("data-aimy-ask", "Tell me more about " + it.name.toLowerCase() + ": "); }
  }
  function pageD() {
    var scroll = $(".dashboard-scroll");
    if (!scroll) return;
    document.documentElement.setAttribute("data-pi-page-active", "");
    scroll.insertAdjacentHTML("afterbegin", '<div class="pi-page" id="piPage"></div>');
    renderPage();
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-pi-tab], [data-pi-tab-go], [data-pi-group], [data-pi-select]");
      if (!t || !$("#piPage").contains(t)) return;
      if (t.hasAttribute("data-pi-tab")) pageState.tab = t.getAttribute("data-pi-tab");
      if (t.hasAttribute("data-pi-tab-go")) pageState.tab = t.getAttribute("data-pi-tab-go");
      if (t.hasAttribute("data-pi-group")) pageState.group = t.getAttribute("data-pi-group");
      if (t.hasAttribute("data-pi-select")) { selectIssue(t.getAttribute("data-pi-select")); return; }
      renderPage("body");
    });
    // A decision changes the drafts count above and the issue's state below.
    document.addEventListener("pi:state", function () { renderPage("head"); });
  }

  /* ═══ OPTION E — an Issues tab in Reviews ═══════════════════════════════ */
  function optionE() {
    var seg = $(".tbl-switch .seg");
    var listEl = $("#evalListAccountRows");
    if (!seg || !listEl) return;
    var tab = document.createElement("button");
    tab.className = "seg-btn";
    tab.type = "button";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", "false");
    tab.setAttribute("data-pi-tbl", "issues");
    tab.innerHTML = 'Issues<span class="tbl-n">' + TOTAL.recurring + "</span>";
    seg.appendChild(tab);
    var panel = document.createElement("div");
    panel.className = "pi-reviews";
    panel.id = "piReviewsIssues";
    panel.hidden = true;
    /* Reviews' own table: the same head and row grid as Calls and Tickets,
       with the columns an issue needs. A row asks AiMY about the issue. */
    var head = '<div class="eval-list-head eval-grid" role="row"><span></span><span role="columnheader">Issue</span><span role="columnheader">Product</span>'
      + '<span role="columnheader">Calls</span><span role="columnheader">Status</span><span role="columnheader">Median call</span><span role="columnheader" class="elh-num">Support time</span></div>';
    var rows = byCost.map(function (it) {
      return '<div class="eval-row eval-grid" role="listitem" tabindex="0" data-pi-issue="' + it.id + '" data-entry-mode="investigate" data-aimy-topic="pi-issue-' + it.id + '" data-aimy-ask="' + esc(it.q) + '">'
        + "<span></span>"
        + '<span class="er-interaction" title="' + esc(it.type) + '"><b>' + esc(it.name) + "</b></span>"
        + '<span class="er-agent">' + it.product + " · " + it.clients + " clients</span>"
        + '<span class="eval-row-date">' + it.calls + " calls</span>"
        + "<span>" + ws(it.state) + "</span>"
        + '<span class="eval-row-date">' + it.med + "</span>"
        + '<span class="er-score"><b class="eval-row-score">' + it.hours + " h</b></span>"
        + "</div>";
    }).join("");
    panel.innerHTML = '<p class="pi-scope" data-pi-scope style="margin:0">' + scopeLine() + "</p>"
      + '<div class="eval-list" role="list" aria-label="Recurring customer issues">' + head + rows + "</div>"
      + '<p class="pi-basis" style="margin:0">' + MORE + " more issues under 4 hours each. A quote in the answer plays the call in the evaluation detail.</p>";
    listEl.parentNode.insertBefore(panel, listEl);
    var HIDE = ["#evalFilterStrip", "#evalSortBar", "#evalListAccountRows", "#evalPagination", "#evalScopeBar", "#evalAiState"];
    var keep = {};
    function show(on) {
      panel.hidden = !on;
      HIDE.forEach(function (s) {
        var n = $(s);
        if (!n) return;
        if (on) { keep[s] = n.style.display; n.style.display = "none"; } else n.style.display = keep[s] || "";
      });
      tab.classList.toggle("active", on);
      tab.setAttribute("aria-selected", String(on));
      var sub = $("#evalListSub");
      if (sub && on) sub.textContent = TOTAL.recurring + " recurring issues across " + TOTAL.calls + " analyzed calls";
    }
    tab.addEventListener("click", function (e) {
      e.stopPropagation();
      $$(".seg-btn", seg).forEach(function (b) { if (b !== tab) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); } });
      show(true);
    });
    seg.addEventListener("click", function (e) {
      var b = e.target.closest(".seg-btn");
      if (b && b !== tab) show(false);
    });
    if (/[?&]tbl=issues\b/.test(location.search)) setTimeout(function () { tab.click(); }, 300);
  }

  /* ═══ DEMO CONTROLS — switch option without leaving the page ════════════ */
  var OPTIONS = [["a", "Dashboard card"], ["b", "Folded into existing blocks"], ["c", "AiMY only"], ["d", "Its own page"], ["e", "A tab in Reviews"]];
  function hrefFor(o) {
    if (o === "e") return "agent-scorecards.html?option=e&view=evals&tbl=issues";
    if (o === "d") return (PAGE === "customer-issues" ? "customer-issues.html" : "index.html") + "?option=d";
    return "index.html?option=" + o;
  }
  function mountDemo() {
    var rows = $("#umProto .um-demo-rows");
    if (!rows || rows.querySelector("[data-pi-demo]")) return !!rows;
    var row = document.createElement("div");
    row.className = "um-demo-row";
    row.setAttribute("data-pi-demo", "");
    row.innerHTML = '<span class="um-demo-label" id="piDemoLabel">Product Insights option</span>'
      + '<div class="content-view-toggle pi-seg" role="tablist" aria-labelledby="piDemoLabel" style="flex-wrap:wrap">'
      + OPTIONS.map(function (o) {
        return '<button type="button" role="tab" class="' + (o[0] === OPT ? "active" : "") + '" aria-selected="' + (o[0] === OPT) + '" data-pi-opt="' + o[0] + '" title="' + o[1] + '" aria-label="Option ' + o[0].toUpperCase() + ", " + o[1] + '">' + o[0].toUpperCase() + "</button>";
      }).join("")
      + "</div>"
      + '<p class="um-demo-note" style="margin:6px 0 0">Option ' + OPT.toUpperCase() + ": " + OPTIONS.filter(function (o) { return o[0] === OPT; })[0][1] + "</p>";
    rows.insertBefore(row, rows.firstChild);
    row.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pi-opt]");
      if (!b) return;
      location.href = hrefFor(b.getAttribute("data-pi-opt"));
    });
    return true;
  }

  /* ═══ BOOT ══════════════════════════════════════════════════════════════ */
  // Option D's rail entry only exists on option D; removed before the rail reads the nav.
  $$("[data-pi-only]").forEach(function (n) { if (n.getAttribute("data-pi-only") !== OPT) n.remove(); });

  // The photo path in the shared menu script is relative to the product root.
  function fixAsset(n) {
    if (n.nodeType !== 1) return;
    var st = n.getAttribute("style");
    if (st && st.indexOf('url("assets/') !== -1) n.setAttribute("style", st.split('url("assets/').join('url("' + ROOT + "assets/"));
    if (n.tagName === "IMG" && /^assets\//.test(n.getAttribute("src") || "")) n.setAttribute("src", ROOT + n.getAttribute("src"));
  }
  if (window.MutationObserver) {
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === "attributes") fixAsset(m.target);
        else m.addedNodes.forEach(function (n) { fixAsset(n); if (n.querySelectorAll) $$("[style*='assets/'], img", n).forEach(fixAsset); });
      });
    }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["style", "src"] });
  }

  // Options B-E show the Dashboard without option A's card, which the product now ships.
  if (OPT !== "a") $$("#productInsights, #productInsightsEvalSlot").forEach(function (n) { n.remove(); });

  if (PAGE === "dashboard") {
    if (OPT === "a") optionA();
    else if (OPT === "b") optionB();
    else if (OPT === "c") optionC();
    else if (OPT === "d") { teaserD(); railFinding("customer-issues", TOTAL.recurring, "recurring customer issues"); }
    else if (OPT === "e") railFinding("agent-scorecards", TOTAL.recurring, "recurring customer issues", "agent-scorecards.html?view=evals&tbl=issues");
  } else if (PAGE === "customer-issues") {
    pageD();
    railFinding("customer-issues", TOTAL.recurring, "recurring customer issues");
  } else if (PAGE === "reviews") {
    if (OPT === "e") { optionE(); railFinding("agent-scorecards", TOTAL.recurring, "recurring customer issues", "agent-scorecards.html?view=evals&tbl=issues"); }
    if (OPT === "d") railFinding("customer-issues", TOTAL.recurring, "recurring customer issues");
  }
  paintScope();

  /* ?focus= scrolls the option into view, for the comparison sheet's
     previews. Read now: the shared canvas script tidies the URL later. */
  var FOCUS = { card: "#piCard", insight: '[data-classification="customer-issue"]', teaser: ".aimy-detected-strip + .aimy-detected-strip", list: ".pi-page-grid", issues: "#piReviewsIssues" };
  var focusKey = new URLSearchParams(location.search).get("focus");
  if (FOCUS[focusKey]) {
    setTimeout(function () {
      var n = $(FOCUS[focusKey]);
      if (n) n.scrollIntoView({ block: focusKey === "issues" || focusKey === "list" ? "start" : "center" });
    }, 900);
  }

  var demoTries = 0, demoT = setInterval(function () { if (mountDemo() || ++demoTries > 40) clearInterval(demoT); }, 250);
})();
