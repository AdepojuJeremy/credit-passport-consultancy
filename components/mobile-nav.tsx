"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border hairline bg-[color:var(--surface)]"
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>

      {open ? (
        <div id="mobile-navigation" className="fixed inset-x-0 top-16 z-40 border-b hairline bg-[color:var(--background)] shadow-[0_24px_70px_rgba(8,26,58,0.12)]">
          <nav aria-label="Mobile navigation" className="site-container py-5">
            <div className="border-t hairline">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="grid min-h-16 grid-cols-[44px_1fr] items-center border-b hairline text-base"
                >
                  <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/diagnostic"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-5 py-3 text-sm font-medium text-white"
            >
              Start with a diagnostic
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full border hairline bg-[color:var(--surface)] px-5 py-3 text-sm font-medium"
            >
              Contact CreditPassport
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
