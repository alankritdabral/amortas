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
 * Whether a page is indexed and listed in the sitemap. Owner decision
 * (2026-11-26): every product/city page is indexed. To pull a page back out
 * (for example if Search Console flags the templated pages as thin or
 * duplicate), return false for it here: it then gets `noindex, follow` and
 * drops out of the sitemap.
 */
export function isIndexed(_product: CityProduct, _city: City): boolean {
  return true;
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
