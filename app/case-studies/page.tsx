import type { Metadata } from "next";

export const metadata: Metadata = { title: "Case Studies" };

export default function CaseStudiesPage() {
  return (
    <section className="site-container py-20 md:py-32">
      <p className="kicker">Case studies</p>
      <h1 className="section-title mt-8 max-w-5xl">Evidence before claims.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-7 text-[color:var(--muted)]">
        Selected engagements will be published here once client context, interventions and outcomes have been reviewed for accuracy and permission. The site will not fabricate metrics or imply results that have not been substantiated.
      </p>
      <div className="mt-20 border-y hairline py-10 text-sm text-[color:var(--muted)]">
        Case-study publishing structure: Context → Decision problem → Diagnosis → Intervention → Evidence → Result → Lessons.
      </div>
    </section>
  );
}
