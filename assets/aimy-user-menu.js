/* ═══════════════════════════════════════════════════════════════════════════
   THE USER MENU AND THE "ONLY MY RESULTS" FILTER
   (styles in assets/aimy-user-menu.css)

   "ONLY MY RESULTS" is a filter chip that leads the filter row of each page
   that can narrow its results to the signed-in person (Dashboard, Reviews).
   A page opts in with a [data-my-results-slot] first in its filter row,
   filled from here. Off, the chip is a dashed outline reading "Show only
   mine"; on, it fills violet with the person's avatar, "Only my results"
   and an ×, so the control is its own indicator.
   One click either way.
   Pages without a slot have nothing to narrow and show no chip, so no page
   claims a scope it does not apply. Each change shows a toast with Undo and
   is announced as the document event "aimy:view-my-qa" ({ detail: { on } });
   each page's own scope script listens. The state is remembered per browser
   (localStorage) so it carries between Dashboard and Reviews; it is a
   preference flag only, holding no identity or records.

   A person the system limits to their own data gets the same chip locked:
   filled, with a lock instead of the ×, and nothing to press. The prototype
   simulates that with data-my-qa-locked on <body>.

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
   and paint(), which refills the slot for a page that redraws its filter row.
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

  /* ── "Only my results": the chip, the heading and the toast ─────────── */
  var ICON_LOCK = '<svg class="lucide lucide-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>';
  var ICON_USER = '<svg class="lucide lucide-user" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>';
  var ICON_X = '<svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';
  var ICON_CHECK = '<svg class="lucide lucide-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>';

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
  function avatar() { return '<span class="myr-av" aria-hidden="true">' + esc(initials()) + "</span>"; }

  function chipHtml(on, locked) {
    if (locked) {
      return '<span class="myr-chip is-on is-locked" role="status" title="Your account shows only your own results">' +
        avatar() + "<span>Only your results</span>" + ICON_LOCK + "</span>";
    }
    /* Off, the label is an action ("Show only mine") so it cannot be read as
       a statement about the page; on, it states the fact ("Only my results")
       and the × is the way back. The accessible name carries both. */
    if (on) {
      return '<button class="myr-chip is-on" type="button" data-myr-toggle aria-label="Only my results. Show everyone’s results" title="Show everyone’s results">' +
        avatar() + "<span>Only my results</span>" + '<span class="myr-x">' + ICON_X + "</span></button>";
    }
    return '<button class="myr-chip" type="button" data-myr-toggle title="Limit these results to your own work">' +
      ICON_USER + "<span>Show only mine</span></button>";
  }

  function paint() {
    var on = myQaOn(), locked = isLocked();
    document.querySelectorAll("[data-my-results-slot]").forEach(function (slot) {
      slot.innerHTML = chipHtml(on, locked) + '<span class="myr-divider" aria-hidden="true"></span>';
    });
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
    var focused = document.activeElement && document.activeElement.closest &&
      document.activeElement.closest("[data-my-results-slot]");
    setMyQa(on);
    paint();
    /* Keep focus on the chip after it re-renders. A page may have redrawn
       its whole filter row in the meantime, so look it up again. */
    if (focused) {
      var again = (focused.isConnected ? focused : document).querySelector("[data-my-results-slot] .myr-chip, .myr-chip");
      if (again && typeof again.focus === "function") again.focus({ preventScroll: true });
    }
    if (!opts || opts.toast !== false) toast(on);
  }

  function bootMyResults() {
    if (isLocked() && !myQaOn()) setMyQa(true);
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
