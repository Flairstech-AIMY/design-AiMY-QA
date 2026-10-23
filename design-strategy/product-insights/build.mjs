// Builds the Product Insights option mocks from the real product pages.
//
// The mocks are copies of the live Dashboard (index.html) and Reviews
// (agent-scorecards.html), so the shell, rail, filters, AiMY conversation and
// every component are the product's own. Only two things are added: pi.css and
// pi.js, which place each option onto the page. Re-run after the product pages
// change so the mocks stay current:
//
//   node design-strategy/product-insights/build.mjs
//
// Output (this folder): index.html (Dashboard, options A-D), customer-issues.html
// (option D's own page) and agent-scorecards.html (Reviews, option E). The file
// names match the product's, so the AiMY rail recognises each page.

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const UP = "../../";

// Pages that stay real product pages, reached from the mock by going up.
const PRODUCT_PAGES = ["goal-browser", "settings", "data-ingestion", "my-profile", "my-qa", "manual-audit", "justifys"];

// Runs before paint, so CSS can show the chosen option without a flash.
const HEAD = `
    <!-- Product Insights option mock (design-strategy/product-insights). Not a product page. -->
    <script>
      (function () {
        var p = new URLSearchParams(location.search).get("option");
        try { if (p) sessionStorage.setItem("pi-option", p); else p = sessionStorage.getItem("pi-option"); } catch (e) {}
        if (!/^[a-e]$/.test(p || "")) p = "a";
        document.documentElement.setAttribute("data-pi-option", p);
      })();
    </script>
    <link rel="stylesheet" href="pi.css?v=1" />
`;

// Option D's rail entry: a new Primary page after Reviews. pi.js removes it on
// the other options before the rail script reads the nav.
const RAIL_ITEM = `
          <a class="nav-item" href="customer-issues.html" data-pi-only="d">
            <svg class="lucide lucide-message-square-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" /><path d="M12 15h.01" /><path d="M12 7v4" /></svg>
            Customer issues
          </a>`;

function transform(html, { page, title }) {
  let out = html
    // Shared assets and root files live two folders up.
    .replace(/(["'(])(assets\/|favicon\.svg|Aimy-0\d\.svg)/g, `$1${UP}$2`)
    // Links to product pages that have no mock.
    .replace(new RegExp(`(["'])(${PRODUCT_PAGES.join("|")})\\.html`, "g"), `$1${UP}$2.html`)
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace("</head>", `${HEAD}</head>`);

  // Rail entry for option D, after Reviews.
  out = out.replace(/(<a class="nav-item[^"]*" href="agent-scorecards\.html"[^>]*>[\s\S]*?<\/a>)/, `$1${RAIL_ITEM}`);

  // pi.js runs after the page's own inline scripts (so RESPONSE_BY_TOPIC and
  // the decision handlers exist) and before the shared rail and canvas
  // scripts boot.
  const marker = `<script src="${UP}assets/aimy-scroll.js`;
  if (!out.includes(marker)) throw new Error(`${page}: shared script marker not found`);
  out = out.replace(marker, `<script src="pi.js?v=1" data-pi-page="${page}"></script>\n    ${marker}`);
  return out;
}

const dashboard = readFileSync(join(root, "index.html"), "utf8");
const reviews = readFileSync(join(root, "agent-scorecards.html"), "utf8");

writeFileSync(join(here, "index.html"), transform(dashboard, { page: "dashboard", title: "Dashboard · Product Insights mock" }));
writeFileSync(join(here, "customer-issues.html"), transform(dashboard, { page: "customer-issues", title: "Customer issues · Product Insights mock" }));
writeFileSync(join(here, "agent-scorecards.html"), transform(reviews, { page: "reviews", title: "Reviews · Product Insights mock" }));

console.log("Built index.html, customer-issues.html and agent-scorecards.html");
