export type Article = {
  slug: string;
  title: string;
  /**
   * Short title for the <title> tag, kept ≤38 chars so the rendered title
   * (with the root layout's " | Amortas" template, 22 chars)
   * stays within Google's ~60-char display budget. `title` is the longer,
   * more descriptive headline shown as the page's H1 — it isn't shortened,
   * since that would mean rewriting editorial copy rather than fixing SEO
   * metadata. Falls back to `title` if omitted.
   */
  seoTitle?: string;
  summary: string;
  /** Real content date (ISO), used for the sitemap and Article JSON-LD (plan Phase 9). Not `new Date()`. */
  publishedAt: string;
  updatedAt: string;
  sections: { heading: string; paragraphs: string[] }[];
};

// All six articles were added in one commit (git log content/articles.ts),
// so they share one publishedAt/updatedAt for now. Update an article's
// updatedAt only when its own text materially changes.
const ARTICLES_ADDED = "2026-11-02T15:06:53+05:30";
const ARTICLES_ADDED_2 = "2026-11-26T12:00:00+05:30";
const ARTICLES_ADDED_3 = "2026-11-26T15:00:00+05:30";

export const articles: Article[] = [
  {
    slug: "what-is-emi-and-how-is-it-calculated",
    title: "What is an EMI, and how is it calculated?",
    seoTitle: "EMI Meaning, Full Form & Formula",
    summary: "EMI meaning, full form and the formula lenders use, plus the simple maths behind your monthly loan payment.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "EMI meaning and full form",
        paragraphs: [
          "EMI full form is Equated Monthly Instalment. It is the fixed amount you pay your lender every month until the loan is cleared. Each EMI has two parts: some repays the principal you borrowed, and the rest is interest.",
          "In the early months most of your EMI goes towards interest. As the balance falls, more of it goes towards principal.",
        ],
      },
      {
        heading: "The formula: how EMI is calculated",
        paragraphs: [
          "EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1), where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12 ÷ 100) and n is the number of months.",
          "You don't need to do this by hand. Our EMI calculator does it for you as you move the sliders.",
        ],
      },
      {
        heading: "What moves your EMI the most",
        paragraphs: [
          "A longer tenure lowers your monthly EMI but increases the total interest you pay. A shorter tenure does the opposite. The interest rate matters a lot too: on the same amount and tenure, a few percentage points can change your total cost by a large amount.",
          "That is why it is worth comparing your current rate with what you might be eligible for before you decide anything.",
        ],
      },
      {
        heading: "Common EMI questions",
        paragraphs: [
          "What is the full form of EMI? Equated Monthly Instalment — the same fixed amount repaid each month for the life of the loan.",
          "How does EMI payment work? Your lender splits every instalment between interest and principal, debiting it automatically from your bank account on a fixed date each month.",
          "Is EMI the same as a monthly instalment? Yes, but unlike a plain instalment an EMI stays fixed for the whole tenure, so the interest-to-principal split shifts over time instead of the payment amount changing.",
        ],
      },
      {
        heading: "A worked example",
        paragraphs: [
          "Take a ₹5,00,000 loan at 12% a year. Over 36 months the EMI is about ₹16,607 and you pay about ₹97,858 in interest, ₹5,97,858 in all. Stretch the same loan to 60 months and the EMI drops to about ₹11,122, but the interest rises to about ₹1,67,333.",
          "Now drop the rate to 10% on the 36-month loan: the EMI is about ₹16,134 and the interest about ₹80,809. Two percentage points saved roughly ₹17,000 here. These figures are illustrations; a lender's EMI can differ slightly because of rounding, fees and how it counts the first month.",
        ],
      },
      {
        heading: "Fixed vs floating rate EMIs",
        paragraphs: [
          "On a fixed-rate loan the EMI stays the same for the whole tenure. On a floating-rate loan the lender can change the rate when its benchmark moves, and either your EMI or your tenure changes. Most personal loans are fixed-rate. Ask which one you are being offered.",
        ],
      },
      {
        heading: "How much EMI can you carry?",
        paragraphs: [
          "Lenders usually look at how much of your net monthly income already goes to EMIs. If it is much more than about 40 to 50%, approval gets harder and the budget gets tight. Our guide on EMI-to-income ratio explains how to work out your own number.",
        ],
      },
    ],
  },
  {
    slug: "debt-consolidation-explained-for-salaried-borrowers",
    title: "Debt consolidation, explained for salaried borrowers",
    seoTitle: "Debt Consolidation Explained",
    summary: "What it means to merge several EMIs into one loan, who it can help, and when it may not be worth it.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "What is debt consolidation?",
        paragraphs: [
          "Debt consolidation means taking one new loan and using it to pay off several existing ones, such as personal loans, credit-card balances and app loans. You are then left with a single EMI and a single due date.",
        ],
      },
      {
        heading: "When it can help",
        paragraphs: [
          "It tends to make sense when your current debts carry higher interest rates than the new loan, for example credit-card balances or short-term app loans. It can also help if tracking many due dates is causing missed payments.",
        ],
      },
      {
        heading: "When it may not help",
        paragraphs: [
          "If the new loan has a similar rate, a much longer tenure, or high fees, you may end up paying more overall. Foreclosure charges on your existing loans also matter. Always compare the total cost, not just the monthly EMI.",
          "We tell people straight when consolidating isn't worth it. Approval, rate and tenure are always decided by the lender.",
        ],
      },
      {
        heading: "A simple illustration",
        paragraphs: [
          "Say you owe a card balance of ₹1,00,000 charged at about 3.5% a month, a personal loan with 18 months left and an app loan with a high rate. Paying all three on different dates is hard to track. If one new loan at a lower rate clears all three, you pay one EMI. Whether you save money depends on the new rate, the new tenure and the fees, so compare the total you will repay before and after.",
          "The calculator on this site lets you enter your current loans and see the combined EMI and total interest against a single new loan.",
        ],
      },
      {
        heading: "Costs to check before you consolidate",
        paragraphs: [
          "Look at foreclosure or part-payment charges on the loans you will close, processing fees and GST on the new loan, and any insurance bundled with it. Add them to the new loan's cost before comparing.",
        ],
      },
      {
        heading: "What it does to your credit profile",
        paragraphs: [
          "Applying for a new loan creates an enquiry on your report, and closing several accounts changes your credit mix. Over time, paying one EMI on time every month usually helps. Missing it hurts as much as missing any other EMI.",
        ],
      },
      {
        heading: "Alternatives",
        paragraphs: [
          "If your rate is already low, you could prepay the most expensive debt first, ask your current lender to lower the rate, or use a balance transfer on one loan. Consolidation is one tool, not the only one.",
        ],
      },
    ],
  },
  {
    slug: "credit-card-interest-vs-personal-loan-interest",
    title: "Credit-card interest vs personal-loan interest",
    seoTitle: "Personal Loan vs Card Interest Rate",
    summary: "Personal loan interest rate vs credit card interest rate compared, and why carrying a card balance usually costs far more.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "Why cards cost more",
        paragraphs: [
          "Credit cards often charge a credit card loan interest rate of 3 to 3.5% a month on unpaid balances, which works out to roughly 36 to 42% a year. A personal loan interest rate for salaried borrowers is usually far lower, depending on your profile and the lender.",
        ],
      },
      {
        heading: "The minimum-due trap",
        paragraphs: [
          "Paying only the minimum due keeps your account in good standing but lets the rest of the balance keep growing with interest. Over time that can become a large amount.",
        ],
      },
      {
        heading: "Options to consider",
        paragraphs: [
          "If you carry a card balance month after month, you could look at moving it to a lower-rate personal loan with a fixed EMI. Compare the total interest and any processing fees first. Your eligibility and the final rate depend on the lender.",
        ],
      },
      {
        heading: "A rough comparison",
        paragraphs: [
          "₹1,00,000 left unpaid on a card at 3.5% a month costs about ₹3,500 in interest in the first month alone. The same ₹1,00,000 as a 12-month personal loan at 14% costs about ₹4,801 a month in EMI and about ₹15,231 in total interest. At 36% a year the same 12-month schedule would cost about ₹20,555 in interest. These numbers are illustrations, not offers.",
        ],
      },
      {
        heading: "Other card costs",
        paragraphs: [
          "Late-payment fees, GST on interest and fees, and cash-advance charges add to the bill. Cash advances typically start charging interest on day one, with no interest-free period.",
        ],
      },
      {
        heading: "When to keep the card balance",
        paragraphs: [
          "If you can clear the whole balance within the interest-free period, the card costs nothing. A loan only makes sense when you cannot, and when its total cost, including fees, is lower.",
        ],
      },
    ],
  },
  {
    slug: "personal-loan-balance-transfer-when-it-makes-sense",
    title: "Personal-loan balance transfer: when does it make sense?",
    seoTitle: "Balance Transfer vs Prepayment",
    summary: "Balance transfer vs prepayment, and the charges and interest rate to check before you move an existing loan to a cheaper lender.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "What is a balance transfer?",
        paragraphs: [
          "A balance transfer means a new lender pays off your existing loan, and you then repay the new lender, ideally at a lower interest rate.",
        ],
      },
      {
        heading: "Balance transfer vs prepayment",
        paragraphs: [
          "Prepayment means paying down your existing loan faster with your own lump sum, with no new lender involved. A balance transfer instead moves the outstanding amount to a new lender at a lower interest rate. If you have spare cash and no prepayment penalty, prepayment is usually simpler; if the rate gap is large and you don't have a lump sum, a transfer can save more.",
        ],
      },
      {
        heading: "Check these before you switch",
        paragraphs: [
          "Look at the rate difference, the processing fee and other charges on the new loan, any foreclosure charge on the old loan, and how many months remain on your current tenure. A bigger rate gap and a longer remaining tenure usually mean more savings.",
        ],
      },
      {
        heading: "A simple test",
        paragraphs: [
          "Add up everything you would pay on the new loan, including fees, and compare it with what you would pay if you stayed. If the new total is clearly lower, a transfer may be worth exploring.",
        ],
      },
      {
        heading: "What to check first",
        paragraphs: [
          "Find out your outstanding principal, the remaining tenure and your current rate. Ask your lender for the foreclosure charge in writing. Then ask the new lender for the rate, processing fee and any charges. Compare what you will pay from today on each path, not what you paid so far.",
        ],
      },
      {
        heading: "Foreclosure charges",
        paragraphs: [
          "RBI rules bar banks and NBFCs from charging prepayment penalties on floating-rate loans to individuals who are not borrowing for business. Fixed-rate loans may carry a charge set in your loan agreement, often a percentage of the amount prepaid. Read your agreement before you assume there is none.",
        ],
      },
      {
        heading: "Rule of thumb",
        paragraphs: [
          "A transfer tends to be worth it when the rate gap is meaningful, a good part of the tenure is left, and the total of foreclosure and new fees is small next to the interest you will save. With little tenure left, the savings are usually too small.",
        ],
      },
    ],
  },
  {
    slug: "salaried-personal-loan-eligibility-checklist",
    title: "Salaried personal-loan eligibility: a simple checklist",
    seoTitle: "Loan Eligibility Criteria & Checklist",
    summary: "Personal loan eligibility criteria and income requirements lenders check for salaried employees, and how to prepare before you apply.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "Personal loan eligibility criteria",
        paragraphs: [
          "Most lenders check your age, your employment type and employer category, your net monthly income, your credit score and your existing EMIs compared with your income. The income requirements for a personal loan vary by lender, but a stable salaried income is the main one.",
          "Each lender sets its own criteria, so meeting the general benchmarks improves your chances of being shortlisted but does not guarantee approval.",
        ],
      },
      {
        heading: "Documents to keep ready",
        paragraphs: [
          "Typically PAN and Aadhaar, your latest salary slips, recent bank statements and proof of employment. If you are consolidating, keep your current loan and card statements handy too.",
        ],
      },
      {
        heading: "Before you apply",
        paragraphs: [
          "Avoid applying to many lenders at once, since each full application can leave an enquiry on your credit report. A soft eligibility check helps you see where you stand first.",
        ],
      },
      {
        heading: "Documents commonly asked for",
        paragraphs: [
          "PAN and Aadhaar, recent salary slips, recent bank statements showing the salary credit, proof of address and statements for existing loans and cards. Lenders differ, so confirm the exact list with the lender you apply to.",
        ],
      },
      {
        heading: "What lenders weigh",
        paragraphs: [
          "Your monthly income, how much of it already goes to EMIs, your employer category, how long you have worked, your credit score and your repayment history. A score of around 700 or higher is commonly preferred for better rates, though each lender sets its own cut-off.",
        ],
      },
      {
        heading: "Before you apply",
        paragraphs: [
          "Check your credit report for errors, pay down card balances if you can, avoid applying to many lenders at once because each formal application creates an enquiry, and borrow only what the EMI budget can carry.",
        ],
      },
    ],
  },
  {
    slug: "overdraft-vs-personal-loan",
    title: "Overdraft vs personal loan: which suits you?",
    seoTitle: "Overdraft vs Personal Loan",
    summary: "Two ways to borrow, two different ways of paying. A quick comparison for salaried borrowers.",
    publishedAt: ARTICLES_ADDED,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "How they differ",
        paragraphs: [
          "A personal loan gives you a fixed amount upfront, repaid through fixed EMIs. An overdraft or credit line gives you a limit you can draw from as needed, and interest is generally charged on the amount you actually use. Terms vary a lot between lenders.",
        ],
      },
      {
        heading: "When an overdraft can fit",
        paragraphs: [
          "If your cash needs come in small, irregular amounts, a limit you can dip into may be more flexible than taking a large loan.",
        ],
      },
      {
        heading: "When a personal loan fits better",
        paragraphs: [
          "If you need a known amount for a specific purpose and want a fixed repayment schedule, a personal loan is usually simpler to plan around. Whichever you choose, compare rates, fees and the total cost.",
        ],
      },
      {
        heading: "How the cost differs",
        paragraphs: [
          "With an overdraft you pay interest only on the amount you use, for the days you use it. A personal loan charges interest on the whole amount from the day it is disbursed. That makes an overdraft cheaper for short, uncertain needs and a loan cheaper for a fixed, larger need you will repay over months.",
        ],
      },
      {
        heading: "Watch the limit and the fees",
        paragraphs: [
          "An overdraft limit can be reviewed or reduced, and may carry an annual or renewal fee. A loan has a fixed amount and tenure. Compare the effective cost, including fees, for how you really expect to use the money.",
        ],
      },
      {
        heading: "Which suits whom",
        paragraphs: [
          "Choose an overdraft if your need is short-term and variable. Choose a loan if you need a fixed sum for a planned expense and want a predictable EMI.",
        ],
      },
    ],
  },
  {
    slug: "cibil-score-ranges-and-how-to-improve",
    title: "CIBIL score ranges and how to improve yours",
    seoTitle: "CIBIL Score Range & How to Improve",
    summary: "What a credit score means, the ranges lenders look at, and practical steps that raise it over time.",
    publishedAt: ARTICLES_ADDED_2,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "What is a credit score?",
        paragraphs: [
          "A credit score is a three-digit number, from 300 to 900 for the Indian bureaus, that sums up how reliably you have repaid credit. Lenders use it to decide whether to lend and at what rate. CIBIL is the best-known score, and Experian and CRIF High Mark publish their own.",
        ],
      },
      {
        heading: "Score ranges",
        paragraphs: [
          "Cut-offs differ by lender, but as a rough guide: 750 and above is considered strong, 700 to 749 is decent, 650 to 699 is fair and below 650 makes borrowing costlier or harder. A score of 300 to 350 can also mean there is not enough history yet.",
        ],
      },
      {
        heading: "What moves your score",
        paragraphs: [
          "Payment history matters most, so every missed or late EMI or card payment hurts. Credit utilisation matters too: using a high share of your card limit signals stress, and keeping it under about 30% is a common guideline. Other factors are the age of your accounts, your mix of secured and unsecured credit, and how many recent applications you made.",
        ],
      },
      {
        heading: "Steps that help",
        paragraphs: [
          "Pay every EMI and card bill on time, ideally by auto-debit. Keep card balances low against limits. Avoid applying to many lenders at once. Keep old accounts open if they have a clean record. Check your report for errors and raise a dispute with the bureau if you find one.",
        ],
      },
      {
        heading: "How long it takes",
        paragraphs: [
          "Lenders report to bureaus regularly, so changes can take weeks to show, and building a strong history takes months of steady repayment. Beware anyone who promises to raise your score quickly for a fee.",
        ],
      },
      {
        heading: "Free reports",
        paragraphs: [
          "RBI rules entitle you to one free full credit report every year from each credit information company. Use it to check for errors, and see our guide on how the three bureaus differ.",
        ],
      },
    ],
  },
  {
    slug: "cibil-vs-experian-vs-crif-high-mark",
    title: "CIBIL vs Experian vs CRIF High Mark: what is the difference?",
    seoTitle: "CIBIL vs Experian vs CRIF High Mark",
    summary: "India has four credit bureaus. Here is how the three you see most often compare, and why your scores can differ.",
    publishedAt: ARTICLES_ADDED_2,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "Four bureaus, one job",
        paragraphs: [
          "Credit information companies collect your loan and card history from banks, NBFCs and card issuers, and turn it into a report and score. India licenses four: TransUnion CIBIL, Experian, CRIF High Mark and Equifax. Lenders may check any of them.",
        ],
      },
      {
        heading: "Why your scores differ",
        paragraphs: [
          "Each bureau uses its own scoring model and may hold slightly different data, depending on which lenders report to it and when. A gap of some tens of points between bureaus is common and does not by itself mean an error.",
        ],
      },
      {
        heading: "Which one should you check?",
        paragraphs: [
          "Check the bureau your lender uses if you know it. CIBIL is the one many banks quote. Otherwise look at more than one, so you can spot errors that appear in only one report.",
        ],
      },
      {
        heading: "What our eligibility check does",
        paragraphs: [
          "When you give permission, our eligibility check can retrieve your report from Experian, CIBIL or CRIF High Mark, whichever you pick, and use it to show your eligibility across partner lenders. We ask your consent first and explain what we store in our privacy policy.",
        ],
      },
      {
        heading: "If you find an error",
        paragraphs: [
          "Note the account, take a screenshot, and raise a dispute with the bureau and with the lender that reported it. Both are obliged to look into it and respond within the timelines RBI sets.",
        ],
      },
    ],
  },
  {
    slug: "how-to-read-a-loan-offer-key-fact-statement",
    title: "How to read a loan offer and its Key Fact Statement",
    seoTitle: "How to Read a Loan Offer (KFS)",
    summary: "The numbers that matter in a loan offer, and how to use the Key Fact Statement to compare lenders on cost.",
    publishedAt: ARTICLES_ADDED_2,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "Look past the headline rate",
        paragraphs: [
          "A low advertised interest rate does not tell you what you will pay. Processing fees, GST, insurance and other charges can add a lot. Compare offers by the total you repay and by the annual percentage rate (APR), which includes most costs.",
        ],
      },
      {
        heading: "The Key Fact Statement",
        paragraphs: [
          "RBI requires banks and NBFCs to give you a Key Fact Statement in a standard format before the loan agreement. It shows the loan amount, interest rate, APR, tenure, EMI, all fees and charges, and the total amount payable. Because every lender uses the same format, it is the easiest way to compare offers side by side.",
        ],
      },
      {
        heading: "What to check line by line",
        paragraphs: [
          "Is the interest rate fixed or floating? What is the APR against the headline rate? What are the processing fee and GST, and are they deducted from the loan amount, so you receive less than you borrow? What is charged for late payment, bounced EMIs and foreclosure? Is insurance optional or compulsory?",
        ],
      },
      {
        heading: "Cooling-off period",
        paragraphs: [
          "RBI's digital-lending rules give you a cooling-off or look-up period in which you can exit the loan by repaying the principal and the interest for the days you used it, without a penalty. Ask the lender how long it is.",
        ],
      },
      {
        heading: "Before you sign",
        paragraphs: [
          "Read the full agreement, not just the summary. Never pay anyone to get a loan sanctioned, and never share your OTP. If anything is unclear, ask the lender in writing.",
        ],
      },
    ],
  },
  {
    slug: "loan-foreclosure-and-prepayment-charges",
    title: "Loan foreclosure and prepayment charges, explained",
    seoTitle: "Loan Foreclosure & Prepayment Charges",
    summary: "What foreclosure and part-payment mean, when charges apply, and how to check if closing a loan early saves money.",
    publishedAt: ARTICLES_ADDED_2,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "Two terms",
        paragraphs: [
          "Foreclosure means paying off the whole outstanding loan before the tenure ends. Part-prepayment means paying a lump sum towards the principal while the loan continues. Both reduce the interest you pay, but a lender may charge a fee.",
        ],
      },
      {
        heading: "When charges apply",
        paragraphs: [
          "RBI rules bar banks and NBFCs from charging prepayment penalties on floating-rate loans to individuals who are not borrowing for business. Fixed-rate loans, which include many personal loans, may carry a charge set in the loan agreement, often a percentage of the amount prepaid or of the outstanding principal. Some lenders allow free part-payment after a lock-in period.",
        ],
      },
      {
        heading: "How to check whether it pays",
        paragraphs: [
          "Add up the interest you would still pay if you keep the loan to the end. Subtract the foreclosure charge and any GST on it. If the saving is clearly bigger, closing early makes sense. This matters most when you are using a new loan to close the old one, because you also pay processing fees on the new loan.",
        ],
      },
      {
        heading: "Get it in writing",
        paragraphs: [
          "Ask the lender for a foreclosure statement showing the exact amount payable on a given date. Pay only to the lender's official account, and ask for a no-dues certificate and updated record once the loan is closed.",
        ],
      },
      {
        heading: "After closing",
        paragraphs: [
          "Check your credit report a month or two later to confirm the loan shows as closed. If it does not, ask the lender to update the bureau.",
        ],
      },
    ],
  },
  {
    slug: "how-to-spot-loan-scams-in-india",
    title: "How to spot loan scams in India",
    seoTitle: "How to Spot Loan Scams in India",
    summary: "The warning signs of fake loan offers and apps, and what to do if you have already shared details or money.",
    publishedAt: ARTICLES_ADDED_2,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "Common warning signs",
        paragraphs: [
          "You are asked to pay a fee, deposit or insurance before the loan is released. The offer comes by unsolicited call, SMS or WhatsApp and promises approval with no checks. The app asks for access to your contacts, photos or messages. The person pressures you to act quickly or threatens you.",
        ],
      },
      {
        heading: "What legitimate lenders do not do",
        paragraphs: [
          "A genuine bank or NBFC does not ask you to pay to release a loan, does not ask for your OTP, PIN or card details by phone, and does not harass you or your contacts. Fees, if any, appear in the Key Fact Statement and are usually deducted from the loan.",
        ],
      },
      {
        heading: "How to verify a lender",
        paragraphs: [
          "Check that the lender is an RBI-regulated bank or NBFC on the RBI website, and use its official website or app, not a link sent to you. Confirm the lending app is the lender's own. Be careful with apps you have never heard of.",
        ],
      },
      {
        heading: "Protect your data",
        paragraphs: [
          "Share your PAN, Aadhaar and bank details only with entities you have verified. Never give your OTP to anyone. Do not install apps from links in messages.",
        ],
      },
      {
        heading: "If you have been targeted",
        paragraphs: [
          "Stop all payments. Keep screenshots and transaction details. Report the fraud on the National Cyber Crime Reporting Portal (cybercrime.gov.in) or call 1930, and tell your bank at once so it can try to block the payment. You can also report to us at the contact details on our website.",
        ],
      },
      {
        heading: "About Amortas",
        paragraphs: [
          "Amortas never charges to approve, release or process a loan, and never asks for your OTP, PIN or card details on a call, WhatsApp or SMS.",
        ],
      },
    ],
  },
  {
    slug: "emi-to-income-ratio-how-much-debt-is-too-much",
    title: "EMI-to-income ratio: how much debt is too much?",
    seoTitle: "EMI-to-Income Ratio Explained",
    summary: "How to work out the share of your income that goes to EMIs, what lenders like to see, and how to bring it down.",
    publishedAt: ARTICLES_ADDED_2,
    updatedAt: ARTICLES_ADDED_2,
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "Your EMI-to-income ratio, which lenders also call FOIR (fixed obligations to income ratio), is your total monthly EMIs and card minimums divided by your net monthly income. If you earn ₹80,000 a month and pay ₹32,000 in EMIs, the ratio is 40%.",
        ],
      },
      {
        heading: "What lenders look for",
        paragraphs: [
          "Policies differ. Many lenders become cautious when total obligations, including the new EMI, go above roughly 40 to 50% of net income. A lower ratio improves approval chances and often the rate.",
        ],
      },
      {
        heading: "What is comfortable for you",
        paragraphs: [
          "A lender's limit is not a budget. After rent, food, bills, insurance and savings, check how much room is actually left. If one missed bonus would make the EMIs hard to pay, you are probably carrying too much.",
        ],
      },
      {
        heading: "How to bring it down",
        paragraphs: [
          "Clear the smallest or most expensive loan first, consolidate several loans into one with a lower total EMI where the total cost also falls, extend tenure only if the extra interest is acceptable, and avoid new borrowing until the ratio improves.",
        ],
      },
      {
        heading: "Use the calculators",
        paragraphs: [
          "Our debt consolidation calculator shows your combined EMI today and what it could be with one loan. Treat the output as an estimate; a lender decides what it will offer.",
        ],
      },
    ],
  },
  {
    slug: "how-to-get-out-of-debt-in-2027",
    title: "How to get out of debt in 2027: a month-by-month plan for salaried borrowers",
    seoTitle: "Get Out of Debt in 2027: Monthly Plan",
    summary: "A 12-month plan to list your debts, stop the costliest interest first, decide on consolidation and build a buffer, with a worked rupee example.",
    publishedAt: ARTICLES_ADDED_3,
    updatedAt: ARTICLES_ADDED_3,
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "List every debt with its rate, clear the most expensive one first, merge debts into one loan only if the total cost falls, and keep your EMIs under about 40% of your take-home pay. Starting in the last weeks of the year gives you a full 12 months to work through it.",
        ],
      },
      {
        heading: "Month 1: write everything down",
        paragraphs: [
          "Make one list with the lender, the balance, the interest rate, the EMI and the months left on every loan, card and app loan. Your credit report shows most of them, and our free credit report page can fetch it for you. You cannot fix what you have not counted.",
        ],
      },
      {
        heading: "Month 2: stop the costliest interest first",
        paragraphs: [
          "Interest is not equal across debts. ₹1,00,000 on a credit card at 42% a year costs about ₹3,500 in interest every month. ₹2,00,000 on a personal loan at 16% costs about ₹2,667 a month, even though the balance is twice as large. Any extra rupee you can find should go to the highest-rate debt first, while you keep paying the minimum on the rest. This is often called the avalanche method.",
        ],
      },
      {
        heading: "Months 3 to 4: decide whether to consolidate",
        paragraphs: [
          "If you carry card dues or app loans at high rates, check whether one lower-rate loan would cost less in total, after processing fees and any foreclosure charges on the old loans. Compare the total you will repay, not just the EMI. If the numbers do not work, say no and keep going with the avalanche method.",
        ],
      },
      {
        heading: "Months 5 to 8: protect your cash flow",
        paragraphs: [
          "Set every EMI to auto-debit so no payment is late. Stop adding new card balances. Keep a small emergency fund, even one month of expenses, so a surprise bill does not go back on a card.",
        ],
      },
      {
        heading: "Months 9 to 12: check progress and your score",
        paragraphs: [
          "Pull your credit report again. Closed loans should show a zero balance, and your score should be moving up as balances fall. Do not take on new borrowing until your EMIs are comfortably below 40% of your income. Our EMI-to-income guide shows how to work out your own number.",
        ],
      },
      {
        heading: "What not to do",
        paragraphs: [
          "Do not pay anyone a fee to get a loan sanctioned or your debt cleared, do not share your OTP, and be careful of any service that promises to wipe your debt for a fee. Genuine lenders and facilitators do not ask you to pay to release a loan.",
        ],
      },
    ],
  },
  {
    slug: "debt-consolidation-vs-debt-settlement",
    title: "Debt consolidation vs debt settlement: which one is right, and which hurts your credit?",
    seoTitle: "Debt Consolidation vs Debt Settlement",
    summary: "Consolidation repays what you owe in one new loan. Settlement pays less than you owe. Here is how each affects your credit score and cost.",
    publishedAt: ARTICLES_ADDED_3,
    updatedAt: ARTICLES_ADDED_3,
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Debt consolidation pays your old debts in full using one new loan, so your record stays clean. Debt settlement means a lender agrees to accept less than you owe, usually after you have stopped paying, and your report shows the account as settled rather than paid in full, which many lenders read as a red flag.",
        ],
      },
      {
        heading: "How consolidation works",
        paragraphs: [
          "A new loan from a bank or NBFC clears your cards, personal loans and app loans. You then pay one EMI. It helps when the new loan costs less in total than the debts it replaces, including fees. If your credit profile is weak, you may not qualify for a better rate.",
        ],
      },
      {
        heading: "How settlement works",
        paragraphs: [
          "In a settlement, you and the lender agree a lower one-time amount to close the account. Lenders usually offer it only when an account is already overdue. The account is then reported as settled, not closed in good standing.",
        ],
      },
      {
        heading: "What each does to your credit score",
        paragraphs: [
          "Consolidation creates one new enquiry and changes your credit mix, but paying the new EMI on time usually helps over the following months. Settlement tends to hurt more, because missed payments come first and a settled mark can stay on your report for years and make future loans harder or costlier.",
        ],
      },
      {
        heading: "Which should you choose?",
        paragraphs: [
          "If you can still make your payments, look at consolidation, a balance transfer or simply paying the costliest debt first. If you are already missing payments, talk to your lenders about a revised schedule before anything else. Be careful of companies that promise to settle your debt for a fee, and never stop paying without a written agreement.",
        ],
      },
    ],
  },
  {
    slug: "how-to-read-your-credit-report",
    title: "How to read your credit report: every section explained",
    seoTitle: "How to Read Your Credit Report",
    summary: "A plain guide to each part of an Indian credit report: personal details, score, accounts, payment history and enquiries, and what to check.",
    publishedAt: ARTICLES_ADDED_3,
    updatedAt: ARTICLES_ADDED_3,
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "A credit report has five parts: your personal details, your score, your accounts, your payment history and your enquiries. Read your details and accounts first, because a wrong entry in either can pull your score down. You are entitled to one free full report a year from each credit bureau.",
        ],
      },
      {
        heading: "Personal details",
        paragraphs: [
          "Your name, date of birth, PAN, addresses and phone numbers. Check that they are yours. A wrong PAN or a stranger's address can mean accounts belonging to someone else have been mixed into your file.",
        ],
      },
      {
        heading: "Your score",
        paragraphs: [
          "The three-digit number, from 300 to 900. It is a summary of the rest of the report. See our guide on score ranges for what each band means for loan approvals and rates.",
        ],
      },
      {
        heading: "Accounts",
        paragraphs: [
          "Every loan and card, with the lender, the date opened, the limit or loan amount, the current balance and any overdue amount. Closed loans should show a zero balance. Credit cards show a limit, and the balance against it tells lenders how much of your limit you use.",
        ],
      },
      {
        heading: "Payment history",
        paragraphs: [
          "A month-by-month record of whether each EMI or card bill was paid on time. Late payments appear as days past due. This is the single biggest factor in your score, so look for entries that you know were paid on time.",
        ],
      },
      {
        heading: "Enquiries",
        paragraphs: [
          "A list of lenders that looked at your file after you applied for credit. A few enquiries are normal. Many in a short time can make lenders cautious, so avoid applying to several at once.",
        ],
      },
      {
        heading: "What to do if something is wrong",
        paragraphs: [
          "Note the account, take a screenshot, and raise a dispute with both the bureau and the lender that reported it. Keep proof such as a closure letter. Corrections can take weeks, so check your report a month or two before you plan to apply for a loan.",
        ],
      },
    ],
  },
  {
    slug: "personal-loan-eligibility-in-2027",
    title: "Personal loan eligibility in 2027: salary, credit score and employer category explained",
    seoTitle: "Personal Loan Eligibility in 2027",
    summary: "What lenders check in 2027 for a salaried personal loan: income, credit score, employer category and existing EMIs, and how to prepare before you apply.",
    publishedAt: ARTICLES_ADDED_3,
    updatedAt: ARTICLES_ADDED_3,
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Lenders look at four things: your net monthly income, your credit score and repayment record, your employer's category and how much of your income already goes to EMIs. Each lender sets its own limits and changes them from time to time, so treat any figure as a guide, not a promise.",
        ],
      },
      {
        heading: "Income",
        paragraphs: [
          "Most lenders work from your take-home salary and ask for recent salary slips and bank statements. A higher, steadier income gives you a larger loan and often a better rate. Variable pay such as bonuses is counted differently by different lenders.",
        ],
      },
      {
        heading: "Credit score and history",
        paragraphs: [
          "A score of around 700 or more is commonly preferred for better pricing, though some lenders approve lower scores at higher rates. Missed or late payments in the last year matter more than an old mistake.",
        ],
      },
      {
        heading: "Employer category",
        paragraphs: [
          "Lenders group employers into categories, often by size, listing and stability. Large listed companies, multinationals and government bodies usually sit in the higher categories. A higher category can mean a lower rate or a bigger loan.",
        ],
      },
      {
        heading: "Existing EMIs",
        paragraphs: [
          "Lenders compare your total monthly EMIs, including the new one, with your income. Many become cautious above roughly 40 to 50%. Closing a small loan or paying down a card before you apply can improve your position.",
        ],
      },
      {
        heading: "How to prepare",
        paragraphs: [
          "Check your credit report for errors, pay every bill on time for a few months, avoid applying to many lenders at once, and keep your documents ready: PAN, Aadhaar, salary slips and bank statements. Our free eligibility check shows where you are likely to qualify before you make a formal application.",
        ],
      },
    ],
  },
  {
    slug: "repo-rate-change-what-it-means-for-your-emi",
    title: "Repo rate change: what it means for your EMI",
    seoTitle: "Repo Rate Change: What It Means for EMI",
    summary: "How an RBI repo-rate change reaches your loan, why floating-rate and fixed-rate loans react differently, and what to ask your lender.",
    publishedAt: ARTICLES_ADDED_3,
    updatedAt: ARTICLES_ADDED_3,
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "When the RBI changes the repo rate, loans linked to it can get cheaper or costlier, but fixed-rate loans do not change until their term ends. Most personal loans are fixed-rate, so a policy announcement usually does not move your existing EMI.",
        ],
      },
      {
        heading: "What the repo rate is",
        paragraphs: [
          "It is the rate at which the RBI lends to banks. Banks and NBFCs use it as one input when they price loans, so changes tend to flow through to new loans first.",
        ],
      },
      {
        heading: "Floating-rate loans",
        paragraphs: [
          "If your loan rate is linked to an external benchmark such as the repo rate, your lender will reset it at set intervals. After a reset, either your EMI or your remaining tenure changes. Ask the lender which of the two it adjusts.",
        ],
      },
      {
        heading: "Fixed-rate loans",
        paragraphs: [
          "The rate in your agreement stays for the whole tenure. If rates fall, you do not benefit automatically. You could ask the lender to lower your rate, prepay, or look at a balance transfer to a cheaper lender, after counting foreclosure and processing charges.",
        ],
      },
      {
        heading: "What to do after a policy announcement",
        paragraphs: [
          "Check which type of loan you have, read the reset terms in your agreement and compare the total cost of staying versus switching. Do not pay anyone to change your rate for you.",
        ],
      },
    ],
  },
];
