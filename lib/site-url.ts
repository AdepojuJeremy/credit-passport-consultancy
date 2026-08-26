function normalizeSiteUrl(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return null;

  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;

  try {
    const parsed = new URL(withProtocol);
    const localHttp =
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1");

    if (parsed.protocol !== "https:" && !localHttp) return null;
    return parsed.origin.replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function getConfiguredSiteUrl() {
  return normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
}

export function getSiteUrl() {
  const configured = getConfiguredSiteUrl();
  if (configured) return configured;

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const fallback = vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000";

  return normalizeSiteUrl(fallback) ?? "http://localhost:3000";
}

export function isIndexableDeployment() {
  if (!getConfiguredSiteUrl()) return false;

  const vercelEnvironment = process.env.VERCEL_ENV?.trim();
  if (vercelEnvironment && vercelEnvironment !== "production") return false;

  return true;
}
