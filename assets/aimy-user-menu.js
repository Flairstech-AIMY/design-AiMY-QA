/* ═══════════════════════════════════════════════════════════════════════════
   THE USER MENU AND THE "ONLY MY RESULTS" AVATAR
   (styles in assets/aimy-user-menu.css)

   "ONLY MY RESULTS" has three doors onto one state, so the product feels like
   it is about the person without adding a panel. In the logo, the "MY" of
   the AiMY wordmark is the switch: off, a dashed underline under it is the
   invitation (tooltip "Show only my results"); on, it turns violet and the
   underline solid. Because people already trigger scoping in the filters, a
   chip also leads each page's filter row (see THE FILTER-ROW CHIP). It
   narrows the pages that can be narrowed to the signed-in person (Dashboard,
   Reviews' evaluations list). One click either way.
   A page opts in with a [data-my-results-area] element (an empty marker on
   the narrowable content) and a [data-my-results-chip] at the start of its
   filter row. "MY" is a control only while the area is on screen (not in the
   Dashboard's Director view, nor a Reviews view with no list), so no view
   claims a scope it does not apply.

   WHILE THE SCOPE IS ON the shell says so too: html.is-my-scope lights the
   "MY", draws a violet edge under the top bar, tints the profile pill and
   rings its avatar, and the active product tab reads "My QA" (see paintTab).
   The class follows the area actually being visible (ResizeObserver).
   Each change shows a toast with Undo and
   is announced as the document event "aimy:view-my-qa" ({ detail: { on } });
   each page's own scope script listens. The state is remembered per browser
   (localStorage) so it carries between Dashboard and Reviews; it is a
   preference flag only, holding no identity or records.

   A person the system limits to their own data gets "MY" lit and inert and
   the chip locked (filled, with a lock instead of the ×, nothing to press).
   The prototype simulates that with data-my-qa-locked on <body>.

   THE PROFILE PILL opens a small panel holding the page's DEMO CONTROLS:
   the prototype's own switches (Manager/Director, Audit/Evaluation view,
   the Reviews persona). They are not product features, so they leave the
   top bar and sit together under a "Demo controls" label. The page's own
   elements are moved, not copied, so the scripts already bound to them keep
   working. A page without demo controls says so in the panel.

   Keyboard: Enter, Space or ArrowDown on the pill opens the panel and
   focuses its first control; Escape closes it and returns focus; Tab out or
   a click elsewhere closes it.

   window.AimyUserMenu.open(focusFirst) opens the panel from elsewhere.
   window.AimyMyResults: isOn(), set(on, { toast }), isLocked(), fullName(),
   and paint(), which redraws the logo state and the chip.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var MY_QA_KEY = "aimy-qa-view-my-qa";
  var ICON_FLASK = '<svg class="lucide lucide-flask-conical um-demo-ico" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" /><path d="M6.453 15h11.094" /><path d="M8.5 2h7" /></svg>';

  /* The demo controls a page may carry, in the order they are listed. */
  var DEMO_CONTROLS = [
    { selector: ".nav-role-switch", label: function (el) {
        return el.querySelector(".persona-btn") ? "Reviews persona" : "Dashboard role";
      } },
    { selector: ".content-view-toggle", label: function () { return "Dashboard content"; } }
  ];

  function myQaOn() {
    try { return localStorage.getItem(MY_QA_KEY) === "on"; } catch (e) { return false; }
  }
  function setMyQa(on) {
    try {
      if (on) localStorage.setItem(MY_QA_KEY, "on");
      else localStorage.removeItem(MY_QA_KEY);
    } catch (e) {}
    document.dispatchEvent(new CustomEvent("aimy:view-my-qa", { detail: { on: on } }));
  }

  /* ── "Only my results": the logo, the chip and the toast ────────────── */
  var ICON_LOCK = '<svg class="lucide lucide-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>';
  var ICON_CHECK =  '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>';
  var ICON_USER = '<svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>';
  var ICON_X = '<svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

  function isLocked() { return document.body.hasAttribute("data-my-qa-locked"); }
  function fullName() {
    var n = document.querySelector(".app-topnav .topnav-user-name");
    return n ? n.textContent.trim() : "";
  }
  function initials() {
    var parts = fullName().split(/\s+/).filter(Boolean);
    return ((parts[0] || "?").charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "")).toUpperCase();
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  /* The product tab echoes the logo: while the scope is on, the active "QA"
     tab reads "My QA", with "My" in the violet. One word, no new element. */
  function paintTab(scoped) {
    var tab = document.querySelector(".app-topnav .topnav-tabs-inner .topnav-tab.active");
    if (!tab) return;
    var mine = tab.querySelector(".myr-tab-my");
    if (scoped && !mine) {
      mine = document.createElement("span");
      mine.className = "myr-tab-my";
      mine.textContent = "My";
      var icon = tab.querySelector("svg");
      tab.insertBefore(mine, icon ? icon.nextSibling : tab.firstChild);
    } else if (!scoped && mine) {
      mine.remove();
    }
  }

  /* A page can be narrowed while its [data-my-results-area] marker is on
     screen: it is not display:none, and no ancestor view is hidden. Only then
     is the "MY" in the logo a control; the Dashboard's Director view and a
     Reviews view with no list have nothing to narrow, so they show no scope.
     html.is-my-scope (the lit "MY", the "My QA" tab, the shell's violet edge
     and the profile pill's ring) needs the scope on as well. */
  function syncShell() {
    var scopable = false;
    document.querySelectorAll("[data-my-results-area]").forEach(function (h) {
      if (h.getClientRects().length > 0) scopable = true;
    });
    var scoped = scopable && (myQaOn() || isLocked());
    document.documentElement.classList.toggle("is-my-scope", scoped);
    paintTab(scoped);
    document.querySelectorAll("[data-my-results-slot]").forEach(function (s) { s.hidden = !scopable; });
    if (scopable) maybeHint();
    else endHint();
  }

  /* THE LOGO IS THE CONTROL. The wordmark already says AiMY, and "MY" is in
     it. A page that opts in gets that "MY" as the switch: it is tagged
     (.myr-my) so the CSS can light it, and a transparent button sits over it
     (the slot). Off, a dashed underline under "MY" is the invitation; on, "MY"
     is violet and the underline solid, so the logo itself reads as "AiMY, for
     you". The wordmark is the <g> of four letter paths (A, i, M, Y). */
  function mountLogo() {
    if (document.querySelector("[data-my-results-slot]") || !document.querySelector("[data-my-results-area]")) return;
    var mark = document.querySelector(".app-topnav .topnav-logo-mark");
    var letters = mark && mark.querySelectorAll("svg g > path");
    if (!letters || letters.length < 4) return;
    letters[2].classList.add("myr-my");
    letters[3].classList.add("myr-my");
    var hit = document.createElement("button");
    hit.type = "button";
    hit.className = "myr-my-hit";
    hit.setAttribute("data-my-results-slot", "");
    hit.setAttribute("data-myr-toggle", "");
    hit.setAttribute("aria-label", "Only my results");
    hit.setAttribute("aria-describedby", "myrTip");
    hit.hidden = true;
    var tip = document.createElement("span");
    tip.className = "myr-tip";
    tip.id = "myrTip";
    tip.setAttribute("role", "tooltip");
    mark.appendChild(hit);
    mark.appendChild(tip);
    /* Any press or key ends the first-visit hint. */
    document.addEventListener("pointerdown", endHint, true);
    document.addEventListener("keydown", endHint, true);
  }

  /* The tooltip is ours, not the browser's title, so it shows at once on
     hover and focus. */
  function tipText(on, locked) {
    return locked ? "Your account shows only your own results"
      : on ? "Only my results. Click to show everyone" : "Show only my results";
  }

  function paintLogo(on, locked) {
    var hit = document.querySelector(".myr-my-hit");
    if (!hit) return;
    var tip = document.getElementById("myrTip");
    if (tip && !hintShown) tip.textContent = tipText(on, locked);
    hit.setAttribute("aria-pressed", String(on));
    hit.toggleAttribute("data-locked", locked);
    if (locked) hit.removeAttribute("data-myr-toggle");
    else hit.setAttribute("data-myr-toggle", "");
    hit.setAttribute("aria-disabled", String(locked));
  }

  /* THE FIRST-VISIT HINT. A dashed underline invites, but nothing says "press
     me". The first time a person lands on a page they can narrow, "MY" pulses
     and the tooltip opens by itself for a few seconds: "Click MY to see only
     your results". Any press or key dismisses it, and it never returns (one
     flag per browser). It shows only while the scope is off and unlocked. */
  var HINT_KEY = "aimy-qa-my-hint", HINT_TEXT = "Click MY to see only your results";
  var hintTimer = null, hintShown = false;
  function hintSeen() {
    try { return localStorage.getItem(HINT_KEY) === "seen"; } catch (e) { return true; }
  }
  function endHint() {
    clearTimeout(hintTimer);
    hintTimer = null;
    var mark = document.querySelector(".topnav-logo-mark");
    if (mark) mark.classList.remove("is-hinting");
    if (!hintShown) return;
    hintShown = false;
    try { localStorage.setItem(HINT_KEY, "seen"); } catch (e) {}
    paintLogo(myQaOn(), isLocked());
  }
  function maybeHint() {
    if (hintShown || hintTimer || hintSeen() || myQaOn() || isLocked()) return;
    var hit = document.querySelector(".myr-my-hit");
    if (!hit || hit.hidden) return;
    hintTimer = setTimeout(function () {
      hintTimer = null;
      if (hit.hidden || myQaOn()) return;
      hintShown = true;
      document.getElementById("myrTip").textContent = HINT_TEXT;
      hit.parentNode.classList.add("is-hinting");
      hintTimer = setTimeout(endHint, 6500);
    }, 1200);
  }

  /* THE FILTER-ROW CHIP. People already trigger scoping in the filters, so
     the first thing in a page's filter row ([data-my-results-chip]) is the
     call to action, wired to the same state as the logo's "MY". Off, the
     label is an action ("Show only mine") so it cannot be read as a
     statement about the page; on, it states the fact ("Only my results") with
     the person's avatar and an × as the way back. */
  function chipHtml(on, locked) {
    var av = '<span class="myr-av" aria-hidden="true">' + esc(initials()) + "</span>";
    if (locked) {
      return '<span class="myr-chip is-on is-locked" role="status" title="Your account shows only your own results">' +
        av + "<span>Only your results</span>" + ICON_LOCK + "</span>";
    }
    if (on) {
      return '<button class="myr-chip is-on" type="button" data-myr-toggle aria-label="Only my results. Show everyone’s results" title="Show everyone’s results">' +
        av + "<span>Only my results</span>" + '<span class="myr-x">' + ICON_X + "</span></button>";
    }
    return '<button class="myr-chip" type="button" data-myr-toggle title="Limit these results to your own work">' +
      ICON_USER + "<span>Show only mine</span></button>";
  }

  var scopeWatch = null;
  function paint() {
    var on = myQaOn(), locked = isLocked();
    paintLogo(on, locked);
    document.querySelectorAll("[data-my-results-chip]").forEach(function (slot) {
      slot.innerHTML = chipHtml(on, locked) + '<span class="myr-divider" aria-hidden="true"></span>';
    });
    if (scopeWatch) document.querySelectorAll("[data-my-results-area]").forEach(function (h) { scopeWatch.observe(h); });
    syncShell();
  }

  /* The toast reuses each page's .aimy-toast look in its own element, so its
     Undo never collides with the page's own toast and undo logic. */
  var toastEl = null, toastTimer = null, undoTo = null;
  function toast(on) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "aimy-toast myr-toast";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      toastEl.innerHTML =
        '<div class="aimy-toast-icon">' + ICON_CHECK + "</div>" +
        '<div class="aimy-toast-body"><span class="aimy-toast-title"></span><span class="aimy-toast-sub"></span></div>' +
        '<div class="aimy-toast-divider"></div>' +
        '<button class="aimy-toast-undo" type="button">Undo</button>' +
        '<div class="aimy-toast-progress"></div>';
      document.body.appendChild(toastEl);
      toastEl.querySelector(".aimy-toast-undo").addEventListener("click", function () {
        hideToast();
        if (undoTo !== null) { var back = undoTo; undoTo = null; set(back, { toast: false }); }
      });
    }
    undoTo = !on;
    toastEl.querySelector(".aimy-toast-title").textContent = on ? "Showing only your results" : "Showing everyone’s results";
    toastEl.querySelector(".aimy-toast-sub").textContent = on ? "Only your own interactions are counted." : "Your results are back in the full view.";
    var bar = toastEl.querySelector(".aimy-toast-progress");
    bar.parentNode.replaceChild(bar.cloneNode(false), bar);
    toastEl.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 5000);
  }
  function hideToast() {
    clearTimeout(toastTimer);
    if (toastEl) toastEl.classList.remove("visible");
  }

  function set(on, opts) {
    if (isLocked()) on = true;
    if (on === myQaOn()) { paint(); return; }
    /* They found it: no hint, now or later. */
    try { localStorage.setItem(HINT_KEY, "seen"); } catch (e) {}
    endHint();
    var chipFocused = document.activeElement && document.activeElement.closest &&
      document.activeElement.closest("[data-my-results-chip]");
    setMyQa(on);
    paint();
    /* The chip is rebuilt on every change (a page may redraw its whole filter
       row too), so put focus back on it. */
    if (chipFocused) {
      var again = document.querySelector("[data-my-results-chip] .myr-chip[data-myr-toggle]");
      if (again) again.focus({ preventScroll: true });
    }
    if (!opts || opts.toast !== false) toast(on);
  }

  function bootMyResults() {
    if (isLocked() && !myQaOn()) setMyQa(true);
    if (typeof ResizeObserver === "function") scopeWatch = new ResizeObserver(syncShell);
    mountLogo();
    paint();
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-myr-toggle]");
      if (!t) return;
      e.preventDefault();
      set(!myQaOn());
    });
    /* Another tab changed it. */
    window.addEventListener("storage", function (e) { if (e.key === MY_QA_KEY) paint(); });
    window.AimyMyResults = { isOn: myQaOn, set: set, isLocked: isLocked, fullName: fullName, paint: paint };
  }

  /* ── The profile pill and its demo-controls panel ───────────────────── */
  function boot() {
    bootMyResults();

    var pill = document.querySelector(".app-topnav .topnav-user");
    if (!pill || pill.closest(".um-anchor")) return;

    var anchor = document.createElement("div");
    anchor.className = "um-anchor";
    pill.parentNode.insertBefore(anchor, pill);
    anchor.appendChild(pill);

    var name = pill.querySelector(".topnav-user-name");
    pill.setAttribute("role", "button");
    pill.setAttribute("tabindex", "0");
    pill.setAttribute("aria-haspopup", "dialog");
    pill.setAttribute("aria-expanded", "false");
    pill.setAttribute("aria-controls", "aimyUserMenu");
    pill.setAttribute("aria-label", (name ? name.textContent.trim() + ", " : "") + "account and demo controls");
    var chevron = pill.querySelector(":scope > svg");
    if (chevron) chevron.setAttribute("aria-hidden", "true");

    var panel = document.createElement("div");
    panel.className = "um-panel";
    panel.id = "aimyUserMenu";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "umDemoTitle");
    panel.innerHTML =
      '<div class="um-demo">' +
        '<div class="um-demo-head">' +
          ICON_FLASK +
          '<span class="um-demo-title" id="umDemoTitle">Demo controls</span>' +
          '<span class="um-demo-tag">Prototype only</span>' +
        "</div>" +
        '<p class="um-demo-note">Switch what this prototype shows. These are not part of the product.</p>' +
        '<div class="um-demo-rows"></div>' +
      "</div>";
    anchor.appendChild(panel);

    var rows = panel.querySelector(".um-demo-rows");
    DEMO_CONTROLS.forEach(function (c) {
      var el = document.querySelector(".app-topnav " + c.selector);
      if (!el) return;
      var row = document.createElement("div");
      row.className = "um-demo-row";
      var label = document.createElement("span");
      label.className = "um-demo-label";
      label.textContent = c.label(el);
      label.id = "umDemoLabel" + rows.children.length;
      el.setAttribute("aria-labelledby", label.id);
      el.removeAttribute("aria-label");
      row.appendChild(label);
      row.appendChild(el);
      rows.appendChild(row);
    });
    if (!rows.children.length) {
      var none = document.createElement("p");
      none.className = "um-demo-empty";
      none.textContent = "This page has no demo controls.";
      rows.appendChild(none);
    }

    var open = false;
    function focusables() {
      return Array.prototype.slice.call(panel.querySelectorAll("button:not([disabled])"));
    }

    function setOpen(next, focusFirst) {
      if (open === next) return;
      open = next;
      panel.classList.toggle("is-open", open);
      pill.setAttribute("aria-expanded", String(open));
      if (open) {
        document.addEventListener("pointerdown", onOutside, true);
        var first = focusables()[0];
        if (focusFirst && first) first.focus({ preventScroll: true });
      } else {
        document.removeEventListener("pointerdown", onOutside, true);
      }
    }

    function onOutside(e) {
      if (!anchor.contains(e.target)) setOpen(false);
    }

    pill.addEventListener("click", function () { setOpen(!open, false); });
    pill.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true, true);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    });

    panel.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        pill.focus();
      }
    });
    panel.addEventListener("focusout", function (e) {
      if (open && e.relatedTarget && !anchor.contains(e.relatedTarget)) setOpen(false);
    });

    window.AimyUserMenu = {
      open: function (focusFirst) { setOpen(true, !!focusFirst); }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
