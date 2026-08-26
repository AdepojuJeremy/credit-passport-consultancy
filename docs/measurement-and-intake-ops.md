# Measurement and intake operations

This document defines the current public-site funnel measurement and consultation delivery model.

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

## Runtime readiness

`GET /api/readiness` reports only boolean configuration state; it never returns webhook URLs or bearer tokens.

The deployment is considered ready for public consultation intake when:

- a production site URL is configured, and
- the consultation webhook is configured.

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

## End-to-end launch test

Use synthetic institutional information only. Do not use a real borrower or confidential client dataset.

1. Open a new browser tab with a tagged URL such as:

   `/diagnostic?utm_source=launch-test&utm_medium=manual&utm_campaign=intake-e2e`

2. Move from the Diagnostic to the consultation form.
3. Confirm the form preserves recognized CreditPassport context.
4. Submit a synthetic enquiry containing no borrower PII or confidential production information.
5. Confirm the consultation destination receives:
   - the form fields,
   - normalized `sourceContext`,
   - the bounded campaign object,
   - `source: credit-passport-consultancy`, and
   - `submittedAt`.
6. If measurement is configured, confirm the measurement destination receives the expected conversion sequence and does **not** receive form text.
7. Confirm `/api/readiness` returns HTTP `200` after production environment configuration.

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
