import { NextResponse } from "next/server";
import {
  cleanMeasurementString,
  normalizeCampaignAttribution,
  normalizeMeasurementEvent,
} from "@/lib/measurement";
import {
  getWebhookUrl,
  guardPublicJsonRequest,
  publicApiResponseHeaders,
  readBoundedJsonBody,
} from "@/lib/public-api-guards";

const maxRequestBytes = 12_000;
const allowedMetadataKeys = ["context", "sourceContext", "result"] as const;

function cleanMetadata(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const record = value as Record<string, unknown>;
  return Object.fromEntries(
    allowedMetadataKeys.flatMap((key) => {
      const cleaned = cleanMeasurementString(record[key], 200);
      return cleaned ? [[key, cleaned]] : [];
    }),
  );
}

function jsonResponse(payload: object, status: number) {
  return NextResponse.json(payload, {
    status,
    headers: publicApiResponseHeaders,
  });
}

function emptyResponse(status = 204) {
  return new Response(null, {
    status,
    headers: publicApiResponseHeaders,
  });
}

export async function POST(request: Request) {
  const guard = guardPublicJsonRequest(request);
  if (!guard.ok) {
    return jsonResponse({ message: guard.message }, guard.status);
  }

  const parsed = await readBoundedJsonBody(request, maxRequestBytes);
  if (!parsed.ok) {
    return parsed.reason === "too_large"
      ? jsonResponse({ message: "Measurement payload is too large." }, 413)
      : jsonResponse({ message: "Invalid measurement payload." }, 400);
  }

  const body = parsed.body;
  const event = normalizeMeasurementEvent(body.event);
  if (!event) {
    return jsonResponse({ message: "Unknown measurement event." }, 400);
  }

  const payload = {
    source: "credit-passport-consultancy",
    event,
    path: cleanMeasurementString(body.path, 240),
    campaign: normalizeCampaignAttribution(body.campaign),
    metadata: cleanMetadata(body.metadata),
    submittedAt: new Date().toISOString(),
  };

  const configuredWebhook = process.env.MEASUREMENT_WEBHOOK_URL;
  if (!configuredWebhook) {
    return emptyResponse();
  }

  const webhookUrl = getWebhookUrl(configuredWebhook);
  if (!webhookUrl) {
    return jsonResponse({ message: "Measurement delivery is not configured correctly." }, 503);
  }

  const headers = new Headers({ "Content-Type": "application/json" });
  if (process.env.MEASUREMENT_WEBHOOK_BEARER_TOKEN) {
    headers.set("Authorization", `Bearer ${process.env.MEASUREMENT_WEBHOOK_BEARER_TOKEN}`);
  }

  const upstream = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
    signal: AbortSignal.timeout(4_000),
  }).catch(() => null);

  if (!upstream?.ok) {
    return jsonResponse({ message: "Measurement delivery failed." }, 502);
  }

  return emptyResponse();
}
