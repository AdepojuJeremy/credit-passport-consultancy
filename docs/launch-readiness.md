# Launch Readiness

This document records the remaining operational work required to move the CreditPassport consultancy site from repository-ready to production-ready.

## 1. Deployment target

Recommended hosting: Vercel with the repository connected directly.

- Production branch: `main`
- Preview deployments: pull requests
- Framework preset: Next.js
- Node.js: 22
- Build command: `npm run build`
- Typecheck: `npm run typecheck`

Next.js 16.3.3 is the current Active LTS security release targeted by this repository.

## 2. Required environment variables

Set the following in the production deployment:

```text
NEXT_PUBLIC_SITE_URL=https://<production-domain>
CONSULTATION_WEBHOOK_URL=https://<secure-intake-destination>
CONSULTATION_WEBHOOK_BEARER_TOKEN=<optional-secret>
```

`NEXT_PUBLIC_SITE_URL` controls absolute metadata URLs, sitemap output and robots output. Do not launch with the localhost fallback as the canonical production value.

The consultation form should not be considered operational until `CONSULTATION_WEBHOOK_URL` is configured and tested end-to-end.

## 3. Domain and indexing checklist

Before public indexing:

- Attach the final production domain.
- Set `NEXT_PUBLIC_SITE_URL` to that exact HTTPS origin.
- Verify `/robots.txt`.
- Verify `/sitemap.xml`.
- Verify the generated `/opengraph-image` renders correctly.
- Inspect page titles and descriptions on Home, Consulting, Research, Selected Work, About, Contact and Privacy.
- Submit the sitemap to the selected search-engine webmaster tools after the domain is final.

## 4. Consultation intake checklist

The public form is intentionally a low-sensitivity intake channel.

Before enabling it in production:

- Configure the secure downstream webhook or CRM destination.
- If supported, configure `CONSULTATION_WEBHOOK_BEARER_TOKEN`.
- Confirm the downstream system does not log secrets or expose the token.
- Test valid submissions, malformed payloads, oversized payloads and destination downtime.
- Define who receives enquiries and the expected internal response process.
- Define retention and deletion policy for enquiry records.
- Keep borrower PII, raw customer records and confidential datasets out of the public form.

## 5. Security baseline

The website currently sends baseline response headers for:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone and geolocation

Do not add public compliance or certification badges unless the underlying certification exists and is approved for publication.

A strict Content Security Policy should be evaluated after the deployment stack, analytics and any third-party form destinations are finalized; adding one prematurely risks either breaking production or allowing overly broad sources.

## 6. Accessibility QA

The implementation includes skip navigation, visible focus states, minimum interaction sizes, reduced-motion support, responsive navigation and live form-status semantics.

Before launch, manually verify:

- Keyboard-only navigation from header through footer.
- Mobile menu open/close behavior and Escape handling.
- Focus visibility on every interactive control.
- Form labels, required fields and error/success announcements.
- 200% browser zoom without clipped content.
- Reduced-motion mode.
- Color contrast on blue, navy, mint and muted-text combinations.

## 7. Visual adaptation audit

Reference: `https://v0-optimus-delta.vercel.app/`

The site intentionally preserves the reference's design grammar rather than its product content:

| Reference pattern | CreditPassport adaptation |
| --- | --- |
| Oversized editorial hero | "Better decisions. Better credit systems." |
| Numbered capabilities | Six consulting capabilities |
| Three-step process | Diagnose → Design → Measure / broader consulting workflow |
| Dark infrastructure section | Decision Intelligence architecture |
| Integration ecosystem | Who we work with / institutional problem contexts |
| Security section | Evidence-based trust and operating standards |
| Developer content | CreditPassport Research |
| Testimonials / quantified proof | Withheld until client evidence and permission exist |
| Pricing | Replaced by consultation intake; no invented package pricing |
| Strong closing CTA | Decision-problem consultation CTA |

### Deliberate differences

- No fake client logos.
- No fabricated performance metrics.
- No unverified compliance badges.
- No SaaS pricing while consulting scope is still problem-dependent.
- Research is a first-class surface rather than a generic blog.

## 8. Final release gate

Do not call the site production-ready until all of the following are true:

- CI typecheck passes.
- CI production build passes.
- Vercel preview renders without runtime errors.
- Mobile navigation is manually checked.
- Final domain is configured.
- Consultation webhook is configured and tested.
- Privacy copy receives any required jurisdiction-specific legal review.
- At least one real case study has publication permission before any quantified outcome is promoted as proof.
