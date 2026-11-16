"use client";
import { whoWeHelp } from "@/content/site";

export function WhoWeHelp() {
  return (
    <section className="bg-[#FFF1E8] text-[#0A0A0A]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">
            Does any of this sound like you?
          </h2>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#404040] max-w-md">
            If it does, we can probably help, whether you need consolidation, a lower rate or a fresh
            loan.
          </p>
          <a
            href="#credit-profile"
            data-analytics-cta="who_we_help_check_eligibility"
            data-analytics-location="who_we_help"
            className="mt-8 inline-flex items-center rounded bg-[#FF5A00] hover:bg-[#0A0A0A] transition-colors text-white font-bold text-lg px-7 py-4"
          >
            Check my eligibility
          </a>
        </div>
        <div className="bg-white p-7 md:p-9">
          <ul className="divide-y divide-[#E5E5E5]">
            {whoWeHelp.map((item) => (
              <li key={item} className="py-4 text-lg md:text-xl leading-snug">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-[#404040]">
            Lender policies decide final approval. Meeting the general criteria just helps us spot
            options that suit you.
          </p>
        </div>
      </div>
    </section>
  );
}
