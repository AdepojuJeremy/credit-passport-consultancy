import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { getResearchPost, researchPosts } from "@/data/research-posts";
import { getService } from "@/data/services";
import { breadcrumbStructuredData, researchArticleStructuredData } from "@/lib/structured-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return researchPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) return {};

  const canonical = `/research/${post.slug}`;

  return {
    title: post.title,
    description: post.dek,
    keywords: [...post.keywords],
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      url: canonical,
      publishedTime: post.date,
      section: post.category,
    },
  };
}

export default async function ResearchPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) notFound();

  const relatedPosts = post.relatedSlugs.flatMap((relatedSlug) => {
    const related = getResearchPost(relatedSlug);
    return related ? [related] : [];
  });

  const relatedServices = post.consultingSlugs.flatMap((serviceSlug) => {
    const service = getService(serviceSlug);
    return service ? [service] : [];
  });

  return (
    <article>
      <JsonLd data={researchArticleStructuredData(post)} />
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "Research", path: "/research" },
          { name: post.title, path: `/research/${post.slug}` },
        ])}
      />

      <header className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <Link href="/research" className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
            <ArrowLeft size={15} aria-hidden="true" /> Research
          </Link>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            <span className="kicker text-[color:var(--brand-blue)]">{post.category}</span>
            <span className="kicker text-[color:var(--muted)]">/ {post.status}</span>
          </div>
          <h1 className="section-title mt-6 max-w-5xl">{post.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-[color:var(--muted)]">{post.dek}</p>
          <div className="mt-12 border-t hairline pt-5">
            <time className="kicker text-[color:var(--muted)]" dateTime={post.date}>
              Published {post.date}
            </time>
          </div>
        </div>
      </header>

      <div className="site-container py-20 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.5fr_1.5fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Thesis</p>
            <p className="mt-5 max-w-md text-base leading-7 text-[color:var(--muted)]">{post.thesis}</p>
          </aside>

          <div className="max-w-3xl">
            {post.sections.map((section, index) => (
              <section key={section.heading} className={index === 0 ? "" : "mt-16 border-t hairline pt-12"}>
                <p className="kicker text-[color:var(--muted)]">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 font-[family-name:var(--font-manrope)] text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
                  {section.heading}
                </h2>
                <div className="mt-7 space-y-5 text-base leading-8 text-[color:var(--muted)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-16 border-t hairline pt-12">
              <p className="kicker">Implications for practice</p>
              <div className="mt-6 border-t hairline">
                {post.implications.map((item, index) => (
                  <div key={item} className="grid gap-4 border-b hairline py-5 md:grid-cols-[52px_1fr]">
                    <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
                    <p className="leading-7">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="mt-16 rounded-[var(--radius-lg)] border hairline bg-[color:var(--panel)] p-6">
              <p className="kicker text-[color:var(--muted)]">CreditPassport basis & limitation</p>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{post.sourceNote}</p>
            </aside>

            <section className="mt-16 border-t hairline pt-12">
              <p className="kicker">External context & references</p>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                These sources place adjacent concepts in external literature, standards or supervisory guidance. They do not establish that CreditPassport&apos;s framework, implementation or outcomes have been independently validated.
              </p>
              <div className="mt-8 border-t hairline">
                {post.references.map((reference, index) => (
                  <a
                    key={reference.url}
                    href={reference.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid gap-4 border-b hairline py-6 md:grid-cols-[52px_1fr_24px]"
                  >
                    <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-xl tracking-[-0.04em]">{reference.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-[color:var(--muted)]">
                        {reference.source} · {reference.year}
                      </p>
                      <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{reference.context}</p>
                    </div>
                    <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>

            <section className="mt-16 border-t hairline pt-12">
              <p className="kicker">Related research</p>
              <div className="mt-6 grid gap-px bg-[color:var(--line-strong)] sm:grid-cols-2">
                {relatedPosts.map((related) => (
                  <Link key={related.slug} href={`/research/${related.slug}`} className="group flex min-h-56 flex-col bg-[color:var(--surface)] p-6">
                    <div className="flex items-start justify-between gap-4">
                      <span className="kicker text-[color:var(--brand-blue)]">{related.number}</span>
                      <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} aria-hidden="true" />
                    </div>
                    <div className="mt-auto pt-10">
                      <h3 className="text-2xl tracking-[-0.045em]">{related.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{related.dek}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-16 border-t hairline pt-12">
              <p className="kicker">From research to practice</p>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-[color:var(--muted)]">
                These consulting capabilities are where the ideas in this note most directly meet institutional decision problems. The engagement still starts from the institution&apos;s evidence, constraints and success criteria.
              </p>
              <div className="mt-8 border-t hairline">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/consulting/${service.slug}`}
                    className="group grid gap-4 border-b hairline py-6 md:grid-cols-[52px_1fr_24px]"
                  >
                    <span className="kicker text-[color:var(--brand-blue)]">{service.number}</span>
                    <div>
                      <h3 className="text-xl tracking-[-0.04em]">{service.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
                    </div>
                    <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <Link
                href="/diagnostic"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-6 py-3 text-sm font-medium text-white"
              >
                Start with the Credit Decision Diagnostic <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
