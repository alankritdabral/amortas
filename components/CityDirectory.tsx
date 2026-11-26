"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";

export type CityRow = { name: string; slug: string; state: string; hub: string; links: { label: string; href: string }[] };

/** Searchable state-by-state directory of city loan pages. */
export function CityDirectory({ cities }: { cities: CityRow[] }) {
  const [q, setQ] = useState("");
  const groups = useMemo(() => {
    const term = q.trim().toLowerCase();
    const hit = cities.filter((c) => !term || c.name.toLowerCase().includes(term) || c.state.toLowerCase().includes(term));
    const map = new Map<string, CityRow[]>();
    hit.forEach((c) => map.set(c.state, [...(map.get(c.state) ?? []), c]));
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [cities, q]);

  return (
    <div>
      <label htmlFor="city-search" className="sr-only">Search your city or state</label>
      <div className="relative max-w-xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#626262]" aria-hidden="true" />
        <input
          id="city-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your city or state"
          className="h-14 w-full rounded-md border-2 border-[#D3CDC7] bg-white pl-12 pr-4 text-base outline-none transition-colors focus:border-[#252525]"
        />
      </div>
      <p className="mt-3 text-sm text-[#626262]" aria-live="polite">
        {groups.reduce((n, [, c]) => n + c.length, 0)} cities in {groups.length} states
      </p>

      {groups.length === 0 ? (
        <p className="mt-10 rounded-lg bg-[#FFF8F3] p-6 text-[#444140]">
          No match for &ldquo;{q}&rdquo;. You can still check your options online from anywhere in India:{" "}
          <Link href="/eligibility" className="font-semibold underline underline-offset-4">check eligibility</Link>.
        </p>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([state, list]) => (
            <section key={state} className="rounded-lg border border-[#E7E2DD] bg-white p-6">
              <h2 className="text-xl font-bold tracking-[-0.02em]">{state}</h2>
              <ul className="mt-4 divide-y divide-[#E7E2DD]">
                {list.map((c) => (
                  <li key={c.slug} className="py-4 first:pt-0 last:pb-0">
                    <p className="flex items-center justify-between gap-2 font-semibold"><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#FD6C01]" aria-hidden="true" />{c.name}</span><Link href={c.hub} className="text-sm font-semibold underline underline-offset-4 hover:text-[#C94400]">All options</Link></p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {c.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="inline-block rounded-full bg-[#FFF1E3] px-3 py-1 text-sm font-medium transition-colors hover:bg-[#FD6C01]">
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
