import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "Credit Card Debt Consolidation {year}",
  description:
    "Paying 36% to 42% p.a. on card dues? Move credit card debt into a lower-rate loan and start {nextYear} with one fixed EMI. Free check.",
  path: "/credit-card-debt",
});

export default function CreditCardDebtPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Credit card debt" }]}
        updatedPath="/credit-card-debt"
        title="Your credit-card bill shouldn't take years to clear."
        body="Cards charge 36–42% a year, and minimum dues keep you stuck. Moving that balance to a lower-rate loan can change that."
        cta="See my card options"
        points={["Free assessment", "We never ask for money upfront", "Your final lender makes the decision"]}
      />

      <PageIntro page="credit-card-debt" />
      <FitAndDocs page="credit-card-debt" />

      <LoanCalculator />
      <GuidesAndAlso page="credit-card-debt" />
      <PageProof page="credit-card-debt" />
      <LeadForm />
    </div>
  );
}
