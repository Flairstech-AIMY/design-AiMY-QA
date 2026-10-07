---
name: mads-project-management
description: Discover and explain the tools exposed by the MADS project-management MCP server, use its available capabilities for MADS workflows, and connect relevant MADS records to existing or proposed Jira epics, features, stories, bugs, and tasks. Use when asked to explore or work with MADS through MCP or plan Jira work from MADS data.
---

# MADS Project Management MCP

Use MADS as a project-management system, not just a stakeholder-request inbox. Discover the live MCP tool surface first, then choose the tools that match the user's task. Requests and asks are examples of MADS records and workflows, not the boundaries of this skill. When Jira planning is relevant, make the mapping traceable; otherwise work directly with the available MADS capabilities. Use live MADS and Jira data when integrations are available; do not treat a pasted chat, old report, or example as current system state. Create or change records only when the user explicitly asks for that action.

## Discover the available MADS tools

At the beginning of a MADS task, inspect the MCP server's current tool catalog using the MCP client's tool discovery/list-tools capability. Do not assume the tool set from a previous session, repository documentation, or this skill is exhaustive. If schemas or descriptions can be fetched for individual tools, inspect the relevant ones before calling them. Discovery should establish:

- each available tool's exact name, purpose, required and optional parameters, filters, and whether it reads or changes data;
- which MADS entities and workflows are supported (for example, clients, projects, stakeholders, requests, asks, or other project-management records), without assuming that these examples exist as tools;
- pagination, status semantics, authorization/scope limits, and whether a detail-fetch operation is available;
- which Jira or other integrations are available and appropriate for cross-referencing.

Choose tools by their discovered descriptions and schemas, not by guessing names. Use the least-privileged read tools that can answer the request. Do not invoke write/action tools during discovery. Before any requested mutation, read the exact tool schema, verify the target record and required fields, and obtain clarification or confirmation for consequential choices. If tool discovery is unavailable or incomplete, state that and work only with tools actually exposed; never invent tool names, capabilities, or fields.

For a broad request such as “what can MADS do?” or “show me the MADS tools,” summarize all discovered MADS tools in a compact catalog (tool name, purpose, inputs/filters, read/write effect, and notable limits), grouping by entity or workflow. Do not call every tool just to demonstrate them. For an operational request, give a brief account of the relevant discovered capabilities and call only the tools needed to complete the task.

## Connect MADS

MADS access requires an administrator-created API key:

1. In MADS, open **Admin → API keys**, create a key for the user whose access should apply, and grant the `stakeholders.read` scope.
2. Copy the key at creation time; MADS shows it only once. Store it in the MCP client's secret store or environment, not in a repository, prompt, Jira issue, transcript, or generated report.
3. Configure a remote **Streamable HTTP** MCP server at `https://<your-mads-host>/api/mcp`; set the `Authorization` header to use the `Bearer` scheme with the securely stored API key.
4. Verify that the MADS tools are available. Never ask the user to paste the key into chat. If access is missing, report the configuration steps and continue only with data the user supplies.

Use only authorized MADS results; do not attempt to bypass client or stakeholder visibility restrictions.

## Example workflow: stakeholder requests and asks

Requests and asks are useful examples of how to apply discovery to a common MADS workflow; they are not the only MADS functionality. If discovery exposes these tools, use `MADS-list_stakeholder_requests` and `MADS-list_stakeholder_asks` with the discovered schemas, then retrieve selected records with `MADS-get_stakeholder_request` or `MADS-get_stakeholder_ask`. Requests are stakeholder-submitted product requests; asks are questions or information requests the delivery team makes to stakeholders. Keep these record types and their status semantics distinct.

Apply the user's filters exactly. When asked for all/current/open items, include all matching pages/results and disclose any tool or permission limitation; do not imply a partial result is complete. Do not silently exclude closed records when the user asks for all records. Fetch full records before summarizing or planning them. Base descriptions on submitted MADS content; distinguish record fields from interpretation, preserve useful wording and references, and mention unavailable details rather than filling gaps. For “not done,” determine completion from the current Jira issue status/workflow rather than assuming MADS status or a Jira status such as `Idea` means completed. Avoid unnecessarily reproducing personal data; include it only when needed for the requested work and authorized.

## Reconcile with Jira

For each request or ask:

1. Use its MADS record ID and any stored Jira key/link as the primary cross-reference.
2. Search the relevant Jira project for that key, exact title, distinctive phrases, and meaningful synonyms. Inspect candidate issue summaries, descriptions, status, issue type, parent/child relations, and links. Search relevant projects when the record identifies them; do not assume a project from an unrelated example.
3. Classify the match as **linked/exact**, **likely related**, **no match found**, or **uncertain**. Include Jira keys and a short reason. A similar title alone is not proof of a duplicate; do not merge unrelated work or treat a weak match as authoritative.
4. Use Jira's live status and issue type. Keep MADS type/priority/status separate from Jira issue type/priority/status. Identify stale or contradictory links and call them out for confirmation.
5. Check whether a Jira issue already covers all or only part of the submitted scope. Map one MADS item to multiple Jira issues, and multiple MADS items to one broader Jira initiative, only when the coverage is supported. Note uncovered requirements and partial coverage.

When creating or updating issues, include the MADS record ID and link in the Jira issue or another supported reference field, and maintain the MADS-to-Jira mapping where the integration supports it. Never claim a link or issue exists until Jira confirms the operation succeeded.

## Plan Jira work

Translate records into outcomes, not a one-request/one-ticket rule:

- Group by client/product and coherent user or business outcome. Keep client-specific context visible; do not combine clients merely because the feature names sound alike.
- Distinguish defects (existing behavior is broken or wrong), feature requests (new or changed capability), ideas (unvalidated possibilities), and delivery-team asks (blocked decisions or information needed). Preserve the MADS classification while recommending a Jira type independently.
- Recommend an **Epic** for a coordinated, multi-story initiative; a **Feature** only if the target Jira project supports that exact type; a **Story** for an independently valuable user outcome; a **Bug** for a confirmed defect; a **Task** for operational or technical work without a standalone user outcome; and a **Research/Spike** only if supported by the project. Validate configured Jira issue types before issue creation. Do not invent unsupported types or force an Epic for a small request.
- Keep explicitly short-term and long-term requests separate. Do not treat a request for an estimate as authorization to invent one. Flag unclear scope, dependencies, acceptance behavior, ownership, client impact, and decisions as open questions.
- Break large work into independently demonstrable Stories and supporting Tasks only where useful. Preserve dependencies and map every source requirement to proposed or existing work. Avoid duplicate stories, implementation-layer-only stories, and filler tickets.
- Carry forward MADS priority as source context, but do not assign or map it to Jira priority unless the user asks and the project mapping is confirmed.

Follow `jira-product-owner` and `jira-feature-breakdown` for issue structure and decomposition when those skills are available. Follow the project's configured Jira fields and workflows, not assumptions from another project.

## Default response

Match the output to the user's task. For tool-discovery questions, provide a catalog of every tool returned by discovery with its purpose, useful parameters, read/write effect, and limits. For operational questions, provide the result and a concise note about which discovered capabilities were used; include requested filters, scope, and any completeness caveat. If the operation concerns requests or asks, include MADS IDs and relevant record fields, and summarize submitted details when requested.

For Jira planning, include:

1. **Scope and findings** — client(s), filters, number of records reviewed, and key themes.
2. **MADS-to-Jira cross-reference** — source ID/title, Jira match(es), live Jira status, match confidence/reason, and uncovered or partial scope.
3. **Proposed Jira hierarchy** — epic/feature/story/bug/task recommendations, outcome-focused titles, source MADS IDs, concise descriptions or acceptance outcomes, and only evidenced dependencies.
4. **Open questions and decisions** — only those needed to finalize the plan or proceed with explicitly requested creation.

Keep source facts, Jira facts, and recommendations clearly distinguishable. Use links supplied by the systems. If an output is too large, organize or paginate it without silently omitting records.

## Before issue creation

Issue creation is a separate, explicit user action. Before creating, follow the Jira project's applicable issue-creation rules and verify the target project, supported types/required fields, duplicate matches, and any material parent/dependency choices. Ask for missing choices that cannot be safely inferred; do not create speculative work from unvalidated ideas. Create only the approved scope, then return created issue keys/links and a source-to-Jira mapping. Do not commit or include MADS credentials in any artifact.

## Final checks

- Every included record matches the requested filters and is backed by current MADS data.
- Request and ask counts are not conflated; pagination and access gaps are disclosed.
- Submitted facts and current Jira facts are not confused with recommendations.
- Existing Jira work is searched before proposing duplicates; uncertain matches stay uncertain.
- Each proposed work item has a clear outcome, source reference, and supported scope.
- No personal data, priority, estimate, dependency, status, or requirement is fabricated.
