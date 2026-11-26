"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Sparkles, TrendingUp } from "lucide-react";
import { bandFor, recommend, scoreBands, type Advice, type Profile } from "@/lib/creditSolutions";

/** Ranked service cards + caution + "improve first" list for a given advice object. */
export function SolutionCards({ advice, source }: { advice: Advice; source: string }) {
  const { recommendations, caution, improve } = advice;
  return (
    <div>
      {caution && (
        <div role="note" className="mb-5 flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-[#252525]">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
          <p>{caution}</p>
        </div>
      )}

      {recommendations.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {recommendations.map((r) => (
            <li key={r.service.key} className={`flex flex-col rounded-2xl border p-5 ${r.priority === "best" ? "border-[#FD6C01] bg-white shadow-[0_12px_32px_rgba(253,108,1,0.12)]" : "border-[#E7E2DD] bg-white"}`}>
              <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${r.priority === "best" ? "bg-[#FD6C01] text-[#252525]" : "bg-[#FFE4CC] text-[#252525]"}`}>
                {r.priority === "best" && <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />}
                {r.priority === "best" ? "Best match" : "Worth a look"}
              </span>
              <h3 className="mt-3 text-xl font-bold tracking-[-0.02em] text-[#252525]">{r.service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#626262]">{r.reason}</p>
              <Link
                href={r.service.href}
                data-analytics-cta={`solution_${r.service.key}`}
                data-analytics-location={source}
                className="mt-4 inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-[#C94400] hover:text-[#252525]"
              >
                See how it works <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-[#E7E2DD] bg-white p-5 text-sm leading-relaxed text-[#626262]">
          Nothing needs fixing right now. Keep paying on time and check back before your next big borrowing decision.
        </div>
      )}

      {improve.length > 0 && (
        <div className="mt-5 rounded-2xl bg-[#252525] p-5 text-white">
          <p className="flex items-center gap-2 text-sm font-bold text-[#FFD1A3]"><TrendingUp className="h-4 w-4" aria-hidden="true" /> Do these first</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#E5E5E5]">
            {improve.map((t) => <li key={t} className="flex gap-2"><span aria-hidden="true">•</span>{t}</li>)}
          </ul>
        </div>
      )}
      <p className="mt-4 text-xs leading-relaxed text-[#737373]">
        Guidance based on common lender rules. It is not an offer or a promise of approval. The lender decides the final rate and terms.
      </p>
    </div>
  );
}

const toggles: { key: keyof Profile; label: string }[] = [
  { key: "needsCash", label: "I need fresh cash" },
  { key: "hasOverdue", label: "I have an overdue payment" },
];

/**
 * Interactive "what fits my profile" tool for visitors who have not pulled a
 * report yet. Everything runs in the browser; nothing is sent anywhere.
 */
export function SolutionMatcher() {
  const [score, setScore] = useState(740);
  const [loans, setLoans] = useState(2);
  const [cardBalance, setCardBalance] = useState(60000);
  const [maxRate, setMaxRate] = useState(18);
  const [emiRatio, setEmiRatio] = useState(40);
  const [flags, setFlags] = useState<Partial<Record<keyof Profile, boolean>>>({});

  const band = bandFor(score);
  const advice = useMemo(
    () => recommend({
      score, activeLoans: loans, cardBalance, maxRate: loans ? maxRate : 0, emiRatio: emiRatio / 100,
      needsCash: !!flags.needsCash, hasOverdue: !!flags.hasOverdue,
    }),
    [score, loans, cardBalance, maxRate, emiRatio, flags],
  );

  const field = "mt-2 w-full accent-[#FD6C01]";
  const label = "flex items-baseline justify-between text-sm font-semibold text-[#252525]";
  const val = "text-base font-bold text-[#C94400]";

  return (
    <div className="grid gap-8 lg:grid-cols-[5fr_7fr]">
      <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl border border-[#E7E2DD] bg-white p-6 md:p-8" aria-label="Your credit profile">
        <div>
          <label htmlFor="m-score" className={label}>Credit score <span className={val}>{score}</span></label>
          <input id="m-score" type="range" min={300} max={900} step={10} value={score} onChange={(e) => setScore(+e.target.value)} className={field} />
          {band && <span className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${band.tone}`}>{band.label}</span>}
        </div>
        <div className="mt-6">
          <label htmlFor="m-loans" className={label}>Running loans <span className={val}>{loans}</span></label>
          <input id="m-loans" type="range" min={0} max={8} step={1} value={loans} onChange={(e) => setLoans(+e.target.value)} className={field} />
        </div>
        {loans > 0 && (
          <div className="mt-6">
            <label htmlFor="m-rate" className={label}>Highest loan rate <span className={val}>{maxRate}% p.a.</span></label>
            <input id="m-rate" type="range" min={9} max={36} step={1} value={maxRate} onChange={(e) => setMaxRate(+e.target.value)} className={field} />
          </div>
        )}
        <div className="mt-6">
          <label htmlFor="m-card" className={label}>Credit-card balance <span className={val}>₹{cardBalance.toLocaleString("en-IN")}</span></label>
          <input id="m-card" type="range" min={0} max={500000} step={5000} value={cardBalance} onChange={(e) => setCardBalance(+e.target.value)} className={field} />
        </div>
        <div className="mt-6">
          <label htmlFor="m-ratio" className={label}>EMIs as % of income <span className={val}>{emiRatio}%</span></label>
          <input id="m-ratio" type="range" min={0} max={90} step={5} value={emiRatio} onChange={(e) => setEmiRatio(+e.target.value)} className={field} />
        </div>
        <fieldset className="mt-6 space-y-3">
          <legend className="sr-only">Other details</legend>
          {toggles.map((t) => (
            <label key={t.key} className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#252525]">
              <input type="checkbox" checked={!!flags[t.key]} onChange={(e) => setFlags({ ...flags, [t.key]: e.target.checked })} className="h-5 w-5 rounded accent-[#252525]" />
              {t.label}
            </label>
          ))}
        </fieldset>
      </form>

      <div aria-live="polite">
        {band && <p className="mb-4 text-base leading-relaxed text-[#626262]">{band.summary}</p>}
        <SolutionCards advice={advice} source="solution_matcher" />
      </div>
    </div>
  );
}

/** Colour-coded score-range ladder used on the free score page. */
export function ScoreLadder() {
  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {scoreBands.map((b) => (
        <li key={b.key} className="rounded-2xl border border-[#E7E2DD] bg-white p-5">
          <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${b.tone}`}>{b.label}</span>
          <p className="mt-3 text-2xl font-bold tracking-[-0.03em] text-[#252525]">{b.range}</p>
          <p className="mt-2 text-sm leading-relaxed text-[#626262]">{b.summary}</p>
        </li>
      ))}
    </ol>
  );
}
