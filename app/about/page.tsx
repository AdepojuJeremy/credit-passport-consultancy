import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section className="site-container py-20 md:py-32">
      <p className="kicker">About</p>
      <h1 className="section-title mt-8 max-w-5xl">A consulting and research practice for better financial decisions.</h1>
      <div className="mt-14 grid gap-8 border-t hairline pt-8 md:grid-cols-2">
        <p className="max-w-xl text-lg leading-7">
          CreditPassport is being developed consultancy-first: working directly on credit, risk, data and decision problems before productizing repeatable infrastructure.
        </p>
        <p className="max-w-xl text-sm leading-6 text-[color:var(--muted)]">
          The operating thesis is simple: research develops better methods; consulting tests those methods against real institutional problems; repeated patterns become proprietary frameworks and, later, software.
        </p>
      </div>
    </section>
  );
}
