import Link from "next/link";
import {
  Wallet, Zap, Landmark, Layers, ArrowLeftRight, CreditCard, Percent, Smartphone, ArrowRight, type LucideIcon,
} from "lucide-react";
import type { City } from "@/lib/cities";
import { cityOptions, optionHref, situations, type CityOption } from "@/lib/cityOptions";

const icons: Record<CityOption["icon"], LucideIcon> = {
  wallet: Wallet, zap: Zap, landmark: Landmark, layers: Layers,
  transfer: ArrowLeftRight, card: CreditCard, percent: Percent, app: Smartphone,
};

/**
 * Sticky tab bar listing every option for the city. On a city product page the
 * current option is highlighted; on the hub nothing is. Plain links, so it
 * works without JavaScript and every option is one click away.
 */
export function CityOptionTabs({ city, activeKey }: { city: City; activeKey?: string }) {
  return (
    <nav
      aria-label={`All loan options in ${city.name}`}
      className="sticky top-0 z-30 border-y border-[#E5E5E5] bg-white/95 backdrop-blur"
    >
      <ul role="list" className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
        {cityOptions.map((o) => {
          const active = o.key === activeKey;
          return (
            <li key={o.key} className="shrink-0">
              <Link
                href={optionHref(o, city)}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center rounded-full px-4 h-10 text-sm font-semibold transition-colors ${
                  active ? "bg-[#252525] text-white" : "bg-[#FFF1E3] text-[#252525] hover:bg-[#FD6C01]"
                }`}
              >
                {o.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Card grid of every option, each linking to its page for this city. */
export function CityOptionsGrid({ city, activeKey, heading, intro }: { city: City; activeKey?: string; heading: string; intro?: string }) {
  return (
    <section className="bg-[#FFE4CC] text-[#252525]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
        <div className="max-w-2xl">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">{heading}</h2>
          {intro && <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#626262]">{intro}</p>}
        </div>
        <ul role="list" className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cityOptions.map((o) => {
            const Icon = icons[o.icon];
            const active = o.key === activeKey;
            return (
              <li key={o.key}>
                <Link
                  href={optionHref(o, city)}
                  aria-current={active ? "page" : undefined}
                  className={`group flex h-full flex-col rounded-2xl p-6 border transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                    active ? "bg-[#252525] text-white border-[#252525]" : "bg-white border-[#E15F00]/10 shadow-sm"
                  }`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FD6C01] text-[#252525]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{o.title}</h3>
                  <p className={`mt-2 text-base leading-relaxed ${active ? "text-white/80" : "text-[#626262]"}`}>{o.summary}</p>
                  <p className={`mt-4 text-sm leading-snug ${active ? "text-white/80" : "text-[#626262]"}`}>
                    <strong className={active ? "text-white" : "text-[#252525]"}>Suits: </strong>
                    {o.bestFor}
                  </p>
                  <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-base font-semibold">
                    {active ? "You are here" : `See ${o.title.toLowerCase()} in ${city.name}`}
                    {!active && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-[#626262]">
          *Rates depend on credit profile, income, employer, existing obligations, loan amount, tenure and lender policy.
          For eligible salaried applicants only.
        </p>
      </div>
    </section>
  );
}

/** "Which fits me?" guide: situation to option. */
export function CitySituationGuide({ city }: { city: City }) {
  return (
    <section className="section-tint text-[#252525]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <div>
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">Not sure which one?</h2>
          <p className="mt-5 text-lg text-[#626262] leading-relaxed max-w-md">
            Start from your situation. Each line takes you to the option that usually fits it, for {city.name}.
          </p>
        </div>
        <ul role="list" className="divide-y divide-[#E5E5E5] border-y border-[#E5E5E5]">
          {situations.map((s) => {
            const o = cityOptions.find((x) => x.key === s.optionKey)!;
            return (
              <li key={s.situation}>
                <Link
                  href={optionHref(o, city)}
                  className="group flex items-center justify-between gap-4 py-5 hover:bg-[#FFE4CC]/60 px-2 transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold tracking-[-0.01em]">{s.situation}</span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-base font-semibold text-[#E15F00]">
                    {o.title}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Side-by-side comparison: stacked cards on mobile, a table from md up. */
export function CityCompare({ city }: { city: City }) {
  return (
    <section className="bg-white text-[#252525]">
      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
        <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold max-w-3xl">Side by side.</h2>
        <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#626262] max-w-2xl">
          How each option works, who it tends to suit and what to check first. General guidance, not an offer.
        </p>

        <div className="mt-10 hidden md:block overflow-x-auto rounded-2xl border border-[#E5E5E5]">
          <table className="w-full text-left text-base">
            <thead className="bg-[#252525] text-white">
              <tr>
                <th className="px-5 py-4 font-semibold">Option</th>
                <th className="px-5 py-4 font-semibold">Suits</th>
                <th className="px-5 py-4 font-semibold">How you repay</th>
                <th className="px-5 py-4 font-semibold">Check first</th>
              </tr>
            </thead>
            <tbody>
              {cityOptions.map((o, i) => (
                <tr key={o.key} className={i % 2 === 0 ? "bg-white" : "bg-[#FFF9F4]"}>
                  <th scope="row" className="px-5 py-4 align-top font-bold">
                    <Link href={optionHref(o, city)} className="hover:text-[#E15F00] hover:underline">{o.title}</Link>
                  </th>
                  <td className="px-5 py-4 align-top text-[#626262]">{o.bestFor}</td>
                  <td className="px-5 py-4 align-top text-[#626262]">{o.repay}</td>
                  <td className="px-5 py-4 align-top text-[#626262]">{o.checkFirst}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul role="list" className="mt-10 grid gap-4 md:hidden">
          {cityOptions.map((o) => (
            <li key={o.key} className="rounded-2xl border border-[#E5E5E5] p-5">
              <h3 className="text-xl font-bold">
                <Link href={optionHref(o, city)} className="hover:text-[#E15F00]">{o.title}</Link>
              </h3>
              <dl className="mt-3 space-y-2 text-base text-[#626262]">
                <div><dt className="inline font-semibold text-[#252525]">Suits: </dt><dd className="inline">{o.bestFor}</dd></div>
                <div><dt className="inline font-semibold text-[#252525]">Repay: </dt><dd className="inline">{o.repay}</dd></div>
                <div><dt className="inline font-semibold text-[#252525]">Check first: </dt><dd className="inline">{o.checkFirst}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
