#!/usr/bin/env node

const originArg = process.argv[2] || process.env.PRODUCTION_ORIGIN;

if (!originArg) {
  console.error("Usage: npm run verify:api-boundary -- https://example.com");
  process.exit(2);
}

let origin;
try {
  const parsed = new URL(originArg);
  if (!/^https?:$/.test(parsed.protocol)) throw new Error("unsupported protocol");
  origin = parsed.origin;
} catch {
  console.error(`Invalid origin: ${originArg}`);
  process.exit(2);
}

const failures = [];
const passes = [];

function pass(label) {
  passes.push(label);
  console.log(`PASS  ${label}`);
}

function fail(label, detail) {
  failures.push({ label, detail });
  console.error(`FAIL  ${label} — ${detail}`);
}

async function expectStatus(label, path, expectedStatus, options) {
  try {
    const response = await fetch(`${origin}${path}`, {
      redirect: "manual",
      signal: AbortSignal.timeout(15_000),
      ...options,
    });

    if (response.status === expectedStatus) pass(label);
    else fail(label, `expected HTTP ${expectedStatus}, received ${response.status}`);
  } catch (error) {
    fail(label, error instanceof Error ? error.message : String(error));
  }
}

console.log(`\nCreditPassport public API boundary verification\nOrigin: ${origin}\n`);

for (const path of ["/api/consultation", "/api/measurement"]) {
  await expectStatus(
    `${path} rejects non-JSON media type`,
    path,
    415,
    {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "{}",
    },
  );

  await expectStatus(
    `${path} rejects cross-site browser request`,
    path,
    403,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://attacker.invalid",
        "Sec-Fetch-Site": "cross-site",
      },
      body: "{}",
    },
  );

  await expectStatus(
    `${path} rejects unmarked same-origin browser request`,
    path,
    403,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
        "Sec-Fetch-Site": "same-origin",
      },
      body: "{}",
    },
  );
}

console.log(`\nSummary: ${passes.length} passed, ${failures.length} failed.`);

if (failures.length) {
  for (const item of failures) console.log(`- ${item.label}: ${item.detail}`);
  process.exit(1);
}
