import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityHubPage } from "@/components/CityHubPage";
import { CityLoanPage } from "@/components/CityLoanPage";
import { cities } from "@/lib/cities";
import { buildMetadata } from "@/lib/seo";
import { allCityPages, cityHubPath, cityPagePath, isHubIndexed, isIndexed, parseCityHubSlug, parseCityPageSlug, productDef, type CityProduct } from "@/lib/cityPages";

/**
 * One route serves every "<product>-in-<city>" page (lib/cityPages.ts):
 * /personal-loan-in-pune, /quick-loan-in-pune, /personal-loan-overdraft-in-pune,
 * /debt-consolidation-in-pune and so on. Real top-level routes (/about, /faq, ...)
 * take precedence over this segment, and any slug that is not a known
 * product/city pair is a 404 (dynamicParams = false).
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return [
    ...allCityPages().map(({ product, city }) => ({ slug: cityPagePath(product, city.slug).slice(1) })),
    ...cities.map((city) => ({ slug: cityHubPath(city.slug).slice(1) })),
  ];
}

const descriptions: Record<CityProduct, (c: string) => string> = {
  "personal-loan": (c) => `Personal loan and EMI consolidation options for salaried staff in ${c}. Rates from 9.99% p.a.* for eligible applicants. Free assessment.`,
  "quick-loan": (c) => `Check which partner lenders you may qualify for in ${c} before you apply. Speed depends on the lender and your documents. Free assessment.`,
  overdraft: (c) => `Explore overdraft and credit-line options for salaried people in ${c}, and see if a personal loan would cost you less. Free assessment.`,
  "debt-consolidation": (c) => `Merge personal loans, card dues and app loans into one EMI in ${c}, if the numbers work. Free assessment with partner banks and NBFCs.`,
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const hub = parseCityHubSlug(slug);
  if (hub) {
    return buildMetadata({
      title: `Loans in ${hub.name}: All Options`,
      description: `Personal loan, quick loan, overdraft, debt consolidation and more in ${hub.name}. Compare every option side by side and check yours for free.`,
      path: cityHubPath(hub.slug),
      noindex: !isHubIndexed(hub),
    });
  }
  const hit = parseCityPageSlug(slug);
  if (!hit) return {};
  const { product, city } = hit;
  return buildMetadata({
    title: `${productDef(product).title} in ${city.name}`,
    description: descriptions[product](city.name),
    path: cityPagePath(product, city.slug),
    noindex: !isIndexed(product, city),
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const hub = parseCityHubSlug(slug);
  if (hub) return <CityHubPage city={hub} />;
  const hit = parseCityPageSlug(slug);
  if (!hit) notFound();
  return <CityLoanPage city={hit.city} product={hit.product} />;
}
