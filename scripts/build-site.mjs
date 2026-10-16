/* Builds the deployable site into dist/.

   The repo root mixes the site with tooling: package.json (Storybook),
   node_modules after an install, agent skills, notes and lockfiles. Deploying
   the root meant Cloudflare's builder installed the npm packages and then
   uploaded them with the site. This copies only what the site is made of, so
   wrangler publishes dist/ and nothing else.

   The site, by allowlist (a new tooling file at the root is never published):
     - every .html and .svg file at the root
     - assets/            shared CSS, JS and images
     - design-strategy/   the design system pages, linked from the product

   Run by `npm run build`, and by wrangler itself before every deploy
   (build.command in wrangler.jsonc). Plain Node, no dependencies. */
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "dist");
const DIRS = ["assets", "design-strategy"];
const ROOT_FILE = /\.(html|svg)$/i;

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

let files = 0;
for (const name of readdirSync(root)) {
  const from = join(root, name);
  if (statSync(from).isFile() && ROOT_FILE.test(name)) {
    cpSync(from, join(out, name));
    files++;
  }
}
for (const dir of DIRS) {
  const from = join(root, dir);
  if (!existsSync(from)) throw new Error("build-site: missing " + dir + "/");
  cpSync(from, join(out, dir), { recursive: true });
  files += countFiles(join(out, dir));
}
if (!existsSync(join(out, "index.html"))) throw new Error("build-site: no index.html in dist/");

console.log("build-site: " + files + " files in dist/");

function countFiles(dir) {
  let n = 0;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    n += statSync(p).isDirectory() ? countFiles(p) : 1;
  }
  return n;
}
