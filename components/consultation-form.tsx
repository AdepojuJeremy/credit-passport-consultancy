"use client";

import { useState, type FormEvent } from "react";
import {
  consultationInstitutionTypes,
  consultationProblemTypes,
  type ConsultationContext,
} from "@/lib/consultation-context";

type Status = "idle" | "submitting" | "success" | "error";

type ConsultationFormProps = ConsultationContext;

export function ConsultationForm({
  contextLabel,
  sourceContext,
  institutionType,
  problemType,
}: ConsultationFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message ?? "We could not submit the enquiry.");
      }

      form.reset();
      setStatus("success");
      setMessage("Your enquiry has been submitted. The team can now review the decision problem and context you provided.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "We could not submit the enquiry.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-[var(--radius-md)] border hairline bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-[color:var(--muted)]/65 focus:border-[color:var(--brand-blue)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t hairline"
      aria-describedby="consultation-form-note"
      aria-busy={status === "submitting"}
    >
      {contextLabel ? (
        <div className="border-b hairline bg-[color:var(--panel)] px-5 py-4 text-sm leading-6">
          <span className="kicker mr-3 text-[color:var(--brand-blue)]">Enquiry context</span>
          <span>{contextLabel}</span>
          <span className="ml-2 text-[color:var(--muted)]">Prefilled fields remain editable.</span>
        </div>
      ) : null}

      <input type="hidden" name="sourceContext" value={sourceContext} />

      <div className="grid gap-6 border-b hairline py-7 md:grid-cols-2">
        <label className="text-sm">
          Your name
          <input className={inputClass} name="name" autoComplete="name" required />
        </label>
        <label className="text-sm">
          Work email
          <input className={inputClass} name="email" type="email" autoComplete="email" inputMode="email" required />
        </label>
        <label className="text-sm">
          Institution
          <input className={inputClass} name="institution" autoComplete="organization" required />
        </label>
        <label className="text-sm">
          Role
          <input className={inputClass} name="role" autoComplete="organization-title" required />
        </label>
        <label className="text-sm">
          Institution type
          <select className={inputClass} name="institutionType" defaultValue={institutionType ?? ""} required>
            <option value="" disabled>Select one</option>
            {consultationInstitutionTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
        <label className="text-sm">
          Primary area
          <select className={inputClass} name="problemType" defaultValue={problemType ?? ""} required>
            <option value="" disabled>Select one</option>
            {consultationProblemTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>
      </div>

      <div className="grid gap-6 border-b hairline py-7 md:grid-cols-2">
        <label className="text-sm md:col-span-2">
          What decision or portfolio problem are you trying to improve?
          <textarea className={`${inputClass} min-h-36 resize-y`} name="problem" required />
        </label>
        <label className="text-sm">
          What data is available today?
          <textarea className={`${inputClass} min-h-28 resize-y`} name="dataAvailable" placeholder="Examples: applications, repayment history, bank statements, bureau, policy rules, decision logs..." />
        </label>
        <label className="text-sm">
          What outcome needs to improve?
          <textarea className={`${inputClass} min-h-28 resize-y`} name="desiredOutcome" placeholder="Examples: approval quality, defaults, review rate, explainability, speed, policy control..." required />
        </label>
      </div>

      <div className="hidden" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
        <p id="consultation-form-note" className="max-w-xl text-xs leading-5 text-[color:var(--muted)]">
          Submit only information you are authorized to share. Do not include borrower PII, raw customer records, passwords, API keys or confidential datasets in this form.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-blue)] px-6 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
        >
          {status === "submitting" ? "Submitting…" : "Submit enquiry"}
        </button>
      </div>

      {message ? (
        <div
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={`mb-7 rounded-[var(--radius-md)] border p-4 text-sm leading-6 ${status === "success" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}
        >
          {message}
        </div>
      ) : null}
    </form>
  );
}
