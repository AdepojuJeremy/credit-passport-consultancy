export const campaignKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type CampaignKey = (typeof campaignKeys)[number];
export type CampaignAttribution = Partial<Record<CampaignKey, string>>;

export const measurementEventNames = [
  "diagnostic_view",
  "consultation_form_view",
  "diagnostic_cta",
  "contact_cta",
  "sector_path",
  "service_path",
  "consultation_submit_attempt",
  "consultation_submit_success",
  "consultation_submit_error",
] as const;

export type MeasurementEventName = (typeof measurementEventNames)[number];

export function cleanMeasurementString(value: unknown, maxLength = 200) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function normalizeCampaignAttribution(input: unknown): CampaignAttribution {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};

  const record = input as Record<string, unknown>;
  const normalized: CampaignAttribution = {};

  for (const key of campaignKeys) {
    const value = cleanMeasurementString(record[key], 160);
    if (value) normalized[key] = value;
  }

  return normalized;
}

export function normalizeMeasurementEvent(value: unknown): MeasurementEventName | null {
  if (typeof value !== "string") return null;
  return measurementEventNames.includes(value as MeasurementEventName)
    ? (value as MeasurementEventName)
    : null;
}
