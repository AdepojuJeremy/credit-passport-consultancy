import { getSector, sectors } from "@/data/sectors";
import { getService, services } from "@/data/services";

export const consultationInstitutionTypes = [
  "Bank / Microfinance",
  "Digital lender / BNPL",
  "Fintech / Embedded credit",
  "Credit infrastructure / Data platform",
  "Other financial institution",
] as const;

export const consultationProblemTypes = [
  "Credit & underwriting strategy",
  "Decision intelligence",
  "Portfolio & risk analytics",
  "Data & financial intelligence",
  "AI & machine learning",
  "Decision & data infrastructure",
  "Not sure yet",
] as const;

const sectorInstitutionType: Record<string, (typeof consultationInstitutionTypes)[number]> = {
  "banks-microfinance": "Bank / Microfinance",
  "digital-lenders-bnpl": "Digital lender / BNPL",
  "fintech-embedded-credit": "Fintech / Embedded credit",
  "credit-infrastructure": "Credit infrastructure / Data platform",
};

const serviceProblemType: Record<string, (typeof consultationProblemTypes)[number]> = {
  "credit-underwriting-strategy": "Credit & underwriting strategy",
  "decision-intelligence": "Decision intelligence",
  "portfolio-risk-analytics": "Portfolio & risk analytics",
  "data-financial-intelligence": "Data & financial intelligence",
  "ai-machine-learning": "AI & machine learning",
  "decision-data-infrastructure": "Decision & data infrastructure",
};

const allowedFrom = new Set(["diagnostic", "consulting", "homepage", "direct"]);

type SearchValue = string | string[] | undefined;
type SearchParamsLike = Record<string, SearchValue>;

export type ConsultationContext = {
  contextLabel?: string;
  sourceContext: string;
  institutionType?: (typeof consultationInstitutionTypes)[number];
  problemType?: (typeof consultationProblemTypes)[number];
};

function firstString(value: SearchValue) {
  return Array.isArray(value) ? value[0] : value;
}

export function resolveConsultationContext(searchParams: SearchParamsLike): ConsultationContext {
  const from = firstString(searchParams.from);
  const sectorSlug = firstString(searchParams.sector);
  const serviceSlug = firstString(searchParams.service);

  const sector = sectorSlug ? getSector(sectorSlug) : undefined;
  const service = serviceSlug ? getService(serviceSlug) : undefined;
  const normalizedFrom = from && allowedFrom.has(from) ? from : undefined;

  const sourceTokens: string[] = [];
  if (normalizedFrom) sourceTokens.push(normalizedFrom);
  if (sector) sourceTokens.push(`sector:${sector.slug}`);
  if (service) sourceTokens.push(`service:${service.slug}`);

  const isDiagnostic = normalizedFrom === "diagnostic";
  let contextLabel: string | undefined;

  if (isDiagnostic && sector) {
    contextLabel = `Credit Decision Diagnostic · ${sector.title}`;
  } else if (isDiagnostic) {
    contextLabel = "Credit Decision Diagnostic";
  } else if (service && sector) {
    contextLabel = `${service.title} · ${sector.title}`;
  } else if (service) {
    contextLabel = service.title;
  } else if (sector) {
    contextLabel = sector.title;
  }

  return {
    contextLabel,
    sourceContext: sourceTokens.length ? sourceTokens.join("|") : "direct",
    institutionType: sector ? sectorInstitutionType[sector.slug] : undefined,
    problemType: service ? serviceProblemType[service.slug] : isDiagnostic ? "Not sure yet" : undefined,
  };
}

export function normalizeConsultationSourceContext(value: unknown) {
  if (typeof value !== "string") return "direct";

  const validTokens = new Set<string>([
    "direct",
    "diagnostic",
    "consulting",
    "homepage",
    ...sectors.map((sector) => `sector:${sector.slug}`),
    ...services.map((service) => `service:${service.slug}`),
  ]);

  const tokens = value
    .slice(0, 400)
    .split("|")
    .map((token) => token.trim())
    .filter((token, index, all) => validTokens.has(token) && all.indexOf(token) === index);

  return tokens.length ? tokens.join("|") : "direct";
}
