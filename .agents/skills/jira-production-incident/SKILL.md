---
name: jira-production-incident
description: Convert production outages, OOM events, service crashes, repeated failures, infrastructure instability, scaling problems, or urgent technical observations into focused Jira incident Bugs or investigation Tasks. Use when the user provides logs, cloud-console links, timestamps, service names, symptoms, or production impact and wants a Jira issue for engineering or DevOps. Separate observed facts from hypotheses, preserve evidence and urgency, require root-cause investigation and durable remediation when appropriate, and never invent the cause of the incident.
---

# Jira Production Incident

Create incident tickets that help the team investigate, fix, and prevent recurrence without confusing symptoms with root cause.

## Core Rules

- Treat logs, metrics, error messages, timestamps, task IDs, deployment IDs, and cloud-console links as evidence.
- State only what is observed as fact.
- Label possible causes as hypotheses when the source has not confirmed them.
- Never convert a symptom such as `OOM` into an unsupported root-cause claim.
- Make production impact and recurrence explicit when provided.
- Preserve urgency exactly when the user states it.
- Do not invent severity levels, affected-user counts, downtime, or timestamps.
- If the incident is recurring, make recurrence prevention part of the required outcome.
- Keep the Jira Summary separate from the Description; never repeat the title as an H1 or first line in the Description.

## Choose Bug vs Task

Use a **Bug** when the issue describes an existing production service behaving incorrectly or becoming unavailable.

Use a **Task** when the requested work is primarily an infrastructure improvement, architecture change, capacity change, migration, or preventive engineering action.

If the immediate cause is unknown but production is failing, a Bug can still include a root-cause investigation requirement.

## Default Incident Format

```markdown
## Summary
[What happened, where, and when using only confirmed information.]

## Impact
[Production or operational impact supplied by the user.]

## Observed Behavior
- [Observed symptom]
- [Recurrence information]

## Evidence
- [Log / task / dashboard / cloud-console reference]
- [Timestamp or correlation ID]

## Investigation Scope
- Identify the root cause of the observed failure.
- Determine why existing safeguards, limits, scaling, or recovery behavior did not prevent the outage when relevant.
- Confirm whether the incident shares a cause with previous occurrences when recurrence is stated.

## Required Outcome
- Implement or define the durable remediation required to prevent recurrence.
- Add or improve detection and monitoring when the source request requires operational visibility.

## Acceptance Criteria
- Root cause is identified and supported by evidence.
- The corrective change or mitigation is implemented and validated.
- The failure scenario is verified not to recur under the known triggering condition, where reproducible.
- Monitoring or alerting covers the failure mode when requested or clearly part of the incident objective.

## References
- [Provided link]
```

Remove any line that is not supported or relevant.

## Symptom, Hypothesis, Root Cause

Keep these concepts separate:

- **Symptom**: Directly observed failure, for example an ECS task terminated because of an out-of-memory event.
- **Hypothesis**: Possible explanation that still needs verification, for example a memory leak or workload spike.
- **Root cause**: Evidence-backed explanation established by investigation.

Do not present a hypothesis as the root cause.

## Repeated Incidents

When the user says the issue happened before:

- state that this is a recurrence;
- include previous evidence if supplied;
- require comparison with prior occurrences;
- avoid closing the ticket with only a restart, redeploy, or temporary resource increase unless that is explicitly the requested scope;
- prioritize identifying why the issue can recur.

## Infrastructure Improvement Tasks

For planned changes such as autoscaling, Redis adoption, service decomposition, or load-balancing changes:

- create separate Tasks when each change is independently deliverable;
- describe the intended operational outcome of each change;
- avoid claiming that a proposed change will solve an incident unless evidence supports that conclusion;
- include validation criteria such as resource behavior, scaling response, or service isolation only when they can be stated without inventing thresholds.

## Style

- Keep incident tickets direct and urgent without emotional wording.
- Put evidence near the observed behavior.
- Avoid long historical narratives.
- Do not add generic postmortem language unless a postmortem is explicitly in scope.
- Keep temporary mitigation separate from permanent remediation when both are known.
