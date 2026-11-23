"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WhatsAppChatLink } from "@/components/WhatsAppChatLink";
import { track } from "@/lib/analytics/track";

type Mode = "today" | "one";

// The same illustrative example LoanSolutionsSection shows: four EMIs that
// total 28,800 a month, merged into one EMI of 24,999.
const BILLS = [
  { due: "5th", name: "Personal loan", amount: "₹12,500" },
  { due: "9th", name: "Credit card", amount: "₹8,300" },
  { due: "14th", name: "Overdraft", amount: "₹4,200" },
  { due: "21st", name: "App loan", amount: "₹3,800" },
] as const;

const SEG_BASE =
  "min-h-[52px] flex-1 sm:flex-none px-6 text-[17px] font-bold text-[#1A1A1A] transition-colors";

function Check() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

/** Option H hero: "Your month, simplified." with a Today / With one EMI switch. */
export function BeforeAfterHero() {
  const [mode, setMode] = useState<Mode>("today");
  const isToday = mode === "today";

  const choose = (next: Mode) => {
    if (next === mode) return;
    setMode(next);
    track({
      name: "select_content",
      params: { content_type: "hero_view_toggle", content_id: next === "today" ? "today" : "one_emi" },
    });
  };

  return (
    <section className="w-full bg-[#FFF8F3] pt-[100px] lg:pt-[116px]">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-12 px-4 pb-14 sm:px-6 sm:pb-[72px] lg:flex-row lg:items-center lg:gap-16 lg:px-8">
        {/* Left: promise, switch, actions */}
        <div className="min-w-0 flex-1">
          <p className="mb-5 inline-block rounded border-2 border-[#1A1A1A] bg-white px-3 py-1.5 text-[13px] font-bold uppercase tracking-[0.04em] text-[#2E2E2E] sm:text-sm">
            Free · No obligation
          </p>
          <h1 className="hero-title text-[48px] font-bold leading-[0.98] tracking-[-0.045em] text-[#1A1A1A] sm:text-[64px] lg:text-[80px]">
            Your month,
            <br />
            <span className="-ml-2 bg-[#FFDA00] px-2 sm:-ml-2.5 sm:px-2.5">simplified.</span>
          </h1>
          <p className="hero-description mt-6 max-w-[460px] text-[17px] leading-[1.5] text-[#575757] sm:mt-7 sm:text-xl">
            Flip the switch to see the same loans as one EMI and one due date.
          </p>

          <div
            role="group"
            aria-label="Choose a view"
            className="mt-7 flex w-full overflow-hidden rounded-md border-2 border-[#1A1A1A] bg-white sm:inline-flex sm:w-auto"
          >
            <button
              type="button"
              aria-pressed={isToday}
              onClick={() => choose("today")}
              className={`${SEG_BASE} border-r-2 border-[#1A1A1A] ${isToday ? "bg-[#FF5A00]" : "bg-white hover:bg-[#FFF8F3]"}`}
            >
              Today
            </button>
            <button
              type="button"
              aria-pressed={!isToday}
              onClick={() => choose("one")}
              className={`${SEG_BASE} ${!isToday ? "bg-[#FF5A00]" : "bg-white hover:bg-[#FFF8F3]"}`}
            >
              With one EMI
            </button>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href="#check-eligibility"
              data-analytics-cta="hero_check_eligibility"
              data-analytics-location="hero"
              className="inline-flex h-[58px] items-center justify-center gap-2.5 rounded border-2 border-[#1A1A1A] bg-[#FF5A00] px-6 text-lg font-bold text-[#1A1A1A] shadow-[4px_4px_0_0_#1A1A1A] transition-colors hover:bg-[#E04F00]"
            >
              Check my eligibility
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <WhatsAppChatLink
              data-analytics-location="hero"
              className="inline-flex h-[58px] items-center justify-center gap-2.5 rounded border-2 border-[#1A1A1A] bg-white px-6 text-lg font-bold text-[#1A1A1A] shadow-[4px_4px_0_0_#1A1A1A] transition-colors hover:bg-[#F7E0D4]"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Chat on WhatsApp
            </WhatsAppChatLink>
          </div>

          <ul className="mt-7 flex flex-col gap-2 text-base font-bold text-[#2E2E2E]">
            <li className="flex items-center gap-2.5"><Check />We never ask you to pay anything.</li>
            <li className="flex items-center gap-2.5"><Check />You can stop at any step.</li>
          </ul>
        </div>

        {/* Right: the month */}
        <div className="min-w-0 flex-1 lg:max-w-[540px]">
          <div className="rounded-md border-2 border-[#1A1A1A] bg-white p-5 shadow-[6px_6px_0_0_#1A1A1A] sm:p-[26px]">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#2E2E2E] sm:text-sm">
                {isToday ? "Every month, today" : "Every month, with one EMI"}
              </p>
              <p className="text-[15px] font-bold text-[#2E2E2E] sm:text-base" aria-live="polite">
                {isToday ? "4 payments" : "1 payment"}
              </p>
            </div>

            {isToday ? (
              <>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {BILLS.map((b) => (
                    <li key={b.name} className="flex items-center gap-3 rounded border-2 border-[#1A1A1A] bg-[#FFF8F3] px-3 py-2.5 sm:gap-3.5 sm:px-3.5">
                      <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-base font-bold text-white sm:h-[52px] sm:w-[52px] sm:text-lg">
                        {b.due}
                      </span>
                      <span className="flex-1 text-base font-bold text-[#2E2E2E] sm:text-lg">{b.name}</span>
                      <span className="text-[17px] font-bold tracking-[-0.02em] text-[#2E2E2E] sm:text-xl">{b.amount}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-baseline justify-between gap-3 border-t-2 border-dashed border-[#FFD2B8] pt-4">
                  <span className="text-[15px] text-[#575757] sm:text-base">Total each month</span>
                  <span className="text-[28px] font-bold tracking-[-0.03em] text-[#2E2E2E] sm:text-[30px]">₹28,800</span>
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 flex items-center gap-3.5 rounded border-2 border-[#1A1A1A] bg-[#FFDA00] px-3.5 py-4 text-[#1A1A1A] sm:py-[18px]">
                  <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded bg-[#1A1A1A] text-lg font-bold text-white sm:h-[60px] sm:w-[60px] sm:text-xl">
                    5th
                  </span>
                  <span className="flex-1 text-[19px] font-bold leading-[1.15] tracking-[-0.02em] sm:text-[22px]">One EMI</span>
                  <span className="text-[21px] font-bold tracking-[-0.03em] sm:text-[26px]">~₹24,999</span>
                </div>
                <p className="mt-4 text-base leading-[1.5] text-[#2E2E2E] sm:text-[17px]">
                  Four payments became one, if your profile and a partner lender allow it.
                </p>
                <div className="mt-4 flex items-baseline justify-between gap-3 border-t-2 border-dashed border-[#FFD2B8] pt-4">
                  <span className="text-[15px] text-[#575757] sm:text-base">Around, each month</span>
                  <span className="text-[28px] font-bold tracking-[-0.03em] text-[#2E2E2E] sm:text-[30px]">₹24,999</span>
                </div>
              </>
            )}

            <p className="mt-3.5 text-[13px] leading-[1.5] text-[#575757] sm:text-sm">
              Illustrative example, not an offer. Actual terms depend on your profile and the lender&apos;s decision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
