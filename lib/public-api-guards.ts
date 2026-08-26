export const browserRequestHeaderName = "X-CreditPassport-Request";
export const browserRequestHeaderValue = "browser";

export const publicApiResponseHeaders = {
  "Cache-Control": "no-store",
  Vary: "Origin, Referer, Sec-Fetch-Site",
} as const;

type GuardFailure = {
  ok: false;
  status: 403 | 415;
  message: string;
};

type GuardResult = { ok: true } | GuardFailure;

function sameOrigin(value: string, targetOrigin: string) {
  try {
    return new URL(value).origin === targetOrigin;
  } catch {
    return false;
  }
}

export function guardPublicJsonRequest(request: Request): GuardResult {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return {
      ok: false,
      status: 415,
      message: "This endpoint accepts application/json requests only.",
    };
  }

  const targetOrigin = new URL(request.url).origin;
  const fetchSite = request.headers.get("sec-fetch-site")?.toLowerCase();

  if (fetchSite === "cross-site" || fetchSite === "same-site") {
    return {
      ok: false,
      status: 403,
      message: "Cross-origin requests are not accepted.",
    };
  }

  const origin = request.headers.get("origin");
  if (origin && !sameOrigin(origin, targetOrigin)) {
    return {
      ok: false,
      status: 403,
      message: "Cross-origin requests are not accepted.",
    };
  }

  const referer = request.headers.get("referer");
  if (!origin && referer && !sameOrigin(referer, targetOrigin)) {
    return {
      ok: false,
      status: 403,
      message: "Cross-origin requests are not accepted.",
    };
  }

  // Same-origin browser requests carry an explicit non-simple header. Cross-origin
  // JavaScript cannot send this header without a successful CORS preflight, and
  // these public endpoints do not opt into cross-origin access.
  if (
    fetchSite === "same-origin" &&
    request.headers.get(browserRequestHeaderName) !== browserRequestHeaderValue
  ) {
    return {
      ok: false,
      status: 403,
      message: "Request provenance could not be verified.",
    };
  }

  // Server-to-server launch verification may not include browser provenance
  // headers. Those requests are still subject to strict JSON, size and field
  // validation in the endpoint itself.
  return { ok: true };
}

export function getWebhookUrl(value: string | undefined) {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    const localHttp =
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1");

    if (parsed.protocol !== "https:" && !localHttp) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
