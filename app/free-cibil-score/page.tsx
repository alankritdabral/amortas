import { Metadata } from "next";
import Link from "next/link";
import { Gauge, CalendarCheck, Wallet, Layers, Search, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { EligibilityForm } from "@/components/EligibilityForm";
import { SolutionMatcher, ScoreLadder } from "@/components/credit/Solutions";
import { Steps, FeatureGrid, SituationTable, CreditFaq, CheckSection, SectionHead } from "@/components/credit/Sections";
import type { Faq } from "@/lib/pageContent";

export const metadata: Metadata = buildMetadata({
  title: "Free CIBIL & Credit Score Check {year}",
  description:
    "Check your CIBIL and credit score free in minutes. See what your score means for loans in {year} and {nextYear}, and which option fits it best.",
  path: "/free-cibil-score",
  keywords: ["free CIBIL score", "free credit score check", "check credit score online free India"],
});

const faqs: Faq[] = [
  { q: "Is the credit score check really free?", a: "Yes. Checking your score and report with us costs nothing, and there is no charge to see which loan options fit your profile." },
  { q: "Will checking my score lower it?", a: "No. Checking your own score is a soft enquiry. It is not visible to lenders as a loan application and does not reduce your score. Hard enquiries come from applying for credit." },
  { q: "Is this my CIBIL score?", a: "CIBIL is one of the credit bureaus in India. We pull your report from Experian or CRIF High Mark, whichever you select. Each bureau uses its own model, so scores can differ by a few points, and the ranges are broadly the same." },
  { q: "Which score do lenders want?", a: "Most lenders look for 700 or more for their best rates, and many approve from about 650 with higher pricing. Below 650, approval gets harder. Each lender sets its own cut-off." },
  { q: "What do I need to check my score?", a: "Your name, mobile number, PAN and date of birth, plus an OTP sent to your phone. You confirm that you are 21 or older and allow us to fetch your report." },
  { q: "What happens after I see my score?", a: "You see your report and a short list of the options that fit it. There is no obligation. If you want help, a credit expert can call you; if not, you can simply close the page." },
  { q: "How often should I check?", a: "About once a month is plenty, and always before you apply for a loan. Scores usually move slowly, so checking daily tells you little." },
];

const factors = [
  { icon: CalendarCheck, title: "Payment history", text: "Paying every EMI and card bill on time matters most. One missed payment can stay on your report for years." },
  { icon: Wallet, title: "Credit-card usage", text: "Using more than about 30% of your card limits makes lenders cautious. Lower is better." },
  { icon: Layers, title: "Mix of credit", text: "A healthy mix of secured and unsecured credit helps. Too many unsecured loans at once can hurt." },
  { icon: Search, title: "New enquiries", text: "Several loan applications in a short time create hard enquiries and can lower approval odds." },
  { icon: Gauge, title: "Length of history", text: "Older accounts in good standing show a track record. Avoid closing your oldest card without a reason." },
  { icon: ShieldCheck, title: "Errors and fraud", text: "A wrong account or late mark can drag a score down. Reading your report is how you catch it." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Free credit score" }]}
        updatedPath="/free-cibil-score"
        title="Check your credit score. Free, in minutes."
        body="See your score, understand it, and get the loan options that fit it, picked automatically from your own report."
        cta="Get my free score"
        href="#check"
        points={["Free, no card needed", "Does not lower your score", "Options matched to your report"]}
      />

      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <SectionHead title="What your score means." intro="Credit scores in India run from 300 to 900. Here is how lenders usually read each range." />
          <div className="mt-10"><ScoreLadder /></div>
        </div>
      </section>

      <Steps steps={[
        { title: "Enter your details", text: "Name, mobile, PAN and date of birth. Takes about a minute." },
        { title: "Verify with an OTP", text: "A code sent to your phone confirms it is really you." },
        { title: "See your score", text: "Your score, accounts, dues and enquiries appear on screen." },
        { title: "Get matched", text: "We show which options fit your report best, and why." },
      ]} />

      <section className="bg-[#FFF9F4] text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <SectionHead title="Try it before you check." intro="Move the sliders to match your situation and see the kind of solutions that fit. Nothing you enter here is sent anywhere." />
          <div className="mt-10"><SolutionMatcher /></div>
        </div>
      </section>

      <FeatureGrid title="What moves your score." intro="Six things shape the number lenders see. Knowing them tells you what to fix first." items={factors} />

      <SituationTable />

      <CheckSection heading="Get your free score and matched options." text="Fill in the details below. Your report and the best-fit solutions appear right after the OTP.">
        <EligibilityForm />
      </CheckSection>

      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 text-base leading-relaxed text-[#626262]">
          Want the full report with every account and enquiry? See our <Link href="/free-credit-report" className="font-bold text-[#C94400] underline">free credit report page</Link>. For how bureaus differ, read <Link href="/learning-center/cibil-vs-experian-vs-crif-high-mark" className="font-bold text-[#C94400] underline">CIBIL vs Experian vs CRIF High Mark</Link>.
        </div>
      </section>

      <CreditFaq faqs={faqs} faqSet="page:free-cibil-score" />
    </div>
  );
}
