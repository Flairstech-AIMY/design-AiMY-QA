/* ═══════════════════════════════════════════════════════════════════════════
   HOME'S TABS — Product insights and Customer insights

   index.html is Home. Two more tabs live on the same page, each with its own
   rail entry, chosen by `?tab=`:

     home               The dashboard, with an Insights brief: one card per
                        tab, the headline and top three, linking to the tab.
     product-insights   Option D of design-strategy/product-insights (a page of
                        its own), led by the tiles the Dashboard carried
                        before Home, then Issues or Knowledge drafts, group
                        by issue, client or product, and the issue list with
                        its detail beside it. Plus option C's touches: a
                        nudge above the Ask AiMY bar on Home, a rail finding,
                        and suggested questions when the conversation opens
                        empty.
     customer-insights  The same anatomy per client: health, sentiment, CSAT,
                        what they call about, and AiMY's next step.

   The Product insights data, rows and AiMY answers are the page's own
   (window.AIMY_PI, set by the Product insights script in index.html), so an
   issue reads the same on the brief, in the tab and in the conversation, and
   a decision moves it everywhere at once. The client data is here.

   STATE: the tab and what is picked inside it are surface keys (tab, pi_view,
   pi_group, pi_issue, ci_client), registered with assets/aimy-canvas.js
   through index.html's AIMY_SURFACE, so the URL names what is on screen and a
   stored conversation restores its tab. Issue work states survive moving
   between tabs in sessionStorage. All figures are illustrative.

   LOAD ORDER: after the Product insights script, before aimy-canvas.js and
   aimy-rail.js.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var PI = window.AIMY_PI;
  if (!PI) return;
  var root = document.documentElement;
  var esc = PI.esc, ws = PI.ws, em = PI.em, pill = PI.pill;

  var TITLES = { "home": "Home", "product-insights": "Product insights", "customer-insights": "Customer insights" };
  var state = { tab: "home", piView: "issues", piGroup: "issue", piIssue: PI.byCost[0].id, ciClient: "objectif-lune", ciShow: "all" };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function toast(title, sub) { if (typeof window.showToast === "function") window.showToast({ title: title, sub: sub || "" }); }
  function sync() {
    if (window.__AIMY_SURFACE_RESTORING || !window.AimyChat) return;
    window.AimyChat.sync();
  }
  var ARROW = '<svg class="lucide lucide-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>';

  /* ═══ CLIENTS (illustrative) ═════════════════════════════════════════════
     The 2,486 analyzed calls behind Product insights, split by client.
     `issues` are Product insights issue ids, so a client's issues read the
     same work state as the issue list. CSAT is the YTD average outcome. */
  var CLIENTS = [
    { id: "objectif-lune", name: "Objectif Lune", products: "Upland · Asteris", calls: 612, health: "attention",
      sentiment: "Negative", negative: 233, csat: 68, csatDelta: -6, surveys: 74, quality: "79.2%",
      issues: ["setup", "invoice", "refund"], recurring: 126,
      quote: { call: "Call 10442", date: "9 Sep", text: "I did the first step and then nothing tells me what to do next." },
      why: "Setup calls doubled after Upland 4.2 shipped, and the detractors cluster on the renewal invoice.",
      next: "Send their admins the setup checklist, and brief the account lead on the invoice change before renewal." },
    { id: "rightanswers", name: "RightAnswers", products: "Upland", calls: 488, health: "attention",
      sentiment: "Neutral", negative: 97, csat: 74, csatDelta: -2, surveys: 58, quality: "91.3%",
      issues: ["login", "sso"], recurring: 88,
      quote: { call: "Call 10593", date: "12 Sep", text: "The code goes to my old email since we changed domain." },
      why: "Login codes still go to their old email domain after a domain change: 31 calls in the last two weeks.",
      next: "Ask their admin to update the account domain, and add the domain-change steps to the login article." },
    { id: "panviva", name: "Panviva", products: "Upland", calls: 401, health: "watch",
      sentiment: "Neutral", negative: 64, csat: 79, csatDelta: 0, surveys: 41, quality: "88.0%",
      issues: ["setup", "export"], recurring: 61,
      quote: { call: "Call 10577", date: "14 Sep", text: "The guide stops at the login page, so I had to call." },
      why: "The same setup issue Objectif Lune reports, at a lower volume, plus large exports that time out.",
      next: "Covered by the setup article update. No separate action until the export fix ships." },
    { id: "interfax", name: "InterFax", products: "Asteris", calls: 356, health: "watch",
      sentiment: "Positive", negative: 39, csat: 83, csatDelta: 1, surveys: 37, quality: "88.4%",
      issues: ["invoice"], recurring: 40,
      quote: { call: "Call 10611", date: "11 Sep", text: "The renewal invoice has a usage line nobody mentioned." },
      why: "Positive overall, but every invoice call is a detractor in a renewal month.",
      next: "Explain the usage line in the renewal email before their next billing cycle." },
    { id: "adestra", name: "Adestra", products: "Asteris · SecondStreet", calls: 342, health: "healthy",
      sentiment: "Positive", negative: 21, csat: 91, csatDelta: 3, surveys: 45, quality: "93.7%",
      issues: [], recurring: 0, quote: null,
      why: "No recurring issue above 4 hours of support, and sentiment has improved three months running.",
      next: "Nothing to change. Their onboarding is the reference to reuse for other clients." },
    { id: "second-street", name: "Second Street", products: "SecondStreet", calls: 287, health: "healthy",
      sentiment: "Positive", negative: 26, csat: 88, csatDelta: 0, surveys: 33, quality: "90.1%",
      issues: ["report"], recurring: 12, quote: null,
      why: "Steady. Scheduled reports arrive empty a few times a month, which is already in Product insights.",
      next: "Nothing new. The scheduled-report issue is tracked in Product insights." }
  ];
  var HEALTH = { attention: "Needs attention", watch: "Watch", healthy: "Healthy" };
  var SENT_CLS = { Negative: "err", Neutral: "warn", Positive: "ok" };
  var SHOW = { all: "All", attention: "Needs attention", watch: "Watch", healthy: "Healthy" };
  var ORDER = { attention: 0, watch: 1, healthy: 2 };
  var ranked = CLIENTS.slice().sort(function (a, b) { return ORDER[a.health] - ORDER[b.health] || a.csat - b.csat; });
  function client(id) { for (var i = 0; i < CLIENTS.length; i++) if (CLIENTS[i].id === id) return CLIENTS[i]; return null; }
  function clientByName(name) { for (var i = 0; i < CLIENTS.length; i++) if (CLIENTS[i].name === name) return CLIENTS[i]; return null; }
  function count(h) { return CLIENTS.filter(function (c) { return c.health === h; }).length; }
  function avgCsat() { return Math.round(CLIENTS.reduce(function (n, c) { return n + c.csat; }, 0) / CLIENTS.length); }
  function delta(n) { return n > 0 ? "&#8593; " + n + " pts" : n < 0 ? "&#8595; " + Math.abs(n) + " pts" : "no change"; }

  /* The client filter narrows the list; every other filter only changes the
     scope sentence, as on the brief. */
  function filters() {
    var f = window.AIMY_QA_FILTERS && window.AIMY_QA_FILTERS.get ? window.AIMY_QA_FILTERS.get() : null;
    return f || { client: [] };
  }
  function inScope() {
    var picked = filters().client || [];
    return ranked.filter(function (c) { return !picked.length || picked.indexOf(c.name) >= 0; });
  }

  /* ═══ SHARED PIECES ══════════════════════════════════════════════════════ */
  function seg(label, key, options, current) {
    return '<div class="content-view-toggle ins-seg" role="tablist" aria-label="' + esc(label) + '">'
      + Object.keys(options).map(function (k) {
        return '<button type="button" role="tab" data-ins-' + key + '="' + k + '" class="' + (current === k ? "active" : "") + '" aria-selected="' + (current === k) + '">' + options[k] + "</button>";
      }).join("") + "</div>";
  }
  function tabHref(tab, extra) { return "index.html?tab=" + tab + (extra || ""); }

  /* ═══ PRODUCT INSIGHTS TAB ═══════════════════════════════════════════════ */
  var GROUPS = { issue: "Issue", client: "Client", product: "Product" };
  function drafts() { return PI.ISSUES.filter(function (it) { return it.state === "staged" || it.state === "drafted"; }); }

  /* The issue row, picked rather than asked: the detail beside the list is
     the answer, and "Ask AiMY" is one button away from it. */
  function selectRow(it) {
    var pct = Math.max(6, Math.round(it.hours / PI.byCost[0].hours * 100));
    var on = it.id === state.piIssue;
    return '<div class="eval-bar-row" data-pi-issue="' + it.id + '" data-ins-issue="' + it.id + '" role="option" tabindex="0" aria-selected="' + on + '"'
      + ' aria-label="' + esc(it.name + ", " + it.calls + " calls, " + it.hours + " hours of support") + '">'
      + '<div class="eval-bar-top"><span class="eval-bar-label">' + esc(it.name) + "</span>"
      + '<div class="eval-bar-right"><span class="eval-bar-count">' + it.calls + " calls · " + it.med + ' median</span><span class="eval-bar-avg">' + it.hours + " h</span></div></div>"
      + '<div class="eval-bar-track"><div class="eval-bar-fill" style="width:' + pct + '%"></div></div>'
      + '<div class="pi-row-meta">' + ws(it.state) + "<span>" + it.clients + " clients · " + it.product + " · " + it.type + "</span></div></div>";
  }
  function piList() {
    if (state.piGroup === "client") {
      var max = PI.CLIENTS[0].calls;
      /* A client opens its own page in Customer insights. */
      return PI.CLIENTS.map(function (c) {
        var ci = clientByName(c.name);
        return '<a class="eval-bar-row ins-link-row" href="' + tabHref("customer-insights", ci ? "&ci_client=" + ci.id : "") + '">'
          + '<div class="eval-bar-top"><span class="eval-bar-label">' + esc(c.name) + '</span><div class="eval-bar-right"><span class="eval-bar-count">' + c.calls + " calls · " + c.issues + (c.issues === 1 ? " issue" : " issues") + '</span><span class="eval-bar-avg">' + c.top + "</span></div></div>"
          + '<div class="eval-bar-track"><div class="eval-bar-fill" style="width:' + Math.round(c.calls / max * 100) + '%"></div></div></a>';
      }).join("");
    }
    if (state.piGroup === "product") {
      return PI.PRODUCTS.map(function (p) {
        return PI.plainRow(p.name, p.calls + " calls · " + p.issues + " issues", p.share + "%", p.share, "pi-all", "Which recurring issues come from " + p.name + "?");
      }).join("");
    }
    return PI.byCost.map(selectRow).join("")
      + '<p class="pi-basis ins-more">' + PI.MORE + " more issues under 4 hours each. Ask AiMY for them.</p>";
  }
  function whoReports(it) {
    var who = CLIENTS.filter(function (c) { return c.issues.indexOf(it.id) >= 0; });
    if (!who.length) return "";
    return '<p class="ins-who">Reported most by '
      + who.map(function (c) { return '<a href="' + tabHref("customer-insights", "&ci_client=" + c.id) + '">' + esc(c.name) + "</a>"; }).join(", ")
      + "</p>";
  }
  function piDetail() {
    var it = PI.issue(state.piIssue) || PI.byCost[0];
    return '<section class="eval-panel pi-detail ins-detail" aria-live="polite" aria-labelledby="piDetailTitle">'
      + '<div class="eval-header"><div class="eval-header-left"><h2 class="eval-title" id="piDetailTitle">' + esc(it.name) + "</h2>"
      + '<span class="eval-header-sub">' + esc(it.product + " · " + it.type) + " · " + it.calls + " calls · " + it.clients + " clients · " + it.hours + " h of support</span></div>"
      + em("investigate", "pi-issue-" + it.id, it.q, "Ask AiMY") + "</div>"
      + '<div class="eval-products-section">' + whoReports(it) + PI.renderIssue(it.id)
      + '<div class="canvas-action-row ins-detail-actions">'
      + em("investigate", "pi-calls-" + it.id, "Show all " + it.calls + " calls about " + it.name + ".", "Show all " + it.calls + " calls")
      + em("investigate", "pi-trend-" + it.id, "Has " + it.name.toLowerCase() + " grown since last month?", "Is it growing?")
      + "</div></div></section>";
  }
  function queue() {
    var rows = drafts();
    var body = rows.length ? rows.map(function (it) {
      var staged = it.state === "staged";
      return '<div class="pi-queue-row" data-pi-issue="' + it.id + '"><span class="pi-queue-main"><b>' + (it.id === "setup" ? "Finish setting up Upland" : esc(it.name) + ": what to do") + "</b>"
        + "<small>From “" + esc(it.name) + "” · " + it.calls + " calls</small></span>" + ws(it.state)
        + em("review", (staged ? "pi-publish-" : "pi-draft-") + it.id, (staged ? "Review and publish the knowledge draft for " : "Show the knowledge draft for ") + it.name + ".", staged ? "Review and publish" : "Review the draft") + "</div>";
    }).join("") : '<p class="pi-basis">No drafts are waiting. Draft one from an issue’s suggested next step.</p>';
    return '<section class="eval-panel"><div class="eval-header"><div class="eval-header-left"><h2 class="eval-title">Knowledge review queue</h2>'
      + '<span class="eval-header-sub">drafts from customer issues · nothing publishes until you approve it</span></div></div>'
      + '<div class="eval-products-section">' + body + "</div></section>";
  }
  /* The tiles the Dashboard carried before Home: the recurring-issues tile,
     then the three costliest issues. Each tile asks AiMY about what it
     shows; the list below is where an issue is picked. */
  var OPACITY = [0.75, 0.55, 0.38];
  function piTiles() {
    var T = PI.TOTAL, top = PI.byCost.slice(0, 3), peek = PI.byCost.slice(3, 5);
    var rest = T.recurringHours - top.reduce(function (n, it) { return n + it.hours; }, 0);
    var more = T.recurring - top.length;
    var lead = '<div class="bcard pi-lead" role="button" tabindex="0" data-pi-tile="rest" data-entry-mode="investigate" data-aimy-topic="pi-all"'
      + ' data-aimy-ask="Which recurring issues keep coming back, beyond the top three?"'
      + ' aria-label="Recurring issues: ' + T.share + "% of support time, " + T.recurringHours + " of " + T.hours + " hours. Open the other " + more + ' in AiMY">'
      + '<div class="bcard-body"><div class="bcard-meta"><span class="type-label">Recurring issues</span><span class="priority-badge pi-badge">' + T.recurring + " issues</span></div>"
      + '<div class="bcard-stat-line"><span class="bcard-stat">' + T.share + '%</span><span class="bcard-stat-cap">of support time · <b>' + T.recurringHours + "</b> of " + T.hours + " h</span></div>"
      + '<div class="pi-stack" aria-hidden="true">'
      + top.map(function (it, i) { return '<i data-seg="' + it.id + '" style="flex:' + it.hours + ";--o:" + OPACITY[i] + '"></i>'; }).join("")
      + '<i class="pi-rest" data-seg="rest" style="flex:' + rest + '"></i></div>'
      + '<div class="pi-peek" aria-hidden="true">' + peek.map(function (it) { return "<span><span>" + esc(it.name) + "</span><b>" + it.hours + " h</b></span>"; }).join("") + "</div>"
      + '<div class="aimy-done"><span class="pi-count">+' + more + '</span><span class="aimy-done-text">more in AiMY · ' + rest + " h</span>"
      + '<span class="aimy-done-actions"><span class="aimy-done-link primary pi-ask"><svg class="pi-ask-mark" viewBox="0 0 18 20" aria-hidden="true"><use href="#aimy-logo-small"/></svg>Ask AiMY</span></span></div>'
      + "</div></div>";
    var issues = top.map(function (it) {
      var q = PI.QUOTES[it.id] ? PI.QUOTES[it.id][0].text : it.why;
      return '<div class="bcard pi-tile-issue" role="button" tabindex="0" data-pi-issue="' + it.id + '" data-pi-tile="' + it.id + '" data-entry-mode="investigate" data-aimy-topic="pi-issue-' + it.id + '" data-aimy-ask="' + esc(it.q) + '"'
        + ' aria-label="' + esc(it.name + ": " + it.hours + " hours of support, " + it.calls + " calls, " + it.clients + " clients, " + it.product) + '">'
        + '<div class="bcard-body"><div class="bcard-meta"><span class="type-label">' + esc(it.product + " · " + it.type) + "</span></div>"
        + '<div class="bcard-stat-line"><span class="bcard-stat">' + it.hours + ' h</span><span class="bcard-stat-cap">of support · <b>' + it.calls + "</b> calls</span></div>"
        + '<p class="pi-issue-name">' + esc(it.name) + "</p>"
        + '<q class="pi-issue-quote">' + esc(q) + "</q>"
        + '<div class="aimy-done">' + ws(it.state) + '<span class="aimy-done-text"><b>' + it.clients + "</b> clients</span></div>"
        + "</div></div>";
    }).join("");
    return '<div class="pi-tiles"><div class="pi-mix">' + lead + issues + "</div></div>";
  }
  /* A tile and its share of the bar light up together. */
  function lightSeg(tile, on) {
    var mix = tile.closest(".pi-mix"), stack = mix && $(".pi-stack", mix), id = tile.getAttribute("data-pi-tile");
    if (!stack) return;
    stack.classList.toggle("is-lit", on);
    $$("i", stack).forEach(function (i) { i.classList.toggle("is-on", on && i.getAttribute("data-seg") === id); });
  }
  ["mouseover", "focusin"].forEach(function (ev) {
    document.addEventListener(ev, function (e) { var t = e.target.closest && e.target.closest(".pi-mix [data-pi-tile]"); if (t) lightSeg(t, true); });
  });
  ["mouseout", "focusout"].forEach(function (ev) {
    document.addEventListener(ev, function (e) { var t = e.target.closest && e.target.closest(".pi-mix [data-pi-tile]"); if (t && !t.contains(e.relatedTarget)) lightSeg(t, false); });
  });
  function renderPI(part) {
    var host = $("#viewProductInsights");
    if (!host) return;
    if (!host.firstChild) {
      host.innerHTML = '<div class="dashboard-section-head ins-head"><h2 id="piPageTitle">Product insights</h2><span>Ranked by the support time each issue costs</span></div>'
        + '<p class="pi-scope ins-scope" data-pi-scope></p>'
        + '<p class="pi-mine-note" data-my-qa="only">Team-wide: customer issues do not change with Only my results.</p>'
        + '<div data-ins-part="stats"></div><div data-ins-part="body"></div>';
      PI.paintScope();
      part = "all";
    }
    if (part !== "body") $('[data-ins-part="stats"]', host).innerHTML = piTiles();
    if (part === "stats") return;
    var n = drafts().length;
    var toolbar = '<div class="pi-toolbar">'
      + seg("Product insights view", "piview", { issues: "Issues", drafts: "Knowledge drafts (" + n + ")" }, state.piView)
      + (state.piView === "issues" ? '<div class="pi-toolbar-group"><span>Group by</span>' + seg("Group by", "pigroup", GROUPS, state.piGroup) + "</div>" : "")
      + "</div>";
    var body = state.piView === "drafts" ? queue()
      : '<div class="pi-page-grid">'
        + '<section class="eval-panel pi-list ins-list"><div class="eval-header"><div class="eval-header-left"><h2 class="eval-title">' + (state.piGroup === "issue" ? "Recurring issues" : "By " + GROUPS[state.piGroup].toLowerCase()) + "</h2>"
        + '<span class="eval-header-sub">' + (state.piGroup === "client" ? "each opens the client in Customer insights" : state.piGroup === "product" ? "each asks AiMY what comes from it" : "ranked by support time") + "</span></div></div>"
        + '<div class="eval-products-section"><div class="eval-bars" role="' + (state.piGroup === "issue" ? "listbox" : "list") + '" aria-label="Recurring issues">' + piList() + "</div></div></section>"
        + piDetail() + "</div>";
    $('[data-ins-part="body"]', host).innerHTML = toolbar + body;
  }
  function selectIssue(id) {
    state.piIssue = id;
    $$("[data-ins-issue]").forEach(function (r) { r.setAttribute("aria-selected", String(r.getAttribute("data-ins-issue") === id)); });
    var detail = $("#viewProductInsights .ins-detail");
    if (detail) detail.outerHTML = piDetail();
    sync();
  }

  /* ═══ CUSTOMER INSIGHTS TAB ══════════════════════════════════════════════ */
  /* Client health wears the work-state chip, as every tag in Product insights
     does. It is not a work state, so it carries no data-work-state. */
  var HEALTH_WS = { attention: "ws-failed", watch: "ws-staged", healthy: "ws-completed" };
  function healthPill(c) { return '<span class="work-state ' + HEALTH_WS[c.health] + '"><span class="ws-dot"></span>' + HEALTH[c.health] + "</span>"; }
  function clientRow(c) {
    var on = c.id === state.ciClient;
    return '<div class="eval-bar-row" data-ins-client="' + c.id + '" role="option" tabindex="0" aria-selected="' + on + '"'
      + ' aria-label="' + esc(c.name + ", " + HEALTH[c.health] + ", " + c.sentiment + " sentiment, CSAT " + c.csat + "%") + '">'
      + '<div class="eval-bar-top"><span class="eval-bar-label">' + esc(c.name) + '</span><div class="eval-bar-right"><span class="eval-bar-count">' + c.calls + " calls · " + c.issues.length + (c.issues.length === 1 ? " issue" : " issues") + '</span><span class="eval-bar-avg">CSAT ' + c.csat + "%</span></div></div>"
      + '<div class="eval-bar-track"><div class="eval-bar-fill" style="width:' + c.csat + '%"></div></div>'
      + '<div class="pi-row-meta">' + healthPill(c) + '<span><span class="ins-sent ' + SENT_CLS[c.sentiment] + '">' + c.sentiment + "</span> · " + esc(c.products) + "</span></div></div>";
  }
  function clientIssues(c) {
    if (!c.issues.length) return "<p>No recurring issue above 4 hours of support from " + esc(c.name) + ".</p>";
    return '<div class="ins-issue-links">' + c.issues.map(function (id) {
      var it = PI.issue(id);
      if (!it) return "";
      return '<a class="ins-issue-link" data-pi-issue="' + id + '" href="' + tabHref("product-insights", "&pi_issue=" + id) + '">'
        + '<span class="ins-issue-name">' + esc(it.name) + "</span>" + ws(it.state)
        + '<span class="ins-issue-meta">' + it.hours + " h · " + esc(it.product) + "</span>" + ARROW + "</a>";
    }).join("") + "</div>";
  }
  function clientNext(c) {
    if (c.noteSent) {
      return "<p><strong>Note sent to the account lead.</strong> " + esc(c.name) + "’s next calls will show whether it landed.</p>";
    }
    var act = c.health === "healthy" ? ""
      : '<div class="pi-part-actions"><button class="btn btn-brand btn-sm" type="button" data-entry-mode="review" data-aimy-topic="ci-note-' + c.id + '" data-aimy-ask="' + esc("Draft a note to the " + c.name + " account lead.") + '">Draft a note to the account lead</button></div>';
    return "<p><strong>" + esc(c.next) + '</strong></p><p class="pi-basis">Based on ' + c.calls + " calls and " + c.surveys + " CSAT surveys. Not yet tested with this client.</p>" + act;
  }
  function part(kind, label, body) {
    return '<div class="pi-part pi-part-' + kind + '"><div class="pi-part-label"><i aria-hidden="true"></i>' + label + "</div>" + body + "</div>";
  }
  /* `inner` drops the canvas-render frame, for an answer that already sits
     inside one in the conversation. */
  function clientAnswer(c, inner) {
    var quote = c.quote ? '<div class="pi-quote"><q>' + esc(c.quote.text) + '</q><a class="pi-link" href="manual-audit.html" title="' + c.quote.call + " · " + c.quote.date + '">Open call</a></div>' : "";
    return '<div class="' + (inner ? "" : "canvas-render ") + 'pi-ans pi-issue-ans" data-ci-answer="' + c.id + '">'
      + part("calls", "What they call about", "<p>" + esc(c.why) + "</p>" + clientIssues(c) + quote)
      + part("sug", "Suggested next step", clientNext(c))
      + "</div>";
  }
  function ciDetail() {
    var c = client(state.ciClient) || inScope()[0] || ranked[0];
    return '<section class="eval-panel pi-detail ins-detail" aria-live="polite" aria-labelledby="ciDetailTitle">'
      + '<div class="eval-header"><div class="eval-header-left"><h2 class="eval-title" id="ciDetailTitle">' + esc(c.name) + "</h2>"
      + '<span class="eval-header-sub">' + esc(c.products) + " · " + HEALTH[c.health] + "</span></div>"
      + em("investigate", "ci-client-" + c.id, "How is " + c.name + " doing, and what should I do next?", "Ask AiMY") + "</div>"
      + '<div class="eval-products-section">'
      + '<div class="evidence-row ins-evidence">' + pill(c.calls, " calls") + pill('<span class="ins-sent ' + SENT_CLS[c.sentiment] + '">' + c.sentiment + "</span>", " · " + c.negative + " negative") + pill("CSAT " + c.csat + "%", " · " + delta(c.csatDelta)) + pill(c.quality, " audit quality") + "</div>"
      + clientAnswer(c) + "</div></section>";
  }
  /* The same tiles as Product insights: a Client health tile leads, its bar
     split by analyzed calls into the three client tiles beside it plus the
     rest, then the three clients to look at first. Each tile asks AiMY. */
  function ciTiles() {
    var top = ranked.slice(0, 3), peek = ranked.slice(3, 5), others = ranked.slice(3);
    var rest = others.reduce(function (n, c) { return n + c.calls; }, 0);
    var att = count("attention");
    var lead = '<div class="bcard pi-lead" role="button" tabindex="0" data-pi-tile="rest" data-entry-mode="investigate" data-aimy-topic="ci-all"'
      + ' data-aimy-ask="How are my clients doing, and which need attention?"'
      + ' aria-label="Client health: ' + att + " of " + CLIENTS.length + " clients need attention, CSAT " + avgCsat() + '% average. Ask AiMY about all clients">'
      + '<div class="bcard-body"><div class="bcard-meta"><span class="type-label">Client health</span><span class="priority-badge pi-badge">' + CLIENTS.length + " clients</span></div>"
      + '<div class="bcard-stat-line"><span class="bcard-stat">' + att + '</span><span class="bcard-stat-cap">need attention · CSAT <b>' + avgCsat() + "%</b> average</span></div>"
      + '<div class="pi-stack" aria-hidden="true">'
      + top.map(function (c, i) { return '<i data-seg="' + c.id + '" style="flex:' + c.calls + ";--o:" + OPACITY[i] + '"></i>'; }).join("")
      + '<i class="pi-rest" data-seg="rest" style="flex:' + rest + '"></i></div>'
      + '<div class="pi-peek" aria-hidden="true">' + peek.map(function (c) { return "<span><span>" + esc(c.name) + "</span><b>CSAT " + c.csat + "%</b></span>"; }).join("") + "</div>"
      + '<div class="aimy-done"><span class="pi-count">+' + others.length + '</span><span class="aimy-done-text">more clients · ' + rest.toLocaleString("en-US") + " calls</span>"
      + '<span class="aimy-done-actions"><span class="aimy-done-link primary pi-ask"><svg class="pi-ask-mark" viewBox="0 0 18 20" aria-hidden="true"><use href="#aimy-logo-small"/></svg>Ask AiMY</span></span></div>'
      + "</div></div>";
    var tiles = top.map(function (c) {
      return '<div class="bcard pi-tile-issue" role="button" tabindex="0" data-pi-tile="' + c.id + '" data-entry-mode="investigate" data-aimy-topic="ci-client-' + c.id + '"'
        + ' data-aimy-ask="' + esc("How is " + c.name + " doing, and what should I do next?") + '"'
        + ' aria-label="' + esc(c.name + ": " + HEALTH[c.health] + ", CSAT " + c.csat + "%, " + c.sentiment + " sentiment, " + c.calls + " calls") + '">'
        + '<div class="bcard-body"><div class="bcard-meta"><span class="type-label">' + esc(c.products) + "</span></div>"
        + '<div class="bcard-stat-line"><span class="bcard-stat">' + c.csat + '%</span><span class="bcard-stat-cap">CSAT · <b>' + c.calls + "</b> calls</span></div>"
        + '<p class="pi-issue-name">' + esc(c.name) + "</p>"
        + '<q class="pi-issue-quote">' + esc(c.quote ? c.quote.text : c.why) + "</q>"
        + '<div class="aimy-done">' + healthPill(c) + '<span class="aimy-done-text"><span class="ins-sent ' + SENT_CLS[c.sentiment] + '">' + c.sentiment + "</span> · " + delta(c.csatDelta) + "</span></div>"
        + "</div></div>";
    }).join("");
    return '<div class="pi-tiles"><div class="pi-mix">' + lead + tiles + "</div></div>";
  }
  function renderCI(part) {
    var host = $("#viewCustomerInsights");
    if (!host) return;
    if (!host.firstChild) {
      host.innerHTML = '<div class="dashboard-section-head ins-head"><h2 id="ciPageTitle">Customer insights</h2><span>Ranked by need for attention, then CSAT</span></div>'
        + '<p class="pi-scope ins-scope" data-ci-scope></p>'
        + '<p class="pi-mine-note" data-my-qa="only">Team-wide: client health does not change with Only my results.</p>'
        + '<div data-ins-part="stats"></div><div data-ins-part="body"></div>';
      part = "all";
    }
    paintCiScope();
    if (part !== "body") $('[data-ins-part="stats"]', host).innerHTML = ciTiles();
    var list = inScope().filter(function (c) { return state.ciShow === "all" || c.health === state.ciShow; });
    if (list.length && !list.some(function (c) { return c.id === state.ciClient; })) state.ciClient = list[0].id;
    var shows = {};
    Object.keys(SHOW).forEach(function (k) { shows[k] = SHOW[k] + " (" + (k === "all" ? inScope().length : inScope().filter(function (c) { return c.health === k; }).length) + ")"; });
    $('[data-ins-part="body"]', host).innerHTML = '<div class="pi-toolbar">' + seg("Show clients", "cishow", shows, state.ciShow) + "</div>"
      + '<div class="pi-page-grid">'
      + '<section class="eval-panel pi-list ins-list"><div class="eval-header"><div class="eval-header-left"><h2 class="eval-title">Clients</h2><span class="eval-header-sub">ranked by need for attention, then CSAT</span></div></div>'
      + '<div class="eval-products-section"><div class="eval-bars" role="listbox" aria-label="Clients">'
      + (list.length ? list.map(clientRow).join("") : '<p class="pi-basis">No clients in this group for the current filters.</p>')
      + "</div></div></section>"
      + (list.length ? ciDetail() : "") + "</div>";
  }
  function selectClient(id) {
    state.ciClient = id;
    $$("[data-ins-client]").forEach(function (r) { r.setAttribute("aria-selected", String(r.getAttribute("data-ins-client") === id)); });
    var detail = $("#viewCustomerInsights .ins-detail");
    if (detail) detail.outerHTML = ciDetail();
    sync();
  }
  function paintCiScope() {
    var p = PI.scopeParts();
    $$("[data-ci-scope]").forEach(function (n) {
      n.innerHTML = "How each client is doing · Based on <b>" + p[0] + "</b> · " + p[1] + " · " + p[2] + " · " + p[3];
    });
  }

  /* ═══ CUSTOMER INSIGHTS IN AiMY ══════════════════════════════════════════
     The same client answer the tab shows, so the conversation and the page
     never disagree, plus the overview and the reviewed note. */
  function ciAll() {
    return '<div class="canvas-render pi-ans" data-ci-ctx="all"><div class="canvas-type-label">Customer insights · all clients</div>'
      + '<p class="pi-ans-lead"><strong>' + count("attention") + " of " + CLIENTS.length + " clients need attention.</strong> " + esc(ranked[0].name) + " has the lowest CSAT at " + ranked[0].csat + "% and the most negative calls; RightAnswers is close behind on login codes.</p>"
      + '<div class="evidence-row">' + pill(CLIENTS.length, " clients") + pill("CSAT " + avgCsat() + "%", " average") + pill(count("attention"), " need attention") + "</div>"
      + '<div class="pi-sec"><div class="pi-sec-label">Ranked by need for attention</div><div class="eval-bars">'
      + ranked.map(function (c) {
        return PI.plainRow(c.name, HEALTH[c.health] + " · " + c.sentiment, "CSAT " + c.csat + "%", c.csat, "ci-client-" + c.id, "How is " + c.name + " doing, and what should I do next?");
      }).join("") + "</div></div></div>";
  }
  function ciClient(id) {
    var c = client(id);
    if (!c) return null;
    return '<div class="canvas-render pi-ans" data-ci-ctx="client:' + id + '"><div class="canvas-type-label">Customer insights · ' + esc(c.name) + "</div>"
      + '<p class="pi-ans-lead"><strong>' + esc(c.name) + "</strong> " + { attention: "<strong>needs attention</strong>", watch: "is <strong>one to watch</strong>", healthy: "is <strong>healthy</strong>" }[c.health] + ": " + c.calls + " calls, <strong>" + c.sentiment.toLowerCase() + "</strong> sentiment (" + c.negative + " negative), CSAT <strong>" + c.csat + "%</strong>, " + delta(c.csatDelta) + " since July.</p>"
      + clientAnswer(c, true) + "</div>";
  }
  function ciNote(id) {
    var c = client(id);
    if (!c) return null;
    var title = c.name + ": what customers are telling us";
    return '<div class="canvas-render" data-ci-ctx="note:' + id + '">'
      + '<div class="canvas-type-label">Reviewed action · Note to the account lead</div>'
      + '<div style="font-size:12.5px;line-height:1.65;color:var(--d300);margin-bottom:12px">I drafted a note from <strong>' + c.calls + " calls</strong> and <strong>" + c.surveys + " CSAT surveys</strong>.</div>"
      + '<div class="pi-draft"><b>' + esc(title) + "</b><span>" + esc(c.why) + "</span><ins>Next: " + esc(c.next) + "</ins></div>"
      + '<div class="decision-zone" style="max-width:none" data-dz-topic="ci-note-' + id + '" data-dz-label="Note to the account lead"'
      + ' data-dz-accepted="Note sent to the ' + esc(c.name) + ' account lead."'
      + ' data-dz-accepted-meta="Sent by Engy Y. · 09:16 · you can undo it for 30 seconds"'
      + ' data-dz-audit="Account lead note sent: ' + esc(c.name) + '"'
      + ' data-dz-rejected="Note discarded. Nothing was sent."'
      + ' data-dz-rejected-meta="Rejected by Engy Y. · 09:16 · tell AiMY what was wrong and it can write another"'
      + ' data-dz-reject-label="What was wrong with the note"'
      + ' data-dz-edit-fields="Title|' + esc(title) + '"'
      + ' data-dz-undone="Withdrawn. Back to awaiting your decision.">'
      + '<p class="dz-prompt">Send this note to the ' + esc(c.name) + " account lead?</p>"
      + '<div class="dz-consequence"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:2px" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/></svg>'
      + "<span>The account lead gets it by email. Nothing is sent to the client.</span></div>"
      + '<div class="dz-actions"><button class="btn btn-brand btn-sm" type="button" data-hr-decision="accept">Send</button>'
      + '<button class="btn btn-ghost btn-sm" type="button" data-hr-decision="edit">Edit first</button>'
      + '<button class="btn btn-ghost btn-sm" type="button" data-hr-decision="reject">Reject</button>'
      + '<span class="dz-spacer"></span><span class="work-state ws-staged" data-work-state="staged"><span class="ws-dot"></span>Awaiting you</span></div>'
      + '<div class="dz-meta"><span>Proposed by AiMY · 09:14</span><span>·</span><span>Requires: <strong style="color:var(--d300)">Manager</strong></span><span>·</span><span>Decision is logged</span></div>'
      + "</div></div>";
  }
  var RBT = window.RESPONSE_BY_TOPIC;
  if (RBT) {
    RBT["ci-all"] = ciAll;
    CLIENTS.forEach(function (c) {
      RBT["ci-client-" + c.id] = function () { return ciClient(c.id); };
      RBT["ci-note-" + c.id] = function () { return ciNote(c.id); };
    });
  }
  function setNote(id, sent) {
    var c = client(id);
    if (!c) return;
    c.noteSent = sent;
    $$('[data-ci-answer="' + id + '"]').forEach(function (n) { n.outerHTML = clientAnswer(c, !n.classList.contains("canvas-render")); });
  }
  if (typeof window.applyOutcome === "function") {
    var applyOrig = window.applyOutcome;
    window.applyOutcome = function (env) {
      var m = env && /^ci-note-(.+)$/.exec(env.topic || "");
      if (!m) return applyOrig.apply(this, arguments);
      setNote(m[1], true);
      toast("Note sent", "The " + (client(m[1]) || {}).name + " account lead has it.");
    };
  }
  document.addEventListener("click", function (e) {
    var u = e.target.closest && e.target.closest('[data-hr-decision="undo"]');
    var zone = u && u.closest(".canvas-render") && u.closest(".canvas-render").querySelector('[data-dz-topic^="ci-note-"]');
    if (zone) setNote(zone.getAttribute("data-dz-topic").replace("ci-note-", ""), false);
  }, true);

  /* "Based on" names the client the question is about. */
  function paintCiBasis(topic) {
    var tags = document.getElementById("overlayContextTags");
    var m = /^ci-(client|note)-(.+)$/.exec(topic || ""), c = m && client(m[2]), p = PI.scopeParts();
    if (!tags || !/^ci-/.test(topic || "")) return;
    var list = c ? [c.name, c.products, c.calls + " calls", c.surveys + " surveys", p[3]] : ["All clients", "2,486 analyzed calls", p[3]];
    tags.innerHTML = list.map(function (t) { return '<span class="overlay-context-tag">' + esc(t) + "</span>"; }).join("");
  }

  /* ═══ OPTION C — AiMY OFFERS IT ══════════════════════════════════════════
     Suggested questions when the conversation opens with nothing asked, for
     the tab you are on, and a nudge above the Ask AiMY bar on Home. */
  var SUGG = {
    "home": [["pi-all", "What are customers calling about most?"], ["ci-all", "Which clients need attention?"], ["pi-issue-setup", "Which recurring issue costs the most support time?"]],
    "product-insights": [["pi-all", "What are customers calling about most?"], ["pi-customers", "Which clients keep repeating issues?"], ["pi-issue-setup", "Which recurring issue costs the most support time?"]],
    "customer-insights": [["ci-all", "Which clients need attention?"], ["ci-client-objectif-lune", "Why is Objectif Lune's CSAT falling?"], ["pi-customers", "Which clients keep repeating issues?"]]
  };
  if (typeof window.openOverlay === "function") {
    var openOrig = window.openOverlay;
    window.openOverlay = function (text) {
      var topic = window.__aimyTopic;
      var r = openOrig.apply(this, arguments);
      paintCiBasis(topic);
      var sugg = $("#overlaySuggestions");
      if (sugg) {
        $$("[data-ins-sugg]", sugg).forEach(function (b) { b.remove(); });
        if (!text && !root.classList.contains("is-my-qa")) {
          sugg.insertAdjacentHTML("afterbegin", SUGG[state.tab].map(function (s) {
            return '<button class="overlay-sugg-chip" type="button" data-ins-sugg="' + s[0] + '">' + esc(s[1]) + "</button>";
          }).join(""));
        }
      }
      return r;
    };
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-ins-sugg]");
    if (!b) return;
    e.stopPropagation();
    window.__aimyTopic = b.getAttribute("data-ins-sugg");
    if (typeof window.overlaySuggestion === "function") window.overlaySuggestion(b);
    PI.paintBasis(window.__aimyTopic);
    paintCiBasis(window.__aimyTopic);
  }, true);

  var NUDGE_KEY = "aimy-qa-pi-nudge";
  function nudgeDismissed() { try { return sessionStorage.getItem(NUDGE_KEY) === "off"; } catch (e) { return false; } }
  function mountNudge() {
    var wrap = $("#aimyFloatWrap");
    if (!wrap || $("#piNudge")) return;
    var T = PI.TOTAL;
    var b = document.createElement("button");
    b.type = "button";
    b.id = "piNudge";
    b.className = "overlay-resume pi-nudge";
    b.setAttribute("data-entry-mode", "investigate");
    b.setAttribute("data-aimy-topic", "pi-all");
    b.setAttribute("data-aimy-ask", "What are customers calling about most?");
    b.setAttribute("aria-label", "New: " + T.recurring + " issues customers keep calling about, " + T.share + "% of support time. Ask AiMY");
    b.innerHTML = '<svg viewBox="0 0 18 20" aria-hidden="true"><use href="#aimy-logo-small"/></svg>'
      + '<span>New · <span class="ores-topic">' + T.recurring + " issues customers keep calling about</span></span>"
      + '<span class="ores-meta">' + T.share + "% of support time</span>"
      + '<span class="ores-x" role="presentation" aria-hidden="true">&times;</span>';
    /* The × dismisses for this session without asking. */
    b.querySelector(".ores-x").addEventListener("click", function (e) {
      e.stopPropagation();
      try { sessionStorage.setItem(NUDGE_KEY, "off"); } catch (err) {}
      paintNudge();
    });
    b.addEventListener("click", function () {
      try { sessionStorage.setItem(NUDGE_KEY, "off"); } catch (err) {}
      setTimeout(paintNudge, 0);
    });
    wrap.appendChild(b);
    /* It shares the Continue pill's place, so it steps aside for it. */
    if (window.MutationObserver) new MutationObserver(paintNudge).observe(wrap, { subtree: true, attributes: true, attributeFilter: ["class"], childList: true });
    paintNudge();
  }
  function paintNudge() {
    var b = $("#piNudge");
    if (!b) return;
    var resume = $("#overlayResume");
    var show = state.tab === "home" && !nudgeDismissed() && !root.classList.contains("is-my-qa")
      && !(resume && resume.classList.contains("is-visible"));
    if (b.classList.contains("is-visible") !== show) b.classList.toggle("is-visible", show);
  }

  /* ═══ WORK STATE ACROSS TABS ═════════════════════════════════════════════
     Each tab is a page load, so a draft sent from Product insights would
     reset on Home. The state is kept for the session, as the rail keeps
     disputes. */
  var STATES_KEY = "aimy-qa-pi-states";
  function readStates() { try { return JSON.parse(sessionStorage.getItem(STATES_KEY) || "{}") || {}; } catch (e) { return {}; } }
  var restoring = false;
  document.addEventListener("pi:state", function (e) {
    if (!restoring) {
      var all = readStates();
      all[e.detail.id] = e.detail.state;
      try { sessionStorage.setItem(STATES_KEY, JSON.stringify(all)); } catch (err) {}
    }
    /* The drafts count, the queue and the issue's badge all move. */
    if (state.tab === "product-insights") renderPI("all");
    if (state.tab === "customer-insights") {
      var detail = $("#viewCustomerInsights .ins-detail");
      if (detail) detail.outerHTML = ciDetail();
    }
  });
  (function restoreStates() {
    var saved = readStates();
    restoring = true;
    Object.keys(saved).forEach(function (id) {
      var it = PI.issue(id);
      if (it && it.state !== saved[id]) PI.setIssueState(id, saved[id]);
    });
    restoring = false;
  })();

  /* ═══ THE SWITCH ═════════════════════════════════════════════════════════ */
  function show(tab, opts) {
    if (!TITLES[tab]) tab = "home";
    var changed = tab !== state.tab;
    state.tab = tab;
    if (tab === "home") root.removeAttribute("data-ins-tab");
    else root.setAttribute("data-ins-tab", tab);
    $("#viewProductInsights").hidden = tab !== "product-insights";
    $("#viewCustomerInsights").hidden = tab !== "customer-insights";
    if (tab === "product-insights") renderPI("all");
    if (tab === "customer-insights") renderCI("all");
    document.title = "AiMY QA · " + TITLES[tab];
    paintNudge();
    if (changed && !(opts && opts.boot)) {
      var scroll = $(".dashboard-scroll");
      if (scroll) scroll.scrollTop = 0;
      if (typeof window.aimyRailSetCurrent === "function") window.aimyRailSetCurrent(tab === "home" ? "index" : tab);
    }
  }

  /* Clicks inside the two tabs. */
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-ins-piview], [data-ins-pigroup], [data-ins-issue], [data-ins-cishow], [data-ins-client]");
    if (!t) return;
    if (t.hasAttribute("data-ins-issue")) return selectIssue(t.getAttribute("data-ins-issue"));
    if (t.hasAttribute("data-ins-client")) return selectClient(t.getAttribute("data-ins-client"));
    if (t.hasAttribute("data-ins-piview")) { state.piView = t.getAttribute("data-ins-piview"); renderPI("body"); }
    if (t.hasAttribute("data-ins-pigroup")) { state.piGroup = t.getAttribute("data-ins-pigroup"); renderPI("body"); }
    if (t.hasAttribute("data-ins-cishow")) { state.ciShow = t.getAttribute("data-ins-cishow"); renderCI("body"); }
    sync();
  });
  /* Rows are options: Enter and Space pick, arrows move. */
  document.addEventListener("keydown", function (e) {
    var row = e.target.closest && e.target.closest("[data-ins-issue], [data-ins-client]");
    if (!row || row !== e.target) return;
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); row.click(); return; }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    var rows = $$(row.hasAttribute("data-ins-issue") ? "[data-ins-issue]" : "[data-ins-client]");
    var next = rows[rows.indexOf(row) + (e.key === "ArrowDown" ? 1 : -1)];
    if (next) { next.focus(); next.click(); }
  });
  ["aimy:client-filter-changed", "aimy:date-range-changed", "aimy:interaction-type-changed", "aimy:scope-changed"].forEach(function (ev) {
    function repaint() { paintCiScope(); if (state.tab === "customer-insights") renderCI("body"); }
    window.addEventListener(ev, repaint);
    document.addEventListener(ev, repaint);
  });
  document.addEventListener("aimy:view-my-qa", function () { setTimeout(paintNudge, 0); });

  /* ═══ THE CONTRACT WITH index.html's AIMY_SURFACE ════════════════════════ */
  window.AIMY_INSIGHTS = {
    read: function () {
      var out = { tab: state.tab };
      if (state.tab === "product-insights") {
        out.pi_view = state.piView;
        out.pi_group = state.piGroup;
        if (state.piIssue !== PI.byCost[0].id) out.pi_issue = state.piIssue;
      }
      if (state.tab === "customer-insights" && state.ciClient !== ranked[0].id) out.ci_client = state.ciClient;
      return out;
    },
    apply: function (v, opts) {
      state.piView = v.pi_view === "drafts" ? "drafts" : "issues";
      state.piGroup = GROUPS[v.pi_group] ? v.pi_group : "issue";
      if (v.pi_issue && PI.issue(v.pi_issue)) state.piIssue = v.pi_issue;
      if (v.ci_client && client(v.ci_client)) { state.ciClient = v.ci_client; state.ciShow = "all"; }
      show(v.tab || "home", opts);
    }
  };

  /* Boot from the URL. The canvas applies the surface again once it boots;
     both land on the same tab. */
  var q = new URLSearchParams(location.search);
  window.AIMY_INSIGHTS.apply({ tab: q.get("tab"), pi_view: q.get("pi_view"), pi_group: q.get("pi_group"), pi_issue: q.get("pi_issue"), ci_client: q.get("ci_client") }, { boot: true });
  mountNudge();
})();
