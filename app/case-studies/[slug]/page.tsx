import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { engagementPatterns, getEngagementPattern } from "@/data/engagement-patterns";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return engagementPatterns.map((pattern) => ({ slug: pattern.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pattern = getEngagementPattern(slug);
  if (!pattern) return {};

  return {
    title: pattern.title,
    description: pattern.summary,
  };
}

function EvidenceList({ title, items }: { title: string; items: ReadonlyArray<string> }) {
  return (
    <section className="border-t hairline pt-6">
      <p className="kicker text-[color:var(--muted)]">{title}</p>
      <div className="mt-6 border-t hairline">
        {items.map((item, index) => (
          <div key={item} className="grid gap-4 border-b hairline py-5 md:grid-cols-[54px_1fr]">
            <span className="kicker text-[color:var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
            <p className="max-w-3xl leading-7">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function EngagementPatternPage({ params }: PageProps) {
  const { slug } = await params;
  const pattern = getEngagementPattern(slug);
  if (!pattern) notFound();

  return (
    <article>
      <header className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
            <ArrowLeft size={15} /> Selected work
          </Link>
          <p className="kicker mt-14 text-[color:var(--brand-blue)]">{pattern.number} / Engagement pattern</p>
          <h1 className="section-title mt-6 max-w-5xl">{pattern.title}</h1>
          <p className="mt-8 max-w-3xl text-xl leading-8 text-[color:var(--muted)]">{pattern.summary}</p>
          <div className="mt-10 inline-flex rounded-full border border-[color:var(--brand-blue)]/25 bg-[color:var(--brand-blue)]/5 px-4 py-2">
            <span className="kicker text-[color:var(--brand-blue)]">Evidence status: {pattern.status}</span>
          </div>
        </div>
      </header>

      <div className="site-container py-20 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.45fr_1.55fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Context</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">{pattern.context}</p>
          </aside>
          <div className="space-y-16">
            <EvidenceList title="Decision problem" items={pattern.problem} />
            <EvidenceList title="Consulting work" items={pattern.work} />
            <EvidenceList title="Evidence required before outcome claims" items={pattern.evidenceRequired} />
            <aside className="rounded-[var(--radius-lg)] border hairline bg-[color:var(--panel)] p-6">
              <p className="kicker text-[color:var(--muted)]">Public note</p>
              <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{pattern.publicNote}</p>
            </aside>
          </div>
        </div>
      </div>
    </article>
  );
}
