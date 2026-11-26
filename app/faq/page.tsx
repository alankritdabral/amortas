import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { ProductHero } from "@/components/ProductHero";
import Link from "next/link";
import { siteFaqs } from "@/content/faq";
import { jsonLd } from "@/lib/structuredData";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Find answers to all common questions about debt consolidation, personal loans, interest rates, CIBIL score impact, and lender approval.",
  path: "/faq",
});

// Built from content/faq.ts — the exact same data components/FAQ.tsx
// renders — so this can never show Google a question or answer that isn't
// actually on the page (unlike the two hand-written copies this phase
// removed from /debt-consolidation and the calculator page).
const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: siteFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema) }}
      />
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "FAQ" }]}
        updatedPath="/faq"
        title="Questions? Good. Ask away."
        body="Clear, honest answers about loan options and how we help. If yours isn't here, just ask us directly."
        cta="Ask us directly"
        points={["Straight answers, no jargon", "Free to ask", "A real person replies"]}
      />

      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <FAQ />
        </div>
      </section>
      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Want to read more?</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              { href: "/learning-center", title: "Learning center", text: "Plain-language guides on EMIs, credit scores and borrowing." },
              { href: "/how-it-works", title: "How it works", text: "The four steps from first check to your decision." },
              { href: "/grievance-redressal", title: "Raise a complaint", text: "How to reach us and escalate if something went wrong." },
            ].map((x) => (
              <li key={x.href}>
                <Link href={x.href} className="group flex h-full flex-col rounded-lg border border-[#E7E2DD] p-6 transition-colors hover:border-[#252525]">
                  <span className="text-lg font-bold">{x.title}</span>
                  <span className="mt-2 flex-1 text-[#626262] leading-relaxed">{x.text}</span>
                  <span className="mt-4 font-semibold underline underline-offset-4 group-hover:text-[#C94400]">Open</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <LeadForm />
    </div>
  );
}
