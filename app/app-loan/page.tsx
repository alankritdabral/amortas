import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "App Loan Consolidation {year}: One Lower EMI",
  description:
    "Too many instant app loans? Consolidate fintech and app loan EMIs into one lower-cost bank loan in {year}. Free eligibility check.",
  path: "/app-loan",
});

export default function AppLoanPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "App loans" }]}
        updatedPath="/app-loan"
        title="Too many app loans? Let's make it one."
        body="App loans often come with steep fees and high interest. Roll them into one bank loan with a single EMI."
        cta="Combine my app loans"
        points={["Free to check", "One EMI, one due date", "No pressure, no upfront fees"]}
      />

      <PageIntro page="app-loan" />
      <FitAndDocs page="app-loan" />

      <LoanCalculator />
      <GuidesAndAlso page="app-loan" />
      <PageProof page="app-loan" />
      <LeadForm />
    </div>
  );
}
