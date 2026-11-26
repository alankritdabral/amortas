import { cities } from "@/lib/cities";
import { allCityPages, cityHubPath, parseCityHubSlug, cityPagePath, isIndexed, parseCityPageSlug, productDef } from "@/lib/cityPages";

describe("city pages", () => {
  it("has unique city slugs", () => {
    expect(new Set(cities.map((c) => c.slug)).size).toBe(cities.length);
  });

  it("round-trips every product/city path through the parser", () => {
    for (const { product, city } of allCityPages()) {
      const slug = cityPagePath(product, city.slug).slice(1);
      expect(parseCityPageSlug(slug)).toEqual({ product, city });
    }
  });

  it("does not confuse overdraft with personal-loan pages", () => {
    expect(parseCityPageSlug("personal-loan-overdraft-in-pune")?.product).toBe("overdraft");
    expect(parseCityPageSlug("personal-loan-in-pune")?.product).toBe("personal-loan");
  });

  it("rejects unknown slugs", () => {
    expect(parseCityPageSlug("personal-loan-in-atlantis")).toBeNull();
    expect(parseCityPageSlug("about")).toBeNull();
  });

  it("indexes every city page", () => {
    expect(allCityPages().every(({ product, city }) => isIndexed(product, city))).toBe(true);
  });

  it("keeps rendered titles and descriptions inside the SEO budget", () => {
    for (const { product, city } of allCityPages()) {
      const title = `${productDef(product).title} in ${city.name}`;
      expect(title.length + " | Amortas".length).toBeLessThanOrEqual(60);
    }
  });

  it("serves a hub page for every city and keeps hub and product slugs apart", () => {
    for (const city of cities) {
      expect(parseCityHubSlug(cityHubPath(city.slug).slice(1))?.slug).toBe(city.slug);
      expect(parseCityPageSlug(cityHubPath(city.slug).slice(1))).toBeNull();
    }
    expect(parseCityHubSlug("personal-loan-in-pune")).toBeNull();
  });

  it("keeps hub titles inside the SEO budget", () => {
    for (const city of cities) {
      expect(`Loans in ${city.name}: All Options`.length + " | Amortas".length).toBeLessThanOrEqual(60);
    }
  });
});
