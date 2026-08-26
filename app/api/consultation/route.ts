import { NextResponse } from "next/server";
import { normalizeConsultationSourceContext } from "@/lib/consultation-context";
import { normalizeCampaignAttribution } from "@/lib/measurement";

const requiredFields = ["name", "email", "institution", "role", "institutionType", "problemType", "problem", "desiredOutcome"] as const;
const maxRequestBytes = 50_000;

type ConsultationPayload = Record<string, unknown>;

function cleanString(value: unknown, maxLength = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return NextResponse.json({ message: "The enquiry payload is too large." }, { status: 413 });
  }

  let body: ConsultationPayload;

  try {
    body = (await request.json()) as ConsultationPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request payload." }, { status: 400 });
  }

  if (cleanString(body.website)) {
    return NextResponse.json({ ok: true });
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
    return NextResponse.json({ message: "Please complete all required fields." }, { status: 400 });
  }

  if (!/^\S+@\S+\.\S+$/.test(cleaned.email)) {
    return NextResponse.json({ message: "Please provide a valid work email." }, { status: 400 });
  }

  const webhookUrl = process.env.CONSULTATION_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { message: "Online enquiry submission is not configured on this deployment yet." },
      { status: 503 },
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
    return NextResponse.json(
      { message: "The enquiry could not be delivered. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
