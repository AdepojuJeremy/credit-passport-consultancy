import Link from "next/link";
import { BrandLockup } from "@/components/brand-lockup";

const practiceLinks = [
  { label: "Consulting", href: "/consulting" },
  { label: "Credit Decision Diagnostic", href: "/diagnostic" },
  { label: "Sectors", href: "/sectors" },
  { label: "Research", href: "/research" },
  { label: "Selected work", href: "/case-studies" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

const trustPrinciples = [
  ["01", "Evidence discipline", "Targets, hypotheses and internal frameworks are not presented as achieved client results."],
  ["02", "Data minimization", "Public intake is intentionally low-sensitivity; borrower PII and confidential datasets require an agreed secure channel."],
  ["03", "Decision traceability", "Recommendations should preserve the chain from evidence to analysis, policy, action and measured outcome."],
  ["04", "Claim restraint", "No certification, performance metric or client outcome is published without evidence and permission."],
];

export function SiteFooter() {
  return (
    <footer className="border-t hairline bg-[color:var(--surface)]">
      <section className="inverse-grid bg-[color:var(--inverse)] text-[color:var(--inverse-foreground)]">
        <div className="site-container py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[0.55fr_1.45fr]">
            <div>
              <p className="kicker text-white/50">Trust / Operating standards</p>
              <h2 className="mt-6 max-w-md font-[family-name:var(--font-manrope)] text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
                Trust should come from the work, not borrowed badges.
              </h2>
            </div>
            <div className="border-t border-white/20">
              {trustPrinciples.map(([number, title, copy]) => (
                <div key={number} className="grid gap-4 border-b border-white/20 py-6 md:grid-cols-[60px_0.8fr_1.4fr] md:items-start">
                  <span className="kicker text-[color:var(--brand-mint)]">{number}</span>
                  <h3 className="font-[family-name:var(--font-manrope)] text-xl font-semibold tracking-[-0.035em]">{title}</h3>
                  <p className="max-w-xl text-sm leading-6 text-white/55">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
