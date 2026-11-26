import type { PageKey } from "@/lib/pageContent";

/**
 * Extra, plain-language content blocks shown on product pages. Kept modest on
 * purpose: no rates, approval odds or savings figures beyond what lib/pageContent.ts
 * and the lender table already state.
 */
export type Extras = {
  fitTitle: string;
  goodFit: string[];
  notFit: string[];
  docsTitle: string;
  docs: string[];
  guides: string[]; // article slugs
  also: { href: string; title: string; text: string }[];
};

const G = {
  emi: "what-is-emi-and-how-is-it-calculated",
  dc: "debt-consolidation-explained-for-salaried-borrowers",
  card: "credit-card-interest-vs-personal-loan-interest",
  bt: "personal-loan-balance-transfer-when-it-makes-sense",
  elig: "salaried-personal-loan-eligibility-checklist",
  od: "overdraft-vs-personal-loan",
  score: "cibil-score-ranges-and-how-to-improve",
  bureau: "cibil-vs-experian-vs-crif-high-mark",
  kfs: "how-to-read-a-loan-offer-key-fact-statement",
  fore: "loan-foreclosure-and-prepayment-charges",
  scam: "how-to-spot-loan-scams-in-india",
  ratio: "emi-to-income-ratio-how-much-debt-is-too-much",
};

const baseDocs = ["PAN card", "Recent salary slips or bank statement", "Mobile number linked to Aadhaar", "Employer name and monthly take-home pay"];

const A = {
  pl: { href: "/personal-loan", title: "Personal loan", text: "A single loan for a big expense, with a fixed EMI." },
  dc: { href: "/debt-consolidation", title: "Debt consolidation", text: "Merge several EMIs and card dues into one." },
  bt: { href: "/loan-balance-transfer", title: "Balance transfer", text: "Move a costly loan to a cheaper lender." },
  od: { href: "/personal-loan-overdraft", title: "Overdraft", text: "A credit line where you pay interest only on what you use." },
  cc: { href: "/credit-card-debt", title: "Credit card debt", text: "Get out of revolving card interest." },
  emi: { href: "/personal-loan-emi-calculator", title: "EMI calculator", text: "Check the monthly payment before you decide." },
  el: { href: "/eligibility", title: "Eligibility check", text: "See what you may qualify for, free." },
  hi: { href: "/high-interest-loan", title: "High-interest loans", text: "Replace expensive borrowing with a cheaper one." },
  app: { href: "/app-loan", title: "App loans", text: "Deal with several small instant-loan app dues." },
};

export const extras: Partial<Record<PageKey, Extras>> = {
  "personal-loan": {
    fitTitle: "Is a personal loan right for you?",
    goodFit: ["You have a steady salary and a clear one-off expense", "You want a fixed EMI and a fixed end date", "You would rather not pledge any asset"],
    notFit: ["You only need money for a few days (an overdraft may cost less)", "Your EMIs already take a large share of your income", "You are borrowing to repay another loan without a plan"],
    docsTitle: "What to keep ready",
    docs: baseDocs,
    guides: [G.emi, G.elig, G.kfs],
    also: [A.od, A.dc, A.emi],
  },
  "debt-consolidation": {
    fitTitle: "Who debt consolidation helps",
    goodFit: ["You pay several EMIs and card dues on different dates", "Some of your debt carries a high interest rate", "Your income is steady and your repayments are on time"],
    notFit: ["You have one low-rate loan already", "The new loan would run so long that total interest rises", "You are missing payments today (talk to us first, options differ)"],
    docsTitle: "What to keep ready",
    docs: ["PAN card", "Statements of the loans and cards you want to merge", "Recent salary slips or bank statement", "Outstanding balance and EMI of each loan"],
    guides: [G.dc, G.ratio, G.fore],
    also: [A.bt, A.cc, A.emi],
  },
  "credit-card-debt": {
    fitTitle: "When to move card debt into a loan",
    goodFit: ["You carry a balance month to month", "You pay only the minimum due", "Card interest is a large part of your monthly outgo"],
    notFit: ["You clear the full bill each month", "The balance is small and will be gone next cycle", "You plan to keep spending on the card after the move"],
    docsTitle: "What to keep ready",
    docs: ["Latest statement of each card", "PAN card", "Recent salary slips or bank statement", "Total outstanding and minimum due"],
    guides: [G.card, G.dc, G.score],
    also: [A.dc, A.pl, A.emi],
  },
  "high-interest-loan": {
    fitTitle: "Should you replace a high-interest loan?",
    goodFit: ["Your current rate is well above what lenders offer salaried staff", "You have a good repayment record since taking the loan", "Your income has risen or your score has improved"],
    notFit: ["The loan is almost repaid", "Foreclosure charges would cancel out the saving", "You would only be extending the tenure"],
    docsTitle: "What to keep ready",
    docs: ["Current loan statement with outstanding principal", "PAN card", "Recent salary slips or bank statement", "Foreclosure letter, if you have one"],
    guides: [G.fore, G.bt, G.kfs],
    also: [A.bt, A.dc, A.emi],
  },
  "balance-transfer": {
    fitTitle: "When a balance transfer makes sense",
    goodFit: ["You have many EMIs left to pay", "A lender offers a clearly lower rate", "Processing and foreclosure charges are small next to the saving"],
    notFit: ["Only a few EMIs remain", "The new loan has a higher fee than your saving", "Your credit score has dropped since you took the loan"],
    docsTitle: "What to keep ready",
    docs: ["Current loan account statement", "Foreclosure or loan closure letter", "PAN card", "Recent salary slips or bank statement"],
    guides: [G.bt, G.fore, G.kfs],
    also: [A.hi, A.dc, A.emi],
  },
  "app-loan": {
    fitTitle: "Is this for you?",
    goodFit: ["You owe several small instant-loan apps at once", "Repayment dates keep clashing", "The effective rates and fees feel hard to follow"],
    notFit: ["You owe one app and will clear it this month", "An app is threatening or harassing you (see the scam guide and report it)", "You need new money, not to repay what you owe"],
    docsTitle: "What to keep ready",
    docs: ["List of apps with amount due and due dates", "PAN card", "Recent salary slips or bank statement", "Screenshots of any repayment schedules"],
    guides: [G.scam, G.dc, G.score],
    also: [A.dc, A.pl, A.hi],
  },
  overdraft: {
    fitTitle: "When an overdraft suits you",
    goodFit: ["Your cash needs rise and fall through the month", "You want to pay interest only on the amount you use", "You can repay and re-use the limit"],
    notFit: ["You need a large amount for a long time", "You tend to stay at the limit all year", "You prefer one fixed EMI"],
    docsTitle: "What to keep ready",
    docs: baseDocs,
    guides: [G.od, G.emi, G.kfs],
    also: [A.pl, A.dc, A.el],
  },
  "emi-calculator": {
    fitTitle: "Reading your result",
    goodFit: ["Use a tenure you can keep up even if costs rise", "Compare total interest, not only the EMI", "Try two or three tenures side by side"],
    notFit: ["Do not stretch the tenure only to shrink the EMI", "Remember processing fees are extra", "Treat the figure as an estimate, the lender decides the final numbers"],
    docsTitle: "Before you apply",
    docs: ["Know your monthly take-home pay", "List your current EMIs", "Check your credit score", "Decide your ideal tenure"],
    guides: [G.emi, G.ratio, G.kfs],
    also: [A.pl, A.dc, A.el],
  },
  eligibility: {
    fitTitle: "What lenders look at",
    goodFit: ["Steady salaried employment with a recognised employer", "A credit score of around 700 or more is commonly preferred", "EMIs that are a modest share of income"],
    notFit: ["Frequent missed or late payments", "Many recent loan applications", "Very new employment or an unverified income"],
    docsTitle: "What to keep ready",
    docs: baseDocs,
    guides: [G.elig, G.score, G.ratio],
    also: [A.pl, A.emi, A.dc],
  },
  "how-it-works": {
    fitTitle: "What we promise",
    goodFit: ["The assessment is free and carries no obligation", "Your details go to a lender only if you allow it", "You can stop at any step"],
    notFit: ["We never charge a fee to release a loan", "We never guarantee approval or a rate", "We never push a lender on you"],
    docsTitle: "What you will need",
    docs: ["Your mobile number", "PAN, to fetch your credit report with your consent", "A rough idea of your loans and EMIs"],
    guides: [G.kfs, G.scam, G.score],
    also: [A.el, A.dc, A.emi],
  },
};
