"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { title: "You tell us where you stand.", desc: "Your loans, your EMIs, your salary. A rough idea is fine. You don't need every document ready." },
  { title: "We go through it properly.", desc: "We look at what you're paying now, at what rate, and what lenders could realistically offer you." },
  { title: "We explain it like a friend would.", desc: "In plain rupees: what you pay now, what you could pay instead, and whether it's worth the switch." },
  { title: "Then it's your call.", desc: "Apply, wait, or walk away. Nothing is pushed on you, and the final decision is always yours." },
] as const;

/** "What happens after you reach out." as a vertical timeline. */
export function HowTimeline() {
  // Steps light up as they scroll into view; the connector draws down to the next one.
  const [ready, setReady] = useState(false);
  const [seen, setSeen] = useState(0); // number of steps reached
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      const id = requestAnimationFrame(() => setSeen(STEPS.length));
      return () => cancelAnimationFrame(id);
    }
    const raf = requestAnimationFrame(() => setReady(true));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLLIElement);
          if (i >= 0) setSeen((n) => Math.max(n, i + 1));
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0.2 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <section id="how-it-works" className="w-full bg-white text-[#252525]">
      <div className="mx-auto flex max-w-[1220px] flex-col gap-8 px-4 py-12 md:px-6 md:py-[72px] lg:flex-row lg:items-start lg:gap-[72px] lg:px-8">
        <div className="min-w-0 lg:flex-1 lg:basis-[340px] lg:sticky lg:top-28">
          <h2 className="text-[36px] font-bold leading-none tracking-[-0.04em] sm:text-[48px] lg:text-[60px]">
            What happens after you reach out.
          </h2>
          <p className="mt-5 max-w-[420px] text-[17px] leading-[1.5] text-[#626262] sm:text-xl">
            Four simple steps. You can stop at any of them, no questions asked.
          </p>
        </div>

        <ol className="min-w-0 lg:flex-[1.6]">
          {STEPS.map((s, i) => {
            const last = i === STEPS.length - 1;
            const reached = !ready || i < seen;
            const current = ready && i === seen - 1;
            return (
              <li key={s.title} ref={(el) => { refs.current[i] = el; }} className="flex gap-4 sm:gap-[22px]">
                <div className="flex flex-col items-center">
                  <span className="relative flex shrink-0">
                    {current && <span aria-hidden="true" className="how-ring absolute inset-0 rounded-full bg-[#FD6C01]" />}
                    <span
                      className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 text-[19px] font-bold transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(.3,1.4,.5,1)] motion-reduce:transition-none sm:h-[52px] sm:w-[52px] sm:text-[22px] ${
                        current
                          ? "scale-110 border-[#FD6C01] bg-[#FD6C01] text-white"
                          : reached
                            ? "scale-100 border-[#252525] bg-[#252525] text-white"
                            : "scale-90 border-[#252525]/20 bg-white text-[#252525]/35"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  {!last && (
                    <span aria-hidden="true" className="relative min-h-[28px] w-0.5 flex-1 bg-[#252525]/10 sm:min-h-10">
                      <span
                        className={`absolute inset-0 origin-top bg-[#252525] transition-transform duration-[900ms] ease-out motion-reduce:transition-none ${
                          i + 1 < seen || !ready ? "scale-y-100" : "scale-y-0"
                        }`}
                        style={{ transitionDelay: i + 1 < seen ? "250ms" : "0ms" }}
                      />
                    </span>
                  )}
                </div>
                <div className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${last ? "" : "pb-6 sm:pb-8"} ${reached ? "translate-y-0 opacity-100" : "translate-y-5 opacity-30"}`}>
                  <h3 className="mt-1.5 text-[21px] font-bold leading-[1.15] tracking-[-0.02em] sm:mt-2 sm:text-[26px]">{s.title}</h3>
                  <p className="mt-1.5 text-base leading-[1.5] text-[#626262] sm:text-[17px]">{s.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
