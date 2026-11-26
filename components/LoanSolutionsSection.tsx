"use client";

import React, { useState } from "react";
import { ArrowRight, Check, ChevronRight, CreditCard, Landmark, Layers, Smartphone, User, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { track } from "@/lib/analytics/track";
import { lendersForAll } from "@/components/EligibleLoansSlider/loanData";

type Solution = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Headline split around the highlighted phrase. */
  headline: { before: string; mark: string; after?: string };
  points: [string, string][];
  cta: { label: string; href: string };
};

const SOLUTIONS: Solution[] = [
  {
    id: "personal-loan",
    label: "Personal Loan",
    icon: User,
    headline: { before: "Make your monthly repayments more ", mark: "manageable." },
    points: [
      ["Combine existing loans", "into one plan"],
      ["Choose a tenure", "that fits your monthly budget"],
      ["No obligation", "to proceed after you see your options"],
    ],
    cta: { label: "Check your EMI options", href: "#calculator" },
  },
  {
    id: "credit-card",
    label: "Credit Card",
    icon: CreditCard,
    headline: { before: "Reduce the burden of expensive ", mark: "credit-card debt." },
    points: [
      ["Get a lower interest rate", "Reduce high credit card interest into a single, lower rate."],
      ["Flexible repayment tenure", "Choose a duration that fits your monthly budget."],
      ["One simple EMI", "Convert multiple card dues into one easy EMI."],
    ],
    cta: { label: "Explore card debt options", href: "/credit-card-debt" },
  },
  {
    id: "app-loans",
    label: "App Loans",
    icon: Smartphone,
    headline: { before: "Bring scattered ", mark: "app loans", after: " into a clearer plan." },
    points: [
      ["Lower rates", "Get better interest rates than multiple app loans."],
      ["Combine & simplify", "Merge all your app loans into a single EMI."],
      ["One due date", "No more multiple reminders and penalties."],
    ],
    cta: { label: "See app loan options", href: "/app-loan" },
  },
  {
    id: "multiple-loans",
    label: "Multiple Loans",
    icon: Layers,
    headline: { before: "Replace multiple payments with ", mark: "one simpler repayment." },
    points: [
      ["Mix loan types", "Bring personal, credit card, and app loans together."],
      ["One EMI, one due date", "Keep it simple with a single monthly payment."],
      ["Lower overall cost", "Get a reduced interest rate and save more."],
    ],
    cta: { label: "Explore debt consolidation", href: "/debt-consolidation" },
  },
  {
    id: "overdraft",
    label: "Overdraft",
    icon: Landmark,
    headline: { before: "Explore options for expensive ", mark: "overdraft debt." },
    points: [
      ["Interest add-up fast", "Overdrafts often come with higher, ongoing rates."],
      ["A fixed-tenure loan", "Bring down your rate and repay in a set timeline."],
      ["Save more", "Lower your interest cost and improve cash flow."],
    ],
    cta: { label: "Check overdraft options", href: "/personal-loan-overdraft" },
  },
];


const BTN =
  "inline-flex h-[56px] items-center gap-2 rounded-lg bg-[#FD6C01] hover:bg-[#E15F00] px-7 text-[18px] font-semibold text-white shadow-[0_14px_26px_-12px_rgba(225,95,0,0.35)] transition-[filter] hover:brightness-105";

// What the visitor can tick. "Multiple loans" is the answer once two or more are ticked, so it is not a choice itself.
const CHOICES = ["personal-loan", "credit-card", "app-loans", "overdraft"] as const;
type ChoiceId = (typeof CHOICES)[number];
const byId = (id: string) => SOLUTIONS.find((s) => s.id === id)!;

export const LoanSolutionsSection = () => {
  // Start with two ticked so the answer card shows a real result instead of an empty prompt.
  const [picked, setPicked] = useState<ChoiceId[]>(["credit-card", "app-loans"]);

  const toggle = (id: ChoiceId) => {
    const on = !picked.includes(id);
    setPicked((p) => (on ? CHOICES.filter((c) => p.includes(c) || c === id) : p.filter((c) => c !== id)));
    track({ name: "select_content", params: { content_type: on ? "loan_solution_pick" : "loan_solution_unpick", content_id: id } });
  };

  const many = picked.length >= 2;
  const answer = many ? byId("multiple-loans") : picked.length === 1 ? byId(picked[0]) : null;
  const AnswerIcon = answer?.icon;
  const pickedChoices = CHOICES.filter((c) => picked.includes(c));
  const matched = lendersForAll(pickedChoices);

  return (
    <section className="relative w-full overflow-x-clip bg-gradient-to-br from-[#FFF1E3] via-[#FFF9F4] to-[#FFF1E3]">
      <div className="relative mx-auto max-w-[1220px] px-4 py-12 md:px-6 md:py-[64px] lg:px-8">
        <header className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="font-[family-name:var(--font-display)] text-[36px] font-[800] leading-[1.15] tracking-[-0.015em] text-[#252525] sm:text-[48px] lg:text-[54px]">
              Bring your eligible loans{" "}
              <span className="brush">
                together
              </span>
            </h2>
            <Link
              href="/eligibility"
              data-analytics-cta="loan_solutions_check_eligibility"
              data-analytics-location="loan_solutions"
              className={`${BTN} mt-7`}
            >
              Check your eligibility <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <p className="text-lg leading-[1.55] text-[#3A3A3A] md:text-[19px] lg:col-span-5">
            One simpler way to manage multiple debts. Different loans. Different stories. One smarter way forward.
          </p>
        </header>

        <div className="mt-10 grid items-start gap-8 md:mt-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* ── Left: what do you pay today? ── */}
          <div role="group" aria-labelledby="loan-pick-title" className="grid gap-3">
            <h3 id="loan-pick-title" className="mb-1 font-[family-name:var(--font-display)] text-[22px] font-[700] text-[#252525]">
              What are you paying today?
            </h3>
            {CHOICES.map((id) => {
              const s = byId(id);
              const Icon = s.icon;
              const on = picked.includes(id);
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(id)}
                  className={`flex items-center gap-3.5 rounded-2xl border-2 px-4 py-3.5 text-left text-[17px] font-semibold text-[#252525] transition-colors ${
                    on ? "border-[#C94400] bg-[#FFF9F4]" : "border-[#E9D9CD] bg-white hover:border-[#FFB366]"
                  }`}
                >
                  <span aria-hidden="true" className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-[#FFE4CC] text-[#C94400]">
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  {s.label}
                  <span
                    className={`ml-auto rounded-full px-2.5 py-1 text-[12.5px] font-bold leading-none transition-colors ${
                      on ? "bg-[#C94400] text-white" : "bg-[#FFE4CC] text-[#C94400]"
                    }`}
                  >
                    {lendersForAll([id]).length} lenders
                  </span>
                  <span
                    aria-hidden="true"
                    className={`flex h-[26px] w-[26px] items-center justify-center rounded-lg border-2 ${
                      on ? "border-[#C94400] bg-[#C94400] text-white" : "border-[#BBB] text-transparent"
                    }`}
                  >
                    <Check className="h-4 w-4" strokeWidth={3.2} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Right: the answer ── */}
          <div
            aria-live="polite"
            className="grid gap-5 rounded-[24px] border border-[#252525]/25 bg-white p-6 shadow-standard sm:p-[30px] sm:shadow-standard"
          >
            {answer && AnswerIcon ? (
              <>
                <div className="flex flex-wrap items-center gap-2 text-[14px] font-semibold">
                  {many ? (
                    <>
                      {CHOICES.filter((c) => picked.includes(c)).map((c, i) => (
                        <React.Fragment key={c}>
                          {i > 0 && <span aria-hidden="true" className="text-[#5F5F5F]">+</span>}
                          <span className="rounded-full bg-[#FFE4CC] px-3 py-[5px] text-[#C94400]">{byId(c).label}</span>
                        </React.Fragment>
                      ))}
                      <span aria-hidden="true" className="text-[#5F5F5F]">→</span>
                      <span className="rounded-full bg-[#C94400] px-3.5 py-[5px] font-bold text-white">One EMI</span>
                    </>
                  ) : (
                    <>
                      <span className="rounded-full bg-[#FFE4CC] px-3 py-[5px] text-[#C94400]">{answer.label}</span>
                      <span aria-hidden="true" className="text-[#5F5F5F]">→</span>
                      <span className="rounded-full bg-[#C94400] px-3.5 py-[5px] font-bold text-white">One simpler plan</span>
                    </>
                  )}
                </div>

                {matched.length > 0 && (
                  <div
                    key={pickedChoices.join("|")}
                    className="rise relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#C94400] via-[#E15F00] to-[#FD6C01] p-4 text-white shadow-[0_18px_30px_-18px_rgba(201,68,0,0.7)] sm:p-5"
                  >
                    <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/10" />
                    <span aria-hidden="true" className="pointer-events-none absolute -bottom-12 right-10 h-24 w-24 rounded-full bg-white/10" />
                    <div className="relative flex items-center gap-4">
                      <span className="font-[family-name:var(--font-display)] text-[64px] font-[800] leading-none tabular-nums sm:text-[76px]">
                        {matched.length}
                      </span>
                      <p className="text-[15px] font-semibold leading-[1.3] sm:text-[17px]">
                        partner {matched.length === 1 ? "lender" : "lenders"} can help with
                        <span className="block text-[13px] font-medium text-white/90 sm:text-[14px]">
                          {pickedChoices.map((c) => byId(c).label).join(" + ")}
                        </span>
                      </p>
                    </div>
                    <ul className="relative mt-3.5 flex flex-wrap gap-1.5" aria-label="Partner lenders for your selection">
                      {matched.map((l) => (
                        <li key={l.id} className="rounded-full bg-white px-3 py-1 text-[12.5px] font-semibold text-[#8F2F00]">
                          {l.name}
                        </li>
                      ))}
                    </ul>
                    <p className="relative mt-2.5 text-[11.5px] text-white/85">Lenders funding ₹30 lakh or more. Final eligibility depends on your profile.</p>
                  </div>
                )}

                <p className="font-[family-name:var(--font-display)] text-[26px] font-[700] leading-[1.16] tracking-[-0.01em] text-[#252525] sm:text-[30px] lg:text-[clamp(26px,2.6vw,34px)]">
                  {answer.headline.before}
                  <span className="brush">
                    {answer.headline.mark}
                  </span>
                  {answer.headline.after}
                </p>

                <ul className="grid gap-3.5">
                  {answer.points.map(([title, desc]) => (
                    <li key={title} className="flex items-start gap-3.5 text-[15px] leading-[1.4] text-[#3A3A3A] sm:text-[16px]">
                      <span aria-hidden="true" className="mt-px flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[#E4F4EA] text-[#15803D]">
                        <Check className="h-[15px] w-[15px]" strokeWidth={3} />
                      </span>
                      <span>
                        <strong className="block font-[700] text-[#252525]">{title}</strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>

                <div>
                  <Link
                    href={answer.cta.href}
                    data-analytics-cta={`loan_solutions_${answer.id}`}
                    data-analytics-location="loan_solutions"
                    className="inline-flex min-h-[56px] max-w-full items-center gap-2 rounded-lg bg-[#FD6C01] hover:bg-[#E15F00] px-7 py-2.5 text-[18px] font-semibold text-white shadow-[0_14px_26px_-12px_rgba(225,95,0,0.35)] transition-[filter] hover:brightness-105"
                  >
                    {answer.cta.label}
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </Link>
                </div>
              </>
            ) : (
              <div className="py-6">
                <p className="font-[family-name:var(--font-display)] text-[26px] font-[700] leading-[1.16] text-[#252525] sm:text-[30px]">
                  Tick the loans you pay today.
                </p>
                <p className="mt-3 max-w-[420px] text-[17px] leading-[1.55] text-[#3A3A3A]">We will show how they can come together into one plan.</p>
              </div>
            )}
          </div>
        </div>

        <p className="mt-8 text-sm text-[#626262]">*Illustrative figures only. Final rates and terms are set by partner lenders after checking your profile.</p>
      </div>
    </section>
  );
};
