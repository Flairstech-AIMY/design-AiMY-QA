# Project Guidelines

## Scope and architecture

- Treat the top-level AiMY QA app as a multi-page static HTML prototype. Product pages are root-level `.html` files; shared shell behavior and styling live in `assets/`; Storybook examples live in `stories/`.
- Keep page-specific changes in the relevant page and shared-shell changes in the shared assets. Check every page that loads a changed shared asset.
- The `agent-skills/`, `ui-ux-pro-max-skill/`, and `custom-icons-skill/` directories are vendored tools/reference projects, not examples of the product app's architecture.
- Preserve the established script/style load order and update cache-busting query strings when shared asset references require it.

## UI icons

- Use `lucide-react` for all interface icons. Choose the closest semantic Lucide icon automatically and import its named component when working in React.
- Default icons to 18px and inherit the surrounding text color (`currentColor`). Preserve an established local size only when that UI already has a deliberate icon-size convention.
- Do not use emoji or create/use custom SVG icons for interface controls unless explicitly requested. Supplied brand artwork is not a UI icon and may remain an asset.
- The product pages are static HTML and do not currently have a React page runtime or app bundler. Do not assume a JSX `lucide-react` component can be placed directly in an HTML file. Use a project-compatible rendering/build path sourced from `lucide-react`; do not silently substitute a hand-drawn icon, emoji, or unrelated icon set. If the required integration is unclear or would expand scope, explain the static-HTML constraint before choosing an alternative.

## Product and design contracts

- Treat [`README.md`](README.md) as the source of truth for product terminology, metric definitions, client boundaries, and documented UI contracts. Update it and its changelog when a product decision changes.
- Consult the [AiMY interaction doctrine](design-strategy/00_AiMY_Knowledge_to_Action_Doctrine.md), [design-system reference](design-strategy/design-system-new.md), and [remediation gap register](design-strategy/REMEDIATION_GAP_REGISTER.md) before changing established patterns or touching recorded caveats. Link to these sources rather than duplicating their rules here.
- Do not infer backend behavior from prototype interactions; query parameters, local storage, and client-side JavaScript may only simulate state.
- Keep visual changes scoped to the requested element. For screenshot-led work, verify the result in the browser and check nearby controls and responsive behavior so alignment fixes do not move unrelated UI.

## Commands and validation

- Use Node `24.20.0` as pinned by `.nvmrc` and `.nvm`.
- Run `npm.cmd run build-storybook` to validate Storybook changes. `npm.cmd run storybook` starts the local Storybook.
- `npm.cmd test` is currently a placeholder that reports no automated tests are configured; do not treat it as test coverage.
- There is no root app build or test suite. Validate static-page changes in the browser, including the affected interaction when applicable.