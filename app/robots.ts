import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexableDeployment } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableDeployment()) {
    return {
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        },
      ],
    };
  }

  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
