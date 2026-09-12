---
title: "integration-rules.md — integration rules template (E14)"
description: "A consumer-customisable template of six cross-service rule families (API contracts, CDC, event schemas, service auth, observability, resilience) delivered to .ai-factory/rules/ for microservice systems to share as one contract."
---

<!-- provenance: framework @ aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650 2026-09-12 · raw draft (beta-docs-encyclopedia) —
     polish pass pending; re-derive from the anchors below, do not hand-edit prose -->

# integration-rules.md — integration rules template (E14)

**Status:** shipped-beta · **Ships to:** npm-lane, all tier arms (core / env+ / factory); also delivered by the python lane's doc block · **Fires at:** install time (setup.d/30-templates.sh; re-delivered by setup.d/45-python.sh) — it is a template, so nothing "runs" until a consumer adopts its rules

## What it is

A 118-line Markdown template declaring the cross-service rules a microservice system should hold itself to: `IR1` API contracts (OpenAPI 3.1 generated from Zod), `IR2` consumer-driven contracts (Pact), `IR3` event schemas, `IR4` service-to-service auth (mTLS), `IR5` observability propagation, `IR6` resilience. Its frontmatter carries the `paths` globs (web/app-api/infrastructure-messaging/openapi/pact) that scope when the rules apply.

## How it works

- It is written for the many-repo shape: the file is meant to live once and be shared (symlink or git submodule) across all services in a system, so every service holds the same integration contract.
- Every rule family ends in a named check (e.g. a CI job that validates the published OpenAPI matches the Zod schemas) — rules are stated with their enforcement channel, in the framework's rules-as-tests style, rather than as prose aspirations.
- It is marked consumer-customisable: the header's "Authoritative for" scopes it to the cross-service template; the project goal stays with the consumer's README.
- Delivery lands it at `.ai-factory/rules/integration-rules.md` via `copy_safe` — a consumer who has authored their own integration contract keeps theirs.
- Lane honesty: it is one of the few templates delivered by BOTH the npm lane's templates stage and the python lane's doc block — but the template's own content is TypeScript/Zod-flavoured (Zod-as-source-of-truth, `src/**/*.ts` path globs), so on the python lane it arrives as a starting point whose examples, not whose rules, need adapting.

## Satellites & companions

LISTED in install.sh's `SHIPPED_DOCS` array (header-verified + release-time copy). Delivered alongside the `AGENTS.md.template` (E4) family in `30-templates`; re-delivered inside the python lane's doc delivery next to `ARCHITECTURE.python.md` (E36). Its check-first style mirrors `RULES.md`'s enforcement-table posture (E36's python sibling).

## Anchors

At framework pin `aa87d0a47a6d8502f983cc9fe7284bd5dcb3d650`:

- `packages/core/templates/shared/integration-rules.md:1` — «---»
- `packages/core/templates/shared/integration-rules.md:2` — «description: Integration rules across microservices — API contracts, CDC, event schemas, mTLS, observability, resilience»
- `packages/core/templates/shared/integration-rules.md:14` — «> **Authoritative for:** cross-service integration template — API contracts, CDC, event schemas, mTLS, observability, resilience patterns (consumer-customisable).»
- `packages/core/templates/shared/integration-rules.md:17-19` — «These rules govern communication between services. They live in a shared file» «(linked via symlink or git submodule across all services in the system) so» «every service has the same integration contract.»
- `packages/core/templates/shared/integration-rules.md:28` — «**Check:** CI job validates the published OpenAPI matches the Zod schemas (no drift).»
- `setup.d/30-templates.sh:31` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/integration-rules.md" "$PROJECT_ROOT/.ai-factory/rules/integration-rules.md"»
- `setup.d/45-python.sh:1338` — «copy_safe "$PKG_ROOT/packages/core/templates/shared/integration-rules.md" "$PROJECT_ROOT/.ai-factory/rules/integration-rules.md"»
