import { Repeat, Check } from "lucide-react";

const CAN_CHANGE = [
  "Several payments become one.",
  "Several due dates become one.",
  "The monthly amount may come down.",
];

const STAYS_SAME = [
  "Your final lender makes the credit decision.",
  "The final call is yours.",
  "We never ask you to pay anything.",
];

/** "What changes. What does not." Sets honest expectations right after the hero. */
export function ChangesSection() {
  return (
    <section className="w-full bg-[#F7E0D4] text-[#2E2E2E]">
      <div className="mx-auto max-w-[1220px] px-4 py-12 md:px-6 md:py-[72px] lg:px-8">
        <h2 className="text-[36px] font-bold leading-none tracking-[-0.04em] sm:text-[48px] lg:text-[60px]">
          What changes. What does not.
        </h2>
        <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:gap-6">
          <div className="flex-1 rounded-md border-2 border-[#1A1A1A] bg-white p-5 shadow-[4px_4px_0_0_#1A1A1A] sm:p-7 sm:shadow-[5px_5px_0_0_#1A1A1A]">
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] sm:text-sm">What can change</p>
            <ul className="flex flex-col gap-3.5 text-[17px] font-bold leading-[1.4] sm:text-[19px]">
              {CAN_CHANGE.map((t) => (
                <li key={t} className="flex gap-3">
                  <Repeat className="mt-0.5 h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 rounded-md border-2 border-[#1A1A1A] bg-white p-5 shadow-[4px_4px_0_0_#1A1A1A] sm:p-7 sm:shadow-[5px_5px_0_0_#1A1A1A]">
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] sm:text-sm">What does not change</p>
            <ul className="flex flex-col gap-3.5 text-[17px] font-bold leading-[1.4] sm:text-[19px]">
              {STAYS_SAME.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#047857] sm:h-[22px] sm:w-[22px]" strokeWidth={3.5} aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
