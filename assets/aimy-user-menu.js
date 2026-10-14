/* ═══════════════════════════════════════════════════════════════════════════
   THE USER MENU — the profile pill in the top bar opens a menu
   (styles in assets/aimy-user-menu.css)

   The pill was an inert <div> with a chevron that promised a menu. This makes
   it a real menu button on every shell page without touching their markup:
   the pill is wrapped in an anchor, given button semantics, and a menu panel
   is placed beside it, the same way the notifications bell sits in .ntf-anchor.

   ONE ITEM, "View my QA", a checkbox item (menuitemcheckbox): picking it
   ticks or unticks it and closes the menu 2 seconds later. Each change is
   announced as the document event "aimy:view-my-qa" ({ detail: { on } });
   the Dashboard listens and scopes itself to the signed-in person (its
   scope script in index.html). Pages that do not listen are unchanged. The
   tick is remembered per browser (localStorage) so it reads the same on
   every page; it is a preference flag only, holding no identity or records.

   window.AimyUserMenu.open(focusFirst) opens the menu from elsewhere, such
   as the Dashboard's locked Agents chip.

   Keyboard: Enter, Space or ArrowDown on the pill opens it and focuses the
   first item; Escape closes and returns focus; Tab out or a click elsewhere
   closes it.
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  var MY_QA_KEY = "aimy-qa-view-my-qa";
  var ICON_CHECK = '<svg class="lucide lucide-check um-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>';

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

  function boot() {
    var pill = document.querySelector(".app-topnav .topnav-user");
    if (!pill || pill.closest(".um-anchor")) return;

    var anchor = document.createElement("div");
    anchor.className = "um-anchor";
    pill.parentNode.insertBefore(anchor, pill);
    anchor.appendChild(pill);

    var name = pill.querySelector(".topnav-user-name");
    pill.setAttribute("role", "button");
    pill.setAttribute("tabindex", "0");
    pill.setAttribute("aria-haspopup", "menu");
    pill.setAttribute("aria-expanded", "false");
    pill.setAttribute("aria-controls", "aimyUserMenu");
    pill.setAttribute("aria-label", (name ? name.textContent.trim() + ", " : "") + "account menu");
    var chevron = pill.querySelector(":scope > svg");
    if (chevron) chevron.setAttribute("aria-hidden", "true");

    var panel = document.createElement("div");
    panel.className = "um-panel";
    panel.id = "aimyUserMenu";
    panel.setAttribute("role", "menu");
    panel.setAttribute("aria-label", "Account");
    panel.innerHTML =
      '<ul class="um-list" role="none">' +
        '<li role="none"><button class="um-item" type="button" role="menuitemcheckbox" aria-checked="false" tabindex="-1">' +
          "<span>View my QA</span>" + ICON_CHECK + "</button></li>" +
      "</ul>";
    anchor.appendChild(panel);

    var items = Array.prototype.slice.call(panel.querySelectorAll('[role^="menuitem"]'));
    var myQa = items[0];
    var open = false;

    /* Read from storage each time it opens, so a tick set on another page or
       tab shows here too. */
    function syncChecks() {
      myQa.setAttribute("aria-checked", String(myQaOn()));
    }

    var closeTimer = 0;

    function setOpen(next, focusFirst) {
      clearTimeout(closeTimer);
      if (open === next) return;
      open = next;
      if (open) syncChecks();
      panel.classList.toggle("is-open", open);
      pill.setAttribute("aria-expanded", String(open));
      if (open) {
        document.addEventListener("pointerdown", onOutside, true);
        if (focusFirst && items[0]) items[0].focus({ preventScroll: true });
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
      var i = items.indexOf(document.activeElement);
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        pill.focus();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        var step = e.key === "ArrowDown" ? 1 : -1;
        items[(i + step + items.length) % items.length].focus();
      } else if (e.key === "Tab") {
        setOpen(false);
      }
    });

    /* The tick lands at once; the menu stays up for 2 seconds so the change
       is seen before it closes, in both directions. Clicking again restarts
       the wait, and Escape, a click outside or the pill still close it at
       once (setOpen clears the timer). */
    window.AimyUserMenu = {
      open: function (focusFirst) { setOpen(true, !!focusFirst); }
    };

    var CLOSE_AFTER_MS = 2000;
    myQa.addEventListener("click", function () {
      setMyQa(!myQaOn());
      syncChecks();
      clearTimeout(closeTimer);
      closeTimer = setTimeout(function () {
        var keepFocus = panel.contains(document.activeElement);
        setOpen(false);
        if (keepFocus) pill.focus({ preventScroll: true });
      }, CLOSE_AFTER_MS);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
