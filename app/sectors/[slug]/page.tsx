import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getSector, sectors } from "@/data/sectors";
import { services, type Service } from "@/data/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return sectors.map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) return {};

  return {
    title: sector.title,
    description: sector.description,
  };
}

export default async function SectorPage({ params }: PageProps) {
  const { slug } = await params;
  const sector = getSector(slug);
  if (!sector) notFound();

  const relevantServices = sector.serviceSlugs
    .map((serviceSlug) => services.find((service) => service.slug === serviceSlug))
    .filter((service): service is Service => Boolean(service));

  return (
    <>
      <section className="section-grid border-b hairline">
        <div className="site-container py-20 md:py-32">
          <Link href="/sectors" className="inline-flex items-center gap-2 text-sm text-[color:var(--muted)] hover:text-[color:var(--foreground)]">
            <ArrowLeft size={15} aria-hidden="true" /> Sectors
          </Link>
          <p className="kicker mt-14 text-[color:var(--brand-blue)]">{sector.number} / Who we work with</p>
          <h1 className="section-title mt-6 max-w-5xl">{sector.title}</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">{sector.description}</p>
        </div>
      </section>

      <section className="site-container py-20 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.45fr_1.55fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="kicker">Typical counterpart</p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">{sector.buyer}</p>
          </aside>
          <div>
            <p className="kicker">Questions we help resolve</p>
            <div className="mt-6 border-t hairline">
              {sector.questions.map((question, index) => (
                <div key={question} className="grid gap-4 border-b hairline py-6 md:grid-cols-[64px_1fr]">
                  <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="max-w-3xl text-lg leading-7">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y hairline bg-[color:var(--panel)]">
        <div className="site-container py-20 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.45fr_1.55fr]">
            <div>
              <p className="kicker">Relevant capabilities</p>
              <p className="mt-5 max-w-sm text-sm leading-6 text-[color:var(--muted)]">
                These are common starting points, not a fixed package. The intervention should follow the evidence from the institution&apos;s actual decision system.
              </p>
            </div>
            <div className="grid gap-px bg-[color:var(--line-strong)] md:grid-cols-3">
              {relevantServices.map((service) => (
                <Link key={service.slug} href={`/consulting/${service.slug}`} className="group flex min-h-80 flex-col bg-[color:var(--surface)] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="kicker text-[color:var(--brand-blue)]">{service.number}</span>
                    <ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={16} aria-hidden="true" />
                  </div>
                  <div className="mt-auto">
                    <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{service.title}</h2>
                    <p className="mt-4 text-sm leading-6 text-[color:var(--muted)]">{service.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="site-container py-20 md:py-28">
        <div className="border-t hairline pt-8 md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <p className="kicker">First engagement</p>
            <h2 className="mt-6 max-w-3xl font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              Not sure which capability is the real constraint?
            </h2>
          </div>
          <Link href={`/diagnostic?sector=${sector.slug}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[color:var(--brand-blue)] px-6 py-3 text-sm font-medium text-white md:mt-0">
            Start with the diagnostic <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
