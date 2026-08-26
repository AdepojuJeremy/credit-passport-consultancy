import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";

const practiceLinks = [
  { label: "Consulting", href: "/consulting" },
  { label: "Research", href: "/research" },
  { label: "Selected work", href: "/case-studies" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-[color:var(--surface)]">
      <div className="site-container py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr_0.7fr]">
          <div>
            <BrandLockup />
            <p className="mt-5 max-w-lg text-sm leading-6 text-[color:var(--muted)]">
              CreditPassport is a consulting and research practice focused on credit, risk, data and decision systems for lenders, fintechs and financial institutions.
            </p>
            <div className="mt-7 brand-rule" />
          </div>

          <nav aria-label="Practice navigation">
            <p className="kicker text-[color:var(--muted)]">Practice</p>
            <div className="mt-4 grid gap-1 text-sm">
              {practiceLinks.map((item) => (
                <Link key={item.href} href={item.href} className="w-fit px-1 py-2 hover:text-[color:var(--brand-blue)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Company navigation">
            <p className="kicker text-[color:var(--muted)]">Company</p>
            <div className="mt-4 grid gap-1 text-sm">
              {companyLinks.map((item) => (
                <Link key={item.href} href={item.href} className="w-fit px-1 py-2 hover:text-[color:var(--brand-blue)]">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t hairline pt-6 text-xs leading-5 text-[color:var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>Consulting now · Research continuously · Productize what becomes repeatable.</p>
          <p>Do not submit borrower PII or confidential datasets through the public enquiry form.</p>
        </div>
      </div>
    </footer>
  );
}
