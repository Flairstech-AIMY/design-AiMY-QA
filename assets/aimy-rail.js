/* ═══════════════════════════════════════════════════════════════════════════
   THE RAIL — AiMY's findings, grouped by the page they live on

   One model, two views of it:

     OPEN (272px)       A section per page: the page's own icon and name as a
                        header that links there, then that page's findings as
                        compact rows (figure, label, and a proportion bar where
                        there is a ratio). The page you are on comes first and
                        says "You're here" in words instead of offering a link.

     COLLAPSED (64px)   The same six pages as icons, each carrying its headline
                        figure as a badge, so the collapsed rail still reports
                        what AiMY found rather than turning into a bare menu. The
                        AiMY mark with the insight count is the way back open.
                        Hover or focus shows "Page — finding".

   STATE lives on <html data-rail="open|collapsed">, set before paint by
   assets/aimy-viewport.js. At 1100px and wider it is the reader's choice and is
   remembered across pages (localStorage['aimy-qa-rail']); below 1100px the rail
   is always collapsed and "open" is a temporary overlay drawer over the page,
   so a small screen never has its content pushed aside.

   Navigation is intact in both states: every destination is a real <a href>
   in tab order, and the current page carries aria-current="page".

   THE ORDER DOES NOT MOVE apart from the current page leading the open view,
   and nothing wears a severity colour — deciding which finding is loudest is
   the briefing surface's job, not the rail's.

   IN A REAL BUILD THE FIGURES ARE DERIVED, NOT AUTHORED. Each constant below
   names where its number lives so the wiring is a lookup, not a rewrite:
     Dashboard   SLA 29pts under the 90% target · index.html
     Reviews     window.__evalReviewSummary / __evalJustifies · agent-scorecards.html
     My Profile  fb-201 escalates to the Feedback Manager in 3 days · my-profile.html
     Goal Hub    `pendingCount` is 2 in the Governance tab · goal-browser.html
     Data        S3 Voice is `pill-error`, 3 errors in 24h · data-ingestion.html
     Settings    three integrations read "Not connected" · settings.html
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var RAIL_MQ = "(max-width: 1099.98px)";
  var PREF_KEY = "aimy-qa-rail";
  var root = document.documentElement;

  var REVIEW_SEEDS = [
    {
      id: "JU-201", feedbackId: "fb-201", agent: "Omar Abdallah", evalId: "ev-1042",
      interaction: "Voice call · May 7", goals: ["Follow-up Confirmation"],
      reason: "The customer hung up while I was giving the callback number. The recording cuts at 8:31 and the line was already dead — I did give it.",
      raised: "2 days ago", state: "open"
    },
    {
      id: "JU-202", feedbackId: "fb-206", agent: "Michael Chen", evalId: "ev-1047",
      interaction: "Ticket · May 10", goals: ["Ticket categorisation", "Survey Promotion"],
      reason: "This was an internal escalation from Tier 2, not a customer contact. There is nobody to survey and the category list has no option that fits.",
      raised: "yesterday", state: "open"
    },
    {
      id: "JU-203", feedbackId: "fb-204", agent: "Tariq Mansour", evalId: "ev-1056",
      interaction: "Voice call · May 15", goals: ["Issue Resolution"],
      reason: "I could not resolve it because the refund tool was down all morning — it is in the incident log. I raised it and set the callback, which is all that was available to me.",
      raised: "4 hours ago", state: "open"
    }
  ];

  window.aimyReviewDisputes = function () {
    var records;
    try { records = JSON.parse(localStorage.getItem("aimy-qa-justifies") || "null"); }
    catch (error) { records = null; }
    if (Array.isArray(records)) return records;
    return REVIEW_SEEDS.map(function (record) { return Object.assign({}, record); });
  };

  /* One headline finding per page. `badge` is the short form the collapsed
     rail can fit in a 64px column; `tip` is the sentence its tooltip reads. */
  var PAGES = {
    "index": { value: "29", text: "points below target", badge: "29", tip: "29 points below target" },
    "my-profile": { value: "3d", text: "until escalation", badge: "3d", tip: "Feedback escalates in 3 days" },
    "goal-browser": { value: "2", text: "pending goal changes", badge: "2", tip: "2 pending goal changes" },
    "data-ingestion": { value: "3", text: "ingestion failures in 24h", badge: "3", tip: "3 ingestion failures in 24 hours" },
    "settings": { value: "3", text: "unconnected integrations", badge: "3", tip: "3 unconnected integrations" }
  };

  function $(sel, scope) { return (scope || document).querySelector(sel); }
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  /* Lucide icons (lucide-react 1.52.0), rendered statically — the product
     pages have no React runtime. Built as SVG nodes, never innerHTML. */
  var SVG_NS = "http://www.w3.org/2000/svg";
  function lucide(name, paths) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "lucide lucide-" + name);
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    paths.forEach(function (p) {
      var node = document.createElementNS(SVG_NS, p[0]);
      Object.keys(p[1]).forEach(function (k) { node.setAttribute(k, p[1][k]); });
      svg.appendChild(node);
    });
    return svg;
  }
  function iconPanelLeftClose() {
    return lucide("panel-left-close", [
      ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2" }],
      ["path", { d: "M9 3v18" }],
      ["path", { d: "m16 15-3-3 3-3" }]
    ]);
  }
  function iconChevronRight() {
    return lucide("chevron-right", [["path", { d: "m9 18 6-6-6-6" }]]);
  }
  function aimyMark(w, h) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 18 20");
    svg.setAttribute("width", String(w));
    svg.setAttribute("height", String(h));
    svg.setAttribute("aria-hidden", "true");
    var use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#aimy-logo-small");
    svg.appendChild(use);
    return svg;
  }

  /* ══ ONE IDENTITY, DERIVED THE SAME WAY FROM A URL AND FROM AN href ══════
     Basename with any extension and trailing slash removed, lowercased.
     Cloudflare's asset handling serves `/agent-scorecards` without ".html", so
     keying off the extension made every deployed page think it was the
     Dashboard. `/`, `/index.html`, `/index` all resolve to "index". */
  function pageKey(urlOrHref) {
    var s = String(urlOrHref || "").split("#")[0].split("?")[0].replace(/\/+$/, "");
    var last = s.split("/").pop().replace(/\.[a-z0-9]+$/i, "");
    return last ? last.toLowerCase() : "index";
  }

  /* The label is a BARE TEXT NODE in all six pages' markup. */
  function anchorLabel(a) {
    if (a.hasAttribute("data-label")) return a.getAttribute("data-label");
    var t = "";
    for (var i = 0; i < a.childNodes.length; i++) {
      if (a.childNodes[i].nodeType === 3) t += a.childNodes[i].textContent;
    }
    t = t.replace(/\s+/g, " ").trim();
    if (t) a.setAttribute("data-label", t);
    return t;
  }

  function percentage(count, total) {
    return total ? Math.round(count / total * 100) : 0;
  }

  /* Reviews holds three queues, so it reports three findings. */
  function reviewSection(href, isCurrent) {
    var records = window.aimyReviewDisputes();
    var open = (window.__evalJustifies ? window.__evalJustifies() : records)
      .filter(function (record) { return record.state === "open"; });
    var hasReviewData = typeof window.__evalReviewSummary === "function";
    var summary = hasReviewData ? window.__evalReviewSummary() : {
      awaitingTickets: 21, totalTickets: 24,
      awaitingCalls: 10, totalCalls: 15,
      totalDisputes: records.length
    };
    var selectedTab = $('[data-tbl][aria-selected="true"]');
    var queues = [
      { table: "tickets", noun: "tickets", verb: "need attention", count: summary.awaitingTickets, total: summary.totalTickets },
      { table: "calls", noun: "calls", verb: "need review", count: summary.awaitingCalls, total: summary.totalCalls },
      { table: "justifies", noun: "disputes", verb: "need review", count: open.length, total: summary.totalDisputes }
    ];
    var findings = queues.map(function (q) {
      var target = new URL(href, location.href);
      target.searchParams.set("view", "evals");
      target.searchParams.set("tbl", q.table);
      if (q.table !== "justifies") target.searchParams.set("verdict", "awaiting");
      if (q.table === "tickets") target.searchParams.set("channel", "ticket");
      if (summary.scope) {
        ["from", "to", "agent"].forEach(function (key) {
          if (summary.scope[key] && summary.scope[key] !== "all") target.searchParams.set(key, summary.scope[key]);
        });
      }
      var pct = percentage(q.count, q.total);
      return {
        value: pct + "%",
        text: q.noun + " " + q.verb,
        ratio: pct,
        href: target.href,
        active: isCurrent && !!selectedTab && selectedTab.dataset.tbl === q.table
      };
    });
    var waiting = summary.awaitingTickets + summary.awaitingCalls + open.length;
    return {
      findings: findings,
      badge: String(waiting),
      tip: waiting + " items waiting for review"
    };
  }

  /* ═══ THE MODEL ═══════════════════════════════════════════════════════════ */
  var nav, sidebar, current, sections = [];

  function readModel() {
    sections = $$(".nav-item", nav).map(function (a) {
      var key = pageKey(a.getAttribute("href"));
      var href = a.getAttribute("href");
      var isCurrent = key === current;
      var data = key === "agent-scorecards" ? reviewSection(href, isCurrent) : PAGES[key] ? {
        findings: [{ value: PAGES[key].value, text: PAGES[key].text }],
        badge: PAGES[key].badge,
        tip: PAGES[key].tip
      } : { findings: [], badge: "", tip: "" };
      return {
        key: key,
        label: anchorLabel(a),
        href: href,
        anchor: a,
        isCurrent: isCurrent,
        findings: data.findings,
        badge: data.badge,
        tip: data.tip
      };
    });
  }

  function insightCount() {
    return sections.reduce(function (n, s) { return n + s.findings.length; }, 0);
  }

  /* ═══ COLLAPSED VIEW — badges on the existing anchors ═══════════════════ */
  function paintCollapsed() {
    sections.forEach(function (s) {
      var a = s.anchor;
      var badge = $(".rail-badge", a);
      if (!s.badge) { if (badge) badge.remove(); return; }
      if (!badge) {
        badge = el("span", "rail-badge");
        badge.setAttribute("aria-hidden", "true");
        a.appendChild(badge);
      }
      badge.textContent = s.badge;
      var tip = s.label + " — " + s.tip;
      a.setAttribute("data-tip-text", s.isCurrent ? tip + " (you're here)" : tip);
      a.setAttribute("aria-label", s.label + ": " + s.tip);
    });
  }

  /* ═══ OPEN VIEW — one section per page ══════════════════════════════════ */
  function findingRow(f) {
    var li = el("li", "rail-finding");
    var row = el(f.href ? "a" : "div", "rail-finding-row");
    if (f.href) row.setAttribute("href", f.href);
    if (f.active) {
      row.classList.add("is-active");
      row.setAttribute("aria-current", "true");
    }
    row.appendChild(el("span", "rail-fig", f.value));
    row.appendChild(el("span", "rail-finding-text", f.text));
    if (typeof f.ratio === "number") {
      var bar = el("span", "rail-bar");
      bar.setAttribute("aria-hidden", "true");
      var fill = el("span");
      fill.style.width = Math.max(0, Math.min(100, f.ratio)) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
    }
    li.appendChild(row);
    return li;
  }

  function sectionNode(s) {
    var section = el("section", "rail-section" + (s.isCurrent ? " is-current" : ""));
    /* data-rail-page, not data-page: the Reviews table paginates from a
       page-wide click listener on [data-page], which read a click on a rail
       card as "go to page index" and scrolled the table. */
    section.setAttribute("data-rail-page", s.key);
    var head = el(s.isCurrent ? "div" : "a", "rail-section-head");
    if (s.isCurrent) head.setAttribute("aria-current", "page");
    else head.setAttribute("href", s.href);
    var icon = $("svg", s.anchor);
    if (icon) {
      var copy = icon.cloneNode(true);
      copy.setAttribute("aria-hidden", "true");
      copy.classList.add("rail-section-icon");
      head.appendChild(copy);
    }
    var name = el("span", "rail-section-name", s.label);
    head.appendChild(name);
    if (s.isCurrent) head.appendChild(el("span", "rail-here", "You're here"));
    else head.appendChild(iconChevronRight());
    section.appendChild(head);
    if (s.findings.length) {
      var list = el("ul", "rail-findings");
      list.setAttribute("aria-label", s.label + " findings");
      s.findings.forEach(function (f) { list.appendChild(findingRow(f)); });
      section.appendChild(list);
    }
    return section;
  }

  function paintOpen() {
    var groups = $(".rail-groups", nav);
    var ordered = sections.filter(function (s) { return s.isCurrent; })
      .concat(sections.filter(function (s) { return !s.isCurrent; }));
    groups.replaceChildren.apply(groups, ordered.map(sectionNode));
  }

  function paintCounts() {
    var n = insightCount();
    $$(".rail-count", nav).forEach(function (c) { c.textContent = String(n); });
    var label = $(".rail-head-count", nav);
    if (label) label.textContent = n + " insight" + (n === 1 ? "" : "s");
    var expand = $(".rail-expand", nav);
    if (expand) expand.setAttribute("aria-label", "Show AiMY insights (" + n + ")");
  }

  function paint() {
    readModel();
    paintCollapsed();
    paintOpen();
    paintCounts();
  }

  /* ═══ CHROME — the open header and the collapsed expand button ══════════ */
  function mountChrome() {
    var head = el("div", "rail-head");
    var mark = el("span", "rail-head-mark");
    mark.setAttribute("aria-hidden", "true");
    mark.appendChild(aimyMark(14, 16));
    head.appendChild(mark);
    head.appendChild(el("span", "rail-head-label", "AiMY"));
    head.appendChild(el("span", "rail-head-count"));
    var collapse = el("button", "rail-collapse");
    collapse.type = "button";
    collapse.id = "railCollapse";
    collapse.setAttribute("aria-controls", sidebar.id);
    collapse.setAttribute("aria-expanded", "true");
    collapse.setAttribute("aria-label", "Collapse AiMY insights");
    collapse.title = "Collapse";
    collapse.appendChild(iconPanelLeftClose());
    head.appendChild(collapse);

    var expand = el("button", "rail-expand");
    expand.type = "button";
    expand.id = "railExpand";
    expand.setAttribute("aria-controls", sidebar.id);
    expand.setAttribute("aria-expanded", "false");
    expand.appendChild(aimyMark(16, 18));
    var count = el("span", "rail-count");
    count.setAttribute("aria-hidden", "true");
    expand.appendChild(count);

    var groups = el("div", "rail-groups");
    nav.insertBefore(groups, nav.firstChild);
    nav.insertBefore(head, groups);
    nav.insertBefore(expand, head);
    return { expand: expand, collapse: collapse };
  }

  /* ═══ STATE ═══════════════════════════════════════════════════════════════ */
  function readPref() {
    try { var v = localStorage.getItem(PREF_KEY); return v === "collapsed" || v === "open" ? v : null; }
    catch (e) { return null; }
  }
  function writePref(v) {
    try { localStorage.setItem(PREF_KEY, v); } catch (e) {}
  }

  function mountState(controls) {
    var mq = window.matchMedia(RAIL_MQ);
    var scrim = el("div", "rail-scrim");
    scrim.id = "railScrim";
    sidebar.parentNode.insertBefore(scrim, sidebar.nextSibling);
    var overlay = false;

    function effective() { return mq.matches ? "collapsed" : (readPref() || "open"); }

    function apply() {
      var state = effective();
      if (!mq.matches) overlay = false;
      if (root.getAttribute("data-rail") !== state) root.setAttribute("data-rail", state);
      sidebar.classList.toggle("is-open", overlay);
      scrim.classList.toggle("is-open", overlay);
      var expanded = state === "open" || overlay;
      controls.expand.setAttribute("aria-expanded", String(expanded));
      controls.collapse.setAttribute("aria-expanded", String(expanded));
    }

    function animate() {
      nav.classList.remove("rail-motion");
      void nav.offsetWidth;
      nav.classList.add("rail-motion");
      setTimeout(function () { nav.classList.remove("rail-motion"); }, 700);
    }

    function expand() {
      if (mq.matches) overlay = true;
      else writePref("open");
      apply();
      animate();
      controls.collapse.focus({ preventScroll: true });
    }

    function collapse(returnFocus) {
      if (mq.matches) {
        if (!overlay) return;
        overlay = false;
      } else {
        writePref("collapsed");
      }
      apply();
      if (returnFocus !== false) controls.expand.focus({ preventScroll: true });
    }

    controls.expand.addEventListener("click", function (e) { e.stopPropagation(); expand(); });
    controls.collapse.addEventListener("click", function (e) { e.stopPropagation(); collapse(); });
    scrim.addEventListener("click", function () { collapse(); });

    /* Following a link closes the drawer on the way out, so it is not left
       floating over the page it just navigated to. */
    sidebar.addEventListener("click", function (e) {
      if (!overlay) return;
      if (e.target.closest && e.target.closest("a[href]")) collapse(false);
    }, true);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && overlay) { e.stopPropagation(); collapse(); }
    });

    /* A width change does not always fire `change` on the query (Sales measured
       a 900 → 1024 widening that produced none), so the state is re-derived on
       a short poll as well. Cheap: it only writes when something differs. */
    if (mq.addEventListener) mq.addEventListener("change", apply);
    else if (mq.addListener) mq.addListener(apply);
    window.addEventListener("storage", function (event) { if (event.key === PREF_KEY) apply(); });
    setInterval(apply, 500);
    apply();
  }

  /* ═══ BOOT ════════════════════════════════════════════════════════════════ */
  function refreshReviews() {
    if (nav) paint();
  }

  function boot() {
    sidebar = $(".app-sidebar");
    if (!sidebar) return;
    nav = $(".sidebar-nav", sidebar);
    if (!nav) return;

    /* So aria-controls resolves. Five of the six files give the sidebar no id. */
    if (!sidebar.id) sidebar.id = "appSidebar";
    sidebar.setAttribute("aria-label", "AiMY insights");

    current = pageKey(location.pathname);
    $$(".nav-item", nav).forEach(function (a) {
      /* My Profile ships pinned to the foot of the column with an inline style.
         Both views now read in one fixed order, so the pin comes off. */
      a.style.order = "";
      a.style.marginTop = "";
      if (pageKey(a.getAttribute("href")) === current) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      } else {
        a.classList.remove("active");
        a.removeAttribute("aria-current");
      }
    });

    var controls = mountChrome();
    paint();
    mountState(controls);
    nav.addEventListener("click", travel);
  }

  /* ═══ PICKING A PAGE — the rail reorders, then the page changes ══════════
     The page you are on leads the rail in both views, so picking another one
     reorders it: the item you picked rises to the top slot and the one you
     are leaving drops back into its place. That move is shown here, on the
     page you are leaving, before navigating, so it is the same in every
     browser and does not depend on how fast the next page paints; the next
     page then loads already in that order.

     Spatial consistency, used tens of times a day, so it is quick and plain:
     a FLIP on transform only, 240ms on the strong ease-in-out for movement on
     screen, no bounce. Keyboard activation, modified clicks (new tab or
     window), reduced motion and a link back to this page all navigate at
     once, exactly as before. */
  var MOVE_MS = 240;
  var EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
  var leaving = false;

  function rectsOf(nodes, keyOf) {
    var map = {};
    nodes.forEach(function (n) { map[keyOf(n)] = n.getBoundingClientRect(); });
    return map;
  }

  /* Each node starts where it was and slides to where it now is. */
  function flip(nodes, keyOf, before) {
    var running = [];
    nodes.forEach(function (n) {
      var was = before[keyOf(n)];
      if (!was) return;
      var dy = was.top - n.getBoundingClientRect().top;
      if (Math.abs(dy) < 1) return;
      running.push(n.animate(
        [{ transform: "translateY(" + dy + "px)" }, { transform: "translateY(0)" }],
        { duration: MOVE_MS, easing: EASE_MOVE }
      ));
    });
    return running;
  }

  function iconKey(a) { return pageKey(a.getAttribute("href")); }
  function cardKey(s) { return s.getAttribute("data-rail-page"); }

  function travel(e) {
    if (leaving || e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (e.detail === 0) return; /* keyboard: no animation on a keyed action */
    var link = e.target.closest("a[href]");
    if (!link || !nav.contains(link) || link.target === "_blank") return;
    var item = link.closest(".nav-item, .rail-section");
    if (!item) return;
    var icon = item.classList.contains("nav-item");
    var target = icon ? iconKey(item) : cardKey(item);
    if (!target || target === current) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!Element.prototype.animate) return;

    e.preventDefault();
    leaving = true;
    var href = link.href;
    var running;

    if (icon) {
      var icons = $$(".nav-item", nav);
      var before = rectsOf(icons, iconKey);
      icons.forEach(function (a) {
        var on = a === item;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      sidebar.removeAttribute("data-tip");
      running = flip(icons, iconKey, before);
    } else {
      var beforeCards = rectsOf($$(".rail-section", nav), cardKey);
      sections.forEach(function (s) { s.isCurrent = s.key === target; });
      paintOpen();
      running = flip($$(".rail-section", nav), cardKey, beforeCards);
    }

    var gone = false;
    function go() { if (gone) return; gone = true; location.href = href; }
    if (!running.length) return go();
    Promise.all(running.map(function (a) { return a.finished; })).then(go, go);
    setTimeout(go, MOVE_MS + 120); /* never strand the click on a stalled frame */
  }

  /* Back from the next page can restore this one from the back/forward cache,
     still showing the rail reordered for the page that was picked. Put it
     back to this page's order. */
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted || !leaving || !nav) return;
    leaving = false;
    $$(".nav-item", nav).forEach(function (a) {
      var on = iconKey(a) === current;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    sections.forEach(function (s) { s.isCurrent = s.key === current; });
    paintOpen();
  });

  document.addEventListener("aimy:reviews-changed", refreshReviews);
  window.addEventListener("storage", function (event) {
    if (event.key === "aimy-qa-justifies" || event.key === null) refreshReviews();
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

  /* ══ IS AiMY AVAILABLE ══════════════════════════════════════
     Doctrine §6.7 / Level 7: a surface that renders AI output has to say
     what it shows when the AI is not there. Several surfaces need the same
     answer at the same moment, and they are on different pages, so the
     answer is one fact rather than one flag per page.

     THREE STATES, because they have three different consequences:

       ok        AiMY is scoring. Nothing to say.
       degraded  AiMY is up but not scoring new interactions. Everything
                 already scored is unaffected — which is most of what a
                 manager does here, so this must NOT read as an outage.
       down      AiMY produced nothing for the thing you are looking at.
                 The manual path has to be offered, not just described.

     Held in localStorage so it survives a page change, which is how this
     prototype carries every other cross-page fact. In a real build this is
     the health of the scoring service and nothing sets it by hand.

     `since` is when scoring stopped: a degraded banner that cannot say
     since when is asking the reader to guess how much is missing. */
  var AVAIL_KEY = "aimy-qa-ai-availability";

  function readAvail() {
    try {
      var raw = localStorage.getItem(AVAIL_KEY);
      if (!raw) return { state: "ok", since: "" };
      var v = JSON.parse(raw);
      return { state: v.state || "ok", since: v.since || "" };
    } catch (e) { return { state: "ok", since: "" }; }
  }

  window.aimyAvailability = readAvail;

  /* Setting it re-paints whatever is listening. Nothing polls. */
  window.setAimyAvailability = function (state, since) {
    var v = { state: state || "ok", since: since || "" };
    try { localStorage.setItem(AVAIL_KEY, JSON.stringify(v)); } catch (e) {}
    document.dispatchEvent(new CustomEvent("aimy:availability", { detail: v }));
    return v;
  };

  /* This file loads at the END of the page, after the surfaces that care.
     So on a page where AiMY is already down, they have booted believing it
     was fine — announce it once so they correct themselves. Silence when
     everything is normal, which is the common case. */
  var boot_avail = readAvail();
  if (boot_avail.state !== "ok") {
    document.dispatchEvent(new CustomEvent("aimy:availability", { detail: boot_avail }));
  }
})();
