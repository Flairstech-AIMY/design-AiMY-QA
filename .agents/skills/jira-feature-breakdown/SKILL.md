---
name: jira-feature-breakdown
description: Break a large product feature, initiative, epic, or rough implementation plan into coherent Jira Stories and supporting Tasks without losing coverage or creating artificial team-based stories. Use when the user asks for story breakdowns, all stories and tasks, sprint scoping, feature coverage, dependency planning, or whether a proposed set of stories covers the feature. Center Stories on independently testable user or business value and place frontend, backend, UX, integration, migration, and infrastructure implementation work beneath the relevant Story as Tasks when appropriate.
---

# Jira Feature Breakdown

Convert broad product requirements into a clean Jira hierarchy that can be planned and delivered incrementally.

## Core Principles

- Split by user-visible or business capability, not by engineering layer.
- A Story should represent a meaningful outcome that can be demonstrated and accepted.
- Backend, frontend, UI/UX, data, integration, and DevOps work should normally be Tasks under the Story they enable.
- Create a separate Story only when the capability has independent product value or can be accepted independently.
- Avoid duplicate scope across stories.
- Preserve explicit sprint constraints and phased delivery boundaries.
- Separate current scope from future enhancements.
- Do not invent requirements to make the breakdown look complete.
- When titles are roadmap-facing, use plain customer-understandable language that says what will be delivered; avoid unexplained technical or internal workflow terms.

## Workflow

1. Extract all explicit capabilities, actors, workflows, constraints, and future ideas from the request.
2. Group requirements by user outcome.
3. Define the smallest independently testable Stories that cover those outcomes.
4. Add supporting Tasks only where implementation separation is useful.
5. Identify dependencies between Stories or Tasks.
6. Put intentionally deferred behavior into a clearly labeled future-scope section.
7. Run a coverage check so every stated requirement maps to at least one Story or Task.
8. Remove overlaps and unnecessary fragmentation.

## Story Boundary Rules

Create a separate Story when at least one of these is true:

- It introduces a distinct user capability.
- It has different acceptance behavior that can be tested independently.
- It can reasonably ship or be enabled independently.
- It serves a different actor or workflow.
- It represents a separate administration or configuration experience with its own value.

Keep work in the same Story when the split would only represent:

- frontend versus backend;
- UI/UX versus implementation;
- API versus database work;
- one technical layer required to make the same user capability function.

For multi-step conversational support flows, make sure each behavior has one clear home: for example, handling an unavailable transfer, guiding a user through an appropriate action, setting follow-up expectations, and recording a useful teammate handoff. Split only where each behavior has an independently testable outcome, and avoid repeating the same promise or ticket requirement in multiple Stories.

## Default Output

```markdown
# [Feature / Epic Name]

## Scope Summary
[Short description of the capability and current delivery boundary.]

## Story 1: [Outcome-oriented title]

### User Story
As a [actor],
I want [capability],
so that [outcome].

### Requirements
- [Requirement]

### Acceptance Criteria
- [Testable outcome]

### Tasks
1. **[Task name]**: [Concrete implementation outcome]
2. **[Task name]**: [Concrete implementation outcome]

### Dependencies
- [Only if applicable]

## Story 2: [Outcome-oriented title]
...

## Future Scope
- [Explicitly deferred capability]
```

If the user asks only for Stories, omit Tasks.

## Coverage Check

Before returning the breakdown, verify all of the following:

- Every explicit requirement from the source request appears in the breakdown.
- No Story exists solely because a different engineering discipline owns it.
- Each Story has a clear actor or business outcome.
- Tasks are concrete implementation deliverables, not restatements of the Story.
- Dependencies are stated only when real ordering or prerequisite constraints exist.
- Deferred items are not accidentally included in current acceptance criteria.
- Adjacent roadmap titles are distinct, plain-language statements of customer-visible outcomes.

If the user asks whether the current Stories cover the feature, identify missing user capabilities first. Do not manufacture extra Stories merely for symmetry.

## Sprint and Phase Handling

When the user specifies a limited sprint scope, treat that boundary as authoritative.

For example, if the current sprint supports `1:1`, `1:N`, and `N:1` reconciliation while `N:N` is future work:

- define Stories only for the current supported workflows;
- preserve the shared foundation required by those workflows;
- place `N:N` under future scope unless it requires preparatory work now;
- do not make its acceptance criteria part of the current sprint.

## Style

- Use concise, product-oriented titles.
- Keep sections compact.
- Prefer examples when they clarify workflow boundaries.
- Avoid project-management filler.
- Do not add estimates, owners, priorities, or sprint assignments unless supplied.
