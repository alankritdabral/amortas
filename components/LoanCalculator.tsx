"use client";
import { useMemo, useState, useRef, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { calculateEMI } from "@/lib/calculator";
import { track } from "@/lib/analytics/track";
import { bandAmount, bandRate, bandSavings } from "@/lib/analytics/events";

export function LoanCalculator() {
  const [existingLoan, setExistingLoan] = useState(500000);
  const [cc, setCC] = useState(150000);
  const [currentEMI, setCurrentEMI] = useState(35000);
  const [currentRate, setCurrentRate] = useState(18);
  const [tenure, setTenure] = useState(60);
  const [illustrativeRate, setIllustrativeRate] = useState(10.5);

  const totalPrincipal = existingLoan + cc;
  const illustrativeEMI = useMemo(
    () => calculateEMI(totalPrincipal, illustrativeRate, tenure),
    [totalPrincipal, illustrativeRate, tenure]
  );
  const diff = currentEMI - illustrativeEMI;
  const totalCurrent = currentEMI * tenure;
  const totalNew = illustrativeEMI * tenure;
  const totalSavedOverTenure = Math.max(0, totalCurrent - totalNew);

  const hasStartedRef = useRef(false);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackChange = useCallback(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      track({ name: "calculator_start", params: { calculator_id: "loan_savings" } });
    }
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
    // Debounced on idle (not a raw throttle), so it fires once per "pause in
    // dragging" rather than on every tick — see plans/01-…/Appendix A.
    resultTimerRef.current = setTimeout(() => {
      track({
        name: "calculator_result",
        params: {
          calculator_id: "loan_savings",
          loan_amount_band: bandAmount(totalPrincipal),
          rate_band: bandRate(illustrativeRate),
          tenure_months: tenure,
          savings_band: bandSavings(Math.max(0, diff) * tenure),
          debts_count: cc > 0 ? 2 : 1,
        },
      });
    }, 1500);
  }, [totalPrincipal, illustrativeRate, tenure, diff, cc]);

  return (
    <section id="calculator" className="bg-[#FFE4CC]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold text-[#252525] max-w-3xl">
          How much could you stop paying every month?
        </h2>
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#626262] max-w-2xl">
          Put in what you pay now. We&apos;ll show what it might look like as one loan. It&apos;s only an
          estimate, but it&apos;s a good place to start the conversation.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:items-start">
          <div className="bg-white p-6 sm:p-9 space-y-6">
            <h3 className="text-2xl font-bold tracking-[-0.02em] text-[#252525]">
              What do you owe right now?
            </h3>
            <Slider label="Total loan outstanding" value={existingLoan} min={50000} max={2000000} step={10000} onChange={(v) => { setExistingLoan(v); trackChange(); }} display={formatINR(existingLoan)} />
            <Slider label="Credit-card dues or app loans" value={cc} min={0} max={1000000} step={5000} onChange={(v) => { setCC(v); trackChange(); }} display={formatINR(cc)} />
            <Slider label="What you pay in EMIs each month" value={currentEMI} min={5000} max={120000} step={1000} onChange={(v) => { setCurrentEMI(v); trackChange(); }} display={formatINR(currentEMI)} />
            <Slider label="Your current interest rate" value={currentRate} min={8} max={36} step={0.5} onChange={(v) => { setCurrentRate(v); trackChange(); }} display={`${currentRate}%`} />
            <Slider label="Time left to repay" value={tenure} min={12} max={84} step={12} onChange={(v) => { setTenure(v); trackChange(); }} display={`${tenure / 12} years`} />

            <div className="bg-[#FFE4CC] p-5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-base font-semibold text-[#252525]">Rate you might get*</span>
                <span className="text-xl font-bold text-[#252525]">{illustrativeRate}%</span>
              </div>
              <input
                type="range"
                min={9.5}
                max={16}
                step={0.25}
                value={illustrativeRate}
                onChange={(e) => { setIllustrativeRate(parseFloat(e.target.value)); trackChange(); }}
                className="mt-3 w-full h-2 appearance-none bg-[#E5E5E5] accent-[#E15F00] cursor-pointer"
                aria-label="Rate you might get"
              />
              <p className="mt-2 text-sm text-[#626262]">Partner banks start from 9.99% p.a.* for eligible salaried applicants.</p>
            </div>
          </div>

          <div className="bg-[#252525] text-white p-6 sm:p-9" aria-live="polite">
            <p className="text-[#FFD1A3] text-base">Today you pay</p>
            <p className="text-[32px] font-bold tracking-[-0.03em] line-through decoration-[#FFD1A3] decoration-2">
              {formatINR(currentEMI)} <span className="text-lg font-medium no-underline">a month</span>
            </p>
            <p className="mt-6 text-[#FFD1A3] text-base">As one loan, it could be about</p>
            <p className="text-[56px] md:text-[56px] font-bold tracking-[-0.04em] leading-none">
              {formatINR(Math.round(illustrativeEMI))}
              <span className="text-xl font-medium text-[#FFD1A3] tracking-normal"> a month*</span>
            </p>
            <p className="mt-6 pt-6 border-t border-white/15 text-lg leading-relaxed text-[#FFD1A3]">
              {diff > 0 ? (
                <>
                  That&apos;s roughly <b className="text-[#FFD1A3]">{formatINR(Math.round(diff))}</b> less every month, and about{" "}
                  <b className="text-[#FFD1A3]">{formatINR(Math.round(totalSavedOverTenure))}</b> over {tenure / 12} years.
                </>
              ) : (
                <>With these numbers, one loan wouldn&apos;t lower your EMI. We&apos;d tell you that straight too.</>
              )}
            </p>
            <a
              href="#lead-form"
              data-analytics-cta="loan_calculator_get_assessment"
              data-analytics-location="loan_calculator"
              className="mt-8 inline-flex items-center gap-2 rounded bg-white text-[#252525] font-bold text-lg px-7 py-4 hover:bg-[#FFD1A3] transition-colors"
            >
              Get my free assessment <ArrowRight className="h-5 w-5" />
            </a>
            <p className="mt-6 text-sm text-[#FFD1A3] leading-relaxed">
              *Illustrative estimates only. Actual savings, approval, rates and tenure are decided by the
              lender after checking your credit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-base font-medium text-[#252525]">{label}</span>
        <span className="text-xl font-bold tracking-[-0.02em] text-[#252525]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full h-2 appearance-none bg-[#E5E5E5] accent-[#E15F00] cursor-pointer"
      />
    </label>
  );
}
