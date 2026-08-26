import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="section-grid border-b hairline">
      <div className="site-container flex min-h-[70svh] flex-col justify-center py-20 md:py-28">
        <p className="kicker text-[color:var(--brand-blue)]">404 / Not found</p>
        <h1 className="section-title mt-6 max-w-4xl">This decision path does not exist.</h1>
        <p className="mt-7 max-w-2xl text-lg leading-7 text-[color:var(--muted)]">
          The page may have moved, the link may be outdated, or the requested route may not have been published yet.
        </p>
        <Link href="/" className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border hairline bg-[color:var(--surface)] px-5 py-3 text-sm">
          <ArrowLeft size={15} aria-hidden="true" /> Return home
        </Link>
      </div>
    </section>
  );
}
