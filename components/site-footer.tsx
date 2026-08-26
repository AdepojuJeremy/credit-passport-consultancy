import Link from "next/link";
import { navigation } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t hairline py-12">
      <div className="site-container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-xl font-medium tracking-[-0.035em]">CreditPassport Consulting</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-[color:var(--muted)]">
            Credit, risk, data and decision systems for financial institutions. Research-led, evidence-based and built around measurable outcomes.
          </p>
        </div>
        <div className="grid gap-2 text-sm">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="w-fit hover:opacity-55">
              {item.label}
            </Link>
          ))}
        </div>
        <div className="text-sm text-[color:var(--muted)]">
          <p>Consulting now.</p>
          <p>Research continuously.</p>
          <p>Productization later.</p>
        </div>
      </div>
    </footer>
  );
}
