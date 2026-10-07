---
name: jira-implementation-neutral-task-breakdown
description: Suggest supporting Jira technical Tasks for a user-facing Story without prescribing architecture, tools, vendors, or engineering design. Use when the user asks for technical tasks, an implementation breakdown, or engineering work that supports a Story while leaving solution decisions to the team.
---

# Jira Implementation-Neutral Task Breakdown

Translate a confirmed user-facing Story into optional, outcome-based technical task suggestions. Help clarify the work without making engineering decisions on the team's behalf.

## Use this skill when

- The user asks for supporting technical tasks beneath a Story or Epic.
- A technical spike or implementation outline is needed to support a user-facing capability.
- A proposed breakdown risks turning architecture choices into requirements.

Do not use this skill to create a task list when the user asks only for a Story. Do not treat suggestions as approved Jira scope unless the user asks to create or finalize them.

## Workflow

1. Extract the confirmed user outcome, requirements, constraints, examples, and unresolved decisions from the source Story.
2. Identify the minimum useful engineering outcomes needed to investigate, implement, integrate, and validate that capability. Do not create one task per engineering discipline by default.
3. Separate investigation from delivery when the implementation choice is genuinely unresolved. Make implementation tasks conditional on the team's findings where appropriate.
4. Describe tasks by deliverable or decision, not by a prescribed sequence of code changes, technology, or internal design.
5. Include a dependency only when the source establishes a real prerequisite. Do not invent ordering, owners, estimates, sprint scope, priority, or board assignment.
6. Label the list as suggested work for engineering refinement. Keep any user-facing behavior that is not confirmed in Open Questions instead of embedding it in tasks.
7. Return concise, complete task suggestions under the relevant Story. If the user requested standalone Jira Task descriptions, use the Task format below.

## Task wording

Prefer outcome-led names and descriptions:

- **Evaluate viable approaches** — Assess the options against the confirmed user outcome and existing constraints; return a recommendation, trade-offs, and material risks for the team to decide.
- **Enable the agreed capability** — Deliver the selected approach so the confirmed user outcome can be demonstrated; leave implementation details to engineering.
- **Integrate the capability into the user workflow** — Make the outcome available in the relevant product experience, without prescribing a particular interface or service design.
- **Validate behavior and existing functionality** — Verify the confirmed user scenarios and check that named existing behavior remains usable.

Use only the task outcomes that apply. Do not automatically include every example above.

## Optional standalone Task format

```markdown
## Objective
[Concrete engineering outcome, without prescribing its internal design.]

## Context
[Why this work supports the parent user outcome.]

## Scope
- [Confirmed work or investigation deliverable]

## Definition of Done
- [Observable completion condition]

## Open Questions
- [Only a material unresolved decision]
```

Do not repeat the Jira Summary in the Description. Do not add Acceptance Criteria unless explicitly requested; when requested, keep them observable and implementation-neutral.

## Guardrails

- Do not name or mandate a framework, vendor, library, database, API, schema, hosting model, or architecture unless the source explicitly requires it.
- Do not convert a technical idea from the source into a fixed design when it is presented as a candidate or recommendation.
- Do not present the original author's preferred option as an approved decision unless the user confirms it.
- Do not create speculative tasks to make the breakdown look complete. A discovery task can recommend whether further work is needed.
- Do not promise availability, update frequency, accuracy, performance, or fallback behavior unless explicitly confirmed.
- Do not split tasks solely by frontend/backend/UX/DevOps ownership. Split only when the work has a distinct deliverable that is useful to plan or validate.
- Preserve explicit technical constraints and references, but avoid copying irrelevant implementation detail into every task.
- Keep delivery work focused on supporting the Story; do not restate the user Story as a task.

## Example transformation

Technical directive:

`Integrate LightRAG with Qdrant and build an incrementally updated graph.`

Implementation-neutral suggestions:

- **Evaluate viable approaches** — Recommend how to support related-knowledge discovery within the existing product and knowledge-base constraints; document trade-offs and blockers.
- **Enable related-knowledge discovery** — Implement the approach selected by engineering so the confirmed user scenarios can be demonstrated.
- **Validate related results in the answer experience** — Check that surfaced information is relevant to the user's question and that existing search behavior remains usable.

These are suggested task outcomes, not a prescribed architecture or mandatory task set. Include an incremental-update task only when that behavior is confirmed as in scope.
