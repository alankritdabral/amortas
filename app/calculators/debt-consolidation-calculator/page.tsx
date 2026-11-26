import { Metadata } from "next";
import Link from "next/link";
import { DebtConsolidationCalculator } from "@/components/DebtConsolidationCalculator";
import { siteConfig } from "@/lib/config";
import { CheckCircle2, ShieldCheck, ArrowRight, Layers3, Percent, Clock } from "lucide-react";
import { LENDERS } from "@/lib/lenderEngine";
import { ContactForm } from "@/components/ContactForm";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { jsonLd } from "@/lib/structuredData";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Debt Consolidation Calculator India {year}",
  description:
    "Free debt consolidation calculator for Indian borrowers. Combine personal loans, credit card dues and app loans into one lower EMI.",
  path: "/calculators/debt-consolidation-calculator",
});

const calculatorSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Debt Consolidation Calculator India",
      "url": `${siteConfig.url}/calculators/debt-consolidation-calculator`,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "description": "Calculate monthly EMI reduction, weighted average interest savings, and total repayment when consolidating multiple credit cards and personal loans into a single structured loan.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },
    {
      // The 4 questions below are copied verbatim from Section 5 further
      // down this page ("Frequently Asked Questions About the Calculator")
      // — kept in sync by hand since, unlike the sitewide FAQ (content/
      // faq.ts) and the per-product PageFAQ (lib/pageContent.ts), this
      // page's FAQ text is bespoke prose rather than a shared data array.
      // A prior version of this schema had a 5th question not on the page
      // at all, and reworded the other 4; if you edit Section 5's wording,
      // mirror the change here too.
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the debt consolidation calculator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator adds up all your existing debts (credit cards, personal loans, app loans) and computes your current combined monthly payment and weighted average interest rate. It then calculates the EMI of a single new consolidated loan based on your selected tenure and interest rate, showing you your exact monthly cash-flow difference and total interest impact."
          }
        },
        {
          "@type": "Question",
          "name": "Does a lower consolidated EMI mean I pay less overall interest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not always. If you lower your monthly EMI by stretching the tenure significantly (e.g. from 24 months to 60 months), your total interest over the life of the loan could be higher even though the interest rate is lower. The calculator flags this clearly with an alert banner whenever tenure extension causes higher overall interest."
          }
        },
        {
          "@type": "Question",
          "name": "What interest rate can I expect for debt consolidation in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For salaried professionals with a CIBIL score of 720+ and stable employment, personal loan consolidation rates typically start from 9.99% to 14.5% p.a. from top partner banks like HDFC, ICICI, Axis, and Kotak. This represents a massive interest reduction compared to credit card finance charges (36% to 42% p.a.)."
          }
        },
        {
          "@type": "Question",
          "name": "Will using this calculator impact my CIBIL score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This tool is purely illustrative and mathematical. It runs entirely in your browser without requiring a credit bureau pull or login. Your credit score remains 100% untouched."
          }
        }
      ]
    }
  ]
};

const CHECKS = [
  { icon: Percent, title: "Total repayment, not just the EMI", text: "A lower monthly EMI helps cash flow, but stretching the tenure from 2 years to 6 can raise the total interest. Choose the shortest tenure you can comfortably afford." },
  { icon: Layers3, title: "Foreclosure and processing charges", text: "Check whether your existing lenders charge for closing early, and add the new lender's processing fee (typically 1% to 2%) to your net saving." },
  { icon: Clock, title: "Card discipline afterwards", text: "Moving card dues into a loan only works if you stop building fresh balances on those cards while you repay it." },
  { icon: ShieldCheck, title: "Lender credibility", text: "Work only with RBI-regulated banks and NBFCs. Avoid apps that charge large upfront fees or insurance deductions." },
];

const FAQS = [
  { q: "How does the debt consolidation calculator work?", a: "The calculator adds up all your existing debts (credit cards, personal loans, app loans) and computes your current combined monthly payment and weighted average interest rate. It then calculates the EMI of a single new consolidated loan based on your selected tenure and interest rate, showing you your exact monthly cash-flow difference and total interest impact." },
  { q: "Does a lower consolidated EMI mean I pay less overall interest?", a: "Not always. If you lower your monthly EMI by stretching the tenure significantly (e.g. from 24 months to 60 months), your total interest over the life of the loan could be higher even though the interest rate is lower. The calculator flags this clearly with an alert banner whenever tenure extension causes higher overall interest." },
  { q: "What interest rate can I expect for debt consolidation in India?", a: "For salaried professionals with a CIBIL score of 720+ and stable employment, personal loan consolidation rates typically start from 9.99% to 14.5% p.a. from top partner banks like HDFC, ICICI, Axis, and Kotak. This represents a massive interest reduction compared to credit card finance charges (36% to 42% p.a.)." },
  { q: "Will using this calculator impact my CIBIL score?", a: "No. This tool is purely illustrative and mathematical. It runs entirely in your browser without requiring a credit bureau pull or login. Your credit score remains 100% untouched." },
];

const ROWS = [
  ["HDFC Credit Card Dues", "₹1,50,000", "42.0% p.a.", "₹14,500 (Min/Part)", true],
  ["Personal Loan #1", "₹2,50,000", "16.5% p.a.", "₹8,900", false],
  ["SBI Credit Card Dues", "₹1,00,000", "40.0% p.a.", "₹9,000", true],
  ["Fintech App Loan", "₹1,00,000", "36.0% p.a.", "₹10,200", true],
] as const;

export default function DebtConsolidationCalculatorPage() {
  return (
    <div className="min-h-screen bg-white text-[#252525]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(calculatorSchema) }} />
      <div className="h-[84px]" aria-hidden="true" />

      <section className="bg-[#FFF3E8] border-b border-[#F0E3D8]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 grid gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16 items-center">
          <div>
          <p className="text-base font-semibold">Free tool · no login</p>
          <h1 className="mt-3 text-[clamp(34px,7vw,56px)] leading-[1.02] tracking-[-0.04em] font-medium max-w-4xl">
            Debt consolidation calculator.
          </h1>
          <p className="mt-5 text-lg md:text-xl leading-[1.5] max-w-2xl">
            Enter your active debts and see what one single EMI could look like, how much it changes each month and what it
            means for total interest.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-base font-medium">
            {["Add as many debts as you like", "Weighted average rate worked out for you", "No effect on your credit score"].map((t) => (
              <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-[#E15F00]" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          </div>
          <div className="w-full lg:max-w-[520px] lg:ml-auto">
            <ContactForm variant="card" location="hero" />
          </div>
        </div>
      </section>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }, { name: "Debt Consolidation Calculator" }]} />

      <section className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <DebtConsolidationCalculator />
      </section>

      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <div>
            <p className="text-base font-semibold text-[#C94400]">Guide</p>
            <h2 className="mt-2 text-[36px] sm:text-[48px] leading-[1.02] tracking-[-0.04em] font-bold">How consolidation works in India.</h2>
          </div>
          <div className="doc-prose">
            <p>
              Debt consolidation means combining several active loans, such as credit card dues (often 36% to 42% p.a.),
              personal loans and short-term app loans, into <strong>one new loan</strong> from a bank or RBI-regulated NBFC at
              a lower interest rate.
            </p>
            <p>
              Instead of juggling 3 to 6 payment dates, you make <strong>one payment each month</strong>. Whether it saves you
              money depends on the new rate, the new tenure and the fees, and the lender decides all three.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">The maths behind it.</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-lg border border-[#E7E2DD] p-6">
              <p className="text-sm font-semibold text-[#626262]">1. Standard EMI formula</p>
              <code className="mt-3 block rounded bg-[#FFF8F3] p-3 font-mono text-sm font-bold">EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]</code>
              <p className="mt-3 text-sm leading-relaxed text-[#626262]">P is the total principal, r the monthly rate (annual rate ÷ 12 ÷ 100) and n the tenure in months.</p>
            </div>
            <div className="rounded-lg border border-[#E7E2DD] p-6">
              <p className="text-sm font-semibold text-[#626262]">2. Weighted average interest rate</p>
              <code className="mt-3 block rounded bg-[#FFF8F3] p-3 font-mono text-sm font-bold">Weighted rate = Σ(Balance × Rate) / Total balance</code>
              <p className="mt-3 text-sm leading-relaxed text-[#626262]">The true cost of your debt mix, rather than a simple average of the rates.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Today vs. after consolidation.</h2>
          <p className="mt-4 text-lg text-[#626262] max-w-2xl">An example: a salaried engineer in Bangalore with four obligations totalling ₹6,00,000.</p>
          <div className="mt-8 overflow-x-auto rounded-lg border border-[#E7E2DD] bg-white">
            <table className="w-full text-left text-sm sm:text-base">
              <thead className="bg-[#252525] text-white">
                <tr>{["Debt", "Balance", "Interest rate", "Monthly payment"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2DD]">
                {ROWS.map(([a, b, c, d, hot]) => (
                  <tr key={a}>
                    <td className="px-4 py-3 font-semibold">{a}</td>
                    <td className="px-4 py-3">{b}</td>
                    <td className={`px-4 py-3 ${hot ? "font-bold text-[#C94400]" : ""}`}>{c}</td>
                    <td className="px-4 py-3">{d}</td>
                  </tr>
                ))}
                <tr className="bg-[#FFE4CC] font-bold">
                  <td className="px-4 py-3">Before: total</td><td className="px-4 py-3">₹6,00,000</td><td className="px-4 py-3">Weighted 30.1%</td><td className="px-4 py-3">₹42,600 / month</td>
                </tr>
                <tr className="bg-[#252525] font-bold text-white">
                  <td className="px-4 py-3">After: 48 months at 10.5%*</td><td className="px-4 py-3">₹6,00,000</td><td className="px-4 py-3">10.5% p.a.*</td><td className="px-4 py-3">₹15,360 / month</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-[#626262]">*Illustrative scenario. Actual approval, fees and rates depend on your credit score, employer category and the lender&apos;s policy.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Four things to check first.</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CHECKS.map((c) => (
              <div key={c.title} className="rounded-lg border border-[#E7E2DD] p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#FD6C01]"><c.icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-2 leading-relaxed text-[#626262]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-8 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold lg:sticky lg:top-28 self-start">Calculator questions.</h2>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-lg border border-[#E7E2DD] bg-white px-5 py-4 open:bg-[#FFE4CC]">
                <summary className="cursor-pointer list-none text-lg font-semibold leading-snug">{f.q}</summary>
                <p className="mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#252525] text-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-bold">Want to see your real options?</h2>
            <p className="mt-4 text-lg text-[#D4D4D4]">
              Get an unpressured, confidential assessment. We compare {LENDERS.length} partner banks and NBFCs for your profile, and
              the lender makes the final decision.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/eligibility" data-analytics-cta="debt_calc_page_check_eligibility" data-analytics-location="debt_calc_page"
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded bg-[#FD6C01] px-6 font-semibold text-[#252525] transition-colors hover:bg-white">
              Check eligibility <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" data-analytics-cta="debt_calc_page_speak_advisor" data-analytics-location="debt_calc_page"
              className="inline-flex h-[52px] items-center justify-center rounded border border-white/30 px-6 font-semibold transition-colors hover:border-white">
              Speak with an advisor
            </Link>
          </div>
        </div>
      </section>
      <LeadForm />
    </div>
  );
}
