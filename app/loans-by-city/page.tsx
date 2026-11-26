import { CityDirectory } from "@/components/CityDirectory";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { LeadForm } from "@/components/LeadForm";
import { buildMetadata } from "@/lib/seo";
import { cities } from "@/lib/cities";
import { cityHubPath, cityPagePath, cityProducts } from "@/lib/cityPages";

export const metadata: Metadata = buildMetadata({
  title: "Loans by City",
  description:
    "Personal loan, quick loan, overdraft and debt consolidation options in 37 Indian cities, from Delhi and Mumbai to Dehradun and Rudrapur. Find your city.",
  path: "/loans-by-city",
});

export default function LoansByCityPage() {
  const rows = cities.map((c) => ({
    name: c.name,
    slug: c.slug,
    state: c.state,
    hub: cityHubPath(c.slug),
    links: cityProducts.map((p) => ({
      label: p.title.replace(" Loan", "").replace("Personal Loan Overdraft", "Overdraft"),
      href: cityPagePath(p.key, c.slug),
    })),
  }));
  const stateCount = new Set(cities.map((c) => c.state)).size;
  return (
    <div className="min-h-screen bg-white text-[#252525]">
      <div className="h-[84px]" aria-hidden="true" />
      <section className="bg-[#FFF3E8] border-b border-[#F0E3D8]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20 grid gap-10 lg:grid-cols-[6fr_5fr] lg:gap-16 items-center">
          <div>
            <p className="text-base font-semibold">Across India</p>
            <h1 className="mt-3 text-[clamp(36px,8vw,56px)] leading-[1.02] tracking-[-0.04em] font-medium">Loans by city.</h1>
            <p className="mt-5 text-lg md:text-xl leading-[1.5] max-w-xl">
              You can check your options online from anywhere in India. Pick your city to see personal loans, quick loans,
              overdraft options and debt consolidation.
            </p>
          <dl className="mt-8 grid max-w-lg grid-cols-3 gap-4">
            {[
              [String(cities.length), "cities"],
              [String(stateCount), "states and UTs"],
              ["4", "loan types per city"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-lg bg-white/90 p-4">
                <dt className="sr-only">{l}</dt>
                <dd className="text-[32px] md:text-[40px] leading-none tracking-[-0.04em] font-bold">{v}</dd>
                <dd className="mt-2 text-sm font-medium">{l}</dd>
              </div>
            ))}
          </dl>
          </div>
          <div className="w-full lg:max-w-[520px] lg:ml-auto">
            <ContactForm variant="card" location="hero" />
          </div>
        </div>
      </section>
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Loans by city" }]} />
      <section className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-14">
        <CityDirectory cities={rows} />
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-[#626262]">
          Lenders set their own eligibility rules, and approval is always their decision. Not in the list? Our online check
          works from anywhere in India.
        </p>
      </section>
      <LeadForm />
    </div>
  );
}
