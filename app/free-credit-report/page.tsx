import { Metadata } from "next";
import Link from "next/link";
import { UserRound, Landmark, CreditCard, AlertTriangle, ListChecks, FileSearch } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { EligibilityForm } from "@/components/EligibilityForm";
import { Steps, FeatureGrid, SituationTable, CreditFaq, CheckSection } from "@/components/credit/Sections";
import type { Faq } from "@/lib/pageContent";

export const metadata: Metadata = buildMetadata({
  title: "Free Credit Report Online {year}",
  description:
    "Get your full credit report free: score, loans, card dues and enquiries. Plan your {nextYear} EMIs with the best-fit option for your profile.",
  path: "/free-credit-report",
  keywords: ["free credit report", "free credit report India", "download credit report free", "best free credit report India", "free CIBIL report", "free credit report no fee"],
});

const faqs: Faq[] = [
  { q: "What is in a credit report?", a: "Your personal details, your score, every loan and card account with balances and payment status, any overdue amounts, and a list of recent enquiries by lenders." },
  { q: "Is the full report free?", a: "Yes. You can view your report and the matched solutions at no cost. Some bureaus also let you download a PDF, which we link when it is available." },
  { q: "Why does my report show a loan I do not recognise?", a: "It could be a reporting error or identity misuse. Note the lender and account number, then raise a dispute with the bureau and the lender. The report is how you find these early." },
  { q: "How do I fix a mistake on my report?", a: "Raise a dispute with the credit bureau, attach proof such as a closure letter or statement, and follow up with the lender. Corrections usually take up to 30 days." },
  { q: "Does viewing my report affect my score?", a: "No. Looking at your own report is a soft enquiry and does not reduce your score." },
  { q: "How does the report help me choose a loan option?", a: "We read your score, running loans, rates, card balances, overdue status and EMI load, then rank the options that fit. For example, three EMIs and a large card balance usually point to consolidation." },
  { q: "Is my report stored or shared?", a: "We use it to show your results and, only if you ask, to help you with an application. See our privacy policy for what we keep and how to ask us to delete it." },
];

const sections = [
  { icon: UserRound, title: "Personal details", text: "Name, date of birth, PAN and addresses. Check them: a wrong detail can mix up your file with someone else's." },
  { icon: Landmark, title: "Loan accounts", text: "Every running and closed loan with lender, balance, EMI and rate. Closed loans should show a zero balance." },
  { icon: CreditCard, title: "Credit cards", text: "Limit, balance and payment record for each card. This is where usage and dues show up." },
  { icon: AlertTriangle, title: "Overdue and defaults", text: "Any amount past due or marked late. Clear and update these first." },
  { icon: FileSearch, title: "Enquiries", text: "A list of lenders who looked at your file after you applied. Many in a short time can be a warning sign to lenders." },
  { icon: ListChecks, title: "Matched solutions", text: "Our add-on: your report turned into a ranked list of the options that suit it, with the reason for each." },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Free credit report" }]}
        updatedPath="/free-credit-report"
        title="Your full credit report. Free, and explained."
        body="See every loan, card and enquiry in one place, then let us work out the cheapest way to simplify your EMIs."
        cta="Get my free report"
        href="#check"
        points={["Score, loans, cards and enquiries", "Spot errors early", "Best-fit solutions picked for you"]}
      />

      <FeatureGrid title="What is inside your report." intro="A credit report is the record lenders read before they decide. Here is each part and what to look for." items={sections} />

      <Steps steps={[
        { title: "Share your details", text: "Name, mobile, PAN and date of birth, with your consent." },
        { title: "Confirm by OTP", text: "A code to your phone keeps your report private." },
        { title: "Read your report", text: "Accounts, dues, enquiries and score on one screen." },
        { title: "Act on it", text: "Follow the ranked solutions, or ask an expert to talk it through." },
      ]} />

      <SituationTable />

      <CheckSection heading="Get your free credit report." text="Your report and your matched solutions appear right after you verify with an OTP.">
        <EligibilityForm />
      </CheckSection>

      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 text-base leading-relaxed text-[#626262]">
          Only want the number? Try the <Link href="/free-cibil-score" className="font-bold text-[#C94400] underline">free credit score check</Link>. To understand ranges, read <Link href="/learning-center/cibil-score-ranges-and-how-to-improve" className="font-bold text-[#C94400] underline">CIBIL score ranges and how to improve</Link>.
        </div>
      </section>

      <CreditFaq faqs={faqs} faqSet="page:free-credit-report" />
    </div>
  );
}
