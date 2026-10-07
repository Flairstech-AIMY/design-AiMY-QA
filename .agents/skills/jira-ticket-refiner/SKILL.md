---
name: jira-ticket-refiner
description: Refine an existing Jira Story, Task, Bug, or rough ticket draft by removing filler, closing clarity gaps, improving structure, strengthening acceptance criteria, and preserving important examples and references. Use when the user asks to improve, clean up, shorten, fix gaps in, review, complete, or make a Jira issue clearer. Preserve the original intent and confirmed requirements. Do not silently add product behavior or technical assumptions that are not supported by the source material.
---

# Jira Ticket Refiner

Improve an existing Jira issue without changing what the user is actually asking the team to build or fix.

## Priorities

1. Preserve intent.
2. Remove noise.
3. Expose ambiguity.
4. Make behavior testable.
5. Keep useful examples.
6. Make roadmap-facing titles clear to their customer or stakeholder audience.

## Workflow

1. Identify the ticket's intended outcome.
2. Remove conversational history, repeated statements, and filler that do not help implementation or validation.
3. Consolidate duplicated requirements.
4. Move details into the section where they are easiest to use.
5. Add missing acceptance criteria only when they logically follow from explicit requirements.
6. Identify material gaps that cannot be resolved from the source.
7. Preserve all useful links, IDs, examples, and edge cases.
8. Return the complete revised ticket, not a patch or list of edits, unless the user asks for a critique only.
9. When editing Jira Description content, do not repeat the issue Summary/title as a heading or first line; remove a duplicate heading while preserving the Summary.

## Do Not Silently Fill Gaps

When information is missing:

- infer only trivial structural details;
- do not invent business rules;
- do not invent API behavior;
- do not invent timing thresholds;
- do not invent fallback behavior;
- do not invent permissions;
- do not invent ownership or priority.

If a gap materially blocks implementation or testing, add a short `Open Questions` section.

If the user explicitly asks to brainstorm possible behavior, separate suggestions from confirmed requirements.

When caller-facing wording is only a proposed phrase, preserve it as an example and identify any needed approval; do not present it as approved copy. When follow-up, a callback, or a promised solution depends on an operational commitment, retain that dependency as an open question unless it is confirmed.

## What to Remove

Remove or compress:

- repeated explanations of the same problem;
- long conversational quotes when a short factual summary is enough;
- generic motivation that does not affect the requirement;
- implementation speculation presented as if it were decided;
- redundant acceptance criteria;
- headings with no meaningful content;
- a Description heading that repeats the Jira Summary/title.

## What to Preserve

Preserve:

- concrete customer or user pain;
- examples that expose an edge case;
- exact product names and terminology;
- URLs and issue references;
- explicit scope limits;
- important exceptions;
- explicit urgency or production impact;
- user-provided technical constraints;
- the distinction between confirmed behavior and unresolved decisions.

## Acceptance Criteria Refinement

Turn vague requirements into observable behavior without adding new requirements.

Weak:

`The system should handle multiple contacts correctly.`

Better:

`If the phone number matches multiple contact profiles with different names, AiMY asks the caller for their name before selecting a profile.`

Weak:

`The flow should be smooth.`

Better:

`The caller receives an acknowledgment before a long-running lookup begins, unless the operation completes immediately.`

Only use a more specific statement when that behavior is supported by the source ticket.

## Examples and Edge Cases

Examples are valuable when they clarify branching behavior. Keep them short and map them to the requirement they illustrate.

Common useful categories include:

- one match versus multiple matches;
- normal path versus exception path;
- first interaction versus repeated interaction;
- active versus deactivated records;
- immediate completion versus delayed processing;
- one open item versus multiple open items;
- user can perform an action versus the agent or a teammate needs to do it;
- teammate available versus unavailable for transfer.

Do not add edge cases solely because they are theoretically possible.

## Default Output

Return the polished Jira ticket using the original issue type and a structure appropriate to it. Keep the title as the Jira Summary; omit it from Description field content.

Add `Open Questions` only when unresolved information materially affects implementation or QA.

Do not add a separate explanation of what you changed unless the user asks for one.
