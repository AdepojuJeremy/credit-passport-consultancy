"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  campaignKeys,
  normalizeCampaignAttribution,
  normalizeMeasurementEvent,
  type CampaignAttribution,
  type MeasurementEventName,
} from "@/lib/measurement";

const campaignStorageKey = "creditpassport_campaign_v1";

type MeasurementMetadata = Record<string, string | undefined>;

export function getCampaignAttribution(): CampaignAttribution {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.sessionStorage.getItem(campaignStorageKey);
    if (!stored) return {};
    return normalizeCampaignAttribution(JSON.parse(stored));
  } catch {
    return {};
  }
}

function captureCampaignAttribution() {
  if (typeof window === "undefined") return;
  if (Object.keys(getCampaignAttribution()).length > 0) return;

  const params = new URLSearchParams(window.location.search);
  const raw: Record<string, string> = {};

  for (const key of campaignKeys) {
    const value = params.get(key);
    if (value) raw[key] = value;
  }

  const campaign = normalizeCampaignAttribution(raw);
  if (Object.keys(campaign).length === 0) return;

  try {
    window.sessionStorage.setItem(campaignStorageKey, JSON.stringify(campaign));
  } catch {
    // Measurement must never interfere with the core site journey.
  }
}

export function trackMeasurementEvent(event: MeasurementEventName, metadata: MeasurementMetadata = {}) {
  if (typeof window === "undefined") return;

  const cleanedMetadata = Object.fromEntries(
    Object.entries(metadata).filter((entry): entry is [string, string] => typeof entry[1] === "string" && Boolean(entry[1])),
  );

  void fetch("/api/measurement", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      path: window.location.pathname,
      campaign: getCampaignAttribution(),
      metadata: cleanedMetadata,
    }),
    keepalive: true,
  }).catch(() => undefined);
}

function deriveClickEvent(anchor: HTMLAnchorElement) {
  const rawHref = anchor.getAttribute("href");
  if (!rawHref || rawHref.startsWith("#")) return null;

  let url: URL;
  try {
    url = new URL(rawHref, window.location.origin);
  } catch {
    return null;
  }

  if (url.origin !== window.location.origin) return null;

  if (url.pathname === "/diagnostic") {
    return { event: "diagnostic_cta" as const, context: "diagnostic" };
  }

  if (url.pathname === "/contact") {
    return { event: "contact_cta" as const, context: url.searchParams.get("source") ?? "direct" };
  }

  if (url.pathname.startsWith("/sectors/")) {
    return { event: "sector_path" as const, context: url.pathname.split("/")[2] ?? "sector" };
  }

  if (url.pathname.startsWith("/consulting/")) {
    return { event: "service_path" as const, context: url.pathname.split("/")[2] ?? "service" };
  }

  return null;
}

export function MeasurementProvider() {
  const pathname = usePathname();

  useEffect(() => {
    captureCampaignAttribution();

    if (pathname === "/diagnostic") {
      trackMeasurementEvent("diagnostic_view");
    } else if (pathname === "/contact") {
      trackMeasurementEvent("consultation_form_view");
    }
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const derived = deriveClickEvent(anchor);
      if (!derived) return;

      const normalized = normalizeMeasurementEvent(derived.event);
      if (!normalized) return;

      trackMeasurementEvent(normalized, { context: derived.context });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
