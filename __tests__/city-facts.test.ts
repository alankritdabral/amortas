import { cityFacts, factsFor, hasEnoughFacts, MIN_OVERVIEW_CHARS, type CityFacts } from "@/lib/cityFacts";
import { allCityPages, isHubIndexed, isIndexed } from "@/lib/cityPages";
import { cities } from "@/lib/cities";

// Fixtures only: obviously fake text, never real city facts.
const longText = "x".repeat(MIN_OVERVIEW_CHARS);
const good: CityFacts = { overview: longText, lenders: ["Fixture Lender"], verifiedOn: "2026-11-27" };

describe("hasEnoughFacts", () => {
  it("rejects missing facts", () => {
    expect(hasEnoughFacts(undefined)).toBe(false);
  });

  it("accepts a long overview, one specific item and a valid date", () => {
    expect(hasEnoughFacts(good)).toBe(true);
    expect(hasEnoughFacts({ overview: longText, localNotes: ["a", "b"], verifiedOn: "2026-11-27" })).toBe(true);
  });

  it("rejects a short overview", () => {
    expect(hasEnoughFacts({ ...good, overview: "too short" })).toBe(false);
  });

  it("rejects an overview with no specifics (no lender, fewer than two notes)", () => {
    expect(hasEnoughFacts({ overview: longText, verifiedOn: "2026-11-27" })).toBe(false);
    expect(hasEnoughFacts({ overview: longText, localNotes: ["only one"], verifiedOn: "2026-11-27" })).toBe(false);
  });

  it("rejects a missing or malformed verification date", () => {
    expect(hasEnoughFacts({ ...good, verifiedOn: "" })).toBe(false);
    expect(hasEnoughFacts({ ...good, verifiedOn: "27/11/2026" })).toBe(false);
  });
});

describe("city facts and indexing", () => {
  const nonOffice = cities.find((c) => !c.office)!;
  const office = cities.find((c) => c.office)!;

  afterEach(() => {
    delete cityFacts[nonOffice.slug];
  });

  it("ships with no invented facts", () => {
    expect(Object.keys(cityFacts)).toHaveLength(0);
  });

  it("leaves a non-office city noindex until it has enough facts", () => {
    expect(factsFor(nonOffice)).toBeUndefined();
    expect(isHubIndexed(nonOffice)).toBe(false);
    expect(isIndexed("personal-loan", nonOffice)).toBe(false);
  });

  it("indexes only the hub and the personal-loan page once a city has real facts", () => {
    cityFacts[nonOffice.slug] = good;
    expect(factsFor(nonOffice)).toEqual(good);
    expect(isHubIndexed(nonOffice)).toBe(true);
    expect(isIndexed("personal-loan", nonOffice)).toBe(true);
    // The other three product pages stay noindex so they do not compete with each other.
    expect(isIndexed("quick-loan", nonOffice)).toBe(false);
    expect(isIndexed("overdraft", nonOffice)).toBe(false);
    expect(isIndexed("debt-consolidation", nonOffice)).toBe(false);
  });

  it("does not index a city whose facts are not enough", () => {
    cityFacts[nonOffice.slug] = { overview: "short", verifiedOn: "2026-11-27" };
    expect(factsFor(nonOffice)).toBeUndefined();
    expect(isHubIndexed(nonOffice)).toBe(false);
  });

  it("keeps office cities indexed regardless of facts", () => {
    expect(isHubIndexed(office)).toBe(true);
    expect(allCityPages().filter(({ city }) => city.slug === office.slug).every(({ product, city }) => isIndexed(product, city))).toBe(true);
  });
});
