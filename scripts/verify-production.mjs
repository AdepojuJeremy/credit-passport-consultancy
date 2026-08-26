#!/usr/bin/env node

const args = process.argv.slice(2);
const flags = new Set(args.filter((arg) => arg.startsWith("--")));
const originArg = args.find((arg) => !arg.startsWith("--")) || process.env.PRODUCTION_ORIGIN;

if (!originArg) {
  console.error(
    "Usage: npm run verify:production -- https://example.com [--expect-ready] [--expect-indexable] [--submit-intake]",
  );
  process.exit(2);
}

let origin;
try {
  const parsed = new URL(originArg);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("unsupported protocol");
  origin = parsed.origin;
} catch {
  console.error(`Invalid production origin: ${originArg}`);
  process.exit(2);
}

const expectReady = flags.has("--expect-ready");
const expectIndexable = flags.has("--expect-indexable");
const submitIntake = flags.has("--submit-intake");
const failures = [];
const warnings = [];
const passes = [];

function pass(label) {
  passes.push(label);
  console.log(`PASS  ${label}`);
}

function fail(label, detail) {
  failures.push({ label, detail });
  console.error(`FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
}

function warn(label, detail) {
  warnings.push({ label, detail });
  console.warn(`WARN  ${label}${detail ? ` — ${detail}` : ""}`);
}

async function request(path, options = {}) {
  const { headers, ...rest } = options;

  return fetch(`${origin}${path}`, {
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    ...rest,
    headers: {
      "User-Agent": "CreditPassport-Production-Smoke/1.0",
      ...(headers || {}),
    },
  });
}

async function checkRoute(path) {
  try {
    const response = await request(path);
    if (!response.ok) {
      fail(`GET ${path}`, `HTTP ${response.status}`);
      return null;
    }
    pass(`GET ${path}`);
    return response;
  } catch (error) {
    fail(`GET ${path}`, error instanceof Error ? error.message : String(error));
    return null;
  }
}

function hasCanonical(html, expectedPath) {
  const linkTags = html.match(/<link\b[^>]*>/gi) || [];
  return linkTags.some((tag) => {
    const isCanonical = /rel=["']canonical["']/i.test(tag);
    const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
    if (!isCanonical || !hrefMatch) return false;

    try {
      const canonical = new URL(hrefMatch[1], origin);
      const pathMatches = canonical.pathname === expectedPath;
      const originMatches = !expectIndexable || canonical.origin === origin;
      return pathMatches && originMatches;
    } catch {
      return false;
    }
  });
}

async function checkSeoPage(path, schemaTypes, { canonical = true } = {}) {
  try {
    const response = await request(path);
    const html = await response.text();

    if (!response.ok) {
      fail(`SEO ${path}`, `HTTP ${response.status}`);
      return;
    }

    for (const type of schemaTypes) {
      if (html.includes(`\"@type\":\"${type}\"`)) pass(`${path} JSON-LD ${type}`);
      else fail(`${path} JSON-LD ${type}`, "schema type missing from rendered HTML");
    }

    if (canonical) {
      if (hasCanonical(html, path)) pass(`${path} canonical`);
      else {
        fail(
          `${path} canonical`,
          expectIndexable
            ? "canonical link missing, has the wrong path, or points to a different origin"
            : "canonical link missing or points to another path",
        );
      }
    }
  } catch (error) {
    fail(`SEO ${path}`, error instanceof Error ? error.message : String(error));
  }
}

console.log(`\nCreditPassport production verification\nOrigin: ${origin}\n`);

if (expectIndexable && !origin.startsWith("https://")) {
  fail("canonical origin protocol", "indexable production must use HTTPS");
}

const publicRoutes = [
  "/",
  "/consulting",
  "/diagnostic",
  "/sectors",
  "/research",
  "/case-studies",
  "/about",
  "/contact",
  "/privacy",
];

let homeResponse = null;
for (const path of publicRoutes) {
  const response = await checkRoute(path);
  if (path === "/") homeResponse = response;
}

if (homeResponse) {
  const expectedHeaders = {
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "referrer-policy": "strict-origin-when-cross-origin",
    "permissions-policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "cross-origin-opener-policy": "same-origin",
    "x-dns-prefetch-control": "off",
  };

  for (const [name, expected] of Object.entries(expectedHeaders)) {
    const actual = homeResponse.headers.get(name);
    if (actual === expected) pass(`security header ${name}`);
    else fail(`security header ${name}`, `expected ${JSON.stringify(expected)}, received ${JSON.stringify(actual)}`);
  }

  const hsts = homeResponse.headers.get("strict-transport-security") || "";
  if (/max-age=\d+/i.test(hsts)) pass("security header strict-transport-security");
  else fail("security header strict-transport-security", `missing max-age; received ${JSON.stringify(hsts)}`);

  const csp = homeResponse.headers.get("content-security-policy") || "";
  const requiredCspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ];
  const missingDirectives = requiredCspDirectives.filter((directive) => !csp.includes(directive));
  if (missingDirectives.length) {
    fail("Content-Security-Policy", `missing ${missingDirectives.join(", ")}`);
  } else {
    pass("Content-Security-Policy");
  }

  const robotsHeader = homeResponse.headers.get("x-robots-tag") || "";
  const headerNoindex = /\bnoindex\b/i.test(robotsHeader);
  if (expectIndexable && headerNoindex) {
    fail("X-Robots-Tag", `canonical origin is marked noindex: ${robotsHeader}`);
  } else if (expectIndexable) {
    pass("canonical origin is not marked noindex");
  } else if (headerNoindex) {
    warn("X-Robots-Tag", "deployment is intentionally non-indexable");
  }
}

await checkSeoPage("/", ["Organization", "WebSite"], { canonical: false });
await checkSeoPage("/diagnostic", ["Service", "BreadcrumbList"]);
await checkSeoPage("/consulting/decision-intelligence", ["Service", "BreadcrumbList"]);
await checkSeoPage("/research/probability-is-not-a-decision", ["Article", "BreadcrumbList"]);
await checkSeoPage("/sectors/digital-lenders-bnpl", ["BreadcrumbList"]);
await checkSeoPage("/case-studies/decision-system-reconstruction", ["BreadcrumbList"]);

try {
  const robots = await request("/robots.txt");
  const text = await robots.text();
  const hasSitemap = /^Sitemap:/im.test(text);

  if (!robots.ok) {
    fail("robots.txt", `HTTP ${robots.status}`);
  } else if (expectIndexable) {
    if (!hasSitemap) fail("robots.txt indexing", "canonical production origin has no sitemap reference");
    else pass("robots.txt advertises canonical sitemap");
  } else if (hasSitemap) {
    pass("robots.txt includes sitemap reference");
  } else {
    warn("robots.txt indexing", "secondary deployment intentionally omits sitemap advertisement");
  }
} catch (error) {
  fail("robots.txt", error instanceof Error ? error.message : String(error));
}

try {
  const sitemap = await request("/sitemap.xml");
  const text = await sitemap.text();
  const requiredEntries = ["/diagnostic", "/sectors", "/contact", "/research", "/case-studies"];
  if (!sitemap.ok) {
    fail("sitemap.xml", `HTTP ${sitemap.status}`);
  } else {
    const missing = requiredEntries.filter((entry) => !text.includes(entry));
    if (missing.length) fail("sitemap.xml", `missing ${missing.join(", ")}`);
    else pass("sitemap.xml contains core public routes");
  }
} catch (error) {
  fail("sitemap.xml", error instanceof Error ? error.message : String(error));
}

try {
  const image = await request("/opengraph-image");
  const contentType = image.headers.get("content-type") || "";
  if (!image.ok) fail("Open Graph image", `HTTP ${image.status}`);
  else if (!contentType.startsWith("image/")) fail("Open Graph image", `unexpected content-type ${contentType || "none"}`);
  else pass("Open Graph image");
} catch (error) {
  fail("Open Graph image", error instanceof Error ? error.message : String(error));
}

try {
  const readiness = await request("/api/readiness");
  const payload = await readiness.json().catch(() => null);
  const status = payload?.status;
  const checks = payload?.checks;

  if (readiness.ok && status === "ready") {
    pass("runtime readiness");
  } else if (expectReady) {
    fail("runtime readiness", `HTTP ${readiness.status}; ${JSON.stringify(payload)}`);
  } else {
    warn("runtime readiness", `HTTP ${readiness.status}; ${JSON.stringify(payload)}`);
  }

  if (checks && typeof checks === "object") {
    console.log(`      canonical site URL: ${checks.canonicalSiteUrlConfigured ? "configured" : "missing"}`);
    console.log(`      indexing: ${checks.indexingEnabled ? "enabled" : "disabled"}`);
    console.log(`      consultation webhook: ${checks.consultationWebhookConfigured ? "configured" : "missing"}`);
    console.log(`      measurement webhook: ${checks.measurementWebhookConfigured ? "configured" : "optional / missing"}`);

    if (expectIndexable && checks.indexingEnabled !== true) {
      fail("runtime indexing readiness", "deployment does not report indexing enabled");
    } else if (expectIndexable) {
      pass("runtime indexing readiness");
    }
  }
} catch (error) {
  fail("runtime readiness", error instanceof Error ? error.message : String(error));
}

if (submitIntake) {
  console.log("\nSynthetic consultation delivery is enabled for this run.");
  try {
    const response = await request("/api/consultation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "CreditPassport Launch Check",
        email: "synthetic-launch-check@example.com",
        institution: "CreditPassport synthetic verification",
        role: "Launch verification",
        institutionType: "Other financial institution",
        problemType: "Not sure yet",
        problem: "Synthetic production intake verification only. No borrower or customer data is included.",
        dataAvailable: "No production data. Synthetic launch verification only.",
        desiredOutcome: "Confirm that the configured consultation destination receives the production website payload.",
        sourceContext: "diagnostic",
        campaign: {
          utm_source: "launch-smoke-test",
          utm_medium: "synthetic",
          utm_campaign: "production-verification",
        },
        website: "",
      }),
    });

    const body = await response.text();
    if (response.ok) pass("synthetic consultation delivery");
    else fail("synthetic consultation delivery", `HTTP ${response.status}; ${body.slice(0, 300)}`);
  } catch (error) {
    fail("synthetic consultation delivery", error instanceof Error ? error.message : String(error));
  }
}

console.log(`\nSummary: ${passes.length} passed, ${warnings.length} warnings, ${failures.length} failed.`);

if (warnings.length) {
  console.log("Warnings:");
  for (const item of warnings) console.log(`- ${item.label}: ${item.detail}`);
}

if (failures.length) {
  console.log("Failures:");
  for (const item of failures) console.log(`- ${item.label}: ${item.detail}`);
  process.exit(1);
}
