/* ═══════════════════════════════════════════════════════════════════════════
   THE USER MENU AND THE VIEW MY QA SWITCH
   (styles in assets/aimy-user-menu.css)

   VIEW MY QA lives in the top bar as the design system's toggle switch
   (role="switch", label then track),
   placed first in .topnav-right on every shell page. It takes effect at
   once, so it is a switch rather than a menu item. Each change is announced
   as the document event "aimy:view-my-qa" ({ detail: { on } }); the
   Dashboard listens and scopes itself to the signed-in person (its scope
   script in index.html). Pages that do not listen are unchanged. The state
   is remembered per browser (localStorage) so it reads the same on every
   page; it is a preference flag only, holding no identity or records.

   THE PROFILE PILL opens a small panel holding the page's DEMO CONTROLS:
   the prototype's own switches (Manager/Director, Audit/Evaluation view,
   the Reviews persona). They are not product features, so they leave the
   top bar and sit together under a "Demo controls" label. The page's own
   elements are moved, not copied, so the scripts already bound to them keep
   working. A page without demo controls says so in the panel.

   Keyboard: Enter, Space or ArrowDown on the pill opens the panel and
   focuses its first control; Escape closes it and returns focus; Tab out or
   a click elsewhere closes it.

   window.AimyUserMenu.open(focusFirst) opens the panel from elsewhere;
   window.AimyUserMenu.focusMyQa() moves focus to the View my QA switch, as
   the Dashboard's locked Agents tag does.
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

  /* ── View my QA, the top-bar switch ─────────────────────────────────── */
  function buildMyQaSwitch() {
    var right = document.querySelector(".app-topnav .topnav-right");
    if (!right || right.querySelector(".myqa-switch")) return null;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "myqa-switch";
    btn.id = "myQaSwitch";
    btn.setAttribute("role", "switch");
    btn.title = "Show only your own QA results on the Dashboard";
    btn.innerHTML = '<span class="myqa-label">View my QA</span>' +
      '<span class="myqa-track" aria-hidden="true"><span class="myqa-thumb"></span></span>';
    function sync() { btn.setAttribute("aria-checked", String(myQaOn())); }
    sync();
    btn.addEventListener("click", function () { setMyQa(!myQaOn()); sync(); });
    /* Another tab changed it. */
    window.addEventListener("storage", function (e) { if (e.key === MY_QA_KEY) sync(); });
    right.insertBefore(btn, right.firstChild);
    return btn;
  }

  /* ── The profile pill and its demo-controls panel ───────────────────── */
  function boot() {
    var myQaSwitch = buildMyQaSwitch();

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
      open: function (focusFirst) { setOpen(true, !!focusFirst); },
      focusMyQa: function () {
        if (!myQaSwitch) return;
        myQaSwitch.focus({ preventScroll: true, focusVisible: true });
      }
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
