# Measurement and intake operations

This document defines the current public-site funnel measurement, consultation delivery and production-verification model.

## Objectives

The measurement layer exists to answer a small set of commercial questions without turning the site into a general behavioral-tracking system:

- Are qualified visitors entering the Credit Decision Diagnostic?
- Are visitors moving into sector and capability routes?
- How many visitors reach the consultation form?
- How many consultation submissions succeed or fail?
- Which explicitly tagged campaigns contribute to those conversion events?

## Event taxonomy

The site emits only named funnel events:

- `diagnostic_view`
- `consultation_form_view`
- `diagnostic_cta`
- `contact_cta`
- `sector_path`
- `service_path`
- `consultation_submit_attempt`
- `consultation_submit_success`
- `consultation_submit_error`

The measurement endpoint does not receive consultation-form text, names, email addresses, institution names or free-form decision-problem content.

## Campaign attribution

The site recognizes only these URL parameters:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Attribution is first-touch within the current browser tab/session. Values are stored in `sessionStorage`, not cookies, and are length-bounded before server-side forwarding.

The implementation does not collect arbitrary referrer URLs, cross-session identifiers, fingerprinting data or a full page-view history.

## Destinations

Consultation submissions and conversion measurement use separate server-side destinations.

```text
CONSULTATION_WEBHOOK_URL=
CONSULTATION_WEBHOOK_BEARER_TOKEN=
MEASUREMENT_WEBHOOK_URL=
MEASUREMENT_WEBHOOK_BEARER_TOKEN=
```

`MEASUREMENT_WEBHOOK_URL` is optional. When it is unset, the site accepts measurement events and discards them with a `204` response so conversion tracking cannot break the user journey.

`CONSULTATION_WEBHOOK_URL` is required for a functional public intake form.

Webhook destinations must use HTTPS in deployed environments. Plain HTTP is accepted only for `localhost` / `127.0.0.1` development endpoints.

## Public POST boundary

`/api/consultation` and `/api/measurement` use the same stateless request boundary before any payload is processed.

The boundary:

- accepts `application/json` only,
- rejects browser requests identified as `cross-site` or `same-site` by Fetch Metadata,
- verifies `Origin` or `Referer` against the request origin when those headers are present,
- requires same-origin browser JavaScript to send the non-simple `X-CreditPassport-Request: browser` header,
- does not opt into cross-origin CORS access,
- returns `Cache-Control: no-store`,
- varies responses on request-provenance headers, and
- enforces request-size limits against the actual UTF-8 body before JSON parsing, not only the declared `Content-Length`.

The custom browser header is not a secret. Its purpose is to ensure a browser request must satisfy the same-origin/CORS boundary before it can reach the endpoint with the expected request shape.

Server-to-server launch verification may omit browser provenance headers. Those calls remain subject to JSON media-type checks, byte limits, field normalization and endpoint-specific validation.

A dependency-free boundary check is available after deployment:

```bash
npm run verify:api-boundary -- https://your-production-origin.example
```

It performs only negative/security checks and does not submit a valid consultation or create a measurement conversion event.

## Runtime readiness

`GET /api/readiness` reports only boolean configuration state; it never returns webhook URLs or bearer tokens.

The deployment is considered ready for public consultation intake when:

- a production site URL is available, and
- the consultation webhook is configured.

On Vercel, the application can use `VERCEL_PROJECT_PRODUCTION_URL` as the production-site URL. `NEXT_PUBLIC_SITE_URL` remains available as an explicit override for custom hosting or a deliberately chosen canonical origin.

The measurement webhook is reported separately because measurement is optional.

Expected ready response:

```json
{
  "status": "ready",
  "checks": {
    "siteUrlConfigured": true,
    "consultationWebhookConfigured": true,
    "measurementWebhookConfigured": true
  }
}
```

A missing required runtime value returns HTTP `503` with `status: "needs_configuration"`.

## Vercel handoff

The durable production setup should use Vercel Git integration rather than an ad-hoc file deployment.

1. Import `AdepojuJeremy/credit-passport-consultancy` into the intended Vercel team.
2. Keep the repository root as the project root and allow Vercel to detect Next.js.
3. Use `main` as the production branch.
4. Configure `CONSULTATION_WEBHOOK_URL` for Production. Add `CONSULTATION_WEBHOOK_BEARER_TOKEN` only if the destination requires it.
5. Configure `MEASUREMENT_WEBHOOK_URL` and its bearer token only if a measurement destination has been approved.
6. Deploy `main`.
7. Run the production smoke verification below before treating the intake as live.

The current connected Vercel automation surface does not expose a working Git-import/project-creation action, so the initial Git import is a one-time Vercel dashboard action. Subsequent pushes to `main` should use the normal Git deployment path.

## Production smoke verification

The repository contains a dependency-free Node 22 smoke test.

Basic public-site verification:

```bash
npm run verify:production -- https://your-production-origin.example
```

Require the runtime to report fully ready:

```bash
npm run verify:production -- https://your-production-origin.example --expect-ready
```

The smoke test checks:

- homepage, Consulting, Diagnostic, Sectors, Research, Selected Work, About, Contact and Privacy routes,
- `robots.txt`,
- `sitemap.xml`,
- the generated Open Graph image,
- the configured security headers, and
- `/api/readiness`.

A manual GitHub Actions workflow named **Production smoke** exposes the same test through `workflow_dispatch`, so production can be checked without a local environment.

## Synthetic end-to-end intake test

Use synthetic institutional information only. Do not use a real borrower or confidential client dataset.

The production verifier can intentionally submit one safe synthetic enquiry:

```bash
npm run verify:production -- https://your-production-origin.example --expect-ready --submit-intake
```

`--submit-intake` is deliberately opt-in because it sends a real request through the configured `CONSULTATION_WEBHOOK_URL`.

The synthetic payload identifies itself as launch verification, contains no borrower/customer data and includes a synthetic UTM campaign.

After running it, confirm the consultation destination receives:

- the synthetic form fields,
- normalized `sourceContext`,
- the bounded campaign object,
- `source: credit-passport-consultancy`, and
- `submittedAt`.

If measurement is configured, confirm the measurement destination receives the expected conversion events and does **not** receive form text.

## Manual browser confirmation

After the automated smoke test passes:

1. Open a new browser tab with a tagged URL such as `/diagnostic?utm_source=launch-test&utm_medium=manual&utm_campaign=intake-e2e`.
2. Move from the Diagnostic to the consultation form.
3. Confirm the form preserves recognized CreditPassport context.
4. Confirm the public form contains no request for borrower PII or confidential production data.
5. Check desktop and mobile navigation, focus states and the final CTA journey.

## Operational review before launch

Before treating the site as production-ready, define who owns:

- consultation triage,
- webhook/CRM access,
- failed-delivery investigation,
- retention/deletion policy,
- measurement destination access,
- campaign naming conventions, and
- jurisdiction-specific privacy/legal review.

No quantified conversion benchmark should be published until enough real traffic exists to support it.
