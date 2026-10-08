---
name: jira-user-outcome-story-refiner
description: Rewrite or draft Jira Stories that are framed around user needs and observable outcomes rather than technical concepts. Use when a story is implementation-led, too technical for its audience, or needs clearer user value. Preserve confirmed requirements, expose material ambiguity, and do not turn suggestions into commitments.
---

# Jira User-Outcome Story Refiner

Reframe a Jira Story so the delivered user capability is clear while leaving engineering choices open unless the user has explicitly confirmed them.

## Use this skill when

- The draft leads with an implementation concept, architecture, tool, database, or engineering activity.
- The user asks to make a ticket more user-focused, less technical, clearer, or suitable for a product roadmap.
- The user wants a rough requirement turned into a user-facing Story.

Do not use this skill to conceal a technical constraint that the user explicitly requires. Preserve confirmed constraints in Technical Notes.

## Workflow

1. Identify the person or group who experiences the change. Use only a persona supported by the source; if it is unclear and affects scope, retain a neutral actor or flag the question.
2. State the user's need, current difficulty, expected capability, and resulting value using supplied facts.
3. Separate user outcomes from implementation ideas. Keep architecture, vendor, data-store, framework, and integration choices out of the user story unless explicitly mandated.
4. Preserve meaningful examples, product terminology, constraints, links, and confirmed behavior.
5. Distinguish confirmed requirements from proposals and assumptions. Do not promote plausible enhancements into requirements.
6. Make the Definition of Done observable and limited to confirmed outcomes. Do not add acceptance criteria unless explicitly requested.
7. Add Open Questions only for uncertainties that materially affect product scope, user behavior, or validation. Do not ask questions that can be resolved structurally.
8. Return the complete revised ticket, not a change summary, unless the user asks for critique only.

## Story title

Use a clear, stakeholder-understandable outcome title in this pattern when appropriate:

`{Product / Initiative} – {Domain / Area} – {User-Facing Outcome}`

Do not put role tags, engineering disciplines, implementation tasks, or unexplained technical terms in the title. Do not make a technical mechanism sound like the user feature. Keep the Jira Description separate from the Summary; do not repeat the title as a Description heading.

## Default Description structure

Use the following sections when they add useful information; omit empty or unsupported sections:

```markdown
## Business Context
[User need, workflow, problem, and why it matters.]

## Purpose
[Concise statement of the user-facing outcome.]

## Technical Notes
[Only confirmed constraints or minimal context needed by engineering. Leave solution selection to the team.]

## Definition of Done
- [Observable, confirmed outcome]

## Suggested Owner
[Only when known; otherwise omit or mark as to be confirmed if the user requires the field.]

## Estimate
[Only when supplied or requested; otherwise omit or mark as to be confirmed if required.]

## Open Questions
- [Only material unresolved decisions]
```

The user may request another template. Follow the requested format unless it conflicts with preserving intent or avoiding unsupported requirements.

## Guardrails

- Do not invent the user persona, business impact, data coverage, timing, accuracy thresholds, permissions, fallback behavior, or release scope.
- Do not add follow-up flows, explanations, incremental processing, notifications, or other useful-sounding behavior unless it is present in confirmed requirements.
- Keep examples illustrative unless the source explicitly makes them required behavior.
- Avoid vague claims such as “better experience” unless paired with the specific user outcome.
- Avoid duplicating Business Context, Purpose, requirements, and Definition of Done. Make each section serve a distinct purpose.
- If the user asks for acceptance criteria, make each criterion observable and traceable to an explicit requirement; do not prescribe implementation.

## Final check

Before returning the Story, verify that its title and description explain what the user can accomplish, every committed behavior is supported by the source, technical options remain open, and unresolved material decisions are visible rather than silently decided.
