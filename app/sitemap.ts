import type { MetadataRoute } from "next";
import { engagementPatterns } from "@/data/engagement-patterns";
import { researchPosts } from "@/data/research-posts";
import { services } from "@/data/services";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes = ["", "/consulting", "/research", "/case-studies", "/about", "/contact", "/privacy"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${baseUrl}/consulting/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...researchPosts.map((post) => ({
      url: `${baseUrl}/research/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...engagementPatterns.map((pattern) => ({
      url: `${baseUrl}/case-studies/${pattern.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
