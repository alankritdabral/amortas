import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan Balance Transfer Calculator {year}",
  description:
    "Work out your personal loan balance transfer savings for {year} and {nextYear}. Compare your rate and charges with partner rates from 9.99% p.a.*",
  path: "/loan-balance-transfer",
  keywords: ["best personal loan balance transfer India", "India's best loan balance transfer", "top balance transfer loan India", "lowest interest balance transfer India", "personal loan balance transfer"],
});

export default function BalanceTransferPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Balance transfer" }]}
        updatedPath="/loan-balance-transfer"
        title="Paying 16–24% on a loan? Let's move it somewhere cheaper."
        body="If you qualify, you could transfer your existing loan to a partner bank at rates starting from 9.99% p.a.*"
        cta="Check my transfer rate"
        points={["Free to check", "We compare partner banks for you", "No pressure to switch"]}
      />

      <PageIntro page="balance-transfer" />
      <FitAndDocs page="balance-transfer" />

      <LoanCalculator />
      <GuidesAndAlso page="balance-transfer" />
      <PageProof page="balance-transfer" />
      <LeadForm />
    </div>
  );
}
