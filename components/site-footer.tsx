import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";
import { navigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-[color:var(--surface)] py-12">
      <div className="site-container grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <BrandLockup />
          <p className="mt-4 max-w-md text-sm leading-6 text-[color:var(--muted)]">
            Credit, risk, data and decision systems for financial institutions. Research-led, evidence-based and built around measurable outcomes.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="grid gap-1 text-sm">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit px-1 py-2 hover:text-[color:var(--brand-blue)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="text-sm leading-7 text-[color:var(--muted)]">
          <p>Consulting now.</p>
          <p>Research continuously.</p>
          <p>Productization later.</p>
          <div className="mt-5 brand-rule" />
        </div>
      </div>
    </footer>
  );
}
