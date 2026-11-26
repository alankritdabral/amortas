/**
 * Maps a credit profile to the Amortas services most likely to help.
 * Used by the free score / report pages (SolutionMatcher) and by the report
 * dashboard (ReportSolutions). Pure functions, no side effects.
 *
 * These are guidance rules, not lender decisions: the lender always makes
 * the final call on approval, rate and tenure.
 */

export type ServiceKey =
  | "debt-consolidation"
  | "credit-card-debt"
  | "balance-transfer"
  | "high-interest"
  | "personal-loan"
  | "overdraft"
  | "app-loan";

export type Service = { key: ServiceKey; title: string; href: string; blurb: string };

export const services: Record<ServiceKey, Service> = {
  "debt-consolidation": {
    key: "debt-consolidation",
    title: "Debt consolidation",
    href: "/debt-consolidation",
    blurb: "Merge several EMIs and dues into one loan with one payment.",
  },
  "credit-card-debt": {
    key: "credit-card-debt",
    title: "Credit-card debt relief",
    href: "/credit-card-debt",
    blurb: "Replace card dues that cost 36%+ a year with a lower-rate loan.",
  },
  "balance-transfer": {
    key: "balance-transfer",
    title: "Loan balance transfer",
    href: "/loan-balance-transfer",
    blurb: "Move a running loan to a lender with a lower rate.",
  },
  "high-interest": {
    key: "high-interest",
    title: "High-interest loan refinance",
    href: "/high-interest-loan",
    blurb: "Refinance expensive EMIs and cut the interest you pay.",
  },
  "personal-loan": {
    key: "personal-loan",
    title: "Personal loan",
    href: "/personal-loan",
    blurb: "A fresh loan for a planned need, from salaried-friendly lenders.",
  },
  overdraft: {
    key: "overdraft",
    title: "Overdraft / credit line",
    href: "/personal-loan-overdraft",
    blurb: "A flexible limit where interest is charged on what you use.",
  },
  "app-loan": {
    key: "app-loan",
    title: "App-loan consolidation",
    href: "/app-loan",
    blurb: "Combine short, costly app loans into one regular EMI.",
  },
};

export type ScoreBand = {
  key: "excellent" | "very-good" | "good" | "fair" | "poor" | "none";
  label: string;
  range: string;
  min: number;
  tone: string; // tailwind classes for the badge
  summary: string;
};

export const scoreBands: ScoreBand[] = [
  { key: "excellent", label: "Excellent", range: "800 – 900", min: 800, tone: "bg-emerald-100 text-emerald-800", summary: "You are in the strongest group. Most lenders will price you at the lowest end of their range." },
  { key: "very-good", label: "Very good", range: "750 – 799", min: 750, tone: "bg-teal-100 text-teal-800", summary: "Most mainstream lenders will approve you, usually at competitive rates." },
  { key: "good", label: "Good", range: "700 – 749", min: 700, tone: "bg-sky-100 text-sky-800", summary: "Many lenders will lend, but pricing is better if you keep improving." },
  { key: "fair", label: "Fair", range: "650 – 699", min: 650, tone: "bg-amber-100 text-amber-800", summary: "Approval is possible with selected lenders, often at higher rates." },
  { key: "poor", label: "Needs work", range: "300 – 649", min: 300, tone: "bg-red-100 text-red-800", summary: "Fewer lenders will approve. Fixing the basics first usually pays off more than applying." },
];

export function bandFor(score: number | null | undefined): ScoreBand | null {
  const s = Number(score);
  if (!s || s < 300) return null;
  return scoreBands.find((b) => s >= b.min) ?? scoreBands[scoreBands.length - 1];
}

export type Profile = {
  score?: number | null;
  /** Number of running loans (excluding cards). */
  activeLoans?: number;
  /** Total outstanding credit-card balance in ₹. */
  cardBalance?: number;
  /** Highest interest rate across running loans, % p.a. (0 if unknown). */
  maxRate?: number;
  /** Total monthly EMIs ÷ monthly income, 0–1+ (0 if unknown). */
  emiRatio?: number;
  /** Any account currently overdue. */
  hasOverdue?: boolean;
  /** Hard enquiries in the last 6 months. */
  recentEnquiries?: number;
  /** Number of small / app-style loans. */
  appLoans?: number;
  /** Person says they need fresh cash. */
  needsCash?: boolean;
};

export type Recommendation = {
  service: Service;
  /** 0–100, used only for ordering. */
  fit: number;
  /** "Best match" for the top item, "Worth a look" for the rest. */
  priority: "best" | "good";
  reason: string;
};

export type Advice = { recommendations: Recommendation[]; caution: string | null; improve: string[] };

const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export function recommend(p: Profile): Advice {
  const score = Number(p.score) || 0;
  const band = bandFor(score);
  const loans = p.activeLoans ?? 0;
  const card = p.cardBalance ?? 0;
  const rate = p.maxRate ?? 0;
  const ratio = p.emiRatio ?? 0;
  const apps = p.appLoans ?? 0;
  const lowScore = score > 0 && score < 650;
  const midScore = score >= 650 && score < 700;
  const strong = score >= 700;

  const out: Omit<Recommendation, "priority">[] = [];
  const add = (key: ServiceKey, fit: number, reason: string) => out.push({ service: services[key], fit, reason });

  if (loans + (card > 0 ? 1 : 0) >= 3) {
    add("debt-consolidation", strong ? 95 : midScore ? 70 : 45,
      `You have ${loans + (card > 0 ? 1 : 0)} running debts. One loan can replace them with a single EMI${ratio > 0.5 ? " and ease a heavy EMI load" : ""}.`);
  } else if (loans + (card > 0 ? 1 : 0) === 2) {
    add("debt-consolidation", strong ? 70 : 40, "Two separate payments each month can be merged into one if the combined rate is lower.");
  }

  if (card >= 25000) {
    add("credit-card-debt", strong ? 92 : midScore ? 68 : 40,
      `About ${inr(card)} sits on your cards. Card interest is usually far higher than a personal loan, so moving it can cut cost quickly.`);
  }

  if (rate >= 16 && loans >= 1) {
    add("high-interest", strong ? 90 : 55,
      `Your costliest loan is at about ${rate}% p.a. Refinancing at a lower rate can lower both the EMI and the total interest.`);
  }
  if (rate >= 13 && loans >= 1 && strong) {
    add("balance-transfer", 78, `A loan at ${rate}% p.a. may be worth moving to a lender offering a lower rate, after fees are counted.`);
  }

  if (apps >= 1) {
    add("app-loan", midScore || strong ? 80 : 60, `${apps} short-tenure or app loan${apps > 1 ? "s" : ""} found. Combining them into one regular EMI is simpler and often cheaper.`);
  }

  if (p.needsCash && strong && ratio < 0.5) {
    add("personal-loan", 85, "Your score and EMI load leave room for a new loan if you need cash.");
    add("overdraft", 60, "If the need is on and off, a limit you draw from can cost less than a lump-sum loan.");
  } else if (strong && ratio < 0.4 && loans <= 1) {
    add("personal-loan", 72, "Your score is healthy and your EMIs are light, so you are likely to see competitive offers.");
  }
  if (midScore && p.needsCash && ratio < 0.45) {
    add("personal-loan", 55, "Approval is possible with selected lenders. Compare the rate and total cost before you decide.");
  }

  const ranked = out
    .sort((a, b) => b.fit - a.fit)
    .filter((r, i, a) => a.findIndex((x) => x.service.key === r.service.key) === i)
    .slice(0, 4)
    .map((r, i): Recommendation => ({ ...r, priority: i === 0 ? "best" : "good" }));

  let caution: string | null = null;
  const improve: string[] = [];
  if (p.hasOverdue) {
    caution = "An overdue account is the single biggest blocker. Clear it first, then check again in 30 to 45 days before applying anywhere.";
    improve.push("Bring every overdue account up to date and ask the lender to report it as paid.");
  }
  if (lowScore) {
    caution ??= "With a score under 650, new applications are more likely to be declined, and each decline leaves a hard enquiry. Build the score first.";
    improve.push("Pay every EMI and card bill on time for the next few months.");
    improve.push("Keep card usage under 30% of each limit.");
  }
  if ((p.recentEnquiries ?? 0) >= 4) {
    improve.push("Pause new applications for a few months: several recent enquiries can lower approval odds.");
  }
  if (ratio > 0.5) {
    improve.push("Your EMIs take over half your income. Reducing that ratio helps more than a higher score.");
  }
  if (!band) {
    improve.push("No score was found. A short or new credit history is common. A small, well-paid credit product builds one.");
  }

  return { recommendations: ranked, caution, improve };
}
