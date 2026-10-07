---
name: jira-description-format
description: Format Jira issue descriptions without repeating the issue title in the description body. Use when drafting, creating, or editing a Jira description, especially when converting a Jira ticket template into content for the Description field.
---

# Jira Description Format

Keep the Jira issue Summary and Description distinct. Jira already displays the Summary as the issue title, so do not repeat the Summary in the Description.

## Rules

- Never start a Jira Description with an H1 that repeats the issue Summary or title.
- Begin the Description with its first useful section, such as `## Business Context`, `## User Story`, `## Objective`, or `## Problem`.
- Do not repeat the title as an unformatted first line either.
- Preserve a title in a standalone ticket document only when the output is intended to be a document rather than Jira Description field content.
- When editing an existing issue, remove a duplicated title heading from the Description without changing the Summary or the ticket's intent.
- Before creating or updating a Jira issue, verify that its Description does not repeat the Summary.

## Example

Summary:

`AiMY – Uploads – Upload Multiple Files`

Description:

```markdown
## Business Context
Users need to upload multiple files in one workflow...

## Purpose
Allow users to select and upload multiple files...
```

Do not put `# AiMY – Uploads – Upload Multiple Files` at the top of the Description.
