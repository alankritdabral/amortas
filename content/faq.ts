/**
 * The single source of truth for the homepage/`/faq` FAQ list, imported by
 * both components/FAQ.tsx (the visible accordion) and app/faq/page.tsx
 * (its FAQPage JSON-LD), so the two can never drift the way /faq's
 * hand-written schema and /debt-consolidation's did before this phase.
 *
 * Note: Google removed the FAQ rich result for all sites on 7 May 2026
 * (developers.google.com/search/updates), so this schema produces no rich
 * result today. It's kept anyway because it costs nothing and exactly
 * matches what's on the page — unlike the two copies this phase removed.
 */
import { withYear } from "@/lib/seo";

const RAW_FAQS = [
  {
    question: "What does Amortas do?",
    answer: "We help customers understand their existing debt or borrowing requirements and explore suitable loan, consolidation or repayment options based on their situation."
  },
  {
    question: "Can you help with multiple loans?",
    answer: "Yes. We can review multiple loans and EMIs together and help you understand whether consolidation or another option may be suitable."
  },
  {
    question: "Can you help with credit-card debt?",
    answer: "We can review your credit-card dues and help you understand potential repayment or consolidation options available based on your situation."
  },
  {
    question: "Do you guarantee loan approval?",
    answer: "No. Final approval, interest rate, loan amount and tenure are decided by the respective lender based on its eligibility criteria."
  },
  {
    question: "Do you guarantee lower interest rates?",
    answer: "No. Rates depend on your profile, lender policies and prevailing terms. We help you explore suitable options."
  },
  {
    question: "Is the assessment free?",
    answer: "The initial assessment can be offered without obligation. Any applicable charges, if any, should always be communicated clearly before proceeding."
  },
  {
    question: "Will taking another loan always help?",
    answer: "No. A new loan isn't always the right solution. We first look at the existing situation and then discuss relevant options."
  },
  {
    question: "Is Amortas a bank or an NBFC?",
    answer: "No. Amortas is a loan facilitator. We help you check eligibility and compare options, and we pass your enquiry to partner lenders only if you allow it. The lender, not Amortas, approves and disburses the loan. See our partner disclosures for the lenders we work with."
  },
  {
    question: "Which lenders do you work with?",
    answer: "The current list of banks and NBFCs is published on our Partner Disclosures page, along with how we are compensated. The list changes from time to time."
  },
  {
    question: "How do you make money?",
    answer: "Using Amortas does not cost you anything. Lenders may pay us when an enquiry results in a loan. That payment does not change the rate or fees the lender offers you, and you should never pay anyone to approve or release a loan."
  },
  {
    question: "What is debt consolidation?",
    answer: "Debt consolidation means taking one new loan to repay several existing ones, such as personal loans, credit-card balances and app loans, so you have one EMI and one due date. It helps most when the new loan costs less overall than the debts it replaces."
  },
  {
    question: "What is a balance transfer?",
    answer: "A balance transfer moves the outstanding amount on an existing loan to a new lender, ideally at a lower interest rate. Check foreclosure charges on the old loan and processing fees on the new one before deciding."
  },
  {
    question: "Will checking my eligibility affect my credit score?",
    answer: "Looking at your own credit report is generally treated as a soft enquiry and does not lower your score. A formal loan application with a lender usually creates a hard enquiry, which can reduce your score slightly for a while. We ask for your permission before we retrieve your credit report."
  },
  {
    question: "Why do you ask for my PAN, date of birth and a credit report?",
    answer: "Credit bureaus need your PAN and date of birth to find your report. The report lets us show which of your existing loans could be consolidated and how lenders may view your profile. You choose whether to give this permission, and you can withdraw it later."
  },
  {
    question: "Who sees my data?",
    answer: "Your details are shared with partner lenders only if you tick that optional permission. We also use processors to run the service, such as OTP and messaging providers, hosting providers and credit bureaus. The full list is in our Privacy Policy."
  },
  {
    question: "How do I delete my data or withdraw consent?",
    answer: "Use the Delete my data page or email us from the number or address you used. You can also change cookie choices any time from Cookie settings in the footer. We aim to acknowledge requests within 2 working days."
  },
  {
    question: "How do I make a complaint?",
    answer: "Email us first. If you are not satisfied, escalate to our Grievance Officer, and then to the RBI Complaint Management System for regulated lenders. The steps are on the Grievance Redressal page."
  },
  {
    question: "Will you ever ask me to pay to get a loan approved?",
    answer: "Never. Amortas does not charge to approve, release or process a loan, and we never ask for your OTP, PIN or card details over phone, WhatsApp or SMS. If someone does in our name, do not pay, and report it to us and to the cybercrime helpline 1930."
  },
  {
    question: "What credit score do I need?",
    answer: "Every lender sets its own cut-off. Many prefer a score of around 700 or higher for the best rates, but some consider lower scores at higher rates. Your income, employer, existing EMIs and repayment history matter too."
  },
  {
    question: "What documents are usually needed?",
    answer: "Commonly PAN, Aadhaar, recent salary slips, recent bank statements and statements for your current loans and cards. The exact list depends on the lender and the loan."
  },
  {
    question: "Can self-employed people use Amortas?",
    answer: "Our eligibility check and lender rules are currently built around salaried applicants. If you are self-employed, contact us and we will tell you honestly whether we can help."
  },
  {
    question: "Am I obliged to take a loan after I enquire?",
    answer: "No. Enquiring or checking eligibility does not commit you to anything. You decide whether to go ahead, and you should read the lender's terms and Key Fact Statement first."
  },
  {
    question: "Does a longer tenure mean a better loan?",
    answer: "Not necessarily. A longer tenure lowers your monthly EMI but increases the total interest you pay. Compare total cost, not only the EMI."
  },
  {
    question: "What is the best way to reduce my EMIs in {nextYear}?",
    answer: "Start by listing every debt with its rate. Pay the costliest one first, ask whether one lower-rate loan would cost less in total once fees and foreclosure charges are counted, and keep your EMIs under about 40% of your take-home pay. Compare total cost, not only the monthly amount."
  },
  {
    question: "Should I wait until {nextYear} to consolidate my debt?",
    answer: "The calendar matters less than the numbers. High-rate debt keeps costing interest every month you wait, for example a credit card at about 3.5% a month. Run your own figures in our calculator and decide on total cost, and remember the lender decides approval and rate."
  },
  {
    question: "How often should I check my credit report?",
    answer: "About once a month is plenty, and always a month or two before you apply for a loan so you have time to fix any error. You are entitled to one free full report a year from each credit bureau, and checking your own report is a soft enquiry."
  }
];

/** Year tokens ({year}, {nextYear}) resolved, so the visible text and the FAQPage markup always agree. */
export const siteFaqs = RAW_FAQS.map((f) => ({ question: withYear(f.question), answer: withYear(f.answer) }));


/** The few questions the landing page shows; the rest live on /faq. Matched on the question text before the year is filled in. */
const HOME_FAQ_QUESTIONS = [
  "What does Amortas do?",
  "Is the assessment free?",
  "Do you guarantee loan approval?",
  "Will checking my eligibility affect my credit score?",
  "How do you make money?",
  "Who sees my data?",
];
export const homeFaqs = HOME_FAQ_QUESTIONS.map((q) => RAW_FAQS.find((f) => f.question === q))
  .filter((f): f is (typeof RAW_FAQS)[number] => Boolean(f))
  .map((f) => ({ question: withYear(f.question), answer: withYear(f.answer) }));
