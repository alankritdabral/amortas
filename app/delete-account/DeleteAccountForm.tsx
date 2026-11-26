"use client";

import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, X } from "lucide-react";

const REASONS = [
  "I no longer need the app",
  "I have privacy concerns",
  "I have a duplicate account",
  "The app did not meet my needs",
  "Other",
];

const EMPTY = { phone: "", email: "", reason: "", details: "" };

const inputCls =
  "w-full bg-[#FFF9F4] border-2 border-transparent focus:border-[#252525] rounded-md px-4 h-[52px] text-[#252525] text-base outline-none transition-colors placeholder:text-[#626262]/60";
const labelCls = "text-base font-semibold text-[#252525]";

export function DeleteAccountForm() {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phone = form.phone.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!form.reason) {
      setError("Please tell us why you want to delete your account.");
      return;
    }
    if (form.reason === "Other" && !form.details.trim()) {
      setError("Please describe your reason.");
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/delete-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) {
        setError(data.error || "We could not submit your request. Please email us and we will process it.");
        return;
      }
      setReference(data.reference ? String(data.reference) : "");
      setSubmitted(true);
      setForm(EMPTY);
    } catch {
      setError("We could not submit your request. Please check your connection or email us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="rounded-lg border-2 border-[#252525] bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#252525] mb-1">
          Request account deletion
        </h2>
        <p className="text-[#626262] mb-6">Use the details registered with your Amortas account.</p>

        {error && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="phone" className={labelCls}>
                Registered Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel-national"
                inputMode="numeric"
                maxLength={14}
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className={inputCls}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className={labelCls}>
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. rahul@example.com"
                className={inputCls}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="reason" className={labelCls}>
              Why do you want to delete your account? <span className="text-red-500">*</span>
            </label>
            <select
              id="reason"
              name="reason"
              value={form.reason}
              onChange={handleChange}
              className={inputCls}
              required
            >
              <option value="" disabled>
                Select a reason
              </option>
              {REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="details" className={labelCls}>
              Anything else you&apos;d like to tell us?{" "}
              {form.reason === "Other" && <span className="text-red-500">*</span>}
            </label>
            <textarea
              id="details"
              name="details"
              rows={3}
              maxLength={500}
              value={form.details}
              onChange={handleChange}
              placeholder="Optional"
              className={`${inputCls} h-auto py-3 resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#FD6C01] text-[#252525] h-14 rounded-md font-semibold hover:bg-[#252525] hover:text-white active:scale-[0.99] transition-[background-color,color,transform] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit Deletion Request</span>
            )}
          </button>
        </form>
      </div>

      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-submitted-title"
          onClick={() => setSubmitted(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setSubmitted(false)}
              className="absolute right-4 top-4 text-[#626262] hover:text-[#252525]"
            >
              <X className="w-5 h-5" />
            </button>
            <CheckCircle2 className="mx-auto mb-4 w-12 h-12 text-emerald-500" />
            <h3 id="delete-submitted-title" className="text-2xl font-bold text-[#252525] mb-2">
              Deletion Request Submitted
            </h3>
            <p className="text-[#626262] mb-6">
              We have received your request. We will contact you on the registered number or email to confirm it is
              you, then deactivate your account. Your data is kept for 90 days and then permanently deleted.
            </p>
            {reference && (
              <p className="text-sm text-[#626262] mb-6">
                Reference: <span className="font-mono">{reference}</span>
              </p>
            )}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="w-full h-12 rounded-md bg-[#252525] text-white font-semibold hover:bg-[#252525]/90 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
