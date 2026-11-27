import Link from "next/link";
import { MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LeadForm } from "@/components/LeadForm";
import { LoanCalculator } from "@/components/LoanCalculator";
import { ProductHero } from "@/components/ProductHero";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TrackedAccordion } from "@/components/analytics/TrackedAccordion";
import { CityCompare, CityOptionTabs, CityOptionsGrid, CitySituationGuide } from "@/components/city/CityOptions";
import { cities, type City } from "@/lib/cities";
import { cityHubPath } from "@/lib/cityPages";
import { cityHubFaqs, hubSteps } from "@/lib/cityOptions";
import { contact } from "@/lib/config";
import { factsFor } from "@/lib/cityFacts";
import { CityLocalNotes } from "@/components/city/CityLocalNotes";
import { jsonLd, pageFaqSchema } from "@/lib/structuredData";

export function CityHubPage({ city }: { city: City }) {
  const faqs = cityHubFaqs(city);
  const facts = factsFor(city);
  const office = contact.addresses.find((a) => a.city === city.name);
  const nearOffice = !office && city.nearestOffice ? contact.addresses.find((a) => a.city === city.nearestOffice) : null;
  const sameState = cities.filter((x) => x.slug !== city.slug && x.state === city.state);

  return (
    <div className="min-h-screen bg-white">
      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Loans by city", path: "/loans-by-city" }, { name: city.name }]} />

      <ProductHero
        spacer={false}
        city={city.name}
        title={`Every loan option for ${city.name}, in one place.`}
        body={`Personal loans, quick loans, overdraft, debt consolidation and more. See what each one is for, compare them side by side and check your options for free from ${city.name}.`}
        cta="Check my options"
        points={["Free to check, no obligation", "Made for salaried professionals", "You decide whether to go ahead"]}
      />

      <CityOptionTabs city={city} />
      <CityOptionsGrid
        city={city}
        heading={`What you can look at in ${city.name}.`}
        intro="Eight options, one place. Open any of them to see how it works and check your eligibility."
      />
      <CitySituationGuide city={city} />
      <CityCompare city={city} />

      <section className="bg-[#252525] text-white">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px]">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold max-w-3xl">
            How it works from {city.name}.
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hubSteps.map((s, i) => (
              <li key={s.t} className="rounded-2xl border border-white/15 p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FD6C01] text-[#252525] font-bold">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold tracking-[-0.02em]">{s.t}</h3>
                <p className="mt-2 text-base leading-relaxed text-[#D4D4D4]">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LoanCalculator />

      {facts && <CityLocalNotes city={city} facts={facts} />}

      <section className="section-tint text-[#252525]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">
              {office ? `Visit us in ${city.name}.` : `Working with us from ${city.name}.`}
            </h2>
            <p className="mt-4 text-lg text-[#626262] leading-relaxed">
              You can check your options online from {city.name}, {city.state}, and a credit specialist will call you back.
              Lenders set their own eligibility rules, so what you can get depends on your income, employer, credit
              profile and existing EMIs, not on where you live.
            </p>
            {(office || nearOffice) && (
              <div className="mt-6 flex items-start gap-3">
                <MapPin className="h-6 w-6 shrink-0 text-[#E15F00] mt-0.5" />
                <p className="text-lg text-[#626262] leading-relaxed">
                  {office ? office.fullAddress : `Our nearest office is in ${nearOffice!.city}: ${nearOffice!.fullAddress}`}
                </p>
              </div>
            )}
          </div>
          {sameState.length > 0 && (
            <div>
              <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">Also in {city.state}.</h2>
              <ul role="list" className="mt-6 flex flex-wrap gap-3">
                {sameState.map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={cityHubPath(x.slug)}
                      className="inline-block rounded bg-white hover:bg-[#FD6C01] transition-colors px-5 py-3 text-base font-semibold"
                    >
                      {x.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white text-[#252525]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageFaqSchema(faqs)) }} />
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-[72px] grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-8 lg:gap-16">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold lg:sticky lg:top-28 self-start">
            Common questions.
          </h2>
          <TrackedAccordion faqSet={`city-hub:${city.slug}`} type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem value={`f-${i}`} key={f.q} className="border border-[#252525]/25 bg-white rounded-xl mb-3 px-4 md:px-6 data-[state=open]:bg-[#FFE4CC] transition-colors">
                <AccordionTrigger className="hover:no-underline text-left gap-6 py-5">
                  <span className="text-xl md:text-2xl leading-snug font-semibold tracking-[-0.015em]">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pr-8">
                  <p className="text-base md:text-lg leading-relaxed max-w-xl">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </TrackedAccordion>
        </div>
      </section>

      <LeadForm />
    </div>
  );
}
