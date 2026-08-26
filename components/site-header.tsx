import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLockup } from "@/components/brand-lockup";
import { MobileNav } from "@/components/mobile-nav";
import { navigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-[color:var(--background)]/92 backdrop-blur-xl">
      <div className="site-container flex h-16 items-center justify-between gap-5">
        <Link href="/" aria-label="CreditPassport Consulting home" className="min-w-0">
          <BrandLockup />
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 text-sm md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-opacity duration-150 hover:opacity-55">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="hidden items-center gap-2 rounded-full bg-[color:var(--foreground)] px-4 py-2 text-sm text-white transition-colors duration-150 hover:bg-[color:var(--brand-blue)] md:inline-flex"
        >
          Work with us <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <MobileNav />
      </div>
    </header>
  );
}
