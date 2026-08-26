import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getResearchPost, researchPosts } from "@/data/research-posts";

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

  return {
    title: post.title,
    description: post.dek,
  };
}

export default async function ResearchPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getResearchPost(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <Link href="/research" className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
            <ArrowLeft size={15} /> Research
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
              <p className="kicker text-[color:var(--muted)]">Source & limitation note</p>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{post.sourceNote}</p>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
