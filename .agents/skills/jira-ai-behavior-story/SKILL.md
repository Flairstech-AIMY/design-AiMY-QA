---
name: jira-ai-behavior-story
description: Write and refine Jira Stories for conversational AI, voice agents, AI routing, caller identification, acknowledgments, transfer behavior, retrieval behavior, classification, tool use, and other agent decision flows. Use when the requested Jira issue defines how an AI agent should behave before, during, or after processing. Focus on trigger conditions, conversational outcome, timing, exceptions, fallback paths, state, non-robotic responses, and testable examples. Preserve explicitly requested model or architecture choices but do not invent AI implementation details.
---

# Jira AI Behavior Story

Translate conversational AI requirements into behavior that engineering and QA can implement and validate without ambiguity.

## Behavioral Model

For each requested behavior, determine:

1. **Trigger**: What condition causes the behavior?
2. **Context**: What information is available to the agent at that moment?
3. **Decision**: What should the agent decide or classify?
4. **Response / Action**: What should the caller or user experience?
5. **Timing**: When should it happen relative to processing or tool execution?
6. **Exception**: When should the normal behavior not happen?
7. **Fallback**: What should happen when confidence or data is insufficient?
8. **State**: Does previous conversation, ticket, transfer, profile, or session history affect the decision?

Only include dimensions that matter for the requested feature.

## Core Rules

- Describe the desired conversational behavior before describing implementation.
- Avoid generic requirements such as `sound natural`; define the observable behavior that makes it natural.
- Avoid repetitive fixed phrases when the requirement calls for natural acknowledgments.
- Preserve explicitly requested classifier, SLM, LLM, routing, or tool choices as technical constraints.
- If the architecture is not specified, do not invent a model or classifier.
- Distinguish an acknowledgment from a final answer.
- Distinguish a lookup or processing delay from a troubleshooting dialogue where an acknowledgment may interrupt the flow.
- Account for race conditions between a temporary acknowledgment and a result that becomes ready immediately.
- Do not force the agent to speak twice when the processing result is already available and the second utterance would feel unnatural.
- Include concrete examples when they clarify intent better than abstract prose.
- Keep the Jira Summary separate from the Description; do not repeat the title as an H1 or first line in the Description.

## After-Hours Availability, Transfers, and Follow-Up

For support flows that depend on working hours or teammate availability, make the decision path explicit and keep these behaviors distinct:

- State the condition that defines after-hours behavior, using the configured availability source rather than inventing a schedule or timezone.
- If a transfer is unavailable, have the agent explain that no teammate is currently available and offer the help it can provide. Do not attempt a transfer outside the defined availability window.
- If the user continues to request a teammate, specify whether the agent records a ticket and what follow-up it may promise. Do not promise a callback or resolution timeframe unless the requirement confirms it.
- For steps that require access the agent does not have, distinguish actions the user can safely and reasonably perform from those that must go to a teammate. If the user cannot complete an eligible step, record the issue, troubleshooting already performed, and the point where work stopped so the teammate can continue.
- When the agent cannot proceed, explain what happens next and reassure the user that prior troubleshooting will be available to the person following up only if the handoff actually preserves it.
- For handoff tickets, preserve the issue summary, troubleshooting, outcome, and next step. If a Solution section is required, do not invent a diagnosis or fix: distinguish a verified solution from one still pending teammate investigation. Include instructions to use the recorded context and avoid asking the user to repeat information already captured.
- Separate these into different Stories only when each represents an independently deliverable user outcome. Assign each shared behavior to one clear owner Story to prevent overlapping scope.

Treat proposed wording as draft wording unless the source confirms it is approved. Record the approver or unresolved decision when it affects what the agent may tell users.

## Default Story Structure

Use the following sections in the Jira Description; the issue title is already stored in the Jira Summary.

```markdown
## User Story
As a [caller / user / agent / admin],
I want [AI behavior],
so that [experience or business outcome].

## Problem
[Current conversational failure or missing capability.]

## Required Behavior
- **Trigger:** [Condition]
- **Behavior:** [Expected response or action]
- **Timing:** [When it occurs]
- **Exceptions:** [When not to apply it]
- **Fallback:** [Only when explicitly needed]

## Acceptance Criteria
- [Testable behavior]
- [Testable exception]
- [Testable fallback or timing condition]

## Examples
### [Scenario name]
**Caller:** ...
**AiMY:** ...

## Technical Notes
[Only technical choices explicitly supplied by the user.]

## References
- [Provided reference]
```

## Timing and Acknowledgment Stories

For acknowledgment-before-processing behavior, test at least these categories when they are relevant to the source requirement:

- lookup required;
- office or identity confirmation followed by processing;
- transfer preparation;
- knowledge retrieval;
- operation completes immediately;
- troubleshooting step where an acknowledgment would be awkward;
- repeated processing turns where fixed wording would sound robotic.

The acceptance criteria should make clear that acknowledgments are context-sensitive rather than mechanically inserted before every tool call.

If the user specifies a gap or pause before the final response, preserve the exact requirement. Otherwise do not invent a timing value.

## Classification and Response Selection

When the user explicitly wants a classifier or small model to choose an acknowledgment or behavior:

- make the classification objective explicit;
- describe the inputs or context at a product level;
- define the expected classes or decision outcome only if the user supplied them or they are required by the behavior;
- require graceful fallback when classification is uncertain if the source requirement calls for it;
- keep model names and vendor choices in `Technical Notes` unless they are product requirements.

## Identity and Disambiguation Stories

For caller or contact identification:

- define when identity is considered unambiguous;
- define conditions that require asking for the caller's name;
- avoid selecting between conflicting profiles without confirmation;
- treat shared phone numbers and organization numbers as explicit ambiguity conditions when supplied by the requirement;
- define how inactive or stale records should affect matching only when the user has specified that behavior.

## Transfer and Existing-Context Stories

For transfer behavior:

- distinguish one matching open ticket from multiple open tickets;
- use prior transfer context only when the requirement says it is valid for the current time window;
- define whether the agent should proactively offer transfer or wait for the caller to request it;
- preserve explicit time windows exactly;
- separate direct-extension capability, external directory sync, and admin management into separate stories when they provide independently testable capabilities.

## Quality Check

Verify that QA can answer all relevant questions from the ticket:

- When does the behavior trigger?
- What exactly does the AI do?
- When should it not do it?
- What happens when context is ambiguous?
- What happens if processing finishes sooner than expected?
- Does previous session or ticket state matter?
- Are examples consistent with the acceptance criteria?
- Does the Jira Description avoid repeating the Summary/title?
