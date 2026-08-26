export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const candidate = configured || (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000");
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`;

  return withProtocol.replace(/\/$/, "");
}
