import Link from "next/link";
import { ArrowRight } from "lucide-react";

const WORDS = ["One EMI", "Lower rates", "13 partner lenders", "No hidden fees", "Your call", "Plain rupees"];

/** Full-bleed orange ticker band — the loud divider under the hero. */
export function MarqueeBand() {
  return (
    <div aria-hidden className="orange-marquee overflow-hidden py-3 sm:py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {WORDS.map((w) => (
              <span key={w + k} className="flex items-center text-xl sm:text-3xl font-extrabold uppercase tracking-[-0.02em] whitespace-nowrap">
                <span className="px-6 sm:px-10">{w}</span>
                <span className="text-[#0A0A0A]">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Big orange call-to-action band that closes the page above the black footer. */
export function CtaBand() {
  return (
    <section className="w-full bg-[#FF5A00] text-white border-t-2 border-[#0A0A0A]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <h2 className="text-[44px] sm:text-[64px] lg:text-[88px] leading-[0.95] font-extrabold tracking-[-0.05em] max-w-3xl">
          Ready to pay less on your EMIs?
        </h2>
        <Link
          href="#check-eligibility"
          data-analytics-cta="cta_band_check_eligibility"
          data-analytics-location="cta_band"
          className="inline-flex items-center justify-center gap-2 h-14 px-8 bg-[#0A0A0A] text-white text-lg font-bold rounded border-2 border-[#0A0A0A] shadow-[4px_4px_0_0_#FFDA00] hover:bg-white hover:text-[#0A0A0A] transition-colors"
        >
          Check My Eligibility <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
