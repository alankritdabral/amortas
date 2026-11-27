/**
 * First-hand local facts for city pages.
 *
 * WHY THIS EXISTS: the product/city pages are otherwise identical templates
 * (only the city name changes), which Google treats as thin or duplicate
 * content. A city page is only worth indexing when it says something true
 * and specific about that city that no other city page says.
 *
 * RULES (also in docs/city-facts-template.md):
 *  - Only facts Amortas itself can stand behind. No scraped or copied text,
 *    no guesses, no "typical" figures, no claims about rates or approval.
 *  - `lenders` = lenders Amortas has actually placed cases with for
 *    customers in this city. Not a promise that any lender will approve.
 *  - Never put customer names, phone numbers or anything identifying here.
 *  - Update `verifiedOn` whenever you re-check the facts.
 *
 * A city counts as having "enough" facts only if hasEnoughFacts() is true.
 * Cities that do are indexed (see lib/cityPages.ts); the rest stay noindex.
 * This object is intentionally empty until real facts are added.
 */
export type CityFacts = {
  /** 3 to 5 plain sentences on how Amortas actually works in this city. */
  overview: string;
  /** Lenders Amortas has actually placed cases with in this city. */
  lenders?: string[];
  /** Specific, checkable points: walk-in hours, how a visit works, local documents, etc. */
  localNotes?: string[];
  /** ISO date (YYYY-MM-DD) when Amortas last verified these facts. */
  verifiedOn: string;
};

/** Keyed by city slug from lib/cities.ts, for example "noida". */
export const cityFacts: Record<string, CityFacts> = {};

/** Below this the overview is too thin to make the page genuinely different. */
export const MIN_OVERVIEW_CHARS = 250;

export function hasEnoughFacts(f: CityFacts | undefined): f is CityFacts {
  if (!f) return false;
  const specifics = (f.lenders?.length ?? 0) >= 1 || (f.localNotes?.length ?? 0) >= 2;
  const dated = /^\d{4}-\d{2}-\d{2}$/.test(f.verifiedOn);
  return f.overview.trim().length >= MIN_OVERVIEW_CHARS && specifics && dated;
}

/** The facts for a city, or undefined when there are none or not enough. */
export function factsFor(city: { slug: string }): CityFacts | undefined {
  const f = cityFacts[city.slug];
  return hasEnoughFacts(f) ? f : undefined;
}
