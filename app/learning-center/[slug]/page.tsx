import { Fragment } from "react";
import { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { DocToc } from "@/components/legal/DocToc";
import { readingMinutes, relatedArticles, topicOf } from "@/lib/articleMeta";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, jsonLd } from "@/lib/structuredData";
import { articles } from "@/content/articles";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return buildMetadata({
    title: a.seoTitle ?? a.title,
    description: a.summary,
    path: `/learning-center/${a.slug}`,
    type: "article",
    image: { url: `/learning-center/${a.slug}/opengraph-image`, width: 1200, height: 630, alt: a.title },
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();
  return (
    <div className="min-h-screen bg-white text-[#252525]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema(a)) }} />
      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Learning Center", path: "/learning-center" },
          { name: a.title },
        ]}
      />
      <header className="bg-[#FFE4CC]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <Link href="/learning-center" className="inline-flex items-center gap-1.5 text-base font-semibold hover:underline">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Learning center
          </Link>
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold">
            <span className="rounded bg-white px-2.5 py-1">{topicOf(a)}</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" /> {readingMinutes(a)} min read
            </span>
            <span className="text-[#444140] font-medium">
              Published {formatDate(a.publishedAt)}
              {a.updatedAt !== a.publishedAt && <> · Updated {formatDate(a.updatedAt)}</>}
            </span>
          </p>
          <h1 className="mt-4 text-[clamp(34px,7vw,56px)] leading-[1.02] tracking-[-0.04em] font-bold max-w-4xl">{a.title}</h1>
          <p className="mt-5 text-xl leading-relaxed text-[#444140] max-w-2xl">{a.summary}</p>
        </div>
      </header>

      <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-[110px]">
            <DocToc target="#article-body" />
          </div>
        </aside>
        <article className="min-w-0 max-w-2xl">
          <p className="mb-8 rounded-lg border-l-4 border-[#FD6C01] bg-[#FFF8F3] p-5 text-lg leading-relaxed">
            <strong>In short: </strong>{a.summary}
          </p>
          <div id="article-body" className="doc-prose">
            {a.sections.map((s) => (
              <Fragment key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </Fragment>
            ))}
          </div>
          <p className="mt-12 rounded-lg border border-[#E7E2DD] bg-[#FFF8F3] p-5 text-sm leading-relaxed text-[#444140]">
            This article is general information, not financial advice. Approval, rates and terms are decided by the
            lender.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#E7E2DD] pt-6">
            <Link
              href="/eligibility"
              className="inline-flex items-center gap-2 rounded bg-[#FD6C01] px-[22px] h-[48px] font-semibold text-[#252525] transition-colors hover:bg-[#252525] hover:text-white"
            >
              Check your eligibility <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/personal-loan-emi-calculator" className="font-semibold underline underline-offset-4 hover:text-[#C94400]">
              Try the EMI calculator
            </Link>
          </div>
        </article>
      </div>

      <section className="section-tint">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="text-[28px] md:text-[32px] leading-tight tracking-[-0.02em] font-bold">Keep reading</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {relatedArticles(a).map((r) => (
              <li key={r.slug}>
                <Link
                  href={`/learning-center/${r.slug}`}
                  className="group flex h-full flex-col rounded-lg border border-[#E7E2DD] bg-white p-6 transition-colors hover:border-[#252525]"
                >
                  <span className="text-sm font-semibold text-[#626262]">{topicOf(r)} · {readingMinutes(r)} min read</span>
                  <span className="mt-3 text-xl leading-tight tracking-[-0.01em] font-bold group-hover:text-[#C94400] transition-colors">{r.title}</span>
                  <span className="mt-3 flex-1 text-[#626262] leading-relaxed">{r.summary}</span>
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
