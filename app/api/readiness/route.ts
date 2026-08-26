import { NextResponse } from "next/server";
import { getConfiguredSiteUrl, isIndexableDeployment } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export function GET() {
  const canonicalSiteUrlConfigured = Boolean(getConfiguredSiteUrl());
  const indexingEnabled = isIndexableDeployment();
  const consultationWebhookConfigured = Boolean(process.env.CONSULTATION_WEBHOOK_URL);
  const measurementWebhookConfigured = Boolean(process.env.MEASUREMENT_WEBHOOK_URL);
  const ready = canonicalSiteUrlConfigured && consultationWebhookConfigured;

  return NextResponse.json(
    {
      status: ready ? "ready" : "needs_configuration",
      checks: {
        siteUrlConfigured: canonicalSiteUrlConfigured,
        canonicalSiteUrlConfigured,
        indexingEnabled,
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
