import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getService, services } from "@/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
  };
}

function ListBlock({ title, items }: { title: string; items: ReadonlyArray<string> }) {
  return (
    <section className="border-t hairline pt-6">
      <p className="kicker text-[color:var(--muted)]">{title}</p>
      <div className="mt-6 border-t hairline">
        {items.map((item, index) => (
          <div key={item} className="grid gap-4 border-b hairline py-5 md:grid-cols-[56px_1fr]">
            <span className="kicker text-[color:var(--muted)]">{String(index + 1).padStart(2, "0")}</span>
            <p className="max-w-3xl leading-7">{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <Link href="/consulting" className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
            <ArrowLeft size={15} /> Consulting
          </Link>
          <p className="kicker mt-14 text-[color:var(--brand-blue)]">{service.number} / Capability</p>
          <h1 className="section-title mt-6 max-w-5xl">{service.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">{service.description}</p>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.45fr_1.55fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Engagement principle</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
              We define the decision, evidence and success criteria before choosing the analytical or technical intervention.
            </p>
          </aside>
          <div className="space-y-16">
            <ListBlock title="Questions we answer" items={service.questions} />
            <ListBlock title="What we do" items={service.work} />
            <ListBlock title="Typical outputs" items={service.outputs} />
            <ListBlock title="How the work is measured" items={service.measures} />
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-20 md:flex md:items-end md:justify-between md:gap-12 md:py-28">
          <div>
            <p className="kicker text-white/50">Discuss this capability</p>
            <h2 className="mt-6 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Start with the decision you need to improve.
            </h2>
          </div>
          <Link
            href={`/contact?service=${service.slug}`}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-mint)] px-6 py-3 text-sm font-medium text-[#081a3a] md:mt-0"
          >
            Start a conversation <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
