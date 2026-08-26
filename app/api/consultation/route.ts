import { NextResponse } from "next/server";
import { normalizeConsultationSourceContext } from "@/lib/consultation-context";
import { normalizeCampaignAttribution } from "@/lib/measurement";
import {
  getWebhookUrl,
  guardPublicJsonRequest,
  publicApiResponseHeaders,
} from "@/lib/public-api-guards";

const requiredFields = ["name", "email", "institution", "role", "institutionType", "problemType", "problem", "desiredOutcome"] as const;
const maxRequestBytes = 50_000;

type ConsultationPayload = Record<string, unknown>;

function cleanString(value: unknown, maxLength = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function jsonResponse(payload: object, status = 200) {
  return NextResponse.json(payload, {
    status,
    headers: publicApiResponseHeaders,
  });
}

export async function POST(request: Request) {
  const guard = guardPublicJsonRequest(request);
  if (!guard.ok) {
    return jsonResponse({ message: guard.message }, guard.status);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return jsonResponse({ message: "The enquiry payload is too large." }, 413);
  }

  let body: ConsultationPayload;

  try {
    body = (await request.json()) as ConsultationPayload;
  } catch {
    return jsonResponse({ message: "Invalid request payload." }, 400);
  }

  if (cleanString(body.website)) {
    return jsonResponse({ ok: true });
  }

  const cleaned = {
    name: cleanString(body.name, 160),
    email: cleanString(body.email, 240),
    institution: cleanString(body.institution, 240),
    role: cleanString(body.role, 200),
    institutionType: cleanString(body.institutionType, 200),
    problemType: cleanString(body.problemType, 200),
    problem: cleanString(body.problem),
    dataAvailable: cleanString(body.dataAvailable),
    desiredOutcome: cleanString(body.desiredOutcome),
    sourceContext: normalizeConsultationSourceContext(body.sourceContext),
    campaign: normalizeCampaignAttribution(body.campaign),
  };

  const missing = requiredFields.filter((field) => !cleaned[field]);
  if (missing.length) {
    return jsonResponse({ message: "Please complete all required fields." }, 400);
  }

  if (!/^\S+@\S+\.\S+$/.test(cleaned.email)) {
    return jsonResponse({ message: "Please provide a valid work email." }, 400);
  }

  const webhookUrl = getWebhookUrl(process.env.CONSULTATION_WEBHOOK_URL);
  if (!webhookUrl) {
    return jsonResponse(
      { message: "Online enquiry submission is not configured on this deployment yet." },
      503,
    );
  }

  const headers = new Headers({ "Content-Type": "application/json" });
  if (process.env.CONSULTATION_WEBHOOK_BEARER_TOKEN) {
    headers.set("Authorization", `Bearer ${process.env.CONSULTATION_WEBHOOK_BEARER_TOKEN}`);
  }

  const upstream = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      source: "credit-passport-consultancy",
      submittedAt: new Date().toISOString(),
      ...cleaned,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null);

  if (!upstream?.ok) {
    return jsonResponse(
      { message: "The enquiry could not be delivered. Please try again later." },
      502,
    );
  }

  return jsonResponse({ ok: true });
}
