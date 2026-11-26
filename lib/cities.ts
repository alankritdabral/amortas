/**
 * Cities we publish loan pages for. The same list drives four page types
 * (lib/cityPages.ts): personal loan, quick loan, personal-loan overdraft and
 * debt consolidation, each at /<product>-in-<slug>.
 *
 * Indexing: all pages are indexed (owner decision, 2026-11-26); see `isIndexed` in
 * lib/cityPages.ts, which is also where to noindex a page again.
 *
 * `nearestOffice` is set only for cities that are plainly in the catchment of
 * an Amortas office (Noida, Gurgaon, Ghaziabad and Faridabad are in Delhi NCR).
 */
export const cities = [
  { slug: "bangalore", name: "Bangalore", state: "Karnataka", office: false, nearestOffice: null },
  { slug: "mumbai", name: "Mumbai", state: "Maharashtra", office: false, nearestOffice: null },
  { slug: "delhi", name: "Delhi", state: "Delhi", office: true, nearestOffice: null },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh", office: false, nearestOffice: "Delhi" },
  { slug: "gurgaon", name: "Gurgaon", state: "Haryana", office: false, nearestOffice: "Delhi" },
  { slug: "chennai", name: "Chennai", state: "Tamil Nadu", office: false, nearestOffice: null },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", office: false, nearestOffice: null },
  { slug: "pune", name: "Pune", state: "Maharashtra", office: false, nearestOffice: null },
  { slug: "kolkata", name: "Kolkata", state: "West Bengal", office: false, nearestOffice: null },
  { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", office: false, nearestOffice: null },
  { slug: "jaipur", name: "Jaipur", state: "Rajasthan", office: false, nearestOffice: null },
  { slug: "surat", name: "Surat", state: "Gujarat", office: false, nearestOffice: null },
  { slug: "lucknow", name: "Lucknow", state: "Uttar Pradesh", office: false, nearestOffice: null },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh", office: false, nearestOffice: "Delhi" },
  { slug: "faridabad", name: "Faridabad", state: "Haryana", office: false, nearestOffice: "Delhi" },
  { slug: "thane", name: "Thane", state: "Maharashtra", office: false, nearestOffice: null },
  { slug: "navi-mumbai", name: "Navi Mumbai", state: "Maharashtra", office: false, nearestOffice: null },
  { slug: "nagpur", name: "Nagpur", state: "Maharashtra", office: false, nearestOffice: null },
  { slug: "nashik", name: "Nashik", state: "Maharashtra", office: false, nearestOffice: null },
  { slug: "indore", name: "Indore", state: "Madhya Pradesh", office: false, nearestOffice: null },
  { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", office: false, nearestOffice: null },
  { slug: "chandigarh", name: "Chandigarh", state: "Chandigarh", office: false, nearestOffice: null },
  { slug: "ludhiana", name: "Ludhiana", state: "Punjab", office: false, nearestOffice: null },
  { slug: "amritsar", name: "Amritsar", state: "Punjab", office: false, nearestOffice: null },
  { slug: "dehradun", name: "Dehradun", state: "Uttarakhand", office: true, nearestOffice: null },
  { slug: "rudrapur", name: "Rudrapur", state: "Uttarakhand", office: true, nearestOffice: null },
  { slug: "kochi", name: "Kochi", state: "Kerala", office: false, nearestOffice: null },
  { slug: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", office: false, nearestOffice: null },
  { slug: "mysore", name: "Mysore", state: "Karnataka", office: false, nearestOffice: null },
  { slug: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", office: false, nearestOffice: null },
  { slug: "vadodara", name: "Vadodara", state: "Gujarat", office: false, nearestOffice: null },
  { slug: "rajkot", name: "Rajkot", state: "Gujarat", office: false, nearestOffice: null },
  { slug: "jodhpur", name: "Jodhpur", state: "Rajasthan", office: false, nearestOffice: null },
  { slug: "patna", name: "Patna", state: "Bihar", office: false, nearestOffice: null },
  { slug: "raipur", name: "Raipur", state: "Chhattisgarh", office: false, nearestOffice: null },
  { slug: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", office: false, nearestOffice: null },
  { slug: "guwahati", name: "Guwahati", state: "Assam", office: false, nearestOffice: null },
] as const;

export type City = (typeof cities)[number];

/** Real content date for the city pages (see lib/routes.ts for why not `new Date()`). */
export const CITY_PAGES_LAST_MODIFIED = "2026-11-26T12:00:00+05:30";

/**
 * The cities shown in the navbar, biggest borrowing markets first. The order is
 * our judgement from RBI's published bank-credit-by-centre figures (the large
 * metros lead) and is NOT taken from Amortas's own lead or loan data. Re-rank it
 * from real lead volume once there is enough.
 */
export const topCitySlugs = [
  "mumbai", "delhi", "bangalore", "hyderabad", "chennai", "pune",
  "kolkata", "ahmedabad", "gurgaon", "noida",
] as const;
