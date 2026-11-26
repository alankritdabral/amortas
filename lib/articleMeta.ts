import { articles, type Article } from "@/content/articles";

export type Topic = "Basics" | "Borrowing" | "Credit score" | "Safety";

/** Editorial grouping for the learning-center filters. Keyed by slug. */
const TOPICS: Record<string, Topic> = {
  "what-is-emi-and-how-is-it-calculated": "Basics",
  "emi-to-income-ratio-how-much-debt-is-too-much": "Basics",
  "how-to-read-a-loan-offer-key-fact-statement": "Basics",
  "debt-consolidation-explained-for-salaried-borrowers": "Borrowing",
  "credit-card-interest-vs-personal-loan-interest": "Borrowing",
  "personal-loan-balance-transfer-when-it-makes-sense": "Borrowing",
  "salaried-personal-loan-eligibility-checklist": "Borrowing",
  "overdraft-vs-personal-loan": "Borrowing",
  "loan-foreclosure-and-prepayment-charges": "Borrowing",
  "cibil-score-ranges-and-how-to-improve": "Credit score",
  "cibil-vs-experian-vs-crif-high-mark": "Credit score",
  "how-to-spot-loan-scams-in-india": "Safety",
  "how-to-get-out-of-debt-in-2027": "Borrowing",
  "debt-consolidation-vs-debt-settlement": "Borrowing",
  "how-to-read-your-credit-report": "Credit score",
  "personal-loan-eligibility-in-2027": "Borrowing",
  "repo-rate-change-what-it-means-for-your-emi": "Basics",
};

export const TOPIC_LIST: Topic[] = ["Basics", "Borrowing", "Credit score", "Safety"];

export function topicOf(a: Article): Topic {
  return TOPICS[a.slug] ?? "Basics";
}

/** Whole minutes to read, at ~200 words per minute, never below 1. */
export function readingMinutes(a: Article): number {
  const words = [a.summary, ...a.sections.flatMap((s) => [s.heading, ...s.paragraphs])].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Other articles, same topic first, newest-listed order otherwise. */
export function relatedArticles(a: Article, n = 3): Article[] {
  const others = articles.filter((x) => x.slug !== a.slug);
  const same = others.filter((x) => topicOf(x) === topicOf(a));
  const rest = others.filter((x) => topicOf(x) !== topicOf(a));
  return [...same, ...rest].slice(0, n);
}
