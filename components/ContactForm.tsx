"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { usePathname } from "next/navigation";
import { Loader2, ArrowRight, CheckCircle2, AlertCircle, ChevronDown, Lock, Check, CheckCheck } from "lucide-react";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { WhatsAppChatLink } from "@/components/WhatsAppChatLink";
import { NOTICE_VERSION } from "@/lib/consent";
import { track, setJourneyStage } from "@/lib/analytics/track";
import { getAttribution } from "@/lib/analytics/attribution";
import { getGaIds } from "@/lib/analytics/ids";
import { GA_ID } from "@/lib/analytics/gaId";
import { setClarityTag } from "@/lib/analytics/clarityTags";
import { REQUIREMENTS, requirementForPath, needFromSearch } from "@/lib/helpDefaults";

type Props = {
  /** "home" and "page" are the full-size layouts; "card" is the compact white card used in heroes and mid-page bands. */
  variant?: "home" | "page" | "card";
  /** Where on the page this copy sits, so analytics can tell several forms on one page apart. */
  location?: "hero" | "contact_form";
  /** Preselects "What can we help you with?". Falls back to the page's own default (lib/helpDefaults). */
  defaultRequirement?: string;
  /** City page the visitor is on, sent with the lead. */
  city?: string;
};

export function ContactForm({ variant = "home", location = "contact_form", defaultRequirement, city }: Props) {
  const page = variant === "page";
  const card = variant === "card";
  const uid = useId();
  const ids = {
    name: `${uid}-name`,
    phone: `${uid}-phone`,
    requirement: `${uid}-requirement`,
    netSalary: `${uid}-netSalary`,
    ongoingEmi: `${uid}-ongoingEmi`,
  };
  const pathname = usePathname();
  const baseRequirement = defaultRequirement ?? requirementForPath(pathname);
  const inputCls = card
    ? "w-full bg-[#FFF9F4] border border-[#EADFD5] focus:border-[#252525] rounded-lg px-3.5 h-11 text-[#252525] text-[15px] outline-none transition-colors placeholder:text-[#626262]/60"
    : page
    ? "w-full bg-[#FFF9F4] border-2 border-transparent focus:border-[#252525] rounded-md px-4 h-[52px] text-[#252525] text-base outline-none transition-colors placeholder:text-[#626262]/60"
    : "w-full bg-slate-50 border border-slate-50 focus:border-slate-200 rounded-xl px-4 py-3 text-[#252525] text-sm focus:ring-4 focus:ring-blue-50 outline-none transition-all placeholder:text-[#626262]/50";
  const labelCls = card ? "text-sm font-semibold text-[#252525]" : page ? "text-base font-semibold text-[#252525]" : "text-sm font-bold text-[#252525]";
  const isListed = (v: string) => (REQUIREMENTS as readonly string[]).includes(v);
  // A value that is not one of the options (from a link) is shown as a text box the visitor can edit.
  const [typing, setTyping] = useState(Boolean(baseRequirement) && !isListed(baseRequirement));
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    requirement: baseRequirement,
    netSalary: "",
    ongoingEmi: "",
    consentContact: false,
  });
  // A link such as /personal-loan?need=balance-transfer overrides the page default. Read after mount so the page stays static.
  const needRef = useRef("");
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const need = needFromSearch(window.location.search);
      if (!need) return;
      needRef.current = need;
      if (!isListed(need)) setTyping(true);
      setFormData((prev) => (prev.requirement === baseRequirement ? { ...prev, requirement: need } : prev));
    });
    return () => cancelAnimationFrame(id);
  }, [baseRequirement]);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const hasStartedRef = useRef(false);

  // Approximates the plan's "50% visible" lead_form_view with a mount-time
  // fire: both pages that render this form put it close to the viewport
  // (the homepage's #lead-form section, or above the fold on /contact), and
  // a full IntersectionObserver per form instance was judged not worth the
  // added complexity for this phase.
  useEffect(() => {
    track({ name: "lead_form_view", params: { form_id: "contact", form_location: location === "contact_form" ? "contact_form" : `contact_form_${location}` } });
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      track({ name: "lead_form_start", params: { form_id: "contact" } });
    }
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    track({ name: "lead_form_submit", params: { form_id: "contact" } });

    if (!formData.name || !formData.phone || !formData.requirement || !formData.netSalary || !formData.ongoingEmi) {
      setErrorMessage("Please fill all required fields.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "name_missing" } });
      return;
    }

    const phoneDigits = formData.phone.replace(/[\s-]/g, "").replace(/^(\+91|0)/, "");
    if (!/^[6-9]\d{9}$/.test(phoneDigits)) {
      setErrorMessage("Please enter a valid 10-digit Indian mobile number.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "mobile_invalid" } });
      return;
    }

    const salary = Number(formData.netSalary);
    if (isNaN(salary) || salary <= 45000) {
      setErrorMessage("Net salary must be greater than ₹45,000.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "salary_below_min" } });
      return;
    }

    const emi = Number(formData.ongoingEmi);
    if (isNaN(emi) || emi > salary * 0.8) {
      setErrorMessage("Ongoing EMI cannot be greater than 80% of net salary.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "emi_too_high" } });
      return;
    }

    if (!formData.consentContact) {
      setErrorMessage("Please agree to being contacted about your enquiry.");
      setStatus("error");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "consent_missing" } });
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const [attribution, ga] = await Promise.all([
        Promise.resolve(getAttribution()),
        getGaIds(GA_ID),
      ]);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: phoneDigits,
          city,
          pagePath: window.location.pathname,
          formLocation: location,
          consent: {
            contact: formData.consentContact,
            shareWithLenders: false, // the consent text no longer mentions lenders
            noticeVersion: NOTICE_VERSION,
          },
          attribution,
          ga,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form.");
      }

      setStatus("success");
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("status", "submitted");
        window.history.replaceState(window.history.state, "", url.toString());
      } catch {}
      const resetNeed = needRef.current || baseRequirement;
      setTyping(Boolean(resetNeed) && !isListed(resetNeed));
      setFormData({
        name: "",
        phone: "",
        requirement: resetNeed,
        netSalary: "",
        ongoingEmi: "",
        consentContact: false,
      });
      track({ name: "generate_lead", params: { lead_source: "contact", currency: "INR" } });
      setJourneyStage("lead");
      if (ga.clientId) setClarityTag("ga_client_id", ga.clientId);
      if (result.leadRef) setClarityTag("lead_ref", result.leadRef);
    } catch (error: any) {
      console.error("Form submission error:", error);
      setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
      track({ name: "lead_form_error", params: { form_id: "contact", error_code: "server" } });
      setStatus("error");
    }
  };

  const renderRightColumn = () => {
    if (status === "success") {
      return (
        <div className={page ? "bg-white rounded-lg p-8 sm:p-10 text-center h-full flex flex-col justify-center" : "bg-emerald-50 border border-emerald-200 rounded-[24px] p-8 text-center shadow-sm h-full flex flex-col justify-center"} data-clarity-mask="true">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>
          <h3 className="text-2xl font-bold text-emerald-900 mb-2">Successfully Submitted</h3>
          <p className="text-emerald-700 mb-8">
            Thank you for contacting Amortas.
            <br />
            Our team will contact you shortly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppChatLink
              data-analytics-location="contact_form_success"
              className="flex-1 px-6 py-3 bg-[#25D366] text-white hover:bg-emerald-600 rounded font-bold transition-all shadow-md shadow-green-600/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </WhatsAppChatLink>
            <Link
              href="/eligibility"
              data-analytics-cta="contact_form_success_check_eligibility"
              data-analytics-location="contact_form_success"
              className="flex-1 px-6 py-3 bg-[#FD6C01] text-[#252525] hover:bg-[#FD6C01]/90 rounded font-bold transition-all shadow-md shadow-[#FD6C01]/20 hover:-translate-y-0.5 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              Check Eligibility
            </Link>
          </div>
          
          <button
            onClick={() => {
              setStatus("idle");
              try {
                const url = new URL(window.location.href);
                url.searchParams.delete("status");
                window.history.replaceState(window.history.state, "", url.toString());
              } catch {}
            }}
            className="mt-6 text-sm text-emerald-700 hover:text-emerald-900 underline font-medium transition-colors"
          >
            Send another message
          </button>
        </div>
      );
    }

    return (
      <div className={card ? "bg-white p-5 sm:p-7 flex flex-col scroll-mt-24 rounded-2xl border border-[#F0E3D8] shadow-[0_28px_60px_-30px_rgba(120,60,20,0.4)]" : page ? "bg-white p-6 sm:p-10 flex flex-col scroll-mt-24 rounded-lg" : "bg-white p-6 sm:p-10 relative z-20 flex flex-col scroll-mt-24 rounded-2xl card-elevated"} id={location === "contact_form" ? "contact-form-card" : undefined}>
        <div className={card ? "mb-5 shrink-0" : "mb-6 md:mb-8 shrink-0"}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-2">
            <h2 className={card ? "text-2xl font-bold tracking-[-0.02em] text-[#252525]" : page ? "text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] text-[#252525]" : "text-[32px] font-bold tracking-[-0.02em] text-[#252525]"}>{card ? "Get a free callback" : "Leave your details"}</h2>

          </div>
          <p className={card ? "text-[#626262] text-sm mt-1" : page ? "text-[#626262] text-base mt-1" : "text-[#626262] text-sm -mt-1 sm:mt-0"}>We&apos;ll call you back, usually within 24 hours.</p>
        </div>

        {status === "error" && (
          <div role="alert" className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 shrink-0">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800 font-medium">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={card ? "space-y-3.5 flex flex-col flex-1" : "space-y-4 flex flex-col flex-1"}>
          <div className={card ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div className="space-y-1.5">
              <label htmlFor={ids.name} className={labelCls}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={ids.name}
                name="name"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className={inputCls}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor={ids.phone} className={labelCls}>
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id={ids.phone}
                name="phone"
                autoComplete="tel-national"
                inputMode="numeric"
                maxLength={14}
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                className={inputCls}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor={ids.requirement} className={labelCls}>
              What can we help you with? <span className="text-red-500">*</span>
            </label>
            {typing ? (
              <>
                <input
                  type="text"
                  id={ids.requirement}
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  maxLength={60}
                  placeholder="Tell us what you need, e.g. wedding loan"
                  className={inputCls}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setTyping(false);
                    setFormData((prev) => ({ ...prev, requirement: (REQUIREMENTS as readonly string[]).includes(baseRequirement) ? baseRequirement : "" }));
                  }}
                  className="text-xs text-[#626262] underline hover:text-[#252525]"
                >
                  Choose from the list instead
                </button>
              </>
            ) : (
              <div className="relative">
                <select
                  id={ids.requirement}
                  name="requirement"
                  value={formData.requirement}
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      // "Other" has no meaning on its own: let the visitor say what they need.
                      setTyping(true);
                      setFormData((prev) => ({ ...prev, requirement: "" }));
                      return;
                    }
                    handleChange(e);
                  }}
                  className={`${inputCls} appearance-none pr-10`}
                  required
                >
                  <option value="" disabled>Select an option</option>
                  {REQUIREMENTS.map((req) => (
                    <option key={req} value={req}>
                      {req}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#626262]">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            )}
          </div>
          <div className={card ? "grid grid-cols-1 sm:grid-cols-2 gap-3.5" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
            <div className="space-y-1.5">
              <label htmlFor={ids.netSalary} className={labelCls}>
                Net Monthly Salary (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id={ids.netSalary}
                name="netSalary"
                inputMode="numeric"
                min={0}
                value={formData.netSalary}
                onChange={handleChange}
                aria-describedby={`${ids.netSalary}-hint`}
                placeholder="e.g. 50000"
                className={inputCls}
                required
              />
              <p id={`${ids.netSalary}-hint`} className={card ? "text-xs text-[#626262]" : "text-sm text-[#626262]"}>{card ? "Take-home, above ₹45,000." : "Take-home pay. Must be above ₹45,000."}</p>
            </div>
            <div className="space-y-1.5">
              <label htmlFor={ids.ongoingEmi} className={labelCls}>
                Ongoing EMI (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id={ids.ongoingEmi}
                name="ongoingEmi"
                inputMode="numeric"
                min={0}
                value={formData.ongoingEmi}
                onChange={handleChange}
                aria-describedby={`${ids.ongoingEmi}-hint`}
                placeholder="e.g. 15000"
                className={inputCls}
                required
              />
              <p id={`${ids.ongoingEmi}-hint`} className={card ? "text-xs text-[#626262]" : "text-sm text-[#626262]"}>{card ? "All EMIs together. 0 if none." : "All current EMIs together. 0 if none."}</p>
            </div>
          </div>

          <div className={card ? "mt-2 shrink-0" : "mt-4 pt-4 shrink-0"}>
            <label className="flex items-start gap-3 py-1 rounded-xl cursor-pointer group mb-4">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  name="consentContact"
                  checked={formData.consentContact}
                  onChange={handleChange}
                  className="peer w-[18px] h-[18px] appearance-none border border-slate-200 rounded-[4px] checked:bg-[#252525] checked:border-[#252525] transition-colors cursor-pointer"
                  required
                />
                <Check className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
              </div>
              <span className={card ? "text-xs leading-relaxed text-[#626262] group-hover:text-[#252525] transition-colors" : "text-sm text-[#626262] group-hover:text-[#252525] transition-colors"}>
                I agree that Amortas may contact me by call, SMS, WhatsApp or email about this enquiry. This form does not share your details with lenders. See our{" "}
                <Link href="/privacy-policy" className="underline">Privacy Policy</Link>. <span className="text-red-500">*</span>
              </span>
            </label>

            <button
              type="submit"
              disabled={status === "loading"}
              className={card ? "w-full bg-[#FD6C01] text-[#252525] h-12 rounded-lg font-semibold hover:bg-[#252525] hover:text-white active:scale-[0.99] transition-[background-color,color,transform] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base" : page ? "w-full bg-[#FD6C01] text-[#252525] h-14 rounded-md font-semibold hover:bg-[#252525] active:scale-[0.99] transition-[background-color,transform] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base" : "w-full bg-[#FD6C01] text-[#252525] py-[18px] rounded font-bold shadow-xl shadow-[#FD6C01]/20 hover:shadow-2xl hover:shadow-[#FD6C01]/30 hover:bg-[#FD6C01]/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-base"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Enquiry</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </>
              )}
            </button>
            
            <div className={card ? "pt-3 flex items-center justify-center gap-1.5 text-[#626262]" : "pt-4 flex items-start sm:items-center justify-center gap-1.5 text-[#626262]"}>
              <Lock className={page ? "w-4 h-4 shrink-0 text-[#626262]" : "w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0 text-slate-400"} />
              <p className={card ? "text-xs text-[#626262]" : page ? "text-sm text-[#626262]" : "text-[11px] sm:text-xs text-slate-400"}>Your information is secure and will only be used to contact you.</p>
            </div>
          </div>
        </form>
      </div>
    );
  };

  if (page || card) return <div className="w-full">{renderRightColumn()}</div>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_6fr] gap-10 lg:gap-16 items-start">
        <div className="order-2 lg:order-1 lg:sticky lg:top-28">
          <h2 className="text-[40px] sm:text-[56px] lg:text-[58px] leading-[1.02] tracking-[-0.04em] font-bold text-[#252525]">
            Rather have someone call you?
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#252525] max-w-md">
            Leave your number and tell us what you need help with. A credit expert will ring you
            back and walk through it with you.
          </p>

          <div className="mt-9 max-w-md overflow-hidden rounded-2xl card-elevated bg-[#efeae2]">
            <div className="flex items-center gap-3 bg-[#008069] px-4 py-3 text-white">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
                <LogoMark className="h-[16px] w-auto text-[#FD6C01]" />
              </div>
              <div className="leading-tight">
                <p className="text-[15px] font-semibold">Amortas</p>
                <p className="text-xs text-white/80">online</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-4 py-5">
              <span className="self-center rounded-md bg-white/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-[#54656f] shadow-sm">
                Today
              </span>

              <div className="self-end max-w-[85%] rounded-lg rounded-tr-none bg-[#d9fdd3] px-3 pt-2 pb-1.5 text-[#111b21] shadow-sm">
                <p className="text-[15px] leading-snug">I have a few EMIs. Can I pay less every month?</p>
                <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-[#667781]">
                  10:42
                  <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" strokeWidth={2.5} />
                </p>
              </div>

              <div className="self-start max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 pt-2 pb-1.5 text-[#111b21] shadow-sm">
                <p className="text-[15px] leading-snug">
                  Maybe. Share a few details and we&apos;ll go through them with you. It&apos;s free, and
                  there&apos;s no pressure to go ahead.
                </p>
                <p className="mt-0.5 text-right text-[11px] text-[#667781]">10:43</p>
              </div>
            </div>
          </div>

          <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-base text-[#252525] max-w-md">
            <li>Your data is encrypted.</li>
            <li>Never shared with third parties.</li>
            <li>Verified loan experts.</li>
            <li>Usually a reply within 24 hours.</li>
          </ul>
        </div>

        <div className="order-1 lg:order-2 relative w-full lg:ml-auto max-w-[560px]">
          {renderRightColumn()}
        </div>
      </div>
    </div>
  );
}
