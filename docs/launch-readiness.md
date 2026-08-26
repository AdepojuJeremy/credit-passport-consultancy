# Launch Readiness

This document defines the final production boundary for the CreditPassport consultancy website.

## 1. Deployment target

Recommended hosting: Vercel with the repository connected directly.

- Production branch: `main`
- Preview deployments: pull requests or secondary Vercel projects
- Framework preset: Next.js
- Node.js: 22
- Build command: `npm run build`
- Typecheck: `npm run typecheck`

The repository targets Next.js 16.3.3 on the supported Next.js 16 Active LTS line.

## 2. Canonical production origin

Set this on the one deployment that should be treated as the public search/indexing authority:

```text
NEXT_PUBLIC_SITE_URL=https://<production-domain>
```

`NEXT_PUBLIC_SITE_URL` controls canonical absolute URLs, structured data, sitemap/robots output and whether the deployment opts into indexing.

A deployment without an explicit `NEXT_PUBLIC_SITE_URL` remains renderable but emits `noindex, nofollow` and a blocking `robots.txt`. Vercel Preview environments are also non-indexable even if an environment value is accidentally present.

This matters when more than one Vercel project receives `main`: only the chosen canonical production project should receive `NEXT_PUBLIC_SITE_URL` in its Production environment. Secondary projects can continue to render for QA without competing with the canonical site in search.

## 3. Consultation and measurement configuration

Production consultation intake requires:

```text
CONSULTATION_WEBHOOK_URL=https://<secure-intake-destination>
CONSULTATION_WEBHOOK_BEARER_TOKEN=<optional-secret>
```

Optional privacy-minimal conversion measurement uses:

```text
MEASUREMENT_WEBHOOK_URL=https://<approved-measurement-destination>
MEASUREMENT_WEBHOOK_BEARER_TOKEN=<optional-secret>
```

The public form is a low-sensitivity scoping channel. Keep borrower PII, raw customer records, credentials, API keys and confidential datasets out of it.

`GET /api/readiness` exposes boolean configuration state only. It does not expose URLs or tokens.

## 4. Production verification

Run the production smoke test against the exact canonical origin:

```bash
npm run verify:production -- https://<production-domain> --expect-ready --expect-indexable
```

The final smoke gate verifies:

- all core public routes,
- security headers and Content Security Policy,
- HSTS,
- Organization / WebSite / Service / Article / Breadcrumb structured data,
- detail-page canonicals on the tested canonical origin,
- `robots.txt`,
- `sitemap.xml`,
- Open Graph image output,
- runtime readiness, and
- canonical indexing state.

The same check is available through the manual **Production smoke** GitHub Actions workflow.

Run the public API negative-security boundary separately:

```bash
npm run verify:api-boundary -- https://<production-domain>
```

That verifier checks JSON media-type enforcement and cross-site / unmarked browser rejection without submitting a valid enquiry.

### Optional synthetic intake delivery

After the real consultation destination is configured, one explicit synthetic enquiry can be sent with:

```bash
npm run verify:production -- https://<production-domain> --expect-ready --expect-indexable --submit-intake
```

Confirm receipt at the actual downstream destination before treating public intake as operational.

## 5. Security baseline

The site sends a conservative static Content Security Policy compatible with the current statically optimized Next.js architecture. Client-side executable/data connections are restricted to the same origin; consultation and measurement webhooks are server-side and therefore require no browser CSP exception.

The response baseline includes:

- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling unused sensitive browser capabilities
- `Cross-Origin-Opener-Policy: same-origin`
- `X-DNS-Prefetch-Control: off`

The public consultation and measurement POST endpoints additionally enforce JSON-only requests, same-origin browser provenance, actual request-body byte limits, bounded fields and HTTPS webhook destinations.

Do not add public security/compliance certification badges unless the underlying certification exists and is approved for publication.

## 6. Accessibility and visual QA

The implementation includes skip navigation, visible focus states, minimum interaction sizes, reduced-motion support, responsive navigation and live form-status semantics.

Before announcing the site publicly, manually confirm on the canonical deployment:

- keyboard-only navigation from header through footer,
- mobile menu open/close behavior and Escape handling,
- focus visibility on interactive controls,
- form labels and error/success announcements,
- 200% browser zoom without clipped content,
- reduced-motion mode,
- representative mobile and desktop layouts, and
- no browser console/runtime errors on the primary conversion journey.

## 7. Content and evidence gate

The site may launch with anonymized Selected Work patterns marked **Evidence pending**.

A permissioned quantified client case study is **not** a technical launch requirement. The rule is instead:

- do not publish a numerical client outcome without reviewed evidence,
- do not identify a client without publication permission,
- keep internal targets labelled as targets rather than achievements, and
- keep practitioner research distinct from externally validated findings.

Privacy copy should receive jurisdiction-specific legal review where required by the actual deployment and data-handling arrangement.

## 8. Final release gate

The repository can be treated as launch-ready when:

- CI typecheck passes,
- CI production build passes,
- the canonical Vercel deployment renders successfully,
- `NEXT_PUBLIC_SITE_URL` is set only on the chosen public authority,
- `npm run verify:production -- <origin> --expect-ready --expect-indexable` passes,
- `npm run verify:api-boundary -- <origin>` passes,
- the consultation webhook is configured and a synthetic delivery is confirmed if public intake is being enabled immediately, and
- the manual mobile/keyboard conversion journey has been checked on the canonical deployment.

After this gate, new work should be treated as post-launch iteration rather than additional pre-launch feature scope.
