import type { Metadata } from "next";
import { AnimatedSection } from "@/components/AnimatedSection";
import { LoanSolutionsSection } from "@/components/LoanSolutionsSection";
import { CtaBand } from "@/components/home/Bands";
import { ConsolidationHero } from "@/components/home/ConsolidationHero";
import { ChangesSection } from "@/components/home/ChangesSection";
import { HowTimeline } from "@/components/home/HowTimeline";
import { SectionRules, SectionDivider } from "@/components/SectionRules";
import {
  SmartCalculator,
  EligibilityForm,
  ScamProtection,
  FAQ,
  NetworkStats,
  EligibleLoansSlider,
  ContactForm,
} from "@/components/home/LazyHomeSections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SectionRules>

      {/* Row 1: Hero, "Multiple Loans. One EMI." with the EMI card and lender strip */}
      <ConsolidationHero />

      <SectionDivider />
      {/* Row 1.2: What changes, what does not */}
      <ChangesSection />

      <SectionDivider />
      {/* Row 1.5: Loan Solutions Section (New) */}
      <LoanSolutionsSection />

      <SectionDivider />
      {/* Row 1.6: Contact Form */}
      <section className="w-full bg-[#F7E0D4] py-12 md:py-[72px]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <ContactForm />
          </AnimatedSection>
        </div>
      </section>


      <SectionDivider />
      {/* Row 2: Eligible Loans Slider (Redesigned) */}
      <div className="w-full section-tint">
        <EligibleLoansSlider />
      </div>

      <SectionDivider />
      {/* Row 2.5: Backbone stats */}
      <NetworkStats />

      <SectionDivider />
      {/* Row 3: How it Works & Scam Protection */}
      <AnimatedSection>
        <HowTimeline />
      </AnimatedSection>
      <AnimatedSection>
        <ScamProtection />
      </AnimatedSection>

      <SectionDivider />
      {/* Row 4: Calculator */}
      <section id="calculator" className="w-full">
        <AnimatedSection>
          <SmartCalculator />
        </AnimatedSection>
      </section>

      <SectionDivider />
      {/* Row 5: FAQ */}
      <section className="w-full section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <AnimatedSection>
            <FAQ />
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />
      {/* Row 6: Eligibility Form */}
      <section id="lead-form" className="w-full bg-[#F7E0D4]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <AnimatedSection>
            <EligibilityForm />
          </AnimatedSection>
        </div>
      </section>

      <CtaBand />
    </SectionRules>
  );
}
