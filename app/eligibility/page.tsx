import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { ProductHero } from "@/components/ProductHero";
import { Eligibility } from "@/components/Eligibility";
import { FitAndDocs, GuidesAndAlso } from "@/components/page-sections/Extras";
import { WhoWeHelp } from "@/components/WhoWeHelp";
import { EligibilityForm } from "@/components/EligibilityForm";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan Eligibility & Documents {year}",
  description:
    "Personal loan eligibility criteria and documents for {year} and {nextYear}: age, income, credit score, employer and EMIs. Check yours free.",
  path: "/eligibility",
  keywords: ["personal loan eligibility India", "best personal loan eligibility check India", "India's best eligibility checker", "personal loan documents required"],
});

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-white">

      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Eligibility" }]}
        updatedPath="/eligibility"
        title="Not sure if you qualify? Let's find out."
        body="Here's what lenders usually look at: age, income, employment and documents. Then check your own profile in a couple of minutes."
        cta="Check my eligibility"
        points={["Free to check", "No upload needed to start", "You decide what happens next"]}
        href="#credit-profile"
      />

      <Eligibility />
      <FitAndDocs page="eligibility" />
      <WhoWeHelp />
      <GuidesAndAlso page="eligibility" />
      <section id="credit-profile" className="py-12 md:py-[72px] bg-[#FFE4CC] scroll-mt-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <EligibilityForm />
        </div>
      </section>
    </div>
  );
}
