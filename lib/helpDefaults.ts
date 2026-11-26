/** Options in the "What can we help you with?" dropdown. */
export const REQUIREMENTS = [
  "Reduce my EMI",
  "Consolidate Multiple Loans",
  "Personal Loan",
  "Credit Card Loan",
  "App Loans",
  "Loan Balance Transfer",
  "Overdraft / OD",
  "Check My Eligibility",
  "Free Credit Score / Report",
  "Other",
] as const;

export type Requirement = (typeof REQUIREMENTS)[number];

/** Longest / most specific prefix first. A path matches when it equals the prefix or starts with it followed by "/" or "-". */
const PATH_DEFAULTS: [string, Requirement][] = [
  ["/personal-loan-overdraft", "Overdraft / OD"],
  ["/personal-loan-emi-calculator", "Reduce my EMI"],
  ["/personal-loan-overdraft-in-", "Overdraft / OD"],
  ["/personal-loan-in-", "Personal Loan"],
  ["/quick-loan-in-", "Personal Loan"],
  ["/debt-consolidation-in-", "Consolidate Multiple Loans"],
  ["/calculators/debt-consolidation-calculator", "Consolidate Multiple Loans"],
  ["/emi-savings-calculator", "Reduce my EMI"],
  ["/high-interest-loan", "Reduce my EMI"],
  ["/personal-loan", "Personal Loan"],
  ["/debt-consolidation", "Consolidate Multiple Loans"],
  ["/credit-card-debt", "Credit Card Loan"],
  ["/app-loan", "App Loans"],
  ["/loan-balance-transfer", "Loan Balance Transfer"],
  ["/eligibility", "Check My Eligibility"],
  ["/free-cibil-score", "Free Credit Score / Report"],
  ["/free-credit-report", "Free Credit Score / Report"],
];

/** Pages that should not preselect anything: the visitor chooses. */
export function requirementForPath(pathname: string | null | undefined): Requirement | "" {
  if (!pathname) return "";
  const path = pathname.replace(/\/+$/, "") || "/";
  for (const [prefix, req] of PATH_DEFAULTS) {
    if (prefix.endsWith("-") ? path.startsWith(prefix) : path === prefix || path.startsWith(`${prefix}/`)) return req;
  }
  return "";
}

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

const ALIASES: Record<string, Requirement> = {
  emi: "Reduce my EMI",
  reduceemi: "Reduce my EMI",
  debtconsolidation: "Consolidate Multiple Loans",
  consolidation: "Consolidate Multiple Loans",
  personalloan: "Personal Loan",
  quickloan: "Personal Loan",
  creditcard: "Credit Card Loan",
  creditcarddebt: "Credit Card Loan",
  apploan: "App Loans",
  apploans: "App Loans",
  balancetransfer: "Loan Balance Transfer",
  overdraft: "Overdraft / OD",
  od: "Overdraft / OD",
  eligibility: "Check My Eligibility",
  creditscore: "Free Credit Score / Report",
  cibil: "Free Credit Score / Report",
  creditreport: "Free Credit Score / Report",
};

/** Turns a `?need=` link value into one of the dropdown options, or "" when it is not recognised. */
export function resolveRequirement(value: string | null | undefined): Requirement | "" {
  if (!value) return "";
  const key = norm(value);
  const exact = REQUIREMENTS.find((r) => norm(r) === key);
  return exact ?? ALIASES[key] ?? "";
}

/** A free-text value from a link (`?need=` or `utm_term`), made safe to show and store: letters, digits and basic punctuation, 60 characters. */
export function cleanNeed(value: string | null | undefined): string {
  if (!value) return "";
  return value.replace(/[^\p{L}\p{N} &/+.,'\-]/gu, " ").replace(/\s+/g, " ").trim().slice(0, 60);
}

/** What the visitor came for, from the link: a known option when it matches, otherwise their own words. */
export function needFromSearch(search: string): string {
  const params = new URLSearchParams(search);
  const raw = params.get("need") ?? params.get("utm_term");
  return resolveRequirement(raw) || cleanNeed(raw);
}
