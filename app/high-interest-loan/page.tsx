import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "Refinance a High-Interest Loan in {year}",
  description:
    "Paying a high rate on an old personal loan? Explore refinancing with partner banks in {year} to cut your interest cost and monthly EMI.",
  path: "/high-interest-loan",
  keywords: ["best way to refinance high interest loan India", "India's best loan refinance", "No.1 loan refinance India", "reduce loan interest rate India", "refinance high interest loan"],
});

export default function HighInterestLoanPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "High-interest loans" }]}
        updatedPath="/high-interest-loan"
        title="Is your loan costing more than it should?"
        body="If you're paying above 16% a year, refinancing or consolidating with a partner bank might lower your monthly burden. We'll tell you honestly."
        cta="Check my options"
        points={["Free assessment", "Honest answer, even if switching isn't worth it", "You stay in control"]}
      />

      <PageIntro page="high-interest-loan" />
      <FitAndDocs page="high-interest-loan" />

      <LoanCalculator />
      <GuidesAndAlso page="high-interest-loan" />
      <PageProof page="high-interest-loan" />
      <LeadForm />
    </div>
  );
}
