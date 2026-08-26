# CreditPassport Consulting

Consultancy-first website for CreditPassport: credit strategy, decision intelligence, risk analytics, financial data, AI/ML, and research.

## Business direction

The public site positions CreditPassport as a consulting and research practice today, while keeping future product infrastructure as a separate productization track.

The operating loop is:

**Research → Consulting → Proprietary methodology → Repeatable tooling → Productization**

## Current site

- `/` — consultancy-first homepage
- `/consulting` — six consulting capabilities
- `/consulting/[slug]` — detailed capability pages with questions, work, outputs and measures
- `/research` — practitioner research-note index
- `/research/[slug]` — source-grounded research notes
- `/case-studies` — evidence-led selected work / engagement patterns
- `/case-studies/[slug]` — anonymized engagement pattern pages with explicit evidence status
- `/about` — operating model, founders and principles
- `/contact` — structured consultation intake
- `/privacy` — current website intake/privacy boundary
- `/robots.txt` — generated crawler policy
- `/sitemap.xml` — generated public route index
- `/opengraph-image` — generated branded social preview

## Research currently included

1. Probability Is Not a Decision
2. Review Is an Uncertainty State
3. From Transactions to Economic Events
4. Validate the Lending System, Not Just the Model

These are practitioner research notes derived from CreditPassport's internal decision architecture. They are explicitly not presented as externally validated empirical findings.

## Local development

```bash
npm install
npm run dev
```

Quality gates:

```bash
npm run typecheck
npm run build
# or
npm run check
```

## Environment

Copy `.env.example` to `.env.local` for development as needed.

```text
NEXT_PUBLIC_SITE_URL=
CONSULTATION_WEBHOOK_URL=
CONSULTATION_WEBHOOK_BEARER_TOKEN=
```

`NEXT_PUBLIC_SITE_URL` should be the final HTTPS production origin when deployed. The consultation form is not operational until a secure webhook destination is configured.

## Deployment

The application is intended for a standard Next.js deployment, with Vercel as the default hosting target. Use `main` for production and pull requests for previews.

See `docs/launch-readiness.md` for the deployment, indexing, security, accessibility and visual-QA checklist.

## Public claims policy

See `docs/content-source-policy.md`. Numerical client results and named case studies are withheld until evidence and publication permission are reviewed.

## Brand direction

The site adapts the editorial, high-contrast, typography-led interaction language of the Optimus reference to CreditPassport rather than copying its subject matter.

The current web identity uses the supplied CreditPassport Blue / Indigo / Mint / Coral logo system, with typography, spacing, motion and accessibility conventions drawn from the longer CreditPassport design-system deck. See `docs/brand-source-of-truth.md`.

## Product boundary

This repository is only for the public consulting/research site. Future scoring engines, feature stores, decision engines, lender APIs and production financial infrastructure should live outside this repository.
