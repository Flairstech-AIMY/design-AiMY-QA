---
name: jira-database-deployment
description: Write concise Jira tickets for relational database deployment and the companion migration pipeline, including outcomes, ownership, and validation without exposing secrets or unnecessary infrastructure detail.
---

# Jira Database Deployment

Use this skill when the user asks for Jira work to deploy a relational database or establish its schema-migration pipeline. Keep the tickets outcome-focused and coordinated. Do not assume a cloud provider, environment, database technology, repository, or network design that the user has not specified.

## Required ticket relationship

A database deployment ticket must be accompanied by a separate ticket for the migration pipeline in the relational-database project (or the project the user specifies). Make the companion ticket reference the deployment ticket, and link the two issues when Jira tools are available. Do not claim the companion ticket or link exists unless the corresponding action succeeds.

Prefer Flyway when migration tooling must be selected and the project has no existing standard; defer to the project's established tooling otherwise. Include the migration repository and relevant documentation links when the user provides them or they are available and appropriate. Never guess a repository URL or publish internal-only links in a public artifact.

## Deployment ticket

Use the title:

`{Product / Initiative} – Database – Deploy Database`

Include:

- Business context: users and applications need the intended database schema deployed repeatably and safely, rather than relying on an unintended default.
- Purpose: a named database is available to the target application, with required migrations applied and basic connectivity verified.
- Technical Notes: the expected database name (not a default such as `postgres`), expected server type (use `psql` only when the user has not specified another type), and only the environment and connection/security context necessary to act. Reference secret names rather than secret values.
- Definition of Done: the named database is available, migrations are current, a basic connection/query succeeds, and required connection details are handled securely.
- Suggested Owner: Infrastructure, with Backend support, unless the user gives a different owner.
- Estimate: M or L, based on the scope the user provides.

Keep the ticket concise. Do not include raw credentials, connection strings containing secrets, code samples, migration naming conventions, build-spec locations, detailed deployment/rollback/monitoring plans, or environment/network specifics unless the user requests them or they are necessary to make the requested work actionable. Never invent a database name or claim a smoke check has already passed.

## Companion pipeline ticket

Create a distinct task for a repeatable pipeline that applies the database's migrations to the named target database and verifies the resulting schema version. Keep it linked to the deployment ticket. Include only the repository, tool, and environment facts needed to locate and run the migrations; ask for missing critical details instead of guessing.

## Creating these issues

Follow the Jira Product Owner skill's intake requirements before creating issues. In particular, establish the Jira project/board, sprint, priority, dependencies/blockers, and stakeholders when they have not been provided. Do not store secrets in Jira descriptions or ticket files.
