import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const siteUrlConfigured = Boolean(
    process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL,
  );
  const consultationWebhookConfigured = Boolean(process.env.CONSULTATION_WEBHOOK_URL);
  const measurementWebhookConfigured = Boolean(process.env.MEASUREMENT_WEBHOOK_URL);
  const ready = siteUrlConfigured && consultationWebhookConfigured;

  return NextResponse.json(
    {
      status: ready ? "ready" : "needs_configuration",
      checks: {
        siteUrlConfigured,
        consultationWebhookConfigured,
        measurementWebhookConfigured,
      },
    },
    {
      status: ready ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
