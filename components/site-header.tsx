import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b hairline bg-[color:var(--background)]/90 backdrop-blur-xl">
      <div className="site-container flex h-16 items-center justify-between gap-8">
        <Link href="/" className="flex items-baseline gap-2 font-medium tracking-[-0.03em]">
          <span>CreditPassport</span>
          <span className="kicker text-[color:var(--muted)]">Consulting</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-opacity hover:opacity-55">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border hairline px-4 py-2 text-sm transition-colors hover:bg-black hover:text-white"
        >
          Work with us <ArrowUpRight size={14} />
        </Link>
      </div>
    </header>
  );
}
