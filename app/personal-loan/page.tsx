import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { Eligibility } from "@/components/Eligibility";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan for Salaried Employees {year}",
  description:
    "Compare personal loans for salaried employees in {year}. Rates from 9.99% p.a.*, soft eligibility check, partner banks and NBFCs. Plan {nextYear} early.",
  path: "/personal-loan",
  keywords: ["best personal loan in India", "India's best personal loan", "top personal loan India", "No.1 personal loan India", "personal loan for salaried employees", "lowest interest personal loan India"],
});

export default function PersonalLoanPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Personal loan" }]}
        updatedPath="/personal-loan"
        title="Need a personal loan? Let's see what you qualify for."
        body="Rates start from 9.99% p.a.* for salaried applicants. We check your options with partner banks, based on your income, employer and credit score."
        cta="Check my eligibility"
        points={["Free to check, no obligation", "Soft profile check, no impact on your score*", "You decide if you go ahead"]}
      />

      <PageIntro page="personal-loan" />
      <FitAndDocs page="personal-loan" />

      <Eligibility />
      <LoanCalculator />
      <GuidesAndAlso page="personal-loan" />
      <PageProof page="personal-loan" />
      <LeadForm />
    </div>
  );
}
