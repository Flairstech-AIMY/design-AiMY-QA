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

   MY RESULTS AS A MODE OF THE WHOLE PRODUCT (Solution D, AIMY-2423 round
   2). While it is on, <html data-my-qa-mode="on"> swaps the product's blue for
   the QA violet on every page (assets/aimy-user-menu.css), the profile pill
   turns violet and reads "Only my results" under the name, and the profile
   menu leads with an "Only my results" switch so pages without the chip can
   change it too. M switches it anywhere. Only the Dashboard and Reviews
   actually narrow their data; the other pages show the mode, not a filter.

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
    applyMode(on);
    document.dispatchEvent(new CustomEvent("aimy:view-my-qa", { detail: { on: on } }));
  }

  /* THE MODE ON <html>. While it is on, the whole product takes the QA violet
     (assets/aimy-user-menu.css): accent, links, AiMY text, surfaces, borders
     and the background glow. assets/aimy-viewport.js sets it before first
     paint; this keeps it true from then on. */
  function applyMode(on) {
    if (on) document.documentElement.setAttribute("data-my-qa-mode", "on");
    else document.documentElement.removeAttribute("data-my-qa-mode");
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
    applyMode(on);
    document.querySelectorAll("[data-my-results-slot]").forEach(function (slot) {
      slot.innerHTML = chipHtml(on, locked) + '<span class="myr-divider" aria-hidden="true"></span>';
    });
    paintPill(on);
    paintSwitch(on, locked);
    paintFloatTag(on, locked);
  }

  /* PROFILE PHOTOS. Prototype only: the signed-in person's photo by name.
     A real build reads the account's own photo; anyone without one gets the
     initials. Sample photo: Jake Nackos on Unsplash (Unsplash License),
     standing in for Engy's own. */
  var PHOTOS = { "Engy Yasser": "assets/avatar-sample-unsplash-jakenackos.jpg" };

  /* THE END CAP (T6, design-strategy/my-results-tinted-cap-variants.html).
     While the mode is on, the right end of the Ask AiMY bar becomes a tinted
     capsule that holds your photo, "Only mine", an × and the send button.
     The photo and send are the same size and inset, so the capsule's two
     ends mirror each other, and the scope visibly travels with every
     question. The send button is moved into the capsule, not copied, so its
     listeners keep working (pages style it by class and find it by id).
     Locked, a lock replaces the ×. Off, the capsule is just the send button. */
  /* The same capsule sits in every AiMY composer on the page: the floating
     Ask AiMY bar and the input of the open AiMY chat (#overlaySend). */
  var CAP_SENDS = ["aimyFloatSend", "overlaySend"];
  function paintFloatTag(on, locked) {
    CAP_SENDS.forEach(function (id) {
      var send = document.getElementById(id);
      if (send) paintCap(send, on, locked);
    });
  }
  function paintCap(send, on, locked) {
    var cap = send.parentElement;
    if (!cap.classList.contains("myr-cap")) {
      cap = document.createElement("span");
      cap.className = "myr-cap";
      cap.innerHTML = '<span class="myr-cap-reveal"><span class="myr-cap-scope" role="status"></span></span>';
      send.parentNode.insertBefore(cap, send);
      cap.appendChild(send);
    }
    var bar = cap.parentElement;
    var name = fullName(), photo = PHOTOS[name];
    var face = photo
      ? '<span class="myr-cap-face" role="img" aria-label="' + esc(name) + '" style="background-image:url(&quot;' + esc(photo) + '&quot;)"></span>'
      : '<span class="myr-cap-face is-initials" aria-hidden="true">' + esc(initials()) + "</span>";
    var scope = cap.querySelector(".myr-cap-scope");
    /* Rebuild only when what it shows changes. Rewriting it on every paint
       would hand the browser new elements already in the "on" state, and
       the entrance would never animate. */
    var key = (photo || initials()) + "|" + locked;
    if (scope.getAttribute("data-key") !== key) {
      scope.setAttribute("data-key", key);
      scope.innerHTML = face + '<span class="myr-cap-text">Only mine</span>' +
        (locked ? '<span class="myr-cap-lock" title="Your account shows only your own results">' + ICON_LOCK + "</span>"
          : '<button class="myr-cap-x" type="button" data-myr-toggle aria-label="Show everyone’s results" title="Show everyone’s results">' + ICON_X + "</button>");
      void scope.offsetWidth; /* commit the resting state before "on" */
    }
    scope.setAttribute("aria-hidden", String(!on));
    var act = scope.querySelector("button");
    if (act) act.tabIndex = on ? 0 : -1;
    cap.classList.toggle("is-on", on);
    bar.classList.toggle("myr-has-tag", on);
    var stale = bar.querySelector(":scope > .myr-float-tag");
    if (stale) stale.remove();
  }

  /* THE PROFILE PILL is where people look for who they are, so it carries the
     mode too: violet like the chip, and the line under the name says the
     scope instead of the job title. */
  function paintPill(on) {
    var pill = document.querySelector(".app-topnav .topnav-user");
    if (!pill) return;
    var role = pill.querySelector(".topnav-user-role");
    if (role) {
      if (!role.hasAttribute("data-role-text")) role.setAttribute("data-role-text", role.textContent.trim());
      role.textContent = on ? "Only my results" : role.getAttribute("data-role-text");
    }
    pill.classList.toggle("um-mine-on", on);
    /* The pill's avatar shows the same photo as the end cap; initials stay
       in the markup as the fallback and for anything that reads text. */
    var av = pill.querySelector(".topnav-avatar"), photo = PHOTOS[fullName()];
    if (av && photo && !av.classList.contains("um-has-photo")) {
      av.classList.add("um-has-photo");
      av.style.backgroundImage = 'url("' + photo + '")';
      av.setAttribute("aria-hidden", "true");
    }
    pill.setAttribute("aria-label", fullName() + (on ? ", showing only your results" : "") + ", account menu");
  }

  /* The switch in the profile menu, so every page can change the mode,
     including pages with no filter row to hold the chip. */
  function paintSwitch(on, locked) {
    var sw = document.querySelector(".um-scope-switch");
    if (!sw) return;
    sw.setAttribute("aria-checked", String(on));
    sw.disabled = locked;
    var sub = sw.querySelector(".um-scope-sub");
    if (sub) {
      sub.textContent = locked ? "Your account shows only your own work"
        : on ? "Every page shows only your own work"
        : "Show only your own work on every page";
    }
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
    window.addEventListener("storage", function (e) {
      if (e.key !== MY_QA_KEY) return;
      paint();
      document.dispatchEvent(new CustomEvent("aimy:view-my-qa", { detail: { on: myQaOn() } }));
    });
    /* M switches it on every page. Not while typing, and not with a modifier,
       so it never steals a letter or a browser shortcut. */
    document.addEventListener("keydown", function (e) {
      if (e.key !== "m" && e.key !== "M") return;
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || e.defaultPrevented) return;
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (isLocked()) return;
      e.preventDefault();
      set(!myQaOn());
    });
    window.AimyMyResults = { isOn: myQaOn, set: set, isLocked: isLocked, fullName: fullName, paint: paint };
  }

  /* ── The profile pill and its demo-controls panel ───────────────────── */
  /* ── The demo dock: the prototype's own switches, Sales-style ───────────
     After design-aimy-sales' "Prototype controls": a quiet 32px button with
     a dashed edge in the bottom-right corner (dashed says scaffolding, not
     product), opening a dashed panel upward. Fixed, so it never pushes
     anything; lifted above the Ask AiMY bar where the bar reaches the
     corner. The page's own controls are moved in, not copied, so their
     scripts keep working. A page with no demo controls shows no dock.
     Escape, a click outside or Tab out of the panel closes it. */
  var ICON_SLIDERS = '<svg class="lucide lucide-sliders-horizontal" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 5H3" /><path d="M12 19H3" /><path d="M14 3v4" /><path d="M16 17v4" /><path d="M21 12h-9" /><path d="M21 19h-5" /><path d="M21 5h-7" /><path d="M8 10v4" /><path d="M8 12H3" /></svg>';
  function mountDemoDock() {
    var found = DEMO_CONTROLS.map(function (c) {
      return { c: c, el: document.querySelector(".app-topnav " + c.selector) };
    }).filter(function (x) { return x.el; });
    if (!found.length || document.getElementById("umProto")) return;

    var dock = document.createElement("div");
    dock.className = "um-proto";
    dock.id = "umProto";
    dock.innerHTML =
      '<div class="um-proto-panel um-demo" id="umProtoPanel" role="dialog" aria-labelledby="umDemoTitle" hidden>' +
        '<div class="um-demo-head">' + ICON_FLASK +
          '<span class="um-demo-title" id="umDemoTitle">Demo controls</span>' +
          '<span class="um-demo-tag">Prototype only</span>' +
        "</div>" +
        '<p class="um-demo-note">Switch what this prototype shows. These are not part of the product.</p>' +
        '<div class="um-demo-rows"></div>' +
      "</div>" +
      '<button class="um-proto-toggle" id="umProtoToggle" type="button" aria-expanded="false" aria-controls="umProtoPanel" aria-label="Demo controls" title="Demo controls">' + ICON_SLIDERS + "</button>";
    document.body.appendChild(dock);

    var rows = dock.querySelector(".um-demo-rows");
    found.forEach(function (x, i) {
      var row = document.createElement("div");
      row.className = "um-demo-row";
      var label = document.createElement("span");
      label.className = "um-demo-label";
      label.textContent = x.c.label(x.el);
      label.id = "umDemoLabel" + i;
      x.el.setAttribute("aria-labelledby", label.id);
      x.el.removeAttribute("aria-label");
      row.appendChild(label);
      row.appendChild(x.el);
      rows.appendChild(row);
    });

    var panel = dock.querySelector(".um-proto-panel");
    var toggle = dock.querySelector(".um-proto-toggle");
    var open = false;
    function setOpen(next, returnFocus) {
      if (open === next) return;
      open = next;
      panel.hidden = !open;
      dock.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (open) document.addEventListener("pointerdown", onOutside, true);
      else {
        document.removeEventListener("pointerdown", onOutside, true);
        if (returnFocus) toggle.focus({ preventScroll: true });
      }
    }
    function onOutside(e) { if (!dock.contains(e.target)) setOpen(false); }
    toggle.addEventListener("click", function () { setOpen(!open); });
    dock.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && open) { e.preventDefault(); e.stopPropagation(); setOpen(false, true); }
    });
    panel.addEventListener("focusout", function (e) {
      if (open && e.relatedTarget && !dock.contains(e.relatedTarget)) setOpen(false);
    });

    /* Stay clear of the Ask AiMY bar (and the filter tray over it): when
       they reach the dock's corner, sit 8px above them; otherwise 16px. */
    /* The button only moves when the bar reaches its own corner (narrow
       screens), never because the panel opened. The wider panel clears the
       bar on its own by lifting itself, so the button stays under the
       pointer that just pressed it. */
    var lastBottom = null, lastLift = null;
    function clearance(width) {
      var need = 0, edge = window.innerWidth - 16 - width - 8;
      ["#aimyFloatBar", "#filterTray", ".aimy-overlay.open .overlay-input-bar"].forEach(function (sel) {
        var el = document.querySelector(sel);
        if (!el) return;
        var r = el.getBoundingClientRect();
        if (r.width && r.height && r.right > edge) need = Math.max(need, Math.round(window.innerHeight - r.top + 8));
      });
      return need;
    }
    function place() {
      var bottom = Math.max(16, clearance(32));
      var panelBottom = bottom + 32 + 8;
      var lift = Math.max(0, clearance(320) - panelBottom);
      if (bottom !== lastBottom) { dock.style.bottom = bottom + "px"; lastBottom = bottom; }
      if (lift !== lastLift) { panel.style.marginBottom = lift + "px"; lastLift = lift; }
    }
    place();
    window.addEventListener("resize", place, { passive: true });
    toggle.addEventListener("click", place);
    setInterval(place, 600);
  }

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
    pill.setAttribute("aria-label", (name ? name.textContent.trim() + ", " : "") + "account menu");
    var chevron = pill.querySelector(":scope > svg");
    if (chevron) chevron.setAttribute("aria-hidden", "true");

    /* The profile menu holds the person's own setting: Only my results.
       The prototype's demo switches live in their own floating dock
       (mountDemoDock), so they are never read as part of the account. */
    var panel = document.createElement("div");
    panel.className = "um-panel";
    panel.id = "aimyUserMenu";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "umScopeTitle");
    panel.innerHTML =
      '<button class="um-scope-switch" type="button" role="switch" aria-checked="false" data-myr-toggle aria-keyshortcuts="M">' +
        avatar() +
        '<span class="um-scope-text"><span class="um-scope-title" id="umScopeTitle">Only my results</span><span class="um-scope-sub"></span></span>' +
        '<kbd class="um-scope-key" aria-hidden="true">M</kbd>' +
        '<span class="um-switch" aria-hidden="true"><span class="um-switch-thumb"></span></span>' +
      "</button>";
    anchor.appendChild(panel);
    mountDemoDock();

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
    paint();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
