/* ══ THE COMPOSER, AS SALES HAS IT — QA's glue ══════════════════════════════
   Loaded just before assets/aimy-voice.js on every page with an Ask AiMY bar.
   Three jobs, none of which the Sales file should know about:

   1. THE PEEK. Sales greets you in a card above the command bar —
      "Welcome, Lina. How can I help you today?" — that tucks behind the bar
      from its handle, is dismissed by its ×, and opens the canvas when
      pressed. QA gets the same card, named from the signed-in person in the
      top nav. Dismissing it holds for the browser session, like the
      customer-issues nudge; tucking it is remembered too. Prototype state
      only: sessionStorage, nothing on a server.

   2. THE STAGE'S LOGO. aimy-voice.js draws the voice stage with
      `<use href="#aimy-logo-full">`, a symbol Sales ships and QA does not. It
      is built here from the nav's own logo, so the stage shows the mark the
      nav shows.

   3. "ANSWERING". aimy-voice.js knows a spoken question has been answered
      when `.is-generating` leaves the canvas bar. QA's canvas says it is
      answering with its typing indicator (#aimyTyping) instead, so the class
      is mirrored from that: on while the indicator is in the thread, off
      when the answer replaces it. */
(function () {
  "use strict";

  var KEY_OFF = "aimy-qa-peek";        /* "off" once dismissed this session */
  var KEY_SHUT = "aimy-qa-peek-shut";  /* "1" while tucked behind the bar */

  function get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { if (v == null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, v); } catch (e) {} }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  /* Lucide `x`, from lucide-static. */
  var ICON_X = '<svg class="lucide lucide-x" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>';

  /* ── 2. The full logo symbol for the voice stage ─────────────────────── */
  function logoSymbol() {
    if (document.getElementById("aimy-logo-full")) return;
    var nav = document.querySelector(".topnav-logo-mark svg");
    if (!nav) return;
    var ns = "http://www.w3.org/2000/svg";
    var holder = document.createElementNS(ns, "svg");
    holder.setAttribute("aria-hidden", "true");
    holder.setAttribute("width", "0");
    holder.setAttribute("height", "0");
    holder.style.position = "absolute";
    var sym = document.createElementNS(ns, "symbol");
    sym.setAttribute("id", "aimy-logo-full");
    sym.setAttribute("viewBox", nav.getAttribute("viewBox") || "0 0 418.18 147.66");
    Array.prototype.forEach.call(nav.childNodes, function (n) { sym.appendChild(n.cloneNode(true)); });
    holder.appendChild(sym);
    document.body.appendChild(holder);
  }

  /* ── 3. `.is-generating` on the canvas bar while AiMY is typing ──────── */
  function answeringSignal() {
    var thread = document.getElementById("overlayThread");
    var bar = document.querySelector(".overlay-input-bar");
    if (!thread || !bar) return;
    function sync() { bar.classList.toggle("is-generating", !!document.getElementById("aimyTyping")); }
    new MutationObserver(sync).observe(thread, { childList: true });
    sync();
  }

  /* ── 4. The tools sit beside the "Only mine" capsule, not inside it ───
     aimy-user-menu.js moves each composer's send into a `.myr-cap` capsule
     (it carries your photo and "Only mine" while that mode is on).
     aimy-voice.js mounts its clip and mic just before send, which lands them
     inside the capsule. They are lifted out to sit before it, so the tinted
     capsule still holds only the scope and send. Watched rather than done
     once, because both files mount on their own schedule. */
  function liftTools() {
    document.querySelectorAll(".aimy-float-bar, .overlay-input-bar").forEach(function (bar) {
      function lift() {
        var t = bar.querySelector(".myr-cap > .vx-tools");
        if (t) t.parentElement.parentNode.insertBefore(t, t.parentElement);
      }
      new MutationObserver(lift).observe(bar, { childList: true, subtree: true });
      lift();
    });
  }

  /* ── 1. The peek ─────────────────────────────────────────────────────── */
  function firstName() {
    var n = document.querySelector(".app-topnav .topnav-user-name");
    return n ? n.textContent.trim().split(/\s+/)[0] : "";
  }

  function mountPeek() {
    var wrap = document.getElementById("aimyFloatWrap");
    var bar = document.getElementById("aimyFloatBar");
    if (!wrap || !bar || document.getElementById("aimyPeek")) return;
    if (get(KEY_OFF) === "off") return;

    var name = firstName();
    var html = "Welcome" + (name ? ", <b>" + esc(name) + "</b>" : "") + ". How can I help you today?";

    var box = document.createElement("div");
    box.className = "aimy-peek";
    box.id = "aimyPeek";
    box.innerHTML =
      '<div class="aimy-peek-card">' +
        '<div class="aimy-peek-lip">' +
          '<button class="aimy-peek-grip" type="button" id="aimyPeekGrip" aria-expanded="true" aria-controls="aimyPeekMain">' +
            '<span class="aimy-peek-grip-bar" aria-hidden="true"></span>' +
            '<span class="aimy-peek-sr" id="aimyPeekGripSay">Put this message away</span>' +
          "</button>" +
          '<button class="aimy-peek-x" type="button" id="aimyPeekClose" aria-label="Dismiss this message">' + ICON_X + "</button>" +
        "</div>" +
        '<div class="aimy-peek-main" id="aimyPeekMain">' +
          '<button class="aimy-peek-open" type="button" id="aimyPeekOpen">' +
            '<span class="aimy-peek-body" role="status" aria-live="polite">' + html + "</span>" +
            '<span class="aimy-peek-sr">Open in the AiMY canvas</span>' +
          "</button>" +
        "</div>" +
      "</div>";
    wrap.insertBefore(box, bar);
    wrap.classList.add("has-peek");

    var main = box.querySelector("#aimyPeekMain");
    var grip = box.querySelector("#aimyPeekGrip");
    var say = box.querySelector("#aimyPeekGripSay");

    function shut(on) {
      box.classList.toggle("is-shut", on);
      if (on) main.setAttribute("inert", ""); else main.removeAttribute("inert");
      grip.setAttribute("aria-expanded", on ? "false" : "true");
      say.textContent = on ? "Bring this message back" : "Put this message away";
      set(KEY_SHUT, on ? "1" : null);
    }
    function hide() {
      box.remove();
      wrap.classList.remove("has-peek");
    }

    shut(get(KEY_SHUT) === "1");

    grip.addEventListener("click", function () { shut(!box.classList.contains("is-shut")); });
    box.querySelector("#aimyPeekClose").addEventListener("click", function () {
      set(KEY_OFF, "off");
      set(KEY_SHUT, null);
      hide();
      var input = document.getElementById("aimyFloatInput");
      if (input) input.focus();
    });
    /* The card is the door to the canvas, the same one the bar's mark opens. */
    box.querySelector("#aimyPeekOpen").addEventListener("click", function () {
      var opener = document.getElementById("aimyFloatIcon");
      if (opener) opener.click();
    });
    /* Asking something is the greeting answered: the card tucks away so the
       bar's own result has the room. */
    function asked() { if (!box.classList.contains("is-shut")) shut(true); }
    var send = document.getElementById("aimyFloatSend");
    var input = document.getElementById("aimyFloatInput");
    if (send) send.addEventListener("click", function () { if (input && input.value.trim()) asked(); });
    if (input) input.addEventListener("keydown", function (e) { if (e.key === "Enter" && input.value.trim()) asked(); });
  }

  function boot() {
    logoSymbol();
    answeringSignal();
    liftTools();
    mountPeek();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
