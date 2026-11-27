import { cities, type City } from "@/lib/cities";

export type CityProduct = "personal-loan" | "quick-loan" | "overdraft" | "debt-consolidation";

type ProductDef = {
  key: CityProduct;
  /** URL prefix; the page lives at `/${prefix}${city.slug}`. */
  prefix: string;
  /** Used in titles: "<title> in <City>". */
  title: string;
  /** The national product page this city page links back to. */
  hub: string;
  hubLabel: string;
};

export const cityProducts: ProductDef[] = [
  { key: "personal-loan", prefix: "personal-loan-in-", title: "Personal Loan", hub: "/personal-loan", hubLabel: "Personal loan" },
  { key: "quick-loan", prefix: "quick-loan-in-", title: "Quick Personal Loan", hub: "/personal-loan", hubLabel: "Personal loan" },
  { key: "overdraft", prefix: "personal-loan-overdraft-in-", title: "Personal Loan Overdraft", hub: "/personal-loan-overdraft", hubLabel: "Overdraft options" },
  { key: "debt-consolidation", prefix: "debt-consolidation-in-", title: "Debt Consolidation Loan", hub: "/debt-consolidation", hubLabel: "Debt consolidation" },
];

export function productDef(key: CityProduct): ProductDef {
  return cityProducts.find((p) => p.key === key)!;
}

export function cityPagePath(product: CityProduct, citySlug: string): string {
  return `/${productDef(product).prefix}${citySlug}`;
}

/** Every product/city combination that has a page. */
export function allCityPages(): { product: CityProduct; city: City }[] {
  return cityProducts.flatMap((p) => cities.map((city) => ({ product: p.key, city })));
}

/**
 * Whether a page is indexed and listed in the sitemap.
 *
 * The 2026-11-26 decision was to index every city page. That was reversed on
 * 2026-11-27: with the city name masked, the pages for different cities are
 * 100% identical (about 1,500 words each, ~185 pages), which Google treats as
 * thin/doorway content and which can hold back the whole site. Only cities
 * where Amortas has an office are indexed, because their pages carry real
 * local information. The rest are `noindex, follow`, so they stay reachable
 * for visitors and pass link value, but drop out of the sitemap.
 *
 * To index another city, give it real local content first, then set
 * `office: true` in lib/cities.ts (or add an explicit allow-list here).
 */
export function isIndexed(_product: CityProduct, city: City): boolean {
  return city.office;
}

/** The per-city hub follows the same rule as that city's product pages. */
export function isHubIndexed(city: City): boolean {
  return city.office;
}

/** Longest prefix first so "personal-loan-overdraft-in-" wins over "personal-loan-in-". */
export function parseCityPageSlug(slug: string): { product: CityProduct; city: City } | null {
  for (const p of [...cityProducts].sort((a, b) => b.prefix.length - a.prefix.length)) {
    if (slug.startsWith(p.prefix)) {
      const city = cities.find((c) => c.slug === slug.slice(p.prefix.length));
      if (city) return { product: p.key, city };
    }
  }
  return null;
}

/** The per-city hub: every option Amortas offers, for one city. Lives at /loans-in-<slug>. */
export const CITY_HUB_PREFIX = "loans-in-";

export function cityHubPath(citySlug: string): string {
  return `/${CITY_HUB_PREFIX}${citySlug}`;
}

export function parseCityHubSlug(slug: string): City | null {
  if (!slug.startsWith(CITY_HUB_PREFIX)) return null;
  return cities.find((c) => c.slug === slug.slice(CITY_HUB_PREFIX.length)) ?? null;
}
