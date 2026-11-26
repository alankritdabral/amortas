/**
 * Maps a pathname to a coarse content group for GA4 reporting. Ordered
 * list: the first matching prefix wins, so more specific prefixes (e.g.
 * "/calculators") must come before any shorter prefix that would also match.
 */
const RULES: Array<[prefix: string, group: string]> = [
  ["/personal-loan-in-", "city"],
  ["/loans-in-", "city"],
  ["/quick-loan-in-", "city"],
  ["/personal-loan-overdraft-in-", "city"],
  ["/debt-consolidation-in-", "city"],
  ["/loans-by-city", "city"],
  ["/learning-center", "learning"],
  ["/calculators", "calculator"],
  ["/personal-loan-emi-calculator", "calculator"],
  ["/emi-savings-calculator", "calculator"],
  ["/eligibility", "eligibility"],
  ["/contact", "contact"],
  ["/privacy-policy", "legal"],
  ["/terms-and-conditions", "legal"],
  ["/partner-disclosures", "legal"],
  ["/disclaimer", "legal"],
  ["/cookie-policy", "legal"],
  ["/grievance-redressal", "legal"],
  ["/about", "company"],
  ["/how-it-works", "company"],
  ["/faq", "company"],
];

export function contentGroupFor(pathname: string): string {
  if (pathname === "/" || pathname === "") return "home";
  for (const [prefix, group] of RULES) {
    if (pathname.startsWith(prefix)) return group;
  }
  // Everything else under app/ that isn't matched above is one of the
  // single-product pages (personal-loan, debt-consolidation, app-loan, …).
  return "product";
}
