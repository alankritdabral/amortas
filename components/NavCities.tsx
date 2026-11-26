"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { cities, topCitySlugs } from "@/lib/cities";
import { cityHubPath } from "@/lib/cityPages";

type City = { slug: string; name: string; state: string };

const byName = (a: City, b: City) => a.name.localeCompare(b.name);
const topCities: City[] = topCitySlugs.map((s) => cities.find((c) => c.slug === s)!);
const otherCities: City[] = cities.filter((c) => !(topCitySlugs as readonly string[]).includes(c.slug)).sort(byName);
const MOBILE_TOP = 5;

function useCitySearch() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? [...cities].filter((c) => c.name.toLowerCase().includes(q)).sort(byName) : null),
    [q],
  );
  return { query, setQuery, results };
}

function SearchBox({ query, setQuery, autoFocus }: { query: string; setQuery: (v: string) => void; autoFocus?: boolean }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#737373]" aria-hidden="true" />
      <input
        type="text"
        inputMode="search"
        autoComplete="off"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search your city"
        aria-label="Search cities"
        className="h-12 w-full rounded-lg border border-[#252525]/25 bg-white pl-12 pr-11 text-base text-[#252525] placeholder:text-[#737373] focus:border-[#252525] focus:outline-none"
      />
      {query && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setQuery("")}
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#252525] hover:bg-[#FFE4CC]"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function NoMatch({ onNavigate }: { onNavigate: () => void }) {
  return (
    <p className="py-4 text-base text-[#626262]">
      No city matches that.{" "}
      <Link href="/loans-by-city" onClick={onNavigate} className="font-bold text-[#252525] underline underline-offset-4">
        See all cities
      </Link>
    </p>
  );
}

/** Desktop: search box, then equal-size city tiles in a fixed 5-column grid. */
export function CityPickerDesktop({ onNavigate }: { onNavigate: () => void }) {
  const { query, setQuery, results } = useCitySearch();
  const tile =
    "flex h-11 items-center justify-center rounded-lg border border-[#252525]/15 bg-white px-3 text-base font-semibold text-[#252525] transition-colors hover:bg-[#FFE4CC] hover:border-[#252525]/40";
  const grid = "grid grid-cols-5 gap-2.5";
  const label = "mb-3 text-sm font-semibold text-[#737373]";

  return (
    // stop clicks reaching the panel's close-on-click handler, so typing and tapping the box keep it open
    <div className="pb-10" onClick={(e) => e.stopPropagation()}>
      <div className="max-w-md">
        <SearchBox query={query} setQuery={setQuery} />
      </div>

      {results ? (
        <div className="mt-6">
          {results.length === 0 ? (
            <NoMatch onNavigate={onNavigate} />
          ) : (
            <ul className={grid}>
              {results.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHubPath(c.slug)} onClick={onNavigate} className={tile}>
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <>
          <p className={`mt-6 ${label}`}>Top cities</p>
          <ul className={grid}>
            {topCities.map((c) => (
              <li key={c.slug}>
                <Link href={cityHubPath(c.slug)} onClick={onNavigate} className={tile}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className={`mt-7 ${label}`}>More cities, A to Z</p>
          <ul className={grid}>
            {otherCities.map((c) => (
              <li key={c.slug}>
                <Link href={cityHubPath(c.slug)} onClick={onNavigate} className={tile}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

/** Mobile: search, 5 top cities, and an "Other cities" toggle. */
export function CityPickerMobile({ onNavigate }: { onNavigate: () => void }) {
  const { query, setQuery, results } = useCitySearch();
  const [showOthers, setShowOthers] = useState(false);
  const row = "flex items-center justify-between py-2.5 text-base font-bold text-[#252525]";

  const list = (items: City[]) => (
    <ul className="divide-y divide-[#E5E5E5]">
      {items.map((c) => (
        <li key={c.slug}>
          <Link href={cityHubPath(c.slug)} onClick={onNavigate} className={row}>
            {c.name}
            <ChevronRight className="h-4 w-4 text-[#737373]" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="px-2 pb-4">
      <SearchBox query={query} setQuery={setQuery} />
      <div className="mt-3">
        {results ? (
          results.length === 0 ? (
            <NoMatch onNavigate={onNavigate} />
          ) : (
            list(results)
          )
        ) : (
          <>
            {list(topCities.slice(0, MOBILE_TOP))}
            <button
              type="button"
              aria-expanded={showOthers}
              onClick={() => setShowOthers((v) => !v)}
              className="mt-2 flex h-11 w-full items-center justify-between rounded-lg border border-[#252525]/25 px-4 text-base font-semibold text-[#252525]"
            >
              Other cities
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${showOthers ? "rotate-180" : ""}`} />
            </button>
            {showOthers && <div className="mt-2">{list([...topCities.slice(MOBILE_TOP), ...otherCities].sort(byName))}</div>}
          </>
        )}
      </div>
      <Link href="/loans-by-city" onClick={onNavigate} className="mt-3 inline-flex items-center gap-1 text-base font-bold text-[#252525]">
        All {cities.length} cities and loan types <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
