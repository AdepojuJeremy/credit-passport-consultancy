import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Website privacy information for CreditPassport Consulting consultation enquiries.",
};

const sections = [
  {
    title: "What the consultation form collects",
    copy: "The public enquiry form asks for your name, work email, institution, role, institution type, the area you want to discuss, a description of the decision problem, the data currently available and the outcome you want to improve. When you enter the form from a known CreditPassport service, sector or Diagnostic page, that page context may also be attached to the enquiry so the team does not ask you to repeat it.",
  },
  {
    title: "What the form is not for",
    copy: "Do not submit borrower personally identifiable information, raw customer records, passwords, API keys, confidential datasets or other sensitive production data through the public enquiry form. Secure data-transfer arrangements should be agreed separately after an engagement is scoped.",
  },
  {
    title: "How enquiry information is used",
    copy: "Information submitted through the form is used to review the consulting request, understand the institution and decision problem, determine whether CreditPassport can help and communicate about the enquiry or a potential engagement.",
  },
  {
    title: "Context and tracking",
    copy: "Context attached to an enquiry is limited to recognized CreditPassport paths such as the Diagnostic, a named sector or a named consulting capability. The intake does not add arbitrary browser history or free-form referrer data to the enquiry payload.",
  },
  {
    title: "Campaign and conversion measurement",
    copy: "If the landing URL contains standard UTM campaign parameters, the site may retain utm_source, utm_medium, utm_campaign, utm_content and utm_term for the current browser tab or session and attach them to named conversion events or a consultation enquiry. This implementation uses session storage rather than cookies, does not fingerprint the browser, does not capture arbitrary referrer URLs and does not send consultation-form text to the measurement endpoint.",
  },
  {
    title: "Delivery infrastructure",
    copy: "The website forwards consultation enquiries from a server-side route to a configured business intake destination. Conversion events can separately be forwarded to a configured measurement destination. Both destinations are supplied through deployment configuration rather than exposed in browser code.",
  },
  {
    title: "Retention and access",
    copy: "Enquiry and measurement information should be retained only for legitimate business follow-up, funnel analysis and record-keeping needs, with access limited to people or service providers involved in those purposes. Production retention and deletion procedures should be reviewed as part of launch operations.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="site-container py-20 md:py-32">
      <p className="kicker text-[color:var(--brand-blue)]">Website privacy</p>
      <h1 className="section-title mt-8 max-w-5xl">Keep the public intake channel intentionally low-sensitivity.</h1>
      <p className="mt-8 max-w-3xl text-lg leading-7 text-[color:var(--muted)]">
        This page describes the current website consultation-intake design. It is operational product copy, not a substitute for jurisdiction-specific legal review before public launch.
      </p>

      <div className="mt-20 border-t hairline">
        {sections.map((section, index) => (
          <section key={section.title} className="grid gap-5 border-b hairline py-8 md:grid-cols-[80px_0.8fr_1.4fr]">
            <span className="kicker text-[color:var(--brand-blue)]">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="font-[family-name:var(--font-manrope)] text-2xl font-semibold tracking-[-0.045em]">{section.title}</h2>
            <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)]">{section.copy}</p>
          </section>
        ))}
      </div>
    </section>
  );
}
