import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { WhyUs } from "@/components/WhyUs";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import Link from "next/link";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { CompanyBlock } from "@/components/legal/LegalPage";
import { LENDERS } from "@/lib/lenderEngine";
import { contact } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Learn about Amortas's mission to provide transparent debt advisory and consolidation assistance for salaried Indian professionals.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About us" }]}
        updatedPath="/about"
        title="We help salaried Indians out of debt traps."
        body="Amortas helps people review their loans and explore consolidation and personal-loan options. We keep our claims modest and our communication honest, and there's always a human to talk to."
        cta="Talk to us"
        points={["Human guidance", "Clear, jargon-free advice", "Your information handled responsibly"]}
      />

      <PageIntro page="about" />

      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Why we exist.</h2>
            <p className="mt-4 text-lg text-[#626262] leading-relaxed">
              Many salaried people carry several EMIs, card balances and app loans at different rates and due dates, and
              rarely get a clear look at the whole picture. Amortas exists to lay that picture out in plain words and show
              whether one loan, a balance transfer or simply staying put would cost you less.
            </p>
            <p className="mt-4 text-lg text-[#626262] leading-relaxed">
              Sometimes the honest answer is that nothing would help. We would rather say so than sell you a loan.
            </p>
          </div>
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">How it works under the hood.</h2>
            <p className="mt-4 text-lg text-[#626262] leading-relaxed">
              Our eligibility check compares your income, employer, existing EMIs and credit profile against the published
              criteria of the {LENDERS.length} banks and NBFCs on our{" "}
              <Link href="/partner-disclosures" className="underline">partner list</Link>. It shows you where you are
              likely to be eligible. Each lender still makes its own final decision.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tint text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">How we are paid.</h2>
            <p className="mt-4 text-lg text-[#626262] leading-relaxed">
              Using Amortas is free for you. A lender may pay us when an enquiry becomes a loan. That does not change the
              rate or fees you are offered. Details are on{" "}
              <Link href="/partner-disclosures" className="underline">Partner disclosures</Link>.
            </p>
            <h2 className="mt-10 text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Your data and your rights.</h2>
            <p className="mt-4 text-lg text-[#626262] leading-relaxed">
              We ask permission separately to fetch your credit report, to contact you and to share details with lenders. Read
              the <Link href="/privacy-policy" className="underline">Privacy Policy</Link>, or{" "}
              <Link href="/delete-account" className="underline">ask us to delete your data</Link>. If something goes wrong,
              see <Link href="/grievance-redressal" className="underline">Grievance Redressal</Link>.
            </p>
          </div>
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Where to find us.</h2>
            <ul className="mt-4 space-y-4">
              {contact.addresses.map((a) => (
                <li key={a.city}>
                  <strong className="text-lg">{a.city}</strong>
                  <p className="text-[#626262] leading-relaxed">{a.fullAddress}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8"><CompanyBlock /></div>
          </div>
        </div>
      </section>

      <WhyUs />
      <PageProof page="about" />
      <LeadForm />
    </div>
  );
}
