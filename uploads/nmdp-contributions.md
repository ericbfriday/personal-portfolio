# NMDP Contributions — Eric B. Friday

**Role:** Senior Frontend & Application Security Engineer
**Org:** NMDP / Be The Match (`bethematch` GitLab), CIBMTR
**Scope:** All git repositories under `/Users/efriday/dev`
**Last updated:** 2026-06-23

---

## Overview

Contributions span most of NMDP's product lines across two primary disciplines:

1. **Authentication & application security** — owning NMDP's Secure Enterprise Login (SEL/Okta) libraries, hardening the CIBMTR Reporting App's SMART-on-FHIR auth stack, and building org-wide npm supply-chain security tooling.
2. **Frontend platform engineering** — large, sustained contributions to the Biotherapies ("Unite"), MatchSync, and MatchSource Angular/Next.js applications.

The `str-tmp` SSR engagement is not an isolated sandbox — it is the research and POC arm of a real, ongoing effort visible in `cibmtr/cra-frontend` and `cibmtr/.../ssr-viability-sandbox`.

---

## Contribution Map

| Project | Domain | Authored Commits | Latest Activity |
|---|---|---:|---|
| Biotherapies frontend ("Unite") | Biotherapies | ~315 | 2026-02 |
| SEL — Secure Enterprise Login | AppSec | ~150 | 2026-02 |
| International Forms Automation (IFA) | MatchSync | ~115 | 2026-02 |
| Okta SEL Widget | AppSec | ~51 | 2025-09 |
| Property Management Tool (PMT) | MatchSync | ~34 | 2026-01 |
| MatchSource frontend | MatchSource | ~25 | 2026-05 |
| SearchLite devops | MatchSync | ~17 | 2026-01 |
| CIBMTR Reporting App (CRA) | CIBMTR | ~16 | 2026-06 |
| Frontend Security Audit | AppSec/DevOps | ~13 (sole owner) | 2026-05 |
| npmrc-research (supply chain) | AppSec/DevOps | ~13 (sole owner) | 2026-05 |
| Hackathon 2024 (forms engine) | MatchSync | ~11 | 2024-10 |
| IT/metrics dashboard | DevOps | ~5 | 2025-11 |
| HML Dashboard | Gene/HLA | ~4 | 2026-03 |
| SSR viability sandbox | CIBMTR | ~4 | 2026-03 |

*Counts are from `git shortlog` filtered by author. Multiple clones of the same upstream are deduped by remote URL.*

---

## 1. Application Security & Identity

### SEL — Secure Enterprise Login (`security/okta-login`)

**~150 commits.** SEL is NMDP's shared Okta-based library for Single Page Applications, providing SSO, session management, token management, and authn/authz (vanilla-JS core + Angular wrapper). Key contributions:

- Rewrote the core Okta wrapper in TypeScript with `tsup` bundling and deeper Nx integration (2025-04)
- Angular 18 → 19 migrations of the `nmdp-login` library; synchronized TypeScript/Angular versions across broken lib definitions
- Authored the canonical OIDC guidance documentation ("how to do auth at NMDP")

### Okta SEL Widget (`security/okta-sel-widget`)

**~51 commits.** A yarn-workspaces monorepo demonstrating authentication patterns across frameworks. Includes a custom Okta authorization server for SSO session management and a shared `sel-common` package. The primary demonstration and transition vehicle for the SEL library.

### npm Supply-Chain Security

Two repos solely owned and driven by this engineer:

**`npmrc-research`** (~13/13 commits) — Workspace for securing the npm supply chain and reducing dependency bloat across NMDP GitLab repositories. Defines registry-compliance standards and remediation tooling.

**`frontend-security-audit`** (~13/16 commits) — Operationalizes those standards: a package-manager-aware compliance auditor (npm / yarn classic / yarn berry / pnpm) running 5 adaptive PASS/WARN/FAIL checks across 58+ repos via scheduled CI scans with email notifications. Checks cover lockfile health, registry config, CI registry usage, deterministic installs, and version pinning. Uses ADRs (`docs/adr/`) and derives registry patterns from `npmrc-research`.

Together these constitute a self-directed, org-wide software supply-chain hardening program.

### OIDC & Auth Sandboxes

`appsec/oidc-test-apps` and `legacy/better-auth-oktalogin` — sandboxes for OIDC relying-party patterns and a `better-auth` + Okta integration. The same auth stack later carried into PMT and the `nextjs-better-auth-ssr` POC.

---

## 2. CIBMTR Reporting App & SSR Engagement

### CIBMTR Reporting App (`cibmtr/cra-frontend`)

**~16 commits, active through 2026-06.** An Angular SMART-on-FHIR app that retrieves EHR Patient/Observation data and saves/updates it in the CIBMTR FHIR server with CRID. Recent work is a phased auth-hardening campaign (June 2026) aligned with the security thesis in `str-tmp/SBAR.md`:

- Moved OIDC and SMART/EHR token storage out of `localStorage` into `sessionStorage` with `smart_ehr_` prefix (phases 1.1–1.2)
- Removed cached token state from `OidcService` in favor of observables (1.3)
- Added PKCE to the SMART authorization flow (1.4)
- Implemented idle timeout and absolute session lifetime cap (1.5–1.6)
- Added issuer validation before SMART metadata discovery; replaced loose `URL.includes()` checks with an `allowedApiOrigins` allowlist (2.2–2.3)
- BroadcastChannel cross-tab session sync and interceptor refresh coordination (2.1, 2.5)
- Timeout-driven token revocation and comprehensive auth-hardening test coverage (phases 3–4)
- Added a Kiro AI workspace with specs and a structured auth security review plan

### SSR Viability Engagement (`str-tmp` + `ssr-viability-sandbox`)

A research and POC effort originating in `cibmtr/.../ssr-viability-sandbox` (~4 commits, 2026-03) that expanded into the fuller `str-tmp` workspace.

**Existing apps analyzed:**
- CRA (above)
- `@matchsync/smart-pi-ng` — the Angular patient-import widget embedded in CRA (Zod-validated, own HTTP client, Epic-FHIR + MSPI backends); documented coupling debt including DOM-querying the host, `ViewEncapsulation.None` style bleed, and peerDeps workarounds

**Deliverables built:**

*Analysis & planning:* SBAR recommendation + enterprise-architect review, stakeholder deck, and a 7-framework SSR evaluation (`RESEARCH/`, `PLANS/`). Core thesis: move FHIR calls server-side to eliminate CORS/CSP/iframe failures at transplant centers, lock CSP to `'self'`, keep tokens off the browser, and simplify TC onboarding.

*Three working POCs:*
- `nextjs-ssr-poc` — Next.js + iron-session (port 3000)
- `hono-rr7-ssr-poc` — Hono + React Router v7 (port 3001)
- `nextjs-better-auth-ssr` — Next.js + better-auth + Okta (port 3002)

All Dockerized with Helm/K8s.

*Shared libraries (`REPOS/shared/`) — the substantive engineering:*
- `@cibmtr/session-store` — AES-256-GCM server-side sessions (Redis + in-memory)
- `@cibmtr/smart-pi-ng-core` — FHIR R4 Zod schemas, HTTP clients, services
- `@cibmtr/smart-pi-ng-react` / `smart-cra-core` / `smart-cra-react` — React ports of Angular logic
- `@cibmtr/e2e-tests` — Playwright suite covering SMART launch, CSP/iframe, dual-auth, session security, and gate policy across all three POCs

---

## 3. Biotherapies — "Unite" Frontend

**~315 authored commits** to `bethematch/appdev/biotherapies/frontend` (package name `Unite`, NBD = NMDP BioTherapies). The largest single-codebase contribution by volume. An Angular / UI-Router application for the cell-collection and donor-order workflow. Covers broad feature delivery: order carts (GRID vs Donor ID display), day-of-collection task handling, ISBT-128 field support, cancellation flows, admin API service work, and extensive test maintenance including AngularJS → Angular cleanup.

---

## 4. MatchSync Platform

### International Forms Automation (IFA)

**~115 commits.** A forms-automation app (Next.js, Nx, Volta/Yarn). Contributions focused on auth and security middleware: OIDC RP library and auth config libraries, Next.js 14 → 15 upgrade, CSP reporting scripts, referrer/security header fixes, sign-out redirect handling, ESLint/Nx config modernization, and SonarQube remediation.

### Property Management Tool (PMT)

**~34 commits.** A Next.js 15 + React 19 + Nx app. Contributions center on Better Auth integration: role-based tRPC procedures, session-termination detection via polling, an admin-plugin "stop impersonation" banner, Prisma/tRPC wiring, and CI/env triage. The same better-auth pattern appears across AppSec sandboxes and the `nextjs-better-auth-ssr` POC, indicating a cross-project architectural thread.

### SearchLite & Document Intelligence

SearchLite devops (~17 commits) and a `dark-document-intelligence` clone — MatchSync search and document-processing support tooling.

---

## 5. MatchSource Platform

**~25 commits** to `@matchsource/app` across `develop`, `frontend-2`, and `feature-ebf-q-review-structured`. A large, long-lived Angular application (30k+ total commits). Contributions are targeted — feature branches and a structured "q-review" feature — rather than ownership-level.

---

## 6. Gene/HLA, DevOps & Other

- **HML Dashboard** (`gene-team/hml-dashboard`) — ~4 commits to a Spring Boot + Angular HLA/genotyping dashboard. Additional gene-team UI clones present with minimal authored history.
- **IT/Metrics Dashboard** (`devops/.../it-dashboard`) — ~5 commits to an engineering-metrics dashboard.
- **Observational clones** — EMDIS UI, CIBMTR Center-Onboarding Tool, ePRO, BeConnected (SiteCore), qwick-sight: present with little or no authored history.
- **Archive** — Hackathon repos (2024/2025), `nmdp-forms`, ServiceNow KB extractor, AWS Textract samples: experiments and reference material.

---

## Notes on Methodology

- Commit counts are from `git shortlog -sne --all` filtered by author name — a proxy for effort, not a precise audit. Merge commits and AI-assisted commits are included.
- Many directories are multiple clones of the same upstream repo. The contribution map dedupes by remote URL and reports the fullest clone; totals are not additive.
- Personal repos (`efriday/*`) and external/community repos are excluded from the NMDP portfolio above.
