import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ProductHero } from "@/components/ProductHero";
import { LeadForm } from "@/components/LeadForm";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { jsonLd } from "@/lib/structuredData";
import { articles } from "@/content/articles";
import { ArticleGrid } from "@/components/learning/ArticleGrid";
import { TOPIC_LIST, readingMinutes, topicOf } from "@/lib/articleMeta";

const TOOLS = [
  { href: "/personal-loan-emi-calculator", title: "EMI calculator", text: "Move the sliders and see your monthly payment and total interest." },
  { href: "/eligibility", title: "Eligibility check", text: "See which partner lenders you may qualify for, free." },
  { href: "/debt-consolidation", title: "Debt consolidation", text: "Find out if one lower EMI would work for your loans." },
];

export const metadata: Metadata = buildMetadata({
  title: "Loan & EMI Guides {year}: Learning Center",
  description:
    "Plain-language guides for {year} and {nextYear}: EMIs, credit scores, debt consolidation, balance transfer, repo rate, eligibility and loan scams.",
  path: "/learning-center",
});

const listSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Loan & EMI guides",
  url: `${siteConfig.url}/learning-center`,
  mainEntity: {
    "@type": "ItemList",
    itemListElement: articles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/learning-center/${a.slug}`,
      name: a.title,
    })),
  },
};

export default function Page() {
  const featured = articles[0];
  const items = articles.map((a) => ({ slug: a.slug, title: a.title, summary: a.summary, topic: topicOf(a), minutes: readingMinutes(a) }));
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(listSchema) }} />
      <ProductHero
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Learning center" }]}
        updatedPath="/learning-center"
        title="Loans and EMIs, explained without the jargon."
        body="Short, honest guides to help you understand your options before you borrow, consolidate or switch."
        cta="Ask us a question"
        points={["Written for salaried borrowers", "General information, not advice", "Free to read"]}
      />
      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 pt-12 md:pt-[72px]">
          <p className="text-base font-semibold text-[#C94400]">Start here</p>
          <Link
            href={`/learning-center/${featured.slug}`}
            className="group mt-3 grid gap-6 rounded-lg bg-[#FFE4CC] p-6 md:grid-cols-[7fr_5fr] md:gap-12 md:p-10 items-center"
          >
            <div>
              <p className="text-sm font-semibold">{topicOf(featured)} · {readingMinutes(featured)} min read</p>
              <h2 className="mt-3 text-[32px] md:text-[44px] leading-[1.05] tracking-[-0.03em] font-bold group-hover:underline underline-offset-4 decoration-2">
                {featured.title}
              </h2>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-[#444140]">{featured.summary}</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded bg-[#252525] px-[22px] h-[48px] text-base font-semibold text-white">
                Read the guide <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </div>
      </section>
      <section className="bg-white text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <h2 className="mb-8 text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">All guides</h2>
          <ArticleGrid items={items} topics={TOPIC_LIST} />
        </div>
      </section>
      <section className="section-tint text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 grid gap-4 md:grid-cols-3">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} className="group rounded-lg border border-[#E7E2DD] bg-white p-6 transition-colors hover:border-[#252525]">
              <h3 className="text-lg font-bold">{t.title}</h3>
              <p className="mt-2 text-[#626262] leading-relaxed">{t.text}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                Open <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <LeadForm />
    </div>
  );
}
