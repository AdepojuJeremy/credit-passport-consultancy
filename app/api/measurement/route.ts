import { NextResponse } from "next/server";
import {
  cleanMeasurementString,
  normalizeCampaignAttribution,
  normalizeMeasurementEvent,
} from "@/lib/measurement";

const maxRequestBytes = 12_000;
const allowedMetadataKeys = ["context", "sourceContext", "result"] as const;

type MeasurementPayload = Record<string, unknown>;

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

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return NextResponse.json({ message: "Measurement payload is too large." }, { status: 413 });
  }

  let body: MeasurementPayload;
  try {
    body = (await request.json()) as MeasurementPayload;
  } catch {
    return NextResponse.json({ message: "Invalid measurement payload." }, { status: 400 });
  }

  const event = normalizeMeasurementEvent(body.event);
  if (!event) {
    return NextResponse.json({ message: "Unknown measurement event." }, { status: 400 });
  }

  const payload = {
    source: "credit-passport-consultancy",
    event,
    path: cleanMeasurementString(body.path, 240),
    campaign: normalizeCampaignAttribution(body.campaign),
    metadata: cleanMetadata(body.metadata),
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.MEASUREMENT_WEBHOOK_URL;
  if (!webhookUrl) {
    return new Response(null, { status: 204 });
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
    return NextResponse.json({ message: "Measurement delivery failed." }, { status: 502 });
  }

  return new Response(null, { status: 204 });
}
