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
    <section className="w-full bg-[#FFE4CC] text-[#252525]">
      <div className="mx-auto max-w-[1220px] px-4 py-12 md:px-6 md:py-[72px] lg:px-8">
        <h2 className="text-[36px] font-bold leading-none tracking-[-0.04em] sm:text-[48px] lg:text-[60px]">
          What changes. What does not.
        </h2>
        <div className="mt-8 flex flex-col gap-5 md:mt-10 md:flex-row md:gap-6">
          <div className="flex-1 rounded-md border border-[#252525]/25 bg-white p-5 sm:p-8">
            <p className="mb-5 text-lg font-bold uppercase tracking-[0.08em] sm:text-xl">What can change</p>
            <ul className="flex flex-col gap-3.5 text-[15px] font-semibold leading-[1.4] sm:text-[17px]">
              {CAN_CHANGE.map((t) => (
                <li key={t} className="flex gap-3">
                  <Repeat className="mt-0.5 h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 rounded-md border border-[#252525]/25 bg-white p-5 sm:p-8">
            <p className="mb-5 text-lg font-bold uppercase tracking-[0.08em] sm:text-xl">What does not change</p>
            <ul className="flex flex-col gap-3.5 text-[15px] font-semibold leading-[1.4] sm:text-[17px]">
              {STAYS_SAME.map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-[#047857] sm:h-5 sm:w-5" strokeWidth={3.5} aria-hidden="true" />
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
