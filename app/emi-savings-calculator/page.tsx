import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "EMI Savings Calculator {year}",
  description:
    "See how much you could save every month in {year} by combining your loans and card dues into one lower-rate loan. Free estimate.",
  path: "/emi-savings-calculator",
});

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Calculators", path: "/calculators" }, { name: "EMI savings calculator" }]}
        updatedPath="/emi-savings-calculator"
        title="How much could you save on your EMIs?"
        body="Add up what you pay today and see what it might look like as one loan at a lower rate. It's a quick estimate to start the conversation."
        cta="Get my free assessment"
        points={["Free and instant", "Built for salaried borrowers", "Honest, even if the saving is small"]}
      />

      <PageIntro page="emi-calculator" />
      <FitAndDocs page="emi-calculator" />
      <LoanCalculator />
      <GuidesAndAlso page="emi-calculator" />
      <PageProof page="emi-calculator" />
      <LeadForm />
    </div>
  );
}
