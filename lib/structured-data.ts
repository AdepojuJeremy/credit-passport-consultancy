import type { ResearchPost } from "@/data/research-posts";
import type { Service } from "@/data/services";
import { getSiteUrl } from "@/lib/site-url";

const organizationId = `${getSiteUrl()}/#organization`;

export function absoluteSiteUrl(path = "/") {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function siteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: "CreditPassport Consulting",
        url: absoluteSiteUrl("/"),
        logo: absoluteSiteUrl("/brand/logo_primary.svg"),
        description:
          "Credit strategy, decision intelligence, risk analytics, financial data, AI and research for lenders and financial institutions.",
        areaServed: {
          "@type": "Place",
          name: "Africa",
        },
        founder: [
          { "@type": "Person", name: "Michael Udeh" },
          { "@type": "Person", name: "Jeremiah Adepoju" },
        ],
        knowsAbout: [
          "Credit strategy",
          "Underwriting",
          "Decision intelligence",
          "Portfolio risk analytics",
          "Financial data intelligence",
          "Artificial intelligence",
          "Machine learning",
          "Decision science",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        url: absoluteSiteUrl("/"),
        name: "CreditPassport Consulting",
        description:
          "Consulting and practitioner research for better lending and financial decision systems.",
        publisher: { "@id": organizationId },
        inLanguage: "en",
      },
    ],
  };
}

export function breadcrumbStructuredData(
  items: ReadonlyArray<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function serviceStructuredData(
  service: Pick<Service, "slug" | "title" | "description">,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteSiteUrl(`/consulting/${service.slug}`)}#service`,
    name: service.title,
    description: service.description,
    url: absoluteSiteUrl(`/consulting/${service.slug}`),
    serviceType: service.title,
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Place",
      name: "Africa",
    },
  };
}

export function diagnosticStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteSiteUrl("/diagnostic")}#service`,
    name: "Credit Decision Diagnostic",
    description:
      "A structured review of the system behind a lending decision: policy, data, workflow, models, infrastructure and the evidence connecting decisions to outcomes.",
    url: absoluteSiteUrl("/diagnostic"),
    serviceType: "Credit decision diagnostic",
    provider: { "@id": organizationId },
    areaServed: {
      "@type": "Place",
      name: "Africa",
    },
  };
}

export function researchArticleStructuredData(post: ResearchPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteSiteUrl(`/research/${post.slug}`)}#article`,
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    mainEntityOfPage: absoluteSiteUrl(`/research/${post.slug}`),
    url: absoluteSiteUrl(`/research/${post.slug}`),
    articleSection: post.category,
    genre: "Practitioner research note",
    keywords: post.keywords.join(", "),
    citation: post.references.map((reference) => reference.url),
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: "CreditPassport Research",
      url: absoluteSiteUrl("/research"),
    },
    publisher: { "@id": organizationId },
    image: absoluteSiteUrl("/opengraph-image"),
  };
}
