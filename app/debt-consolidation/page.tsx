import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { DebtConsolidation } from "@/components/DebtConsolidation";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "Debt Consolidation Loan in India {year}",
  description:
    "Merge personal loans, card dues and app loans into one lower EMI. Compare debt consolidation options for {year} and a debt-free {nextYear}.",
  path: "/debt-consolidation",
});

export default function DebtConsolidationPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Debt consolidation" }]}
        updatedPath="/debt-consolidation"
        title="Too many EMIs? Let's turn them into one."
        body="Stop juggling due dates and high card interest. See whether combining your loans and cards into one plan could lower what you pay each month."
        cta="Check my options"
        points={["Free assessment", "One due date, one payment", "Honest answer, even if it isn't worth it"]}
      />

      <PageIntro page="debt-consolidation" />
      <FitAndDocs page="debt-consolidation" />

      <DebtConsolidation />
      <LoanCalculator />
      <GuidesAndAlso page="debt-consolidation" />
      <PageProof page="debt-consolidation" />
      <LeadForm />
    </div>
  );
}
