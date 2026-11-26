import type { Faq } from "@/lib/pageContent";
import type { City } from "@/lib/cities";
import { cityPagePath, type CityProduct } from "@/lib/cityPages";

/**
 * Every option Amortas offers a borrower. The first four have their own
 * per-city page (lib/cityPages.ts); the rest link to the national page.
 * Copy is deliberately factual and free of approval, speed or rate promises.
 */
export type CityOption = {
  key: string;
  title: string;
  icon: "wallet" | "zap" | "landmark" | "layers" | "transfer" | "card" | "percent" | "app";
  /** One line for the card. */
  summary: string;
  /** Who it tends to suit. */
  bestFor: string;
  /** How you repay it. */
  repay: string;
  /** The thing to check before you take it. */
  checkFirst: string;
  /** Set for options that have a per-city page. */
  cityProduct?: CityProduct;
  /** National page, used when there is no per-city page. */
  href: string;
};

export const cityOptions: CityOption[] = [
  {
    key: "personal-loan",
    title: "Personal loan",
    icon: "wallet",
    summary: "A lump sum for a planned expense, repaid in fixed EMIs. Rates from 9.99% p.a.* for eligible salaried applicants.",
    bestFor: "A fixed, larger need such as a wedding, medical bill or home repair",
    repay: "Fixed EMI over a set tenure",
    checkFirst: "Processing fee, GST and the total you repay, not just the EMI",
    cityProduct: "personal-loan",
    href: "/personal-loan",
  },
  {
    key: "quick-loan",
    title: "Quick loan",
    icon: "zap",
    summary: "See which partner lenders you are likely to qualify for first, so you apply where it can work. Timing depends on the lender.",
    bestFor: "When you need money soon and have your documents ready",
    repay: "Fixed EMI, usually over a shorter tenure",
    checkFirst: "Faster products can cost more. Never pay anyone to release a loan",
    cityProduct: "quick-loan",
    href: "/personal-loan",
  },
  {
    key: "overdraft",
    title: "Overdraft",
    icon: "landmark",
    summary: "A limit you can draw from when you need it. With many products, interest applies to the amount you use.",
    bestFor: "Short, uncertain or variable needs, like bridging to month-end",
    repay: "Repay and redraw within your limit",
    checkFirst: "Renewal fees, and whether staying drawn for long costs more than a loan",
    cityProduct: "overdraft",
    href: "/personal-loan-overdraft",
  },
  {
    key: "debt-consolidation",
    title: "Debt consolidation",
    icon: "layers",
    summary: "Replace several EMIs, card balances and app loans with one payment, if the total cost comes down.",
    bestFor: "Many EMIs on different dates, or expensive card and app debt",
    repay: "One EMI that replaces the others",
    checkFirst: "Foreclosure charges on the old loans and fees on the new one",
    cityProduct: "debt-consolidation",
    href: "/debt-consolidation",
  },
  {
    key: "balance-transfer",
    title: "Balance transfer",
    icon: "transfer",
    summary: "Move one existing loan to a new lender at a lower rate, and keep repaying it as before.",
    bestFor: "One loan with a high rate and a good part of the tenure left",
    repay: "A new EMI with the new lender",
    checkFirst: "Foreclosure charge on the old loan and the new processing fee",
    href: "/loan-balance-transfer",
  },
  {
    key: "credit-card-debt",
    title: "Credit-card debt",
    icon: "card",
    summary: "Clear card balances that keep growing at card interest rates, with a lower-cost fixed EMI where it works.",
    bestFor: "Carrying a card balance month after month",
    repay: "Fixed EMI instead of revolving dues",
    checkFirst: "Total interest and fees compared with what the card would cost",
    href: "/credit-card-debt",
  },
  {
    key: "high-interest-loan",
    title: "High-interest loans",
    icon: "percent",
    summary: "Refinance a loan that costs more than it should, or find out honestly that it is already a fair deal.",
    bestFor: "An existing loan whose rate is well above current offers",
    repay: "New EMI after refinancing",
    checkFirst: "Remaining tenure, since little left means little to save",
    href: "/high-interest-loan",
  },
  {
    key: "app-loan",
    title: "App loans",
    icon: "app",
    summary: "Combine several small loan-app dues into one bank or NBFC loan with a single due date.",
    bestFor: "Several short, costly app loans running at once",
    repay: "One EMI with a regulated lender",
    checkFirst: "That each app lender is an RBI-regulated entity, and any closure charges",
    href: "/app-loan",
  },
];

export function optionHref(option: CityOption, city: City): string {
  return option.cityProduct ? cityPagePath(option.cityProduct, city.slug) : option.href;
}

/** "I have this situation" to "look at this option". */
export const situations: { situation: string; optionKey: string }[] = [
  { situation: "I have several EMIs on different dates", optionKey: "debt-consolidation" },
  { situation: "My credit-card balance keeps growing", optionKey: "credit-card-debt" },
  { situation: "I have a planned expense and want fixed EMIs", optionKey: "personal-loan" },
  { situation: "I need money soon and have my documents ready", optionKey: "quick-loan" },
  { situation: "I only need cash for a few weeks", optionKey: "overdraft" },
  { situation: "One of my loans has a high rate", optionKey: "balance-transfer" },
  { situation: "I have several small loan-app dues", optionKey: "app-loan" },
];

export const hubSteps = [
  { t: "Tell us a little", d: "Share your name, number, income and what you need. It takes a few minutes and is free." },
  { t: "We compare for you", d: "With your permission we check which partner banks and NBFCs you are likely to be eligible for." },
  { t: "A specialist calls", d: "A credit specialist walks you through the options in plain words, including when none of them help." },
  { t: "You decide", d: "Nothing moves forward without your say-so. The lender makes the final decision on any application." },
];

export function cityHubFaqs(city: City): Faq[] {
  return [
    {
      q: `Which loan options can I look at in ${city.name}?`,
      a: `You can look at personal loans, quick loans, overdraft, debt consolidation, balance transfer, credit-card debt, high-interest loan refinancing and app-loan consolidation. Pick the one that matches your situation above, or ask a specialist to compare them for you.`,
    },
    {
      q: `Do I need to visit an office from ${city.name}?`,
      a: `No. You can check your options online from ${city.name} and a credit specialist will call you back. ${
        city.office
          ? `We also have an office in ${city.name} if you would like to visit.`
          : city.nearestOffice
            ? `Our nearest office is in ${city.nearestOffice} if you would prefer to visit.`
            : "Our offices are in Dehradun, Delhi and Rudrapur."
      }`,
    },
    {
      q: `Do loan rates differ in ${city.name}?`,
      a: `Lenders price loans mainly on your income, employer, credit profile, existing EMIs, amount and tenure, not on the city you live in. Rates from 9.99% p.a.* apply to eligible salaried applicants only.`,
    },
    {
      q: "Do you guarantee approval?",
      a: "No. Approval, rate, amount and tenure are decided by the lender. We help you see where you are likely to be eligible before you apply.",
    },
    {
      q: "Does it cost anything to check?",
      a: "No. Using Amortas is free. Any fees a lender charges are shown in its Key Fact Statement before you accept an offer. Never pay anyone to approve or release a loan.",
    },
    {
      q: "Will checking my options hurt my credit score?",
      a: "Looking at your own credit report is generally treated as a soft enquiry and does not lower your score, and we ask your permission first. A formal application with a lender usually creates a hard enquiry.",
    },
  ];
}
