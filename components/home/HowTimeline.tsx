const STEPS = [
  { title: "You tell us where you stand.", desc: "Your loans, your EMIs, your salary. A rough idea is fine. You don't need every document ready." },
  { title: "We go through it properly.", desc: "We look at what you're paying now, at what rate, and what lenders could realistically offer you." },
  { title: "We explain it like a friend would.", desc: "In plain rupees: what you pay now, what you could pay instead, and whether it's worth the switch." },
  { title: "Then it's your call.", desc: "Apply, wait, or walk away. Nothing is pushed on you, and the final decision is always yours." },
] as const;

/** "What happens after you reach out." as a vertical timeline. */
export function HowTimeline() {
  return (
    <section id="how-it-works" className="w-full bg-white text-[#2E2E2E]">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-8 px-4 py-12 md:px-6 md:py-[72px] lg:flex-row lg:items-start lg:gap-[72px] lg:px-8">
        <div className="min-w-0 lg:flex-1 lg:basis-[340px] lg:sticky lg:top-28">
          <h2 className="text-[36px] font-bold leading-none tracking-[-0.04em] sm:text-[48px] lg:text-[60px]">
            What happens after you reach out.
          </h2>
          <p className="mt-5 max-w-[420px] text-[17px] leading-[1.5] text-[#575757] sm:text-xl">
            Four simple steps. You can stop at any of them, no questions asked.
          </p>
        </div>

        <ol className="min-w-0 lg:flex-[1.6]">
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li key={s.title} className="flex gap-4 sm:gap-[22px]">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#1A1A1A] text-[19px] font-bold sm:h-[52px] sm:w-[52px] sm:text-[22px] ${
                      last ? "bg-[#F7E0D4] text-[#1A1A1A]" : "bg-[#2E2E2E] text-white"
                    }`}
                  >
                    {i + 1}
                  </span>
                  {!last && <span aria-hidden="true" className="min-h-[28px] w-0.5 flex-1 bg-[#1A1A1A] sm:min-h-10" />}
                </div>
                <div className={last ? "" : "pb-6 sm:pb-8"}>
                  <h3 className="mt-1.5 text-[21px] font-bold leading-[1.15] tracking-[-0.02em] sm:mt-2 sm:text-[26px]">{s.title}</h3>
                  <p className="mt-1.5 text-base leading-[1.5] text-[#575757] sm:text-[17px]">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
